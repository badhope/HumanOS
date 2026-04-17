import type { EconomyState } from './types'

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
  hidden?: boolean
  checkCondition: (state: EconomyState, prevState?: EconomyState) => boolean
}

export interface Milestone {
  id: string
  name: string
  description: string
  icon: string
  target: number
  reward?: string
}

export interface DailyTask {
  id: string
  name: string
  description: string
  icon: string
  progress: (state: EconomyState) => number
  target: number
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_year',
    name: '执政元年',
    description: '成功执政满1年',
    icon: '📅',
    rarity: 'common',
    checkCondition: (state) => state.day >= 365,
  },
  {
    id: 'five_years',
    name: '五年计划',
    description: '成功执政满5年',
    icon: '🏛️',
    rarity: 'uncommon',
    checkCondition: (state) => state.day >= 365 * 5,
  },
  {
    id: 'golden_decade',
    name: '黄金十年',
    description: '成功执政满10年',
    icon: '👑',
    rarity: 'rare',
    checkCondition: (state) => state.day >= 365 * 10,
  },
  {
    id: 'century',
    name: '世纪伟人',
    description: '成功执政满50年',
    icon: '🌟',
    rarity: 'legendary',
    checkCondition: (state) => state.day >= 365 * 50,
  },
  {
    id: 'balanced_budget',
    name: '预算平衡大师',
    description: '国库黄金超过50000',
    icon: '💰',
    rarity: 'uncommon',
    checkCondition: (state) => state.treasury.gold >= 50000,
  },
  {
    id: 'debt_free',
    name: '无债一身轻',
    description: '还清所有国债',
    icon: '🆓',
    rarity: 'rare',
    checkCondition: (state) => state.treasury.debt === 0 && state.treasury.gold > 0,
  },
  {
    id: 'full_employment',
    name: '充分就业',
    description: '失业率低于2%并保持30天',
    icon: '👥',
    rarity: 'rare',
    checkCondition: (state) => state.stats.unemployment < 2,
  },
  {
    id: 'price_stability',
    name: '物价稳定',
    description: '通胀率维持在正负1%之间并保持90天',
    icon: '📊',
    rarity: 'rare',
    checkCondition: (state) => Math.abs(state.stats.inflation) < 1,
  },
  {
    id: 'economic_miracle',
    name: '经济奇迹',
    description: 'GDP超过500000',
    icon: '🚀',
    rarity: 'legendary',
    checkCondition: (state) => state.stats.gdp >= 500000,
  },
  {
    id: 'hyperinflation_survivor',
    name: '恶性通胀幸存者',
    description: '在通胀率超过50%的情况下存活90天',
    icon: '🔥',
    rarity: 'uncommon',
    hidden: true,
    checkCondition: (state) => state.stats.inflation > 50,
  },
  {
    id: 'deep_recession',
    name: '大萧条',
    description: '经历失业率超过30%仍未倒台',
    icon: '📉',
    rarity: 'uncommon',
    hidden: true,
    checkCondition: (state) => state.stats.unemployment > 30,
  },
  {
    id: 'benevolent_dictator',
    name: '开明君主',
    description: '稳定度达到95%以上',
    icon: '❤️',
    rarity: 'rare',
    checkCondition: (state) => state.stats.stability >= 95,
  },
  {
    id: 'industrialization',
    name: '工业革命',
    description: '失业率低于5%',
    icon: '🏭',
    rarity: 'uncommon',
    checkCondition: (state) => state.stats.unemployment <= 5,
  },
  {
    id: 'keynes_master',
    name: '凯恩斯主义大师',
    description: '通胀率低于2%并保持稳定',
    icon: '📈',
    rarity: 'rare',
    hidden: true,
    checkCondition: (state) => state.stats.inflation <= 2,
  },
  {
    id: 'speedrunner',
    name: '速通玩家',
    description: '用10倍速游戏并执政1年',
    icon: '⚡',
    rarity: 'common',
    hidden: true,
    checkCondition: (state) => state.day >= 365,
  },
]

export const MILESTONES: Milestone[] = [
  {
    id: 'm_100d',
    name: '百日新政',
    description: '度过执政前100天',
    icon: '🌅',
    target: 100,
  },
  {
    id: 'm_1y',
    name: '执政满年',
    description: '成功执政一周年',
    icon: '🎂',
    target: 365,
  },
  {
    id: 'm_1t',
    name: '万亿俱乐部',
    description: 'GDP达到1万亿',
    icon: '💎',
    target: 1000000,
  },
  {
    id: 'm_100b_gold',
    name: '国库充盈',
    description: '国库储备达到1000亿',
    icon: '🪙',
    target: 100000,
  },
  {
    id: 'm_stability_90',
    name: '国泰民安',
    description: '稳定度达到90%',
    icon: '☮️',
    target: 90,
  },
  {
    id: 'm_crisis_5',
    name: '危机处理专家',
    description: '成功处理5次随机事件',
    icon: '🛡️',
    target: 5,
  },
]

export const DAILY_TASKS: DailyTask[] = [
  {
    id: 't_play_5m',
    name: '每日理政',
    description: '累计游戏5分钟',
    icon: '⏰',
    progress: (state) => Math.min(state.day, 300),
    target: 300,
  },
  {
    id: 't_surplus',
    name: '财政健康',
    description: '减少债务10000',
    icon: '💵',
    progress: (state) => Math.max(0, 50000 - state.treasury.debt) / 10000,
    target: 1,
  },
  {
    id: 't_no_crisis',
    name: '太平无事',
    description: '平安度过30天',
    icon: '🕊️',
    progress: (state) => Math.min(state.day % 100, 30),
    target: 30,
  },
  {
    id: 't_build',
    name: '基建狂魔',
    description: '国库黄金超过10000',
    icon: '🏗️',
    progress: (state) => Math.min(Math.floor(state.treasury.gold / 1000), 10),
    target: 10,
  },
]

export class AchievementTracker {
  private unlockedAchievements: Set<string> = new Set()
  private onUnlock?: (achievement: Achievement) => void

  constructor() {
    const saved = localStorage.getItem('economy-achievements')
    if (saved) {
      this.unlockedAchievements = new Set(JSON.parse(saved))
    }
  }

  setUnlockCallback(callback: (achievement: Achievement) => void) {
    this.onUnlock = callback
  }

  checkAchievements(state: any, prevState?: any): Achievement[] {
    const newlyUnlocked: Achievement[] = []

    for (const achievement of ACHIEVEMENTS) {
      if (this.unlockedAchievements.has(achievement.id)) continue

      if (achievement.checkCondition(state as EconomyState, prevState as EconomyState)) {
        this.unlockedAchievements.add(achievement.id)
        newlyUnlocked.push(achievement)

        if (this.onUnlock) {
          this.onUnlock(achievement)
        }
      }
    }

    if (newlyUnlocked.length > 0) {
      this.save()
    }

    return newlyUnlocked
  }

  isUnlocked(achievementId: string): boolean {
    return this.unlockedAchievements.has(achievementId)
  }

  getUnlockedCount(): number {
    return this.unlockedAchievements.size
  }

  getTotalCount(): number {
    return ACHIEVEMENTS.length
  }

  private save() {
    localStorage.setItem('economy-achievements', JSON.stringify([...this.unlockedAchievements]))
  }

  getProgress(): number {
    return Math.round((this.getUnlockedCount() / this.getTotalCount()) * 100)
  }
}
