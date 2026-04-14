/**
 * ==============================================
 * 🍚 干饭人等级测评 - 核心计算器
 * ==============================================
 * 【测评定位】吃货灵魂纯度鉴定
 * 【核心算法】饭量 + 鉴赏力 + 探店积极性 + 厨艺 + 执念
 */

import type { Answer } from '../../types'

/**
 * 干饭人等级结果接口
 * 【⚠️  超级重要警告】
 * 1. 这里的 dimension key 必须与题目文件的 dimension 100% 一致！
 *    不一致 = 对应维度分数永远是 0！
 * 2. 这里的字段名必须与 ReportTemplate.tsx 中使用的完全一致！
 *    不一致 = Report 里 result.xxx 返回 undefined = 页面空白！
 */
export interface FoodieResult extends Record<string, any> {
  rawScore: number
  foodieIndex: number
  classification: 'god' | 'master' | 'enthusiast' | 'normal' | 'survivor' | 'skeleton'
  classificationEmoji: string
  dimensions: {
    appetite: number
    tasting: number
    cooking: number
    exploring: number
    spending: number
  }
  title: string
  description: string
  levelName: string
  dimensionDescriptions: Record<string, string>
  foodieQuotes: string[]
  foodieRank: string
  foodRecommendations: string[]
  riceBowlLevel: string
}

const CLASSIFICATIONS = {
  god: { name: '干饭之神', emoji: '🍚', desc: '人是铁饭是钢，一顿不吃饿得慌。一天五顿，顿顿不落。活着就是为了干饭，干饭就是人生的终极意义。' },
  master: { name: '干饭大师', emoji: '🍜', desc: '专业干饭三十年。哪里有好吃的哪里就有你，朋友圈一半都是美食，另一半在去吃的路上。' },
  enthusiast: { name: '干饭达人', emoji: '🍖', desc: '对美食有追求，对味道有要求。愿意为了一碗面跨越大半个城市，愿意为了一顿火锅排队三小时。' },
  normal: { name: '正常干饭人', emoji: '🍛', desc: '该吃吃该喝喝，美食不可辜负但也不会刻意追求。吃得饱吃得好就是幸福。' },
  survivor: { name: '生存型干饭', emoji: '🥗', desc: '吃饭只是为了活着。什么好吃不好吃，能填饱肚子就行，外卖随便点不挑。' },
  skeleton: { name: '辟谷仙人', emoji: '☁️', desc: '吃饭是什么？想起来才吃，一天一顿是常态。靠着光合作用和西北风就能活下去。' },
}

const DIMENSION_NAMES: Record<string, string> = {
  appetite: '饭量指数',
  tasting: '品鉴能力',
  cooking: '烹饪技能',
  exploring: '探店狂魔',
  spending: '饮食消费',
}

const FOODIE_QUOTES = [
  '干饭不积极，思想有问题',
  '没有什么是一顿火锅解决不了的，如果有那就两顿',
  '人生苦短，再来一碗',
  '吃饱了才有力气减肥',
  '我不是在吃，就是在去吃的路上',
  '美食和爱不可辜负',
  '减肥是不可能减肥的，这辈子都不可能',
]

export function calculateFoodie(answers: Answer[]): FoodieResult {
  const dimensions = {
    appetite: 0,
    tasting: 0,
    cooking: 0,
    exploring: 0,
    spending: 0,
  }

  const dimensionCount: Record<string, number> = {}
  Object.keys(dimensions).forEach(k => dimensionCount[k] = 0)

  answers.forEach(answer => {
    const dim = answer.dimension || ''
    const value = typeof answer.value === 'number' ? answer.value : 3
    if (Object.prototype.hasOwnProperty.call(dimensions, dim)) {
      dimensions[dim as keyof typeof dimensions] += value
      dimensionCount[dim]++
    }
  })

  Object.keys(dimensions).forEach(key => {
    if (dimensionCount[key] > 0) {
      dimensions[key as keyof typeof dimensions] = Math.round(
        (dimensions[key as keyof typeof dimensions] / dimensionCount[key] - 1) * 100 / 4
      )
    }
  })

  const rawScore = Object.values(dimensions).reduce((a, b) => a + b, 0)
  const foodieIndex = Math.round(rawScore / 5)

  let classification: FoodieResult['classification']
  if (foodieIndex >= 90) classification = 'god'
  else if (foodieIndex >= 75) classification = 'master'
  else if (foodieIndex >= 60) classification = 'enthusiast'
  else if (foodieIndex >= 40) classification = 'normal'
  else if (foodieIndex >= 20) classification = 'survivor'
  else classification = 'skeleton'

  const config = CLASSIFICATIONS[classification]

  const dimensionDescriptions: Record<string, string> = {
    appetite: dimensions.appetite >= 80
      ? '一顿三碗饭起步，自助餐老板的噩梦'
      : dimensions.appetite >= 50
        ? '胃口好，吃嘛嘛香'
        : dimensions.appetite >= 25
          ? '饭量正常，吃饱就行'
          : '小鸟胃，吃两口就饱了',
    tasting: dimensions.tasting >= 80
      ? '美食评论家级别，一口就能吃出配方'
      : dimensions.tasting >= 50
        ? '对味道很挑剔，好吃难吃一口就知道'
        : dimensions.tasting >= 25
          ? '能分出好坏，但说不出所以然'
          : '味觉失灵，吃啥都一个味儿',
    cooking: dimensions.cooking >= 80
      ? '米其林大厨水平，在家开饭店'
      : dimensions.cooking >= 50
        ? '家常菜小能手，朋友圈厨神'
        : dimensions.cooking >= 25
          ? '能做熟，味道随缘'
          : '厨房杀手，泡方便面都能糊',
    exploring: dimensions.exploring >= 80
      ? '大众点评LV10，全城美食活地图'
      : dimensions.exploring >= 50
        ? '周末必探店，哪里新开去哪里'
        : dimensions.exploring >= 25
          ? '偶尔尝试新店，但更多是老地方'
          : '万年老三样，外卖只点那几家',
    spending: dimensions.spending >= 80
      ? '工资一半都花在吃上，月光是因为吃穷了'
      : dimensions.spending >= 50
        ? '在吃的方面从不亏待自己'
        : dimensions.spending >= 25
          ? '性价比优先，好吃不贵最好'
          : '能省则省，吃饱就行不讲究',
  }

  const foodRecommendations: string[] = []
  if (foodieIndex >= 60) {
    foodRecommendations.push('强烈推荐：尝试米其林星级餐厅，打开新世界的大门')
    foodRecommendations.push('去成都/重庆/广州来一场美食之旅')
    foodRecommendations.push('挑战一下吃辣极限')
  } else if (foodieIndex >= 30) {
    foodRecommendations.push('周末给自己做顿好的，生活需要仪式感')
    foodRecommendations.push('多尝试不同菜系，发现新的美味')
  } else {
    foodRecommendations.push('求求你了，按时吃饭对自己好一点')
    foodRecommendations.push('一日三餐是底线，健康最重要')
    foodRecommendations.push('尝试自己做饭，说不定能激发干饭之魂')
  }

  let foodieRank: string
  if (classification === 'god') foodieRank = '你已经超越了99.9%的人类，站在了干饭食物链的顶端'
  else if (classification === 'master') foodieRank = '全国前5%的顶级干饭人，朋友聚餐永远问你去哪吃'
  else if (classification === 'enthusiast') foodieRank = '合格的干饭人，美食圈的中坚力量'
  else if (classification === 'normal') foodieRank = '普通干饭人，和全国60%的人一样'
  else if (classification === 'survivor') foodieRank = '吃饭只是生存手段，距离真正的干饭还有距离'
  else foodieRank = '你是怎么活到现在的？修仙也不能不吃饭啊！'

  let riceBowlLevel: string
  if (foodieIndex >= 90) riceBowlLevel = '金饭碗'
  else if (foodieIndex >= 75) riceBowlLevel = '银饭碗'
  else if (foodieIndex >= 60) riceBowlLevel = '瓷饭碗'
  else if (foodieIndex >= 40) riceBowlLevel = '铁饭碗'
  else if (foodieIndex >= 20) riceBowlLevel = '纸饭碗'
  else riceBowlLevel = '没饭碗'

  return {
    rawScore,
    foodieIndex,
    classification,
    classificationEmoji: config.emoji,
    dimensions,
    title: `${config.emoji} ${config.name}`,
    description: config.desc,
    levelName: config.name,
    dimensionDescriptions,
    foodieQuotes: FOODIE_QUOTES.sort(() => Math.random() - 0.5).slice(0, 3),
    foodieRank,
    foodRecommendations,
    riceBowlLevel,
  }
}
