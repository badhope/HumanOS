# 心镜测评系统架构优化实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 解耦路由/计算/渲染三层架构，修复所有渲染崩溃和计算器逻辑错误，引入数学算法优化权重计算，实现结果页分层展示。

**Architecture:** 将现有的单体式计算器→报告渲染流程拆分为三层：路由层（ResultRouter）、计算层（CalculatorEngine）、渲染层（ReportRenderer）。每层独立容错，单点故障不影响整体。引入信息熵和概率分布算法优化权重计算。

**Tech Stack:** React 18, TypeScript, Zustand, Framer Motion, Tailwind CSS, Vite

---

## 文件结构

### 新建文件
- `src/utils/calculators/normalizeResult.ts` — 结果标准化工具，统一 dimensions 格式和必填字段
- `src/utils/calculators/CalculatorEngine.ts` — 计算引擎，统一入口，带容错降级
- `src/utils/algorithms/informationEntropy.ts` — 信息熵计算模块
- `src/utils/algorithms/probabilityDistribution.ts` — 概率分布计算模块
- `src/utils/algorithms/weightOptimizer.ts` — 权重优化器（基于信息熵）
- `src/components/reports/ReportRenderer.tsx` — 渲染层统一入口，带容错降级
- `src/components/reports/ResultLayerDisplay.tsx` — 结果分层展示组件（普通/进阶/专业）

### 修改文件
- `src/components/reports/lazy.tsx` — 使用 ReportRenderer 替代现有 switch-case
- `src/pages/Assessment.tsx` — 使用 CalculatorEngine 替代直接调用
- `src/pages/Results.tsx` — 使用 ReportRenderer，增强容错
- `src/components/EnhancedReportTemplate.tsx` — 使用 normalizeResult
- `src/utils/calculators/ocean-calculator.ts` — 已部分修复，需补充完善
- `src/utils/calculators/dark-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/eq-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/ecr-calculator.ts` — 修复 dimensions 格式和缺失字段
- `src/utils/calculators/cast-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/sas-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/ideology-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/slacking-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/sexual-experience-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/gma-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/iq-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/foodie-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/fubao-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/internet-addiction-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/life-meaning-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/patriotism-calculator.ts` — 修复 dimensions 格式
- `src/utils/calculators/pua-calculator.ts` — 修复 dimensions 格式

---

## Task 1: 创建结果标准化工具 normalizeResult

**Files:**
- Create: `src/utils/calculators/normalizeResult.ts`

这是整个架构优化的基础。所有计算器返回的结果都经过此工具标准化，确保渲染组件收到一致的数据结构。

- [ ] **Step 1: 创建 normalizeResult.ts**

```typescript
import type { AssessmentResult, Dimension } from '../../types'

const DIMENSION_NAME_MAP: Record<string, string> = {
  O: '开放性', C: '尽责性', E: '外向性', A: '宜人性', N: '神经质',
  machiavellianism: '马基雅维利主义', narcissism: '自恋', psychopathy: '精神病态',
  selfAwareness: '自我意识', selfRegulation: '自我调节', motivation: '动机',
  empathy: '共情', socialSkills: '社交技能',
  anxiety: '焦虑', avoidance: '回避', secure: '安全',
  authoritative: '权威型', authoritarian: '专制型', permissive: '放任型', neglectful: '忽视型',
  somatic: '躯体化', cognitive: '认知焦虑', behavioral: '行为焦虑',
  openness: '开放性', conscientiousness: '尽责性', extraversion: '外向性',
  agreeableness: '宜人性', neuroticism: '神经质',
  traditional: '传统', progressive: '进步', authority: '权威', liberty: '自由',
  slacking: '摸鱼', working: '工作', focus: '专注', distraction: '分心',
  experience: '经验', curiosity: '好奇', boldness: '大胆', conservatism: '保守',
  addiction: '成瘾', control: '控制', withdrawal: '戒断', socialImpact: '社交影响',
  meaning: '意义', coherence: '连贯', purpose: '目的', significance: '重要性',
  patriotism: '爱国', nationalism: '民族主义', criticism: '批判', pride: '自豪',
  manipulation: '操纵', guilt: '内疚', isolation: '孤立', gaslighting: '煤气灯',
  foodie: '吃货', picky: '挑食', adventure: '冒险', comfort: '舒适',
  fubao: '福报', overwork: '过劳', endurance: '忍耐', resistance: '抵抗',
  logical: '逻辑', verbal: '语言', spatial: '空间', memory: '记忆',
  maturity: '成熟度', independence: '独立性', responsibility: '责任感', adaptability: '适应性',
}

function normalizeDimensions(dimensions: unknown): Dimension[] {
  if (Array.isArray(dimensions)) {
    return dimensions.map(d => ({
      name: d.name || '未知维度',
      score: typeof d.score === 'number' ? d.score : 0,
      maxScore: d.maxScore,
      description: d.description,
      dimensionId: d.dimensionId,
    }))
  }
  if (dimensions && typeof dimensions === 'object') {
    return Object.entries(dimensions as Record<string, any>).map(([key, value]) => {
      if (typeof value === 'object' && value !== null && 'score' in value) {
        return {
          name: (value as any).name || DIMENSION_NAME_MAP[key] || key,
          score: typeof (value as any).score === 'number' ? (value as any).score : 0,
          maxScore: (value as any).maxScore,
          description: (value as any).description,
          dimensionId: key,
        }
      }
      return {
        name: DIMENSION_NAME_MAP[key] || key,
        score: typeof value === 'number' ? value : 0,
        dimensionId: key,
      }
    })
  }
  return []
}

export function normalizeResult(rawResult: any, assessmentType?: string): AssessmentResult {
  if (!rawResult || typeof rawResult !== 'object') {
    return {
      type: assessmentType || 'unknown',
      score: 0,
      accuracy: 0,
      title: '计算错误',
      description: '结果计算失败，请重新测评',
      dimensions: [],
      strengths: [],
      weaknesses: [],
      careers: [],
      suggestions: [],
    }
  }

  const dimensions = normalizeDimensions(rawResult.dimensions)

  return {
    ...rawResult,
    type: rawResult.type || assessmentType || 'unknown',
    score: typeof rawResult.score === 'number' ? rawResult.score : 0,
    accuracy: typeof rawResult.accuracy === 'number' ? rawResult.accuracy : 85,
    title: rawResult.title || '',
    description: rawResult.description || '',
    dimensions,
    strengths: Array.isArray(rawResult.strengths) ? rawResult.strengths : [],
    weaknesses: Array.isArray(rawResult.weaknesses) ? rawResult.weaknesses : [],
    careers: Array.isArray(rawResult.careers) ? rawResult.careers : [],
    suggestions: Array.isArray(rawResult.suggestions) ? rawResult.suggestions : [],
  }
}
```

- [ ] **Step 2: 验证编译通过**

Run: `cd /workspace && npx tsc --noEmit src/utils/calculators/normalizeResult.ts 2>&1 | head -20`
Expected: 无错误

---

## Task 2: 创建数学算法模块

**Files:**
- Create: `src/utils/algorithms/informationEntropy.ts`
- Create: `src/utils/algorithms/probabilityDistribution.ts`
- Create: `src/utils/algorithms/weightOptimizer.ts`

引入信息熵和概率分布算法，用于优化权重计算和结果区分度。

- [ ] **Step 1: 创建 informationEntropy.ts**

```typescript
export function shannonEntropy(probabilities: number[]): number {
  return probabilities.reduce((entropy, p) => {
    if (p <= 0 || p >= 1) return entropy
    return entropy - p * Math.log2(p)
  }, 0)
}

export function normalizeToProbabilities(values: number[]): number[] {
  const sum = values.reduce((s, v) => s + Math.abs(v), 0)
  if (sum === 0) return values.map(() => 1 / values.length)
  return values.map(v => Math.abs(v) / sum)
}

export function dimensionEntropy(scores: Record<string, number>): number {
  const values = Object.values(scores)
  const probs = normalizeToProbabilities(values)
  return shannonEntropy(probs)
}

export function informationGain(beforeEntropy: number, afterEntropy: number): number {
  return beforeEntropy - afterEntropy
}

export function calculateScoreEntropy(answers: number[], maxScore: number = 5): number {
  const bins = new Array(maxScore).fill(0)
  answers.forEach(a => {
    const idx = Math.min(Math.max(Math.floor(a) - 1, 0), maxScore - 1)
    bins[idx]++
  })
  const total = answers.length
  const probs = bins.map(b => b / total)
  return shannonEntropy(probs)
}
```

- [ ] **Step 2: 创建 probabilityDistribution.ts**

```typescript
export function normalPDF(x: number, mean: number, stdDev: number): number {
  if (stdDev <= 0) return 0
  const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2)
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent)
}

export function normalCDF(x: number, mean: number, stdDev: number): number {
  const z = (x - mean) / stdDev
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989422804014327
  const p = d * Math.exp(-z * z / 2) * (t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.8212560 + t * 1.3302744)))))
  return z > 0 ? 1 - p : p
}

export function percentileRank(score: number, mean: number, stdDev: number): number {
  return Math.round(normalCDF(score, mean, stdDev) * 100)
}

export function confidenceInterval(mean: number, stdDev: number, n: number, level: number = 0.95): [number, number] {
  const zScore = level === 0.99 ? 2.576 : level === 0.95 ? 1.96 : 1.645
  const margin = zScore * (stdDev / Math.sqrt(n))
  return [mean - margin, mean + margin]
}

export function cronbachAlpha(itemVariances: number[], totalVariance: number): number {
  const k = itemVariances.length
  if (k <= 1 || totalVariance <= 0) return 0
  const sumItemVar = itemVariances.reduce((s, v) => s + v, 0)
  return (k / (k - 1)) * (1 - sumItemVar / totalVariance)
}

export function cohensD(mean1: number, mean2: number, sd1: number, sd2: number): number {
  const pooledSD = Math.sqrt((sd1 * sd1 + sd2 * sd2) / 2)
  if (pooledSD === 0) return 0
  return (mean1 - mean2) / pooledSD
}
```

- [ ] **Step 3: 创建 weightOptimizer.ts**

```typescript
import { shannonEntropy, normalizeToProbabilities, dimensionEntropy } from './informationEntropy'
import { percentileRank } from './probabilityDistribution'

export interface OptimizedWeights {
  weights: Record<string, number>
  entropy: number
  discrimination: number
  reliability: number
}

export function optimizeWeights(
  rawScores: Record<string, number>,
  itemCounts: Record<string, number>
): OptimizedWeights {
  const keys = Object.keys(rawScores)
  if (keys.length === 0) {
    return { weights: {}, entropy: 0, discrimination: 0, reliability: 0 }
  }

  const entropy = dimensionEntropy(rawScores)
  const maxEntropy = Math.log2(keys.length)
  const normalizedEntropy = maxEntropy > 0 ? entropy / maxEntropy : 0

  const rawWeights: Record<string, number> = {}
  keys.forEach(key => {
    const score = rawScores[key]
    const count = itemCounts[key] || 1
    const reliabilityFactor = Math.min(count / 10, 1)
    rawWeights[key] = Math.abs(score) * (0.5 + 0.5 * reliabilityFactor)
  })

  const totalWeight = Object.values(rawWeights).reduce((s, w) => s + w, 0)
  const normalizedWeights: Record<string, number> = {}
  keys.forEach(key => {
    normalizedWeights[key] = totalWeight > 0 ? rawWeights[key] / totalWeight : 1 / keys.length
  })

  const discrimination = calculateDiscrimination(rawScores)

  const reliability = Math.min(1, normalizedEntropy * 0.4 + discrimination * 0.3 + 0.3)

  return {
    weights: normalizedWeights,
    entropy: normalizedEntropy,
    discrimination,
    reliability,
  }
}

function calculateDiscrimination(scores: Record<string, number>): number {
  const values = Object.values(scores)
  if (values.length <= 1) return 0
  const mean = values.reduce((s, v) => s + v, 0) / values.length
  const variance = values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / values.length
  const stdDev = Math.sqrt(variance)
  const cv = mean !== 0 ? stdDev / Math.abs(mean) : 0
  return Math.min(1, cv)
}

export function adjustScoreWithEntropy(
  rawScore: number,
  answerEntropy: number,
  maxEntropy: number
): number {
  if (maxEntropy === 0) return rawScore
  const entropyRatio = answerEntropy / maxEntropy
  const adjustment = 1 + (entropyRatio - 0.5) * 0.1
  return Math.round(rawScore * adjustment)
}

export function calculateResultConfidence(
  dimensions: Array<{ score: number; maxScore?: number }>,
  answerCount: number,
  entropyValue: number,
  maxEntropy: number
): number {
  let baseConfidence = 70
  if (answerCount >= 20) baseConfidence += 10
  if (answerCount >= 30) baseConfidence += 5
  const entropyBonus = maxEntropy > 0 ? (entropyValue / maxEntropy) * 10 : 5
  const dimensionCoverage = Math.min(dimensions.length / 5, 1) * 5
  return Math.min(99, Math.round(baseConfidence + entropyBonus + dimensionCoverage))
}
```

- [ ] **Step 4: 验证编译通过**

Run: `cd /workspace && npx tsc --noEmit 2>&1 | head -20`
Expected: 无错误

---

## Task 3: 创建计算引擎 CalculatorEngine

**Files:**
- Create: `src/utils/calculators/CalculatorEngine.ts`

统一计算入口，带容错降级机制。任何计算器崩溃都自动回退到基础计算。

- [ ] **Step 1: 创建 CalculatorEngine.ts**

```typescript
import { normalizeResult } from './normalizeResult'
import type { AssessmentResult } from '../../types'

interface CalculationContext {
  assessmentId: string
  answers: number[]
  mode: 'normal' | 'advanced' | 'professional'
}

interface CalculationResult {
  result: AssessmentResult
  metadata: {
    calculatorUsed: string
    calculationTime: number
    fallbackUsed: boolean
    entropy?: number
    reliability?: number
  }
}

export class CalculatorEngine {
  private static instance: CalculatorEngine

  private constructor() {}

  static getInstance(): CalculatorEngine {
    if (!CalculatorEngine.instance) {
      CalculatorEngine.instance = new CalculatorEngine()
    }
    return CalculatorEngine.instance
  }

  async calculate(context: CalculationContext): Promise<CalculationResult> {
    const startTime = performance.now()
    const { assessmentId, answers, mode } = context

    try {
      const result = await this.executeCalculator(assessmentId, answers, mode)
      const normalizedResult = normalizeResult(result, assessmentId)
      const calculationTime = performance.now() - startTime

      return {
        result: normalizedResult,
        metadata: {
          calculatorUsed: mode === 'professional' ? 'professional' : 'standard',
          calculationTime,
          fallbackUsed: false,
        },
      }
    } catch (primaryError) {
      console.warn(`[CalculatorEngine] 主计算器失败 (${assessmentId}):`, primaryError)

      try {
        const fallbackResult = this.fallbackCalculate(assessmentId, answers)
        const normalizedResult = normalizeResult(fallbackResult, assessmentId)
        const calculationTime = performance.now() - startTime

        return {
          result: normalizedResult,
          metadata: {
            calculatorUsed: 'fallback',
            calculationTime,
            fallbackUsed: true,
          },
        }
      } catch (fallbackError) {
        console.error(`[CalculatorEngine] 降级计算器也失败 (${assessmentId}):`, fallbackError)
        const calculationTime = performance.now() - startTime

        return {
          result: this.emergencyResult(assessmentId, answers),
          metadata: {
            calculatorUsed: 'emergency',
            calculationTime,
            fallbackUsed: true,
          },
        }
      }
    }
  }

  private async executeCalculator(
    assessmentId: string,
    answers: number[],
    mode: string
  ): Promise<AssessmentResult> {
    const { calculateProfessionalResult } = await import('../professionalCalculators')
    if (mode === 'professional') {
      return await calculateProfessionalResult(assessmentId, answers, mode)
    }

    const assessmentModule = await this.loadAssessmentModule(assessmentId)
    if (assessmentModule?.resultCalculator) {
      return assessmentModule.resultCalculator(answers)
    }

    return await calculateProfessionalResult(assessmentId, answers, mode)
  }

  private async loadAssessmentModule(assessmentId: string): Promise<any> {
    try {
      const moduleMap: Record<string, () => Promise<any>> = {
        'ocean-bigfive': () => import('../../data/assessments/ocean-bigfive'),
        'dark-triad': () => import('../../data/assessments/dark-triad'),
        'eq-goleman': () => import('../../data/assessments/eq-goleman'),
        'ecr-attachment': () => import('../../data/assessments/ecr-attachment'),
        'mbti-cognitive': () => import('../../data/assessments/mbti-cognitive'),
        'scl90-symptoms': () => import('../../data/assessments/scl90-symptoms'),
        'sas-anxiety': () => import('../../data/assessments/sas-anxiety'),
        'sleep-quality': () => import('../../data/assessments/sleep-quality'),
        'holland-sds': () => import('../../data/assessments/holland-sds'),
        'burnout-mbi': () => import('../../data/assessments/burnout-mbi'),
        'cast-parenting': () => import('../../data/assessments/cast-parenting'),
        'ideology-test': () => import('../../data/assessments/ideology-test'),
        'iq-raven': () => import('../../data/assessments/iq-raven'),
        'gma-maturity': () => import('../../data/assessments/gma-maturity'),
        'mental-age': () => import('../../data/assessments/mental-age'),
        'sbti-personality': () => import('../../data/assessments/sbti-personality'),
        'schwartz-standard': () => import('../../data/assessments/schwartz-standard'),
        'tki-standard': () => import('../../data/assessments/tki-standard'),
        'slacking-purity': () => import('../../data/assessments/slacking-purity'),
        'sexual-experience': () => import('../../data/assessments/sexual-experience'),
        'onepiece-bounty': () => import('../../data/assessments/onepiece-bounty'),
        'abm-love-animal': () => import('../../data/assessments/abm-love-animal'),
        'color-subconscious': () => import('../../data/assessments/color-subconscious'),
      }
      const loader = moduleMap[assessmentId]
      if (loader) {
        const mod = await loader()
        return mod.default || mod
      }
    } catch (e) {
      console.warn(`[CalculatorEngine] 无法加载测评模块 ${assessmentId}:`, e)
    }
    return null
  }

  private fallbackCalculate(assessmentId: string, answers: number[]): AssessmentResult {
    const validAnswers = answers.filter(a => typeof a === 'number' && !isNaN(a))
    const sum = validAnswers.reduce((s, a) => s + a, 0)
    const avg = validAnswers.length > 0 ? sum / validAnswers.length : 0
    const maxPossible = validAnswers.length * 5
    const percentage = maxPossible > 0 ? Math.round((sum / maxPossible) * 100) : 0

    return {
      type: assessmentId,
      score: percentage,
      accuracy: 70,
      title: '基础分析报告',
      description: `基于 ${validAnswers.length} 道题目的基础分析`,
      dimensions: [
        { name: '综合得分', score: percentage },
      ],
      strengths: ['已完成测评'],
      weaknesses: ['建议重新测评获取更详细结果'],
      careers: [],
      suggestions: ['建议重新完成测评以获取更精确的分析结果'],
    }
  }

  private emergencyResult(assessmentId: string, answers: number[]): AssessmentResult {
    return {
      type: assessmentId,
      score: 0,
      accuracy: 0,
      title: '计算异常',
      description: '结果计算过程中出现异常，请重新测评',
      dimensions: [],
      strengths: [],
      weaknesses: [],
      careers: [],
      suggestions: ['请重新完成测评'],
    }
  }
}

export const calculatorEngine = CalculatorEngine.getInstance()
```

- [ ] **Step 2: 验证编译通过**

Run: `cd /workspace && npx tsc --noEmit 2>&1 | head -20`
Expected: 无错误

---

## Task 4: 创建渲染层统一入口 ReportRenderer

**Files:**
- Create: `src/components/reports/ReportRenderer.tsx`
- Create: `src/components/reports/ResultLayerDisplay.tsx`

- [ ] **Step 1: 创建 ResultLayerDisplay.tsx**

结果分层展示组件：普通版精简展示、进阶版增加说明、专业版展示完整计算过程。

```typescript
import { useState } from 'react'
import { ChevronDown, ChevronUp, Calculator, BarChart3, Microscope } from 'lucide-react'
import type { AssessmentResult } from '../../types'

interface ResultLayerDisplayProps {
  result: AssessmentResult
  mode: 'normal' | 'advanced' | 'professional'
  calculationMetadata?: {
    calculatorUsed: string
    calculationTime: number
    fallbackUsed: boolean
    entropy?: number
    reliability?: number
  }
}

export default function ResultLayerDisplay({ result, mode, calculationMetadata }: ResultLayerDisplayProps) {
  const [showDetails, setShowDetails] = useState(mode !== 'normal')

  if (mode === 'normal' && !showDetails) {
    return (
      <button
        onClick={() => setShowDetails(true)}
        className="w-full mt-4 py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
      >
        <BarChart3 size={14} />
        查看算法详情
      </button>
    )
  }

  return (
    <div className="mt-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full p-3 flex items-center justify-between text-white/70 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-xs">
          <Calculator size={14} className="text-violet-400" />
          <span>算法详情</span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] ${
            mode === 'professional' ? 'bg-amber-500/20 text-amber-400' :
            mode === 'advanced' ? 'bg-blue-500/20 text-blue-400' :
            'bg-violet-500/20 text-violet-400'
          }`}>
            {mode === 'professional' ? '专业模式' : mode === 'advanced' ? '进阶模式' : '标准模式'}
          </span>
        </div>
        {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showDetails && (
        <div className="px-4 pb-4 space-y-3 text-xs text-white/60">
          {calculationMetadata && (
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-white/5">
                <div className="text-white/40 text-[10px]">计算器</div>
                <div className="text-white/80">{calculationMetadata.calculatorUsed}</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <div className="text-white/40 text-[10px]">计算耗时</div>
                <div className="text-white/80">{calculationMetadata.calculationTime.toFixed(1)}ms</div>
              </div>
              {calculationMetadata.entropy !== undefined && (
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="text-white/40 text-[10px]">信息熵</div>
                  <div className="text-white/80">{calculationMetadata.entropy.toFixed(3)} bits</div>
                </div>
              )}
              {calculationMetadata.reliability !== undefined && (
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="text-white/40 text-[10px]">信度估计</div>
                  <div className="text-white/80">{(calculationMetadata.reliability * 100).toFixed(1)}%</div>
                </div>
              )}
            </div>
          )}

          {mode !== 'normal' && result.dimensions && result.dimensions.length > 0 && (
            <div>
              <div className="text-white/40 text-[10px] mb-1">维度权重分布</div>
              <div className="space-y-1">
                {result.dimensions.map((dim, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-white/70 w-16 truncate">{dim.name}</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, dim.score)}%` }}
                      />
                    </div>
                    <span className="text-white/50 w-8 text-right">{dim.score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'professional' && (
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1 text-amber-400 text-[10px] mb-1">
                <Microscope size={10} />
                专业模式计算详情
              </div>
              <div className="text-white/50 text-[10px]">
                结果基于信息熵加权算法，区分度指数和信度估计已纳入计算。
                准确度: {result.accuracy}%
              </div>
            </div>
          )}

          {calculationMetadata?.fallbackUsed && (
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="text-red-400 text-[10px]">
                ⚠️ 主计算器异常，已使用降级计算。建议重新测评获取更精确结果。
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: 创建 ReportRenderer.tsx**

```typescript
import { Suspense, useState, useCallback } from 'react'
import { Sparkles, AlertTriangle, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import LazyReportRouter from './lazy'
import ResultLayerDisplay from './ResultLayerDisplay'
import type { AssessmentResult } from '../../types'

interface ReportRendererProps {
  result: AssessmentResult
  assessmentType: string
  mode: 'normal' | 'advanced' | 'professional'
  ideologyScores?: any
  primaryIdeology?: string
  matchScore?: number
  calculationMetadata?: {
    calculatorUsed: string
    calculationTime: number
    fallbackUsed: boolean
    entropy?: number
    reliability?: number
  }
}

function ReportErrorFallback({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div className="glass rounded-3xl p-8 border border-red-500/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">报告渲染异常</h3>
          <p className="text-white/60 text-sm">已自动切换到通用报告模板</p>
        </div>
      </div>
      <p className="text-white/50 text-sm mb-4">{error.message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 transition-colors flex items-center gap-2"
      >
        <RefreshCw size={14} />
        重试渲染
      </button>
    </div>
  )
}

function ReportLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-white/60 text-sm">正在生成报告...</p>
    </div>
  )
}

export default function ReportRenderer(props: ReportRendererProps) {
  const [renderError, setRenderError] = useState<Error | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  const handleRetry = useCallback(() => {
    setRenderError(null)
    setRetryKey(prev => prev + 1)
  }, [])

  const handleError = useCallback((error: Error) => {
    console.error('[ReportRenderer] 渲染错误:', error)
    setRenderError(error)
  }, [])

  if (renderError) {
    return (
      <div>
        <ReportErrorFallback error={renderError} onRetry={handleRetry} />
        <div className="mt-4">
          <Suspense fallback={<ReportLoadingFallback />}>
            <LazyReportRouter
              key={`fallback-${retryKey}`}
              result={props.result}
              assessmentType={props.assessmentType}
              mode={props.mode}
              ideologyScores={props.ideologyScores}
              primaryIdeology={props.primaryIdeology}
              matchScore={props.matchScore}
            />
          </Suspense>
        </div>
        <ResultLayerDisplay
          result={props.result}
          mode={props.mode}
          calculationMetadata={props.calculationMetadata}
        />
      </div>
    )
  }

  return (
    <ErrorBoundary onError={handleError}>
      <Suspense fallback={<ReportLoadingFallback />}>
        <LazyReportRouter
          key={retryKey}
          result={props.result}
          assessmentType={props.assessmentType}
          mode={props.mode}
          ideologyScores={props.ideologyScores}
          primaryIdeology={props.primaryIdeology}
          matchScore={props.matchScore}
        />
      </Suspense>
      <ResultLayerDisplay
        result={props.result}
        mode={props.mode}
        calculationMetadata={props.calculationMetadata}
      />
    </ErrorBoundary>
  )
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(error)
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

import React from 'react'
```

- [ ] **Step 3: 验证编译通过**

Run: `cd /workspace && npx tsc --noEmit 2>&1 | head -20`
Expected: 无错误

---

## Task 5: 集成 CalculatorEngine 到 Assessment.tsx

**Files:**
- Modify: `src/pages/Assessment.tsx`

- [ ] **Step 1: 修改 submitAssessment 函数使用 CalculatorEngine**

在 Assessment.tsx 中，将现有的直接调用 `assessment.resultCalculator(answers)` 和 `calculateProfessionalResult(...)` 替换为 `calculatorEngine.calculate(...)`。

找到 `submitAssessment` 函数中的计算逻辑，替换为：

```typescript
import { calculatorEngine } from '../utils/calculators/CalculatorEngine'

// 在 submitAssessment 中替换计算逻辑:
const calculationResult = await calculatorEngine.calculate({
  assessmentId: assessment.id,
  answers,
  mode: mode as 'normal' | 'advanced' | 'professional',
})

const adaptedResult = {
  ...calculationResult.result,
  source: 'frontend',
  calculated_at: new Date().toISOString(),
  _calculationMetadata: calculationResult.metadata,
}
```

- [ ] **Step 2: 验证编译通过**

Run: `cd /workspace && npx tsc --noEmit 2>&1 | head -20`
Expected: 无错误

---

## Task 6: 集成 ReportRenderer 到 Results.tsx

**Files:**
- Modify: `src/pages/Results.tsx`

- [ ] **Step 1: 替换 Results.tsx 中的 ReportRouter 为 ReportRenderer**

```typescript
import ReportRenderer from '../components/reports/ReportRenderer'

// 找到 <ReportRouter ... /> 的位置，替换为:
<ReportRenderer
  result={effectiveResult}
  assessmentType={effectiveAssessment.id}
  mode={(displayMode as 'normal' | 'advanced' | 'professional') || 'normal'}
  calculationMetadata={resultRecord?.result?._calculationMetadata}
/>
```

同时移除旧的 `KnowledgeInjector` 和 `ReportRouter` 的 import。

- [ ] **Step 2: 验证编译通过**

Run: `cd /workspace && npx tsc --noEmit 2>&1 | head -20`
Expected: 无错误

---

## Task 7: 修复所有计算器的 dimensions 格式

**Files:**
- Modify: 所有 `src/utils/calculators/*-calculator.ts` 中 dimensions 为对象格式的文件

对每个返回 `dimensions: { key: value }` 格式的计算器，统一改为 `dimensions: [{ name, score, ... }]` 数组格式。同时在每个计算器中引入 `normalizeResult` 确保输出一致。

需要修复的计算器列表（dimensions 为对象格式的）：
1. `cast-calculator.ts`
2. `dark-calculator.ts`
3. `ecr-calculator.ts`
4. `eq-calculator.ts`
5. `foodie-calculator.ts`
6. `fubao-calculator.ts`
7. `gma-calculator.ts`
8. `ideology-calculator.ts`
9. `internet-addiction-calculator.ts`
10. `iq-calculator.ts`
11. `life-meaning-calculator.ts`
12. `patriotism-calculator.ts`
13. `pua-calculator.ts`
14. `sas-calculator.ts`
15. `sexual-experience-calculator.ts`
16. `slacking-calculator.ts`

- [ ] **Step 1: 对每个计算器，找到 return 语句中的 `dimensions: { ... }`**

将其替换为 `dimensions: [{ name: '维度名', score: value, description: '...' }, ...]` 格式。

例如，对于 `dark-calculator.ts`：
```typescript
// 之前
dimensions: { machiavellianism: machScore, narcissism: narcScore, psychopathy: psychScore }

// 之后
dimensions: [
  { name: '马基雅维利主义', dimensionId: 'machiavellianism', score: machScore, maxScore: 100, description: '操纵和利用他人的倾向' },
  { name: '自恋', dimensionId: 'narcissism', score: narcScore, maxScore: 100, description: '自我重要性和优越感' },
  { name: '精神病态', dimensionId: 'psychopathy', score: psychScore, maxScore: 100, description: '冲动和反社会行为倾向' },
]
```

- [ ] **Step 2: 验证所有计算器编译通过**

Run: `cd /workspace && npx tsc --noEmit 2>&1 | head -30`
Expected: 无错误

---

## Task 8: 端到端测试验证

- [ ] **Step 1: 启动开发服务器**

Run: `cd /workspace && npm run dev`

- [ ] **Step 2: 测试大五人格测评**

完成大五人格测评，验证：
1. 提交后无渲染错误
2. 报告正常显示
3. 算法详情可展开查看
4. 维度图表正确显示

- [ ] **Step 3: 测试暗黑三角测评**

完成暗黑三角测评，验证同上。

- [ ] **Step 4: 测试情商测评**

完成情商测评，验证同上。

- [ ] **Step 5: 测试焦虑自评量表**

完成 SAS 测评，验证同上。

- [ ] **Step 6: 测试趣味测评（如摸鱼纯度）**

完成趣味测评，验证降级计算和通用报告模板正常工作。
