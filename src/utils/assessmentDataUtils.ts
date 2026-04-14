import type { Assessment } from '../types'

export interface ModeConfig {
  id: 'normal' | 'advanced' | 'professional'
  questionCount: number
  duration: number
  accuracy: string
}

export interface ValidatedAssessmentData {
  isValid: boolean
  errors: string[]
  warnings: string[]
  questionCounts: ModeConfig[]
}

export function getActualQuestionCount(assessment: Assessment, mode: 'normal' | 'advanced' | 'professional'): number {
  if (assessment.professionalQuestions && assessment.professionalQuestions[mode]) {
    return assessment.professionalQuestions[mode].length
  }
  return Math.ceil((assessment.questionCount || assessment.questions.length) * getModeRatio(mode))
}

export function getModeRatio(mode: string): number {
  const ratios: Record<string, number> = {
    normal: 0.33,
    advanced: 0.67,
    professional: 1,
  }
  return ratios[mode] || 1
}

export function getActualDuration(assessment: Assessment, mode: 'normal' | 'advanced' | 'professional'): number {
  const questionCount = getActualQuestionCount(assessment, mode)
  return Math.max(1, Math.ceil(questionCount * 0.25))
}

export function getModeQuestionCounts(assessment: Assessment): ModeConfig[] {
  const modes: ('normal' | 'advanced' | 'professional')[] = ['normal', 'advanced', 'professional']
  return modes.map(mode => ({
    id: mode,
    questionCount: getActualQuestionCount(assessment, mode),
    duration: getActualDuration(assessment, mode),
    accuracy: mode === 'normal' ? '标准准确度' : mode === 'advanced' ? '较高准确度' : '科研级准确度',
  }))
}

export function validateAssessmentData(assessment: Assessment): ValidatedAssessmentData {
  const errors: string[] = []
  const warnings: string[] = []

  if (!assessment.title || assessment.title.trim().length === 0) {
    errors.push('测评标题不能为空')
  }

  if (!assessment.description || assessment.description.trim().length === 0) {
    warnings.push('测评描述建议补充更吸引人的内容')
  }

  const totalQuestions = assessment.questionCount || assessment.questions.length
  if (totalQuestions === 0) {
    if (!assessment.professionalQuestions) {
      errors.push('测评缺少题目数据')
    }
  }

  if (!assessment.duration || assessment.duration <= 0) {
    warnings.push('建议设置合理的测评预计时间')
  }

  const modeCounts = getModeQuestionCounts(assessment)

  modeCounts.forEach(mode => {
    if (mode.questionCount <= 0) {
      warnings.push(`${mode.id} 模式题目数为0，请检查`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    questionCounts: modeCounts,
  }
}

const vividDescriptions: Record<string, string[]> = {
  '人格心理': [
    '探索你内心深处的真实自我，解锁人格密码',
    '一次测评，终身受用的人格深度洞察',
    '科学解构你的性格特质，遇见更好的自己',
  ],
  '认知能力': [
    '挑战你的思维边界，发现隐藏的认知潜能',
    '用科学的标尺丈量你的智力高度',
    '认知觉醒，从了解你的思维模式开始',
  ],
  '职业职场': [
    '找准职业赛道，让天赋发光发热',
    '职场进阶必备，发现你的核心竞争力',
    '用科学工具规划你的职业生涯',
  ],
  '积极心理': [
    '发现内心的力量源泉，打造韧性人生',
    '积极心理学，让幸福成为一种能力',
    '解锁心理资本，迎接人生挑战',
  ],
  '个人成长': [
    '终身学习，从认识你的学习风格开始',
    '元认知觉醒，让成长有迹可循',
    '发现你的学习密码，效率翻倍',
  ],
  '意识形态': [
    '绘制你的思想地图，看清认知坐标',
    '解构价值观，发现你坚守的信念',
    '思想的深度，决定人生的高度',
  ],
  '心理健康': [
    '守护心灵家园，科学监测心理健康',
    '情绪急救站，给自己一次心理体检',
    '看见情绪背后的真实需求',
  ],
  '娱乐趣味': [
    '解锁专属角色，发现你的隐藏身份',
    '沉浸式主题体验，好玩又走心',
    '测完就能发朋友圈的趣味测评',
  ],
}

export function getVividDescription(category: string, title: string): string {
  const categoryDescriptions = vividDescriptions[category] || vividDescriptions['人格心理']
  const randomIndex = Math.floor(title.length * title.charCodeAt(0)) % categoryDescriptions.length
  return categoryDescriptions[randomIndex]
}

export function sanitizeDescription(description: string, category: string, title: string): string {
  const hasJargon = /因子载荷|信效度|常模|测量学|标准化|精细化/.test(description)
  
  if (hasJargon) {
    return getVividDescription(category, title)
  }
  
  if (description.length > 80) {
    const conciseDesc = description.replace(/【.*?】|专业版|题|精细化测量|心理测量学/g, '').trim()
    return conciseDesc.length > 60 ? getVividDescription(category, title) : conciseDesc
  }
  
  return description
}
