type StandardAssessmentId = string

interface CacheEntry<T> {
  data: T
  timestamp: number
  hitCount: number
}

interface CacheStats {
  hits: number
  misses: number
  size: number
}

class LRUCache<K, V> {
  private cache: Map<K, CacheEntry<V>>
  private maxSize: number
  private ttl: number
  private stats: CacheStats

  constructor(maxSize: number = 100, ttl: number = 3600000) {
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttl
    this.stats = { hits: 0, misses: 0, size: 0 }
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key)
    
    if (!entry) {
      this.stats.misses++
      return undefined
    }

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      this.stats.misses++
      return undefined
    }

    this.stats.hits++
    entry.hitCount++
    
    this.cache.delete(key)
    this.cache.set(key, entry)

    return entry.data as V
  }

  set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value as K
      this.cache.delete(firstKey)
    }

    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
      hitCount: 1
    })
    this.stats.size = this.cache.size
  }

  has(key: K): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      return false
    }
    return true
  }

  clear(): void {
    this.cache.clear()
    this.stats = { hits: 0, misses: 0, size: 0 }
  }

  getStats(): CacheStats {
    return { 
      ...this.stats, 
      hitRate: this.stats.hits + this.stats.misses > 0 
        ? (this.stats.hits / (this.stats.hits + this.stats.misses) * 100).toFixed(1) + '%'
        : 'N/A',
      size: this.cache.size
    } as any
  }

  getKeys(): K[] {
    return Array.from(this.cache.keys())
  }
}

export { LRUCache }

export const assessmentCache = new LRUCache<StandardAssessmentId, any>(50, 7200000)
export const calculationCache = new LRUCache<string, any>(200, 300000)
export const questionCache = new LRUCache<string, any>(500, 86400000)

if (import.meta.env.DEV) {
  const w = window as any
  w.assessmentCache = assessmentCache
  w.calculationCache = calculationCache
  w.questionCache = questionCache
}
