import type { Assessment, AssessmentResult, Answer } from '../types'

// Helper function to calculate score from answers
const calculateScore = (answers: Answer[]): number => {
  return answers.reduce((sum, a) => sum + (a.value || 0), 0)
}

// Helper to get max possible score
const getMaxScore = (questions: { options: { value: number }[] }[]): number => {
  return questions.reduce((sum, q) => {
    const maxOption = Math.max(...q.options.map((o) => o.value))
    return sum + maxOption
  }, 0)
}

export const assessments: Assessment[] = [
  // ============ 人格与心理 (1-8) ============
  {
    id: 'mbti-standard',
    title: 'MBTI 人格测试完整版',
    description: '基于荣格心理类型理论的经典人格测评，16种人格类型深度分析。',
    category: '人格心理',
    difficulty: 'standard',
    duration: 10,
    questions: [
      { id: 'mbti-1', text: '在社交聚会中，你通常：', type: 'single', options: [
        { id: 'e1', text: '主动与陌生人交谈，感到 energized', value: 2, trait: 'E' },
        { id: 'i1', text: '只与熟人交流，需要独处恢复能量', value: 2, trait: 'I' },
      ]},
      { id: 'mbti-2', text: '你更关注：', type: 'single', options: [
        { id: 's1', text: '具体的事实、细节和实际经验', value: 2, trait: 'S' },
        { id: 'n1', text: '整体概念、未来可能性和抽象模式', value: 2, trait: 'N' },
      ]},
      { id: 'mbti-3', text: '做决定时，你更依赖：', type: 'single', options: [
        { id: 't1', text: '逻辑分析、客观标准和因果推理', value: 2, trait: 'T' },
        { id: 'f1', text: '个人价值观、他人感受和和谐关系', value: 2, trait: 'F' },
      ]},
      { id: 'mbti-4', text: '你更喜欢的生活方式：', type: 'single', options: [
        { id: 'j1', text: '有计划、有条理、喜欢确定性和结构', value: 2, trait: 'J' },
        { id: 'p1', text: '灵活、随性、保持开放和适应性', value: 2, trait: 'P' },
      ]},
      { id: 'mbti-5', text: '在工作环境中，你更倾向于：', type: 'single', options: [
        { id: 'e2', text: '团队合作，频繁交流想法', value: 2, trait: 'E' },
        { id: 'i2', text: '独立工作，专注深度思考', value: 2, trait: 'I' },
      ]},
      { id: 'mbti-6', text: '学习新技能时，你更喜欢：', type: 'single', options: [
        { id: 's2', text: '循序渐进，从基础开始实践', value: 2, trait: 'S' },
        { id: 'n2', text: '先理解整体框架，再深入细节', value: 2, trait: 'N' },
      ]},
      { id: 'mbti-7', text: '面对冲突，你的第一反应是：', type: 'single', options: [
        { id: 't2', text: '分析问题的逻辑和公平性', value: 2, trait: 'T' },
        { id: 'f2', text: '考虑各方感受和关系影响', value: 2, trait: 'F' },
      ]},
      { id: 'mbti-8', text: '对于截止日期，你通常：', type: 'single', options: [
        { id: 'j2', text: '提前完成，避免最后一刻压力', value: 2, trait: 'J' },
        { id: 'p2', text: '在压力下反而更有创造力', value: 2, trait: 'P' },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const traits: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
      answers.forEach((answer) => {
        if (answer.trait && answer.value) {
          traits[answer.trait] += answer.value
        }
      })
      
      const type = `${traits.E >= traits.I ? 'E' : 'I'}${traits.S >= traits.N ? 'S' : 'N'}${traits.T >= traits.F ? 'T' : 'F'}${traits.J >= traits.P ? 'J' : 'P'}`
      
      const types: Record<string, { title: string; desc: string; careers: string[] }> = {
        'INTJ': { title: '建筑师', desc: '富有想象力和战略性的思想家，一切皆在计划之中。', careers: ['战略顾问', '软件架构师', '投资分析师'] },
        'INTP': { title: '逻辑学家', desc: '具有创造力的发明家，对知识有止不住的渴望。', careers: ['数据科学家', '研究员', '系统分析师'] },
        'ENTJ': { title: '指挥官', desc: '大胆、富有想象力且意志强大的领导者。', careers: ['CEO', '管理顾问', '企业家'] },
        'ENTP': { title: '辩论家', desc: '聪明好奇的思想者，无法抵挡智力挑战的诱惑。', careers: ['律师', '创意总监', '产品经理'] },
        'INFJ': { title: '提倡者', desc: '安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。', careers: ['心理咨询师', '作家', 'HR总监'] },
        'INFP': { title: '调停者', desc: '诗意、善良的利他主义者，总是热情地帮助他人。', careers: ['艺术家', '社工', '内容创作者'] },
        'ENFJ': { title: '主人公', desc: '富有魅力、鼓舞人心的领导者，有能力迷住听众。', careers: ['培训师', '销售总监', '政治家'] },
        'ENFP': { title: '竞选者', desc: '热情、有创造力、爱社交的自由精神。', careers: ['市场营销', '记者', '创业者'] },
        'ISTJ': { title: '物流师', desc: '实际且注重事实的个人，可靠性不容怀疑。', careers: ['会计师', '项目经理', '审计师'] },
        'ISFJ': { title: '守卫者', desc: '非常专注而温暖的守护者，时刻准备着保护所爱之人。', careers: ['护士', '行政助理', '客户服务'] },
        'ESTJ': { title: '总经理', desc: '出色的管理者，在管理事情或人的方面无与伦比。', careers: ['运营经理', '军官', '法官'] },
        'ESFJ': { title: '执政官', desc: '极有同情心，爱社交、受欢迎的人。', careers: ['教师', '人力资源', '公关专员'] },
        'ISTP': { title: '鉴赏家', desc: '大胆而实际的实验家，擅长使用各种工具。', careers: ['工程师', '飞行员', '法医'] },
        'ISFP': { title: '探险家', desc: '灵活而有魅力的艺术家，时刻准备着探索和体验。', careers: ['设计师', '音乐家', '厨师'] },
        'ESTP': { title: '企业家', desc: '聪明、精力充沛、善于感知的人。', careers: ['销售代表', '运动员', '急救人员'] },
        'ESFP': { title: '表演者', desc: '自发的、精力充沛的娱乐者。', careers: ['演员', '活动策划', '旅游顾问'] },
      }
      
      const result = types[type] || types['INTJ']
      return {
        type,
        title: result.title,
        description: result.desc,
        traits: Object.entries(traits).map(([name, score]) => ({ 
          name, score, maxScore: 4, 
          description: score >= 4 ? '强倾向' : score >= 2 ? '中等倾向' : '弱倾向'
        })),
        details: {
          strengths: ['逻辑思维', '独立自主', '目标导向'],
          weaknesses: ['可能显得冷漠', '过度完美主义'],
          careers: result.careers,
          relationships: '寻求深度而有意义的连接',
        },
        scores: traits,
      }
    },
  },
  {
    id: 'big-five',
    title: '大五人格测试 (OCEAN)',
    description: '心理学界公认的人格评估模型，测量开放性、尽责性、外向性、宜人性和神经质。',
    category: '人格心理',
    difficulty: 'standard',
    duration: 8,
    questions: [
      { id: 'bf-1', text: '我对抽象概念和理论思考感兴趣', type: 'single', options: [
        { id: 'o1', text: '非常不同意', value: 1, trait: 'O' }, { id: 'o2', text: '不同意', value: 2, trait: 'O' },
        { id: 'o3', text: '中立', value: 3, trait: 'O' }, { id: 'o4', text: '同意', value: 4, trait: 'O' },
        { id: 'o5', text: '非常同意', value: 5, trait: 'O' },
      ]},
      { id: 'bf-2', text: '我做事有条理，喜欢按计划行事', type: 'single', options: [
        { id: 'c1', text: '非常不同意', value: 1, trait: 'C' }, { id: 'c2', text: '不同意', value: 2, trait: 'C' },
        { id: 'c3', text: '中立', value: 3, trait: 'C' }, { id: 'c4', text: '同意', value: 4, trait: 'C' },
        { id: 'c5', text: '非常同意', value: 5, trait: 'C' },
      ]},
      { id: 'bf-3', text: '我在社交场合感到自在并乐于交际', type: 'single', options: [
        { id: 'e1', text: '非常不同意', value: 1, trait: 'E' }, { id: 'e2', text: '不同意', value: 2, trait: 'E' },
        { id: 'e3', text: '中立', value: 3, trait: 'E' }, { id: 'e4', text: '同意', value: 4, trait: 'E' },
        { id: 'e5', text: '非常同意', value: 5, trait: 'E' },
      ]},
      { id: 'bf-4', text: '我关心他人的感受，愿意帮助他人', type: 'single', options: [
        { id: 'a1', text: '非常不同意', value: 1, trait: 'A' }, { id: 'a2', text: '不同意', value: 2, trait: 'A' },
        { id: 'a3', text: '中立', value: 3, trait: 'A' }, { id: 'a4', text: '同意', value: 4, trait: 'A' },
        { id: 'a5', text: '非常同意', value: 5, trait: 'A' },
      ]},
      { id: 'bf-5', text: '我容易感到焦虑和情绪波动', type: 'single', options: [
        { id: 'n1', text: '非常不同意', value: 1, trait: 'N' }, { id: 'n2', text: '不同意', value: 2, trait: 'N' },
        { id: 'n3', text: '中立', value: 3, trait: 'N' }, { id: 'n4', text: '同意', value: 4, trait: 'N' },
        { id: 'n5', text: '非常同意', value: 5, trait: 'N' },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const traits: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 }
      answers.forEach((answer) => {
        if (answer.trait && answer.value) {
          traits[answer.trait] += answer.value
        }
      })
      
      const traitNames: Record<string, string> = { O: '开放性', C: '尽责性', E: '外向性', A: '宜人性', N: '神经质' }
      
      return {
        type: 'OCEAN',
        title: '大五人格分析',
        description: '基于心理学研究的五维度人格模型',
        traits: Object.entries(traits).map(([key, score]) => ({
          name: traitNames[key],
          score,
          maxScore: 5,
          description: score >= 4 ? '高' : score >= 3 ? '中等' : '低',
        })),
        details: {
          strengths: ['自我认知清晰', '理解人格差异'],
          weaknesses: ['人格特质会随时间变化'],
          careers: ['适合各种职业，人格无优劣'],
          relationships: '理解自己有助于改善人际关系',
        },
        scores: traits,
      }
    },
  },
  {
    id: 'anxiety-scale',
    title: '焦虑自评量表 (SAS)',
    description: '专业心理学量表，评估焦虑症状的严重程度。',
    category: '人格心理',
    difficulty: 'standard',
    duration: 5,
    questions: [
      { id: 'sas-1', text: '我感到紧张和焦虑', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分时间', value: 4 },
      ]},
      { id: 'sas-2', text: '我无缘无故感到害怕', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分时间', value: 4 },
      ]},
      { id: 'sas-3', text: '我容易心烦意乱或感到恐慌', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分时间', value: 4 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score <= 3 ? '无焦虑' : score <= 6 ? '轻度焦虑' : score <= 9 ? '中度焦虑' : '重度焦虑'
      
      return {
        type: level,
        title: `焦虑水平: ${level}`,
        description: `您的焦虑评分为 ${score} 分`,
        traits: [{ name: '焦虑指数', score, maxScore: 12, description: level }],
        details: {
          strengths: ['自我觉察能力强'],
          weaknesses: score > 6 ? ['建议寻求专业帮助'] : ['保持良好状态'],
          careers: [],
          relationships: '焦虑可能影响社交，建议放松训练',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'emotional-intelligence',
    title: '情绪智力测试',
    description: '评估你识别、理解和管理情绪的能力。',
    category: '人格心理',
    difficulty: 'standard',
    duration: 6,
    questions: [
      { id: 'eq-1', text: '我能准确识别自己的情绪状态', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'eq-2', text: '我能理解他人情绪背后的原因', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'eq-3', text: '在压力下我能保持冷静', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const percentage = (score / 15) * 100
      const level = percentage >= 80 ? '高EQ' : percentage >= 60 ? '中等EQ' : '待提升'
      
      return {
        type: level,
        title: `情绪智力: ${level}`,
        description: `您的情绪智力评分为 ${score}/15 分`,
        traits: [
          { name: '自我觉察', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '共情能力', score: answers[1]?.value || 0, maxScore: 5, description: '' },
          { name: '情绪管理', score: answers[2]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: level === '高EQ' ? ['情绪管理能力强', '人际关系良好'] : ['有提升空间'],
          weaknesses: level !== '高EQ' ? ['建议学习情绪管理技巧'] : ['继续保持'],
          careers: ['管理者', '销售人员', '咨询师', '教师'],
          relationships: '高EQ有助于建立良好的人际关系',
        },
        scores: { total: score, percentage },
      }
    },
  },

  // ============ 职业与能力 (5-12) ============
  {
    id: 'holland-career',
    title: '霍兰德职业兴趣测试',
    description: '基于RIASEC模型的职业兴趣测评，发现最适合你的职业方向。',
    category: '职业能力',
    difficulty: 'standard',
    duration: 10,
    questions: [
      { id: 'h-1', text: '我喜欢动手修理东西或做实验', type: 'single', options: [
        { id: 'r', text: '是', value: 1, trait: 'R' }, { id: 'no', text: '否', value: 0, trait: 'R' },
      ]},
      { id: 'h-2', text: '我喜欢研究科学问题和数据分析', type: 'single', options: [
        { id: 'i', text: '是', value: 1, trait: 'I' }, { id: 'no', text: '否', value: 0, trait: 'I' },
      ]},
      { id: 'h-3', text: '我喜欢艺术创作和设计工作', type: 'single', options: [
        { id: 'a', text: '是', value: 1, trait: 'A' }, { id: 'no', text: '否', value: 0, trait: 'A' },
      ]},
      { id: 'h-4', text: '我喜欢帮助他人解决问题', type: 'single', options: [
        { id: 's', text: '是', value: 1, trait: 'S' }, { id: 'no', text: '否', value: 0, trait: 'S' },
      ]},
      { id: 'h-5', text: '我喜欢领导和说服他人', type: 'single', options: [
        { id: 'e', text: '是', value: 1, trait: 'E' }, { id: 'no', text: '否', value: 0, trait: 'E' },
      ]},
      { id: 'h-6', text: '我喜欢有条理地处理文档和数据', type: 'single', options: [
        { id: 'c', text: '是', value: 1, trait: 'C' }, { id: 'no', text: '否', value: 0, trait: 'C' },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const traits: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
      const traitNames: Record<string, string> = { 
        R: '实际型', I: '研究型', A: '艺术型', S: '社会型', E: '企业型', C: '常规型' 
      }
      const careers: Record<string, string[]> = {
        R: ['工程师', '技师', '建筑师', '农民'],
        I: ['科学家', '研究员', '医生', '程序员'],
        A: ['设计师', '作家', '音乐家', '演员'],
        S: ['教师', '护士', '社工', '咨询师'],
        E: ['经理', '销售', '律师', '政治家'],
        C: ['会计', '行政', '银行职员', '档案管理'],
      }
      
      answers.forEach((answer) => {
        if (answer.trait && answer.value && answer.value > 0) {
          traits[answer.trait] += answer.value
        }
      })
      
      const sorted = Object.entries(traits).sort((a, b) => b[1] - a[1])
      const dominant = sorted[0][0]
      const code = sorted.slice(0, 3).map(([k]) => k).join('')
      
      return {
        type: code,
        title: `霍兰德代码: ${code}`,
        description: `您的主导类型是 ${traitNames[dominant]}`,
        traits: Object.entries(traits).map(([k, v]) => ({
          name: traitNames[k], score: v, maxScore: 1, description: v > 0 ? '匹配' : '不匹配'
        })),
        details: {
          strengths: ['了解自己的职业倾向'],
          weaknesses: ['兴趣可能随时间变化'],
          careers: careers[dominant],
          relationships: '职业满意度与人格匹配度相关',
        },
        scores: traits,
      }
    },
  },
  {
    id: 'leadership-style',
    title: '领导风格评估',
    description: '识别你的领导风格：民主型、权威型、放任型或变革型。',
    category: '职业能力',
    difficulty: 'standard',
    duration: 7,
    questions: [
      { id: 'ls-1', text: '做决定时，我会征求团队成员的意见', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'ls-2', text: '我为团队设定明确的目标和期望', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'ls-3', text: '我允许团队成员自主决定工作方式', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const democratic = answers[0]?.value || 0
      const authoritarian = answers[1]?.value || 0
      const laissezfaire = answers[2]?.value || 0
      
      let style = '民主型'
      if (authoritarian > democratic && authoritarian > laissezfaire) style = '权威型'
      else if (laissezfaire > democratic && laissezfaire > authoritarian) style = '放任型'
      else if (democratic >= 4 && authoritarian >= 4) style = '变革型'
      
      return {
        type: style,
        title: `领导风格: ${style}`,
        description: '基于你的决策方式和团队管理偏好',
        traits: [
          { name: '民主参与', score: democratic, maxScore: 5, description: '' },
          { name: '目标导向', score: authoritarian, maxScore: 5, description: '' },
          { name: '授权程度', score: laissezfaire, maxScore: 5, description: '' },
        ],
        details: {
          strengths: style === '民主型' ? ['团队参与度高'] : style === '权威型' ? ['执行力强'] : ['创新空间大'],
          weaknesses: style === '民主型' ? ['决策效率可能较低'] : style === '权威型' ? ['可能抑制创造力'] : ['需要强自驱力团队'],
          careers: ['管理者', '团队领导', '项目经理'],
          relationships: '领导风格影响团队氛围和绩效',
        },
        scores: { democratic, authoritarian, laissezfaire },
      }
    },
  },
  {
    id: 'learning-style',
    title: '学习风格测试 (VARK)',
    description: '发现你偏好的学习方式：视觉型、听觉型、阅读型或动觉型。',
    category: '职业能力',
    difficulty: 'lite',
    duration: 5,
    questions: [
      { id: 'vark-1', text: '学习新事物时，我最喜欢：', type: 'single', options: [
        { id: 'v', text: '看图表、图片或演示', value: 1, trait: 'V' },
        { id: 'a', text: '听讲解或讨论', value: 1, trait: 'A' },
        { id: 'r', text: '阅读文字资料', value: 1, trait: 'R' },
        { id: 'k', text: '动手实践或体验', value: 1, trait: 'K' },
      ]},
      { id: 'vark-2', text: '记住信息最有效的方式是：', type: 'single', options: [
        { id: 'v2', text: '在脑海中形成画面', value: 1, trait: 'V' },
        { id: 'a2', text: '重复朗读或听录音', value: 1, trait: 'A' },
        { id: 'r2', text: '做笔记和总结', value: 1, trait: 'R' },
        { id: 'k2', text: '实际操作练习', value: 1, trait: 'K' },
      ]},
      { id: 'vark-3', text: '在会议上，我倾向于：', type: 'single', options: [
        { id: 'v3', text: '关注PPT和可视化材料', value: 1, trait: 'V' },
        { id: 'a3', text: '认真听发言人讲话', value: 1, trait: 'A' },
        { id: 'r3', text: '阅读会议资料', value: 1, trait: 'R' },
        { id: 'k3', text: '参与互动环节', value: 1, trait: 'K' },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const traits: Record<string, number> = { V: 0, A: 0, R: 0, K: 0 }
      const names: Record<string, string> = { V: '视觉型', A: '听觉型', R: '阅读型', K: '动觉型' }
      
      answers.forEach((answer) => {
        if (answer.trait && answer.value) {
          traits[answer.trait] += answer.value
        }
      })
      
      const dominant = Object.entries(traits).sort((a, b) => b[1] - a[1])[0][0]
      
      return {
        type: names[dominant],
        title: `学习风格: ${names[dominant]}`,
        description: '了解最佳学习方式可显著提高学习效率',
        traits: Object.entries(traits).map(([k, v]) => ({
          name: names[k], score: v, maxScore: 3, description: v > 0 ? '偏好' : '不偏好'
        })),
        details: {
          strengths: ['了解自己的学习偏好'],
          weaknesses: ['单一风格可能局限'],
          careers: ['终身学习者', '教育工作者', '培训师'],
          relationships: '理解不同学习风格有助于教学相长',
        },
        scores: traits,
      }
    },
  },
  {
    id: 'creativity-test',
    title: '创造力倾向测试',
    description: '评估你的创造性思维能力和创新倾向。',
    category: '职业能力',
    difficulty: 'standard',
    duration: 6,
    questions: [
      { id: 'cr-1', text: '我喜欢尝试新的方法解决问题', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'cr-2', text: '我能从不同角度看待问题', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'cr-3', text: '我不害怕冒险和失败', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 12 ? '高创造力' : score >= 9 ? '中等创造力' : '保守型'
      
      return {
        type: level,
        title: `创造力: ${level}`,
        description: `创造力评分: ${score}/15`,
        traits: [
          { name: '创新意愿', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '发散思维', score: answers[1]?.value || 0, maxScore: 5, description: '' },
          { name: '风险承受', score: answers[2]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: level === '高创造力' ? ['创新能力强', '思维活跃'] : ['务实稳定'],
          weaknesses: level === '高创造力' ? ['可能缺乏执行力'] : ['可能过于保守'],
          careers: level === '高创造力' ? ['设计师', '创业者', '研发人员'] : ['运营管理', '财务', '审计'],
          relationships: '创造力影响问题解决方式',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'stress-management',
    title: '压力管理能力评估',
    description: '评估你应对压力的策略和效果。',
    category: '职业能力',
    difficulty: 'lite',
    duration: 5,
    questions: [
      { id: 'sm-1', text: '面对压力，我会寻求社会支持', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'sm-2', text: '我能够通过运动或放松技巧缓解压力', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'sm-3', text: '我能理性分析压力源并制定应对计划', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 12 ? '优秀' : score >= 9 ? '良好' : '需提升'
      
      return {
        type: level,
        title: `压力管理: ${level}`,
        description: `压力管理能力评分: ${score}/15`,
        traits: [
          { name: '社会支持', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '放松技巧', score: answers[1]?.value || 0, maxScore: 5, description: '' },
          { name: '问题解决', score: answers[2]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: level !== '需提升' ? ['压力应对能力强'] : ['有提升空间'],
          weaknesses: level === '需提升' ? ['建议学习压力管理技巧'] : [],
          careers: ['高压职业需要良好的压力管理'],
          relationships: '压力管理能力影响工作生活平衡',
        },
        scores: { total: score },
      }
    },
  },

  // ============ 人际关系 (9-14) ============
  {
    id: 'attachment-style',
    title: '依恋风格测试',
    description: '了解你在亲密关系中的依恋模式：安全型、焦虑型或回避型。',
    category: '人际关系',
    difficulty: 'standard',
    duration: 6,
    questions: [
      { id: 'at-1', text: '我担心伴侣不够爱我', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'at-2', text: '我愿意与伴侣保持亲密，也尊重彼此空间', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'at-3', text: '我发现很难完全信任伴侣', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const anxiety = answers[0]?.value || 0
      const security = answers[1]?.value || 0
      const avoidance = answers[2]?.value || 0
      
      let style = '安全型'
      if (anxiety >= 4) style = '焦虑型'
      else if (avoidance >= 4) style = '回避型'
      
      return {
        type: style,
        title: `依恋风格: ${style}`,
        description: '依恋风格影响亲密关系模式',
        traits: [
          { name: '焦虑程度', score: anxiety, maxScore: 5, description: '' },
          { name: '安全感', score: security, maxScore: 5, description: '' },
          { name: '回避程度', score: avoidance, maxScore: 5, description: '' },
        ],
        details: {
          strengths: style === '安全型' ? ['关系稳定', '信任度高'] : ['特定情境下有优势'],
          weaknesses: style !== '安全型' ? ['可能影响关系质量'] : [],
          careers: [],
          relationships: '依恋风格可以通过自我觉察和练习改善',
        },
        scores: { anxiety, security, avoidance },
      }
    },
  },
  {
    id: 'communication-style',
    title: '沟通风格评估',
    description: '识别你的沟通风格：被动型、攻击性、被动攻击型或自信型。',
    category: '人际关系',
    difficulty: 'lite',
    duration: 5,
    questions: [
      { id: 'cs-1', text: '我能够清晰表达自己的想法和需求', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'cs-2', text: '我在表达不同意见时会考虑他人感受', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const assertiveness = answers[0]?.value || 0
      const empathy = answers[1]?.value || 0
      
      let style = '被动型'
      if (assertiveness >= 4 && empathy >= 4) style = '自信型'
      else if (assertiveness >= 4) style = '攻击性'
      else if (assertiveness >= 3 && empathy >= 3) style = '平衡型'
      
      return {
        type: style,
        title: `沟通风格: ${style}`,
        description: '沟通风格影响人际互动效果',
        traits: [
          { name: '自信表达', score: assertiveness, maxScore: 5, description: '' },
          { name: '同理心', score: empathy, maxScore: 5, description: '' },
        ],
        details: {
          strengths: style === '自信型' ? ['有效沟通', '关系和谐'] : ['有改善空间'],
          weaknesses: style !== '自信型' ? ['可能影响沟通效果'] : [],
          careers: ['管理者', '销售人员', '客服'],
          relationships: '良好的沟通是健康关系的基础',
        },
        scores: { assertiveness, empathy },
      }
    },
  },
  {
    id: 'conflict-resolution',
    title: '冲突处理风格',
    description: '了解你处理冲突的偏好方式。',
    category: '人际关系',
    difficulty: 'lite',
    duration: 5,
    questions: [
      { id: 'cr-1', text: '面对冲突，我倾向于寻找双赢方案', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'cr-2', text: '我倾向于避免冲突，维持表面和谐', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const collaborative = answers[0]?.value || 0
      const avoiding = answers[1]?.value || 0
      
      let style = '竞争型'
      if (collaborative >= 4) style = '合作型'
      else if (avoiding >= 4) style = '回避型'
      else if (collaborative >= 3 && avoiding <= 3) style = '妥协型'
      
      return {
        type: style,
        title: `冲突处理: ${style}`,
        description: '不同情境适合不同的冲突处理策略',
        traits: [
          { name: '合作意愿', score: collaborative, maxScore: 5, description: '' },
          { name: '回避倾向', score: avoiding, maxScore: 5, description: '' },
        ],
        details: {
          strengths: ['了解自己的冲突偏好'],
          weaknesses: ['单一策略可能不适用所有情境'],
          careers: ['管理者', '谈判专家', 'HR'],
          relationships: '冲突处理影响关系质量',
        },
        scores: { collaborative, avoiding },
      }
    },
  },

  // ============ 认知与思维 (12-18) ============
  {
    id: 'critical-thinking',
    title: '批判性思维测试',
    description: '评估你的逻辑分析、证据评估和推理能力。',
    category: '认知思维',
    difficulty: 'expert',
    duration: 10,
    questions: [
      { id: 'ct-1', text: '在做决定前，我会主动寻找反面证据', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'ct-2', text: '我能区分事实和观点', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'ct-3', text: '我能识别论证中的逻辑谬误', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 12 ? '优秀' : score >= 9 ? '良好' : '待提升'
      
      return {
        type: level,
        title: `批判性思维: ${level}`,
        description: `批判性思维评分: ${score}/15`,
        traits: [
          { name: '证据意识', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '事实辨别', score: answers[1]?.value || 0, maxScore: 5, description: '' },
          { name: '逻辑分析', score: answers[2]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: level !== '待提升' ? ['思维严谨', '决策理性'] : ['可培养提升'],
          weaknesses: level === '待提升' ? ['建议学习批判性思维方法'] : [],
          careers: ['研究员', '分析师', '律师', '记者'],
          relationships: '理性思维有助于解决复杂问题',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'cognitive-style',
    title: '认知风格测试',
    description: '场独立型 vs 场依存型：你是更依赖内部参照还是外部环境？',
    category: '认知思维',
    difficulty: 'standard',
    duration: 6,
    questions: [
      { id: 'cgs-1', text: '我能轻易在嘈杂环境中专注于任务', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'cgs-2', text: '我倾向于依赖他人的意见做判断', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 5 }, { id: '2', text: '不同意', value: 4 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 2 }, { id: '5', text: '非常同意', value: 1 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const style = score >= 7 ? '场独立型' : '场依存型'
      
      return {
        type: style,
        title: `认知风格: ${style}`,
        description: style === '场独立型' ? '擅长独立分析，不易受外界干扰' : '善于社交，依赖环境线索',
        traits: [
          { name: '专注能力', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '独立判断', score: 6 - (answers[1]?.value || 0), maxScore: 5, description: '' },
        ],
        details: {
          strengths: style === '场独立型' ? ['分析能力强'] : ['人际交往佳'],
          weaknesses: style === '场独立型' ? ['可能忽视社交'] : ['可能缺乏独立判断'],
          careers: style === '场独立型' ? ['科学家', '工程师'] : ['销售', 'HR', '教师'],
          relationships: '了解认知风格有助于选择适合的学习和工作环境',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'decision-making',
    title: '决策风格测试',
    description: '了解你是理性决策者还是直觉决策者。',
    category: '认知思维',
    difficulty: 'standard',
    duration: 6,
    questions: [
      { id: 'dm-1', text: '我做决定前会收集大量信息进行分析', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'dm-2', text: '我常常凭直觉做决定', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const rational = answers[0]?.value || 0
      const intuitive = answers[1]?.value || 0
      
      let style = '平衡型'
      if (rational > intuitive + 1) style = '理性型'
      else if (intuitive > rational + 1) style = '直觉型'
      
      return {
        type: style,
        title: `决策风格: ${style}`,
        description: '不同决策风格适合不同情境',
        traits: [
          { name: '理性分析', score: rational, maxScore: 5, description: '' },
          { name: '直觉判断', score: intuitive, maxScore: 5, description: '' },
        ],
        details: {
          strengths: style === '理性型' ? ['决策严谨'] : style === '直觉型' ? ['决策快速'] : ['灵活应变'],
          weaknesses: style === '理性型' ? ['可能决策慢'] : style === '直觉型' ? ['可能有风险'] : [],
          careers: ['管理者', '创业者', '咨询师'],
          relationships: '理性和直觉结合是最佳决策方式',
        },
        scores: { rational, intuitive },
      }
    },
  },

  // ============ 健康与生活方式 (15-20) ============
  {
    id: 'sleep-quality',
    title: '睡眠质量评估 (PSQI)',
    description: '匹兹堡睡眠质量指数简化版，评估你的睡眠状况。',
    category: '健康生活',
    difficulty: 'lite',
    duration: 4,
    questions: [
      { id: 'sq-1', text: '过去一个月，你的睡眠质量如何？', type: 'single', options: [
        { id: '1', text: '很好', value: 0 }, { id: '2', text: '较好', value: 1 },
        { id: '3', text: '一般', value: 2 }, { id: '4', text: '很差', value: 3 },
      ]},
      { id: 'sq-2', text: '你入睡需要多长时间？', type: 'single', options: [
        { id: '1', text: '少于15分钟', value: 0 }, { id: '2', text: '16-30分钟', value: 1 },
        { id: '3', text: '31-60分钟', value: 2 }, { id: '4', text: '超过60分钟', value: 3 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const quality = score <= 1 ? '睡眠质量好' : score <= 3 ? '睡眠质量一般' : '睡眠质量差'
      
      return {
        type: quality,
        title: quality,
        description: `睡眠评分: ${score}/6 (分数越低越好)`,
        traits: [
          { name: '主观质量', score: answers[0]?.value || 0, maxScore: 3, description: '' },
          { name: '入睡时间', score: answers[1]?.value || 0, maxScore: 3, description: '' },
        ],
        details: {
          strengths: score <= 1 ? ['睡眠健康'] : [],
          weaknesses: score > 3 ? ['建议改善睡眠习惯'] : [],
          careers: [],
          relationships: '睡眠影响身心健康和工作表现',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'life-balance',
    title: '工作生活平衡评估',
    description: '评估你的工作与生活平衡状态。',
    category: '健康生活',
    difficulty: 'lite',
    duration: 5,
    questions: [
      { id: 'lb-1', text: '我有足够的时间陪伴家人和朋友', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'lb-2', text: '我能在工作之余从事兴趣爱好', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'lb-3', text: '工作压力不影响我的个人生活', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const balance = score >= 12 ? '平衡良好' : score >= 9 ? '基本平衡' : '需要调整'
      
      return {
        type: balance,
        title: `工作与生活: ${balance}`,
        description: `平衡评分: ${score}/15`,
        traits: [
          { name: '社交时间', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '兴趣爱好', score: answers[1]?.value || 0, maxScore: 5, description: '' },
          { name: '压力管理', score: answers[2]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: balance === '平衡良好' ? ['生活满意度高'] : [],
          weaknesses: balance !== '平衡良好' ? ['建议调整时间分配'] : [],
          careers: [],
          relationships: '工作与生活平衡影响整体幸福感',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'digital-wellness',
    title: '数字健康评估',
    description: '评估你的数字设备使用习惯和健康程度。',
    category: '健康生活',
    difficulty: 'lite',
    duration: 4,
    questions: [
      { id: 'dw-1', text: '我每天使用电子设备的时间', type: 'single', options: [
        { id: '1', text: '少于4小时', value: 5 }, { id: '2', text: '4-6小时', value: 4 },
        { id: '3', text: '6-8小时', value: 3 }, { id: '4', text: '超过8小时', value: 1 },
      ]},
      { id: 'dw-2', text: '睡前1小时我会避免使用电子设备', type: 'single', options: [
        { id: '1', text: '总是', value: 5 }, { id: '2', text: '经常', value: 4 },
        { id: '3', text: '有时', value: 3 }, { id: '4', text: '很少/从不', value: 1 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 8 ? '数字健康良好' : score >= 5 ? '需要注意' : '数字依赖风险'
      
      return {
        type: level,
        title: `数字健康: ${level}`,
        description: `数字健康评分: ${score}/10`,
        traits: [
          { name: '使用时长', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '使用习惯', score: answers[1]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: score >= 8 ? ['数字使用健康'] : [],
          weaknesses: score < 5 ? ['建议设定屏幕使用时间'] : [],
          careers: [],
          relationships: '健康的数字习惯有益身心健康',
        },
        scores: { total: score },
      }
    },
  },

  // ============ 价值观与信念 (18-24) ============
  {
    id: 'life-values',
    title: '人生价值观测试',
    description: '基于Schwartz价值观理论，发现你最重要的价值观。',
    category: '价值观',
    difficulty: 'standard',
    duration: 8,
    questions: [
      { id: 'lv-1', text: '对我来说，帮助他人非常重要', type: 'single', options: [
        { id: '1', text: '非常不重要', value: 1 }, { id: '2', text: '不重要', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '重要', value: 4 }, { id: '5', text: '非常重要', value: 5 },
      ]},
      { id: 'lv-2', text: '我重视个人成就和成功', type: 'single', options: [
        { id: '1', text: '非常不重要', value: 1 }, { id: '2', text: '不重要', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '重要', value: 4 }, { id: '5', text: '非常重要', value: 5 },
      ]},
      { id: 'lv-3', text: '我重视安全和稳定的生活', type: 'single', options: [
        { id: '1', text: '非常不重要', value: 1 }, { id: '2', text: '不重要', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '重要', value: 4 }, { id: '5', text: '非常重要', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const benevolence = answers[0]?.value || 0
      const achievement = answers[1]?.value || 0
      const security = answers[2]?.value || 0
      
      const values = [
        { name: '仁爱', score: benevolence },
        { name: '成就', score: achievement },
        { name: '安全', score: security },
      ].sort((a, b) => b.score - a.score)
      
      return {
        type: values[0].name,
        title: `核心价值观: ${values[0].name}`,
        description: '价值观指导人生决策和行为',
        traits: [
          { name: '仁爱', score: benevolence, maxScore: 5, description: '' },
          { name: '成就', score: achievement, maxScore: 5, description: '' },
          { name: '安全', score: security, maxScore: 5, description: '' },
        ],
        details: {
          strengths: ['价值观清晰'],
          weaknesses: ['价值观可能随经历变化'],
          careers: [],
          relationships: '共享价值观有助于建立深层关系',
        },
        scores: { benevolence, achievement, security },
      }
    },
  },
  {
    id: 'moral-foundations',
    title: '道德基础测试',
    description: '基于道德基础理论，了解你的道德判断倾向。',
    category: '价值观',
    difficulty: 'expert',
    duration: 8,
    questions: [
      { id: 'mf-1', text: '忠诚于群体对我来说很重要', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'mf-2', text: '公平对待每个人是道德的基础', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const loyalty = answers[0]?.value || 0
      const fairness = answers[1]?.value || 0
      
      let foundation = '平衡型'
      if (loyalty > fairness + 1) foundation = '集体主义'
      else if (fairness > loyalty + 1) foundation = '个人主义'
      
      return {
        type: foundation,
        title: `道德倾向: ${foundation}`,
        description: '道德基础影响价值判断',
        traits: [
          { name: '群体忠诚', score: loyalty, maxScore: 5, description: '' },
          { name: '公平关怀', score: fairness, maxScore: 5, description: '' },
        ],
        details: {
          strengths: ['道德立场明确'],
          weaknesses: ['可能影响跨文化理解'],
          careers: ['伦理学家', '政策制定者'],
          relationships: '道德共识有助于社会和谐',
        },
        scores: { loyalty, fairness },
      }
    },
  },
  {
    id: 'life-satisfaction',
    title: '生活满意度量表 (SWLS)',
    description: '评估你对整体生活的满意程度。',
    category: '价值观',
    difficulty: 'lite',
    duration: 3,
    questions: [
      { id: 'swls-1', text: '我的生活状况接近理想', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'swls-2', text: '我对我的生活感到满意', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'swls-3', text: '如果我能重新来过，我不会改变任何事情', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const satisfaction = score >= 12 ? '高度满意' : score >= 9 ? '中等满意' : '待提升'
      
      return {
        type: satisfaction,
        title: `生活满意度: ${satisfaction}`,
        description: `满意度评分: ${score}/15`,
        traits: [
          { name: '理想接近', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '主观满意', score: answers[1]?.value || 0, maxScore: 5, description: '' },
          { name: '无悔程度', score: answers[2]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: score >= 12 ? ['生活满意度高'] : [],
          weaknesses: score < 9 ? ['可探索提升生活满意度的方法'] : [],
          careers: [],
          relationships: '生活满意度是心理健康的重要指标',
        },
        scores: { total: score },
      }
    },
  },

  // ============ 专业学科知识 (21-30) ============
  {
    id: 'financial-literacy',
    title: '金融素养测试',
    description: '评估你的基础金融知识和理财能力。',
    category: '学科知识',
    difficulty: 'standard',
    duration: 8,
    questions: [
      { id: 'fl-1', text: '假设银行存款年利率为2%，通货膨胀率为3%，一年后你的购买力：', type: 'single', options: [
        { id: 'a', text: '增加', value: 0 }, { id: 'b', text: '保持不变', value: 0 },
        { id: 'c', text: '减少', value: 1 }, { id: 'd', text: '不确定', value: 0 },
      ]},
      { id: 'fl-2', text: '分散投资的主要目的是：', type: 'single', options: [
        { id: 'a', text: '最大化收益', value: 0 }, { id: 'b', text: '降低风险', value: 1 },
        { id: 'c', text: '简化管理', value: 0 }, { id: 'd', text: '避税', value: 0 },
      ]},
      { id: 'fl-3', text: '复利效应意味着：', type: 'single', options: [
        { id: 'a', text: '利息只计算一次', value: 0 }, { id: 'b', text: '利息产生新的利息', value: 1 },
        { id: 'c', text: '本金逐渐减少', value: 0 }, { id: 'd', text: '收益固定不变', value: 0 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 3 ? '金融素养良好' : score >= 2 ? '基础水平' : '需学习提升'
      
      return {
        type: level,
        title: `金融素养: ${level}`,
        description: `答对 ${score}/3 题`,
        traits: [{ name: '金融知识', score, maxScore: 3, description: '' }],
        details: {
          strengths: score >= 3 ? ['财务决策能力强'] : [],
          weaknesses: score < 2 ? ['建议学习基础理财知识'] : [],
          careers: ['金融分析师', '理财顾问', '投资人'],
          relationships: '良好的金融素养有助于财务自由',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'science-literacy',
    title: '科学素养测试',
    description: '评估你的基础科学知识和科学思维能力。',
    category: '学科知识',
    difficulty: 'standard',
    duration: 7,
    questions: [
      { id: 'sl-1', text: '地球绕太阳公转一周大约需要：', type: 'single', options: [
        { id: 'a', text: '一天', value: 0 }, { id: 'b', text: '一个月', value: 0 },
        { id: 'c', text: '一年', value: 1 }, { id: 'd', text: '一百年', value: 0 },
      ]},
      { id: 'sl-2', text: 'DNA的主要功能是：', type: 'single', options: [
        { id: 'a', text: '提供能量', value: 0 }, { id: 'b', text: '储存遗传信息', value: 1 },
        { id: 'c', text: '消化食物', value: 0 }, { id: 'd', text: '传递神经信号', value: 0 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 2 ? '科学素养良好' : score === 1 ? '基础水平' : '需学习'
      
      return {
        type: level,
        title: `科学素养: ${level}`,
        description: `答对 ${score}/2 题`,
        traits: [{ name: '科学知识', score, maxScore: 2, description: '' }],
        details: {
          strengths: score >= 2 ? ['科学思维能力佳'] : [],
          weaknesses: score < 1 ? ['建议关注科普内容'] : [],
          careers: ['科研人员', '工程师', '科学传播者'],
          relationships: '科学素养有助于理性决策',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'logical-reasoning',
    title: '逻辑推理测试',
    description: '评估你的逻辑思维和推理能力。',
    category: '学科知识',
    difficulty: 'expert',
    duration: 10,
    questions: [
      { id: 'lr-1', text: '所有A都是B，所有B都是C，那么：', type: 'single', options: [
        { id: 'a', text: '所有A都是C', value: 1 }, { id: 'b', text: '所有C都是A', value: 0 },
        { id: 'c', text: '没有A是C', value: 0 }, { id: 'd', text: '无法确定', value: 0 },
      ]},
      { id: 'lr-2', text: '如果下雨，地面会湿。地面湿了，所以：', type: 'single', options: [
        { id: 'a', text: '一定下雨了', value: 0 }, { id: 'b', text: '可能下雨了', value: 1 },
        { id: 'c', text: '肯定没下雨', value: 0 }, { id: 'd', text: '无法判断', value: 0 },
      ]},
      { id: 'lr-3', text: '序列 2, 4, 8, 16, ? 的下一个数字是：', type: 'single', options: [
        { id: 'a', text: '24', value: 0 }, { id: 'b', text: '32', value: 1 },
        { id: 'c', text: '20', value: 0 }, { id: 'd', text: '30', value: 0 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 3 ? '逻辑推理优秀' : score >= 2 ? '逻辑推理良好' : '需加强训练'
      
      return {
        type: level,
        title: level,
        description: `答对 ${score}/3 题`,
        traits: [{ name: '逻辑能力', score, maxScore: 3, description: '' }],
        details: {
          strengths: score >= 3 ? ['逻辑严密', '推理能力强'] : [],
          weaknesses: score < 2 ? ['建议练习逻辑题'] : [],
          careers: ['程序员', '律师', '数学家', '侦探'],
          relationships: '逻辑能力是学习和工作的基础技能',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'emotional-iq-test',
    title: '情商测试 (EQ)',
    description: '综合评估你的情绪智力水平。',
    category: '学科知识',
    difficulty: 'standard',
    duration: 8,
    questions: [
      { id: 'eqt-1', text: '当朋友向我倾诉烦恼时，我会：', type: 'single', options: [
        { id: 'a', text: '立即提供解决方案', value: 1 }, { id: 'b', text: '先倾听并表示理解', value: 2 },
        { id: 'c', text: '转移话题', value: 0 }, { id: 'd', text: '给予评判', value: 0 },
      ]},
      { id: 'eqt-2', text: '在团队讨论中，我注意到有人被忽视，我会：', type: 'single', options: [
        { id: 'a', text: '继续自己的发言', value: 0 }, { id: 'b', text: '邀请被忽视者发言', value: 2 },
        { id: 'c', text: '私下提醒组织者', value: 1 }, { id: 'd', text: '假装没注意到', value: 0 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 3 ? '高情商' : score >= 2 ? '中等情商' : '情商待提升'
      
      return {
        type: level,
        title: `情商: ${level}`,
        description: `情商评分: ${score}/4`,
        traits: [
          { name: '共情回应', score: answers[0]?.value || 0, maxScore: 2, description: '' },
          { name: '团队觉察', score: answers[1]?.value || 0, maxScore: 2, description: '' },
        ],
        details: {
          strengths: score >= 3 ? ['情绪智力高', '人际关系佳'] : [],
          weaknesses: score < 2 ? ['建议学习情绪管理'] : [],
          careers: ['管理者', '销售', 'HR', '咨询师'],
          relationships: '高情商有助于建立和谐关系',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'time-management',
    title: '时间管理评估',
    description: '评估你的时间管理和优先级处理能力。',
    category: '学科知识',
    difficulty: 'lite',
    duration: 5,
    questions: [
      { id: 'tm-1', text: '我经常使用待办清单或日程表', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'tm-2', text: '我能区分紧急和重要任务', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 8 ? '时间管理优秀' : score >= 6 ? '时间管理良好' : '需改进'
      
      return {
        type: level,
        title: level,
        description: `时间管理评分: ${score}/10`,
        traits: [
          { name: '计划习惯', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '优先级判断', score: answers[1]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: score >= 8 ? ['效率高', '压力小'] : [],
          weaknesses: score < 6 ? ['建议学习时间管理法'] : [],
          careers: ['项目经理', '高管', '自由职业者'],
          relationships: '良好的时间管理提升生活质量',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'resilience-test',
    title: '心理韧性测试',
    description: '评估你面对逆境的适应和恢复能力。',
    category: '学科知识',
    difficulty: 'standard',
    duration: 6,
    questions: [
      { id: 'rt-1', text: '遇到困难时，我通常能快速恢复', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'rt-2', text: '我相信自己有应对挑战的能力', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 8 ? '高心理韧性' : score >= 6 ? '中等韧性' : '韧性待提升'
      
      return {
        type: level,
        title: `心理韧性: ${level}`,
        description: `韧性评分: ${score}/10`,
        traits: [
          { name: '恢复能力', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '自我效能', score: answers[1]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: score >= 8 ? ['抗压能力强', '适应力佳'] : [],
          weaknesses: score < 6 ? ['可培养积极思维'] : [],
          careers: ['创业者', '急救人员', '运动员'],
          relationships: '心理韧性帮助应对生活挑战',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'mindfulness-test',
    title: '正念水平测试',
    description: '评估你的正念觉知和当下专注能力。',
    category: '学科知识',
    difficulty: 'lite',
    duration: 5,
    questions: [
      { id: 'mt-1', text: '我能专注于当下而不被杂念干扰', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'mt-2', text: '我能不带评判地观察自己的想法', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 8 ? '正念水平高' : score >= 6 ? '正念水平中等' : '可练习提升'
      
      return {
        type: level,
        title: `正念水平: ${level}`,
        description: `正念评分: ${score}/10`,
        traits: [
          { name: '当下专注', score: answers[0]?.value || 0, maxScore: 5, description: '' },
          { name: '不评判觉察', score: answers[1]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: score >= 8 ? ['专注力强', '压力管理好'] : [],
          weaknesses: score < 6 ? ['建议练习正念冥想'] : [],
          careers: ['冥想导师', '心理咨询师', '高压职业'],
          relationships: '正念有助于情绪调节和关系改善',
        },
        scores: { total: score },
      }
    },
  },

  // ============ 新增测试类型 (with card effects) ============
  {
    id: 'personality-disorder',
    title: '人格障碍筛查',
    description: '简单筛查常见人格障碍倾向，帮助了解自身性格特征。',
    category: '人格心理',
    difficulty: 'expert',
    duration: 10,
    cardStyle: 'glow',
    questions: [
      { id: 'pd-1', text: '我经常担心被他人忽视或拒绝', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'pd-2', text: '我对批评非常敏感，容易感到被冒犯', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'pd-3', text: '我倾向于过度依赖他人的认可和建议', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 12 ? '需专业评估' : score >= 9 ? '需自我关注' : '无明显倾向'
      
      return {
        type: level,
        title: `人格倾向: ${level}`,
        description: '此筛查仅供自我了解，非专业诊断',
        traits: [{ name: '依赖倾向', score, maxScore: 15, description: '' }],
        details: {
          strengths: score < 9 ? ['性格独立'] : [],
          weaknesses: score >= 9 ? ['建议自我反思'] : [],
          careers: [],
          relationships: '了解自己有助于人格成长',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'social-anxiety',
    title: '社交焦虑自评',
    description: '评估你在社交情境中的焦虑程度和回避行为。',
    category: '人格心理',
    difficulty: 'standard',
    duration: 6,
    cardStyle: 'flip',
    questions: [
      { id: 'sa-1', text: '在社交聚会中，我担心自己看起来很傻', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'sa-2', text: '我避免成为关注的焦点', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'sa-3', text: '与陌生人交谈让我感到紧张', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score <= 6 ? '社交自信' : score <= 10 ? '轻度焦虑' : '中度焦虑'
      
      return {
        type: level,
        title: `社交焦虑: ${level}`,
        description: '社交焦虑会影响日常生活和职业发展',
        traits: [{ name: '焦虑指数', score, maxScore: 15, description: '' }],
        details: {
          strengths: score <= 6 ? ['社交自信'] : [],
          weaknesses: score > 10 ? ['建议寻求专业帮助'] : [],
          careers: [],
          relationships: '认知行为疗法可有效改善社交焦虑',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'perfectionism',
    title: '完美主义量表',
    description: '评估你的完美主义倾向程度和类型。',
    category: '人格心理',
    difficulty: 'standard',
    duration: 7,
    cardStyle: 'glow',
    questions: [
      { id: 'pm-1', text: '我对自己的工作标准非常高', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'pm-2', text: '如果做不到完美，我宁愿不开始', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'pm-3', text: '我经常因为追求完美而延迟完成任务', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 12 ? '适应不良型' : score >= 9 ? '适应性' : '适度追求'
      
      return {
        type: level,
        title: `完美主义: ${level}`,
        description: '适度的完美主义可以促进成功',
        traits: [{ name: '完美程度', score, maxScore: 15, description: '' }],
        details: {
          strengths: score <= 10 ? ['追求卓越但不失平衡'] : [],
          weaknesses: score > 12 ? ['可能导致拖延和焦虑'] : [],
          careers: ['外科医生', '工程师', '设计师'],
          relationships: '学会接受"足够好"能减轻压力',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'career-aptitude',
    title: '职业能力倾向',
    description: '发现你的职业能力优势和专业特长领域。',
    category: '职业能力',
    difficulty: 'standard',
    duration: 8,
    cardStyle: 'flip',
    questions: [
      { id: 'cap-1', text: '我擅长用工具解决具体问题', type: 'single', options: [
        { id: 'r', text: '非常同意', value: 2, trait: 'R' }, { id: 'no', text: '不同意', value: 0, trait: 'R' },
      ]},
      { id: 'cap-2', text: '我喜欢分析数据和寻找规律', type: 'single', options: [
        { id: 'i', text: '非常同意', value: 2, trait: 'I' }, { id: 'no', text: '不同意', value: 0, trait: 'I' },
      ]},
      { id: 'cap-3', text: '我善于表达和创作', type: 'single', options: [
        { id: 'a', text: '非常同意', value: 2, trait: 'A' }, { id: 'no', text: '不同意', value: 0, trait: 'A' },
      ]},
      { id: 'cap-4', text: '我喜欢帮助和教导他人', type: 'single', options: [
        { id: 's', text: '非常同意', value: 2, trait: 'S' }, { id: 'no', text: '不同意', value: 0, trait: 'S' },
      ]},
      { id: 'cap-5', text: '我善于影响和说服他人', type: 'single', options: [
        { id: 'e', text: '非常同意', value: 2, trait: 'E' }, { id: 'no', text: '不同意', value: 0, trait: 'E' },
      ]},
      { id: 'cap-6', text: '我注重细节和准确性', type: 'single', options: [
        { id: 'c', text: '非常同意', value: 2, trait: 'C' }, { id: 'no', text: '不同意', value: 0, trait: 'C' },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const traits: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
      answers.forEach((a) => {
        if (a.trait && a.value) traits[a.trait] += a.value
      })
      
      const sorted = Object.entries(traits).sort((a, b) => b[1] - a[1])
      const top = sorted.slice(0, 2).map(([k]) => k).join('')
      const careers: Record<string, string[]> = {
        'RI': ['工程师', '机械师'], 'IA': ['研究员', '设计师'], 'AS': ['艺术家', '教师'],
        'SE': ['销售', '管理'], 'EC': ['企业家', '律师'], 'CI': ['分析师', '会计'],
      }
      
      return {
        type: top,
        title: `职业倾向: ${top}`,
        description: '你的优势能力组合',
        traits: sorted.slice(0, 3).map(([k, v]) => ({ name: k, score: v, maxScore: 2, description: '' })),
        details: {
          strengths: ['了解自己的优势'],
          weaknesses: ['需要持续发展和应用'],
          careers: careers[top] || ['综合发展'],
          relationships: '发挥优势选择适合的职业道路',
        },
        scores: traits,
      }
    },
  },
  {
    id: 'workplace-stress',
    title: '职场压力源分析',
    description: '识别你的主要职场压力来源和应对方式。',
    category: '职业能力',
    difficulty: 'lite',
    duration: 5,
    cardStyle: 'glow',
    questions: [
      { id: 'ws-1', text: '工作量过大是主要压力源', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'ws-2', text: '与上司或同事的关系让我感到压力', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score <= 4 ? '压力可控' : score <= 7 ? '轻度压力' : '需要关注'
      
      return {
        type: level,
        title: `职场压力: ${level}`,
        description: '识别压力源有助于有效应对',
        traits: [{ name: '压力指数', score, maxScore: 10, description: '' }],
        details: {
          strengths: score <= 4 ? ['压力管理良好'] : [],
          weaknesses: score > 7 ? ['建议制定压力缓解策略'] : [],
          careers: [],
          relationships: '工作压力会影响身心健康',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'love-language',
    title: '爱的五种语言',
    description: '发现你表达和接受爱意的主要方式。',
    category: '人际关系',
    difficulty: 'lite',
    duration: 6,
    cardStyle: 'flip',
    questions: [
      { id: 'll-1', text: '我最喜欢收到精心准备的礼物', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'll-2', text: '我重视高质量的陪伴时间', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'll-3', text: '听到肯定的话语让我感到被爱', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const gifts = answers[0]?.value || 0
      const time = answers[1]?.value || 0
      const words = answers[2]?.value || 0
      
      const languages = [
        { name: '礼物', score: gifts }, { name: '陪伴', score: time }, { name: '肯定', score: words },
      ].sort((a, b) => b.score - a.score)
      
      return {
        type: languages[0].name,
        title: `爱的语言: ${languages[0].name}`,
        description: '了解彼此的爱语有助于关系和谐',
        traits: languages.map((l) => ({ name: l.name, score: l.score, maxScore: 5, description: '' })),
        details: {
          strengths: ['了解自己的情感需求'],
          weaknesses: [],
          careers: [],
          relationships: '用对方喜欢的爱语表达爱意效果更好',
        },
        scores: { gifts, time, words },
      }
    },
  },
  {
    id: 'empathy-quotient',
    title: '共情能力测试',
    description: '评估你的共情能力和换位思考水平。',
    category: '人际关系',
    difficulty: 'standard',
    duration: 6,
    cardStyle: 'glow',
    questions: [
      { id: 'eqt-1', text: '我能轻易察觉他人的情绪变化', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'eqt-2', text: '看到他人痛苦，我会感同身受', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'eqt-3', text: '在争论中，我能理解对方的立场', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 12 ? '高共情' : score >= 9 ? '中等共情' : '低共情'
      
      return {
        type: level,
        title: `共情能力: ${level}`,
        description: '共情能力是建立良好人际关系的基础',
        traits: [{ name: '共情指数', score, maxScore: 15, description: '' }],
        details: {
          strengths: score >= 9 ? ['人际关系佳', '善于理解他人'] : [],
          weaknesses: score < 9 ? ['可练习换位思考'] : [],
          careers: ['心理咨询师', '护士', '教师', 'HR'],
          relationships: '高共情有助于建立深度连接',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'creativity-test',
    title: '创造力潜能评估',
    description: '评估你的发散思维和创意生成能力。',
    category: '认知思维',
    difficulty: 'expert',
    duration: 8,
    cardStyle: 'flip',
    questions: [
      { id: 'ct-1', text: '我经常想出解决问题的独特方法', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'ct-2', text: '我喜欢尝试新的做事方式', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'ct-3', text: '我享受头脑风暴和自由联想', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 12 ? '高创造力' : score >= 9 ? '中等创造力' : '实用型思维'
      
      return {
        type: level,
        title: `创造力: ${level}`,
        description: '创造力可以通过练习和环境培养',
        traits: [{ name: '创意指数', score, maxScore: 15, description: '' }],
        details: {
          strengths: score >= 9 ? ['创新思维', '善于突破常规'] : ['务实可靠'],
          weaknesses: score < 9 ? ['可多进行发散性思维练习'] : [],
          careers: ['设计师', '艺术家', '创业者', '科学家'],
          relationships: '创造力让生活更加丰富有趣',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'attention-test',
    title: '注意力广度评估',
    description: '评估你的专注力持续时间和抗干扰能力。',
    category: '认知思维',
    difficulty: 'standard',
    duration: 5,
    cardStyle: 'glow',
    questions: [
      { id: 'atn-1', text: '我能长时间专注于一件事而不分心', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'atn-2', text: '在嘈杂环境中我仍能集中注意力', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 8 ? '专注力强' : score >= 6 ? '专注力中等' : '专注力待提升'
      
      return {
        type: level,
        title: `注意力: ${level}`,
        description: '专注力可以通过练习改善',
        traits: [{ name: '专注指数', score, maxScore: 10, description: '' }],
        details: {
          strengths: score >= 8 ? ['学习效率高'] : [],
          weaknesses: score < 6 ? ['建议进行专注力训练'] : [],
          careers: ['研究员', '程序员', '学生'],
          relationships: '专注力影响工作学习效率',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'self-esteem',
    title: '自尊水平评估',
    description: '评估你的自我价值感和自信程度。',
    category: '价值观',
    difficulty: 'lite',
    duration: 5,
    cardStyle: 'flip',
    questions: [
      { id: 'se-1', text: '我对自己的评价是积极的', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'se-2', text: '我相信自己有能力实现目标', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
      { id: 'se-3', text: '我不会因他人的评价而否定自己', type: 'single', options: [
        { id: '1', text: '非常不同意', value: 1 }, { id: '2', text: '不同意', value: 2 }, { id: '3', text: '中立', value: 3 },
        { id: '4', text: '同意', value: 4 }, { id: '5', text: '非常同意', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 12 ? '高自尊' : score >= 9 ? '中等自尊' : '低自尊'
      
      return {
        type: level,
        title: `自尊水平: ${level}`,
        description: '健康的自尊是心理健康的基础',
        traits: [{ name: '自尊指数', score, maxScore: 15, description: '' }],
        details: {
          strengths: score >= 9 ? ['自信', '情绪稳定'] : [],
          weaknesses: score < 9 ? ['建议建立积极的自我认知'] : [],
          careers: [],
          relationships: '自尊影响人际关系和人生选择',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'habit-formation',
    title: '习惯养成能力',
    description: '评估你建立和维持习惯的能力。',
    category: '健康生活',
    difficulty: 'standard',
    duration: 6,
    cardStyle: 'glow',
    questions: [
      { id: 'hf-1', text: '我能坚持每天做某件事超过21天', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
      { id: 'hf-2', text: '当我设立新习惯时，我通常能实现它', type: 'single', options: [
        { id: '1', text: '从不', value: 1 }, { id: '2', text: '很少', value: 2 }, { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 }, { id: '5', text: '总是', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 8 ? '习惯力强' : score >= 6 ? '习惯力中等' : '需培养'
      
      return {
        type: level,
        title: `习惯能力: ${level}`,
        description: '好习惯是个人成长的基石',
        traits: [{ name: '习惯指数', score, maxScore: 10, description: '' }],
        details: {
          strengths: score >= 8 ? ['自律性强', '目标达成率高'] : [],
          weaknesses: score < 6 ? ['建议从小目标开始培养'] : [],
          careers: [],
          relationships: '好习惯让生活更有秩序',
        },
        scores: { total: score },
      }
    },
  },
  {
    id: 'investment-risk',
    title: '投资风险偏好',
    description: '评估你的风险承受能力和投资偏好。',
    category: '学科知识',
    difficulty: 'standard',
    duration: 6,
    cardStyle: 'flip',
    questions: [
      { id: 'ir-1', text: '面对高风险高回报的投资机会，我会：', type: 'single', options: [
        { id: 'a', text: '积极参与', value: 3 }, { id: 'b', text: '少量尝试', value: 2 },
        { id: 'c', text: '谨慎考虑', value: 1 }, { id: 'd', text: '完全回避', value: 0 },
      ]},
      { id: 'ir-2', text: '我的投资组合中股票占比：', type: 'single', options: [
        { id: 'a', text: '超过70%', value: 3 }, { id: 'b', text: '40-70%', value: 2 },
        { id: 'c', text: '10-40%', value: 1 }, { id: 'd', text: '少于10%', value: 0 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const score = calculateScore(answers)
      const level = score >= 5 ? '激进型' : score >= 3 ? '平衡型' : '保守型'
      
      return {
        type: level,
        title: `风险偏好: ${level}`,
        description: '了解自己的风险偏好有助于合理配置资产',
        traits: [{ name: '风险承受', score, maxScore: 6, description: '' }],
        details: {
          strengths: score >= 3 ? ['投资积极'] : ['稳健理财'],
          weaknesses: score >= 5 ? ['需注意风险控制'] : [],
          careers: ['投资者', '交易员', '企业家'],
          relationships: '理财观念影响家庭财务规划',
        },
        scores: { total: score },
      }
    },
  },
]

export const getAssessmentById = (id: string): Assessment | undefined => {
  return assessments.find((a) => a.id === id)
}

export const getAssessmentsByCategory = (category: string): Assessment[] => {
  return assessments.filter((a) => a.category === category)
}

export const getAllCategories = (): string[] => {
  return [...new Set(assessments.map((a) => a.category))]
}

export default assessments
