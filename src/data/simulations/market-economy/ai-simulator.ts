/**
 * ==============================================
 * ⚙️ AI行动调度器 - 模拟世界主循环
 * ==============================================
 * 【模块定位】
 * 整个世界模拟器的主时钟和事件调度器
 * 每天调用所有国家AI进行决策并产生新闻
 * 相当于游戏的"下一回合"按钮
 * 
 * 【核心机制】
 * - 每天按行动点概率触发各国决策
 * - 7种基础AI行动类型
 * - 自动生成符合情境的新闻标题
 * - 关系变化的蝴蝶效应传播
 * 
 * 【⚠️  性能陷阱】
 * 每天循环11个国家×5种行动，计算量O(n²)
 * 1000天模拟会产生100万次计算！
 * COUNTRY_PERSONALITIES是每个国家的底层行为参数！
 */
import type { EconomyState } from './types'
import type { NewsItem } from './vic3-types'
import { generateEventNews } from './news-generator'

const COUNTRY_PERSONALITIES: Record<string, {
  aggressiveness: number
  diplomatic: number
  economicFocus: number
}> = {
  usa: { aggressiveness: 0.7, diplomatic: 0.5, economicFocus: 0.6 },
  china: { aggressiveness: 0.3, diplomatic: 0.6, economicFocus: 0.9 },
  russia: { aggressiveness: 0.8, diplomatic: 0.2, economicFocus: 0.3 },
  eu: { aggressiveness: 0.2, diplomatic: 0.8, economicFocus: 0.5 },
  japan: { aggressiveness: 0.3, diplomatic: 0.6, economicFocus: 0.7 },
  germany: { aggressiveness: 0.2, diplomatic: 0.7, economicFocus: 0.8 },
  uk: { aggressiveness: 0.5, diplomatic: 0.5, economicFocus: 0.4 },
  india: { aggressiveness: 0.4, diplomatic: 0.4, economicFocus: 0.6 },
  brazil: { aggressiveness: 0.2, diplomatic: 0.5, economicFocus: 0.5 },
  france: { aggressiveness: 0.4, diplomatic: 0.6, economicFocus: 0.4 },
}

const COUNTRY_NAMES: Record<string, string> = {
  usa: '美国', china: '中国', russia: '俄罗斯', eu: '欧盟',
  japan: '日本', germany: '德国', uk: '英国', india: '印度',
  brazil: '巴西', france: '法国',
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function chance(probability: number): boolean {
  return Math.random() < probability
}

interface AIAction {
  type: string
  actor: string
  target?: string
  value?: number
  news?: NewsItem
}

function createActionNews(day: number, action: AIAction): NewsItem {
  const headlines: Record<string, string> = {
    improve_relation: `${COUNTRY_NAMES[action.actor]}改善与${COUNTRY_NAMES[action.target!]}关系`,
    worsen_relation: `${COUNTRY_NAMES[action.actor]}与${COUNTRY_NAMES[action.target!]}关系恶化`,
    economic_reform: `${COUNTRY_NAMES[action.actor]}推出经济改革措施`,
    military_exercise: `${COUNTRY_NAMES[action.actor]}举行大规模军事演习`,
    tariff_adjust: `${COUNTRY_NAMES[action.actor]}调整关税政策`,
    diplomatic_statement: `${COUNTRY_NAMES[action.actor]}发表重要外交声明`,
  }
  
  return {
    id: `ai_${day}_${Date.now()}`,
    day,
    category: action.type.includes('relation') ? 'diplomatic' : 
              action.type.includes('military') ? 'military' : 'economic',
    severity: 'normal',
    headline: headlines[action.type] || `${COUNTRY_NAMES[action.actor]}采取重要行动`,
    content: '国际观察人士正在分析此举对地区和全球局势的影响。',
    country: action.actor,
    relatedCountry: action.target,
    isRead: false,
  }
}

export function simulateAIActions(state: EconomyState): { state: EconomyState; news: NewsItem[] } {
  const day = state.day
  const news: NewsItem[] = []
  let newState = { ...state }
  const geo = { ...newState.geopolitical }
  const relations = [...geo.relations]
  
  if (!geo || !geo.countries) return { state, news }
  
  const countries = Object.keys(geo.countries)
  
  countries.forEach(actor => {
    const personality = COUNTRY_PERSONALITIES[actor] || { aggressiveness: 0.5, diplomatic: 0.5, economicFocus: 0.5 }
    
    if (chance(0.1)) {
      const otherCountries = countries.filter(c => c !== actor)
      if (otherCountries.length === 0) return
      
      const target = otherCountries[Math.floor(Math.random() * otherCountries.length)]
      const relationChange = chance(personality.diplomatic) ? randomInt(1, 5) : randomInt(-5, -1)
      
      const relIndex = relations.findIndex(r => r.from === actor && r.to === target)
      if (relIndex >= 0) {
        relations[relIndex] = {
          ...relations[relIndex],
          value: Math.max(-100, Math.min(100, relations[relIndex].value + relationChange)),
        }
      }
      
      if (Math.abs(relationChange) > 3) {
        const action: AIAction = {
          type: relationChange > 0 ? 'improve_relation' : 'worsen_relation',
          actor,
          target,
          value: relationChange,
        }
        news.push(createActionNews(day, action))
      }
    }
    
    if (chance(0.05) && chance(personality.aggressiveness)) {
      const action: AIAction = {
        type: 'military_exercise',
        actor,
      }
      news.push(createActionNews(day, action))
    }
    
    if (chance(0.05) && chance(personality.economicFocus)) {
      const action: AIAction = {
        type: 'economic_reform',
        actor,
        value: randomInt(1, 3),
      }
      news.push(createActionNews(day, action))
    }
  })
  
  newState.geopolitical = { ...geo, relations }
  
  return { state: newState, news }
}

export function simulateGeopoliticalEffects(state: EconomyState): EconomyState {
  const playerCountry = state.countryId || 'china'
  const geo = state.geopolitical
  
  if (!geo) return state
  
  let sanctionEffect = 0
  geo.activeSanctions.forEach(s => {
    if (s.to === playerCountry) {
      sanctionEffect += s.dailyDamage
    }
  })
  
  let newState = { ...state }
  
  if (sanctionEffect > 0) {
    newState.stats = {
      ...newState.stats,
      gdp: newState.stats.gdp * (1 - sanctionEffect / 100000),
    }
  }
  
  return newState
}
