export type ScenarioType = 'historical-event' | 'life-simulation'

export interface DecisionOption {
  id: string
  text: string
  description?: string
  consequences?: string
  ideologyLoadings: Record<string, number>
  nextNodeId?: string
  endingId?: string
}

export interface ScenarioNode {
  id: string
  type: 'decision' | 'narrative' | 'ending'
  title: string
  content: string
  context?: string
  image?: string
  year?: number
  location?: string
  options?: DecisionOption[]
  nextNodeId?: string
  ideologyLoadings?: Record<string, number>
}

export interface ScenarioEnding {
  id: string
  title: string
  content: string
  summary: string
  historicalAccuracy?: 'accurate' | 'plausible' | 'alternate'
  characterFate?: string
  worldImpact?: string
}

export interface InteractiveScenario {
  id: string
  type: ScenarioType
  title: string
  subtitle: string
  description: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  startingNodeId: string
  nodes: Record<string, ScenarioNode>
  endings: Record<string, ScenarioEnding>
  tags: string[]
  historicalContext?: string
  authorNotes?: string
}

export interface PlayerState {
  currentNodeId: string
  decisionHistory: {
    nodeId: string
    optionId: string
    timestamp: number
  }[]
  accumulatedIdeologyScores: Record<string, number>
  visitedNodes: Set<string>
  currentPath: string[]
}

export interface ScenarioResult {
  scenarioId: string
  endingId: string
  ending: ScenarioEnding
  totalDecisions: number
  playTime: number
  ideologyScores: Record<string, number>
  decisionPath: string[]
  keyMoments: {
    nodeId: string
    choice: string
    impact: string
  }[]
}
