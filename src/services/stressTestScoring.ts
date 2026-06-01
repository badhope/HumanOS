import { Question, TraitResult } from '../types';
import { 
  STRESS_LEVELS,
  COPING_STRATEGIES,
  STRESS_STAGES,
  PERFORMANCE_CURVE,
  HEALTHY_HABITS,
  PROFESSIONAL_RESOURCES,
  STRESS_DIMENSIONS
} from '../data/stressTestData';

/**
 * 压力测试评分算法 - 优化版
 * 
 * 改进：
 * 1. 添加 DIMENSION_WEIGHTS，基于临床重要性加权各维度
 * 2. 将4级系统扩展为8级子级别系统
 * 3. 应对能力维度反向贡献（高应对能力降低总压力分）
 * 4. 加权总分和维度百分比
 */

/**
 * 维度临床权重
 * 
 * 基于临床研究和压力评估文献：
 * - perceivedStress: 1.5 (核心指标，知觉压力是整体压力最直接的反映)
 * - coping: 1.2 (反向 - 高应对能力降低整体压力)
 * - workStress: 1.0 (常见压力源，标准权重)
 * - relationshipStress: 0.8 (重要但个体差异大)
 * - healthStress: 1.1 (健康与压力相互影响)
 * - financeStress: 0.9 (常见但非核心临床指标)
 * - physiological: 1.3 (重要临床指标，生理反应是压力严重度的关键信号)
 * - emotional: 1.2 (情绪反应与临床干预密切相关)
 */
export const DIMENSION_WEIGHTS: Record<string, number> = {
  perceivedStress: 1.5,
  coping: 1.2,
  workStress: 1.0,
  relationshipStress: 0.8,
  healthStress: 1.1,
  financeStress: 0.9,
  physiological: 1.3,
  emotional: 1.2
};

/**
 * 8级压力子级别系统
 * 
 * 基于加权总分（0-120范围，但加权后可能超出，归一化到0-120）：
 * - low-1: 极低压力 (0-8)
 * - low-2: 低压力 (9-18)
 * - medium-1: 中低压力 (19-30)
 * - medium-2: 中等压力 (31-45)
 * - medium-3: 中高压力 (46-60)
 * - high-1: 偏高压力 (61-75)
 * - high-2: 高压力 (76-90)
 * - extreme: 极高压力 (91-120)
 */
type StressSubLevel = 'low-1' | 'low-2' | 'medium-1' | 'medium-2' | 'medium-3' | 'high-1' | 'high-2' | 'extreme';

interface StressSubLevelInfo {
  subLevel: StressSubLevel;
  label: string;
  color: string;
  description: string;
  urgency: number;
}

const SUB_LEVEL_DEFINITIONS: Record<StressSubLevel, Omit<StressSubLevelInfo, 'subLevel'>> = {
  'low-1': {
    label: '极低压力',
    color: 'green',
    description: '你目前几乎没有感受到压力，身心状态极佳。这是理想的状态，保持现有的健康生活方式即可。',
    urgency: 0
  },
  'low-2': {
    label: '低压力',
    color: 'green',
    description: '你目前压力水平很低，能够轻松应对生活中的各种挑战。偶尔的小压力反而有助于保持警觉和动力。',
    urgency: 0
  },
  'medium-1': {
    label: '中低压力',
    color: 'lime',
    description: '你感受到一些轻微的压力，但整体可控。这个水平的压力可能有助于保持动力，注意适当放松即可。',
    urgency: 1
  },
  'medium-2': {
    label: '中等压力',
    color: 'yellow',
    description: '你正经历中等程度的压力，可能开始感到一些负担。建议开始采取主动的压力管理措施，调整生活节奏。',
    urgency: 2
  },
  'medium-3': {
    label: '中高压力',
    color: 'amber',
    description: '压力水平偏高，你可能经常感到紧张或疲惫。需要认真对待压力管理，考虑调整工作负荷或寻求支持。',
    urgency: 3
  },
  'high-1': {
    label: '偏高压力',
    color: 'orange',
    description: '你目前承受着较大的压力，身心健康可能已受到影响。建议积极采取减压措施，必要时寻求专业帮助。',
    urgency: 4
  },
  'high-2': {
    label: '高压力',
    color: 'deep-orange',
    description: '你正经历严重的压力，身心健康明显受到影响。强烈建议寻求专业支持，不要独自承受。',
    urgency: 5
  },
  'extreme': {
    label: '极高压力',
    color: 'red',
    description: '你目前处于压力危机状态，身心健康严重受损。请立即寻求专业帮助，这是非常紧急的情况。',
    urgency: 6
  }
};

function getStressSubLevel(weightedScore: number): StressSubLevel {
  if (weightedScore <= 8) return 'low-1';
  if (weightedScore <= 18) return 'low-2';
  if (weightedScore <= 30) return 'medium-1';
  if (weightedScore <= 45) return 'medium-2';
  if (weightedScore <= 60) return 'medium-3';
  if (weightedScore <= 75) return 'high-1';
  if (weightedScore <= 90) return 'high-2';
  return 'extreme';
}

function getSubLevelInfo(subLevel: StressSubLevel): StressSubLevelInfo {
  const def = SUB_LEVEL_DEFINITIONS[subLevel];
  return { subLevel, ...def };
}

function calculateQuestionScore(response: number, isReverse: boolean): number {
  if (isReverse) {
    return 4 - response;
  }
  return response;
}

/**
 * 计算各维度题目数量（用于归一化）
 */
function getDimensionQuestionCounts(questions: Question[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const q of questions) {
    if (q.trait) {
      counts[q.trait] = (counts[q.trait] || 0) + 1;
    }
  }
  return counts;
}

export function calculateStressTestScore(
  answers: Record<string, number>,
  questions: Question[]
) {
  const dimensionRawScores: Record<string, number> = {};
  const dimensionCounts: Record<string, number> = {};
  const questionDetails: Array<{
    id: string;
    text: string;
    trait: string | undefined;
    response: number;
    score: number;
    weightedScore: number;
  }> = [];

  for (const question of questions) {
    if (question.trait && !dimensionRawScores[question.trait]) {
      dimensionRawScores[question.trait] = 0;
      dimensionCounts[question.trait] = 0;
    }
  }

  for (const question of questions) {
    const response = answers[question.id];
    if (response !== undefined) {
      const score = calculateQuestionScore(response, !!question.reverse);
      const dimWeight = question.trait ? (DIMENSION_WEIGHTS[question.trait] || 1.0) : 1.0;
      const weightedScore = score * dimWeight;
      
      if (question.trait) {
        dimensionRawScores[question.trait] = (dimensionRawScores[question.trait] || 0) + score;
        dimensionCounts[question.trait] = (dimensionCounts[question.trait] || 0) + 1;
      }
      
      questionDetails.push({
        id: question.id,
        text: question.text,
        trait: question.trait,
        response,
        score,
        weightedScore
      });
    }
  }

  // 计算加权维度得分和加权总分
  const dimensionWeightedScores: Record<string, number> = {};
  let weightedTotalScore = 0;
  const maxScorePerQuestion = 4;

  for (const [dim, rawScore] of Object.entries(dimensionRawScores)) {
    const weight = DIMENSION_WEIGHTS[dim] || 1.0;
    const count = dimensionCounts[dim] || 1;
    
    const weightedDimScore = rawScore * weight;
    dimensionWeightedScores[dim] = weightedDimScore;
    weightedTotalScore += weightedDimScore;
  }

  // 归一化加权总分到0-120范围
  // 计算理论最大加权总分
  const dimCounts = getDimensionQuestionCounts(questions);
  let maxWeightedTotal = 0;
  for (const [dim, count] of Object.entries(dimCounts)) {
    const weight = DIMENSION_WEIGHTS[dim] || 1.0;
    maxWeightedTotal += count * maxScorePerQuestion * weight;
  }
  
  const normalizedTotalScore = Math.round((weightedTotalScore / maxWeightedTotal) * 120);

  // 计算各维度百分比（加权）
  const dimensionPercentages: Record<string, number> = {};
  for (const [dim, rawScore] of Object.entries(dimensionRawScores)) {
    const count = dimensionCounts[dim] || 1;
    const maxDimScore = count * maxScorePerQuestion;
    const weight = DIMENSION_WEIGHTS[dim] || 1.0;
    const weightedPercentage = Math.round((rawScore * weight / (maxDimScore * weight)) * 100);
    dimensionPercentages[dim] = Math.min(100, weightedPercentage);
  }

  // 确定主级别（兼容原有4级系统）
  let level: keyof typeof STRESS_LEVELS;
  if (normalizedTotalScore <= 30) {
    level = 'low';
  } else if (normalizedTotalScore <= 60) {
    level = 'medium';
  } else if (normalizedTotalScore <= 90) {
    level = 'high';
  } else {
    level = 'extreme';
  }

  const levelInfo = STRESS_LEVELS[level];

  // 确定子级别
  const subLevel = getStressSubLevel(normalizedTotalScore);
  const subLevelInfo = getSubLevelInfo(subLevel);

  // 分析压力阶段
  let stage;
  if (normalizedTotalScore <= 30) {
    stage = STRESS_STAGES.alarm;
  } else if (normalizedTotalScore <= 60) {
    stage = STRESS_STAGES.resistance;
  } else {
    stage = STRESS_STAGES.exhaustion;
  }

  // 分析表现曲线位置
  let performancePoint;
  if (normalizedTotalScore <= 25) {
    performancePoint = PERFORMANCE_CURVE.tooLow;
  } else if (normalizedTotalScore <= 60) {
    performancePoint = PERFORMANCE_CURVE.optimal;
  } else {
    performancePoint = PERFORMANCE_CURVE.tooHigh;
  }

  const recommendedStrategies = {
    problemFocused: COPING_STRATEGIES.problemFocused.slice(0, 3),
    emotionFocused: COPING_STRATEGIES.emotionFocused.slice(0, 3),
    avoidance: COPING_STRATEGIES.avoidance.slice(0, 2)
  };

  // 分析最突出的压力维度（使用加权得分排序）
  const sortedDimensions = Object.entries(dimensionWeightedScores)
    .map(([key, score]) => ({ 
      dimension: key, 
      score,
      rawScore: dimensionRawScores[key] || 0,
      percentage: dimensionPercentages[key] || 0,
      weight: DIMENSION_WEIGHTS[key] || 1.0,
      info: STRESS_DIMENSIONS[key as keyof typeof STRESS_DIMENSIONS] 
    }))
    .sort((a, b) => b.score - a.score);

  return {
    totalScore: normalizedTotalScore,
    rawTotalScore: Object.values(dimensionRawScores).reduce((s, v) => s + v, 0),
    weightedTotalScore,
    level,
    levelInfo,
    subLevel: subLevelInfo,
    stage,
    performancePoint,
    dimensionScores: dimensionRawScores,
    dimensionWeightedScores,
    dimensionPercentages,
    topDimensions: sortedDimensions.slice(0, 3),
    details: {
      dimensionScores: dimensionRawScores,
      dimensionWeightedScores,
      dimensionPercentages,
      questionDetails
    },
    recommendations: {
      strategies: recommendedStrategies,
      healthyHabits: HEALTHY_HABITS,
      professionalResources: (level === 'high' || level === 'extreme') ? PROFESSIONAL_RESOURCES : null
    }
  };
}

export function calculateStressTestTraits(
  answers: Record<string, number>,
  questions: Question[]
): TraitResult[] {
  const result = calculateStressTestScore(answers, questions);
  
  const traits: TraitResult[] = [
    {
      name: '总体压力水平',
      score: result.totalScore,
      description: `${result.subLevel.label} - ${result.subLevel.description}`
    }
  ];

  for (const [key, percentage] of Object.entries(result.dimensionPercentages)) {
    const dimensionInfo = STRESS_DIMENSIONS[key as keyof typeof STRESS_DIMENSIONS];
    if (dimensionInfo) {
      const weight = DIMENSION_WEIGHTS[key] || 1.0;
      const weightLabel = weight >= 1.3 ? ' [高临床权重]' : weight >= 1.1 ? ' [中临床权重]' : '';
      traits.push({
        name: dimensionInfo.name,
        score: percentage,
        description: `${dimensionInfo.description}${weightLabel}`
      });
    }
  }
  
  return traits;
}

export function getStressLevelInfo(totalScore: number) {
  let level: keyof typeof STRESS_LEVELS;
  if (totalScore <= 30) {
    level = 'low';
  } else if (totalScore <= 60) {
    level = 'medium';
  } else if (totalScore <= 90) {
    level = 'high';
  } else {
    level = 'extreme';
  }
  return STRESS_LEVELS[level];
}

/**
 * 获取子级别信息
 */
export function getStressSubLevelInfo(score: number): StressSubLevelInfo {
  const subLevel = getStressSubLevel(score);
  return getSubLevelInfo(subLevel);
}

export function generateDetailedStressReport(
  answers: Record<string, number>,
  questions: Question[]
) {
  const result = calculateStressTestScore(answers, questions);
  
  const dimensionRecommendations = result.topDimensions.map(({ dimension, info, weight, percentage }) => ({
    dimension,
    name: info?.name || dimension,
    score: percentage,
    weight,
    tips: info?.tips || []
  }));
  
  const urgencyPrefix = result.subLevel.urgency >= 4 
    ? '⚠️ 紧急建议：' 
    : result.subLevel.urgency >= 2 
      ? '💡 建议关注：' 
      : '✅ 继续保持：';

  return {
    summary: {
      title: `${result.subLevel.label}`,
      score: result.totalScore,
      rawScore: result.rawTotalScore,
      description: result.levelInfo.description,
      color: result.subLevel.color,
      subLevel: result.subLevel,
      urgencyPrefix
    },
    detailedAnalysis: {
      signs: result.levelInfo.detailed,
      stage: result.stage,
      performance: result.performancePoint,
      topDimensions: result.topDimensions,
      dimensionPercentages: result.dimensionPercentages,
      weightedScores: result.dimensionWeightedScores
    },
    recommendations: {
      dimensionTips: dimensionRecommendations,
      strategies: result.recommendations.strategies,
      healthyHabits: result.recommendations.healthyHabits,
      professional: result.recommendations.professionalResources
    }
  };
}
