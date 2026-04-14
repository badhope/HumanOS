/**
 * ==============================================
 * 🧠 拉康精神分析临床诊断 - 核心计算器
 * ==============================================
 * 【测评定位】结构精神分析临床结构鉴定
 * 【核心算法】3大临床结构 × 2亚型/结构 = 48题
 * 【理论来源】Lacanian Psychoanalysis 三界理论
 * 
 * 【⚠️  超级重要警告】
 * 1. 按题目dimension累加计分！
 * 2. dimension拼写错了 = 对应结构永远0分！
 */

import type { Answer, AssessmentResult } from '../../types'
import { buildAnswerMap } from './calculator-utils'

/**
 * 拉康诊断维度接口
 * 【三大临床结构】
 * - Neurosis: 神经症（强迫症/癔症/恐怖症）
 * - Psychosis: 精神病
 * - Perversion: 倒错
 */
export interface LacanDimension {
  name: string
  score: number
  interpretation: string
}

export type ClinicalStructure = 'neurosis' | 'psychosis' | 'perversion'
export type NeurosisSubtype = 'obsession' | 'hysteria' | 'phobia'
export type DimensionKey = ClinicalStructure | NeurosisSubtype

export interface LacanResult extends Record<string, any> {
  dimensionScores: Record<DimensionKey, number>
  dimensionDetails: LacanDimension[]
  radarData: { dimension: string; score: number; fullMark: number }[]
  clinicalStructure: {
    primary: string
    secondary: string
    description: string
    lacanianFormula: string
    certainty: number
  }
  diagnosticProfile: {
    subjectPosition: string
    relationToOther: string
    jouissanceType: string
    objectARelation: string
  }
  symptomMatrix: {
    formation: string
    mechanism: string
    typicalManifestation: string
  }
  zizekReading: {
    ideologicalPosition: string
    enjoymentMode: string
    ethicalStance: string
  }
  caseStudy: {
    literaryExample: string
    filmExample: string
    philosophicalParallel: string
  }
  clinicalRecommendations: string[]
  typeName: string
  typeEmoji: string
}

const dimensionInfo = [
  { name: '神经症', interpretation: '压抑机制主导，通过症状妥协' },
  { name: '精神病', interpretation: '排除机制主导，象征性阉割失效' },
  { name: '倒错', interpretation: '否认机制主导，拜物教式分裂' },
  { name: '强迫症', interpretation: '隔离与移置，主宰性的距离' },
  { name: '癔症', interpretation: '认同与表演，他者的欲望' },
  { name: '恐怖症', interpretation: '逃避与置换，缺失的具象化' },
]

const clinicalStructures = [
  {
    name: '神经症主体',
    threshold: 70,
    dimension: 'neurosis',
    description: '主体被牢牢锚定在象征秩序中，通过压抑机制处理与父法的关系。症状是无意识的妥协形成，在欲望与防御之间达成脆弱的平衡。这是拉康临床中最普遍的结构，也是现代性主体的标准配置。',
    formula: '$ → Φ 【被阉割主体在阳具功能下运作】',
    subtypes: ['强迫症结构', '癔症结构', '恐怖症结构'],
  },
  {
    name: '精神病主体',
    threshold: 65,
    dimension: 'psychosis',
    description: '父性隐喻的根本失败，Verwerfung（除权弃绝）导致父性功能脱落。主体与大他者之间不存在符号中介，直接暴露在实在界的暴力中。妄想系统都是象征秩序崩塌后主体自行缝合的补丁。',
    formula: '∄ Φ → J 【父性功能缺席，实在界涌入】',
    subtypes: ['偏执型妄想', '青春型紊乱', '紧张型木僵'],
  },
  {
    name: '倒错主体',
    threshold: 60,
    dimension: 'perversion',
    description: 'Verleugnung（否认）而非压抑——拜物教结构的典范。主体通过分裂的认识论策略同时在两个层面运作："我很清楚，但还是..."。倒错者将自身设立为大他者享乐的工具。',
    formula: '$ ∧ ¬Φ → a 【分裂认识论锚定客体a】',
    subtypes: ['施虐狂', '受虐狂', '窥淫癖/露阴癖'],
  },
]

const subjectPositions = [
  { title: '被阉割的主体 $', condition: (s: LacanResult['dimensionScores']) => s.neurosis > 60 },
  { title: '除权弃绝的主体', condition: (s: LacanResult['dimensionScores']) => s.psychosis > 60 },
  { title: '分裂的倒错主体', condition: (s: LacanResult['dimensionScores']) => s.perversion > 60 },
  { title: '神经症式分裂主体', condition: () => true },
]

const jouissanceTypes = [
  { type: '阳具享乐 Φ(J)', description: '通过符号性牺牲获得的剩余享乐，神经症的标配' },
  { type: '女性享乐 J(Ⱥ)', description: '非阳具性的、不可言说的神秘享乐' },
  { type: '超我享乐 superego(J)', description: '禁令本身产生的恶的享乐' },
  { type: '死亡驱力享乐 death(J)', description: '重复自动性的纯粹形式享乐' },
]

const zizekianReadings = [
  {
    ideology: '犬儒主义主体',
    enjoyment: '意识形态的犬儒式距离本身就是享乐',
    ethics: '我知道，但我还是在做',
    condition: (s: LacanResult['dimensionScores']) => s.neurosis > 50 && s.perversion > 40,
  },
  {
    ideology: '原教旨主义者',
    enjoyment: '完全认同大他者的凝视',
    ethics: '大他者需要我的牺牲',
    condition: (s: LacanResult['dimensionScores']) => s.psychosis > 50 && s.hysteria > 40,
  },
  {
    ideology: '愤世嫉俗的智者',
    enjoyment: '看穿一切的刻薄享乐',
    ethics: '他们都在骗，我选择揭露',
    condition: (s: LacanResult['dimensionScores']) => s.obsession > 50 && s.neurosis > 40,
  },
  {
    ideology: '无限正义的战士',
    enjoyment: '惩罚他人的神圣暴力',
    ethics: '我就是大他者的工具',
    condition: (s: LacanResult['dimensionScores']) => s.perversion > 50,
  },
]

const caseStudies = [
  {
    literaryExample: '陀思妥耶夫斯基《地下室手记》——地下室人是神经症强迫症的完美化身',
    filmExample: '《闪灵》中的杰克·托伦斯——写作失败导致的强迫性重复',
    philosophicalParallel: '康德——纯粹理性的强迫症式划界',
  },
  {
    literaryExample: '尼采——查拉图斯特拉的精神病式正午',
    filmExample: '《穆赫兰道》——象征秩序彻底崩溃的梦境',
    philosophicalParallel: '谢林——自由与癫狂的未分化状态',
  },
  {
    literaryExample: '萨德侯爵——倒错伦理学的系统阐述者',
    filmExample: '《大开眼戒》——拜物教凝视的极致展示',
    philosophicalParallel: '黑格尔——绝对知识的施虐狂结构',
  },
]

const DIMENSION_ITEMS = {
  fatherFunction: ['lacan-2', 'lacan-8', 'lacan-14', 'lacan-20', 'lacan-26', 'lacan-32', 'lacan-38', 'lacan-43', 'lacan-44'],
  disavowal: ['lacan-3', 'lacan-9', 'lacan-15', 'lacan-21', 'lacan-27', 'lacan-33', 'lacan-39', 'lacan-45'],
  repression: ['lacan-1', 'lacan-7', 'lacan-13', 'lacan-19', 'lacan-25', 'lacan-31', 'lacan-37', 'lacan-46'],
  obsession: ['lacan-4', 'lacan-10', 'lacan-16', 'lacan-22', 'lacan-28', 'lacan-34', 'lacan-40', 'lacan-47'],
  hysteria: ['lacan-5', 'lacan-11', 'lacan-17', 'lacan-23', 'lacan-29', 'lacan-35', 'lacan-41', 'lacan-48'],
  phobia: ['lacan-6', 'lacan-12', 'lacan-18', 'lacan-24', 'lacan-30', 'lacan-36', 'lacan-42', 'lacan-49', 'lacan-50'],
} as const satisfies Record<string, readonly string[]>

const DIAGNOSTIC_THRESHOLDS = {
  PSYCHOSIS: 75,
  PERVERSION: 70,
} as const

interface RawScores {
  fatherFunction: number
  disavowal: number
  repression: number
  obsession: number
  hysteria: number
  phobia: number
}

interface DiagnosticResult {
  structure: ClinicalStructure
  certainty: number
  mechanisms: {
    exclusion: boolean
    disavowal: boolean
  }
}

const clampScore = (score: number): number => Math.max(0, Math.min(100, score))

const calculateDimensionScore = (items: readonly string[], answerMap: Record<string, number>): number => {
  const sum = items.reduce((acc, id) => acc + (answerMap[id] ?? 3), 0)
  return clampScore(Math.round((sum / (items.length * 5)) * 100))
}

const performDiagnosis = (rawScores: RawScores): DiagnosticResult => {
  const { fatherFunction, disavowal, repression } = rawScores

  if (fatherFunction >= DIAGNOSTIC_THRESHOLDS.PSYCHOSIS) {
    const certainty = Math.min(95, 60 + (fatherFunction - DIAGNOSTIC_THRESHOLDS.PSYCHOSIS) * 0.8)
    return { structure: 'psychosis', certainty, mechanisms: { exclusion: true, disavowal: false } }
  }

  if (disavowal >= DIAGNOSTIC_THRESHOLDS.PERVERSION) {
    const certainty = Math.min(90, 55 + (disavowal - DIAGNOSTIC_THRESHOLDS.PERVERSION) * 0.7)
    return { structure: 'perversion', certainty, mechanisms: { exclusion: false, disavowal: true } }
  }

  const certainty = Math.min(85, 65 + Math.abs(repression - 60) * 0.3)
  return { structure: 'neurosis', certainty, mechanisms: { exclusion: false, disavowal: false } }
}

export function calculateLacan(answers: Answer[] = []): LacanResult & AssessmentResult {
  const safeAnswers = Array.isArray(answers) ? answers : []
  const answerMap = buildAnswerMap(safeAnswers)

  const rawScores: RawScores = {
    fatherFunction: calculateDimensionScore(DIMENSION_ITEMS.fatherFunction, answerMap),
    disavowal: calculateDimensionScore(DIMENSION_ITEMS.disavowal, answerMap),
    repression: calculateDimensionScore(DIMENSION_ITEMS.repression, answerMap),
    obsession: calculateDimensionScore(DIMENSION_ITEMS.obsession, answerMap),
    hysteria: calculateDimensionScore(DIMENSION_ITEMS.hysteria, answerMap),
    phobia: calculateDimensionScore(DIMENSION_ITEMS.phobia, answerMap),
  }

  const diagnosis = performDiagnosis(rawScores)
  const { structure: clinicalDiagnosis, certainty: diagnosticCertainty, mechanisms } = diagnosis
  const { exclusion: exclusionMechanism, disavowal: disavowalMechanism } = mechanisms

  const dimensionScores: Record<DimensionKey, number> = {
    neurosis: rawScores.repression,
    psychosis: rawScores.fatherFunction,
    perversion: rawScores.disavowal,
    obsession: rawScores.obsession,
    hysteria: rawScores.hysteria,
    phobia: rawScores.phobia,
  }

  const dimensionDetails = dimensionInfo.map((info, i) => {
    const keys = Object.keys(dimensionScores) as (keyof LacanResult['dimensionScores'])[]
    const score = dimensionScores[keys[i]]
    return {
      name: info.name,
      score,
      interpretation: info.interpretation,
    }
  })

  const radarData = dimensionDetails.map(d => ({
    dimension: d.name,
    score: d.score,
    fullMark: 100,
  }))

  const primaryStructure = clinicalStructures.find(s => s.dimension === clinicalDiagnosis)!
  const secondaryStructures = clinicalStructures.filter(s => s.dimension !== clinicalDiagnosis)
  const secondaryStructure = secondaryStructures.reduce((a, b) => 
    dimensionScores[a.dimension as keyof typeof dimensionScores] > 
    dimensionScores[b.dimension as keyof typeof dimensionScores] ? a : b
  )

  const subjectPosition = subjectPositions.find(p => p.condition(dimensionScores))?.title || subjectPositions[3].title
  
  const jouissanceIndex = exclusionMechanism ? 1 : disavowalMechanism ? 2 : dimensionScores.obsession > 60 ? 3 : 0
  const jouissanceType = jouissanceTypes[jouissanceIndex]

  const zizekReading = zizekianReadings.find(r => r.condition(dimensionScores)) || zizekianReadings[2]

  const caseStudyIndex = clinicalDiagnosis === 'psychosis' ? 1 : clinicalDiagnosis === 'perversion' ? 2 : 0
  const caseStudy = caseStudies[caseStudyIndex]

  const dominantNeurosis = Math.max(dimensionScores.obsession, dimensionScores.hysteria, dimensionScores.phobia)

  const getMechanism = () => {
    if (exclusionMechanism) return 'Verwerfung (除权弃绝) — 父性隐喻失败，符号脱落'
    if (disavowalMechanism) return 'Verleugnung (否认) — 拜物教分裂，同时相信与不相信'
    return 'Verdrängung (压抑) — 被压抑者的返回'
  }

  const getFormation = () => {
    if (dimensionScores.obsession === dominantNeurosis) return '隔离 + 移置：思维的无限回溯'
    if (dimensionScores.hysteria === dominantNeurosis) return '转换 + 认同：身体作为欲望的舞台'
    if (dimensionScores.phobia === dominantNeurosis) return '置换 + 逃避：焦虑的具象化锚定'
    return '妥协形成：症状作为欲望与防御的和解'
  }

  const symptomMatrix = {
    formation: getFormation(),
    mechanism: getMechanism(),
    typicalManifestation: disavowalMechanism 
      ? '拜物教式分裂："我很清楚，但还是..."' 
      : dimensionScores.hysteria > dimensionScores.obsession
        ? '癔症式质询："我对于你来说是什么？"'
        : '强迫症式距离：主宰性的不可能性',
  }

  const getOtherRelation = () => {
    if (exclusionMechanism) return '精神病式：与大他者没有中介，直接暴露于实在'
    if (disavowalMechanism) return '倒错式：成为大他者享乐的工具'
    if (dimensionScores.hysteria > 60) return '癔症式："我这样在你看来是什么？"'
    if (dimensionScores.obsession > 60) return '强迫式："如何确保不被大他者欺骗？"'
    return '神经症式：阳具功能下的正常化主体'
  }

  const getObjectARelation = () => {
    if (exclusionMechanism) return '对象a直接涌入，无法符号化'
    if (disavowalMechanism) return '对象a作为否认的支撑、拜物教客体'
    return '对象a作为欲望的原因——永远缺席的客体-成因'
  }

  const diagnosticProfile = {
    subjectPosition: subjectPosition + ` (${diagnosticCertainty.toFixed(0)}% 确定性)`,
    relationToOther: getOtherRelation(),
    jouissanceType: jouissanceType.type + ' — ' + jouissanceType.description,
    objectARelation: getObjectARelation(),
  }

  const clinicalRecommendations = [
    clinicalDiagnosis === 'psychosis' 
      ? '⚠️ 不建议传统精神分析，父性隐喻缺失导致转移无法建立'
      : '✅ 精神分析是可行的：症状具有无意识的真理功能',
    '遵循"不要向你的欲望让步"的精神分析伦理命令',
    '警惕自我心理学：自我就是症状，不是治愈的工具',
    '穿越幻想：不是消除症状，而是认同症状',
  ]

  return {
    dimensionScores,
    dimensionDetails,
    radarData,
    clinicalStructure: {
      primary: primaryStructure.name,
      secondary: secondaryStructure.name,
      description: primaryStructure.description,
      lacanianFormula: primaryStructure.formula,
      certainty: Math.round(diagnosticCertainty),
    },
    diagnosticProfile,
    symptomMatrix,
    zizekReading: {
      ideologicalPosition: zizekReading.ideology,
      enjoymentMode: zizekReading.enjoyment,
      ethicalStance: zizekReading.ethics,
    },
    caseStudy,
    clinicalRecommendations,
    typeName: primaryStructure.name,
    typeEmoji: clinicalDiagnosis === 'psychosis' ? '🔥' : clinicalDiagnosis === 'perversion' ? '🎭' : '🔮',
  }
}
