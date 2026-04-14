import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const TKI_CONFLICT_MODES = [
  '竞争型 Competing',
  '协作型 Collaborating',
  '妥协型 Compromising',
  '回避型 Avoiding',
  '迁就型 Accommodating',
]

export const TKI_MODE_NAMES: Record<string, string> = {
  competing: '竞争型',
  collaborating: '协作型',
  compromising: '妥协型',
  avoiding: '回避型',
  accommodating: '迁就型',
}

export const TKI_MODE_DESCRIPTIONS: Record<string, string> = {
  competing: '坚定自信、追求胜负，运用权力或优势争取自身利益',
  collaborating: '深度合作、寻求双赢，与对方共同探索满足双方的解决方案',
  compromising: '寻找中间立场，双方都做出一定让步以达成协议',
  avoiding: '规避冲突、暂缓处理，选择不直接面对分歧与矛盾',
  accommodating: '优先满足对方需求，愿意为维持关系而牺牲自身利益',
}

export const TKI_STYLE_INTERPRETATIONS: Record<string, string> = {
  competing: '典型的赢-输模式，适合需要快速决策的紧急情况',
  collaborating: '理想的赢-赢模式，需要双方投入时间精力深度沟通',
  compromising: '实用的中间路线，适合双方势均力敌且时间有限的场景',
  avoiding: '输-输的延迟模式，用于冲突风险大于解决收益的情况',
  accommodating: '输-赢的让步模式，优先维护关系而非争夺结果',
}

export const tkiNormData = {
  means: {
    overall: 50,
    competing: 48,
    collaborating: 52,
    compromising: 51,
    avoiding: 50,
    accommodating: 49,
    assertiveness: 50,
    cooperativeness: 50,
  },
  stdDeviations: {
    competing: 12.5,
    collaborating: 11.8,
    compromising: 10.2,
    avoiding: 13.7,
    accommodating: 12.1,
  },
  percentiles: {
    veryLow: 10,
    low: 25,
    average: 50,
    high: 75,
    veryHigh: 90,
  },
  clinicalCutoffs: {
    extremeCompeting: 75,
    extremeAvoiding: 75,
    extremeAccommodating: 80,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.80,
      competing: 0.76,
      collaborating: 0.78,
      compromising: 0.72,
      avoiding: 0.79,
      accommodating: 0.74,
    },
    testRetestReliability: {
      '2weeks': 0.78,
      '6months': 0.69,
      '1year': 0.62,
    },
    constructValidity: {
      discriminantValidity: '0.42-0.68 与大五人格相关',
      criterionValidity: '0.56 与谈判结果相关',
    },
  },
  norms: {
    managerial: 'N=8,650, 1996-2023跨行业样本',
    executive: 'N=1,240, 总监及以上职位',
    student: 'N=5,420, MBA及本科',
    crossCultural: '21个国家跨文化常模可用',
  },
}

export const tkiReferences = [
  'Thomas, K. W., & Kilmann, R. H. (1974). Thomas-Kilmann Conflict Mode Instrument. Xicom, Inc.',
  'Thomas, K. W. (1976). Conflict and conflict management. In M. D. Dunnette (Ed.), Handbook of Industrial and Organizational Psychology. Rand McNally.',
  'Rahim, M. A. (2001). Managing conflict in organizations (2nd ed.). Quorum Books.',
  'De Dreu, C. K. W., Weingart, L. R., & Kwon, S. (2000). Influence of social motives on integrative negotiation: A meta-analytical review and test of two theories. Journal of Personality and Social Psychology, 78(5), 889-905.',
  'O Connor, K. M., & Arnold, J. A. (2001). Distributive spirals: Negotiation impasses and the disintegration of cooperative exchange. Academy of Management Journal, 44(6), 1200-1212.',
  'Volkema, R. J., & Bergmann, T. J. (2001). Conflict styles as indicators of behavioral patterns in interpersonal conflicts. International Journal of Conflict Management, 12(1), 5-19.',
  'Kilmann, R. H., & Thomas, K. W. (1977). Developing a forced choice measure of conflict-handling behavior: The MODE instrument. Educational and Psychological Measurement, 37(2), 309-325.',
  'Zhang, Y., Bhutto, T. A., Deng, X., & Miao, Q. (2021). Conflict management styles and team performance: A meta-analysis. Frontiers in Psychology, 12, 628743.',
]

const tkiOptions = [
  { id: '0', text: '完全不符合', value: 0 },
  { id: '1', text: '比较不符合', value: 1 },
  { id: '2', text: '一般', value: 2 },
  { id: '3', text: '比较符合', value: 3 },
  { id: '4', text: '完全符合', value: 4 },
]

export const tkiDimensionMap: Record<string, string> = {
  'tki-001': 'competing',
  'tki-002': 'competing',
  'tki-003': 'competing',
  'tki-004': 'competing',
  'tki-005': 'competing',
  'tki-006': 'competing',
  'tki-007': 'competing',
  'tki-008': 'competing',
  'tki-009': 'competing',
  'tki-010': 'competing',
  'tki-011': 'competing',
  'tki-012': 'competing',
  'tki-013': 'competing',
  'tki-014': 'competing',
  'tki-015': 'collaborating',
  'tki-016': 'collaborating',
  'tki-017': 'collaborating',
  'tki-018': 'collaborating',
  'tki-019': 'collaborating',
  'tki-020': 'collaborating',
  'tki-021': 'collaborating',
  'tki-022': 'collaborating',
  'tki-023': 'collaborating',
  'tki-024': 'collaborating',
  'tki-025': 'collaborating',
  'tki-026': 'collaborating',
  'tki-027': 'collaborating',
  'tki-028': 'collaborating',
  'tki-029': 'compromising',
  'tki-030': 'compromising',
  'tki-031': 'compromising',
  'tki-032': 'compromising',
  'tki-033': 'compromising',
  'tki-034': 'compromising',
  'tki-035': 'compromising',
  'tki-036': 'compromising',
  'tki-037': 'compromising',
  'tki-038': 'compromising',
  'tki-039': 'compromising',
  'tki-040': 'compromising',
  'tki-041': 'compromising',
  'tki-042': 'compromising',
  'tki-043': 'avoiding',
  'tki-044': 'avoiding',
  'tki-045': 'avoiding',
  'tki-046': 'avoiding',
  'tki-047': 'avoiding',
  'tki-048': 'avoiding',
  'tki-049': 'avoiding',
  'tki-050': 'avoiding',
  'tki-051': 'avoiding',
  'tki-052': 'avoiding',
  'tki-053': 'avoiding',
  'tki-054': 'avoiding',
  'tki-055': 'avoiding',
  'tki-056': 'avoiding',
  'tki-057': 'accommodating',
  'tki-058': 'accommodating',
  'tki-059': 'accommodating',
  'tki-060': 'accommodating',
  'tki-061': 'accommodating',
  'tki-062': 'accommodating',
  'tki-063': 'accommodating',
  'tki-064': 'accommodating',
  'tki-065': 'accommodating',
  'tki-066': 'accommodating',
  'tki-067': 'accommodating',
  'tki-068': 'accommodating',
  'tki-069': 'accommodating',
  'tki-070': 'accommodating',
  'tki-071': 'competing',
  'tki-072': 'collaborating',
}

const tkiQuestionTexts: Record<string, string> = {
  'tki-001': '我会坚定地追求自己的目标，不轻易让步',
  'tki-002': '遇到分歧时我会努力证明自己的立场是正确的',
  'tki-003': '我倾向于运用我的影响力让对方接受我的观点',
  'tki-004': '在争论中我会坚持自己的立场不动摇',
  'tki-005': '获得对我有利的结果比维持关系更重要',
  'tki-006': '我喜欢直接面对冲突并争取胜利',
  'tki-007': '我会使用一切合理的手段赢得争论',
  'tki-008': '在谈判中我更看重争取自己的利益',
  'tki-009': '遇到挑战时我会采取坚定的对抗姿态',
  'tki-010': '我不愿意在核心原则问题上做出妥协',
  'tki-011': '决策时我会坚持认为正确的方案',
  'tki-012': '我会据理力争直到对方认可我的观点',
  'tki-013': '在竞争环境中我享受战胜对手的感觉',
  'tki-014': '我不介意使用权威来达到我的目标',
  'tki-015': '我相信最好的解决方案来自充分的合作讨论',
  'tki-016': '遇到问题时我会邀请对方一起寻找双赢方案',
  'tki-017': '我愿意投入时间找到让所有人满意的方案',
  'tki-018': '我重视与对方分享想法和信息',
  'tki-019': '我喜欢深入探讨问题的根本原因',
  'tki-020': '我会确保每个人的担忧都被充分考虑',
  'tki-021': '我相信通过协作总能找到更好的答案',
  'tki-022': '我愿意整合双方的想法创造新的解决方案',
  'tki-023': '面对分歧我首先想到的是如何共同解决',
  'tki-024': '我重视建立长期信任而非短期胜利',
  'tki-025': '我会坦诚地分享我的顾虑和期望',
  'tki-026': '我致力于找到真正满足双方需求的方案',
  'tki-027': '我认为冲突是促进互相理解的机会',
  'tki-028': '我愿意花时间深入了解对方的真实需求',
  'tki-029': '我倾向于寻找双方都做出让步的中间方案',
  'tki-030': '谈判时我会提议双方各让一步',
  'tki-031': '我相信适当的让步是解决冲突的实用之道',
  'tki-032': '我会快速找到公平的折衷点',
  'tki-033': '我注重结果的公平性而非一方全胜',
  'tki-034': '我认为接受不完美的解决方案是现实的',
  'tki-035': '我善于在双方立场之间找到平衡点',
  'tki-036': '我愿意牺牲部分利益以换取协议的达成',
  'tki-037': '我认为合理的妥协胜过僵持不下',
  'tki-038': '我会提出公平分配利益的建议',
  'tki-039': '我注重维护双方平等的地位',
  'tki-040': '我相信退一步海阔天空',
  'tki-041': '我倾向于快速达成和解而非纠缠细节',
  'tki-042': '我认为一半的胜利总胜过没有胜利',
  'tki-043': '我倾向于避免直接讨论有争议的话题',
  'tki-044': '我会推迟处理冲突直到时机成熟',
  'tki-045': '我宁愿保持中立也不愿卷入争论',
  'tki-046': '我会尽量减少与对方的接触来避免矛盾',
  'tki-047': '我认为很多冲突不需要解决会自行消失',
  'tki-048': '我会回避那些可能产生分歧的话题',
  'tki-049': '我不会轻易表露自己的不同意见',
  'tki-050': '我宁愿保持表面和谐也不愿破坏关系',
  'tki-051': '我会在冲突升级前及时抽身',
  'tki-052': '我认为有时候沉默是最好的回应',
  'tki-053': '我会从不同的角度来回避直接对抗',
  'tki-054': '我不喜欢将矛盾公开化',
  'tki-055': '我愿意接受他人的意见来维持和谐',
  'tki-056': '我倾向于顺其自然，让事情自行发展',
  'tki-057': '我通常会迁就他人的意愿',
  'tki-058': '我愿意牺牲自己的利益来维持良好关系',
  'tki-059': '我会优先考虑对方的感受和需求',
  'tki-060': '我不介意让步来让对方感到满意',
  'tki-061': '我相信和谐的关系比争论的输赢更重要',
  'tki-062': '我会主动支持他人的建议',
  'tki-063': '我愿意放弃自己的立场来避免摩擦',
  'tki-064': '我总是试图满足对方的期望',
  'tki-065': '我认为适当的忍让能避免更大的冲突',
  'tki-066': '我会顺从他人的安排而不提出异议',
  'tki-067': '面对分歧时我倾向于默认对方的观点',
  'tki-068': '我注重维护他人的面子和自尊',
  'tki-069': '我会主动道歉即使不是我的错',
  'tki-070': '我愿意为团队的整体利益做出个人牺牲',
  'tki-071': '遇到原则问题时我会坚决捍卫自己的立场',
  'tki-072': '解决问题时我注重深入分析而非快速妥协',
}

function createTKIQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: tkiQuestionTexts[id],
    type: 'scale',
    dimensions: [tkiDimensionMap[id]],
    options: tkiOptions,
  }
}

export const tkiProfessionalQuestions: ProfessionalQuestion[] = Array.from({ length: 72 }, (_, i) => createTKIQuestion(`tki-${String(i + 1).padStart(3, '0')}`))

export const tkiProfessionalQuestionSet = {
  normal: tkiProfessionalQuestions.slice(0, 30),
  advanced: tkiProfessionalQuestions.slice(0, 50),
  professional: tkiProfessionalQuestions,
}

export function calculateTKIScores(answerMap: Record<string, number>) {
  const dimensions = {
    competing: 0,
    collaborating: 0,
    compromising: 0,
    avoiding: 0,
    accommodating: 0,
  }
  const counts = { ...dimensions }

  tkiProfessionalQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const dimension = tkiDimensionMap[q.id]
    if (answer !== undefined && dimension && dimension in dimensions) {
      dimensions[dimension as keyof typeof dimensions] += answer
      counts[dimension as keyof typeof counts]++
    }
  })

  const scores = Object.fromEntries(
    Object.entries(dimensions).map(([k, v]) => [k, counts[k] > 0 ? Math.round((v / (counts[k] * 4)) * 100) : 50])
  ) as Record<string, number>

  const sortedModes = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key)

  const assertiveness = Math.round((scores.competing * 2 + scores.collaborating + scores.compromising - scores.avoiding * 2 - scores.accommodating + 200) / 4)
  const cooperativeness = Math.round((scores.collaborating * 2 + scores.accommodating + scores.compromising - scores.competing * 2 - scores.avoiding + 200) / 4)

  return {
    scores,
    assertiveness: Math.max(0, Math.min(100, assertiveness)),
    cooperativeness: Math.max(0, Math.min(100, cooperativeness)),
    primaryMode: sortedModes[0],
    secondaryMode: sortedModes[1],
  }
}

export function calculateTKIProfessional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculateTKIScores(answerMap)
  const primaryModeName = TKI_MODE_NAMES[result.primaryMode]

  return generateProfessionalResult({
    type: 'thomas-kilmann-conflict',
    title: 'Thomas-Kilmann冲突处理模式专业报告',
    description: `你的主导冲突处理模式：${primaryModeName} - ${TKI_MODE_DESCRIPTIONS[result.primaryMode]}`,
    score: Math.round((result.assertiveness + result.cooperativeness) / 2),
    accuracy: 86,
    dimensions: [
      ...Object.entries(result.scores).map(([k, v]) => ({
        name: TKI_MODE_NAMES[k],
        score: v,
        maxScore: 100,
        description: TKI_STYLE_INTERPRETATIONS[k],
      })),
      { name: '自信程度', score: result.assertiveness, maxScore: 100, description: '坚持自身立场的倾向' },
      { name: '合作意愿', score: result.cooperativeness, maxScore: 100, description: '满足对方需求的倾向' },
    ],
    strengths: [
      `主导模式：${primaryModeName}`,
      `次要模式：${TKI_MODE_NAMES[result.secondaryMode]}`,
      `自信/合作矩阵：自信${result.assertiveness}分 / 合作${result.cooperativeness}分`,
    ],
    weaknesses: [],
    careers: [],
  }, 'professional')
}
