import type { AssessmentResult, Question } from '../types'

export interface DimensionAnalysis {
  dimensionId: string
  dimensionName: string
  rawScore: number
  normalizedScore: number
  percentile: number
  level: 'very_low' | 'low' | 'average' | 'high' | 'very_high'
  zScore: number
  confidence: number
  traits: string[]
  strengths: string[]
  weaknesses: string[]
}

export interface CorrelationAnalysis {
  dimension1: string
  dimension2: string
  correlation: number
  strength: 'very_weak' | 'weak' | 'moderate' | 'strong' | 'very_strong'
  direction: 'positive' | 'negative'
  interpretation: string
}

export interface BalanceAnalysis {
  overallBalance: number
  dimensionBalance: Record<string, number>
  balanceType: 'highly_balanced' | 'balanced' | 'somewhat_unbalanced' | 'unbalanced' | 'highly_unbalanced'
  dominantDimensions: string[]
  recessiveDimensions: string[]
  balanceScore: number
}

export interface PatternAnalysis {
  patternId: string
  patternName: string
  patternType: 'dominant' | 'balanced' | 'extreme' | 'complex'
  dimensions: string[]
  probability: number
  characteristics: string[]
  recommendations: string[]
}

export interface ComprehensiveAnalysis {
  assessmentId: string
  overallScore: number
  overallLevel: string
  dimensionAnalyses: DimensionAnalysis[]
  correlationAnalyses: CorrelationAnalysis[]
  balanceAnalysis: BalanceAnalysis
  patternAnalyses: PatternAnalysis[]
  uniqueResultId: string
  resultCombination: string
  totalCombinations: number
  generatedAt: string
}

export class AdvancedAnalysisEngine {
  private readonly LEVEL_THRESHOLDS = {
    very_low: { min: 0, max: 20 },
    low: { min: 20, max: 40 },
    average: { min: 40, max: 60 },
    high: { min: 60, max: 80 },
    very_high: { min: 80, max: 100 }
  }

  private readonly CORRELATION_THRESHOLDS = {
    very_weak: { min: 0, max: 0.2 },
    weak: { min: 0.2, max: 0.4 },
    moderate: { min: 0.4, max: 0.6 },
    strong: { min: 0.6, max: 0.8 },
    very_strong: { min: 0.8, max: 1.0 }
  }

  analyzeDimension(
    dimensionId: string,
    dimensionName: string,
    rawScore: number,
    maxScore: number
  ): DimensionAnalysis {
    const normalizedScore = (rawScore / maxScore) * 100
    const percentile = this.calculatePercentile(normalizedScore)
    const level = this.determineLevel(normalizedScore)
    const zScore = this.calculateZScore(normalizedScore)
    const confidence = this.calculateConfidence(normalizedScore)
    const traits = this.identifyTraits(dimensionId, level)
    const strengths = this.identifyStrengths(dimensionId, level)
    const weaknesses = this.identifyWeaknesses(dimensionId, level)

    return {
      dimensionId,
      dimensionName,
      rawScore,
      normalizedScore,
      percentile,
      level,
      zScore,
      confidence,
      traits,
      strengths,
      weaknesses
    }
  }

  analyzeCorrelation(
    dimension1: DimensionAnalysis,
    dimension2: DimensionAnalysis
  ): CorrelationAnalysis {
    const correlation = this.calculateCorrelation(
      dimension1.normalizedScore,
      dimension2.normalizedScore
    )
    
    const strength = this.determineCorrelationStrength(Math.abs(correlation))
    const direction = correlation >= 0 ? 'positive' : 'negative'
    const interpretation = this.interpretCorrelation(
      dimension1.dimensionName,
      dimension2.dimensionName,
      correlation,
      strength,
      direction
    )

    return {
      dimension1: dimension1.dimensionId,
      dimension2: dimension2.dimensionId,
      correlation,
      strength,
      direction,
      interpretation
    }
  }

  analyzeBalance(dimensionAnalyses: DimensionAnalysis[]): BalanceAnalysis {
    const scores = dimensionAnalyses.map(d => d.normalizedScore)
    const mean = scores.reduce((sum, s) => sum + s, 0) / scores.length
    const variance = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length
    const stdDev = Math.sqrt(variance)
    
    const overallBalance = 100 - (stdDev * 2)
    const dimensionBalance: Record<string, number> = {}
    
    dimensionAnalyses.forEach(d => {
      dimensionBalance[d.dimensionId] = Math.abs(d.normalizedScore - mean)
    })

    const balanceType = this.determineBalanceType(overallBalance)
    const dominantDimensions = dimensionAnalyses
      .filter(d => d.normalizedScore > mean + stdDev)
      .map(d => d.dimensionId)
    const recessiveDimensions = dimensionAnalyses
      .filter(d => d.normalizedScore < mean - stdDev)
      .map(d => d.dimensionId)
    
    const balanceScore = this.calculateBalanceScore(dimensionAnalyses)

    return {
      overallBalance,
      dimensionBalance,
      balanceType,
      dominantDimensions,
      recessiveDimensions,
      balanceScore
    }
  }

  analyzePatterns(
    dimensionAnalyses: DimensionAnalysis[],
    correlationAnalyses: CorrelationAnalysis[]
  ): PatternAnalysis[] {
    const patterns: PatternAnalysis[] = []

    const dominantPattern = this.identifyDominantPattern(dimensionAnalyses)
    if (dominantPattern) patterns.push(dominantPattern)

    const balancedPattern = this.identifyBalancedPattern(dimensionAnalyses)
    if (balancedPattern) patterns.push(balancedPattern)

    const extremePattern = this.identifyExtremePattern(dimensionAnalyses)
    if (extremePattern) patterns.push(extremePattern)

    const complexPatterns = this.identifyComplexPatterns(
      dimensionAnalyses,
      correlationAnalyses
    )
    patterns.push(...complexPatterns)

    return patterns
  }

  generateComprehensiveAnalysis(
    assessmentId: string,
    answers: Record<string, number>,
    questions: Question[]
  ): ComprehensiveAnalysis {
    const dimensionScores = this.calculateDimensionScores(answers, questions)
    const dimensionAnalyses: DimensionAnalysis[] = []
    
    Object.entries(dimensionScores).forEach(([dimensionId, score]) => {
      const dimensionName = this.getDimensionName(dimensionId)
      const maxScore = this.getMaxScoreForDimension(dimensionId, questions)
      dimensionAnalyses.push(
        this.analyzeDimension(dimensionId, dimensionName, score, maxScore)
      )
    })

    const correlationAnalyses: CorrelationAnalysis[] = []
    for (let i = 0; i < dimensionAnalyses.length; i++) {
      for (let j = i + 1; j < dimensionAnalyses.length; j++) {
        correlationAnalyses.push(
          this.analyzeCorrelation(dimensionAnalyses[i], dimensionAnalyses[j])
        )
      }
    }

    const balanceAnalysis = this.analyzeBalance(dimensionAnalyses)
    const patternAnalyses = this.analyzePatterns(dimensionAnalyses, correlationAnalyses)
    
    const overallScore = this.calculateOverallScore(dimensionAnalyses)
    const overallLevel = this.determineOverallLevel(overallScore)
    
    const uniqueResultId = this.generateUniqueResultId(dimensionAnalyses)
    const resultCombination = this.generateResultCombination(dimensionAnalyses)
    const totalCombinations = this.calculateTotalCombinations(dimensionAnalyses.length)

    return {
      assessmentId,
      overallScore,
      overallLevel,
      dimensionAnalyses,
      correlationAnalyses,
      balanceAnalysis,
      patternAnalyses,
      uniqueResultId,
      resultCombination,
      totalCombinations,
      generatedAt: new Date().toISOString()
    }
  }

  private calculatePercentile(score: number): number {
    const zScore = (score - 50) / 15
    return Math.round((1 / (1 + Math.exp(-zScore))) * 100)
  }

  private determineLevel(score: number): 'very_low' | 'low' | 'average' | 'high' | 'very_high' {
    if (score < 20) return 'very_low'
    if (score < 40) return 'low'
    if (score < 60) return 'average'
    if (score < 80) return 'high'
    return 'very_high'
  }

  private calculateZScore(score: number): number {
    return (score - 50) / 15
  }

  private calculateConfidence(score: number): number {
    const distance = Math.abs(score - 50)
    return Math.max(0.5, 1 - (distance / 50))
  }

  private identifyTraits(dimensionId: string, level: string): string[] {
    const traitMap: Record<string, Record<string, string[]>> = {
      extraversion: {
        very_high: ['非常外向', '精力充沛', '善于社交'],
        high: ['外向', '活跃', '喜欢社交'],
        average: ['适度外向', '平衡'],
        low: ['内向', '安静', '独立'],
        very_low: ['非常内向', '独处', '深思']
      },
      agreeableness: {
        very_high: ['非常友善', '富有同情心', '合作'],
        high: ['友善', '体贴', '乐于助人'],
        average: ['适度友善', '平衡'],
        low: ['直接', '竞争性', '独立'],
        very_low: ['批判性', '怀疑', '独立思考']
      },
      conscientiousness: {
        very_high: ['非常尽责', '自律', '有条理'],
        high: ['尽责', '可靠', '有计划'],
        average: ['适度尽责', '平衡'],
        low: ['灵活', '随性', '适应性强'],
        very_low: ['非常灵活', '即兴', '自由']
      },
      neuroticism: {
        very_high: ['情绪敏感', '易焦虑', '情感丰富'],
        high: ['情绪化', '敏感', '有压力'],
        average: ['情绪稳定', '平衡'],
        low: ['情绪稳定', '冷静', '放松'],
        very_low: ['非常稳定', '镇定', '抗压']
      },
      openness: {
        very_high: ['非常开放', '创造力强', '好奇心'],
        high: ['开放', '创新', '好奇'],
        average: ['适度开放', '平衡'],
        low: ['传统', '务实', '稳重'],
        very_low: ['非常传统', '保守', '稳定']
      }
    }

    return traitMap[dimensionId]?.[level] || []
  }

  private identifyStrengths(dimensionId: string, level: string): string[] {
    const strengthMap: Record<string, Record<string, string[]>> = {
      extraversion: {
        very_high: ['社交能力强', '领导力', '表达能力'],
        high: ['人际交往', '团队合作', '沟通'],
        average: ['适应性', '灵活性'],
        low: ['独立工作', '专注力', '深度思考'],
        very_low: ['独处能力', '深度分析', '独立性']
      },
      agreeableness: {
        very_high: ['团队协作', '同理心', '冲突解决'],
        high: ['人际关系', '支持他人', '合作'],
        average: ['平衡性', '适应性'],
        low: ['批判性思维', '独立性', '决策力'],
        very_low: ['客观分析', '独立性', '原则性']
      },
      conscientiousness: {
        very_high: ['执行力', '可靠性', '目标达成'],
        high: ['计划性', '责任感', '效率'],
        average: ['平衡性', '灵活性'],
        low: ['适应性', '创造力', '灵活性'],
        very_low: ['即兴发挥', '适应性', '创新']
      },
      neuroticism: {
        very_high: ['情感敏感度', '同理心', '艺术感知'],
        high: ['情感丰富', '细节关注', '谨慎'],
        average: ['情绪平衡', '稳定性'],
        low: ['抗压能力', '稳定性', '冷静'],
        very_low: ['超强抗压', '稳定性', '冷静']
      },
      openness: {
        very_high: ['创造力', '创新思维', '学习能力'],
        high: ['创新', '学习', '适应性'],
        average: ['平衡性', '实用性'],
        low: ['稳定性', '执行力', '务实'],
        very_low: ['稳定性', '传统价值', '可靠性']
      }
    }

    return strengthMap[dimensionId]?.[level] || []
  }

  private identifyWeaknesses(dimensionId: string, level: string): string[] {
    const weaknessMap: Record<string, Record<string, string[]>> = {
      extraversion: {
        very_high: ['可能冲动', '需要刺激', '难以独处'],
        high: ['可能分散注意力', '需要社交'],
        average: [],
        low: ['可能错过社交机会', '需要推动'],
        very_low: ['社交回避', '孤立倾向']
      },
      agreeableness: {
        very_high: ['可能过于妥协', '难以拒绝'],
        high: ['可能过于迁就'],
        average: [],
        low: ['可能过于直接', '冲突倾向'],
        very_low: ['人际关系挑战', '合作困难']
      },
      conscientiousness: {
        very_high: ['可能过于刻板', '完美主义'],
        high: ['可能过于严格'],
        average: [],
        low: ['可能缺乏计划', '拖延倾向'],
        very_low: ['组织能力挑战', '可靠性问题']
      },
      neuroticism: {
        very_high: ['情绪波动', '焦虑倾向', '压力敏感'],
        high: ['情绪管理挑战', '压力反应'],
        average: [],
        low: ['可能忽视情感信号'],
        very_low: ['可能缺乏情感敏感度']
      },
      openness: {
        very_high: ['可能不切实际', '注意力分散'],
        high: ['可能过于理想化'],
        average: [],
        low: ['可能抗拒变化', '创新不足'],
        very_low: ['适应困难', '创新挑战']
      }
    }

    return weaknessMap[dimensionId]?.[level] || []
  }

  private calculateCorrelation(score1: number, score2: number): number {
    const mean1 = 50
    const mean2 = 50
    const stdDev1 = 15
    const stdDev2 = 15
    
    const z1 = (score1 - mean1) / stdDev1
    const z2 = (score2 - mean2) / stdDev2
    
    return (z1 * z2) / Math.sqrt(z1 * z1 + z2 * z2 + 1)
  }

  private determineCorrelationStrength(
    absCorrelation: number
  ): 'very_weak' | 'weak' | 'moderate' | 'strong' | 'very_strong' {
    if (absCorrelation < 0.2) return 'very_weak'
    if (absCorrelation < 0.4) return 'weak'
    if (absCorrelation < 0.6) return 'moderate'
    if (absCorrelation < 0.8) return 'strong'
    return 'very_strong'
  }

  private interpretCorrelation(
    dim1Name: string,
    dim2Name: string,
    correlation: number,
    strength: string,
    direction: string
  ): string {
    const strengthText = {
      very_weak: '非常弱',
      weak: '弱',
      moderate: '中等',
      strong: '强',
      very_strong: '非常强'
    }[strength]

    const directionText = direction === 'positive' ? '正相关' : '负相关'

    if (direction === 'positive') {
      return `${dim1Name}与${dim2Name}呈现${strengthText}的${directionText}，两者倾向于同步变化`
    } else {
      return `${dim1Name}与${dim2Name}呈现${strengthText}的${directionText}，两者倾向于反向变化`
    }
  }

  private determineBalanceType(
    balance: number
  ): 'highly_balanced' | 'balanced' | 'somewhat_unbalanced' | 'unbalanced' | 'highly_unbalanced' {
    if (balance >= 90) return 'highly_balanced'
    if (balance >= 75) return 'balanced'
    if (balance >= 60) return 'somewhat_unbalanced'
    if (balance >= 40) return 'unbalanced'
    return 'highly_unbalanced'
  }

  private calculateBalanceScore(dimensionAnalyses: DimensionAnalysis[]): number {
    const scores = dimensionAnalyses.map(d => d.normalizedScore)
    const mean = scores.reduce((sum, s) => sum + s, 0) / scores.length
    const variance = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length
    return Math.max(0, 100 - Math.sqrt(variance) * 2)
  }

  private identifyDominantPattern(dimensionAnalyses: DimensionAnalysis[]): PatternAnalysis | null {
    const dominant = dimensionAnalyses.filter(d => d.level === 'very_high' || d.level === 'high')
    
    if (dominant.length >= 2) {
      return {
        patternId: 'dominant_multi',
        patternName: '多维度主导型',
        patternType: 'dominant',
        dimensions: dominant.map(d => d.dimensionId),
        probability: 0.75,
        characteristics: dominant.flatMap(d => d.traits),
        recommendations: this.generateDominantRecommendations(dominant)
      }
    }
    
    return null
  }

  private identifyBalancedPattern(dimensionAnalyses: DimensionAnalysis[]): PatternAnalysis | null {
    const average = dimensionAnalyses.filter(d => d.level === 'average')
    
    if (average.length >= 3) {
      return {
        patternId: 'balanced_multi',
        patternName: '多维度平衡型',
        patternType: 'balanced',
        dimensions: average.map(d => d.dimensionId),
        probability: 0.70,
        characteristics: ['适应性', '灵活性', '平衡性'],
        recommendations: ['保持平衡发展', '关注个人兴趣', '探索潜在优势']
      }
    }
    
    return null
  }

  private identifyExtremePattern(dimensionAnalyses: DimensionAnalysis[]): PatternAnalysis | null {
    const extreme = dimensionAnalyses.filter(
      d => d.level === 'very_high' || d.level === 'very_low'
    )
    
    if (extreme.length >= 2) {
      return {
        patternId: 'extreme_multi',
        patternName: '多维度极端型',
        patternType: 'extreme',
        dimensions: extreme.map(d => d.dimensionId),
        probability: 0.65,
        characteristics: extreme.flatMap(d => d.traits),
        recommendations: this.generateExtremeRecommendations(extreme)
      }
    }
    
    return null
  }

  private identifyComplexPatterns(
    dimensionAnalyses: DimensionAnalysis[],
    correlationAnalyses: CorrelationAnalysis[]
  ): PatternAnalysis[] {
    const patterns: PatternAnalysis[] = []

    const strongCorrelations = correlationAnalyses.filter(
      c => c.strength === 'strong' || c.strength === 'very_strong'
    )

    strongCorrelations.forEach((corr, index) => {
      const dim1 = dimensionAnalyses.find(d => d.dimensionId === corr.dimension1)
      const dim2 = dimensionAnalyses.find(d => d.dimensionId === corr.dimension2)
      
      if (dim1 && dim2) {
        patterns.push({
          patternId: `complex_${index}`,
          patternName: `${dim1.dimensionName}-${dim2.dimensionName}组合型`,
          patternType: 'complex',
          dimensions: [corr.dimension1, corr.dimension2],
          probability: 0.80,
          characteristics: [
            ...dim1.traits.slice(0, 2),
            ...dim2.traits.slice(0, 2)
          ],
          recommendations: this.generateComplexRecommendations(dim1, dim2, corr)
        })
      }
    })

    return patterns
  }

  private generateDominantRecommendations(dominant: DimensionAnalysis[]): string[] {
    return dominant.flatMap(d => d.strengths.slice(0, 2)).concat([
      '发挥主导优势',
      '注意平衡发展',
      '避免过度依赖优势维度'
    ])
  }

  private generateExtremeRecommendations(extreme: DimensionAnalysis[]): string[] {
    const recommendations: string[] = []
    
    extreme.forEach(d => {
      if (d.level === 'very_high') {
        recommendations.push(`适度调节${d.dimensionName}`)
      } else {
        recommendations.push(`适当提升${d.dimensionName}`)
      }
    })
    
    recommendations.push('寻求专业指导', '制定改善计划')
    
    return recommendations
  }

  private generateComplexRecommendations(
    dim1: DimensionAnalysis,
    dim2: DimensionAnalysis,
    correlation: CorrelationAnalysis
  ): string[] {
    const recommendations: string[] = []
    
    if (correlation.direction === 'positive') {
      recommendations.push(
        `利用${dim1.dimensionName}和${dim2.dimensionName}的协同效应`,
        '发挥组合优势',
        '注意可能的过度强化'
      )
    } else {
      recommendations.push(
        `平衡${dim1.dimensionName}和${dim2.dimensionName}的关系`,
        '利用互补优势',
        '避免极端倾向'
      )
    }
    
    return recommendations
  }

  private calculateDimensionScores(
    answers: Record<string, number>,
    questions: Question[]
  ): Record<string, number> {
    const scores: Record<string, number> = {}
    
    questions.forEach(q => {
      const answer = answers[q.id]
      if (answer !== undefined && q.subscale) {
        if (!scores[q.subscale]) {
          scores[q.subscale] = 0
        }
        scores[q.subscale] += answer
      }
    })
    
    return scores
  }

  private getDimensionName(dimensionId: string): string {
    const nameMap: Record<string, string> = {
      extraversion: '外向性',
      agreeableness: '宜人性',
      conscientiousness: '尽责性',
      neuroticism: '神经质',
      openness: '开放性'
    }
    
    return nameMap[dimensionId] || dimensionId
  }

  private getMaxScoreForDimension(dimensionId: string, questions: Question[]): number {
    const dimensionQuestions = questions.filter(q => q.subscale === dimensionId)
    return dimensionQuestions.length * 5
  }

  private calculateOverallScore(dimensionAnalyses: DimensionAnalysis[]): number {
    const scores = dimensionAnalyses.map(d => d.normalizedScore)
    return scores.reduce((sum, s) => sum + s, 0) / scores.length
  }

  private determineOverallLevel(score: number): string {
    if (score >= 80) return '优秀'
    if (score >= 70) return '良好'
    if (score >= 60) return '中等'
    if (score >= 50) return '及格'
    return '需提升'
  }

  private generateUniqueResultId(dimensionAnalyses: DimensionAnalysis[]): string {
    const levelCodes = dimensionAnalyses.map(d => {
      const levelMap: Record<string, string> = {
        very_low: 'VL',
        low: 'L',
        average: 'A',
        high: 'H',
        very_high: 'VH'
      }
      return levelMap[d.level]
    })
    
    return levelCodes.join('-')
  }

  private generateResultCombination(dimensionAnalyses: DimensionAnalysis[]): string {
    const parts = dimensionAnalyses.map(d => 
      `${d.dimensionId}:${d.level}(${d.normalizedScore.toFixed(1)})`
    )
    return parts.join(' | ')
  }

  private calculateTotalCombinations(numDimensions: number): number {
    const levelsPerDimension = 5
    return Math.pow(levelsPerDimension, numDimensions)
  }
}

export const advancedAnalysisEngine = new AdvancedAnalysisEngine()
