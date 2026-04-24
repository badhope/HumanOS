import { applySustainableBalance, formatMacroeconomicReport, RUSSIA_2026_STANDARDIZED } from './standard-units-system'
import { HISTORICAL_EVENTS_2019, RUSSIA_FOCUS_TREE, TECHNOLOGY_TREE, checkFocusAvailability, applyFocusEffects } from './focus-tree-system'

export * from './standard-units-system'
export * from './focus-tree-system'

export interface SimulationResult {
  scenarioName: string
  startingCountry: string
  startingDate: { year: number; month: number; day: number }
  totalDays: number
  totalYears: number
  finalDate: { year: number; month: number; day: number }
  causeOfDeath?: string
  survival: boolean
  dailyLog: SimulationLogEntry[]
  criticalEvents: CriticalEvent[]
  finalStats: Record<string, any>
  metrics: SimulationMetrics
}

export interface SimulationLogEntry {
  day: number
  date: { year: number; month: number; day: number }
  gdp: number
  gdpGrowth: number
  inflation: number
  unemployment: number
  stability: number
  treasury: number
  debt: number
  debtToGdp: number
  legitimacy: number
  militancy: number
  approval: number
  events: string[]
}

export interface CriticalEvent {
  day: number
  date: string
  event: string
  impact: Record<string, number>
  turningPoint: boolean
}

export interface SimulationMetrics {
  maxDebtToGdp: number
  minStability: number
  maxInflation: number
  maxUnemployment: number
  daysInCrisis: number
  reformsImplemented: number
  mistakesMade: number
}

export interface AIStrategy {
  id: string
  name: string
  description: string
  playStyle: 'suicide' | 'incompetent' | 'normal' | 'competent' | 'minmax'
  decisionFunction: (state: Record<string, any>, day: number) => { action: string; params: Record<string, any> }
}

export const RUSSIA_2026_START = RUSSIA_2026_STANDARDIZED

export const AI_STRATEGIES: AIStrategy[] = [
  {
    id: 'suicide',
    name: '加速死亡流',
    description: '每天持续作死，一年左右玩完',
    playStyle: 'suicide',
    decisionFunction: (state, day) => {
      if (day % 1 === 0) return { action: 'print_money', params: { amount: 200 } }
      if (day % 3 === 0) return { action: 'mass_wage_increase', params: { percent: 30 } }
      if (day % 60 === 0 && day > 120) return { action: 'default_on_debt', params: {} }
      return { action: 'do_nothing', params: {} }
    },
  },
  {
    id: 'incompetent',
    name: '无能官僚流',
    description: '典型的庸官治国，慢慢拖死',
    playStyle: 'incompetent',
    decisionFunction: (state, day) => {
      if (day % 90 === 0) return { action: 'minor_tweak', params: {} }
      if (state.inflation > 15) return { action: 'raise_rate_slightly', params: { by: 0.5 } }
      if (state.unemployment > 10) return { action: 'small_subsidy', params: {} }
      return { action: 'do_nothing', params: {} }
    },
  },
  {
    id: 'normal',
    name: '标准执政流',
    description: '正常水平的领导人',
    playStyle: 'normal',
    decisionFunction: (state, day) => {
      if (state.inflation > 8) return { action: 'raise_rate', params: { by: 1 } }
      if (state.inflation < 2) return { action: 'cut_rate', params: { by: 0.5 } }
      if (state.unemployment > 7) return { action: 'stimulus', params: { amount: 50 } }
      if (day % 30 === 0) return { action: 'minor_reform', params: {} }
      return { action: 'do_nothing', params: {} }
    },
  },
  {
    id: 'competent',
    name: '优秀执政流',
    description: '有能力的领导人，懂得取舍',
    playStyle: 'competent',
    decisionFunction: (state, day) => {
      if (state.inflation > 5) return { action: 'aggressive_hiking', params: {} }
      if (state.debtToGdp > 60) return { action: 'austerity', params: {} }
      if (state.unemployment > 5) return { action: 'targeted_jobs_program', params: {} }
      if (day % 60 === 0) return { action: 'structural_reform', params: {} }
      return { action: 'do_nothing', params: {} }
    },
  },
  {
    id: 'minmax',
    name: '苟到最后流',
    description: '最大化苟命时间，不惜一切代价维稳',
    playStyle: 'minmax',
    decisionFunction: (state, day) => {
      if (state.stability < 40) return { action: 'mass_repression', params: {} }
      if (state.militancy > 60) return { action: 'secret_police', params: {} }
      if (state.approval < 30) return { action: 'bread_and_circuses', params: {} }
      if (day % 7 === 0) return { action: 'minor_propaganda', params: {} }
      if (state.debtToGdp < 50 && state.inflation < 10) return { action: 'print_money_slowly', params: {} }
      return { action: 'do_nothing', params: {} }
    },
  },
]

export function advanceDateSystem(date: {
  year: number
  month: number
  day: number
}, days: number = 1): { year: number; month: number; day: number } {
  const result = { ...date }
  result.day += days

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  while (true) {
    const dim = daysInMonth[result.month - 1] +
      (result.month === 2 && result.year % 4 === 0 ? 1 : 0)

    if (result.day <= dim) break

    result.day -= dim
    result.month += 1

    if (result.month > 12) {
      result.month = 1
      result.year += 1
    }
  }

  return result
}

export function runSimulation(
  strategy: AIStrategy,
  maxYears: number = 10,
  enableLogging: boolean = true
): SimulationResult {
  const startDate = { ...RUSSIA_2026_START.date }
  const state = { ...RUSSIA_2026_START.initialStats }
  const dailyLog: SimulationLogEntry[] = []
  const criticalEvents: CriticalEvent[] = []

  let day = 0
  let currentDate = { ...startDate }
  let causeOfDeath: string | undefined
  const maxDays = maxYears * 365
  const reforms = { implemented: 0, mistakes: 0 }
  const metrics = {
    maxDebtToGdp: state.debtToGdp,
    minStability: state.stability,
    maxInflation: state.inflation,
    maxUnemployment: state.unemployment,
    daysInCrisis: 0,
    reformsImplemented: 0,
    mistakesMade: 0,
  }

  function checkGameOver(): string | null {
    if (state.stability <= -20) return '稳定度崩溃，政府倒台'
    if (state.legitimacy <= -10 && day > 730) return '合法性丧失，革命爆发'
    if (state.militancy >= 95 && day > 730) return '民怨沸腾，内战开始'
    if (state.debtToGdp >= 400 && day > 365) return '国家破产，债务违约'
    if (state.inflation >= 500 && day > 180) return '恶性通胀，货币崩溃'
    if (state.treasury <= -5000 && day > 365) return '国库耗尽，政府停摆'
    if (state.approval <= 0 && day > 1095) return '支持率归零，政变发生'
    return null
  }

  function applyEconomicDecay() {
    state.inflation += 0.003 + Math.random() * 0.008
    state.unemployment += Math.random() * 0.005 - 0.0015
    state.debt += state.debt * 0.00003
    state.debtToGdp = (state.debt / state.gdp) * 100
    
    if (strategy.playStyle !== 'minmax' && strategy.playStyle !== 'competent') {
      state.stability -= 0.0015 + Math.random() * 0.004
      state.legitimacy -= 0.0008
      state.militancy += 0.0015 + Math.random() * 0.002
    }
    
    state.approval += Math.random() * 0.006 - 0.004

    if (state.inflation > 15) {
      state.stability -= 0.012
      state.approval -= 0.008
    }
    if (state.unemployment > 20) {
      state.militancy += 0.015
      state.legitimacy -= 0.008
    }
    if (state.debtToGdp > 150) {
      metrics.daysInCrisis++
    }

    applySustainableBalance(state, day)
  }

  function applyStrategyAction() {
    const decision = strategy.decisionFunction(state, day)

    switch (decision.action) {
      case 'print_money':
        state.treasury += decision.params.amount || 100
        state.inflation += 0.8
        state.debt += decision.params.amount || 100
        if (enableLogging && day % 60 === 0) criticalEvents.push({
          day,
          date: `${currentDate.year}-${currentDate.month}-${currentDate.day}`,
          event: `大规模印钞 +${decision.params.amount}B`,
          impact: { inflation: +0.8 },
          turningPoint: state.inflation > 50,
        })
        reforms.mistakes++
        break

      case 'cut_interest_rate':
        state.inflation += 0.3
        state.unemployment -= 0.2
        break

      case 'mass_wage_increase':
        state.approval += 2
        state.inflation += 1.5
        state.unemployment -= 0.3
        if (enableLogging && day % 90 === 0) criticalEvents.push({
          day,
          date: `${currentDate.year}-${currentDate.month}-${currentDate.day}`,
          event: '全民涨工资',
          impact: { inflation: +1.5, approval: +2 },
          turningPoint: state.inflation > 100,
        })
        reforms.mistakes++
        break

      case 'default_on_debt':
        state.debt *= 0.5
        state.legitimacy -= 15
        state.stability -= 10
        state.inflation += 8
        if (enableLogging) criticalEvents.push({
          day,
          date: `${currentDate.year}-${currentDate.month}-${currentDate.day}`,
          event: '主权债务违约！',
          impact: { legitimacy: -15, stability: -10 },
          turningPoint: true,
        })
        reforms.mistakes++
        break

      case 'freeze_prices':
        state.inflation -= 2
        state.stability -= 5
        if (enableLogging && day % 180 === 0) criticalEvents.push({
          day,
          date: `${currentDate.year}-${currentDate.month}-${currentDate.day}`,
          event: '实施价格管制',
          impact: { inflation: -2, stability: -5 },
          turningPoint: false,
        })
        break

      case 'aggressive_hiking':
        state.inflation -= 1
        state.unemployment += 0.5
        reforms.implemented++
        break

      case 'austerity':
        state.debtToGdp -= 0.5
        state.stability -= 0.5
        state.approval -= 0.3
        reforms.implemented++
        break

      case 'mass_repression':
        state.militancy -= 5
        state.stability += 2
        state.legitimacy -= 2
        if (enableLogging && day % 180 === 0) criticalEvents.push({
          day,
          date: `${currentDate.year}-${currentDate.month}-${currentDate.day}`,
          event: '大规模维稳行动',
          impact: { militancy: -5 },
          turningPoint: false,
        })
        break

      case 'bread_and_circuses':
        state.approval += 5
        state.inflation += 1
        state.debtToGdp += 1
        if (enableLogging && day % 180 === 0) criticalEvents.push({
          day,
          date: `${currentDate.year}-${currentDate.month}-${currentDate.day}`,
          event: '面包与马戏政策',
          impact: { approval: +5, inflation: +1 },
          turningPoint: false,
        })
        break
    }
  }

  function checkHistoricalEvents() {
    for (const event of HISTORICAL_EVENTS_2019) {
      if (
        currentDate.year === event.date.year &&
        currentDate.month === event.date.month &&
        currentDate.day === event.date.day
      ) {
        for (const [key, value] of Object.entries(event.effects)) {
          if (typeof value === 'number') {
            state[key] = (state[key] || 0) + value
          }
        }
        
        if (enableLogging) {
          const numericImpact: Record<string, number> = {}
          for (const [key, value] of Object.entries(event.effects)) {
            if (typeof value === 'number') {
              numericImpact[key] = value
            }
          }
          criticalEvents.push({
            day,
            date: `${currentDate.year}-${currentDate.month}-${currentDate.day}`,
            event: `⚡ 历史事件: ${event.name}`,
            impact: numericImpact,
            turningPoint: true,
          })
        }
      }
    }
  }

  while (day < maxDays) {
    day++
    currentDate = advanceDateSystem(startDate, day)

    checkHistoricalEvents()
    applyEconomicDecay()
    applyStrategyAction()

    metrics.maxDebtToGdp = Math.max(metrics.maxDebtToGdp, state.debtToGdp)
    metrics.minStability = Math.min(metrics.minStability, state.stability)
    metrics.maxInflation = Math.max(metrics.maxInflation, state.inflation)
    metrics.maxUnemployment = Math.max(metrics.maxUnemployment, state.unemployment)

    const gameOver = checkGameOver()
    if (gameOver) {
      causeOfDeath = gameOver
      if (enableLogging) criticalEvents.push({
        day,
        date: `${currentDate.year}-${currentDate.month}-${currentDate.day}`,
        event: `💀 GAME OVER: ${gameOver}`,
        impact: {},
        turningPoint: true,
      })
      break
    }

    if (enableLogging && day % 7 === 0) {
      dailyLog.push({
        day,
        date: { ...currentDate },
        gdp: state.gdp,
        gdpGrowth: 0,
        inflation: Math.round(state.inflation * 10) / 10,
        unemployment: Math.round(state.unemployment * 10) / 10,
        stability: Math.round(state.stability),
        treasury: state.treasury,
        debt: state.debt,
        debtToGdp: Math.round(state.debtToGdp * 10) / 10,
        legitimacy: Math.round(state.legitimacy),
        militancy: Math.round(state.militancy),
        approval: Math.round(state.approval),
        events: [],
      })
    }
  }

  metrics.reformsImplemented = reforms.implemented
  metrics.mistakesMade = reforms.mistakes

  return {
    scenarioName: strategy.name,
    startingCountry: RUSSIA_2026_START.countryName,
    startingDate: startDate,
    totalDays: day,
    totalYears: Math.round((day / 365) * 10) / 10,
    finalDate: currentDate,
    causeOfDeath,
    survival: !causeOfDeath,
    dailyLog,
    criticalEvents,
    finalStats: state,
    metrics,
  }
}

export function formatSimulationReport(result: SimulationResult): string {
  const lines = [
    '='.repeat(80),
    `📊 模拟报告: ${result.scenarioName}`,
    '='.repeat(80),
    '',
    `国家: ${result.startingCountry}`,
    `开局日期: ${result.startingDate.year}-${result.startingDate.month}-${result.startingDate.day}`,
    `结束日期: ${result.finalDate.year}-${result.finalDate.month}-${result.finalDate.day}`,
    '',
    `⏱️  存活时间: ${result.totalDays} 天 = ${result.totalYears} 年`,
    '',
  ]

  if (result.causeOfDeath) {
    lines.push(`💀 灭亡原因: ${result.causeOfDeath}`)
  } else {
    lines.push(`✅ 存活到模拟结束 (${result.totalYears}年)`)
  }

  lines.push('')
  lines.push('--- 📈 核心指标极值 ---')
  lines.push(`  最高债务/GDP: ${result.metrics.maxDebtToGdp.toFixed(1)}%`)
  lines.push(`  最低稳定度: ${result.metrics.minStability.toFixed(0)}`)
  lines.push(`  最高通胀率: ${result.metrics.maxInflation.toFixed(1)}%`)
  lines.push(`  最高失业率: ${result.metrics.maxUnemployment.toFixed(1)}%`)
  lines.push(`  危机持续天数: ${result.metrics.daysInCrisis} 天`)
  lines.push(`  改革次数: ${result.metrics.reformsImplemented}`)
  lines.push(`  重大决策失误: ${result.metrics.mistakesMade} 次`)

  lines.push('')
  lines.push('--- ⚡ 关键事件时间线 ---')
  result.criticalEvents.forEach((ev, i) => {
    const dayPad = ev.day.toString().padStart(5)
    lines.push(`  [第${dayPad}天] ${ev.date.padEnd(12)} | ${ev.event}`)
  })

  lines.push('')
  lines.push('--- 📊 最终状态 ---')
  Object.entries(result.finalStats).forEach(([key, value]) => {
    if (typeof value === 'number') {
      lines.push(`  ${key.padEnd(20)}: ${value.toFixed(1)}`)
    }
  })

  return lines.join('\n')
}
