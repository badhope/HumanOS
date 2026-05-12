export interface ThinkCheckResult {
  success: boolean
  H: number
  U: number
  D: number
  A: number
  interpretation: {
    level: string
    grade: string
    description: string
  }
  suggestions: string[]
  warnings: Array<{
    type: string
    terms: string[]
    message: string
  }>
  error?: string
}

const PSYCHOLOGY_TERMS = [
  "情绪", "认知", "行为", "人格", "性格", "心理", "压力", "焦虑", "抑郁",
  "自信", "自尊", "社交", "关系", "沟通", "适应", "成长", "发展", "能力",
  "特质", "倾向", "得分", "维度", "水平", "特征", "表现", "建议", "提升",
  "优势", "劣势", "风险", "机会", "目标", "策略", "执行", "评估", "分析",
  "理解", "表达", "控制", "调节", "感知", "思维", "记忆", "注意", "决策",
  "外向", "内向", "稳定", "波动", "理性", "感性", "独立", "依赖"
]

const ADVERSARIAL_MARKERS = [
  "但是", "然而", "不过", "尽管", "需要注意的是", "必须指出",
  "与此相反", "另一方面", "存在风险", "有待商榷", "虽然", "可是",
  "却", "反而", "其实", "实际上", "事实上"
]

const POSITIVE_MARKERS = [
  "因此", "所以", "由此可见", "综上所述", "这表明", "这说明",
  "表现出", "展现出", "体现了", "反映了", "说明", "表明"
]

function splitSentences(text: string): string[] {
  const normalized = text
    .replace(/；/g, '。')
    .replace(/！/g, '。')
    .replace(/？/g, '。')
    .replace(/\n/g, '。')
    .replace(/\r/g, '')
  
  return normalized
    .split('。')
    .map(s => s.trim())
    .filter(s => s.length > 0)
}

function computeU(text: string, sentences: string[]): number {
  const termOccurrences: Record<string, number> = {}
  
  for (const term of PSYCHOLOGY_TERMS) {
    const count = (text.match(new RegExp(term, 'g')) || []).length
    if (count > 0) {
      termOccurrences[term] = count
    }
  }
  
  if (Object.keys(termOccurrences).length === 0) {
    return 0.8
  }
  
  const totalTerms = Object.values(termOccurrences).reduce((a, b) => a + b, 0)
  const uniqueTerms = Object.keys(termOccurrences).length
  
  const coverage = uniqueTerms / PSYCHOLOGY_TERMS.length
  const density = sentences.length > 0 
    ? Math.min(1.0, totalTerms / (sentences.length * 2)) 
    : 0
  
  return 0.6 * coverage + 0.4 * Math.min(1.0, density * 2)
}

function computeD(text: string, sentences: string[]): number {
  if (sentences.length <= 1) {
    return 0.0
  }
  
  const firstPositions: number[] = []
  
  for (const term of PSYCHOLOGY_TERMS) {
    const pos = text.indexOf(term)
    if (pos >= 0) {
      firstPositions.push(pos / text.length)
    }
  }
  
  if (firstPositions.length <= 1) {
    return 0.5
  }
  
  const meanPos = firstPositions.reduce((a, b) => a + b, 0) / firstPositions.length
  const variance = firstPositions.reduce((sum, p) => sum + Math.pow(p - meanPos, 2), 0) / firstPositions.length
  const std = Math.sqrt(variance)
  
  return Math.min(1.0, std * 3.0)
}

function computeA(text: string, sentences: string[]): number {
  if (sentences.length === 0) {
    return 0.0
  }
  
  let markerCount = 0
  for (const sent of sentences) {
    for (const marker of ADVERSARIAL_MARKERS) {
      if (sent.includes(marker)) {
        markerCount++
        break
      }
    }
  }
  
  const markerDensity = markerCount / sentences.length
  
  let positiveCount = 0
  for (const sent of sentences) {
    for (const marker of POSITIVE_MARKERS) {
      if (sent.includes(marker)) {
        positiveCount++
        break
      }
    }
  }
  
  const positiveDensity = positiveCount / sentences.length
  
  return Math.min(1.0, Math.max(0, markerDensity - positiveDensity * 0.5))
}

function computeHarmony(
  U: number, 
  D: number, 
  A: number,
  lambdaU: number = 0.4,
  lambdaD: number = 0.4,
  lambdaA: number = 0.2
): number {
  return lambdaU * U + lambdaD * D - lambdaA * A
}

function interpretHarmony(H: number): { level: string; grade: string; description: string } {
  if (H >= 0.75) {
    return {
      level: "优秀",
      grade: "A",
      description: "报告逻辑高度一致，论述清晰，无明显矛盾。"
    }
  } else if (H >= 0.65) {
    return {
      level: "良好",
      grade: "B",
      description: "报告逻辑较为一致，论述基本清晰，存在少量可优化之处。"
    }
  } else if (H >= 0.50) {
    return {
      level: "中等",
      grade: "C",
      description: "报告逻辑基本合理，但存在一些不一致或矛盾之处，建议优化。"
    }
  } else {
    return {
      level: "待改进",
      grade: "D",
      description: "报告逻辑存在较多问题，建议重新审视和修改。"
    }
  }
}

function generateSuggestions(
  H: number, 
  U: number, 
  D: number, 
  A: number,
  sentences: string[]
): string[] {
  const suggestions: string[] = []
  
  if (A > 0.3) {
    suggestions.push("报告中存在较多转折或矛盾表述，建议检查逻辑一致性")
  }
  
  if (U < 0.5) {
    suggestions.push("报告中心理学术语使用较少，建议增加专业术语以提高报告专业性")
  }
  
  if (D < 0.3) {
    suggestions.push("报告结构较为集中，建议增加更多维度的分析内容")
  }
  
  if (sentences.length < 3) {
    suggestions.push("报告内容较短，建议补充更多详细分析")
  }
  
  if (H >= 0.75) {
    suggestions.push("报告整体质量优秀，逻辑清晰，继续保持")
  } else if (H >= 0.65) {
    suggestions.push("报告整体质量良好，可以进一步优化细节")
  }
  
  return suggestions
}

function getWarnings(text: string): Array<{ type: string; terms: string[]; message: string }> {
  const warnings: Array<{ type: string; terms: string[]; message: string }> = []
  
  const contradictionPairs = [
    ["自信", "自卑"],
    ["外向", "内向"],
    ["稳定", "波动"],
    ["理性", "感性"],
    ["独立", "依赖"],
    ["优势", "劣势"],
  ]
  
  for (const [term1, term2] of contradictionPairs) {
    if (text.includes(term1) && text.includes(term2)) {
      warnings.push({
        type: "potential_contradiction",
        terms: [term1, term2],
        message: `报告中同时出现「${term1}」和「${term2}」，请检查是否存在矛盾`
      })
    }
  }
  
  return warnings
}

export function evaluateReport(text: string): ThinkCheckResult {
  if (!text || !text.trim()) {
    return {
      success: false,
      H: 0,
      U: 0,
      D: 0,
      A: 0,
      interpretation: {
        level: "无效",
        grade: "-",
        description: "文本内容为空"
      },
      suggestions: [],
      warnings: [],
      error: "文本内容为空"
    }
  }
  
  const sentences = splitSentences(text)
  
  const U = computeU(text, sentences)
  const D = computeD(text, sentences)
  const A = computeA(text, sentences)
  const H = computeHarmony(U, D, A)
  
  const interpretation = interpretHarmony(H)
  const suggestions = generateSuggestions(H, U, D, A, sentences)
  const warnings = getWarnings(text)
  
  return {
    success: true,
    H: Math.round(H * 100) / 100,
    U: Math.round(U * 100) / 100,
    D: Math.round(D * 100) / 100,
    A: Math.round(A * 100) / 100,
    interpretation,
    suggestions,
    warnings
  }
}

export function formatReportWithEvaluation(
  originalReport: string,
  evaluation: ThinkCheckResult
): string {
  if (!evaluation.success) {
    return originalReport
  }
  
  const evaluationSection = `

---
## 📊 报告逻辑健康度评估

**综合评分**: ${evaluation.H.toFixed(2)} (${evaluation.interpretation.grade} - ${evaluation.interpretation.level})

${evaluation.interpretation.description}

### 详细指标
- **一致性 (U)**: ${(evaluation.U * 100).toFixed(0)}% - 概念使用的一致性程度
- **分布性 (D)**: ${(evaluation.D * 100).toFixed(0)}% - 内容结构的分布均匀度
- **矛盾性 (A)**: ${(evaluation.A * 100).toFixed(0)}% - 逻辑矛盾的检测程度

${evaluation.suggestions.length > 0 ? `
### 优化建议
${evaluation.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}
` : ''}

${evaluation.warnings.length > 0 ? `
### ⚠️ 注意事项
${evaluation.warnings.map(w => `- ${w.message}`).join('\n')}
` : ''}
`
  
  return originalReport + evaluationSection
}

export default {
  evaluateReport,
  formatReportWithEvaluation
}
