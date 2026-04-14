import type { ProfessionalQuestion } from '../../../types'

export const MBTI_DIMENSIONS = ['E/I', 'S/N', 'T/F', 'J/P', 'A/T'] as const

export const MBTI_DIMENSION_NAMES: Record<string, string> = {
  'E': '外向型',
  'I': '内向型',
  'S': '感觉型',
  'N': '直觉型',
  'T': '思考型',
  'F': '情感型',
  'J': '判断型',
  'P': '感知型',
  'A': '坚定型',
  'Tu': '动荡型',
}

export const MBTI_DIMENSION_DESCRIPTIONS: Record<string, string> = {
  'E/I': '能量方向 - 关注外部世界还是内心世界',
  'S/N': '信息获取 - 关注具体事实还是未来可能性',
  'T/F': '决策方式 - 基于逻辑分析还是价值判断',
  'J/P': '生活态度 - 偏好结构化还是灵活开放',
  'A/T': '身份认同 - 自我确信程度与情绪稳定性',
}

export const MBTI_DIMENSION_BANDS = {
  'E/I': [
    { range: [0, 10], band: '极端内向', description: '深度内省者，极度需要独处时间，社交活动会严重消耗精力' },
    { range: [11, 20], band: '典型内向', description: '标准内向者，偏好小规模深度交流，大部分时间需要安静环境' },
    { range: [21, 30], band: '温和内向', description: '偏内向但具备一定社交能力，可以在重要场合适度外向表现' },
    { range: [31, 40], band: '轻微内向', description: '轻度内向倾向，环境适应力较强，社交与独处需求相对平衡' },
    { range: [41, 45], band: '略偏内向', description: '微内向，几乎处于平衡点，略倾向于独处但不排斥社交' },
    { range: [46, 54], band: '中间型', description: '内外向平衡，可根据情境自由切换社交模式，典型的ambivert' },
    { range: [55, 59], band: '略偏外向', description: '微外向，几乎处于平衡点，略喜欢社交但也需要独处' },
    { range: [60, 69], band: '轻微外向', description: '轻度外向倾向，喜欢社交互动但也享受安静时光' },
    { range: [70, 79], band: '温和外向', description: '偏外向，乐于与人交往，但也能接受一定程度的独处' },
    { range: [80, 89], band: '典型外向', description: '标准外向者，社交是主要能量来源，独处过久会感到无聊' },
    { range: [90, 100], band: '极端外向', description: '深度外向者，几乎无法忍受长时间独处，持续需要外部刺激' },
  ],
  'S/N': [
    { range: [0, 10], band: '极端感觉', description: '超现实主义者，完全关注当下细节，极度务实且注重事实数据' },
    { range: [11, 20], band: '典型感觉', description: '标准感觉型，信赖具体经验，偏好实际应用而非理论想象' },
    { range: [21, 30], band: '温和感觉', description: '偏现实导向，脚踏实地，同时能接受一定程度的创新想法' },
    { range: [31, 40], band: '轻微感觉', description: '轻度务实倾向，关注事实但对可能性保持开放态度' },
    { range: [41, 45], band: '略偏感觉', description: '微感觉倾向，几乎平衡但略偏重具体信息' },
    { range: [46, 54], band: '中间型', description: '感知平衡，既能关注细节也能洞察全局，兼具务实与想象力' },
    { range: [55, 59], band: '略偏直觉', description: '微直觉倾向，几乎平衡但略偏重未来可能性' },
    { range: [60, 69], band: '轻微直觉', description: '轻度直觉倾向，关注未来但不忽视现实基础' },
    { range: [70, 79], band: '温和直觉', description: '偏未来导向，富有想象力，同时能与现实世界保持连接' },
    { range: [80, 89], band: '典型直觉', description: '标准直觉型，被灵感驱动，偏好创新与抽象思考' },
    { range: [90, 100], band: '极端直觉', description: '超级梦想家，完全活在未来可能性中，常常忽略当下现实' },
  ],
  'T/F': [
    { range: [0, 10], band: '极端思考', description: '绝对理性主义者，决策完全基于逻辑，几乎不受情感影响' },
    { range: [11, 20], band: '典型思考', description: '标准思考型，优先考虑客观原则，擅长批判性分析' },
    { range: [21, 30], band: '温和思考', description: '偏理性决策，注重逻辑，同时能考虑他人感受' },
    { range: [31, 40], band: '轻微思考', description: '轻度理性倾向，客观分析但具备基本人际敏感度' },
    { range: [41, 45], band: '略偏思考', description: '微理性倾向，几乎平衡但略偏重逻辑分析' },
    { range: [46, 54], band: '中间型', description: '决策平衡，理性与感性并重，根据情境调整决策策略' },
    { range: [55, 59], band: '略偏情感', description: '微情感倾向，几乎平衡但略偏重价值判断' },
    { range: [60, 69], band: '轻微情感', description: '轻度感性倾向，关注他人但保持一定客观性' },
    { range: [70, 79], band: '温和情感', description: '偏价值导向，富有同情心，同时能保持一定理性' },
    { range: [80, 89], band: '典型情感', description: '标准情感型，决策优先考虑人际和谐与价值观' },
    { range: [90, 100], band: '极端情感', description: '极致共情者，决策完全基于情感与价值观，极度重视关系和谐' },
  ],
  'J/P': [
    { range: [0, 10], band: '极端感知', description: '绝对自由精神，完全拒绝结构化，随遇而安到极致' },
    { range: [11, 20], band: '典型感知', description: '标准感知型，喜欢保持开放选项，享受最后一刻的灵活性' },
    { range: [21, 30], band: '温和感知', description: '偏灵活导向，随性自然，必要时也能制定计划' },
    { range: [31, 40], band: '轻微感知', description: '轻度灵活倾向，喜欢自由但能接受基本结构' },
    { range: [41, 45], band: '略偏感知', description: '微灵活倾向，几乎平衡但略偏好开放选项' },
    { range: [46, 54], band: '中间型', description: '生活态度平衡，计划性与灵活性兼具，工作生活双模式切换' },
    { range: [55, 59], band: '略偏判断', description: '微判断倾向，几乎平衡但略偏好结构化' },
    { range: [60, 69], band: '轻微判断', description: '轻度结构化倾向，喜欢秩序但能接受适度 spontaneity' },
    { range: [70, 79], band: '温和判断', description: '偏计划导向，喜欢有序生活，同时保留弹性空间' },
    { range: [80, 89], band: '典型判断', description: '标准判断型，偏好结构化和确定性，喜欢凡事井井有条' },
    { range: [90, 100], band: '极端判断', description: '极致控制者，生活高度结构化，无法忍受模糊与混乱' },
  ],
  'A/T': [
    { range: [0, 10], band: '极端坚定', description: '极度自信冷静，压力下毫不动摇，情绪始终稳定' },
    { range: [11, 20], band: '典型坚定', description: '标准坚定型，自我认同度高，抗压能力强' },
    { range: [21, 30], band: '温和坚定', description: '偏自信，大部分情况下冷静从容' },
    { range: [31, 40], band: '轻微坚定', description: '轻度自信倾向，通常比较放松' },
    { range: [41, 45], band: '略偏坚定', description: '微坚定倾向，几乎平衡但略自信' },
    { range: [46, 54], band: '中间型', description: '自信与敏感性平衡，既不过于自负也不过于焦虑' },
    { range: [55, 59], band: '略偏动荡', description: '微动荡倾向，几乎平衡但略敏感' },
    { range: [60, 69], band: '轻微动荡', description: '轻度敏感倾向，完美主义，追求卓越' },
    { range: [70, 79], band: '温和动荡', description: '偏敏感导向，情绪丰富，自我要求高' },
    { range: [80, 89], band: '典型动荡', description: '标准动荡型，情绪敏感，追求持续改进' },
    { range: [90, 100], band: '极端动荡', description: '极致完美主义者，对自己要求极其严苛，情绪波动较大' },
  ],
}

export const MBTI_SUB_DIMENSIONS = {
  'E/I': ['社交主动性', '精力恢复方式', '思考表达模式', '刺激寻求水平', '独处耐受性'],
  'S/N': ['信息关注点', '记忆偏好', '想象力活跃度', '创新接受度', '现实与未来导向'],
  'T/F': ['决策基准', '人际敏感度', '批判性表达', '冲突处理方式', '客观与主观平衡'],
  'J/P': ['时间管理倾向', '计划灵活性', '秩序偏好', '决策速度', '应对不确定性'],
  'A/T': ['自我认同强度', '压力应对方式', '情绪稳定性', '完美主义倾向', '成就动机水平'],
}

export const MBTI_TYPES: Record<string, { name: string; description: string; nicknames: string[] }> = {
  'INTJ': { name: '建筑师', description: '富有想象力和战略性的思想家，对一切都有自己的计划', nicknames: ['战略家', '策划者'] },
  'INTP': { name: '逻辑学家', description: '具有创造力的发明家，对知识有着止不住的渴望', nicknames: ['思考者', '科学家'] },
  'ENTJ': { name: '指挥官', description: '大胆、富有想象力且意志强大的领导者，总能找到或创造解决方法', nicknames: ['领导者', '执行官'] },
  'ENTP': { name: '辩论家', description: '聪明好奇的思想者，不会放弃任何智力上的挑战', nicknames: ['发明家', '挑战者'] },
  'INFJ': { name: '提倡者', description: '安静而神秘，同时鼓舞人心且不知疲倦的理想主义者', nicknames: ['咨询师', '引路人'] },
  'INFP': { name: '调停者', description: '诗意、善良的利他主义者，总是热情地为正当理由提供帮助', nicknames: ['治疗师', '幻想家'] },
  'ENFJ': { name: '主人公', description: '富有魅力且鼓舞人心的领导者，有迷住听众的能力', nicknames: ['教育家', '导师'] },
  'ENFP': { name: '竞选者', description: '热情、有创造力、社交自由的人，总能找到微笑的理由', nicknames: ['活动家', '激励者'] },
  'ISTJ': { name: '物流师', description: '实际且注重事实的个人，可靠性不容怀疑', nicknames: ['检查者', '守护者'] },
  'ISFJ': { name: '守卫者', description: '非常专注且热情的保护者，时刻准备着守护所爱之人', nicknames: ['保护者', '照顾者'] },
  'ESTJ': { name: '总经理', description: '出色的管理者，在管理事务或人员方面无与伦比', nicknames: ['监督者', '管理者'] },
  'ESFJ': { name: '执政官', description: '极有同情心、爱社交、受欢迎的人，总是热心帮助别人', nicknames: ['供给者', '主人'] },
  'ISTP': { name: '鉴赏家', description: '大胆而实际的实验家，擅长使用各种工具', nicknames: ['手艺人', '操作者'] },
  'ISFP': { name: '探险家', description: '灵活又有魅力的艺术家，时刻准备探索和体验新事物', nicknames: ['创作者', '艺术家'] },
  'ESTP': { name: '企业家', description: '聪明、精力充沛、善于感知的人，真正享受生活在边缘', nicknames: ['表演者', '挑战者'] },
  'ESFP': { name: '表演者', description: '自发的、精力充沛的艺人，生活在他们周围永不乏味', nicknames: ['娱乐家', '展示者'] },
}

export const mbtiNormData = {
  E: { mean: 50, sd: 20, n: 50000 },
  I: { mean: 50, sd: 20, n: 50000 },
  S: { mean: 50, sd: 20, n: 50000 },
  N: { mean: 50, sd: 20, n: 50000 },
  T: { mean: 50, sd: 20, n: 50000 },
  F: { mean: 50, sd: 20, n: 50000 },
  J: { mean: 50, sd: 20, n: 50000 },
  P: { mean: 50, sd: 20, n: 50000 },
  A: { mean: 50, sd: 20, n: 50000 },
  Tu: { mean: 50, sd: 20, n: 50000 },
}

export const EXTENDED_MBTI_TYPES: Record<string, { name: string; description: string; archetype: string }> = {
  'INTJ-A': { name: '自信的建筑师', description: '战略思想家中的领军者，自信且目标明确', archetype: '战略大师' },
  'INTJ-Tu': { name: '动荡的建筑师', description: '追求完美的战略家，不断自我改进', archetype: '完美战略家' },
  'INTP-A': { name: '自信的逻辑学家', description: '泰然自若的思考者，客观分析一切', archetype: '冷静分析家' },
  'INTP-Tu': { name: '动荡的逻辑学家', description: '思维活跃的理论家，永无止境的求知者', archetype: '思辨学者' },
  'ENTJ-A': { name: '自信的指挥官', description: '天生的领袖，果断且富有远见', archetype: '执行统帅' },
  'ENTJ-Tu': { name: '动荡的指挥官', description: '精力充沛的领导者，追求更高成就', archetype: '野心改革家' },
  'ENTP-A': { name: '自信的辩论家', description: '机智的创新者，从容应对挑战', archetype: '智识冒险者' },
  'ENTP-Tu': { name: '动荡的辩论家', description: '好奇的思想先锋，热爱智力较量', archetype: '创意挑战者' },
  'INFJ-A': { name: '自信的提倡者', description: '坚定的引路人，平静而有力量', archetype: '静默先知' },
  'INFJ-Tu': { name: '动荡的提倡者', description: '深刻的理想主义者，追求意义与使命', archetype: '灵魂追寻者' },
  'INFP-A': { name: '自信的调停者', description: '宁静的理想主义者，坚守核心价值', archetype: '和谐守护人' },
  'INFP-Tu': { name: '动荡的调停者', description: '诗意的灵魂，在现实与理想间探索', archetype: '诗意寻道者' },
  'ENFJ-A': { name: '自信的主人公', description: '魅力四射的领导者，鼓舞人心', archetype: '心灵导师' },
  'ENFJ-Tu': { name: '动荡的主人公', description: '热情的教育者，致力于他人成长', archetype: '利他践行者' },
  'ENFP-A': { name: '自信的竞选者', description: '热情洋溢的激励者，社交中的阳光', archetype: '快乐传播者' },
  'ENFP-Tu': { name: '动荡的竞选者', description: '充满活力的创作者，灵感与热情并存', archetype: '自由梦想家' },
  'ISTJ-A': { name: '自信的物流师', description: '可靠的守护者，冷静且尽职', archetype: '制度维护者' },
  'ISTJ-Tu': { name: '动荡的物流师', description: '严谨的检查者，细节中的完美主义', archetype: '尽责监督人' },
  'ISFJ-A': { name: '自信的守卫者', description: '温暖的保护者，稳重且可靠', archetype: '忠诚守护者' },
  'ISFJ-Tu': { name: '动荡的守卫者', description: '细心的照顾者，默默奉献自己', archetype: '幕后支持者' },
  'ESTJ-A': { name: '自信的总经理', description: '出色的管理者，秩序与效率的化身', archetype: '组织建设者' },
  'ESTJ-Tu': { name: '动荡的总经理', description: '严格的监督者，追求极致效率', archetype: '效率驱动者' },
  'ESFJ-A': { name: '自信的执政官', description: '热心的主人，社交圈的凝聚者', archetype: '社区建设者' },
  'ESFJ-Tu': { name: '动荡的执政官', description: '关怀他人的助人者，和谐关系建筑师', archetype: '关系编织者' },
  'ISTP-A': { name: '自信的鉴赏家', description: '冷静的实践者，技术大师', archetype: '问题解决者' },
  'ISTP-Tu': { name: '动荡的鉴赏家', description: '灵活的技术达人，危机中的救火队员', archetype: '应急专家' },
  'ISFP-A': { name: '自信的探险家', description: '温和的艺术家，随心而行的创作者', archetype: '美学践行者' },
  'ISFP-Tu': { name: '动荡的探险家', description: '敏感的创作者，追求真实表达', archetype: '心灵艺术家' },
  'ESTP-A': { name: '自信的企业家', description: '大胆的行动者，生活的冒险家', archetype: '机会把握者' },
  'ESTP-Tu': { name: '动荡的企业家', description: '充满活力的实践者，永远追求刺激', archetype: '极速体验者' },
  'ESFP-A': { name: '自信的表演者', description: '快乐的艺人，生活舞台的中心', archetype: '欢乐创造者' },
  'ESFP-Tu': { name: '动荡的表演者', description: '热情的娱乐家，用热情感染世界', archetype: '生命舞者' },
}

export const mbtiReferences = [
  'Myers, I. B., & McCaulley, M. H. (1985). Manual: A guide to the development and use of the Myers-Briggs Type Indicator. Consulting Psychologists Press.',
  'McCrae, R. R., & Costa, P. T. (1989). Reinterpreting the Myers-Briggs Type Indicator from the perspective of the five-factor model of personality. Journal of Personality, 57(1), 17-40.',
  'Capraro, R. M., & Capraro, M. M. (2002). Myers-Briggs Type Indicator reliability studies: A meta-analysis. Educational and Psychological Measurement, 62(4), 590-602.',
]

export type MBTIDimension = typeof MBTI_DIMENSIONS[number]
export type MBTITrait = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' | 'A' | 'Tu' | 'LIE'

export interface MBTIQuestionMeta {
  dimension: MBTIDimension
  trait?: string
  facet?: string
  factorLoading?: number
  discrimination: number
  difficulty?: number
  socialDesirability?: number
  reverseScored?: boolean
}

export type MBTIQuestion = ProfessionalQuestion & { meta: MBTIQuestionMeta }




