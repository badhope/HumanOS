# =============================================================================
#  高性能缓存层 - 支持内存缓存 + Redis
# =============================================================================
from functools import lru_cache, wraps
from typing import Any, Callable, Optional
import time
import hashlib
import json
import logging
from dataclasses import dataclass, field
from collections import OrderedDict

logger = logging.getLogger(__name__)

try:
    import redis
    REDIS_AVAILABLE = True
except ImportError:
    REDIS_AVAILABLE = False

@dataclass
class CacheStats:
    hits: int = 0
    misses: int = 0
    sets: int = 0
    evictions: int = 0

class LRUCache:
    def __init__(self, maxsize: int = 1000, ttl: int = 3600):
        self.maxsize = maxsize
        self.ttl = ttl
        self.cache: OrderedDict[str, tuple[Any, float]] = OrderedDict()
        self.stats = CacheStats()

    def get(self, key: str) -> Optional[Any]:
        if key not in self.cache:
            self.stats.misses += 1
            return None

        value, expire_at = self.cache[key]
        
        if time.time() > expire_at:
            del self.cache[key]
            self.stats.evictions += 1
            self.stats.misses += 1
            return None

        self.cache.move_to_end(key)
        self.stats.hits += 1
        return value

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        if len(self.cache) >= self.maxsize:
            self.cache.popitem(last=False)
            self.stats.evictions += 1

        self.cache[key] = (value, time.time() + (ttl or self.ttl))
        self.stats.sets += 1

    def clear(self) -> None:
        self.cache.clear()
        self.stats = CacheStats()

    def get_stats(self) -> dict:
        total = self.stats.hits + self.stats.misses
        hit_rate = (self.stats.hits / total * 100) if total > 0 else 0
        return {
            "hits": self.stats.hits,
            "misses": self.stats.misses,
            "sets": self.stats.sets,
            "evictions": self.stats.evictions,
            "size": len(self.cache),
            "max_size": self.maxsize,
            "hit_rate": f"{hit_rate:.1f}%",
        }

class RedisCache:
    def __init__(
        self,
        url: str = "redis://localhost:6379/0",
        prefix: str = "MindMirror:",
        default_ttl: int = 3600,
    ):
        self.prefix = prefix
        self.default_ttl = default_ttl
        self.client: Optional[redis.Redis] = None
        
        if REDIS_AVAILABLE:
            try:
                self.client = redis.from_url(url)
                self.client.ping()
                logger.info("✅ Redis 缓存已连接")
            except Exception as e:
                logger.warning(f"⚠️  Redis 连接失败，降级到内存缓存: {e}")
                self.client = None

    def _key(self, key: str) -> str:
        return f"{self.prefix}{key}"

    def get(self, key: str) -> Optional[Any]:
        if not self.client:
            return None
        
        try:
            data = self.client.get(self._key(key))
            if data:
                return json.loads(data)
        except Exception:
            pass
        return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        if not self.client:
            return False
        
        try:
            self.client.setex(
                self._key(key),
                ttl or self.default_ttl,
                json.dumps(value),
            )
            return True
        except Exception:
            return False

    def clear_pattern(self, pattern: str) -> int:
        if not self.client:
            return 0
        
        try:
            keys = self.client.keys(self._key(pattern))
            if keys:
                return self.client.delete(*keys)
        except Exception:
            pass
        return 0

class TieredCache:
    def __init__(
        self,
        memory_maxsize: int = 1000,
        memory_ttl: int = 600,
        redis_url: str = "redis://localhost:6379/0",
        redis_ttl: int = 3600,
    ):
        self.l1 = LRUCache(maxsize=memory_maxsize, ttl=memory_ttl)
        self.l2 = RedisCache(url=redis_url, default_ttl=redis_ttl)
        self.use_l2 = self.l2.client is not None

    def get(self, key: str) -> Optional[Any]:
        value = self.l1.get(key)
        if value is not None:
            return value

        if self.use_l2:
            value = self.l2.get(key)
            if value is not None:
                self.l1.set(key, value)
                return value

        return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        self.l1.set(key, value, ttl)
        if self.use_l2:
            self.l2.set(key, value, ttl)

    def get_stats(self) -> dict:
        return {
            "l1": self.l1.get_stats(),
            "l2_enabled": self.use_l2,
        }

memory_cache = LRUCache(maxsize=5000, ttl=1800)
tiered_cache = TieredCache(memory_maxsize=1000, memory_ttl=300)

def make_hash_key(*args, **kwargs) -> str:
    key = json.dumps([args, sorted(kwargs.items())], sort_keys=True)
    return hashlib.md5(key.encode()).hexdigest()

def cached(
    ttl: int = 3600,
    key_prefix: str = "",
    cache_type: str = "memory",
):
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            cache = tiered_cache if cache_type == "tiered" else memory_cache
            
            cache_key = f"{key_prefix}:{func.__name__}:{make_hash_key(*args, **kwargs)}"
            
            result = cache.get(cache_key)
            if result is not None:
                return result

            result = await func(*args, **kwargs)
            cache.set(cache_key, result, ttl)
            return result

        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            cache = tiered_cache if cache_type == "tiered" else memory_cache
            
            cache_key = f"{key_prefix}:{func.__name__}:{make_hash_key(*args, **kwargs)}"
            
            result = cache.get(cache_key)
            if result is not None:
                return result

            result = func(*args, **kwargs)
            cache.set(cache_key, result, ttl)
            return result

        import asyncio
        if asyncio.iscoroutinefunction(func):
            return async_wrapper
        return sync_wrapper

    return decorator

def invalidate_pattern(pattern: str) -> None:
    if tiered_cache.use_l2:
        tiered_cache.l2.clear_pattern(pattern)

def get_cache_stats() -> dict:
    return {
        "memory": memory_cache.get_stats(),
        "tiered": tiered_cache.get_stats(),
    }
