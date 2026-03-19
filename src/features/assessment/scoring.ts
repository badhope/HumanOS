import type { AssessmentDefinition, ResultProfileDefinition } from '@/shared/types';

interface ScoredResult {
  dimensionScores: Record<string, number>;
  mbtiType: string;
  profile: ResultProfileDefinition | null;
}

export function calculateMBTIScores(
  assessment: AssessmentDefinition,
  answers: Record<string, number>
): ScoredResult {
  const dimensionScores: Record<string, number> = {};
  const dimensionCounts: Record<string, number> = {};

  for (const question of assessment.questions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;

    const dimension = question.dimension;
    if (!dimensionScores[dimension]) {
      dimensionScores[dimension] = 0;
      dimensionCounts[dimension] = 0;
    }

    const option = question.options.find(o => o.value === answer);
    let normalizedScore = answer;

    if (option) {
      const maxValue = Math.max(...question.options.map(o => o.value));
      const minValue = Math.min(...question.options.map(o => o.value));
      if (question.reverse) {
        normalizedScore = maxValue + minValue - answer;
      }
    }

    dimensionScores[dimension] += normalizedScore;
    dimensionCounts[dimension]++;
  }

  for (const dim of Object.keys(dimensionScores)) {
    if (dimensionCounts[dim] > 0) {
      dimensionScores[dim] = dimensionScores[dim] / dimensionCounts[dim];
    }
  }

  const mbtiType = getMBTIType(dimensionScores);

  return {
    dimensionScores,
    mbtiType,
    profile: null,
  };
}

function getMBTIType(dimensionScores: Record<string, number>): string {
  const ei = dimensionScores['EI'] || 0;
  const sn = dimensionScores['SN'] || 0;
  const tf = dimensionScores['TF'] || 0;
  const jp = dimensionScores['JP'] || 0;

  const type =
    (ei >= 0 ? 'E' : 'I') +
    (sn >= 0 ? 'N' : 'S') +
    (tf >= 0 ? 'T' : 'F') +
    (jp >= 0 ? 'J' : 'P');

  return type;
}

export function getResultProfile(
  assessment: AssessmentDefinition,
  mbtiType: string,
  _dimensionScores: Record<string, number>
): ResultProfileDefinition | null {
  const { resultProfiles } = assessment;

  if (!resultProfiles || resultProfiles.length === 0) {
    return null;
  }

  const matchedProfile = resultProfiles.find(profile => profile.id === mbtiType);
  return matchedProfile || null;
}

export function generateDimensionDescriptions(dimensionScores: Record<string, number>): Record<string, string> {
  const descriptions: Record<string, string> = {};

  const ei = dimensionScores['EI'] || 0;
  const sn = dimensionScores['SN'] || 0;
  const tf = dimensionScores['TF'] || 0;
  const jp = dimensionScores['JP'] || 0;

  if (ei >= 0) {
    descriptions['EI'] = `外向型 (E) 倾向明显，您更倾向于从外部世界获取能量，善于社交和与人交流`;
  } else {
    descriptions['EI'] = `内向型 (I) 倾向明显，您更倾向于从内部世界获取能量，享受独处和深度思考`;
  }

  if (sn >= 0) {
    descriptions['SN'] = `直觉型 (N) 倾向明显，您更善于观察可能性和模式，喜欢抽象思维和创新`;
  } else {
    descriptions['SN'] = `感觉型 (S) 倾向明显，您更关注具体的事实和细节，注重实际和可操作的信息`;
  }

  if (tf >= 0) {
    descriptions['TF'] = `思考型 (T) 倾向明显，您更倾向于基于逻辑做决策，注重客观分析和公平公正`;
  } else {
    descriptions['TF'] = `情感型 (F) 倾向明显，您更倾向于考虑他人感受做决策，注重和谐与人际关系的维护`;
  }

  if (jp >= 0) {
    descriptions['JP'] = `判断型 (J) 倾向明显，您更倾向于有计划和结构化，喜欢按既定方式生活`;
  } else {
    descriptions['JP'] = `知觉型 (P) 倾向明显，您更倾向于灵活和开放，喜欢保持弹性适应变化`;
  }

  return descriptions;
}

export function generateRecommendations(_mbtiType: string, dimensionScores: Record<string, number>): string[] {
  const recommendations: string[] = [];

  const ei = dimensionScores['EI'] || 0;
  const sn = dimensionScores['SN'] || 0;
  const tf = dimensionScores['TF'] || 0;
  const jp = dimensionScores['JP'] || 0;

  if (ei >= 0) {
    recommendations.push('尝试给自己留出更多独处的时间，进行深度思考和自我反思');
    recommendations.push('可以在社交活动中担任倾听者的角色，而不只是发言者');
  } else {
    recommendations.push('可以主动参与一些社交活动，拓展人际网络，获取新的观点和灵感');
    recommendations.push('尝试在小组讨论中发表自己的见解，锻炼表达能力');
  }

  if (sn >= 0) {
    recommendations.push('在关注细节的同时，也尝试从宏观角度看待问题，培养全局思维');
    recommendations.push('可以多阅读科幻、理论类书籍，激发直觉思维能力');
  } else {
    recommendations.push('在处理具体事务时，多关注细节和数据，提升执行的精确度');
    recommendations.push('可以练习将抽象概念转化为实际可行的方案');
  }

  if (tf >= 0) {
    recommendations.push('在做决策时适当考虑情感因素，学会欣赏多元价值观');
    recommendations.push('可以多关注自己和他人的情绪需求，而不只是逻辑正确');
  } else {
    recommendations.push('尝试用更理性的方式分析问题，在情感与逻辑间找到平衡');
    recommendations.push('可以学习一些基础的逻辑思维技巧，提升决策质量');
  }

  if (jp >= 0) {
    recommendations.push('适当放松对计划的控制，拥抱变化和不确定性，发现新的可能性');
    recommendations.push('可以尝试一些计划外的活动，体验随性的乐趣');
  } else {
    recommendations.push('尝试为生活和工作制定一些基本框架，提升效率和执行力');
    recommendations.push('可以在保持灵活的同时，为重要的事项设定明确的截止日期');
  }

  return recommendations;
}