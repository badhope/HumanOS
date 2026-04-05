import type { ProfessionalQuestionSet } from '../../types'

const createSASQuestion = (
  id: string,
  text: string,
  reverseScored: boolean = false
) => ({
  id,
  text,
  type: 'scale' as const,
  subscale: 'anxiety',
  reverseScored,
  options: [
    { id: '1', text: '没有或很少时间', value: 1 },
    { id: '2', text: '小部分时间', value: 2 },
    { id: '3', text: '相当多时间', value: 3 },
    { id: '4', text: '绝大部分或全部时间', value: 4 },
  ],
})

export const sasProfessionalQuestions: ProfessionalQuestionSet = {
  normal: [
    createSASQuestion('sas-1', '我觉得比平时容易紧张和焦虑'),
    createSASQuestion('sas-2', '我无缘无故地感到害怕'),
    createSASQuestion('sas-3', '我容易心里烦乱或觉得惊恐'),
    createSASQuestion('sas-4', '我觉得我可能将要发疯'),
    createSASQuestion('sas-5', '我觉得一切都很好，也不会发生什么不幸', true),
    createSASQuestion('sas-6', '我手脚发抖打颤'),
    createSASQuestion('sas-7', '我因为头痛、头颈痛和背痛而苦恼'),
    createSASQuestion('sas-8', '我感觉容易衰弱和疲乏'),
    createSASQuestion('sas-9', '我觉得心平气和，并且容易安静坐着', true),
    createSASQuestion('sas-10', '我觉得心跳得很快'),
  ],
  advanced: [
    createSASQuestion('sas-1', '我觉得比平时容易紧张和焦虑'),
    createSASQuestion('sas-2', '我无缘无故地感到害怕'),
    createSASQuestion('sas-3', '我容易心里烦乱或觉得惊恐'),
    createSASQuestion('sas-4', '我觉得我可能将要发疯'),
    createSASQuestion('sas-5', '我觉得一切都很好，也不会发生什么不幸', true),
    createSASQuestion('sas-6', '我手脚发抖打颤'),
    createSASQuestion('sas-7', '我因为头痛、头颈痛和背痛而苦恼'),
    createSASQuestion('sas-8', '我感觉容易衰弱和疲乏'),
    createSASQuestion('sas-9', '我觉得心平气和，并且容易安静坐着', true),
    createSASQuestion('sas-10', '我觉得心跳得很快'),
    createSASQuestion('sas-11', '我因为一阵阵头晕而苦恼'),
    createSASQuestion('sas-12', '我有晕倒发作，或觉得要晕倒似的'),
    createSASQuestion('sas-13', '我吸气呼气都感到很容易', true),
    createSASQuestion('sas-14', '我手脚麻木和刺痛'),
    createSASQuestion('sas-15', '我因为胃痛和消化不良而苦恼'),
  ],
  professional: [
    createSASQuestion('sas-1', '我觉得比平时容易紧张和焦虑'),
    createSASQuestion('sas-2', '我无缘无故地感到害怕'),
    createSASQuestion('sas-3', '我容易心里烦乱或觉得惊恐'),
    createSASQuestion('sas-4', '我觉得我可能将要发疯'),
    createSASQuestion('sas-5', '我觉得一切都很好，也不会发生什么不幸', true),
    createSASQuestion('sas-6', '我手脚发抖打颤'),
    createSASQuestion('sas-7', '我因为头痛、头颈痛和背痛而苦恼'),
    createSASQuestion('sas-8', '我感觉容易衰弱和疲乏'),
    createSASQuestion('sas-9', '我觉得心平气和，并且容易安静坐着', true),
    createSASQuestion('sas-10', '我觉得心跳得很快'),
    createSASQuestion('sas-11', '我因为一阵阵头晕而苦恼'),
    createSASQuestion('sas-12', '我有晕倒发作，或觉得要晕倒似的'),
    createSASQuestion('sas-13', '我吸气呼气都感到很容易', true),
    createSASQuestion('sas-14', '我手脚麻木和刺痛'),
    createSASQuestion('sas-15', '我因为胃痛和消化不良而苦恼'),
    createSASQuestion('sas-16', '我常常要小便'),
    createSASQuestion('sas-17', '我的手常常是干燥温暖的', true),
    createSASQuestion('sas-18', '我脸红发热'),
    createSASQuestion('sas-19', '我容易入睡并且一夜睡得很好', true),
    createSASQuestion('sas-20', '我做噩梦'),
  ],
}

export const sasNormData = {
  general: {
    population: '一般人群',
    mean: 33.8,
    sd: 5.9,
    n: 1158,
    cutoffs: {
      normal: 44,
      mild: 59,
      moderate: 74,
      severe: 75,
    },
  },
  clinical: {
    population: '临床样本',
    mean: 45.5,
    sd: 11.5,
    n: 500,
    cutoffs: {
      normal: 44,
      mild: 59,
      moderate: 74,
      severe: 75,
    },
  },
}

export const sasInterpretation = {
  normal: {
    range: '20-44',
    level: '正常范围',
    description: '您的焦虑水平在正常范围内，没有明显的焦虑症状。',
    recommendation: '继续保持良好的心理状态，注意压力管理。',
  },
  mild: {
    range: '45-59',
    level: '轻度焦虑',
    description: '您可能有轻度的焦虑症状，表现为偶尔的紧张和不安。',
    recommendation: '建议学习放松技巧，适当运动，保持规律作息。如症状持续，可考虑寻求专业帮助。',
  },
  moderate: {
    range: '60-74',
    level: '中度焦虑',
    description: '您可能有中度的焦虑症状，表现为明显的紧张、担忧和躯体不适。',
    recommendation: '建议尽快咨询心理健康专业人士，进行进一步评估和干预。',
  },
  severe: {
    range: '75-100',
    level: '重度焦虑',
    description: '您可能有重度的焦虑症状，表现为严重的紧张、恐惧和躯体症状。',
    recommendation: '强烈建议立即寻求专业心理健康服务，进行系统评估和治疗。',
  },
}

export const sasReferences = [
  'Zung, W. W. (1971). A rating instrument for anxiety disorders. Psychosomatics, 12(6), 371-379.',
  'Zung, W. W. (1974). The measurement of affects: Depression and anxiety. In P. Pichot (Ed.), Psychological measurements in psychopharmacology: Modern problems of pharmacopsychiatry (Vol. 7, pp. 170-188). Karger.',
  'Dunstan, D. A., & Scott, D. (2020). Norms for Zung\'s Self-rating Anxiety Scale. BMC Psychiatry, 20(1), 1-10.',
  'Olatunji, B. O., Deacon, B. J., Abramowitz, J. S., & Tolin, D. F. (2006). Dimensionality of somatic complaints: Factor structure and psychometric properties of the Self-Rating Anxiety Scale. Journal of Anxiety Disorders, 20(5), 543-561.',
]

export function calculateSASIndex(rawScore: number): number {
  return Math.round((rawScore / 80) * 100)
}

export function interpretSASScore(indexScore: number): typeof sasInterpretation.normal {
  if (indexScore < 45) return sasInterpretation.normal
  if (indexScore < 60) return sasInterpretation.mild
  if (indexScore < 75) return sasInterpretation.moderate
  return sasInterpretation.severe
}
