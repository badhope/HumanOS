import type { ProfessionalQuestion } from '../../../types'
import { NARUTO_CHARACTERS, RANKS, VILLAGES } from './naruto-common'

const nindoScenarios = [
  {
    text: '面对强大的敌人，你的同伴都倒下了，你会？',
    options: [
      { text: '就算死也要站着战斗，绝不放弃！', character: 'naruto' },
      { text: '寻找敌人的破绽，用智慧取胜', character: 'shikamaru' },
      { text: '为了守护重要的人，觉醒隐藏的力量', character: 'hinata' },
      { text: '不择手段获得力量，哪怕堕入黑暗', character: 'sasuke' },
    ]
  },
  {
    text: '你的同伴背叛了村子，你会？',
    options: [
      { text: '就算追到天涯海角也要把他带回来', character: 'naruto' },
      { text: '理解他的苦衷，但默默守护村子', character: 'itachi' },
      { text: '按照规则处置，绝不徇私情', character: 'kakashi' },
      { text: '一起离开，寻找真正的正义', character: 'obito' },
    ]
  },
  {
    text: '关于梦想，你的看法是？',
    options: [
      { text: '说到做到，永不放弃', character: 'naruto' },
      { text: '梦想什么的，太麻烦了', character: 'shikamaru' },
      { text: '为了梦想可以牺牲一切', character: 'madara' },
      { text: '默默守护所爱之人的梦想', character: 'hinata' },
    ]
  },
  {
    text: '面对孤独，你会？',
    options: [
      { text: '努力变强，直到得到大家认可', character: 'naruto' },
      { text: '享受孤独，用力量证明自己', character: 'gaara' },
      { text: '用面具伪装自己', character: 'kakashi' },
      { text: '憎恨这个世界', character: 'obito' },
    ]
  },
  {
    text: '关于力量，你的看法是？',
    options: [
      { text: '用来守护最重要的人', character: 'naruto' },
      { text: '力量就是一切，弱者没有资格说话', character: 'sasuke' },
      { text: '力量是守护和平的工具', character: 'hashirama' },
      { text: '力量是艺术，是爆炸的瞬间', character: 'deidara' },
    ]
  },
  {
    text: '在团队中，你更愿意？',
    options: [
      { text: '冲在最前面，保护大家', character: 'naruto' },
      { text: '幕后指挥，制定战术', character: 'shikamaru' },
      { text: '治疗大家的伤势', character: 'sakura' },
      { text: '一个人完成任务', character: 'itachi' },
    ]
  },
  {
    text: '关于和平，你的理解是？',
    options: [
      { text: '人与人互相理解的那一天一定会到来', character: 'naruto' },
      { text: '只有力量才能带来真正的和平', character: 'madara' },
      { text: '和平需要有人做出牺牲', character: 'itachi' },
      { text: '用幻术创造永恒的梦境', character: 'obito' },
    ]
  },
  {
    text: '面对憎恨，你会？',
    options: [
      { text: '用爱去化解', character: 'naruto' },
      { text: '憎恨孕育憎恨，周而复始', character: 'hashirama' },
      { text: '成为憎恨的顶点', character: 'sasuke' },
      { text: '用憎恨实现和平', character: 'pain' },
    ]
  },
  {
    text: '关于家族和村子，你会选择？',
    options: [
      { text: '村子高于一切，哪怕牺牲家族', character: 'itachi' },
      { text: '家族荣誉最重要', character: 'madara' },
      { text: '两者都要守护', character: 'shisui' },
      { text: '为了家人可以毁灭一切', character: 'gaara' },
    ]
  },
  {
    text: '面对失败，你会？',
    options: [
      { text: '爬起来，再试一次！', character: 'naruto' },
      { text: '分析失败原因，下次再战', character: 'shikamaru' },
      { text: '失败意味着需要更强的力量', character: 'sasuke' },
      { text: '接受失败，继续守护', character: 'kakashi' },
    ]
  },
  {
    text: '关于老师，你的态度是？',
    options: [
      { text: '老师的意志由我继承', character: 'naruto' },
      { text: '超越老师，证明自己', character: 'sasuke' },
      { text: '尊敬但不盲从', character: 'sakura' },
      { text: '老师是我唯一的救赎', character: 'nagato' },
    ]
  },
  {
    text: '关于天才和努力，你相信？',
    options: [
      { text: '努力可以超越天才', character: 'naruto' },
      { text: '天才的世界凡人不懂', character: 'itachi' },
      { text: '没有天赋再努力也没用', character: 'lee' },
      { text: 'IQ就是一切', character: 'shikamaru' },
    ]
  },
  {
    text: '关于爱情，你的看法是？',
    options: [
      { text: '默默守护，直到他看到我', character: 'hinata' },
      { text: '爱情只会影响我拔剑的速度', character: 'sasuke' },
      { text: '爱可以改变一个人', character: 'naruto' },
      { text: '为了爱可以毁灭世界', character: 'obito' },
    ]
  },
  {
    text: '关于规则，你会？',
    options: [
      { text: '为了同伴可以打破规则', character: 'kakashi' },
      { text: '规则是必须遵守的', character: 'neji' },
      { text: '规则是用来打破的', character: 'naruto' },
      { text: '利用规则达成目的', character: 'shikamaru' },
    ]
  },
  {
    text: '如果可以选择，你希望自己是？',
    options: [
      { text: '大家都认可的英雄', character: 'naruto' },
      { text: '黑暗中的无名守护者', character: 'itachi' },
      { text: '平凡的忍者，和家人在一起', character: 'shikamaru' },
      { text: '最强的传说', character: 'madara' },
    ]
  },
  {
    text: '关于宿命，你相信？',
    options: [
      { text: '我命由我不由天', character: 'naruto' },
      { text: '宿命是可以改变的', character: 'hinata' },
      { text: '有些命运无法抗拒', character: 'neji' },
      { text: '我就是命运', character: 'madara' },
    ]
  },
  {
    text: '面对痛苦，你会？',
    options: [
      { text: '把痛苦变成前进的动力', character: 'naruto' },
      { text: '理解痛苦，才能真正成长', character: 'jiraiya' },
      { text: '让世界感受同样的痛苦', character: 'pain' },
      { text: '独自承受一切', character: 'itachi' },
    ]
  },
  {
    text: '关于友情，你认为？',
    options: [
      { text: '斩断友情也在所不惜', character: 'sasuke' },
      { text: '友情是最珍贵的羁绊', character: 'naruto' },
      { text: '真正的朋友不需要太多', character: 'shikamaru' },
      { text: '友情是奢侈的东西', character: 'gaara' },
    ]
  },
  {
    text: '关于正义，你的理解是？',
    options: [
      { text: '胜者即是正义', character: 'madara' },
      { text: '守护就是正义', character: 'kakashi' },
      { text: '大多数人的正义', character: 'itachi' },
      { text: '我来定义正义', character: 'sasuke' },
    ]
  },
  {
    text: '如果时间可以重来，你会？',
    options: [
      { text: '做出同样的选择', character: 'itachi' },
      { text: '早点对她说出那句话', character: 'obito' },
      { text: '不浪费青春在无用的事情上', character: 'shikamaru' },
      { text: '还会走同样的忍道', character: 'naruto' },
    ]
  },
  {
    text: '关于死亡，你的看法是？',
    options: [
      { text: '死得其所，重于泰山', character: 'jiraiya' },
      { text: '死亡是另一种开始', character: 'obito' },
      { text: '只要不忘记就不算真正死去', character: 'naruto' },
      { text: '死亡就是一切的终结', character: 'madara' },
    ]
  },
  {
    text: '在村子里，你更想成为？',
    options: [
      { text: '火影，守护大家', character: 'naruto' },
      { text: '参谋，运筹帷幄', character: 'shikamaru' },
      { text: '暗部，执行秘密任务', character: 'itachi' },
      { text: '医疗忍者，救死扶伤', character: 'tsunade' },
    ]
  },
  {
    text: '关于仇恨，你会？',
    options: [
      { text: '放下仇恨，选择原谅', character: 'naruto' },
      { text: '血债血偿', character: 'sasuke' },
      { text: '仇恨是愚蠢的', character: 'hashirama' },
      { text: '利用仇恨达成目的', character: 'madara' },
    ]
  },
  {
    text: '面对批评，你会？',
    options: [
      { text: '用行动证明自己', character: 'naruto' },
      { text: '虚心接受，默默改进', character: 'lee' },
      { text: '不屑一顾，我行我素', character: 'sasuke' },
      { text: '表面接受，心里记着', character: 'shikamaru' },
    ]
  },
  {
    text: '关于天赋，你认为？',
    options: [
      { text: '努力比天赋更重要', character: 'lee' },
      { text: '天赋决定上限', character: 'neji' },
      { text: '没有天赋就别当忍者', character: 'sasuke' },
      { text: '天赋是诅咒也是祝福', character: 'itachi' },
    ]
  },
  {
    text: '关于承诺，你会？',
    options: [
      { text: '说到做到，绝不食言', character: 'naruto' },
      { text: '视情况而定', character: 'shikamaru' },
      { text: '承诺是弱者的枷锁', character: 'madara' },
      { text: '用生命守护承诺', character: 'jiraiya' },
    ]
  },
  {
    text: '面对歧视，你会？',
    options: [
      { text: '用实力证明自己', character: 'naruto' },
      { text: '默默承受，等待时机', character: 'hinata' },
      { text: '憎恨歧视我的人', character: 'gaara' },
      { text: '歧视别人就是歧视自己', character: 'hashirama' },
    ]
  },
  {
    text: '关于理想和现实，你会？',
    options: [
      { text: '坚持理想，改变现实', character: 'naruto' },
      { text: '接受现实，放弃理想', character: 'shikamaru' },
      { text: '创造一个理想的世界', character: 'obito' },
      { text: '理想就是现实，由我定义', character: 'madara' },
    ]
  },
  {
    text: '关于信任，你认为？',
    options: [
      { text: '相信同伴', character: 'naruto' },
      { text: '信任但保持距离', character: 'kakashi' },
      { text: '除了自己谁也不信', character: 'sasuke' },
      { text: '信任是相互的', character: 'shikamaru' },
    ]
  },
  {
    text: '关于牺牲，你的看法是？',
    options: [
      { text: '为了大义可以牺牲', character: 'itachi' },
      { text: '谁也不能牺牲', character: 'naruto' },
      { text: '牺牲是必要的恶', character: 'danzo' },
      { text: '用我的牺牲换取大家的幸福', character: 'obito' },
    ]
  },
  {
    text: '关于骄傲，你会？',
    options: [
      { text: '为自己的家族骄傲', character: 'neji' },
      { text: '为自己的忍道骄傲', character: 'lee' },
      { text: '骄傲使人落后', character: 'kakashi' },
      { text: '我就是骄傲本身', character: 'madara' },
    ]
  },
  {
    text: '关于成长，你认为最重要的是？',
    options: [
      { text: '永不放弃的心', character: 'naruto' },
      { text: '智慧和经验', character: 'shikamaru' },
      { text: '绝对的力量', character: 'sasuke' },
      { text: '爱和被爱', character: 'hinata' },
    ]
  },
  {
    text: '如果你拥有尾兽的力量，你会？',
    options: [
      { text: '用它保护村子', character: 'naruto' },
      { text: '控制它，成为最强', character: 'sasuke' },
      { text: '害怕这份力量', character: 'gaara' },
      { text: '利用它实现月之眼', character: 'obito' },
    ]
  },
  {
    text: '关于过去，你会？',
    options: [
      { text: '忘记过去，展望未来', character: 'naruto' },
      { text: '活在过去的悔恨中', character: 'obito' },
      { text: '从过去学习', character: 'hashirama' },
      { text: '过去成就了今天的我', character: 'itachi' },
    ]
  },
  {
    text: '关于未来，你希望？',
    options: [
      { text: '孩子能生活在和平的世界', character: 'naruto' },
      { text: '成为传说被后人铭记', character: 'madara' },
      { text: '平静地度过一生', character: 'shikamaru' },
      { text: '未来怎样都无所谓', character: 'sasuke' },
    ]
  },
  {
    text: '面对选择，你会？',
    options: [
      { text: '听从内心的声音', character: 'naruto' },
      { text: '理性分析利弊', character: 'shikamaru' },
      { text: '选择最强的道路', character: 'sasuke' },
      { text: '选择对大家最好的', character: 'kakashi' },
    ]
  },
  {
    text: '关于战争，你认为？',
    options: [
      { text: '战争没有胜利者', character: 'hashirama' },
      { text: '战争是必要的恶', character: 'madara' },
      { text: '为了和平可以接受战争', character: 'obito' },
      { text: '不惜一切代价避免战争', character: 'naruto' },
    ]
  },
  {
    text: '如果可以拥有一种能力，你会选择？',
    options: [
      { text: '让所有人都认可我的力量', character: 'naruto' },
      { text: '看穿一切的眼睛', character: 'itachi' },
      { text: '治愈一切伤痛的医疗忍术', character: 'sakura' },
      { text: '改写过去的写轮眼', character: 'obito' },
    ]
  },
  {
    text: '你的忍道是什么？',
    options: [
      { text: '说到做到，永不放弃！', character: 'naruto' },
      { text: '为了守护所爱的人', character: 'hinata' },
      { text: '在黑暗中守护光明', character: 'itachi' },
      { text: '真正的和平需要力量', character: 'madara' },
    ]
  },
  {
    text: '临死前，你想说的话是？',
    options: [
      { text: '我的故事还没有结束！', character: 'naruto' },
      { text: '原谅我，这是最后一次了', character: 'itachi' },
      { text: '自来也豪杰物语...就此落幕', character: 'jiraiya' },
      { text: '这个世界怎样都无所谓了', character: 'obito' },
    ]
  },
]

export const nindoQuestions: ProfessionalQuestion[] = nindoScenarios.map((scenario, index) => ({
  id: `nindo-${index + 1}`,
  text: scenario.text,
  type: 'single',
  difficulty: index < 13 ? 'easy' : index < 26 ? 'medium' : 'hard',
  options: scenario.options.map((option, optIndex) => {
    const weights: Record<string, number> = { [option.character]: 10 }
    Object.keys(NARUTO_CHARACTERS).forEach(c => {
      if (c !== option.character) weights[c] = Math.floor(Math.random() * 3)
    })
    return {
      id: `nindo-${index + 1}-${optIndex}`,
      text: option.text,
      value: 1,
      dimension: JSON.stringify(weights),
    }
  }),
}))

export function calculateNindoResult(answers: { dimension?: string }[]) {
  const characterScores: Record<string, number> = Object.fromEntries(
    Object.keys(NARUTO_CHARACTERS).map(c => [c, 0])
  )

  answers.forEach(answer => {
    if (answer.dimension) {
      try {
        const weights = JSON.parse(answer.dimension)
        Object.entries(weights).forEach(([character, weight]) => {
          characterScores[character] = (characterScores[character] || 0) + (weight as number)
        })
      } catch (e) {
        console.error('忍者计算错误:', e)
      }
    }
  })

  const sortedCharacters = Object.entries(characterScores)
    .filter(([id]) => NARUTO_CHARACTERS[id as keyof typeof NARUTO_CHARACTERS])
    .sort((a, b) => b[1] - a[1])

  const primaryCharacterId = sortedCharacters[0][0] as keyof typeof NARUTO_CHARACTERS
  const secondaryCharacterId = sortedCharacters[1][0] as keyof typeof NARUTO_CHARACTERS
  const primaryCharacter = NARUTO_CHARACTERS[primaryCharacterId]

  const totalScore = Object.values(characterScores).reduce((a, b) => a + b, 0)
  const powerLevel = Math.min(100, Math.round((sortedCharacters[0][1] / totalScore) * 120))
  const rank = RANKS.find(r => powerLevel >= r.min && powerLevel <= r.max) || RANKS[0]

  const villageKeys = Object.keys(VILLAGES)
  const safeIndex = Math.min(Math.floor(Math.random() * villageKeys.length), villageKeys.length - 1)
  const villageKey = villageKeys[safeIndex] as keyof typeof VILLAGES

  return {
    character: primaryCharacter,
    similarCharacters: [
      NARUTO_CHARACTERS[secondaryCharacterId],
      NARUTO_CHARACTERS[sortedCharacters[2][0] as keyof typeof NARUTO_CHARACTERS],
    ],
    powerLevel,
    rank,
    village: VILLAGES[villageKey],
    matchRate: Math.round((sortedCharacters[0][1] / totalScore) * 100),
  }
}
