/**
 * 计算引擎日志系统
 * 用于追踪和溯源所有计算过程
 */

export interface CalculationLogEntry {
  timestamp: string
  calculatorId: string
  input: {
    answerCount: number
    questionIds: string[]
    sampleAnswers: Record<string, number>
  }
  processing: {
    dimensionScores: Record<string, number>
    reverseScoringApplied: boolean
    normalizationApplied: boolean
  }
  output: {
    finalScore: number
    dimensionResults: Record<string, any>
    traits?: any[]
    summary?: string
  }
  metadata: {
    calculationTime: number
    version: string
    environment: string
  }
}

export class CalculationLogger {
  private logs: CalculationLogEntry[] = []
  private maxLogs: number = 1000
  
  log(entry: Omit<CalculationLogEntry, 'timestamp' | 'metadata'>): void {
    const fullEntry: CalculationLogEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
      metadata: {
        ...entry.metadata,
        calculationTime: Date.now()
      }
    }
    
    this.logs.push(fullEntry)
    
    // 保持日志数量在限制内
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }
    
    // 同时打印到控制台
    console.log(`[CalculationLog] ${entry.calculatorId} - ${new Date().toISOString()}`)
    console.log(`  输入: ${entry.input.answerCount} 个答案`)
    console.log(`  维度分数:`, entry.processing.dimensionScores)
    console.log(`  最终得分: ${entry.output.finalScore}`)
  }
  
  getLogs(calculatorId?: string): CalculationLogEntry[] {
    if (calculatorId) {
      return this.logs.filter(log => log.calculatorId === calculatorId)
    }
    return [...this.logs]
  }
  
  getLatestLog(): CalculationLogEntry | null {
    return this.logs.length > 0 ? this.logs[this.logs.length - 1] : null
  }
  
  clearLogs(): void {
    this.logs = []
  }
  
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }
  
  saveToLocalStorage(key: string = 'calculationLogs'): void {
    try {
      localStorage.setItem(key, JSON.stringify(this.logs))
    } catch (error) {
      console.error('Failed to save logs to localStorage:', error)
    }
  }
  
  loadFromLocalStorage(key: string = 'calculationLogs'): void {
    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        this.logs = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Failed to load logs from localStorage:', error)
    }
  }
}

// 全局日志实例
export const calculationLogger = new CalculationLogger()

// 包装计算器函数以自动记录日志
export function wrapCalculatorWithLogging<T extends (...args: any[]) => any>(
  calculatorId: string,
  calculator: T
): T {
  return ((answers: any[], ...args: any[]) => {
    const startTime = Date.now()
    
    console.log(`[Calculator] ${calculatorId} - 开始计算`)
    console.log(`  输入答案数: ${answers.length}`)
    
    try {
      const result = calculator(answers, ...args)
      
      const endTime = Date.now()
      const duration = endTime - startTime
      
      // 提取维度分数（如果结果包含）
      const dimensionScores = result.dimensions 
        ? result.dimensions.reduce((acc: Record<string, number>, dim: any) => {
            acc[dim.name] = dim.score
            return acc
          }, {})
        : {}
      
      // 记录日志
      calculationLogger.log({
        calculatorId,
        input: {
          answerCount: answers.length,
          questionIds: answers.map((a: any) => a.questionId),
          sampleAnswers: answers.slice(0, 5).reduce((acc: Record<string, number>, a: any) => {
            acc[a.questionId] = a.value
            return acc
          }, {})
        },
        processing: {
          dimensionScores,
          reverseScoringApplied: false,
          normalizationApplied: true
        },
        output: {
          finalScore: result.score || 0,
          dimensionResults: dimensionScores,
          traits: result.traits,
          summary: result.summary
        },
        metadata: {
          calculationTime: duration,
          version: '1.0.0',
          environment: typeof window !== 'undefined' ? 'browser' : 'node'
        }
      })
      
      console.log(`[Calculator] ${calculatorId} - 计算完成，耗时 ${duration}ms`)
      console.log(`  最终得分: ${result.score || 0}`)
      
      return result
    } catch (error) {
      console.error(`[Calculator] ${calculatorId} - 计算失败:`, error)
      throw error
    }
  }) as T
}

export default calculationLogger
