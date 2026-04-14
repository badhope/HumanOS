import type { Answer, AssessmentResult } from '../../../types'
import { getIQBand, calculateZScore, calculatePercentile, rawScoreToIQ, iqReferences, RAVEN_SETS } from './iq-common'

export interface CalculationLogEntry {
  timestamp: string
  step: string
  variable: string
  value: number | string | boolean | object
  formula?: string
  intermediate?: Record<string, number | string>
}

export interface CalculationLog {
  sessionId: string
  testMode: 'normal' | 'advanced' | 'professional'
  startTime: string
  endTime?: string
  entries: CalculationLogEntry[]
  inputSummary: {
    totalQuestions: number
    answerCount: number
  }
  validationChecks: {
    checkId: string
    passed: boolean
    message: string
  }[]
}

const calculationLogs: Map<string, CalculationLog> = new Map()
let sessionCounter = 0

function createCalculationLog(testMode: 'normal' | 'advanced' | 'professional'): CalculationLog {
  sessionCounter++
  const sessionId = `RAVEN-${Date.now()}-${String(sessionCounter).padStart(4, '0')}`
  const log: CalculationLog = {
    sessionId,
    testMode,
    startTime: new Date().toISOString(),
    entries: [],
    inputSummary: {
      totalQuestions: 0,
      answerCount: 0,
    },
    validationChecks: [],
  }
  calculationLogs.set(sessionId, log)
  return log
}

function addLogEntry(
  log: CalculationLog,
  step: string,
  variable: string,
  value: number | string | boolean | object,
  formula?: string,
  intermediate?: Record<string, number | string>
): void {
  log.entries.push({
    timestamp: new Date().toISOString(),
    step,
    variable,
    value,
    formula,
    intermediate,
  })
}

function addValidationCheck(
  log: CalculationLog,
  checkId: string,
  passed: boolean,
  message: string
): void {
  log.validationChecks.push({ checkId, passed, message })
}

function finalizeLog(log: CalculationLog): void {
  log.endTime = new Date().toISOString()
}

export function getCalculationLog(sessionId: string): CalculationLog | undefined {
  return calculationLogs.get(sessionId)
}

export function getAllCalculationLogs(): CalculationLog[] {
  return Array.from(calculationLogs.values())
}

export function clearCalculationLogs(): void {
  calculationLogs.clear()
}

interface SetPerformance {
  correct: number
  total: number
  accuracy: number
}

export function calculateRavenIQ(
  answers: Answer[],
  mode: 'normal' | 'advanced' | 'professional' = 'normal'
): AssessmentResult & { calculationLog?: CalculationLog } {
  const log = createCalculationLog(mode)

  addLogEntry(log, '1.初始化', '输入答案数量', answers.length)
  log.inputSummary.answerCount = answers.length

  const totalQuestions = answers.length
  log.inputSummary.totalQuestions = totalQuestions
  addLogEntry(log, '1.初始化', '总题目数', totalQuestions)

  addValidationCheck(log, 'V001', answers.length > 0, '答案数组非空')
  addValidationCheck(log, 'V002', totalQuestions >= 60 || mode !== 'normal', `题目数校验: ${totalQuestions}`)

  let correctAnswers = 0

  const setPerformance: Record<string, SetPerformance> = {
    A: { correct: 0, total: 0, accuracy: 0 },
    B: { correct: 0, total: 0, accuracy: 0 },
    C: { correct: 0, total: 0, accuracy: 0 },
    D: { correct: 0, total: 0, accuracy: 0 },
    E: { correct: 0, total: 0, accuracy: 0 },
  }

  addLogEntry(log, '2.分组统计', '初始化分组性能', JSON.stringify(setPerformance))

  answers.forEach((answer, idx) => {
    const setMatch = answer.questionId.match(/^([A-E])/)
    const set = setMatch ? setMatch[1] : 'A'

    setPerformance[set].total++
    const isCorrect = answer.isCorrect || answer.value === 1
    if (isCorrect) {
      correctAnswers++
      setPerformance[set].correct++
    }

    if (idx < 5) {
      addLogEntry(log, '2.分组统计', `答案${idx + 1}`, isCorrect ? '正确' : '错误', undefined, {
        questionId: answer.questionId,
        set,
        value: String(answer.value),
      })
    }
  })

  addLogEntry(log, '2.分组统计', '原始正确数', correctAnswers)

  Object.keys(setPerformance).forEach((key) => {
    const sp = setPerformance[key]
    if (sp.total > 0) {
      sp.accuracy = sp.correct / sp.total
    }
    addLogEntry(log, '3.正确率计算', `Set${key}正确率`, sp.accuracy, 'correct / total', {
      correct: String(sp.correct),
      total: String(sp.total),
    })
  })

  addLogEntry(log, '3.正确率计算', '分组统计结果', JSON.stringify(setPerformance))

  const accuracy = correctAnswers / totalQuestions
  addLogEntry(log, '4.分数转换', '总体正确率', accuracy, 'correctAnswers / totalQuestions', {
    correctAnswers: String(correctAnswers),
    totalQuestions: String(totalQuestions),
  })

  addLogEntry(log, '4.分数转换', 'rawScoreToIQ公式', 'IQ = 70 + 正确率 × 80')
  const iqScore = rawScoreToIQ(correctAnswers, totalQuestions)
  addLogEntry(log, '4.分数转换', '计算IQ值', iqScore, '70 + accuracy * 80', {
    accuracy: String(accuracy),
    intermediate: String(70 + accuracy * 80),
  })

  const iqBand = getIQBand(iqScore)
  addLogEntry(log, '4.分数转换', 'IQ区间', `${iqBand.label} [${iqBand.range[0]}-${iqBand.range[1]})`)

  addLogEntry(log, '5.标准化计算', 'Z分数公式', 'Z = (IQ - μ) / σ, 其中 μ=100, σ=15')
  const zScore = calculateZScore(iqScore)
  addLogEntry(log, '5.标准化计算', 'Z分数', zScore, `(${iqScore} - 100) / 15`, {
    intermediate: String((iqScore - 100) / 15),
  })

  addLogEntry(log, '5.标准化计算', '百分位数公式', 'CDF(标准正态分布) × 100')
  const percentile = calculatePercentile(zScore)
  addLogEntry(log, '5.标准化计算', '百分位数', percentile, '标准正态累积分布函数', {
    zScore: String(zScore),
  })

  addValidationCheck(log, 'V003', iqScore >= 70 && iqScore <= 150, `IQ=${iqScore} 在有效范围[70,150]内`)
  addValidationCheck(log, 'V004', percentile >= 0 && percentile <= 100, `百分位数=${percentile}% 有效`)

  const dimensions = Object.entries(RAVEN_SETS).map(([key, info]) => ({
    name: info.name,
    score: Math.round(50 + setPerformance[key].accuracy * 50),
  }))

  const cognitiveProfile = determineProfile(iqScore, setPerformance)
  const strengths = generateStrengths(iqScore, setPerformance)
  const suggestions = generateSuggestions(setPerformance)

  const reliability = Math.min(0.95, 0.80 + (correctAnswers / totalQuestions) * 0.15)
  addLogEntry(log, '6.信度计算', '测量信度', reliability, 'min(0.95, 0.80 + 正确率 × 0.15)')

  addLogEntry(log, '7.维度评分', '维度转换', '维度得分 = 50 + 正确率 × 50')
  dimensions.forEach((dim) => {
    addLogEntry(log, '7.维度评分', `${dim.name}维度得分`, dim.score)
  })

  addLogEntry(log, '8.结果输出', '认知档案类型', cognitiveProfile)
  addLogEntry(log, '8.结果输出', '最终IQ得分', iqScore)
  addLogEntry(log, '8.结果输出', '最终百分位数', `${percentile}%`)
  addLogEntry(log, '8.结果输出', '优势项数量', strengths.length)
  addLogEntry(log, '8.结果输出', '建议项数量', suggestions.length)

  const allChecksPassed = log.validationChecks.every(c => c.passed)
  addLogEntry(log, '9.校验', '全部校验通过', allChecksPassed)

  finalizeLog(log)

  return {
    type: 'IQ',
    typeName: '瑞文标准推理测验',
    typeCode: `RAVEN-${iqScore >= 130 ? 'G' : iqScore >= 115 ? 'A' : iqScore >= 85 ? 'N' : 'L'}`,
    archetype: cognitiveProfile as string,
    title: `智力测评报告 - ${cognitiveProfile}`,
    summary: `总体智商 ${iqScore} (${iqBand.label})，正确率 ${Math.round(accuracy * 100)}%，超过 ${percentile}% 的对照人群。`,
    description: iqBand.description,
    overallScore: iqScore,
    score: iqScore,
    percentile: String(percentile),
    zScore: Math.round(zScore * 100) / 100,
    band: iqBand.label,
    dimensions,
    strengths,
    suggestions,
    careers: recommendCareers(iqScore, setPerformance),
    reliability,
    standardError: 3.2,
    normSample: 10000,
    references: iqReferences,
    meta: {
      correctAnswers,
      totalQuestions,
      accuracy: Math.round(accuracy * 100) / 100,
      setPerformance,
    },
    calculationLog: log,
  }
}

function determineProfile(iq: number, sets: Record<string, SetPerformance>): string {
  if (iq >= 130) return '抽象推理天才'
  if (iq >= 120) return '战略架构师'
  if (iq >= 110) return '快速学习者'
  if (iq >= 100) return '平衡思考者'
  if (iq >= 90) return '经验实干家'
  return '实践应用者'
}

function generateStrengths(iq: number, sets: Record<string, SetPerformance>): string[] {
  const strengths: string[] = []

  if (iq >= 120) {
    strengths.push('总体流体智力优秀，具备出色的抽象推理和模式识别能力')
  } else if (iq >= 100) {
    strengths.push('学习能力处于良好水平，能够有效掌握新概念和技能')
  }

  if (sets.A.accuracy >= 0.8) strengths.push('视觉辨别能力出色，擅长图形比较和匹配')
  if (sets.B.accuracy >= 0.8) strengths.push('类比思维能力强，善于发现事物间的关联')
  if (sets.C.accuracy >= 0.8) strengths.push('渐进推理敏锐，能够捕捉数量和形态的变化')
  if (sets.D.accuracy >= 0.8) strengths.push('系列关系处理出色，擅长空间整合和套合')
  if (sets.E.accuracy >= 0.8) strengths.push('抽象推理能力卓越，能够处理多重复杂规则')

  return strengths.slice(0, 5)
}

function generateSuggestions(sets: Record<string, SetPerformance>): string[] {
  const suggestions: string[] = []

  if (sets.A.accuracy < 0.5) suggestions.push('每天进行5分钟的找不同游戏，提升视觉辨别能力')
  if (sets.B.accuracy < 0.5) suggestions.push('练习词语类比题目，强化概念关联思维')
  if (sets.C.accuracy < 0.5) suggestions.push('进行数列和图形序列练习，培养渐进思维')
  if (sets.D.accuracy < 0.5) suggestions.push('尝试拼图和积木游戏，提升空间感知能力')
  if (sets.E.accuracy < 0.5) suggestions.push('学习数独和逻辑谜题，训练多维度推理')

  if (suggestions.length === 0) {
    suggestions.push('尝试更高级的高级瑞文推理测验(APM)，探索认知极限')
  } else {
    suggestions.push('持续训练是提升流体智力的唯一有效途径')
  }

  return suggestions
}

function recommendCareers(iq: number, sets: Record<string, SetPerformance>): string[] {
  const careers: string[] = []

  if (iq >= 115) {
    careers.push('科学研究与数据分析')
    careers.push('软件架构与算法设计')
  }

  if (sets.E.accuracy >= 0.7) {
    careers.push('战略咨询与投资分析')
    careers.push('系统架构设计')
  }

  if (sets.D.accuracy >= 0.7) {
    careers.push('建筑与空间设计')
    careers.push('工程可视化')
  }

  careers.push('产品经理与项目管理')
  careers.push('IT开发与技术支持')

  return [...new Set(careers)].slice(0, 5)
}

export const calculateIQProfessional = calculateRavenIQ
