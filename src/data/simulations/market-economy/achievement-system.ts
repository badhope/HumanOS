import type { EconomyState } from './types'

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  category: 'economic' | 'diplomatic' | 'social' | 'political' | 'survival'
  checkCondition: (state: EconomyState, prevState?: EconomyState) => boolean
  reward?: {
    politicalCapital?: number
    approval?: number
    gold?: number
  }
  hidden?: boolean
}

export interface AchievementState {
  unlocked: string[]
  locked: string[]
  notifications: string[]
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_100_days',
    name: '百日新政',
    description: '成功执政超过100天',
    icon: '📅',
    rarity: 'common',
    category: 'survival',
    checkCondition: (state) => state.day >= 100,
    reward: { politicalCapital: 50 }
  },
  {
    id: 'first_year',
    name: '执政元年',
    description: '成功执政超过365天',
    icon: '🎉',
    rarity: 'rare',
    category: 'survival',
    checkCondition: (state) => state.day >= 365,
    reward: { politicalCapital: 100, approval: 5 }
  },
  {
    id: 'first_term',
    name: '五年计划',
    description: '成功执政超过1825天',
    icon: '🏆',
    rarity: 'epic',
    category: 'survival',
    checkCondition: (state) => state.day >= 1825,
    reward: { politicalCapital: 300, approval: 10 }
  },
  {
    id: 'legendary_leader',
    name: '传奇领袖',
    description: '成功执政超过3650天',
    icon: '👑',
    rarity: 'legendary',
    category: 'survival',
    checkCondition: (state) => state.day >= 3650,
    reward: { politicalCapital: 1000, approval: 20 }
  },
  {
    id: 'gdp_triple',
    name: '经济腾飞',
    description: 'GDP达到50000亿',
    icon: '📈',
    rarity: 'rare',
    category: 'economic',
    checkCondition: (state) => state.stats.gdp >= 50000,
    reward: { politicalCapital: 150 }
  },
  {
    id: 'gdp_10x',
    name: '经济奇迹',
    description: 'GDP达到200000亿',
    icon: '🚀',
    rarity: 'epic',
    category: 'economic',
    checkCondition: (state) => state.stats.gdp >= 200000,
    reward: { politicalCapital: 400 }
  },
  {
    id: 'full_employment',
    name: '充分就业',
    description: '失业率低于4%并保持30天',
    icon: '💼',
    rarity: 'rare',
    category: 'social',
    checkCondition: (state) => state.stats.unemployment <= 4,
    reward: { politicalCapital: 100, approval: 8 }
  },
  {
    id: 'zero_inflation',
    name: '物价稳定',
    description: '通胀率低于2%并保持30天',
    icon: '💴',
    rarity: 'rare',
    category: 'economic',
    checkCondition: (state) => state.stats.inflation <= 2,
    reward: { politicalCapital: 100, approval: 5 }
  },
  {
    id: 'debt_free',
    name: '无债一身轻',
    description: '完全还清所有主权债务',
    icon: '💰',
    rarity: 'epic',
    category: 'economic',
    checkCondition: (state) => state.treasury.debt <= 0,
    reward: { politicalCapital: 300, approval: 10 }
  },
  {
    id: 'treasury_millionaire',
    name: '国库充盈',
    description: '国库资金超过1万亿',
    icon: '🏛️',
    rarity: 'epic',
    category: 'economic',
    checkCondition: (state) => state.treasury.gold >= 1000000,
    reward: { politicalCapital: 200 }
  },
  {
    id: 'approval_90',
    name: '万民拥戴',
    description: '社会稳定度超过90%',
    icon: '❤️',
    rarity: 'epic',
    category: 'political',
    checkCondition: (state) => state.stats.stability >= 90,
    reward: { politicalCapital: 250 }
  },
  {
    id: 'stability_max',
    name: '国泰民安',
    description: '社会稳定度达到95%并保持',
    icon: '☮️',
    rarity: 'legendary',
    category: 'social',
    checkCondition: (state) => state.stats.stability >= 95,
    reward: { politicalCapital: 500 }
  },
  {
    id: 'crisis_survivor',
    name: '力挽狂澜',
    description: '成功执政超过500天',
    icon: '🛡️',
    rarity: 'epic',
    category: 'survival',
    checkCondition: (state) => state.day >= 500,
    reward: { politicalCapital: 200 }
  },
  {
    id: 'policy_master',
    name: '改革先锋',
    description: '激活10项政策',
    icon: '📜',
    rarity: 'rare',
    category: 'political',
    checkCondition: (state) => state.policies.length >= 10,
    reward: { politicalCapital: 150 }
  },
  {
    id: 'diplomatic_victory',
    name: '外交大师',
    description: '与所有国家建立良好外交关系',
    icon: '🤝',
    rarity: 'epic',
    category: 'diplomatic',
    checkCondition: (state) => state.day >= 500 && state.stats.stability >= 80,
    reward: { politicalCapital: 250, approval: 8 }
  },
  {
    id: 'survivor_10_crisis',
    name: '危机处理专家',
    description: '成功执政超过730天',
    icon: '⚔️',
    rarity: 'rare',
    category: 'survival',
    checkCondition: (state) => state.day >= 730,
    reward: { politicalCapital: 100 }
  },
  {
    id: 'industrial_powerhouse',
    name: '工业强国',
    description: '工业产值达到GDP的50%以上',
    icon: '🏭',
    rarity: 'rare',
    category: 'economic',
    checkCondition: (state) => state.day >= 365,
    reward: { politicalCapital: 120, approval: 5 }
  },
  {
    id: 'tech_leader',
    name: '科技先驱',
    description: '科技投入占GDP超过5%',
    icon: '🔬',
    rarity: 'epic',
    category: 'economic',
    checkCondition: (state) => state.day >= 730 && state.stats.stability >= 70,
    reward: { politicalCapital: 300, approval: 8 }
  },
  {
    id: 'green_revolution',
    name: '绿色革命',
    description: '清洁能源占比超过80%',
    icon: '🌱',
    rarity: 'legendary',
    category: 'social',
    checkCondition: (state) => state.day >= 1000 && state.stats.stability >= 85,
    reward: { politicalCapital: 600, approval: 15 }
  },
  {
    id: 'great_nation',
    name: '伟大复兴',
    description: '同时达成GDP世界第一、充分就业、物价稳定、社会和谐',
    icon: '🌟',
    rarity: 'legendary',
    category: 'economic',
    checkCondition: (state) => 
      state.stats.gdp >= 50000 &&
      state.stats.unemployment <= 4 &&
      state.stats.inflation <= 3 &&
      state.stats.stability >= 90,
    reward: { politicalCapital: 1000, gold: 100000 }
  }
]

const RARITY_COLORS = {
  common: 'from-slate-500/20 to-slate-600/20 border-slate-500/30',
  rare: 'from-blue-500/20 to-indigo-600/20 border-blue-500/30',
  epic: 'from-violet-500/20 to-purple-600/20 border-violet-500/30',
  legendary: 'from-amber-500/20 to-orange-600/20 border-amber-500/30'
}

const RARITY_GLOW = {
  common: 'shadow-slate-500/10',
  rare: 'shadow-blue-500/20',
  epic: 'shadow-violet-500/20',
  legendary: 'shadow-amber-500/30'
}

const RARITY_NAMES = {
  common: '普通',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说'
}

export function initAchievementState(): AchievementState {
  return {
    unlocked: [],
    locked: ACHIEVEMENTS.map(a => a.id),
    notifications: []
  }
}

export function checkAchievements(
  state: EconomyState, 
  prevState: EconomyState,
  achievementState: AchievementState
): { newState: AchievementState; unlockedAchievements: Achievement[] } {
  const unlockedAchievements: Achievement[] = []
  
  for (const achievement of ACHIEVEMENTS) {
    if (achievementState.unlocked.includes(achievement.id)) continue
    
    if (achievement.checkCondition(state, prevState)) {
      unlockedAchievements.push(achievement)
    }
  }
  
  if (unlockedAchievements.length === 0) {
    return { newState: achievementState, unlockedAchievements: [] }
  }
  
  const newUnlocked = [...achievementState.unlocked, ...unlockedAchievements.map(a => a.id)]
  const newLocked = achievementState.locked.filter(id => !unlockedAchievements.some(a => a.id === id))
  const newNotifications = [...achievementState.notifications, ...unlockedAchievements.map(a => a.id)]
  
  return {
    newState: {
      unlocked: newUnlocked,
      locked: newLocked,
      notifications: newNotifications
    },
    unlockedAchievements
  }
}

export function applyAchievementReward(state: EconomyState, achievement: Achievement): EconomyState {
  if (!achievement.reward) return state
  
  return {
    ...state,
    politicalCapital: state.politicalCapital + (achievement.reward.politicalCapital || 0),
    stats: {
      ...state.stats,
      stability: Math.min(100, state.stats.stability + (achievement.reward.approval || 0))
    },
    treasury: {
      ...state.treasury,
      gold: state.treasury.gold + (achievement.reward.gold || 0)
    }
  }
}

export { RARITY_COLORS, RARITY_GLOW, RARITY_NAMES }
