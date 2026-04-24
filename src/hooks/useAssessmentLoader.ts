export type StandardAssessmentId = string
export type AssessmentMeta = any

import { useState, useEffect, useCallback, useRef } from 'react'
import { loadAssessment, getAssessmentMeta } from '../utils/dynamicAssessmentLoader'
import { assessmentCache } from '../utils/assessmentCache'
import { indexedDBCache } from '../utils/indexedDBCache'

interface UseAssessmentLoaderOptions {
  preload?: boolean
  usePersistence?: boolean
}

interface UseAssessmentLoaderResult {
  assessment: any | null
  meta: AssessmentMeta | null
  loading: boolean
  error: Error | null
  progress: number
  reload: () => Promise<void>
  cacheHit: 'memory' | 'persistence' | 'miss' | null
}

export function useAssessmentLoader(
  id: StandardAssessmentId | null,
  options: UseAssessmentLoaderOptions = {}
): UseAssessmentLoaderResult {
  const { preload = false, usePersistence = true } = options
  
  const [assessment, setAssessment] = useState<any | null>(null)
  const [meta, setMeta] = useState<AssessmentMeta | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [progress, setProgress] = useState(0)
  const [cacheHit, setCacheHit] = useState<'memory' | 'persistence' | 'miss' | null>(null)
  
  const loadingRef = useRef(false)

  const load = useCallback(async (assessmentId: StandardAssessmentId) => {
    if (loadingRef.current) return
    loadingRef.current = true

    setLoading(true)
    setError(null)
    setProgress(10)

    try {
      setMeta(getAssessmentMeta(assessmentId) || null)
      setProgress(20)

      if (assessmentCache.has(assessmentId)) {
        setCacheHit('memory')
        const data = assessmentCache.get(assessmentId)
        setAssessment(data)
        setProgress(100)
        loadingRef.current = false
        setLoading(false)
        return
      }
      setProgress(30)

      if (usePersistence && indexedDBCache.support()) {
        const persisted = await indexedDBCache.getAssessment(assessmentId)
        if (persisted) {
          setCacheHit('persistence')
          assessmentCache.set(assessmentId, persisted)
          setAssessment(persisted)
          setProgress(100)
          loadingRef.current = false
          setLoading(false)
          return
        }
      }
      setProgress(50)

      setCacheHit('miss')
      
      const data = await loadAssessment(assessmentId)
      setProgress(80)

      assessmentCache.set(assessmentId, data)
      
      if (usePersistence && indexedDBCache.support()) {
        indexedDBCache.putAssessment(assessmentId, data)
      }

      setAssessment(data)
      setProgress(100)
    } catch (e) {
      setError(e as Error)
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }, [usePersistence])

  useEffect(() => {
    if (!id) return
    load(id)
  }, [id, load])

  useEffect(() => {
    if (preload && id) {
      load(id)
    }
  }, [])

  const reload = useCallback(async () => {
    if (!id) return
    await load(id)
  }, [id, load])

  return {
    assessment,
    meta,
    loading,
    error,
    progress,
    reload,
    cacheHit,
  }
}

export function usePreloadAssessments() {
  const preloadedRef = useRef<Set<string>>(new Set())

  const preload = useCallback((ids: StandardAssessmentId[]) => {
    ids.forEach(id => {
      if (!preloadedRef.current.has(id)) {
        preloadedRef.current.add(id)
        loadAssessment(id).catch(() => {})
      }
    })
  }, [])

  const preloadByCategory = useCallback((category: string) => {
    import('../data/assessments').then((mod: any) => {
      const ids = mod.standardAssessmentList
        .filter((a: any) => a.category === category)
        .map((a: any) => a.id as StandardAssessmentId)
      preload(ids)
    })
  }, [preload])

  return { preload, preloadByCategory }
}
