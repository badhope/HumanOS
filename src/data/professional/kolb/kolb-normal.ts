import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const kolbNormalQuestions: Question[] = [
  { id: 'kolb_n01', text: '我从亲身经历中学到最多', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_n02', text: '真实案例比理论更能打动我', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_n03', text: '我凭感觉和直觉做判断', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_n04', text: '我喜欢在行动前观察思考', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_n05', text: '我习惯从多角度看问题', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_n06', text: '我喜欢事后复盘总结', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_n07', text: '我喜欢分析和逻辑推理', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_n08', text: '我相信理性和科学方法', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_n09', text: '我善于归纳总结', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_n10', text: '我喜欢动手尝试新事物', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
  { id: 'kolb_n11', text: '我勇于冒险和尝试', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
  { id: 'kolb_n12', text: '我喜欢将学到的立即应用', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
  { id: 'kolb_n13', text: '我注重当下的感受和体验', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_n14', text: '我做决定前会听不同意见', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_n15', text: '我喜欢建立概念和模型', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_n16', text: '我通过实践来检验理论', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
  { id: 'kolb_n17', text: '我对人的感受很敏感', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_n18', text: '我不急于下结论', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_n19', text: '我重视证据和数据', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_n20', text: '我喜欢试错式学习', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
]
