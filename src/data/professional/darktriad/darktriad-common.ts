import type { ProfessionalQuestion } from '../../../types'

export const DARKTRIAD_DIMENSIONS = ['machiavellianism', 'narcissism', 'psychopathy', 'sadism'] as const

export type DarkTriadDimension = typeof DARKTRIAD_DIMENSIONS[number]

export const DARKTRIAD_DIMENSION_NAMES: Record<DarkTriadDimension, string> = {
  machiavellianism: '马基雅维利主义',
  narcissism: '自恋',
  psychopathy: '精神病态',
  sadism: '施虐倾向',
}

export const DARKTRIAD_DIMENSION_FULL_NAMES: Record<DarkTriadDimension, string> = {
  machiavellianism: '马基雅维利主义 (权谋操纵型)',
  narcissism: '自恋 (自我中心型)',
  psychopathy: '精神病态 (冷酷无情型)',
  sadism: '施虐倾向 (支配伤害型)',
}

export const DARKTRIAD_DIMENSION_DESCRIPTIONS: Record<DarkTriadDimension, string> = {
  machiavellianism: '为达目的不择手段，擅长操纵他人，实用主义至上，道德感淡漠',
  narcissism: '极度自我中心，坚信自身优越，爱慕虚荣，渴望他人崇拜与特殊对待',
  psychopathy: '缺乏共情能力，情感冷酷，行为冲动，漠视责任与规则',
  sadism: '从他人痛苦中获得愉悦，强烈的支配欲望，享受攻击性带来的满足感',
}

export const DARKTRIAD_DIMENSION_BANDS: Record<string, Array<{ range: [number, number]; band: string; description: string }>> = {
  machiavellianism: [
    { range: [0, 10], band: '极端天真', description: '完全没有城府，比白纸还纯，相信所有人都是好人' },
    { range: [11, 20], band: '典型小白兔', description: '非常单纯善良，习惯性相信别人，容易被操控' },
    { range: [21, 30], band: '温和单纯', description: '比较实在，不玩心眼，但也不会被轻易骗到' },
    { range: [31, 40], band: '轻微单纯', description: '轻度理想主义，待人真诚但开始有基本防备心' },
    { range: [41, 45], band: '略偏诚实', description: '微偏向正直，做事光明磊落但也懂人情世故' },
    { range: [46, 54], band: '中间型', description: '权谋与诚实平衡，该真诚时真诚，该保护自己时也会' },
    { range: [55, 59], band: '略偏策略', description: '微偏向实用，开始懂得策略和权衡' },
    { range: [60, 69], band: '轻微策略', description: '轻度实用主义，有策略思维，但守底线' },
    { range: [70, 79], band: '温和权谋', description: '偏马基雅维利，擅长运筹帷幄，不达目的不罢休' },
    { range: [80, 89], band: '典型权谋', description: '标准的权谋家，操纵大师，结果就是一切' },
    { range: [90, 100], band: '极端权谋', description: '究极腹黑，为达目的可以牺牲任何人，没有任何道德束缚' },
  ],
  narcissism: [
    { range: [0, 10], band: '极度自卑', description: '完全没有自我价值感，把自己看得一文不值' },
    { range: [11, 20], band: '典型自卑', description: '非常不自信，总觉得自己不够好，习惯性讨好' },
    { range: [21, 30], band: '温和谦卑', description: '比较谦虚低调，很少自我炫耀，但有基本自尊' },
    { range: [31, 40], band: '轻微谦逊', description: '轻度不张扬，踏实做事，不追求虚名' },
    { range: [41, 45], band: '略偏低调', description: '微偏向内敛，不喜欢成为焦点但也不排斥认可' },
    { range: [46, 54], band: '中间型', description: '自信与谦逊平衡，既能肯定自己也能欣赏他人' },
    { range: [55, 59], band: '略偏自信', description: '微偏向表现，愿意展示自己的优点' },
    { range: [60, 69], band: '轻微自信', description: '轻度喜欢被赞美，自信且有一定表现欲' },
    { range: [70, 79], band: '温和自恋', description: '偏自我中心，相信自己与众不同，渴望关注' },
    { range: [80, 89], band: '典型自恋', description: '标准的自恋者，优越感爆棚，需要持续的崇拜供养' },
    { range: [90, 100], band: '极端自恋', description: '宇宙的中心，凡人皆为我所用，我就是真理本身' },
  ],
  psychopathy: [
    { range: [0, 10], band: '极度共情', description: '共情过载，别人打个喷嚏你都心疼半天' },
    { range: [11, 20], band: '典型圣母', description: '非常心软，见不得别人受苦，总是牺牲自己' },
    { range: [21, 30], band: '温和善良', description: '比较有同情心，乐于助人且真诚' },
    { range: [31, 40], band: '轻微心软', description: '轻度感性，看到别人难过自己也会难受' },
    { range: [41, 45], band: '略偏感性', description: '微偏向共情，大部分时候能理解他人感受' },
    { range: [46, 54], band: '中间型', description: '共情与理性平衡，既能理解也能抽离' },
    { range: [55, 59], band: '略偏理性', description: '微偏向冷静，多数时候能够保持客观' },
    { range: [60, 69], band: '轻微冷静', description: '轻度情感隔离，做决定很少受情绪影响' },
    { range: [70, 79], band: '温和冷酷', description: '偏无情，情感淡薄，很难真正关心别人' },
    { range: [80, 89], band: '典型冷酷', description: '标准的冷血动物，没有共情，没有愧疚，没有恐惧' },
    { range: [90, 100], band: '极端冷酷', description: '行走的捕食者，人类只是NPC，你的痛苦与我何干？' },
  ],
  sadism: [
    { range: [0, 10], band: '极度受虐', description: '完全不敢反抗，别人怎么对你都默默忍受' },
    { range: [11, 20], band: '典型顺从', description: '非常温和，宁愿自己吃亏也不想伤害任何人' },
    { range: [21, 30], band: '温和友善', description: '比较和平，尽量避免冲突，希望大家都好' },
    { range: [31, 40], band: '轻微友善', description: '轻度讨好，不喜欢看到任何人不愉快' },
    { range: [41, 45], band: '略偏和平', description: '微偏向和谐，大多数时候愿意让步' },
    { range: [46, 54], band: '中间型', description: '支配与顺从平衡，人不犯我我不犯人' },
    { range: [55, 59], band: '略偏支配', description: '微偏向强势，必要时会维护自己的边界' },
    { range: [60, 69], band: '轻微强势', description: '轻度竞争性，喜欢赢，享受支配感' },
    { range: [70, 79], band: '温和施虐', description: '偏攻击性，看着别人认输有种隐秘的快感' },
    { range: [80, 89], band: '典型施虐', description: '标准的支配者，他人的痛苦就是我的快乐源泉' },
    { range: [90, 100], band: '极端施虐', description: '灵魂的凌迟者，摧毁你的意志比肉体更让我兴奋' },
  ],
}

export const DARKTRIAD_FACETS: Record<string, string[]> = {
  machiavellianism: ['操纵策略', '道德超脱', '务实主义', '长期规划', '人际控制'],
  narcissism: ['权利感', '优越感', '虚荣炫耀', '自我吹捧', '特殊期待'],
  psychopathy: ['共情缺失', '情感淡漠', '冲动不负责任', '无畏无惧', '行为反常'],
  sadism: ['身体施虐', '心理施虐', '支配愉悦', '攻击性满足', '恶意戏弄'],
}

export const DARK_PROFILES: Record<string, { name: string; description: string; archetype: string; danger: string }> = {
  'HHHH': { name: '究极黑暗人格', description: '四维度全高，最危险的人格组合', archetype: '恶魔本尊', danger: '极度危险' },
  'HHHL': { name: '暴君型', description: '权谋自恋冷酷三高，施虐略低的绝对统治者', archetype: '暴君', danger: '非常危险' },
  'HHLH': { name: '虐待狂教主', description: '权谋自恋施虐三高，冷酷略低的精神控制大师', archetype: '邪教教主', danger: '非常危险' },
  'HLLL': { name: '纯策略家', description: '只有权谋高，其他都低的冷静棋手', archetype: '幕后棋手', danger: '中度风险' },
  'LHHL': { name: '万人迷精神病态', description: '自恋+冷酷，魅力与危险并存的致命情人', archetype: '致命情人', danger: '高危险' },
  'LLLH': { name: '纯霸凌者', description: '只有施虐高，喜欢欺负弱小的恶霸', archetype: '校园恶霸', danger: '中度风险' },
  'LHHH': { name: '冲动型反社会', description: '自恋冷酷施虐三高，马基雅维利低的暴力狂', archetype: '反社会者', danger: '极度危险' },
  'LLLL': { name: '纯良小白兔', description: '四维度全低，最善良无害的正常人', archetype: '圣母玛利亚', danger: '无危险' },
}

export const darkTriadNormData = {
  overall: { mean: 50, sd: 15, n: 5000 },
  machiavellianism: { mean: 50, sd: 15, n: 5000 },
  narcissism: { mean: 50, sd: 15, n: 5000 },
  psychopathy: { mean: 50, sd: 15, n: 5000 },
  sadism: { mean: 50, sd: 15, n: 5000 },
}

export const darkTriadReferences = [
  'Paulhus, D. L., & Williams, K. M. (2002). The Dark Triad of personality: Narcissism, Machiavellianism, and psychopathy. Journal of Research in Personality, 36(6), 556-563.',
  'Jonason, P. K., & Webster, G. D. (2010). The dirty dozen: A concise measure of the Dark Triad. Psychological Assessment, 22(2), 420.',
  'Buckels, E. E., Jones, D. N., & Paulhus, D. L. (2013). Behavioral confirmation of everyday sadism. Psychological Science, 24(11), 2201-2209.',
]

export interface DarkTriadQuestionMeta {
  dimension: DarkTriadDimension
  reversed?: boolean
  reverseScored?: boolean
  factorLoading: number
  difficulty?: number
  itemDifficulty?: number
  discrimination: number
  socialDesirability: number
  facet: string
}

export type DarkTriadQuestion = ProfessionalQuestion & {
  meta: DarkTriadQuestionMeta
}



