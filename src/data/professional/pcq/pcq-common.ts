export type PcqDimension = 'efficacy' | 'hope' | 'resilience' | 'optimism'

export interface PcqQuestionMeta {
  dimension: PcqDimension
  reverse: boolean
  discrimination: number
  factorLoading: number
}

export const dimensionInfo: Record<PcqDimension, {
  name: string
  description: string
  high: string
  low: string
}> = {
  efficacy: {
    name: '自我效能',
    description: '面对充满信心地应对挑战性工作的能力',
    high: '对自己完成任务的能力充满信心，相信自己能够克服各种困难，勇于接受挑战并坚持到底。',
    low: '对自己的能力缺乏信心，在挑战面前容易退缩，怀疑自己能否成功完成任务。',
  },
  hope: {
    name: '希望',
    description: '坚持目标并在必要时调整路径的意志力',
    high: '对未来充满向往，有明确的目标和实现目标的计划，在遇到障碍时能够灵活调整策略，坚持不懈地追求成功。',
    low: '对未来感到迷茫，缺乏明确的目标，遇到困难容易放弃，难以找到解决问题的替代路径。',
  },
  resilience: {
    name: '韧性',
    description: '从逆境和失败中恢复的能力',
    high: '在逆境中能够保持冷静，迅速从挫折中恢复过来，将困难视为成长的机会，越挫越勇。',
    low: '面对挫折容易一蹶不振，难以从失败的阴影中走出来，在压力下容易崩溃和放弃。',
  },
  optimism: {
    name: '乐观',
    description: '对现在和未来保持积极心态的倾向',
    high: '总是看到事情光明的一面，相信好事会发生，将成功归因于内部稳定的因素，对未来充满积极的期待。',
    low: '倾向于看到事情消极的一面，对未来持悲观态度，容易将失败归因为自己的原因。',
  },
}

export const scoreBands = [
  { min: 0, max: 25, level: '极低心理资本', description: '心理资本严重匮乏，处于心理资源耗尽状态，需要系统性重建积极心理资源' },
  { min: 26, max: 45, level: '低心理资本', description: '心理资本较弱，在逆境中容易感到无助和悲观，需要学习积极心理建设方法' },
  { min: 46, max: 65, level: '中等心理资本', description: '具备基本的心理资本，能够应对常规挑战，在重大逆境中仍需加强心理资源' },
  { min: 66, max: 85, level: '高心理资本', description: '心理资本良好，具备丰富的心理资源，能够有效应对各种挑战和压力' },
  { min: 86, max: 100, level: '极高心理资本', description: 'HERO心理资本富足，是真正的内心强大者，在任何环境下都能保持积极强大的心态' },
]
