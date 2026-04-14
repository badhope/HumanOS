import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const mlqNormalQuestions: Question[] = [
  { id: 'mlq_n01', text: '我让他人对愿景感到兴奋', type: 'scale', options: opts, meta: { dimension: 'idealizedInfluence', reverse: false } },
  { id: 'mlq_n02', text: '我以身作则', type: 'scale', options: opts, meta: { dimension: 'idealizedInfluence', reverse: false } },
  { id: 'mlq_n03', text: '我对未来保持乐观', type: 'scale', options: opts, meta: { dimension: 'inspirationalMotivation', reverse: false } },
  { id: 'mlq_n04', text: '我为团队设定引人入胜的愿景', type: 'scale', options: opts, meta: { dimension: 'inspirationalMotivation', reverse: false } },
  { id: 'mlq_n05', text: '我培养团队成员独立思考', type: 'scale', options: opts, meta: { dimension: 'intellectualStimulation', reverse: false } },
  { id: 'mlq_n06', text: '我鼓励尝试新的做事方法', type: 'scale', options: opts, meta: { dimension: 'intellectualStimulation', reverse: false } },
  { id: 'mlq_n07', text: '我花时间教导和指导团队成员', type: 'scale', options: opts, meta: { dimension: 'individualizedConsideration', reverse: false } },
  { id: 'mlq_n08', text: '我关注成员个人优势和需求', type: 'scale', options: opts, meta: { dimension: 'individualizedConsideration', reverse: false } },
  { id: 'mlq_n09', text: '我根据成就给予积极反馈', type: 'scale', options: opts, meta: { dimension: 'contingentReward', reverse: false } },
  { id: 'mlq_n10', text: '我认可出色的工作表现', type: 'scale', options: opts, meta: { dimension: 'contingentReward', reverse: false } },
  { id: 'mlq_n11', text: '我只在问题出现时才介入', type: 'scale', options: opts, meta: { dimension: 'managementByException', reverse: false } },
  { id: 'mlq_n12', text: '我尽量避免承担领导责任', type: 'scale', options: opts, meta: { dimension: 'laissezFaire', reverse: false } },
  { id: 'mlq_n13', text: '我让团队成员感到自豪', type: 'scale', options: opts, meta: { dimension: 'idealizedInfluence', reverse: false } },
  { id: 'mlq_n14', text: '我激发团队成员的热情', type: 'scale', options: opts, meta: { dimension: 'inspirationalMotivation', reverse: false } },
  { id: 'mlq_n15', text: '我挑战团队成员跳出舒适区', type: 'scale', options: opts, meta: { dimension: 'intellectualStimulation', reverse: false } },
  { id: 'mlq_n16', text: '我把每个成员当作独特的个体看待', type: 'scale', options: opts, meta: { dimension: 'individualizedConsideration', reverse: false } },
  { id: 'mlq_n17', text: '我明确说明达到目标的奖励方式', type: 'scale', options: opts, meta: { dimension: 'contingentReward', reverse: false } },
  { id: 'mlq_n18', text: '我关注工作中的错误和偏差', type: 'scale', options: opts, meta: { dimension: 'managementByException', reverse: false } },
  { id: 'mlq_n19', text: '我建立团队成员的信任', type: 'scale', options: opts, meta: { dimension: 'idealizedInfluence', reverse: false } },
  { id: 'mlq_n20', text: '我帮助团队成员发展自己的能力', type: 'scale', options: opts, meta: { dimension: 'individualizedConsideration', reverse: false } },
]
