import type { WorldEvent } from './vic3-types'

export const WORLD_EVENTS_EXPANSION: WorldEvent[] = [
  // ========================================
  // 【第一部分】经济周期事件 (25个)
  // ========================================
  
  {
    id: 'mild_recession',
    name: '温和衰退预警',
    icon: '📉',
    severity: 'major',
    probability: 0.18,
    cooldownDays: 120,
    triggerConditions: {
      minDay: 90,
    },
    effects: [
      { type: 'unemployment', value: 2, duration: 90 },
      { type: 'price_shock', target: 'iron', value: -0.15, duration: 60 },
    ],
    options: [
      { text: '降息50基点，注入流动性', effects: [{ type: 'inflation', value: 2 }, { type: 'treasury', value: -8000 }], aiSelectionWeight: 55 },
      { text: '财政刺激：基建投资', effects: [{ type: 'debt', value: 15000 }, { type: 'stability', value: 3 }], aiSelectionWeight: 35 },
      { text: '自由市场，不干预', effects: [{ type: 'unemployment', value: 3 }, { type: 'stability', value: -5 }], aiSelectionWeight: 10 },
    ],
  },

  {
    id: 'corporate_debt_default',
    name: '大型企业债务违约',
    icon: '🏭',
    severity: 'major',
    probability: 0.12,
    cooldownDays: 150,
    triggerConditions: {
      minDay: 60,
      maxTreasury: 50000,
    },
    effects: [
      { type: 'instability', value: -6, duration: 60 },
      { type: 'unemployment', value: 2, duration: 60 },
    ],
    options: [
      { text: '政府牵头债转股', effects: [{ type: 'treasury', value: -15000 }, { type: 'stability', value: 5 }], aiSelectionWeight: 40 },
      { text: '银行坏账剥离', effects: [{ type: 'debt', value: 20000 }, { type: 'pop_approval', value: -8 }], aiSelectionWeight: 35 },
      { text: '破产清算', effects: [{ type: 'unemployment', value: 4 }, { type: 'pop_approval', value: -5 }], aiSelectionWeight: 25 },
    ],
  },

  {
    id: 'housing_market_crash',
    name: '房地产市场崩盘',
    icon: '🏠',
    severity: 'catastrophic',
    probability: 0.06,
    cooldownDays: 500,
    triggerConditions: {
      minDay: 180,
      minInflation: 4,
    },
    effects: [
      { type: 'instability', value: -18, duration: 180 },
      { type: 'unemployment', value: 8, duration: 120 },
      { type: 'treasury', value: -40000, duration: 1 },
    ],
    options: [
      { text: '国家队入市托底', effects: [{ type: 'treasury', value: -60000 }, { type: 'stability', value: 10 }], aiSelectionWeight: 45 },
      { text: '房贷延期+降息', effects: [{ type: 'debt', value: 35000 }, { type: 'pop_approval', value: 8 }], aiSelectionWeight: 35 },
      { text: '刺破泡沫，推倒重来', effects: [{ type: 'stability', value: -20 }, { type: 'pop_approval', value: -15 }, { type: 'inflation', value: -5 }], aiSelectionWeight: 20 },
    ],
  },

  {
    id: 'yield_curve_inversion',
    name: '收益率曲线倒挂',
    icon: '📊',
    severity: 'major',
    probability: 0.15,
    cooldownDays: 180,
    triggerConditions: {
      minDay: 120,
      dayOfYear: [30, 90, 150, 210, 270, 330],
    },
    effects: [],
    options: [
      { text: '预防性降息', effects: [{ type: 'inflation', value: 3 }, { type: 'stability', value: 2 }], aiSelectionWeight: 50 },
      { text: '发布信心喊话', effects: [{ type: 'treasury', value: -2000 }, { type: 'bureaucracy', value: 3 }], aiSelectionWeight: 35 },
      { text: '按兵不动', effects: [{ type: 'stability', value: -3 }], aiSelectionWeight: 15 },
    ],
  },

  {
    id: 'sovereign_rating_downgrade',
    name: '主权信用评级下调',
    icon: '📉',
    severity: 'major',
    probability: 0.10,
    cooldownDays: 200,
    triggerConditions: {
      minDay: 90,
      minDebtToGdp: 120,
    },
    effects: [
      { type: 'treasury', value: -15000, duration: 1 },
      { type: 'instability', value: -8, duration: 90 },
    ],
    options: [
      { text: '财政紧缩，开源节流', effects: [{ type: 'pop_approval', value: -10 }, { type: 'bureaucracy', value: 8 }], aiSelectionWeight: 40 },
      { text: '怒批评级机构政治化', effects: [{ type: 'pop_approval', value: 5 }, { type: 'stability', value: -3 }], aiSelectionWeight: 35 },
      { text: '发行超长期国债', effects: [{ type: 'debt', value: 20000 }, { type: 'treasury', value: 8000 }], aiSelectionWeight: 25 },
    ],
  },

  {
    id: 'capital_flight_emergency',
    name: '大规模资本外逃',
    icon: '💸',
    severity: 'catastrophic',
    probability: 0.05,
    cooldownDays: 365,
    triggerConditions: {
      minDay: 120,
      maxStability: 50,
      minInflation: 6,
    },
    effects: [
      { type: 'treasury', value: -35000, duration: 1 },
      { type: 'inflation', value: 8, duration: 60 },
      { type: 'instability', value: -12, duration: 90 },
    ],
    options: [
      { text: '强制结售汇+资本管制', effects: [{ type: 'bureaucracy', value: 15 }, { type: 'pop_approval', value: -10 }], aiSelectionWeight: 40 },
      { text: '一次性大幅贬值释放压力', effects: [{ type: 'inflation', value: 15 }, { type: 'stability', value: -8 }], aiSelectionWeight: 30 },
      { text: '动用外储死扛汇率', effects: [{ type: 'treasury', value: -50000 }, { type: 'stability', value: 5 }], aiSelectionWeight: 30 },
    ],
  },

  {
    id: 'deflation_spiral_warning',
    name: '通缩螺旋风险',
    icon: '🥶',
    severity: 'major',
    probability: 0.12,
    cooldownDays: 150,
    triggerConditions: {
      minDay: 60,
      maxInflation: 0,
    },
    effects: [
      { type: 'unemployment', value: 3, duration: 90 },
    ],
    options: [
      { text: '直升机撒钱', effects: [{ type: 'inflation', value: 5 }, { type: 'treasury', value: -25000 }], aiSelectionWeight: 45 },
      { text: '扩大财政赤字', effects: [{ type: 'debt', value: 30000 }, { type: 'inflation', value: 2 }], aiSelectionWeight: 35 },
      { text: '结构性改革阵痛', effects: [{ type: 'unemployment', value: 5 }, { type: 'stability', value: -8 }], aiSelectionWeight: 20 },
    ],
  },

  {
    id: 'shadow_banking_run',
    name: '影子银行挤兑',
    icon: '🏦',
    severity: 'major',
    probability: 0.08,
    cooldownDays: 200,
    triggerConditions: {
      minDay: 100,
      maxStability: 60,
    },
    effects: [
      { type: 'instability', value: -10, duration: 90 },
      { type: 'treasury', value: -20000, duration: 1 },
    ],
    options: [
      { text: '央行流动性兜底', effects: [{ type: 'treasury', value: -30000 }, { type: 'stability', value: 8 }], aiSelectionWeight: 50 },
      { text: '打破刚兑，风险自担', effects: [{ type: 'stability', value: -12 }, { type: 'pop_approval', value: -12 }], aiSelectionWeight: 25 },
      { text: '公安介入追赃', effects: [{ type: 'pop_approval', value: 3 }, { type: 'bureaucracy', value: -8 }], aiSelectionWeight: 25 },
    ],
  },

  {
    id: 'stock_market_crash_20p',
    name: '股灾2.0：大盘暴跌20%',
    icon: '💥',
    severity: 'major',
    probability: 0.09,
    cooldownDays: 300,
    triggerConditions: {
      minDay: 150,
      dayOfYear: [60, 120, 180, 240, 300, 360],
    },
    effects: [
      { type: 'instability', value: -8, duration: 60 },
      { type: 'pop_approval', value: -5, duration: 45 },
    ],
    options: [
      { text: '暂停交易+国家队救市', effects: [{ type: 'treasury', value: -25000 }, { type: 'stability', value: 6 }], aiSelectionWeight: 50 },
      { text: '限制做空+提高保证金', effects: [{ type: 'bureaucracy', value: 5 }, { type: 'stability', value: 3 }], aiSelectionWeight: 30 },
      { text: '市场自然寻底', effects: [{ type: 'stability', value: -8 }, { type: 'pop_approval', value: -10 }], aiSelectionWeight: 20 },
    ],
  },

  {
    id: 'pension_fund_crisis',
    name: '养老金缺口危机',
    icon: '👴',
    severity: 'catastrophic',
    probability: 0.06,
    cooldownDays: 400,
    triggerConditions: {
      minDay: 200,
      requiredSpirit: 'population_aging',
    },
    effects: [
      { type: 'instability', value: -15, duration: 120 },
      { type: 'pop_approval', value: -12, duration: 90 },
    ],
    options: [
      { text: '延迟退休5年', effects: [{ type: 'pop_approval', value: -20 }, { type: 'treasury', value: 15000 }], aiSelectionWeight: 30 },
      { text: '划转国有资产充实', effects: [{ type: 'treasury', value: -25000 }, { type: 'pop_approval', value: 8 }], aiSelectionWeight: 45 },
      { text: '国资入市增值', effects: [{ type: 'treasury', value: -10000 }, { type: 'bureaucracy', value: 10 }], aiSelectionWeight: 25 },
    ],
  },

  // ========================================
  // 【第二部分】科技产业革命 (25个)
  // ========================================

  {
    id: 'ai_gpt_revolution',
    name: 'AGI技术重大突破',
    icon: '🤖',
    severity: 'positive',
    probability: 0.12,
    cooldownDays: 300,
    triggerConditions: {
      minDay: 100,
    },
    effects: [
      { type: 'supply_shock', target: 'tools', value: 0.25, duration: 180 },
    ],
    options: [
      { text: '举国体制押注AGI', effects: [{ type: 'treasury', value: -35000 }, { type: 'bureaucracy', value: 8 }], aiSelectionWeight: 40 },
      { text: '监管沙盒审慎推进', effects: [{ type: 'treasury', value: -12000 }, { type: 'stability', value: 5 }], aiSelectionWeight: 40 },
      { text: '伦理优先暂缓商用', effects: [{ type: 'pop_approval', value: 6 }, { type: 'bureaucracy', value: -5 }], aiSelectionWeight: 20 },
    ],
  },

  {
    id: 'semiconductor_export_control',
    name: '芯片出口管制升级',
    icon: '💻',
    severity: 'major',
    probability: 0.10,
    cooldownDays: 200,
    triggerConditions: {
      minDay: 80,
    },
    effects: [
      { type: 'supply_shock', target: 'tools', value: -0.20, duration: 120 },
      { type: 'price_shock', target: 'tools', value: 0.40, duration: 120 },
    ],
    options: [
      { text: '芯片国产化大基金', effects: [{ type: 'treasury', value: -40000 }, { type: 'bureaucracy', value: 10 }], aiSelectionWeight: 50 },
      { text: '反制：限制稀土出口', effects: [{ type: 'treasury', value: 8000 }, { type: 'stability', value: -5 }], aiSelectionWeight: 30 },
      { text: '多边磋商寻求妥协', effects: [{ type: 'treasury', value: -5000 }, { type: 'bureaucracy', value: -5 }], aiSelectionWeight: 20 },
    ],
  },

  {
    id: 'ev_price_war',
    name: '新能源汽车价格战',
    icon: '🚗',
    severity: 'major',
    probability: 0.15,
    cooldownDays: 150,
    triggerConditions: {
      minDay: 60,
    },
    effects: [
      { type: 'price_shock', target: 'iron', value: -0.10, duration: 90 },
    ],
    options: [
      { text: '政府采购+下乡补贴', effects: [{ type: 'treasury', value: -18000 }, { type: 'pop_approval', value: 5 }], aiSelectionWeight: 50 },
      { text: '行业协会协调自律', effects: [{ type: 'bureaucracy', value: 5 }, { type: 'treasury', value: 3000 }], aiSelectionWeight: 30 },
      { text: '市场优胜劣汰', effects: [{ type: 'unemployment', value: 2 }, { type: 'bureaucracy', value: -3 }], aiSelectionWeight: 20 },
    ],
  },

  {
    id: 'fusion_energy_breakthrough',
    name: '可控核聚变点火成功',
    icon: '⚛️',
    severity: 'positive',
    probability: 0.03,
    cooldownDays: 730,
    triggerConditions: {
      minDay: 365,
    },
    effects: [
      { type: 'price_shock', target: 'coal', value: -0.30, duration: 365 },
    ],
    options: [
      { text: '举全国之力商业化', effects: [{ type: 'treasury', value: -60000 }, { type: 'bureaucracy', value: 15 }], aiSelectionWeight: 45 },
      { text: '国际合作ITER路线', effects: [{ type: 'treasury', value: -20000 }, { type: 'stability', value: 8 }], aiSelectionWeight: 35 },
      { text: '民营技术路线赛马', effects: [{ type: 'treasury', value: -10000 }, { type: 'bureaucracy', value: -8 }], aiSelectionWeight: 20 },
    ],
  },

  {
    id: 'biotech_mrna_cancer',
    name: 'mRNA癌症疫苗突破',
    icon: '💉',
    severity: 'positive',
    probability: 0.05,
    cooldownDays: 500,
    triggerConditions: {
      minDay: 200,
    },
    effects: [
      { type: 'supply_shock', target: 'medicine', value: 0.40, duration: 180 },
      { type: 'price_shock', target: 'medicine', value: -0.25, duration: 180 },
    ],
    options: [
      { text: '全民免费接种计划', effects: [{ type: 'treasury', value: -40000 }, { type: 'pop_approval', value: 15 }], aiSelectionWeight: 40 },
      { text: '医保谈判准入', effects: [{ type: 'treasury', value: -15000 }, { type: 'pop_approval', value: 8 }], aiSelectionWeight: 40 },
      { text: '市场化定价', effects: [{ type: 'treasury', value: 5000 }, { type: 'pop_approval', value: -10 }], aiSelectionWeight: 20 },
    ],
  },

  // ========================================
  // 【第三部分】社会民生运动 (25个)
  // ========================================

  {
    id: 'general_strike_mass',
    name: '全国性大罢工',
    icon: '✊',
    severity: 'catastrophic',
    probability: 0.06,
    cooldownDays: 365,
    triggerConditions: {
      minDay: 120,
      maxStability: 40,
      minUnemployment: 8,
    },
    effects: [
      { type: 'supply_shock', target: 'coal', value: -0.50, duration: 30 },
      { type: 'supply_shock', target: 'iron', value: -0.40, duration: 30 },
      { type: 'instability', value: -25, duration: 60 },
    ],
    options: [
      { text: '武力清场', effects: [{ type: 'stability', value: -30 }, { type: 'pop_approval', value: -25 }, { type: 'legitimacy', value: -20 }], aiSelectionWeight: 15 },
      { text: '全员涨薪15%', effects: [{ type: 'inflation', value: 8 }, { type: 'treasury', value: -25000 }], aiSelectionWeight: 45 },
      { text: '逮捕工会领袖', effects: [{ type: 'stability', value: -15 }, { type: 'pop_approval', value: -18 }], aiSelectionWeight: 40 },
    ],
  },

  {
    id: 'youth_unemployment_protest',
    name: '青年失业率爆表',
    icon: '🧑',
    severity: 'major',
    probability: 0.15,
    cooldownDays: 120,
    triggerConditions: {
      minDay: 60,
      minUnemployment: 10,
    },
    effects: [
      { type: 'instability', value: -10, duration: 60 },
      { type: 'pop_approval', value: -8, duration: 60 },
    ],
    options: [
      { text: '百万青年下乡计划', effects: [{ type: 'treasury', value: -15000 }, { type: 'unemployment', value: -4 }], aiSelectionWeight: 40 },
      { text: '国企扩招稳就业', effects: [{ type: 'treasury', value: -20000 }, { type: 'pop_approval', value: 5 }], aiSelectionWeight: 40 },
      { text: '灵活就业新业态', effects: [{ type: 'pop_approval', value: -5 }, { type: 'bureaucracy', value: -3 }], aiSelectionWeight: 20 },
    ],
  },

  {
    id: 'medical_corruption_scandal',
    name: '医疗系统系统性腐败',
    icon: '🏥',
    severity: 'major',
    probability: 0.12,
    cooldownDays: 150,
    triggerConditions: {
      minDay: 50,
    },
    effects: [
      { type: 'pop_approval', value: -12, duration: 90 },
      { type: 'legitimacy', value: -8, duration: 90 },
    ],
    options: [
      { text: '全国医疗反腐风暴', effects: [{ type: 'pop_approval', value: 12 }, { type: 'bureaucracy', value: 10 }], aiSelectionWeight: 55 },
      { text: '提高医生阳光收入', effects: [{ type: 'treasury', value: -18000 }, { type: 'pop_approval', value: 5 }], aiSelectionWeight: 30 },
      { text: '市场化医疗改革', effects: [{ type: 'pop_approval', value: -8 }, { type: 'bureaucracy', value: -5 }], aiSelectionWeight: 15 },
    ],
  },

  {
    id: 'education_devaluation',
    name: '学历严重贬值',
    icon: '🎓',
    severity: 'major',
    probability: 0.14,
    cooldownDays: 120,
    triggerConditions: {
      minDay: 80,
      minUnemployment: 12,
    },
    effects: [
      { type: 'instability', value: -6, duration: 60 },
      { type: 'pop_approval', value: -6, duration: 60 },
    ],
    options: [
      { text: '研究生大扩招', effects: [{ type: 'treasury', value: -12000 }, { type: 'unemployment', value: -2 }], aiSelectionWeight: 45 },
      { text: '产教融合职业教育', effects: [{ type: 'treasury', value: -8000 }, { type: 'bureaucracy', value: 5 }], aiSelectionWeight: 35 },
      { text: '教育减负改革', effects: [{ type: 'pop_approval', value: 8 }, { type: 'treasury', value: -5000 }], aiSelectionWeight: 20 },
    ],
  },

  // ========================================
  // 【第四部分】天灾人祸 (15个)
  // ========================================

  {
    id: 'mega_earthquake',
    name: '特大地震灾难',
    icon: '🌋',
    severity: 'catastrophic',
    probability: 0.03,
    cooldownDays: 730,
    triggerConditions: {
      minDay: 100,
    },
    effects: [
      { type: 'treasury', value: -50000, duration: 1 },
      { type: 'supply_shock', target: 'grain', value: -0.25, duration: 120 },
      { type: 'unemployment', value: 5, duration: 90 },
    ],
    options: [
      { text: '全国总动员救灾', effects: [{ type: 'treasury', value: -40000 }, { type: 'pop_approval', value: 12 }], aiSelectionWeight: 60 },
      { text: '接受国际援助', effects: [{ type: 'treasury', value: -15000 }, { type: 'stability', value: 5 }], aiSelectionWeight: 25 },
      { text: '军民团结抗震', effects: [{ type: 'treasury', value: -25000 }, { type: 'legitimacy', value: 10 }], aiSelectionWeight: 15 },
    ],
  },

  {
    id: 'epic_flood_disaster',
    name: '史诗级洪涝灾害',
    icon: '🌊',
    severity: 'catastrophic',
    probability: 0.04,
    cooldownDays: 500,
    triggerConditions: {
      minDay: 180,
      dayOfYear: [190, 200, 210, 220],
    },
    effects: [
      { type: 'treasury', value: -35000, duration: 1 },
      { type: 'supply_shock', target: 'grain', value: -0.35, duration: 90 },
      { type: 'inflation', value: 5, duration: 60 },
    ],
    options: [
      { text: '三峡大坝分洪决策', effects: [{ type: 'treasury', value: -30000 }, { type: 'stability', value: 8 }], aiSelectionWeight: 50 },
      { text: '灾区对口援建', effects: [{ type: 'treasury', value: -20000 }, { type: 'pop_approval', value: 8 }], aiSelectionWeight: 35 },
      { text: '灾后问责追责', effects: [{ type: 'pop_approval', value: 5 }, { type: 'bureaucracy', value: 5 }], aiSelectionWeight: 15 },
    ],
  },

  {
    id: 'pandemic_new_variant',
    name: '新型病毒大流行',
    icon: '🦠',
    severity: 'catastrophic',
    probability: 0.03,
    cooldownDays: 730,
    triggerConditions: {
      minDay: 150,
    },
    effects: [
      { type: 'supply_shock', target: 'medicine', value: -0.50, duration: 60 },
      { type: 'price_shock', target: 'medicine', value: 1.0, duration: 90 },
      { type: 'unemployment', value: 8, duration: 60 },
    ],
    options: [
      { text: '全面封控清零', effects: [{ type: 'unemployment', value: 12 }, { type: 'treasury', value: -50000 }], aiSelectionWeight: 35 },
      { text: '疫苗+特效药放开', effects: [{ type: 'treasury', value: -30000 }, { type: 'pop_approval', value: 10 }], aiSelectionWeight: 40 },
      { text: '群体免疫自然感染', effects: [{ type: 'stability', value: -15 }, { type: 'pop_approval', value: -12 }], aiSelectionWeight: 25 },
    ],
  },

  // ========================================
  // 【第五部分】年度周期性事件 (10个)
  // ========================================

  {
    id: 'annual_two_sessions',
    name: '年度两会召开',
    icon: '🏛️',
    severity: 'positive',
    probability: 0.95,
    cooldownDays: 360,
    countries: ['china'],
    triggerConditions: {
      dayOfYear: [60, 65, 70],
    },
    effects: [
      { type: 'stability', value: 3, duration: 30 },
    ],
    options: [
      { text: '发布重大改革信号', effects: [{ type: 'bureaucracy', value: 5 }, { type: 'stability', value: 5 }], aiSelectionWeight: 40 },
      { text: '大规模减税降费', effects: [{ type: 'treasury', value: -15000 }, { type: 'pop_approval', value: 8 }], aiSelectionWeight: 40 },
      { text: '设定稳健增长目标', effects: [{ type: 'bureaucracy', value: 3 }], aiSelectionWeight: 20 },
    ],
  },

  {
    id: 'central_bank_annual',
    name: '央行年度工作会议',
    icon: '🏦',
    severity: 'positive',
    probability: 0.95,
    cooldownDays: 360,
    triggerConditions: {
      dayOfYear: [5, 10],
    },
    effects: [],
    options: [
      { text: '宽松货币政策取向', effects: [{ type: 'inflation', value: 2 }, { type: 'unemployment', value: -1 }], aiSelectionWeight: 50 },
      { text: '稳健中性货币政策', effects: [{ type: 'stability', value: 2 }], aiSelectionWeight: 35 },
      { text: '收紧防风险取向', effects: [{ type: 'inflation', value: -2 }, { type: 'stability', value: 3 }], aiSelectionWeight: 15 },
    ],
  },
]

export default WORLD_EVENTS_EXPANSION
