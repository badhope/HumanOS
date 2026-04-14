import type { ECRDimension, ECRQuestion } from './ecr-common'
import { ECR_DIMENSIONS, ECR_DIMENSION_NAMES, ATTACHMENT_STYLES, getAttachmentStyle, ecrNormData, ecrReferences } from './ecr-common'
import type { Answer, AssessmentResult } from '../../../types'

interface RawScores {
  dimensions: Record<ECRDimension, number>
  securityIndex: number
}

function calculateWeightedRawScores(answers: Answer[], questions: ECRQuestion[]): RawScores {
  const dimensionTotals: Record<ECRDimension, { sum: number; count: number; weighted: number }> = {
    anxiety: { sum: 0, count: 0, weighted: 0 },
    avoidance: { sum: 0, count: 0, weighted: 0 },
  }

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId)
    if (question && answer.value !== undefined) {
      const dim = question.meta.dimension
      let value = answer.value
      if (question.meta.reverseScored) {
        value = 8 - value
      }
      
      const weight = question.meta.factorLoading * question.meta.discrimination
      dimensionTotals[dim].sum += value
      dimensionTotals[dim].weighted += value * weight
      dimensionTotals[dim].count++
    }
  })

  const dimensions = {} as Record<ECRDimension, number>

  ECR_DIMENSIONS.forEach(dim => {
    const d = dimensionTotals[dim]
    if (d.count > 0) {
      dimensions[dim] = Math.round(15 + (d.weighted / d.count) * 9)
    } else {
      dimensions[dim] = 50
    }
  })

  const securityIndex = Math.round(100 - ((dimensions.anxiety + dimensions.avoidance) / 2))

  return {
    dimensions,
    securityIndex: Math.max(0, Math.min(100, securityIndex)),
  }
}

function generateAttachmentGrowthPlan(anxiety: number, avoidance: number): string[] {
  const plan: string[] = []
  const style = getAttachmentStyle(anxiety, avoidance)
  
  if (style.quadrant === 'high-low') {
    plan.push('练习自我验证：学习自我安抚，减少对外部确认的依赖')
    plan.push('建立"焦虑日记"，识别触发模式和灾难性思维')
    plan.push('发展兴趣和社交圈，减少单一关系的情感依赖')
  } else if (style.quadrant === 'low-high') {
    plan.push('渐进式脆弱练习：每周分享一次真实感受')
    plan.push('识别回避触发点，觉察关系中的"疏远策略"')
    plan.push('练习承认需求，打破"我不需要任何人"的信念')
  } else if (style.quadrant === 'high-high') {
    plan.push('首先处理核心羞耻感：我值得被爱')
    plan.push('发展心智化能力：区分"想象的抛弃"和"现实"')
    plan.push('创建关系中的安全协议和可预测的节奏')
  } else {
    plan.push('继续维持安全依恋习惯：开放沟通、信任、相互依赖')
    plan.push('成为关系中的安全基地，帮助他人发展安全感')
  }
  
  if (anxiety >= 60) {
    plan.push('焦虑调节：5-4-3-2-1接地技术，惊恐发作时立即使用')
  }
  if (avoidance >= 60) {
    plan.push('依恋修复：每日3分钟的情感连接仪式，抵抗解离冲动')
  }
  
  plan.push('安全依恋是可以习得的：持续觉察 + 安全关系体验 = 神经可塑性改变')
  return plan.slice(0, 6)
}

export function calculateProfessionalECR(
  answers: Answer[],
  questions: ECRQuestion[]
): AssessmentResult {
  const rawScores = calculateWeightedRawScores(answers, questions)
  const style = getAttachmentStyle(rawScores.dimensions.anxiety, rawScores.dimensions.avoidance)

  const dimensionResults = ECR_DIMENSIONS.map(dim => ({
    name: ECR_DIMENSION_NAMES[dim],
    score: rawScores.dimensions[dim],
  }))

  const relationshipTraits: string[] = []
  if (rawScores.securityIndex >= 75) {
    relationshipTraits.push('可靠的安全基地')
    relationshipTraits.push('情绪一致性高')
  }
  if (rawScores.dimensions.anxiety >= 60) {
    relationshipTraits.push('高度情感需求')
    relationshipTraits.push('冲突中容易灾难化')
  }
  if (rawScores.dimensions.avoidance >= 60) {
    relationshipTraits.push('极度重视自主')
    relationshipTraits.push('冲突中倾向撤退')
  }

  return {
    type: 'ECR',
    typeName: '亲密关系体验专业测评',
    typeCode: `ECR-${style.quadrant}-${rawScores.securityIndex}`,
    archetype: style.label,
    title: `依恋风格报告 - ${style.label}`,
    summary: `依恋类型：${style.label}。安全感指数 ${rawScores.securityIndex}/100。${style.description}`,
    description: style.description,
    dimensions: dimensionResults,
    securityIndex: rawScores.securityIndex,
    quadrant: style.quadrant,
    strengths: [
      style.label + '依恋模式已识别',
      `安全感指数：${rawScores.securityIndex}/100`,
    ],
    suggestions: generateAttachmentGrowthPlan(rawScores.dimensions.anxiety, rawScores.dimensions.avoidance),
    relationshipTraits,
    idealPartnerProfile: getIdealPartnerProfile(style.label),
    relationshipAdvice: getRelationshipAdvice(style.label),
    reliability: 0.88,
    standardError: 3.8,
    normSample: ecrNormData.overall.n,
    references: ecrReferences,
  }
}

function getIdealPartnerProfile(styleLabel: string): string[] {
  const profileMap: Record<string, string[]> = {
    '安全型': ['情绪稳定', '一致性高', '既亲密又独立'],
    '专注型': ['耐心包容', '主动表达爱意', '边界清晰的安全型'],
    '冷漠型': ['情感开放', '尊重空间', '低焦虑的安全型'],
    '恐惧型': ['疗愈能力强', '稳定可靠', '专业人士支持下成长'],
    '焦虑倾向型': ['能够持续提供确认', '理解敏感特质'],
    '回避倾向型': ['给与足够空间', '不逼迫亲密'],
    '成长中安全型': ['共同成长', '开放沟通', '相互支持'],
  }
  return profileMap[styleLabel] || ['安全型伴侣是最佳选择']
}

function getRelationshipAdvice(styleLabel: string): string[] {
  const adviceMap: Record<string, string[]> = {
    '安全型': ['保持一致性', '在对方需要时成为安全基地'],
    '专注型': ['当感到焦虑时，直接表达需求而不是测试对方'],
    '冷漠型': ['练习说出"我需要你"，这不是软弱'],
    '恐惧型': ['给自己时间，疗愈是一个过程'],
    '焦虑倾向型': ['建立关系中的"安心仪式"减少不确定性'],
    '回避倾向型': ['在想要撤退之前，告诉对方"我需要一些空间"'],
    '成长中安全型': ['有意识地练习安全依恋行为'],
  }
  return adviceMap[styleLabel] || ['持续觉察，有意识地选择反应方式']
}





