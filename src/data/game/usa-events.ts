export interface GameEvent {
  id: string
  name: string
  description: string
  icon: string
  triggerDay: number
  category: 'political' | 'economic' | 'social' | 'international' | 'pandemic'
  options: EventOption[]
  fired?: boolean
}

export interface EventOption {
  text: string
  effects: {
    stability?: number
    approval?: number
    politicalCapital?: number
    gdpGrowth?: number
    inflation?: number
    unemployment?: number
    treasury?: number
    productivity?: number
  }
}

export const USA_HISTORICAL_EVENTS: GameEvent[] = [
  {
    id: 'trump_impeachment_1',
    name: '第一次弹劾特朗普',
    description: '2019年12月，众议院投票通过弹劾特朗普总统。',
    icon: '⚖️',
    triggerDay: 340,
    category: 'political',
    options: [
      {
        text: '全力辩护，动员支持者',
        effects: { approval: 5, stability: -8, politicalCapital: 15 },
      },
      {
        text: '保持低调，寻求妥协',
        effects: { approval: -3, stability: 3, politicalCapital: -10 },
      },
    ],
  },

  {
    id: 'covid_emergency',
    name: '新冠疫情紧急状态',
    description: '2020年3月，COVID-19在美国全面爆发，宣布国家紧急状态。',
    icon: '🦠',
    triggerDay: 430,
    category: 'pandemic',
    options: [
      {
        text: '全面封锁，不惜代价',
        effects: {
          gdpGrowth: -8,
          unemployment: 15,
          stability: -15,
          approval: -10,
        },
      },
      {
        text: '温和措施，保护经济',
        effects: {
          gdpGrowth: -3,
          unemployment: 8,
          stability: -5,
          approval: 5,
        },
      },
      {
        text: '拒绝封锁，群体免疫',
        effects: {
          gdpGrowth: -1,
          unemployment: 3,
          stability: -25,
          approval: -15,
        },
      },
    ],
  },

  {
    id: 'cares_act',
    name: 'CARES法案救助',
    description: '2.2万亿美元经济救助计划等待签署。',
    icon: '💵',
    triggerDay: 450,
    category: 'economic',
    options: [
      {
        text: '签署法案，大规模救助',
        effects: {
          treasury: -2200,
          gdpGrowth: 4,
          unemployment: -5,
          approval: 12,
          stability: 8,
        },
      },
      {
        text: '否决，主张市场自救',
        effects: {
          approval: -20,
          stability: -15,
          politicalCapital: 25,
        },
      },
    ],
  },

  {
    id: 'george_floyd',
    name: '乔治·弗洛伊德抗议',
    description: '2020年5月，全国范围的BLM抗议活动爆发。',
    icon: '✊',
    triggerDay: 500,
    category: 'social',
    options: [
      {
        text: '派遣国民警卫队镇压',
        effects: { stability: 10, approval: -15, politicalCapital: 20 },
      },
      {
        text: '对话和警察改革',
        effects: { stability: -5, approval: 8, politicalCapital: -10 },
      },
      {
        text: '保持中立，呼吁冷静',
        effects: { stability: -10, approval: -5 },
      },
    ],
  },

  {
    id: 'election_2020',
    name: '2020总统大选',
    description: '2020年11月，决定国家命运的选举日。',
    icon: '🗳️',
    triggerDay: 670,
    category: 'political',
    options: [
      {
        text: '承认败选，和平交接',
        effects: { stability: 20, approval: 10, politicalCapital: -50 },
      },
      {
        text: '质疑选举结果',
        effects: { stability: -30, approval: 5, politicalCapital: 30 },
      },
    ],
  },

  {
    id: 'capitol_riot',
    name: '国会山骚乱',
    description: '2021年1月6日，支持者冲击国会大厦。',
    icon: '🏛️',
    triggerDay: 740,
    category: 'political',
    options: [
      {
        text: '立即呼吁停止暴力',
        effects: { approval: 8, stability: 5, politicalCapital: -30 },
      },
      {
        text: '继续质疑选举',
        effects: { approval: -10, stability: -25, politicalCapital: 10 },
      },
    ],
  },

  {
    id: 'infrastructure_bill',
    name: '基础设施法案',
    description: '1.2万亿美元基础设施投资法案等待表决。',
    icon: '🏗️',
    triggerDay: 900,
    category: 'economic',
    options: [
      {
        text: '全力推动通过',
        effects: {
          treasury: -1200,
          gdpGrowth: 2,
          approval: 5,
          unemployment: -2,
        },
      },
      {
        text: '反对，过于昂贵',
        effects: {
          politicalCapital: 15,
          approval: -8,
          inflation: -0.5,
        },
      },
    ],
  },

  {
    id: 'fed_rate_hikes',
    name: '美联储加息',
    description: '通胀高企，美联储开始激进加息周期。',
    icon: '📈',
    triggerDay: 1000,
    category: 'economic',
    options: [
      {
        text: '支持抗通胀优先',
        effects: {
          inflation: -3,
          unemployment: 2,
          gdpGrowth: -1,
        },
      },
      {
        text: '批评美联储',
        effects: {
          inflation: 1,
          approval: -5,
          politicalCapital: 10,
        },
      },
    ],
  },

  {
    id: 'svb_collapse',
    name: '硅谷银行破产',
    description: '2023年3月，硅谷银行倒闭引发银行业恐慌。',
    icon: '🏦',
    triggerDay: 1520,
    category: 'economic',
    options: [
      {
        text: '政府全面救助',
        effects: {
          treasury: -200,
          stability: 10,
          approval: 3,
          gdpGrowth: 0.5,
        },
      },
      {
        text: '让市场自行解决',
        effects: {
          stability: -15,
          approval: -10,
          politicalCapital: 20,
        },
      },
    ],
  },

  {
    id: 'ai_explosion',
    name: 'AI革命爆发',
    description: '生成式AI技术爆炸，深刻改变经济社会。',
    icon: '🤖',
    triggerDay: 1600,
    category: 'economic',
    options: [
      {
        text: '大力扶持AI发展',
        effects: {
          gdpGrowth: 2,
          productivity: 5,
          unemployment: 3,
        },
      },
      {
        text: '严格监管AI',
        effects: {
          gdpGrowth: 0.5,
          stability: 5,
          approval: 8,
        },
      },
    ],
  },
]

export function getTriggeredEvents(day: number, firedEvents: string[]): GameEvent[] {
  return USA_HISTORICAL_EVENTS.filter(
    e => e.triggerDay <= day && !firedEvents.includes(e.id)
  )
}
