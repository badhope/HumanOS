# =============================================================================
#  测评系统 API 路由 - 架构优化版
# =============================================================================
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import logging
import time
from typing import List

from database.database import get_db
from database import models
from schemas.assessment_schemas import CalculationResponse, AssessmentInfo
from middleware import (
    CalculationRequest,
    calculate_result_hash,
    TimeoutProtector,
    metrics,
    rate_limiter,
)
from calculators import get_calculator, list_calculators

router = APIRouter()
logger = logging.getLogger(__name__)


def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# =============================================================================
#  性能监控接口
# =============================================================================
@router.get("/metrics", summary="获取系统性能指标")
async def get_performance_metrics():
    return metrics.get_stats()


# =============================================================================
#  测评列表
# =============================================================================
@router.get("/list", response_model=List[AssessmentInfo], summary="获取所有测评列表")
async def get_assessment_list():
    calculators = list_calculators()
    return [
        AssessmentInfo(
            id=c["id"],
            name=c["name"],
            category="professional" if c["id"] in ["ocean-bigfive", "burnout-mbi", "sas-standard", "holland-sds"] else "entertainment",
            description=f"{c['name']}专业计算引擎",
            question_count=c["question_count"],
            estimated_time_minutes=c["question_count"] // 2,
            dimensions=[{"id": d, "name": d} for d in c["dimensions"]],
        )
        for c in calculators
    ]


# =============================================================================
#  测评计算 - 架构优化版
# =============================================================================
@router.post("/calculate/{assessment_id}", summary="计算测评结果")
async def calculate_assessment(
    request: Request,
    assessment_id: str,
    calc_request: CalculationRequest,
    db: AsyncSession = Depends(get_db),
):
    start_time = time.time()
    client_ip = get_client_ip(request)
    request_id = calc_request.request_id or str(int(start_time * 1000000))
    
    logger.info(f"[{request_id}] 计算测评 {assessment_id} 来自 {client_ip}")

    if not rate_limiter.check(client_ip):
        metrics.record_request((time.time() - start_time) * 1000, success=False)
        logger.warning(f"[{request_id}] 限流触发: {client_ip}")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="请求过于频繁，请稍后再试",
        )

    try:
        calculator = get_calculator(assessment_id)
    except ValueError as e:
        metrics.record_request((time.time() - start_time) * 1000, success=False)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"不支持的测评类型: {assessment_id}",
        )

    try:
        with TimeoutProtector(timeout_ms=5000):
            result_dict = calculator(calc_request.answers)

    except TimeoutError as e:
        metrics.record_request((time.time() - start_time) * 1000, success=False)
        logger.error(f"[{request_id}] 计算超时: {assessment_id}")
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail=f"计算超时: {str(e)}",
        )

    except ValueError as e:
        metrics.record_request((time.time() - start_time) * 1000, success=False)
        logger.error(f"[{request_id}] 计算错误: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"计算错误: {str(e)}",
        )
    except Exception as e:
        metrics.record_request((time.time() - start_time) * 1000, success=False)
        logger.exception(f"[{request_id}] 未预期的错误")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="服务器内部错误",
        )

    latency_ms = (time.time() - start_time) * 1000
    metrics.record_request(latency_ms, success=True)

    if hasattr(result_dict, '__dict__'):
        result = result_dict.__dict__.copy()
    elif hasattr(result_dict, '_asdict'):
        result = result_dict._asdict()
    elif isinstance(result_dict, dict):
        result = result_dict.copy()
    else:
        result = dict(result_dict)
    
    if 'dimensions' in result:
        dims = result['dimensions']
        converted = []
        for d in dims:
            if hasattr(d, '__dict__'):
                converted.append(d.__dict__)
            elif hasattr(d, '_asdict'):
                converted.append(d._asdict())
            elif isinstance(d, dict):
                converted.append(d)
            else:
                converted.append(dict(d))
        result['dimensions'] = converted
    
    result["source"] = "backend"
    result["server_time"] = int(time.time())
    result["processing_time_ms"] = round(latency_ms, 1)
    result["result_hash"] = calculate_result_hash(result)
    result["request_id"] = request_id

    logger.info(f"[{request_id}] 计算完成，耗时: {latency_ms:.1f}ms")

    return result
