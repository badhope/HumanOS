export type HardinessDimension = 'commitment' | 'control' | 'challenge'

export interface HardinessQuestionMeta {
  dimension: HardinessDimension
  reverse: boolean
  discrimination: number
  factorLoading: number
}

export const dimensionInfo: Record<HardinessDimension, {
  name: string
  description: string
  high: string
  low: string
}> = {
  commitment: {
    name: '投入性',
    description: '对生活事件的参与感和意义感知',
    high: '具有强烈的目标感和意义感，全身心投入工作与生活，对周围事物保持好奇心和热情，善于发现日常中的价值和乐趣。',
    low: '容易感到无聊和空虚，对事物缺乏兴趣，难以全身心投入活动，经常感到生活没有方向和意义。',
  },
  control: {
    name: '控制性',
    description: '相信自己能够影响事件发展的信念',
    high: '相信自己的能力能够改变现状，面对困难时主动寻找解决方案，具有强烈的内控倾向，相信命运掌握在自己手中。',
    low: '感到自己无法控制生活中的事情，倾向于外控归因，认为运气和环境决定一切，面对挫折容易产生无助感。',
  },
  challenge: {
    name: '挑战性',
    description: '将变化视为成长机会的态度',
    high: '视变化和挑战为成长的机会，乐于接受新经验，能够从失败中学习和成长，适应能力强，享受突破舒适区的过程。',
    low: '害怕改变和不确定性，倾向于回避挑战，对失败感到恐惧和挫败，难以适应新环境和新要求。',
  },
}

export const scoreBands = [
  { min: 0, max: 25, level: '极低坚韧性', description: '心理韧性严重不足，面对压力极易崩溃，需要系统性地建立心理弹性' },
  { min: 26, max: 45, level: '低坚韧性', description: '心理韧性较弱，面对困难容易放弃，需要学习压力应对技巧' },
  { min: 46, max: 65, level: '中等坚韧性', description: '具有基本的心理韧性，能够应对常规压力，但在重大挑战面前仍需加强' },
  { min: 66, max: 85, level: '高坚韧性', description: '心理韧性良好，面对压力和挫折能够保持稳定，有效应对各种挑战' },
  { min: 86, max: 100, level: '极高坚韧性', description: '具有极强的心理韧性，在极端压力下也能保持冷静，是真正的压力下的强者' },
]
