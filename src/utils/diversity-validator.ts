import { calculatePSS, calculateSDS, calculateMFT } from './calculators/professional-calculators-factory'

export type AnswerPersonality = 
  | 'extreme-preferrer'      // 极端选项偏好者 - 只选1或5
  | 'midpoint-lover'         // 中间项爱好者 - 只选3
  | 'left-skewed'            // 左偏 - 倾向1-2
  | 'right-skewed'           // 右偏 - 倾向4-5
  | 'uniform-random'         // 完全随机
  | 'consistent-acquiescer'  // 默许偏差 - 都选同意

export interface SimulationResult {
  simulationId: string
  personality: AnswerPersonality
  totalScore: number
  isomerAnalysis: any
  demographicSegment: any
  themeRelevance: any
  allFieldsPresent: boolean
  missingFields: string[]
}

export interface DiversityReport {
  totalSimulations: number
  uniqueArchetypes: string[]
  archetypeDistribution: Record<string, number>
  groupDistribution: Record<string, number>
  scoreEntropy: number
  fieldCompleteness: Record<string, number>
  problemCases: SimulationResult[]
}

class MonteCarloSimulator {
  private generateAnswer(
    personality: AnswerPersonality,
    questionId: string,
    scalePoints: number = 5
  ): number {
    const midpoint = (scalePoints + 1) / 2
    const max = scalePoints
    const noise = () => (Math.random() - 0.5) * 0.8

    switch (personality) {
      case 'extreme-preferrer':
        return Math.random() > 0.5 ? 1 : max
      case 'midpoint-lover':
        return midpoint + Math.floor(noise())
      case 'left-skewed':
        return Math.max(1, Math.floor(Math.random() * 2 + 1 + noise()))
      case 'right-skewed':
        return Math.min(max, Math.floor(Math.random() * 2 + 4 + noise()))
      case 'consistent-acquiescer':
        return Math.min(max, Math.floor(Math.random() * 2 + 3 + noise()))
      case 'uniform-random':
      default:
        return Math.floor(Math.random() * scalePoints + 1)
    }
  }

  simulatePersonality(
    calculator: Function,
    questionIds: string[],
    personality: AnswerPersonality,
    id: number
  ): SimulationResult {
    const answers = questionIds.map(qid => ({
      questionId: qid,
      value: this.generateAnswer(personality, qid),
    }))

    const result = calculator(answers)
    
    const requiredFields = [
      'isomerAnalysis',
      'demographicSegment',
      'isomerAnalysis.archetype',
      'isomerAnalysis.extremity',
      'isomerAnalysis.midpointAvoidance',
      'demographicSegment.group',
      'demographicSegment.coordinates',
    ]

    const missingFields = requiredFields.filter(field => {
      const parts = field.split('.')
      let current: any = result
      for (const p of parts) {
        if (current === undefined || current === null) return true
        current = current[p]
      }
      return current === undefined
    })

    return {
      simulationId: `${personality}-${id}`,
      personality,
      totalScore: result.score || result.totalScore || 0,
      isomerAnalysis: result.isomerAnalysis,
      demographicSegment: result.demographicSegment,
      themeRelevance: result.themeRelevance,
      allFieldsPresent: missingFields.length === 0,
      missingFields,
    }
  }

  runBatch(
    calculator: Function,
    questionIds: string[],
    simulationsPerPersonality: number = 20
  ): DiversityReport {
    const personalities: AnswerPersonality[] = [
      'extreme-preferrer',
      'midpoint-lover',
      'left-skewed',
      'right-skewed',
      'uniform-random',
      'consistent-acquiescer',
    ]

    const allResults: SimulationResult[] = []
    let id = 0

    personalities.forEach(personality => {
      for (let i = 0; i < simulationsPerPersonality; i++) {
        allResults.push(this.simulatePersonality(calculator, questionIds, personality, id++))
      }
    })

    const archetypeCounts: Record<string, number> = {}
    const groupCounts: Record<string, number> = {}
    const completeness: Record<string, number> = {
      isomerAnalysis: 0,
      demographicSegment: 0,
      themeRelevance: 0,
      allFields: 0,
    }

    allResults.forEach(r => {
      if (r.isomerAnalysis) {
        completeness.isomerAnalysis++
        const arch = r.isomerAnalysis.archetype || '未知'
        archetypeCounts[arch] = (archetypeCounts[arch] || 0) + 1
      }
      if (r.demographicSegment) {
        completeness.demographicSegment++
        const group = r.demographicSegment.group || '未分类'
        groupCounts[group] = (groupCounts[group] || 0) + 1
      }
      if (r.themeRelevance) completeness.themeRelevance++
      if (r.allFieldsPresent) completeness.allFields++
    })

    const scoreVariance = allResults.length > 1
      ? allResults.reduce((s, r) => s + Math.pow(r.totalScore - 50, 2), 0) / allResults.length
      : 0
    const scoreEntropy = Math.min(10, Math.log10(scoreVariance + 1))

    return {
      totalSimulations: allResults.length,
      uniqueArchetypes: Object.keys(archetypeCounts),
      archetypeDistribution: archetypeCounts,
      groupDistribution: groupCounts,
      scoreEntropy,
      fieldCompleteness: Object.fromEntries(
        Object.entries(completeness).map(([k, v]) => [k, v / allResults.length])
      ),
      problemCases: allResults.filter(r => !r.allFieldsPresent),
    }
  }
}

export async function runFullDiversityAudit() {
  console.log('\n🚀 开始多样性验证...\n')
  
  const simulator = new MonteCarloSimulator()
  
  const pssIds = Array.from({ length: 20 }, (_, i) => `pss_n0${i + 1}`)
  const sdsIds = Array.from({ length: 20 }, (_, i) => `sds_n0${i + 1}`)
  const mftIds = Array.from({ length: 30 }, (_, i) => `mft${i + 1}`)

  console.log('📊 测试 PSS 压力感知量表...')
  const pssReport = simulator.runBatch(calculatePSS, pssIds, 20)
  
  console.log('📊 测试 SDS 抑郁筛查量表...')
  const sdsReport = simulator.runBatch(calculateSDS, sdsIds, 20)
  
  console.log('📊 测试 MFT 道德基础量表...')
  const mftReport = simulator.runBatch(calculateMFT, mftIds, 20)

  return {
    summary: {
      totalSimulations: pssReport.totalSimulations + sdsReport.totalSimulations + mftReport.totalSimulations,
      overallCompleteness: {
        isomerAnalysis: Math.round(((
          pssReport.fieldCompleteness.isomerAnalysis +
          sdsReport.fieldCompleteness.isomerAnalysis +
          mftReport.fieldCompleteness.isomerAnalysis
        ) / 3) * 100) + '%',
        demographicSegment: Math.round(((
          pssReport.fieldCompleteness.demographicSegment +
          sdsReport.fieldCompleteness.demographicSegment +
          mftReport.fieldCompleteness.demographicSegment
        ) / 3) * 100) + '%',
      },
      uniqueArchetypesDiscovered: new Set([
        ...pssReport.uniqueArchetypes,
        ...sdsReport.uniqueArchetypes,
        ...mftReport.uniqueArchetypes,
      ]).size,
    },
    pssReport,
    sdsReport,
    mftReport,
  }
}

if (require.main === module) {
  runFullDiversityAudit().then(report => {
    console.log('\n' + '='.repeat(60))
    console.log('📋 多样性验证最终报告')
    console.log('='.repeat(60))
    console.log(`总模拟次数: ${report.summary.totalSimulations}`)
    console.log(`同分异构字段覆盖率: ${report.summary.overallCompleteness.isomerAnalysis}`)
    console.log(`人群分数字段覆盖率: ${report.summary.overallCompleteness.demographicSegment}`)
    console.log(`发现认知亚型数量: ${report.summary.uniqueArchetypesDiscovered}`)
    console.log('\n' + '='.repeat(60))
    console.log('PSS 认知亚型分布:')
    Object.entries(report.pssReport.archetypeDistribution).forEach(([k, v]) => {
      console.log(`  ${k}: ${v}次`)
    })
    console.log('\nSDS 认知亚型分布:')
    Object.entries(report.sdsReport.archetypeDistribution).forEach(([k, v]) => {
      console.log(`  ${k}: ${v}次`)
    })
    console.log('\nMFT 认知亚型分布:')
    Object.entries(report.mftReport.archetypeDistribution).forEach(([k, v]) => {
      console.log(`  ${k}: ${v}次`)
    })
    console.log('='.repeat(60))
    
    const totalProblems = report.pssReport.problemCases.length + report.sdsReport.problemCases.length + report.mftReport.problemCases.length
    if (totalProblems > 0) {
      console.log(`\n⚠️  发现 ${totalProblems} 个问题案例`)
    } else {
      console.log('\n✅ 全部案例通过！多样性引擎工作正常！')
    }
    console.log('='.repeat(60) + '\n')
  })
}
