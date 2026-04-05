import type { Question, ProfessionalQuestionSet } from '../../types'

/**
 * MBTI专业测评题目
 * 
 * 权重设计说明：
 * - 每个题目测量一个维度对（如E-I, S-N, T-F, J-P）
 * - 选择A选项：给对应特质加分（如E+2），对立特质得0分（I+0）
 * - 选择B选项：给对应特质加分（如I+2），对立特质得0分（E+0）
 * - 这样可以确保用户的选择直接影响最终计算结果
 * 
 * 计分公式：
 * - E得分 = Σ(所有E选项的value)
 * - I得分 = Σ(所有I选项的value)
 * - 最终类型 = 每个维度对中得分较高的一方
 * - 偏好清晰度 = |E-I| / (E+I) × 100
 */

const createMBTIQuestion = (
  id: string,
  text: string,
  subscale: 'EI' | 'SN' | 'TF' | 'JP',
  optionA: { trait: string; text: string },
  optionB: { trait: string; text: string }
) => ({
  id,
  text,
  type: 'single' as const,
  subscale,
  options: [
    { id: 'a', text: optionA.text, value: 2, trait: optionA.trait },
    { id: 'b', text: optionB.text, value: 2, trait: optionB.trait },
  ],
})

export const mbtiProfessionalQuestions: ProfessionalQuestionSet = {
  normal: [
    createMBTIQuestion('mbti-ei-1', '在需要长时间专注工作的项目中，我更倾向于哪种工作模式？', 'EI',
      { trait: 'E', text: '喜欢在开放空间与同事协作讨论' },
      { trait: 'I', text: '偏好独立安静的环境深度思考' }
    ),
    createMBTIQuestion('mbti-ei-2', '当面临复杂问题时，我的首选处理方式是什么？', 'EI',
      { trait: 'I', text: '独自深入研究，整理思路后再分享' },
      { trait: 'E', text: '立即组织头脑风暴，集思广益' }
    ),
    createMBTIQuestion('mbti-ei-3', '连续一周高强度工作后，我最需要的恢复方式是什么？', 'EI',
      { trait: 'I', text: '独处静思、阅读或进行个人爱好活动' },
      { trait: 'E', text: '与朋友聚会、参加社交活动或户外运动' }
    ),
    createMBTIQuestion('mbti-ei-4', '在跨部门合作的大型项目中，我更愿意承担什么角色？', 'EI',
      { trait: 'I', text: '独立负责某个模块的深度开发' },
      { trait: 'E', text: '担任协调者，促进团队沟通与整合' }
    ),
    createMBTIQuestion('mbti-ei-5', '进入一个全新的工作环境（如新公司或新部门），我的适应策略是什么？', 'EI',
      { trait: 'E', text: '主动介绍自己，快速建立人际关系网络' },
      { trait: 'I', text: '先观察环境和文化，再逐步建立联系' }
    ),
    createMBTIQuestion('mbti-ei-6', '我倾向于有少数几个深交的朋友，而不是很多泛泛之交', 'EI',
      { trait: 'I', text: '是的，我更看重深度关系' },
      { trait: 'E', text: '不是，我享受广泛的社交圈' }
    ),
    createMBTIQuestion('mbti-ei-7', '我经常主动发起对话和社交活动', 'EI',
      { trait: 'E', text: '是的，我喜欢主动社交' },
      { trait: 'I', text: '不是，我更愿意被动参与' }
    ),
    createMBTIQuestion('mbti-ei-8', '在表达观点时，我更倾向于深思熟虑后再发言', 'EI',
      { trait: 'I', text: '是的，我需要时间思考' },
      { trait: 'E', text: '不是，我边说边思考' }
    ),
    createMBTIQuestion('mbti-ei-9', '我喜欢成为众人关注的焦点', 'EI',
      { trait: 'E', text: '是的，我享受被关注' },
      { trait: 'I', text: '不是，我更喜欢低调' }
    ),
    createMBTIQuestion('mbti-ei-10', '我经常在内心反复思考问题，而不是与他人讨论', 'EI',
      { trait: 'I', text: '是的，我倾向于内省' },
      { trait: 'E', text: '不是，我喜欢与他人交流' }
    ),
    createMBTIQuestion('mbti-ei-11', '我很容易与陌生人建立联系', 'EI',
      { trait: 'E', text: '是的，我善于与陌生人交流' },
      { trait: 'I', text: '不是，我需要时间熟悉' }
    ),
    createMBTIQuestion('mbti-ei-12', '独处时我感到精力充沛，而不是孤独', 'EI',
      { trait: 'I', text: '是的，独处让我充电' },
      { trait: 'E', text: '不是，我需要社交互动' }
    ),
    createMBTIQuestion('mbti-ei-13', '在群体中，我通常是那个活跃气氛的人', 'EI',
      { trait: 'E', text: '是的，我喜欢活跃气氛' },
      { trait: 'I', text: '不是，我更愿意倾听' }
    ),
    createMBTIQuestion('mbti-ei-14', '我更喜欢一对一的深入交谈，而不是群体讨论', 'EI',
      { trait: 'I', text: '是的，深入交流更有意义' },
      { trait: 'E', text: '不是，群体讨论更有趣' }
    ),
    createMBTIQuestion('mbti-ei-15', '我经常邀请朋友聚会或组织活动', 'EI',
      { trait: 'E', text: '是的，我喜欢组织活动' },
      { trait: 'I', text: '不是，我更愿意参与' }
    ),
    createMBTIQuestion('mbti-ei-16', '在公共场合，我更喜欢保持低调', 'EI',
      { trait: 'I', text: '是的，我不喜欢引人注目' },
      { trait: 'E', text: '不是，我不介意被注意' }
    ),
    createMBTIQuestion('mbti-ei-17', '我通过与他人交流来理清思路', 'EI',
      { trait: 'E', text: '是的，交流帮助我思考' },
      { trait: 'I', text: '不是，我需要独自思考' }
    ),
    createMBTIQuestion('mbti-ei-18', '我更喜欢安静的夜晚，而不是热闹的派对', 'EI',
      { trait: 'I', text: '是的，安静更适合我' },
      { trait: 'E', text: '不是，我喜欢热闹' }
    ),
    createMBTIQuestion('mbti-ei-19', '在社交场合，我很容易感到精力消耗', 'EI',
      { trait: 'I', text: '是的，社交让我疲惫' },
      { trait: 'E', text: '不是，社交给我能量' }
    ),
  ],
  advanced: [
    createMBTIQuestion('mbti-ei-1', '在需要长时间专注工作的项目中，我更倾向于哪种工作模式？', 'EI',
      { trait: 'E', text: '喜欢在开放空间与同事协作讨论' },
      { trait: 'I', text: '偏好独立安静的环境深度思考' }
    ),
    createMBTIQuestion('mbti-ei-2', '当面临复杂问题时，我的首选处理方式是什么？', 'EI',
      { trait: 'I', text: '独自深入研究，整理思路后再分享' },
      { trait: 'E', text: '立即组织头脑风暴，集思广益' }
    ),
    createMBTIQuestion('mbti-ei-3', '连续一周高强度工作后，我最需要的恢复方式是什么？', 'EI',
      { trait: 'I', text: '独处静思、阅读或进行个人爱好活动' },
      { trait: 'E', text: '与朋友聚会、参加社交活动或户外运动' }
    ),
    createMBTIQuestion('mbti-ei-4', '在跨部门合作的大型项目中，我更愿意承担什么角色？', 'EI',
      { trait: 'I', text: '独立负责某个模块的深度开发' },
      { trait: 'E', text: '担任协调者，促进团队沟通与整合' }
    ),
    createMBTIQuestion('mbti-ei-5', '进入一个全新的工作环境（如新公司或新部门），我的适应策略是什么？', 'EI',
      { trait: 'E', text: '主动介绍自己，快速建立人际关系网络' },
      { trait: 'I', text: '先观察环境和文化，再逐步建立联系' }
    ),
    createMBTIQuestion('mbti-ei-6', '我倾向于有少数几个深交的朋友，而不是很多泛泛之交', 'EI',
      { trait: 'I', text: '是的，我更看重深度关系' },
      { trait: 'E', text: '不是，我享受广泛的社交圈' }
    ),
    createMBTIQuestion('mbti-ei-7', '我经常主动发起对话和社交活动', 'EI',
      { trait: 'E', text: '是的，我喜欢主动社交' },
      { trait: 'I', text: '不是，我更愿意被动参与' }
    ),
    createMBTIQuestion('mbti-ei-8', '在表达观点时，我更倾向于深思熟虑后再发言', 'EI',
      { trait: 'I', text: '是的，我需要时间思考' },
      { trait: 'E', text: '不是，我边说边思考' }
    ),
    createMBTIQuestion('mbti-ei-9', '我喜欢成为众人关注的焦点', 'EI',
      { trait: 'E', text: '是的，我享受被关注' },
      { trait: 'I', text: '不是，我更喜欢低调' }
    ),
    createMBTIQuestion('mbti-ei-10', '我经常在内心反复思考问题，而不是与他人讨论', 'EI',
      { trait: 'I', text: '是的，我倾向于内省' },
      { trait: 'E', text: '不是，我喜欢与他人交流' }
    ),
    createMBTIQuestion('mbti-ei-11', '我很容易与陌生人建立联系', 'EI',
      { trait: 'E', text: '是的，我善于与陌生人交流' },
      { trait: 'I', text: '不是，我需要时间熟悉' }
    ),
    createMBTIQuestion('mbti-ei-12', '独处时我感到精力充沛，而不是孤独', 'EI',
      { trait: 'I', text: '是的，独处让我充电' },
      { trait: 'E', text: '不是，我需要社交互动' }
    ),
    createMBTIQuestion('mbti-ei-13', '在群体中，我通常是那个活跃气氛的人', 'EI',
      { trait: 'E', text: '是的，我喜欢活跃气氛' },
      { trait: 'I', text: '不是，我更愿意倾听' }
    ),
    createMBTIQuestion('mbti-ei-14', '我更喜欢一对一的深入交谈，而不是群体讨论', 'EI',
      { trait: 'I', text: '是的，深入交流更有意义' },
      { trait: 'E', text: '不是，群体讨论更有趣' }
    ),
    createMBTIQuestion('mbti-ei-15', '我经常邀请朋友聚会或组织活动', 'EI',
      { trait: 'E', text: '是的，我喜欢组织活动' },
      { trait: 'I', text: '不是，我更愿意参与' }
    ),
    createMBTIQuestion('mbti-ei-16', '在公共场合，我更喜欢保持低调', 'EI',
      { trait: 'I', text: '是的，我不喜欢引人注目' },
      { trait: 'E', text: '不是，我不介意被注意' }
    ),
    createMBTIQuestion('mbti-ei-17', '我通过与他人交流来理清思路', 'EI',
      { trait: 'E', text: '是的，交流帮助我思考' },
      { trait: 'I', text: '不是，我需要独自思考' }
    ),
    createMBTIQuestion('mbti-ei-18', '我更喜欢安静的夜晚，而不是热闹的派对', 'EI',
      { trait: 'I', text: '是的，安静更适合我' },
      { trait: 'E', text: '不是，我喜欢热闹' }
    ),
    createMBTIQuestion('mbti-ei-19', '在社交场合，我很容易感到精力消耗', 'EI',
      { trait: 'I', text: '是的，社交让我疲惫' },
      { trait: 'E', text: '不是，社交给我能量' }
    ),
    createMBTIQuestion('mbti-ei-20', '我喜欢认识各种不同类型的人', 'EI',
      { trait: 'E', text: '是的，多样性很有趣' },
      { trait: 'I', text: '不是，我更喜欢熟悉的人' }
    ),
    createMBTIQuestion('mbti-ei-21', '我倾向于在行动前仔细考虑', 'EI',
      { trait: 'I', text: '是的，我需要深思熟虑' },
      { trait: 'E', text: '不是，我倾向于快速行动' }
    ),
    createMBTIQuestion('mbti-ei-22', '在会议上，我经常主动发言', 'EI',
      { trait: 'E', text: '是的，我积极参与讨论' },
      { trait: 'I', text: '不是，我更愿意倾听' }
    ),
    createMBTIQuestion('mbti-ei-23', '我更喜欢书面沟通而不是口头沟通', 'EI',
      { trait: 'I', text: '是的，书面沟通更清晰' },
      { trait: 'E', text: '不是，口头沟通更直接' }
    ),
    createMBTIQuestion('mbti-ei-24', '周末我更喜欢外出社交，而不是在家休息', 'EI',
      { trait: 'E', text: '是的，我喜欢外出活动' },
      { trait: 'I', text: '不是，我享受安静时光' }
    ),
    createMBTIQuestion('mbti-sn-1', '在学习全新的专业技能（如编程语言或设计软件）时，我的学习偏好是什么？', 'SN',
      { trait: 'N', text: '先理解核心概念和底层原理，再学习具体操作' },
      { trait: 'S', text: '从实际案例和动手操作开始，逐步理解理论' }
    ),
    createMBTIQuestion('mbti-sn-2', '阅读专业报告或技术文档时，我最关注什么信息？', 'SN',
      { trait: 'S', text: '具体数据、事实细节和可操作的建议' },
      { trait: 'N', text: '整体论点、潜在含义和未来趋势预测' }
    ),
    createMBTIQuestion('mbti-sn-3', '在职业发展规划中，我更看重什么因素？', 'SN',
      { trait: 'N', text: '行业前景、创新机会和个人成长潜力' },
      { trait: 'S', text: '具体职位要求、薪资待遇和工作稳定性' }
    ),
    createMBTIQuestion('mbti-sn-4', '参加完一场重要的商务会议后，我记得最清楚的是什么？', 'SN',
      { trait: 'S', text: '具体的数字、决议事项和时间节点' },
      { trait: 'N', text: '讨论的整体氛围、各方立场和潜在影响' }
    ),
    createMBTIQuestion('mbti-sn-5', '在做重大投资决策时，我主要依据什么来判断？', 'SN',
      { trait: 'N', text: '市场趋势、未来发展潜力和直觉判断' },
      { trait: 'S', text: '历史业绩、财务数据和风险分析报告' }
    ),
    createMBTIQuestion('mbti-sn-6', '我更喜欢处理具体、实际的问题，而不是抽象的概念', 'SN',
      { trait: 'S', text: '是的，实际问题更有意义' },
      { trait: 'N', text: '不是，抽象问题更有趣' }
    ),
    createMBTIQuestion('mbti-sn-7', '我经常思考未来的可能性和潜在的发展', 'SN',
      { trait: 'N', text: '是的，我喜欢展望未来' },
      { trait: 'S', text: '不是，我更关注当下' }
    ),
    createMBTIQuestion('mbti-sn-8', '我注重细节，善于发现细微的变化', 'SN',
      { trait: 'S', text: '是的，细节很重要' },
      { trait: 'N', text: '不是，我更关注整体' }
    ),
    createMBTIQuestion('mbti-sn-9', '我喜欢探索新的想法和理论', 'SN',
      { trait: 'N', text: '是的，新想法让我兴奋' },
      { trait: 'S', text: '不是，我更喜欢已知的方法' }
    ),
    createMBTIQuestion('mbti-sn-10', '我更依赖过去的经验来做决定', 'SN',
      { trait: 'S', text: '是的，经验是最好的老师' },
      { trait: 'N', text: '不是，我更愿意尝试新方法' }
    ),
    createMBTIQuestion('mbti-sn-11', '我经常能看到事物之间的隐藏联系', 'SN',
      { trait: 'N', text: '是的，我善于发现关联' },
      { trait: 'S', text: '不是，我看到的是独立事物' }
    ),
    createMBTIQuestion('mbti-sn-12', '我更喜欢按部就班地完成任务', 'SN',
      { trait: 'S', text: '是的，步骤很重要' },
      { trait: 'N', text: '不是，我更喜欢灵活方式' }
    ),
    createMBTIQuestion('mbti-sn-13', '我善于想象可能发生的情况', 'SN',
      { trait: 'N', text: '是的，想象力丰富' },
      { trait: 'S', text: '不是，我更关注现实' }
    ),
    createMBTIQuestion('mbti-sn-14', '我更信任可以测量和验证的事实', 'SN',
      { trait: 'S', text: '是的，事实更可靠' },
      { trait: 'N', text: '不是，直觉也很有价值' }
    ),
    createMBTIQuestion('mbti-sn-15', '我喜欢讨论抽象的概念和理论', 'SN',
      { trait: 'N', text: '是的，理论讨论很有趣' },
      { trait: 'S', text: '不是，我更喜欢实际话题' }
    ),
    createMBTIQuestion('mbti-sn-16', '我更关注当前的现实情况', 'SN',
      { trait: 'S', text: '是的，现实最重要' },
      { trait: 'N', text: '不是，我更关注可能性' }
    ),
    createMBTIQuestion('mbti-sn-17', '我经常有灵感闪现的时刻', 'SN',
      { trait: 'N', text: '是的，灵感很重要' },
      { trait: 'S', text: '不是，我更依赖逻辑推理' }
    ),
    createMBTIQuestion('mbti-sn-18', '我更喜欢具体明确的指示', 'SN',
      { trait: 'S', text: '是的，明确指示更有效' },
      { trait: 'N', text: '不是，我喜欢自己探索' }
    ),
    createMBTIQuestion('mbti-sn-19', '我善于发现模式和发展趋势', 'SN',
      { trait: 'N', text: '是的，模式识别是我的强项' },
      { trait: 'S', text: '不是，我更关注具体事件' }
    ),
    createMBTIQuestion('mbti-sn-20', '我更重视实际经验而非理论', 'SN',
      { trait: 'S', text: '是的，经验更可靠' },
      { trait: 'N', text: '不是，理论指导实践' }
    ),
    createMBTIQuestion('mbti-sn-21', '我喜欢思考"如果...会怎样"的问题', 'SN',
      { trait: 'N', text: '是的，假设性思考很有趣' },
      { trait: 'S', text: '不是，我更关注实际情况' }
    ),
    createMBTIQuestion('mbti-sn-22', '我更擅长处理具体的任务', 'SN',
      { trait: 'S', text: '是的，具体任务更适合我' },
      { trait: 'N', text: '不是，我更喜欢概念性工作' }
    ),
    createMBTIQuestion('mbti-sn-23', '我经常能看到别人看不到的可能性', 'SN',
      { trait: 'N', text: '是的，我善于发现机会' },
      { trait: 'S', text: '不是，我关注可见的事实' }
    ),
  ],
  professional: [
    // ==================== E-I 维度 (24题) ====================
    createMBTIQuestion('mbti-ei-1', '在需要长时间专注工作的项目中，我更倾向于哪种工作模式？', 'EI',
      { trait: 'E', text: '喜欢在开放空间与同事协作讨论' },
      { trait: 'I', text: '偏好独立安静的环境深度思考' }
    ),
    createMBTIQuestion('mbti-ei-2', '当面临复杂问题时，我的首选处理方式是什么？', 'EI',
      { trait: 'I', text: '独自深入研究，整理思路后再分享' },
      { trait: 'E', text: '立即组织头脑风暴，集思广益' }
    ),
    createMBTIQuestion('mbti-ei-3', '连续一周高强度工作后，我最需要的恢复方式是什么？', 'EI',
      { trait: 'I', text: '独处静思、阅读或进行个人爱好活动' },
      { trait: 'E', text: '与朋友聚会、参加社交活动或户外运动' }
    ),
    createMBTIQuestion('mbti-ei-4', '在跨部门合作的大型项目中，我更愿意承担什么角色？', 'EI',
      { trait: 'I', text: '独立负责某个模块的深度开发' },
      { trait: 'E', text: '担任协调者，促进团队沟通与整合' }
    ),
    createMBTIQuestion('mbti-ei-5', '进入一个全新的工作环境（如新公司或新部门），我的适应策略是什么？', 'EI',
      { trait: 'E', text: '主动介绍自己，快速建立人际关系网络' },
      { trait: 'I', text: '先观察环境和文化，再逐步建立联系' }
    ),
    createMBTIQuestion('mbti-ei-6', '我倾向于有少数几个深交的朋友，而不是很多泛泛之交', 'EI',
      { trait: 'I', text: '是的，我更看重深度关系' },
      { trait: 'E', text: '不是，我享受广泛的社交圈' }
    ),
    createMBTIQuestion('mbti-ei-7', '我经常主动发起对话和社交活动', 'EI',
      { trait: 'E', text: '是的，我喜欢主动社交' },
      { trait: 'I', text: '不是，我更愿意被动参与' }
    ),
    createMBTIQuestion('mbti-ei-8', '在表达观点时，我更倾向于深思熟虑后再发言', 'EI',
      { trait: 'I', text: '是的，我需要时间思考' },
      { trait: 'E', text: '不是，我边说边思考' }
    ),
    createMBTIQuestion('mbti-ei-9', '我喜欢成为众人关注的焦点', 'EI',
      { trait: 'E', text: '是的，我享受被关注' },
      { trait: 'I', text: '不是，我更喜欢低调' }
    ),
    createMBTIQuestion('mbti-ei-10', '我经常在内心反复思考问题，而不是与他人讨论', 'EI',
      { trait: 'I', text: '是的，我倾向于内省' },
      { trait: 'E', text: '不是，我喜欢与他人交流' }
    ),
    createMBTIQuestion('mbti-ei-11', '我很容易与陌生人建立联系', 'EI',
      { trait: 'E', text: '是的，我善于与陌生人交流' },
      { trait: 'I', text: '不是，我需要时间熟悉' }
    ),
    createMBTIQuestion('mbti-ei-12', '独处时我感到精力充沛，而不是孤独', 'EI',
      { trait: 'I', text: '是的，独处让我充电' },
      { trait: 'E', text: '不是，我需要社交互动' }
    ),
    createMBTIQuestion('mbti-ei-13', '在群体中，我通常是那个活跃气氛的人', 'EI',
      { trait: 'E', text: '是的，我喜欢活跃气氛' },
      { trait: 'I', text: '不是，我更愿意倾听' }
    ),
    createMBTIQuestion('mbti-ei-14', '我更喜欢一对一的深入交谈，而不是群体讨论', 'EI',
      { trait: 'I', text: '是的，深入交流更有意义' },
      { trait: 'E', text: '不是，群体讨论更有趣' }
    ),
    createMBTIQuestion('mbti-ei-15', '我经常邀请朋友聚会或组织活动', 'EI',
      { trait: 'E', text: '是的，我喜欢组织活动' },
      { trait: 'I', text: '不是，我更愿意参与' }
    ),
    createMBTIQuestion('mbti-ei-16', '在公共场合，我更喜欢保持低调', 'EI',
      { trait: 'I', text: '是的，我不喜欢引人注目' },
      { trait: 'E', text: '不是，我不介意被注意' }
    ),
    createMBTIQuestion('mbti-ei-17', '我通过与他人交流来理清思路', 'EI',
      { trait: 'E', text: '是的，交流帮助我思考' },
      { trait: 'I', text: '不是，我需要独自思考' }
    ),
    createMBTIQuestion('mbti-ei-18', '我更喜欢安静的夜晚，而不是热闹的派对', 'EI',
      { trait: 'I', text: '是的，安静更适合我' },
      { trait: 'E', text: '不是，我喜欢热闹' }
    ),
    createMBTIQuestion('mbti-ei-19', '在社交场合，我很容易感到精力消耗', 'EI',
      { trait: 'I', text: '是的，社交让我疲惫' },
      { trait: 'E', text: '不是，社交给我能量' }
    ),
    createMBTIQuestion('mbti-ei-20', '我喜欢认识各种不同类型的人', 'EI',
      { trait: 'E', text: '是的，多样性很有趣' },
      { trait: 'I', text: '不是，我更喜欢熟悉的人' }
    ),
    createMBTIQuestion('mbti-ei-21', '我倾向于在行动前仔细考虑', 'EI',
      { trait: 'I', text: '是的，我需要深思熟虑' },
      { trait: 'E', text: '不是，我倾向于快速行动' }
    ),
    createMBTIQuestion('mbti-ei-22', '在会议上，我经常主动发言', 'EI',
      { trait: 'E', text: '是的，我积极参与讨论' },
      { trait: 'I', text: '不是，我更愿意倾听' }
    ),
    createMBTIQuestion('mbti-ei-23', '我更喜欢书面沟通而不是口头沟通', 'EI',
      { trait: 'I', text: '是的，书面沟通更清晰' },
      { trait: 'E', text: '不是，口头沟通更直接' }
    ),
    createMBTIQuestion('mbti-ei-24', '周末我更喜欢外出社交，而不是在家休息', 'EI',
      { trait: 'E', text: '是的，我喜欢外出活动' },
      { trait: 'I', text: '不是，我享受安静时光' }
    ),

    // ==================== S-N 维度 (24题) ====================
    createMBTIQuestion('mbti-sn-1', '在学习全新的专业技能（如编程语言或设计软件）时，我的学习偏好是什么？', 'SN',
      { trait: 'N', text: '先理解核心概念和底层原理，再学习具体操作' },
      { trait: 'S', text: '从实际案例和动手操作开始，逐步理解理论' }
    ),
    createMBTIQuestion('mbti-sn-2', '阅读专业报告或技术文档时，我最关注什么信息？', 'SN',
      { trait: 'S', text: '具体数据、事实细节和可操作的建议' },
      { trait: 'N', text: '整体论点、潜在含义和未来趋势预测' }
    ),
    createMBTIQuestion('mbti-sn-3', '在职业发展规划中，我更看重什么因素？', 'SN',
      { trait: 'N', text: '行业前景、创新机会和个人成长潜力' },
      { trait: 'S', text: '具体职位要求、薪资待遇和工作稳定性' }
    ),
    createMBTIQuestion('mbti-sn-4', '参加完一场重要的商务会议后，我记得最清楚的是什么？', 'SN',
      { trait: 'S', text: '具体的数字、决议事项和时间节点' },
      { trait: 'N', text: '讨论的整体氛围、各方立场和潜在影响' }
    ),
    createMBTIQuestion('mbti-sn-5', '在做重大投资决策时，我主要依据什么来判断？', 'SN',
      { trait: 'N', text: '市场趋势、未来发展潜力和直觉判断' },
      { trait: 'S', text: '历史业绩、财务数据和风险分析报告' }
    ),
    createMBTIQuestion('mbti-sn-6', '我更喜欢处理具体、实际的问题，而不是抽象的概念', 'SN',
      { trait: 'S', text: '是的，实际问题更有意义' },
      { trait: 'N', text: '不是，抽象问题更有趣' }
    ),
    createMBTIQuestion('mbti-sn-7', '我经常思考未来的可能性和潜在的发展', 'SN',
      { trait: 'N', text: '是的，我喜欢展望未来' },
      { trait: 'S', text: '不是，我更关注当下' }
    ),
    createMBTIQuestion('mbti-sn-8', '我注重细节，善于发现细微的变化', 'SN',
      { trait: 'S', text: '是的，细节很重要' },
      { trait: 'N', text: '不是，我更关注整体' }
    ),
    createMBTIQuestion('mbti-sn-9', '我喜欢探索新的想法和理论', 'SN',
      { trait: 'N', text: '是的，新想法让我兴奋' },
      { trait: 'S', text: '不是，我更喜欢已知的方法' }
    ),
    createMBTIQuestion('mbti-sn-10', '我更依赖过去的经验来做决定', 'SN',
      { trait: 'S', text: '是的，经验是最好的老师' },
      { trait: 'N', text: '不是，我更愿意尝试新方法' }
    ),
    createMBTIQuestion('mbti-sn-11', '我经常能看到事物之间的隐藏联系', 'SN',
      { trait: 'N', text: '是的，我善于发现关联' },
      { trait: 'S', text: '不是，我看到的是独立事物' }
    ),
    createMBTIQuestion('mbti-sn-12', '我更喜欢按部就班地完成任务', 'SN',
      { trait: 'S', text: '是的，步骤很重要' },
      { trait: 'N', text: '不是，我更喜欢灵活方式' }
    ),
    createMBTIQuestion('mbti-sn-13', '我善于想象可能发生的情况', 'SN',
      { trait: 'N', text: '是的，想象力丰富' },
      { trait: 'S', text: '不是，我更关注现实' }
    ),
    createMBTIQuestion('mbti-sn-14', '我更信任可以测量和验证的事实', 'SN',
      { trait: 'S', text: '是的，事实更可靠' },
      { trait: 'N', text: '不是，直觉也很有价值' }
    ),
    createMBTIQuestion('mbti-sn-15', '我喜欢讨论抽象的概念和理论', 'SN',
      { trait: 'N', text: '是的，理论讨论很有趣' },
      { trait: 'S', text: '不是，我更喜欢实际话题' }
    ),
    createMBTIQuestion('mbti-sn-16', '我更关注当前的现实情况', 'SN',
      { trait: 'S', text: '是的，现实最重要' },
      { trait: 'N', text: '不是，我更关注可能性' }
    ),
    createMBTIQuestion('mbti-sn-17', '我经常有灵感闪现的时刻', 'SN',
      { trait: 'N', text: '是的，灵感很重要' },
      { trait: 'S', text: '不是，我更依赖逻辑推理' }
    ),
    createMBTIQuestion('mbti-sn-18', '我更喜欢具体明确的指示', 'SN',
      { trait: 'S', text: '是的，明确指示更有效' },
      { trait: 'N', text: '不是，我喜欢自己探索' }
    ),
    createMBTIQuestion('mbti-sn-19', '我善于发现模式和发展趋势', 'SN',
      { trait: 'N', text: '是的，模式识别是我的强项' },
      { trait: 'S', text: '不是，我更关注具体事件' }
    ),
    createMBTIQuestion('mbti-sn-20', '我更重视实际经验而非理论', 'SN',
      { trait: 'S', text: '是的，经验更可靠' },
      { trait: 'N', text: '不是，理论指导实践' }
    ),
    createMBTIQuestion('mbti-sn-21', '我喜欢思考"如果...会怎样"的问题', 'SN',
      { trait: 'N', text: '是的，假设性思考很有趣' },
      { trait: 'S', text: '不是，我更关注实际情况' }
    ),
    createMBTIQuestion('mbti-sn-22', '我更擅长处理具体的任务', 'SN',
      { trait: 'S', text: '是的，具体任务更适合我' },
      { trait: 'N', text: '不是，我更喜欢概念性工作' }
    ),
    createMBTIQuestion('mbti-sn-23', '我经常能看到别人看不到的可能性', 'SN',
      { trait: 'N', text: '是的，我善于发现机会' },
      { trait: 'S', text: '不是，我关注可见的事实' }
    ),
    createMBTIQuestion('mbti-sn-24', '我更喜欢传统和经过验证的方法', 'SN',
      { trait: 'S', text: '是的，传统方法更可靠' },
      { trait: 'N', text: '不是，我喜欢尝试新方法' }
    ),

    // ==================== T-F 维度 (24题) ====================
    createMBTIQuestion('mbti-tf-1', '作为团队领导，在处理成员之间的严重冲突时，我的首要考虑是什么？', 'TF',
      { trait: 'T', text: '依据事实和规则，公正地判断对错' },
      { trait: 'F', text: '关注各方感受，寻求和谐共赢的解决方案' }
    ),
    createMBTIQuestion('mbti-tf-2', '当亲密的朋友或同事向我倾诉个人困扰时，我通常的第一反应是什么？', 'TF',
      { trait: 'T', text: '分析问题根源，提供切实可行的解决方案' },
      { trait: 'F', text: '先表达理解和共情，给予情感支持' }
    ),
    createMBTIQuestion('mbti-tf-3', '在公司需要进行人员优化（裁员）的艰难决策时，我的决策依据主要是什么？', 'TF',
      { trait: 'F', text: '充分考虑对员工生活的影响，尽量寻找替代方案' },
      { trait: 'T', text: '基于绩效数据和业务需求，做出理性选择' }
    ),
    createMBTIQuestion('mbti-tf-4', '收到上级对我工作的严厉批评后，我的第一反应通常是？', 'TF',
      { trait: 'T', text: '冷静分析批评内容的合理性和改进空间' },
      { trait: 'F', text: '先处理情绪反应，再考虑具体内容' }
    ),
    createMBTIQuestion('mbti-tf-5', '在商务谈判中遇到对方的强烈情感诉求时，我的应对策略是什么？', 'TF',
      { trait: 'T', text: '坚持基于事实和数据的专业立场' },
      { trait: 'F', text: '适当让步以维护关系，寻求情感共鸣' }
    ),
    createMBTIQuestion('mbti-tf-6', '我更容易被逻辑论证说服，而不是情感诉求', 'TF',
      { trait: 'T', text: '是的，逻辑更有说服力' },
      { trait: 'F', text: '不是，情感也很重要' }
    ),
    createMBTIQuestion('mbti-tf-7', '我重视和谐的人际关系胜过客观真理', 'TF',
      { trait: 'F', text: '是的，和谐很重要' },
      { trait: 'T', text: '不是，真理更重要' }
    ),
    createMBTIQuestion('mbti-tf-8', '我认为公平比仁慈更重要', 'TF',
      { trait: 'T', text: '是的，公平是原则' },
      { trait: 'F', text: '不是，仁慈也很重要' }
    ),
    createMBTIQuestion('mbti-tf-9', '我经常能感知到他人的情绪变化', 'TF',
      { trait: 'F', text: '是的，我善于感知情绪' },
      { trait: 'T', text: '不是，我更关注事实' }
    ),
    createMBTIQuestion('mbti-tf-10', '做决定时，我更看重客观标准而非个人情况', 'TF',
      { trait: 'T', text: '是的，标准很重要' },
      { trait: 'F', text: '不是，个人情况也重要' }
    ),
    createMBTIQuestion('mbti-tf-11', '我倾向于避免伤害他人的感情', 'TF',
      { trait: 'F', text: '是的，我会小心措辞' },
      { trait: 'T', text: '不是，直接表达更好' }
    ),
    createMBTIQuestion('mbti-tf-12', '我认为诚实比圆滑更重要', 'TF',
      { trait: 'T', text: '是的，诚实是原则' },
      { trait: 'F', text: '不是，方式也很重要' }
    ),
    createMBTIQuestion('mbti-tf-13', '我更容易被他人的故事感动', 'TF',
      { trait: 'F', text: '是的，我容易共情' },
      { trait: 'T', text: '不是，我保持客观' }
    ),
    createMBTIQuestion('mbti-tf-14', '在争论中，我更关注事实正确而非感受', 'TF',
      { trait: 'T', text: '是的，事实最重要' },
      { trait: 'F', text: '不是，感受也重要' }
    ),
    createMBTIQuestion('mbti-tf-15', '我倾向于根据情况灵活处理，而非严格执行规则', 'TF',
      { trait: 'F', text: '是的，灵活性很重要' },
      { trait: 'T', text: '不是，规则应该遵守' }
    ),
    createMBTIQuestion('mbti-tf-16', '我认为批评应该直接坦率', 'TF',
      { trait: 'T', text: '是的，直接更有效' },
      { trait: 'F', text: '不是，应该委婉表达' }
    ),
    createMBTIQuestion('mbti-tf-17', '我经常为他人的处境担忧', 'TF',
      { trait: 'F', text: '是的，我关心他人' },
      { trait: 'T', text: '不是，我保持距离' }
    ),
    createMBTIQuestion('mbti-tf-18', '我认为效率比人情更重要', 'TF',
      { trait: 'T', text: '是的，效率优先' },
      { trait: 'F', text: '不是，人情也重要' }
    ),
    createMBTIQuestion('mbti-tf-19', '我倾向于支持弱者', 'TF',
      { trait: 'F', text: '是的，我同情弱者' },
      { trait: 'T', text: '不是，应该公平对待' }
    ),
    createMBTIQuestion('mbti-tf-20', '在决策时，我会优先考虑数据和逻辑', 'TF',
      { trait: 'T', text: '是的，数据驱动决策' },
      { trait: 'F', text: '不是，我会考虑价值观' }
    ),
    createMBTIQuestion('mbti-tf-21', '我认为同理心是重要的品质', 'TF',
      { trait: 'F', text: '是的，同理心很重要' },
      { trait: 'T', text: '不是，理性更重要' }
    ),
    createMBTIQuestion('mbti-tf-22', '我更喜欢客观分析而非主观感受', 'TF',
      { trait: 'T', text: '是的，客观分析更好' },
      { trait: 'F', text: '不是，感受也有价值' }
    ),
    createMBTIQuestion('mbti-tf-23', '我会为了维护关系而妥协', 'TF',
      { trait: 'F', text: '是的，关系很重要' },
      { trait: 'T', text: '不是，原则不能妥协' }
    ),
    createMBTIQuestion('mbti-tf-24', '我认为真相比感受更重要', 'TF',
      { trait: 'T', text: '是的，真相优先' },
      { trait: 'F', text: '不是，感受也重要' }
    ),

    // ==================== J-P 维度 (21题) ====================
    createMBTIQuestion('mbti-jp-1', '面对一个为期三个月的复杂项目，我的工作方式更接近哪种？', 'JP',
      { trait: 'J', text: '制定详细的项目计划，设定明确的里程碑和截止日期' },
      { trait: 'P', text: '确定大方向后，根据进展灵活调整工作节奏' }
    ),
    createMBTIQuestion('mbti-jp-2', '我的办公桌和工作空间通常呈现什么状态？', 'JP',
      { trait: 'J', text: '整洁有序，物品分类摆放，随时可以找到需要的资料' },
      { trait: 'P', text: '看似凌乱但我知道东西在哪里，保持创造性混乱' }
    ),
    createMBTIQuestion('mbti-jp-3', '安排一次重要的商务出差时，我的准备方式是什么？', 'JP',
      { trait: 'J', text: '提前制定详细行程，预订酒店和会议，准备备选方案' },
      { trait: 'P', text: '确定主要目标后，到达后再根据实际情况灵活安排' }
    ),
    createMBTIQuestion('mbti-jp-4', '在重要客户汇报前的准备工作，我通常会怎么做？', 'JP',
      { trait: 'J', text: '提前几天准备好演示文稿和发言要点，多次演练' },
      { trait: 'P', text: '整理核心观点和关键数据，临场发挥具体表述' }
    ),
    createMBTIQuestion('mbti-jp-5', '对于未来3-5年的职业发展，我的规划态度是什么？', 'JP',
      { trait: 'J', text: '有清晰的职业路径图和阶段性目标' },
      { trait: 'P', text: '有大方向但保持开放性，随机会调整' }
    ),
    createMBTIQuestion('mbti-jp-6', '我喜欢在最后期限前完成任务', 'JP',
      { trait: 'J', text: '是的，提前完成更安心' },
      { trait: 'P', text: '不是，压力下效率更高' }
    ),
    createMBTIQuestion('mbti-jp-7', '我更喜欢有明确结构和规则的工作环境', 'JP',
      { trait: 'J', text: '是的，结构让我高效' },
      { trait: 'P', text: '不是，我喜欢自由' }
    ),
    createMBTIQuestion('mbti-jp-8', '我经常在最后一刻改变计划', 'JP',
      { trait: 'P', text: '是的，我保持开放' },
      { trait: 'J', text: '不是，我坚持计划' }
    ),
    createMBTIQuestion('mbti-jp-9', '我认为规则应该被遵守', 'JP',
      { trait: 'J', text: '是的，规则很重要' },
      { trait: 'P', text: '不是，规则可以灵活' }
    ),
    createMBTIQuestion('mbti-jp-10', '我喜欢探索各种可能性，而不是快速做决定', 'JP',
      { trait: 'P', text: '是的，探索很有趣' },
      { trait: 'J', text: '不是，我倾向于快速决定' }
    ),
    createMBTIQuestion('mbti-jp-11', '我会在完成任务后才开始放松', 'JP',
      { trait: 'J', text: '是的，先工作后娱乐' },
      { trait: 'P', text: '不是，我边工作边放松' }
    ),
    createMBTIQuestion('mbti-jp-12', '我更喜欢保持选择的开放性', 'JP',
      { trait: 'P', text: '是的，开放性很重要' },
      { trait: 'J', text: '不是，我喜欢确定的事' }
    ),
    createMBTIQuestion('mbti-jp-13', '我喜欢制定长期计划并坚持执行', 'JP',
      { trait: 'J', text: '是的，计划让我安心' },
      { trait: 'P', text: '不是，我更喜欢灵活' }
    ),
    createMBTIQuestion('mbti-jp-14', '我经常在最后一刻才做决定', 'JP',
      { trait: 'P', text: '是的，我需要更多信息' },
      { trait: 'J', text: '不是，我提前做决定' }
    ),
    createMBTIQuestion('mbti-jp-15', '我认为完成比完美更重要', 'JP',
      { trait: 'P', text: '是的，完成是第一步' },
      { trait: 'J', text: '不是，我追求完美' }
    ),
    createMBTIQuestion('mbti-jp-16', '我喜欢有条理的生活方式', 'JP',
      { trait: 'J', text: '是的，条理让我高效' },
      { trait: 'P', text: '不是，我喜欢随性' }
    ),
    createMBTIQuestion('mbti-jp-17', '我经常在项目中改变方向', 'JP',
      { trait: 'P', text: '是的，我适应变化' },
      { trait: 'J', text: '不是，我坚持原计划' }
    ),
    createMBTIQuestion('mbti-jp-18', '我喜欢把事情安排妥当', 'JP',
      { trait: 'J', text: '是的，安排让我安心' },
      { trait: 'P', text: '不是，我喜欢即兴' }
    ),
    createMBTIQuestion('mbti-jp-19', '我认为计划可以随时调整', 'JP',
      { trait: 'P', text: '是的，灵活很重要' },
      { trait: 'J', text: '不是，计划应该执行' }
    ),
    createMBTIQuestion('mbti-jp-20', '我喜欢在决定前收集所有信息', 'JP',
      { trait: 'P', text: '是的，信息很重要' },
      { trait: 'J', text: '不是，我快速决定' }
    ),
    createMBTIQuestion('mbti-jp-21', '我认为截止日期很重要', 'JP',
      { trait: 'J', text: '是的，截止日期必须遵守' },
      { trait: 'P', text: '不是，可以灵活处理' }
    ),
  ],
}

// MBTI常模数据
export const mbtiNormData = {
  E: { mean: 24, sd: 8, n: 3000 },
  I: { mean: 24, sd: 8, n: 3000 },
  S: { mean: 24, sd: 8, n: 3000 },
  N: { mean: 24, sd: 8, n: 3000 },
  T: { mean: 24, sd: 8, n: 3000 },
  F: { mean: 24, sd: 8, n: 3000 },
  J: { mean: 21, sd: 7, n: 3000 },
  P: { mean: 21, sd: 7, n: 3000 },
}

export const mbtiReferences = [
  'Myers, I. B., & McCaulley, M. H. (1985). Manual: A guide to the development and use of the Myers-Briggs Type Indicator. Consulting Psychologists Press.',
  'Myers, I. B., McCaulley, M. H., Quenk, N. L., & Hammer, A. L. (1998). MBTI Manual: A guide to the development and use of the Myers-Briggs Type Indicator. Consulting Psychologists Press.',
  'Quenk, N. L. (2000). Essentials of Myers-Briggs Type Indicator assessment. John Wiley & Sons.',
  'Capraro, R. M., & Capraro, M. M. (2002). Myers-Briggs Type Indicator score reliability across studies: A meta-analytic reliability generalization study. Educational and Psychological Measurement, 62(4), 590-602.',
]
