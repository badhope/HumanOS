/**
 * 多维度主题分析框架 - 验证逻辑
 */

import type { 
  ThemeAnalysisModule, 
  ThemeAnalysisResult, 
  ComprehensiveThemeReport,
  ModuleCategory 
} from './types'
import { coreAnalysisModules } from './modules'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validateModule(module: ThemeAnalysisModule): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!module.id || module.id.trim() === '') {
    errors.push('Module ID is required')
  }

  if (!module.name || module.name.trim() === '') {
    errors.push('Module name is required')
  }

  if (!module.category) {
    errors.push('Module category is required')
  } else if (!isValidCategory(module.category)) {
    errors.push(`Invalid module category: ${module.category}`)
  }

  if (module.weight < 0 || module.weight > 1) {
    errors.push('Module weight must be between 0 and 1')
  }

  if (!module.researchGoal || !module.researchGoal.primary) {
    errors.push('Research goal primary objective is required')
  }

  if (!module.dataCollection || !module.dataCollection.type) {
    errors.push('Data collection configuration is required')
  }

  if (!module.analysisFramework || !module.analysisFramework.methodology) {
    errors.push('Analysis framework configuration is required')
  }

  if (!module.evaluationMetrics || module.evaluationMetrics.length === 0) {
    warnings.push('Module has no evaluation metrics defined')
  }

  if (module.dependencies && module.dependencies.length > 0) {
    for (const depId of module.dependencies) {
      const depModule = coreAnalysisModules.find(m => m.id === depId)
      if (!depModule) {
        warnings.push(`Dependency module "${depId}" not found in core modules`)
      }
    }
  }

  if (module.evaluationMetrics) {
    for (const metric of module.evaluationMetrics) {
      if (!metric.id || !metric.name) {
        errors.push(`Metric missing required fields: id or name`)
      }
      if (metric.scale.range[0] >= metric.scale.range[1]) {
        errors.push(`Metric ${metric.id}: range min must be less than max`)
      }
      if (metric.benchmarks.length === 0) {
        warnings.push(`Metric ${metric.id} has no benchmark levels defined`)
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateThemeAnalysisResult(result: ThemeAnalysisResult): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!result.moduleId) {
    errors.push('Result module ID is required')
  }

  if (!result.moduleName) {
    errors.push('Result module name is required')
  }

  if (result.confidence < 0 || result.confidence > 1) {
    errors.push('Confidence must be between 0 and 1')
  }

  if (result.findings && result.findings.length > 0) {
    for (const finding of result.findings) {
      if (!finding.id) {
        errors.push('Finding missing ID')
      }
      if (!finding.description) {
        errors.push('Finding missing description')
      }
    }
  }

  if (result.metrics && result.metrics.length > 0) {
    for (const metric of result.metrics) {
      if (metric.percentile !== undefined) {
        if (metric.percentile < 0 || metric.percentile > 100) {
          errors.push(`Metric ${metric.metricId}: percentile must be between 0 and 100`)
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateComprehensiveReport(report: ComprehensiveThemeReport): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!report.reportId) {
    errors.push('Report ID is required')
  }

  if (!report.themeName) {
    errors.push('Theme name is required')
  }

  if (!report.analysisDate) {
    errors.push('Analysis date is required')
  }

  if (!report.moduleResults || report.moduleResults.length === 0) {
    warnings.push('Report has no module results')
  }

  if (!report.executiveSummary) {
    warnings.push('Report missing executive summary')
  }

  if (!report.crossModuleAnalysis) {
    warnings.push('Report missing cross-module analysis')
  }

  if (!report.overallAssessment) {
    warnings.push('Report missing overall assessment')
  }

  if (!report.actionPlan) {
    warnings.push('Report missing action plan')
  }

  if (!report.metadata) {
    warnings.push('Report missing metadata')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateModuleDependencies(moduleId: string): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const visited = new Set<string>()

  const checkDependencies = (id: string, path: string[]): void => {
    if (visited.has(id)) {
      if (path.includes(id)) {
        errors.push(`Circular dependency detected: ${path.join(' -> ')} -> ${id}`)
      }
      return
    }

    visited.add(id)
    const module = coreAnalysisModules.find(m => m.id === id)

    if (!module) {
      errors.push(`Module not found: ${id}`)
      return
    }

    for (const depId of module.dependencies) {
      checkDependencies(depId, [...path, id])
    }
  }

  checkDependencies(moduleId, [])

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateAnalysisData(data: any): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!data || typeof data !== 'object') {
    errors.push('Analysis data must be an object')
    return { isValid: false, errors, warnings }
  }

  if (data.sampleSize !== undefined) {
    if (typeof data.sampleSize !== 'number' || data.sampleSize <= 0) {
      errors.push('Sample size must be a positive number')
    }
  }

  if (data.modules) {
    if (!Array.isArray(data.modules)) {
      errors.push('Modules must be an array')
    } else {
      for (const moduleId of data.modules) {
        const module = coreAnalysisModules.find(m => m.id === moduleId)
        if (!module) {
          warnings.push(`Unknown module ID: ${moduleId}`)
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

function isValidCategory(category: string): boolean {
  const validCategories: ModuleCategory[] = [
    'theoretical',
    'empirical',
    'comparative',
    'historical',
    'behavioral',
    'contextual',
    'predictive',
    'evaluative'
  ]
  return validCategories.includes(category as ModuleCategory)
}

export function validateModuleConfig(config: string): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  try {
    const parsed = JSON.parse(config)

    if (!parsed.id) {
      errors.push('Config missing module id')
    }

    if (!parsed.name) {
      errors.push('Config missing module name')
    }

    if (!parsed.category) {
      errors.push('Config missing module category')
    } else if (!isValidCategory(parsed.category)) {
      errors.push(`Invalid category: ${parsed.category}`)
    }

    if (parsed.weight !== undefined) {
      if (typeof parsed.weight !== 'number' || parsed.weight < 0 || parsed.weight > 1) {
        errors.push('Weight must be a number between 0 and 1')
      }
    }

  } catch (e) {
    errors.push('Invalid JSON format')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}
