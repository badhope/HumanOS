# =============================================================================
#  速率限制中间件
# =============================================================================
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
import time
import logging

logger = logging.getLogger(__name__)

class RateLimiterMiddleware(BaseHTTPMiddleware):
    def __init__(
        self, 
        app, 
        requests_per_minute: int = 60,
        burst_multiplier: int = 2
    ):
        super().__init__(app)
        self.requests_per_minute = requests_per_minute
        self.burst_capacity = requests_per_minute * burst_multiplier
        self.request_history = defaultdict(list)
        self.logger = logging.getLogger(__name__)
    
    async def dispatch(self, request: Request, call_next):
        client_ip = self._get_client_ip(request)
        now = time.time()
        
        window_start = now - 60
        self.request_history[client_ip] = [
            ts for ts in self.request_history[client_ip] if ts > window_start
        ]
        
        request_count = len(self.request_history[client_ip])
        
        if request_count >= self.burst_capacity:
            self.logger.warning(f"🚫 速率限制触发: {client_ip} - {request_count} 请求/分钟")
            raise HTTPException(
                status_code=429,
                detail={
                    "error": "请求过于频繁",
                    "message": f"请降低请求频率，限制为每分钟 {self.requests_per_minute} 次",
                    "retry_after": 60
                }
            )
        
        if request_count >= self.requests_per_minute:
            self.logger.info(f"⚠️  接近速率限制: {client_ip} - {request_count}/{self.requests_per_minute}")
        
        self.request_history[client_ip].append(now)
        
        if len(self.request_history) > 10000:
            self.request_history.clear()
            self.logger.info("🧹 清理速率限制历史记录缓存")
        
        return await call_next(request)
    
    def _get_client_ip(self, request: Request) -> str:
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()
        
        return request.client.host if request.client else "unknown"
