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

export function calculateGAD7Score(answers: Record<string, number>): number {
  return Object.values(answers).reduce((sum, value) => sum + value, 0);
}

export function calculateGAD7Traits(answers: Record<string, number>, questions: Question[]): TraitResult[] {
  const totalScore = calculateGAD7Score(answers);
  const maxPossibleScore = questions.length * 3;
  
  const dimensionScores: Record<string, number> = {};
  const dimensionCounts: Record<string, number> = {};
  
  for (const question of questions) {
    if (question.trait) {
      const answer = answers[question.id] || 0;
      dimensionScores[question.trait] = (dimensionScores[question.trait] || 0) + answer;
      dimensionCounts[question.trait] = (dimensionCounts[question.trait] || 0) + 1;
    }
  }
  
  const traits: TraitResult[] = [
    {
      name: '焦虑水平',
      score: totalScore,
      description: getAnxietyLevelInfo(totalScore).description
    }
  ];
  
  for (const [dimKey, score] of Object.entries(dimensionScores)) {
    const dimInfo = (ANXIETY_DIMENSIONS as any)[dimKey];
    if (dimInfo) {
      const maxDimScore = (dimensionCounts[dimKey] || 1) * 3;
      const percentage = Math.round((score / maxDimScore) * 100);
      traits.push({
        name: dimInfo.name,
        score: percentage,
        description: dimInfo.description
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

export function calculateAnxietyProgress(currentQuestion: number, totalQuestions: number): number {
  return Math.round((currentQuestion / totalQuestions) * 100);
}

export function generateDetailedGAD7Report(
  answers: Record<string, number>,
  questions: Question[]
) {
  const totalScore = calculateGAD7Score(answers);
  const anxietyLevel = getAnxietyLevelInfo(totalScore);
  const extendedLevel = getExtendedAnxietyLevel(totalScore);
  
  const dimensionScores: Record<string, number> = {};
  const dimensionCounts: Record<string, number> = {};
  
  for (const question of questions) {
    if (question.trait) {
      const answer = answers[question.id] || 0;
      dimensionScores[question.trait] = (dimensionScores[question.trait] || 0) + answer;
      dimensionCounts[question.trait] = (dimensionCounts[question.trait] || 0) + 1;
    }
  }
  
  const sortedDimensions = Object.entries(dimensionScores)
    .map(([key, score]) => ({
      dimension: key,
      score,
      maxScore: (dimensionCounts[key] || 1) * 3,
      percentage: Math.round((score / ((dimensionCounts[key] || 1) * 3)) * 100),
      info: (ANXIETY_DIMENSIONS as any)[key]
    }))
    .sort((a, b) => b.score - a.score);
  
  const topDimension = sortedDimensions[0];
  const primarySymptom = topDimension?.info?.name || '总体焦虑';
  
  const questionAnalysis = questions.map((question) => {
    const answer = answers[question.id] || 0;
    return {
      question: question.text,
      score: answer,
      severity: answer === 0 ? '无' : answer === 1 ? '轻度' : answer === 2 ? '中度' : '重度',
      dimension: question.trait
    };
  });
  
  const mostSevere = questionAnalysis.reduce((max, q) => 
    (q.score > max.score ? q : max),
    questionAnalysis[0]
  );
  
  const personalizedTips: string[] = [];
  if (totalScore >= 50) {
    personalizedTips.push('建议尽快安排时间咨询专业心理师');
    personalizedTips.push('可以考虑让信任的人陪同就医');
  }
  if (totalScore >= 33) {
    personalizedTips.push('开始每天的放松练习，特别是4-7-8呼吸法');
    personalizedTips.push('记录焦虑日记，找出触发因素');
  }
  if (totalScore >= 16) {
    personalizedTips.push('注意工作生活平衡，避免过度压力');
    personalizedTips.push('增加运动和户外活动时间');
  }
  personalizedTips.push('保持规律的作息和健康的生活习惯');
  personalizedTips.push('增加与家人朋友的交流，不要孤立自己');
  
  const dimensionRecommendations = sortedDimensions.slice(0, 3).map(dim => ({
    dimension: dim.dimension,
    name: dim.info?.name || dim.dimension,
    score: dim.percentage,
    tips: dim.info?.recommendations || []
  }));
  
  const recs = anxietyLevel.recommendations as any;
  
  return {
    summary: {
      title: anxietyLevel.name,
      score: totalScore,
      description: anxietyLevel.description,
      color: anxietyLevel.color
    },
    detailedAnalysis: {
      signs: anxietyLevel.detailed,
      primarySymptom: primarySymptom,
      mostSevereSymptom: mostSevere,
      topDimensions: sortedDimensions.slice(0, 3),
      questionAnalysis: questionAnalysis
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
    personalizedTips: personalizedTips,
    dailyPractices: anxietyLevel.dailyPractices,
    resources: {
      available: recs?.continue || recs?.immediate,
      professional: [
        '全国心理援助热线：400-161-9995',
        '北京心理危机研究与干预中心：010-82951332'
      ]
    }
  };
}
