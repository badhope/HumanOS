import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const darktriadAdvancedQuestions: Question[] = [
  { id: 'dt_a01', text: '不玩弄手段的人很难成功', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', reverse: false } },
  { id: 'dt_a02', text: '我擅长让别人按我的意愿做事', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', reverse: false } },
  { id: 'dt_a03', text: '大多数人本质上是愚蠢的', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', reverse: false } },
  { id: 'dt_a04', text: '我会隐藏真实动机以达成目标', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', reverse: false } },
  { id: 'dt_a05', text: '成功的人都有不光彩的手段', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', reverse: false } },
  { id: 'dt_a06', text: '我会观察别人的弱点并加以利用', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', reverse: false } },
  { id: 'dt_a07', text: '我天生就比别人高一等', type: 'scale', options: opts, meta: { dimension: 'narcissism', reverse: false } },
  { id: 'dt_a08', text: '平庸的人让我感到厌烦', type: 'scale', options: opts, meta: { dimension: 'narcissism', reverse: false } },
  { id: 'dt_a09', text: '我经常给别人提人生建议', type: 'scale', options: opts, meta: { dimension: 'narcissism', reverse: false } },
  { id: 'dt_a10', text: '赞美对我来说是理所当然的', type: 'scale', options: opts, meta: { dimension: 'narcissism', reverse: false } },
  { id: 'dt_a11', text: '我的想法应该被更多人听到', type: 'scale', options: opts, meta: { dimension: 'narcissism', reverse: false } },
  { id: 'dt_a12', text: '我讨厌别人不认同我的观点', type: 'scale', options: opts, meta: { dimension: 'narcissism', reverse: false } },
  { id: 'dt_a13', text: '看到别人害怕让我感到兴奋', type: 'scale', options: opts, meta: { dimension: 'psychopathy', reverse: false } },
  { id: 'dt_a14', text: '我从来不会真心感到抱歉', type: 'scale', options: opts, meta: { dimension: 'psychopathy', reverse: false } },
  { id: 'dt_a15', text: '冲动行事才够刺激', type: 'scale', options: opts, meta: { dimension: 'psychopathy', reverse: false } },
  { id: 'dt_a16', text: '打破规则让我感到快感', type: 'scale', options: opts, meta: { dimension: 'psychopathy', reverse: false } },
  { id: 'dt_a17', text: '情绪是软弱的表现', type: 'scale', options: opts, meta: { dimension: 'psychopathy', reverse: false } },
  { id: 'dt_a18', text: '别人的眼泪对我毫无作用', type: 'scale', options: opts, meta: { dimension: 'psychopathy', reverse: false } },
  { id: 'dt_a19', text: '长期战略比短期道德重要', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', reverse: false } },
  { id: 'dt_a20', text: '我知道如何建立良好形象', type: 'scale', options: opts, meta: { dimension: 'machiavellianism', reverse: false } },
  { id: 'dt_a21', text: '权威本来就是用来挑战的', type: 'scale', options: opts, meta: { dimension: 'narcissism', reverse: false } },
  { id: 'dt_a22', text: '我很会装可怜博取同情', type: 'scale', options: opts, meta: { dimension: 'narcissism', reverse: false } },
  { id: 'dt_a23', text: '无聊的时候我会制造点麻烦', type: 'scale', options: opts, meta: { dimension: 'psychopathy', reverse: false } },
  { id: 'dt_a24', text: '我永远不会让别人利用我', type: 'scale', options: opts, meta: { dimension: 'psychopathy', reverse: false } },
]
