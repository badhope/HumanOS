import { LRUCache, createCacheKey } from './performance'

interface CacheOptions {
  ttl?: number
  persistent?: boolean
  version?: string
}

interface CacheEntry<T> {
  value: T
  timestamp: number
  ttl: number
  version: string
}

const CACHE_VERSION = 'v2'
const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000

class TieredCache {
  private l1: LRUCache<string, any>
  private pendingWrites: Map<string, CacheEntry<any>>
  private writeTimeout: number | null = null

  constructor() {
    this.l1 = new LRUCache(200)
    this.pendingWrites = new Map()
  }

  get<T>(key: string): T | null {
    const l1Value = this.l1.get(key)
    if (l1Value !== undefined) {
      return this.validateEntry(l1Value)
    }

    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const entry = JSON.parse(stored) as CacheEntry<T>
        const valid = this.validateEntry(entry)
        if (valid !== null) {
          this.l1.set(key, entry)
          return valid
        }
        localStorage.removeItem(key)
      }
    } catch (e) {
    }

    return null
  }

  set<T>(key: string, value: T, options: CacheOptions = {}): void {
    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      ttl: options.ttl || DEFAULT_TTL,
      version: options.version || CACHE_VERSION,
    }

    this.l1.set(key, entry)

    if (options.persistent) {
      this.pendingWrites.set(key, entry)
      this.scheduleWrite()
    }
  }

  has(key: string): boolean {
    if (this.l1.has(key)) return true
    try {
      return localStorage.getItem(key) !== null
    } catch {
      return false
    }
  }

  delete(key: string): void {
    try {
      (this.l1 as any).cache.delete(key)
    } catch {}
    this.pendingWrites.delete(key)
    try {
      localStorage.removeItem(key)
    } catch {}
  }

  clear(pattern?: string): void {
    if (!pattern) {
      this.l1.clear()
      this.pendingWrites.clear()
      return
    }

    const regex = new RegExp(pattern)
    Array.from((this.l1 as any).cache.keys()).forEach(k => {
      const keyStr = String(k)
      if (regex.test(keyStr)) {
        try {
          (this.l1 as any).cache.delete(k)
        } catch {}
      }
    })
  }

  private scheduleWrite(): void {
    if (this.writeTimeout !== null) return
    this.writeTimeout = window.setTimeout(() => {
      this.flushWrites()
      this.writeTimeout = null
    }, 1000)
  }

  private flushWrites(): void {
    this.pendingWrites.forEach((entry, key) => {
      try {
        localStorage.setItem(key, JSON.stringify(entry))
      } catch (e) {
        try {
          const keys = Object.keys(localStorage)
            .filter(k => k.startsWith('cache:'))
            .sort((a, b) => {
              const ea = JSON.parse(localStorage.getItem(a) || '{}')
              const eb = JSON.parse(localStorage.getItem(b) || '{}')
              return ea.timestamp - eb.timestamp
            })
          keys.slice(0, 20).forEach(k => localStorage.removeItem(k))
          localStorage.setItem(key, JSON.stringify(entry))
        } catch {}
      }
    })
    this.pendingWrites.clear()
  }

  private validateEntry<T>(entry: CacheEntry<T>): T | null {
    if (entry.version !== CACHE_VERSION) {
      return null
    }
    if (Date.now() - entry.timestamp > entry.ttl) {
      return null
    }
    return entry.value
  }

  get stats() {
    return {
      l1Size: this.l1.size,
      pendingWrites: this.pendingWrites.size,
    }
  }
}

export const cache = new TieredCache()

export function withCache<T extends (...args: any[]) => any>(
  fn: T,
  options: CacheOptions & { keyPrefix: string }
): T {
  return ((...args: any[]) => {
    const key = `cache:${options.keyPrefix}:${createCacheKey(...args)}`
    const cached = cache.get(key)
    if (cached !== null) {
      return cached
    }
    const result = fn(...args)
    if (result instanceof Promise) {
      return result.then(value => {
        cache.set(key, value, options)
        return value
      })
    }
    cache.set(key, result, options)
    return result
  }) as T
}

export function cachedFn<P extends any[], R>(
  keyPrefix: string,
  fn: (...args: P) => R,
  options: CacheOptions = { persistent: true }
): (...args: P) => R {
  return (...args: P) => {
    const key = `cache:${keyPrefix}:${createCacheKey(...args)}`
    const cached = cache.get(key)
    if (cached !== null) {
      return cached as R
    }
    const result = fn(...args)
    cache.set(key, result, { ...options, persistent: true })
    return result
  }
}
