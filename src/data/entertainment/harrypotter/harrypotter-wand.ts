import type { ProfessionalQuestion } from '../../../types'
import { WAND_CORES, WAND_WOODS } from './harrypotter-common'

const wandScenarios = [
  { text: '你面对黑巫师时，会选择？', dimension: 'courage' },
  { text: '你学习新咒语的方式是？', dimension: 'learning' },
  { text: '你如何处理冲突？', dimension: 'conflict' },
  { text: '你对黑魔法的态度是？', dimension: 'darkness' },
  { text: '你最看重魔杖的什么特性？', dimension: 'value' },
  { text: '你希望魔杖帮助你？', dimension: 'purpose' },
  { text: '你的内心更偏向于？', dimension: 'alignment' },
  { text: '你如何面对失败？', dimension: 'resilience' },
  { text: '你对权力的看法是？', dimension: 'power' },
  { text: '你更相信？', dimension: 'belief' },
  { text: '你处理情绪的方式是？', dimension: 'emotion' },
  { text: '你对忠诚的看法是？', dimension: 'loyalty' },
  { text: '你最喜欢的咒语类型是？', dimension: 'magic' },
  { text: '你认为魔杖最重要的是？', dimension: 'priority' },
  { text: '你的人生态度更偏向于？', dimension: 'outlook' },
  { text: '你如何看待死亡？', dimension: 'mortality' },
  { text: '你对爱情的看法是？', dimension: 'love' },
  { text: '你更倾向于保护？', dimension: 'protection' },
  { text: '你交朋友更看重？', dimension: 'friendship' },
  { text: '你认为真正的力量来自于？', dimension: 'strength' },
]

export const wandSelectionQuestions: ProfessionalQuestion[] = wandScenarios.map((scenario, index) => ({
  id: `wand-${index + 1}`,
  text: scenario.text,
  type: 'single',
  difficulty: index < 7 ? 'easy' : index < 14 ? 'medium' : 'hard',
  options: [
    { id: `wand-${index + 1}-1`, text: '勇敢对抗，绝不退缩', value: 1, dimension: JSON.stringify({ core: 'phoenix', wood: 'holly' }) },
    { id: `wand-${index + 1}-2`, text: '智取对手，寻找破绽', value: 1, dimension: JSON.stringify({ core: 'dragon', wood: 'oak' }) },
    { id: `wand-${index + 1}-3`, text: '坚守原则，永不背叛', value: 1, dimension: JSON.stringify({ core: 'unicorn', wood: 'willow' }) },
    { id: `wand-${index + 1}-4`, text: '利用魅力化解危机', value: 1, dimension: JSON.stringify({ core: 'veela', wood: 'maple' }) },
    { id: `wand-${index + 1}-5`, text: '神秘的方式解决', value: 1, dimension: JSON.stringify({ core: 'thestral', wood: 'yew' }) },
  ],
}))

export function calculateWandResult(answers: { dimension?: string }[]) {
  const coreScores: Record<string, number> = {}
  const woodScores: Record<string, number> = {}

  answers.forEach(answer => {
    if (answer.dimension) {
      try {
        const mapping = JSON.parse(answer.dimension)
        coreScores[mapping.core] = (coreScores[mapping.core] || 0) + 1
        woodScores[mapping.wood] = (woodScores[mapping.wood] || 0) + 1
      } catch (e) {
        console.error('魔杖计算错误:', e)
      }
    }
  })

  const sortedCores = Object.entries(coreScores).sort((a, b) => b[1] - a[1])
  const sortedWoods = Object.entries(woodScores).sort((a, b) => b[1] - a[1])

  const coreId = sortedCores[0]?.[0] || 'phoenix'
  const woodId = sortedWoods[0]?.[0] || 'holly'

  const core = WAND_CORES.find(c => c.id === coreId) || WAND_CORES[0]
  const wood = WAND_WOODS.find(w => w.id === woodId) || WAND_WOODS[0]
  
  const length = 9 + Math.floor(Math.random() * 6)
  const flexOptions = ['非常坚硬', '坚硬', '适中', '柔韧', '非常柔韧']
  const flexibility = flexOptions[Math.floor(Math.random() * flexOptions.length)]

  return {
    core,
    wood,
    length: `${length} 又 ${Math.floor(Math.random() * 4) + 1}/4 英寸`,
    flexibility,
    fullDescription: `${wood.name}木，${core.name}杖芯，${length}又${Math.floor(Math.random() * 4) + 1}/4英寸长，${flexibility}`,
    wandQuote: generateWandQuote(wood.name, core.name),
  }
}

function generateWandQuote(wood: string, core: string) {
  const quotes = [
    `啊哈...${wood}木，${core}杖芯。非常有趣的组合...`,
    `我就知道！${wood}木和${core}的组合，注定会成就不凡。`,
    `这根魔杖选择了你，记住——魔杖选择巫师。`,
    `${wood}木，${core}杖芯。嗯...你会用它做什么呢？`,
    `奇妙，真是太奇妙了。这根魔杖和你有很深的联系。`,
  ]
  return quotes[Math.floor(Math.random() * quotes.length)]
}
