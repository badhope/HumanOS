export type WorldCategory = 'historical' | 'life' | 'civilization' | 'social-experiment' | 'grand-simulation'

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type ValueDimension =
  | 'liberty'
  | 'equality'
  | 'order'
  | 'tradition'
  | 'progress'
  | 'individualism'
  | 'collectivism'
  | 'meritocracy'
  | 'compassion'
  | 'justice'
  | 'stability'
  | 'innovation'
  | 'nationalism'
  | 'globalism'
  | 'authority'
  | 'autonomy'
  | 'reason'
  | 'virtue'

export interface ValueLoading {
  dimension: ValueDimension
  weight: number
}

export interface DecisionConsequence {
  text: string
  type: 'positive' | 'negative' | 'neutral' | 'plot_critical'
}

export interface DecisionOption {
  id: string
  text: string
  description?: string
  consequences?: string
  valueLoadings: ValueLoading[]
  nextNode: string
}

export interface ScenarioNode {
  id: string
  type: 'narrative' | 'decision' | 'ending'
  title: string
  content: string
  year?: string
  location?: string
  context?: string
  options?: DecisionOption[]
  nextNode?: string
}

export interface Ending {
  id: string
  title: string
  summary: string
  content: string
  characterFate?: string
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
  valueProfile: ValueDimension[]
}

export interface WorldScenario {
  id: string
  category: WorldCategory
  title: string
  subtitle: string
  description: string
  coverImage: string
  icon: string
  difficulty: DifficultyLevel
  estimatedDuration: number
  decisionPoints: number
  endingCount: number
  tags: string[]
  featured?: boolean
  new?: boolean
  author?: string
  releaseDate?: string
  setting: {
    era: string
    location: string
    premise: string
  }
  startNode: string
  nodes: Record<string, ScenarioNode>
  endings: Record<string, Ending>
  valueDimensions: ValueDimension[]
  achievements?: ScenarioAchievement[]
}

export interface ScenarioAchievement {
  id: string
  name: string
  description: string
  icon: string
  hidden?: boolean
  condition: string
}

export interface PlayerProfile {
  id: string
  name: string
  completedScenarios: string[]
  unlockedEndings: Record<string, string[]>
  achievements: string[]
  valueMatrix: Record<ValueDimension, number>
  decisionHistory: {
    scenarioId: string
    nodeId: string
    optionId: string
    timestamp: number
  }[]
  totalPlayTime: number
}

export interface PlayState {
  scenarioId: string
  currentNodeId: string
  visitedNodes: string[]
  decisionPath: {
    nodeId: string
    optionId: string
    optionText: string
    valueLoadings: ValueLoading[]
  }[]
  accumulatedValues: Record<ValueDimension, number>
  startTime: number
  currentPlayTime: number
}

export interface ValueProfile {
  dominant: { dimension: ValueDimension; score: number }[]
  balanced: ValueDimension[]
  conflicts: [ValueDimension, ValueDimension][]
  archetype: string
  archetypeDescription: string
}

export interface ScenarioResult {
  scenarioId: string
  scenarioTitle: string
  ending: Ending
  playTime: number
  decisionCount: number
  valueProfile: ValueProfile
  keyDecisions: {
    choice: string
    impact: string
    values: ValueDimension[]
  }[]
  archetypeMatch: {
    historicalFigure?: string
    description?: string
    similarity: number
  }
  crossScenarioInsights?: string[]
}
