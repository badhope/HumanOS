import { memo, useMemo, useCallback, useEffect, useRef } from 'react'

type AnyFunction = (...args: any[]) => any

export function shallowEqual(objA: any, objB: any): boolean {
  if (Object.is(objA, objB)) return true

  if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false
    if (!Object.is(objA[key], objB[key])) return false
  }

  return true
}

export function memoEqual<T extends React.ComponentType<any>>(
  Component: T,
  customEqual?: (prev: any, next: any) => boolean
) {
  return memo(Component, customEqual || shallowEqual)
}

export function memoWithKeys<T extends React.ComponentType<any>>(
  Component: T,
  keys: string[]
) {
  return memo(Component, (prevProps, nextProps) => {
    return keys.every(key => Object.is(prevProps[key], nextProps[key]))
  })
}

export function useStableCallback<T extends AnyFunction>(callback: T): T {
  const ref = useRef<T>(callback)
  useEffect(() => {
    ref.current = callback
  })
  return useCallback(((...args: any[]) => ref.current(...args)) as T, [])
}

export function useDeepMemo<T>(factory: () => T, deps: any[]): T {
  const ref = useRef<{ deps: any[]; value: T }>()

  if (!ref.current || !deps.every((d, i) => Object.is(d, ref.current!.deps[i]))) {
    ref.current = { deps, value: factory() }
  }

  return ref.current.value
}

const TIMING_ENABLED = false

export function withTiming<T extends AnyFunction>(
  fn: T,
  label: string
): T {
  if (!__TIMING_ENABLED) return fn

  return ((...args: any[]) => {
    const start = performance.now()
    const result = fn(...args)
    const end = performance.now()
    console.log(`[PERF: ${label} took ${(end - start).toFixed(2)}ms`)
    return result
  }) as T
}

export function useTiming(label: string, deps: any[] = []) {
  if (!__TIMING_ENABLED) return

  useEffect(() => {
    const start = performance.now()
    return () => {
      const end = performance.now()
      console.log(`[PERF] ${label} lifecycle: ${(end - start).toFixed(2)}ms`)
    }
  }, deps)
}

export class LRUCache<K, V> {
  private cache: Map<K, V>
  private maxSize: number

  constructor(maxSize: number = 100) {
    this.cache = new Map()
    this.maxSize = maxSize
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value !== undefined) {
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value as K
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      }
    }
    this.cache.set(key, value)
  }

  has(key: K): boolean {
    return this.cache.has(key)
  }

  get size(): number {
    return this.cache.size
  }

  clear(): void {
    this.cache.clear()
  }
}

export function createCacheKey(...parts: any[]): string {
  return parts.map(p => {
    if (typeof p === 'object' && p !== null) {
      if (Array.isArray(p)) {
        return p.length > 10 ? `arr[${p.length}]` : p.join(',')
      }
      return JSON.stringify(p)
    }
    return String(p)
  }).join(':')
}

declare const __TIMING_ENABLED: boolean
