import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const kolbAdvancedQuestions: Question[] = [
  { id: 'kolb_a01', text: '我从亲身经历中学到的东西最多', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_a02', text: '我喜欢沉浸在真实场景中学习', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_a03', text: '真实案例比抽象理论更能打动我', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_a04', text: '做决定时我常凭感觉和直觉', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_a05', text: '角色扮演和模拟让我记忆深刻', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_a06', text: '实践活动比书本知识更重要', type: 'scale', options: opts, meta: { dimension: 'concreteExperience', reverse: false } },
  { id: 'kolb_a07', text: '我喜欢在行动前仔细观察思考', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_a08', text: '我习惯从多角度看待问题', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_a09', text: '我不急于下结论', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_a10', text: '我喜欢事后复盘和总结经验', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_a11', text: '我享受深度思考的过程', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_a12', text: '听取不同的观点对我很重要', type: 'scale', options: opts, meta: { dimension: 'reflectiveObservation', reverse: false } },
  { id: 'kolb_a13', text: '我喜欢分析和逻辑推理', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_a14', text: '我倾向于建立系统化的理论框架', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_a15', text: '我追求概念的精确性', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_a16', text: '我相信理性和科学的方法', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_a17', text: '我善于归纳总结规律', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_a18', text: '数据和事实是我的决策基础', type: 'scale', options: opts, meta: { dimension: 'abstractConceptualization', reverse: false } },
  { id: 'kolb_a19', text: '我喜欢动手尝试新事物', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
  { id: 'kolb_a20', text: '我勇于冒险和尝试新方法', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
  { id: 'kolb_a21', text: '实践出真知是我的座右铭', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
  { id: 'kolb_a22', text: '我喜欢将学到的知识立即应用', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
  { id: 'kolb_a23', text: '实验和验证是最好的学习方式', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
  { id: 'kolb_a24', text: '我喜欢边做边学', type: 'scale', options: opts, meta: { dimension: 'activeExperimentation', reverse: false } },
]
