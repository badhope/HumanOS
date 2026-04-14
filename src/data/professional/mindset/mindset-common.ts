export type MindsetDimension = 'challenge' | 'effort' | 'failure' | 'criticism' | 'success'

export interface MindsetQuestionMeta {
  dimension: MindsetDimension
  reverse: boolean
  discrimination: number
  factorLoading: number
}

export const dimensionInfo: Record<MindsetDimension, {
  name: string
  description: string
  high: string
  low: string
}> = {
  challenge: {
    name: '拥抱挑战',
    description: '对待挑战和舒适区之外的机会的态度',
    high: '主动拥抱挑战，视走出舒适区为成长的机会，敢于尝试未知的领域，享受突破自我的过程。',
    low: '回避挑战，宁愿待在舒适区，害怕面对不确定性，对需要努力的新事物感到恐惧。',
  },
  effort: {
    name: '努力信念',
    description: '对努力和付出价值的认知',
    high: '相信努力是通往精通的必经之路，享受深耕的过程，理解真正的能力需要时间和汗水的积累。',
    low: '相信天赋决定一切，认为努力是能力不足的表现，对需要长期投入的事情缺乏耐心。',
  },
  failure: {
    name: '面对挫折',
    description: '面对失败和挫折时的反应模式',
    high: '将失败视为学习的反馈，从错误中吸取教训，在逆境中保持韧性，能够快速调整重新出发。',
    low: '将失败等同于自我价值，遇到挫折容易自我否定，感到无助和绝望，倾向于放弃和逃避。',
  },
  criticism: {
    name: '接纳反馈',
    description: '对待批评和负面反馈的开放程度',
    high: '善于从批评中发现改进的机会，真诚接纳他人的建议，能够区分对事的批评和对人的否定。',
    low: '对批评感到抵触和受伤，本能地为自己辩护，将反馈视为攻击，难以从他人建议中获益。',
  },
  success: {
    name: '看待他人成功',
    description: '看待他人成功和成就的心态',
    high: '能够欣赏他人的成功并从中获得启发，相信他人的成就不会威胁到自己的成长空间。',
    low: '看到他人成功容易感到嫉妒和威胁，倾向于贬低他人的成就，相信成功是零和游戏。',
  },
}

export const scoreBands = [
  { min: 0, max: 25, level: '典型固定型思维', description: '相信能力是天生不变的，回避挑战，害怕失败，你的思维模式正在严重限制你的成长潜力' },
  { min: 26, max: 45, level: '偏向固定型思维', description: '倾向于用固定的眼光看待能力，面对挫折容易退缩，需要刻意练习才能建立成长心态' },
  { min: 46, max: 65, level: '中间型思维模式', description: '在某些领域表现出成长心态，在另一些领域仍受固定思维局限，正在向成长型思维过渡' },
  { min: 66, max: 85, level: '较强成长型思维', description: '拥有良好的成长心态，相信能力可以通过努力发展，能够在挑战和挫折中持续学习' },
  { min: 86, max: 100, level: '卓越成长型思维', description: '真正的终身成长者，深刻理解一切能力都是可以培养的，挑战、挫折、批评都是你成长的燃料' },
]
