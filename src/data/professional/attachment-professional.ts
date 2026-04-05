import type { ProfessionalQuestionSet } from '../../types'

const createECRQuestion = (
  id: string,
  text: string,
  subscale: 'anxiety' | 'avoidance',
  reverseScored: boolean = false
) => ({
  id,
  text,
  type: 'scale' as const,
  subscale,
  reverseScored,
  options: [
    { id: '1', text: '非常不同意', value: 1 },
    { id: '2', text: '不同意', value: 2 },
    { id: '3', text: '有点不同意', value: 3 },
    { id: '4', text: '中立', value: 4 },
    { id: '5', text: '有点同意', value: 5 },
    { id: '6', text: '同意', value: 6 },
    { id: '7', text: '非常同意', value: 7 },
  ],
})

export const ecrProfessionalQuestions: ProfessionalQuestionSet = {
  normal: [
    createECRQuestion('ecr-a-1', '我担心会被伴侣抛弃', 'anxiety'),
    createECRQuestion('ecr-a-3', '我担心伴侣不像我关心他/她那样关心我', 'anxiety'),
    createECRQuestion('ecr-a-5', '我渴望与伴侣非常亲密，这有时会让他/她感到害怕', 'anxiety'),
    createECRQuestion('ecr-a-7', '我担心没有伴侣我就无法存在', 'anxiety'),
    createECRQuestion('ecr-a-9', '当伴侣不在我身边时，我担心他/她可能对别人感兴趣', 'anxiety'),
    createECRQuestion('ecr-a-11', '我渴望与伴侣完全融合', 'anxiety'),
    createECRQuestion('ecr-a-13', '当伴侣远离我时，我感到不安', 'anxiety'),
    createECRQuestion('ecr-a-15', '我经常担心伴侣不再爱我', 'anxiety'),
    createECRQuestion('ecr-a-17', '我担心伴侣会离开我', 'anxiety'),
    createECRQuestion('ecr-a-19', '当伴侣不在身边时，我感到焦虑', 'anxiety'),
  ],
  advanced: [
    createECRQuestion('ecr-a-1', '我担心会被伴侣抛弃', 'anxiety'),
    createECRQuestion('ecr-a-3', '我担心伴侣不像我关心他/她那样关心我', 'anxiety'),
    createECRQuestion('ecr-a-5', '我渴望与伴侣非常亲密，这有时会让他/她感到害怕', 'anxiety'),
    createECRQuestion('ecr-a-7', '我担心没有伴侣我就无法存在', 'anxiety'),
    createECRQuestion('ecr-a-9', '当伴侣不在我身边时，我担心他/她可能对别人感兴趣', 'anxiety'),
    createECRQuestion('ecr-a-11', '我渴望与伴侣完全融合', 'anxiety'),
    createECRQuestion('ecr-a-13', '当伴侣远离我时，我感到不安', 'anxiety'),
    createECRQuestion('ecr-a-15', '我经常担心伴侣不再爱我', 'anxiety'),
    createECRQuestion('ecr-a-17', '我担心伴侣会离开我', 'anxiety'),
    createECRQuestion('ecr-a-19', '当伴侣不在身边时，我感到焦虑', 'anxiety'),
    createECRQuestion('ecr-a-21', '我担心伴侣不会像我关心他/她那样关心我', 'anxiety'),
    createECRQuestion('ecr-a-23', '我需要很多来自伴侣的安慰', 'anxiety'),
    createECRQuestion('ecr-a-25', '我害怕失去伴侣的爱', 'anxiety'),
    createECRQuestion('ecr-a-27', '我经常担心伴侣不再想和我在一起', 'anxiety'),
    createECRQuestion('ecr-a-29', '当伴侣远离我时，我怀疑他/她可能对别人感兴趣', 'anxiety'),
    createECRQuestion('ecr-a-31', '我对伴侣的情感需求很高', 'anxiety'),
    createECRQuestion('ecr-a-33', '我担心伴侣不像我那样重视我们的关系', 'anxiety'),
    createECRQuestion('ecr-a-35', '我经常担心被抛弃', 'anxiety'),
  ],
  professional: [
    // 焦虑维度 (Anxiety) - 18题 (奇数题)
    createECRQuestion('ecr-a-1', '我担心会被伴侣抛弃', 'anxiety'),
    createECRQuestion('ecr-a-3', '我担心伴侣不像我关心他/她那样关心我', 'anxiety'),
    createECRQuestion('ecr-a-5', '我渴望与伴侣非常亲密，这有时会让他/她感到害怕', 'anxiety'),
    createECRQuestion('ecr-a-7', '我担心没有伴侣我就无法存在', 'anxiety'),
    createECRQuestion('ecr-a-9', '当伴侣不在我身边时，我担心他/她可能对别人感兴趣', 'anxiety'),
    createECRQuestion('ecr-a-11', '我渴望与伴侣完全融合', 'anxiety'),
    createECRQuestion('ecr-a-13', '当伴侣远离我时，我感到不安', 'anxiety'),
    createECRQuestion('ecr-a-15', '我经常担心伴侣不再爱我', 'anxiety'),
    createECRQuestion('ecr-a-17', '我担心伴侣会离开我', 'anxiety'),
    createECRQuestion('ecr-a-19', '当伴侣不在身边时，我感到焦虑', 'anxiety'),
    createECRQuestion('ecr-a-21', '我担心伴侣不会像我关心他/她那样关心我', 'anxiety'),
    createECRQuestion('ecr-a-23', '我需要很多来自伴侣的安慰', 'anxiety'),
    createECRQuestion('ecr-a-25', '我害怕失去伴侣的爱', 'anxiety'),
    createECRQuestion('ecr-a-27', '我经常担心伴侣不再想和我在一起', 'anxiety'),
    createECRQuestion('ecr-a-29', '当伴侣远离我时，我怀疑他/她可能对别人感兴趣', 'anxiety'),
    createECRQuestion('ecr-a-31', '我对伴侣的情感需求很高', 'anxiety'),
    createECRQuestion('ecr-a-33', '我担心伴侣不像我那样重视我们的关系', 'anxiety'),
    createECRQuestion('ecr-a-35', '我经常担心被抛弃', 'anxiety'),

    // 回避维度 (Avoidance) - 18题 (偶数题)
    createECRQuestion('ecr-av-2', '我更喜欢不依赖他人', 'avoidance'),
    createECRQuestion('ecr-av-4', '当有人过于接近我时，我会感到不舒服', 'avoidance'),
    createECRQuestion('ecr-av-6', '我发现很难完全信任他人', 'avoidance'),
    createECRQuestion('ecr-av-8', '当伴侣想要与我非常亲密时，我会感到不舒服', 'avoidance'),
    createECRQuestion('ecr-av-10', '我不喜欢向伴侣展示我内心深处的感受', 'avoidance'),
    createECRQuestion('ecr-av-12', '我更喜欢保持一定的距离', 'avoidance'),
    createECRQuestion('ecr-av-14', '我发现很难依赖他人', 'avoidance'),
    createECRQuestion('ecr-av-16', '当伴侣过于接近我时，我会紧张', 'avoidance'),
    createECRQuestion('ecr-av-18', '我对亲密关系感到不舒服', 'avoidance'),
    createECRQuestion('ecr-av-20', '我更喜欢独立而不是依赖他人', 'avoidance'),
    createECRQuestion('ecr-av-22', '我不喜欢让他人依赖我', 'avoidance'),
    createECRQuestion('ecr-av-24', '当有人试图接近我时，我会退缩', 'avoidance'),
    createECRQuestion('ecr-av-26', '我更喜欢自力更生', 'avoidance'),
    createECRQuestion('ecr-av-28', '我对依赖他人感到不舒服', 'avoidance'),
    createECRQuestion('ecr-av-30', '当伴侣想要更亲密时，我会感到不舒服', 'avoidance'),
    createECRQuestion('ecr-av-32', '我发现很难让自己依赖他人', 'avoidance'),
    createECRQuestion('ecr-av-34', '我更喜欢保持情感距离', 'avoidance'),
    createECRQuestion('ecr-av-36', '我对与他人亲近感到不舒服', 'avoidance'),
  ],
}

export const attachmentStyles = {
  secure: {
    name: '安全型依恋',
    description: '您对亲密关系感到舒适，能够信任他人并接受他人的依赖。您能够平衡亲密与独立，建立健康稳定的关系。',
    characteristics: ['信任他人', '能够表达情感', '寻求支持', '能够给予支持'],
    relationshipPattern: '能够建立稳定、亲密的关系，在关系中感到安全和满足。',
    strengths: ['良好的沟通能力', '健康的边界感', '情绪稳定', '能够处理冲突'],
    challenges: ['可能在极端压力下需要更多支持'],
    recommendation: '继续保持健康的关系模式，在关系中保持开放和诚实。',
  },
  anxious: {
    name: '焦虑型依恋',
    description: '您渴望亲密关系，但担心被拒绝或抛弃。您可能过度关注伴侣的反应，需要频繁的确认和安慰。',
    characteristics: ['担心被抛弃', '需要确认', '过度关注关系', '情绪波动大'],
    relationshipPattern: '可能在关系中表现出过度依赖和焦虑，需要频繁的确认和安慰。',
    strengths: ['对关系投入度高', '敏感于他人需求', '愿意为关系付出'],
    challenges: ['过度担心被拒绝', '可能过度依赖', '情绪波动较大'],
    recommendation: '学习自我安抚技巧，建立健康的自我价值感，练习独立与信任。',
  },
  avoidant: {
    name: '回避型依恋',
    description: '您倾向于保持情感距离，对亲密关系感到不舒服。您可能更重视独立，避免过度依赖他人。',
    characteristics: ['保持距离', '重视独立', '难以表达情感', '避免亲密'],
    relationshipPattern: '可能在关系中保持距离，难以表达情感，避免过度依赖。',
    strengths: ['独立自主', '自我依赖', '情绪控制能力强'],
    challenges: ['难以建立亲密关系', '可能显得冷漠', '难以表达情感需求'],
    recommendation: '学习识别和表达情感，逐步开放自己，练习信任他人。',
  },
  fearful: {
    name: '恐惧型依恋',
    description: '您既渴望亲密关系，又害怕被伤害。您可能在关系中表现出矛盾的行为，既想接近又想逃避。',
    characteristics: ['渴望亲密又害怕', '矛盾的情感', '难以信任', '情绪复杂'],
    relationshipPattern: '可能在关系中表现出矛盾的行为，既渴望亲密又害怕被伤害。',
    strengths: ['对关系有深刻理解', '能够识别情感需求'],
    challenges: ['情感矛盾', '难以信任他人', '可能在关系中挣扎'],
    recommendation: '寻求专业帮助，学习建立健康的信任关系，处理过去的创伤。',
  },
}

export const ecrNormData = {
  anxiety: { mean: 3.0, sd: 1.0, n: 2000 },
  avoidance: { mean: 2.5, sd: 1.0, n: 2000 },
}

export const ecrReferences = [
  'Fraley, R. C., Waller, N. G., & Brennan, K. A. (2000). An item response theory analysis of self-report measures of adult attachment. Journal of Personality and Social Psychology, 78(2), 350-365.',
  'Brennan, K. A., Clark, C. L., & Shaver, P. R. (1998). Self-report measurement of adult attachment: An integrative overview. In J. A. Simpson & W. S. Rholes (Eds.), Attachment theory and close relationships (pp. 46-76). Guilford Press.',
  'Mikulincer, M., & Shaver, P. R. (2016). Attachment in adulthood: Structure, dynamics, and change. Guilford Press.',
  'Sibley, C. G., & Liu, J. H. (2004). Short-term temporal stability and factor structure of the revised Experiences in Close Relationships (ECR-R) measure of adult attachment. Personality and Individual Differences, 37(3), 619-633.',
]

export function determineAttachmentStyle(anxietyScore: number, avoidanceScore: number): keyof typeof attachmentStyles {
  const anxietyMedian = 3.0
  const avoidanceMedian = 2.5

  if (anxietyScore < anxietyMedian && avoidanceScore < avoidanceMedian) {
    return 'secure'
  } else if (anxietyScore >= anxietyMedian && avoidanceScore < avoidanceMedian) {
    return 'anxious'
  } else if (anxietyScore < anxietyMedian && avoidanceScore >= avoidanceMedian) {
    return 'avoidant'
  } else {
    return 'fearful'
  }
}
