/**
 * ==============================================
 * 🎮 测评模式切换Hook - 世界观引擎核心
 * ==============================================
 * 【功能定位】
 * 意识形态九宫格的多维度渲染引擎
 * 支持：普通人/思想家/政治家/游戏人 四种世界观
 * 
 * 【核心机制】
 * - 每种模式有不同的题目权重配置
 * - 根据玩家选择的模式动态过滤题目
 * - 每种模式生成不同的维度解读
 * - 支持维度自定义题目数量
 */

import { useState, useCallback, useEffect } from 'react'
import { AssessmentMode, ModeConfiguration } from '@data/political-ideology/mode-configuration'
import { MODE_CONFIGURATIONS } from '@data/political-ideology/mode-configuration'
import { STANDARDIZED_QUESTIONS } from '@data/political-ideology/standardized-question-bank'
import { generateModeAwareIdeologySpectrum } from '@data/political-ideology/ideology-weighted-calculator'

interface UseAssessmentModeReturn {
  mode: AssessmentMode
  config: ModeConfiguration
  setMode: (mode: AssessmentMode) => void
  questions: typeof STANDARDIZED_QUESTIONS
  filteredQuestions: typeof STANDARDIZED_QUESTIONS
  questionDimensions: Record<string, string>
  getQuestionsByDimension: (dimension: string) => typeof STANDARDIZED_QUESTIONS
}

export function useAssessmentMode(
  initialMode: AssessmentMode = 'normal'
): UseAssessmentModeReturn {
  const [mode, setMode] = useState<AssessmentMode>(initialMode)
  const [filteredQuestions, setFilteredQuestions] = useState<typeof STANDARDIZED_QUESTIONS>([])

  const config = MODE_CONFIGURATIONS[mode]

  const filterQuestionsByMode = useCallback((targetMode: AssessmentMode) => {
    const targetConfig = MODE_CONFIGURATIONS[targetMode]
    const result: typeof STANDARDIZED_QUESTIONS = []

    Object.entries(targetConfig.questionConfig.questionsPerDimension).forEach(([dimension, count]) => {
      const dimensionQuestions = STANDARDIZED_QUESTIONS.filter(q => q.dimension === dimension)
      const selected = dimensionQuestions.slice(0, count as number)
      result.push(...selected)
    })

    if (targetConfig.questionConfig.randomizeOrder) {
      return result.sort(() => Math.random() - 0.5)
    }

    return result
  }, [])

  useEffect(() => {
    const questions = filterQuestionsByMode(mode)
    setFilteredQuestions(questions)
  }, [mode, filterQuestionsByMode])

  const questionDimensions = Object.fromEntries(
    filteredQuestions.map(q => [q.id, q.dimension])
  )

  const getQuestionsByDimension = useCallback((dimension: string) => {
    return filteredQuestions.filter(q => q.dimension === dimension)
  }, [filteredQuestions])

  return {
    mode,
    config,
    setMode,
    questions: STANDARDIZED_QUESTIONS,
    filteredQuestions,
    questionDimensions,
    getQuestionsByDimension,
  }
}

export function usePerformanceOptimizer() {
  const [metrics, setMetrics] = useState({
    calculationTime: 0,
    memoryUsage: 0,
    questionCount: 0,
  })

  const measurePerformance = useCallback(<T>(
    fn: () => T,
    label: string = 'calculation'
  ): T => {
    const start = performance.now()
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0

    const result = fn()

    const end = performance.now()
    const endMemory = (performance as any).memory?.usedJSHeapSize || 0

    setMetrics(prev => ({
      ...prev,
      calculationTime: end - start,
      memoryUsage: (endMemory - startMemory) / 1024 / 1024,
    }))

    return result
  }, [])

  const batchProcessAnswers = useCallback((
    answers: Record<string, number>,
    batchSize: number = 10
  ): Record<string, number> => {
    const entries = Object.entries(answers)
    const result: Record<string, number> = {}

    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize)
      batch.forEach(([key, value]) => {
        result[key] = value
      })
    }

    return result
  }, [])

  const memoizedSimilarity = useCallback(
    () => new Map<string, number>(),
    []
  )

  return {
    metrics,
    measurePerformance,
    batchProcessAnswers,
    memoizedSimilarity,
  }
}

export function useAlgorithmConsistency() {
  const verifyConsistency = useCallback((
    answers: Record<string, number>,
    questionDimensions: Record<string, string>,
    iterations: number = 5
  ): { isConsistent: boolean; variance: number; results: number[] } => {
    const results: number[] = []

    for (let i = 0; i < iterations; i++) {
      const result = generateModeAwareIdeologySpectrum(answers, questionDimensions, 'professional')
      const avgSimilarity = result.ideologyMatches.reduce((sum: number, m: any) => sum + m.similarityScore, 0) / result.ideologyMatches.length
      results.push(avgSimilarity)
    }

    const mean = results.reduce((a, b) => a + b, 0) / results.length
    const variance = results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length

    return {
      isConsistent: variance < 0.001,
      variance,
      results,
    }
  }, [])

  const compareModes = useCallback((
    answers: Record<string, number>,
    questionDimensions: Record<string, string>
  ) => {
    const modes: AssessmentMode[] = ['normal', 'advanced', 'professional']
    const comparisons = modes.map(mode => {
      const result = generateModeAwareIdeologySpectrum(answers, questionDimensions, mode)
      return {
        mode,
        topMatch: result.ideologyMatches[0],
        calculationTime: 0,
        matchCount: result.ideologyMatches.length,
      }
    })

    return comparisons
  }, [])

  return {
    verifyConsistency,
    compareModes,
  }
}
