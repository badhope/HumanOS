import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 几乎从不', value: 1 },
  { id: '2', text: '⚪️ 很少如此', value: 2 },
  { id: '3', text: '🔵 有时如此', value: 3 },
  { id: '4', text: '🟢 经常如此', value: 4 },
  { id: '5', text: '✅ 总是如此', value: 5 },
]

export const eqNormalQuestions: Question[] = [
  { id: 'eq_n01', text: '我能敏锐察觉自己的情绪变化', type: 'scale', options: opts, meta: { dimension: 'selfAwareness', subscale: 'emotionalRecognition', reverseScored: false, factorLoading: 0.89, discrimination: 0.81, socialDesirability: 0.75, responseBiasCorrection: 0.15 } },
  { id: 'eq_n02', text: '我知道自己为什么会产生某种情绪', type: 'scale', options: opts, meta: { dimension: 'selfAwareness', subscale: 'causalUnderstanding', reverseScored: false, factorLoading: 0.86, discrimination: 0.78, socialDesirability: 0.70, responseBiasCorrection: 0.12 } },
  { id: 'eq_n03', text: '我能有效调节自己的负面情绪', type: 'scale', options: opts, meta: { dimension: 'selfManagement', subscale: 'emotionRegulation', reverseScored: false, factorLoading: 0.91, discrimination: 0.83, socialDesirability: 0.80, responseBiasCorrection: 0.20 } },
  { id: 'eq_n04', text: '面对压力我能保持冷静', type: 'scale', options: opts, meta: { dimension: 'selfManagement', subscale: 'stressTolerance', reverseScored: false, factorLoading: 0.88, discrimination: 0.80, socialDesirability: 0.78, responseBiasCorrection: 0.18 } },
  { id: 'eq_n05', text: '我能准确感知他人的情绪状态', type: 'scale', options: opts, meta: { dimension: 'socialAwareness', subscale: 'empathy', reverseScored: false, factorLoading: 0.92, discrimination: 0.84, socialDesirability: 0.82, responseBiasCorrection: 0.22 } },
  { id: 'eq_n06', text: '我能听懂别人话里的真实意思', type: 'scale', options: opts, meta: { dimension: 'socialAwareness', subscale: 'perspectiveTaking', reverseScored: false, factorLoading: 0.85, discrimination: 0.77, socialDesirability: 0.72, responseBiasCorrection: 0.14 } },
  { id: 'eq_n07', text: '我能影响他人的情绪状态', type: 'scale', options: opts, meta: { dimension: 'relationshipManagement', subscale: 'influence', reverseScored: false, factorLoading: 0.87, discrimination: 0.79, socialDesirability: 0.68, responseBiasCorrection: 0.10 } },
  { id: 'eq_n08', text: '我能妥善处理人际冲突', type: 'scale', options: opts, meta: { dimension: 'relationshipManagement', subscale: 'conflictManagement', reverseScored: false, factorLoading: 0.90, discrimination: 0.82, socialDesirability: 0.76, responseBiasCorrection: 0.16 } },
  { id: 'eq_n09', text: '我会为自己的情绪负责', type: 'scale', options: opts, meta: { dimension: 'selfAwareness', subscale: 'accountability', reverseScored: false, factorLoading: 0.83, discrimination: 0.75, socialDesirability: 0.85, responseBiasCorrection: 0.25 } },
  { id: 'eq_n10', text: '我积极追求目标而不冲动', type: 'scale', options: opts, meta: { dimension: 'selfManagement', subscale: 'selfMotivation', reverseScored: false, factorLoading: 0.84, discrimination: 0.76, socialDesirability: 0.74, responseBiasCorrection: 0.13 } },
  { id: 'eq_n11', text: '我真心关心他人的感受', type: 'scale', options: opts, meta: { dimension: 'socialAwareness', subscale: 'compassion', reverseScored: false, factorLoading: 0.81, discrimination: 0.73, socialDesirability: 0.88, responseBiasCorrection: 0.28 } },
  { id: 'eq_n12', text: '我能建立并维持良好的人际关系', type: 'scale', options: opts, meta: { dimension: 'relationshipManagement', subscale: 'buildingBonds', reverseScored: false, factorLoading: 0.82, discrimination: 0.74, socialDesirability: 0.83, responseBiasCorrection: 0.23 } },
  { id: 'eq_n13', text: '我能准确表达自己的情绪感受', type: 'scale', options: opts, meta: { dimension: 'selfAwareness', subscale: 'emotionalExpression', reverseScored: false, factorLoading: 0.79, discrimination: 0.71, socialDesirability: 0.72, responseBiasCorrection: 0.15 } },
  { id: 'eq_n14', text: '我能控制负面情绪不影响他人', type: 'scale', options: opts, meta: { dimension: 'selfManagement', subscale: 'emotionalControl', reverseScored: false, factorLoading: 0.86, discrimination: 0.78, socialDesirability: 0.80, responseBiasCorrection: 0.20 } },
  { id: 'eq_n15', text: '我能感知团队整体的情绪氛围', type: 'scale', options: opts, meta: { dimension: 'socialAwareness', subscale: 'organizationalAwareness', reverseScored: false, factorLoading: 0.78, discrimination: 0.70, socialDesirability: 0.66, responseBiasCorrection: 0.12 } },
  { id: 'eq_n16', text: '我善于给别人建设性的反馈', type: 'scale', options: opts, meta: { dimension: 'relationshipManagement', subscale: 'feedback', reverseScored: false, factorLoading: 0.85, discrimination: 0.77, socialDesirability: 0.70, responseBiasCorrection: 0.10 } },
  { id: 'eq_n17', text: '我知道自己的优点和缺点', type: 'scale', options: opts, meta: { dimension: 'selfAwareness', subscale: 'selfAssessment', reverseScored: false, factorLoading: 0.87, discrimination: 0.79, socialDesirability: 0.78, responseBiasCorrection: 0.18 } },
  { id: 'eq_n18', text: '面对挫折我能快速调整心态', type: 'scale', options: opts, meta: { dimension: 'selfManagement', subscale: 'resilience', reverseScored: false, factorLoading: 0.88, discrimination: 0.80, socialDesirability: 0.82, responseBiasCorrection: 0.22 } },
  { id: 'eq_n19', text: '我能站在别人的角度思考问题', type: 'scale', options: opts, meta: { dimension: 'socialAwareness', subscale: 'perspectiveTaking', reverseScored: false, factorLoading: 0.84, discrimination: 0.76, socialDesirability: 0.85, responseBiasCorrection: 0.25 } },
  { id: 'eq_n20', text: '我擅长调解人际矛盾', type: 'scale', options: opts, meta: { dimension: 'relationshipManagement', subscale: 'mediation', reverseScored: false, factorLoading: 0.81, discrimination: 0.73, socialDesirability: 0.75, responseBiasCorrection: 0.15 } },
]