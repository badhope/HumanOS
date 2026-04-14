import type { DimensionAnalysis } from './advancedAnalysisEngine'

export interface ResultCombination {
  combinationId: string
  combinationName: string
  combinationType: 'dominant' | 'balanced' | 'extreme' | 'mixed' | 'complex'
  dimensions: DimensionCombination[]
  probability: number
  rarity: 'common' | 'uncommon' | 'rare' | 'very_rare' | 'legendary'
  characteristics: string[]
  strengths: string[]
  challenges: string[]
  recommendations: string[]
  careerFit: string[]
  relationshipStyle: string[]
  growthPath: string[]
}

export interface DimensionCombination {
  dimensionId: string
  dimensionName: string
  level: string
  score: number
  weight: number
  influence: number
}

export class ResultCombinationGenerator {
  private readonly COMBINATION_TEMPLATES: Record<string, Partial<ResultCombination>> = {
    'VL-VL-VL-VL-VL': {
      combinationName: '深度内向型',
      combinationType: 'extreme',
      rarity: 'legendary',
      characteristics: ['极度内向', '深度思考', '独立性强', '情感敏感'],
      strengths: ['深度分析', '独立工作', '创造力', '专注力'],
      challenges: ['社交困难', '情绪管理', '适应性'],
      recommendations: ['逐步增加社交', '情绪管理训练', '发挥独立优势']
    },
    'VH-VH-VH-VH-VH': {
      combinationName: '全面突出型',
      combinationType: 'extreme',
      rarity: 'legendary',
      characteristics: ['全面发展', '高度活跃', '强烈情感', '开放创新'],
      strengths: ['领导力', '创造力', '执行力', '社交能力'],
      challenges: ['平衡维持', '过度投入', '压力管理'],
      recommendations: ['保持平衡', '压力管理', '持续成长']
    },
    'A-A-A-A-A': {
      combinationName: '完美平衡型',
      combinationType: 'balanced',
      rarity: 'very_rare',
      characteristics: ['高度平衡', '适应性强', '灵活性', '稳定性'],
      strengths: ['适应性', '平衡性', '稳定性', '灵活性'],
      challenges: ['缺乏突出特点', '决策困难'],
      recommendations: ['发展个人特色', '明确目标', '培养优势']
    },
    'H-H-H-H-H': {
      combinationName: '全面优秀型',
      combinationType: 'dominant',
      rarity: 'rare',
      characteristics: ['全面发展', '优秀表现', '积极向上'],
      strengths: ['综合能力', '执行力', '领导力'],
      challenges: ['持续保持', '避免自满'],
      recommendations: ['持续学习', '挑战自我', '帮助他人']
    },
    'L-L-L-L-L': {
      combinationName: '全面待提升型',
      combinationType: 'extreme',
      rarity: 'rare',
      characteristics: ['需要提升', '成长空间大', '潜力待开发'],
      strengths: ['成长潜力', '学习机会', '改善空间'],
      challenges: ['动力不足', '自我怀疑'],
      recommendations: ['设定目标', '寻求支持', '逐步改善']
    }
  }

  generateCombination(dimensionAnalyses: DimensionAnalysis[]): ResultCombination {
    const combinationId = this.generateCombinationId(dimensionAnalyses)
    const template = this.COMBINATION_TEMPLATES[combinationId]
    
    const dimensions = dimensionAnalyses.map(d => ({
      dimensionId: d.dimensionId,
      dimensionName: d.dimensionName,
      level: d.level,
      score: d.normalizedScore,
      weight: this.calculateWeight(d),
      influence: this.calculateInfluence(d, dimensionAnalyses)
    }))

    const combinationType = this.determineCombinationType(dimensionAnalyses)
    const probability = this.calculateProbability(dimensionAnalyses)
    const rarity = this.determineRarity(probability)
    const characteristics = this.generateCharacteristics(dimensionAnalyses)
    const strengths = this.generateStrengths(dimensionAnalyses)
    const challenges = this.generateChallenges(dimensionAnalyses)
    const recommendations = this.generateRecommendations(dimensionAnalyses)
    const careerFit = this.generateCareerFit(dimensionAnalyses)
    const relationshipStyle = this.generateRelationshipStyle(dimensionAnalyses)
    const growthPath = this.generateGrowthPath(dimensionAnalyses)

    return {
      combinationId,
      combinationName: template?.combinationName || this.generateCombinationName(dimensionAnalyses),
      combinationType: template?.combinationType || combinationType,
      dimensions,
      probability,
      rarity: template?.rarity || rarity,
      characteristics: template?.characteristics || characteristics,
      strengths: template?.strengths || strengths,
      challenges: template?.challenges || challenges,
      recommendations: template?.recommendations || recommendations,
      careerFit,
      relationshipStyle,
      growthPath
    }
  }

  private generateCombinationId(dimensionAnalyses: DimensionAnalysis[]): string {
    return dimensionAnalyses.map(d => {
      const levelMap: Record<string, string> = {
        very_low: 'VL',
        low: 'L',
        average: 'A',
        high: 'H',
        very_high: 'VH'
      }
      return levelMap[d.level]
    }).join('-')
  }

  private calculateWeight(dimension: DimensionAnalysis): number {
    const levelWeights: Record<string, number> = {
      very_low: 0.8,
      low: 0.9,
      average: 1.0,
      high: 1.1,
      very_high: 1.2
    }
    
    return levelWeights[dimension.level] * (dimension.confidence || 1.0)
  }

  private calculateInfluence(
    dimension: DimensionAnalysis,
    allDimensions: DimensionAnalysis[]
  ): number {
    const meanScore = allDimensions.reduce((sum, d) => sum + d.normalizedScore, 0) / allDimensions.length
    const deviation = Math.abs(dimension.normalizedScore - meanScore)
    return Math.min(1.0, deviation / 50)
  }

  private determineCombinationType(
    dimensionAnalyses: DimensionAnalysis[]
  ): 'dominant' | 'balanced' | 'extreme' | 'mixed' | 'complex' {
    const levels = dimensionAnalyses.map(d => d.level)
    
    const veryHighCount = levels.filter(l => l === 'very_high').length
    const highCount = levels.filter(l => l === 'high').length
    const veryLowCount = levels.filter(l => l === 'very_low').length
    const lowCount = levels.filter(l => l === 'low').length
    const averageCount = levels.filter(l => l === 'average').length

    if (veryHighCount >= 3 || highCount >= 4) return 'dominant'
    if (veryLowCount >= 3 || lowCount >= 4) return 'extreme'
    if (averageCount >= 3) return 'balanced'
    
    const extremeCount = veryHighCount + veryLowCount
    const moderateCount = highCount + lowCount
    
    if (extremeCount >= 2 && moderateCount >= 2) return 'complex'
    
    return 'mixed'
  }

  private calculateProbability(dimensionAnalyses: DimensionAnalysis[]): number {
    const levels = dimensionAnalyses.map(d => d.level)
    
    const levelProbabilities: Record<string, number> = {
      very_low: 0.05,
      low: 0.20,
      average: 0.50,
      high: 0.20,
      very_high: 0.05
    }

    let probability = 1.0
    levels.forEach(level => {
      probability *= levelProbabilities[level]
    })

    return probability
  }

  private determineRarity(
    probability: number
  ): 'common' | 'uncommon' | 'rare' | 'very_rare' | 'legendary' {
    if (probability >= 0.01) return 'common'
    if (probability >= 0.001) return 'uncommon'
    if (probability >= 0.0001) return 'rare'
    if (probability >= 0.00001) return 'very_rare'
    return 'legendary'
  }

  private generateCharacteristics(dimensionAnalyses: DimensionAnalysis[]): string[] {
    const characteristics: string[] = []
    
    dimensionAnalyses.forEach(d => {
      characteristics.push(...d.traits.slice(0, 2))
    })

    const uniqueCharacteristics = [...new Set(characteristics)]
    return uniqueCharacteristics.slice(0, 8)
  }

  private generateStrengths(dimensionAnalyses: DimensionAnalysis[]): string[] {
    const strengths: string[] = []
    
    dimensionAnalyses.forEach(d => {
      if (d.level === 'high' || d.level === 'very_high') {
        strengths.push(...d.strengths.slice(0, 2))
      }
    })

    const uniqueStrengths = [...new Set(strengths)]
    return uniqueStrengths.slice(0, 6)
  }

  private generateChallenges(dimensionAnalyses: DimensionAnalysis[]): string[] {
    const challenges: string[] = []
    
    dimensionAnalyses.forEach(d => {
      if (d.level === 'low' || d.level === 'very_low') {
        challenges.push(...d.weaknesses.slice(0, 2))
      }
    })

    const uniqueChallenges = [...new Set(challenges)]
    return uniqueChallenges.slice(0, 6)
  }

  private generateRecommendations(dimensionAnalyses: DimensionAnalysis[]): string[] {
    const recommendations: string[] = []
    
    dimensionAnalyses.forEach(d => {
      if (d.level === 'very_high') {
        recommendations.push(`适度调节${d.dimensionName}`)
      } else if (d.level === 'very_low') {
        recommendations.push(`重点提升${d.dimensionName}`)
      } else if (d.level === 'low') {
        recommendations.push(`适当提升${d.dimensionName}`)
      }
    })

    recommendations.push('保持优势', '持续成长', '寻求平衡')
    
    return recommendations.slice(0, 8)
  }

  private generateCareerFit(dimensionAnalyses: DimensionAnalysis[]): string[] {
    const careerFit: string[] = []
    
    const highDimensions = dimensionAnalyses.filter(
      d => d.level === 'high' || d.level === 'very_high'
    )

    highDimensions.forEach(d => {
      const careerMap: Record<string, string[]> = {
        extraversion: ['销售', '公关', '领导', '演讲'],
        agreeableness: ['人力资源', '教育', '医疗', '咨询'],
        conscientiousness: ['管理', '财务', '法律', '工程'],
        neuroticism: ['艺术', '创作', '研究', '心理咨询'],
        openness: ['设计', '研发', '创新', '文化']
      }
      
      careerFit.push(...(careerMap[d.dimensionId] || []))
    })

    const uniqueCareers = [...new Set(careerFit)]
    return uniqueCareers.slice(0, 8)
  }

  private generateRelationshipStyle(dimensionAnalyses: DimensionAnalysis[]): string[] {
    const styles: string[] = []
    
    dimensionAnalyses.forEach(d => {
      const styleMap: Record<string, Record<string, string[]>> = {
        extraversion: {
          very_high: ['社交活跃', '群体导向'],
          high: ['外向社交'],
          average: ['平衡社交'],
          low: ['深度交往'],
          very_low: ['独处偏好']
        },
        agreeableness: {
          very_high: ['高度合作', '包容性强'],
          high: ['友善合作'],
          average: ['平衡合作'],
          low: ['独立自主'],
          very_low: ['原则性强']
        },
        neuroticism: {
          very_high: ['情感丰富', '敏感细腻'],
          high: ['情感表达'],
          average: ['情感平衡'],
          low: ['情感稳定'],
          very_low: ['情感冷静']
        }
      }

      const dimensionStyles = styleMap[d.dimensionId]?.[d.level] || []
      styles.push(...dimensionStyles)
    })

    const uniqueStyles = [...new Set(styles)]
    return uniqueStyles.slice(0, 6)
  }

  private generateGrowthPath(dimensionAnalyses: DimensionAnalysis[]): string[] {
    const paths: string[] = []
    
    const lowDimensions = dimensionAnalyses.filter(
      d => d.level === 'low' || d.level === 'very_low'
    )

    lowDimensions.forEach(d => {
      const pathMap: Record<string, string> = {
        extraversion: '提升社交能力',
        agreeableness: '培养合作精神',
        conscientiousness: '增强自律性',
        neuroticism: '情绪管理训练',
        openness: '拓展视野思维'
      }
      
      paths.push(pathMap[d.dimensionId] || '')
    })

    const highDimensions = dimensionAnalyses.filter(
      d => d.level === 'high' || d.level === 'very_high'
    )

    highDimensions.forEach(d => {
      const pathMap: Record<string, string> = {
        extraversion: '深化社交技巧',
        agreeableness: '提升领导力',
        conscientiousness: '优化执行力',
        neuroticism: '情感智慧培养',
        openness: '创新能力提升'
      }
      
      paths.push(pathMap[d.dimensionId] || '')
    })

    const uniquePaths = paths.filter(p => p)
    return uniquePaths.slice(0, 6)
  }

  private generateCombinationName(dimensionAnalyses: DimensionAnalysis[]): string {
    const dominantDimensions = dimensionAnalyses.filter(
      d => d.level === 'very_high' || d.level === 'high'
    )
    
    const recessiveDimensions = dimensionAnalyses.filter(
      d => d.level === 'very_low' || d.level === 'low'
    )

    if (dominantDimensions.length >= 3) {
      return '多维主导型'
    }
    
    if (recessiveDimensions.length >= 3) {
      return '多维待提升型'
    }
    
    if (dominantDimensions.length >= 2 && recessiveDimensions.length >= 2) {
      return '复杂混合型'
    }
    
    if (dominantDimensions.length === 1) {
      return `${dominantDimensions[0].dimensionName}突出型`
    }
    
    return '平衡发展型'
  }
}

export const resultCombinationGenerator = new ResultCombinationGenerator()
