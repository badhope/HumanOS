/**
 * ==============================================
 * 🌍 地缘政治系统 - 维多利亚3式外交引擎
 * ==============================================
 * 【模块定位】
 * 模拟国家间的完整国际关系体系
 * 基于Paradox互动游戏的双边关系数值模型
 * 所有外交事件的裁决者
 * 
 * 【核心机制】
 * - -100到+100的双边关系数值
 * - 同盟/敌对/保障/禁运四大外交状态
 * - 多级制裁系统（贸易/金融/科技/全面）
 * - 国际贸易协定撮合系统
 * 
 * 【⚠️  设计陷阱】
 * COUNTRY_RELATIONS_BASE是整个世界的初始关系！
 * 改一个数字，整个模拟的开局走向完全不同！
 * 关系变化阈值硬编码在calculateOpinion中，低于-50自动敌对！
 */
import type { EconomyState } from './types'
import type { GeoPoliticalState, InternationalRelation } from './vic3-types'
import { deepClone } from './economy-engine'

export interface InternationalTradeDeal {
  id: string
  fromCountry: string
  toCountry: string
  commodity: string
  amount: number
  pricePerUnit: number
  durationDays: number
  daysRemaining: number
  status: 'active' | 'pending' | 'expired' | 'cancelled'
}

export interface Sanction {
  id: string
  fromCountry: string
  toCountry: string
  type: 'trade' | 'financial' | 'tech' | 'full'
  severity: number
  startDay: number
  durationDays: number
}

export interface DiplomaticAction {
  id: string
  type: 'alliance' | 'rival' | 'guarantee' | 'embargo' | 'trade_deal' | 'sanction'
  fromCountry: string
  toCountry: string
  day: number
  effects: { type: string; value: number }[]
}

export interface NewsItem {
  id: string
  day: number
  category: 'economic' | 'diplomatic' | 'military' | 'social' | 'tech'
  severity: 'minor' | 'normal' | 'major'
  headline: string
  content: string
  country?: string
  relatedCountry?: string
  isRead: boolean
}

const COUNTRY_RELATIONS_BASE: { [key: string]: { [key: string]: number } } = {
  usa: { china: -40, russia: -50, eu: 40, japan: 60, uk: 70 },
  china: { usa: -40, russia: 30, eu: 10, japan: -20, india: -30 },
  russia: { usa: -50, china: 30, eu: -30, uk: -40 },
  eu: { usa: 40, china: 10, russia: -30 },
  japan: { usa: 60, china: -20, russia: -25 },
  uk: { usa: 70, eu: 50, russia: -40 },
  india: { china: -30, usa: 30, russia: 20 },
  brazil: { usa: 20, china: 10 },
  france: { eu: 70, usa: 40, germany: 60 },
  germany: { eu: 80, usa: 40, france: 60, russia: -35 },
}

export function initializeGeopoliticalState(): GeoPoliticalState {
  const countries = ['usa', 'china', 'russia', 'eu', 'japan', 'germany', 'uk', 'india', 'brazil', 'france']
  
  const relations: InternationalRelation[] = []
  
  countries.forEach(from => {
    countries.forEach(to => {
      if (from !== to) {
        const baseValue = COUNTRY_RELATIONS_BASE[from]?.[to] || 0
        relations.push({
          from,
          to,
          value: baseValue + Math.floor(Math.random() * 20 - 10),
          tradeAgreement: baseValue > 30,
          tariff: baseValue > 30 ? 0.05 : 0.15,
          sanctions: baseValue < -30,
          militaryAlliance: baseValue > 50,
        })
      }
    })
  })

  return {
    countries: {
      usa: { id: 'usa', gdp: 26000, military: 100, softPower: 90, sphereOfInfluence: ['japan', 'korea', 'eu'] },
      china: { id: 'china', gdp: 18000, military: 75, softPower: 45, sphereOfInfluence: [] },
      russia: { id: 'russia', gdp: 2200, military: 70, softPower: 30, sphereOfInfluence: [] },
      eu: { id: 'eu', gdp: 17000, military: 60, softPower: 80, sphereOfInfluence: [] },
      japan: { id: 'japan', gdp: 4200, military: 35, softPower: 70, sphereOfInfluence: [] },
      germany: { id: 'germany', gdp: 4500, military: 40, softPower: 75, sphereOfInfluence: [] },
      uk: { id: 'uk', gdp: 3300, military: 45, softPower: 80, sphereOfInfluence: [] },
      india: { id: 'india', gdp: 3700, military: 55, softPower: 50, sphereOfInfluence: [] },
      brazil: { id: 'brazil', gdp: 2100, military: 25, softPower: 40, sphereOfInfluence: [] },
      france: { id: 'france', gdp: 2900, military: 50, softPower: 75, sphereOfInfluence: [] },
    },
    relations,
    globalSupplyChain: {
      grain: { exporters: ['usa', 'brazil'], importers: ['china', 'japan'], globalPrice: 250, tradeVolume: 50000 },
      oil: { exporters: ['russia'], importers: ['eu', 'china', 'japan'], globalPrice: 85, tradeVolume: 80000 },
      iron: { exporters: ['brazil', 'australia'], importers: ['china'], globalPrice: 120, tradeVolume: 40000 },
      steel: { exporters: ['china', 'japan'], importers: ['usa', 'eu'], globalPrice: 650, tradeVolume: 35000 },
      tools: { exporters: ['china', 'germany'], importers: ['usa', 'brazil'], globalPrice: 1500, tradeVolume: 25000 },
    },
    activeSanctions: [],
  }
}

export function updateRelation(
  geoState: GeoPoliticalState,
  from: string,
  to: string,
  delta: number
): GeoPoliticalState {
  const newState = JSON.parse(JSON.stringify(geoState)) as GeoPoliticalState
  
  const relation = newState.relations.find(r => r.from === from && r.to === to)
  if (relation) {
    relation.value = Math.max(-100, Math.min(100, relation.value + delta))
    
    if (relation.value >= 50 && !relation.militaryAlliance) {
      relation.militaryAlliance = true
      relation.tradeAgreement = true
      relation.tariff = 0.02
    }
    
    if (relation.value >= 30 && !relation.tradeAgreement) {
      relation.tradeAgreement = true
      relation.tariff = 0.05
    }
    
    if (relation.value < -40 && !relation.sanctions) {
      relation.sanctions = true
      relation.tariff = 0.40
    }
  }
  
  return newState
}

export function imposeSanction(
  geoState: GeoPoliticalState,
  from: string,
  to: string,
  type: Sanction['type']
): { geoState: GeoPoliticalState; news: NewsItem } {
  let newState = updateRelation(geoState, from, to, -30)
  
  const sanction: Sanction = {
    id: `sanction_${Date.now()}`,
    fromCountry: from,
    toCountry: to,
    type,
    severity: type === 'full' ? 100 : type === 'financial' ? 70 : type === 'tech' ? 50 : 30,
    startDay: 0,
    durationDays: 365,
  }
  
  newState.activeSanctions.push({
    from,
    to,
    commodities: type === 'trade' ? ['*'] : type === 'tech' ? ['tools', 'machinery'] : [],
    dailyDamage: sanction.severity * 10,
  })
  
  const countryNames: { [key: string]: string } = {
    usa: '美国', china: '中国', russia: '俄罗斯', eu: '欧盟',
    japan: '日本', germany: '德国', uk: '英国', india: '印度',
    brazil: '巴西', france: '法国',
  }
  
  const news: NewsItem = {
    id: `news_${Date.now()}`,
    day: 0,
    category: 'diplomatic',
    severity: 'major',
    headline: `${countryNames[from]}对${countryNames[to]}实施${type === 'full' ? '全面' : type === 'tech' ? '科技' : type === 'financial' ? '金融' : '贸易'}制裁`,
    content: `地缘政治紧张局势升级，${countryNames[from]}宣布对${countryNames[to]}实施严厉制裁措施。这将对双边贸易和全球市场产生深远影响。`,
    country: from,
    relatedCountry: to,
    isRead: false,
  }
  
  return { geoState: newState, news }
}

export function signTradeAgreement(
  geoState: GeoPoliticalState,
  countryA: string,
  countryB: string
): { geoState: GeoPoliticalState; news: NewsItem } {
  let newState = updateRelation(geoState, countryA, countryB, 25)
  newState = updateRelation(newState, countryB, countryA, 25)
  
  const countryNames: { [key: string]: string } = {
    usa: '美国', china: '中国', russia: '俄罗斯', eu: '欧盟',
    japan: '日本', germany: '德国', uk: '英国', india: '印度',
    brazil: '巴西', france: '法国',
  }
  
  const news: NewsItem = {
    id: `news_${Date.now()}`,
    day: 0,
    category: 'economic',
    severity: 'major',
    headline: `${countryNames[countryA]}与${countryNames[countryB]}签署自由贸易协定`,
    content: `历史性的贸易协定签署，双方将降低关税壁垒，促进投资自由化。预计将显著提振两国经济增长。`,
    country: countryA,
    relatedCountry: countryB,
    isRead: false,
  }
  
  return { geoState: newState, news }
}

export function generateDailyNews(day: number, geoState: GeoPoliticalState, playerState: EconomyState): NewsItem[] {
  const news: NewsItem[] = []
  const countryNames: { [key: string]: string } = {
    usa: '美国', china: '中国', russia: '俄罗斯', eu: '欧盟',
    japan: '日本', germany: '德国', uk: '英国', india: '印度',
    brazil: '巴西', france: '法国',
  }
  
  if (Math.random() < 0.3) {
    const countries = Object.keys(geoState.countries)
    const randomCountry = countries[Math.floor(Math.random() * countries.length)]
    
    const newsTemplates = [
      {
        category: 'economic' as const,
        severity: 'normal' as const,
        headlines: [
          `${countryNames[randomCountry]}央行宣布利率决议`,
          `${countryNames[randomCountry]}发布最新就业数据`,
          `${countryNames[randomCountry]}股市出现波动`,
          `${countryNames[randomCountry]}货币汇率变动`,
        ],
      },
      {
        category: 'diplomatic' as const,
        severity: 'normal' as const,
        headlines: [
          `${countryNames[randomCountry]}举行高层会谈`,
          `${countryNames[randomCountry]}外交使节访问`,
          `${countryNames[randomCountry]}发表国际声明`,
        ],
      },
      {
        category: 'social' as const,
        severity: 'minor' as const,
        headlines: [
          `${countryNames[randomCountry]}民众举行游行示威`,
          `${countryNames[randomCountry]}议会讨论新法案`,
          `${countryNames[randomCountry]}支持率出现变化`,
        ],
      },
    ]
    
    const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)]
    const headline = template.headlines[Math.floor(Math.random() * template.headlines.length)]
    
    news.push({
      id: `news_${day}_${Math.random().toString(36).substr(2, 9)}`,
      day,
      category: template.category,
      severity: template.severity,
      headline,
      content: `${headline}。更多详情请关注后续报道。`,
      country: randomCountry,
      isRead: false,
    })
  }
  
  if (day % 30 === 0 && Math.random() < 0.2) {
    const countries = Object.keys(geoState.countries)
    const c1 = countries[Math.floor(Math.random() * countries.length)]
    let c2 = countries[Math.floor(Math.random() * countries.length)]
    while (c2 === c1) {
      c2 = countries[Math.floor(Math.random() * countries.length)]
    }
    
    news.push({
      id: `news_${day}_major`,
      day,
      category: 'diplomatic',
      severity: 'major',
      headline: `${countryNames[c1]}与${countryNames[c2]}关系出现重大变化`,
      content: `地缘政治格局正在发生微妙变化，${countryNames[c1]}与${countryNames[c2]}之间的外交互动引起国际社会广泛关注。`,
      country: c1,
      relatedCountry: c2,
      isRead: false,
    })
  }
  
  return news
}

export function calculateTradePenalty(
  geoState: GeoPoliticalState,
  playerCountry: string,
  targetCountry: string
): number {
  const relation = geoState.relations.find(
    r => (r.from === playerCountry && r.to === targetCountry) ||
         (r.from === targetCountry && r.to === playerCountry)
  )
  
  if (!relation) return 0.1
  
  let penalty = 0
  
  if (relation.sanctions) {
    penalty += 0.50
  }
  
  penalty += relation.tariff
  
  if (relation.value < -20) {
    penalty += 0.15
  }
  
  if (relation.tradeAgreement) {
    penalty -= 0.10
  }
  
  return Math.max(0, penalty)
}

export function getGlobalPrice(
  geoState: GeoPoliticalState,
  commodityId: string
): number {
  return geoState.globalSupplyChain[commodityId]?.globalPrice || 100
}
