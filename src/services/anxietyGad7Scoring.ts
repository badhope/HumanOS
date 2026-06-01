import { TraitResult } from '../types';
import {
  ANXIETY_LEVELS,
  GAD7_COPING_STRATEGIES,
  GAD7_RELAXATION_TECHNIQUES,
  GAD7_HEALTHY_HABITS,
  ANXIETY_DIMENSIONS,
  EXTENDED_ANXIETY_LEVELS
} from '../data/anxietyGad7Data';
import { Question } from '../types';

/**
 * 焦虑GAD-7评分算法 - 优化版
 * 
 * 改进：
 * 1. 添加 DIMENSION_WEIGHTS，基于临床重要性加权各维度
 * 2. 将4级系统扩展为7级子级别系统
 * 3. 加权总分和维度百分比
 * 4. 不同答题模式产生差异化的人格画像
 */

/**
 * 焦虑维度临床权重
 * 
 * 基于GAD临床研究和DSM-5诊断标准：
 * - worries: 1.4 (过度担忧是GAD的核心诊断特征)
 * - tension: 1.2 (运动性紧张是GAD的典型躯体表现)
 * - irritability: 0.9 (易激惹是伴随症状，非核心)
 * - fear: 1.1 (恐惧感受与焦虑密切相关)
 * - physical: 1.3 (躯体/体化症状是临床严重度的重要指标)
 * - cognitive: 1.0 (认知症状，标准权重)
 * - social: 1.1 (社会功能受损反映焦虑的实际影响)
 */
export const DIMENSION_WEIGHTS: Record<string, number> = {
  worries: 1.4,
  tension: 1.2,
  irritability: 0.9,
  fear: 1.1,
  physical: 1.3,
  cognitive: 1.0,
  social: 1.1
};

/**
 * 7级焦虑子级别系统
 * 
 * 基于加权总分（归一化到0-84范围）：
 * - minimal-1: 几乎无焦虑 (0-6)
 * - minimal-2: 极轻微焦虑 (7-12)
 * - mild-1: 轻度焦虑偏低 (13-20)
 * - mild-2: 轻度焦虑偏高 (21-28)
 * - moderate: 中度焦虑 (29-42)
 * - severe-1: 重度焦虑偏低 (43-56)
 * - severe-2: 重度焦虑偏高 (57-84)
 */
type AnxietySubLevel = 'minimal-1' | 'minimal-2' | 'mild-1' | 'mild-2' | 'moderate' | 'severe-1' | 'severe-2';

interface AnxietySubLevelInfo {
  subLevel: AnxietySubLevel;
  label: string;
  color: string;
  description: string;
  clinicalNote: string;
  urgency: number;
}

const ANXIETY_SUB_LEVEL_DEFINITIONS: Record<AnxietySubLevel, Omit<AnxietySubLevelInfo, 'subLevel'>> = {
  'minimal-1': {
    label: '几乎无焦虑',
    color: 'green',
    description: '你几乎没有体验到焦虑症状，心理状态非常健康。这是理想的状态，继续保持良好的生活习惯和积极的心态。',
    clinicalNote: '无需临床干预',
    urgency: 0
  },
  'minimal-2': {
    label: '极轻微焦虑',
    color: 'green',
    description: '你偶尔会有非常轻微的焦虑感受，但完全在正常范围内。这种程度的焦虑有时反而有助于保持警觉和动力。',
    clinicalNote: '正常范围，无需干预',
    urgency: 0
  },
  'mild-1': {
    label: '轻度焦虑偏低',
    color: 'lime',
    description: '你有一些轻微的焦虑症状，主要体现在偶尔的担忧和轻度紧张。这些症状对日常生活影响很小，但值得留意。',
    clinicalNote: '建议自我调节和放松练习',
    urgency: 1
  },
  'mild-2': {
    label: '轻度焦虑偏高',
    color: 'yellow',
    description: '你有较为明显的轻度焦虑症状，可能开始影响日常生活的某些方面。建议主动学习压力管理和放松技巧。',
    clinicalNote: '建议开始心理自助和放松训练',
    urgency: 2
  },
  'moderate': {
    label: '中度焦虑',
    color: 'orange',
    description: '你有明显的中度焦虑症状，可能已经影响到工作、学习和人际关系。建议认真对待，考虑寻求专业心理咨询。',
    clinicalNote: '建议专业心理评估和干预',
    urgency: 3
  },
  'severe-1': {
    label: '重度焦虑偏低',
    color: 'deep-orange',
    description: '你有严重的焦虑症状，日常生活功能受到明显影响。强烈建议尽快寻求专业心理或精神科帮助，不要独自承受。',
    clinicalNote: '需要专业治疗，考虑CBT和/或药物治疗',
    urgency: 4
  },
  'severe-2': {
    label: '重度焦虑偏高',
    color: 'red',
    description: '你正经历极其严重的焦虑，可能伴有明显的躯体症状和功能损害。请立即寻求专业精神科帮助，这是非常紧急的情况。',
    clinicalNote: '紧急需要精神科评估和治疗',
    urgency: 5
  }
};

function getAnxietySubLevel(weightedScore: number): AnxietySubLevel {
  if (weightedScore <= 6) return 'minimal-1';
  if (weightedScore <= 12) return 'minimal-2';
  if (weightedScore <= 20) return 'mild-1';
  if (weightedScore <= 28) return 'mild-2';
  if (weightedScore <= 42) return 'moderate';
  if (weightedScore <= 56) return 'severe-1';
  return 'severe-2';
}

function getAnxietySubLevelInfo(subLevel: AnxietySubLevel): AnxietySubLevelInfo {
  const def = ANXIETY_SUB_LEVEL_DEFINITIONS[subLevel];
  return { subLevel, ...def };
}

/**
 * 计算加权GAD-7总分
 */
export function calculateGAD7Score(answers: Record<string, number>): number {
  return Object.values(answers).reduce((sum, value) => sum + value, 0);
}

/**
 * 计算加权GAD-7总分（考虑维度权重）
 */
export function calculateWeightedGAD7Score(
  answers: Record<string, number>,
  questions: Question[]
): { weightedTotal: number; normalizedTotal: number } {
  let weightedTotal = 0;
  let maxWeightedTotal = 0;

  for (const question of questions) {
    const answer = answers[question.id] || 0;
    const weight = question.trait ? (DIMENSION_WEIGHTS[question.trait] || 1.0) : 1.0;
    weightedTotal += answer * weight;
    maxWeightedTotal += 3 * weight;
  }

  const normalizedTotal = Math.round((weightedTotal / maxWeightedTotal) * 84);

  return { weightedTotal, normalizedTotal };
}

export function calculateGAD7Traits(answers: Record<string, number>, questions: Question[]): TraitResult[] {
  const totalScore = calculateGAD7Score(answers);
  const { normalizedTotal } = calculateWeightedGAD7Score(answers, questions);
  const maxPossibleScore = questions.length * 3;
  
  const dimensionScores: Record<string, number> = {};
  const dimensionCounts: Record<string, number> = {};
  const dimensionWeightedScores: Record<string, number> = {};
  
  for (const question of questions) {
    if (question.trait) {
      const answer = answers[question.id] || 0;
      const weight = DIMENSION_WEIGHTS[question.trait] || 1.0;
      dimensionScores[question.trait] = (dimensionScores[question.trait] || 0) + answer;
      dimensionCounts[question.trait] = (dimensionCounts[question.trait] || 0) + 1;
      dimensionWeightedScores[question.trait] = (dimensionWeightedScores[question.trait] || 0) + answer * weight;
    }
  }
  
  const subLevel = getAnxietySubLevel(normalizedTotal);
  const subLevelInfo = getAnxietySubLevelInfo(subLevel);

  const traits: TraitResult[] = [
    {
      name: '焦虑水平',
      score: normalizedTotal,
      description: `${subLevelInfo.label} - ${subLevelInfo.description}`
    }
  ];
  
  for (const [dimKey, score] of Object.entries(dimensionScores)) {
    const dimInfo = ANXIETY_DIMENSIONS[dimKey as keyof typeof ANXIETY_DIMENSIONS];
    if (dimInfo) {
      const maxDimScore = (dimensionCounts[dimKey] || 1) * 3;
      const weight = DIMENSION_WEIGHTS[dimKey] || 1.0;
      const weightedPercentage = Math.round((score * weight / (maxDimScore * weight)) * 100);
      const weightLabel = weight >= 1.3 ? ' [高临床权重]' : weight >= 1.1 ? ' [中临床权重]' : '';
      traits.push({
        name: dimInfo.name,
        score: Math.min(100, weightedPercentage),
        description: `${dimInfo.description}${weightLabel}`
      });
    }
  }
  
  return traits;
}

export function getAnxietyLevelInfo(score: number) {
  if (score <= 16) return ANXIETY_LEVELS.minimal;
  if (score <= 33) return ANXIETY_LEVELS.mild;
  if (score <= 50) return ANXIETY_LEVELS.moderate;
  return ANXIETY_LEVELS.severe;
}

export function getExtendedAnxietyLevel(score: number) {
  if (score <= 16) return EXTENDED_ANXIETY_LEVELS.minimal;
  if (score <= 33) return EXTENDED_ANXIETY_LEVELS.mild;
  if (score <= 50) return EXTENDED_ANXIETY_LEVELS.moderate;
  return EXTENDED_ANXIETY_LEVELS.severe;
}

/**
 * 获取焦虑子级别信息
 */
export function getAnxietySubLevelDetail(score: number): AnxietySubLevelInfo {
  const subLevel = getAnxietySubLevel(score);
  return getAnxietySubLevelInfo(subLevel);
}

/**
 * 生成焦虑画像描述（基于维度模式差异化）
 */
function generateAnxietyProfile(
  dimensionWeightedScores: Record<string, number>,
  dimensionCounts: Record<string, number>
): string {
  const dimensionRatios: Record<string, number> = {};
  
  for (const [dim, weightedScore] of Object.entries(dimensionWeightedScores)) {
    const count = dimensionCounts[dim] || 1;
    const maxScore = count * 3 * (DIMENSION_WEIGHTS[dim] || 1.0);
    dimensionRatios[dim] = weightedScore / maxScore;
  }

  const sortedDims = Object.entries(dimensionRatios).sort((a, b) => b[1] - a[1]);
  const topDim = sortedDims[0];
  const bottomDim = sortedDims[sortedDims.length - 1];

  const dimNames: Record<string, string> = {
    worries: '过度担忧',
    tension: '运动性紧张',
    irritability: '易激惹',
    fear: '恐惧感受',
    physical: '躯体症状',
    cognitive: '认知症状',
    social: '社会功能影响'
  };

  const profileParts: string[] = [];

  if (topDim && topDim[1] > 0.5) {
    const topDimName = dimNames[topDim[0]] || topDim[0];
    if (topDim[1] > 0.8) {
      profileParts.push(`你的焦虑主要以${topDimName}为突出表现，这一维度严重程度较高。`);
    } else {
      profileParts.push(`你的焦虑在${topDimName}方面表现最为明显。`);
    }
  }

  if (bottomDim && bottomDim[1] < 0.2 && topDim && topDim[1] > 0.4) {
    const bottomDimName = dimNames[bottomDim[0]] || bottomDim[0];
    profileParts.push(`相对而言，${bottomDimName}方面受影响较小。`);
  }

  // 特殊模式识别
  const worriesRatio = dimensionRatios['worries'] || 0;
  const physicalRatio = dimensionRatios['physical'] || 0;
  const socialRatio = dimensionRatios['social'] || 0;
  const cognitiveRatio = dimensionRatios['cognitive'] || 0;

  if (worriesRatio > 0.6 && physicalRatio > 0.6) {
    profileParts.push('你的担忧和躯体症状同时突出，这符合广泛性焦虑障碍(GAD)的典型表现。');
  } else if (physicalRatio > 0.6 && worriesRatio < 0.3) {
    profileParts.push('你的焦虑主要表现为躯体症状而非心理担忧，这可能是躯体化倾向，建议关注身心联系。');
  } else if (worriesRatio > 0.6 && cognitiveRatio > 0.5) {
    profileParts.push('过度担忧伴随认知症状，你可能陷入反复思考的循环，建议练习认知重构和正念技术。');
  }

  if (socialRatio > 0.6) {
    profileParts.push('焦虑已明显影响你的社会功能，建议优先恢复日常活动节奏。');
  }

  return profileParts.join('');
}

export function calculateAnxietyProgress(currentQuestion: number, totalQuestions: number): number {
  return Math.round((currentQuestion / totalQuestions) * 100);
}

export function generateDetailedGAD7Report(
  answers: Record<string, number>,
  questions: Question[]
) {
  const totalScore = calculateGAD7Score(answers);
  const { weightedTotal, normalizedTotal } = calculateWeightedGAD7Score(answers, questions);
  const anxietyLevel = getAnxietyLevelInfo(totalScore);
  const extendedLevel = getExtendedAnxietyLevel(totalScore);
  const subLevel = getAnxietySubLevel(normalizedTotal);
  const subLevelInfo = getAnxietySubLevelInfo(subLevel);
  
  const dimensionScores: Record<string, number> = {};
  const dimensionCounts: Record<string, number> = {};
  const dimensionWeightedScores: Record<string, number> = {};
  
  for (const question of questions) {
    if (question.trait) {
      const answer = answers[question.id] || 0;
      const weight = DIMENSION_WEIGHTS[question.trait] || 1.0;
      dimensionScores[question.trait] = (dimensionScores[question.trait] || 0) + answer;
      dimensionCounts[question.trait] = (dimensionCounts[question.trait] || 0) + 1;
      dimensionWeightedScores[question.trait] = (dimensionWeightedScores[question.trait] || 0) + answer * weight;
    }
  }
  
  const sortedDimensions = Object.entries(dimensionScores)
    .map(([key, score]) => {
      const weight = DIMENSION_WEIGHTS[key] || 1.0;
      const maxScore = (dimensionCounts[key] || 1) * 3;
      return {
        dimension: key,
        score,
        weightedScore: dimensionWeightedScores[key] || 0,
        maxScore,
        percentage: Math.round((score / maxScore) * 100),
        weightedPercentage: Math.round((score * weight / (maxScore * weight)) * 100),
        weight,
        info: ANXIETY_DIMENSIONS[key as keyof typeof ANXIETY_DIMENSIONS]
      };
    })
    .sort((a, b) => b.weightedScore - a.weightedScore);
  
  const topDimension = sortedDimensions[0];
  const primarySymptom = topDimension?.info?.name || '总体焦虑';

  const anxietyProfile = generateAnxietyProfile(dimensionWeightedScores, dimensionCounts);
  
  const questionAnalysis = questions.map((question) => {
    const answer = answers[question.id] || 0;
    const weight = question.trait ? (DIMENSION_WEIGHTS[question.trait] || 1.0) : 1.0;
    return {
      question: question.text,
      score: answer,
      weightedScore: Math.round(answer * weight * 10) / 10,
      severity: answer === 0 ? '无' : answer === 1 ? '轻度' : answer === 2 ? '中度' : '重度',
      dimension: question.trait,
      dimensionWeight: weight
    };
  });
  
  const mostSevere = questionAnalysis.reduce((max, q) => 
    (q.score > max.score ? q : max),
    questionAnalysis[0]
  );
  
  const personalizedTips: string[] = [];
  if (normalizedTotal >= 43) {
    personalizedTips.push('建议尽快安排时间咨询专业心理师或精神科医生');
    personalizedTips.push('可以考虑让信任的人陪同就医');
    personalizedTips.push('在等待就医期间，练习4-7-8呼吸法缓解急性焦虑');
  }
  if (normalizedTotal >= 29) {
    personalizedTips.push('开始每天的放松练习，特别是4-7-8呼吸法');
    personalizedTips.push('记录焦虑日记，找出触发因素和模式');
    personalizedTips.push('考虑认知行为疗法(CBT)自助资源');
  }
  if (normalizedTotal >= 13) {
    personalizedTips.push('注意工作生活平衡，避免过度压力');
    personalizedTips.push('增加运动和户外活动时间');
    personalizedTips.push('练习正念冥想，每天10-15分钟');
  }
  if (normalizedTotal >= 7) {
    personalizedTips.push('保持规律的作息和健康的生活习惯');
    personalizedTips.push('增加与家人朋友的交流，不要孤立自己');
  }
  personalizedTips.push('关注自己的情绪变化，及时调整');
  
  const dimensionRecommendations = sortedDimensions.slice(0, 3).map(dim => ({
    dimension: dim.dimension,
    name: dim.info?.name || dim.dimension,
    score: dim.percentage,
    weightedScore: Math.round(dim.weightedScore * 10) / 10,
    weight: dim.weight,
    tips: dim.info?.recommendations || []
  }));
  
  const recs = anxietyLevel.recommendations as any;

  const urgencyPrefix = subLevelInfo.urgency >= 4 
    ? '⚠️ 紧急建议：' 
    : subLevelInfo.urgency >= 2 
      ? '💡 建议关注：' 
      : '✅ 继续保持：';
  
  return {
    summary: {
      title: `${subLevelInfo.label}`,
      score: normalizedTotal,
      rawScore: totalScore,
      weightedScore: weightedTotal,
      description: anxietyLevel.description,
      color: subLevelInfo.color,
      subLevel: subLevelInfo,
      urgencyPrefix
    },
    detailedAnalysis: {
      signs: anxietyLevel.detailed,
      primarySymptom,
      anxietyProfile,
      mostSevereSymptom: mostSevere,
      topDimensions: sortedDimensions.slice(0, 3),
      questionAnalysis,
      dimensionWeightedScores
    },
    recommendations: {
      immediate: GAD7_COPING_STRATEGIES.immediate,
      cognitive: GAD7_COPING_STRATEGIES.cognitive,
      lifestyle: GAD7_COPING_STRATEGIES.lifestyle,
      social: GAD7_COPING_STRATEGIES.social,
      professional: GAD7_COPING_STRATEGIES.professional,
      dimensionTips: dimensionRecommendations,
      relaxation: GAD7_RELAXATION_TECHNIQUES,
      healthyHabits: GAD7_HEALTHY_HABITS
    },
    personalizedTips,
    dailyPractices: anxietyLevel.dailyPractices,
    clinicalNote: subLevelInfo.clinicalNote,
    resources: {
      available: recs?.continue || recs?.immediate,
      professional: [
        '全国心理援助热线：400-161-9995',
        '北京心理危机研究与干预中心：010-82951332'
      ]
    }
  };
}
