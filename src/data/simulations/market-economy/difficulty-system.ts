import type { EconomyState } from './types'

export type DifficultyLevel = 'tutorial' | 'easy' | 'normal' | 'hard' | 'expert'

export interface DifficultyConfig {
  id: DifficultyLevel
  name: string
  description: string
  icon: string
  recommended: boolean
  startingBonus: Partial<EconomyState['stats'] & EconomyState['treasury']>
  eventProbabilityMultiplier: number
  crisisProbabilityMultiplier: number
  playerBonusMultiplier: number
  aiAggressiveness: number
  inflationSensitivity: number
  unemploymentSensitivity: number
  debtInterestRate: number
  unlockTips: boolean
  autoStabilize: boolean
}

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  tutorial: {
    id: 'tutorial',
    name: '教学模式',
    description: '专为新手设计，事件极少，经济自动稳定，适合学习基本操作',
    icon: '🎓',
    recommended: false,
    startingBonus: {
      gold: 50000,
      debt: 0,
      stability: 85,
      bureaucracy: 70,
    },
    eventProbabilityMultiplier: 0.1,
    crisisProbabilityMultiplier: 0,
    playerBonusMultiplier: 2.0,
    aiAggressiveness: 0,
    inflationSensitivity: 0.2,
    unemploymentSensitivity: 0.2,
    debtInterestRate: 0.01,
    unlockTips: true,
    autoStabilize: true,
  },
  easy: {
    id: 'easy',
    name: '州长难度',
    description: '友好的经济环境，充足的启动资金，危机出现频率较低',
    icon: '🌱',
    recommended: false,
    startingBonus: {
      gold: 30000,
      debt: 10000,
      stability: 75,
      bureaucracy: 60,
    },
    eventProbabilityMultiplier: 0.5,
    crisisProbabilityMultiplier: 0.3,
    playerBonusMultiplier: 1.5,
    aiAggressiveness: 0.3,
    inflationSensitivity: 0.5,
    unemploymentSensitivity: 0.5,
    debtInterestRate: 0.02,
    unlockTips: true,
    autoStabilize: false,
  },
  normal: {
    id: 'normal',
    name: '省长难度',
    description: '标准难度，平衡的游戏体验，适合大多数玩家',
    icon: '⚖️',
    recommended: true,
    startingBonus: {
      gold: 15000,
      debt: 50000,
      stability: 65,
      bureaucracy: 50,
    },
    eventProbabilityMultiplier: 1.0,
    crisisProbabilityMultiplier: 1.0,
    playerBonusMultiplier: 1.0,
    aiAggressiveness: 0.7,
    inflationSensitivity: 1.0,
    unemploymentSensitivity: 1.0,
    debtInterestRate: 0.03,
    unlockTips: false,
    autoStabilize: false,
  },
  hard: {
    id: 'hard',
    name: '总理难度',
    description: '严峻的经济形势，频繁的危机事件，需要谨慎决策',
    icon: '⚔️',
    recommended: false,
    startingBonus: {
      gold: 5000,
      debt: 120000,
      stability: 50,
      bureaucracy: 35,
    },
    eventProbabilityMultiplier: 1.5,
    crisisProbabilityMultiplier: 2.0,
    playerBonusMultiplier: 0.7,
    aiAggressiveness: 1.2,
    inflationSensitivity: 1.5,
    unemploymentSensitivity: 1.5,
    debtInterestRate: 0.05,
    unlockTips: false,
    autoStabilize: false,
  },
  expert: {
    id: 'expert',
    name: '总统难度',
    description: '地狱级挑战，开局即危机，任何错误都可能导致政府垮台',
    icon: '💀',
    recommended: false,
    startingBonus: {
      gold: 1000,
      debt: 250000,
      stability: 35,
      bureaucracy: 20,
    },
    eventProbabilityMultiplier: 2.5,
    crisisProbabilityMultiplier: 4.0,
    playerBonusMultiplier: 0.4,
    aiAggressiveness: 2.0,
    inflationSensitivity: 2.5,
    unemploymentSensitivity: 2.5,
    debtInterestRate: 0.08,
    unlockTips: false,
    autoStabilize: false,
  },
}

export function applyDifficultySettings(
  state: EconomyState,
  difficulty: DifficultyLevel
): EconomyState {
  const config = DIFFICULTY_CONFIGS[difficulty]
  const bonus = config.startingBonus

  return {
    ...state,
    treasury: {
      ...state.treasury,
      gold: bonus.gold || state.treasury.gold,
      debt: bonus.debt !== undefined ? bonus.debt : state.treasury.debt,
    },
    stats: {
      ...state.stats,
      stability: bonus.stability !== undefined ? bonus.stability : state.stats.stability,
      bureaucracy: bonus.bureaucracy !== undefined ? bonus.bureaucracy : state.stats.bureaucracy,
    },
  } as EconomyState
}

export function getDifficultyConfig(difficulty: DifficultyLevel): DifficultyConfig {
  return DIFFICULTY_CONFIGS[difficulty]
}

export function getDifficultyList(): DifficultyConfig[] {
  return Object.values(DIFFICULTY_CONFIGS)
}
