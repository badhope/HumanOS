import type { WorldEvent } from './vic3-types'
import WORLD_EVENTS_EXPANSION from './world-events-expansion'

export const WORLD_EVENTS: WorldEvent[] = [
  ...WORLD_EVENTS_EXPANSION,

  {
    id: 'tech_breakthrough',
    name: '重大技术突破',
    icon: '🔬',
    severity: 'positive',
    probability: 0.12,
    cooldownDays: 60,
    triggerConditions: {},
    effects: [],
    options: [
      {
        text: '投入研发，产业化应用',
        effects: [{ type: 'treasury', value: -8000 }, { type: 'all_industry_productivity', value: 0.05 }],
        aiSelectionWeight: 60,
      },
      {
        text: '卖掉专利，套现离场',
        effects: [{ type: 'treasury', value: 15000 }, { type: 'stability', value: 2 }],
        aiSelectionWeight: 40,
      },
    ],
  },

  {
    id: 'energy_discovery',
    name: '大型油气田发现',
    icon: '🛢️',
    severity: 'positive',
    probability: 0.08,
    cooldownDays: 180,
    triggerConditions: {},
    effects: [
      { type: 'price_shock', target: 'coal', value: -0.15, duration: 120 },
    ],
    options: [
      {
        text: '国有化开发',
        effects: [{ type: 'treasury', value: 25000 }, { type: 'pop_approval', value: 10 }],
        aiSelectionWeight: 50,
      },
      {
        text: '引入外资联合开发',
        effects: [{ type: 'treasury', value: 40000 }, { type: 'pop_approval', value: -5 }],
        aiSelectionWeight: 50,
      },
    ],
  },

  {
    id: 'tourism_boom',
    name: '国际旅游热潮',
    icon: '✈️',
    severity: 'positive',
    probability: 0.15,
    cooldownDays: 90,
    triggerConditions: {
      minStability: 40,
    },
    effects: [],
    options: [
      {
        text: '大力发展旅游业',
        effects: [{ type: 'treasury', value: 12000 }, { type: 'pop_approval', value: 5 }],
        aiSelectionWeight: 70,
      },
      {
        text: '限制游客，保护环境',
        effects: [{ type: 'treasury', value: 3000 }, { type: 'stability', value: 3 }],
        aiSelectionWeight: 30,
      },
    ],
  },

  {
    id: 'food_harvest',
    name: '史无前例大丰收',
    icon: '🌾',
    severity: 'positive',
    probability: 0.12,
    cooldownDays: 120,
    triggerConditions: {
      dayOfYear: [240, 255, 270],
    },
    effects: [
      { type: 'supply_shock', target: 'grain', value: 0.30, duration: 90 },
      { type: 'price_shock', target: 'grain', value: -0.20, duration: 90 },
    ],
    options: [
      {
        text: '建立国家粮食储备',
        effects: [{ type: 'treasury', value: -5000 }, { type: 'stability', value: 5 }],
        aiSelectionWeight: 60,
      },
      {
        text: '出口创汇',
        effects: [{ type: 'treasury', value: 10000 }, { type: 'inflation', value: -2 }],
        aiSelectionWeight: 40,
      },
    ],
  },

  {
    id: 'fed_rate_hike',
    name: '美联储激进加息',
    icon: '🏦',
    severity: 'major',
    probability: 0.15,
    cooldownDays: 180,
    triggerConditions: {
      dayOfYear: [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345],
    },
    effects: [
      { type: 'price_shock', target: 'iron', value: -0.15, duration: 60 },
      { type: 'price_shock', target: 'coal', value: -0.10, duration: 60 },
      { type: 'instability', value: -5, duration: 30 },
    ],
    options: [
      {
        text: '跟随加息，保卫汇率',
        effects: [{ type: 'inflation', value: -2 }, { type: 'unemployment', value: 2 }, { type: 'stability', value: -3 }],
        aiSelectionWeight: 60,
      },
      {
        text: '资本管制，独立货币政策',
        effects: [{ type: 'inflation', value: 3 }, { type: 'treasury', value: -5000 }, { type: 'stability', value: 2 }],
        aiSelectionWeight: 30,
      },
      {
        text: '抛售外汇储备干预',
        effects: [{ type: 'treasury', value: -15000 }, { type: 'stability', value: 5 }],
        aiSelectionWeight: 10,
      },
    ],
  },
  
  {
    id: 'energy_crisis_eu',
    name: '欧洲能源危机',
    icon: '⚡',
    severity: 'catastrophic',
    probability: 0.08,
    cooldownDays: 365,
    triggerConditions: {
      minInflation: 3,
    },
    effects: [
      { type: 'price_shock', target: 'coal', value: 0.50, duration: 90 },
      { type: 'supply_shock', target: 'coal', value: -0.30, duration: 90 },
      { type: 'price_shock', target: 'grain', value: 0.25, duration: 60 },
    ],
    options: [
      {
        text: '能源配给制',
        effects: [{ type: 'stability', value: -10 }, { type: 'pop_approval', value: -8 }],
        aiSelectionWeight: 20,
      },
      {
        text: '放开价格，寻求替代能源',
        effects: [{ type: 'inflation', value: 8 }, { type: 'treasury', value: -10000 }],
        aiSelectionWeight: 50,
      },
      {
        text: '大规模能源补贴',
        effects: [{ type: 'treasury', value: -25000 }, { type: 'stability', value: 5 }],
        aiSelectionWeight: 30,
      },
    ],
  },
  
  {
    id: 'supply_chain_disruption',
    name: '全球供应链断裂',
    icon: '🚢',
    severity: 'major',
    probability: 0.12,
    cooldownDays: 120,
    triggerConditions: {},
    effects: [
      { type: 'supply_shock', target: 'tools', value: -0.25, duration: 45 },
      { type: 'price_shock', target: 'tools', value: 0.35, duration: 45 },
      { type: 'inflation', value: 3, duration: 30 },
    ],
    options: [
      {
        text: '产业政策：进口替代',
        effects: [{ type: 'treasury', value: -8000 }, { type: 'bureaucracy', value: 5 }],
        aiSelectionWeight: 45,
      },
      {
        text: '取消关税，鼓励进口',
        effects: [{ type: 'treasury', value: -3000 }, { type: 'inflation', value: -1 }],
        aiSelectionWeight: 35,
      },
      {
        text: '管控物价，打击投机',
        effects: [{ type: 'stability', value: 3 }, { type: 'pop_approval', value: 5 }, { type: 'bureaucracy', value: -5 }],
        aiSelectionWeight: 20,
      },
    ],
  },

  {
    id: 'banking_crisis',
    name: '银行业系统性危机',
    icon: '💥',
    severity: 'catastrophic',
    probability: 0.05,
    cooldownDays: 730,
    triggerConditions: {
      maxDebtToGdp: 100,
      minInflation: 5,
    },
    effects: [
      { type: 'treasury', value: -50000, duration: 1 },
      { type: 'instability', value: -20, duration: 120 },
      { type: 'pop_approval', value: -15, duration: 90 },
      { type: 'unemployment', value: 10, duration: 60 },
    ],
    options: [
      {
        text: '雷曼方案：让市场出清',
        effects: [{ type: 'stability', value: -25 }, { type: 'unemployment', value: 15 }, { type: 'inflation', value: -5 }],
        aiSelectionWeight: 15,
      },
      {
        text: 'TARP救市：纳税人买单',
        effects: [{ type: 'treasury', value: -80000 }, { type: 'pop_approval', value: -20 }, { type: 'stability', value: 10 }],
        aiSelectionWeight: 45,
      },
      {
        text: '银行国有化，重组管理层',
        effects: [{ type: 'treasury', value: -35000 }, { type: 'pop_approval', value: 10 }, { type: 'stability', value: -5 }],
        aiSelectionWeight: 40,
      },
    ],
  },
  
  {
    id: 'extreme_heatwave',
    name: '超级热浪袭击',
    icon: '🌡️',
    severity: 'major',
    probability: 0.20,
    cooldownDays: 90,
    triggerConditions: {
      dayOfYear: [180, 195, 210, 225, 240],
    },
    effects: [
      { type: 'supply_shock', target: 'grain', value: -0.20, duration: 60 },
      { type: 'price_shock', target: 'grain', value: 0.30, duration: 60 },
      { type: 'pop_approval', value: -5, duration: 30 },
    ],
    options: [
      {
        text: '紧急粮食进口',
        effects: [{ type: 'treasury', value: -12000 }, { type: 'stability', value: 3 }],
        aiSelectionWeight: 50,
      },
      {
        text: '水电限价，保障民生',
        effects: [{ type: 'treasury', value: -5000 }, { type: 'pop_approval', value: 8 }],
        aiSelectionWeight: 35,
      },
      {
        text: '号召全民节约',
        effects: [{ type: 'pop_approval', value: -5 }, { type: 'treasury', value: 2000 }],
        aiSelectionWeight: 15,
      },
    ],
  },
  
  {
    id: 'tech_stock_bubble',
    name: '科技股泡沫破裂',
    icon: '📉',
    severity: 'major',
    probability: 0.08,
    cooldownDays: 365,
    triggerConditions: {},
    effects: [
      { type: 'treasury', value: -15000, duration: 1 },
      { type: 'instability', value: -8, duration: 60 },
      { type: 'pop_approval', value: -5, duration: 45 },
    ],
    options: [
      {
        text: '注入流动性救市',
        effects: [{ type: 'treasury', value: -20000 }, { type: 'inflation', value: 4 }, { type: 'stability', value: 5 }],
        aiSelectionWeight: 40,
      },
      {
        text: '刺破泡沫，长痛不如短痛',
        effects: [{ type: 'unemployment', value: 5 }, { type: 'stability', value: -10 }, { type: 'inflation', value: -2 }],
        aiSelectionWeight: 20,
      },
      {
        text: '加强监管，打击做空',
        effects: [{ type: 'bureaucracy', value: 8 }, { type: 'pop_approval', value: 3 }],
        aiSelectionWeight: 40,
      },
    ],
  },
  
  {
    id: 'labor_strike_wave',
    name: '全国罢工浪潮',
    icon: '✊',
    severity: 'major',
    probability: 0.15,
    cooldownDays: 180,
    triggerConditions: {
      maxStability: 50,
      minUnemployment: 8,
    },
    effects: [
      { type: 'supply_shock', target: 'iron', value: -0.40, duration: 30 },
      { type: 'supply_shock', target: 'tools', value: -0.30, duration: 30 },
      { type: 'instability', value: -15, duration: 45 },
    ],
    options: [
      {
        text: '军警镇压，恢复秩序',
        effects: [{ type: 'pop_approval', value: -20 }, { type: 'stability', value: 10 }, { type: 'treasury', value: -8000 }],
        aiSelectionWeight: 25,
      },
      {
        text: '劳资谈判，提高工资',
        effects: [{ type: 'pop_approval', value: 15 }, { type: 'inflation', value: 5 }, { type: 'unemployment', value: 2 }],
        aiSelectionWeight: 50,
      },
      {
        text: '逮捕工会领袖',
        effects: [{ type: 'pop_approval', value: -10 }, { type: 'stability', value: 5 }, { type: 'treasury', value: -3000 }],
        aiSelectionWeight: 25,
      },
    ],
  },
  
  {
    id: 'currency_speculation',
    name: '国际炒家攻击汇率',
    icon: '🦅',
    severity: 'catastrophic',
    probability: 0.06,
    cooldownDays: 365,
    triggerConditions: {
      minInflation: 8,
    },
    effects: [
      { type: 'instability', value: -15, duration: 60 },
      { type: 'inflation', value: 10, duration: 90 },
    ],
    options: [
      {
        text: '香港模式：死扛汇率',
        effects: [{ type: 'treasury', value: -100000 }, { type: 'stability', value: 15 }],
        aiSelectionWeight: 30,
      },
      {
        text: '一次性大幅贬值',
        effects: [{ type: 'inflation', value: 20 }, { type: 'unemployment', value: -3 }, { type: 'stability', value: -10 }],
        aiSelectionWeight: 40,
      },
      {
        text: '外汇管制 + 资本管制',
        effects: [{ type: 'treasury', value: -20000 }, { type: 'bureaucracy', value: 15 }, { type: 'stability', value: -5 }],
        aiSelectionWeight: 30,
      },
    ],
  },

  {
    id: 'china_evergrande_crisis',
    name: '恒大债务危机爆发',
    icon: '🏢',
    severity: 'catastrophic',
    countries: ['china'],
    probability: 0.15,
    cooldownDays: 180,
    triggerConditions: {
      requiredSpirit: 'property_crisis',
      maxStability: 75,
    },
    effects: [
      { type: 'instability', value: -12, duration: 120 },
      { type: 'treasury', value: -25000, duration: 1 },
    ],
    options: [
      {
        text: '政府兜底，央企接管',
        effects: [{ type: 'treasury', value: -50000 }, { type: 'stability', value: 8 }, { type: 'bureaucracy', value: -10 }],
        aiSelectionWeight: 60,
      },
      {
        text: '市场化破产重组',
        effects: [{ type: 'stability', value: -15 }, { type: 'pop_approval', value: -10 }, { type: 'treasury', value: 10000 }],
        aiSelectionWeight: 20,
      },
      {
        text: '债转股+债务展期',
        effects: [{ type: 'debt', value: 30000 }, { type: 'stability', value: -5 }, { type: 'bureaucracy', value: 5 }],
        aiSelectionWeight: 20,
      },
    ],
  },

  {
    id: 'china_local_debt_default',
    name: '地方政府融资平台违约',
    icon: '💸',
    severity: 'major',
    countries: ['china'],
    probability: 0.12,
    cooldownDays: 150,
    triggerConditions: {
      requiredSpirit: 'local_government_debt',
      maxDebtToGdp: 60,
    },
    effects: [
      { type: 'instability', value: -8, duration: 90 },
      { type: 'inflation', value: 3, duration: 60 },
    ],
    options: [
      {
        text: '中央财政专项再贷款',
        effects: [{ type: 'treasury', value: -35000 }, { type: 'debt', value: 25000 }, { type: 'stability', value: 6 }],
        aiSelectionWeight: 70,
      },
      {
        text: '债务置换拉长周期',
        effects: [{ type: 'debt', value: 15000 }, { type: 'bureaucracy', value: 10 }, { type: 'stability', value: 3 }],
        aiSelectionWeight: 30,
      },
    ],
  },

  {
    id: 'china_demographic_warning',
    name: '人口负增长预警',
    icon: '📉',
    severity: 'major',
    countries: ['china'],
    probability: 0.08,
    cooldownDays: 365,
    triggerConditions: {
      requiredSpirit: 'population_aging',
    },
    effects: [
      { type: 'instability', value: -5, duration: 180 },
    ],
    options: [
      {
        text: '全面放开生育+现金补贴',
        effects: [{ type: 'treasury', value: -30000 }, { type: 'pop_approval', value: 8 }, { type: 'stability', value: 5 }],
        aiSelectionWeight: 50,
      },
      {
        text: '延迟退休+提高社保缴费',
        effects: [{ type: 'pop_approval', value: -15 }, { type: 'treasury', value: 15000 }, { type: 'stability', value: -8 }],
        aiSelectionWeight: 30,
      },
      {
        text: '大规模引入外籍劳工',
        effects: [{ type: 'stability', value: -10 }, { type: 'pop_approval', value: -5 }, { type: 'unemployment', value: -2 }],
        aiSelectionWeight: 20,
      },
    ],
  },

  {
    id: 'usa_debt_ceiling_showdown',
    name: '债务上限摊牌',
    icon: '⚔️',
    severity: 'catastrophic',
    countries: ['usa'],
    probability: 0.18,
    cooldownDays: 365,
    triggerConditions: {
      requiredSpirit: 'debt_ceiling_crisis',
      maxDebtToGdp: 120,
    },
    effects: [
      { type: 'instability', value: -15, duration: 60 },
      { type: 'inflation', value: 5, duration: 90 },
    ],
    options: [
      {
        text: '不惜一切代价提高上限',
        effects: [{ type: 'debt', value: 80000 }, { type: 'stability', value: 10 }, { type: 'pop_approval', value: -8 }],
        aiSelectionWeight: 40,
      },
      {
        text: '宪法第14修正案：总统绕过国会',
        effects: [{ type: 'stability', value: -5 }, { type: 'bureaucracy', value: -15 }, { type: 'pop_approval', value: 5 }],
        aiSelectionWeight: 30,
      },
      {
        text: '万亿铂金币铸币权',
        effects: [{ type: 'inflation', value: 12 }, { type: 'stability', value: -10 }, { type: 'treasury', value: 100000 }],
        aiSelectionWeight: 30,
      },
    ],
  },

  {
    id: 'usa_silicon_valley_bank_collapse',
    name: '区域性银行连环爆雷',
    icon: '🏦',
    severity: 'major',
    countries: ['usa'],
    probability: 0.10,
    cooldownDays: 180,
    triggerConditions: {
      minInflation: 5,
    },
    effects: [
      { type: 'instability', value: -10, duration: 60 },
    ],
    options: [
      {
        text: 'FDIC全额兜底所有存款',
        effects: [{ type: 'treasury', value: -40000 }, { type: 'stability', value: 12 }, { type: 'pop_approval', value: 8 }],
        aiSelectionWeight: 60,
      },
      {
        text: '摩根大通等大银行接管',
        effects: [{ type: 'treasury', value: -10000 }, { type: 'stability', value: 5 }, { type: 'pop_approval', value: -5 }],
        aiSelectionWeight: 40,
      },
    ],
  },

  {
    id: 'france_pension_strike',
    name: '全国大罢工瘫痪法国',
    icon: '✊',
    severity: 'catastrophic',
    countries: ['france'],
    probability: 0.20,
    cooldownDays: 120,
    triggerConditions: {
      requiredSpirit: 'general_strike_culture',
      maxStability: 60,
    },
    effects: [
      { type: 'instability', value: -20, duration: 45 },
      { type: 'treasury', value: -15000, duration: 1 },
    ],
    options: [
      {
        text: '撤回改革法案',
        effects: [{ type: 'stability', value: 15 }, { type: 'pop_approval', value: 20 }, { type: 'debt', value: 25000 }],
        aiSelectionWeight: 50,
      },
      {
        text: '总统动用49.3条款强行通过',
        effects: [{ type: 'stability', value: -25 }, { type: 'pop_approval', value: -20 }, { type: 'bureaucracy', value: -20 }],
        aiSelectionWeight: 30,
      },
      {
        text: '与工会谈判妥协',
        effects: [{ type: 'stability', value: 5 }, { type: 'pop_approval', value: 5 }, { type: 'treasury', value: -20000 }],
        aiSelectionWeight: 20,
      },
    ],
  },

  {
    id: 'germany_energy_emergency',
    name: '天然气断供紧急状态',
    icon: '❄️',
    severity: 'catastrophic',
    countries: ['germany'],
    probability: 0.15,
    cooldownDays: 180,
    triggerConditions: {
      requiredSpirit: 'energiewende',
      maxStability: 70,
    },
    effects: [
      { type: 'instability', value: -12, duration: 90 },
      { type: 'inflation', value: 8, duration: 120 },
    ],
    options: [
      {
        text: '重启燃煤核电站',
        effects: [{ type: 'stability', value: 8 }, { type: 'pop_approval', value: -10 }, { type: 'treasury', value: 20000 }],
        aiSelectionWeight: 50,
      },
      {
        text: '卡塔尔LNG长期合同',
        effects: [{ type: 'treasury', value: -30000 }, { type: 'inflation', value: -3 }, { type: 'stability', value: 5 }],
        aiSelectionWeight: 30,
      },
      {
        text: '全民能源配给制',
        effects: [{ type: 'stability', value: -15 }, { type: 'pop_approval', value: -15 }, { type: 'inflation', value: -2 }],
        aiSelectionWeight: 20,
      },
    ],
  },

  {
    id: 'japan_yen_carry_trade_unwind',
    name: '日元套利交易平仓海啸',
    icon: '💹',
    severity: 'catastrophic',
    countries: ['japan'],
    probability: 0.12,
    cooldownDays: 180,
    triggerConditions: {
      requiredSpirit: 'deflation_trap',
    },
    effects: [
      { type: 'instability', value: -10, duration: 60 },
      { type: 'inflation', value: 6, duration: 90 },
    ],
    options: [
      {
        text: '日本央行无限量购债',
        effects: [{ type: 'debt', value: 60000 }, { type: 'inflation', value: 4 }, { type: 'stability', value: 5 }],
        aiSelectionWeight: 60,
      },
      {
        text: '放弃YCC允许收益率上升',
        effects: [{ type: 'debt', value: 30000 }, { type: 'stability', value: -10 }, { type: 'treasury', value: -25000 }],
        aiSelectionWeight: 40,
      },
    ],
  },
]

export function getEligibleEvents(state: any): WorldEvent[] {
  const dayOfYear = state.date.day + (state.date.month - 1) * 30
  
  return WORLD_EVENTS.filter(event => {
    const conditions = event.triggerConditions as any
    
    if (event.countries && !event.countries.includes(state.countryId)) {
      return false
    }
    
    if (conditions.dayOfYear && !conditions.dayOfYear.includes(dayOfYear)) {
      return false
    }
    
    if (conditions.minInflation && state.stats.inflation < conditions.minInflation) {
      return false
    }
    
    if (conditions.maxStability && state.stats.stability > conditions.maxStability) {
      return false
    }
    
    if (conditions.minUnemployment && state.stats.unemployment < conditions.minUnemployment) {
      return false
    }
    
    if (conditions.minStability && state.stats.stability < conditions.minStability) {
      return false
    }
    
    if (conditions.maxDebtToGdp) {
      const debtToGdp = state.treasury.debt / Math.max(1, state.stats.gdp) * 100
      if (debtToGdp < conditions.maxDebtToGdp) {
        return false
      }
    }
    
    if (conditions.requiredSpirit) {
      const hasSpirit = state.nationalSpirits?.some((s: any) => s.id === conditions.requiredSpirit)
      if (!hasSpirit) {
        return false
      }
    }
    
    return true
  })
}
