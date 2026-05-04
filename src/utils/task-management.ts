import { v4 as uuidv4 } from 'uuid'

export type TaskType = 'coding' | 'debugging' | 'analysis' | 'writing' | 'research' | 'refactoring' | 'testing' | 'documentation'

export type TaskLayer = 'meta' | 'workflow' | 'action'

export type TaskRole = 'planner' | 'orchestrator' | 'reflector' | 'coordinator' | 'executor'

export type TaskState = 'initialized' | 'planning' | 'decomposed' | 'scheduling' | 'executing' | 'aggregating' | 'reflecting' | 'completed' | 'retry' | 'partial_failure' | 'degraded_completion' | 'failed'

export type ComplexityFactor = 'multi-step' | 'cross-file' | 'external-api' | 'domain-expertise' | 'long-running' | 'security-critical' | 'concurrent'

export interface Complexity {
  score: number
  factors: ComplexityFactor[]
}

export interface Constraint {
  type: 'technical' | 'time' | 'quality' | 'resource' | 'security'
  description: string
}

export interface TaskInput {
  query: string
  context?: Record<string, unknown>
  constraints?: Constraint[]
}

export interface Subtask {
  id: string
  skill: string
  description: string
  dependencies?: string[]
  priority: 'critical' | 'high' | 'medium' | 'low'
  parallel?: boolean
  estimatedTime?: string
}

export interface TaskMetrics {
  startTime?: string
  endTime?: string
  tokensUsed?: number
  actionsCount?: number
}

export interface Task {
  taskId: string
  parentId?: string
  type: TaskType
  layer: TaskLayer
  role?: TaskRole
  complexity?: Complexity
  input: TaskInput
  decomposition?: {
    strategy: 'sequential' | 'parallel' | 'hybrid'
    subtasks: Subtask[]
  }
  state: TaskState
  results?: unknown[]
  metrics?: TaskMetrics
  metadata?: Record<string, unknown>
}

export function createTask(input: TaskInput, options: {
  type: TaskType
  layer: TaskLayer
  parentId?: string
}): Task {
  return {
    taskId: uuidv4(),
    parentId: options.parentId,
    type: options.type,
    layer: options.layer,
    input,
    state: 'initialized'
  }
}

export function calculateComplexity(input: TaskInput): Complexity {
  const factors: ComplexityFactor[] = []
  let score = 1

  if (input.query.length > 100) {
    factors.push('multi-step')
    score += 2
  }

  if (input.context && Object.keys(input.context).length > 5) {
    factors.push('domain-expertise')
    score += 1
  }

  if (input.constraints?.some(c => c.type === 'security')) {
    factors.push('security-critical')
    score += 2
  }

  if (input.query.includes('api') || input.query.includes('API')) {
    factors.push('external-api')
    score += 1
  }

  if (input.query.includes('多个') || input.query.includes('多个') || input.query.includes('所有') || input.query.includes('全部')) {
    factors.push('cross-file')
    score += 2
  }

  return {
    score: Math.min(score, 10),
    factors
  }
}

export function updateTaskState(task: Task, newState: TaskState): Task {
  const now = new Date().toISOString()
  
  if (newState === 'executing' && !task.metrics?.startTime) {
    task.metrics = task.metrics || {}
    task.metrics.startTime = now
  }
  
  if (['completed', 'failed', 'partial_failure', 'degraded_completion'].includes(newState) && !task.metrics?.endTime) {
    task.metrics = task.metrics || {}
    task.metrics.endTime = now
  }

  return { ...task, state: newState }
}

export interface Reflection {
  taskId: string
  analysis: {
    successes: string[]
    failures: string[]
    patterns: string[]
    rootCauses: string[]
  }
  lessons: string[]
  recommendations: {
    action: string
    priority: 'critical' | 'high' | 'medium' | 'low'
  }[]
  timestamp: string
}

export function generateReflection(task: Task): Reflection {
  const analysis: Reflection['analysis'] = {
    successes: [],
    failures: [],
    patterns: [],
    rootCauses: []
  }

  if (task.state === 'completed') {
    analysis.successes.push('任务已完成')
    if (task.complexity && task.complexity.score >= 7) {
      analysis.successes.push('处理了高复杂度任务')
    }
  } else if (task.state === 'failed') {
    analysis.failures.push('任务失败')
    if (task.complexity?.factors.includes('external-api')) {
      analysis.rootCauses.push('外部API依赖可能导致失败')
    }
  }

  const lessons: string[] = []
  if (analysis.successes.length > 0) {
    lessons.push('成功完成任务，流程有效')
  }
  if (analysis.failures.length > 0) {
    lessons.push('任务失败，需要改进处理方式')
  }

  const recommendations: Reflection['recommendations'] = []
  if (!task.complexity) {
    recommendations.push({
      action: '添加复杂度评估以更好地规划任务',
      priority: 'high'
    })
  }

  return {
    taskId: task.taskId,
    analysis,
    lessons,
    recommendations,
    timestamp: new Date().toISOString()
  }
}