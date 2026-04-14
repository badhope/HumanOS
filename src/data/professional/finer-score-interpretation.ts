export interface ScoreInterpretation {
  min: number
  max: number
  percentile: string
  label: string
  description: string
  characteristics: string[]
  behavioralTraits: string[]
  growthRecommendations: string[]
}

function generateLinearInterpretation(
  dimension: string,
  lowTrait: string,
  highTrait: string
): ScoreInterpretation[] {
  const interpretations: ScoreInterpretation[] = []
  
  for (let percentile = 0; percentile < 100; percentile++) {
    const intensity = percentile / 100
    const isLow = percentile < 35
    const isModerate = percentile >= 35 && percentile < 65
    const isHigh = percentile >= 65
    
    let label = ''
    let description = ''
    let characteristics: string[] = []
    let behavioralTraits: string[] = []
    let growthRecommendations: string[] = []
    
    if (percentile < 10) {
      label = `极${lowTrait}`
      description = `在${dimension}维度上处于人群中最低的10%，表现出极端的${lowTrait}特征。`
      characteristics = [
        `极强的${lowTrait}倾向`,
        `几乎没有${highTrait}表现`,
        `行为模式高度一致`,
      ]
      behavioralTraits = [`在所有相关场景中都稳定表现出${lowTrait}特征`]
      growthRecommendations = [`适度发展${highTrait}相关能力`]
    } else if (percentile < 20) {
      label = `很高${lowTrait}`
      description = `在${dimension}维度上处于人群的第10-20百分位。`
      characteristics = [`很强的${lowTrait}倾向`]
      behavioralTraits = [`大多数场景下表现为${lowTrait}`]
      growthRecommendations = [`注意平衡，适当发展${highTrait}`]
    } else if (percentile < 30) {
      label = `较高${lowTrait}`
      description = `在${dimension}维度上处于人群的第20-30百分位。`
      characteristics = [`较明显的${lowTrait}倾向`]
      behavioralTraits = [`多数场景偏向${lowTrait}`]
      growthRecommendations = [`保持优势，关注平衡`]
    } else if (percentile < 35) {
      label = `轻度${lowTrait}`
      description = `在${dimension}维度上处于人群的第30-35百分位，偏向${lowTrait}。`
      characteristics = [`轻微的${lowTrait}倾向`]
      behavioralTraits = [`整体偏${lowTrait}但有弹性`]
      growthRecommendations = [`维持现状即可`]
    } else if (percentile < 40) {
      label = `中低-${lowTrait}`
      description = `在${dimension}维度上处于人群的第35-40百分位。`
      characteristics = [`略偏${lowTrait}`]
      behavioralTraits = [`根据场景灵活调整`]
      growthRecommendations = [`保持灵活性`]
    } else if (percentile < 45) {
      label = `中下水平`
      description = `在${dimension}维度上处于人群的第40-45百分位。`
      characteristics = [`略低于平均水平`]
      behavioralTraits = [`接近多数人的表现`]
      growthRecommendations = [`自然发展`]
    } else if (percentile < 50) {
      label = `平均偏下`
      description = `在${dimension}维度上处于人群的第45-50百分位。`
      characteristics = [`与平均水平相当，略低`]
      behavioralTraits = [`典型的普通人表现`]
      growthRecommendations = [`无需刻意调整`]
    } else if (percentile < 55) {
      label = `平均水平`
      description = `在${dimension}维度上处于人群的第50-55百分位，完全符合大多数人的特征。`
      characteristics = [`完全的平均水平`, `${lowTrait}与${highTrait}平衡`]
      behavioralTraits = [`高度典型的普通人行为模式`]
      growthRecommendations = [`根据个人目标选择发展方向`]
    } else if (percentile < 60) {
      label = `平均偏上`
      description = `在${dimension}维度上处于人群的第55-60百分位。`
      characteristics = [`与平均水平相当，略高`]
      behavioralTraits = [`比半数人略偏向${highTrait}`]
      growthRecommendations = [`自然发展`]
    } else if (percentile < 65) {
      label = `中上水平`
      description = `在${dimension}维度上处于人群的第60-65百分位。`
      characteristics = [`略高于平均水平`]
      behavioralTraits = [`表现较好`]
      growthRecommendations = [`保持优势`]
    } else if (percentile < 70) {
      label = `中高-${highTrait}`
      description = `在${dimension}维度上处于人群的第65-70百分位。`
      characteristics = [`略偏${highTrait}`]
      behavioralTraits = [`开始显现${highTrait}优势`]
      growthRecommendations = [`继续强化优势`]
    } else if (percentile < 80) {
      label = `轻度${highTrait}`
      description = `在${dimension}维度上处于人群的第70-80百分位，明显表现出${highTrait}特征。`
      characteristics = [`可测量的${highTrait}优势`]
      behavioralTraits = [`多数场景下表现出${highTrait}`]
      growthRecommendations = [`发展深度应用能力`]
    } else if (percentile < 90) {
      label = `较高${highTrait}`
      description = `在${dimension}维度上处于人群的第80-90百分位。`
      characteristics = [`显著的${highTrait}特征`, `明显超越多数人`]
      behavioralTraits = [`稳定的${highTrait}行为模式`]
      growthRecommendations = [`发挥特长，注意极端化风险`]
    } else if (percentile < 95) {
      label = `很高${highTrait}`
      description = `在${dimension}维度上处于人群的第90-95百分位。`
      characteristics = [`很强的${highTrait}`, `前10%的水平`]
      behavioralTraits = [`几乎所有场景都表现为${highTrait}`]
      growthRecommendations = [`注意与其他维度的平衡`]
    } else {
      label = `极${highTrait}`
      description = `在${dimension}维度上处于人群中最高的5%，拥有极端的${highTrait}特征。`
      characteristics = [
        `极端的${highTrait}`,
        `人群中的极少数`,
        `在该维度上极具辨识度`,
      ]
      behavioralTraits = [`高度独特且稳定的${highTrait}行为模式`]
      growthRecommendations = [`善用天赋，警惕副作用`]
    }
    
    interpretations.push({
      min: percentile,
      max: percentile + 1,
      percentile: `P${percentile}`,
      label,
      description,
      characteristics,
      behavioralTraits,
      growthRecommendations,
    })
  }
  
  return interpretations
}

export const FINE_GRAINED_INTERPRETATIONS: Record<string, ScoreInterpretation[]> = {
  // 大五人格精细解读
  'O': generateLinearInterpretation('开放性', '保守', '开放'),
  'C': generateLinearInterpretation('尽责性', '随性', '尽责'),
  'E': generateLinearInterpretation('外倾性', '内倾', '外倾'),
  'A': generateLinearInterpretation('宜人性', '竞争性', '宜人'),
  'N': generateLinearInterpretation('神经质', '情绪稳定', '敏感'),
  
  // 黑暗四人格精细解读
  'machiavellianism': generateLinearInterpretation('马基雅维利主义', '真诚', '策略性'),
  'narcissism': generateLinearInterpretation('自恋', '谦逊', '自信'),
  'psychopathy': generateLinearInterpretation('精神病态', '共情', '大胆'),
  'sadism': generateLinearInterpretation('施虐倾向', '善良', '支配'),
  
  // EQ精细解读
  'selfAwareness': generateLinearInterpretation('自我觉知', '自我盲视', '自我洞察'),
  'selfManagement': generateLinearInterpretation('自我管理', '冲动', '自律'),
  'socialAwareness': generateLinearInterpretation('社会觉知', '自我中心', '同理心'),
  'relationshipManagement': generateLinearInterpretation('关系管理', '疏离', '影响力'),
  
  // 依恋风格精细解读
  'ANXIETY': generateLinearInterpretation('依恋焦虑', '笃定', '敏感'),
  'AVOIDANCE': generateLinearInterpretation('依恋回避', '亲密', '独立'),
}

export function getFineGrainedInterpretation(
  dimension: string,
  rawScore: number,
  minPossible = 1,
  maxPossible = 7
): ScoreInterpretation {
  const normalizedScore = ((rawScore - minPossible) / (maxPossible - minPossible)) * 100
  const percentile = Math.min(99, Math.max(0, Math.floor(normalizedScore)))
  
  const interpretations = FINE_GRAINED_INTERPRETATIONS[dimension] 
    || generateLinearInterpretation(dimension, '低', '高')
  
  return interpretations[percentile]
}

export function createDimensionProfile(
  scores: Record<string, number>,
  minPossible = 1,
  maxPossible = 7
): Record<string, ScoreInterpretation> {
  const profile: Record<string, ScoreInterpretation> = {}
  Object.entries(scores).forEach(([dimension, score]) => {
    profile[dimension] = getFineGrainedInterpretation(dimension, score, minPossible, maxPossible)
  })
  return profile
}

export function calculateOverallPersonalitySignature(
  profile: Record<string, ScoreInterpretation>
): {
  signature: string
  distinctiveness: number
  archetype: string
} {
  const extremeDimensions = Object.entries(profile).filter(([_, int]) => {
    const p = parseInt(int.percentile.replace('P', ''), 10)
    return p < 15 || p > 85
  })
  
  const signature = extremeDimensions
    .map(([dim, int]) => `${dim}:${int.label}`)
    .join(' | ')
  
  const distinctiveness = Math.min(100, extremeDimensions.length * 20 + 20)
  
  let archetype = '平衡型'
  if (extremeDimensions.length >= 3) {
    archetype = '鲜明型'
  } else if (extremeDimensions.length >= 2) {
    archetype = '特色型'
  } else if (extremeDimensions.length >= 1) {
    archetype = '偏科型'
  }
  
  return { signature, distinctiveness, archetype }
}
