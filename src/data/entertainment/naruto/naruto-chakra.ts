import type { ProfessionalQuestion } from '../../../types'
import { CHAKRA_NATURES, KEKKEIGENKAI } from './naruto-common'

const chakraScenarios = [
  {
    text: '你的战斗风格更倾向于？',
    options: [
      { text: '正面猛攻，气势压倒一切', nature: 'fire' },
      { text: '防守反击，坚如磐石', nature: 'earth' },
      { text: '灵活多变，出其不意', nature: 'wind' },
      { text: '快速突袭，一击致命', nature: 'lightning' },
    ]
  },
  {
    text: '你解决问题的方式是？',
    options: [
      { text: '热情直接，燃烧激情', nature: 'fire' },
      { text: '冷静分析，顺势而为', nature: 'water' },
      { text: '稳扎稳打，步步为营', nature: 'earth' },
      { text: '创新思维，开辟新路', nature: 'wind' },
    ]
  },
  {
    text: '面对压力，你会？',
    options: [
      { text: '越挫越勇，斗志昂扬', nature: 'fire' },
      { text: '灵活应变，水滴石穿', nature: 'water' },
      { text: '坚定不移，稳如泰山', nature: 'earth' },
      { text: '冷静思考，寻找破绽', nature: 'yin' },
    ]
  },
  {
    text: '你的性格更接近？',
    options: [
      { text: '热情似火，活力四射', nature: 'fire' },
      { text: '温柔似水，包容万象', nature: 'water' },
      { text: '自由如风，无拘无束', nature: 'wind' },
      { text: '雷厉风行，说一不二', nature: 'lightning' },
    ]
  },
  {
    text: '你最喜欢的天气是？',
    options: [
      { text: '烈日炎炎的夏天', nature: 'fire' },
      { text: '细雨绵绵的雨天', nature: 'water' },
      { text: '大风呼啸的日子', nature: 'wind' },
      { text: '电闪雷鸣的雷雨天', nature: 'lightning' },
    ]
  },
  {
    text: '和人发生冲突时，你会？',
    options: [
      { text: '正面硬刚，绝不退让', nature: 'fire' },
      { text: '以柔克刚，化解矛盾', nature: 'water' },
      { text: '保持距离，冷静处理', nature: 'wind' },
      { text: '一针见血，直击要害', nature: 'lightning' },
    ]
  },
  {
    text: '你更喜欢哪种环境？',
    options: [
      { text: '火山温泉，温暖热烈', nature: 'fire' },
      { text: '江河湖海，自由自在', nature: 'water' },
      { text: '高山之巅，一览众山', nature: 'wind' },
      { text: '雷雨交加，震撼人心', nature: 'lightning' },
    ]
  },
  {
    text: '学习新东西时，你会？',
    options: [
      { text: '充满热情，全力以赴', nature: 'fire' },
      { text: '循序渐进，持之以恒', nature: 'water' },
      { text: '寻找技巧，事半功倍', nature: 'wind' },
      { text: '专注沉浸，废寝忘食', nature: 'yang' },
    ]
  },
  {
    text: '你对艺术的理解是？',
    options: [
      { text: '燃烧的瞬间就是艺术', nature: 'fire' },
      { text: '永恒的美才是艺术', nature: 'earth' },
      { text: '瞬间的爆炸就是艺术', nature: 'lightning' },
      { text: '流动的变化才是艺术', nature: 'water' },
    ]
  },
  {
    text: '面对敌人，你的第一反应是？',
    options: [
      { text: '直接冲上去战斗', nature: 'fire' },
      { text: '观察环境寻找机会', nature: 'wind' },
      { text: '构筑防御保护自己', nature: 'earth' },
      { text: '幻术干扰寻找破绽', nature: 'yin' },
    ]
  },
  {
    text: '你更擅长？',
    options: [
      { text: '鼓舞人心的演讲', nature: 'fire' },
      { text: '治愈他人的伤痛', nature: 'yang' },
      { text: '复杂的战略规划', nature: 'yin' },
      { text: '高强度的持久战', nature: 'earth' },
    ]
  },
  {
    text: '你的梦想更接近？',
    options: [
      { text: '成为最强的忍者', nature: 'fire' },
      { text: '保护所有重要的人', nature: 'yang' },
      { text: '看穿世间一切真理', nature: 'yin' },
      { text: '实现真正的和平', nature: 'water' },
    ]
  },
  {
    text: '面对谎言，你会？',
    options: [
      { text: '愤怒揭穿，毫不留情', nature: 'fire' },
      { text: '默默观察，秋后算账', nature: 'yin' },
      { text: '善意提醒，给予机会', nature: 'yang' },
      { text: '将计就计，反将一军', nature: 'water' },
    ]
  },
  {
    text: '你最看重一个人的什么品质？',
    options: [
      { text: '勇气和决心', nature: 'fire' },
      { text: '智慧和洞察力', nature: 'yin' },
      { text: '生命力和活力', nature: 'yang' },
      { text: '坚持和毅力', nature: 'earth' },
    ]
  },
  {
    text: '遇到挫折时，你会？',
    options: [
      { text: '越挫越勇，绝不认输', nature: 'fire' },
      { text: '调整策略，继续前进', nature: 'water' },
      { text: '休息一下，恢复元气', nature: 'yang' },
      { text: '反思原因，重新出发', nature: 'yin' },
    ]
  },
  {
    text: '你处理情绪的方式是？',
    options: [
      { text: '直接爆发，然后没事', nature: 'fire' },
      { text: '默默消化，自我调节', nature: 'earth' },
      { text: '找人倾诉，释放出来', nature: 'wind' },
      { text: '转化为动力，更加努力', nature: 'lightning' },
    ]
  },
  {
    text: '你对生命的看法是？',
    options: [
      { text: '燃烧自己，照亮他人', nature: 'fire' },
      { text: '生生不息，循环往复', nature: 'yang' },
      { text: '虚幻泡影，镜花水月', nature: 'yin' },
      { text: '上善若水，润物无声', nature: 'water' },
    ]
  },
  {
    text: '在团队中，你是？',
    options: [
      { text: '冲锋陷阵的先锋', nature: 'fire' },
      { text: '守护大家的盾', nature: 'earth' },
      { text: '治疗支援的后勤', nature: 'yang' },
      { text: '制定战术的大脑', nature: 'yin' },
    ]
  },
  {
    text: '你如何看待力量？',
    options: [
      { text: '用来保护重要的人', nature: 'yang' },
      { text: '用来贯彻自己的正义', nature: 'fire' },
      { text: '力量本身就是意义', nature: 'lightning' },
      { text: '力量需要被控制', nature: 'water' },
    ]
  },
  {
    text: '你最想拥有的能力是？',
    options: [
      { text: '烧毁一切的力量', nature: 'fire' },
      { text: '创造一切的生命力', nature: 'yang' },
      { text: '操控一切的精神力', nature: 'yin' },
      { text: '斩断一切的风之刃', nature: 'wind' },
    ]
  },
]

export const chakraQuestions: ProfessionalQuestion[] = chakraScenarios.map((scenario, index) => ({
  id: `chakra-${index + 1}`,
  text: scenario.text,
  type: 'single',
  difficulty: index < 7 ? 'easy' : index < 14 ? 'medium' : 'hard',
  options: scenario.options.map((option, optIndex) => {
    const weights: Record<string, number> = { [option.nature]: 5 }
    Object.keys(CHAKRA_NATURES).forEach(n => {
      if (n !== option.nature) weights[n] = Math.floor(Math.random() * 2)
    })
    return {
      id: `chakra-${index + 1}-${optIndex}`,
      text: option.text,
      value: 1,
      dimension: JSON.stringify(weights),
    }
  }),
}))

export function calculateChakraResult(answers: { dimension?: string }[]) {
  const natureScores: Record<string, number> = Object.fromEntries(
    Object.keys(CHAKRA_NATURES).map(n => [n, 0])
  )

  answers.forEach(answer => {
    if (answer.dimension) {
      try {
        const weights = JSON.parse(answer.dimension)
        Object.entries(weights).forEach(([nature, weight]) => {
          natureScores[nature] = (natureScores[nature] || 0) + (weight as number)
        })
      } catch (e) {
        console.error('查克拉性质计算错误:', e)
      }
    }
  })

  const sortedNatures = Object.entries(natureScores)
    .filter(([id]) => CHAKRA_NATURES[id as keyof typeof CHAKRA_NATURES])
    .sort((a, b) => b[1] - a[1])

  const primaryNatureId = sortedNatures[0][0] as keyof typeof CHAKRA_NATURES
  const secondaryNatureId = sortedNatures[1][0] as keyof typeof CHAKRA_NATURES

  const kekkeigenkaiList = Object.entries(KEKKEIGENKAI)
  const possibleKekkeigenkai = kekkeigenkaiList.find(([, k]) => {
    const natureNames = Object.values(CHAKRA_NATURES).map(n => n.name)
    const combines = k.combines.map(name => {
      const found = Object.entries(CHAKRA_NATURES).find(([, n]) => n.name === name)
      return found ? found[0] : null
    }).filter(Boolean)
    return combines.includes(primaryNatureId) && combines.includes(secondaryNatureId)
  })

  let kekkeigenkai: typeof KEKKEIGENKAI[keyof typeof KEKKEIGENKAI] | null = null
  if (possibleKekkeigenkai && Math.random() > 0.4) {
    kekkeigenkai = KEKKEIGENKAI[possibleKekkeigenkai[0] as keyof typeof KEKKEIGENKAI]
  }

  const totalScore = Object.values(natureScores).reduce((a, b) => a + b, 0)

  return {
    primaryNature: CHAKRA_NATURES[primaryNatureId],
    secondaryNature: CHAKRA_NATURES[secondaryNatureId],
    kekkeigenkai,
    natures: sortedNatures.slice(0, 5).map(([id, score]) => ({
      ...CHAKRA_NATURES[id as keyof typeof CHAKRA_NATURES],
      percentage: Math.round((score as number / totalScore) * 100),
    })),
  }
}
