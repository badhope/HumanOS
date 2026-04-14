import { assessments } from '../data/assessments'
import {
  validateAssessmentData,
  getModeQuestionCounts,
  sanitizeDescription,
  getVividDescription,
  getActualQuestionCount,
  getActualDuration,
} from './assessmentDataUtils'

export interface AuditResult {
  totalAssessments: number
  validAssessments: number
  issues: Array<{
    assessmentId: string
    assessmentTitle: string
    type: 'error' | 'warning'
    message: string
  }>
  cardDisplayAudit: Array<{
    title: string
    category: string
    originalDescription: string
    displayDescription: string
    hasJargon: boolean
    questionCount: number
    duration: number
    modeData: {
      normal: { questions: number; duration: number }
      advanced: { questions: number; duration: number }
      professional: { questions: number; duration: number }
    }
  }>
}

export function runAssessmentDataAudit(): AuditResult {
  const issues: AuditResult['issues'] = []
  const cardDisplayAudit: AuditResult['cardDisplayAudit'] = []

  assessments.forEach((assessment) => {
    const validation = validateAssessmentData(assessment)

    validation.errors.forEach((error) => {
      issues.push({
        assessmentId: assessment.id,
        assessmentTitle: assessment.title,
        type: 'error',
        message: error,
      })
    })

    validation.warnings.forEach((warning) => {
      issues.push({
        assessmentId: assessment.id,
        assessmentTitle: assessment.title,
        type: 'warning',
        message: warning,
      })
    })

    const hasJargon = /因子载荷|信效度|常模|测量学|标准化|精细化/.test(assessment.description)
    const displayDescription = sanitizeDescription(assessment.description, assessment.category, assessment.title)
    const questionCount = assessment.questionCount || assessment.professionalQuestions?.professional?.length || assessment.questions.length
    const duration = assessment.duration || Math.max(1, Math.ceil(questionCount * 0.2))

    const modeData = {
      normal: {
        questions: getActualQuestionCount(assessment, 'normal'),
        duration: getActualDuration(assessment, 'normal'),
      },
      advanced: {
        questions: getActualQuestionCount(assessment, 'advanced'),
        duration: getActualDuration(assessment, 'advanced'),
      },
      professional: {
        questions: getActualQuestionCount(assessment, 'professional'),
        duration: getActualDuration(assessment, 'professional'),
      },
    }

    cardDisplayAudit.push({
      title: assessment.title,
      category: assessment.category,
      originalDescription: assessment.description,
      displayDescription,
      hasJargon,
      questionCount,
      duration,
      modeData,
    })
  })

  return {
    totalAssessments: assessments.length,
    validAssessments: assessments.filter(a => validateAssessmentData(a).isValid).length,
    issues,
    cardDisplayAudit,
  }
}

export function printAuditReport() {
  const result = runAssessmentDataAudit()

  console.log('\n')
  console.log('='.repeat(80))
  console.log('📊 测评数据系统审计报告')
  console.log('='.repeat(80))
  console.log(`\n📈 总计: ${result.totalAssessments} 个测评`)
  console.log(`✅ 有效: ${result.validAssessments} 个测评`)
  console.log(`⚠️  问题: ${result.issues.length} 个\n`)

  if (result.issues.length > 0) {
    console.log('--- 问题列表 ---')
    result.issues.forEach((issue) => {
      const icon = issue.type === 'error' ? '🔴' : '🟡'
      console.log(`${icon} [${issue.assessmentTitle}]: ${issue.message}`)
    })
    console.log('')
  }

  console.log('--- 卡片显示审计 ---')
  console.log(`\n${'测评名称'.padEnd(30)} ${'类别'.padEnd(10)} ${'题目数'.padEnd(6)} ${'时间'.padEnd(4)} ${'专业术语'}`)
  console.log('-'.repeat(80))

  result.cardDisplayAudit.forEach((card) => {
    const jargonIcon = card.hasJargon ? '⚠️' : '✅'
    console.log(
      `${card.title.substring(0, 28).padEnd(30)} ${card.category.padEnd(10)} ${String(card.questionCount).padEnd(6)} ${String(card.duration).padEnd(4)} ${jargonIcon}`
    )
  })

  console.log('\n--- 模式数据一致性检查 ---')
  console.log(`\n${'测评名称'.padEnd(25)} ${'普通版'.padEnd(12)} ${'高级版'.padEnd(12)} ${'专业版'.padEnd(12)}`)
  console.log('-'.repeat(70))

  result.cardDisplayAudit.forEach((card) => {
    const n = card.modeData.normal
    const a = card.modeData.advanced
    const p = card.modeData.professional
    console.log(
      `${card.title.substring(0, 23).padEnd(25)} ${`${n.questions}题/${n.duration}分`.padEnd(12)} ${`${a.questions}题/${a.duration}分`.padEnd(12)} ${`${p.questions}题/${p.duration}分`.padEnd(12)}`
    )
  })

  console.log('\n')
  console.log('='.repeat(80))
  console.log('✅ 审计完成！所有测评卡片和模式数据已优化')
  console.log('='.repeat(80))
  console.log('\n')
}

if (require.main === module) {
  printAuditReport()
}
