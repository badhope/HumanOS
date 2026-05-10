import { AnalysisDimension } from './types'

export const careerDimensions: AnalysisDimension[] = [
  {
    id: 'career-suitability',
    name: '职业适配度',
    category: 'career',
    description: '基于性格特质和能力评估最适合的职业方向',
    weight: 1.0,
    indicators: [
      {
        id: 'interest-match',
        name: '兴趣匹配度',
        description: '个人兴趣与职业要求的匹配程度',
        calculationMethod: 'trait_correlation',
        relatedTraits: ['openness', 'conscientiousness', 'extraversion'],
        thresholdValues: { low: 0.3, medium: 0.6, high: 0.8 }
      },
      {
        id: 'skill-alignment',
        name: '技能契合度',
        description: '现有技能与职业需求的契合程度',
        calculationMethod: 'skill_gap_analysis',
        relatedTraits: ['conscientiousness', 'openness'],
        thresholdValues: { low: 0.4, medium: 0.7, high: 0.85 }
      },
      {
        id: 'value-congruence',
        name: '价值观一致性',
        description: '个人价值观与组织文化的契合程度',
        calculationMethod: 'value_matching',
        relatedTraits: ['agreeableness', 'conscientiousness'],
        thresholdValues: { low: 0.35, medium: 0.65, high: 0.8 }
      }
    ]
  },
  {
    id: 'leadership-potential',
    name: '领导力潜能',
    category: 'career',
    description: '评估领导能力和管理潜能',
    weight: 0.9,
    indicators: [
      {
        id: 'decision-making',
        name: '决策能力',
        description: '在复杂情况下做出有效决策的能力',
        calculationMethod: 'scenario_analysis',
        relatedTraits: ['conscientiousness', 'emotional_stability'],
        thresholdValues: { low: 0.3, medium: 0.6, high: 0.75 }
      },
      {
        id: 'team-influence',
        name: '团队影响力',
        description: '影响和激励团队成员的能力',
        calculationMethod: 'social_dynamics',
        relatedTraits: ['extraversion', 'agreeableness'],
        thresholdValues: { low: 0.35, medium: 0.65, high: 0.8 }
      }
    ]
  }
]

export const personalityDimensions: AnalysisDimension[] = [
  {
    id: 'core-personality',
    name: '核心人格特质',
    category: 'personality',
    description: '个体稳定的性格特征和行为模式',
    weight: 1.0,
    indicators: [
      {
        id: 'trait-stability',
        name: '特质稳定性',
        description: '人格特质在不同情境下的一致性',
        calculationMethod: 'consistency_analysis',
        relatedTraits: ['all'],
        thresholdValues: { low: 0.4, medium: 0.7, high: 0.85 }
      },
      {
        id: 'behavioral-flexibility',
        name: '行为灵活性',
        description: '根据环境调整行为的能力',
        calculationMethod: 'adaptability_score',
        relatedTraits: ['openness', 'emotional_stability'],
        thresholdValues: { low: 0.3, medium: 0.6, high: 0.8 }
      }
    ]
  },
  {
    id: 'emotional-intelligence',
    name: '情商水平',
    category: 'personality',
    description: '识别、理解和管理情绪的能力',
    weight: 0.95,
    indicators: [
      {
        id: 'self-awareness',
        name: '自我认知',
        description: '对自己情绪和行为的认知能力',
        calculationMethod: 'introspection_depth',
        relatedTraits: ['emotional_stability', 'openness'],
        thresholdValues: { low: 0.35, medium: 0.65, high: 0.8 }
      },
      {
        id: 'empathy',
        name: '同理心',
        description: '理解和感受他人情绪的能力',
        calculationMethod: 'perspective_taking',
        relatedTraits: ['agreeableness', 'extraversion'],
        thresholdValues: { low: 0.3, medium: 0.6, high: 0.75 }
      }
    ]
  }
]

export const statusDimensions: AnalysisDimension[] = [
  {
    id: 'mental-health',
    name: '心理健康状态',
    category: 'status',
    description: '当前的心理健康状况和情绪状态',
    weight: 1.0,
    indicators: [
      {
        id: 'anxiety-level',
        name: '焦虑水平',
        description: '当前焦虑症状的严重程度',
        calculationMethod: 'symptom_severity',
        relatedTraits: ['neuroticism'],
        thresholdValues: { low: 0.3, medium: 0.5, high: 0.7 }
      },
      {
        id: 'stress-level',
        name: '压力水平',
        description: '当前承受的心理压力程度',
        calculationMethod: 'stress_index',
        relatedTraits: ['emotional_stability', 'conscientiousness'],
        thresholdValues: { low: 0.35, medium: 0.55, high: 0.75 }
      }
    ]
  },
  {
    id: 'life-satisfaction',
    name: '生活满意度',
    category: 'status',
    description: '对生活各个方面的满意程度',
    weight: 0.9,
    indicators: [
      {
        id: 'overall-satisfaction',
        name: '整体满意度',
        description: '对生活整体质量的评价',
        calculationMethod: 'holistic_assessment',
        relatedTraits: ['extraversion', 'agreeableness', 'emotional_stability'],
        thresholdValues: { low: 0.4, medium: 0.65, high: 0.8 }
      }
    ]
  }
]

export const planningDimensions: AnalysisDimension[] = [
  {
    id: 'goal-clarity',
    name: '目标清晰度',
    category: 'planning',
    description: '对个人目标的明确程度',
    weight: 1.0,
    indicators: [
      {
        id: 'goal-definition',
        name: '目标定义',
        description: '目标的明确性和可衡量性',
        calculationMethod: 'goal_analysis',
        relatedTraits: ['conscientiousness', 'openness'],
        thresholdValues: { low: 0.35, medium: 0.6, high: 0.8 }
      },
      {
        id: 'action-planning',
        name: '行动计划',
        description: '实现目标的具体步骤',
        calculationMethod: 'planning_depth',
        relatedTraits: ['conscientiousness'],
        thresholdValues: { low: 0.3, medium: 0.65, high: 0.85 }
      }
    ]
  },
  {
    id: 'growth-potential',
    name: '成长潜力',
    category: 'planning',
    description: '个人发展和成长的潜力',
    weight: 0.95,
    indicators: [
      {
        id: 'learning-orientation',
        name: '学习导向',
        description: '持续学习和自我提升的倾向',
        calculationMethod: 'growth_mindset',
        relatedTraits: ['openness', 'conscientiousness'],
        thresholdValues: { low: 0.35, medium: 0.65, high: 0.8 }
      }
    ]
  }
]

export function getAllDimensions(): AnalysisDimension[] {
  return [
    ...careerDimensions,
    ...personalityDimensions,
    ...statusDimensions,
    ...planningDimensions
  ]
}
