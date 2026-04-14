import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const mlqAdvancedQuestions: Question[] = [
  { id: 'mlq_a01', text: '我让他人对愿景感到兴奋', type: 'scale', options: opts, meta: { dimension: 'idealizedInfluence', reverse: false } },
  { id: 'mlq_a02', text: '我引以为豪地与他人分享我的愿景', type: 'scale', options: opts, meta: { dimension: 'idealizedInfluence', reverse: false } },
  { id: 'mlq_a03', text: '我以身作则', type: 'scale', options: opts, meta: { dimension: 'idealizedInfluence', reverse: false } },
  { id: 'mlq_a04', text: '我言行一致', type: 'scale', options: opts, meta: { dimension: 'idealizedInfluence', reverse: false } },
  { id: 'mlq_a05', text: '我在关键时刻能挺身而出', type: 'scale', options: opts, meta: { dimension: 'idealizedInfluence', reverse: false } },
  { id: 'mlq_a06', text: '我对未来保持乐观', type: 'scale', options: opts, meta: { dimension: 'inspirationalMotivation', reverse: false } },
  { id: 'mlq_a07', text: '我为团队设定引人入胜的愿景', type: 'scale', options: opts, meta: { dimension: 'inspirationalMotivation', reverse: false } },
  { id: 'mlq_a08', text: '我激励团队追求更高目标', type: 'scale', options: opts, meta: { dimension: 'inspirationalMotivation', reverse: false } },
  { id: 'mlq_a09', text: '我帮助团队找到工作的意义', type: 'scale', options: opts, meta: { dimension: 'inspirationalMotivation', reverse: false } },
  { id: 'mlq_a10', text: '我表达对团队成员能力的信心', type: 'scale', options: opts, meta: { dimension: 'inspirationalMotivation', reverse: false } },
  { id: 'mlq_a11', text: '我培养团队成员独立思考', type: 'scale', options: opts, meta: { dimension: 'intellectualStimulation', reverse: false } },
  { id: 'mlq_a12', text: '我鼓励尝试新的做事方法', type: 'scale', options: opts, meta: { dimension: 'intellectualStimulation', reverse: false } },
  { id: 'mlq_a13', text: '我鼓励团队成员质疑假设', type: 'scale', options: opts, meta: { dimension: 'intellectualStimulation', reverse: false } },
  { id: 'mlq_a14', text: '我欢迎不同的观点和想法', type: 'scale', options: opts, meta: { dimension: 'intellectualStimulation', reverse: false } },
  { id: 'mlq_a15', text: '我花时间教导和指导团队成员', type: 'scale', options: opts, meta: { dimension: 'individualizedConsideration', reverse: false } },
  { id: 'mlq_a16', text: '我关注成员个人优势和需求', type: 'scale', options: opts, meta: { dimension: 'individualizedConsideration', reverse: false } },
  { id: 'mlq_a17', text: '我认真倾听成员的顾虑', type: 'scale', options: opts, meta: { dimension: 'individualizedConsideration', reverse: false } },
  { id: 'mlq_a18', text: '我认可和庆祝个人成就', type: 'scale', options: opts, meta: { dimension: 'individualizedConsideration', reverse: false } },
  { id: 'mlq_a19', text: '我根据成就给予积极反馈', type: 'scale', options: opts, meta: { dimension: 'contingentReward', reverse: false } },
  { id: 'mlq_a20', text: '我认可出色的工作表现', type: 'scale', options: opts, meta: { dimension: 'contingentReward', reverse: false } },
  { id: 'mlq_a21', text: '我承认团队成员的贡献', type: 'scale', options: opts, meta: { dimension: 'contingentReward', reverse: false } },
  { id: 'mlq_a22', text: '我只在问题出现时才介入', type: 'scale', options: opts, meta: { dimension: 'managementByException', reverse: false } },
  { id: 'mlq_a23', text: '我追踪所有出错的情况', type: 'scale', options: opts, meta: { dimension: 'managementByException', reverse: false } },
  { id: 'mlq_a24', text: '我尽量避免承担领导责任', type: 'scale', options: opts, meta: { dimension: 'laissezFaire', reverse: false } },
]
