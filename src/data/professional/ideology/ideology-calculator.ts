import { IDEOLOGY_MODULES, MODULE_WEIGHTS, IDEOLOGY_TAXONOMY, ideologyNormData, type IdeologyModule, type IdeologyQuestion } from './ideology-common.ts'

export interface IdeologyAnswer {
  questionId: string
  value: number
  question: IdeologyQuestion
}

export interface ModuleScore {
  raw: number
  percentage: number
  zScore: number
  percentile: number
  items: number
  reliability: number
  sem: number
}

export interface IdeologyMatch {
  id: string
  label: string
  family: string
  similarity: number
  distance: number
  rank: number
}

export interface IdeologyResult {
  modules: Record<IdeologyModule, ModuleScore>
  composite: {
    leftRight: number
    authoritarianLibertarian: number
    progressiveConservative: number
    nationalistGlobalist: number
  }
  matches: IdeologyMatch[]
  primaryMatch: IdeologyMatch
  secondaryMatches: IdeologyMatch[]
  report: {
    summary: string
    strengths: string[]
    contradictions: string[]
    policyPositions: string[]
  }
  metrics: {
    cronbachAlpha: number
    splitHalfReliability: number
    standardError: number
    consistencyIndex: number
  }
  normComparison: Record<IdeologyModule, { aboveAverage: boolean; percentile: number; sdFromMean: number }>
}

function logisticCDF(z: number): number {
  return 1 / (1 + Math.exp(-0.07056 * z ** 3 - 1.5976 * z))
}

function zToPercentile(z: number): number {
  return Math.round(logisticCDF(z) * 100)
}

function pearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length
  const sumX = x.reduce((a, b) => a + b, 0)
  const sumY = y.reduce((a, b) => a + b, 0)
  const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0)
  const sumX2 = x.reduce((a, b) => a + b * b, 0)
  const sumY2 = y.reduce((a, b) => a + b * b, 0)
  
  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2))
  
  return denominator === 0 ? 0 : numerator / denominator
}

function cronbachAlpha(items: number[][]): number {
  const n = items[0].length
  const itemVars = items.map(col => {
    const mean = col.reduce((a, b) => a + b, 0) / col.length
    return col.reduce((acc, x) => acc + (x - mean) ** 2, 0) / (col.length - 1)
  })
  const sumItemVar = itemVars.reduce((a, b) => a + b, 0)
  const totalScores = items[0].map((_, i) => items.reduce((sum, col) => sum + col[i], 0))
  const meanTotal = totalScores.reduce((a, b) => a + b, 0) / totalScores.length
  const totalVar = totalScores.reduce((acc, x) => acc + (x - meanTotal) ** 2, 0) / (totalScores.length - 1)
  
  return (n / (n - 1)) * (1 - sumItemVar / totalVar)
}

export function calculateIdeologyScores(answers: IdeologyAnswer[]): IdeologyResult {
  const moduleScores: Record<IdeologyModule, { weightedSum: number; maxSum: number; count: number; responses: number[] }> = {
    economic: { weightedSum: 0, maxSum: 0, count: 0, responses: [] },
    social: { weightedSum: 0, maxSum: 0, count: 0, responses: [] },
    diplomatic: { weightedSum: 0, maxSum: 0, count: 0, responses: [] },
    governance: { weightedSum: 0, maxSum: 0, count: 0, responses: [] },
    civil_liberty: { weightedSum: 0, maxSum: 0, count: 0, responses: [] },
    environment: { weightedSum: 0, maxSum: 0, count: 0, responses: [] },
    cultural: { weightedSum: 0, maxSum: 0, count: 0, responses: [] },
    technological: { weightedSum: 0, maxSum: 0, count: 0, responses: [] },
  }

  answers.forEach(({ value, question }) => {
    const module = question.meta.module
    const weight = question.meta.factorLoading * question.meta.discrimination
    const direction = question.meta.direction
    const adjustedValue = direction === 1 ? value : 6 - value
    const weightedValue = adjustedValue * weight
    
    moduleScores[module].weightedSum += weightedValue
    moduleScores[module].maxSum += 5 * weight
    moduleScores[module].count += 1
    moduleScores[module].responses.push(adjustedValue)
  })

  const modules = {} as Record<IdeologyModule, ModuleScore>
  
  IDEOLOGY_MODULES.forEach(module => {
    const ms = moduleScores[module]
    const raw = ms.maxSum > 0 ? (ms.weightedSum / ms.maxSum) * 100 : 50
    const norm = ideologyNormData[module]
    const zScore = (raw - norm.mean) / norm.sd
    const percentile = zToPercentile(zScore)
    const sem = norm.sd * Math.sqrt(1 - norm.reliability)

    modules[module] = {
      raw: Math.round(raw * 10) / 10,
      percentage: Math.round(raw),
      zScore: Math.round(zScore * 100) / 100,
      percentile,
      items: ms.count,
      reliability: norm.reliability,
      sem: Math.round(sem * 10) / 10,
    }
  })

  const composite = {
    leftRight: modules.economic.percentage,
    authoritarianLibertarian: (modules.governance.percentage + modules.civil_liberty.percentage) / 2,
    progressiveConservative: (modules.social.percentage + modules.cultural.percentage) / 2,
    nationalistGlobalist: modules.diplomatic.percentage,
  }

  const userVector = [
    modules.economic.percentage,
    modules.social.percentage,
    modules.diplomatic.percentage,
    modules.governance.percentage,
  ]

  const matches: IdeologyMatch[] = IDEOLOGY_TAXONOMY.map(ideo => {
    const ideoVector = [ideo.position.economic, ideo.position.social, ideo.position.diplomatic, ideo.position.governance]
    const distance = Math.sqrt(userVector.reduce((sum, uv, i) => sum + (uv - ideoVector[i]) ** 2, 0))
    const maxDistance = Math.sqrt(4 * 100 ** 2)
    const similarity = Math.round((1 - distance / maxDistance) * 100)
    
    return {
      id: ideo.id,
      label: ideo.label,
      family: ideo.family,
      similarity,
      distance: Math.round(distance * 10) / 10,
      rank: 0,
    }
  }).sort((a, b) => b.similarity - a.similarity)
    .map((m, i) => ({ ...m, rank: i + 1 }))

  const primaryMatch = matches[0]
  const secondaryMatches = matches.slice(1, 4)

  const allResponses = IDEOLOGY_MODULES.flatMap(m => moduleScores[m].responses)
  const alpha = cronbachAlpha(IDEOLOGY_MODULES.slice(0, 4).map(m => moduleScores[m].responses))
  const half1 = allResponses.filter((_, i) => i % 2 === 0)
  const half2 = allResponses.filter((_, i) => i % 2 === 1)
  const splitHalf = pearsonCorrelation(half1, half2)
  const spearmanBrown = 2 * splitHalf / (1 + splitHalf)

  const consistencyIndex = calculateConsistencyIndex(answers)

  const report = generateReport(modules, primaryMatch, secondaryMatches, composite)

  const normComparison = {} as Record<IdeologyModule, { aboveAverage: boolean; percentile: number; sdFromMean: number }>
  
  IDEOLOGY_MODULES.forEach(module => {
    normComparison[module] = {
      aboveAverage: modules[module].percentage > ideologyNormData[module].mean,
      percentile: modules[module].percentile,
      sdFromMean: modules[module].zScore,
    }
  })

  return {
    modules,
    composite,
    matches,
    primaryMatch,
    secondaryMatches,
    report,
    metrics: {
      cronbachAlpha: Math.round(alpha * 1000) / 1000,
      splitHalfReliability: Math.round(spearmanBrown * 1000) / 1000,
      standardError: Math.round((ideologyNormData.overall.alpha * 3) * 10) / 10,
      consistencyIndex: Math.round(consistencyIndex * 100) / 100,
    },
    normComparison,
  }
}

function calculateConsistencyIndex(answers: IdeologyAnswer[]): number {
  const pairs = [
    ['economic', 'ownership', 'economic', 'privatization'],
    ['social', 'lgbtq', 'social', 'family'],
    ['diplomatic', 'military', 'diplomatic', 'globalization'],
    ['governance', 'transparency', 'governance', 'strongman'],
  ]

  let consistent = 0
  let total = 0

  pairs.forEach(([m1, f1, m2, f2]) => {
    const q1 = answers.find(a => a.question.meta.module === m1 && a.question.meta.facet === f1)
    const q2 = answers.find(a => a.question.meta.module === m2 && a.question.meta.facet === f2)
    
    if (q1 && q2) {
      total++
      const diff = Math.abs(q1.value - q2.value)
      if (diff <= 2) consistent++
    }
  })

  return total > 0 ? consistent / total : 0.8
}

function generateReport(
  modules: Record<IdeologyModule, ModuleScore>,
  primary: IdeologyMatch,
  secondary: IdeologyMatch[],
  composite: Record<string, number>
) {
  const summary = generateSummary(modules, primary, composite)
  const strengths = generateStrengths(modules, composite)
  const contradictions = generateContradictions(modules)
  const policyPositions = generatePolicyPositions(modules)

  return { summary, strengths, contradictions, policyPositions }
}

function generateSummary(modules: Record<IdeologyModule, ModuleScore>, primary: IdeologyMatch, composite: Record<string, number>): string {
  const lr = composite.leftRight
  const al = composite.authoritarianLibertarian
  const quadrant = lr < 40 ? (al < 40 ? '自由左翼' : al > 60 ? '威权左翼' : '左翼中间派') :
                   lr > 60 ? (al < 40 ? '自由右翼' : al > 60 ? '威权右翼' : '右翼中间派') :
                   al < 40 ? '自由中间派' : al > 60 ? '威权中间派' : '中间主义者'

  return `您的意识形态分析显示主要倾向为【${primary.label}】，整体位于政治光谱的${quadrant}区域。` +
         ` 在经济维度上表现为${lr < 33 ? '显著左翼平等主义' : lr < 45 ? '温和左翼倾向' : lr < 55 ? '中间立场' : lr < 67 ? '温和右翼倾向' : '显著右翼自由主义'}，` +
         ` 在社会维度上呈现出${modules.social.percentage < 33 ? '高度进步主义' : modules.social.percentage < 50 ? '温和进步' : modules.social.percentage < 67 ? '温和保守' : '高度传统保守'}的特征。`
}

function generateStrengths(modules: Record<IdeologyModule, ModuleScore>, composite: Record<string, number>): string[] {
  const strengths: string[] = []
  
  if (modules.economic.percentage < 35 || modules.economic.percentage > 65) {
    strengths.push(`经济议题立场明确，具有一贯的${composite.leftRight < 50 ? '平等主义价值取向' : '市场自由主义信念'}`)
  }
  if (modules.social.percentage < 35 || modules.social.percentage > 65) {
    strengths.push(`社会文化观点鲜明，持有坚定的${modules.social.percentage < 50 ? '进步多元理念' : '传统价值信念'}`)
  }
  if (modules.civil_liberty.percentile > 75) {
    strengths.push('公民自由意识显著高于常模，对人权与法治有深刻理解')
  }
  if (modules.environment.percentile > 70) {
    strengths.push('生态意识突出，具有前瞻性的可持续发展思维')
  }
  if (modules.diplomatic.percentile > 70) {
    strengths.push('国际视野开阔，具备全球化思维与人类命运共同体意识')
  }
  if (strengths.length === 0) {
    strengths.push('思想体系平衡务实，在各维度均保持审慎理性')
    strengths.push('具备出色的辩证思维能力，能够多角度审视复杂议题')
  }

  return strengths
}

function generateContradictions(modules: Record<IdeologyModule, ModuleScore>): string[] {
  const contradictions: string[] = []
  
  if (modules.economic.percentage < 30 && modules.governance.percentage > 70) {
    contradictions.push('经济平等诉求与权威治理倾向存在内在张力，建议审视国家干预的边界')
  }
  if (modules.economic.percentage > 70 && modules.social.percentage < 30) {
    contradictions.push('经济自由至上与社会激进进步的组合较为罕见，可探讨自由的一致性')
  }
  if (modules.civil_liberty.percentage < 30 && modules.environment.percentage > 70) {
    contradictions.push('个人自由让位于生态目标，需思考环保政策与公民自由的平衡')
  }
  if (modules.diplomatic.percentage < 30 && modules.cultural.percentage > 70) {
    contradictions.push('民族主义外交与文化多元主义存在潜在冲突')
  }

  return contradictions
}

function generatePolicyPositions(modules: Record<IdeologyModule, ModuleScore>): string[] {
  const positions: string[] = []
  
  if (modules.economic.percentage < 40) {
    positions.push('✊ 支持财富再分配、全民福利国家与关键行业国有化')
    positions.push('🏭 主张强化劳工权利，支持工会与工人参与管理')
  } else if (modules.economic.percentage > 60) {
    positions.push('💹 主张自由市场、低税收、私有化与减少政府管制')
    positions.push('💼 支持企业创新，反对过度的政府干预经济')
  } else {
    positions.push('⚖️ 支持混合经济模式，寻求市场效率与社会公平的平衡')
  }

  if (modules.social.percentage < 40) {
    positions.push('🌈 全面支持性少数权利、性别平等与生殖自主')
    positions.push('🌿 倾向毒品合法化、安乐死等个人自由议题')
  } else if (modules.social.percentage > 60) {
    positions.push('👨‍👩‍👧‍👦 维护传统家庭价值与社会道德秩序')
    positions.push('⛪ 支持宗教在公共生活中发挥积极作用')
  }

  if (modules.diplomatic.percentage > 60) {
    positions.push('🇨🇳 强调国家主权至上，支持强大国防与外交自主')
  } else {
    positions.push('🌍 主张国际合作，支持多边主义与全球治理')
  }

  if (modules.civil_liberty.percentage < 40) {
    positions.push('🛡️ 个人自由优先，反对政府大规模监控计划')
  } else {
    positions.push('🔒 支持国家安全优先，接受必要的监控以防范恐怖主义')
  }

  if (modules.environment.percentage < 40) {
    positions.push('🌱 激进环保立场，支持立即能源转型与碳税')
  }

  return positions
}

export function getConfidenceInterval(score: number, reliability: number, confidence: number = 0.95): [number, number] {
  const se = ideologyNormData.economic.sd * Math.sqrt(1 - reliability)
  const z = confidence === 0.95 ? 1.96 : 2.58
  return [Math.round(score - z * se), Math.round(score + z * se)]
}
