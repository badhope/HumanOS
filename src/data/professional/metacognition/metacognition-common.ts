export type MetacognitionDimension = 'knowledge' | 'monitoring' | 'control' | 'reflection'

export interface MetacognitionQuestionMeta {
  dimension: MetacognitionDimension
  reverse: boolean
  discrimination: number
  factorLoading: number
}

export const dimensionInfo: Record<MetacognitionDimension, {
  name: string
  description: string
  high: string
  low: string
}> = {
  knowledge: {
    name: '元认知知识',
    description: '对自己认知过程的了解和认识',
    high: '清楚地了解自己的优势和劣势，知道哪些学习策略对自己有效，能够准确判断自己的知识掌握程度。',
    low: '对自己的认知状态缺乏了解，不清楚自己知道什么不知道什么，不能准确评估自己的能力边界。',
  },
  monitoring: {
    name: '认知监控',
    description: '实时觉察和追踪自己思维过程的能力',
    high: '能够在思考过程中实时觉察自己的思维状态，及时发现理解偏差和错误，保持对自己注意力的觉知。',
    low: '在思考过程中缺乏自我觉察，往往在出现明显错误后才发现，经常走神而不自知。',
  },
  control: {
    name: '认知控制',
    description: '主动调节和管理自己认知过程的能力',
    high: '能够灵活调整学习和思考策略，有效管理自己的注意力和精力，知道何时需要寻求帮助或改变方法。',
    low: '认知策略僵化，不知道何时该调整自己的方法，难以有效管理注意力和学习节奏。',
  },
  reflection: {
    name: '反思复盘',
    description: '事后回顾和总结经验的能力',
    high: '善于从经验中总结规律，能够深入分析自己成功和失败的原因，将反思转化为具体的改进行动。',
    low: '很少主动反思经验，重复犯同样的错误，难以从过去的经历中吸取教训。',
  },
}

export const scoreBands = [
  { min: 0, max: 25, level: '元认知能力极低', description: '对自己的思维过程几乎没有觉知，处于"不知道自己不知道"的状态，需要系统培养元认知意识' },
  { min: 26, max: 45, level: '元认知能力较低', description: '元认知意识薄弱，很少主动监控和反思自己的思维，需要学习基本的元认知策略' },
  { min: 46, max: 65, level: '元认知能力中等', description: '具备基本的元认知能力，在熟悉的领域能够进行认知监控，仍需加强系统性反思' },
  { min: 66, max: 85, level: '元认知能力较高', description: '具有良好的元认知能力，善于监控和调节自己的思维，能够有效地进行自我改进' },
  { min: 86, max: 100, level: '元认知大师', description: '拥有卓越的元认知智慧，深刻理解自己的认知边界，思维的每一步都带有清晰的自我觉知' },
]
