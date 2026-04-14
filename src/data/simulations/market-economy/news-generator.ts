/**
 * ==============================================
 * 📰 新闻生成引擎 - 模拟世界媒体系统
 * ==============================================
 * 【模块定位】
 * 将所有AI决策和世界事件转化为可阅读的新闻报道
 * 基于模板引擎的程序化新闻生成器
 * 给玩家提供"世界在运转"的沉浸感
 * 
 * 【核心机制】
 * - 5大新闻分类：经济/外交/军事/社会/科技
 * - 30+标准化新闻模板
 * - 变量自动插值（国家名/数值/趋势）
 * - 3级严重度影响新闻样式
 * 
 * 【⚠️  沉浸感关键】
 * 新闻真实感决定了整个模拟器的可信度！
 * 模板写得好，玩家真的会以为在看BBC/路透社！
 * 严重度=major的新闻会红标高亮！
 */
import type { NewsItem } from './vic3-types'
import type { EconomyState } from './types'

const NEWS_TEMPLATES = {
  economic: [
    { headline: '{country}央行宣布加息{value}个基点', content: '央行货币政策委员会今日召开紧急会议，决定调整基准利率。分析师认为这将对全球金融市场产生深远影响。' },
    { headline: '{country}公布最新就业数据，失业率{trend}', content: '最新统计数据显示，劳动力市场出现显著变化。经济学家对此发表了不同看法。' },
    { headline: '{country}通胀率达到{value}%，创{period}新高', content: '物价持续上涨引发民众担忧，政府正在考虑一系列应对措施。' },
    { headline: '{country}股市{trend}超过{value}点', content: '金融市场出现剧烈波动，投资者情绪正在发生转变。' },
    { headline: '{company}巨头宣布裁员{value}人', content: '行业重组加速，多家知名企业相继宣布裁员计划。' },
    { headline: '{country}GDP增速{trend}至{value}%', content: '最新经济数据出炉，增长势头引发市场关注。' },
  ],
  diplomatic: [
    { headline: '{country}与{relatedCountry}领导人举行会晤', content: '双方就广泛议题交换了意见，外界普遍期待会谈能取得实质性成果。' },
    { headline: '{country}就{relatedCountry}人权问题发表声明', content: '两国外交关系出现新的变数，国际社会密切关注事态发展。' },
    { headline: '{country}与{relatedCountry}签署自贸协定', content: '双边贸易迎来新时代，预计将为双方带来巨大经济利益。' },
    { headline: '{country}召回驻{relatedCountry}大使', content: '外交关系骤然紧张，国际社会呼吁双方保持克制。' },
    { headline: '联合国大会召开，{country}发表重要讲话', content: '国际社会就重大全球性问题展开激烈辩论。' },
    { headline: '{country}与{relatedCountry}关系正常化取得突破', content: '历史宿敌迈出和解的重要一步。' },
  ],
  military: [
    { headline: '{country}在{relatedCountry}边境举行大规模军演', content: '地区安全形势骤然紧张，周边国家密切监控事态发展。' },
    { headline: '{country}宣布增加军费开支{value}%', content: '新一轮军备竞赛似乎正在拉开序幕。' },
    { headline: '地区冲突升级，{country}呼吁停火', content: '国际社会加紧外交斡旋，希望避免局势进一步恶化。' },
    { headline: '{country}成功试射新型导弹', content: '军事技术取得重大突破，引发地区安全担忧。' },
    { headline: '北约与{country}举行联合军事演习', content: '多国部队参与演习，规模创近年之最。' },
  ],
  social: [
    { headline: '{country}爆发大规模抗议活动', content: '民众走上街头表达不满，政府面临空前压力。' },
    { headline: '{country}通过重大社会改革法案', content: '历史性立法将深刻改变国家面貌。' },
    { headline: '{country}发生重大自然灾害，{value}万人受灾', content: '国际社会纷纷伸出援手，救灾工作正在紧张进行。' },
    { headline: '{country}大选结果揭晓，新总统宣誓就职', content: '政治版图发生重大变化，国家将迎来新的发展方向。' },
    { headline: '重大疫情在{country}爆发', content: '卫生部门紧急启动应急响应机制。' },
  ],
  tech: [
    { headline: '{country}科学家宣布重大技术突破', content: '科技创新将为人类发展开辟新的可能性。' },
    { headline: '{company}发布新一代产品，性能提升{value}%', content: '科技巨头推出重磅新品，业界为之震动。' },
    { headline: '{country}投资{value}亿美元发展人工智能', content: '大国科技竞争进入白热化阶段。' },
    { headline: '新能源技术取得革命性进展', content: '能源转型步伐加快，化石能源时代或将终结。' },
    { headline: '{country}量子计算机研发取得里程碑式进展', content: '算力革命即将到来，全球科技竞赛再掀高潮。' },
  ],
}

const COUNTRIES = ['usa', 'china', 'russia', 'eu', 'japan', 'germany', 'uk', 'india', 'brazil', 'france']
const COUNTRY_NAMES: Record<string, string> = {
  usa: '美国', china: '中国', russia: '俄罗斯', eu: '欧盟',
  japan: '日本', germany: '德国', uk: '英国', india: '印度',
  brazil: '巴西', france: '法国',
}
const TRENDS = ['上涨', '下跌', '持平', '飙升', '暴跌']
const PERIODS = ['十年', '五年', '三年', '一年', '历史']

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateDailyNews(day: number, count: number = 3): NewsItem[] {
  const news: NewsItem[] = []
  const categories = Object.keys(NEWS_TEMPLATES) as (keyof typeof NEWS_TEMPLATES)[]
  
  for (let i = 0; i < count; i++) {
    const category = randomChoice(categories)
    const templates = NEWS_TEMPLATES[category]
    const template = randomChoice(templates)
    const country = randomChoice(COUNTRIES)
    const relatedCountry = randomChoice(COUNTRIES.filter(c => c !== country))
    
    let headline = template.headline
      .replace('{country}', COUNTRY_NAMES[country])
      .replace('{relatedCountry}', COUNTRY_NAMES[relatedCountry])
      .replace('{value}', String(randomInt(1, 50)))
      .replace('{trend}', randomChoice(TRENDS))
      .replace('{period}', randomChoice(PERIODS))
      .replace('{company}', randomChoice(['科技', '金融', '能源', '制造', '零售']))
    
    const content = template.content
    
    news.push({
      id: `news_${day}_${i}_${Date.now()}`,
      day,
      category,
      severity: Math.random() > 0.8 ? 'major' : Math.random() > 0.5 ? 'normal' : 'minor',
      headline,
      content,
      country,
      relatedCountry,
      isRead: false,
    })
  }
  
  return news
}

export function generateEventNews(day: number, eventName: string, severity: string): NewsItem {
  return {
    id: `event_news_${day}_${Date.now()}`,
    day,
    category: 'economic',
    severity: severity === 'catastrophic' ? 'major' : 'normal',
    headline: `突发：${eventName}`,
    content: '正在发展中的重大事件，请密切关注后续报道。',
    isRead: false,
  }
}

export function addNewsToState(state: EconomyState, news: NewsItem[]): EconomyState {
  return {
    ...state,
    news: [...news, ...state.news].slice(0, 100),
  }
}
