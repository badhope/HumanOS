import type { ProfessionalQuestion } from '../../../types'

export const HOLLAND_TYPES = ['R', 'I', 'A', 'S', 'E', 'C'] as const

export type HollandDimension = typeof HOLLAND_TYPES[number]

export const HOLLAND_TYPE_NAMES: Record<string, string> = {
  R: '现实型',
  I: '研究型',
  A: '艺术型',
  S: '社会型',
  E: '企业型',
  C: '常规型',
}

export const HOLLAND_TYPE_FULL_NAMES: Record<string, string> = {
  R: '现实型 (实用技术型)',
  I: '研究型 (探索智慧型)',
  A: '艺术型 (创意表达型)',
  S: '社会型 (助人服务型)',
  E: '企业型 (影响领导型)',
  C: '常规型 (秩序事务型)',
}

export const HOLLAND_TYPE_DESCRIPTIONS: Record<string, string> = {
  R: '偏好使用工具、机器，需要动手操作和技术技能的工作',
  I: '偏好智力活动、抽象思考、分析推理、独立研究的工作',
  A: '偏好需要艺术修养、创造力、表达能力的工作',
  S: '偏好与人交往、帮助他人、社会服务性质的工作',
  E: '偏好竞争冒险、影响领导、追求成就地位的工作',
  C: '偏好按计划办事、细心有条理、系统组织的工作',
}

export const HOLLAND_DIMENSION_BANDS: Record<string, Array<{ range: [number, number]; band: string; description: string }>> = {
  R: [
    { range: [0, 10], band: '极度厌弃动手', description: '完全回避任何体力和技术操作，极度厌恶弄脏双手' },
    { range: [11, 20], band: '典型排斥动手', description: '非常不喜欢实际操作，尽量避免技术型工作' },
    { range: [21, 30], band: '温和排斥动手', description: '对实用技术工作兴趣不高，能做但缺乏热情' },
    { range: [31, 40], band: '轻微排斥动手', description: '轻度偏向非技术工作，偶尔动手但非首选' },
    { range: [41, 45], band: '略偏非实用', description: '微偏向非实用型，在理论与实践间偏向前者' },
    { range: [46, 54], band: '中间型', description: '对实用技术兴趣中性，不排斥也不特别热爱' },
    { range: [55, 59], band: '略偏实用', description: '微偏向实用型，对动手操作有一定兴趣' },
    { range: [60, 69], band: '轻微实用', description: '轻度喜欢实用工作，动手能力良好' },
    { range: [70, 79], band: '温和实用', description: '偏技术导向，喜欢具体实际的操作和产出' },
    { range: [80, 89], band: '典型实用', description: '标准的实干家，热爱工具使用和技术创造' },
    { range: [90, 100], band: '极端实用', description: '彻头彻尾的行动派，不做就浑身不舒服的技术控' },
  ],
  I: [
    { range: [0, 10], band: '极度反智', description: '完全回避思考和研究，极度厌恶抽象理论' },
    { range: [11, 20], band: '典型厌学', description: '非常不喜欢智力挑战，尽量避免深度思考' },
    { range: [21, 30], band: '温和厌学', description: '对学术研究兴趣有限，觉得太烧脑没必要' },
    { range: [31, 40], band: '轻微厌学', description: '轻度偏向实用知识，复杂理论让你头大' },
    { range: [41, 45], band: '略偏常识', description: '微偏向经验主义，够用就好不爱深究' },
    { range: [46, 54], band: '中间型', description: '对研究探索态度中立，按需进行智力活动' },
    { range: [55, 59], band: '略偏好奇', description: '微偏向探索，对未知事物有些兴趣' },
    { range: [60, 69], band: '轻微好奇', description: '轻度喜欢研究，享受解决复杂问题的乐趣' },
    { range: [70, 79], band: '温和探索', description: '偏学术导向，热爱知识追求真理' },
    { range: [80, 89], band: '典型探索', description: '标准的研究者，好奇心旺盛且深入钻研' },
    { range: [90, 100], band: '极端探索', description: '近乎偏执的真理追寻者，一天不思考就难受' },
  ],
  A: [
    { range: [0, 10], band: '极度务实', description: '完全没有艺术细胞，极度反感虚无缥缈的创意' },
    { range: [11, 20], band: '典型务实', description: '非常不喜欢艺术创作，觉得都是不切实际' },
    { range: [21, 30], band: '温和务实', description: '对艺术表达兴趣不大，更看重实际功用' },
    { range: [31, 40], band: '轻微务实', description: '轻度偏向实用，作为欣赏者但不创作' },
    { range: [41, 45], band: '略偏保守', description: '微偏向传统，对创新持谨慎欣赏态度' },
    { range: [46, 54], band: '中间型', description: '艺术创意方面态度中庸，有一定审美但不创作' },
    { range: [55, 59], band: '略偏创意', description: '微偏向表达，偶尔会有创意想法' },
    { range: [60, 69], band: '轻微创意', description: '轻度喜欢艺术，有一定的审美和表达欲' },
    { range: [70, 79], band: '温和创意', description: '偏艺术导向，有不错的创造力和独特品味' },
    { range: [80, 89], band: '典型创意', description: '天生的艺术家，创意源源不断表达欲强' },
    { range: [90, 100], band: '极端创意', description: '不创作会死星人，生命不息创意不止' },
  ],
  S: [
    { range: [0, 10], band: '极度冷酷', description: '完全漠视他人疾苦，极度厌恶帮助别人' },
    { range: [11, 20], band: '典型冷漠', description: '非常不喜欢服务他人，各人自扫门前雪' },
    { range: [21, 30], band: '温和冷漠', description: '对助人事业兴趣不大，帮人是情分不帮是本分' },
    { range: [31, 40], band: '轻微独立', description: '轻度偏向独立，先管好自己再说别人' },
    { range: [41, 45], band: '略偏自保', description: '微偏向自我，助人但有清晰的边界' },
    { range: [46, 54], band: '中间型', description: '社会服务态度中立，君子之交淡如水' },
    { range: [55, 59], band: '略偏友善', description: '微偏向助人，遇到需要时会伸出援手' },
    { range: [60, 69], band: '轻微友善', description: '轻度喜欢服务，乐于助人且享受过程' },
    { range: [70, 79], band: '温和服务', description: '偏社会导向，真诚关心他人福祉' },
    { range: [80, 89], band: '典型服务', description: '天生的助人者，奉献是人生的意义所在' },
    { range: [90, 100], band: '极端服务', description: '普度众生的活菩萨，燃烧自己照亮别人' },
  ],
  E: [
    { range: [0, 10], band: '极度淡泊', description: '完全没有野心，极度厌恶竞争和领导' },
    { range: [11, 20], band: '典型淡泊', description: '非常不喜欢影响他人，无欲则刚' },
    { range: [21, 30], band: '温和淡泊', description: '对权力地位兴趣不大，平平淡淡才是真' },
    { range: [31, 40], band: '轻微淡泊', description: '轻度偏向随遇而安，不想太累不想出头' },
    { range: [41, 45], band: '略偏佛系', description: '微偏向不争，得之我幸失之我命' },
    { range: [46, 54], band: '中间型', description: '成就动机适中，该争取时争取该放手时放手' },
    { range: [55, 59], band: '略偏进取', description: '微偏向成就，有机会也愿意试试' },
    { range: [60, 69], band: '轻微进取', description: '轻度喜欢竞争，有一定的野心和抱负' },
    { range: [70, 79], band: '温和领导', description: '偏企业导向，享受影响和带领他人' },
    { range: [80, 89], band: '典型领导', description: '天生的领袖，野心勃勃渴望成功' },
    { range: [90, 100], band: '极端领导', description: '权力和影响力是我的氧气，我来就是要改变世界' },
  ],
  C: [
    { range: [0, 10], band: '极度混乱', description: '完全无法忍受规则，极度厌恶循规蹈矩' },
    { range: [11, 20], band: '典型混乱', description: '非常不喜欢秩序，我的字典里没有计划' },
    { range: [21, 30], band: '温和混乱', description: '对系统条理兴趣不大，船到桥头自然直' },
    { range: [31, 40], band: '轻微混乱', description: '轻度偏向自由，太规律的生活太无聊' },
    { range: [41, 45], band: '略偏随性', description: '微偏向灵活，差不多就行不必太较真' },
    { range: [46, 54], band: '中间型', description: '秩序和弹性平衡，该有规则时要有该灵活时灵活' },
    { range: [55, 59], band: '略偏秩序', description: '微偏向条理，有计划心里更踏实' },
    { range: [60, 69], band: '轻微秩序', description: '轻度喜欢条理，做事细心且有章法' },
    { range: [70, 79], band: '温和秩序', description: '偏事务导向，热爱组织和系统优化' },
    { range: [80, 89], band: '典型秩序', description: '天生的管理者，严谨细致追求完美' },
    { range: [90, 100], band: '极端秩序', description: '秩序就是我的上帝，一丝不完美都不能容忍' },
  ],
}

export const HOLLAND_FACETS: Record<string, string[]> = {
  R: ['动手操作能力', '技术熟练度', '机械理解力', '身体协调性', '工具使用偏好'],
  I: ['分析思维能力', '研究好奇心', '理论偏好度', '问题解决深度', '科学方法掌握'],
  A: ['创意流畅性', '审美敏感度', '表达独特性', '想象活跃度', '情感表现力'],
  S: ['助人意愿强度', '人际温暖度', '社会敏感度', '服务奉献精神', '教导培养能力'],
  E: ['领导影响力', '成就动机水平', '冒险接受度', '说服推销能力', '竞争获胜欲'],
  C: ['组织条理性', '细节关注度', '循规服从度', '精确性要求', '系统维护能力'],
}

export const HOLLAND_CAREER_ARCHETYPES: Record<string, { name: string; description: string; archetype: string }> = {
  'RIASC': { name: '全能技术专家', description: '六边形战士，各维度均衡发展的通才', archetype: '文艺复兴人' },
  'RIASE': { name: '创意工程师', description: '技术与创意完美融合的创新者', archetype: '发明大师' },
  'RICSE': { name: '技术管理者', description: '懂技术又懂管理的复合型人才', archetype: 'CTO型人才' },
  'ISRAC': { name: '科学研究者', description: '深度探索追求真理的学者', archetype: '学术大师' },
  'ISACE': { name: '社科思想家', description: '研究人类与社会的思想者', archetype: '人文导师' },
  'AISRE': { name: '创意思想家', description: '将创意理念化的艺术家+思想家', archetype: '概念先锋' },
  'ASREC': { name: '艺术教育者', description: '用艺术启发他人的导师', archetype: '美育大师' },
  'ASECR': { name: '创意企业家', description: '将创意商业化的造梦者', archetype: '文创CEO' },
  'SAECR': { name: '社会企业家', description: '用商业方式解决社会问题的理想主义者', archetype: '公益先锋' },
  'SIRAC': { name: '临床科学家', description: '科研与助人结合的医者', archetype: '医学大师' },
  'ESRIA': { name: '魅力型领袖', description: '高瞻远瞩又脚踏实地的掌舵人', archetype: '远见领袖' },
  'ECRIA': { name: '执行型CEO', description: '纪律严明结果导向的商业精英', archetype: '铁腕总裁' },
  'CRIAS': { name: '金融分析师', description: '精确细致又有深度的数字专家', archetype: '量化大师' },
  'CESAR': { name: '顶级管理者', description: '秩序与影响完美结合的组织架构师', archetype: '管理巨匠' },
}

export const hollandNormData = {
  R: { mean: 50, sd: 10, n: 10000 },
  I: { mean: 50, sd: 10, n: 10000 },
  A: { mean: 50, sd: 10, n: 10000 },
  S: { mean: 50, sd: 10, n: 10000 },
  E: { mean: 50, sd: 10, n: 10000 },
  C: { mean: 50, sd: 10, n: 10000 },
}

export const hollandReferences = [
  'Holland, J. L. (1959). A theory of vocational choice. Journal of Counseling Psychology, 6(1), 35.',
  'Holland, J. L. (1997). Making vocational choices: A theory of vocational personalities and work environments. Psychological Assessment Resources.',
  'Prediger, D. J. (1982). Dimensions underlying Holland\'s hexagon: Missing link between interests and occupations? Journal of Vocational Behavior, 21(3), 259-287.',
]

export type HollandType = typeof HOLLAND_TYPES[number]

export interface HollandQuestionMeta {
  dimension: HollandDimension
  factorLoading: number
  discrimination: number
  pole: string
  type?: string
  activityType?: string
  difficulty?: number
  socialDesirability?: number
}

export type HollandQuestion = ProfessionalQuestion & {
  reverse?: boolean
  meta: HollandQuestionMeta
}



