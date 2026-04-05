import type { ProfessionalQuestionSet } from '../../types'

// ==================== 领导力测评 (MLQ) ====================
const createMLQQuestion = (
  id: string,
  text: string,
  subscale: string
) => ({
  id,
  text,
  type: 'scale' as const,
  subscale,
  options: [
    { id: '0', text: '从不', value: 0 },
    { id: '1', text: '偶尔', value: 1 },
    { id: '2', text: '有时', value: 2 },
    { id: '3', text: '经常', value: 3 },
    { id: '4', text: '总是', value: 4 },
  ],
})

export const mlqProfessionalQuestions: ProfessionalQuestionSet = {
  normal: [
    createMLQQuestion('mlq-1', '我能够向他人清晰地传达愿景和目标', 'idealized-influence-behavior'),
    createMLQQuestion('mlq-2', '我以身作则，成为他人的榜样', 'idealized-influence-attributed'),
    createMLQQuestion('mlq-3', '我能够激发他人的热情和动力', 'inspirational-motivation'),
    createMLQQuestion('mlq-4', '我鼓励他人从不同角度思考问题', 'intellectual-stimulation'),
    createMLQQuestion('mlq-5', '我关注每个人的发展需求', 'individualized-consideration'),
    createMLQQuestion('mlq-6', '我能够赢得他人的尊重和信任', 'idealized-influence-attributed'),
    createMLQQuestion('mlq-7', '我能够用乐观的方式谈论未来', 'inspirational-motivation'),
    createMLQQuestion('mlq-8', '我鼓励他人提出新想法', 'intellectual-stimulation'),
    createMLQQuestion('mlq-9', '我花时间了解每个人的需求', 'individualized-consideration'),
    createMLQQuestion('mlq-10', '我强调使命和价值观的重要性', 'idealized-influence-behavior'),
  ],
  advanced: [
    createMLQQuestion('mlq-1', '我能够向他人清晰地传达愿景和目标', 'idealized-influence-behavior'),
    createMLQQuestion('mlq-2', '我以身作则，成为他人的榜样', 'idealized-influence-attributed'),
    createMLQQuestion('mlq-3', '我能够激发他人的热情和动力', 'inspirational-motivation'),
    createMLQQuestion('mlq-4', '我鼓励他人从不同角度思考问题', 'intellectual-stimulation'),
    createMLQQuestion('mlq-5', '我关注每个人的发展需求', 'individualized-consideration'),
    createMLQQuestion('mlq-6', '我能够赢得他人的尊重和信任', 'idealized-influence-attributed'),
    createMLQQuestion('mlq-7', '我能够用乐观的方式谈论未来', 'inspirational-motivation'),
    createMLQQuestion('mlq-8', '我鼓励他人提出新想法', 'intellectual-stimulation'),
    createMLQQuestion('mlq-9', '我花时间了解每个人的需求', 'individualized-consideration'),
    createMLQQuestion('mlq-10', '我强调使命和价值观的重要性', 'idealized-influence-behavior'),
    createMLQQuestion('mlq-11', '我能够激励他人超越自我', 'inspirational-motivation'),
    createMLQQuestion('mlq-12', '我鼓励他人质疑假设', 'intellectual-stimulation'),
    createMLQQuestion('mlq-13', '我帮助他人发展优势', 'individualized-consideration'),
    createMLQQuestion('mlq-14', '我展现出高度的专业精神', 'idealized-influence-attributed'),
    createMLQQuestion('mlq-15', '我能够表达对美好未来的期望', 'inspirational-motivation'),
  ],
  professional: [
    // 变革型领导 (Transformational Leadership)
    createMLQQuestion('mlq-1', '我能够向他人清晰地传达愿景和目标', 'idealized-influence-behavior'),
    createMLQQuestion('mlq-2', '我以身作则，成为他人的榜样', 'idealized-influence-attributed'),
    createMLQQuestion('mlq-3', '我能够激发他人的热情和动力', 'inspirational-motivation'),
    createMLQQuestion('mlq-4', '我鼓励他人从不同角度思考问题', 'intellectual-stimulation'),
    createMLQQuestion('mlq-5', '我关注每个人的发展需求', 'individualized-consideration'),
    createMLQQuestion('mlq-6', '我能够赢得他人的尊重和信任', 'idealized-influence-attributed'),
    createMLQQuestion('mlq-7', '我能够用乐观的方式谈论未来', 'inspirational-motivation'),
    createMLQQuestion('mlq-8', '我鼓励他人提出新想法', 'intellectual-stimulation'),
    createMLQQuestion('mlq-9', '我花时间了解每个人的需求', 'individualized-consideration'),
    createMLQQuestion('mlq-10', '我强调使命和价值观的重要性', 'idealized-influence-behavior'),
    createMLQQuestion('mlq-11', '我能够激励他人超越自我', 'inspirational-motivation'),
    createMLQQuestion('mlq-12', '我鼓励他人质疑假设', 'intellectual-stimulation'),
    createMLQQuestion('mlq-13', '我帮助他人发展优势', 'individualized-consideration'),
    createMLQQuestion('mlq-14', '我展现出高度的专业精神', 'idealized-influence-attributed'),
    createMLQQuestion('mlq-15', '我能够表达对美好未来的期望', 'inspirational-motivation'),

    // 交易型领导 (Transactional Leadership)
    createMLQQuestion('mlq-16', '我明确说明完成任务后的奖励', 'contingent-reward'),
    createMLQQuestion('mlq-17', '我关注偏离标准的行为', 'management-by-exception-active'),
    createMLQQuestion('mlq-18', '我只有在问题出现时才介入', 'management-by-exception-passive'),
    createMLQQuestion('mlq-19', '我建立清晰的绩效标准', 'contingent-reward'),
    createMLQQuestion('mlq-20', '我密切监控绩效表现', 'management-by-exception-active'),

    // 放任型领导 (Laissez-Faire)
    createMLQQuestion('mlq-21', '我倾向于推迟决策', 'laissez-faire'),
    createMLQQuestion('mlq-22', '我很少介入问题', 'laissez-faire'),
    createMLQQuestion('mlq-23', '我避免做出决策', 'laissez-faire'),
    createMLQQuestion('mlq-24', '我让问题自行解决', 'laissez-faire'),

    // 领导效果 (Outcomes)
    createMLQQuestion('mlq-25', '我能够有效地领导团队达成目标', 'effectiveness'),
    createMLQQuestion('mlq-26', '团队在我的领导下表现良好', 'effectiveness'),
    createMLQQuestion('mlq-27', '我能够满足团队的需求', 'satisfaction'),
    createMLQQuestion('mlq-28', '团队成员对我感到满意', 'satisfaction'),
    createMLQQuestion('mlq-29', '团队在我的领导下取得额外成果', 'extra-effort'),
    createMLQQuestion('mlq-30', '我能够激励团队付出额外努力', 'extra-effort'),
  ],
}

export const mlqDimensions = {
  'transformational': {
    name: '变革型领导',
    subscales: ['idealized-influence-attributed', 'idealized-influence-behavior', 'inspirational-motivation', 'intellectual-stimulation', 'individualized-consideration'],
    description: '通过愿景、激励和个性化关怀来领导他人',
  },
  'transactional': {
    name: '交易型领导',
    subscales: ['contingent-reward', 'management-by-exception-active', 'management-by-exception-passive'],
    description: '通过奖励和惩罚来管理绩效',
  },
  'laissez-faire': {
    name: '放任型领导',
    subscales: ['laissez-faire'],
    description: '避免干预和决策',
  },
}

export const mlqReferences = [
  'Bass, B. M., & Avolio, B. J. (1995). MLQ Multifactor Leadership Questionnaire. Mind Garden.',
  'Avolio, B. J., & Bass, B. M. (2004). Multifactor Leadership Questionnaire: Manual and sampler set (3rd ed.). Mind Garden.',
  'Antonakis, J., Avolio, B. J., & Sivasubramaniam, N. (2003). Context and leadership: An examination of the nine-factor full-range leadership theory using the Multifactor Leadership Questionnaire. The Leadership Quarterly, 14(3), 261-295.',
]

// ==================== 学习风格测评 (Kolb LSI-Extended) ====================
const createKolbQuestion = (
  id: string,
  text: string
) => ({
  id,
  text,
  type: 'ranking' as const,
  subscale: 'learning-style',
  options: [
    { id: 'ce', text: '凭感觉和直觉', value: 4, trait: 'CE' },
    { id: 'ro', text: '观察和反思', value: 3, trait: 'RO' },
    { id: 'ac', text: '思考和分析', value: 2, trait: 'AC' },
    { id: 'ae', text: '实践和行动', value: 1, trait: 'AE' },
  ],
})

export const kolbProfessionalQuestions: ProfessionalQuestionSet = {
  normal: [],
  advanced: [],
  professional: [
    // 基础学习偏好 (1-12)
    createKolbQuestion('kolb-1', '当我学习时，我更喜欢：'),
    createKolbQuestion('kolb-2', '我学得最好的时候是：'),
    createKolbQuestion('kolb-3', '当我处理问题时，我倾向于：'),
    createKolbQuestion('kolb-4', '我更喜欢学习：'),
    createKolbQuestion('kolb-5', '我认为自己是：'),
    createKolbQuestion('kolb-6', '我更喜欢：'),
    createKolbQuestion('kolb-7', '当我面对新情况时，我倾向于：'),
    createKolbQuestion('kolb-8', '我更喜欢的工作是：'),
    createKolbQuestion('kolb-9', '我认为学习应该是：'),
    createKolbQuestion('kolb-10', '我更喜欢：'),
    createKolbQuestion('kolb-11', '我更信任：'),
    createKolbQuestion('kolb-12', '我更喜欢学习环境：'),

    // 信息获取方式 (13-20)
    {
      id: 'kolb-13',
      text: '阅读一本新书时，我倾向于：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '感受作者的情感表达', value: 4, trait: 'CE' },
        { id: 'ro', text: '仔细品味文字细节', value: 3, trait: 'RO' },
        { id: 'ac', text: '分析论证逻辑', value: 2, trait: 'AC' },
        { id: 'ae', text: '立即尝试书中方法', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-14',
      text: '参加培训课程时，我最关注：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '与讲师和其他学员互动', value: 4, trait: 'CE' },
        { id: 'ro', text: '认真做笔记观察', value: 3, trait: 'RO' },
        { id: 'ac', text: '理解概念框架', value: 2, trait: 'AC' },
        { id: 'ae', text: '参与练习和角色扮演', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-15',
      text: '观看教学视频时，我通常：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '被视频的情感内容吸引', value: 4, trait: 'CE' },
        { id: 'ro', text: '反复观看关键部分', value: 3, trait: 'RO' },
        { id: 'ac', text: '暂停思考逻辑关系', value: 2, trait: 'AC' },
        { id: 'ae', text: '边看边实践操作', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-16',
      text: '学习新软件时，我的方法是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '请别人演示给我看', value: 4, trait: 'CE' },
        { id: 'ro', text: '先阅读使用说明', value: 3, trait: 'RO' },
        { id: 'ac', text: '理解背后的原理', value: 2, trait: 'AC' },
        { id: 'ae', text: '直接上手试错', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-17',
      text: '面对复杂的数据报告，我会：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '寻找数据背后的人的故事', value: 4, trait: 'CE' },
        { id: 'ro', text: '仔细查看每个数据点', value: 3, trait: 'RO' },
        { id: 'ac', text: '建立数据分析模型', value: 2, trait: 'AC' },
        { id: 'ae', text: '用数据做决策实验', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-18',
      text: '学习历史事件时，我喜欢：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '感受当时人们的情感', value: 4, trait: 'CE' },
        { id: 'ro', text: '收集各种史料对比', value: 3, trait: 'RO' },
        { id: 'ac', text: '分析因果关系和规律', value: 2, trait: 'AC' },
        { id: 'ae', text: '模拟历史决策场景', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-19',
      text: '学习外语时，我更有效的方法是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '通过歌曲电影感受语言', value: 4, trait: 'CE' },
        { id: 'ro', text: '大量阅读和听力输入', value: 3, trait: 'RO' },
        { id: 'ac', text: '学习语法规则体系', value: 2, trait: 'AC' },
        { id: 'ae', text: '与母语者对话练习', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-20',
      text: '理解科学概念时，我倾向于：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '想象其在生活中的应用场景', value: 4, trait: 'CE' },
        { id: 'ro', text: '观察实验现象和数据', value: 3, trait: 'RO' },
        { id: 'ac', text: '推导公式和理论框架', value: 2, trait: 'AC' },
        { id: 'ae', text: '自己动手做实验验证', value: 1, trait: 'AE' },
      ],
    },

    // 问题解决策略 (21-28)
    {
      id: 'kolb-21',
      text: '当团队遇到难题时，我会建议：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '让大家分享感受和想法', value: 4, trait: 'CE' },
        { id: 'ro', text: '收集更多相关信息', value: 3, trait: 'RO' },
        { id: 'ac', text: '分析问题的根本原因', value: 2, trait: 'AC' },
        { id: 'ae', text: '尝试快速解决方案', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-22',
      text: '做重要决定前，我通常会：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '询问他人的意见和感受', value: 4, trait: 'CE' },
        { id: 'ro', text: '花时间观察和等待', value: 3, trait: 'RO' },
        { id: 'ac', text: '列出优缺点进行分析', value: 2, trait: 'AC' },
        { id: 'ae', text: '相信直觉立即决定', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-23',
      text: '面对失败的经历，我倾向于：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '与他人分享情感体验', value: 4, trait: 'CE' },
        { id: 'ro', text: '反思整个过程', value: 3, trait: 'RO' },
        { id: 'ac', text: '总结失败原因和教训', value: 2, trait: 'AC' },
        { id: 'ae', text: '立即开始新的尝试', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-24',
      text: '处理人际冲突时，我的方式是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '关注各方的情感需求', value: 4, trait: 'CE' },
        { id: 'ro', text: '倾听各方观点不急于判断', value: 3, trait: 'RO' },
        { id: 'ac', text: '理性分析利益关系', value: 2, trait: 'AC' },
        { id: 'ae', text: '采取行动推动解决', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-25',
      text: '制定计划时，我更注重：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '让团队成员都参与其中', value: 4, trait: 'CE' },
        { id: 'ro', text: '充分调研收集信息', value: 3, trait: 'RO' },
        { id: 'ac', text: '制定详细的时间表和步骤', value: 2, trait: 'AC' },
        { id: 'ae', text: '设定目标后灵活调整', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-26',
      text: '学习一项运动技能时，我会：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '找教练或伙伴一起学', value: 4, trait: 'CE' },
        { id: 'ro', text: '先看很多示范视频', value: 3, trait: 'RO' },
        { id: 'ac', text: '研究动作要领和原理', value: 2, trait: 'AC' },
        { id: 'ae', text: '直接上场边练边改', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-27',
      text: '当需要创新时，我倾向于：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '头脑风暴集思广益', value: 4, trait: 'CE' },
        { id: 'ro', text: '研究成功案例和趋势', value: 3, trait: 'RO' },
        { id: 'ac', text: '基于理论推导新方案', value: 2, trait: 'AC' },
        { id: 'ae', text: '快速原型测试迭代', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-28',
      text: '时间管理方面，我习惯：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '根据心情和能量安排', value: 4, trait: 'CE' },
        { id: 'ro', text: '观察自己的效率规律', value: 3, trait: 'RO' },
        { id: 'ac', text: '制定严格的日程表', value: 2, trait: 'AC' },
        { id: 'ae', text: '灵活应对随时调整', value: 1, trait: 'AE' },
      ],
    },

    // 沟通与协作 (29-36)
    {
      id: 'kolb-29',
      text: '在团队讨论中，我通常是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '鼓励大家表达感受', value: 4, trait: 'CE' },
        { id: 'ro', text: '认真记录各方观点', value: 3, trait: 'RO' },
        { id: 'ac', text: '提出结构性问题', value: 2, trait: 'AC' },
        { id: 'ae', text: '推动形成行动计划', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-30',
      text: '向他人解释复杂概念时，我会：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '用故事和比喻来说明', value: 4, trait: 'CE' },
        { id: 'ro', text: '提供详细的背景信息', value: 3, trait: 'RO' },
        { id: 'ac', text: '展示逻辑框架和图表', value: 2, trait: 'AC' },
        { id: 'ae', text: '让对方动手操作体验', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-31',
      text: '接受反馈时，我希望：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '以对话方式温和交流', value: 4, trait: 'CE' },
        { id: 'ro', text: '有时间独自消化思考', value: 3, trait: 'RO' },
        { id: 'ac', text: '得到具体的数据和分析', value: 2, trait: 'AC' },
        { id: 'ae', text: '知道如何立即改进', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-32',
      text: '教授他人技能时，我的方法是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '建立良好的师生关系', value: 4, trait: 'CE' },
        { id: 'ro', text: '让学习者先观察示范', value: 3, trait: 'RO' },
        { id: 'ac', text: '讲解原理和知识体系', value: 2, trait: 'AC' },
        { id: 'ae', text: '让学习者立即练习', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-33',
      text: '在演讲或展示中，我擅长：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '用情感感染听众', value: 4, trait: 'CE' },
        { id: 'ro', text: '呈现详实的事实数据', value: 3, trait: 'RO' },
        { id: 'ac', text: '构建严密的论证逻辑', value: 2, trait: 'AC' },
        { id: 'ae', text: '进行现场互动演示', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-34',
      text: '谈判时我的策略是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '建立情感连接和信任', value: 4, trait: 'CE' },
        { id: 'ro', text: '仔细听取对方需求', value: 3, trait: 'RO' },
        { id: 'ac', text: '准备充分的论据', value: 2, trait: 'AC' },
        { id: 'ae', text: '快速提出方案测试', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-35',
      text: '写作时，我倾向于：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '从个人经历和感受出发', value: 4, trait: 'CE' },
        { id: 'ro', text: '大量查阅资料参考', value: 3, trait: 'RO' },
        { id: 'ac', text: '先列大纲确保逻辑', value: 2, trait: 'AC' },
        { id: 'ae', text: '自由写作再修改完善', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-36',
      text: '说服他人接受我的观点时，我会：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '诉诸共同价值观和情感', value: 4, trait: 'CE' },
        { id: 'ro', text: '提供充分的事实依据', value: 3, trait: 'RO' },
        { id: 'ac', text: '用逻辑推理证明', value: 2, trait: 'AC' },
        { id: 'ae', text: '展示实际效果和案例', value: 1, trait: 'AE' },
      ],
    },

    // 自我认知与发展 (37-44)
    {
      id: 'kolb-37',
      text: '我认为自己的最大优势是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '同理心和人际敏感度', value: 4, trait: 'CE' },
        { id: 'ro', text: '观察力和耐心', value: 3, trait: 'RO' },
        { id: 'ac', text: '逻辑思维和分析能力', value: 2, trait: 'AC' },
        { id: 'ae', text: '执行力和行动力', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-38',
      text: '我需要改进的方面可能是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '过于依赖情感做决定', value: 4, trait: 'CE' },
        { id: 'ro', text: '行动过于谨慎缓慢', value: 3, trait: 'RO' },
        { id: 'ac', text: '过度分析导致拖延', value: 2, trait: 'AC' },
        { id: 'ae', text: '缺乏深度思考和规划', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-39',
      text: '当我感到压力时，我会：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '找朋友倾诉寻求支持', value: 4, trait: 'CE' },
        { id: 'ro', text: '独处反思整理思绪', value: 3, trait: 'RO' },
        { id: 'ac', text: '分析压力源并制定对策', value: 2, trait: 'AC' },
        { id: 'ae', text: '通过运动或活动释放', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-40',
      text: '我对变化的反应通常是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '兴奋期待新的可能性', value: 4, trait: 'CE' },
        { id: 'ro', text: '谨慎观察变化的影响', value: 3, trait: 'RO' },
        { id: 'ac', text: '评估变化的利弊得失', value: 2, trait: 'AC' },
        { id: 'ae', text: '主动适应并采取行动', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-41',
      text: '我的理想工作环境应该：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '充满人情味和温暖氛围', value: 4, trait: 'CE' },
        { id: 'ro', text: '安静有序可以专注思考', value: 3, trait: 'RO' },
        { id: 'ac', text: '有清晰的结构和制度', value: 2, trait: 'AC' },
        { id: 'ae', text: '动态多变充满挑战', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-42',
      text: '在选择职业时，我优先考虑：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '能否帮助他人和社会', value: 4, trait: 'CE' },
        { id: 'ro', text: '是否有深入学习机会', value: 3, trait: 'RO' },
        { id: 'ac', text: '是否能运用思维能力', value: 2, trait: 'AC' },
        { id: 'ae', text: '是否有实践和挑战空间', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-43',
      text: '我认为成功的定义是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '拥有良好的人际关系', value: 4, trait: 'CE' },
        { id: 'ro', text: '获得深刻的理解和智慧', value: 3, trait: 'RO' },
        { id: 'ac', text: '实现目标和掌握知识', value: 2, trait: 'AC' },
        { id: 'ae', text: '完成有意义的事情', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-44',
      text: '休闲时间我喜欢：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '和朋友聚会社交', value: 4, trait: 'CE' },
        { id: 'ro', text: '阅读或安静独处', value: 3, trait: 'RO' },
        { id: 'ac', text: '解谜或智力游戏', value: 2, trait: 'AC' },
        { id: 'ae', text: '户外活动或运动', value: 1, trait: 'AE' },
      ],
    },

    // 创造力与审美 (45-50)
    {
      id: 'kolb-45',
      text: '欣赏艺术作品时，我被吸引的是：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '作品传达的情感', value: 4, trait: 'CE' },
        { id: 'ro', text: '作品的细节和技法', value: 3, trait: 'RO' },
        { id: 'ac', text: '作品的结构和象征意义', value: 2, trait: 'AC' },
        { id: 'ae', text: '想亲手创作类似作品', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-46',
      text: '设计一个项目时，我从哪里开始：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '了解用户需求和痛点', value: 4, trait: 'CE' },
        { id: 'ro', text: '研究市场和竞品', value: 3, trait: 'RO' },
        { id: 'ac', text: '构思整体架构和功能', value: 2, trait: 'AC' },
        { id: 'ae', text: '制作原型快速验证', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-47',
      text: '遇到创意瓶颈时，我会：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '与人交流获得灵感', value: 4, trait: 'CE' },
        { id: 'ro', text: '暂时放下重新审视', value: 3, trait: 'RO' },
        { id: 'ac', text: '用思维导图梳理思路', value: 2, trait: 'AC' },
        { id: 'ae', text: '随机尝试不同方向', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-48',
      text: '我认为创造力来源于：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '对生活的热爱和感受', value: 4, trait: 'CE' },
        { id: 'ro', text: '对世界的细致观察', value: 3, trait: 'RO' },
        { id: 'ac', text: '知识的重组和创新', value: 2, trait: 'AC' },
        { id: 'ae', text: '不断的实践和试错', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-49',
      text: '评价一个想法的好坏时，我看重：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '它能否引起共鸣', value: 4, trait: 'CE' },
        { id: 'ro', text: '它是否有据可查', value: 3, trait: 'RO' },
        { id: 'ac', text: '它是否逻辑自洽', value: 2, trait: 'AC' },
        { id: 'ae', text: '它是否可行有效', value: 1, trait: 'AE' },
      ],
    },
    {
      id: 'kolb-50',
      text: '回顾我的学习历程，我发现：',
      type: 'ranking',
      subscale: 'learning-style',
      options: [
        { id: 'ce', text: '情感连接让我记忆深刻', value: 4, trait: 'CE' },
        { id: 'ro', text: '反思总结让我收获最多', value: 3, trait: 'RO' },
        { id: 'ac', text: '理论框架帮助我系统化', value: 2, trait: 'AC' },
        { id: 'ae', text: '实践经验让我真正掌握', value: 1, trait: 'AE' },
      ],
    },
  ],
}

export const kolbLearningStyles = {
  diverging: {
    name: '发散型',
    description: '擅长从多角度看待问题，具有丰富的想象力和情感敏感度。',
    traits: ['创造性', '想象力丰富', '善于人际交往', '情感敏感'],
    strengths: ['头脑风暴', '艺术表达', '理解他人'],
    learningPreference: '喜欢小组讨论、头脑风暴和个性化反馈',
    combination: 'CE + RO',
  },
  assimilating: {
    name: '同化型',
    description: '擅长将不同观点整合成连贯的理论，注重逻辑和概念。',
    traits: ['逻辑思维', '概念清晰', '善于规划', '理论导向'],
    strengths: ['理论构建', '数据分析', '规划组织'],
    learningPreference: '喜欢讲座、阅读和独立思考',
    combination: 'RO + AC',
  },
  converging: {
    name: '聚合型',
    description: '擅长将理论应用于实践，注重解决实际问题。',
    traits: ['问题解决', '决策能力', '技术应用', '结果导向'],
    strengths: ['实践应用', '技术问题', '决策制定'],
    learningPreference: '喜欢实验、模拟和实践练习',
    combination: 'AC + AE',
  },
  accommodating: {
    name: '适应型',
    description: '擅长从实践和经验中学习，注重行动和结果。',
    traits: ['行动导向', '适应性强', '善于实践', '直觉决策'],
    strengths: ['实践执行', '适应变化', '团队合作'],
    learningPreference: '喜欢实地工作、项目和实践经验',
    combination: 'AE + CE',
  },
}

export const kolbReferences = [
  'Kolb, D. A. (1984). Experiential learning: Experience as the source of learning and development. Prentice-Hall.',
  'Kolb, A. Y., & Kolb, D. A. (2005). Learning styles and learning spaces: Enhancing experiential learning in higher education. Academy of Management Learning & Education, 4(2), 193-212.',
  'Kolb, D. A. (2015). Experiential learning: Experience as the source of learning and development (2nd ed.). Pearson.',
]

// ==================== 压力测评 (PSS-10) ====================
const createPSSQuestion = (
  id: string,
  text: string,
  reverseScored: boolean = false
) => ({
  id,
  text,
  type: 'scale' as const,
  subscale: 'perceived-stress',
  reverseScored,
  options: [
    { id: '0', text: '从不', value: 0 },
    { id: '1', text: '偶尔', value: 1 },
    { id: '2', text: '有时', value: 2 },
    { id: '3', text: '经常', value: 3 },
    { id: '4', text: '总是', value: 4 },
  ],
})

export const pssProfessionalQuestions: ProfessionalQuestionSet = {
  normal: [],
  advanced: [],
  professional: [
    createPSSQuestion('pss-1', '在过去一个月里，您有多少次因为意外发生的事情而感到不安？'),
    createPSSQuestion('pss-2', '在过去一个月里，您有多少次感到无法控制生活中重要的事情？'),
    createPSSQuestion('pss-3', '在过去一个月里，您有多少次感到紧张和压力？'),
    createPSSQuestion('pss-4', '在过去一个月里，您有多少次对自己处理个人问题的能力感到自信？', true),
    createPSSQuestion('pss-5', '在过去一个月里，您有多少次感到事情按照您期望的方向发展？', true),
    createPSSQuestion('pss-6', '在过去一个月里，您有多少次发现自己无法应对所有需要做的事情？'),
    createPSSQuestion('pss-7', '在过去一个月里，您有多少次能够控制生活中的烦恼？', true),
    createPSSQuestion('pss-8', '在过去一个月里，您有多少次感到事情都在掌控之中？', true),
    createPSSQuestion('pss-9', '在过去一个月里，您有多少次因为无法控制的事情而感到愤怒？'),
    createPSSQuestion('pss-10', '在过去一个月里，您有多少次感到困难堆积如山，无法克服？'),
  ],
}

export const pssInterpretation = {
  low: {
    range: '0-13',
    level: '低压力',
    description: '您的压力水平较低，能够有效应对生活中的挑战。',
    recommendation: '继续保持健康的生活方式，注意压力管理。',
  },
  moderate: {
    range: '14-26',
    level: '中等压力',
    description: '您的压力水平中等，可能需要关注压力管理。',
    recommendation: '建议学习放松技巧，保持规律作息，适当运动。',
  },
  high: {
    range: '27-40',
    level: '高压力',
    description: '您的压力水平较高，可能需要采取措施减轻压力。',
    recommendation: '建议寻求专业帮助，学习压力管理技巧，关注身心健康。',
  },
}

export const pssReferences = [
  'Cohen, S., Kamarck, T., & Mermelstein, R. (1983). A global measure of perceived stress. Journal of Health and Social Behavior, 24(4), 385-396.',
  'Cohen, S., & Williamson, G. (1988). Perceived stress in a probability sample of the United States. In S. Spacapan & S. Oskamp (Eds.), The social psychology of health (pp. 31-67). Sage.',
  'Lee, E. H. (2012). Review of the psychometric evidence of the perceived stress scale. Asian Nursing Research, 6(4), 121-127.',
]

// ==================== 批判性思维测评 (Watson-Glaser Extended) ====================
const createWGInference = (
  id: string,
  text: string,
  correctAnswer: 'true' | 'false' | 'probable' | 'insufficient'
) => ({
  id,
  text,
  type: 'single' as const,
  subscale: 'inference',
  options: [
    { id: 'true', text: '正确', value: correctAnswer === 'true' ? 1 : 0 },
    { id: 'false', text: '错误', value: correctAnswer === 'false' ? 1 : 0 },
    { id: 'probable', text: '可能正确', value: correctAnswer === 'probable' ? 1 : 0 },
    { id: 'insufficient', text: '信息不足', value: correctAnswer === 'insufficient' ? 1 : 0 },
  ],
})

const createWGAssumption = (
  id: string,
  text: string,
  isMade: boolean
) => ({
  id,
  text,
  type: 'single' as const,
  subscale: 'assumptions',
  options: [
    { id: 'made', text: '假设成立', value: isMade ? 1 : 0 },
    { id: 'not-made', text: '假设不成立', value: !isMade ? 1 : 0 },
  ],
})

const createWGDeduction = (
  id: string,
  text: string,
  follows: boolean
) => ({
  id,
  text,
  type: 'single' as const,
  subscale: 'deduction',
  options: [
    { id: 'follows', text: '结论成立', value: follows ? 1 : 0 },
    { id: 'not-follows', text: '结论不成立', value: !follows ? 1 : 0 },
  ],
})

const createWGInterpretation = (
  id: string,
  text: string,
  follows: boolean
) => ({
  id,
  text,
  type: 'single' as const,
  subscale: 'interpretation',
  options: [
    { id: 'follows', text: '解释合理', value: follows ? 1 : 0 },
    { id: 'not-follows', text: '解释不合理', value: !follows ? 1 : 0 },
  ],
})

const createWGEvaluation = (
  id: string,
  statement: string,
  argument: string,
  isStrong: boolean
) => ({
  id,
  text: `${statement} 论证：${argument}`,
  type: 'single' as const,
  subscale: 'evaluation',
  options: [
    { id: 'strong', text: '论证有力', value: isStrong ? 1 : 0 },
    { id: 'weak', text: '论证无力', value: !isStrong ? 1 : 0 },
  ],
})

export const watsonGlaserQuestions: ProfessionalQuestionSet = {
  normal: [],
  advanced: [],
  professional: [
    // ========== 推理 (Inference) - 8题 ==========
    createWGInference('wg-inf-1', '所有成功的企业家都具有冒险精神。张先生是一位成功的企业家。因此，张先生具有冒险精神。', 'true'),
    createWGInference('wg-inf-2', '研究表明，每天锻炼30分钟可以降低心脏病风险。李先生每天锻炼30分钟。因此，李先生不会患心脏病。', 'probable'),
    createWGInference('wg-inf-3', '某公司去年利润增长了20%。因此，该公司今年也会保持同样的增长率。', 'probable'),
    createWGInference('wg-inf-4', '调查显示90%的用户喜欢产品A的新功能。因此，产品A一定会获得市场成功。', 'probable'),
    createWGInference('wg-inf-5', '小王连续三天迟到。因此，小王是一个不守时的人。', 'insufficient'),
    createWGInference('wg-inf-6', '所有哺乳动物都是恒温动物。鲸鱼是哺乳动物。因此，鲸鱼是恒温动物。', 'true'),
    createWGInference('wg-inf-7', '张三和李四都参加了同一场考试。张三得了高分。因此，李四也一定得了高分。', 'false'),
    createWGInference('wg-inf-8', '研究表明喝咖啡可以提高短期注意力。因此，长期大量饮用咖啡对健康有益。', 'insufficient'),

    // ========== 识别假设 (Recognition of Assumptions) - 8题 ==========
    createWGAssumption('wg-ass-1', '我们应该提高教育投入，因为教育是国家发展的基础。该论述假设：教育投入能够促进国家发展。', true),
    createWGAssumption('wg-ass-2', '我们应该限制社交媒体使用时间，因为它影响青少年健康。该论述假设：所有社交媒体使用都对青少年健康有害。', false),
    createWGAssumption('wg-ass-3', '应该禁止在公共场所吸烟，因为二手烟危害他人健康。该论述假设：公共场所的二手烟确实会危害他人健康。', true),
    createWGAssumption('wg-ass-4', '大学生应该学习编程技能，因为这是未来就业的基本要求。该论述假设：编程将成为所有职业的基本要求。', false),
    createWGAssumption('wg-ass-5', '政府应该增加医疗支出，因为健康是公民的基本权利。该论述假设：公民有权获得政府提供的医疗服务。', true),
    createWGAssumption('wg-ass-6', '应该降低税收以刺激经济增长。该论述假设：降低税收一定能带来经济增长。', false),
    createWGAssumption('wg-ass-7', '企业应该实行弹性工作制，因为这能提高员工满意度。该论述假设：员工更喜欢灵活的工作安排。', true),
    createWGAssumption('wg-ass-8', '应该强制所有人接种疫苗，因为这样可以建立群体免疫。该论述假设：疫苗接种是建立群体免疫的唯一方式。', false),

    // ========== 演绎推理 (Deduction) - 8题 ==========
    createWGDeduction('wg-ded-1', '所有的猫都是哺乳动物。所有的哺乳动物都是动物。因此，所有的猫都是动物。', true),
    createWGDeduction('wg-ded-2', '所有的学生都必须参加考试。小明没有参加考试。因此，小明不是学生。', true),
    createWGDeduction('wg-ded-3', '有些医生是女性。有些女性是教师。因此，有些医生是教师。', false),
    createWGDeduction('wg-ded-4', '如果下雨，地面就会湿。地面湿了。因此，下过雨了。', false),
    createWGDeduction('wg-ded-5', '所有A都是B。所有B都是C。x是A。因此，x是C。', true),
    createWGDeduction('wg-ded-6', '如果努力工作就能成功。小李没有成功。因此，小李没有努力工作。', true),
    createWGDeduction('wg-ded-7', '大多数程序员都懂英语。小王懂英语。因此，小王是程序员。', false),
    createWGDeduction('wg-ded-8', '要么A要么B。不是A。因此，是B。', true),

    // ========== 解释 (Interpretation) - 8题 ==========
    createWGInterpretation('wg-int-1', '调查显示，80%的消费者对产品满意。这表明产品质量很好。', true),
    createWGInterpretation('wg-int-2', '公司去年的销售额下降了10%。这证明公司的产品质量有问题。', false),
    createWGInterpretation('wg-int-3', '研究显示，经常阅读的人词汇量更大。这说明阅读能提高语言能力。', true),
    createWGInterpretation('wg-int-4', '甲队在本赛季赢了大部分比赛。这意味着甲队是最强的队伍。', false),
    createWGInterpretation('wg-int-5', '数据显示，城市居民的平均收入高于农村居民。这表明城市生活更好。', false),
    createWGInterpretation('wg-int-6', '实验组的学习成绩明显优于对照组。这说明新的教学方法有效。', true),
    createWGInterpretation('wg-int-7', '调查发现，大多数年轻人支持环保政策。这意味着年轻一代更有社会责任感。', false),
    createWGInterpretation('wg-int-8', '统计显示，受过高等教育的人失业率更低。这表明教育有助于就业。', true),

    // ========== 论证评估 (Evaluation of Arguments) - 8题 ==========
    createWGEvaluation('wg-eval-1', '应该禁止吸烟吗？', '应该，因为吸烟有害健康且被动吸烟危害他人。', true),
    createWGEvaluation('wg-eval-2', '应该提高税收吗？', '应该，因为政府需要更多资金。', false),
    createWGEvaluation('wg-eval-3', '是否应该实行全民免费医疗？', '应该，因为健康权是基本人权，不应因经济条件而受限。', true),
    createWGEvaluation('wg-eval-4', '是否应该延长义务教育年限？', '不应该，因为这会增加财政负担。', false),
    createWGEvaluation('wg-eval-5', '是否应该允许基因编辑技术用于人类？', '应该，因为这可以消除遗传疾病，提高人类生活质量。', true),
    createWGEvaluation('wg-eval-6', '是否应该限制人工智能的发展？', '应该，因为AI可能会取代人类工作。', false),
    createWGEvaluation('wg-eval-7', '是否应该实施碳排放税？', '应该，因为气候变化是全球性危机，需要经济手段推动减排。', true),
    createWGEvaluation('wg-eval-8', '是否应该取消死刑？', '不应该，因为杀人偿命是天经地义的。', false),
  ],
}

export const watsonGlaserReferences = [
  'Watson, G., & Glaser, E. M. (1980). Watson-Glaser Critical Thinking Appraisal. Psychological Corporation.',
  'Pearson (2012). Watson-Glaser II Critical Thinking Appraisal. Pearson.',
  'Williams, R. L. (2006). The Watson-Glaser Critical Thinking Appraisal. In R. F. DeVries (Ed.), Personality and aptitude testing (pp. 165-178). Springer.',
]
