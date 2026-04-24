export interface InterestGroup {
  id: string
  name: string
  icon: string
  description: string
  ideology: string
  population: number
  power: number
  approval: number
  desiredLaws: string[]
  opposedLaws: string[]
  issues: string[]
  voters: string[]
  radicals: number
  loyalists: number
}

export interface Law {
  id: string
  name: string
  category: 'government' | 'economy' | 'society' | 'military'
  description: string
  tier: number
  effects: Record<string, number>
  supporters: string[]
  opposers: string[]
  enactmentProgress: number
  enactmentDifficulty: number
  controversy: number
}

export interface PopulationStrata {
  id: string
  name: string
  icon: string
  count: number
  literacy: number
  standardOfLiving: number
  income: number
  consumption: Record<string, number>
  needs: { basic: string[]; comfort: string[]; luxury: string[] }
  politicalAlignment: Record<string, number>
  militancy: number
  birthRate: number
  deathRate: number
}

export interface Technology {
  id: string
  name: string
  category: 'production' | 'military' | 'society'
  tier: number
  description: string
  year: number
  cost: number
  progress: number
  effects: Record<string, number>
  unlockedBy: string[]
  unlocks: string[]
}

export const INTEREST_GROUPS: InterestGroup[] = [
  {
    id: 'landowners',
    name: '地主阶级',
    icon: '🏰',
    description: '拥有大量土地的传统贵族，希望维持封建特权和农奴制度。',
    ideology: '保守主义',
    population: 0.02,
    power: 40,
    approval: 50,
    desiredLaws: ['serfdom', 'traditionalism', 'monarchy_absolute'],
    opposedLaws: ['universal_suffrage', 'land_reform', 'laissez_faire'],
    issues: ['农业补贴', '贵族特权'],
    voters: ['大地产者', '旧贵族'],
    radicals: 5,
    loyalists: 30,
  },
  {
    id: 'industrialists',
    name: '实业家',
    icon: '🏭',
    description: '新兴的工厂主和资本家，推动工业化和自由市场。',
    ideology: '自由主义',
    population: 0.01,
    power: 35,
    approval: 50,
    desiredLaws: ['laissez_faire', 'free_trade', 'limited_monarchy'],
    opposedLaws: ['planned_economy', 'protectionism', 'serfdom'],
    issues: ['工业化补贴', '关税保护'],
    voters: ['工厂主', '银行家', '商人'],
    radicals: 10,
    loyalists: 20,
  },
  {
    id: 'trade_unions',
    name: '工会',
    icon: '✊',
    description: '组织起来的产业工人，争取更好的工作条件和社会保障。',
    ideology: '社会主义',
    population: 0.15,
    power: 20,
    approval: 30,
    desiredLaws: ['minimum_wage', 'social_security', 'universal_suffrage'],
    opposedLaws: ['serfdom', 'unregulated_work', 'ban_unions'],
    issues: ['8小时工作制', '养老金', '失业救济'],
    voters: ['产业工人', '技术工人'],
    radicals: 40,
    loyalists: 5,
  },
  {
    id: 'clergy',
    name: '教士阶层',
    icon: '⛪',
    description: '宗教机构的代表，维护传统价值观和教会权力。',
    ideology: '教权主义',
    population: 0.01,
    power: 25,
    approval: 50,
    desiredLaws: ['state_religion', 'traditionalism', 'monarchy'],
    opposedLaws: ['secularism', 'freedom_of_conscience', 'divorce'],
    issues: ['教育权', '婚姻制度'],
    voters: ['神父', '修道士', '虔信农民'],
    radicals: 15,
    loyalists: 35,
  },
  {
    id: 'military',
    name: '军队集团',
    icon: '⚔️',
    description: '职业军官和退伍军人，崇尚国家荣誉和军事扩张。',
    ideology: '军国主义',
    population: 0.03,
    power: 30,
    approval: 60,
    desiredLaws: ['jingoism', 'conscription', 'military_spending_high'],
    opposedLaws: ['pacifism', 'disarmament', 'professional_army_only'],
    issues: ['军费预算', '军工发展'],
    voters: ['军官', '退伍军人', '军属'],
    radicals: 25,
    loyalists: 45,
  },
  {
    id: 'intelligentsia',
    name: '知识分子',
    icon: '🎓',
    description: '教授、作家、艺术家，思想进步但各有主张。',
    ideology: '各种主义',
    population: 0.02,
    power: 15,
    approval: 40,
    desiredLaws: ['secularism', 'public_education', 'freedom_of_press'],
    opposedLaws: ['censorship', 'serfdom', 'state_religion'],
    issues: ['学术自由', '现代化改革'],
    voters: ['教授', '记者', '作家', '学生'],
    radicals: 50,
    loyalists: 10,
  },
  {
    id: 'petite_bourgeoisie',
    name: '小资产阶级',
    icon: '🏪',
    description: '小店主、工匠、自雇者，担心被大资本吞噬。',
    ideology: '民粹主义',
    population: 0.10,
    power: 10,
    approval: 45,
    desiredLaws: ['small_business_protection', 'craftsmen_privileges'],
    opposedLaws: ['laissez_faire', 'big_business_monopoly'],
    issues: ['公平竞争', '反对托拉斯'],
    voters: ['店主', '工匠', '个体经营者'],
    radicals: 20,
    loyalists: 15,
  },
  {
    id: 'peasants',
    name: '农民',
    icon: '🌾',
    description: '占人口绝大多数的农民，只求温饱。',
    ideology: '传统主义',
    population: 0.66,
    power: 5,
    approval: 50,
    desiredLaws: ['land_reform', 'low_taxes'],
    opposedLaws: ['serfdom', 'high_land_tax'],
    issues: ['饥荒救济', '田赋减免'],
    voters: ['自耕农', '佃农', '雇农'],
    radicals: 30,
    loyalists: 25,
  },
]

export const LAWS: Law[] = [
  {
    id: 'serfdom',
    name: '农奴制',
    category: 'society',
    description: '农民被束缚在土地上，没有人身自由。',
    tier: 1,
    effects: { aristocrat_power: 20, peasant_output: 20, radicalism: 10 },
    supporters: ['landowners'],
    opposers: ['peasants', 'trade_unions', 'intelligentsia'],
    enactmentProgress: 0,
    enactmentDifficulty: 3,
    controversy: 70,
  },
  {
    id: 'emancipation',
    name: '农奴解放',
    category: 'society',
    description: '给予农民人身自由，但可能需要赎金。',
    tier: 2,
    effects: { labor_pool: 30, industrial_growth: 10, landowner_power: -20 },
    supporters: ['industrialists', 'intelligentsia', 'trade_unions'],
    opposers: ['landowners'],
    enactmentProgress: 0,
    enactmentDifficulty: 6,
    controversy: 80,
  },
  {
    id: 'monarchy_absolute',
    name: '绝对君主制',
    category: 'government',
    description: '君主掌握一切权力，朕即国家。',
    tier: 1,
    effects: { executive_power: 50, legitimacy: 30, radicalism: 15 },
    supporters: ['landowners', 'clergy', 'military'],
    opposers: ['industrialists', 'intelligentsia', 'trade_unions'],
    enactmentProgress: 0,
    enactmentDifficulty: 2,
    controversy: 50,
  },
  {
    id: 'constitutional_monarchy',
    name: '君主立宪制',
    category: 'government',
    description: '君主统而不治，议会掌握实权。',
    tier: 3,
    effects: { legitimacy: 40, radicalism: -10, bureaucracy: 15 },
    supporters: ['industrialists', 'petite_bourgeoisie'],
    opposers: ['landowners'],
    enactmentProgress: 0,
    enactmentDifficulty: 8,
    controversy: 60,
  },
  {
    id: 'republic',
    name: '共和制',
    category: 'government',
    description: '国家元首由选举产生。',
    tier: 4,
    effects: { legitimacy: 50, radicalism: -20, industrial_power: 10 },
    supporters: ['intelligentsia', 'trade_unions', 'industrialists'],
    opposers: ['landowners', 'clergy', 'military'],
    enactmentProgress: 0,
    enactmentDifficulty: 10,
    controversy: 90,
  },
  {
    id: 'traditionalism',
    name: '国教传统',
    category: 'society',
    description: '教会在国家生活中占据主导地位。',
    tier: 1,
    effects: { clergy_power: 30, education_access: -20, social_order: 20 },
    supporters: ['clergy', 'landowners'],
    opposers: ['intelligentsia'],
    enactmentProgress: 0,
    enactmentDifficulty: 3,
    controversy: 40,
  },
  {
    id: 'secularism',
    name: '世俗化',
    category: 'society',
    description: '政教分离，宗教退出公共领域。',
    tier: 3,
    effects: { clergy_power: -40, education_access: 30, radicalism: 10 },
    supporters: ['intelligentsia', 'industrialists'],
    opposers: ['clergy'],
    enactmentProgress: 0,
    enactmentDifficulty: 7,
    controversy: 75,
  },
  {
    id: 'laissez_faire',
    name: '自由放任',
    category: 'economy',
    description: '政府不干预经济，市场自己会调节。',
    tier: 2,
    effects: { industrial_growth: 25, inequality: 20, industrialist_power: 30 },
    supporters: ['industrialists'],
    opposers: ['trade_unions', 'peasants'],
    enactmentProgress: 0,
    enactmentDifficulty: 5,
    controversy: 65,
  },
  {
    id: 'interventionism',
    name: '国家干预',
    category: 'economy',
    description: '政府主动调控经济，建设基础设施。',
    tier: 3,
    effects: { infrastructure: 30, industrial_growth: 15, bureaucracy_cost: 20 },
    supporters: ['industrialists', 'military'],
    opposers: [],
    enactmentProgress: 0,
    enactmentDifficulty: 6,
    controversy: 40,
  },
  {
    id: 'welfare_state',
    name: '福利国家',
    category: 'economy',
    description: '全民社会保障，从摇篮到坟墓。',
    tier: 4,
    effects: { living_standard: 30, radicalism: -30, government_cost: 40 },
    supporters: ['trade_unions', 'intelligentsia', 'peasants'],
    opposers: ['industrialists', 'landowners'],
    enactmentProgress: 0,
    enactmentDifficulty: 9,
    controversy: 70,
  },
  {
    id: 'conscription',
    name: '全民征兵',
    category: 'military',
    description: '适龄男性必须服兵役。',
    tier: 2,
    effects: { army_size: 100, jingoism: 20, radicalism: 15 },
    supporters: ['military'],
    opposers: ['peasants', 'trade_unions'],
    enactmentProgress: 0,
    enactmentDifficulty: 5,
    controversy: 60,
  },
  {
    id: 'professional_army',
    name: '职业军队',
    category: 'military',
    description: '军队职业化，志愿入伍。',
    tier: 3,
    effects: { army_quality: 50, military_cost: 30, radicalism: -10 },
    supporters: ['military', 'industrialists'],
    opposers: [],
    enactmentProgress: 0,
    enactmentDifficulty: 6,
    controversy: 30,
  },
]

export const POPULATION_STRATA: PopulationStrata[] = [
  {
    id: 'aristocrats',
    name: '贵族',
    icon: '👑',
    count: 0.01,
    literacy: 95,
    standardOfLiving: 10,
    income: 1000,
    consumption: { luxury: 50, comfort: 30, basic: 20 },
    needs: { basic: ['食物', '衣物'], comfort: ['仆役', '马车'], luxury: ['艺术品', '庄园'] },
    politicalAlignment: { landowners: 80, conservatives: 20 },
    militancy: 10,
    birthRate: 2,
    deathRate: 5,
  },
  {
    id: 'capitalists',
    name: '资本家',
    icon: '💼',
    count: 0.005,
    literacy: 90,
    standardOfLiving: 9,
    income: 800,
    consumption: { luxury: 40, comfort: 40, basic: 20 },
    needs: { basic: ['食物', '衣物'], comfort: ['洋房', '投资'], luxury: ['奢侈品', '社交'] },
    politicalAlignment: { industrialists: 70, liberals: 30 },
    militancy: 15,
    birthRate: 3,
    deathRate: 6,
  },
  {
    id: 'clergy',
    name: '教士',
    icon: '✝️',
    count: 0.005,
    literacy: 85,
    standardOfLiving: 6,
    income: 150,
    consumption: { luxury: 10, comfort: 40, basic: 50 },
    needs: { basic: ['食物', '住所'], comfort: ['书籍', '仪式用品'], luxury: ['宗教圣物'] },
    politicalAlignment: { clergy: 90, conservatives: 10 },
    militancy: 20,
    birthRate: 4,
    deathRate: 8,
  },
  {
    id: 'officers',
    name: '军官',
    icon: '🎖️',
    count: 0.005,
    literacy: 80,
    standardOfLiving: 7,
    income: 200,
    consumption: { luxury: 15, comfort: 45, basic: 40 },
    needs: { basic: ['食物', '军装'], comfort: ['马匹', '营房'], luxury: ['勋章', '佩剑'] },
    politicalAlignment: { military: 85, jingoists: 15 },
    militancy: 35,
    birthRate: 4,
    deathRate: 10,
  },
  {
    id: 'bureaucrats',
    name: '官僚',
    icon: '📋',
    count: 0.02,
    literacy: 85,
    standardOfLiving: 6,
    income: 120,
    consumption: { luxury: 5, comfort: 45, basic: 50 },
    needs: { basic: ['食物', '笔墨'], comfort: ['体面住房', '制服'], luxury: ['官场应酬'] },
    politicalAlignment: { state_power: 60, status_quo: 40 },
    militancy: 20,
    birthRate: 4,
    deathRate: 7,
  },
  {
    id: 'engineers',
    name: '工程师/知识分子',
    icon: '🔬',
    count: 0.01,
    literacy: 95,
    standardOfLiving: 6,
    income: 180,
    consumption: { luxury: 20, comfort: 50, basic: 30 },
    needs: { basic: ['食物', '书籍'], comfort: ['实验室', '仪器'], luxury: ['学术交流'] },
    politicalAlignment: { intelligentsia: 70, progressives: 30 },
    militancy: 45,
    birthRate: 3,
    deathRate: 7,
  },
  {
    id: 'shopkeepers',
    name: '店主/工匠',
    icon: '🔨',
    count: 0.05,
    literacy: 60,
    standardOfLiving: 5,
    income: 80,
    consumption: { luxury: 5, comfort: 35, basic: 60 },
    needs: { basic: ['食物', '工具'], comfort: ['店面', '存货'], luxury: ['扩大经营'] },
    politicalAlignment: { petite_bourgeoisie: 60, populists: 40 },
    militancy: 30,
    birthRate: 5,
    deathRate: 12,
  },
  {
    id: 'workers',
    name: '产业工人',
    icon: '⚙️',
    count: 0.15,
    literacy: 40,
    standardOfLiving: 3,
    income: 30,
    consumption: { luxury: 0, comfort: 10, basic: 90 },
    needs: { basic: ['面包', '土豆', '房租'], comfort: ['茶叶', '啤酒'], luxury: [] },
    politicalAlignment: { trade_unions: 50, socialists: 50 },
    militancy: 55,
    birthRate: 6,
    deathRate: 20,
  },
  {
    id: 'servants',
    name: '仆役',
    icon: '🧹',
    count: 0.05,
    literacy: 20,
    standardOfLiving: 3,
    income: 15,
    consumption: { luxury: 0, comfort: 5, basic: 95 },
    needs: { basic: ['食宿'], comfort: [], luxury: [] },
    politicalAlignment: { status_quo: 70, conservatives: 30 },
    militancy: 25,
    birthRate: 5,
    deathRate: 18,
  },
  {
    id: 'peasants',
    name: '农民',
    icon: '🌾',
    count: 0.695,
    literacy: 10,
    standardOfLiving: 2,
    income: 10,
    consumption: { luxury: 0, comfort: 0, basic: 100 },
    needs: { basic: ['黑面包', '马铃薯', '木柴'], comfort: [], luxury: [] },
    politicalAlignment: { peasants: 40, traditionalists: 60 },
    militancy: 40,
    birthRate: 7,
    deathRate: 25,
  },
]

export const TECHNOLOGIES: Technology[] = [
  {
    id: 'steam_engine',
    name: '蒸汽机',
    category: 'production',
    tier: 1,
    description: '第一次工业革命的核心，瓦特改良的蒸汽机彻底改变世界。',
    year: 1780,
    cost: 1000,
    progress: 0,
    effects: { industrial_output: 50, coal_demand: 100, labor_productivity: 30 },
    unlockedBy: [],
    unlocks: ['railroad', 'steam_ship', 'textile_mills'],
  },
  {
    id: 'railroad',
    name: '铁路',
    category: 'production',
    tier: 2,
    description: '钢铁与蒸汽的奇迹，彻底改变时空距离。',
    year: 1830,
    cost: 2000,
    progress: 0,
    effects: { market_access: 80, infrastructure: 100, coal_demand: 50 },
    unlockedBy: ['steam_engine'],
    unlocks: ['urbanization', 'large_factories'],
  },
  {
    id: 'nitrogen_fixation',
    name: '合成氨',
    category: 'production',
    tier: 3,
    description: '哈伯法，从空气中制造面包的魔法。',
    year: 1909,
    cost: 4000,
    progress: 0,
    effects: { agricultural_output: 100, fertilizer: 200 },
    unlockedBy: ['modern_chemistry'],
    unlocks: ['population_explosion'],
  },
  {
    id: 'electricity',
    name: '电力',
    category: 'production',
    tier: 2,
    description: '第二次工业革命的核心，光明的新时代。',
    year: 1870,
    cost: 3000,
    progress: 0,
    effects: { factory_efficiency: 60, urban_standard: 40, new_industries: 80 },
    unlockedBy: ['modern_physics'],
    unlocks: ['telecommunications', 'assembly_line'],
  },
  {
    id: 'combustion_engine',
    name: '内燃机',
    category: 'production',
    tier: 3,
    description: '石油时代的开启，汽车与飞机的时代。',
    year: 1885,
    cost: 3500,
    progress: 0,
    effects: { oil_demand: 150, transport_efficiency: 70 },
    unlockedBy: ['electricity'],
    unlocks: ['automobiles', 'aviation'],
  },
  {
    id: 'breech_loader',
    name: '后装枪',
    category: 'military',
    tier: 1,
    description: '前装枪的末日，克尼格雷茨战役证明了一切。',
    year: 1850,
    cost: 800,
    progress: 0,
    effects: { infantry_firepower: 200, rate_of_fire: 300 },
    unlockedBy: [],
    unlocks: ['rifling', 'machine_gun'],
  },
  {
    id: 'dreadnought',
    name: '无畏舰',
    category: 'military',
    tier: 2,
    description: '全装重型火炮，一夜之间让所有战舰过时。',
    year: 1906,
    cost: 5000,
    progress: 0,
    effects: { naval_power: 150, naval_costs: 200 },
    unlockedBy: ['steel_production'],
    unlocks: ['naval_arms_race'],
  },
  {
    id: 'universal_suffrage',
    name: '普选权',
    category: 'society',
    tier: 2,
    description: '一人一票，民主的胜利还是群氓的狂欢？',
    year: 1890,
    cost: 1500,
    progress: 0,
    effects: { legitimacy: 50, socialist_party_power: 80, radicalism: -30 },
    unlockedBy: ['enlightenment_thought'],
    unlocks: ['mass_politics'],
  },
  {
    id: 'public_health',
    name: '公共卫生',
    category: 'society',
    tier: 1,
    description: '下水道比所有医生拯救的生命都多。',
    year: 1850,
    cost: 1200,
    progress: 0,
    effects: { mortality: -50, urban_capacity: 100, life_expectancy: 30 },
    unlockedBy: ['modern_medicine'],
    unlocks: ['population_explosion'],
  },
  {
    id: 'scientific_management',
    name: '科学管理',
    category: 'society',
    tier: 2,
    description: '泰勒制，人成为机器的一部分。',
    year: 1910,
    cost: 2500,
    progress: 0,
    effects: { labor_productivity: 50, alienation: 40 },
    unlockedBy: [],
    unlocks: ['assembly_line'],
  },
]

export function calculateGovernmentLegitimacy(activeLaws: string[], groupApproval: Record<string, number>): number {
  let legitimacy = 50
  if (activeLaws.includes('monarchy_absolute')) legitimacy += 20
  if (activeLaws.includes('constitutional_monarchy')) legitimacy += 30
  if (activeLaws.includes('republic')) legitimacy += 40
  
  Object.values(groupApproval).forEach(approval => {
    legitimacy += (approval - 50) / 10
  })
  
  return Math.max(0, Math.min(100, legitimacy))
}

export function calculateLawSupport(lawId: string, groups: InterestGroup[]): number {
  const law = LAWS.find(l => l.id === lawId)
  if (!law) return 0
  
  let support = 0
  groups.forEach(group => {
    if (law.supporters.includes(group.id)) {
      support += group.power * (group.approval / 50)
    }
    if (law.opposers.includes(group.id)) {
      support -= group.power * ((100 - group.approval) / 50)
    }
  })
  
  return Math.max(0, Math.min(100, support + 50))
}

export function getInterestGroupByMilitancy(militancyThreshold: number): InterestGroup[] {
  return INTEREST_GROUPS.filter(g => g.radicals >= militancyThreshold)
}
