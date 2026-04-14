import type { ProfessionalQuestion } from '../../../types'
import { PATRONUSES } from './harrypotter-common'

const patronusScenarios = [
  { text: '你最快乐的记忆是什么？' },
  { text: '面对摄魂怪，你最先想到的是？' },
  { text: '你想守护的人是谁？' },
  { text: '你心中最温暖的地方是？' },
  { text: '你的童年最难忘的是？' },
  { text: '你最喜欢的动物类型是？' },
  { text: '你面对恐惧时会？' },
  { text: '你认为守护最重要的是？' },
  { text: '你的内心最像哪种动物？' },
  { text: '你最想拥有什么品质？' },
  { text: '你在朋友眼中是？' },
  { text: '你如何表达爱意？' },
  { text: '你最引以为傲的是？' },
  { text: '你对家的定义是？' },
  { text: '你最珍惜的东西是？' },
  { text: '你的理想是成为？' },
  { text: '你对希望的理解是？' },
  { text: '危难时刻，你会？' },
  { text: '你最难忘的成就是？' },
  { text: '你觉得幸福是什么？' },
  { text: '你最喜欢的自然环境是？' },
  { text: '你对友情最看重的是？' },
  { text: '你处理悲伤的方式是？' },
  { text: '你认为勇气是什么？' },
  { text: '你最想留给世界的是？' },
]

export const patronusQuestions: ProfessionalQuestion[] = patronusScenarios.map((scenario, index) => ({
  id: `patronus-${index + 1}`,
  text: scenario.text,
  type: 'single',
  difficulty: index < 8 ? 'easy' : index < 17 ? 'medium' : 'hard',
  options: PATRONUSES.slice(0, 5).map((patronus, optIndex) => ({
    id: `patronus-${index + 1}-${optIndex}`,
    text: patronus.name,
    value: 1,
    dimension: patronus.id,
  })),
}))

export function calculatePatronusResult(answers: { dimension?: string }[]) {
  const scores: Record<string, number> = {}
  
  answers.forEach(answer => {
    if (answer.dimension) {
      scores[answer.dimension] = (scores[answer.dimension] || 0) + 1
    }
  })

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const patronusId = sorted[0]?.[0] || 'stag'
  
  const patronus = PATRONUSES.find(p => p.id === patronusId) || PATRONUSES[0]
  
  const rarityStars = {
    '普通': '⭐',
    '稀有': '⭐⭐⭐',
    '传说': '⭐⭐⭐⭐⭐',
  }

  return {
    patronus,
    rarityStars: rarityStars[patronus.rarity as keyof typeof rarityStars] || '⭐',
    meaning: generatePatronusMeaning(patronus.id),
    memoryTip: generateMemoryTip(patronus.id),
  }
}

function generatePatronusMeaning(patronusId: string) {
  const meanings: Record<string, string> = {
    stag: '你的守护神是牡鹿，象征着纯洁与力量。如同哈利·波特的守护神一样，你拥有一颗勇敢、纯净、充满爱的心。',
    otter: '你的守护神是水獭，象征着快乐与友谊。就像赫敏一样，你聪明、忠诚，总能给身边的人带来欢乐。',
    jack_russell: '你的守护神是杰克罗素梗，象征着忠诚与勇敢。如同罗恩一样，你是朋友最可靠的伙伴。',
    doe: '你的守护神是牝鹿，象征着永恒的爱。如同莉莉·波特和斯内普教授的守护神一样，你心中藏着深沉而永恒的爱。',
    wolf: '你的守护神是狼，象征着保护与团结。你天生具有领袖气质，愿意用生命保护自己的家人和朋友。',
    phoenix: '恭喜！你的守护神是凤凰——传说中的终极守护！这是最稀有的守护神形态，象征着重生与希望。',
    cat: '你的守护神是猫，神秘而独立。你聪明机敏，喜欢独处，但在关键时刻总能展现出惊人的力量。',
    fox: '你的守护神是狐狸，智慧与机敏的化身。你善于思考，总能在困境中找到出路。',
    horse: '你的守护神是马，自由与力量的化身。你热爱自由，追求真理，勇往直前。',
    dragon: '恭喜！你的守护神是龙——传说级的守护神！你拥有强大的内心和非凡的勇气。',
  }
  return meanings[patronusId] || '你的守护神是独一无二的，象征着你独特的灵魂。'
}

function generateMemoryTip(patronusId: string) {
  const tips: Record<string, string[]> = {
    stag: ['想起你第一次战胜困难的时刻', '回忆你保护他人的瞬间', '想象与最重要的人重逢的场景'],
    otter: ['回忆和朋友们欢笑的时光', '想起解开一个难题的喜悦', '想象一次愉快的冒险之旅'],
    jack_russell: ['想起和挚友一起做傻事的日子', '回忆一次成功的恶作剧', '想象一顿丰盛的家庭晚餐'],
    doe: ['回忆母亲温柔的呼唤', '想起你默默守护一个人的时刻', '想象永远不会逝去的爱'],
    wolf: ['想起家人团聚的温暖', '回忆带领团队取得胜利的时刻', '想象森林中自由奔跑的感觉'],
    phoenix: ['想起从绝境中重生的时刻', '回忆点燃他人希望的瞬间', '想象在烈火中涅槃重生'],
    cat: ['回忆一个安静的午后', '想起被人理解的瞬间', '想象在月光下独自漫步'],
    fox: ['想起用智慧解决问题的时刻', '回忆一次巧妙的逃脱', '想象在森林中探索未知'],
    horse: ['回忆第一次独立完成某事的时刻', '想起在草原上奔跑的感觉', '想象无拘无束的自由'],
    dragon: ['想起克服内心恐惧的时刻', '回忆掌控局面的成就感', '想象驾驭风暴的力量'],
  }
  const tipList = tips[patronusId] || tips['stag']
  return tipList[Math.floor(Math.random() * tipList.length)]
}
