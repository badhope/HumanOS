import type { EconomyState } from './types'

export interface Quest {
  id: string
  title: string
  description: string
  category: 'tutorial' | 'daily' | 'milestone' | 'challenge'
  difficulty: 'easy' | 'normal' | 'hard'
  condition: (state: EconomyState) => boolean
  reward: {
    type: 'spirit' | 'money' | 'prestige' | 'achievement'
    amount: number
  }
  hint?: string
  order: number
}

export const CORE_QUESTS: Quest[] = [
  {
    id: 'first_unpause',
    title: '🚀 启动经济引擎',
    description: '第一次按下播放按钮，让国家开始运转',
    category: 'tutorial',
    difficulty: 'easy',
    condition: (state) => state.day > 3,
    reward: { type: 'spirit', amount: 10 },
    hint: '点击顶部中央的 ▶️ 按钮，或者按空格键',
    order: 1,
  },
  {
    id: 'survive_30_days',
    title: '📅 执政满月',
    description: '成功执政满30天，国家没有破产或崩溃',
    category: 'milestone',
    difficulty: 'easy',
    condition: (state) => state.day >= 30 && state.gameStatus === 'running',
    reward: { type: 'prestige', amount: 50 },
    hint: '稳定是第一要务，先观察不要乱改政策',
    order: 2,
  },
  {
    id: 'open_treasury',
    title: '💰 初次理财',
    description: '打开国库面板，了解国家的财政状况',
    category: 'tutorial',
    difficulty: 'easy',
    condition: () => false,
    reward: { type: 'spirit', amount: 5 },
    hint: '点击右侧「国库」按钮查看财政详情',
    order: 3,
  },
  {
    id: 'balance_budget',
    title: '⚖️ 财政平衡',
    description: '实现财政盈余，国库不再年年赤字',
    category: 'milestone',
    difficulty: 'normal',
    condition: (state) => state.treasury.balance > 0,
    reward: { type: 'prestige', amount: 100 },
    hint: '适当提高税率，减少不必要的补贴',
    order: 4,
  },
  {
    id: 'control_inflation',
    title: '💹 稳定物价',
    description: '将通胀率控制在 1-3% 的健康区间',
    category: 'milestone',
    difficulty: 'normal',
    condition: (state) => state.stats.inflation >= 1 && state.stats.inflation <= 3,
    reward: { type: 'prestige', amount: 150 },
    hint: '过热就加息，过冷就降息',
    order: 5,
  },
  {
    id: 'reduce_unemployment',
    title: '👥 保障就业',
    description: '将失业率降低到 5% 以下',
    category: 'milestone',
    difficulty: 'normal',
    condition: (state) => state.stats.unemployment < 5,
    reward: { type: 'prestige', amount: 150 },
    hint: '补贴制造业和服务业，扩大劳动力密集型产业',
    order: 6,
  },
  {
    id: 'survive_1_year',
    title: '🎯 执政周年',
    description: '成功执政满一年（365天）',
    category: 'milestone',
    difficulty: 'normal',
    condition: (state) => state.day >= 365 && state.gameStatus === 'running',
    reward: { type: 'prestige', amount: 200 },
    hint: '行稳致远，不要急于求成',
    order: 7,
  },
  {
    id: 'positive_gdp_growth',
    title: '📈 经济正增长',
    description: '实现GDP正增长',
    category: 'milestone',
    difficulty: 'normal',
    condition: (state) => state.day > 100,
    reward: { type: 'prestige', amount: 100 },
    hint: '投资基建，拉动内需',
    order: 8,
  },
  {
    id: 'reduce_debt_ratio',
    title: '💳 去杠杆',
    description: '将债务占GDP比例降低到 60% 以下',
    category: 'milestone',
    difficulty: 'hard',
    condition: (state) => state.treasury.debt / state.stats.gdp < 0.6,
    reward: { type: 'prestige', amount: 300 },
    hint: '年年盈余还债，控制财政支出',
    order: 9,
  },
  {
    id: 'high_approval',
    title: '❤️ 民心所向',
    description: '民众支持率达到 70% 以上',
    category: 'milestone',
    difficulty: 'hard',
    condition: (state) => state.stats.stability > 70,
    reward: { type: 'prestige', amount: 250 },
    hint: '控制通胀，保障就业，改善民生',
    order: 10,
  },
  {
    id: 'survive_5_years',
    title: '🏛️ 长期执政',
    description: '成功执政满5年（1825天）',
    category: 'challenge',
    difficulty: 'hard',
    condition: (state) => state.day >= 1825 && state.gameStatus === 'running',
    reward: { type: 'achievement', amount: 1 },
    hint: '建立完善的经济体系和风险应对机制',
    order: 11,
  },
  {
    id: 'developed_economy',
    title: '🌟 发达国家',
    description: '人均GDP超过 2万美元',
    category: 'challenge',
    difficulty: 'hard',
    condition: (state) => (state.stats.gdp * 1000000) / state.stats.population > 20000,
    reward: { type: 'achievement', amount: 1 },
    hint: '产业升级，提高劳动生产率',
    order: 12,
  },
]

export function checkQuestProgress(state: EconomyState, completedQuests: Set<string>): {
  completed: Quest[]
  available: Quest[]
  nextMilestone: Quest | null
} {
  const sorted = [...CORE_QUESTS].sort((a, b) => a.order - b.order)
  
  const completed = sorted.filter(q => !completedQuests.has(q.id) && q.condition(state))
  const available = sorted.filter(q => !completedQuests.has(q.id))
  const nextMilestone = available.find(q => !q.condition(state)) || null
  
  return { completed, available, nextMilestone }
}

export function getCurrentHint(state: EconomyState): string {
  const debtRatio = state.treasury.debt / state.stats.gdp
  const yearlyDeficit = Math.abs(state.treasury.balance) * 365

  const hints: Record<string, string> = {
    crisis_debt: '⚠️ 债务率过高！减少赤字，开始偿还债务',
    crisis_inflation: '⚠️ 通胀失控！收紧货币政策，加息',
    crisis_deflation: '⚠️ 陷入通缩！宽松货币，刺激经济',
    crisis_unemployment: '⚠️ 失业严重！补贴产业，扩大基建',
    crisis_bankruptcy: '⚠️ 国库见底！开源节流，增加税收',
    crisis_low_approval: '⚠️ 支持率低迷！改善民生，做出政绩',
  }

  if (debtRatio > 1.2) return hints.crisis_debt
  if (state.stats.inflation > 8) return hints.crisis_inflation
  if (state.stats.inflation < -1) return hints.crisis_deflation
  if (state.stats.unemployment > 15) return hints.crisis_unemployment
  if (state.treasury.gold < yearlyDeficit * 3 && state.treasury.balance < 0) return hints.crisis_bankruptcy
  if (state.stats.stability < 30) return hints.crisis_low_approval
  
  if (state.day < 30) return '💡 新手上路：先按空格键暂停，观察各项指标'
  if (state.day < 100) return '💡 执政初期：稳字当头，不要频繁调整政策'
  
  return '💡 保持稳定，徐徐图之'
}
