export const DATA_UNITS = {
  population: {
    unit: '人',
    displayMultiplier: 1,
    formatThreshold: 10000,
    formatRules: [
      { threshold: 100000000, suffix: '亿', divisor: 100000000 },
      { threshold: 10000, suffix: '万', divisor: 10000 },
    ]
  },
  gdp: {
    unit: '美元',
    displayMultiplier: 1000000,
    displayUnit: '亿美元',
    formatThreshold: 100,
    formatRules: [
      { threshold: 10000, suffix: '万亿', divisor: 10000 },
    ]
  },
  treasury: {
    unit: '美元',
    displayMultiplier: 1000000,
    displayUnit: '亿美元',
    formatThreshold: 100,
    formatRules: [
      { threshold: 10000, suffix: '万亿', divisor: 10000 },
    ]
  },
  debt: {
    unit: '美元',
    displayMultiplier: 1000000,
    displayUnit: '亿美元',
    formatThreshold: 100,
    formatRules: [
      { threshold: 10000, suffix: '万亿', divisor: 10000 },
    ]
  },
  military: {
    unit: '美元',
    displayMultiplier: 1000000,
    displayUnit: '亿美元',
    formatThreshold: 1,
    formatRules: []
  }
} as const

export function formatPopulation(value: number): string {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(2)} 亿人`
  }
  if (value >= 10000) {
    return `${(value / 10000).toFixed(2)} 万人`
  }
  return `${value.toLocaleString()} 人`
}

export function formatMoney(value: number): string {
  const raw = value * 1000000
  if (raw >= 1000000000000) {
    return `$${(value / 10000).toFixed(2)} 万亿`
  }
  if (raw >= 100000000) {
    return `$${value.toFixed(0)} 亿`
  }
  return `$${value.toLocaleString()} 万`
}

export function formatGDP(value: number): string {
  const raw = value * 1000000
  if (raw >= 1000000000000) {
    return `$${(value / 10000).toFixed(2)} 万亿美元`
  }
  return `$${value.toLocaleString()} 亿美元`
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function formatLargeNumber(value: number): string {
  if (value >= 1e12) return (value / 1e12).toFixed(2) + ' 兆'
  if (value >= 1e8) return (value / 1e8).toFixed(2) + ' 亿'
  if (value >= 1e4) return (value / 1e4).toFixed(2) + ' 万'
  return Math.floor(value).toLocaleString()
}

export const DATA_DISPLAY_CONFIG = {
  showUnitLabels: true,
  abbreviateLargeNumbers: true,
  tooltipShowsRawValue: true,
  numberPrecision: {
    population: 2,
    gdp: 2,
    money: 2,
    percent: 1,
    general: 0
  }
}

export function getStatDescription(statId: string): string {
  const descriptions: Record<string, string> = {
    population: '国家总人口规模，影响劳动力市场、消费市场和税收基础',
    gdp: '国内生产总值，衡量国家经济总规模的核心指标',
    gdpPerCapita: '人均GDP，反映国民富裕程度',
    inflation: '通胀率，影响物价稳定和居民生活成本',
    unemployment: '失业率，过高会导致社会动荡',
    stability: '国家稳定度，低于30%可能爆发政治危机',
    treasury: '国库余额，政府可支配的财政资金',
    debt: '政府债务总额，还本付息会占用财政资源',
    debtToGdp: '债务GDP比率，超过100%需警惕债务危机',
    approval: '民众支持率，影响政策实施效果'
  }
  return descriptions[statId] || ''
}
