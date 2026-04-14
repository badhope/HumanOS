/**
 * ==============================================
 * 💔 ECR成人依恋测评 - 核心计算器
 * ==============================================
 * 【测评定位】依恋理论金标准
 * 【核心算法】2坐标轴 × 2子维度/轴 = 36题
 * 【理论来源】Bartholomew 四分类依恋模型
 * 
 * 【⚠️  超级重要警告】
 * 1. 直接按题号 ecr-1~36 硬编码分组！
 * 2. 有大量反向计分题！不要漏！
 * 3. 结果是象限坐标，不是单一分数！
 */

import type { Answer, AssessmentResult } from '../../types'

/**
 * ECR依恋测评结果接口
 * 【两大坐标轴】
 * - 焦虑轴：害怕被抛弃
 * - 回避轴：害怕亲密
 * 【四大依恋类型】
 * - secure: 安全型
 * - preoccupied: 痴迷型
 * - dismissive: 疏离型
 * - fearful: 恐惧型
 */
export interface ECRResult extends Record<string, any> {
  anxietyScore: number
  avoidanceScore: number
  anxietyPercentage: number
  avoidancePercentage: number
  attachmentType: 'secure' | 'preoccupied' | 'dismissive' | 'fearful'
  attachmentTypeName: string
  attachmentTypeEmoji: string
  dimensions: {
    anxiety_abandon: { score: number; percentage: number }
    anxiety_need: { score: number; percentage: number }
    avoidance_close: { score: number; percentage: number }
    avoidance_independent: { score: number; percentage: number }
  }
  quadrantPosition: { x: number; y: number }
  radarData: { dimension: string; score: number; fullMark: number }[]
  typeDescription: string
  strengthAnalysis: string[]
  growthAreas: string[]
  relationshipAdvice: string
  famousExamples: string[]
}

const randomPick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export function calculateECR(answers: Answer[]): ECRResult {
  const dimensionMap: Record<string, string[]> = {
    anxiety_abandon: ['ecr-1', 'ecr-2', 'ecr-3', 'ecr-4', 'ecr-5', 'ecr-6', 'ecr-7', 'ecr-8', 'ecr-9'],
    anxiety_need: ['ecr-10', 'ecr-11', 'ecr-12', 'ecr-13', 'ecr-14', 'ecr-15', 'ecr-16', 'ecr-17', 'ecr-18'],
    avoidance_close: ['ecr-19', 'ecr-20', 'ecr-21', 'ecr-22', 'ecr-23', 'ecr-24', 'ecr-25', 'ecr-26', 'ecr-27'],
    avoidance_independent: ['ecr-28', 'ecr-29', 'ecr-30', 'ecr-31', 'ecr-32', 'ecr-33', 'ecr-34', 'ecr-35', 'ecr-36'],
  }

  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 4))
  })

  const dimensions: ECRResult['dimensions'] = {} as ECRResult['dimensions']
  Object.entries(dimensionMap).forEach(([dim, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const maxScore = ids.length * 5
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 50
    dimensions[dim as keyof ECRResult['dimensions']] = { score, percentage }
  })

  const anxietyScore = (dimensions.anxiety_abandon.score + dimensions.anxiety_need.score) / 18
  const avoidanceScore = (dimensions.avoidance_close.score + dimensions.avoidance_independent.score) / 18
  const anxietyPercentage = Math.round(((anxietyScore - 1) / 6) * 100)
  const avoidancePercentage = Math.round(((avoidanceScore - 1) / 6) * 100)

  const anxietyCutoff = 50
  const avoidanceCutoff = 50
  
  let attachmentType: ECRResult['attachmentType']
  let attachmentTypeName: string
  let attachmentTypeEmoji: string

  if (anxietyPercentage < anxietyCutoff && avoidancePercentage < avoidanceCutoff) {
    attachmentType = 'secure'
    attachmentTypeName = '安全型'
    attachmentTypeEmoji = '🛡️'
  } else if (anxietyPercentage >= anxietyCutoff && avoidancePercentage < avoidanceCutoff) {
    attachmentType = 'preoccupied'
    attachmentTypeName = '痴迷型'
    attachmentTypeEmoji = '🔥'
  } else if (anxietyPercentage < anxietyCutoff && avoidancePercentage >= avoidanceCutoff) {
    attachmentType = 'dismissive'
    attachmentTypeName = '疏离型'
    attachmentTypeEmoji = '🏔️'
  } else {
    attachmentType = 'fearful'
    attachmentTypeName = '恐惧型'
    attachmentTypeEmoji = '🎭'
  }

  const quadrantPosition = {
    x: avoidancePercentage,
    y: anxietyPercentage,
  }

  const radarData = [
    { dimension: '被抛弃焦虑', score: dimensions.anxiety_abandon.percentage, fullMark: 100 },
    { dimension: '亲密需求', score: dimensions.anxiety_need.percentage, fullMark: 100 },
    { dimension: '亲密回避', score: dimensions.avoidance_close.percentage, fullMark: 100 },
    { dimension: '独立回避', score: dimensions.avoidance_independent.percentage, fullMark: 100 },
  ]

  const generateTypeDescription = () => {
    const intensity = Math.max(anxietyPercentage, avoidancePercentage)
    const desc: Record<ECRResult['attachmentType'], string> = {
      secure: `你是**安全型依恋** ${attachmentTypeEmoji}，焦虑值 ${anxietyPercentage}% / 回避值 ${avoidancePercentage}%。在这个人人都有依恋创伤的时代，你是名副其实的"恋爱天选之人"。你既能够全身心投入爱情，又不会在其中迷失自己——这种从容和底气，是你给伴侣最珍贵的礼物。`,
      preoccupied: `你是**痴迷型依恋** ${attachmentTypeEmoji}，焦虑值 ${anxietyPercentage}% / 回避值 ${avoidancePercentage}%。对你来说，爱情就是氧气，你极度需要确认"被爱"，一条消息没回就可能脑补出一场大戏。不是你的爱太多，而是你太害怕失去了。${intensity > 80 ? '你的焦虑程度相当高，请一定记得：抓得越紧的沙子，反而会漏得越快。' : ''}`,
      dismissive: `你是**疏离型依恋** ${attachmentTypeEmoji}，焦虑值 ${anxietyPercentage}% / 回避值 ${avoidancePercentage}%。独立和自给自足是你的骄傲，你习惯了什么都自己扛，习惯了说"我没事"。${intensity > 80 ? '但你的围墙也太厚了点——保护了自己，也把所有想要温暖你的人都挡在了门外。' : '独立很好，但不必每次都那么坚强，偶尔也可以让别人接住你。'}`,
      fearful: `你是**恐惧型依恋** ${attachmentTypeEmoji}，焦虑值 ${anxietyPercentage}% / 回避值 ${avoidancePercentage}%。你就是那只想要取暖却又怕被烫伤的小刺猬——心里住着两个小人：一个尖叫着"好想被爱"，另一个嘶吼着"谁都别靠近"。这种拉扯不是你的错，它只是过去的经历在保护你。`,
    }
    return desc[attachmentType]
  }
  const typeDescription = generateTypeDescription()

  const strengthAnalysisMap: Record<ECRResult['attachmentType'], string[]> = {
    secure: [
      '能够建立稳定、持久的亲密关系',
      '在关系中感到安全和放松',
      '善于沟通和解决冲突',
      '既能依赖他人也能保持独立',
      '对伴侣信任度高',
    ],
    preoccupied: [
      '对伴侣极度忠诚和投入',
      '情感丰富且敏感细腻',
      '非常在意关系的质量',
      '愿意为关系付出很多',
      '高度的共情能力',
    ],
    dismissive: [
      '高度的独立性和自给自足能力',
      '情绪稳定，不轻易被影响',
      '专注于个人成长和事业',
      '边界感强，不容易受伤',
      '强大的自我调节能力',
    ],
    fearful: [
      '高度的情感觉察能力',
      '对他人的情绪非常敏感',
      '深刻理解人性的复杂性',
      '强烈的自我保护意识',
      '在安全环境下能够非常投入',
    ],
  }

  const growthAreasMap: Record<ECRResult['attachmentType'], string[]> = {
    secure: [
      '继续保持健康的边界感',
      '学会在关系中更加主动表达需求',
      '保持自我成长的同时支持伴侣成长',
    ],
    preoccupied: [
      '学习自我安抚和情绪调节技巧',
      '建立除了伴侣之外的社交支持系统',
      '减少灾难化思维，练习活在当下',
      '培养个人兴趣爱好，减少对关系的过度关注',
    ],
    dismissive: [
      '练习识别和表达自己的真实感受',
      '尝试向信任的人适度敞开心扉',
      '承认"需要别人"不是软弱',
      '学习接纳脆弱和不完美',
    ],
    fearful: [
      '循序渐进地建立信任，不要急于求成',
      '与安全型的人建立健康的关系模板',
      '区分过去的恐惧和当下的现实',
      '考虑专业心理咨询的帮助',
    ],
  }

  const generateRelationshipAdvice = () => {
    const dominantDimension = anxietyPercentage > avoidancePercentage ? '焦虑' : '回避'
    const dominantSubdimension = Math.max(
      dimensions.anxiety_abandon.percentage,
      dimensions.anxiety_need.percentage,
      dimensions.avoidance_close.percentage,
      dimensions.avoidance_independent.percentage
    )
    const advice: Record<ECRResult['attachmentType'], string> = {
      secure: `你天生就懂得如何去爱。但别忘记照顾自己的感受——健康的关系不是"永远付出"，而是平等的双向奔赴。你不需要永远那么"懂事"，偶尔也可以任性一下。`,
      preoccupied: `你的核心痛点是 ${dimensions.anxiety_abandon.percentage > dimensions.anxiety_need.percentage ? '"被抛弃恐惧"' : '"渴望确认的需求"'}。下一次忍不住查岗/发小作文时，先做10个深呼吸。把用来"证明被爱"的精力拿来爱自己——当你不需要通过对方的回应来确认价值时，反而会被爱得更笃定。`,
      dismissive: `你的防御机制是 ${dimensions.avoidance_independent.percentage > dimensions.avoidance_close.percentage ? '"过度独立"' : '"亲密不适感"'}。下一次想说出"我没事"的时候，试着多说三个字："但有点累"。独立是优点，但偶尔的依赖，才是两个人之间真正的连接。`,
      fearful: `你最大的拉扯是既渴望爱又害怕受伤害。给自己多一点时间，也给值得的人多一点耐心。别人想要一天确定关系，你可以用一年来慢慢信任。你的谨慎不是缺点，是自我保护的智慧。`,
    }
    return advice[attachmentType]
  }
  const relationshipAdvice = generateRelationshipAdvice()

  const famousExamplesMap: Record<ECRResult['attachmentType'], string[]> = {
    secure: ['《老友记》莫妮卡', '《哈利波特》赫敏', '《傲骨贤妻》艾丽西亚'],
    preoccupied: ['《泰坦尼克号》露丝', '《乱世佳人》斯嘉丽', '《欲望都市》凯莉'],
    dismissive: ['《夏洛克福尔摩斯》福尔摩斯', '《穿普拉达的女王》米兰达', '《纸牌屋》安德伍德'],
    fearful: ['《蝙蝠侠》布鲁斯韦恩', '《杀死伊芙》伊芙', '《绝命毒师》杰西'],
  }

  return {
    anxietyScore: Math.round(anxietyScore * 10) / 10,
    avoidanceScore: Math.round(avoidanceScore * 10) / 10,
    anxietyPercentage,
    avoidancePercentage,
    attachmentType,
    attachmentTypeName,
    attachmentTypeEmoji,
    dimensions,
    quadrantPosition,
    radarData,
    typeDescription,
    strengthAnalysis: strengthAnalysisMap[attachmentType],
    growthAreas: growthAreasMap[attachmentType],
    relationshipAdvice,
    famousExamples: famousExamplesMap[attachmentType],
  }
}
