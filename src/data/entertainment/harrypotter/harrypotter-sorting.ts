import type { ProfessionalQuestion } from '../../../types'
import { HOGWARTS_HOUSES } from './harrypotter-common'

const sortingScenarios = [
  {
    text: '你在禁林深处迷路了，天渐渐黑了，你会？',
    options: [
      { text: '拔出魔杖，勇敢地探索前进', house: 'gryffindor' },
      { text: '寻找捷径，用智慧尽快离开', house: 'ravenclaw' },
      { text: '发出信号，寻求同伴的帮助', house: 'hufflepuff' },
      { text: '利用环境，设下标记慢慢规划', house: 'slytherin' },
    ]
  },
  {
    text: '面对一个强大的对手，你会？',
    options: [
      { text: '正面迎战，绝不退缩', house: 'gryffindor' },
      { text: '分析弱点，寻找破绽', house: 'ravenclaw' },
      { text: '争取盟友，共同对抗', house: 'hufflepuff' },
      { text: '等待时机，一举制胜', house: 'slytherin' },
    ]
  },
  {
    text: '你的朋友被冤枉了，你会？',
    options: [
      { text: '挺身而出，为朋友作证', house: 'gryffindor' },
      { text: '找出证据，还朋友清白', house: 'ravenclaw' },
      { text: '陪伴朋友，给予支持', house: 'hufflepuff' },
      { text: '利用规则，巧妙化解', house: 'slytherin' },
    ]
  },
  {
    text: '面对重要的抉择，你更依赖？',
    options: [
      { text: '内心的勇气和直觉', house: 'gryffindor' },
      { text: '理性的分析和思考', house: 'ravenclaw' },
      { text: '他人的建议和感受', house: 'hufflepuff' },
      { text: '对目标的追求和野心', house: 'slytherin' },
    ]
  },
  {
    text: '你最看重一个人的什么品质？',
    options: [
      { text: '胆识气魄，见义勇为', house: 'gryffindor' },
      { text: '智慧博学，追求真理', house: 'ravenclaw' },
      { text: '忠诚可靠，正直善良', house: 'hufflepuff' },
      { text: '精明强干，雄心勃勃', house: 'slytherin' },
    ]
  },
  {
    text: '如果能拥有一种能力，你会选择？',
    options: [
      { text: '无畏的勇气', house: 'gryffindor' },
      { text: '无穷的智慧', house: 'ravenclaw' },
      { text: '真诚的友谊', house: 'hufflepuff' },
      { text: '强大的力量', house: 'slytherin' },
    ]
  },
  {
    text: '在团队项目中，你通常是？',
    options: [
      { text: '冲在前面的行动者', house: 'gryffindor' },
      { text: '出谋划策的智囊', house: 'ravenclaw' },
      { text: '凝聚团队的纽带', house: 'hufflepuff' },
      { text: '掌控全局的领袖', house: 'slytherin' },
    ]
  },
  {
    text: '遇到困难时，你会？',
    options: [
      { text: '越挫越勇，坚持到底', house: 'gryffindor' },
      { text: '另辟蹊径，寻找方法', house: 'ravenclaw' },
      { text: '踏实努力，逐步解决', house: 'hufflepuff' },
      { text: '审时度势，曲线救国', house: 'slytherin' },
    ]
  },
  {
    text: '你认为成功最重要的是？',
    options: [
      { text: '勇气和坚持', house: 'gryffindor' },
      { text: '智慧和创造力', house: 'ravenclaw' },
      { text: '勤奋和正直', house: 'hufflepuff' },
      { text: '野心和谋略', house: 'slytherin' },
    ]
  },
  {
    text: '面对不公平的事情，你会？',
    options: [
      { text: '直接站出来反抗', house: 'gryffindor' },
      { text: '用智慧寻求改变', house: 'ravenclaw' },
      { text: '默默帮助受害者', house: 'hufflepuff' },
      { text: '利用规则争取权益', house: 'slytherin' },
    ]
  },
  {
    text: '你对冒险的态度是？',
    options: [
      { text: '迫不及待，充满期待', house: 'gryffindor' },
      { text: '好奇探索，求知欲强', house: 'ravenclaw' },
      { text: '谨慎但愿意尝试', house: 'hufflepuff' },
      { text: '计算风险，追求回报', house: 'slytherin' },
    ]
  },
  {
    text: '你如何看待规则？',
    options: [
      { text: '不合理的就该打破', house: 'gryffindor' },
      { text: '规则是用来思考的', house: 'ravenclaw' },
      { text: '应该共同遵守维护', house: 'hufflepuff' },
      { text: '规则是用来利用的', house: 'slytherin' },
    ]
  },
  {
    text: '你最害怕的是？',
    options: [
      { text: '懦弱和失败', house: 'gryffindor' },
      { text: '无知和愚昧', house: 'ravenclaw' },
      { text: '孤独和背叛', house: 'hufflepuff' },
      { text: '平庸和无力', house: 'slytherin' },
    ]
  },
  {
    text: '你最引以为傲的是？',
    options: [
      { text: '过人的勇气', house: 'gryffindor' },
      { text: '独特的智慧', house: 'hufflepuff' },
      { text: '珍贵的友谊', house: 'ravenclaw' },
      { text: '非凡的成就', house: 'slytherin' },
    ]
  },
  {
    text: '别人遇到困难时，你会？',
    options: [
      { text: '立刻伸出援手', house: 'gryffindor' },
      { text: '帮他想出办法', house: 'ravenclaw' },
      { text: '耐心陪伴安慰', house: 'hufflepuff' },
      { text: '教他如何强大', house: 'slytherin' },
    ]
  },
  {
    text: '你更喜欢怎样的环境？',
    options: [
      { text: '热闹刺激，充满挑战', house: 'gryffindor' },
      { text: '安静自由，思想碰撞', house: 'ravenclaw' },
      { text: '温暖和谐，互帮互助', house: 'hufflepuff' },
      { text: '精英荟萃，竞争向上', house: 'slytherin' },
    ]
  },
  {
    text: '你处理问题的方式是？',
    options: [
      { text: '直接面对，速战速决', house: 'gryffindor' },
      { text: '深入分析，从根源解决', house: 'ravenclaw' },
      { text: '稳步推进，力求周全', house: 'hufflepuff' },
      { text: '运筹帷幄，掌控全局', house: 'slytherin' },
    ]
  },
  {
    text: '你对荣誉的看法是？',
    options: [
      { text: '值得用生命捍卫', house: 'gryffindor' },
      { text: '是智慧的副产品', house: 'ravenclaw' },
      { text: '集体荣誉高于一切', house: 'hufflepuff' },
      { text: '是成功的证明', house: 'slytherin' },
    ]
  },
  {
    text: '面对未知，你会？',
    options: [
      { text: '勇往直前，无所畏惧', house: 'gryffindor' },
      { text: '好奇探索，求知若渴', house: 'ravenclaw' },
      { text: '谨慎前进，步步为营', house: 'hufflepuff' },
      { text: '准备充分，伺机而动', house: 'slytherin' },
    ]
  },
  {
    text: '在压力下，你会？',
    options: [
      { text: '更加勇敢坚定', house: 'gryffindor' },
      { text: '更加冷静思考', house: 'ravenclaw' },
      { text: '寻求支持鼓励', house: 'hufflepuff' },
      { text: '激发更大野心', house: 'slytherin' },
    ]
  },
  {
    text: '你最向往的是？',
    options: [
      { text: '成为英雄', house: 'gryffindor' },
      { text: '成为智者', house: 'ravenclaw' },
      { text: '拥有幸福家庭', house: 'hufflepuff' },
      { text: '成为伟大领袖', house: 'slytherin' },
    ]
  },
  {
    text: '你如何看待传统？',
    options: [
      { text: '值得尊重但可突破', house: 'gryffindor' },
      { text: '需要批判和创新', house: 'ravenclaw' },
      { text: '需要守护和传承', house: 'hufflepuff' },
      { text: '可以利用和改造', house: 'slytherin' },
    ]
  },
  {
    text: '你对谎言的看法是？',
    options: [
      { text: '绝不可以接受', house: 'gryffindor' },
      { text: '看是否接近真理', house: 'ravenclaw' },
      { text: '伤害他人就不行', house: 'hufflepuff' },
      { text: '必要时可以使用', house: 'slytherin' },
    ]
  },
  {
    text: '你最喜欢的课程是？',
    options: [
      { text: '黑魔法防御术', house: 'gryffindor' },
      { text: '魔咒学', house: 'ravenclaw' },
      { text: '草药学', house: 'hufflepuff' },
      { text: '魔药学', house: 'slytherin' },
    ]
  },
  {
    text: '你最想去哪里探险？',
    options: [
      { text: '禁林深处', house: 'gryffindor' },
      { text: '有求必应屋', house: 'ravenclaw' },
      { text: '霍格莫德', house: 'hufflepuff' },
      { text: '斯莱特林密室', house: 'slytherin' },
    ]
  },
  {
    text: '你最喜欢的魔法生物是？',
    options: [
      { text: '凤凰', house: 'gryffindor' },
      { text: '鹰头马身有翼兽', house: 'ravenclaw' },
      { text: '嗅嗅', house: 'hufflepuff' },
      { text: '蛇', house: 'slytherin' },
    ]
  },
  {
    text: '你最喜欢的魁地奇位置是？',
    options: [
      { text: '找球手 - 万众瞩目', house: 'gryffindor' },
      { text: '追球手 - 策略配合', house: 'ravenclaw' },
      { text: '守门员 - 忠诚守护', house: 'hufflepuff' },
      { text: '击球手 - 掌控节奏', house: 'slytherin' },
    ]
  },
  {
    text: '你对死亡的看法是？',
    options: [
      { text: '是另一场伟大的冒险', house: 'gryffindor' },
      { text: '是终极的谜团', house: 'ravenclaw' },
      { text: '是自然的归宿', house: 'hufflepuff' },
      { text: '是需要征服的敌人', house: 'slytherin' },
    ]
  },
  {
    text: '你相信命运吗？',
    options: [
      { text: '我自己创造命运', house: 'gryffindor' },
      { text: '命运等待被发现', house: 'ravenclaw' },
      { text: '命运自有安排', house: 'hufflepuff' },
      { text: '命运可以被操控', house: 'slytherin' },
    ]
  },
  {
    text: '分院帽说你很难分类，你会？',
    options: [
      { text: '让它看到我的勇气！', house: 'gryffindor' },
      { text: '好奇它为什么犹豫', house: 'ravenclaw' },
      { text: '接受任何决定', house: 'hufflepuff' },
      { text: '和它谈判争取最好的', house: 'slytherin' },
    ]
  },
  {
    text: '毕业以后你想？',
    options: [
      { text: '傲罗 - 追捕黑巫师', house: 'gryffindor' },
      { text: '霍格沃茨教授', house: 'ravenclaw' },
      { text: '神奇动物学家', house: 'hufflepuff' },
      { text: '魔法部高官', house: 'slytherin' },
    ]
  },
  {
    text: '你发现了一个秘密房间，你会？',
    options: [
      { text: '立刻进去一探究竟', house: 'gryffindor' },
      { text: '研究它的历史和秘密', house: 'ravenclaw' },
      { text: '叫上朋友一起探索', house: 'hufflepuff' },
      { text: '独占它，为我所用', house: 'slytherin' },
    ]
  },
  {
    text: '你更喜欢哪种学习方式？',
    options: [
      { text: '实践中学习', house: 'gryffindor' },
      { text: '阅读和思考', house: 'ravenclaw' },
      { text: '和朋友讨论', house: 'hufflepuff' },
      { text: '设定目标超越他人', house: 'slytherin' },
    ]
  },
  {
    text: '周末你更喜欢？',
    options: [
      { text: '去探险或运动', house: 'gryffindor' },
      { text: '在图书馆看书', house: 'ravenclaw' },
      { text: '和朋友聚会', house: 'hufflepuff' },
      { text: '为目标而努力', house: 'slytherin' },
    ]
  },
  {
    text: '你更愿意和什么样的人交朋友？',
    options: [
      { text: '勇敢正直的人', house: 'gryffindor' },
      { text: '聪明有趣的人', house: 'ravenclaw' },
      { text: '忠诚可靠的人', house: 'hufflepuff' },
      { text: '有野心有能力的人', house: 'slytherin' },
    ]
  },
  {
    text: '你觉得自己最大的优点是？',
    options: [
      { text: '勇敢无畏', house: 'gryffindor' },
      { text: '智慧过人', house: 'ravenclaw' },
      { text: '善良真诚', house: 'hufflepuff' },
      { text: '雄心勃勃', house: 'slytherin' },
    ]
  },
  {
    text: '你更擅长？',
    options: [
      { text: '鼓舞人心的行动', house: 'gryffindor' },
      { text: '创造性的思考', house: 'ravenclaw' },
      { text: '默默的付出', house: 'hufflepuff' },
      { text: '谋略和规划', house: 'slytherin' },
    ]
  },
  {
    text: '你最喜欢什么颜色？',
    options: [
      { text: '火焰般的红色', house: 'gryffindor' },
      { text: '深邃的蓝色', house: 'ravenclaw' },
      { text: '温暖的金黄色', house: 'hufflepuff' },
      { text: '神秘的墨绿色', house: 'slytherin' },
    ]
  },
  {
    text: '你最喜欢哪个季节？',
    options: [
      { text: '夏天 - 热情奔放', house: 'gryffindor' },
      { text: '秋天 - 诗意深沉', house: 'ravenclaw' },
      { text: '春天 - 万物复苏', house: 'hufflepuff' },
      { text: '冬天 - 冷静威严', house: 'slytherin' },
    ]
  },
  {
    text: '一天中你最喜欢的时间是？',
    options: [
      { text: '黎明 - 新的开始', house: 'gryffindor' },
      { text: '黄昏 - 思考的时刻', house: 'ravenclaw' },
      { text: '午后 - 温暖惬意', house: 'hufflepuff' },
      { text: '深夜 - 神秘宁静', house: 'slytherin' },
    ]
  },
  {
    text: '你最想拥有的魔法物品是？',
    options: [
      { text: '隐形衣 - 行侠仗义', house: 'gryffindor' },
      { text: '拉文克劳的冠冕', house: 'ravenclaw' },
      { text: '赫奇帕奇的金杯', house: 'hufflepuff' },
      { text: '斯莱特林的挂坠盒', house: 'slytherin' },
    ]
  },
  {
    text: '你最想改变的是？',
    options: [
      { text: '自己的命运', house: 'gryffindor' },
      { text: '人类的无知', house: 'ravenclaw' },
      { text: '人们的痛苦', house: 'hufflepuff' },
      { text: '世界的规则', house: 'slytherin' },
    ]
  },
  {
    text: '你最喜欢的甜品是？',
    options: [
      { text: '滋滋蜜蜂糖 - 充满活力', house: 'gryffindor' },
      { text: '巧克力蛙 - 收集巫师卡', house: 'ravenclaw' },
      { text: '黄油啤酒 - 与朋友分享', house: 'hufflepuff' },
      { text: '蟑螂堆 - 独特的品味', house: 'slytherin' },
    ]
  },
  {
    text: '你更喜欢哪种天气？',
    options: [
      { text: '雷雨天 - 惊心动魄', house: 'gryffindor' },
      { text: '微风天 - 适合思考', house: 'ravenclaw' },
      { text: '晴天 - 心情愉悦', house: 'hufflepuff' },
      { text: '雪天 - 冷静神秘', house: 'slytherin' },
    ]
  },
  {
    text: '你对爱情的看法是？',
    options: [
      { text: '轰轰烈烈，为爱牺牲', house: 'gryffindor' },
      { text: '灵魂伴侣，心灵相通', house: 'ravenclaw' },
      { text: '细水长流，相濡以沫', house: 'hufflepuff' },
      { text: '强强联合，互相成就', house: 'slytherin' },
    ]
  },
]

export const sortingHatQuestions: ProfessionalQuestion[] = sortingScenarios.map((scenario, index) => ({
  id: `sorting-${index + 1}`,
  text: scenario.text,
  type: 'single',
  difficulty: index < 15 ? 'easy' : index < 30 ? 'medium' : 'hard',
  options: scenario.options.map((option, optIndex) => {
    const weights: Record<string, number> = { [option.house]: 5 }
    const houses = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']
    houses.forEach(h => {
      if (h !== option.house) weights[h] = Math.floor(Math.random() * 2)
    })
    return {
      id: `sorting-${index + 1}-${optIndex}`,
      text: option.text,
      value: 1,
      dimension: JSON.stringify(weights),
    }
  }),
}))

export function calculateHouseResult(answers: { dimension?: string }[]) {
  const houseScores: Record<string, number> = {
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0,
  }

  answers.forEach(answer => {
    if (answer.dimension) {
      try {
        const weights = JSON.parse(answer.dimension)
        Object.entries(weights).forEach(([house, weight]) => {
          houseScores[house] += weight as number
        })
      } catch (e) {
        console.error('评分计算错误:', e)
      }
    }
  })

  const sortedHouses = Object.entries(houseScores)
    .sort((a, b) => b[1] - a[1])
  
  const primaryHouse = sortedHouses[0][0] as keyof typeof HOGWARTS_HOUSES
  const secondaryHouse = sortedHouses[1][0] as keyof typeof HOGWARTS_HOUSES

  const totalScore = Object.values(houseScores).reduce((a, b) => a + b, 0)
  const percentages = Object.fromEntries(
    Object.entries(houseScores).map(([h, s]) => [h, Math.round((s / totalScore) * 100)])
  )

  return {
    primaryHouse: HOGWARTS_HOUSES[primaryHouse],
    secondaryHouse: HOGWARTS_HOUSES[secondaryHouse],
    percentages,
    hatMessage: generateHatMessage(primaryHouse, percentages),
  }
}

function generateHatMessage(house: string, percentages: Record<string, number>) {
  const messages = {
    gryffindor: [
      '嗯...很有勇气，没错，骨子里透着胆识。很好，格兰芬多！',
      '我看到了，一颗勇敢的心，还有舍己为人的气魄。去格兰芬多！',
      '你想不想去斯莱特林？不？好吧，你注定属于格兰芬多！',
    ],
    slytherin: [
      '啊哈，狡猾的小家伙，有野心，还懂权谋。斯莱特林会帮你走向辉煌！',
      '精明，非常精明，还有对荣誉的渴望。斯莱特林！',
      '你有成为伟人的潜质，斯莱特林会帮助你达到巅峰。',
    ],
    ravenclaw: [
      '聪明的孩子，非常聪明，还有一颗求知若渴的心。拉文克劳！',
      '睿智博学，思想独到，你会在拉文克劳找到志同道合的朋友。',
      '嗯，头脑精明，智慧过人，毫无疑问，拉文克劳！',
    ],
    hufflepuff: [
      '善良的灵魂，忠诚可靠，还有勤奋的品质。赫奇帕奇！',
      '我看到了，一颗正直的心，还有耐心和毅力。赫奇帕奇！',
      '坚忍诚实，不畏艰辛，你就是赫奇帕奇的一员。',
    ],
  }
  
  const houseMessages = messages[house as keyof typeof messages]
  return houseMessages[Math.floor(Math.random() * houseMessages.length)]
}
