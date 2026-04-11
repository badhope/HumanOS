import type {
  InteractiveScenario,
  PlayerState,
  ScenarioNode,
  DecisionOption,
  ScenarioResult,
} from './interactive-scenario-types'
import { HISTORICAL_SCENARIOS } from './historical-scenarios'
import { LIFE_SIMULATION_SCENARIOS } from './life-simulation-scenarios'

export const ALL_INTERACTIVE_SCENARIOS = [...HISTORICAL_SCENARIOS, ...LIFE_SIMULATION_SCENARIOS]

export class ScenarioEngine {
  private scenario: InteractiveScenario
  private state: PlayerState
  private startTime: number

  constructor(scenarioId: string) {
    const scenario = ALL_INTERACTIVE_SCENARIOS.find((s) => s.id === scenarioId)
    if (!scenario) {
      throw new Error(`Scenario ${scenarioId} not found`)
    }
    this.scenario = scenario
    this.state = this.createInitialState()
    this.startTime = Date.now()
  }

  private createInitialState(): PlayerState {
    return {
      currentNodeId: this.scenario.startingNodeId,
      decisionHistory: [],
      accumulatedIdeologyScores: {},
      visitedNodes: new Set([this.scenario.startingNodeId]),
      currentPath: [this.scenario.startingNodeId],
    }
  }

  getCurrentNode(): ScenarioNode {
    const node = this.scenario.nodes[this.state.currentNodeId]
    if (!node) {
      throw new Error(`Node ${this.state.currentNodeId} not found`)
    }
    return node
  }

  getPlayerState(): PlayerState {
    return { ...this.state }
  }

  getScenario(): InteractiveScenario {
    return this.scenario
  }

  canMakeDecision(): boolean {
    const node = this.getCurrentNode()
    return node.type === 'decision' && !!node.options && node.options.length > 0
  }

  makeDecision(optionId: string): ScenarioNode | null {
    const node = this.getCurrentNode()
    if (node.type !== 'decision' || !node.options) {
      throw new Error('Current node is not a decision node')
    }

    const option = node.options.find((o) => o.id === optionId)
    if (!option) {
      throw new Error(`Option ${optionId} not found in node ${this.state.currentNodeId}`)
    }

    this.state.decisionHistory.push({
      nodeId: this.state.currentNodeId,
      optionId,
      timestamp: Date.now(),
    })

    this.accumulateIdeologyScores(option.ideologyLoadings)

    if (option.endingId) {
      return null
    }

    if (option.nextNodeId) {
      this.state.currentNodeId = option.nextNodeId
      this.state.visitedNodes.add(option.nextNodeId)
      this.state.currentPath.push(option.nextNodeId)
      return this.getCurrentNode()
    }

    return null
  }

  advanceNarrative(): ScenarioNode | null {
    const node = this.getCurrentNode()
    if (node.type !== 'narrative') {
      throw new Error('Current node is not a narrative node')
    }

    if (node.ideologyLoadings) {
      this.accumulateIdeologyScores(node.ideologyLoadings)
    }

    if (!node.nextNodeId) {
      return null
    }

    this.state.currentNodeId = node.nextNodeId
    this.state.visitedNodes.add(node.nextNodeId)
    this.state.currentPath.push(node.nextNodeId)
    return this.getCurrentNode()
  }

  private accumulateIdeologyScores(scores: Record<string, number>): void {
    Object.entries(scores).forEach(([ideology, score]) => {
      if (!this.state.accumulatedIdeologyScores[ideology]) {
        this.state.accumulatedIdeologyScores[ideology] = 0
      }
      this.state.accumulatedIdeologyScores[ideology] += score
    })
  }

  hasEnded(): boolean {
    const node = this.getCurrentNode()
    if (node.type === 'ending') {
      return true
    }
    if (node.type === 'decision' && node.options) {
      return node.options.some((o) => o.endingId && !o.nextNodeId)
    }
    return false
  }

  getEndingId(): string | null {
    const node = this.getCurrentNode()
    if (node.type === 'decision' && node.options) {
      const lastDecision = this.state.decisionHistory[this.state.decisionHistory.length - 1]
      if (lastDecision) {
        const option = node.options.find((o) => o.id === lastDecision.optionId)
        if (option?.endingId) {
          return option.endingId
        }
      }
    }
    return null
  }

  generateResult(): ScenarioResult {
    const endingId = this.getEndingId()
    if (!endingId) {
      throw new Error('Scenario has not ended properly')
    }

    const ending = this.scenario.endings[endingId]
    if (!ending) {
      throw new Error(`Ending ${endingId} not found`)
    }

    const normalizedScores = this.normalizeScores(this.state.accumulatedIdeologyScores)

    const keyMoments = this.state.decisionHistory.map((decision) => {
      const node = this.scenario.nodes[decision.nodeId]
      const option = node.options?.find((o) => o.id === decision.optionId)
      return {
        nodeId: decision.nodeId,
        choice: option?.text || '',
        impact: option?.consequences || '',
      }
    })

    return {
      scenarioId: this.scenario.id,
      endingId,
      ending,
      totalDecisions: this.state.decisionHistory.length,
      playTime: Math.round((Date.now() - this.startTime) / 1000),
      ideologyScores: normalizedScores,
      decisionPath: this.state.currentPath,
      keyMoments,
    }
  }

  private normalizeScores(scores: Record<string, number>): Record<string, number> {
    const values = Object.values(scores)
    if (values.length === 0) {
      return {}
    }

    const maxAbs = Math.max(...values.map(Math.abs))
    if (maxAbs === 0) {
      return {}
    }

    const normalized: Record<string, number> = {}
    Object.entries(scores).forEach(([ideology, score]) => {
      normalized[ideology] = Math.round((score / maxAbs) * 100) / 100
    })

    return normalized
  }

  getDominantIdeologies(topN: number = 5): Array<{ id: string; score: number }> {
    return Object.entries(this.state.accumulatedIdeologyScores)
      .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
      .slice(0, topN)
      .map(([id, score]) => ({ id, score }))
  }

  reset(): void {
    this.state = this.createInitialState()
    this.startTime = Date.now()
  }
}

export function getScenarioById(id: string): InteractiveScenario | undefined {
  return ALL_INTERACTIVE_SCENARIOS.find((s) => s.id === id)
}

export function getScenariosByType(type: 'historical-event' | 'life-simulation'): InteractiveScenario[] {
  return ALL_INTERACTIVE_SCENARIOS.filter((s) => s.type === type)
}
