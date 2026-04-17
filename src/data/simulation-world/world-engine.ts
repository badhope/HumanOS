import type {
  WorldScenario,
  ScenarioNode,
  DecisionOption,
  PlayState,
  ValueProfile,
  ValueDimension,
  PlayerProfile,
  ScenarioResult,
} from './world-types'

import { recordScenarioCompletion } from './player-storage'

import { FRENCH_REVOLUTION } from './scenarios/french-revolution'
import { MODERN_CHINA_LIFE } from './scenarios/modern-china-life'
import { CHINA_CIVILIZATION } from './scenarios/china-civilization'
import { COUNTRY_SIMULATOR } from './scenarios/country-simulator'
import { XIANXIA_WORLD } from './scenarios/xianxia-world'

const WORLD_SCENARIOS: Record<string, WorldScenario> = {}

export function registerScenario(scenario: WorldScenario) {
  WORLD_SCENARIOS[scenario.id] = scenario
}

registerScenario(FRENCH_REVOLUTION)
registerScenario(MODERN_CHINA_LIFE)
registerScenario(CHINA_CIVILIZATION)
registerScenario(COUNTRY_SIMULATOR)
registerScenario(XIANXIA_WORLD)

export function getAllScenarios(): WorldScenario[] {
  return Object.values(WORLD_SCENARIOS)
}

export function getScenarioById(id: string): WorldScenario | undefined {
  return WORLD_SCENARIOS[id]
}

export function getScenariosByCategory(category: string): WorldScenario[] {
  return Object.values(WORLD_SCENARIOS).filter((s) => s.category === category)
}

export class WorldEngine {
  private scenario: WorldScenario
  private state: PlayState
  private playerProfile: PlayerProfile

  constructor(scenarioId: string, playerProfile?: PlayerProfile) {
    const scenario = getScenarioById(scenarioId)
    if (!scenario) {
      throw new Error(`Scenario ${scenarioId} not found`)
    }
    this.scenario = scenario
    this.playerProfile = playerProfile || this.createEmptyProfile()
    this.state = this.createInitialState()
  }

  private createEmptyProfile(): PlayerProfile {
    return {
      id: 'anonymous',
      name: '旅行者',
      completedScenarios: [],
      unlockedEndings: {},
      achievements: [],
      valueMatrix: {} as Record<ValueDimension, number>,
      decisionHistory: [],
      totalPlayTime: 0,
    }
  }

  private createInitialState(): PlayState {
    const initialValues = {} as Record<ValueDimension, number>
    this.scenario.valueDimensions.forEach((dim) => {
      initialValues[dim] = 0
    })

    return {
      scenarioId: this.scenario.id,
      currentNodeId: this.scenario.startNode,
      visitedNodes: [this.scenario.startNode],
      decisionPath: [],
      accumulatedValues: initialValues,
      startTime: Date.now(),
      currentPlayTime: 0,
    }
  }

  getScenario(): WorldScenario {
    return this.scenario
  }

  getCurrentNode(): ScenarioNode {
    return this.scenario.nodes[this.state.currentNodeId]
  }

  getState(): PlayState {
    return {
      ...this.state,
      currentPlayTime: Date.now() - this.state.startTime,
    }
  }

  advanceNarrative(): ScenarioNode | null {
    const currentNode = this.getCurrentNode()
    if (currentNode.type !== 'narrative' || !currentNode.nextNode) {
      return null
    }

    this.state.currentNodeId = currentNode.nextNode
    this.state.visitedNodes.push(currentNode.nextNode)
    return this.getCurrentNode()
  }

  makeDecision(optionId: string): ScenarioNode | null {
    const currentNode = this.getCurrentNode()
    if (currentNode.type !== 'decision' || !currentNode.options) {
      return null
    }

    const option = currentNode.options.find((o) => o.id === optionId)
    if (!option) {
      return null
    }

    this.state.decisionPath.push({
      nodeId: currentNode.id,
      optionId: option.id,
      optionText: option.text,
      valueLoadings: option.valueLoadings,
    })

    option.valueLoadings.forEach((loading) => {
      this.state.accumulatedValues[loading.dimension] =
        (this.state.accumulatedValues[loading.dimension] || 0) + loading.weight
    })

    this.state.currentNodeId = option.nextNode
    this.state.visitedNodes.push(option.nextNode)

    return this.getCurrentNode()
  }

  hasEnded(): boolean {
    const node = this.getCurrentNode()
    return node.type === 'ending'
  }

  getDominantValues(topN: number = 3): { dimension: ValueDimension; score: number }[] {
    return Object.entries(this.state.accumulatedValues)
      .map(([dimension, score]) => ({ dimension: dimension as ValueDimension, score }))
      .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))
      .slice(0, topN)
  }

  generateValueProfile(): ValueProfile {
    const values = Object.entries(this.state.accumulatedValues)
      .map(([dimension, score]) => ({ dimension: dimension as ValueDimension, score }))
      .sort((a, b) => Math.abs(b.score) - Math.abs(a.score))

    const dominant = values.filter((v) => Math.abs(v.score) >= 1.5).slice(0, 5)
    const balanced = values
      .filter((v) => Math.abs(v.score) < 0.5 && v.score !== 0)
      .map((v) => v.dimension)

    const conflicts: [ValueDimension, ValueDimension][] = []
    const conflictPairs: [ValueDimension, ValueDimension][] = [
      ['liberty', 'order'],
      ['equality', 'meritocracy'],
      ['individualism', 'collectivism'],
      ['tradition', 'progress'],
      ['nationalism', 'globalism'],
      ['authority', 'autonomy'],
      ['stability', 'innovation'],
    ]

    conflictPairs.forEach(([left, right]) => {
      const scoreL = this.state.accumulatedValues[left] || 0
      const scoreR = this.state.accumulatedValues[right] || 0
      if (Math.abs(scoreL) > 1 && Math.abs(scoreR) > 1 && scoreL * scoreR < 0) {
        conflicts.push([left, right])
      }
    })

    const archetypes = this.determineArchetype(dominant)

    return {
      dominant,
      balanced,
      conflicts,
      archetype: archetypes.name,
      archetypeDescription: archetypes.description,
    }
  }

  private determineArchetype(dominant: { dimension: ValueDimension; score: number }[]): {
    name: string
    description: string
  } {
    const valueSet = new Set(dominant.map((d) => d.dimension))

    if (valueSet.has('order') && valueSet.has('tradition')) {
      return {
        name: '保守守护者',
        description: '你珍视传统与秩序，相信经过时间检验的制度与价值。稳定是你最大的追求。',
      }
    }

    if (valueSet.has('progress') && valueSet.has('equality')) {
      return {
        name: '进步理想主义者',
        description: '你坚信社会可以变得更好，平等与公正是你不懈的追求。',
      }
    }

    if (valueSet.has('liberty') && valueSet.has('individualism')) {
      return {
        name: '自由个人主义者',
        description: '个人自由是最高价值，每个人都应该为自己的人生负责。',
      }
    }

    if (valueSet.has('collectivism') && valueSet.has('equality')) {
      return {
        name: '社群主义者',
        description: '你相信共同体的力量，没有人是孤岛，我们彼此相连。',
      }
    }

    if (valueSet.has('justice') && valueSet.has('compassion')) {
      return {
        name: '慈悲审判者',
        description: '公义与怜悯在你心中并存，你追求一个既公平又有人情味的世界。',
      }
    }

    return {
      name: '平衡现实主义者',
      description: '你拒绝极端，在各种价值中寻找微妙的平衡。世界是复杂的，答案从不简单。',
    }
  }

  generateResult(): ScenarioResult {
    const node = this.getCurrentNode()
    const endingId = node.id.replace('ending_', '')
    const ending = this.scenario.endings[endingId] || Object.values(this.scenario.endings)[0]
    const valueProfile = this.generateValueProfile()

    const keyDecisions = this.state.decisionPath.slice(-5).map((decision) => ({
      choice: decision.optionText,
      impact: this.getDecisionImpact(decision.valueLoadings),
      values: decision.valueLoadings
        .filter((v) => Math.abs(v.weight) >= 0.5)
        .map((v) => v.dimension),
    }))

    const archetypeMatch = this.matchHistoricalFigure(valueProfile)

    const playTime = Math.round((Date.now() - this.state.startTime) / 1000)

    recordScenarioCompletion(
      this.scenario.id,
      endingId,
      playTime,
      this.state.accumulatedValues
    )

    return {
      scenarioId: this.scenario.id,
      scenarioTitle: this.scenario.title,
      ending,
      playTime,
      decisionCount: this.state.decisionPath.length,
      valueProfile,
      keyDecisions,
      archetypeMatch,
    }
  }

  private getDecisionImpact(loadings: { dimension: ValueDimension; weight: number }[]): string {
    const significant = loadings.filter((l) => Math.abs(l.weight) >= 0.8)
    if (significant.length === 0) return '这个选择没有体现强烈的价值倾向'

    const impacts = significant.map((l) => {
      const direction = l.weight > 0 ? '+' : '-'
      return `${direction}${l.dimension}`
    })

    return `价值倾向: ${impacts.join(', ')}`
  }

  private matchHistoricalFigure(valueProfile: ValueProfile): {
    historicalFigure?: string
    description?: string
    similarity: number
  } {
    const topValues = new Set(valueProfile.dominant.slice(0, 3).map((d) => d.dimension))

    const figures = [
      {
        name: '拿破仑·波拿巴',
        values: new Set<ValueDimension>(['order', 'authority', 'nationalism', 'meritocracy']),
        description: '如拿破仑一般，你相信强者创造秩序，用铁腕推动进步。',
      },
      {
        name: '马克西米连·罗伯斯庇尔',
        values: new Set<ValueDimension>(['equality', 'justice', 'collectivism', 'authority']),
        description: '你对平等和正义有着近乎狂热的追求，不惜一切代价实现理想。',
      },
      {
        name: '孔多塞侯爵',
        values: new Set<ValueDimension>(['progress', 'reason', 'equality', 'liberty']),
        description: '理性与进步的信徒，相信人类可以通过知识不断自我完善。',
      },
      {
        name: '埃德蒙·伯克',
        values: new Set<ValueDimension>(['tradition', 'order', 'stability', 'authority']),
        description: '审慎的保守主义者，相信传统是历代智慧的结晶。',
      },
      {
        name: '托马斯·潘恩',
        values: new Set<ValueDimension>(['liberty', 'equality', 'progress', 'reason']),
        description: '自由的使者，相信人的天赋权利可以推翻一切不合理的制度。',
      },
    ]

    let bestMatch = figures[0]
    let bestScore = 0

    figures.forEach((figure) => {
      const intersection = [...topValues].filter((v) => figure.values.has(v)).length
      const score = intersection / Math.max(topValues.size, 1)
      if (score > bestScore) {
        bestScore = score
        bestMatch = figure
      }
    })

    return {
      historicalFigure: bestMatch.name,
      description: bestMatch.description,
      similarity: Math.round(bestScore * 100),
    }
  }

  restart(): void {
    this.state = this.createInitialState()
  }
}
