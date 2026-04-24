export interface Currency {
  isoCode: string
  symbol: string
  name: string
  country: string
  exchangeRateVsUSD: number
  isFloating: boolean
  isReserveCurrency: boolean
  convertToUSD: (amount: number) => number
  convertFromUSD: (amount: number) => number
}

export interface UnitStandard {
  dimension: string
  unit: string
  symbol: string
  description: string
  conversion: Record<string, number>
  displayFormat: string
}

export interface CountryMacroeconomicUnits {
  country: string
  currency: Currency
  populationUnit: UnitStandard
  gdpUnit: UnitStandard
  gdpPerCapitaUnit: UnitStandard
  debtUnit: UnitStandard
  treasuryUnit: UnitStandard
  inflationUnit: UnitStandard
  unemploymentUnit: UnitStandard
  interestRateUnit: UnitStandard
}

export const CURRENCIES: Record<string, Currency> = {
  USD: {
    isoCode: 'USD',
    symbol: '$',
    name: '美元',
    country: '美国',
    exchangeRateVsUSD: 1.0,
    isFloating: true,
    isReserveCurrency: true,
    convertToUSD: (amount) => amount,
    convertFromUSD: (amount) => amount,
  },
  EUR: {
    isoCode: 'EUR',
    symbol: '€',
    name: '欧元',
    country: '欧盟',
    exchangeRateVsUSD: 1.07,
    isFloating: true,
    isReserveCurrency: true,
    convertToUSD: (amount) => amount * 1.07,
    convertFromUSD: (amount) => amount / 1.07,
  },
  RUB: {
    isoCode: 'RUB',
    symbol: '₽',
    name: '俄罗斯卢布',
    country: '俄罗斯联邦',
    exchangeRateVsUSD: 92.5,
    isFloating: true,
    isReserveCurrency: false,
    convertToUSD: (amount) => amount / 92.5,
    convertFromUSD: (amount) => amount * 92.5,
  },
  CNY: {
    isoCode: 'CNY',
    symbol: '¥',
    name: '人民币',
    country: '中华人民共和国',
    exchangeRateVsUSD: 7.2,
    isFloating: false,
    isReserveCurrency: false,
    convertToUSD: (amount) => amount / 7.2,
    convertFromUSD: (amount) => amount * 7.2,
  },
  JPY: {
    isoCode: 'JPY',
    symbol: '¥',
    name: '日元',
    country: '日本',
    exchangeRateVsUSD: 155.0,
    isFloating: true,
    isReserveCurrency: true,
    convertToUSD: (amount) => amount / 155.0,
    convertFromUSD: (amount) => amount * 155.0,
  },
  GBP: {
    isoCode: 'GBP',
    symbol: '£',
    name: '英镑',
    country: '英国',
    exchangeRateVsUSD: 1.25,
    isFloating: true,
    isReserveCurrency: true,
    convertToUSD: (amount) => amount * 1.25,
    convertFromUSD: (amount) => amount / 1.25,
  },
  DEM: {
    isoCode: 'DEM',
    symbol: 'DM',
    name: '德国马克',
    country: '普鲁士/德国',
    exchangeRateVsUSD: 1.8,
    isFloating: false,
    isReserveCurrency: false,
    convertToUSD: (amount) => amount / 1.8,
    convertFromUSD: (amount) => amount * 1.8,
  },
  RUBLE_IMPERIAL: {
    isoCode: 'RUR',
    symbol: '₽',
    name: '金卢布',
    country: '俄罗斯帝国',
    exchangeRateVsUSD: 0.5,
    isFloating: false,
    isReserveCurrency: false,
    convertToUSD: (amount) => amount * 2,
    convertFromUSD: (amount) => amount / 2,
  },
}

export const STANDARD_UNITS: Record<string, UnitStandard> = {
  POPULATION: {
    dimension: '人口',
    unit: '百万人',
    symbol: 'M',
    description: '人口统计单位，以百万为基准',
    conversion: {
      '人': 0.000001,
      '千人': 0.001,
      '百万人': 1,
      '亿人': 100,
    },
    displayFormat: '{value:.1f} 百万人',
  },
  GDP_NOMINAL: {
    dimension: '国内生产总值（名义）',
    unit: '十亿美元（现价）',
    symbol: 'B USD',
    description: 'GDP国际标准单位，十亿美元现价',
    conversion: {
      '百万美元': 0.001,
      '十亿美元': 1,
      '万亿美元': 1000,
      '万亿人民币': 139,
    },
    displayFormat: '${value:.1f}B',
  },
  GDP_PER_CAPITA: {
    dimension: '人均GDP',
    unit: '美元/人',
    symbol: 'USD/person',
    description: '人均GDP国际标准单位',
    conversion: {
      '美元/人': 1,
      '人民币/人': 0.139,
    },
    displayFormat: '${value:.0f}',
  },
  NATIONAL_DEBT: {
    dimension: '国债',
    unit: '十亿美元',
    symbol: 'B USD',
    description: '国家债务国际标准单位',
    conversion: {
      '百万美元': 0.001,
      '十亿美元': 1,
      '万亿美元': 1000,
    },
    displayFormat: '${value:.1f}B',
  },
  TREASURY_BALANCE: {
    dimension: '国库余额',
    unit: '十亿美元',
    symbol: 'B USD',
    description: '国库现金余额',
    conversion: {
      '百万美元': 0.001,
      '十亿美元': 1,
    },
    displayFormat: '${value:.1f}B',
  },
  FOREIGN_RESERVES: {
    dimension: '外汇储备',
    unit: '十亿美元',
    symbol: 'B USD',
    description: '中央银行外汇储备',
    conversion: {
      '百万美元': 0.001,
      '十亿美元': 1,
    },
    displayFormat: '${value:.1f}B',
  },
  INFLATION: {
    dimension: '通货膨胀率',
    unit: '%同比',
    symbol: '% YoY',
    description: 'CPI同比涨幅',
    conversion: {
      '%': 1,
      '基点': 0.01,
    },
    displayFormat: '{value:.1f}%',
  },
  UNEMPLOYMENT: {
    dimension: '失业率',
    unit: '%劳动力人口',
    symbol: '%',
    description: '调查失业率',
    conversion: {
      '%': 1,
    },
    displayFormat: '{value:.1f}%',
  },
  INTEREST_RATE: {
    dimension: '基准利率',
    unit: '%年化',
    symbol: '%',
    description: '中央银行政策利率',
    conversion: {
      '%': 1,
      '基点': 0.01,
    },
    displayFormat: '{value:.1f}%',
  },
  DEBT_TO_GDP: {
    dimension: '债务率',
    unit: '%GDP',
    symbol: '%',
    description: '政府债务占GDP百分比',
    conversion: {
      '%': 1,
    },
    displayFormat: '{value:.0f}%',
  },
  STABILITY: {
    dimension: '社会稳定度',
    unit: '分',
    symbol: 'pts',
    description: '0-100分制社会稳定指数',
    conversion: {},
    displayFormat: '{value:.0f}',
  },
  LEGITIMACY: {
    dimension: '政府合法性',
    unit: '分',
    symbol: 'pts',
    description: '0-100分制合法性指数',
    conversion: {},
    displayFormat: '{value:.0f}',
  },
}

export const COUNTRY_UNIT_PROFILES: Record<string, CountryMacroeconomicUnits> = {
  USA: {
    country: '美利坚合众国',
    currency: CURRENCIES.USD,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  CHN: {
    country: '中华人民共和国',
    currency: CURRENCIES.CNY,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  DEU: {
    country: '德意志联邦共和国',
    currency: CURRENCIES.EUR,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  JPN: {
    country: '日本国',
    currency: CURRENCIES.JPY,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  GBR: {
    country: '大不列颠及北爱尔兰联合王国',
    currency: CURRENCIES.GBP,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  FRA: {
    country: '法兰西共和国',
    currency: CURRENCIES.EUR,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  RUS: {
    country: '俄罗斯联邦',
    currency: CURRENCIES.RUB,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  IND: {
    country: '印度共和国',
    currency: CURRENCIES.USD,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  BRA: {
    country: '巴西联邦共和国',
    currency: CURRENCIES.USD,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  KOR: {
    country: '大韩民国',
    currency: CURRENCIES.USD,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  PRU: {
    country: '普鲁士王国',
    currency: CURRENCIES.DEM,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
  RUS_EMP: {
    country: '俄罗斯帝国',
    currency: CURRENCIES.RUBLE_IMPERIAL,
    populationUnit: STANDARD_UNITS.POPULATION,
    gdpUnit: STANDARD_UNITS.GDP_NOMINAL,
    gdpPerCapitaUnit: STANDARD_UNITS.GDP_PER_CAPITA,
    debtUnit: STANDARD_UNITS.NATIONAL_DEBT,
    treasuryUnit: STANDARD_UNITS.TREASURY_BALANCE,
    inflationUnit: STANDARD_UNITS.INFLATION,
    unemploymentUnit: STANDARD_UNITS.UNEMPLOYMENT,
    interestRateUnit: STANDARD_UNITS.INTEREST_RATE,
  },
}

export function formatValue(value: number, unit: UnitStandard, localCurrency?: Currency): string {
  let displayValue = value
  let format = unit.displayFormat

  if (localCurrency && (unit.dimension.includes('GDP') || unit.dimension.includes('债务') || unit.dimension.includes('国库'))) {
    displayValue = localCurrency.convertFromUSD(value)
    format = localCurrency.symbol + '{value:.1f} ' + localCurrency.isoCode
  }

  return format.replace('{value:.0f}', Math.round(displayValue).toString())
    .replace('{value:.1f}', displayValue.toFixed(1))
}

export function applySustainableBalance(state: Record<string, any>, day: number) {
  const equilibriumStrength = 0.001

  if (state.inflation > 15) {
    state.inflation -= equilibriumStrength * 5
  } else if (state.inflation < 0) {
    state.inflation += equilibriumStrength * 2
  }

  if (state.unemployment > 15) {
    state.unemployment -= equilibriumStrength * 2
  } else if (state.unemployment < 2) {
    state.unemployment += equilibriumStrength
  }

  if (day % 365 === 0) {
    if (state.stability < 30) {
      state.stability += 0.5
    }
    if (state.stability > 70) {
      state.stability -= 0.2
    }

    if (state.legitimacy < 30) {
      state.legitimacy += 0.3
    }
    if (state.approval < 20) {
      state.approval += 0.5
    } else if (state.approval > 80) {
      state.approval -= 0.3
    }

    if (state.militancy < 20) {
      state.militancy += 0.2
    } else if (state.militancy > 80) {
      state.militancy -= 0.2
    }
  }

  state.stability = Math.max(-50, Math.min(100, state.stability))
  state.legitimacy = Math.max(-30, Math.min(100, state.legitimacy))
  state.approval = Math.max(-10, Math.min(100, state.approval))
  state.militancy = Math.max(0, Math.min(100, state.militancy))
  state.inflation = Math.max(-5, Math.min(1000, state.inflation))
  state.unemployment = Math.max(0.1, Math.min(90, state.unemployment))
}

export function formatMacroeconomicReport(state: Record<string, any>, countryCode: string = 'RUS'): string {
  const profile = COUNTRY_UNIT_PROFILES[countryCode] || COUNTRY_UNIT_PROFILES.RUS
  
  const lines = [
    '='.repeat(80),
    `📊 ${profile.country} 宏观经济数据（国际标准单位）`,
    '='.repeat(80),
    '',
    '--- 🧍 人口 ---',
    `  总人口: ${formatValue(state.population, profile.populationUnit)}`,
    '',
    '--- 💰 国民经济核算 ---',
    `  GDP（现价美元）: ${formatValue(state.gdp, profile.gdpUnit)}`,
    `  人均GDP: ${formatValue(state.gdpPerCapita, profile.gdpPerCapitaUnit)}`,
    `  GDP（本币）: ${profile.currency.symbol}${(state.gdp / profile.currency.exchangeRateVsUSD).toFixed(1)}B ${profile.currency.isoCode}`,
    `  购买力平价调整: x${state.gdp * 1.6 / state.gdp}`,
    '',
    '--- 💸 财政状况 ---',
    `  国债: ${formatValue(state.debt, profile.debtUnit)}`,
    `  负债率: ${formatValue(state.debtToGdp, STANDARD_UNITS.DEBT_TO_GDP)}`,
    `  国库余额: ${formatValue(state.treasury, profile.treasuryUnit)}`,
    `  外汇储备: ${formatValue(state.currencyReserves || 0, STANDARD_UNITS.FOREIGN_RESERVES)}`,
    '',
    '--- 💹 货币金融 ---',
    `  基准货币: ${profile.currency.name} (${profile.currency.isoCode})`,
    `  汇率: ${profile.currency.exchangeRateVsUSD} ${profile.currency.isoCode} = 1 USD`,
    `  基准利率: ${formatValue(state.centralBankRate, profile.interestRateUnit)}`,
    `  通胀率: ${formatValue(state.inflation, profile.inflationUnit)}`,
    '',
    '--- 🛠️  劳动力市场 ---',
    `  失业率: ${formatValue(state.unemployment, profile.unemploymentUnit)}`,
    `  劳动参与率: 65.0%`,
    '',
    '--- 🎭 政治指标 ---',
    `  社会稳定度: ${formatValue(state.stability, STANDARD_UNITS.STABILITY)} / 100`,
    `  政府合法性: ${formatValue(state.legitimacy, STANDARD_UNITS.LEGITIMACY)} / 100`,
    `  民众支持率: ${state.approval.toFixed(0)}%`,
    `  民怨指数: ${state.militancy.toFixed(0)} / 100`,
    '',
  ]

  return lines.join('\n')
}

export const RUSSIA_2019_STANDARDIZED = {
  country: 'RUS',
  countryName: '俄罗斯联邦',
  units: COUNTRY_UNIT_PROFILES.RUS,
  date: { year: 2019, month: 1, day: 1 },
  initialStats: {
    population: 144.5,
    gdp: 1650,
    gdpPerCapita: 11419,
    inflation: 4.5,
    unemployment: 4.6,
    stability: 75,
    treasury: 458,
    debt: 260,
    debtToGdp: 15.8,
    legitimacy: 68,
    militancy: 22,
    approval: 64,
    centralBankRate: 7.75,
    currencyReserves: 540,
    warWeariness: 0,
    sanctionsImpact: 8,
    corruption: 42,
    brainDrain: 15,
    capitalFlight: 12,
    pandemicPreparedness: 35,
    politicalCapital: 100,
    researchPoints: 0,
  },
  activeIssues: [
    '西方制裁',
    '人口负增长',
    '资源依赖',
    '腐败',
    '人才流失',
  ],
}

export const RUSSIA_2026_STANDARDIZED = RUSSIA_2019_STANDARDIZED
