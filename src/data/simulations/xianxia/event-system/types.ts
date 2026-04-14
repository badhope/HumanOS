import type { XianxiaStats } from '../types'
import type { InventoryItem } from '../probability-system'

export type ConditionOperator = '>' | '<' | '>=' | '<=' | '==' | '!=' | 'has' | '!has'

export interface Condition {
  type: 'stat' | 'item' | 'flag' | 'hidden' | 'relationship' | 'random' | 'cooldown'
  key: string
  operator: ConditionOperator
  value: any
}

export interface ConditionGroup {
  AND?: Condition[]
  OR?: Condition[]
  NOT?: Condition[]
}

export interface EventEffects {
  stats?: Partial<XianxiaStats>
  hidden?: { [key: string]: number }
  flags?: string[]
  removeFlags?: string[]
  inventory?: string[]
  removeItems?: string[]
  relationships?: { [npc: string]: number }
  nextEvent?: string
  endGame?: boolean
  endingType?: 'TRUE_END' | 'GOOD_END' | 'BAD_END'
}

export interface EventChoice {
  id: string
  text: string
  conditions?: ConditionGroup
  effects?: EventEffects
  hiddenCheck?: {
    stat: keyof XianxiaStats
    threshold: number
    onCheckResult?: {
      critical_success?: EventEffects
      success?: EventEffects
      failure?: EventEffects
      critical_failure?: EventEffects
    }
  }
}

export interface GameEvent {
  id: string
  chapter: string
  title: string
  weight: number
  priority: number
  cooldown: number
  maxOccurrences: number
  onceOnly: boolean
  tags: string[]
  
  conditions: ConditionGroup
  
  is_mainline?: boolean
  deadline_day?: number
  fallback_trigger_day?: number
  
  difficulty_scaling?: {
    stat: keyof XianxiaStats
    base_threshold: number
    per_point_reduction: number
    min_threshold: number
  }
  
  narrator: string
  character?: {
    name: string
    avatar: string
    mood: 'normal' | 'sneer' | 'cold' | 'warm' | 'shocked'
  }
  background: string
  effects?: EventEffects
  choices: EventChoice[]
  
  isEnding?: boolean
  endingType?: 'TRUE_END' | 'GOOD_END' | 'BAD_END'
}

export interface HiddenVariables {
  day: number
  time_of_day: 'morning' | 'afternoon' | 'evening' | 'night'
  mo_haofu_trust: number
  hanli_suspicion: number
  qixuan_reputation: number
  demonic_tendency: number
  immortal_fate: number
  poison_resistance: number
  medicine_residue: number
}

export interface GameState {
  stats: XianxiaStats
  inventory: InventoryItem[]
  hidden: HiddenVariables
  flags: Set<string>
  relationships: Map<string, number>
  eventHistory: Map<string, number>
  cooldowns: Map<string, number>
  currentEventId: string | null
  turn: number
}
