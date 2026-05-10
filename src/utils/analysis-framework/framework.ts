import { AnalysisDimension } from './types'
import {
  careerDimensions,
  personalityDimensions,
  statusDimensions,
  planningDimensions
} from './dimensions'
import {
  interpretCareer,
  interpretPersonality,
  interpretStatus,
  interpretPlanning,
  interpretComprehensive
} from './interpretation'

export class AnalysisFramework {
  private dimensions: Map<string, AnalysisDimension>

  constructor() {
    this.dimensions = new Map()
    this.initializeDimensions()
  }

  private initializeDimensions(): void {
    ;[...careerDimensions, ...personalityDimensions, ...statusDimensions, ...planningDimensions].forEach(
      dim => this.dimensions.set(dim.id, dim)
    )
  }

  analyzeCareer(assessmentData: any) {
    return interpretCareer(assessmentData)
  }

  analyzePersonality(assessmentData: any) {
    return interpretPersonality(assessmentData)
  }

  analyzeStatus(assessmentData: any) {
    return interpretStatus(assessmentData)
  }

  analyzePlanning(assessmentData: any) {
    return interpretPlanning(assessmentData)
  }

  generateComprehensiveAnalysis(assessmentData: any) {
    const careerAnalysis = this.analyzeCareer(assessmentData)
    const personalityAnalysis = this.analyzePersonality(assessmentData)
    const statusAnalysis = this.analyzeStatus(assessmentData)
    const planningAnalysis = this.analyzePlanning(assessmentData)

    return interpretComprehensive(
      assessmentData,
      careerAnalysis,
      personalityAnalysis,
      statusAnalysis,
      planningAnalysis
    )
  }

  getDimension(dimensionId: string): AnalysisDimension | undefined {
    return this.dimensions.get(dimensionId)
  }

  getAllDimensions(): AnalysisDimension[] {
    return Array.from(this.dimensions.values())
  }

  getDimensionsByCategory(category: string): AnalysisDimension[] {
    return Array.from(this.dimensions.values()).filter(
      dim => dim.category === category
    )
  }
}
