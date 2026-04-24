export interface InterestGroup {
  id: string
  name: string
  icon: string
  description: string
  basePower: number
  currentPower: number
  approval: number
  demands: string[]
  ideology: 'conservative' | 'liberal' | 'socialist' | 'nationalist' | 'libertarian' | 'authoritarian'
  effects: {
    approvalThreshold: number
    positiveEffects: Record<string, number>
    negativeEffects: Record<string, number>
  }
}

export const USA_INTEREST_GROUPS: InterestGroup[] = [
  {
    id: 'industrialists',
    name: '工业资本家',
    icon: '🏭',
    description: '华尔街和大公司的力量。他们想要减税、放松管制、自由贸易。',
    basePower: 25,
    currentPower: 25,
    approval: 55,
    demands: ['corporate_tax_cuts', 'deregulation', 'free_trade'],
    ideology: 'conservative',
    effects: {
      approvalThreshold: 60,
      positiveEffects: { gdpGrowth: 0.8, productivity: 1.5 },
      negativeEffects: { stability: -8, approval: -5, unemployment: 1.0 },
    },
  },
  {
    id: 'labor_unions',
    name: '工会运动',
    icon: '✊',
    description: '美国劳工联合会和产业工会联合会。他们想要更高工资、更好福利、更短工时。',
    basePower: 20,
    currentPower: 18,
    approval: 45,
    demands: ['minimum_wage', 'universal_healthcare', 'worker_protections'],
    ideology: 'socialist',
    effects: {
      approvalThreshold: 60,
      positiveEffects: { stability: 8, approval: 5, unemployment: -0.8 },
      negativeEffects: { gdpGrowth: -0.5, inflation: 0.5 },
    },
  },
  {
    id: 'military_industrial',
    name: '军工复合体',
    icon: '🎖️',
    description: '五角大楼、洛克希德马丁、雷神。他们想要更多军费、更多战争、永远的敌人。',
    basePower: 18,
    currentPower: 22,
    approval: 65,
    demands: ['defense_spending', 'foreign_wars', 'weapons_sales'],
    ideology: 'authoritarian',
    effects: {
      approvalThreshold: 65,
      positiveEffects: { politicalCapital: 15, stability: 5 },
      negativeEffects: { treasury: -800, approval: -5 },
    },
  },
  {
    id: 'media_establishment',
    name: '媒体建制派',
    icon: '📺',
    description: 'CNN、MSNBC、纽约时报。他们定义什么是真的，什么是假的。',
    basePower: 15,
    currentPower: 15,
    approval: 40,
    demands: ['media_bailouts', 'censorship', 'establishment_narrative'],
    ideology: 'liberal',
    effects: {
      approvalThreshold: 50,
      positiveEffects: { approval: 8 },
      negativeEffects: { stability: -10 },
    },
  },
  {
    id: 'silicon_valley',
    name: '科技寡头',
    icon: '💻',
    description: '谷歌、Meta、亚马逊。他们想要无监管、数据收集、AI开发。',
    basePower: 12,
    currentPower: 16,
    approval: 50,
    demands: ['tech_subsidies', 'no_antitrust', 'ai_development'],
    ideology: 'libertarian',
    effects: {
      approvalThreshold: 55,
      positiveEffects: { productivity: 3.0, gdpGrowth: 1.0 },
      negativeEffects: { unemployment: 1.5, stability: -5 },
    },
  },
  {
    id: 'nationalist_populists',
    name: '民族主义民粹派',
    icon: '🦅',
    description: 'MAGA运动、乡村选民、宗教右翼。他们想要美国优先、移民限制、文化保守主义。',
    basePower: 10,
    currentPower: 14,
    approval: 58,
    demands: ['immigration_restrictions', 'tariffs', 'culture_war'],
    ideology: 'nationalist',
    effects: {
      approvalThreshold: 60,
      positiveEffects: { approval: 10, stability: 5 },
      negativeEffects: { gdpGrowth: -0.5, inflation: 0.8 },
    },
  },
]

export interface Decree {
  id: string
  name: string
  icon: string
  description: string
  category: 'economic' | 'social' | 'diplomatic' | 'military'
  cost: number
  cooldown: number
  duration: number
  requiresApproval?: number
  requiresStability?: number
  requiresLaw?: string
  mutuallyExclusive?: string[]
  effects: Record<string, number>
  supportedBy: string[]
  opposedBy: string[]
}

export const USA_DECREES: Decree[] = [
  {
    id: 'emergency_rate_cut',
    name: '紧急降息',
    icon: '📉',
    description: '美联储紧急降息50个基点，向市场注入流动性。',
    category: 'economic',
    cost: 15,
    cooldown: 120,
    duration: 90,
    effects: {
      gdpGrowth: 0.5,
      inflation: 1.0,
      unemployment: -0.3,
    },
    supportedBy: ['industrialists', 'silicon_valley'],
    opposedBy: ['labor_unions'],
  },
  {
    id: 'stimulus_checks',
    name: '全民发钱',
    icon: '💵',
    description: '向每个美国人直接发放1200美元刺激支票。',
    category: 'economic',
    cost: 35,
    cooldown: 180,
    duration: 60,
    effects: {
      approval: 12,
      inflation: 1.5,
      treasury: -2000,
      gdpGrowth: 0.8,
    },
    supportedBy: ['labor_unions'],
    opposedBy: ['industrialists', 'military_industrial'],
  },
  {
    id: 'deploy_national_guard',
    name: '部署国民警卫队',
    icon: '🎖️',
    description: '在主要城市部署国民警卫队，恢复法律与秩序。',
    category: 'social',
    cost: 25,
    cooldown: 90,
    duration: 45,
    requiresStability: 35,
    effects: {
      stability: 15,
      approval: -8,
      politicalCapital: -10,
    },
    supportedBy: ['military_industrial', 'nationalist_populists'],
    opposedBy: ['labor_unions', 'media_establishment'],
  },
  {
    id: 'sanction_china',
    name: '制裁中国',
    icon: '🇨🇳',
    description: '对中国实施新一轮经济制裁和关税。',
    category: 'diplomatic',
    cost: 30,
    cooldown: 180,
    duration: 180,
    effects: {
      approval: 8,
      inflation: 2.0,
      treasury: 500,
      gdpGrowth: -0.5,
    },
    supportedBy: ['military_industrial', 'nationalist_populists'],
    opposedBy: ['industrialists', 'silicon_valley'],
  },
  {
    id: 'student_debt_relief',
    name: '学生贷款减免',
    icon: '🎓',
    description: '免除1万亿美元学生贷款债务。',
    category: 'social',
    cost: 40,
    cooldown: 365,
    duration: 120,
    requiresApproval: 45,
    effects: {
      approval: 18,
      stability: -10,
      treasury: -1500,
    },
    supportedBy: ['labor_unions', 'media_establishment'],
    opposedBy: ['industrialists', 'nationalist_populists'],
  },
  {
    id: 'airstrike_middle_east',
    name: '中东空袭',
    icon: '✈️',
    description: '对中东恐怖分子据点实施精确打击。团结全国！',
    category: 'military',
    cost: 20,
    cooldown: 60,
    duration: 30,
    effects: {
      approval: 10,
      stability: 8,
      treasury: -300,
      politicalCapital: 15,
    },
    supportedBy: ['military_industrial', 'media_establishment'],
    opposedBy: [],
  },
  {
    id: 'ban_tiktok',
    name: '封禁TikTok',
    icon: '📵',
    description: '以国家安全为由封禁字节跳动旗下应用。',
    category: 'diplomatic',
    cost: 25,
    cooldown: 120,
    duration: 365,
    effects: {
      approval: 6,
      stability: 3,
    },
    supportedBy: ['military_industrial', 'silicon_valley'],
    opposedBy: ['media_establishment'],
  },
  {
    id: 'nationalize_big_pharma',
    name: '国有化制药公司',
    icon: '💊',
    description: '将大型制药公司收归国有，大幅降低药价。',
    category: 'economic',
    cost: 65,
    cooldown: 365,
    duration: 180,
    requiresStability: 40,
    requiresApproval: 50,
    effects: {
      approval: 22,
      stability: -20,
      gdpGrowth: -1.0,
    },
    supportedBy: ['labor_unions'],
    opposedBy: ['industrialists', 'silicon_valley', 'military_industrial'],
  },
  {
    id: 'ufo_disclosure',
    name: 'UFO解密',
    icon: '👽',
    description: '公开所有UFO和非人类智能的机密文件。',
    category: 'social',
    cost: 50,
    cooldown: 365,
    duration: 90,
    effects: {
      approval: 15,
      stability: -25,
      politicalCapital: 30,
    },
    supportedBy: [],
    opposedBy: ['military_industrial', 'media_establishment'],
  },
  {
    id: 'print_money',
    name: '无限QE',
    icon: '🖨️',
    description: '美联储开启无限印钞，向市场注入数万亿美元。',
    category: 'economic',
    cost: 10,
    cooldown: 30,
    duration: 60,
    effects: {
      gdpGrowth: 1.2,
      inflation: 4.0,
      approval: 3,
      stability: -5,
    },
    supportedBy: ['industrialists', 'silicon_valley', 'military_industrial'],
    opposedBy: ['labor_unions', 'nationalist_populists'],
  },
]

export function calculateGroupEffects(groups: InterestGroup[]): Record<string, number> {
  const effects: Record<string, number> = {}
  
  groups.forEach(group => {
    const isHappy = group.approval >= group.effects.approvalThreshold
    const powerFactor = group.currentPower / 100
    
    if (isHappy) {
      Object.entries(group.effects.positiveEffects).forEach(([key, value]) => {
        effects[key] = (effects[key] || 0) + value * powerFactor
      })
    } else {
      Object.entries(group.effects.negativeEffects).forEach(([key, value]) => {
        effects[key] = (effects[key] || 0) + value * powerFactor
      })
    }
  })
  
  return effects
}
