import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const ctNormalQuestions: Question[] = [
  { id: 'ct_n01', text: '我会在接受信息前验证其来源', type: 'scale', options: opts, meta: { dimension: 'analysis', reverse: false } },
  { id: 'ct_n02', text: '我善于识别论证中的逻辑错误', type: 'scale', options: opts, meta: { dimension: 'analysis', reverse: false } },
  { id: 'ct_n03', text: '我能区分事实和观点', type: 'scale', options: opts, meta: { dimension: 'analysis', reverse: false } },
  { id: 'ct_n04', text: '我会反思自己的思维过程', type: 'scale', options: opts, meta: { dimension: 'evaluation', reverse: false } },
  { id: 'ct_n05', text: '我评估信息的可信度', type: 'scale', options: opts, meta: { dimension: 'evaluation', reverse: false } },
  { id: 'ct_n06', text: '我能跳出固有思维模式', type: 'scale', options: opts, meta: { dimension: 'inference', reverse: false } },
  { id: 'ct_n07', text: '我会从不同角度看问题', type: 'scale', options: opts, meta: { dimension: 'inference', reverse: false } },
  { id: 'ct_n08', text: '我会根据新信息修正观点', type: 'scale', options: opts, meta: { dimension: 'selfRegulation', reverse: false } },
  { id: 'ct_n09', text: '我重视不同的观点', type: 'scale', options: opts, meta: { dimension: 'openMindedness', reverse: false } },
  { id: 'ct_n10', text: '我愿意改变主意', type: 'scale', options: opts, meta: { dimension: 'openMindedness', reverse: false } },
  { id: 'ct_n11', text: '我会提出深入的问题', type: 'scale', options: opts, meta: { dimension: 'inquiry', reverse: false } },
  { id: 'ct_n12', text: '我会寻找证据', type: 'scale', options: opts, meta: { dimension: 'inquiry', reverse: false } },
  { id: 'ct_n13', text: '我能发现论点中的偏见', type: 'scale', options: opts, meta: { dimension: 'analysis', reverse: false } },
  { id: 'ct_n14', text: '我会检验假设的合理性', type: 'scale', options: opts, meta: { dimension: 'evaluation', reverse: false } },
  { id: 'ct_n15', text: '我能做出合理的结论', type: 'scale', options: opts, meta: { dimension: 'inference', reverse: false } },
  { id: 'ct_n16', text: '我能意识到自己的认知偏差', type: 'scale', options: opts, meta: { dimension: 'selfRegulation', reverse: false } },
  { id: 'ct_n17', text: '我会考虑相反意见', type: 'scale', options: opts, meta: { dimension: 'openMindedness', reverse: false } },
  { id: 'ct_n18', text: '我能理清复杂问题的脉络', type: 'scale', options: opts, meta: { dimension: 'analysis', reverse: false } },
  { id: 'ct_n19', text: '我会进行系统性思考', type: 'scale', options: opts, meta: { dimension: 'evaluation', reverse: false } },
  { id: 'ct_n20', text: '我能把问题分解开来分析', type: 'scale', options: opts, meta: { dimension: 'inference', reverse: false } },
]
