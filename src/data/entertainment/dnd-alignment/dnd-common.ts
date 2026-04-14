export type EthicsAxis = 'lawful' | 'neutral' | 'chaotic'
export type MoralsAxis = 'good' | 'neutral' | 'evil'
export type AlignmentType = 
  | 'lawful-good' | 'lawful-neutral' | 'lawful-evil'
  | 'neutral-good' | 'true-neutral' | 'neutral-evil'
  | 'chaotic-good' | 'chaotic-neutral' | 'chaotic-evil'

export interface DndQuestionMeta {
  ethics: EthicsAxis
  morals: MoralsAxis
  weight: number
}

export const alignmentProfiles: Record<AlignmentType, {
  name: string
  title: string
  description: string
  quote: string
  archetype: string
  celebrities: string[]
}> = {
  'lawful-good': {
    name: '守序善良',
    title: '圣武士',
    description: '坚信正义与秩序并行不悖，用荣誉和原则守护弱者，是传统意义上的英雄。你相信公正的制度是实现最大善的最佳途径，不会为了"更大的善"而牺牲原则和诚信。',
    quote: '"邪恶可能会赢，但永远不会正确。"',
    archetype: '超人和美国队长',
    celebrities: ['超人', '美国队长', '甘道夫', '亚瑟王'],
  },
  'lawful-neutral': {
    name: '守序中立',
    title: '审判者',
    description: '秩序和法则高于一切，无论是善还是恶。你坚信结构、规则和传统是文明的基石，严格执行法律而不顾及后果，不为道德偏见所动摇。绝对的客观和公正是你的信条。',
    quote: '"我的判断无关仁慈，无关仇恨，只关乎法律本身。"',
    archetype: '法官和官僚',
    celebrities: ['Judge Dredd', '洛萨', '武则天', '戚继光'],
  },
  'lawful-evil': {
    name: '守序邪恶',
    title: '暴君',
    description: '精心策划地、有原则地追求个人利益。你利用制度和规则为自己谋利，尊重传统但不尊重他人，高贵的恶棍和狡猾的阴谋家。你的恶意是有条理的，你的背叛是优雅的。',
    quote: '"权力不是为了分享，而是为了统治。法律？法律是我写的。"',
    archetype: '野心家和独裁者',
    celebrities: ['万磁王', '泰温·兰尼斯特', '伏地魔', '曹操'],
  },
  'neutral-good': {
    name: '中立善良',
    title: '仁者',
    description: '纯粹的利他主义者，行善不求回报，不顾规则或传统的束缚。你做正确的事，不需要激励，不需要感谢。你的善良来自内心深处，不是为了遵守法律也不是为了叛逆。',
    quote: '"如果有人需要帮助，我就帮助他。就这么简单。"',
    archetype: '普通好人',
    celebrities: ['蜘蛛侠', '白求恩', '特蕾莎修女', '郭靖'],
  },
  'true-neutral': {
    name: '绝对中立',
    title: '平衡者',
    description: '万物皆有其位，避免任何极端。你相信所有事物的自然平衡，不偏向善也不偏向恶，不偏向秩序也不偏向混乱。大多数时候你只是想过好自己的小日子。',
    quote: '"万物皆有其时。太阳底下没有新鲜事。"',
    archetype: '普通人和 druid',
    celebrities: ['大多数普通人', '德鲁伊', '庄子', '陶渊明'],
  },
  'neutral-evil': {
    name: '中立邪恶',
    title: '逐利者',
    description: '彻头彻尾的利己主义者，为了自己可以背叛任何人。你没有原则，只有利益。不特别偏爱秩序或混乱，只关心自己能得到什么。只要能逃脱惩罚你什么都敢做。',
    quote: '"道德？那是给弱者的安慰奖。"',
    archetype: '雇佣兵和罪犯',
    celebrities: ['波隆', '小指头贝里席', '吕不韦', '安禄山'],
  },
  'chaotic-good': {
    name: '混乱善良',
    title: '叛逆者',
    description: '用自己的方式行善，不相信也不遵守别人的规则。你听从自己的良心，即使这意味着反抗不公正的制度。自由和平等是你的追求，腐败的系统需要被打破。',
    quote: '"不公正的法律本身就需要被违反。"',
    archetype: '罗宾汉式的英雄',
    celebrities: ['罗宾汉', 'V字仇杀队', '叶问', '孙悟空'],
  },
  'chaotic-neutral': {
    name: '混乱中立',
    title: '狂徒',
    description: '绝对的个人自由高于一切。你做任何自己想做的事，完全凭心情，善变而不可预测。摆脱了社会的期望和道德的束缚，你的人生就是一场随机的冒险。',
    quote: '"为什么？因为我想做，所以我做了。"',
    archetype: '疯子和艺术家',
    celebrities: ['杰克船长', '死侍', '酒仙李白', '阮籍'],
  },
  'chaotic-evil': {
    name: '混乱邪恶',
    title: '毁灭者',
    description: '纯粹的恶意、愤怒和破坏欲。你憎恨一切美好，渴望混乱和痛苦，享受他人的恐惧和折磨。没有计划，没有原则，只有毁灭的冲动和自私的残忍。',
    quote: '"在我身后，洪水滔天。"',
    archetype: '疯子和暴君',
    celebrities: ['小丑', '灭霸', '萨格拉斯', '白起'],
  },
}

export const dimensionInfo = {
  ethics: {
    lawful: { name: '守序', description: '重视规则、传统、社会契约和可预测性' },
    chaotic: { name: '混乱', description: '重视自由、个人意志、自发性和反抗权威' },
    neutral: { name: '中立', description: '不刻意偏向秩序或反叛，务实主义' },
  },
  morals: {
    good: { name: '善良', description: '重视他人福祉、利他主义、仁慈和公平' },
    evil: { name: '邪恶', description: '重视个人利益、权力、支配力和自我满足' },
    neutral: { name: '中立', description: '行善有条件，作恶有底线，普通人心态' },
  },
}
