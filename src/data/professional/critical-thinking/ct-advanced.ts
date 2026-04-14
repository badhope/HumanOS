import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const ctAdvancedQuestions: Question[] = [
  { id: 'ct_a01', text: '我会在接受信息前验证其来源', type: 'scale', options: opts, meta: { dimension: 'analysis', reverse: false } },
  { id: 'ct_a02', text: '我善于识别论证中的逻辑错误', type: 'scale', options: opts, meta: { dimension: 'analysis', reverse: false } },
  { id: 'ct_a03', text: '我会将复杂问题分解成小部分', type: 'scale', options: opts, meta: { dimension: 'analysis', reverse: false } },
  { id: 'ct_a04', text: '我能识别隐藏的假设', type: 'scale', options: opts, meta: { dimension: 'analysis', reverse: false } },
  { id: 'ct_a05', text: '我能区分事实和观点', type: 'scale', options: opts, meta: { dimension: 'analysis', reverse: false } },
  { id: 'ct_a06', text: '我会反思自己的思维过程', type: 'scale', options: opts, meta: { dimension: 'evaluation', reverse: false } },
  { id: 'ct_a07', text: '我评估信息的可信度', type: 'scale', options: opts, meta: { dimension: 'evaluation', reverse: false } },
  { id: 'ct_a08', text: '我判断结论是否有充分依据', type: 'scale', options: opts, meta: { dimension: 'evaluation', reverse: false } },
  { id: 'ct_a09', text: '我认识到自己的偏见', type: 'scale', options: opts, meta: { dimension: 'evaluation', reverse: false } },
  { id: 'ct_a10', text: '我会质疑权威人士的说法', type: 'scale', options: opts, meta: { dimension: 'evaluation', reverse: false } },
  { id: 'ct_a11', text: '我能跳出固有思维模式', type: 'scale', options: opts, meta: { dimension: 'inference', reverse: false } },
  { id: 'ct_a12', text: '我会从不同角度看问题', type: 'scale', options: opts, meta: { dimension: 'inference', reverse: false } },
  { id: 'ct_a13', text: '我会得出合理的结论', type: 'scale', options: opts, meta: { dimension: 'inference', reverse: false } },
  { id: 'ct_a14', text: '我会根据新信息修正观点', type: 'scale', options: opts, meta: { dimension: 'selfRegulation', reverse: false } },
  { id: 'ct_a15', text: '我会反思自己的判断', type: 'scale', options: opts, meta: { dimension: 'selfRegulation', reverse: false } },
  { id: 'ct_a16', text: '我承认自己犯错', type: 'scale', options: opts, meta: { dimension: 'selfRegulation', reverse: false } },
  { id: 'ct_a17', text: '我愿意接受不确定性', type: 'scale', options: opts, meta: { dimension: 'openMindedness', reverse: false } },
  { id: 'ct_a18', text: '我重视不同的观点', type: 'scale', options: opts, meta: { dimension: 'openMindedness', reverse: false } },
  { id: 'ct_a19', text: '我会听取反对意见', type: 'scale', options: opts, meta: { dimension: 'openMindedness', reverse: false } },
  { id: 'ct_a20', text: '我愿意改变主意', type: 'scale', options: opts, meta: { dimension: 'openMindedness', reverse: false } },
  { id: 'ct_a21', text: '我会提出深入的问题', type: 'scale', options: opts, meta: { dimension: 'inquiry', reverse: false } },
  { id: 'ct_a22', text: '我会寻找证据', type: 'scale', options: opts, meta: { dimension: 'inquiry', reverse: false } },
  { id: 'ct_a23', text: '我会寻找多个信息来源', type: 'scale', options: opts, meta: { dimension: 'inquiry', reverse: false } },
  { id: 'ct_a24', text: '我会质疑表面现象', type: 'scale', options: opts, meta: { dimension: 'inquiry', reverse: false } },
]
