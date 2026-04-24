export const USA_CORE_SYSTEM_DESIGN = {
  meta: {
    country: '美利坚合众国',
    flag: '🇺🇸',
    startDate: { year: 2019, month: 1, day: 20 },
    difficultyPresets: ['简单', '困难', '地狱'],
    mathematicalFoundations: [
      'IS-LM 宏观经济模型',
      'AS-AD 总供需模型',
      '索洛经济增长模型',
      '菲利普斯曲线',
      '公共选择理论',
      '空间政治学模型',
    ],
  },

  coreMathematicalModels: {
    economicGrowth: {
      name: '索洛增长模型',
      formula: 'Y(t) = K(t)^α * (A(t)L(t))^(1-α)',
      parameters: {
        alpha: 0.33,
        depreciation: 0.05,
        savingsRate: 0.17,
        populationGrowth: 0.008,
        techProgress: 0.015,
      },
    },
    phillipsCurve: {
      name: '修正菲利普斯曲线',
      formula: 'π = π^e - α(u - u_n) + v',
      parameters: {
        naturalUnemployment: 0.045,
        inflationSensitivity: 0.5,
      },
    },
    isLmModel: {
      name: 'IS-LM模型',
      goodsMarket: 'Y = C(Y-T) + I(r) + G + NX',
      moneyMarket: 'M/P = L(r, Y)',
    },
    politicalSupport: {
      name: '空间投票模型',
      formula: 'S = Σ w_i * exp(-λd_i²)',
      parameters: {
        lambda: 2.0,
        issueWeights: { economy: 0.4, culture: 0.3, security: 0.3 },
      },
    },
  },

  menuArchitecture: {
    leftSidebar: {
      politics: {
        id: 'politics',
        name: '政治',
        icon: '🏛️',
        color: '#9C27B0',
        tabs: [
          { id: 'focus_tree', name: '国策树', centerPanel: 'focus_tree' },
          { id: 'government', name: '政府', centerPanel: 'cabinet' },
          { id: 'congress', name: '国会', centerPanel: 'congress' },
          { id: 'elections', name: '选举', centerPanel: 'electoral_map' },
          { id: 'laws', name: '法律', centerPanel: 'legislation' },
        ],
      },
      economy: {
        id: 'economy',
        name: '经济',
        icon: '💰',
        color: '#2196F3',
        tabs: [
          { id: 'budget', name: '预算', centerPanel: 'budget_chart' },
          { id: 'industry', name: '工业', centerPanel: 'industry_map' },
          { id: 'federal_reserve', name: '美联储', centerPanel: 'monetary_policy' },
          { id: 'trade', name: '贸易', centerPanel: 'trade_network' },
        ],
      },
      diplomacy: {
        id: 'diplomacy',
        name: '外交',
        icon: '🌐',
        color: '#4CAF50',
        tabs: [
          { id: 'relations', name: '国际关系', centerPanel: 'world_map' },
          { id: 'alliances', name: '同盟', centerPanel: 'alliance_map' },
          { id: 'sanctions', name: '制裁', centerPanel: 'sanctions' },
          { id: 'treaties', name: '条约', centerPanel: 'treaties' },
        ],
      },
      military: {
        id: 'military',
        name: '军事',
        icon: '⚔️',
        color: '#F44336',
        tabs: [
          { id: 'forces', name: '武装力量', centerPanel: 'military_map' },
          { id: 'doctrine', name: '军事学说', centerPanel: 'doctrine' },
          { id: 'production', name: '军工生产', centerPanel: 'production' },
          { id: 'deployments', name: '全球部署', centerPanel: 'deploy_map' },
        ],
      },
      research: {
        id: 'research',
        name: '科技',
        icon: '🔬',
        color: '#FF9800',
        tabs: [
          { id: 'tech_tree', name: '科技树', centerPanel: 'tech_tree' },
          { id: 'queue', name: '研究队列', centerPanel: 'research_queue' },
          { id: 'projects', name: '重大项目', centerPanel: 'mega_projects' },
        ],
      },
      society: {
        id: 'society',
        name: '社会',
        icon: '👥',
        color: '#795548',
        tabs: [
          { id: 'population', name: '人口', centerPanel: 'demographics' },
          { id: 'culture', name: '文化', centerPanel: 'culture_war' },
          { id: 'welfare', name: '福利', centerPanel: 'welfare' },
          { id: 'justice', name: '司法', centerPanel: 'justice' },
        ],
      },
    },
  },

  centerPanelModes: {
    default: 'world_map',
    modes: [
      { id: 'world_map', name: '世界地图', type: 'geographic' },
      { id: 'focus_tree', name: '国策树', type: 'tree_graph' },
      { id: 'tech_tree', name: '科技树', type: 'tree_graph' },
      { id: 'electoral_map', name: '选举地图', type: 'geographic' },
      { id: 'industry_map', name: '工业分布', type: 'heatmap' },
      { id: 'budget_chart', name: '预算图表', type: 'data_viz' },
      { id: 'trade_network', name: '贸易网络', type: 'graph' },
      { id: 'congress', name: '国会', type: 'interface' },
      { id: 'military_map', name: '军事部署', type: 'geographic' },
    ],
  },

  rightPanelWidgets: {
    collapsible: true,
    widgets: [
      {
        id: 'active_focus',
        name: '进行中国策',
        collapsible: true,
        expanded: true,
        maxItems: 1,
        showProgress: true,
        showTimer: true,
      },
      {
        id: 'research_queue',
        name: '研究队列',
        collapsible: true,
        expanded: true,
        maxItems: 3,
        showProgress: true,
      },
      {
        id: 'pending_events',
        name: '待处理事件',
        collapsible: true,
        expanded: true,
        maxItems: 5,
        badge: true,
      },
      {
        id: 'election_countdown',
        name: '选举倒计时',
        collapsible: true,
        expanded: false,
        showTimer: true,
      },
      {
        id: 'notifications',
        name: '通知',
        collapsible: true,
        expanded: false,
        maxItems: 10,
      },
    ],
  },

  topBarResources: {
    alwaysVisible: [
      { id: 'treasury', name: '国库', format: '${value}T', icon: '💰' },
      { id: 'political_capital', name: '政治点数', format: '{value}', icon: '🎯' },
      { id: 'stability', name: '稳定度', format: '{value}%', icon: '⚖️' },
      { id: 'approval', name: '支持率', format: '{value}%', icon: '👍' },
    ],
    conditional: [
      { id: 'war_support', name: '战争支持度', format: '{value}%', condition: 'at_war' },
      { id: 'manpower', name: '人力', format: '{value}M', condition: 'at_war' },
    ],
  },

  usa2019InitialValues: {
    date: { year: 2019, month: 1, day: 20 },
    resources: {
      treasury: 21.7,
      gdp: 21.4,
      debt: 22.7,
      debtToGdp: 106,
      inflation: 1.8,
      unemployment: 4.0,
      gdpGrowth: 2.9,
      politicalCapital: 100,
      stability: 76,
      approval: 42,
      federalFundsRate: 2.5,
      researchPoints: 12,
      warSupport: 65,
    },
    congress: {
      house: { republicans: 199, democrats: 235 },
      senate: { republicans: 53, democrats: 45, independents: 2 },
      majorityThreshold: 218,
      supermajorityThreshold: 67,
    },
    election: {
      nextPresidential: { year: 2020, month: 11, day: 3 },
      daysRemaining: 653,
    },
    activeFocuses: [
      { id: 'build_the_wall', name: '建造边境墙', progress: 0.35, daysRemaining: 45 },
    ],
    research: [
      { id: '5g_network', name: '5G网络部署', progress: 0.68 },
      { id: 'ai_research', name: '人工智能研究', progress: 0.23 },
      { id: 'quantum_computing', name: '量子计算', progress: 0.08 },
    ],
    pendingEvents: [
      { id: 'covid_warning', name: '武汉出现不明肺炎', urgency: 'low', daysAgo: 0 },
    ],
  },

  difficultyBalancing: {
    easy: {
      playerBonus: 1.5,
      aiPenalty: 0.7,
      eventNegativeModifier: 0.5,
      politicalCapitalGain: 1.5,
      inflationDamage: 0.5,
      electionAdvantage: 15,
    },
    hard: {
      playerBonus: 1.0,
      aiPenalty: 1.0,
      eventNegativeModifier: 1.0,
      politicalCapitalGain: 1.0,
      inflationDamage: 1.0,
      electionAdvantage: 0,
    },
    hell: {
      playerBonus: 0.7,
      aiPenalty: 1.3,
      eventNegativeModifier: 1.8,
      politicalCapitalGain: 0.6,
      inflationDamage: 2.0,
      electionAdvantage: -10,
      randomDisasters: true,
    },
  },
}

export const MATHEMATICAL_ENGINE = {
  computeDaily(state: any) {
    state = this.computeISLM(state)
    state = this.computePhillipsCurve(state)
    state = this.computeSolowGrowth(state)
    state = this.computePoliticalSupport(state)
    state = this.computeCongressVoting(state)
    return state
  },

  computeISLM(state: any) {
    const { governmentSpending, taxRate, moneySupply, interestRate } = state.economy
    const Y_multiplier = 1 / (1 - 0.75 * (1 - taxRate))
    const IS = governmentSpending * Y_multiplier
    const LM = moneySupply / interestRate
    state.economy.equilibriumGDP = (IS + LM) / 2
    return state
  },

  computePhillipsCurve(state: any) {
    const { unemployment, inflationExpectation, supplyShock } = state.economy
    const naturalUnemployment = 0.045
    const alpha = 0.5
    state.economy.inflation = 
      inflationExpectation - alpha * (unemployment - naturalUnemployment) + supplyShock
    return state
  },

  computeSolowGrowth(state: any) {
    const { capitalStock, laborForce, totalFactorProductivity } = state.economy
    const alpha = 0.33
    state.economy.gdp = 
      Math.pow(capitalStock, alpha) * 
      Math.pow(totalFactorProductivity * laborForce, 1 - alpha)
    return state
  },

  computePoliticalSupport(state: any) {
    const economyWeight = 0.4
    const issues = {
      economy: Math.max(0, 100 - state.economy.inflation * 5 - state.economy.unemployment * 3),
      culture: state.social.cultureApproval,
      security: state.military.securityApproval,
    }
    state.politics.approval = 
      economyWeight * issues.economy +
      0.3 * issues.culture +
      0.3 * issues.security
    return state
  },

  computeCongressVoting(state: any) {
    const { partyLineDistance, presidentialApproval, interestGroupPressure } = state.congress
    const partyUnity = 0.85
    const crossoverVotes = presidentialApproval > 50 ? 
      Math.floor((presidentialApproval - 50) / 10) : 0
    state.congress.billChance = partyUnity + crossoverVotes / 535
    return state
  },
}

export const USA_GUIDELINES = `
=============================================================
🇺🇸 美利坚合众国 完整系统设计规范
=============================================================

一、系统分层架构

   表现层                     逻辑层                     数据层
┌──────────────┐      ┌─────────────────────┐      ┌───────────────┐
│ HOI4 UI布局  │◄────►│ 数学模型引擎        │◄────►│ 美国数据库    │
│ - 6大菜单    │      │ - IS-LM 宏观        │      │ - 国策树      │
│ - 中心视图   │      │ - 菲利普斯曲线      │      │ - 科技树      │
│ - 右侧卡片   │      │ - 索洛增长          │      │ - 历史事件    │
└──────────────┘      │ - 空间投票模型      │      │ - 人物数据    │
                      └─────────────────────┘      └───────────────┘

二、数学引擎核心公式

1. GDP = 资本^0.33 × (技术×劳动)^0.67       索洛模型
2. 通胀 = 预期通胀 - 0.5×(失业-4.5%) + 冲击  菲利普斯曲线
3. 支持率 = 0.4×经济 + 0.3×文化 + 0.3×安全   空间投票模型

三、国会投票算法

- 政党团结度: 85%
- 跨党投票: 每超50%支持率 + 2票
- 游说效果: 每100万美元 + 1票
- 媒体影响: 正面报道 + 5%通过率

四、难度平衡性

   系数        简单      困难      地狱
   ─────────────────────────────────────
   政治点      x1.5      x1.0      x0.6
   负面事件     50%      100%      180%
   通胀伤害     50%      100%      200%
   选举优势    +15%       0%       -10%
   AI强度       70%      100%      130%

=============================================================
`
