import { Assessment, Question } from '../types'

interface QuestionTemplate {
  scenario: string
  text: string
  options: Array<{
    id: string
    text: string
    value: number
    trait?: string
  }>
  dimensions?: string[]
}

const scenarioTemplates = {
  workplace: [
    {
      context: '项目管理',
      scenarios: [
        '你负责的项目遇到了关键资源短缺，团队成员开始互相推诿责任。项目还有两周就要交付，客户对质量要求很高。你需要同时处理内部团队问题和外部客户期望。',
        '你的团队提出了一个创新方案，但需要额外的预算和时间。上级要求你证明这个方案的可行性，而竞争对手可能很快推出类似产品。',
        '项目进行到一半时，你发现最初的需求分析有重大遗漏。重新分析会延误项目，但不重新分析可能导致产品不符合市场需求。'
      ]
    },
    {
      context: '团队协作',
      scenarios: [
        '团队中有两位核心成员因工作方式不同产生严重冲突，影响了整个团队的氛围和效率。他们都很有能力，但互不相让。',
        '你刚接手一个新团队，发现团队文化与你习惯的工作方式有很大差异。团队成员对你的管理风格持观望态度。',
        '团队中有一位资深员工掌握关键知识，但不愿意分享。其他成员因此无法独立工作，形成了对这位员工的依赖。'
      ]
    },
    {
      context: '决策困境',
      scenarios: [
        '公司要求你在两个供应商之间选择：A供应商价格低但质量不稳定，B供应商质量高但价格超出预算。项目时间紧迫，无法寻找第三选择。',
        '你发现一个能大幅提升效率的新技术，但实施风险较高。如果失败，可能会影响你的职业声誉。团队内部意见分歧严重。',
        '上级要求你在一个重要项目中使用特定的技术方案，但你知道这个方案存在潜在问题。直接反对可能会影响你的职业发展。'
      ]
    }
  ],
  interpersonal: [
    {
      context: '沟通挑战',
      scenarios: [
        '你需要向一位情绪激动的客户解释为什么项目延期。客户威胁要取消合同，而你知道延期是因为客户频繁变更需求。',
        '你的同事在公开会议上批评你的方案，让你感到尴尬。会后你需要与他合作完成一个重要任务。',
        '你发现一位下属在背后议论你的管理方式，影响了团队对你的信任。你需要处理这个问题，但不想让关系进一步恶化。'
      ]
    },
    {
      context: '人际关系',
      scenarios: [
        '你的好友请求你帮他推荐工作，但你知道他的能力可能不适合这个职位。推荐可能会影响你的职业声誉，不推荐可能会影响友谊。',
        '你在团队中与一位成员建立了深厚的友谊，但现在需要在项目中评估他的表现。他的表现确实存在问题，但直接指出可能会影响友谊。',
        '你发现团队中存在小团体，他们排斥新成员。作为团队负责人，你需要打破这种局面，但不想引起更大的分裂。'
      ]
    }
  ],
  personal: [
    {
      context: '职业发展',
      scenarios: [
        '你收到了两个工作offer：一个是创业公司，薪资较低但发展空间大；另一个是大公司，薪资高但工作内容相对固定。你的家人希望稳定，而你渴望挑战。',
        '你在当前岗位已经三年，工作熟练但缺乏挑战。有一个转岗机会，可以学习新技能但需要从零开始。你担心转岗失败会影响职业发展。',
        '你的上级即将离职，你是接任的热门人选。但你知道这个职位需要处理很多政治问题，而你更喜欢专注于专业工作。'
      ]
    },
    {
      context: '压力管理',
      scenarios: [
        '你同时面临工作压力和家庭压力：项目截止日期临近，家人也需要你的陪伴。你感到分身乏术，两边都无法兼顾。',
        '你经历了一次重大失败，信心受到打击。现在有一个新的机会，但需要你快速恢复状态并投入其中。',
        '长期高强度工作让你感到倦怠，但团队离不开你。你担心休息会影响团队进度，也担心自己的职业发展。'
      ]
    }
  ],
  ethical: [
    {
      context: '道德困境',
      scenarios: [
        '你发现公司的产品存在安全隐患，但上报可能会导致产品召回，给公司造成重大损失。你的上级暗示你"睁一只眼闭一只眼"。',
        '你知道一位同事在简历上造假获得了职位，但他工作能力确实很强。揭发可能会影响团队，不揭发则违背了你的价值观。',
        '客户要求你在报告中隐瞒一些不利数据，暗示如果配合会有额外报酬。拒绝可能会失去这个重要客户。'
      ]
    }
  ]
}

function generateScenarioQuestion(
  assessmentId: string,
  questionNum: number,
  template: QuestionTemplate,
  trait?: string
): Question {
  return {
    id: `${assessmentId}-${questionNum}`,
    type: 'scenario',
    text: template.text,
    scenario: template.scenario,
    options: template.options.map((opt, idx) => ({
      ...opt,
      id: opt.id || String.fromCharCode(97 + idx),
      trait: trait || opt.trait
    }))
  }
}

export function generateQuestionsForAssessment(
  assessment: Assessment,
  targetCount: number = 30
): Question[] {
  const questions: Question[] = []
  const assessmentId = assessment.id
  let questionNum = 1

  const categoryMap: Record<string, string[]> = {
    '人格心理': ['workplace', 'interpersonal', 'personal'],
    '职业发展': ['workplace', 'personal'],
    '能力评估': ['workplace', 'ethical'],
    '心理健康': ['personal', 'interpersonal'],
    '认知能力': ['workplace', 'ethical']
  }

  const categories = categoryMap[assessment.category] || ['workplace', 'interpersonal', 'personal']

  for (const category of categories) {
    const templates = scenarioTemplates[category as keyof typeof scenarioTemplates]
    if (!templates) continue

    for (const template of templates) {
      for (const scenario of template.scenarios) {
        if (questions.length >= targetCount) break

        const question: Question = {
          id: `${assessmentId}-${questionNum}`,
          type: 'scenario',
          text: '面对上述情况，你会如何处理？',
          scenario,
          options: generateOptionsForScenario(scenario, assessment.id, questionNum)
        }

        questions.push(question)
        questionNum++
      }
      if (questions.length >= targetCount) break
    }
    if (questions.length >= targetCount) break
  }

  while (questions.length < targetCount) {
    const question: Question = {
      id: `${assessmentId}-${questionNum}`,
      type: 'scenario',
      text: '面对上述情况，你会如何选择？',
      scenario: generateGenericScenario(questionNum),
      options: generateGenericOptions(questionNum)
    }
    questions.push(question)
    questionNum++
  }

  return questions.slice(0, targetCount)
}

function generateOptionsForScenario(scenario: string, assessmentId: string, num: number) {
  const optionSets = [
    [
      { id: 'a', text: '立即采取行动，快速解决问题。你认为拖延只会让问题变得更糟，即使可能犯错也要先尝试。', value: 1 },
      { id: 'b', text: '先收集更多信息，分析问题的根本原因。你会花时间研究，确保解决方案的准确性。', value: 2 },
      { id: 'c', text: '寻求他人的意见和建议，通过讨论找到最佳方案。你相信集体智慧比个人判断更可靠。', value: 3 },
      { id: 'd', text: '制定详细的行动计划，考虑各种可能的情况和应对措施。你倾向于充分准备后再行动。', value: 4 },
      { id: 'e', text: '采用渐进式方法，先解决最紧急的问题，然后逐步处理其他方面。你相信稳步推进比激进变革更有效。', value: 5 }
    ],
    [
      { id: 'a', text: '坚持自己的原则和标准，即使这可能带来短期困难。你认为长期来看，坚持原则更重要。', value: 5 },
      { id: 'b', text: '根据具体情况灵活调整，在原则和实用之间找到平衡。你相信没有绝对的对错，要看情境。', value: 4 },
      { id: 'c', text: '优先考虑团队和组织的利益，个人原则可以适当妥协。你认为集体利益高于个人信念。', value: 3 },
      { id: 'd', text: '寻求第三条路，尝试找到既能坚持原则又能解决问题的创新方案。你相信总有更好的选择。', value: 5 },
      { id: 'e', text: '暂时搁置原则，先解决眼前问题，之后再寻找机会纠正。你认为生存和发展是第一位的。', value: 2 }
    ],
    [
      { id: 'a', text: '主动承担责任，即使这不是你的错。你认为领导力意味着在困难时刻挺身而出。', value: 5 },
      { id: 'b', text: '客观分析责任归属，让每个人承担相应的责任。你相信公平和透明是团队健康的基础。', value: 3 },
      { id: 'c', text: '先解决问题，之后再讨论责任。你认为当务之急是扭转局面，追责可以稍后进行。', value: 4 },
      { id: 'd', text: '寻求上级或第三方的介入，让客观的第三方来评估和处理责任问题。', value: 2 },
      { id: 'e', text: '反思自己可能的疏忽，即使主要责任不在你。你相信每个问题都有值得学习的地方。', value: 4 }
    ]
  ]

  return optionSets[num % optionSets.length]
}

function generateGenericScenario(num: number): string {
  const scenarios = [
    '你面临一个重要的职业选择：留在熟悉的环境继续发展，还是冒险尝试新的领域。两个选择都有吸引力，也都有风险。',
    '团队中出现了意见分歧，双方都坚持自己的观点。作为协调者，你需要在维护团队和谐和推动项目进展之间找到平衡。',
    '你发现一个可以提升效率的新方法，但实施需要改变现有的工作流程。团队成员对改变持不同态度，有人支持有人反对。',
    '项目进度落后于计划，主要原因是需求频繁变更。客户希望增加新功能，但你知道这会进一步延误项目。',
    '你需要在短期利益和长期发展之间做出选择。短期方案可以快速见效，但长期方案更有价值。资源有限，无法同时进行。'
  ]
  return scenarios[num % scenarios.length]
}

function generateGenericOptions(num: number) {
  return [
    { id: 'a', text: '选择最稳妥的方案，确保不会出错。你倾向于避免风险，即使这意味着可能错过机会。', value: 2 },
    { id: 'b', text: '选择最有潜力的方案，愿意承担一定风险。你相信高风险高回报，愿意为更大的目标冒险。', value: 4 },
    { id: 'c', text: '寻求更多信息和建议，延迟决策。你相信充分的准备能降低风险，即使需要更多时间。', value: 3 },
    { id: 'd', text: '尝试找到折中方案，平衡各方利益。你倾向于避免极端，寻找中间道路。', value: 3 },
    { id: 'e', text: '选择最具创新性的方案，即使不确定性较高。你享受挑战和探索未知。', value: 5 }
  ]
}

export function updateAssessmentQuestions(
  assessment: Assessment,
  version: 'normal' | 'advanced' | 'professional' = 'normal'
): Assessment {
  const targetCounts = {
    normal: 25,
    advanced: 60,
    professional: 120
  }

  const newQuestions = generateQuestionsForAssessment(
    assessment,
    targetCounts[version]
  )

  return {
    ...assessment,
    questions: newQuestions,
    description: updateDescription(assessment.description, newQuestions.length)
  }
}

function updateDescription(original: string, questionCount: number): string {
  return original.replace(/通过\d+道/, `通过${questionCount}道`)
}

export const assessmentQuestionConfigs = {
  'mbti-standard': { minQuestions: 25, traits: ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'] },
  'big-five': { minQuestions: 25, traits: ['E', 'A', 'C', 'N', 'O'] },
  'emotional-intelligence': { minQuestions: 30, traits: ['self-awareness', 'self-regulation', 'motivation', 'empathy', 'social-skills'] },
  'leadership-style': { minQuestions: 30, traits: ['transformational', 'transactional', 'democratic', 'autocratic'] },
  'creativity-test': { minQuestions: 30, traits: ['fluency', 'flexibility', 'originality', 'elaboration'] },
  'stress-management': { minQuestions: 25, traits: ['problem-focused', 'emotion-focused', 'avoidance'] }
}
