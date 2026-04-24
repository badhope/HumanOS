# =============================================================================
#  HumanOS 测评系统后端主入口
# =============================================================================
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from middleware.rate_limiter import RateLimiterMiddleware
import logging
from dotenv import load_dotenv
import os

load_dotenv()

from database.database import engine, Base
from api.assessment import router as assessment_router
from api.auth import router as auth_router
from api.analytics import router as analytics_router
from api.game import router as game_router

# =============================================================================
#  日志配置
# =============================================================================
os.makedirs("./logs", exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("./logs/app.log", encoding="utf-8")
    ]
)
logger = logging.getLogger(__name__)

# =============================================================================
#  生命周期事件
# =============================================================================
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 启动 HumanOS 测评系统后端服务...")
    
    os.makedirs("./logs", exist_ok=True)
    os.makedirs("./data", exist_ok=True)
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("✅ 数据库初始化完成")
    
    logger.info("✅ 所有系统就绪")
    yield
    
    logger.info("🔻 正在关闭服务...")
    await engine.dispose()
    logger.info("👋 服务已安全关闭")

# =============================================================================
#  FastAPI 应用配置
# =============================================================================
app = FastAPI(
    title="HumanOS Assessment API",
    description="""
    🧠 HumanOS 测评系统后端 API
    
    ## 功能模块
    - ✅ 22种心理测评计算器
    - ✅ 常模对比与数据分析
    - ✅ 用户存档与历史记录
    - ✅ 高级统计分析面板
    
    ## 计算精度
    所有算法与 TypeScript 前端实现 100% 对齐验证
    """,
    version="2.5.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# =============================================================================
#  中间件配置
# =============================================================================
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(RateLimiterMiddleware, requests_per_minute=120)

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
cors_origins = os.getenv("CORS_ORIGINS", "").split(",")
cors_origins = [o.strip() for o in cors_origins if o.strip()]

if not cors_origins:
    if ENVIRONMENT == "production":
        logger.warning("⚠️  生产环境未配置 CORS_ORIGINS，建议明确设置允许的域名！")
        cors_origins = []
    else:
        cors_origins = [
            "http://localhost:3000",
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:5174",
            "http://127.0.0.1:5175",
        ]
        logger.info(f"🔓 开发环境 CORS 已允许本地端口: {cors_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================================================
#  路由注册
# =============================================================================
app.include_router(assessment_router, prefix="/api/v1/assessment", tags=["测评系统"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["用户认证"])
app.include_router(analytics_router, prefix="/api/v1/analytics", tags=["数据分析"])
app.include_router(game_router, prefix="/api/v1/game", tags=["国家模拟引擎"])

# =============================================================================
#  健康检查端点
# =============================================================================
@app.get("/health", summary="健康检查")
async def health_check():
    return {
        "status": "healthy",
        "service": "humanos-backend",
        "version": "2.5.0",
        "calculators": 22
    }

@app.get("/", summary="根路径信息")
async def root():
    return {
        "message": "🧠 HumanOS Assessment API",
        "docs": "/docs",
        "version": "2.5.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("DEBUG", "True").lower() == "true",
        log_level="info"
    )
