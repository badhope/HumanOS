export interface StatTooltip {
  name: string
  description: string
  formula: string
  idealRange: string
  warningThreshold: string
  impact: string
}

export const STAT_TOOLTIPS: Record<string, StatTooltip> = {
  gdp: {
    name: 'GDP 国内生产总值',
    description: '衡量国家经济总量的核心指标，反映整体经济规模和发展水平',
    formula: '所有产业产出 × 市场价格 + 政府税收',
    idealRange: '持续稳定增长 2-5%/年',
    warningThreshold: '连续负增长 = 经济衰退',
    impact: 'GDP增长 → 就业增加 → 税收增加 → 国库充盈',
  },
  gdpGrowth: {
    name: 'GDP 增长率',
    description: '经济同比增长速度，是判断经济周期的关键指标',
    formula: '(本期GDP - 上期GDP) / 上期GDP × 100%',
    idealRange: '2% ~ 5% 健康区间',
    warningThreshold: '< 0% 衰退 | > 10% 过热',
    impact: '过热会引发通胀，过冷会导致失业',
  },
  treasury: {
    name: '国库余额',
    description: '政府可动用的现金储备，是财政政策的操作空间',
    formula: '税收收入 + 国企利润 - 财政支出 - 债务本息',
    idealRange: 'GDP 的 5-15%',
    warningThreshold: '< 0 财政破产边缘',
    impact: '国库充盈才能投资基建、应对危机',
  },
  surplus: {
    name: '财政结余',
    description: '每日财政收支差额，正=盈余，负=赤字',
    formula: '当日所有收入 - 当日所有支出',
    idealRange: '小额盈余或基本平衡',
    warningThreshold: '持续大额赤字不可持续',
    impact: '长期赤字 → 债务累积 → 利息负担沉重',
  },
  debt: {
    name: '国债余额',
    description: '政府累计欠的债务总额，需要支付利息',
    formula: '历年发债累计 - 已偿还 + 每日计息',
    idealRange: '不超过 GDP 的 60%',
    warningThreshold: '> GDP 100% = 债务危机',
    impact: '债务利息是刚性财政支出，挤压其他预算',
  },
  inflation: {
    name: '通货膨胀率',
    description: '物价上涨幅度，直接影响民众生活水平',
    formula: 'CPI 一篮子商品价格同比变动',
    idealRange: '1% ~ 3% 温和通胀',
    warningThreshold: '> 5% 严重通胀 | < -1% 通缩',
    impact: '高通胀 → 民怨沸腾 → 稳定度下降',
  },
  unemployment: {
    name: '失业率',
    description: '劳动人口中找不到工作的比例，最重要的民生指标',
    formula: '失业人数 / 总劳动适龄人口 × 100%',
    idealRange: '3% ~ 5% 自然失业',
    warningThreshold: '> 10% 高失业风险',
    impact: '高失业 → 社会动荡 → 爆发革命',
  },
  stability: {
    name: '国家稳定度',
    description: '综合衡量民心向背、社会秩序的核心指标',
    formula: '通胀×2 + 失业×3 - 生活水平 - 政府威望',
    idealRange: '> 70% 安全 | > 50% 警惕',
    warningThreshold: '< 30% 动乱风险',
    impact: '稳定度归零 = 政府垮台 = 游戏结束',
  },
  approval: {
    name: '民众支持率',
    description: '各阶层民众对政府的平均满意度',
    formula: '各阶层支持率加权平均',
    idealRange: '> 50% 基本盘稳固',
    warningThreshold: '< 30% 信任危机',
    impact: '支持率影响事件选项的成功率',
  },
  bureaucracy: {
    name: '官僚效率',
    description: '行政系统的运作效率，影响政策落地效果',
    formula: '公务员规模 - 腐败程度 + 信息化水平',
    idealRange: '40% ~ 70% 适度规模',
    warningThreshold: '< 20% 无政府 | > 90% 过度管制',
    impact: '低效率 = 政策打折执行',
  },
  legitimacy: {
    name: '执政合法性',
    description: '民众对政府统治正当性的认可程度',
    formula: '历史传承 + 政绩 + 意识形态 + 民族认同',
    idealRange: '> 60% 执政稳固',
    warningThreshold: '< 40% 合法性危机',
    impact: '合法性决定事件的选项可用范围',
  },
  population: {
    name: '总人口',
    description: '国家的根本，既是劳动力也是消费者',
    formula: '出生 - 死亡 + 净迁移',
    idealRange: '正增长但不过快',
    warningThreshold: '负增长 = 人口老龄化',
    impact: '人口是长期经济增长的基础',
  },
}

export const CONCEPT_GLOSSARY: Record<string, string> = {
  '供给冲击': '突发事件导致某种商品供应量骤减或骤增，通常由战争、天灾、技术突破引起',
  '需求冲击': '市场对某种商品的需求突然大幅变化，如消费升级、替代产品出现',
  '量化宽松': '央行大量印钞注入市场，短期刺激经济但长期会导致通胀',
  '财政紧缩': '政府削减开支、增加税收，短期痛苦但长期改善财政健康',
  '产业政策': '政府通过补贴、税收、管制等手段引导特定产业发展',
  '贸易保护': '对进口商品加征关税，保护本国产业但消费者承担更高价格',
  '市场出清': '供需自动调整到平衡状态，这是自由市场的核心机制',
  '挤出效应': '政府借债太多推高利率，反而抑制民间投资',
  '乘数效应': '政府每花1元钱，能带动几倍的社会总需求',
  '滞后效应': '经济政策的效果通常需要6-18个月才能显现',
}

export function formatStatTooltip(statId: string): StatTooltip | null {
  return STAT_TOOLTIPS[statId] || null
}
