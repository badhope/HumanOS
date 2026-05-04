import { Task, Reflection } from './task-management'

export interface PerformanceMetrics {
  totalTasks: number
  completedTasks: number
  failedTasks: number
  avgCompletionTime: number
  avgComplexity: number
  successRate: number
}

export interface LearningInsight {
  id: string
  category: 'success' | 'failure' | 'pattern' | 'recommendation'
  title: string
  description: string
  applicableContexts: string[]
  confidence: number
}

export interface ImprovementPlan {
  id: string
  objective: string
  actions: ImprovementAction[]
  timeline: string
  successMetrics: string[]
}

export interface ImprovementAction {
  id: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  owner?: string
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  dependencies?: string[]
}

export class ReflectionEngine {
  private reflections: Reflection[] = []
  private insights: LearningInsight[] = []

  reflect(task: Task): Reflection {
    const reflection = this.generateComprehensiveReflection(task)
    this.reflections.push(reflection)
    this.extractInsights(reflection)
    return reflection
  }

  private generateComprehensiveReflection(task: Task): Reflection {
    const analysis = {
      successes: this.analyzeSuccesses(task),
      failures: this.analyzeFailures(task),
      patterns: this.identifyPatterns(task),
      rootCauses: this.determineRootCauses(task)
    }

    const lessons = this.extractLessons(analysis)
    const recommendations = this.generateRecommendations(task, analysis)

    return {
      taskId: task.taskId,
      analysis,
      lessons,
      recommendations,
      timestamp: new Date().toISOString()
    }
  }

  private analyzeSuccesses(task: Task): string[] {
    const successes: string[] = []
    
    if (task.state === 'completed') {
      successes.push('任务成功完成')
    }
    
    if (task.complexity && task.complexity.score >= 7 && task.state === 'completed') {
      successes.push('成功处理高复杂度任务')
    }
    
    if (task.metrics?.actionsCount && task.metrics.actionsCount < 10) {
      successes.push('高效完成，操作次数较少')
    }
    
    return successes
  }

  private analyzeFailures(task: Task): string[] {
    const failures: string[] = []
    
    if (task.state === 'failed') {
      failures.push('任务执行失败')
    }
    
    if (task.state === 'partial_failure') {
      failures.push('任务部分失败')
    }
    
    if (task.metrics?.actionsCount && task.metrics.actionsCount > 50) {
      failures.push('操作次数过多，效率较低')
    }
    
    return failures
  }

  private identifyPatterns(task: Task): string[] {
    const patterns: string[] = []
    
    if (task.complexity?.factors.includes('cross-file')) {
      patterns.push('涉及多个文件修改')
    }
    
    if (task.complexity?.factors.includes('external-api')) {
      patterns.push('依赖外部API')
    }
    
    if (task.layer === 'meta') {
      patterns.push('元任务层操作')
    }
    
    return patterns
  }

  private determineRootCauses(task: Task): string[] {
    const causes: string[] = []
    
    if (task.state === 'failed' && task.complexity?.factors.includes('external-api')) {
      causes.push('外部API依赖可能是失败原因')
    }
    
    if (task.state === 'failed' && !task.complexity) {
      causes.push('缺少复杂度评估可能导致计划不足')
    }
    
    return causes
  }

  private extractLessons(analysis: Reflection['analysis']): string[] {
    const lessons: string[] = []
    
    if (analysis.successes.length > 0) {
      lessons.push('成功完成任务，当前流程有效')
    }
    
    if (analysis.failures.length > 0) {
      lessons.push('任务失败，需要改进处理方式')
    }
    
    if (analysis.patterns.length > 0) {
      lessons.push(`识别到模式: ${analysis.patterns.join(', ')}`)
    }
    
    if (analysis.rootCauses.length > 0) {
      lessons.push(`发现根本原因: ${analysis.rootCauses.join(', ')}`)
    }
    
    return lessons
  }

  private generateRecommendations(task: Task, analysis: Reflection['analysis']): Reflection['recommendations'] {
    const recommendations: Reflection['recommendations'] = []
    
    if (!task.complexity) {
      recommendations.push({
        action: '添加复杂度评估以更好地规划任务',
        priority: 'high'
      })
    }
    
    if (analysis.failures.length > 0) {
      recommendations.push({
        action: '分析失败原因并优化相关流程',
        priority: 'critical'
      })
    }
    
    if (task.metrics?.actionsCount && task.metrics.actionsCount > 30) {
      recommendations.push({
        action: '优化工作流程，减少操作步骤',
        priority: 'medium'
      })
    }
    
    if (task.complexity?.factors.includes('cross-file')) {
      recommendations.push({
        action: '考虑模块化设计以减少跨文件依赖',
        priority: 'medium'
      })
    }
    
    return recommendations
  }

  private extractInsights(reflection: Reflection) {
    reflection.lessons.forEach(lesson => {
      const insight: LearningInsight = {
        id: `${reflection.taskId}-${Date.now()}`,
        category: reflection.analysis.successes.length > 0 ? 'success' : 'failure',
        title: lesson,
        description: `从任务 ${reflection.taskId} 中学习到的经验`,
        applicableContexts: ['general'],
        confidence: 0.8
      }
      this.insights.push(insight)
    })
  }

  getPerformanceMetrics(): PerformanceMetrics {
    const completed = this.reflections.filter(r => {
      const task = this.findTaskByTaskId(r.taskId)
      return task?.state === 'completed'
    })
    
    const failed = this.reflections.filter(r => {
      const task = this.findTaskByTaskId(r.taskId)
      return task?.state === 'failed'
    })

    const avgTime = completed.length > 0
      ? completed.reduce((sum, r) => {
          const task = this.findTaskByTaskId(r.taskId)
          if (task?.metrics?.startTime && task.metrics.endTime) {
            const start = new Date(task.metrics.startTime).getTime()
            const end = new Date(task.metrics.endTime).getTime()
            return sum + (end - start)
          }
          return sum
        }, 0) / completed.length
      : 0

    const avgComplexity = this.reflections.length > 0
      ? this.reflections.reduce((sum, r) => {
          const task = this.findTaskByTaskId(r.taskId)
          return sum + (task?.complexity?.score || 0)
        }, 0) / this.reflections.length
      : 0

    return {
      totalTasks: this.reflections.length,
      completedTasks: completed.length,
      failedTasks: failed.length,
      avgCompletionTime: avgTime,
      avgComplexity,
      successRate: this.reflections.length > 0 ? completed.length / this.reflections.length : 0
    }
  }

  findTaskByTaskId(taskId: string): Task | undefined {
    return undefined
  }

  generateImprovementPlan(): ImprovementPlan {
    const metrics = this.getPerformanceMetrics()
    const actions: ImprovementAction[] = []

    if (metrics.successRate < 0.8) {
      actions.push({
        id: 'improv-1',
        description: '分析失败任务的根本原因',
        priority: 'critical',
        status: 'pending'
      })
    }

    if (metrics.avgComplexity < 3) {
      actions.push({
        id: 'improv-2',
        description: '增加复杂任务的处理能力',
        priority: 'high',
        status: 'pending'
      })
    }

    return {
      id: `plan-${Date.now()}`,
      objective: '提升任务处理效率和成功率',
      actions,
      timeline: '30天',
      successMetrics: ['成功率提升至90%', '平均完成时间减少20%']
    }
  }

  getInsights(): LearningInsight[] {
    return this.insights
  }

  getReflections(): Reflection[] {
    return this.reflections
  }
}

export const reflectionEngine = new ReflectionEngine()