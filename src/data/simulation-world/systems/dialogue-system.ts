import type { BigFive } from './character-system'
import type { Relationship } from './character-system'
import type { Memory } from './character-system'

export type DialogueIntent =
  | 'greeting' | 'small_talk' | 'information' | 'request_favor'
  | 'offer_deal' | 'threaten' | 'seduce' | 'recruit' | 'accuse'
  | 'defend' | 'confide' | 'lie' | 'flirt' | 'insult' | 'apologize'
  | 'negotiate' | 'interrogate' | 'persuade' | 'blackmail' | 'bribe'

export type DialogueTone =
  | 'formal' | 'casual' | 'aggressive' | 'friendly' | 'sarcastic'
  | 'suspicious' | 'respectful' | 'condescending' | 'affectionate'
  | 'fearful' | 'arrogant' | 'humble' | 'mysterious' | 'playful'

export interface DialogueOption {
  id: string
  text: string
  intent: DialogueIntent
  tone: DialogueTone
  requiredRelationship?: { trust?: number; affection?: number; respect?: number; fear?: number }
  requiredPersonality?: Partial<BigFive>
  difficulty: number
  hidden: boolean
  successChance: number
  consequences: DialogueConsequence[]
  unlocks: string[]
}

export interface DialogueConsequence {
  target: 'relationship' | 'reputation' | 'faction' | 'plot' | 'karma'
  delta: number
  description: string
  delayed: boolean
  delayTurns: number
}

export interface DialogueNode {
  id: string
  speakerId: string
  listenerId: string
  text: string
  tone: DialogueTone
  mood: number
  options: DialogueOption[]
  context: string[]
  activeMemories: string[]
}

export interface DialogueTemplate {
  id: string
  archetype: string[]
  intent: DialogueIntent
  tone: DialogueTone[]
  minRelationship: number
  textTemplates: string[]
  successRate: number
}

export interface Rumor {
  id: string
  content: string
  sourceId: string
  aboutId: string
  truthfulness: number
  spread: number
  turnCreated: number
  verified: boolean
}

export interface IntelligenceReport {
  targetId: string
  publicPersona: string
  hiddenAgendas: string[]
  knownAllies: string[]
  knownEnemies: string[]
  weaknesses: string[]
  secrets: string[]
  confidence: number
}

export interface ReputationMatrix {
  overall: number
  bySocialClass: Record<string, number>
  byFaction: Record<string, number>
  byDistrict: Record<string, number>
  traits: Record<string, number>
  infamy: number
  prestige: number
  notoriety: number
}

export interface ChoiceBranch {
  id: string
  title: string
  description: string
  turnAvailable: number
  expiryTurn?: number
  options: BranchOption[]
  isHistorical: boolean
  worldLineDivergence: number
}

export interface BranchOption {
  id: string
  text: string
  requirements: {
    minReputation?: number
    minFactionSupport?: Record<string, number>
    minKarma?: number
    specificItem?: string
    questCompleted?: string[]
  }
  consequences: {
    worldLineShift: number
    factionChanges: Record<string, number>
    majorNPCDeaths: string[]
    regimeChange?: boolean
    economicShock?: string
    description: string
  }
  lockedText: string
}

export interface NarrativeScene {
  id: string
  title: string
  description: string
  location: string
  participants: string[]
  mood: string
  generatedText: string
  dynamicElements: string[]
}

const DIALOGUE_TEMPLATES: Record<string, string[]> = {
  greeting_formal: [
    '日安，{name}先生。',
    '很高兴见到您，{name}。',
    '您来得正好，我们正在讨论重要的事情。',
  ],
  greeting_casual: [
    '嘿，最近怎么样？',
    '啊，是你啊！快请坐。',
    '终于见到你了，老朋友！',
  ],
  greeting_hostile: [
    '哼，你居然还敢来这里。',
    '又是你。这次又有什么事？',
    '我们之间没什么好说的。',
  ],
  information_question: [
    '关于{topic}，你知道些什么？',
    '我听说了一些关于{topic}的传闻，是真的吗？',
    '能不能告诉我{topic}的情况？',
  ],
  request_favor: [
    '我需要你帮我一个忙...',
    '有件事想请你帮忙。当然，不会让你白做的。',
    '以我们的交情，你会帮我的，对吧？',
  ],
  threaten: [
    '你最好想清楚后果。',
    '这对你没有好处。',
    '我劝你不要敬酒不吃吃罚酒。',
  ],
  bribe: [
    '我们可以做个交易。',
    '人人都有价钱，不是吗？',
    '只要你肯合作，这些就是你的。',
  ],
  recruit: [
    '加入我们吧，我们需要你这样的人才。',
    '一起干，我们可以改变这个国家。',
    '你有天赋，不应该被浪费。',
  ],
}

const TONE_ADJECTIVES: Record<DialogueTone, string[]> = {
  formal: ['郑重地', '严肃地', '一本正经地'],
  casual: ['随意地', '轻松地', '漫不经心地'],
  aggressive: ['凶狠地', '挑衅地', '咄咄逼人地'],
  friendly: ['亲切地', '友好地', '热情地'],
  sarcastic: ['讽刺地', '挖苦地', '话里有话地'],
  suspicious: ['怀疑地', '警惕地', '狐疑地'],
  respectful: ['恭敬地', '尊敬地', '毕恭毕敬地'],
  condescending: ['傲慢地', '轻蔑地', '居高临下地'],
  affectionate: ['温柔地', '含情脉脉地', '亲热地'],
  fearful: ['胆怯地', '惊恐地', '战战兢兢地'],
  arrogant: ['傲慢地', '趾高气扬地', '不可一世地'],
  humble: ['谦逊地', '谦卑地', '恭顺地'],
  mysterious: ['神秘地', '高深莫测地', '故弄玄虚地'],
  playful: ['顽皮地', '戏谑地', '开玩笑地'],
}

export class DialogueEngine {
  private templates: Record<string, string[]> = DIALOGUE_TEMPLATES

  generateDialogue(
    speakerId: string,
    speakerName: string,
    speakerPersonality: BigFive,
    listenerId: string,
    relationship: Relationship,
    activeMemories: Memory[],
    context: string[] = []
  ): DialogueNode {
    const opinion = this.calculateOpinion(relationship)
    const tone = this.determineTone(speakerPersonality, opinion, relationship)
    const overallMood = this.calculateMood(speakerPersonality, opinion, activeMemories)
    
    const node: DialogueNode = {
      id: `dialogue_${Date.now().toString(36)}`,
      speakerId,
      listenerId,
      text: '',
      tone,
      mood: overallMood,
      options: [],
      context,
      activeMemories: activeMemories.map(m => m.id),
    }

    const openingIntent = context.includes('hostile') ? 'greeting' :
                          context.includes('formal') ? 'greeting' : 'greeting'
    
    node.text = this.generateText(openingIntent, tone, speakerName, {})
    node.options = this.generateResponseOptions(
      speakerPersonality,
      relationship,
      activeMemories,
      context
    )

    return node
  }

  private calculateOpinion(rel: Relationship): number {
    return (
      rel.trust * 0.3 +
      rel.affection * 0.3 +
      rel.respect * 0.25 -
      rel.fear * 0.15
    )
  }

  private determineTone(
    personality: BigFive,
    opinion: number,
    relationship: Relationship
  ): DialogueTone {
    if (relationship.fear > 0.7 && personality.neuroticism > 0.5) {
      return 'fearful'
    }
    if (opinion < -0.3 && (1 - personality.agreeableness) > 0.5) {
      return personality.extraversion > 0.5 ? 'aggressive' : 'suspicious'
    }
    if (opinion > 0.5 && personality.extraversion > 0.6) {
      return 'friendly'
    }
    if (personality.conscientiousness > 0.7 && personality.openness < 0.4) {
      return 'formal'
    }
    if (1 - personality.agreeableness > 0.6 && personality.extraversion > 0.5) {
      return 'condescending'
    }
    
    return personality.extraversion > 0.5 ? 'casual' : 'formal'
  }

  private calculateMood(
    personality: BigFive,
    opinion: number,
    memories: Memory[]
  ): number {
    let base = 0.5 + personality.extraversion * 0.2 - personality.neuroticism * 0.2
    
    memories.forEach(m => {
      base += m.emotionalValence * m.importance * 0.1
    })
    
    return Math.max(0, Math.min(1, base + opinion * 0.2))
  }

  private generateText(
    intent: DialogueIntent,
    tone: DialogueTone,
    name: string,
    variables: Record<string, string>
  ): string {
    const key = `${intent}_${tone}`
    const templates = this.templates[key] || this.templates[`${intent}_formal`] || ['...']
    
    let template = templates[Math.floor(Math.random() * templates.length)]
    template = template.replace('{name}', name)
    
    Object.entries(variables).forEach(([k, v]) => {
      template = template.replace(`{${k}}`, v)
    })

    const toneAdjective = TONE_ADJECTIVES[tone]
    if (toneAdjective) {
      const adv = toneAdjective[Math.floor(Math.random() * toneAdjective.length)]
      template = `「${template}」${adv}说道`
    }

    return template
  }

  generateResponseOptions(
    speakerPersonality: BigFive,
    relationship: Relationship,
    _activeMemories: Memory[],
    context: string[]
  ): DialogueOption[] {
    const options: DialogueOption[] = []
    const opinion = this.calculateOpinion(relationship)

    options.push(this.createDialogueOption(
      'friendly',
      '友好地回应',
      'small_talk',
      'friendly',
      speakerPersonality.agreeableness,
      {}
    ))

    if (opinion > 0.3 || context.includes('formal_meeting')) {
      options.push(this.createDialogueOption(
        'information',
        '询问最近的情况',
        'information',
        'casual',
        speakerPersonality.openness,
        {}
      ))
    }

    if (1 - speakerPersonality.agreeableness > 0.5) {
      options.push(this.createDialogueOption(
        'aggressive',
        '犀利地质问',
        'interrogate',
        'aggressive',
        Math.max(0.1, 1 - speakerPersonality.agreeableness - opinion),
        { trust: -0.2, respect: opinion > 0 ? 0.1 : -0.1 }
      ))
    }

    if (speakerPersonality.agreeableness > 0.4) {
      options.push(this.createDialogueOption(
        'request',
        '请求帮忙',
        'request_favor',
        'respectful',
        Math.max(0.2, relationship.trust + opinion - 0.3),
        { trust: 0.1 }
      ))
    }

    if (relationship.fear > 0.5 || opinion < -0.2) {
      options.push(this.createDialogueOption(
        'threaten',
        '威胁对方',
        'threaten',
        'aggressive',
        relationship.fear * 0.8 - opinion,
        { fear: 0.3, trust: -0.4, respect: -0.2 }
      ))
    }

    if (relationship.trust > 0.6 && opinion > 0.5) {
      options.push(this.createDialogueOption(
        'confide',
        '吐露心声',
        'confide',
        'affectionate',
        relationship.trust + relationship.affection - 0.8,
        { trust: 0.3, affection: 0.2 }
      ))
    }

    return options.sort((a, b) => b.successChance - a.successChance)
  }

  private createDialogueOption(
    id: string,
    text: string,
    intent: DialogueIntent,
    tone: DialogueTone,
    successBase: number,
    relDelta: Partial<{ trust: number; affection: number; respect: number; fear: number }>
  ): DialogueOption {
    const consequences: DialogueConsequence[] = []
    
    Object.entries(relDelta).forEach(([key, value]) => {
      consequences.push({
        target: 'relationship',
        delta: value as number,
        description: `${key}: ${value > 0 ? '+' : ''}${(value as number * 100).toFixed(0)}%`,
        delayed: false,
        delayTurns: 0,
      })
    })

    return {
      id,
      text,
      intent,
      tone,
      difficulty: 0.5,
      hidden: successBase < 0,
      successChance: Math.max(0.05, Math.min(0.95, successBase + 0.5)),
      consequences,
      unlocks: [],
    }
  }

  resolveDialogueChoice(
    speakerId: string,
    listenerId: string,
    option: DialogueOption,
    listenerPersonality: BigFive
  ): {
    success: boolean
    newRelationship: Partial<Relationship>
    events: string[]
  } {
    const roll = Math.random()
    const success = roll < option.successChance

    const modifier = success ? 1 : -0.5
    const newRel: Partial<Relationship> = {}
    
    option.consequences.forEach(c => {
      if (c.target === 'relationship') {
        newRel.trust = (newRel.trust || 0) + c.delta * modifier
        newRel.affection = (newRel.affection || 0) + c.delta * modifier * 0.5
        newRel.respect = (newRel.respect || 0) + c.delta * modifier * 0.3
        newRel.fear = (newRel.fear || 0) + (option.intent === 'threaten' ? c.delta : 0)
      }
    })

    const events: string[] = []
    if (success) {
      events.push(`✅ 对话成功: ${option.text}`)
      if (option.successChance < 0.3) {
        events.push(`🎲 大成功！概率只有${(option.successChance * 100).toFixed(0)}%`)
      }
    } else {
      events.push(`❌ 对话失败: ${option.text}`)
    }

    return { success, newRelationship: newRel, events }
  }
}

export class ReputationEngine {
  private reputation: ReputationMatrix

  constructor() {
    this.reputation = {
      overall: 0.5,
      bySocialClass: {
        aristocracy: 0.5,
        bourgeoisie: 0.5,
        petiteBourgeoisie: 0.5,
        proletariat: 0.5,
        peasantry: 0.5,
        lumpenproletariat: 0.5,
      },
      byFaction: {},
      byDistrict: {},
      traits: {
        honesty: 0.5,
        bravery: 0.5,
        wisdom: 0.5,
        charisma: 0.5,
        ruthlessness: 0.5,
      },
      infamy: 0,
      prestige: 0,
      notoriety: 0,
    }
  }

  updateReputation(
    action: string,
    witnesses: { socialClass?: string; faction?: string }[],
    impact: number,
    affectedTraits: string[] = []
  ): void {
    const witnessFactor = Math.min(1, witnesses.length / 10)
    this.reputation.overall += impact * witnessFactor * 0.1

    witnesses.forEach(w => {
      if (w.socialClass && this.reputation.bySocialClass[w.socialClass] !== undefined) {
        this.reputation.bySocialClass[w.socialClass] += impact * 0.15
      }
      if (w.faction && this.reputation.byFaction[w.faction] !== undefined) {
        this.reputation.byFaction[w.faction] += impact * 0.2
      }
    })

    affectedTraits.forEach(trait => {
      if (this.reputation.traits[trait] !== undefined) {
        this.reputation.traits[trait] += impact * 0.1
      }
    })

    if (impact < -0.3) {
      this.reputation.infamy = Math.min(1, this.reputation.infamy + witnessFactor * 0.1)
    }
    if (impact > 0.5) {
      this.reputation.prestige = Math.min(1, this.reputation.prestige + witnessFactor * 0.05)
    }

    Object.keys(this.reputation.bySocialClass).forEach(key => {
      this.reputation.bySocialClass[key] = Math.max(0, Math.min(1, this.reputation.bySocialClass[key]))
    })
    Object.keys(this.reputation.traits).forEach(key => {
      this.reputation.traits[key] = Math.max(0, Math.min(1, this.reputation.traits[key]))
    })
  }

  getPublicReputation(): ReputationMatrix {
    return JSON.parse(JSON.stringify(this.reputation))
  }

  getOverall(): number {
    return this.reputation.overall
  }
}

export class IntelligenceSystem {
  private rumors: Rumor[] = []
  private discoveredSecrets: Set<string> = new Set()

  addRumor(
    content: string,
    sourceId: string,
    aboutId: string,
    truthfulness: number
  ): string {
    const rumor: Rumor = {
      id: `rumor_${Date.now().toString(36)}`,
      content,
      sourceId,
      aboutId,
      truthfulness,
      spread: 0.1,
      turnCreated: 0,
      verified: false,
    }
    this.rumors.push(rumor)
    return rumor.id
  }

  spreadRumors(): void {
    this.rumors.forEach(rumor => {
      if (rumor.spread < 1) {
        rumor.spread = Math.min(1, rumor.spread + (1 - rumor.truthfulness) * 0.05 + 0.02)
      }
    })
  }

  getAvailableRumors(aboutId?: string, minSpread: number = 0.3): Rumor[] {
    return this.rumors
      .filter(r => (!aboutId || r.aboutId === aboutId) && r.spread >= minSpread)
      .sort((a, b) => b.spread - a.spread)
  }

  investigate(
    targetId: string,
    investigationDepth: number,
    existingRelationship: number
  ): IntelligenceReport {
    const effectiveDepth = investigationDepth + existingRelationship * 0.3
    
    return {
      targetId,
      publicPersona: this.getPublicPersona(targetId),
      hiddenAgendas: effectiveDepth > 0.7 ? ['夺取权力', '积累财富'] : [],
      knownAllies: effectiveDepth > 0.4 ? ['丹东派', '吉伦特派'] : [],
      knownEnemies: effectiveDepth > 0.5 ? ['雅各宾派'] : [],
      weaknesses: effectiveDepth > 0.8 ? ['野心过大', '容易腐败'] : [],
      secrets: effectiveDepth > 0.9 ? ['秘密收受贿赂'] : [],
      confidence: Math.min(1, effectiveDepth),
    }
  }

  private getPublicPersona(_targetId: string): string {
    const personas = [
      '清廉正直的人民公仆',
      '野心勃勃的政治家',
      '激情澎湃的演说家',
      '老谋深算的阴谋家',
    ]
    return personas[Math.floor(Math.random() * personas.length)]
  }

  verifyRumor(rumorId: string): boolean {
    const rumor = this.rumors.find(r => r.id === rumorId)
    if (!rumor) return false
    rumor.verified = true
    this.discoveredSecrets.add(rumorId)
    return rumor.truthfulness > 0.7
  }
}

export class BranchingSystem {
  private historicalNodes: ChoiceBranch[] = []
  private choicesMade: Map<string, string> = new Map()

  constructor(scenario: string) {
    this.historicalNodes = this.generateHistoricalBranches(scenario)
  }

  private generateHistoricalBranches(scenario: string): ChoiceBranch[] {
    if (scenario === 'french-revolution') {
      return [
        {
          id: 'tennis_court_oath',
          title: '网球场宣誓',
          description: '第三等级代表被拒之门外，你将如何行动？',
          turnAvailable: 5,
          expiryTurn: 8,
          isHistorical: true,
          worldLineDivergence: 0.3,
          options: [
            {
              id: 'join_oath',
              text: '加入宣誓，与人民站在一起',
              requirements: {},
              consequences: {
                worldLineShift: 0,
                factionChanges: { jacobin: +0.3, monarchy: -0.5 },
                majorNPCDeaths: [],
                description: '你成为了革命的英雄',
              },
              lockedText: '',
            },
            {
              id: 'remain_loyal',
              text: '效忠国王，保持忠诚',
              requirements: { minReputation: 0.3 },
              consequences: {
                worldLineShift: 0.2,
                factionChanges: { monarchy: +0.4, jacobin: -0.4 },
                majorNPCDeaths: [],
                description: '你保住了王室的信任，但失去了民心',
              },
              lockedText: '需要与王室的良好关系',
            },
            {
              id: 'mediate',
              text: '试图调停双方，避免冲突',
              requirements: { minReputation: 0.6 },
              consequences: {
                worldLineShift: 0.5,
                factionChanges: { girondin: +0.5 },
                majorNPCDeaths: [],
                description: '你尝试走中间路线，创造了新的可能性',
              },
              lockedText: '需要足够高的声望',
            },
          ],
        },
        {
          id: 'king_execution',
          title: '处决路易十六',
          description: '国民公会即将投票决定国王的命运',
          turnAvailable: 80,
          expiryTurn: 85,
          isHistorical: true,
          worldLineDivergence: 0.8,
          options: [
            {
              id: 'vote_death',
              text: '投票赞成处决',
              requirements: {},
              consequences: {
                worldLineShift: 0,
                factionChanges: { montagnard: +0.4, girondin: -0.2 },
                majorNPCDeaths: ['louis_xvi'],
                description: '路易十六被送上断头台，历史照常进行',
              },
              lockedText: '',
            },
            {
              id: 'vote_exile',
              text: '投票赞成流放',
              requirements: { minReputation: 0.5 },
              consequences: {
                worldLineShift: 0.6,
                factionChanges: { girondin: +0.3, jacobin: -0.2 },
                majorNPCDeaths: [],
                regimeChange: true,
                description: '君主立宪派重新掌权，温和革命路线获胜',
              },
              lockedText: '需要足够的政治影响力',
            },
            {
              id: 'secret_rescue',
              text: '暗中策划营救国王',
              requirements: { minReputation: 0.7 },
              consequences: {
                worldLineShift: 1.0,
                factionChanges: { monarchy: +1.0 },
                majorNPCDeaths: [],
                regimeChange: true,
                description: '保王党发动政变，波旁王朝复辟！',
              },
              lockedText: '需要极高的秘密影响力',
            },
          ],
        },
      ]
    }
    return []
  }

  getAvailableBranches(currentTurn: number): ChoiceBranch[] {
    return this.historicalNodes.filter(
      n => n.turnAvailable <= currentTurn &&
           (!n.expiryTurn || currentTurn <= n.expiryTurn) &&
           !this.choicesMade.has(n.id)
    )
  }

  makeChoice(branchId: string, optionId: string): BranchOption | null {
    const branch = this.historicalNodes.find(n => n.id === branchId)
    if (!branch) return null
    
    const option = branch.options.find(o => o.id === optionId)
    if (!option) return null
    
    this.choicesMade.set(branchId, optionId)
    return option
  }

  getWorldLineDivergence(): number {
    let divergence = 0
    this.choicesMade.forEach((optionId, branchId) => {
      const branch = this.historicalNodes.find(n => n.id === branchId)
      const option = branch?.options.find(o => o.id === optionId)
      if (option) {
        divergence += option.consequences.worldLineShift * (branch?.worldLineDivergence || 0.5)
      }
    })
    return Math.min(1, divergence)
  }
}

export class NarrativeEngine {
  private sceneTemplates = {
    revolutionary_assembly: [
      '国民公会的大厅里人声鼎沸，代表们激烈地争论着国家的未来。',
      '激昂的演说声在空气中回荡，每一句话都可能改变历史的进程。',
    ],
    street_riot: [
      '愤怒的民众涌上街头，高喊着口号。',
      '警笛声、枪声、呼喊声交织在一起，巴黎正在燃烧。',
    ],
    salon: [
      '烛光摇曳的沙龙里，名流雅士们高谈阔论。',
      '葡萄酒与哲学在空气中交融，革命的思想正在酝酿。',
    ],
    secret_meeting: [
      '昏暗的地下室里，密谋者们围坐一圈。',
      '每个人的脸上都写着严肃，一个足以颠覆国家的计划正在成型。',
    ],
  }

  generateScene(
    sceneType: string,
    participants: string[],
    location: string,
    gameState: { year: number; unrest: number }
  ): NarrativeScene {
    const templates = this.sceneTemplates[sceneType as keyof typeof this.sceneTemplates] || 
                     this.sceneTemplates.revolutionary_assembly
    
    return {
      id: `scene_${Date.now().toString(36)}`,
      title: this.getSceneTitle(sceneType),
      description: '',
      location,
      participants,
      mood: gameState.unrest > 0.6 ? 'tense' : 'calm',
      generatedText: templates[Math.floor(Math.random() * templates.length)],
      dynamicElements: this.generateDynamicElements(sceneType, gameState),
    }
  }

  private getSceneTitle(type: string): string {
    const titles: Record<string, string> = {
      revolutionary_assembly: '国民公会',
      street_riot: '巴黎街头',
      salon: '沙龙聚会',
      secret_meeting: '秘密会议',
    }
    return titles[type] || '未知场景'
  }

  private generateDynamicElements(_sceneType: string, gameState: { unrest: number }): string[] {
    const elements: string[] = []
    if (gameState.unrest > 0.7) {
      elements.push('气氛紧张')
      elements.push('革命热情高涨')
    }
    if (gameState.unrest < 0.3) {
      elements.push('相对平静')
    }
    return elements
  }
}

export {
  DIALOGUE_TEMPLATES,
  TONE_ADJECTIVES,
}
