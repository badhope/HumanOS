import type { HiddenCheck, InventoryItem, CheckResult } from './probability-system'

export interface XianxiaCharacter {
  name: string
  avatar: string
  mood: 'normal' | 'sneer' | 'cold' | 'warm' | 'shocked' | 'dying' | 'smirk' | 'pity'
}

export interface XianxiaStats {
  spiritualRoot: number
  mindset: number
  karma: number
  cruelty: number
  luck: number
  cunning: number
}

export interface SceneChoice {
  text: string
  nextScene: string
  hint?: string
  statChanges?: Partial<XianxiaStats>
  itemGain?: string
  itemRequire?: string
  hiddenCheck?: HiddenCheck
  onCheckResult?: Partial<Record<CheckResult, string>>
  flag?: string
  hidden?: boolean
}

export interface XianxiaScene {
  id: string
  chapter: string
  title: string
  background: string
  bgm?: string
  narrator: string
  character?: XianxiaCharacter
  dialogue?: string
  choices: SceneChoice[]
  effects?: ('shake' | 'fade' | 'zoom' | 'blood')[]
  isEnding?: boolean
  endingType?: string
}

export type GameState = {
  currentScene: string
  stats: XianxiaStats
  flags: Set<string>
  visitedScenes: Set<string>
  history: string[]
  inventory: InventoryItem[]
}

export type DiceRollState = {
  isRolling: boolean
  result: CheckResult | null
  checkName: string
  probability: number
  showResult: boolean
}

export const INITIAL_STATS: XianxiaStats = {
  spiritualRoot: 50,
  mindset: 50,
  karma: 50,
  cruelty: 50,
  luck: 50,
  cunning: 50,
}

export const STAT_NAMES: Record<keyof XianxiaStats, string> = {
  spiritualRoot: '灵根资质',
  mindset: '道心心性',
  karma: '因果机缘',
  cruelty: '杀伐果断',
  luck: '气运造化',
  cunning: '心智城府',
}

export const STAT_COLORS: Record<keyof XianxiaStats, string> = {
  spiritualRoot: 'from-cyan-400 to-blue-500',
  mindset: 'from-amber-400 to-yellow-500',
  karma: 'from-purple-400 to-pink-500',
  cruelty: 'from-red-500 to-rose-600',
  luck: 'from-green-400 to-emerald-500',
  cunning: 'from-gray-400 to-slate-500',
}
