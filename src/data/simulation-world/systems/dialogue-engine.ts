import type { BigFive } from './character-system'
import type { DialogueNode, DialogueOption, DialogueConsequence } from './dialogue-system'

interface DialogueContext {
  speakerId: string
  speakerName: string
  listenerId: string
  relationship: { trust: number; affection: number; respect: number; fear: number }
  personality: BigFive
  contextTags: string[]
  year: number
  turn: number
}

export class DialogueEngine {
  private context: DialogueContext
  private dialogueHistory: DialogueNode[] = []

  constructor(context: DialogueContext) {
    this.context = context
  }

  generateGreeting(): DialogueNode {
    const { relationship, personality, speakerName } = this.context
    
    let tone: any = 'formal'
    let text = ''

    const overallRelation = (relationship.trust + relationship.affection + relationship.respect - relationship.fear) / 3

    if (overallRelation > 0.7) {
      tone = personality.extraversion > 0.6 ? 'friendly' : 'respectful'
      const greetings = [
        `啊，${speakerName}！见到你总是这么令人愉快。`,
        `我的朋友，你来得正好。请坐，让我们好好谈谈。`,
        `真高兴见到你。最近过得怎么样？`,
      ]
      text = greetings[Math.floor(Math.random() * greetings.length)]
    } else if (overallRelation > 0.3) {
      tone = 'formal'
      const greetings = [
        `日安，${speakerName}。我们有什么可以谈的？`,
        `欢迎。我想我们应该有一些重要的事情要讨论。`,
        `你好。请说明你的来意。`,
      ]
      text = greetings[Math.floor(Math.random() * greetings.length)]
    } else if (overallRelation > 0) {
      tone = 'suspicious'
      const greetings = [
        `哼，是你啊。这次又有什么目的？`,
        `你居然还敢出现在我面前。说吧，想要什么？`,
        `我们之间没什么好说的，除非你带来了有价值的东西。`,
      ]
      text = greetings[Math.floor(Math.random() * greetings.length)]
    } else {
      tone = 'aggressive'
      const greetings = [
        `滚出去。这里不欢迎你。`,
        `你这个叛徒！居然还有脸来见我？`,
        `如果我是你，我会立刻离开。`,
      ]
      text = greetings[Math.floor(Math.random() * greetings.length)]
    }

    return {
      id: `dlg-${Date.now()}`,
      speakerId: this.context.speakerId,
      listenerId: this.context.listenerId,
      text,
      tone,
      mood: overallRelation,
      options: this.generateResponseOptions(overallRelation),
      context: this.context.contextTags,
      activeMemories: [],
    }
  }

  private generateResponseOptions(overallRelation: number): DialogueOption[] {
    const options: DialogueOption[] = []

    options.push({
      id: 'opt-friendly',
      text: '友好地问候，询问对方最近的情况',
      intent: 'greeting',
      tone: 'friendly',
      difficulty: 0.2,
      hidden: false,
      successChance: overallRelation > 0.3 ? 0.9 : 0.6,
      consequences: [
        { target: 'relationship', delta: 0.05, description: '关系略微改善', delayed: false, delayTurns: 0 },
        { target: 'karma', delta: 1, description: '轻微正面业力', delayed: false, delayTurns: 0 },
      ],
      unlocks: ['small_talk'],
    })

    options.push({
      id: 'opt-formal',
      text: '礼貌地问候，直接进入正题',
      intent: 'greeting',
      tone: 'formal',
      difficulty: 0.3,
      hidden: false,
      successChance: 0.85,
      consequences: [
        { target: 'relationship', delta: 0.02, description: '保持尊重距离', delayed: false, delayTurns: 0 },
      ],
      unlocks: ['information', 'negotiate'],
    })

    if (overallRelation > 0.5) {
      options.push({
        id: 'opt-confide',
        text: '坦诚地表达对当前局势的担忧，寻求建议',
        intent: 'confide',
        tone: 'humble',
        difficulty: 0.5,
        hidden: false,
        successChance: 0.75,
        consequences: [
          { target: 'relationship', delta: 0.15, description: '信任大幅提升', delayed: false, delayTurns: 0 },
          { target: 'reputation', delta: 0.05, description: '派系内声望提升', delayed: true, delayTurns: 2 },
        ],
        unlocks: ['secret_info'],
      })
    }

    if (overallRelation < 0.3) {
      options.push({
        id: 'opt-bribe',
        text: '暗示可以提供金钱或政治支持，换取对方的合作',
        intent: 'bribe',
        tone: 'mysterious',
        requiredRelationship: { respect: 0.2 },
        difficulty: 0.7,
        hidden: false,
        successChance: 0.5,
        consequences: [
          { target: 'relationship', delta: 0.1, description: '获得暂时的合作', delayed: false, delayTurns: 0 },
          { target: 'karma', delta: -15, description: '业力损失', delayed: false, delayTurns: 0 },
          { target: 'reputation', delta: -0.1, description: '腐败传闻流传', delayed: true, delayTurns: 3 },
        ],
        unlocks: ['corruption_path'],
      })
    }

    if (this.context.personality.neuroticism > 0.7) {
      options.push({
        id: 'opt-threaten',
        text: '暗示你知道对方的某些秘密，迫使对方合作',
        intent: 'threaten',
        tone: 'aggressive',
        difficulty: 0.85,
        hidden: overallRelation < 0.2,
        successChance: 0.4,
        consequences: [
          { target: 'relationship', delta: -0.3, description: '关系彻底破裂', delayed: false, delayTurns: 0 },
          { target: 'relationship', delta: 0.2, description: '对方因恐惧而屈服', delayed: false, delayTurns: 0 },
          { target: 'karma', delta: -20, description: '严重业力损失', delayed: false, delayTurns: 0 },
          { target: 'plot', delta: 1, description: '对方开始策划报复', delayed: true, delayTurns: 5 },
        ],
        unlocks: ['hostile_takeover'],
      })
    }

    options.push({
      id: 'opt-recruit',
        text: '邀请对方加入你的革命计划',
        intent: 'recruit',
        tone: 'friendly',
      requiredRelationship: { trust: 0.5 },
      difficulty: 0.75,
      hidden: overallRelation < 0.4,
      successChance: 0.6,
      consequences: [
        { target: 'faction', delta: 0.15, description: '派系力量增强', delayed: true, delayTurns: 2 },
        { target: 'reputation', delta: 0.1, description: '在革命者中声望提升', delayed: true, delayTurns: 1 },
        { target: 'karma', delta: 10, description: '为理想共同奋斗', delayed: false, delayTurns: 0 },
      ],
      unlocks: ['revolution_plot'],
    })

    return options
  }

  processChoice(option: DialogueOption): {
    success: boolean
    consequences: DialogueConsequence[]
    nextDialogue?: DialogueNode
  } {
    const roll = Math.random()
    const success = roll < option.successChance

    const consequences = success
      ? option.consequences
      : option.consequences.map(c => ({
          ...c,
          delta: c.target === 'karma' ? c.delta - 5 : -Math.abs(c.delta) * 0.5,
          description: `失败: ${c.description}`,
        }))

    this.dialogueHistory.push({
      id: `response-${Date.now()}`,
      speakerId: this.context.listenerId,
      listenerId: this.context.speakerId,
      text: option.text,
      tone: option.tone,
      mood: success ? 0.8 : 0.2,
      options: [],
      context: this.context.contextTags,
      activeMemories: [],
    })

    let nextDialogue: DialogueNode | undefined

    if (success) {
      nextDialogue = this.generateSuccessResponse(option)
    } else {
      nextDialogue = this.generateFailureResponse(option)
    }

    return { success, consequences, nextDialogue }
  }

  private generateSuccessResponse(option: DialogueOption): DialogueNode {
    const responses: Record<string, string[]> = {
      greeting: ['说得对。那么，我们来谈谈正事吧。', '我也这么觉得。让我们开始讨论。', '很好。我欣赏你的态度。'],
      confide: ['你能坦诚相待，我很感激。说实话，我也有同样的担忧...', '难得有人能看清真相。让我告诉你我所知道的一切。', '你的忧虑正是我忧虑。我们需要联合更多的人。'],
      bribe: ['...你这是什么意思？嗯，让我们好好"谈谈"条件。', '我明白你的意思。但这需要足够的"诚意"。', '每个人都有价格。你的筹码是什么？'],
      recruit: ['我一直等待有人能站出来！算我一个。', '这是我毕生的理想。革命万岁！', '我需要时间考虑，但你的话语打动了我。'],
    }

    const responseSet = responses[option.intent] || responses.greeting
    const text = responseSet[Math.floor(Math.random() * responseSet.length)]

    return {
      id: `success-${Date.now()}`,
      speakerId: this.context.speakerId,
      listenerId: this.context.listenerId,
      text,
      tone: 'friendly',
      mood: 0.8,
      options: this.generateFollowUpOptions('success', option.intent),
      context: [...this.context.contextTags, option.intent],
      activeMemories: [],
    }
  }

  private generateFailureResponse(option: DialogueOption): DialogueNode {
    const responses = [
      '荒谬！你以为我会相信这种话吗？',
      '你的话毫无说服力。请回吧。',
      '我对你的提议不感兴趣。',
      '这就是你来找我的目的？太让我失望了。',
    ]
    const text = responses[Math.floor(Math.random() * responses.length)]

    return {
      id: `fail-${Date.now()}`,
      speakerId: this.context.speakerId,
      listenerId: this.context.listenerId,
      text,
      tone: 'arrogant',
      mood: 0.15,
      options: this.generateFollowUpOptions('failure', option.intent),
      context: [...this.context.contextTags, 'hostile'],
      activeMemories: [],
    }
  }

  private generateFollowUpOptions(outcome: 'success' | 'failure', intent: string): DialogueOption[] {
    if (outcome === 'success') {
      return [
        {
          id: 'follow-ask-info',
          text: '询问关于当前政治局势的具体信息',
          intent: 'information',
          tone: 'formal',
          difficulty: 0.3,
          hidden: false,
          successChance: 0.85,
          consequences: [
            { target: 'plot', delta: 1, description: '获得关键情报', delayed: false, delayTurns: 0 },
          ],
          unlocks: ['secret_info'],
        },
        {
          id: 'follow-propose-alliance',
          text: '提议建立正式的政治联盟',
          intent: 'negotiate',
          tone: 'formal',
          difficulty: 0.6,
          hidden: false,
          successChance: 0.7,
          consequences: [
            { target: 'faction', delta: 0.2, description: '派系联合力量增强', delayed: true, delayTurns: 3 },
            { target: 'reputation', delta: 0.15, description: '政治声望大幅提升', delayed: true, delayTurns: 2 },
          ],
          unlocks: ['formal_alliance'],
        },
        {
          id: 'follow-leave',
          text: '感谢对方的时间，礼貌告辞',
          intent: 'small_talk',
          tone: 'respectful',
          difficulty: 0.1,
          hidden: false,
          successChance: 0.95,
          consequences: [
            { target: 'relationship', delta: 0.03, description: '留下良好印象', delayed: false, delayTurns: 0 },
          ],
          unlocks: ['end_conversation'],
        },
      ]
    }

    return [
      {
        id: 'follow-apologize',
        text: '为刚才的唐突道歉，希望不要介意',
        intent: 'apologize',
        tone: 'humble',
        difficulty: 0.4,
        hidden: false,
        successChance: 0.6,
        consequences: [
          { target: 'relationship', delta: 0.05, description: '略微缓和气氛', delayed: false, delayTurns: 0 },
        ],
        unlocks: ['mend_relations'],
      },
      {
        id: 'follow-leave-angry',
        text: '冷然离开，记住这次的屈辱',
        intent: 'threaten',
        tone: 'aggressive',
        difficulty: 0.5,
        hidden: false,
        successChance: 1,
        consequences: [
          { target: 'karma', delta: -5, description: '心中埋下仇恨的种子', delayed: false, delayTurns: 0 },
          { target: 'plot', delta: 1, description: '未来的复仇计划', delayed: true, delayTurns: 10 },
        ],
        unlocks: ['end_conversation_angry'],
      },
    ]
  }
}
