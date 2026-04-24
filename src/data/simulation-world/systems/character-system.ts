export interface BigFive {
  openness: number
  conscientiousness: number
  extraversion: number
  agreeableness: number
  neuroticism: number
}

interface MoralValueProfile {
  individualism: number
  tradition: number
  hedonism: number
  achievement: number
  power: number
  benevolence: number
  universalism: number
  security: number
  conformity: number
  stimulation: number
  selfDirection: number
}

export type MotiveType = 
  | 'wealth' | 'power' | 'fame' | 'knowledge' | 'justice'
  | 'love' | 'family' | 'revenge' | 'survival' | 'pleasure'
  | 'ambition' | 'ideology' | 'faith' | 'freedom' | 'security'

export interface Motive {
  type: MotiveType
  intensity: number
  priority: number
  public: boolean
}

export interface Agenda {
  id: string
  title: string
  description: string
  targetTurn: number
  progress: number
  secrecy: number
  requiredActions: string[]
  dependencies: string[]
}

export interface Relationship {
  actorId: string
  targetId: string
  trust: number
  affection: number
  respect: number
  fear: number
  acquaintanceLevel: number
  
  history: Interaction[]
  debts: number
  favors: number
  lastContactTurn: number
}

export interface Interaction {
  turn: number
  type: 'dialogue' | 'favor' | 'betrayal' | 'alliance' | 'conflict' | 'gift'
  content: string
  sentiment: number
  consequences: string[]
}

export interface Memory {
  id: string
  content: string
  importance: number
  emotionalValence: number
  turnCreated: number
  decayRate: number
  relatedActors: string[]
}

export interface BehaviorNode {
  id: string
  type: 'selector' | 'sequence' | 'action' | 'condition'
  children?: string[]
  condition?: (state: CharacterState) => boolean
  action?: (state: CharacterState) => CharacterAction
}

export interface CharacterAction {
  type: 'dialogue' | 'propose_alliance' | 'betray' | 'blackmail'
    | 'bribe' | 'investigate' | 'slander' | 'recruit' | 'assassinate'
    | 'donate' | 'propose' | 'divorce' | 'promote' | 'demote'
  targetId?: string
  content: string
  public: boolean
  riskLevel: number
}

export interface CharacterState {
  actorId: string
  turn: number
  needs: {
    physiological: number
    safety: number
    love_belonging: number
    esteem: number
    self_actualization: number
  }
  mood: number
  stress: number
  energy: number
  recentEvents: string[]
  availableActions: string[]
}

export interface ActorTemplate {
  id: string
  name: string
  portrait: string
  age: number
  gender: 'male' | 'female' | 'other'
  socialClass: 'aristocrat' | 'bourgeois' | 'petite_bourgeois' | 'proletarian' | 'peasant' | 'lumpen'
  occupation: string
  faction?: string
}

export const PERSONALITY_ARCHETYPES: Record<string, BigFive & { name: string; description: string }> = {
  the_leader: {
    name: '天生领袖',
    description: '支配欲强，果断决绝，天生的组织者',
    openness: 0.5,
    conscientiousness: 0.8,
    extraversion: 0.9,
    agreeableness: 0.3,
    neuroticism: 0.2,
  },
  the_idealist: {
    name: '理想主义者',
    description: '追求真理与正义，有强烈的道德感',
    openness: 0.9,
    conscientiousness: 0.7,
    extraversion: 0.5,
    agreeableness: 0.8,
    neuroticism: 0.4,
  },
  the_machiavellian: {
    name: '马基雅维利主义者',
    description: '冷酷无情，精于算计，为达目的不择手段',
    openness: 0.6,
    conscientiousness: 0.9,
    extraversion: 0.4,
    agreeableness: 0.1,
    neuroticism: 0.3,
  },
  the_romantic: {
    name: '浪漫主义者',
    description: '感性热情，追求美与爱',
    openness: 0.95,
    conscientiousness: 0.3,
    extraversion: 0.7,
    agreeableness: 0.8,
    neuroticism: 0.7,
  },
  the_guardian: {
    name: '守护者',
    description: '忠诚可靠，重视传统与责任',
    openness: 0.2,
    conscientiousness: 0.95,
    extraversion: 0.4,
    agreeableness: 0.7,
    neuroticism: 0.2,
  },
  the_rebel: {
    name: '反叛者',
    description: '蔑视权威，挑战现状',
    openness: 0.8,
    conscientiousness: 0.3,
    extraversion: 0.8,
    agreeableness: 0.3,
    neuroticism: 0.6,
  },
  the_sage: {
    name: '智者',
    description: '冷静客观，追求知识与理解',
    openness: 0.95,
    conscientiousness: 0.7,
    extraversion: 0.2,
    agreeableness: 0.5,
    neuroticism: 0.3,
  },
  the_innocent: {
    name: '天真者',
    description: '善良单纯，相信人性本善',
    openness: 0.6,
    conscientiousness: 0.5,
    extraversion: 0.5,
    agreeableness: 0.95,
    neuroticism: 0.4,
  },
  the_jester: {
    name: '弄臣',
    description: '幽默风趣，活在当下',
    openness: 0.7,
    conscientiousness: 0.2,
    extraversion: 0.95,
    agreeableness: 0.6,
    neuroticism: 0.3,
  },
  the_sociopath: {
    name: '反社会者',
    description: '毫无共情，以他人痛苦为乐',
    openness: 0.5,
    conscientiousness: 0.4,
    extraversion: 0.6,
    agreeableness: 0.05,
    neuroticism: 0.5,
  },
}

export const CHARACTER_DATABASE: ActorTemplate[] = [
  { id: 'robespierre', name: '马克西米连·罗伯斯庇尔', portrait: '⚖️', age: 31, gender: 'male', socialClass: 'bourgeois', occupation: '律师', faction: 'jacobin' },
  { id: 'danton', name: '乔治·丹东', portrait: '🔥', age: 29, gender: 'male', socialClass: 'bourgeois', occupation: '演说家', faction: 'cordeliers' },
  { id: 'marat', name: '让-保尔·马拉', portrait: '📰', age: 45, gender: 'male', socialClass: 'petite_bourgeois', occupation: '记者', faction: 'montagnard' },
  { id: 'louis_xvi', name: '路易十六', portrait: '👑', age: 34, gender: 'male', socialClass: 'aristocrat', occupation: '国王', faction: 'monarchy' },
  { id: 'marie_antoinette', name: '玛丽·安托瓦内特', portrait: '👸', age: 33, gender: 'female', socialClass: 'aristocrat', occupation: '王后', faction: 'monarchy' },
  { id: 'napoleon', name: '拿破仑·波拿巴', portrait: '🎖️', age: 19, gender: 'male', socialClass: 'petite_bourgeois', occupation: '军官', faction: 'military' },
  { id: 'sade', name: '萨德侯爵', portrait: '😈', age: 48, gender: 'male', socialClass: 'aristocrat', occupation: '哲学家', faction: 'libertine' },
  { id: 'charlotte_corday', name: '夏洛特·科黛', portrait: '🗡️', age: 24, gender: 'female', socialClass: 'petite_bourgeois', occupation: '贵族小姐', faction: 'girondin' },
  { id: 'mirabeau', name: '米拉波伯爵', portrait: '🎭', age: 40, gender: 'male', socialClass: 'aristocrat', occupation: '政治家', faction: 'constitutional' },
  { id: 'saint_just', name: '圣茹斯特', portrait: '⚔️', age: 21, gender: 'male', socialClass: 'petite_bourgeois', occupation: '革命家', faction: 'jacobin' },
  { id: 'madame_rolland', name: '罗兰夫人', portrait: '💐', age: 38, gender: 'female', socialClass: 'bourgeois', occupation: '沙龙女主人', faction: 'girondin' },
  { id: 'hebert', name: '埃贝尔', portrait: '📢', age: 35, gender: 'male', socialClass: 'petite_bourgeois', occupation: '编辑', faction: 'hebertist' },
]

export class PersonalityEngine {
  generatePersonality(archetype?: keyof typeof PERSONALITY_ARCHETYPES): BigFive {
    if (archetype && PERSONALITY_ARCHETYPES[archetype]) {
      const base = PERSONALITY_ARCHETYPES[archetype]
      return {
        openness: Math.max(0, Math.min(1, base.openness + (Math.random() - 0.5) * 0.2)),
        conscientiousness: Math.max(0, Math.min(1, base.conscientiousness + (Math.random() - 0.5) * 0.2)),
        extraversion: Math.max(0, Math.min(1, base.extraversion + (Math.random() - 0.5) * 0.2)),
        agreeableness: Math.max(0, Math.min(1, base.agreeableness + (Math.random() - 0.5) * 0.2)),
        neuroticism: Math.max(0, Math.min(1, base.neuroticism + (Math.random() - 0.5) * 0.2)),
      }
    }
    
    return {
      openness: Math.random(),
      conscientiousness: Math.random(),
      extraversion: Math.random(),
      agreeableness: Math.random(),
      neuroticism: Math.random(),
    }
  }

  generateMotives(personality: BigFive): Motive[] {
    const motives: Motive[] = []
    const motivePool: MotiveType[] = [
      'wealth', 'power', 'fame', 'knowledge', 'justice',
      'love', 'family', 'revenge', 'survival', 'pleasure',
      'ambition', 'ideology', 'faith', 'freedom', 'security'
    ]

    const motiveWeights: Record<MotiveType, number> = {
      power: (1 - personality.agreeableness) * personality.extraversion,
      wealth: (1 - personality.openness) * (1 - personality.agreeableness),
      knowledge: personality.openness * (1 - personality.extraversion),
      justice: personality.agreeableness * personality.conscientiousness,
      fame: personality.extraversion * (1 - personality.agreeableness),
      ideology: personality.openness * (1 - personality.agreeableness),
      love: personality.agreeableness * personality.neuroticism,
      family: (1 - personality.openness) * personality.agreeableness,
      revenge: (1 - personality.agreeableness) * personality.neuroticism,
      ambition: personality.conscientiousness * (1 - personality.agreeableness),
      survival: (1 - personality.openness) * personality.neuroticism,
      pleasure: (1 - personality.conscientiousness) * (1 - personality.agreeableness),
      faith: (1 - personality.openness) * personality.agreeableness,
      freedom: personality.openness * (1 - personality.conscientiousness),
      security: (1 - personality.openness) * (1 - personality.extraversion),
    }

    motivePool.forEach(type => {
      const baseIntensity = motiveWeights[type] || 0.3
      const intensity = Math.max(0.1, Math.min(1, baseIntensity + (Math.random() - 0.5) * 0.3))
      
      if (intensity > 0.3) {
        motives.push({
          type,
          intensity,
          priority: intensity,
          public: personality.extraversion > 0.5,
        })
      }
    })

    return motives.sort((a, b) => b.priority - a.priority).slice(0, 5)
  }

  calculateBehaviorProbability(personality: BigFive, action: string): number {
    const modifiers: Record<string, Partial<BigFive>> = {
      'betray': { agreeableness: -0.8, conscientiousness: -0.5 },
      'lie': { agreeableness: -0.6, conscientiousness: -0.4 },
      'cooperate': { agreeableness: 0.7, conscientiousness: 0.3 },
      'sacrifice': { agreeableness: 0.9, neuroticism: -0.3 },
      'take_risk': { neuroticism: -0.6, extraversion: 0.5, conscientiousness: -0.5 },
      'public_speech': { extraversion: 0.8, neuroticism: -0.4 },
      'conspire': { extraversion: -0.3, agreeableness: -0.5, conscientiousness: 0.4 },
      'give_charity': { agreeableness: 0.8, openness: 0.3 },
      'join_revolution': { openness: 0.6, agreeableness: -0.2, conscientiousness: -0.4 },
      'defect': { agreeableness: -0.7, conscientiousness: -0.6 },
      'assassinate': { agreeableness: -0.95, neuroticism: 0.5 },
      'blackmail': { agreeableness: -0.9, conscientiousness: 0.5 },
    }

    const modifier = modifiers[action]
    if (!modifier) return 0.5

    let score = 0.5
    Object.entries(modifier).forEach(([trait, weight]) => {
      score += personality[trait as keyof BigFive] * weight * 0.5
    })

    return Math.max(0.01, Math.min(0.99, score))
  }

  getArchetype(personality: BigFive): string {
    let bestMatch = ''
    let bestScore = 0

    Object.entries(PERSONALITY_ARCHETYPES).forEach(([key, archetype]) => {
      const distance = Math.sqrt(
        Math.pow(personality.openness - archetype.openness, 2) +
        Math.pow(personality.conscientiousness - archetype.conscientiousness, 2) +
        Math.pow(personality.extraversion - archetype.extraversion, 2) +
        Math.pow(personality.agreeableness - archetype.agreeableness, 2) +
        Math.pow(personality.neuroticism - archetype.neuroticism, 2)
      )
      const score = 1 - distance / 2.24
      if (score > bestScore) {
        bestScore = score
        bestMatch = key
      }
    })

    return bestMatch
  }
}

export class RelationshipEngine {
  private relationships: Map<string, Relationship> = new Map()

  private getKey(a: string, b: string): string {
    return [a, b].sort().join('_')
  }

  createRelationship(actorA: string, actorB: string): Relationship {
    const key = this.getKey(actorA, actorB)
    const rel: Relationship = {
      actorId: actorA,
      targetId: actorB,
      trust: 0.5,
      affection: 0.3,
      respect: 0.5,
      fear: 0.1,
      acquaintanceLevel: 0.1,
      history: [],
      debts: 0,
      favors: 0,
      lastContactTurn: 0,
    }
    this.relationships.set(key, rel)
    return rel
  }

  getRelationship(actorA: string, actorB: string): Relationship | undefined {
    return this.relationships.get(this.getKey(actorA, actorB))
  }

  updateRelationship(
    actorA: string,
    actorB: string,
    delta: {
      trust?: number
      affection?: number
      respect?: number
      fear?: number
    }
  ): void {
    const rel = this.getRelationship(actorA, actorB) || this.createRelationship(actorA, actorB)
    
    rel.trust = Math.max(0, Math.min(1, rel.trust + (delta.trust || 0)))
    rel.affection = Math.max(0, Math.min(1, rel.affection + (delta.affection || 0)))
    rel.respect = Math.max(0, Math.min(1, rel.respect + (delta.respect || 0)))
    rel.fear = Math.max(0, Math.min(1, rel.fear + (delta.fear || 0)))
    rel.acquaintanceLevel = Math.min(1, rel.acquaintanceLevel + 0.05)
  }

  recordInteraction(
    actorA: string,
    actorB: string,
    interaction: Omit<Interaction, 'turn'>,
    currentTurn: number
  ): void {
    const rel = this.getRelationship(actorA, actorB) || this.createRelationship(actorA, actorB)
    
    rel.history.push({
      ...interaction,
      turn: currentTurn,
    })
    
    rel.lastContactTurn = currentTurn
    
    const sentimentMod = interaction.sentiment * 0.1
    this.updateRelationship(actorA, actorB, {
      affection: sentimentMod,
      trust: sentimentMod * 0.5,
    })
    
    if (interaction.type === 'favor') {
      rel.favors++
    } else if (interaction.type === 'betrayal') {
      rel.trust = 0
      rel.affection = 0
    }
  }

  calculateOverallOpinion(actorA: string, actorB: string): number {
    const rel = this.getRelationship(actorA, actorB)
    if (!rel) return 0.5
    
    return (
      rel.trust * 0.3 +
      rel.affection * 0.3 +
      rel.respect * 0.25 -
      rel.fear * 0.15 +
      0.3
    )
  }

  getRelationshipNetwork(actorId: string): { targetId: string; strength: number; type: string }[] {
    const results: { targetId: string; strength: number; type: string }[] = []
    
    this.relationships.forEach((rel, key) => {
      if (key.includes(actorId)) {
        const targetId = key.split('_').find(id => id !== actorId)!
        const opinion = this.calculateOverallOpinion(actorId, targetId)
        
        let type = 'neutral'
        if (opinion > 0.7) type = 'ally'
        else if (opinion > 0.5) type = 'friendly'
        else if (opinion < 0.2) type = 'enemy'
        else if (opinion < 0.35) type = 'hostile'
        else if (rel.fear > 0.6) type = 'feared'
        
        results.push({ targetId, strength: opinion, type })
      }
    })
    
    return results
  }

  decayRelationships(currentTurn: number): void {
    this.relationships.forEach(rel => {
      const turnsSinceContact = currentTurn - rel.lastContactTurn
      if (turnsSinceContact > 10) {
        const decayFactor = 1 - Math.min(0.3, turnsSinceContact * 0.01)
        rel.affection *= decayFactor
        rel.trust *= decayFactor
      }
    })
  }
}

export class MemoryEngine {
  private memories: Map<string, Memory[]> = new Map()
  private memoryCapacity: number = 50

  addMemory(
    actorId: string,
    content: string,
    importance: number,
    emotionalValence: number,
    currentTurn: number,
    relatedActors: string[] = []
  ): string {
    if (!this.memories.has(actorId)) {
      this.memories.set(actorId, [])
    }
    
    const memoryId = 'mem_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4)
    const memory: Memory = {
      id: memoryId,
      content,
      importance,
      emotionalValence,
      turnCreated: currentTurn,
      decayRate: Math.max(0.001, 0.01 * (1 - importance)),
      relatedActors,
    }
    
    this.memories.get(actorId)!.push(memory)
    this.trimMemories(actorId)
    
    return memoryId
  }

  private trimMemories(actorId: string): void {
    const memories = this.memories.get(actorId)
    if (!memories || memories.length <= this.memoryCapacity) return
    
    memories.sort((a, b) => {
      const aScore = a.importance * (1 - a.decayRate)
      const bScore = b.importance * (1 - b.decayRate)
      return bScore - aScore
    })
    
    memories.splice(this.memoryCapacity)
  }

  getActiveMemories(actorId: string, currentTurn: number, limit: number = 10): Memory[] {
    const memories = this.memories.get(actorId) || []
    
    return memories
      .map(m => ({
        ...m,
        activation: m.importance * (1 - (currentTurn - m.turnCreated) * m.decayRate)
      }))
      .filter(m => m.activation > 0.1)
      .sort((a, b) => b.activation - a.activation)
      .slice(0, limit)
  }

  recallRelatedMemories(actorId: string, relatedActorId: string, currentTurn: number): Memory[] {
    const memories = this.memories.get(actorId) || []
    return memories
      .filter(m => m.relatedActors.includes(relatedActorId))
      .map(m => ({
        ...m,
        activation: m.importance * Math.exp(-(currentTurn - m.turnCreated) * 0.01)
      }))
      .filter(m => m.activation > 0.05)
      .sort((a, b) => b.activation - a.activation)
  }

  forgetMemories(currentTurn: number): void {
    this.memories.forEach(memories => {
      memories.forEach(m => {
        const age = currentTurn - m.turnCreated
        m.importance *= Math.exp(-age * m.decayRate * 0.1)
      })
    })
  }
}

export class CharacterEngine {
  public readonly personality: PersonalityEngine
  public readonly relationships: RelationshipEngine
  public readonly memories: MemoryEngine
  
  private turn: number = 0
  private characterStates: Map<string, CharacterState> = new Map()
  private characters: Map<string, {
    template: ActorTemplate
    personality: BigFive
    motives: Motive[]
    agendas: Agenda[]
  }> = new Map()

  constructor() {
    this.personality = new PersonalityEngine()
    this.relationships = new RelationshipEngine()
    this.memories = new MemoryEngine()
  }

  spawnCharacter(templateId: string, archetype?: keyof typeof PERSONALITY_ARCHETYPES): boolean {
    const template = CHARACTER_DATABASE.find(c => c.id === templateId)
    if (!template || this.characters.has(templateId)) return false

    const personality = this.personality.generatePersonality(archetype)
    const motives = this.personality.generateMotives(personality)
    
    const state: CharacterState = {
      actorId: templateId,
      turn: this.turn,
      needs: {
        physiological: 0.9,
        safety: 0.7,
        love_belonging: 0.5,
        esteem: 0.4,
        self_actualization: 0.2,
      },
      mood: 0.5,
      stress: 0.2,
      energy: 0.8,
      recentEvents: [],
      availableActions: [],
    }

    this.characters.set(templateId, {
      template,
      personality,
      motives,
      agendas: this.generateAgendas(templateId, motives),
    })
    this.characterStates.set(templateId, state)

    CHARACTER_DATABASE.forEach(other => {
      if (other.id !== templateId && this.characters.has(other.id)) {
        this.relationships.createRelationship(templateId, other.id)
      }
    })

    return true
  }

  private generateAgendas(actorId: string, motives: Motive[]): Agenda[] {
    const agendas: Agenda[] = []
    
    motives.forEach((motive, idx) => {
      if (motive.intensity > 0.5) {
        agendas.push({
          id: `agenda_${actorId}_${idx}`,
          title: this.getAgendaTitleForMotive(motive.type),
          description: '',
          targetTurn: this.turn + 20 + Math.floor(Math.random() * 30),
          progress: 0,
          secrecy: Math.max(0.3, motive.public ? 0.3 : 0.8),
          requiredActions: [],
          dependencies: [],
        })
      }
    })
    
    return agendas
  }

  private getAgendaTitleForMotive(motive: MotiveType): string {
    const titles: Record<MotiveType, string> = {
      wealth: '积累巨额财富',
      power: '攫取最高权力',
      fame: '成为知名人物',
      knowledge: '寻求终极真理',
      justice: '实现社会正义',
      love: '找到真爱',
      family: '保护家人安全',
      revenge: '向仇敌复仇',
      survival: '不择手段活下去',
      pleasure: '追求感官享乐',
      ambition: '爬上权力顶峰',
      ideology: '实现理想社会',
      faith: '捍卫信仰',
      freedom: '追求自由解放',
      security: '寻求安全保障',
    }
    return titles[motive] || '秘密计划'
  }

  advanceTurn(): Map<string, CharacterAction[]> {
    this.turn++
    const allActions: Map<string, CharacterAction[]> = new Map()

    this.characters.forEach((char, id) => {
      const state = this.characterStates.get(id)!
      state.turn = this.turn
      
      this.updateNeedsAndMood(state, char)
      
      const actions = this.decideActions(id, char, state)
      allActions.set(id, actions)
      
      actions.forEach(action => {
        this.executeAction(id, action)
      })
    })

    this.memories.forgetMemories(this.turn)
    this.relationships.decayRelationships(this.turn)

    return allActions
  }

  private updateNeedsAndMood(state: CharacterState, char: { personality: BigFive; motives: Motive[] }): void {
    state.needs.safety = Math.max(0, Math.min(1, state.needs.safety + (Math.random() - 0.5) * 0.1))
    state.needs.esteem = Math.max(0, Math.min(1, state.needs.esteem + (Math.random() - 0.5) * 0.05))
    
    const needFrustration = 
      (1 - state.needs.safety) * 0.3 +
      (1 - state.needs.esteem) * 0.2
    
    state.stress = Math.min(1, needFrustration + char.personality.neuroticism * 0.3)
    state.mood = Math.max(0, 1 - state.stress + char.personality.extraversion * 0.2 - char.personality.neuroticism * 0.1)
    state.energy = Math.max(0.2, Math.min(1, state.energy + (Math.random() - 0.4) * 0.2))
  }

  private decideActions(
    actorId: string,
    char: { personality: BigFive; motives: Motive[]; agendas: Agenda[] },
    state: CharacterState
  ): CharacterAction[] {
    const actions: CharacterAction[] = []
    
    char.agendas.forEach(agenda => {
      if (this.turn >= agenda.targetTurn - 5 && agenda.progress < 1) {
        const action = this.generateActionForAgenda(actorId, agenda, char.personality)
        if (action) actions.push(action)
      }
    })

    if (state.stress > 0.7 && char.personality.neuroticism > 0.6) {
      actions.push({
        type: char.personality.agreeableness < 0.3 ? 'slander' : 'donate',
        content: '压力下的情绪宣泄',
        public: char.personality.extraversion > 0.5,
        riskLevel: state.stress,
      })
    }

    return actions.slice(0, 2)
  }

  private generateActionForAgenda(
    actorId: string,
    agenda: Agenda,
    personality: BigFive
  ): CharacterAction | null {
    const motive = agenda.title.toLowerCase()
    
    let actionType: CharacterAction['type'] = 'dialogue'
    let riskLevel = 0.3

    if (motive.includes('权力') || motive.includes('革命')) {
      const roll = Math.random()
      if (roll < this.personality.calculateBehaviorProbability(personality, 'conspire')) {
        actionType = 'conspire' as CharacterAction['type']
        riskLevel = 0.6
      } else if (roll < this.personality.calculateBehaviorProbability(personality, 'join_revolution')) {
        actionType = 'recruit'
        riskLevel = 0.4
      }
    } else if (motive.includes('复仇')) {
      if (Math.random() < this.personality.calculateBehaviorProbability(personality, 'betray')) {
        actionType = 'betray'
        riskLevel = 0.7
      }
    } else if (motive.includes('财富')) {
      if (Math.random() < this.personality.calculateBehaviorProbability(personality, 'bribe')) {
        actionType = 'bribe'
        riskLevel = 0.5
      }
    }

    return {
      type: actionType,
      content: agenda.title,
      public: riskLevel < 0.5 && personality.extraversion > 0.5,
      riskLevel,
    }
  }

  private executeAction(actorId: string, action: CharacterAction): void {
    if (action.targetId) {
      this.memories.addMemory(
        actorId,
        `${action.type}: ${action.content}`,
        action.riskLevel,
        0,
        this.turn,
        [action.targetId]
      )

      this.relationships.recordInteraction(actorId, action.targetId, {
        type: action.type === 'betray' ? 'betrayal' : 
              action.type === 'bribe' ? 'favor' : 'dialogue',
        content: action.content,
        sentiment: action.type === 'betray' ? -1 : 
                   action.type === 'bribe' ? 0.8 : 0.2,
        consequences: [],
      }, this.turn)
    }
  }

  getCharacter(actorId: string) {
    return this.characters.get(actorId)
  }

  getState(actorId: string): CharacterState | undefined {
    return this.characterStates.get(actorId)
  }

  getAllCharacters(): string[] {
    return Array.from(this.characters.keys())
  }

  getCurrentTurn(): number {
    return this.turn
  }
}

export { CHARACTER_DATABASE as CHARACTERS }
