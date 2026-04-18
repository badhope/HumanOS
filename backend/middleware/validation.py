from pydantic import validator
from typing import Optional
import hashlib
import json
import time

from schemas.assessment_schemas import CalculationRequest as BaseCalculationRequest


class CalculationRequest(BaseCalculationRequest):
    client_version: Optional[str] = None
    request_id: Optional[str] = None

    @validator("answers")
    def validate_answers_enhanced(cls, v):
        if not v:
            raise ValueError("答案不能为空")
        
        for key, val in v.items():
            if not isinstance(val, int):
                raise ValueError(f"答案值必须为整数: {key}")
            if val < 0 or val > 10:
                raise ValueError(f"答案值超出合理范围 [0,10]: {key}")
        
        if len(v) < 5:
            raise ValueError(f"题目数量过少，至少需要5题，当前: {len(v)}")
        if len(v) > 200:
            raise ValueError(f"题目数量超出上限，最多200题，当前: {len(v)}")
        
        return v


def calculate_result_hash(result: dict) -> str:
    result_copy = {
        k: v for k, v in result.items()
        if k not in ["server_time", "processing_time_ms", "source"]
    }
    sorted_str = json.dumps(result_copy, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(sorted_str.encode("utf-8")).hexdigest()[:16]


def verify_result_hash(result: dict, expected_hash: str) -> bool:
    actual_hash = calculate_result_hash(result)
    return actual_hash == expected_hash


class RateLimiter:
    def __init__(self, max_requests: int = 100, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = {}

    def check(self, client_id: str) -> bool:
        now = time.time()
        window_start = now - self.window_seconds
        
        if client_id not in self.requests:
            self.requests[client_id] = []
        
        self.requests[client_id] = [
            t for t in self.requests[client_id] if t > window_start
        ]
        
        if len(self.requests[client_id]) >= self.max_requests:
            return False
        
        self.requests[client_id].append(now)
        return True


class TimeoutProtector:
    def __init__(self, timeout_ms: int = 5000):
        self.timeout_ms = timeout_ms
        self.start_time = None

    def __enter__(self):
        self.start_time = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed = (time.time() - self.start_time) * 1000
        if elapsed > self.timeout_ms:
            raise TimeoutError(f"计算超时: {elapsed:.0f}ms > {self.timeout_ms}ms")
        return False


class PerformanceMetrics:
    def __init__(self):
        self.metrics = {
            "total_requests": 0,
            "failed_requests": 0,
            "fallback_count": 0,
            "hash_mismatch": 0,
            "latency_history": [],
        }

    def record_request(self, latency_ms: float, success: bool = True):
        self.metrics["total_requests"] += 1
        if not success:
            self.metrics["failed_requests"] += 1
        self.metrics["latency_history"].append(latency_ms)
        
        if len(self.metrics["latency_history"]) > 1000:
            self.metrics["latency_history"] = self.metrics["latency_history"][-500:]

    def record_fallback(self):
        self.metrics["fallback_count"] += 1

    def record_hash_mismatch(self):
        self.metrics["hash_mismatch"] += 1

    def get_stats(self) -> dict:
        latencies = self.metrics["latency_history"]
        if not latencies:
            p50 = p95 = p99 = 0
        else:
            sorted_lat = sorted(latencies)
            p50 = sorted_lat[int(len(sorted_lat) * 0.5)]
            p95 = sorted_lat[int(len(sorted_lat) * 0.95)]
            p99 = sorted_lat[int(len(sorted_lat) * 0.99)]

        total = self.metrics["total_requests"]
        success_rate = 100.0
        if total > 0:
            success_rate = (1 - self.metrics["failed_requests"] / total) * 100

        return {
            "total_requests": total,
            "success_rate_pct": round(success_rate, 2),
            "fallback_count": self.metrics["fallback_count"],
            "hash_mismatch": self.metrics["hash_mismatch"],
            "latency_p50_ms": round(p50, 1),
            "latency_p95_ms": round(p95, 1),
            "latency_p99_ms": round(p99, 1),
        }


metrics = PerformanceMetrics()
rate_limiter = RateLimiter(max_requests=200, window_seconds=60)
