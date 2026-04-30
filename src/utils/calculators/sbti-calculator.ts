import type { Answer } from '../../types'

interface SBTIDimension {
  name: string
  score: number
  percentage: number
  preference: string
  color: string
}

interface SBTIResult {
  typeCode: string
  typeName: string
  typeDescription: string
  dimensions: SBTIDimension[]
  strengths: string[]
  blindSpots: string[]
  careerSuggestions: string[]
  overall: string
  title: string
  subtitle: string
  summary: string
}

const DIMENSION_NAMES = {
  extraversion: '能量倾向',
  sensing: '信息获取',
  thinking: '决策方式',
  judging: '生活态度',
}

const TYPE_NAMES: Record<string, string> = {
  INTJ: '建筑师',
  INTP: '逻辑学家',
  ENTJ: '指挥官',
  ENTP: '辩论家',
  INFJ: '提倡者',
  INFP: '调停者',
  ENFJ: '主人公',
  ENFP: '竞选者',
  ISTJ: '物流师',
  ISFJ: '守卫者',
  ESTJ: '总经理',
  ESFJ: '执政官',
  ISTP: '鉴赏家',
  ISFP: '探险家',
  ESTP: '企业家',
  ESFP: '表演者',
}

function getTypeDescription(type: string): string {
  const descriptions: Record<string, string> = {
    INTJ: '富有想象力和战略性的思想家，一切皆在计划之中',
    INTP: '具有创造力的发明家，对知识有着止不住的渴望',
    ENTJ: '大胆、富有想象力且意志强大的领导者',
    ENTP: '聪明好奇的思想者，不会放弃任何智力上的挑战',
    INFJ: '安静而神秘，同时鼓舞人心且不知疲倦的理想主义者',
    INFP: '诗意、善良的利他主义者，总是热情地为正当理由提供帮助',
    ENFJ: '富有魅力且鼓舞人心的领导者',
    ENFP: '热情、有创造力、社交自由的人',
    ISTJ: '实际且注重事实的个人，可靠性不容怀疑',
    ISFJ: '非常专注且热情的保护者',
    ESTJ: '出色的管理者',
    ESFJ: '极有同情心、爱社交的人',
    ISTP: '大胆而实际的实验家',
    ISFP: '灵活且有魅力的艺术家',
    ESTP: '聪明、精力充沛且善于感知的人',
    ESFP: '自发的、精力充沛的表演者',
  }
  return descriptions[type] || '独特而有魅力的人格类型'
}

function getStrengths(type: string): string[] {
  const allStrengths = [
    '强大的分析和战略思维能力',
    '高度的自律和责任感',
    '出色的抽象思维能力',
    '强烈的直觉和洞察力',
    '富有同理心和人际交往能力',
  ]
  return allStrengths.slice(0, 3)
}

function getCareers(type: string): string[] {
  const careers = {
    T: ['软件工程师', '数据科学家', '管理咨询', '战略规划'],
    F: ['心理咨询师', '教育工作者', '人力资源', '社会工作'],
  }
  return type.includes('T') ? careers.T : careers.F
}

export function calculateSBTI(answers: Answer[]): SBTIResult {
  const normalized = answers.map((a: any) => {
    const qid = typeof a.questionId === 'number'
      ? a.questionId
      : parseInt(String(a.questionId || '').replace('sbti-', '') || '1')
    const val = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    return { qid, val }
  })

  let eScore = 0, sScore = 0, tScore = 0, jScore = 0
  let eCount = 0, sCount = 0, tCount = 0, jCount = 0

  normalized.forEach(({ qid, val }) => {
    const adjusted = val - 3
    if (qid <= 10) { eScore += adjusted; eCount++ }
    else if (qid <= 20) { sScore += adjusted; sCount++ }
    else if (qid <= 30) { tScore += adjusted; tCount++ }
    else { jScore += adjusted; jCount++ }
  })

  const E = eScore + 25
  const S = sScore + 25
  const T = tScore + 25
  const J = jScore + 25

  const typeCode =
    (E >= 25 ? 'E' : 'I') +
    (S >= 25 ? 'S' : 'N') +
    (T >= 25 ? 'T' : 'F') +
    (J >= 25 ? 'J' : 'P')

  const typeName = TYPE_NAMES[typeCode] || typeCode

  const dimensions: SBTIDimension[] = [
    { name: DIMENSION_NAMES.extraversion, score: E, percentage: Math.round((E / 50) * 100), preference: E >= 25 ? 'E' : 'I', color: '#F59E0B' },
    { name: DIMENSION_NAMES.sensing, score: S, percentage: Math.round((S / 50) * 100), preference: S >= 25 ? 'S' : 'N', color: '#8B5CF6' },
    { name: DIMENSION_NAMES.thinking, score: T, percentage: Math.round((T / 50) * 100), preference: T >= 25 ? 'T' : 'F', color: '#EC4899' },
    { name: DIMENSION_NAMES.judging, score: J, percentage: Math.round((J / 50) * 100), preference: J >= 25 ? 'J' : 'P', color: '#06B6D4' },
  ]

  return {
    typeCode,
    typeName,
    typeDescription: getTypeDescription(typeCode),
    dimensions,
    strengths: getStrengths(typeCode),
    blindSpots: ['可能过度分析', '需要更好地表达情感', '完美主义倾向'],
    careerSuggestions: getCareers(typeCode),
    overall: typeName,
    title: `你的人格类型: ${typeCode} - ${typeName}`,
    subtitle: `${typeCode} 人格`,
    summary: `经鉴定，你是 ${typeCode} ${typeName} - ${getTypeDescription(typeCode)}`,
  }
}
