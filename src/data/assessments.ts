import type { Assessment, AssessmentResult, Answer } from '../types'

const calculateScore = (answers: Answer[]): number => {
  return answers.reduce((sum, a) => sum + (a.value || 0), 0)
}

export const assessments: Assessment[] = [
  // ============ 人格与心理 ============
  {
    id: 'mbti-standard',
    title: 'MBTI 人格测试完整版',
    description: '基于荣格心理类型理论的经典人格测评，通过40道精心设计的题目，深度分析你的16种人格类型。',
    category: '人格心理',
    difficulty: 'standard',
    duration: 15,
    questions: [
      { id: 'mbti-1', text: '在社交聚会中，我通常更愿意主动结识新朋友，而不是只和熟人待在一起', type: 'single', options: [
        { id: 'e1', text: '完全符合，我喜欢认识新人', value: 2, trait: 'E' },
        { id: 'i1', text: '不太符合，我更喜欢熟悉的人', value: 2, trait: 'I' },
      ]},
      { id: 'mbti-2', text: '做决定时，我更依赖逻辑分析和客观事实，而非个人情感或他人感受', type: 'single', options: [
        { id: 't1', text: '是的，理性分析是我的首选', value: 2, trait: 'T' },
        { id: 'f1', text: '不是，我会考虑各方感受', value: 2, trait: 'F' },
      ]},
      { id: 'mbti-3', text: '面对截止日期，我倾向于提前规划并按计划执行，享受有条不紊的过程', type: 'single', options: [
        { id: 'j1', text: '完全正确，计划让我安心', value: 2, trait: 'J' },
        { id: 'p1', text: '不太喜欢，我更灵活随性', value: 2, trait: 'P' },
      ]},
      { id: 'mbti-4', text: '学习新技能时，我更喜欢先理解整体框架和概念，再深入细节', type: 'single', options: [
        { id: 'n1', text: '是的，我关注大局和可能性', value: 2, trait: 'N' },
        { id: 's1', text: '不是，我从具体细节开始学起', value: 2, trait: 'S' },
      ]},
      { id: 'mbti-5', text: '在团队讨论中，我习惯于先倾听思考，再发表自己的观点', type: 'single', options: [
        { id: 'i2', text: '是的，深思熟虑后再说', value: 2, trait: 'I' },
        { id: 'e2', text: '不是，我喜欢边想边说', value: 2, trait: 'E' },
      ]},
      { id: 'mbti-6', text: '当朋友向我倾诉烦恼时，我首先会提供解决方案，而非仅仅表示理解', type: 'single', options: [
        { id: 't2', text: '是的，解决问题更重要', value: 2, trait: 'T' },
        { id: 'f2', text: '不是，共情和理解优先', value: 2, trait: 'F' },
      ]},
      { id: 'mbti-7', text: '我的工作空间通常整洁有序，物品摆放位置相对固定', type: 'single', options: [
        { id: 'j2', text: '是的，井井有条让我高效', value: 2, trait: 'J' },
        { id: 'p2', text: '不是，有点乱但我知道在哪', value: 2, trait: 'P' },
      ]},
      { id: 'mbti-8', text: '阅读时，我更关注文字传达的具体信息和实际内容', type: 'single', options: [
        { id: 's2', text: '是的，我注重事实和数据', value: 2, trait: 'S' },
        { id: 'n2', text: '不是，我喜欢想象背后的含义', value: 2, trait: 'N' },
      ]},
      { id: 'mbti-9', text: '参加大型活动后，我需要独处时间来恢复精力', type: 'single', options: [
        { id: 'i3', text: '非常需要，独处是充电方式', value: 2, trait: 'I' },
        { id: 'e3', text: '不需要，活动让我更兴奋', value: 2, trait: 'E' },
      ]},
      { id: 'mbti-10', text: '在做重要决策时，我会考虑这个决定对他人的影响和感受', type: 'single', options: [
        { id: 'f3', text: '一定会，和谐很重要', value: 2, trait: 'F' },
        { id: 't3', text: '主要看逻辑和效率', value: 2, trait: 'T' },
      ]},
      { id: 'mbti-11', text: '旅行时，我更喜欢有详细的行程安排，还是随心所欲地探索？', type: 'single', options: [
        { id: 'j3', text: '详细计划让我更有安全感', value: 2, trait: 'J' },
        { id: 'p3', text: '随遇而安更有趣', value: 2, trait: 'P' },
      ]},
      { id: 'mbti-12', text: '我对抽象的理论概念和哲学思考很感兴趣', type: 'single', options: [
        { id: 'n3', text: '非常喜欢探索深层含义', value: 2, trait: 'N' },
        { id: 's3', text: '更关心实用性和应用价值', value: 2, trait: 'S' },
      ]},
      { id: 'mbti-13', text: '在会议上，我通常会在会议前准备好发言稿或要点', type: 'single', options: [
        { id: 'j4', text: '是的，准备充分才自信', value: 2, trait: 'J' },
        { id: 'p4', text: '不准备，临场发挥更好', value: 2, trait: 'P' },
      ]},
      { id: 'mbti-14', text: '我更容易记住别人的名字和面孔，还是他们说过的话？', type: 'single', options: [
        { id: 's4', text: '记住具体的信息和事实', value: 2, trait: 'S' },
        { id: 'n4', text: '记住整体印象和感觉', value: 2, trait: 'N' },
      ]},
      { id: 'mbti-15', text: '面对冲突，我倾向于直接面对并解决，还是尽量避免对抗？', type: 'single', options: [
        { id: 't4', text: '直面问题，理性解决', value: 2, trait: 'T' },
        { id: 'f4', text: '维护关系，避免伤害', value: 2, trait: 'F' },
      ]},
      { id: 'mbti-16', text: '我更喜欢独立完成工作，还是在团队中协作？', type: 'single', options: [
        { id: 'i4', text: '独立工作效率更高', value: 2, trait: 'I' },
        { id: 'e4', text: '团队合作更有活力', value: 2, trait: 'E' },
      ]},
      { id: 'mbti-17', text: '当我收到批评时，第一反应是什么？', type: 'single', options: [
        { id: 't5', text: '分析批评是否合理', value: 2, trait: 'T' },
        { id: 'f5', text: '感到受伤或难过', value: 2, trait: 'F' },
      ]},
      { id: 'mbti-18', text: '我的日程表通常是满的，有很多计划和安排', type: 'single', options: [
        { id: 'j5', text: '是的，我喜欢充实的生活', value: 2, trait: 'J' },
        { id: 'p5', text: '不，我留出灵活空间', value: 2, trait: 'P' },
      ]},
      { id: 'mbti-19', text: '我更相信直觉和灵感，还是经验和数据？', type: 'single', options: [
        { id: 'n5', text: '直觉往往是对的', value: 2, trait: 'N' },
        { id: 's5', text: '数据不会撒谎', value: 2, trait: 'S' },
      ]},
      { id: 'mbti-20', text: '在陌生环境中，我会主动观察周围并尝试融入', type: 'single', options: [
        { id: 'e5', text: '会积极适应新环境', value: 2, trait: 'E' },
        { id: 'i5', text: '会比较谨慎和观望', value: 2, trait: 'I' },
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

      const types: Record<string, { title: string; desc: string; careers: string []; strengths: string[]; weaknesses: string[]; advice: string }> = {
        'INTJ': { title: '建筑师', desc: '富有想象力和战略性的思想家，一切皆在计划之中。具有强烈的内在驱动力，追求知识和能力提升。', careers: ['软件架构师', '战略顾问', '科学研究者', '投资分析师'], strengths: ['战略思维', '独立自主', '目标导向', '深度专注'], weaknesses: ['可能显得冷漠', '过度完美主义', '难以容忍低效'], advice: '学会适当表达情感，接受不完美，培养耐心与他人沟通。适合需要深度分析和长远规划的工作。' },
        'INTP': { title: '逻辑学家', desc: '具有创造力的发明家，对知识有止不住的渴望。喜欢探索理论背后的原理，追求逻辑一致性。', careers: ['数据科学家', '哲学家', '系统分析师', '程序员'], strengths: ['逻辑分析', '创新思维', '客观公正', '好奇心强'], weaknesses: ['可能拖延', '忽视细节', '社交能量有限'], advice: '将创意付诸行动，设定明确期限，练习将复杂想法简单化表达。' },
        'ENTJ': { title: '指挥官', desc: '大胆、富有想象力且意志强大的领导者，总能找到解决问题的方法。天生具有领导魅力和组织能力。', careers: ['CEO', '管理顾问', '律师', '创业者'], strengths: ['领导力强', '决策果断', '战略视野', '高效执行'], weaknesses: ['可能过于强势', '缺乏耐心', '忽视他人感受'], advice: '发展同理心，学会倾听不同意见，给团队成员更多成长空间。' },
        'ENTP': { title: '辩论家', desc: '聪明好奇的思想者，无法抵挡智力挑战的享受。善于从多个角度看问题，喜欢打破常规。', careers: ['律师', '创意总监', '产品经理', '记者'], strengths: ['思维敏捷', '创新能力', '适应性强', '善于辩论'], weaknesses: ['可能争议性太强', '难以专注', '不喜欢常规'], advice: '学会坚持到底，尊重他人的观点，将热情转化为持续行动。' },
        'INFJ': { title: '提倡者', desc: '安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。具有深刻的洞察力和强烈的助人愿望。', careers: ['心理咨询师', '作家', 'HR总监', '非营利组织管理者'], strengths: ['洞察力强', '富有同情心', '理想主义', '坚持不懈'], weaknesses: ['容易倦怠', '过于理想化', '难以接受批评'], advice: '设立健康的边界，学会自我关怀，接受世界的不完美。' },
        'INFP': { title: '调停者', desc: '诗意、善良的利他主义者，总是热情地帮助他人追求美好。拥有丰富的内心世界和强烈的价值感。', careers: ['艺术家', '社工', '内容创作者', '心理咨询师'], strengths: ['创造力强', '真诚善良', '价值观坚定', '理解他人'], weaknesses: ['可能过于理想化', '难以处理冲突', '容易自责'], advice: '学会面对冲突，将理想转化为实际行动，建立自信表达自己。' },
        'ENFJ': { title: '主人公', desc: '富有魅力、鼓舞人心的领导者，有能力迷住听众。天生的导师和激励者，关心每个人的成长。', careers: ['培训师', '销售总监', '教师', '政治家'], strengths: ['人际能力强', '富有感染力', '乐于助人', '组织协调'], weaknesses: ['可能过度投入他人', '忽视自身需求', '难以做艰难决定'], advice: '学会说不，关注自己的需求，允许他人独立解决问题。' },
        'ENFP': { title: '竞选者', desc: '热情、有创造力、爱社交的自由精神。能看到每个人身上的闪光点，热衷于探索生活的各种可能性。', careers: ['市场营销', '记者', '创业者', '演员'], strengths: ['热情洋溢', '创造力丰富', '善于沟通', '乐观积极'], weaknesses: ['可能注意力分散', '难以做决定', '容易厌倦常规'], advice: '学会专注和坚持，将想法落实到行动，管理好时间和精力。' },
        'ISTJ': { title: '物流师', desc: '实际且注重事实的个人，可靠性不容怀疑。重视传统和责任，是值得信赖的执行者。', careers: ['会计师', '项目经理', '审计师', '军官'], strengths: ['可靠负责', '注重细节', '组织能力强', '诚实守信'], weaknesses: ['可能过于固执', '抗拒变化', '缺乏灵活性'], advice: '尝试接受新方法，培养创造性思维，学会放松对完美的要求。' },
        'ISFJ': { title: '守卫者', desc: '非常专注而温暖的守护者，时刻准备着保护所爱之人。具有强烈的服务精神和责任感。', careers: ['护士', '行政助理', '客户服务', '教师'], strengths: ['温暖体贴', '可靠忠诚', '注重细节', '支持他人'], weaknesses: ['可能过于谦逊', '难以拒绝', '害怕变化'], advice: '学会表达自己的需求，勇敢说出想法，尝试新的体验。' },
        'ESTJ': { title: '总经理', desc: '出色的管理者，在管理事情或人的方面无与伦比。重视秩序、效率和传统价值观。', careers: ['运营经理', '军官', '法官', '学校管理者'], strengths: ['组织能力强', '务实高效', '责任心强', '领导力佳'], weaknesses: ['可能过于严格', '缺乏灵活性', '难以接受非传统观点'], advice: '培养同理心，学会欣赏不同的工作方式，开放心态接受创新。' },
        'ESFJ': { title: '执政官', desc: '极有同情心，爱社交、受欢迎的人。非常关心他人的感受，努力营造和谐的环境。', careers: ['教师', '人力资源', '公关专员', '护士'], strengths: ['社交能力强', '关心他人', '合作精神', '责任感强'], weaknesses: ['可能过于在意他人评价', '难以做艰难决定', '容易忽视自己'], advice: '学会独立决策，关注自身需求，接受不能让所有人满意的事实。' },
        'ISTP': { title: '鉴赏家', desc: '大胆而实际的实验家，擅长使用各种工具。冷静理性，喜欢动手解决实际问题。', careers: ['工程师', '飞行员', '法医', '运动员'], strengths: ['动手能力强', '冷静理性', '适应性好', '问题解决者'], weaknesses: ['可能过于内向', '难以承诺', '冒险倾向'], advice: '学会表达情感，建立更深的人际连接，考虑长期规划。' },
        'ISFP': { title: '探险家', desc: '灵活而有魅力的艺术家，时刻准备着探索和体验。拥有敏锐的美感和丰富的情感世界。', careers: ['设计师', '音乐家', '厨师', '摄影师'], strengths: ['艺术天赋', '敏感细腻', '温和友善', '适应性强'], weaknesses: ['可能过于敏感', '难以面对冲突', '缺乏长期规划'], advice: '学会面对困难，制定未来目标，勇敢表达自己的想法。' },
        'ESTP': { title: '企业家', desc: '聪明、精力充沛、善于感知的人。喜欢行动和冒险，擅长应对紧急情况。', careers: ['销售代表', '运动员', '急救人员', '企业家'], strengths: ['行动力强', '适应性好', '幽默风趣', '现实导向'], weaknesses: ['可能冲动', '缺乏耐心', '难以规划长远'], advice: '学会三思而后行，培养持久性，考虑行为的长期后果。' },
        'ESFP': { title: '表演者', desc: '自发的、精力充沛的娱乐者。生活在于当下，喜欢与人互动和创造欢乐。', careers: ['演员', '活动策划', '旅游顾问', '销售'], strengths: ['热情开朗', '善于表演', '活在当下', '人缘好'], weaknesses: ['可能难以专注', '避免冲突', '缺乏深度思考'], advice: '学会深入思考，培养持续性，平衡享乐和责任。' },
      }

      const result = types[type] || types['INTJ']
      return {
        type,
        title: result.title,
        description: result.desc,
        traits: Object.entries(traits).map(([name, score]) => ({
          name,
          score,
          maxScore: 10,
          description: score >= 6 ? '强倾向' : score >= 4 ? '中等倾向' : '弱倾向'
        })),
        details: {
          strengths: result.strengths,
          weaknesses: result.weaknesses,
          careers: result.careers,
          relationships: result.advice
        },
        scores: traits,
      }
    },
  },

  {
    id: 'big-five',
    title: '大五人格测试 (OCEAN)',
    description: '心理学界公认的人格评估模型，通过20道题目测量开放性、尽责性、外向性、宜人性和神经质五个维度。',
    category: '人格心理',
    difficulty: 'standard',
    duration: 12,
    questions: [
      { id: 'bf-1', text: '我对抽象概念、哲学思考和理论探讨充满兴趣', type: 'single', options: [
        { id: 'o1', text: '非常不同意', value: 1, trait: 'O' }, { id: 'o2', text: '不同意', value: 2, trait: 'O' },
        { id: 'o3', text: '中立', value: 3, trait: 'O' }, { id: 'o4', text: '同意', value: 4, trait: 'O' },
        { id: 'o5', text: '非常同意', value: 5, trait: 'O' },
      ]},
      { id: 'bf-2', text: '我经常沉浸在自己的想象和幻想世界中', type: 'single', options: [
        { id: 'o6', text: '非常不同意', value: 1, trait: 'O' }, { id: 'o7', text: '不同意', value: 2, trait: 'O' },
        { id: 'o8', text: '中立', value: 3, trait: 'O' }, { id: 'o9', text: '同意', value: 4, trait: 'O' },
        { id: 'o10', text: '非常同意', value: 5, trait: 'O' },
      ]},
      { id: 'bf-3', text: '我喜欢尝试新的食物、音乐和文化体验', type: 'single', options: [
        { id: 'o11', text: '非常不同意', value: 1, trait: 'O' }, { id: 'o12', text: '不同意', value: 2, trait: 'O' },
        { id: 'o13', text: '中立', value: 3, trait: 'O' }, { id: 'o14', text: '同意', value: 4, trait: 'O' },
        { id: 'o15', text: '非常同意', value: 5, trait: 'O' },
      ]},
      { id: 'bf-4', text: '我做事很有条理，喜欢把东西摆放整齐', type: 'single', options: [
        { id: 'c1', text: '非常不同意', value: 1, trait: 'C' }, { id: 'c2', text: '不同意', value: 2, trait: 'C' },
        { id: 'c3', text: '中立', value: 3, trait: 'C' }, { id: 'c4', text: '同意', value: 4, trait: 'C' },
        { id: 'c5', text: '非常同意', value: 5, trait: 'C' },
      ]},
      { id: 'bf-5', text: '我能很好地遵守时间约定，很少迟到', type: 'single', options: [
        { id: 'c6', text: '非常不同意', value: 1, trait: 'C' }, { id: 'c7', text: '不同意', value: 2, trait: 'C' },
        { id: 'c8', text: '中立', value: 3, trait: 'C' }, { id: 'c9', text: '同意', value: 4, trait: 'C' },
        { id: 'c10', text: '非常同意', value: 5, trait: 'C' },
      ]},
      { id: 'bf-6', text: '我在社交场合感到自在并乐于结交新朋友', type: 'single', options: [
        { id: 'e1', text: '非常不同意', value: 1, trait: 'E' }, { id: 'e2', text: '不同意', value: 2, trait: 'E' },
        { id: 'e3', text: '中立', value: 3, trait: 'E' }, { id: 'e4', text: '同意', value: 4, trait: 'E' },
        { id: 'e5', text: '非常同意', value: 5, trait: 'E' },
      ]},
      { id: 'bf-7', text: '我在人群中说话时会感到紧张不安', type: 'single', options: [
        { id: 'e6', text: '非常不同意', value: 5, trait: 'E' }, { id: 'e7', text: '不同意', value: 4, trait: 'E' },
        { id: 'e8', text: '中立', value: 3, trait: 'E' }, { id: 'e9', text: '同意', value: 2, trait: 'E' },
        { id: 'e10', text: '非常同意', value: 1, trait: 'E' },
      ]},
      { id: 'bf-8', text: '我关心他人的感受，愿意主动提供帮助', type: 'single', options: [
        { id: 'a1', text: '非常不同意', value: 1, trait: 'A' }, { id: 'a2', text: '不同意', value: 2, trait: 'A' },
        { id: 'a3', text: '中立', value: 3, trait: 'A' }, { id: 'a4', text: '同意', value: 4, trait: 'A' },
        { id: 'a5', text: '非常同意', value: 5, trait: 'A' },
      ]},
      { id: 'bf-9', text: '我相信大多数人是善良和值得信任的', type: 'single', options: [
        { id: 'a6', text: '非常不同意', value: 1, trait: 'A' }, { id: 'a7', text: '不同意', value: 2, trait: 'A' },
        { id: 'a8', text: '中立', value: 3, trait: 'A' }, { id: 'a9', text: '同意', value: 4, trait: 'A' },
        { id: 'a10', text: '非常同意', value: 5, trait: 'A' },
      ]},
      { id: 'bf-10', text: '我容易感到焦虑、担心或情绪波动', type: 'single', options: [
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
      const traitDesc: Record<string, { high: string; low: string }> = {
        O: { high: '富有想象力，思想开明', low: '务实具体，遵循传统' },
        C: { high: '自律有序，可靠负责', low: '灵活随意，适应性强的' },
        E: { high: '外向活跃，善于社交', low: '内向沉静，独立思考' },
        A: { high: '合作友善，富有同情心', low: '竞争性强，直率坦诚' },
        N: { high: '情绪敏感，容易紧张', low: '情绪稳定，从容淡定' },
      }

      return {
        type: 'OCEAN',
        title: '大五人格分析报告',
        description: '基于国际通用的五因素模型(FFM)，全面呈现你的人格特质轮廓',
        traits: Object.entries(traits).map(([key, score]) => ({
          name: traitNames[key],
          score,
          maxScore: key === 'O' || key === 'C' ? 15 : 10,
          description: score >= (key === 'O' || key === 'C' ? 10 : 7) ? traitDesc[key].high : traitDesc[key].low
        })),
        details: {
          strengths: Object.entries(traits).filter(([, v]) => v >= 7).map(([k]) => traitDesc[k].high),
          weaknesses: Object.entries(traits).filter(([, v]) => v <= 4).map(([k]) => `可适度提升${traitNames[k]}`),
          careers: ['根据你的特质组合，适合需要' + Object.entries(traits).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k]) => traitNames[k]).join('和') + '的工作'],
          relationships: '了解大五人格有助于更好地理解自己和他人，改善人际关系和职业选择。建议定期复测以追踪人格发展的变化趋势。'
        },
        scores: traits,
      }
    },
  },

  {
    id: 'anxiety-scale',
    title: '焦虑自评量表 (SAS)',
    description: '专业心理学量表，通过10道题目评估焦虑症状的严重程度和频率，帮助你了解当前的心理状态。',
    category: '人格心理',
    difficulty: 'standard',
    duration: 8,
    questions: [
      { id: 'sas-1', text: '我感到比平常更加紧张和焦虑', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分或全部时间', value: 4 },
      ]},
      { id: 'sas-2', text: '我无缘无故地感到害怕', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分或全部时间', value: 4 },
      ]},
      { id: 'sas-3', text: '我容易心烦意乱或感到恐慌', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分或全部时间', value: 4 },
      ]},
      { id: 'sas-4', text: '我觉得我可能将要发疯', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分或全部时间', value: 4 },
      ]},
      { id: 'sas-5', text: '我感觉一切都很好，不会有不幸发生', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 4 }, { id: '2', text: '小部分时间', value: 3 },
        { id: '3', text: '相当多时间', value: 2 }, { id: '4', text: '绝大部分或全部时间', value: 1 },
      ]},
      { id: 'sas-6', text: '我手脚发抖或打颤', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分或全部时间', value: 4 },
      ]},
      { id: 'sas-7', text: '我因为头痛、颈痛和背痛而苦恼', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分或全部时间', value: 4 },
      ]},
      { id: 'sas-8', text: '我感觉容易衰弱和疲乏', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分或全部时间', value: 4 },
      ]},
      { id: 'sas-9', text: '我感到平静，容易安静坐着', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 4 }, { id: '2', text: '小部分时间', value: 3 },
        { id: '3', text: '相当多时间', value: 2 }, { id: '4', text: '绝大部分或全部时间', value: 1 },
      ]},
      { id: 'sas-10', text: '我感到心跳很快', type: 'single', options: [
        { id: '1', text: '没有或很少时间', value: 1 }, { id: '2', text: '小部分时间', value: 2 },
        { id: '3', text: '相当多时间', value: 3 }, { id: '4', text: '绝大部分或全部时间', value: 4 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const rawScore = calculateScore(answers)
      const standardScore = Math.round(rawScore * 1.25)
      let level: string
      let description: string = ''

      if (standardScore < 50) {
        level = '正常范围'
        description = '你的焦虑水平在正常范围内，心理状态良好。偶尔的焦虑是正常的情绪反应，说明你能够较好地应对日常压力。'
      } else if (standardScore < 60) {
        level = '轻度焦虑'
        description = '你存在轻度焦虑倾向。可能会在某些情况下感到紧张或不安，但这尚未严重影响日常生活。建议关注自己的情绪变化，适时进行放松训练。'
      } else if (standardScore < 70) {
        level = '中度焦虑'
        description = '你的焦虑水平达到中度，已经开始影响生活质量。建议采取积极的应对策略，如运动、冥想、规律作息等。如果症状持续，建议寻求专业心理咨询帮助。'
      } else {
        level = '重度焦虑'
        description = '你的焦虑水平较高，已经显著影响日常生活和工作。强烈建议尽快寻求专业的心理健康服务，如心理咨询师或精神科医生的帮助。焦虑是可以有效治疗的，请不要独自承受。'
      }

      return {
        type: level,
        title: `焦虑自评结果: ${level}`,
        description,
        traits: [{ name: '标准分', score: standardScore, maxScore: 100, description: `原始分: ${rawScore}/40` }],
        details: {
          strengths: standardScore < 50 ? ['情绪调节能力良好', '抗压能力强'] : standardScore < 60 ? ['具备一定的自我觉察能力'] : [],
          weaknesses: standardScore >= 60 ? ['需要关注心理健康', '建议学习焦虑管理技巧'] : [],
          careers: [],
          relationships: '⚠️ 重要提示：本测试仅供参考，不能替代专业诊断。如果你对自己的焦虑状况感到担忧，请务必咨询合格的心理健康专业人士。早期干预可以有效预防问题恶化。'
        },
        scores: { rawScore, standardScore },
      }
    },
  },

  {
    id: 'emotional-intelligence',
    title: '情绪智力测试 (EQ)',
    description: '通过12道情境题评估你在自我觉察、情绪管理、社会意识和关系管理四个维度的情商水平。',
    category: '人格心理',
    difficulty: 'standard',
    duration: 10,
    questions: [
      { id: 'eq-1', text: '当我生气时，我能意识到自己正在生气并能控制表达方式', type: 'single', options: [
        { id: '1', text: '从不 - 我通常会爆发出来', value: 1 }, { id: '2', text: '很少 - 偶尔能控制', value: 2 },
        { id: '3', text: '有时 - 看情况而定', value: 3 }, { id: '4', text: '经常 - 大部分时候可以', value: 4 },
        { id: '5', text: '总是 - 我能很好地管理愤怒', value: 5 },
      ]},
      { id: 'eq-2', text: '我能准确识别自己当下的情绪状态及其原因', type: 'single', options: [
        { id: '1', text: '从不 - 经常困惑于自己的感受', value: 1 }, { id: '2', text: '很少 - 偶尔能识别', value: 2 },
        { id: '3', text: '有时 - 需要一些时间反思', value: 3 }, { id: '4', text: '经常 - 通常能快速识别', value: 4 },
        { id: '5', text: '总是 - 对自己的情绪非常清晰', value: 5 },
      ]},
      { id: 'eq-3', text: '在面对挫折时，我能较快地从负面情绪中恢复过来', type: 'single', options: [
        { id: '1', text: '从不 - 会长时间沉浸在消极情绪中', value: 1 }, { id: '2', text: '很少 - 恢复较慢', value: 2 },
        { id: '3', text: '有时 - 取决于挫折的程度', value: 3 }, { id: '4', text: '经常 - 能较快调整', value: 4 },
        { id: '5', text: '总是 - 具有很强的韧性', value: 5 },
      ]},
      { id: 'eq-4', text: '我能察觉到他人情绪的变化，即使对方没有明说', type: 'single', options: [
        { id: '1', text: '从不 - 很难注意到他人的情绪', value: 1 }, { id: '2', text: '很少 - 偶尔能察觉', value: 2 },
        { id: '3', text: '有时 - 在熟悉的人面前可以', value: 3 }, { id: '4', text: '经常 - 对周围人的情绪敏感', value: 4 },
        { id: '5', text: '总是 - 能快速捕捉细微的情绪信号', value: 5 },
      ]},
      { id: 'eq-5', text: '在争论中，我能站在对方的立场理解其观点和感受', type: 'single', options: [
        { id: '1', text: '从不 - 只坚持自己的看法', value: 1 }, { id: '2', text: '很少 - 很难换位思考', value: 2 },
        { id: '3', text: '有时 - 努力尝试但不总是成功', value: 3 }, { id: '4', text: '经常 - 能理解对方的立场', value: 4 },
        { id: '5', text: '总是 - 天然的共情能力', value: 5 },
      ]},
      { id: 'eq-6', text: '我能用建设性的方式表达不满，而不伤害关系', type: 'single', options: [
        { id: '1', text: '从不 - 要么压抑要么爆发', value: 1 }, { id: '2', text: '很少 - 还在学习中', value: 2 },
        { id: '3', text: '有时 - 看心情和对象', value: 3 }, { id: '4', text: '经常 - 注意措辞和时机', value: 4 },
        { id: '5', text: '总是 - 擅长沟通和调解', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const selfAwareness = ((answers[0]?.value || 0) + (answers[1]?.value || 0)) / 2
      const selfManagement = answers[2]?.value || 0
      const socialAwareness = answers[3]?.value || 0
      const relationshipManagement = ((answers[4]?.value || 0) + (answers[5]?.value || 0)) / 2

      const totalScore = calculateScore(answers)
      const percentage = Math.round((totalScore / 30) * 100)

      let level: string
      let overallDesc: string

      if (percentage >= 80) {
        level = '高情商'
        overallDesc = '你展现出卓越的情绪智力！你能很好地理解和调节自己的情绪，也能敏锐地感知并回应他人的情感需求。这种能力使你在人际关系和职场中都表现出色。'
      } else if (percentage >= 60) {
        level = '中等偏上情商'
        overallDesc = '你的情绪智力处于良好水平。在多数情况下能有效管理情绪和人际关系，但在某些高压情境下还有提升空间。继续培养这方面的能力会让你受益匪浅。'
      } else if (percentage >= 40) {
        level = '中等情商'
        overallDesc = '你的情绪智力处于平均水平。有时能够觉察和管理情绪，但也可能在压力下失去控制。通过学习和练习，你可以显著提升这一重要的软技能。'
      } else {
        level = '需提升情商'
        overallDesc = '你的情绪智力有较大的提升空间。这可能意味着你在情绪识别、表达或管理方面遇到挑战。好消息是，情商可以通过后天学习和刻意练习来提高。'
      }

      return {
        type: level,
        title: `情绪智力评估: ${level}`,
        description: overallDesc,
        traits: [
          { name: '自我觉察', score: selfAwareness, maxScore: 5, description: selfAwareness >= 4 ? '优秀' : selfAwareness >= 3 ? '良好' : '待提升' },
          { name: '情绪管理', score: selfManagement, maxScore: 5, description: selfManagement >= 4 ? '优秀' : selfManagement >= 3 ? '良好' : '待提升' },
          { name: '社会觉察', score: socialAwareness, maxScore: 5, description: socialAwareness >= 4 ? '优秀' : socialAwareness >= 3 ? '良好' : '待提升' },
          { name: '关系管理', score: relationshipManagement, maxScore: 5, description: relationshipManagement >= 4 ? '优秀' : relationshipManagement >= 3 ? '良好' : '待提升' },
        ],
        details: {
          strengths: percentage >= 60 ? ['情绪觉察能力强', '善于人际交往', '抗压能力好'].slice(0, percentage >= 80 ? 3 : 2) : ['有自我提升意识'],
          weaknesses: percentage < 60 ? ['可在以下方面加强:' + [selfAwareness < 3 ? ' 自我觉察' : '', selfManagement < 3 ? ' 情绪管理' : '', socialAwareness < 3 ? ' 共情能力' : '', relationshipManagement < 3 ? ' 沟通技巧' : ''].filter(Boolean).join('')] : [],
          careers: ['人力资源经理', '心理咨询师', '团队领导', '客户服务经理', '教师', '销售总监', '公关专员', '谈判专家'],
          relationships: '💡 提升建议: 1) 每天花10分钟记录情绪日记；2) 练习"暂停6秒"法则——在反应前深呼吸；3) 主动倾听他人，不打断不评判；4) 学习非暴力沟通技巧；5) 定期进行冥想或正念练习。情商是一项可以通过持续练习不断提高的能力。'
        },
        scores: { totalScore, percentage } as Record<string, number>,
      }
    },
  },

  // ============ 职业能力 ============
  {
    id: 'holland-career',
    title: '霍兰德职业兴趣测试',
    description: '基于霍兰德RIASEC理论，通过12道题目发现你的职业兴趣类型和最适合的职业方向。',
    category: '职业能力',
    difficulty: 'standard',
    duration: 10,
    questions: [
      { id: 'ri-1', text: '我喜欢修理机械或电子设备，享受动手解决问题的过程', type: 'single', options: [
        { id: 'r1', text: '非常符合 - 我喜欢动手操作', value: 2, trait: 'R' },
        { id: 'no', text: '不太符合', value: 0 },
      ]},
      { id: 'ri-2', text: '我热衷于研究数据、分析问题并寻找规律', type: 'single', options: [
        { id: 'i1', text: '非常符合 - 我喜欢分析思考', value: 2, trait: 'I' },
        { id: 'no', text: '不太符合', value: 0 },
      ]},
      { id: 'ri-3', text: '我喜欢艺术创作、音乐、写作或其他创意活动', type: 'single', options: [
        { id: 'a1', text: '非常符合 - 我有创造力', value: 2, trait: 'A' },
        { id: 'no', text: '不太符合', value: 0 },
      ]},
      { id: 'ri-4', text: '我喜欢帮助他人、教导别人或参与社会服务', type: 'single', options: [
        { id: 's1', text: '非常符合 - 我乐于助人', value: 2, trait: 'S' },
        { id: 'no', text: '不太符合', value: 0 },
      ]},
      { id: 'ri-5', text: '我喜欢说服他人、销售产品或领导团队', type: 'single', options: [
        { id: 'e1', text: '非常符合 - 我善于影响他人', value: 2, trait: 'E' },
        { id: 'no', text: '不太符合', value: 0 },
      ]},
      { id: 'ri-6', text: '我注重细节、喜欢有条理地处理数据和文件', type: 'single', options: [
        { id: 'c1', text: '非常符合 - 我追求准确有序', value: 2, trait: 'C' },
        { id: 'no', text: '不太符合', value: 0 },
      ]},
      { id: 'ri-7', text: '比起坐在办公室，我更愿意在户外或车间工作', type: 'single', options: [
        { id: 'r2', text: '是的，我喜欢实际操作', value: 2, trait: 'R' },
        { id: 'no', text: '不是', value: 0 },
      ]},
      { id: 'ri-8', text: '我对科学新发现和技术创新很感兴趣', type: 'single', options: [
        { id: 'i2', text: '是的，我喜欢探索未知', value: 2, trait: 'I' },
        { id: 'no', text: '不是特别感兴趣', value: 0 },
      ]},
      { id: 'ri-9', text: '我在表达想法时喜欢用独特的方式而非标准答案', type: 'single', options: [
        { id: 'a2', text: '是的，我重视原创性', value: 2, trait: 'A' },
        { id: 'no', text: '不是', value: 0 },
      ]},
      { id: 'ri-10', text: '我在团队合作中通常扮演协调者或支持者的角色', type: 'single', options: [
        { id: 's2', text: '是的，我关心团队成员', value: 2, trait: 'S' },
        { id: 'no', text: '不完全是', value: 0 },
      ]},
      { id: 'ri-11', text: '我不害怕公开演讲或在人群中表达观点', type: 'single', options: [
        { id: 'e2', text: '是的，我能自信表达', value: 2, trait: 'E' },
        { id: 'no', text: '我会感到紧张', value: 0 },
      ]},
      { id: 'ri-12', text: '我会仔细检查工作以确保没有错误', type: 'single', options: [
        { id: 'c2', text: '是的，准确性很重要', value: 2, trait: 'C' },
        { id: 'no', text: '差不多就行', value: 0 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const traits: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
      answers.forEach((answer) => {
        if (answer.trait && answer.value) {
          traits[answer.trait] += answer.value
        }
      })

      const sorted = Object.entries(traits).sort((a, b) => b[1] - a[1])
      const top3 = sorted.slice(0, 3).map(([k]) => k).join('')
      const code = sorted.slice(0, 3).map(([k]) => k)

      const typeNames: Record<string, string> = { R: '实用型', I: '研究型', A: '艺术型', S: '社会型', E: '企业型', C: '常规型' }
      const careerMap: Record<string, string[]> = {
        'RIA': ['工程师', '技术员', '机械师'], 'RIE': ['技术销售', '工程管理'],
        'RIS': ['技术培训师'], 'RIC': ['质量控制'], 'RAI': ['建筑师', '设计师'],
        'RAS': ['室内设计师'], 'RAE': ['广告创意'], 'RAC': ['制图员'],
        'IRS': ['医生', '心理学家'], 'IRA': ['科学家', '研究员'],
        'ISE': ['技术咨询'], 'ISA': ['艺术家治疗师'], 'ISR': ['技术作家'],
        'AIR': ['工业设计'], 'AIS': ['艺术治疗师'], 'AES': ['公关专员'],
        'ASI': ['编辑', '翻译'], 'ASE': ['记者', '主持人'], 'ASR': ['演员'],
        'SER': ['社会工作者'], 'SEI': ['职业顾问'], 'SEA': ['人力资源经理'],
        'SIE': ['教师', '培训师'], 'SAE': ['心理咨询师'], 'SIA': ['特殊教育'],
        'EIR': ['投资银行家'], 'EIS': ['管理咨询师'], 'ESR': ['房地产经纪人'],
        'ESA': ['市场营销经理'], 'ESC': ['办公室经理'], 'ECR': ['财务分析师'],
        'CER': ['会计'], 'CES': ['行政助理'], 'CIE': ['审计师'],
        'CRS': ['法律助理'], 'CSI': ['统计学家'],
      }

      return {
        type: top3,
        title: `职业兴趣代码: ${top3}`,
        description: `你的霍兰德职业兴趣类型为 ${code.map(k => typeNames[k]).join('→')}。这个组合反映了你最主要的职业兴趣倾向。`,
        traits: sorted.map(([key, score]) => ({
          name: typeNames[key],
          score,
          maxScore: 4,
          description: score >= 4 ? '强烈兴趣' : score >= 2 ? '中等兴趣' : '轻微兴趣'
        })),
        details: {
          strengths: [`你的主导兴趣是${typeNames[code[0]]}，这表明你在相关领域会更有动力和成就感`],
          weaknesses: code.length > 0 && sorted[sorted.length - 1][1] === 0 ? [`你对${typeNames[sorted[sorted.length - 1][0]]}类型的活动兴趣较低，这在职业选择时可以考虑`] : [],
          careers: careerMap[top3] || code.slice(0, 2).flatMap(k => careerMap[k] || []).slice(0, 6),
          relationships: `💡 职业建议：根据你的霍兰德代码${top3}，你最适合的工作环境应该能够发挥你的${code.slice(0, 2).map(k => typeNames[k]).join('和')}特质。建议在职业规划时优先考虑这些领域，同时也可以尝试将不同类型的元素结合，创造独特的职业路径。记住，职业兴趣是可以发展的，保持开放心态探索新的可能性！`
        },
        scores: traits,
      }
    },
  },

  {
    id: 'leadership-style',
    title: '领导风格评估',
    description: '通过10道情境题识别你的自然领导风格——民主型、权威型、教练型还是其他？',
    category: '职业能力',
    difficulty: 'standard',
    duration: 8,
    questions: [
      { id: 'ls-1', text: '当团队成员对任务有分歧时，我通常会：', type: 'single', options: [
        { id: 'a', text: '组织讨论让大家投票决定', value: 3, trait: '民主' },
        { id: 'b', text: '听取意见后自己做出最终决策', value: 3, trait: '权威' },
        { id: 'c', text: '引导大家找到共同点达成共识', value: 3, trait: '教练' },
        { id: 'd', text: '设定明确目标让他们自行解决', value: 3, trait: '放任' },
      ]},
      { id: 'ls-2', text: '面对紧急项目截止日期，我的管理方式是：', type: 'single', options: [
        { id: 'a', text: '快速分配任务并密切跟进进度', value: 3, trait: '权威' },
        { id: 'b', text: '与团队一起制定应急计划', value: 3, trait: '民主' },
        { id: 'c', text: '信任团队能力，提供支持但不干预', value: 3, trait: '放任' },
        { id: 'd', text: '帮助成员提升效率和能力', value: 3, trait: '教练' },
      ]},
      { id: 'ls-3', text: '当团队成员犯错时，我倾向于：', type: 'single', options: [
        { id: 'a', text: '分析原因并制定预防措施', value: 3, trait: '教练' },
        { id: 'b', text: '指出错误并要求立即改正', value: 3, trait: '权威' },
        { id: 'c', text: '让团队成员自己反思和学习', value: 3, trait: '放任' },
        { id: 'd', text: '召开团队会议共同讨论解决方案', value: 3, trait: '民主' },
      ]},
      { id: 'ls-4', text: '我认为一个好的领导者最重要的是：', type: 'single', options: [
        { id: 'a', text: '有远见并能清晰传达愿景', value: 3, trait: '权威' },
        { id: 'b', text: '能激发团队成员的潜力', value: 3, trait: '教练' },
        { id: 'c', text: '能让每个人都参与决策', value: 3, trait: '民主' },
        { id: 'd', text: '给予团队充分的自主权', value: 3, trait: '放任' },
      ]},
      { id: 'ls-5', text: '在新项目启动时，我通常会：', type: 'single', options: [
        { id: 'a', text: '详细规划每个步骤并分配责任', value: 3, trait: '权威' },
        { id: 'b', text: '与核心成员头脑风暴确定方向', value: 3, trait: '民主' },
        { id: 'c', text: '说明目标后让团队自主安排', value: 3, trait: '放任' },
        { id: 'd', text: '了解每个人的发展需求再分配任务', value: 3, trait: '教练' },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const styles: Record<string, number> = { '民主': 0, '权威': 0, '教练': 0, '放任': 0 }
      answers.forEach((answer) => {
        if (answer.trait && answer.value) {
          styles[answer.trait] += answer.value
        }
      })

      const dominant = Object.entries(styles).sort((a, b) => b[1] - a[1])[0]
      const styleInfo: Record<string, { desc: string; strengths: string[]; weaknesses: string[]; bestFor: string; advice: string }> = {
        '民主': {
          desc: '你倾向于通过参与式管理来领导团队，重视每个人的意见和建议。',
          strengths: ['团队凝聚力高', '决策质量好', '员工满意度高', '创新能力强的'],
          weaknesses: ['决策速度可能较慢', '可能在危机时刻不够果断', '需要较强的沟通技巧'],
          bestFor: '创意团队、研发部门、咨询公司、教育机构',
          advice: '在需要快速决策的情境下，可以适当收权。学会区分哪些决策需要民主参与，哪些需要快速决断。'
        },
        '权威': {
          desc: '你具有清晰的愿景和方向感，擅长为团队指明道路并推动执行。',
          strengths: ['决策高效', '目标清晰', '执行力强', '适合危机处理'],
          weaknesses: ['可能压制团队成员主动性', '可能导致员工依赖性强', '可能忽视基层反馈'],
          bestFor: '初创公司、紧急项目、军事/执法机构、转型期组织',
          advice: '适当下放权力给成熟的团队成员，定期收集反馈以避免信息孤岛。培养倾听技巧，让团队感受到被尊重。'
        },
        '教练': {
          desc: '你关注团队成员的个人成长和发展，愿意投入时间帮助他们提升能力。',
          strengths: ['团队成长快', '员工忠诚度高', '知识传承好', '长期绩效优秀'],
          weaknesses: ['短期效率可能较低', '对领导者时间和精力要求高', '不适合快速变化的行业'],
          bestFor: '人才培养密集的行业（如专业服务）、知识型企业、长期项目团队',
          advice: '平衡个人发展和业务目标的关系。不要过度干预，给成员足够的实践空间。建立系统化的培养机制以减轻个人负担。'
        },
        '放任': {
          desc: '你信任团队的专业能力，倾向于给予他们最大的自主权和自由度。',
          strengths: ['激发创造力', '员工自主性高', '适合高技能团队', '管理者负担轻'],
          weaknesses: ['可能导致方向不一致', '新人可能感到迷茫', '可能出现搭便车现象'],
          bestFor: '高度专业的团队（如研究实验室）、远程工作团队、创意工作室、成熟期的创业公司',
          advice: '确保团队有清晰的共同目标和价值观。定期检查进度但不过度干预。对新成员提供更多指导和支持。建立有效的反馈机制。'
        },
      }

      const info = styleInfo[dominant[0]] || styleInfo['民主']

      return {
        type: dominant[0],
        title: `${dominant[0]}型领导风格`,
        description: info.desc,
        traits: Object.entries(styles).map(([name, score]) => ({
          name: `${name}型`,
          score,
          maxScore: 15,
          description: name === dominant[0] ? '主导风格' : score >= 9 ? '次要风格' : '较少使用'
        })),
        details: {
          strengths: info.strengths,
          weaknesses: info.weaknesses,
          careers: [info.bestFor],
          relationships: `🎯 领导力发展建议：${info.advice}\n\n💡 记住：优秀的领导者能够根据情境灵活调整领导风格。没有一种风格适用于所有情况。建议学习情境领导理论，根据团队成员的成熟度和任务的紧迫性选择最合适的领导方式。`
        },
        scores: styles,
      }
    },
  },

  // ============ 人际关系 ============
  {
    id: 'attachment-style',
    title: '依恋风格测试',
    description: '基于成人依恋理论，通过10道题目了解你在亲密关系中的依恋模式——安全型、焦虑型还是回避型？',
    category: '人际关系',
    difficulty: 'standard',
    duration: 7,
    questions: [
      { id: 'as-1', text: '我发现相对容易依赖他人，也允许他人依赖我', type: 'single', options: [
        { id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 },
        { id: '3', text: '有些符合', value: 3 }, { id: '4', text: '比较符合', value: 4 },
        { id: '5', text: '完全符合', value: 5 },
      ]},
      { id: 'as-2', text: '我担心亲密伴侣不像我爱他们那样爱我', type: 'single', options: [
        { id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 },
        { id: '3', text: '有些符合', value: 3 }, { id: '4', text: '比较符合', value: 4 },
        { id: '5', text: '完全符合', value: 5 },
      ]},
      { id: 'as-3', text: '当伴侣想要与我过于亲近时，我会感到不舒服', type: 'single', options: [
        { id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 },
        { id: '3', text: '有些符合', value: 3 }, { id: '4', text: '比较符合', value: 4 },
        { id: '5', text: '完全符合', value: 5 },
      ]},
      { id: 'as-4', text: '我对被抛弃或被拒绝有持续的担忧', type: 'single', options: [
        { id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 },
        { id: '3', text: '有些符合', value: 3 }, { id: '4', text: '比较符合', value: 4 },
        { id: '5', text: '完全符合', value: 5 },
      ]},
      { id: 'as-5', text: '我更喜欢保持一定的独立性，不想太依赖伴侣', type: 'single', options: [
        { id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 },
        { id: '3', text: '有些符合', value: 3 }, { id: '4', text: '比较符合', value: 4 },
        { id: '5', text: '完全符合', value: 5 },
      ]},
      { id: 'as-6', text: '我相信自己在关系中值得被爱和珍惜', type: 'single', options: [
        { id: '1', text: '完全不符合', value: 5 }, { id: '2', text: '不太符合', value: 4 },
        { id: '3', text: '有些符合', value: 3 }, { id: '4', text: '比较符合', value: 2 },
        { id: '5', text: '完全符合', value: 1 },
      ]},
      { id: 'as-7', text: '当伴侣不在我身边时，我会感到焦虑不安', type: 'single', options: [
        { id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 },
        { id: '3', text: '有些符合', value: 3 }, { id: '4', text: '比较符合', value: 4 },
        { id: '5', text: '完全符合', value: 5 },
      ]},
      { id: 'as-8', text: '我觉得与他人建立深度的情感连接让我不舒服', type: 'single', options: [
        { id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 },
        { id: '3', text: '有些符合', value: 3 }, { id: '4', text: '比较符合', value: 4 },
        { id: '5', text: '完全符合', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const secure = answers[0]?.value || 0 + (6 - (answers[5]?.value || 0))
      const anxious = ((answers[1]?.value || 0) + (answers[3]?.value || 0) + (answers[6]?.value || 0)) / 3
      const avoidant = ((answers[2]?.value || 0) + (answers[4]?.value || 0) + (answers[7]?.value || 0)) / 3

      let style: string
      let description: string
      let advice: string

      if (secure >= 7 && anxious < 4 && avoidant < 4) {
        style = '安全型依恋'
        description = '你在亲密关系中表现出安全稳定的依恋模式。你既能舒适地亲近他人，也能自信地独立。这种依恋模式有助于建立健康、持久的亲密关系。'
        advice = '继续保持开放和真诚的态度。你的安全型依恋是关系中的宝贵资产，可以帮助伴侣建立更安全的依恋模式。'
      } else if (anxious >= avoidant && anxious >= 4) {
        style = '焦虑型依恋'
        description = '你在亲密关系中可能表现出对被抛弃的担忧和对过度亲密的渴望。你可能经常需要确认伴侣的爱意，对关系的波动较为敏感。'
        advice = '💡 成长建议：1) 学习自我安抚技巧，减少对伴侣确认的需求；2) 建立独立的自我价值感，不完全依赖关系获得安全感；3) 与伴侣沟通你的需求和触发点；4) 考虑心理咨询以探索早期依恋经历的影响；5) 练习正念，觉察焦虑情绪而不被其控制。焦虑型依恋可以通过有意识的努力向安全型转变。'
      } else if (avoidant >= anxious && avoidant >= 4) {
        style = '回避型依恋'
        description = '你在亲密关系中可能倾向于保持距离，过度强调独立。当关系变得过于亲密时，你可能感到不适并有退缩的冲动。'
        advice = '💡 成长建议：1) 尝试小步渐进地分享更多个人感受；2) 识别回避行为的触发模式；3) 理解独立不等于情感隔离；4) 练习接受他人的关心而不感到威胁；5) 探索童年经历如何影响了你的依恋模式。回避型依恋者同样可以发展出更安全的关系模式。'
      } else {
        style = '恐惧-回避型（混乱型）'
        description = '你可能同时存在焦虑和回避的特质，在渴望亲密和恐惧亲密之间摇摆。这种矛盾的状态可能让你在关系中感到困惑和痛苦。'
        advice = '💡 强烈建议寻求专业心理咨询帮助。恐惧-回避型依恋通常与早期的创伤经历有关，专业人士的支持对于理解和改变这一模式非常重要。你值得拥有安全、健康的亲密关系。'
      }

      return {
        type: style,
        title: `依恋风格: ${style}`,
        description,
        traits: [
          { name: '安全维度', score: Math.round(secure), maxScore: 10, description: secure >= 7 ? '安全稳定' : '有待加强' },
          { name: '焦虑维度', score: Math.round(anxious), maxScore: 5, description: anxious < 3 ? '低焦虑' : anxious < 4 ? '中度焦虑' : '高焦虑' },
          { name: '回避维度', score: Math.round(avoidant), maxScore: 5, description: avoidant < 3 ? '低回避' : avoidant < 4 ? '中度回避' : '高回避' },
        ],
        details: {
          strengths: style === '安全型依恋' ? ['情感稳定性好', '信任能力强', '能平衡亲密与独立'] : ['有自我觉察能力', '愿意了解自己的依恋模式'],
          weaknesses: style !== '安全型依恋' ? ['依恋模式可能影响关系质量'] : [],
          careers: [],
          relationships: advice
        },
        scores: { secure, anxious, avoidant },
      }
    },
  },

  {
    id: 'communication-style',
    title: '沟通风格评估',
    description: '识别你的主要沟通风格——分析型、表达型、温和型还是驱动型？以及如何优化你的沟通效果。',
    category: '人际关系',
    difficulty: 'standard',
    duration: 8,
    questions: [
      { id: 'cs-1', text: '在做重要决定前，我通常会收集大量数据和信息进行分析', type: 'single', options: [
        { id: '1', text: '总是这样，没有数据我不安心', value: 5, trait: '分析型' },
        { id: '2', text: '经常这样做', value: 4, trait: '分析型' },
        { id: '3', text: '有时会，看情况', value: 3, trait: '中立' },
        { id: '4', text: '很少，我更相信直觉', value: 2, trait: '表达型' },
        { id: '5', text: '从不，直觉是我的指南针', value: 1, trait: '表达型' },
      ]},
      { id: 'cs-2', text: '在会议或社交场合中，我是那个说话最多的人之一', type: 'single', options: [
        { id: '1', text: '是的，我喜欢表达观点', value: 5, trait: '表达型' },
        { id: '2', text: '经常是', value: 4, trait: '表达型' },
        { id: '3', text: '看话题和氛围', value: 3, trait: '中立' },
        { id: '4', text: '一般不会', value: 2, trait: '温和型' },
        { id: '5', text: '我更喜欢倾听', value: 1, trait: '温和型' },
      ]},
      { id: 'cs-3', text: '当有人提出一个我认为错误的观点时，我会：', type: 'single', options: [
        { id: '1', text: '直接指出错误并提供正确信息', value: 5, trait: '驱动型' },
        { id: '2', text: '委婉地提出疑问引导对方思考', value: 4, trait: '分析型' },
        { id: '3', text: '先肯定对方的想法再补充我的看法', value: 3, trait: '温和型' },
        { id: '4', text: '用热情的方式分享我的不同见解', value: 2, trait: '表达型' },
      ]},
      { id: 'cs-4', text: '我认为在沟通中最重要的是：', type: 'single', options: [
        { id: '1', text: '准确性和事实依据', value: 5, trait: '分析型' },
        { id: '2', text: '效率和结果导向', value: 5, trait: '驱动型' },
        { id: '3', text: '和谐的氛围和感受', value: 5, trait: '温和型' },
        { id: '4', text: '创意和感染力', value: 5, trait: '表达型' },
      ]},
      { id: 'cs-5', text: '当我不同意团队的决定时，我通常会：', type: 'single', options: [
        { id: '1', text: '坚持己见直到说服所有人', value: 5, trait: '驱动型' },
        { id: '2', text: '提出替代方案供大家考虑', value: 4, trait: '分析型' },
        { id: '3', text: '私下表达顾虑，公开表示支持', value: 3, trait: '温和型' },
        { id: '4', text: '尝试用有趣的方式重新阐述我的观点', value: 2, trait: '表达型' },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const styles: Record<string, number> = { '分析型': 0, '表达型': 0, '温和型': 0, '驱动型': 0 }
      answers.forEach((answer) => {
        if (answer.trait && answer.value) {
          styles[answer.trait] += answer.value
        }
      })

      const dominant = Object.entries(styles).sort((a, b) => b[1] - a[1])[0]
      const styleDetails: Record<string, { desc: string; strengths: string[]; challenges: string[]; tips: string }> = {
        '分析型': {
          desc: '你是理性、逻辑驱动的沟通者。你喜欢用数据和事实说话，注重准确性和细节。在讨论中你倾向于深思熟虑后再发言。',
          strengths: ['逻辑清晰', '论证有力', '可靠可信', '善于解决问题'],
          challenges: ['可能显得冷漠或疏远', '过度关注细节而忽略大局', '决策可能较慢'],
          tips: '💡 沟通优化：1) 在陈述事实前先建立情感连接；2) 学会用故事和数据相结合的方式；3) 给出结论摘要后再展开细节；4) 注意非语言沟通的表达；5) 适时表达对他人的认可和赞赏。'
        },
        '表达型': {
          desc: '你是充满活力和热情的沟通者。你喜欢与人互动，善于用生动的方式传达想法。你的乐观和创造力能感染周围的人。',
          strengths: ['富有感染力', '思维活跃', '善于激励他人', '适应性强'],
          challenges: ['可能跳跃性太强', '有时不够专注细节', '可能打断他人'],
          tips: '💡 沟通优化：1) 练习积极倾听，让对方说完；2) 重要事项用书面形式确认；3) 注意控制语速和音量；4) 给逻辑型的人足够的数据支撑；5) 学会在合适的时候收敛能量。'
        },
        '温和型': {
          desc: '你是体贴、友善的沟通者。你重视和谐的人际关系，善于倾听和支持他人。在冲突中你倾向于寻求共识而非对抗。',
          strengths: ['善于倾听', '同理心强', '营造和谐氛围', '值得信赖'],
          challenges: ['可能难以直接表达反对意见', '可能被视为缺乏主见', '可能过度迁就他人'],
          tips: '💡 沟通优化：1) 练习坚定而礼貌地表达不同意见；2) 不要把冲突等同于关系破裂；3) 提前准备关键对话的内容；4) 学会说"不"的艺术；5) 相信你的声音和价值。'
        },
        '驱动型': {
          desc: '你是目标导向、行动迅速的沟通者。你重视效率和结果，喜欢直截了当地交流。在压力下你能保持冷静并推动事情向前发展。',
          strengths: ['高效直接', '目标明确', '抗压能力强', '决策果断'],
          challenges: ['可能显得强势或急躁', '可能忽略他人的感受', '可能缺乏耐心'],
          tips: '💡 沟通优化：1) 在进入主题前花时间建立关系；2) 练习询问开放式问题；3) 对他人的贡献给予认可；4) 学会欣赏不同的工作节奏；5) 有意识地放慢语速，给对方反应时间。'
        },
      }

      const detail = styleDetails[dominant[0]] || styleDetails['分析型']

      return {
        type: dominant[0],
        title: `主导沟通风格: ${dominant[0]}`,
        description: detail.desc,
        traits: Object.entries(styles).map(([name, score]) => ({
          name,
          score,
          maxScore: 20,
          description: name === dominant[0] ? '主导风格' : score >= 12 ? '次要风格' : '较少使用'
        })),
        details: {
          strengths: detail.strengths,
          weaknesses: detail.challenges,
          careers: ['任何需要频繁沟通的职业都可以从了解自身沟通风格中受益'],
          relationships: detail.tips
        },
        scores: styles,
      }
    },
  },

  // ============ 认知思维 ============
  {
    id: 'learning-style',
    title: '学习风格测评',
    description: '通过VARK模型识别你的主要学习偏好——视觉型、听觉型、读写型还是动觉型？帮助你找到最高效的学习方法。',
    category: '认知思维',
    difficulty: 'lite',
    duration: 6,
    questions: [
      { id: 'ls-1', text: '学习新概念时，我最有效的方式是：', type: 'single', options: [
        { id: 'v', text: '看图表、流程图或视频演示', value: 3, trait: '视觉型' },
        { id: 'a', text: '听讲解或参加讨论', value: 3, trait: '听觉型' },
        { id: 'r', text: '阅读教材或做笔记', value: 3, trait: '读写型' },
        { id: 'k', text: '动手实践或模拟操作', value: 3, trait: '动觉型' },
      ]},
      { id: 'ls-2', text: '当我需要记住一串信息时，我会：', type: 'single', options: [
        { id: 'v', text: '在脑海中形成图像或思维导图', value: 3, trait: '视觉型' },
        { id: 'a', text: '大声朗读或自言自语复述', value: 3, trait: '听觉型' },
        { id: 'r', text: '写下来反复阅读', value: 3, trait: '读写型' },
        { id: 'k', text: '用身体动作或手势辅助记忆', value: 3, trait: '动觉型' },
      ]},
      { id: 'ls-3', text: '组装新家具或设备时，我更喜欢：', type: 'single', options: [
        { id: 'v', text: '看着图纸一步步对照', value: 3, trait: '视觉型' },
        { id: 'a', text: '请人边说步骤边指导', value: 3, trait: '听觉型' },
        { id: 'r', text: '仔细阅读说明书', value: 3, trait: '读写型' },
        { id: 'k', text: '直接动手试错摸索', value: 3, trait: '动觉型' },
      ]},
      { id: 'ls-4', text: '在课堂上，我最容易分心的情况是：', type: 'single', options: [
        { id: 'v', text: '只有口头讲授没有视觉辅助', value: 3, trait: '视觉型' },
        { id: 'a', text: '只有文字材料没有讲解', value: 3, trait: '听觉型' },
        { id: 'r', text: '只有图片没有文字说明', value: 3, trait: '读写型' },
        { id: 'k', text: '长时间坐着不动', value: 3, trait: '动觉型' },
      ]},
      { id: 'ls-5', text: '给别人解释一个复杂问题时，我倾向于：', type: 'single', options: [
        { id: 'v', text: '画图或示意图来说明', value: 3, trait: '视觉型' },
        { id: 'a', text: '口述解释并举例', value: 3, trait: '听觉型' },
        { id: 'r', text: '写邮件或文档详细说明', value: 3, trait: '读写型' },
        { id: 'k', text: '用实物演示或角色扮演', value: 3, trait: '动觉型' },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const styles: Record<string, number> = { '视觉型': 0, '听觉型': 0, '读写型': 0, '动觉型': 0 }
      answers.forEach((answer) => {
        if (answer.trait && answer.value) {
          styles[answer.trait] += answer.value
        }
      })

      const sorted = Object.entries(styles).sort((a, b) => b[1] - a[1])
      const primary = sorted[0]
      const secondary = sorted[1]

      const styleTips: Record<string, { studyMethods: string[]; environment: string; advice: string }> = {
        '视觉型': {
          studyMethods: ['使用颜色编码的笔记', '制作思维导图', '观看教学视频', '使用图表和流程图', '创建可视化记忆卡'],
          environment: '整洁有序的学习空间，充足的光线，白板或大纸张用于画图',
          advice: '作为视觉学习者，你通过"看"来学习效果最好。尽量将所有信息转化为视觉形式——画出来、标记颜色、制作图表。在学习时使用荧光笔突出重点，将抽象概念具象化。'
        },
        '听觉型': {
          studyMethods: ['参加学习小组讨论', '录制并回听讲座', '使用有声读物', '大声朗读重点内容', '向他人讲解所学内容'],
          environment: '安静或有背景音乐的环境，可以自由说话的空间，录音设备',
          advice: '作为听觉学习者，你通过"听"来学习效果最好。尽可能多地使用音频资源——播客、有声书、讲解视频。尝试费曼学习法：向假想的听众解释你学到的内容。'
        },
        '读写型': {
          studyMethods: ['阅读教科书和文章', '整理详细的笔记和大纲', '撰写学习总结', '做练习题和测验', '使用列表和清单'],
          environment: '安静的环境，充足的阅读和书写空间，舒适的座椅和书桌',
          advice: '作为读写学习者，传统的阅读和书写方式最适合你。这是学校最常使用的教学模式，所以你可能在学校表现不错。继续利用文字的力量——写笔记、列大纲、做总结。'
        },
        '动觉型': {
          studyMethods: ['动手实验和实践操作', '使用模型和教具', '角色扮演和模拟', '在学习时走动或使用解压玩具', '将知识与实际应用联系起来'],
          environment: '可以活动的空间，实验器材或工具，可操作的模型',
          advice: '作为动觉学习者，你需要通过"做"来学习。长时间静坐会让你效率下降。尝试站立学习、使用解压球、或者边走边复习。尽可能寻找实践机会——实验室、实习、实地考察。'
        },
      }

      const tip = styleTips[primary[0]] || styleTips['视觉型']

      return {
        type: primary[0],
        title: `主要学习风格: ${primary[0]}`,
        description: `你的主导学习风格是${primary[0]}，次要风格是${secondary[0]}。这意味着你主要通过${primary[0].replace('型', '')}通道获取和处理信息最为高效。`,
        traits: sorted.map(([name, score]) => ({
          name,
          score,
          maxScore: 15,
          description: name === primary[0] ? '主导风格' : name === secondary[0] ? '次要风格' : '辅助风格'
        })),
        details: {
          strengths: [`${primary[0]}学习效率最高`, `可通过${secondary[0]}方式辅助强化`],
          weaknesses: [`纯${sorted[sorted.length - 1][0].replace('型', '')}输入的学习方式效率较低`],
          careers: ['了解自己的学习风格有助于选择适合的教育方式和职业培训路径'],
          relationships: `📚 高效学习策略推荐：\n\n最佳学习方法：${tip.studyMethods.join('、')}\n\n理想学习环境：${tip.environment}\n\n${tip.advice}\n\n💡 提示：大多数人都是多模态学习者，可以结合多种学习方式以达到最佳效果。`
        },
        scores: styles,
      }
    },
  },

  {
    id: 'critical-thinking',
    title: '批判性思维评估',
    description: '通过10道情境题评估你的批判性思维能力，包括分析、推理、评估和自我校正等核心技能。',
    category: '认知思维',
    difficulty: 'expert',
    duration: 10,
    questions: [
      { id: 'ct-1', text: '看到一篇震惊的新闻标题后，我的第一反应通常是：', type: 'single', options: [
        { id: 'a', text: '立刻转发分享给朋友', value: 1 },
        { id: 'b', text: '先查看来源是否可靠', value: 5 },
        { id: 'c', text: '搜索是否有其他报道佐证', value: 4 },
        { id: 'd', text: '看看评论区大家的看法', value: 2 },
      ]},
      { id: 'ct-2', text: '当专家意见与我的常识相悖时，我会：', type: 'single', options: [
        { id: 'a', text: '坚持自己的判断，专家也可能错', value: 2 },
        { id: 'b', text: '无条件相信专家的权威', value: 1 },
        { id: 'c', text: '查找证据和数据进行验证', value: 5 },
        { id: 'd', text: '看大多数人的立场', value: 3 },
      ]},
      { id: 'ct-3', text: '在讨论争议性话题时，我能够：', type: 'single', options: [
        { id: 'a', text: '清楚表达自己的论点和证据', value: 5 },
        { id: 'b', text: '理解并准确重述对立方的观点', value: 5 },
        { id: 'c', text: '找出双方论点中的逻辑漏洞', value: 4 },
        { id: 'd', text: '以上都能做到', value: 5 },
      ]},
      { id: 'ct-4', text: '我发现自己曾经持有的某个观点是错误的时，我会：', type: 'single', options: [
        { id: 'a', text: '欣然接受并更新认知', value: 5 },
        { id: 'b', text: '感到有些尴尬但会改正', value: 4 },
        { id: 'c', text: '找理由为自己辩护', value: 2 },
        { id: 'd', text: '尽量避免谈论这个话题', value: 1 },
      ]},
      { id: 'ct-5', text: '" correlation does not imply causation " 这句话的意思是：', type: 'single', options: [
        { id: 'a', text: '相关性不能证明因果关系', value: 5 },
        { id: 'b', text: '有关系就一定有原因', value: 1 },
        { id: 'c', text: '统计数据都是骗人的', value: 1 },
        { id: 'd', text: '不确定这是什么意思', value: 2 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const totalScore = calculateScore(answers)
      const percentage = Math.round((totalScore / 25) * 100)

      let level: string
      let description: string = ''

      if (percentage >= 80) {
        level = '卓越的批判性思维者'
        description = '你展现出卓越的批判性思维能力！你能够客观分析信息，识别偏见和谬误，并在面对相反证据时修正自己的观点。这是一种宝贵的认知能力，在信息爆炸的时代尤为重要。'
      } else if (percentage >= 60) {
        level = '良好的批判性思维者'
        description = '你具备良好的批判性思维基础。在多数情况下能够进行理性分析和独立判断，但在某些情况下可能受到情绪或既有信念的影响。继续练习将使你的思维能力更加敏锐。'
      } else if (percentage >= 40) {
        level = '发展中批判性思维者'
        description = '你的批判性思维能力处于发展阶段。你已经具备一些基本的分析意识，但在系统性思考和认知偏差识别方面还有提升空间。批判性思维是一项可以通过学习和练习不断提高的技能。'
      } else {
        level = '需加强批判性思维训练'
        description: '你的批判性思维能力有较大的提升空间。这可能意味着你更容易接受表面信息，或受情绪和群体影响较大。好消息是，每个人都可以通过刻意练习来显著提高批判性思维能力。'
      }

      return {
        type: level,
        title: `批判性思维水平: ${level}`,
        description,
        traits: [{ name: '综合得分', score: percentage, maxScore: 100, description: `${totalScore}/25 分` }],
        details: {
          strengths: percentage >= 60 ? ['信息辨别能力强', '逻辑推理能力佳', '开放心态'] : ['有自我提升的意识'],
          weaknesses: percentage < 60 ? ['可在以下方面加强: 信息源验证、逻辑谬误识别、认知偏差觉察、情绪对判断的影响'] : [],
          careers: ['科学研究者', '新闻记者', '法官/律师', '政策分析师', '数据科学家', '战略顾问', '质量管理', '投资分析师'],
          relationships: `🧠 批判性思维提升计划：

1️⃣ 信息素养：
   • 养成检查信息来源的习惯（作者资质、发布平台、引用来源）
   • 使用横向阅读法：同时打开多个标签页对比同一事件的不同报道
   • 了解常见的误导性信息手法（断章取义、 cherry-picking 数据等）

2️⃣ 逻辑训练：
   • 学习基本的逻辑谬误（稻草人、滑坡、虚假两难、人身攻击等）
   • 练习识别日常对话和新闻中的逻辑漏洞
   • 学习基础的概率和统计学知识

3️⃣ 元认知练习：
   • 定期反思：我为什么会持有这个观点？有什么证据支持？
   • 寻找反驳自己观点的证据（钢铁人原则）
   • 接受"我可能是错的"这种可能性

4️⃣ 推荐资源：
   • 书籍《思考，快与慢》- 丹尼尔·卡尼曼
   • 书籍《超越感觉》- Vincent Ruggiero
   • 课程：Critical Thinking (Duke University on Coursera)`
        },
        scores: { totalScore, percentage },
      }
    },
  },

  // ============ 健康与生活方式 ============
  {
    id: 'stress-management',
    title: '压力应对方式评估',
    description: '识别你的主要压力应对策略——问题导向、情绪导向、社会支持还是回避型？了解你的应对模式有助于更好地管理压力。',
    category: '健康生活',
    difficulty: 'lite',
    duration: 6,
    questions: [
      { id: 'sm-1', text: '当面临重大压力时，我首先会：', type: 'single', options: [
        { id: 'a', text: '列出可行的解决方案并逐一尝试', value: 5, trait: '问题导向' },
        { id: 'b', text: '找人倾诉或发泄情绪', value: 5, trait: '情绪导向' },
        { id: 'c', text: '转移注意力做别的事情', value: 5, trait: '回避型' },
        { id: 'd', text: '向朋友或家人求助', value: 5, trait: '社会支持' },
      ]},
      { id: 'sm-2', text: '工作压力大时，我通常会：', type: 'single', options: [
        { id: 'a', text: '分析原因并制定改进计划', value: 5, trait: '问题导向' },
        { id: 'b', text: '运动或听音乐放松', value: 5, trait: '情绪导向' },
        { id: 'c', text: '暂时搁置希望问题自动消失', value: 5, trait: '回避型' },
        { id: 'd', text: '和同事讨论分担压力', value: 5, trait: '社会支持' },
      ]},
      { id: 'sm-3', text: '面对无法改变的困境（如亲人离世），我会：', type: 'single', options: [
        { id: 'a', text: '研究如何最好地适应当前情况', value: 5, trait: '问题导向' },
        { id: 'b', text: '允许自己悲伤并寻求心理支持', value: 5, trait: '情绪导向' },
        { id: 'c', text: '忙于其他事务以避免想起', value: 5, trait: '回避型' },
        { id: 'd', text: '依靠亲友网络获得支持', value: 5, trait: '社会支持' },
      ]},
      { id: 'sm-4', text: '考试或面试前的紧张，我通过以下方式缓解：', type: 'single', options: [
        { id: 'a', text: '充分准备和模拟练习', value: 5, trait: '问题导向' },
        { id: 'b', text: '深呼吸和正念冥想', value: 5, trait: '情绪导向' },
        { id: 'c', text: '看电视或玩游戏分散注意', value: 5, trait: '回避型' },
        { id: 'd', text: '和朋友聊天减压', value: 5, trait: '社会支持' },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const strategies: Record<string, number> = { '问题导向': 0, '情绪导向': 0, '回避型': 0, '社会支持': 0 }
      answers.forEach((answer) => {
        if (answer.trait && answer.value) {
          strategies[answer.trait] += answer.value
        }
      })

      const dominant = Object.entries(strategies).sort((a, b) => b[1] - a[1])[0]
      const strategyInfo: Record<string, { desc: string; effectiveness: string; whenGood: string; whenBad: string; improvement: string }> = {
        '问题导向': {
          desc: '你倾向于直面问题，通过分析和行动来解决压力源。这是一种积极主动且通常有效的应对方式。',
          effectiveness: '★★★★★ 高效',
          whenGood: '适用于可以控制和改变的压力源（如工作量、技能不足、人际冲突）',
          whenBad: '当压力源无法控制时（如亲人离世、经济衰退），过度的问题导向可能导致挫败感',
          improvement: '学会区分可控和不可控的因素。对于不可控的情况，转向情绪调节和接纳。练习"放下控制"的智慧。'
        },
        '情绪导向': {
          desc: '你倾向于通过调节情绪和管理感受来应对压力。你重视心理健康和内在平衡。',
          effectiveness: '★★★★☆ 有效',
          whenGood: '适用于需要情绪处理的情境（如丧失、挫折），有助于恢复心理平衡',
          whenBad: '如果只关注情绪而不采取行动，可能导致问题持续存在或恶化',
          improvement: '将情绪调节与问题解决结合起来。先用情绪技巧平复心情，然后冷静分析问题。'
        },
        '社会支持': {
          desc: '你倾向于通过寻求和利用人际关系来应对压力。你知道何时需要帮助，并且愿意向他人敞开。',
          effectiveness: '★★★★☆ 有效',
          whenGood: '适用于大多数压力情境，特别是当你感到孤独或不知所措时',
          whenBad: '过度依赖他人可能导致自主性降低，或给支持者带来负担',
          improvement: '建立一个多元化的支持网络（朋友、家人、同事、专业人士）。同时也培养独立应对的能力。'
        },
        '回避型': {
          desc: '你倾向于通过逃避或转移注意力来应对压力。这种方式可以在短期内缓解不适感。',
          effectiveness: '★★☆☆☆ 效果有限',
          whenGood: '在极度疲惫或需要短暂休息时，暂时的回避可以让身心得到恢复',
          whenBad: '长期或习惯性的回避会导致问题积累，最终可能以更大的形式爆发',
          improvement: '将回避作为临时策略而非默认选项。给自己设定"逃避期限"，到期后必须面对问题。逐步增加正面接触压力源的勇气。'
        },
      }

      const info = strategyInfo[dominant[0]] || strategyInfo['问题导向']

      return {
        type: dominant[0],
        title: `主要应对策略: ${dominant[0]}`,
        description: info.desc,
        traits: Object.entries(strategies).map(([name, score]) => ({
          name,
          score,
          maxScore: 20,
          description: name === dominant[0] ? '首选策略' : score >= 10 ? '辅助策略' : '较少使用'
        })),
        details: {
          strengths: [info.effectiveness],
          weaknesses: [info.whenBad],
          careers: [],
          relationships: `🎯 压力管理优化建议：

✅ 你的优势：${info.whenGood}

⚠️ 需要注意：${info.whenBad}

📈 提升方向：${info.improvement}

💡 全面压力管理策略：
1. 建立"压力工具箱"：包含至少三种不同的应对方式
2. 识别你的压力信号（身体、情绪、行为）
3. 练习正念和冥想（每天10分钟）
4. 保持规律运动（每周3次，每次30分钟）
5. 维护健康的睡眠习惯（7-9小时）
6. 培养至少一个不带生产力的兴趣爱好
7. 必要时寻求专业心理健康支持`
        },
        scores: strategies,
      }
    },
  },

  {
    id: 'creativity-test',
    title: '创造力潜能评估',
    description: '通过8道题目评估你的创造性思维潜能，包括发散思维、联想能力和创新倾向等方面。',
    category: '认知思维',
    difficulty: 'standard',
    duration: 7,
    questions: [
      { id: 'cr-1', text: '我看到日常物品时会想到它的新用途', type: 'single', options: [
        { id: '1', text: '从不 - 物品就是用来做原本用途的', value: 1 },
        { id: '2', text: '偶尔会有这样的想法', value: 2 },
        { id: '3', text: '经常能想到新的用法', value: 3 },
        { id: '4', text: '总是 - 我的脑洞很大', value: 4 },
        { id: '5', text: ' constantly - 创意源源不断', value: 5 },
      ]},
      { id: 'cr-2', text: '我喜欢问"如果...会怎样？"这类假设性问题', type: 'single', options: [
        { id: '1', text: '从不 - 我关注现实', value: 1 },
        { id: '2', text: '很少', value: 2 },
        { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 },
        { id: '5', text: '总是 - 这是我的思维方式', value: 5 },
      ]},
      { id: 'cr-3', text: '在面对难题时，我倾向于：', type: 'single', options: [
        { id: 'a', text: '按照已知的方法解决', value: 1 },
        { id: 'b', text: '尝试几种常规方案', value: 2 },
        { id: 'c', text: '寻找创新的解决思路', value: 4 },
        { id: 'd', text: '从完全不同的角度重新定义问题', value: 5 },
      ]},
      { id: 'cr-4', text: '我对艺术、音乐、文学等创意表达感兴趣', type: 'single', options: [
        { id: '1', text: '完全不感兴趣', value: 1 },
        { id: '2', text: '有一点兴趣', value: 2 },
        { id: '3', text: '比较感兴趣', value: 3 },
        { id: '4', text: '很感兴趣', value: 4 },
        { id: '5', text: '这是我生活的重要组成部分', value: 5 },
      ]},
      { id: 'cr-5', text: '我在做白日梦或发呆时常有有趣的灵感', type: 'single', options: [
        { id: '1', text: '从不 - 我很少发呆', value: 1 },
        { id: '2', text: '偶尔', value: 2 },
        { id: '3', text: '有时', value: 3 },
        { id: '4', text: '经常', value: 4 },
        { id: '5', text: '总是 - 灵感随时出现', value: 5 },
      ]},
    ],
    resultCalculator: (answers: Answer[]): AssessmentResult => {
      const totalScore = calculateScore(answers)
      const percentage = Math.round((totalScore / 25) * 100)

      let level: string
      let description: string = ''

      if (percentage >= 80) {
        level = '高创造力潜能'
        description = '你展现出极高的创造力潜能！你的思维灵活、想象力丰富，能够从多个角度看问题并提出新颖的想法。这种能力在设计、艺术、创新、创业等领域尤其有价值。'
      } else if (percentage >= 60) {
        level = '良好创造力'
        description: '你具有良好的创造力和创新思维。虽然你可能不是每时每刻都在产生新想法，但你能够在需要时调动创造性思维来解决问题。'
      } else if (percentage >= 40) {
        level = '中等创造力'
        description = '你的创造力处于平均水平。你有一定的想象力和发散思维能力，但在某些情况下可能更倾向于遵循传统的方法和思路。'
      } else {
        level = '待开发的创造力'
        description: '你的创造力还有很大的开发空间。好消息是，创造力不是天赋固定的，而是可以通过练习和环境刺激来培养的能力。每个人都有创造性的潜力！'
      }

      return {
        type: level,
        title: `创造力评估: ${level}`,
        description,
        traits: [
          { name: '发散思维', score: ((answers[0]?.value || 0) + (answers[2]?.value || 0)) / 2, maxScore: 5, description: '' },
          { name: '想象能力', score: ((answers[1]?.value || 0) + (answers[4]?.value || 0)) / 2, maxScore: 5, description: '' },
          { name: '审美兴趣', score: answers[3]?.value || 0, maxScore: 5, description: '' },
        ],
        details: {
          strengths: percentage >= 60 ? ['思维灵活', '想象力丰富', '敢于突破常规'].slice(0, percentage >= 80 ? 3 : 2) : ['有提升创造力的意愿'],
          weaknesses: percentage < 60 ? ['可以尝试更多创意练习'] : [],
          careers: ['设计师', '艺术家', '作家', '产品经理', '创业者', '研究员', '广告创意', '游戏设计师', '建筑师', '导演'],
          relationships: `🎨 创造力提升指南：

🔥 日常练习：
• 每天记录3个"如果..."的想法
• SCAMPER技法：替代、合并、改编、修改、另用、消除、重排
• 随机词联想法：随机选一个词，强行将它与当前问题联系起来
• 思维导图练习（每天一个主题）

🌱 环境塑造：
• 接触不同领域的知识和人群
• 参观美术馆、博物馆、科技展
• 阅读科幻小说或诗歌
• 学习一项新的艺术技能（绘画、乐器、手工）

🧠 心态调整：
• 接受"坏主意"——很多好主意最初看起来很蠢
• 设定"疯狂想法时间"——不允许评判，只追求数量
• 保持好奇心，像孩子一样提问
• 允许自己无聊——创造力往往在无聊时涌现

💡 记住：创造力就像肌肉，越练越强！`
        },
        scores: { totalScore, percentage },
      }
    },
  },
]

export const getAssessmentById = (id: string): Assessment | undefined => {
  return assessments.find((a) => a.id === id)
}

export const getAllCategories = (): string[] => {
  return [...new Set(assessments.map((a) => a.category))]
}

export const getAssessmentsByCategory = (category: string): Assessment[] => {
  return assessments.filter((a) => a.category === category)
}
