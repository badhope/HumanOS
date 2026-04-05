import type { ProfessionalQuestionSet } from '../../types'

const createHollandQuestion = (
  id: string,
  text: string,
  subscale: string = ''
) => ({
  id,
  text,
  type: 'scale' as const,
  subscale,
  options: [
    { id: '1', text: '非常不同意', value: 1 },
    { id: '2', text: '不同意', value: 2 },
    { id: '3', text: '中立', value: 3 },
    { id: '4', text: '同意', value: 4 },
    { id: '5', text: '非常同意', value: 5 },
  ],
})

export const hollandProfessionalQuestions: ProfessionalQuestionSet = {
  normal: [
    createHollandQuestion('hol-r-1', '我喜欢使用工具和机械进行工作', 'R'),
    createHollandQuestion('hol-r-2', '我擅长修理家用电器或机械设备', 'R'),
    createHollandQuestion('hol-r-3', '我喜欢户外活动和体力劳动', 'R'),
    createHollandQuestion('hol-r-4', '我更喜欢动手操作而不是抽象思考', 'R'),
    createHollandQuestion('hol-r-5', '我对汽车、电子设备或机械感兴趣', 'R'),
    createHollandQuestion('hol-r-6', '我喜欢建造或制作东西', 'R'),
    createHollandQuestion('hol-r-7', '我更愿意从事具体、实际的工作', 'R'),
    createHollandQuestion('hol-i-1', '我喜欢探索科学问题和理论', 'I'),
    createHollandQuestion('hol-i-2', '我善于分析和解决复杂问题', 'I'),
    createHollandQuestion('hol-i-3', '我对数学和科学有浓厚兴趣', 'I'),
  ],
  advanced: [
    createHollandQuestion('hol-r-1', '我喜欢使用工具和机械进行工作', 'R'),
    createHollandQuestion('hol-r-2', '我擅长修理家用电器或机械设备', 'R'),
    createHollandQuestion('hol-r-3', '我喜欢户外活动和体力劳动', 'R'),
    createHollandQuestion('hol-r-4', '我更喜欢动手操作而不是抽象思考', 'R'),
    createHollandQuestion('hol-r-5', '我对汽车、电子设备或机械感兴趣', 'R'),
    createHollandQuestion('hol-r-6', '我喜欢建造或制作东西', 'R'),
    createHollandQuestion('hol-r-7', '我更愿意从事具体、实际的工作', 'R'),
    createHollandQuestion('hol-i-1', '我喜欢探索科学问题和理论', 'I'),
    createHollandQuestion('hol-i-2', '我善于分析和解决复杂问题', 'I'),
    createHollandQuestion('hol-i-3', '我对数学和科学有浓厚兴趣', 'I'),
    createHollandQuestion('hol-i-4', '我喜欢阅读科学文献和研究报告', 'I'),
    createHollandQuestion('hol-i-5', '我更愿意独立研究和思考', 'I'),
    createHollandQuestion('hol-i-6', '我对新技术和新发现感兴趣', 'I'),
    createHollandQuestion('hol-i-7', '我喜欢进行实验和分析数据', 'I'),
    createHollandQuestion('hol-a-1', '我喜欢创作艺术作品', 'A'),
    createHollandQuestion('hol-a-2', '我对音乐、绘画或写作有浓厚兴趣', 'A'),
    createHollandQuestion('hol-a-3', '我喜欢表达自己的想法和情感', 'A'),
    createHollandQuestion('hol-a-4', '我欣赏创意和原创性', 'A'),
    createHollandQuestion('hol-a-5', '我喜欢参加艺术活动', 'A'),
    createHollandQuestion('hol-a-6', '我更愿意从事创造性的工作', 'A'),
    createHollandQuestion('hol-a-7', '我对设计和美学有敏锐的感觉', 'A'),
  ],
  professional: [
    // R: 现实型 (Realistic) - 7题
    createHollandQuestion('hol-r-1', '我喜欢使用工具和机械进行工作', 'R'),
    createHollandQuestion('hol-r-2', '我擅长修理家用电器或机械设备', 'R'),
    createHollandQuestion('hol-r-3', '我喜欢户外活动和体力劳动', 'R'),
    createHollandQuestion('hol-r-4', '我更喜欢动手操作而不是抽象思考', 'R'),
    createHollandQuestion('hol-r-5', '我对汽车、电子设备或机械感兴趣', 'R'),
    createHollandQuestion('hol-r-6', '我喜欢建造或制作东西', 'R'),
    createHollandQuestion('hol-r-7', '我更愿意从事具体、实际的工作', 'R'),

    // I: 研究型 (Investigative) - 7题
    createHollandQuestion('hol-i-1', '我喜欢探索科学问题和理论', 'I'),
    createHollandQuestion('hol-i-2', '我善于分析和解决复杂问题', 'I'),
    createHollandQuestion('hol-i-3', '我对数学和科学有浓厚兴趣', 'I'),
    createHollandQuestion('hol-i-4', '我喜欢阅读科学文献和研究报告', 'I'),
    createHollandQuestion('hol-i-5', '我更愿意独立研究和思考', 'I'),
    createHollandQuestion('hol-i-6', '我对新技术和新发现感兴趣', 'I'),
    createHollandQuestion('hol-i-7', '我喜欢进行实验和分析数据', 'I'),

    // A: 艺术型 (Artistic) - 7题
    createHollandQuestion('hol-a-1', '我喜欢创作艺术作品', 'A'),
    createHollandQuestion('hol-a-2', '我对音乐、绘画或写作有浓厚兴趣', 'A'),
    createHollandQuestion('hol-a-3', '我喜欢表达自己的想法和情感', 'A'),
    createHollandQuestion('hol-a-4', '我欣赏创意和原创性', 'A'),
    createHollandQuestion('hol-a-5', '我喜欢参加艺术活动', 'A'),
    createHollandQuestion('hol-a-6', '我更愿意从事创造性的工作', 'A'),
    createHollandQuestion('hol-a-7', '我对设计和美学有敏锐的感觉', 'A'),

    // S: 社会型 (Social) - 7题
    createHollandQuestion('hol-s-1', '我喜欢帮助他人解决问题', 'S'),
    createHollandQuestion('hol-s-2', '我善于倾听和理解他人', 'S'),
    createHollandQuestion('hol-s-3', '我对教育和培训感兴趣', 'S'),
    createHollandQuestion('hol-s-4', '我喜欢与人交往和合作', 'S'),
    createHollandQuestion('hol-s-5', '我愿意参与志愿服务活动', 'S'),
    createHollandQuestion('hol-s-6', '我更愿意从事与人相关的工作', 'S'),
    createHollandQuestion('hol-s-7', '我对心理咨询和社会工作感兴趣', 'S'),

    // E: 企业型 (Enterprising) - 7题
    createHollandQuestion('hol-e-1', '我喜欢领导和管理他人', 'E'),
    createHollandQuestion('hol-e-2', '我善于说服和影响他人', 'E'),
    createHollandQuestion('hol-e-3', '我对商业和创业感兴趣', 'E'),
    createHollandQuestion('hol-e-4', '我喜欢制定计划和目标', 'E'),
    createHollandQuestion('hol-e-5', '我愿意承担责任和风险', 'E'),
    createHollandQuestion('hol-e-6', '我更愿意从事管理和销售工作', 'E'),
    createHollandQuestion('hol-e-7', '我对公共关系和市场营销感兴趣', 'E'),

    // C: 常规型 (Conventional) - 7题
    createHollandQuestion('hol-c-1', '我喜欢有秩序和结构的工作环境', 'C'),
    createHollandQuestion('hol-c-2', '我善于处理数据和文件', 'C'),
    createHollandQuestion('hol-c-3', '我对会计和行政工作感兴趣', 'C'),
    createHollandQuestion('hol-c-4', '我喜欢遵循既定的程序和规则', 'C'),
    createHollandQuestion('hol-c-5', '我愿意从事需要精确和细致的工作', 'C'),
    createHollandQuestion('hol-c-6', '我更愿意从事办公室工作', 'C'),
    createHollandQuestion('hol-c-7', '我对组织和管理信息感兴趣', 'C'),
  ],
}

export const hollandTypes = {
  R: {
    name: '现实型',
    englishName: 'Realistic',
    description: '喜欢使用工具、机器进行实际操作，擅长修理和建造，偏好户外和体力活动。',
    traits: ['务实', '动手能力强', '独立', '实际'],
    careers: ['工程师', '技师', '建筑师', '农民', '机械师', '电工', '飞行员'],
    workEnvironment: '需要动手操作和实际技能的工作环境',
  },
  I: {
    name: '研究型',
    englishName: 'Investigative',
    description: '喜欢探索科学问题和理论，善于分析和解决复杂问题，对数学和科学有浓厚兴趣。',
    traits: ['分析能力强', '好奇', '独立', '理性'],
    careers: ['科学家', '研究员', '医生', '程序员', '分析师', '教授', '心理学家'],
    workEnvironment: '需要研究和分析能力的工作环境',
  },
  A: {
    name: '艺术型',
    englishName: 'Artistic',
    description: '喜欢创作艺术作品，对音乐、绘画或写作有浓厚兴趣，欣赏创意和原创性。',
    traits: ['创造力强', '想象力丰富', '感性', '独立'],
    careers: ['艺术家', '设计师', '作家', '音乐家', '演员', '摄影师', '建筑师'],
    workEnvironment: '需要创造力和艺术表达的工作环境',
  },
  S: {
    name: '社会型',
    englishName: 'Social',
    description: '喜欢帮助他人解决问题，善于倾听和理解他人，对教育和培训感兴趣。',
    traits: ['善于沟通', '有同理心', '合作', '热心'],
    careers: ['教师', '咨询师', '护士', '社会工作者', '人力资源', '培训师', '医生'],
    workEnvironment: '需要与人交往和帮助他人的工作环境',
  },
  E: {
    name: '企业型',
    englishName: 'Enterprising',
    description: '喜欢领导和管理他人，善于说服和影响他人，对商业和创业感兴趣。',
    traits: ['领导力强', '自信', '有野心', '善于说服'],
    careers: ['企业家', '经理', '销售', '律师', '政治家', '市场专员', '公关'],
    workEnvironment: '需要领导和管理能力的工作环境',
  },
  C: {
    name: '常规型',
    englishName: 'Conventional',
    description: '喜欢有秩序和结构的工作环境，善于处理数据和文件，遵循既定的程序和规则。',
    traits: ['有条理', '精确', '可靠', '细心'],
    careers: ['会计', '行政助理', '银行职员', '秘书', '数据分析师', '图书管理员', '审计'],
    workEnvironment: '需要组织和处理信息的工作环境',
  },
}

export const hollandCombinations: Record<string, { name: string; description: string; careers: string[] }> = {
  'RIA': { name: '技术型', description: '结合了现实型、研究型和艺术型的特点', careers: ['机械设计师', '技术工程师', '工业设计师'] },
  'RIS': { name: '技术服务型', description: '结合了现实型、研究型和社会型的特点', careers: ['医疗技师', '技术培训师', '设备维护工程师'] },
  'RIE': { name: '技术管理型', description: '结合了现实型、研究型和企业型的特点', careers: ['项目经理', '技术主管', '工程经理'] },
  'RIC': { name: '技术行政型', description: '结合了现实型、研究型和常规型的特点', careers: ['质量控制工程师', '技术文档编写员', '标准化工程师'] },
  'AIR': { name: '创意技术型', description: '结合了艺术型、研究型和现实型的特点', careers: ['工业设计师', '建筑师', '产品设计师'] },
  'AIS': { name: '创意服务型', description: '结合了艺术型、研究型和社会型的特点', careers: ['艺术治疗师', '教育技术专家', '博物馆策展人'] },
  'AIE': { name: '创意管理型', description: '结合了艺术型、研究型和企业型的特点', careers: ['创意总监', '广告策划', '品牌经理'] },
  'SIA': { name: '教育创意型', description: '结合了社会型、研究型和艺术型的特点', careers: ['教育设计师', '培训专家', '课程开发者'] },
  'SIE': { name: '教育管理型', description: '结合了社会型、研究型和企业型的特点', careers: ['教育管理者', '人力资源经理', '培训经理'] },
  'EIS': { name: '管理服务型', description: '结合了企业型、研究型和社会型的特点', careers: ['管理顾问', '项目经理', '企业培训师'] },
}

export const hollandReferences = [
  'Holland, J. L. (1997). Making vocational choices: A theory of vocational personalities and work environments (3rd ed.). Psychological Assessment Resources.',
  'Holland, J. L. (1985). Manual for the Self-Directed Search. Psychological Assessment Resources.',
  'Holland, J. L., & Gottfredson, G. D. (1994). Self-Directed Search Form R: 1994 Edition. Psychological Assessment Resources.',
  'Nauta, J. J. (2010). The development, evolution, and status of Holland\'s theory of vocational personalities: Reflections and future directions for counseling psychology. Journal of Counseling Psychology, 57(1), 11-22.',
]

export function calculateHollandCode(scores: Record<string, number>): string {
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([key]) => key)
  return sorted.join('')
}
