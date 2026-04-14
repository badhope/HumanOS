import type { Country } from './types'

export const COUNTRIES: { [id: string]: Country } = {
  usa: {
    id: 'usa',
    name: '美利坚合众国',
    flag: '🇺🇸',
    region: 'americas',
    difficulty: 2,
    description: '全球第一大经济体，拥有世界储备货币和最强科技创新能力。军事和文化影响力遍及全球。',
    politicalSystem: '三权分立总统制',
    
    startingDate: { year: 2026, month: 1, day: 1 },
    
    spirits: [
      {
        id: 'exorbitant_privilege',
        name: '过度特权',
        icon: '💵',
        description: '美元作为世界储备货币的地位允许美国以极低利率举债',
        effects: [
          { type: 'interest_rate', value: -0.03, description: '利率降低3%' },
          { type: 'debt_limit', value: 1.5, description: '债务上限提高50%' },
        ],
      },
      {
        id: 'innovation_leader',
        name: '创新领袖',
        icon: '🔬',
        description: '硅谷生态系统和世界顶尖大学驱动持续创新',
        effects: [
          { type: 'research_bonus', value: 0.25, description: '研究速度+25%' },
          { type: 'high_tech_output', value: 0.3, description: '高科技产出+30%' },
        ],
      },
      {
        id: 'partisan_polarization',
        name: '党派极化',
        icon: '⚔️',
        description: '民主党与共和党斗争激烈，重要立法难以通过',
        effects: [
          { type: 'policy_speed', value: -0.5, description: '政策实施时间+50%' },
          { type: 'political_cost', value: 1.5, description: '政治点数消耗+50%' },
        ],
        isDebuff: true,
      },
      {
        id: 'debt_ceiling_crisis',
        name: '债务上限危机',
        icon: '⚠️',
        description: '国会两党每年都要就债务上限展开殊死搏斗',
        effects: [
          { type: 'rating_penalty', value: -1, description: '主权信用评级-1' },
          { type: 'market_volatility', value: 0.3, description: '市场波动+30%' },
        ],
        isDebuff: true,
      },
    ],
    
    initialStats: {
      population: 336000000,
      gdp: 29500000,
      inflation: 2.8,
      unemployment: 3.7,
      stability: 68,
      treasury: 550000,
      debt: 36000000,
    },
    
    taxRates: {
      income: 28,
      trade: 3,
      luxury: 20,
      land: 5,
    },
    
    bonuses: {
      production: 0.1,
      research: 0.25,
      stability: 0,
      populationGrowth: 0.005,
      taxEfficiency: 0.9,
    },
    
    uniqueMechanics: ['美元霸权', '美联储独立', '页岩油革命'],
    startingSituation: '通胀压力犹存，但就业市场强劲。需要在增长与物价稳定之间取得平衡。',
  },
  
  china: {
    id: 'china',
    name: '中华人民共和国',
    flag: '🇨🇳',
    region: 'asia',
    difficulty: 3,
    description: '世界第二大经济体，制造业规模全球第一。正处于产业升级和高质量发展关键期。',
    politicalSystem: '人民代表大会制度',
    
    startingDate: { year: 2026, month: 1, day: 1 },
    
    spirits: [
      {
        id: 'manufacturing_powerhouse',
        name: '世界工厂',
        icon: '🏭',
        description: '完整的工业体系和规模效应使制造业极具竞争力',
        effects: [
          { type: 'industrial_production', value: 0.3, description: '工业产出+30%' },
          { type: 'export_bonus', value: 0.2, description: '出口竞争力+20%' },
        ],
      },
      {
        id: 'state_capitalism',
        name: '社会主义市场经济',
        icon: '🏛️',
        description: '强有力的政府干预能力和产业政策引导，政令畅通',
        effects: [
          { type: 'policy_effectiveness', value: 0.4, description: '政策效果+40%' },
          { type: 'policy_speed', value: 0.5, description: '政策实施时间-50%' },
          { type: 'stability_bonus', value: 15, description: '基础稳定度+15' },
        ],
      },
      {
        id: 'population_aging',
        name: '人口老龄化',
        icon: '👴',
        description: '人口结构快速老龄化，养老金压力巨大，劳动力减少',
        effects: [
          { type: 'pension_cost', value: 0.3, description: '养老金支出+30%' },
          { type: 'labor_growth', value: -0.008, description: '劳动力年增-0.8%' },
          { type: 'healthcare_cost', value: 0.25, description: '医疗支出+25%' },
        ],
        isDebuff: true,
      },
      {
        id: 'local_government_debt',
        name: '地方政府债务',
        icon: '💸',
        description: '地方政府隐性债务规模庞大，城投平台风险累积',
        effects: [
          { type: 'fiscal_space', value: -0.35, description: '财政空间-35%' },
          { type: 'investment_efficiency', value: -0.2, description: '投资效率-20%' },
        ],
        isDebuff: true,
      },
      {
        id: 'property_crisis',
        name: '房地产调整',
        icon: '🏢',
        description: '房地产行业深度调整，恒大等房企暴雷，土地财政难以为继',
        effects: [
          { type: 'construction_output', value: -0.3, description: '建筑业产出-30%' },
          { type: 'land_revenue', value: -0.6, description: '土地出让收入-60%' },
          { type: 'consumer_confidence', value: -0.15, description: '消费信心-15%' },
        ],
        isDebuff: true,
      },
    ],
    
    initialStats: {
      population: 1410000000,
      gdp: 21800000,
      inflation: 1.2,
      unemployment: 5.2,
      stability: 75,
      treasury: 3800000,
      debt: 15000000,
    },
    
    taxRates: {
      income: 25,
      trade: 8,
      luxury: 30,
      land: 10,
    },
    
    bonuses: {
      production: 0.3,
      research: 0.15,
      stability: 0.1,
      populationGrowth: -0.001,
      taxEfficiency: 0.85,
    },
    
    uniqueMechanics: ['五年规划', '双循环战略', '新型举国体制'],
    startingSituation: '房地产行业调整和人口老龄化是主要挑战。科技自主创新任重道远。',
  },
  
  germany: {
    id: 'germany',
    name: '德意志联邦共和国',
    flag: '🇩🇪',
    region: 'europe',
    difficulty: 2,
    description: '欧洲经济引擎，高端制造业出口强国。汽车工业和精密工程享誉世界。',
    politicalSystem: '议会共和制',
    
    startingDate: { year: 2026, month: 1, day: 1 },
    
    spirits: [
      {
        id: 'engineering_excellence',
        name: '工程卓越',
        icon: '⚙️',
        description: '德国制造代表着品质和精度，在全球市场享有溢价',
        effects: [
          { type: 'manufacturing_quality', value: 0.35, description: '产品质量+35%' },
          { type: 'export_price', value: 0.2, description: '出口溢价+20%' },
        ],
      },
      {
        id: 'energiewende',
        name: '能源转型阵痛',
        icon: '⚡',
        description: '激进退煤退核导致能源成本飙升，工业竞争力受损',
        effects: [
          { type: 'green_energy', value: 0.5, description: '绿色能源增长+50%' },
          { type: 'energy_cost', value: 0.45, description: '能源成本+45%' },
          { type: 'industrial_output', value: -0.1, description: '工业产出-10%' },
        ],
        isDebuff: true,
      },
      {
        id: 'auto_industry_crisis',
        name: '汽车工业危机',
        icon: '🚗',
        description: '中国电动车冲击德国燃油车优势，转型艰难',
        effects: [
          { type: 'export_bonus', value: -0.15, description: '出口竞争力-15%' },
          { type: 'industrial_investment', value: -0.2, description: '工业投资-20%' },
        ],
        isDebuff: true,
      },
    ],
    
    initialStats: {
      population: 84000000,
      gdp: 4900000,
      inflation: 2.5,
      unemployment: 3.0,
      stability: 72,
      treasury: 450000,
      debt: 2700000,
    },
    
    taxRates: {
      income: 42,
      trade: 0,
      luxury: 19,
      land: 3,
    },
    
    bonuses: {
      production: 0.15,
      research: 0.2,
      stability: 0.05,
      populationGrowth: 0.002,
      taxEfficiency: 0.95,
    },
    
    uniqueMechanics: ['社会市场经济', '双元制教育', '欧盟单一市场'],
    startingSituation: '俄乌冲突后能源格局重塑。制造业竞争力面临地缘政治挑战。',
  },
  
  japan: {
    id: 'japan',
    name: '日本国',
    flag: '🇯🇵',
    region: 'asia',
    difficulty: 3,
    description: '世界第三大经济体，精密制造和机器人技术领先。人口老龄化问题严峻。',
    politicalSystem: '议会内阁制',
    
    startingDate: { year: 2026, month: 1, day: 1 },
    
    spirits: [
      {
        id: 'monozukuri',
        name: '造物精神',
        icon: '🔩',
        description: '精益求精的制造文化追求极致品质',
        effects: [
          { type: 'quality_control', value: 0.4, description: '质量控制+40%' },
          { type: 'productivity', value: 0.15, description: '生产率+15%' },
        ],
      },
      {
        id: 'deflation_trap',
        name: '通货紧缩陷阱',
        icon: '📉',
        description: '失去的三十年留下的通缩顽疾，物价工资长期停滞',
        effects: [
          { type: 'inflation_base', value: -0.015, description: '基础通胀-1.5%' },
          { type: 'wage_growth', value: -0.01, description: '工资增长-1%' },
          { type: 'domestic_demand', value: -0.12, description: '内需-12%' },
        ],
        isDebuff: true,
      },
      {
        id: 'sovereign_debt_timebomb',
        name: '国债定时炸弹',
        icon: '💣',
        description: '政府债务GDP占比260%，发达国家中最高',
        effects: [
          { type: 'interest_payment', value: 0.25, description: '利息支出+25%' },
          { type: 'fiscal_flexibility', value: -0.4, description: '财政灵活性-40%' },
        ],
        isDebuff: true,
      },
      {
        id: 'super_aging',
        name: '超少子高龄化',
        icon: '👶',
        description: '出生率全球最低，人口每年减少几十万',
        effects: [
          { type: 'population_growth', value: -0.006, description: '人口年减0.6%' },
          { type: 'pension_burden', value: 0.35, description: '养老金负担+35%' },
        ],
        isDebuff: true,
      },
    ],
    
    initialStats: {
      population: 125000000,
      gdp: 4200000,
      inflation: 2.2,
      unemployment: 2.5,
      stability: 65,
      treasury: 1200000,
      debt: 12500000,
    },
    
    taxRates: {
      income: 45,
      trade: 5,
      luxury: 10,
      land: 8,
    },
    
    bonuses: {
      production: 0.1,
      research: 0.2,
      stability: 0,
      populationGrowth: -0.005,
      taxEfficiency: 0.92,
    },
    
    uniqueMechanics: ['安倍经济学遗产', '终身雇佣制', '机器人革命'],
    startingSituation: '超宽松货币政策面临转向。人口减少和国债高企是长期隐忧。',
  },
  
  uk: {
    id: 'uk',
    name: '大不列颠及北爱尔兰联合王国',
    flag: '🇬🇧',
    region: 'europe',
    difficulty: 3,
    description: '全球金融中心，服务业发达。脱欧后寻求重新定位全球角色。',
    
    startingDate: { year: 2026, month: 1, day: 1 },
    
    spirits: [
      {
        id: 'global_financial_hub',
        name: '全球金融中心',
        icon: '🏦',
        description: '伦敦城是世界顶级金融中心，资金流动便利',
        effects: [
          { type: 'financial_efficiency', value: 0.4, description: '金融效率+40%' },
          { type: 'foreign_investment', value: 0.25, description: '外资流入+25%' },
        ],
      },
      {
        id: 'brexit_dividend',
        name: '脱欧红利',
        icon: '🌊',
        description: '监管自主权带来政策灵活性，但贸易成本上升',
        effects: [
          { type: 'regulatory_flexibility', value: 0.3, description: '监管灵活度+30%' },
          { type: 'trade_friction', value: -0.1, description: '贸易摩擦+10%' },
        ],
      },
    ],
    
    initialStats: {
      population: 67000000,
      gdp: 3500000,
      inflation: 3.1,
      unemployment: 4.2,
      stability: 60,
      treasury: 200000,
      debt: 3100000,
    },
    
    taxRates: {
      income: 40,
      trade: 4,
      luxury: 20,
      land: 5,
    },
    
    bonuses: {
      production: 0,
      research: 0.15,
      stability: -0.05,
      populationGrowth: 0.003,
      taxEfficiency: 0.88,
    },
    
    uniqueMechanics: ['伦敦金融城', '英联邦网络', '威斯敏斯特体系'],
    startingSituation: '通胀粘性和劳动力短缺制约增长。北爱尔兰问题仍存不确定性。',
  },
  
  russia: {
    id: 'russia',
    name: '俄罗斯联邦',
    flag: '🇷🇺',
    region: 'europe',
    difficulty: 5,
    description: '资源超级大国，能源和军事力量雄厚。但经济结构单一，制裁环境严峻。',
    
    startingDate: { year: 2026, month: 1, day: 1 },
    
    spirits: [
      {
        id: 'resource_superpower',
        name: '资源超级大国',
        icon: '🛢️',
        description: '丰富的油气和矿产资源带来巨额外汇收入',
        effects: [
          { type: 'resource_revenue', value: 0.5, description: '资源收入+50%' },
          { type: 'energy_independence', value: 1, description: '完全能源独立' },
        ],
      },
      {
        id: 'sanctions_economy',
        name: '制裁经济',
        icon: '🔒',
        description: '国际制裁迫使转向自给自足和东方市场',
        effects: [
          { type: 'import_substitution', value: 0.35, description: '进口替代+35%' },
          { type: 'tech_access', value: -0.25, description: '技术获取-25%' },
        ],
      },
    ],
    
    initialStats: {
      population: 144000000,
      gdp: 2300000,
      inflation: 7.5,
      unemployment: 3.0,
      stability: 70,
      treasury: 180000,
      debt: 350000,
    },
    
    taxRates: {
      income: 13,
      trade: 10,
      luxury: 18,
      land: 2,
    },
    
    bonuses: {
      production: -0.1,
      research: -0.15,
      stability: 0.05,
      populationGrowth: -0.002,
      taxEfficiency: 0.8,
    },
    
    uniqueMechanics: ['战时经济', '能源武器', '转向东方'],
    startingSituation: '俄乌冲突持续。需要在制裁环境下维持经济稳定和军事生产。',
  },
  
  india: {
    id: 'india',
    name: '印度共和国',
    flag: '🇮🇳',
    region: 'asia',
    difficulty: 4,
    description: '世界人口第一大国，增长最快的主要经济体。人口红利潜力巨大。',
    
    startingDate: { year: 2026, month: 1, day: 1 },
    
    spirits: [
      {
        id: 'demographic_dividend',
        name: '人口红利',
        icon: '👥',
        description: '世界最年轻的人口结构带来巨大增长潜力',
        effects: [
          { type: 'labor_force_growth', value: 0.02, description: '劳动力年增2%' },
          { type: 'domestic_market', value: 0.2, description: '国内市场+20%' },
        ],
      },
      {
        id: 'digital_india',
        name: '数字印度',
        icon: '📱',
        description: '全球最大的数字支付系统和互联网用户群',
        effects: [
          { type: 'digital_economy', value: 0.35, description: '数字经济+35%' },
          { type: 'formalization', value: 0.15, description: '经济正规化+15%' },
        ],
      },
    ],
    
    initialStats: {
      population: 1450000000,
      gdp: 4100000,
      inflation: 5.1,
      unemployment: 7.2,
      stability: 65,
      treasury: 150000,
      debt: 2100000,
    },
    
    taxRates: {
      income: 30,
      trade: 15,
      luxury: 28,
      land: 3,
    },
    
    bonuses: {
      production: 0.05,
      research: 0.1,
      stability: -0.05,
      populationGrowth: 0.008,
      taxEfficiency: 0.7,
    },
    
    uniqueMechanics: ['印度制造', '统一市场', '民主人口红利'],
    startingSituation: '基础设施不足和不平等制约发展。创造足够就业是首要挑战。',
  },
  
  france: {
    id: 'france',
    name: '法兰西共和国',
    flag: '🇫🇷',
    region: 'europe',
    difficulty: 3,
    description: '欧洲核心大国，拥有完整的工业体系和强大的国家干预传统。',
    politicalSystem: '半总统制',
    
    startingDate: { year: 2026, month: 1, day: 1 },
    
    spirits: [
      {
        id: 'dirigisme',
        name: '国家干预主义',
        icon: '🎯',
        description: '强大的国家指导传统，战略性产业政策有效',
        effects: [
          { type: 'state_capacity', value: 0.3, description: '国家能力+30%' },
          { type: 'industrial_policy', value: 0.25, description: '产业政策效果+25%' },
        ],
      },
      {
        id: 'nuclear_energy',
        name: '核能强国',
        icon: '☢️',
        description: '70%电力来自核电，能源独立且低碳',
        effects: [
          { type: 'energy_security', value: 0.7, description: '能源安全+70%' },
          { type: 'energy_cost', value: -0.15, description: '能源成本-15%' },
        ],
      },
      {
        id: 'general_strike_culture',
        name: '全国大罢工传统',
        icon: '✊',
        description: '任何改革都会引发全国性大罢工，社会动荡',
        effects: [
          { type: 'policy_cost', value: 2, description: '政治成本+100%' },
          { type: 'strike_frequency', value: 0.5, description: '罢工概率+50%' },
          { type: 'stability_penalty', value: -10, description: '稳定度-10' },
        ],
        isDebuff: true,
      },
      {
        id: 'welfare_state_trap',
        name: '高福利陷阱',
        icon: '🏥',
        description: '从摇篮到坟墓的福利制度造成财政不可持续',
        effects: [
          { type: 'social_spending', value: 0.4, description: '社会支出+40%' },
          { type: 'labor_market_rigidity', value: 0.35, description: '劳动力市场僵化+35%' },
        ],
        isDebuff: true,
      },
    ],
    
    initialStats: {
      population: 68000000,
      gdp: 3200000,
      inflation: 2.9,
      unemployment: 7.3,
      stability: 55,
      treasury: 160000,
      debt: 3600000,
    },
    
    taxRates: {
      income: 45,
      trade: 0,
      luxury: 20,
      land: 4,
    },
    
    bonuses: {
      production: 0.05,
      research: 0.15,
      stability: -0.1,
      populationGrowth: 0.003,
      taxEfficiency: 0.85,
    },
    
    uniqueMechanics: ['高福利制度', '戴高乐主义', '欧洲主权倡导者'],
    startingSituation: '养老金改革引发社会动荡。维持竞争力与社会公平的平衡至关重要。',
  },
  
  brazil: {
    id: 'brazil',
    name: '巴西联邦共和国',
    flag: '🇧🇷',
    region: 'americas',
    difficulty: 4,
    description: '南美第一大国，自然资源极为丰富。中等收入陷阱待突破。',
    
    startingDate: { year: 2026, month: 1, day: 1 },
    
    spirits: [
      {
        id: 'agriculture_powerhouse',
        name: '农业超级大国',
        icon: '🌾',
        description: '世界粮仓，多种农产品出口全球第一',
        effects: [
          { type: 'agricultural_output', value: 0.45, description: '农业产出+45%' },
          { type: 'commodity_exports', value: 0.35, description: '大宗商品出口+35%' },
        ],
      },
      {
        id: 'commodity_cycle',
        name: '大宗商品周期',
        icon: '📈',
        description: '经济高度依赖大宗商品价格，波动性大',
        effects: [
          { type: 'price_volatility', value: 0.4, description: '价格波动率+40%' },
          { type: 'external_vulnerability', value: 0.2, description: '外部脆弱性+20%' },
        ],
      },
    ],
    
    initialStats: {
      population: 216000000,
      gdp: 2200000,
      inflation: 4.8,
      unemployment: 7.8,
      stability: 55,
      treasury: 350000,
      debt: 1800000,
    },
    
    taxRates: {
      income: 27.5,
      trade: 12,
      luxury: 33,
      land: 2,
    },
    
    bonuses: {
      production: -0.05,
      research: -0.05,
      stability: -0.1,
      populationGrowth: 0.004,
      taxEfficiency: 0.65,
    },
    
    uniqueMechanics: ['再工业化', '拉美一体化', '亚马逊守护者'],
    startingSituation: '财政整顿与社会支出需平衡。通胀和债务压力持续存在。',
  },
  
  southkorea: {
    id: 'southkorea',
    name: '大韩民国',
    flag: '🇰🇷',
    region: 'asia',
    difficulty: 3,
    description: '半导体和电子工业强国。从最不发达国家到发达国家的成功典范。',
    
    startingDate: { year: 2026, month: 1, day: 1 },
    
    spirits: [
      {
        id: 'semiconductor_kingdom',
        name: '半导体王国',
        icon: '💎',
        description: '储存芯片全球市场占有率超过70%',
        effects: [
          { type: 'high_tech_premium', value: 0.5, description: '高科技溢价+50%' },
          { type: 'tech_leadership', value: 0.35, description: '技术领先+35%' },
        ],
      },
      {
        id: 'chaebol_economy',
        name: '财阀经济',
        icon: '🏢',
        description: '大型财阀主导经济，规模效益显著但创新活力受限',
        effects: [
          { type: 'scale_economy', value: 0.3, description: '规模经济+30%' },
          { type: 'startup_challenge', value: -0.15, description: '创业难度+15%' },
        ],
      },
    ],
    
    initialStats: {
      population: 51700000,
      gdp: 2000000,
      inflation: 2.6,
      unemployment: 2.9,
      stability: 62,
      treasury: 450000,
      debt: 1100000,
    },
    
    taxRates: {
      income: 45,
      trade: 8,
      luxury: 20,
      land: 6,
    },
    
    bonuses: {
      production: 0.15,
      research: 0.3,
      stability: -0.05,
      populationGrowth: -0.003,
      taxEfficiency: 0.9,
    },
    
    uniqueMechanics: ['出口导向型', '汉江奇迹续集', '半导体供应链核心'],
    startingSituation: '地缘风险和半导体周期是主要挑战。出生率全球最低令人担忧。',
  },
}

export function getCountry(id: string): Country {
  return COUNTRIES[id] || COUNTRIES.usa
}

export function getAllCountries(): Country[] {
  return Object.values(COUNTRIES)
}
