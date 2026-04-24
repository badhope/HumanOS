export interface TechNode {
  id: string
  name: string
  description: string
  icon: string
  category: 'it' | 'energy' | 'biotech' | 'military' | 'space' | 'forbidden'
  position: { x: number; y: number }
  duration: number
  cost: number
  requires: string[]
  mutuallyExclusive?: string[]
  requiresTechLevel?: number
  requiresApproval?: number
  requiresStability?: number
  isForbidden?: boolean
  controversial?: boolean
  effects: {
    gdpGrowth?: number
    productivity?: number
    unemployment?: number
    inflation?: number
    military?: number
    stability?: number
    approval?: number
    politicalCapital?: number
    treasury?: number
  }
}

export const USA_TECH_TREE: TechNode[] = [
  {
    id: 'tech_base',
    name: '基础研究',
    description: '国家科学基金会基础研究拨款。所有科技发展的起点。',
    icon: '🔬',
    category: 'it',
    position: { x: 300, y: 50 },
    duration: 30,
    cost: 10,
    requires: [],
    effects: {
      productivity: 0.5,
    },
  },

  {
    id: '5g_deployment',
    name: '5G全国部署',
    description: '建设全国5G通信网络基础设施。',
    icon: '📡',
    category: 'it',
    position: { x: 150, y: 130 },
    duration: 90,
    cost: 15,
    requires: ['tech_base'],
    effects: {
      productivity: 1.5,
      gdpGrowth: 0.5,
      treasury: -500,
    },
  },

  {
    id: 'ai_revolution',
    name: '人工智能革命',
    description: '大规模投资人工智能研发与产业应用。',
    icon: '🤖',
    category: 'it',
    position: { x: 150, y: 210 },
    duration: 150,
    cost: 30,
    requires: ['5g_deployment'],
    effects: {
      productivity: 4.0,
      gdpGrowth: 1.5,
      unemployment: 2.0,
      stability: -8,
    },
  },

  {
    id: 'quantum_computing',
    name: '量子计算突破',
    description: '实现量子霸权，破解所有现有加密...',
    icon: '⚛️',
    category: 'it',
    position: { x: 150, y: 290 },
    duration: 240,
    cost: 50,
    requires: ['ai_revolution'],
    effects: {
      productivity: 6.0,
      military: 15,
      approval: 10,
    },
  },

  {
    id: 'surveillance_state',
    name: '监控国家',
    description: '建立全国性AI监控系统，消除所有犯罪。代价是隐私...',
    icon: '👁️',
    category: 'forbidden',
    position: { x: 50, y: 370 },
    duration: 180,
    cost: 65,
    requiresStability: 40,
    requires: ['quantum_computing'],
    controversial: true,
    isForbidden: true,
    effects: {
      stability: 25,
      approval: -20,
      politicalCapital: 40,
    },
  },

  {
    id: 'mind_upload',
    name: '意识上传',
    description: '将人类意识上传到服务器，实现数字化永生。神学和伦理的终极挑战。',
    icon: '💫',
    category: 'forbidden',
    position: { x: 50, y: 450 },
    duration: 400,
    cost: 120,
    requiresStability: 25,
    requiresApproval: 35,
    requires: ['surveillance_state'],
    isForbidden: true,
    effects: {
      productivity: 25,
      stability: -35,
      approval: -30,
      gdpGrowth: 5.0,
    },
  },

  {
    id: 'renewable_boom',
    name: '可再生能源爆发',
    description: '太阳能和风能产业的大规模扩张。',
    icon: '☀️',
    category: 'energy',
    position: { x: 300, y: 130 },
    duration: 120,
    cost: 25,
    requires: ['tech_base'],
    effects: {
      treasury: -800,
      inflation: -1.0,
      gdpGrowth: 0.8,
    },
  },

  {
    id: 'grid_modernization',
    name: '电网现代化',
    description: '全面升级国家电网，支持分布式能源系统。',
    icon: '⚡',
    category: 'energy',
    position: { x: 300, y: 210 },
    duration: 100,
    cost: 20,
    requires: ['renewable_boom'],
    effects: {
      treasury: -600,
      productivity: 1.0,
      inflation: -0.5,
    },
  },

  {
    id: 'advanced_batteries',
    name: '先进储能技术',
    description: '下一代固态电池技术商业化。',
    icon: '🔋',
    category: 'energy',
    position: { x: 300, y: 290 },
    duration: 180,
    cost: 40,
    requires: ['grid_modernization'],
    effects: {
      productivity: 3.0,
      inflation: -1.5,
      gdpGrowth: 1.0,
    },
  },

  {
    id: 'fusion_power',
    name: '核聚变商用化',
    description: '无限的清洁能源。能源问题的终极解决方案。',
    icon: '🔥',
    category: 'energy',
    position: { x: 300, y: 370 },
    duration: 365,
    cost: 80,
    requires: ['advanced_batteries'],
    effects: {
      gdpGrowth: 4.0,
      inflation: -5.0,
      productivity: 10.0,
      approval: 25,
      treasury: -2000,
    },
  },

  {
    id: 'genomics_med',
    name: '基因组医学',
    description: '个性化医疗和基因编辑临床应用。',
    icon: '🧬',
    category: 'biotech',
    position: { x: 450, y: 130 },
    duration: 100,
    cost: 20,
    requires: ['tech_base'],
    effects: {
      productivity: 1.0,
      approval: 8,
      treasury: -300,
    },
  },

  {
    id: 'mrna_vaccines',
    name: 'mRNA疫苗平台',
    description: '开发通用mRNA疫苗技术平台。',
    icon: '💉',
    category: 'biotech',
    position: { x: 450, y: 210 },
    duration: 80,
    cost: 25,
    requires: ['genomics_med'],
    effects: {
      approval: 12,
      stability: 5,
    },
  },

  {
    id: 'longevity_research',
    name: '长寿研究',
    description: '抗衰老研究，将人类寿命延长到150岁以上。',
    icon: '🏃',
    category: 'biotech',
    position: { x: 450, y: 290 },
    duration: 240,
    cost: 55,
    requires: ['mrna_vaccines'],
    effects: {
      approval: 20,
      productivity: 2.0,
      gdpGrowth: 1.0,
    },
  },

  {
    id: 'human_enhancement',
    name: '人类增强',
    description: '基因改造创造超级人类。更高、更快、更强、更聪明。',
    icon: '🦾',
    category: 'forbidden',
    position: { x: 380, y: 370 },
    duration: 300,
    cost: 85,
    requiresStability: 35,
    requires: ['longevity_research'],
    controversial: true,
    isForbidden: true,
    effects: {
      productivity: 12,
      approval: -25,
      stability: -20,
      military: 20,
    },
  },

  {
    id: 'designer_babies',
    name: '设计婴儿',
    description: '允许父母定制孩子的基因。完美人类即将诞生。',
    icon: '👶',
    category: 'forbidden',
    position: { x: 380, y: 450 },
    duration: 365,
    cost: 100,
    requiresStability: 25,
    requires: ['human_enhancement'],
    isForbidden: true,
    effects: {
      productivity: 18,
      approval: -35,
      stability: -30,
      gdpGrowth: 3.0,
    },
  },

  {
    id: 'hypersonic_weapons',
    name: '高超音速武器',
    description: '速度超过5马赫的常规与核武器。',
    icon: '🚀',
    category: 'military',
    position: { x: 550, y: 180 },
    duration: 140,
    cost: 35,
    requires: ['tech_base'],
    mutuallyExclusive: ['ai_revolution'],
    effects: {
      military: 20,
      approval: 8,
      treasury: -1200,
    },
  },

  {
    id: 'cyber_warfare',
    name: '网络战司令部',
    description: '建立进攻性网络战能力。',
    icon: '💻',
    category: 'military',
    position: { x: 550, y: 260 },
    duration: 120,
    cost: 30,
    requires: ['hypersonic_weapons'],
    effects: {
      military: 15,
      politicalCapital: 15,
    },
  },

  {
    id: 'space_force',
    name: '太空军成立',
    description: '建立美军第六军种：太空军。',
    icon: '🛸',
    category: 'space',
    position: { x: 550, y: 340 },
    duration: 90,
    cost: 25,
    requires: ['cyber_warfare'],
    effects: {
      military: 10,
      approval: 12,
      treasury: -500,
    },
  },

  {
    id: 'moon_base',
    name: '永久月球基地',
    description: '阿尔忒弥斯计划，建立永久月球殖民地。',
    icon: '🌙',
    category: 'space',
    position: { x: 550, y: 420 },
    duration: 300,
    cost: 70,
    requires: ['space_force'],
    effects: {
      approval: 25,
      productivity: 4.0,
      treasury: -2500,
    },
  },

  {
    id: 'mars_colony',
    name: '火星殖民',
    description: '人类成为多行星物种。',
    icon: '🔴',
    category: 'space',
    position: { x: 550, y: 500 },
    duration: 500,
    cost: 120,
    requiresApproval: 50,
    requires: ['moon_base'],
    effects: {
      approval: 40,
      productivity: 8.0,
      politicalCapital: 100,
      treasury: -5000,
    },
  },

  {
    id: 'alien_contact',
    name: '外星接触计划',
    description: '公开与外星文明的接触。真相就在那里。',
    icon: '👽',
    category: 'forbidden',
    position: { x: 550, y: 580 },
    duration: 365,
    cost: 150,
    requiresStability: 15,
    requiresApproval: 60,
    requires: ['mars_colony'],
    isForbidden: true,
    effects: {
      approval: 50,
      stability: -50,
      productivity: 30,
      politicalCapital: 200,
    },
  },
]

export interface TechState {
  researched: string[]
  researchQueue: string[]
  currentResearch: string | null
  progress: Record<string, number>
}

export function isTechResearchable(tech: TechNode, state: TechState, politicalCapital: number, approval: number, stability: number): { available: boolean; reason: string } {
  if (state.researched.includes(tech.id)) return { available: false, reason: '已完成' }
  if (state.currentResearch === tech.id || state.researchQueue.includes(tech.id)) {
    return { available: false, reason: '研究队列中' }
  }
  
  if (!tech.requires.every(req => state.researched.includes(req))) {
    return { available: false, reason: '前置科技未完成' }
  }
  
  if (tech.mutuallyExclusive?.some(x => state.researched.includes(x))) {
    return { available: false, reason: '与已研究科技互斥' }
  }

  if (tech.cost > politicalCapital) {
    return { available: false, reason: `科研经费不足 (需要${tech.cost})` }
  }

  if (tech.requiresApproval && approval < tech.requiresApproval) {
    return { available: false, reason: `支持率不足 (需要${tech.requiresApproval}%)` }
  }

  if (tech.requiresStability && stability < tech.requiresStability) {
    return { available: false, reason: `稳定度不足 (需要${tech.requiresStability}%)` }
  }

  return { available: true, reason: '' }
}

export function applyTechEffects(
  techId: string,
  economy: any,
  political: any
): { economy: any; political: any } {
  const tech = USA_TECH_TREE.find(t => t.id === techId)
  if (!tech) return { economy, political }

  let e = { ...economy }
  let p = { ...political }

  if (tech.effects.productivity) e.totalFactorProductivity *= (1 + tech.effects.productivity / 100)
  if (tech.effects.gdpGrowth) e.gdpGrowth += tech.effects.gdpGrowth / 100
  if (tech.effects.inflation) e.inflation += tech.effects.inflation / 100
  if (tech.effects.unemployment) e.unemployment += tech.effects.unemployment / 100
  if (tech.effects.treasury) e.nationalDebt -= tech.effects.treasury
  if (tech.effects.stability) p.stability = Math.min(100, Math.max(0, p.stability + tech.effects.stability))
  if (tech.effects.approval) p.approval = Math.min(100, Math.max(0, p.approval + tech.effects.approval))
  if (tech.effects.politicalCapital) p.politicalCapital += tech.effects.politicalCapital

  return { economy: e, political: p }
}
