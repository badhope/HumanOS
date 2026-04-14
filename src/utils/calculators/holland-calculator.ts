/**
 * ==============================================
 * 🧭 霍兰德职业兴趣测评 - 核心计算器
 * ==============================================
 * 【测评定位】全球职业规划金标准
 * 【核心算法】6类型 × 15题/类型 = 90题
 * 【理论来源】Holland SDS 职业人格六边形模型
 * 
 * 【⚠️  超级重要警告】
 * 1. 按题目dimension累加计分！
 * 2. dimension拼写错了 = 对应职业类型永远0分！
 * 3. 结果是前三位代码，不是单一类型！
 */

import type { Answer, AssessmentResult } from '../../types'

/**
 * 霍兰德职业兴趣结果接口
 * 【六大人格类型】RIASEC 六边形
 * - R: Realistic 现实型
 * - I: Investigative 研究型
 * - A: Artistic 艺术型
 * - S: Social 社会型
 * - E: Enterprising 企业型
 * - C: Conventional 常规型
 */
export interface HollandResult extends Record<string, any> {
  scores: {
    R: number
    I: number
    A: number
    S: number
    E: number
    C: number
  }
  percentages: {
    R: number
    I: number
    A: number
    S: number
    E: number
    C: number
  }
  topThree: string[]
  code: string
  hexagonData: { type: string; score: number; fullMark: number }[]
  typeDescriptions: { type: string; name: string; description: string }[]
  personalityProfile: string
  coreTraits: string[]
  workStyle: string
  careerRecommendations: {
    primary: string[]
    secondary: string[]
    exploring: string[]
  }
  workEnvironmentTips: string
  famousPeople: { type: string; names: string[] }[]
  developmentAdvice: string[]
}

const randomPick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export function calculateHolland(answers: Answer[]): HollandResult {
  const dimensionMap: Record<string, string[]> = {
    R: ['holland-r1', 'holland-r2', 'holland-r3', 'holland-r4', 'holland-r5', 'holland-r6', 'holland-r7', 'holland-r8', 'holland-r9', 'holland-r10', 'holland-r11', 'holland-r12', 'holland-r13', 'holland-r14', 'holland-r15'],
    I: ['holland-i1', 'holland-i2', 'holland-i3', 'holland-i4', 'holland-i5', 'holland-i6', 'holland-i7', 'holland-i8', 'holland-i9', 'holland-i10', 'holland-i11', 'holland-i12', 'holland-i13', 'holland-i14', 'holland-i15'],
    A: ['holland-a1', 'holland-a2', 'holland-a3', 'holland-a4', 'holland-a5', 'holland-a6', 'holland-a7', 'holland-a8', 'holland-a9', 'holland-a10', 'holland-a11', 'holland-a12', 'holland-a13', 'holland-a14', 'holland-a15'],
    S: ['holland-s1', 'holland-s2', 'holland-s3', 'holland-s4', 'holland-s5', 'holland-s6', 'holland-s7', 'holland-s8', 'holland-s9', 'holland-s10', 'holland-s11', 'holland-s12', 'holland-s13', 'holland-s14', 'holland-s15'],
    E: ['holland-e1', 'holland-e2', 'holland-e3', 'holland-e4', 'holland-e5', 'holland-e6', 'holland-e7', 'holland-e8', 'holland-e9', 'holland-e10', 'holland-e11', 'holland-e12', 'holland-e13', 'holland-e14', 'holland-e15'],
    C: ['holland-c1', 'holland-c2', 'holland-c3', 'holland-c4', 'holland-c5', 'holland-c6', 'holland-c7', 'holland-c8', 'holland-c9', 'holland-c10', 'holland-c11', 'holland-c12', 'holland-c13', 'holland-c14', 'holland-c15'],
  }

  const typeNames: Record<string, string> = {
    R: '现实型',
    I: '研究型',
    A: '艺术型',
    S: '社会型',
    E: '企业型',
    C: '常规型',
  }

  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 1))
  })

  const scores: HollandResult['scores'] = {} as HollandResult['scores']
  const percentages: HollandResult['percentages'] = {} as HollandResult['percentages']

  Object.entries(dimensionMap).forEach(([type, ids]) => {
    const count = ids.length || 1
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 1), 0)
    const maxScore = count * 5
    const percentage = Math.round((score / maxScore) * 100)
    scores[type as keyof HollandResult['scores']] = score
    percentages[type as keyof HollandResult['percentages']] = percentage
  })

  const topThree = Object.entries(percentages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([type]) => type)

  const code = topThree.join('')

  const hexagonData = ['R', 'I', 'A', 'S', 'E', 'C'].map(type => ({
    type: `${type} (${typeNames[type]})`,
    score: percentages[type as keyof HollandResult['percentages']],
    fullMark: 100,
  }))

  const fullTypeDescriptions: Record<string, string> = {
    R: '偏好与物体、工具、机械打交道，喜欢具体实际的工作。擅长动手操作，追求务实和结果。通常喜欢户外工作或技术操作。',
    I: '偏好与思想、理论、数据打交道，喜欢探索和解决复杂问题。擅长逻辑推理和抽象思维，追求知识和真理。',
    A: '偏好自我表达、创意和美学，喜欢非结构化的工作环境。擅长创新和艺术创作，追求独特性和美感。',
    S: '偏好与人打交道，喜欢帮助、教育和服务他人。擅长共情和沟通，追求社会价值和人际和谐。',
    E: '偏好影响、领导和说服他人，喜欢竞争和追求成功。擅长组织和谈判，追求地位和影响力。',
    C: '偏好有序、系统化的工作，喜欢处理数据和遵循流程。擅长细节和组织，追求稳定和可预期。',
  }

  const typeDescriptions = topThree.map(type => ({
    type,
    name: typeNames[type],
    description: fullTypeDescriptions[type],
  }))

  const personalityProfiles: Record<string, string> = {
    RIA: '技术专家型', RIC: '机械工程师型', RIS: '实用技师型', RIE: '企业技术型', RIT: '研究技术型',
    IRA: '科学家型', IRS: '研究顾问型', IRE: '创业研究型', IRC: '数据科学家型', ISA: '教育研究型',
    ARI: '技术艺术家型', ASE: '艺术管理型', ASI: '艺术教育型', AER: '创意总监型', AES: '文化策划型',
    SIA: '咨询师型', SER: '人力资源型', SAE: '教育管理型', SCI: '社工型', SEA: '教师型',
    ESA: '企业家型', ERS: '销售管理型', ESI: '咨询总监型', ECS: 'CEO型', EAR: '创意企业家型',
    CSI: '财务分析师型', CER: '运营总监型', CES: '行政总监型', CRS: '项目经理型', CIS: '数据管理型',
  }
  const personalityProfile = personalityProfiles[code] || personalityProfiles[topThree[0] + topThree[1] + topThree[2]] || '独特混合型'

  const coreTraitsMap: Record<string, string[]> = {
    R: ['务实', '动手能力强', '踏实', '技术导向', '结果导向', '擅长工具使用'],
    I: ['好奇', '分析能力强', '理性', '知识导向', '批判性思维', '擅长抽象思考'],
    A: ['创意', '审美敏感', '独立', '表达导向', '直觉思维', '擅长创新'],
    S: ['友善', '共情能力强', '助人', '关系导向', '合作思维', '擅长沟通'],
    E: ['自信', '影响力强', '野心', '目标导向', '战略思维', '擅长说服'],
    C: ['严谨', '组织能力强', '细致', '规则导向', '系统思维', '擅长执行'],
  }
  const coreTraits = [...new Set(topThree.flatMap(t => coreTraitsMap[t]))]

  const workStyleDescriptions: Record<string, string> = {
    R: '你是典型的实干派，相信动手能力胜过一切空谈。技术和工具是你的好朋友，讨厌冗长的会议和办公室政治，更愿意用实力说话。看得见摸得着的成果，远比虚无的概念来得实在。',
    I: '深度专注是你的生产力来源。越是复杂的问题越能激发你的斗志，需要不被打扰的大块时间进入心流状态。知识本身就是你的动力，追求事物的本质而非表面答案。',
    A: '拒绝没有灵魂的重复劳动，工作对你来说不仅是谋生，更是自我表达的方式。原创性至关重要，讨厌千篇一律，总想在工作中留下属于自己的独特印记。',
    S: '好的氛围比高薪资更重要。你是团队中的粘合剂，真诚地关心身边每个人的成长。帮助他人成功就是你最大的成功，相信人永远比事情本身更重要。',
    E: '快节奏和竞争让你热血沸腾。你是天生的掌舵人，渴望影响力，享受带领团队打胜仗的感觉。野心不是贬义词——胜利的滋味和众人的认可就是你前进的燃料。',
    C: '井井有条是你的工作美学。清晰的规则和流程让你如鱼得水，突然的变化和混乱会让你抓狂。细节决定成败，准确和可靠就是你的金字招牌。',
  }
  const workStyle = topThree.map(t => workStyleDescriptions[t]).join(' ')

  const careerDatabase: Record<string, string[]> = {
    R: ['机械工程师', '电气技师', '土木工程师', '飞行员', '厨师', '园艺师', '汽车维修师', '建筑师', '外科医生', '运动员'],
    I: ['数据科学家', '软件工程师', '医生', '研究员', '大学教授', '心理学家', '经济学家', '算法工程师', '律师', '物理学家'],
    A: ['设计师', '作家', '艺术家', '导演', '音乐家', '摄影师', '广告创意', '建筑师', '编剧', '时装设计师'],
    S: ['心理咨询师', '教师', '医生', '社工', '人力资源', '护士', '培训师', '职业顾问', '辅导员', '公益项目负责人'],
    E: ['CEO', '销售总监', '创业者', '投资经理', '律师', '咨询总监', '市场总监', '政治人物', '基金经理', '保险经纪人'],
    C: ['会计师', '银行家', '数据分析师', '行政总监', '财务经理', '审计师', '税务顾问', '质量管理', '档案管理员', '秘书'],
  }

  const careerRecommendations = {
    primary: careerDatabase[topThree[0]].slice(0, 5),
    secondary: careerDatabase[topThree[1]].slice(0, 3),
    exploring: careerDatabase[topThree[2]].slice(0, 2),
  }

  const famousPeople = [
    { type: 'R (现实型)', names: ['埃隆·马斯克', '鲁班', '任正非'] },
    { type: 'I (研究型)', names: ['爱因斯坦', '屠呦呦', '张一鸣'] },
    { type: 'A (艺术型)', names: ['毕加索', '李安', '乔布斯'] },
    { type: 'S (社会型)', names: ['特蕾莎修女', '陶行知', '张桂梅'] },
    { type: 'E (企业型)', names: ['马云', '巴菲特', '董明珠'] },
    { type: 'C (常规型)', names: ['查理·芒格', '曹德旺', '李彦宏'] },
  ]

  const workEnvironmentTips = `你的霍兰德密码 **${code}** 代表着 ${topThree.map(t => typeNames[t]).join('→')} 的独特组合。寻找能同时释放你这三重天赋的工作环境——让优势不用"藏着掖着"，能够自然而然地发挥。`

  const developmentAdvice = [
    `把 ${typeNames[topThree[0]]} 打造成你的核心护城河，这是别人真正无法复制的地方`,
    `${typeNames[topThree[1]]} 作为第二曲线，与核心能力形成独一无二的组合拳`,
    `别忽视 ${typeNames[topThree[2]]} 的潜力，它可能是打破职业天花板的秘密武器`,
    '别陷入"补短板陷阱"——满分的一科远胜六个及格',
    `寻找职业甜蜜点：${typeNames[topThree[0]]} × ${typeNames[topThree[1]]} × ${typeNames[topThree[2]]} 的交汇处`,
  ]

  return {
    scores,
    percentages,
    topThree,
    code,
    hexagonData,
    typeDescriptions,
    personalityProfile,
    coreTraits,
    workStyle,
    careerRecommendations,
    workEnvironmentTips,
    famousPeople,
    developmentAdvice,
  }
}
