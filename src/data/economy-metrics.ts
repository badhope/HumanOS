export const ECONOMY_METRICS = {
  gdp: {
    title: '国内生产总值 (GDP)',
    description: '衡量国家经济活动总量的核心指标，代表一年内所有最终商品和服务的市场价值。',
    formula: '消费 + 投资 + 政府支出 + 净出口',
    example: 'GDP年增长5%意味着经济总体规模扩大5%',
    tips: 'GDP是衡量国家综合国力的最核心指标，目标每年至少保持正增长'
  },
  treasury: {
    title: '国库资金',
    description: '中央政府掌握的可自由支配财政资金。',
    formula: '税收收入 - 财政支出 + 债务收入',
    example: '国库资金1000亿意味着政府可以直接动用的现金储备',
    tips: '国库过低会导致政府停摆，无法实施任何政策'
  },
  inflation: {
    title: '通货膨胀率',
    description: '一般物价水平持续上涨的速度，衡量货币购买力下降的速率。',
    formula: '(当期物价 - 基期物价) / 基期物价 × 100%',
    example: '通胀5%意味着去年100元今年只值95元',
    tips: '2-3%是温和通胀，超过10%属于恶性通胀'
  },
  unemployment: {
    title: '失业率',
    description: '劳动人口中积极寻找工作但未能就业的比例。',
    formula: '失业人口 / 总劳动人口 × 100%',
    example: '失业率5%意味着每20个劳动力中有1个失业',
    tips: '低于4%是充分就业，高于15%会引发社会动荡'
  },
  stability: {
    title: '社会稳定度',
    description: '综合衡量民众满意度、犯罪率、社会信任、政府支持率的指标。',
    formula: '加权计算：支持率60% + 就业率20% + 通胀率20%',
    example: '稳定度低于30%意味着社会濒临崩溃',
    tips: '稳定度过低会触发大规模抗议和政府危机'
  },
  debt: {
    title: '主权债务',
    description: '中央政府发行的未偿还债务总额。',
    formula: '历年财政赤字累积 + 利息支出',
    example: '债务/GDP比率超过100%进入高风险区',
    tips: '高债务会导致信用评级下降，融资成本飙升'
  },
  interestRate: {
    title: '基准利率',
    description: '中央银行设定的商业银行拆借利率。',
    formula: '央行根据通胀和就业目标设定',
    example: '加息可以抑制通胀但会压制经济增长',
    tips: '利率是最重要的货币政策工具'
  },
  politicalCapital: {
    title: '政治点数',
    description: '推行重大改革和政策所需的政治资源。',
    formula: '支持率 × 执政时间 × 议会席位',
    example: '推行养老金改革需要大量政治点数',
    tips: '政治资本不足时强行推政策会大幅降低支持率'
  },
  approval: {
    title: '民众支持率',
    description: '民众对政府的满意程度。',
    formula: '生活水平 + 就业 + 物价稳定',
    example: '支持率低于20%可能触发选举失败',
    tips: '支持率是执政合法性的基础'
  }
}
