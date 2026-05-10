/**
 * 多维度主题分析框架 - 核心框架类
 */

import type { 
  ThemeAnalysisModule, 
  ThemeAnalysisResult, 
  ComprehensiveThemeReport,
  ModuleCategory 
} from './types'
import { coreAnalysisModules } from './modules'
import { calculateMetricResult, calculateConfidence } from './scoring'
import { 
  generateFindings,
  generateInterpretations,
  generateRecommendations,
  generateSummary,
  identifyLimitations,
  suggestFurtherResearch,
  generateReportId,
  generateExecutiveSummary,
  performCrossModuleAnalysis,
  generateOverallAssessment,
  generateActionPlan,
  generateAppendices,
  generateMetadata,
  createAnalysisResult
} from './results'
import { validateModule } from './validation'

export class ThemeAnalysisFramework {
  private modules: Map<string, ThemeAnalysisModule>
  private analysisHistory: Map<string, ThemeAnalysisResult[]>

  constructor() {
    this.modules = new Map()
    this.analysisHistory = new Map()
    this.initializeModules()
  }

  private initializeModules(): void {
    coreAnalysisModules.forEach(module => {
      this.modules.set(module.id, module)
    })
  }

  getModule(moduleId: string): ThemeAnalysisModule | undefined {
    return this.modules.get(moduleId)
  }

  getAllModules(): ThemeAnalysisModule[] {
    return Array.from(this.modules.values())
  }

  getModulesByCategory(category: ModuleCategory): ThemeAnalysisModule[] {
    return Array.from(this.modules.values()).filter(m => m.category === category)
  }

  analyzeModule(moduleId: string, data: any): ThemeAnalysisResult {
    const module = this.modules.get(moduleId)
    if (!module) {
      throw new Error(`Module ${moduleId} not found`)
    }

    const validation = validateModule(module)
    if (!validation.isValid) {
      throw new Error(`Module validation failed: ${validation.errors.join(', ')}`)
    }

    const findings = generateFindings(module, data)
    const metrics = calculateMetricResult(module, data)
    const interpretations = generateInterpretations(module, findings, metrics)
    const recommendations = generateRecommendations(module, findings, metrics)

    const result = createAnalysisResult(
      module,
      findings,
      metrics,
      interpretations,
      recommendations,
      calculateConfidence(metrics),
      identifyLimitations(module, data),
      suggestFurtherResearch(module, findings)
    )

    this.recordAnalysis(moduleId, result)
    return result
  }

  analyzeAllModules(data: any): Map<string, ThemeAnalysisResult> {
    const results = new Map<string, ThemeAnalysisResult>()
    
    const sortedModules = this.getSortedModulesByDependency()
    
    for (const module of sortedModules) {
      const moduleData = this.prepareModuleData(module, data, results)
      const result = this.analyzeModule(module.id, moduleData)
      results.set(module.id, result)
    }

    return results
  }

  generateComprehensiveReport(themeName: string, data: any): ComprehensiveThemeReport {
    const moduleResults = this.analyzeAllModules(data)
    const moduleResultsArray = Array.from(moduleResults.values())

    return {
      reportId: generateReportId(),
      themeName,
      analysisDate: new Date().toISOString(),
      version: '1.0',
      executiveSummary: generateExecutiveSummary(moduleResultsArray),
      moduleResults: moduleResultsArray,
      crossModuleAnalysis: performCrossModuleAnalysis(moduleResultsArray),
      overallAssessment: generateOverallAssessment(moduleResultsArray),
      actionPlan: generateActionPlan(moduleResultsArray),
      appendices: generateAppendices(moduleResultsArray),
      metadata: generateMetadata()
    }
  }

  private getSortedModulesByDependency(): ThemeAnalysisModule[] {
    const modules = Array.from(this.modules.values())
    const sorted: ThemeAnalysisModule[] = []
    const visited = new Set<string>()

    const visit = (module: ThemeAnalysisModule) => {
      if (visited.has(module.id)) return
      visited.add(module.id)

      for (const depId of module.dependencies) {
        const dep = this.modules.get(depId)
        if (dep) visit(dep)
      }

      sorted.push(module)
    }

    modules.forEach(m => visit(m))
    return sorted
  }

  private prepareModuleData(
    module: ThemeAnalysisModule, 
    baseData: any, 
    previousResults: Map<string, ThemeAnalysisResult>
  ): any {
    const moduleData = { ...baseData }

    for (const depId of module.dependencies) {
      const depResult = previousResults.get(depId)
      if (depResult) {
        moduleData[`${depId}_result`] = depResult
      }
    }

    return moduleData
  }

  addCustomModule(module: ThemeAnalysisModule): void {
    const validation = validateModule(module)
    if (!validation.isValid) {
      throw new Error(`Invalid module: ${validation.errors.join(', ')}`)
    }
    this.modules.set(module.id, module)
  }

  removeModule(moduleId: string): boolean {
    return this.modules.delete(moduleId)
  }

  getAnalysisHistory(moduleId: string): ThemeAnalysisResult[] {
    return this.analysisHistory.get(moduleId) || []
  }

  exportModuleConfig(moduleId: string): string {
    const module = this.modules.get(moduleId)
    if (!module) {
      throw new Error(`Module ${moduleId} not found`)
    }
    return JSON.stringify(module, null, 2)
  }

  importModuleConfig(config: string): void {
    const module = JSON.parse(config) as ThemeAnalysisModule
    this.addCustomModule(module)
  }

  private recordAnalysis(moduleId: string, result: ThemeAnalysisResult): void {
    if (!this.analysisHistory.has(moduleId)) {
      this.analysisHistory.set(moduleId, [])
    }
    this.analysisHistory.get(moduleId)!.push(result)
  }
}

export const themeAnalysisFramework = new ThemeAnalysisFramework()
