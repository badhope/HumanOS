import type { CultivationState } from './types'
import { REALM_CONFIGS } from './realm-system'

export const XIANXIA_THEME = {
  colors: {
    primary: '#8B5CF6',
    secondary: '#06B6D4',
    accent: '#F59E0B',
    danger: '#EF4444',
    success: '#10B981',
    dark: '#1F2937',
    panel: 'rgba(30, 41, 59, 0.95)',
    panelLight: 'rgba(51, 65, 85, 0.9)',
    gold: '#D97706',
    immortal: '#A78BFA',
    demonic: '#DC2626',
    buddhist: '#FBBF24'
  },
  fonts: {
    title: '"Ma Shan Zheng", "Noto Serif SC", serif',
    body: '"Noto Sans SC", sans-serif',
    numbers: '"Courier New", monospace'
  },
  effects: {
    glow: '0 0 20px rgba(139, 92, 246, 0.5)',
    goldenGlow: '0 0 20px rgba(217, 119, 6, 0.6)',
    dao: '0 0 30px rgba(167, 139, 250, 0.8)'
  }
}

export function getRealmColor(realm: string): string {
  const tierColors: Record<number, string> = {
    0: '#9CA3AF',
    1: '#10B981',
    2: '#3B82F6',
    3: '#8B5CF6',
    4: '#EC4899',
    5: '#F59E0B',
    6: '#EF4444',
    7: '#06B6D4',
    8: '#8B5CF6',
    9: '#A78BFA',
    10: '#FBBF24'
  }
  const config = REALM_CONFIGS[realm as keyof typeof REALM_CONFIGS]
  if (!config) return '#9CA3AF'
  return tierColors[config.tier] || '#9CA3AF'
}

export function getRealmGlow(realm: string): string {
  const color = getRealmColor(realm)
  return `0 0 15px ${color}`
}

export interface XianxiaPanelProps {
  title: string
  icon?: string
  collapsible?: boolean
  children: React.ReactNode
}

export interface CharacterStatusCardProps {
  state: CultivationState
  compact?: boolean
}

export interface CultivationProgressProps {
  state: CultivationState
  onBreakthrough: () => void
  canBreakthrough: boolean
}

export interface ResourcePanelProps {
  state: CultivationState
}

export interface InventoryPanelProps {
  state: CultivationState
  onUseItem: (itemId: string) => void
  onEquipItem: (itemId: string) => void
}

export interface TechniquePanelProps {
  state: CultivationState
  onSetActive: (techniqueId: string) => void
  onCultivate: (techniqueId: string) => void
}

export interface AlchemyPanelProps {
  state: CultivationState
  onCraft: (recipeId: string, useBonus: boolean) => void
}

export interface RefiningPanelProps {
  state: CultivationState
  onCraft: (recipeId: string) => void
}

export interface FactionPanelProps {
  state: CultivationState
  onJoin: (factionId: string) => void
  onContribute: (amount: number) => void
  onLeave: () => void
}

export interface SecretRealmPanelProps {
  state: CultivationState
  onEnter: (realmId: string) => void
  onExplore: () => void
  onExit: () => void
}

export interface EventDialogProps {
  state: CultivationState
  onChoice: (choiceId: string) => void
}

export interface HistoryLogProps {
  state: CultivationState
  maxEntries?: number
}

export const XIANXIA_ICONS = {
  cultivation: '✨',
  realm: '🌟',
  spirit: '💫',
  lifespan: '⏳',
  health: '❤️',
  spiritStone: '💎',
  pill: '💊',
  artifact: '⚔️',
  technique: '📖',
  dao: '☯️',
  faction: '🏛️',
  secretRealm: '🗺️',
  event: '🎲',
  alchemy: '🔥',
  refining: '⚒️',
  npc: '👤',
  quest: '📜',
  achievement: '🏆',
  cave: '🏔️',
  breakthrough: '💥',
  tribulation: '⚡',
  enlightenment: '💡',
  karma: '⚖️',
  luck: '🍀'
}

export function formatLargeNumber(n: number): string {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + '兆'
  if (n >= 1e8) return (n / 1e8).toFixed(2) + '亿'
  if (n >= 1e4) return (n / 1e4).toFixed(2) + '万'
  return Math.floor(n).toString()
}

export function formatTime(years: number): string {
  if (years >= 10000) return (years / 10000).toFixed(1) + '万年'
  if (years >= 1) return years.toFixed(1) + '年'
  return Math.floor(years * 365) + '天'
}

export function getMoodEmoji(mood: string): string {
  const moods: Record<string, string> = {
    calm: '😌',
    enlightened: '🤩',
    agitated: '😤',
    depressed: '😞',
    furious: '😡',
    fearful: '😰',
    greedy: '🤑',
    arrogant: '😏',
    merciful: '🙏'
  }
  return moods[mood] || '😐'
}

export function getMoodName(mood: string): string {
  const moods: Record<string, string> = {
    calm: '平静',
    enlightened: '顿悟',
    agitated: '烦躁',
    depressed: '低落',
    furious: '暴怒',
    fearful: '恐惧',
    greedy: '贪婪',
    arrogant: '傲慢',
    merciful: '慈悲'
  }
  return moods[mood] || '未知'
}

export function getKarmaDescription(value: number): string {
  if (value >= 500) return '功德无量'
  if (value >= 200) return '善人君子'
  if (value >= 100) return '问心无愧'
  if (value >= 0) return '凡夫俗子'
  if (value >= -100) return '小有劣迹'
  if (value >= -300) return '劣迹斑斑'
  if (value >= -600) return '大奸大恶'
  return '万恶不赦'
}

export function getRootDescription(rootValue: number): string {
  if (rootValue >= 95) return '天灵根/变异灵根 - 万中无一'
  if (rootValue >= 80) return '双灵根 - 天才之资'
  if (rootValue >= 60) return '三灵根 - 优秀'
  if (rootValue >= 40) return '四灵根 - 普通'
  return '五灵根/伪灵根 - 修仙困难'
}

export function generateStatusSummary(state: CultivationState): string {
  const realm = REALM_CONFIGS[state.cultivation.realm]
  const summary = [
    `第${state.day}天`,
    `${realm.name}`,
    `${Math.floor(state.vitals.age)}岁/${formatTime(state.vitals.lifespan)}`,
    `灵石: ${state.spiritStones.low + state.spiritStones.mid * 100 + state.spiritStones.high * 10000}`,
    `境界进度: ${Math.floor(state.cultivation.progress)}%`
  ]
  return summary.join(' | ')
}
