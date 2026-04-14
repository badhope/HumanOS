/**
 * 复杂题目生成框架
 * 
 * 核心特性：
 * 1. 支持多种题型：情景题、判断题、多选题、排序题
 * 2. 高区分度选项设计
 * 3. 多维度分析支撑
 * 4. 版本差异化题目难度
 */

export type QuestionType = 
  | 'scenario' 
  | 'judgment' 
  | 'multiple' 
  | 'ranking' 
  | 'scale' 
  | 'scenario_multiple'
  | 'case_analysis'

export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced' | 'expert'

export interface ComplexQuestion {
  id: string
  type: QuestionType
  text: string
  scenario?: string
  context?: QuestionContext
  options: ComplexOption[]
  dimensions: DimensionMapping[]
  difficulty: DifficultyLevel
  cognitiveLoad: number
  discriminationIndex: number
  timeEstimate: number
  version: ('normal' | 'advanced' | 'professional')[]
}

export interface QuestionContext {
  background?: string
  role?: string
  situation?: string
  constraints?: string[]
  stakeholders?: string[]
}

export interface ComplexOption {
  id: string
  text: string
  value: number
  reasoning?: string
  implications?: string[]
  dimensionScores?: Record<string, number>
  riskLevel?: 'low' | 'medium' | 'high'
  shortTerm?: string
  longTerm?: string
}

export interface DimensionMapping {
  dimensionId: string
  weight: number
  aspects: string[]
}

export interface ScenarioTemplate {
  id: string
  category: string
  title: string
  scenario: string
  complexity: number
  dimensions: string[]
}

export interface QuestionGenerationConfig {
  version: 'normal' | 'advanced' | 'professional'
  targetDimensions: string[]
  difficultyRange: [DifficultyLevel, DifficultyLevel]
  questionTypes: QuestionType[]
  minCognitiveLoad: number
  minDiscrimination: number
  ensureBalance: boolean
}

const scenarioTemplates: ScenarioTemplate[] = [
  {
    id: 'workplace-conflict',
    category: '职场',
    title: '职场冲突处理',
    scenario: '你是某科技公司的项目经理，负责一个重要项目。项目进度紧张，团队成员小李技术能力强但经常迟到早退，影响了团队士气。其他成员开始抱怨不公平，有人威胁要退出项目。公司有严格的考勤制度，但小李声称他的工作效率高，不应该受时间限制。项目还有两周就要上线，此时你发现小李的一个关键代码模块存在严重bug。',
    complexity: 0.85,
    dimensions: ['decision-making', 'emotional-intelligence', 'leadership-potential', 'stress-resilience', 'social-ability']
  },
  {
    id: 'innovation-dilemma',
    category: '创新',
    title: '创新与风险决策',
    scenario: '你的团队正在开发一款新产品，有两种技术方案：方案A成熟稳定，能确保按时交付，但创新性不足，市场竞争力一般；方案B采用前沿技术，创新性强，但存在技术风险，可能导致项目延期2-3个月。市场调研显示，竞争对手可能在3个月内推出类似产品。你的上级要求你做出决策，同时团队内部意见分歧严重，技术团队倾向方案B，市场团队倾向方案A。',
    complexity: 0.9,
    dimensions: ['decision-making', 'creativity', 'risk-taking', 'professional-ability', 'behavior-pattern']
  },
  {
    id: 'team-crisis',
    category: '团队',
    title: '团队危机管理',
    scenario: '你刚接手一个业绩持续下滑的团队，团队士气低落，成员之间互相推诿责任。前任领导离职前与部分成员关系紧张。你发现团队中有一位资深员工掌握核心技术，但态度消极，经常公开质疑公司决策。其他成员分为两派，一派支持这位员工，另一派对他不满。公司要求你在3个月内扭转局面，否则将解散团队。',
    complexity: 0.95,
    dimensions: ['leadership-potential', 'emotional-intelligence', 'social-ability', 'stress-resilience', 'behavior-pattern']
  },
  {
    id: 'ethical-dilemma',
    category: '伦理',
    title: '伦理困境抉择',
    scenario: '你是一家医疗科技公司的产品经理，负责一款AI诊断系统。系统在测试中表现出色，准确率达95%。但在上线前夕，你发现系统对某些少数族裔群体的诊断准确率明显偏低（约75%）。修复这个问题需要6个月和大量额外投入。公司急需产品上市以获得融资，否则可能面临资金链断裂。投资者正在等待产品发布。',
    complexity: 0.95,
    dimensions: ['decision-making', 'emotional-intelligence', 'professional-ability', 'potential-tendency', 'behavior-pattern']
  },
  {
    id: 'resource-allocation',
    category: '资源',
    title: '资源分配决策',
    scenario: '你是部门负责人，年度预算削减30%。你需要决定如何在三个项目间分配有限资源：项目A是公司的核心业务，贡献60%收入但增长缓慢；项目B是新兴业务，增长迅速但目前亏损；项目C是社会责任项目，不产生收入但提升公司形象。每个项目都有10名员工，裁员将影响员工生计。公司要求你在一周内提交方案。',
    complexity: 0.88,
    dimensions: ['decision-making', 'professional-ability', 'emotional-intelligence', 'stress-resilience', 'social-ability']
  },
  {
    id: 'cross-cultural',
    category: '跨文化',
    title: '跨文化沟通挑战',
    scenario: '你负责一个跨国项目，团队成员来自中国、美国、德国和印度。项目进度落后，你发现不同文化背景的成员工作方式差异巨大：中国成员习惯加班但不愿直接表达异议；美国成员强调工作生活平衡但直言不讳；德国成员注重流程规范但决策缓慢；印度成员技术能力强但沟通不够及时。客户要求项目必须按时交付，否则将索赔。',
    complexity: 0.92,
    dimensions: ['social-ability', 'emotional-intelligence', 'learning-ability', 'behavior-pattern', 'professional-ability']
  },
  {
    id: 'career-choice',
    category: '职业',
    title: '职业发展抉择',
    scenario: '你目前32岁，在一家大公司担任中层管理者，年薪50万，工作稳定但缺乏挑战。你收到了两个offer：一个是创业公司的技术总监，年薪30万但有期权，公司处于快速发展期；另一个是外企的高级专家，年薪70万，但需要常驻海外。你的配偶有稳定工作不愿出国，父母年迈需要照顾。你对技术仍有热情，但也想尝试管理。',
    complexity: 0.85,
    dimensions: ['decision-making', 'potential-tendency', 'behavior-pattern', 'emotional-intelligence', 'professional-ability']
  },
  {
    id: 'innovation-resistance',
    category: '变革',
    title: '变革阻力应对',
    scenario: '你负责推动公司的数字化转型，需要引入新的工作流程和系统。老员工普遍抵触，认为现有方式运行良好，担心新技术会让他们被淘汰。中层管理者表面支持但实际执行不力。高层领导要求在6个月内完成转型，并威胁不配合者将被替换。你发现阻力主要来自一位德高望重的元老级员工，他在公司有很高影响力。',
    complexity: 0.9,
    dimensions: ['leadership-potential', 'social-ability', 'emotional-intelligence', 'behavior-pattern', 'stress-resilience']
  }
]

const judgmentQuestionTemplates = [
  {
    id: 'cognitive-judgment-1',
    category: '认知能力',
    text: '在复杂系统中，局部最优解的组合必然导致全局最优解',
    correctAnswer: false,
    reasoning: '局部最优可能导致全局次优，这是系统思维的核心概念',
    dimensions: ['cognitive-ability', 'decision-making'],
    difficulty: 'advanced' as DifficultyLevel,
    cognitiveLoad: 0.7
  },
  {
    id: 'cognitive-judgment-2',
    category: '认知能力',
    text: '当面临信息不完全时，快速决策通常比延迟决策更有价值',
    correctAnswer: false,
    reasoning: '这取决于具体情况，有时延迟决策以获取更多信息更明智',
    dimensions: ['decision-making', 'behavior-pattern'],
    difficulty: 'intermediate' as DifficultyLevel,
    cognitiveLoad: 0.6
  },
  {
    id: 'emotional-judgment-1',
    category: '情绪智力',
    text: '高情商的人应该始终压抑自己的负面情绪以维护团队和谐',
    correctAnswer: false,
    reasoning: '健康的情绪管理包括适当表达，而非一味压抑',
    dimensions: ['emotional-intelligence', 'stress-resilience'],
    difficulty: 'intermediate' as DifficultyLevel,
    cognitiveLoad: 0.5
  },
  {
    id: 'leadership-judgment-1',
    category: '领导力',
    text: '有效的领导者应该在所有决策中追求团队成员的一致同意',
    correctAnswer: false,
    reasoning: '过度追求一致可能导致决策效率低下，有时需要果断决策',
    dimensions: ['leadership-potential', 'decision-making'],
    difficulty: 'advanced' as DifficultyLevel,
    cognitiveLoad: 0.65
  },
  {
    id: 'creativity-judgment-1',
    category: '创造力',
    text: '创造性思维通常需要打破既有的思维框架和假设',
    correctAnswer: true,
    reasoning: '创新往往来自于质疑现有假设和突破思维定式',
    dimensions: ['creativity', 'cognitive-ability'],
    difficulty: 'intermediate' as DifficultyLevel,
    cognitiveLoad: 0.55
  },
  {
    id: 'social-judgment-1',
    category: '社交能力',
    text: '在跨文化沟通中，保持自己的文化立场比适应对方文化更重要',
    correctAnswer: false,
    reasoning: '有效的跨文化沟通需要文化敏感性和适应性',
    dimensions: ['social-ability', 'emotional-intelligence'],
    difficulty: 'intermediate' as DifficultyLevel,
    cognitiveLoad: 0.6
  },
  {
    id: 'stress-judgment-1',
    category: '抗压能力',
    text: '长期处于高压环境下的人会自动发展出更强的抗压能力',
    correctAnswer: false,
    reasoning: '持续高压可能导致倦怠，抗压能力需要通过适当挑战和恢复来培养',
    dimensions: ['stress-resilience', 'emotional-intelligence'],
    difficulty: 'advanced' as DifficultyLevel,
    cognitiveLoad: 0.7
  },
  {
    id: 'learning-judgment-1',
    category: '学习能力',
    text: '深度学习比快速学习更有利于长期知识保持和迁移应用',
    correctAnswer: true,
    reasoning: '深度学习促进理解和连接，有利于知识的长期保持和灵活应用',
    dimensions: ['learning-ability', 'cognitive-ability'],
    difficulty: 'intermediate' as DifficultyLevel,
    cognitiveLoad: 0.55
  }
]

const multipleChoiceTemplates = [
  {
    id: 'decision-multiple-1',
    category: '决策能力',
    text: '在做出重大战略决策时，以下哪些因素应该被优先考虑？（选择所有适用项）',
    options: [
      { id: 'a', text: '短期财务收益', correct: false, reasoning: '过度关注短期可能损害长期发展' },
      { id: 'b', text: '对利益相关者的影响', correct: true, reasoning: '平衡各方利益是可持续发展的基础' },
      { id: 'c', text: '与组织核心价值观的一致性', correct: true, reasoning: '价值观一致性确保决策的可持续性' },
      { id: 'd', text: '竞争对手的反应', correct: true, reasoning: '竞争分析是战略决策的重要组成部分' },
      { id: 'e', text: '个人直觉和经验', correct: false, reasoning: '应结合数据分析，而非仅依赖直觉' },
      { id: 'f', text: '潜在风险和应对方案', correct: true, reasoning: '风险管理是决策的关键环节' }
    ],
    dimensions: ['decision-making', 'professional-ability'],
    difficulty: 'advanced' as DifficultyLevel,
    cognitiveLoad: 0.75
  },
  {
    id: 'leadership-multiple-1',
    category: '领导力',
    text: '高绩效团队通常具备以下哪些特征？（选择所有适用项）',
    options: [
      { id: 'a', text: '成员之间没有冲突', correct: false, reasoning: '适度冲突有助于创新和问题解决' },
      { id: 'b', text: '清晰的角色分工和责任', correct: true, reasoning: '明确分工提高效率和责任感' },
      { id: 'c', text: '共同的目标和愿景', correct: true, reasoning: '共同目标凝聚团队力量' },
      { id: 'd', text: '开放和信任的沟通氛围', correct: true, reasoning: '信任是有效协作的基础' },
      { id: 'e', text: '领导者的绝对权威', correct: false, reasoning: '过度权威抑制成员主动性' },
      { id: 'f', text: '持续学习和改进的文化', correct: true, reasoning: '学习文化促进团队成长' }
    ],
    dimensions: ['leadership-potential', 'social-ability'],
    difficulty: 'intermediate' as DifficultyLevel,
    cognitiveLoad: 0.65
  },
  {
    id: 'emotional-multiple-1',
    category: '情绪智力',
    text: '当团队成员表现出强烈的负面情绪时，以下哪些做法是恰当的？（选择所有适用项）',
    options: [
      { id: 'a', text: '立即提供解决方案', correct: false, reasoning: '应先理解情绪，再解决问题' },
      { id: 'b', text: '积极倾听并表示理解', correct: true, reasoning: '倾听和共情是情绪支持的第一步' },
      { id: 'c', text: '询问对方需要什么样的帮助', correct: true, reasoning: '尊重对方自主性，提供针对性支持' },
      { id: 'd', text: '转移话题以缓解紧张', correct: false, reasoning: '回避情绪可能导致问题积累' },
      { id: 'e', text: '分享类似的个人经历', correct: false, reasoning: '可能转移焦点，应关注对方感受' },
      { id: 'f', text: '创造安全的表达环境', correct: true, reasoning: '安全感促进情绪表达和处理' }
    ],
    dimensions: ['emotional-intelligence', 'social-ability'],
    difficulty: 'advanced' as DifficultyLevel,
    cognitiveLoad: 0.7
  },
  {
    id: 'creativity-multiple-1',
    category: '创造力',
    text: '以下哪些方法可以有效激发团队的创造性思维？（选择所有适用项）',
    options: [
      { id: 'a', text: '设定严格的创新流程和标准', correct: false, reasoning: '过度流程化可能限制创意' },
      { id: 'b', text: '鼓励多元视角和跨界思维', correct: true, reasoning: '多样性促进创新' },
      { id: 'c', text: '提供失败的心理安全感', correct: true, reasoning: '安全感鼓励冒险和尝试' },
      { id: 'd', text: '奖励所有创新想法', correct: false, reasoning: '应有选择性，避免低质量创新' },
      { id: 'e', text: '设置挑战性目标和约束', correct: true, reasoning: '适度约束激发创造力' },
      { id: 'f', text: '定期更换团队成员', correct: false, reasoning: '频繁变动可能破坏团队默契' }
    ],
    dimensions: ['creativity', 'leadership-potential'],
    difficulty: 'advanced' as DifficultyLevel,
    cognitiveLoad: 0.75
  },
  {
    id: 'stress-multiple-1',
    category: '抗压能力',
    text: '在高压工作环境中，以下哪些策略有助于维持长期的工作效能？（选择所有适用项）',
    options: [
      { id: 'a', text: '延长工作时间以完成任务', correct: false, reasoning: '长期延长工作时间导致倦怠' },
      { id: 'b', text: '建立规律的休息和恢复机制', correct: true, reasoning: '休息是持续高效的基础' },
      { id: 'c', text: '优先处理最紧急的任务', correct: false, reasoning: '应平衡重要性和紧急性' },
      { id: 'd', text: '培养工作外的兴趣爱好', correct: true, reasoning: '多元生活提供心理缓冲' },
      { id: 'e', text: '寻求社会支持和专业帮助', correct: true, reasoning: '支持系统是应对压力的重要资源' },
      { id: 'f', text: '设定清晰的边界和优先级', correct: true, reasoning: '边界管理防止过度消耗' }
    ],
    dimensions: ['stress-resilience', 'emotional-intelligence'],
    difficulty: 'advanced' as DifficultyLevel,
    cognitiveLoad: 0.7
  }
]

export class ComplexQuestionGenerator {
  private usedScenarios: Set<string> = new Set()
  private questionCount: number = 0

  generateScenarioQuestion(
    template: ScenarioTemplate,
    version: 'normal' | 'advanced' | 'professional'
  ): ComplexQuestion {
    const difficultyMap = {
      normal: 'intermediate' as DifficultyLevel,
      advanced: 'advanced' as DifficultyLevel,
      professional: 'expert' as DifficultyLevel
    }

    const options = this.generateScenarioOptions(template, version)

    return {
      id: `scenario-${template.id}-${++this.questionCount}`,
      type: 'scenario',
      text: `面对上述情况，你会如何处理？`,
      scenario: template.scenario,
      context: {
        background: template.title,
        situation: template.scenario
      },
      options,
      dimensions: template.dimensions.map(d => ({
        dimensionId: d,
        weight: 1 / template.dimensions.length,
        aspects: []
      })),
      difficulty: difficultyMap[version],
      cognitiveLoad: template.complexity,
      discriminationIndex: 0.85,
      timeEstimate: version === 'professional' ? 180 : version === 'advanced' ? 120 : 90,
      version: [version]
    }
  }

  private generateScenarioOptions(
    template: ScenarioTemplate,
    version: 'normal' | 'advanced' | 'professional'
  ): ComplexOption[] {
    const baseOptions: ComplexOption[] = [
      {
        id: 'opt-1',
        text: '立即采取强硬措施，严格执行公司规定，对违规行为零容忍。虽然可能引起短期反弹，但能快速建立权威和秩序。',
        value: 1,
        reasoning: '强调规则和效率，但可能忽视人际因素',
        implications: ['短期见效快', '可能损害团队关系', '风险较高'],
        dimensionScores: {
          'decision-making': 0.6,
          'emotional-intelligence': 0.3,
          'stress-resilience': 0.7,
          'social-ability': 0.4
        },
        riskLevel: 'high',
        shortTerm: '快速解决问题，建立权威',
        longTerm: '可能引发更多矛盾，团队凝聚力下降'
      },
      {
        id: 'opt-2',
        text: '先与各方单独沟通，深入了解问题根源和各方诉求，然后制定一个平衡各方利益的解决方案。虽然耗时较长，但能从根本上解决问题。',
        value: 3,
        reasoning: '注重理解和平衡，但可能效率较低',
        implications: ['长期效果好', '耗时较长', '需要较强沟通能力'],
        dimensionScores: {
          'decision-making': 0.8,
          'emotional-intelligence': 0.9,
          'stress-resilience': 0.6,
          'social-ability': 0.9
        },
        riskLevel: 'low',
        shortTerm: '进展缓慢，可能错过最佳时机',
        longTerm: '建立信任，从根本上解决问题'
      },
      {
        id: 'opt-3',
        text: '寻求上级或HR的支持和指导，按照公司既定流程处理。这样可以避免个人决策风险，同时确保处理方式的合规性。',
        value: 2,
        reasoning: '稳健但缺乏主动性',
        implications: ['风险较低', '可能错过最佳处理时机', '依赖外部支持'],
        dimensionScores: {
          'decision-making': 0.5,
          'emotional-intelligence': 0.6,
          'stress-resilience': 0.5,
          'social-ability': 0.6
        },
        riskLevel: 'medium',
        shortTerm: '获得支持，降低个人风险',
        longTerm: '可能被视为缺乏领导力'
      },
      {
        id: 'opt-4',
        text: '召集所有相关方开会，公开讨论问题并共同制定解决方案。通过透明和民主的方式，让每个人都参与决策过程。',
        value: 2,
        reasoning: '民主透明，但可能在冲突激烈时适得其反',
        implications: ['增强参与感', '可能激化矛盾', '需要良好的会议引导能力'],
        dimensionScores: {
          'decision-making': 0.7,
          'emotional-intelligence': 0.7,
          'stress-resilience': 0.6,
          'social-ability': 0.8
        },
        riskLevel: 'medium',
        shortTerm: '可能引发激烈讨论',
        longTerm: '增强团队凝聚力和参与感'
      },
      {
        id: 'opt-5',
        text: '采取渐进式策略，先解决最紧急的问题，同时制定长期改进计划。在处理过程中持续观察和调整，保持灵活性。',
        value: 4,
        reasoning: '平衡短期和长期，灵活应对',
        implications: ['兼顾各方', '需要持续关注', '策略性强'],
        dimensionScores: {
          'decision-making': 0.9,
          'emotional-intelligence': 0.8,
          'stress-resilience': 0.8,
          'social-ability': 0.7
        },
        riskLevel: 'low',
        shortTerm: '逐步解决问题，风险可控',
        longTerm: '建立系统性解决方案，持续改进'
      }
    ]

    if (version === 'advanced' || version === 'professional') {
      baseOptions.push({
        id: 'opt-6',
        text: '重新评估问题的本质，考虑是否存在更深层的系统性问题。可能需要调整团队结构、工作流程或激励机制，而非仅仅处理表面冲突。',
        value: 5,
        reasoning: '系统思维，寻找根本原因',
        implications: ['可能发现隐藏问题', '需要更大变革', '长期价值高'],
        dimensionScores: {
          'decision-making': 0.95,
          'emotional-intelligence': 0.85,
          'stress-resilience': 0.75,
          'social-ability': 0.75
        },
        riskLevel: 'medium',
        shortTerm: '可能引发更大范围变革',
        longTerm: '解决根本问题，预防未来冲突'
      })
    }

    if (version === 'professional') {
      baseOptions.push({
        id: 'opt-7',
        text: '运用变革管理的方法论，制定包含沟通计划、利益相关者分析、风险评估和成功指标的完整方案。同时建立反馈机制，确保方案的动态优化。',
        value: 6,
        reasoning: '专业方法论，全面系统',
        implications: ['专业性强', '资源需求高', '成功率最高'],
        dimensionScores: {
          'decision-making': 0.95,
          'emotional-intelligence': 0.9,
          'stress-resilience': 0.85,
          'social-ability': 0.9
        },
        riskLevel: 'low',
        shortTerm: '准备时间较长',
        longTerm: '建立可持续的管理体系'
      })
    }

    return baseOptions
  }

  generateJudgmentQuestion(template: typeof judgmentQuestionTemplates[0]): ComplexQuestion {
    const options: ComplexOption[] = [
      {
        id: 'true',
        text: '正确',
        value: template.correctAnswer ? 1 : 0,
        reasoning: template.correctAnswer ? '这个判断是正确的' : '这个判断是错误的'
      },
      {
        id: 'false',
        text: '错误',
        value: template.correctAnswer ? 0 : 1,
        reasoning: template.correctAnswer ? '这个判断是错误的' : '这个判断是正确的'
      },
      {
        id: 'partial',
        text: '部分正确，需要具体情境分析',
        value: 0.5,
        reasoning: '许多判断需要考虑具体情境才能确定'
      }
    ]

    return {
      id: template.id,
      type: 'judgment',
      text: template.text,
      options,
      dimensions: template.dimensions.map(d => ({
        dimensionId: d,
        weight: 1 / template.dimensions.length,
        aspects: []
      })),
      difficulty: template.difficulty,
      cognitiveLoad: template.cognitiveLoad,
      discriminationIndex: 0.75,
      timeEstimate: 30,
      version: ['advanced', 'professional']
    }
  }

  generateMultipleChoiceQuestion(template: typeof multipleChoiceTemplates[0]): ComplexQuestion {
    const options: ComplexOption[] = template.options.map(opt => ({
      id: opt.id,
      text: opt.text,
      value: opt.correct ? 1 : 0,
      reasoning: opt.reasoning
    }))

    return {
      id: template.id,
      type: 'multiple',
      text: template.text,
      options,
      dimensions: template.dimensions.map(d => ({
        dimensionId: d,
        weight: 1 / template.dimensions.length,
        aspects: []
      })),
      difficulty: template.difficulty,
      cognitiveLoad: template.cognitiveLoad,
      discriminationIndex: 0.8,
      timeEstimate: 60,
      version: ['advanced', 'professional']
    }
  }

  generateQuestionSet(config: QuestionGenerationConfig): ComplexQuestion[] {
    const questions: ComplexQuestion[] = []
    const targetCount = config.version === 'normal' ? 25 : config.version === 'advanced' ? 60 : 120

    const availableScenarios = scenarioTemplates.filter(s => 
      s.dimensions.some(d => config.targetDimensions.includes(d))
    )

    for (const template of availableScenarios) {
      if (questions.length >= targetCount * 0.4) break
      questions.push(this.generateScenarioQuestion(template, config.version))
    }

    if (config.version !== 'normal') {
      for (const template of judgmentQuestionTemplates) {
        if (questions.length >= targetCount * 0.6) break
        if (template.dimensions.some(d => config.targetDimensions.includes(d))) {
          questions.push(this.generateJudgmentQuestion(template))
        }
      }

      for (const template of multipleChoiceTemplates) {
        if (questions.length >= targetCount * 0.8) break
        if (template.dimensions.some(d => config.targetDimensions.includes(d))) {
          questions.push(this.generateMultipleChoiceQuestion(template))
        }
      }
    }

    return questions.slice(0, targetCount)
  }

  evaluateQuestionComplexity(question: ComplexQuestion): {
    overallComplexity: number
    cognitiveDemand: number
    emotionalDemand: number
    socialDemand: number
    analysisDepth: number
  } {
    const cognitiveDemand = question.cognitiveLoad
    const emotionalDemand = question.dimensions
      .filter(d => ['emotional-intelligence', 'stress-resilience'].includes(d.dimensionId))
      .reduce((sum, d) => sum + d.weight, 0)
    const socialDemand = question.dimensions
      .filter(d => ['social-ability', 'leadership-potential'].includes(d.dimensionId))
      .reduce((sum, d) => sum + d.weight, 0)
    const analysisDepth = question.options.length >= 5 ? 0.9 : question.options.length >= 4 ? 0.7 : 0.5

    const overallComplexity = (cognitiveDemand + emotionalDemand + socialDemand + analysisDepth) / 4

    return {
      overallComplexity,
      cognitiveDemand,
      emotionalDemand,
      socialDemand,
      analysisDepth
    }
  }

  validateQuestionQuality(question: ComplexQuestion): {
    isValid: boolean
    issues: string[]
    suggestions: string[]
  } {
    const issues: string[] = []
    const suggestions: string[] = []

    if (question.options.length < 4) {
      issues.push('选项数量不足，建议至少4个选项')
      suggestions.push('增加更多差异化选项，提高区分度')
    }

    if (question.cognitiveLoad < 0.5) {
      issues.push('认知负荷过低，题目可能过于简单')
      suggestions.push('增加情境复杂性或多维度考量')
    }

    if (question.dimensions.length < 2) {
      issues.push('维度覆盖不足')
      suggestions.push('确保题目能反映多个分析维度')
    }

    const valueRange = Math.max(...question.options.map(o => o.value)) - 
                       Math.min(...question.options.map(o => o.value))
    if (valueRange < 3) {
      issues.push('选项价值差异过小，区分度不足')
      suggestions.push('增加选项之间的价值差异')
    }

    return {
      isValid: issues.length === 0,
      issues,
      suggestions
    }
  }
}

export const complexQuestionGenerator = new ComplexQuestionGenerator()
