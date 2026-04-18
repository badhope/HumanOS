# =============================================================================
#  国家模拟引擎 API - 后端计算入口
# =============================================================================
from fastapi import APIRouter, HTTPException, status, Request
import time
import uuid
import logging
from typing import Dict, List, Optional

from schemas.game_state import (
    EconomyState,
    GameSession,
    TickRequest,
    TickResponse,
    calculate_state_hash,
    compute_state_diff,
)
from middleware import metrics, rate_limiter, TimeoutProtector

router = APIRouter()
logger = logging.getLogger(__name__)

# 内存会话存储 (生产环境改用Redis)
ACTIVE_SESSIONS: Dict[str, GameSession] = {}


# =============================================================================
#  性能监控接口
# =============================================================================
@router.get("/engine/metrics", summary="获取游戏引擎性能指标")
async def get_engine_metrics():
    return {
        "active_sessions": len(ACTIVE_SESSIONS),
        "total_ticks_computed": metrics.metrics["total_requests"],
        "metrics": metrics.get_stats(),
    }


# =============================================================================
#  会话管理接口
# =============================================================================
@router.post("/session/create", summary="创建新游戏会话")
async def create_session(
    request: Request,
    initial_state: dict = None,
    country_id: str = "china",
    difficulty: str = "normal",
):
    """创建一个新的游戏计算会话"""
    start_time = time.time()
    client_ip = request.client.host if request.client else "unknown"

    session_id = f"gs_{uuid.uuid4().hex[:12]}"

    session = GameSession(
        session_id=session_id,
        player_id=f"player_{uuid.uuid4().hex[:8]}",
        created_at=int(time.time()),
        last_tick_at=int(time.time()),
        state=EconomyState(**initial_state) if initial_state else create_default_state(country_id),
        is_async_computing=False,
        target_speed=1,
    )

    ACTIVE_SESSIONS[session_id] = session

    logger.info(f"[{session_id}] 创建游戏会话 | 国家: {country_id} | IP: {client_ip}")

    return {
        "session_id": session_id,
        "player_id": session.player_id,
        "state_hash": calculate_state_hash(session.state),
        "created_at": session.created_at,
        "creation_time_ms": round((time.time() - start_time) * 1000, 1),
    }


@router.get("/session/{session_id}/status", summary="获取会话状态")
async def get_session_status(session_id: str):
    if session_id not in ACTIVE_SESSIONS:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"会话不存在: {session_id}",
        )

    session = ACTIVE_SESSIONS[session_id]
    return {
        "session_id": session_id,
        "current_tick": session.state.tick,
        "current_day": session.state.day,
        "is_async_computing": session.is_async_computing,
        "state_hash": calculate_state_hash(session.state),
        "uptime_seconds": int(time.time()) - session.created_at,
    }


@router.delete("/session/{session_id}/destroy", summary="销毁游戏会话")
async def destroy_session(session_id: str):
    if session_id in ACTIVE_SESSIONS:
        del ACTIVE_SESSIONS[session_id]
        logger.info(f"[{session_id}] 会话已销毁")
    return {"status": "ok", "session_id": session_id}


# =============================================================================
#  核心 Tick 计算接口
# =============================================================================
@router.post("/tick/{session_id}", summary="执行单步/多步游戏计算")
async def execute_tick(
    request: Request,
    session_id: str,
    tick_request: TickRequest,
):
    """
    执行游戏Tick计算
    
    - session_id: 会话ID
    - steps: 计算步数 (默认1步，支持批量计算)
    - state_hash: 客户端状态哈希(用于一致性校验)
    """
    start_time = time.time()

    if session_id not in ACTIVE_SESSIONS:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"会话不存在: {session_id}",
        )

    session = ACTIVE_SESSIONS[session_id]
    client_ip = request.client.host if request.client else "unknown"

    if tick_request.state_hash:
        server_hash = calculate_state_hash(session.state)
        if tick_request.state_hash != server_hash:
            logger.warning(f"[{session_id}] 状态不一致告警")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={
                    "message": "前后端状态不一致",
                    "client_hash": tick_request.state_hash,
                    "server_hash": server_hash,
                },
            )

    if tick_request.state:
        state_dict = tick_request.state
    else:
        state_dict = session.state.model_dump()

    old_state = state_dict.copy()

    try:
        with TimeoutProtector(timeout_ms=10000):
            for i in range(tick_request.steps):
                state_dict, _ = execute_single_tick_full(state_dict)

    except TimeoutError as e:
        metrics.record_request((time.time() - start_time) * 1000, success=False)
        logger.error(f"[{session_id}] 计算超时: steps={tick_request.steps}")
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail=f"计算超时: {str(e)}",
        )

    session.last_tick_at = int(time.time())

    new_state = state_dict
    state_diff = compute_state_diff(old_state, new_state)
    new_hash = calculate_state_hash(new_state)

    latency_ms = (time.time() - start_time) * 1000
    metrics.record_request(latency_ms, success=True)

    logger.info(
        f"[{session_id}] 计算完成 | steps={tick_request.steps} | "
        f"tick={new_state['tick']} | {latency_ms:.1f}ms | IP: {client_ip}"
    )

    return {
        "session_id": session_id,
        "tick": new_state["tick"],
        "new_state_hash": new_hash,
        "state": new_state,
        "state_diff": state_diff,
        "processing_time_ms": round(latency_ms, 1),
        "server_time": int(time.time()),
        "source": "python-backend",
    }


# =============================================================================
#  纯函数Tick计算内核 - 集成完整经济引擎
# =============================================================================
from engine.economy_tick import execute_single_tick_full

def execute_single_tick_pure(state: EconomyState) -> EconomyState:
    """
    纯函数Tick计算 - 无副作用，输入输出完全可复现
    
    这是前后端一致性的核心保障：
    - 所有计算必须是确定性的
    - 不依赖任何外部状态
    - 相同输入永远得到相同输出
    """
    state_dict = state.model_dump()
    
    new_state_dict, _ = execute_single_tick_full(state_dict)
    
    for _ in range(23):
        new_state_dict, _ = execute_single_tick_full(new_state_dict)
    
    return EconomyState(**new_state_dict)


def create_default_state(country_id: str = "china") -> EconomyState:
    """创建默认初始状态"""
    return EconomyState(
        countryId=country_id,
        date={"year": 2024, "month": 1, "day": 1},
        day=0,
        tick=0,
        speed=1,
        difficulty="normal",
        gameStatus="running",
        endCondition=None,
        commodities={},
        market={},
        pops=[],
        buildings=[],
        industries={},
        treasury={
            "gold": 1000000,
            "income": 50000,
            "expenses": 40000,
            "balance": 10000,
            "taxes": {"income": 0.25, "trade": 0.1, "luxury": 0.3, "land": 0.05},
            "subsidies": {"agriculture": 0.1, "industry": 0.05, "poor": 0.02},
            "debt": 500000,
            "interestRate": 0.05,
        },
        stats={
            "population": 1400000000,
            "gdp": 18000000,
            "gdpPerCapita": 12857,
            "inflation": 2.5,
            "unemployment": 5.2,
            "stability": 75,
            "legitimacy": 80,
            "bureaucracy": 60,
            "infrastructure": 70,
            "education": 65,
            "health": 72,
            "military": 85,
        },
        nationalSpirits=[],
        modifiers=[],
        policies=[],
        laws=[],
        politicalCapital=100,
        dailyPoliticalGain=1,
    )
