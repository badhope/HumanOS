import type { Policy } from './types'

export const POLICIES_EXPANSION: Policy[] = [
  // ========================================
  // 【第一部分】财政税收政策 (15个)
  // ========================================

  {
    id: 'wealth_tax',
    name: '遗产税与赠与税',
    category: 'fiscal' as const,
    isActive: false,
    icon: '💎',
    description: '对500万以上遗产征收超额累进税率，调节贫富差距',
    effects: {
      pops: { approval: -8, income: 2 },
      treasury: { income: 15, stability: -3 },
    },
    upkeep: 0,
    implementationCost: 15000,
    politicalCost: 60,
    implementationDays: 60,
    implementationProgress: 0,
  },

  {
    id: 'property_tax_national',
    name: '全国统一房产税',
    category: 'fiscal' as const,
    isActive: false,
    icon: '🏠',
    description: '对第二套及以上住房按评估值逐年征税',
    effects: {
      pops: { approval: -12, standardOfLiving: -2 },
      treasury: { income: 25 },
    },
    upkeep: 0,
    implementationCost: 25000,
    politicalCost: 80,
    implementationDays: 90,
    implementationProgress: 0,
  },

  {
    id: 'vat_reduction',
    name: '增值税大规模减税',
    category: 'fiscal' as const,
    isActive: false,
    icon: '📜',
    description: '制造业增值税从13%降至9%，激发市场活力',
    effects: {
      pops: { approval: 10, income: 5 },
      treasury: { income: -18, stability: 5 },
    },
    upkeep: 0,
    implementationCost: 10000,
    politicalCost: 35,
    implementationDays: 45,
    implementationProgress: 0,
  },

  {
    id: 'digital_services_tax',
    name: '数字服务税',
    category: 'fiscal' as const,
    isActive: false,
    icon: '💻',
    description: '对互联网巨头年流水征收3%数字税',
    effects: {
      pops: { approval: 12 },
      treasury: { income: 12 },
    },
    upkeep: 0,
    implementationCost: 8000,
    politicalCost: 45,
    implementationDays: 50,
    implementationProgress: 0,
  },

  {
    id: 'carbon_tax',
    name: '碳边境调节税',
    category: 'fiscal' as const,
    isActive: false,
    icon: '🌿',
    description: '对高耗能进口产品征收碳关税',
    effects: {
      pops: { approval: 8 },
      treasury: { income: 8 },
      market: { coal: { price: 0.15 } },
    },
    upkeep: 0,
    implementationCost: 12000,
    politicalCost: 40,
    implementationDays: 60,
    implementationProgress: 0,
  },

  {
    id: 'special_consumption_tax',
    name: '奢侈消费税扩围',
    category: 'fiscal' as const,
    isActive: false,
    icon: '👜',
    description: '对私人飞机、游艇、顶级豪宅加征80%消费税',
    effects: {
      pops: { approval: 15, standardOfLiving: 1 },
      treasury: { income: 10 },
    },
    upkeep: 0,
    implementationCost: 6000,
    politicalCost: 25,
    implementationDays: 30,
    implementationProgress: 0,
  },

  // ========================================
  // 【第二部分】产业科技政策 (15个)
  // ========================================

  {
    id: 'chip_independence',
    name: '芯片自主化工程',
    category: 'industry' as const,
    isActive: false,
    icon: '🔬',
    description: '举国体制攻克14nm、7nm、3nm芯片全产业链',
    effects: {
      pops: { approval: 12 },
      treasury: { income: -35, stability: 8 },
    },
    upkeep: 15,
    implementationCost: 80000,
    politicalCost: 55,
    implementationDays: 180,
    implementationProgress: 0,
  },

  {
    id: 'ev_battery_strategy',
    name: '动力电池强国战略',
    category: 'industry' as const,
    isActive: false,
    icon: '🔋',
    description: '固态电池、CTC、800V高压平台国家攻关',
    effects: {
      pops: { approval: 8 },
      treasury: { income: -20 },
    },
    upkeep: 8,
    implementationCost: 45000,
    politicalCost: 40,
    implementationDays: 120,
    implementationProgress: 0,
  },

  {
    id: 'big_pharma_plan',
    name: '创新药大国工程',
    category: 'industry' as const,
    isActive: false,
    icon: '💊',
    description: '培育5家全球Top50药企，攻克ADC、双抗、基因编辑',
    effects: {
      pops: { approval: 10, standardOfLiving: 3 },
      treasury: { income: -25 },
      market: { medicine: { supply: 0.25 } },
    },
    upkeep: 12,
    implementationCost: 55000,
    politicalCost: 45,
    implementationDays: 150,
    implementationProgress: 0,
  },

  {
    id: 'industrial_robotization',
    name: '无人工厂革命',
    category: 'industry' as const,
    isActive: false,
    icon: '🤖',
    description: '制造业机器人密度翻三倍，工业4.0全面升级',
    effects: {
      pops: { approval: 3 },
      treasury: { income: -15 },
    },
    upkeep: 6,
    implementationCost: 35000,
    politicalCost: 35,
    implementationDays: 100,
    implementationProgress: 0,
  },

  {
    id: 'commercial_space',
    name: '商业航天举国体制',
    category: 'industry' as const,
    isActive: false,
    icon: '🚀',
    description: '可回收火箭、星链、太空旅游全面商业化',
    effects: {
      pops: { approval: 15 },
      treasury: { income: -30 },
    },
    upkeep: 10,
    implementationCost: 65000,
    politicalCost: 50,
    implementationDays: 160,
    implementationProgress: 0,
  },

  {
    id: 'agriculture_biotech',
    name: '转基因主粮产业化',
    category: 'industry' as const,
    isActive: false,
    icon: '🌾',
    description: '抗虫、抗除草剂、高产转基因主粮商业化种植',
    effects: {
      pops: { approval: -10, standardOfLiving: 2 },
      treasury: { income: -8 },
      market: { grain: { supply: 0.35 } },
    },
    upkeep: 3,
    implementationCost: 20000,
    politicalCost: 65,
    implementationDays: 80,
    implementationProgress: 0,
  },

  // ========================================
  // 【第三部分】社会民生政策 (15个)
  // ========================================
  
  {
    id: 'three_child_super_incentives',
    name: '三胎超级激励计划',
    category: 'social' as const,
    isActive: false,
    icon: '👶',
    description: '每孩百万补贴+房价五折+免费教育医疗',
    effects: {
      pops: { approval: 20, standardOfLiving: 5, income: 10 },
      treasury: { income: -40 },
    },
    upkeep: 25,
    implementationCost: 50000,
    politicalCost: 55,
    implementationDays: 100,
    implementationProgress: 0,
  },

  {
    id: 'education_revolution',
    name: '教育大革命',
    category: 'social' as const,
    isActive: false,
    icon: '🎓',
    description: '缩短学制、取消中考、普职融合、素质教育',
    effects: {
      pops: { approval: 15, standardOfLiving: 3 },
      treasury: { income: -15 },
    },
    upkeep: 8,
    implementationCost: 30000,
    politicalCost: 70,
    implementationDays: 120,
    implementationProgress: 0,
  },

  {
    id: 'medical_system_overhaul',
    name: '医疗系统全面改革',
    category: 'social' as const,
    isActive: false,
    icon: '🏥',
    description: '医药分开、分级诊疗、全民医保、阳光收入',
    effects: {
      pops: { approval: 18, standardOfLiving: 5 },
      treasury: { income: -20 },
      market: { medicine: { price: -0.30 } },
    },
    upkeep: 12,
    implementationCost: 40000,
    politicalCost: 75,
    implementationDays: 150,
    implementationProgress: 0,
  },

  {
    id: 'housing_rental_system',
    name: '保障性住房体系',
    category: 'social' as const,
    isActive: false,
    icon: '🏘️',
    description: '30%人口纳入公租房/保租房/共有产权房体系',
    effects: {
      pops: { approval: 15, standardOfLiving: 4 },
      treasury: { income: -30 },
    },
    upkeep: 15,
    implementationCost: 70000,
    politicalCost: 50,
    implementationDays: 180,
    implementationProgress: 0,
  },

  {
    id: 'ubi_experiment',
    name: '全民基本收入试点',
    category: 'social' as const,
    isActive: false,
    icon: '💸',
    description: '每人每月无条件发放1000元基本收入',
    effects: {
      pops: { approval: 25, standardOfLiving: 8, income: 15 },
      treasury: { income: -60 },
    },
    upkeep: 50,
    implementationCost: 100000,
    politicalCost: 80,
    implementationDays: 200,
    implementationProgress: 0,
  },

  {
    id: 'retirement_age_reform',
    name: '渐进式延迟退休',
    category: 'social' as const,
    isActive: false,
    icon: '👴',
    description: '每年延迟3个月，最终男65女60',
    effects: {
      pops: { approval: -20 },
      treasury: { income: 20, stability: -8 },
    },
    upkeep: 0,
    implementationCost: 15000,
    politicalCost: 85,
    implementationDays: 90,
    implementationProgress: 0,
  },

  // ========================================
  // 【第四部分】改革开放政策 (10个)
  // ========================================

  {
    id: 'capital_account_liberalization',
    name: '资本账户可兑换',
    category: 'reform' as const,
    isActive: false,
    icon: '💰',
    description: '全面开放资本项目，人民币自由兑换',
    effects: {
      pops: { approval: 5 },
      treasury: { income: 15, stability: -10 },
    },
    upkeep: 0,
    implementationCost: 30000,
    politicalCost: 65,
    implementationDays: 120,
    implementationProgress: 0,
  },

  {
    id: 'hukou_system_abolition',
    name: '户籍制度全面取消',
    category: 'reform' as const,
    isActive: false,
    icon: '🆔',
    description: '城乡二元结构终结，基本公共服务全国均等化',
    effects: {
      pops: { approval: 20, standardOfLiving: 5 },
      treasury: { income: -25, stability: 8 },
    },
    upkeep: 10,
    implementationCost: 45000,
    politicalCost: 70,
    implementationDays: 150,
    implementationProgress: 0,
  },

  {
    id: 'state_owned_enterprise_reform',
    name: '国企混合所有制深化',
    category: 'reform' as const,
    isActive: false,
    icon: '🏭',
    description: '职业经理人、员工持股、市场化考核全面推行',
    effects: {
      pops: { approval: 8 },
      treasury: { income: 10 },
    },
    upkeep: 0,
    implementationCost: 20000,
    politicalCost: 55,
    implementationDays: 100,
    implementationProgress: 0,
  },

  {
    id: 'land_market_reform',
    name: '农村土地制度改革',
    category: 'reform' as const,
    isActive: false,
    icon: '🌱',
    description: '农村集体土地同权同价入市交易',
    effects: {
      pops: { approval: 12, standardOfLiving: 4, income: 8 },
      treasury: { income: -10 },
    },
    upkeep: 0,
    implementationCost: 25000,
    politicalCost: 65,
    implementationDays: 130,
    implementationProgress: 0,
  },
]

export default POLICIES_EXPANSION
