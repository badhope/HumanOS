import { Question, TraitResult } from '../types';
import { 
  BIG_FIVE_TRAITS, 
  TRAIT_INTERPRETATIONS,
  PERSONALITY_COMBINATIONS,
  CAREER_RECOMMENDATIONS
} from '../data/bigFiveData';

/**
 * 大五人格评分算法 - 优化版
 * 
 * 计分规则：
 * 1. 每个特质12题（6正向 + 6反向）
 * 2. 正向题直接计分：1-5
 * 3. 反向题反向计分：6 - score
 * 4. 应用FACET_WEIGHTS对面条题目加权
 * 5. 计算加权原始分总和
 * 6. 转换为标准T分数（均值50，标准差10）
 * 7. 使用5级差异化解读系统
 */

/**
 * 标准T分数常模（NORMS）
 * 
 * 基于大五人格理论的一般人群常模数据。
 * 当前使用的均值和标准差为近似值，用于模拟标准T分数转换。
 * 在实际应用中，建议使用经过实证验证的本地化常模数据。
 * 
 * 参考来源：
 * 1. Costa, P.T., & McCrae, R.R. (1992). Revised NEO Personality Inventory.
 * 2. 戴晓阳等 (2011). 大五人格问卷在中国人群中的适用性研究.
 */
const NORMS = {
  O: { mean: 36, sd: 7 },
  C: { mean: 38, sd: 6 },
  E: { mean: 34, sd: 8 },
  A: { mean: 37, sd: 6 },
  N: { mean: 28, sd: 8 }
};

const TRAIT_KEYS = ['O', 'C', 'E', 'A', 'N'] as const;

function getTraitByKey(traits: TraitResult[], key: string): TraitResult | undefined {
  const traitInfo = BIG_FIVE_TRAITS[key as keyof typeof BIG_FIVE_TRAITS];
  if (!traitInfo) return undefined;
  return traits.find(t => t.name === traitInfo.name);
}

/**
 * 面条权重系统
 * 
 * 每个特质有6个facet，不同facet的题目对整体特质的贡献不同。
 * 权重范围 0.7 ~ 1.4，默认1.0表示标准贡献。
 * 
 * 开放性(O) facets:
 *   - 审美敏感 (aesthetic): O3, O10 → 1.3 (核心区分维度)
 *   - 智能好奇 (intellectual): O2, O8 → 1.4 (核心区分维度)
 *   - 想象力 (imagination): O6, O7 → 1.1
 *   - 冒险性 (adventure): O5, O9 → 1.0
 *   - 价值观开放 (values): O4, O11 → 0.9
 *   - 求新性 (variety): O1, O12 → 0.8
 * 
 * 尽责性(C) facets:
 *   - 自律 (self-discipline): C6, C11 → 1.4 (核心区分维度)
 *   - 责任感 (dutifulness): C3, C9 → 1.3
 *   - 条理性 (order): C2, C8 → 1.0
 *   - 追求成就 (achievement): C4, C7 → 1.2
 *   - 深思熟虑 (deliberation): C12, C10 → 1.1
 *   - 胜任感 (competence): C1, C5 → 0.8
 * 
 * 外向性(E) facets:
 *   - 热情 (warmth): E6, E7 → 1.2
 *   - 乐群性 (gregariousness): E2, E10 → 1.3 (核心区分维度)
 *   - 独断性 (assertiveness): E3, E8 → 1.1
 *   - 活跃性 (activity): E1, E9 → 1.0
 *   - 刺激寻求 (excitement): E5, E11 → 0.9
 *   - 积极情绪 (positive emotion): E4, E12 → 1.4 (核心区分维度)
 * 
 * 宜人性(A) facets:
 *   - 信任 (trust): A1, A10 → 1.2
 *   - 同理心 (empathy): A5, A7 → 1.4 (核心区分维度)
 *   - 利他 (altruism): A4, A12 → 1.3
 *   - 依从 (compliance): A3, A9 → 1.0
 *   - 坦率 (straightforwardness): A2, A8 → 0.9
 *   - 谦虚 (modesty): A6, A11 → 0.8
 * 
 * 情绪稳定性(N) facets:
 *   - 焦虑 (anxiety): N3, N6 → 1.4 (核心区分维度)
 *   - 抑郁 (depression): N5, N8 → 1.3
 *   - 脆弱性 (vulnerability): N1, N4 → 1.2
 *   - 自我意识 (self-consciousness): N2, N12 → 1.1
 *   - 冲动性 (impulsiveness): N9, N10 → 0.9
 *   - 愤怒敌意 (anger): N7, N11 → 0.8
 */
export const FACET_WEIGHTS: Record<string, number> = {
  O1: 0.8,
  O2: 1.4,
  O3: 1.3,
  O4: 0.9,
  O5: 1.0,
  O6: 1.1,
  O7: 1.1,
  O8: 1.4,
  O9: 1.0,
  O10: 1.3,
  O11: 0.9,
  O12: 0.8,

  C1: 0.8,
  C2: 1.0,
  C3: 1.3,
  C4: 1.2,
  C5: 0.8,
  C6: 1.4,
  C7: 1.2,
  C8: 1.0,
  C9: 1.3,
  C10: 1.1,
  C11: 1.4,
  C12: 1.1,

  E1: 1.0,
  E2: 1.3,
  E3: 1.1,
  E4: 1.4,
  E5: 0.9,
  E6: 1.2,
  E7: 1.2,
  E8: 1.1,
  E9: 1.0,
  E10: 1.3,
  E11: 0.9,
  E12: 1.4,

  A1: 1.2,
  A2: 0.9,
  A3: 1.0,
  A4: 1.3,
  A5: 1.4,
  A6: 0.8,
  A7: 1.4,
  A8: 0.9,
  A9: 1.0,
  A10: 1.2,
  A11: 0.8,
  A12: 1.3,

  N1: 1.2,
  N2: 1.1,
  N3: 1.4,
  N4: 1.2,
  N5: 1.3,
  N6: 1.4,
  N7: 0.8,
  N8: 1.3,
  N9: 0.9,
  N10: 0.9,
  N11: 0.8,
  N12: 1.1
};

/**
 * 5级差异化解读系统
 * 
 * T-score 范围与解读：
 * - ≤30: 非常低 (Very Low) - 该特质极不显著
 * - 31-40: 偏低 (Low) - 该特质低于平均水平
 * - 41-49: 中等偏低 (Low-Moderate) - 略低于平均水平
 * - 50-59: 中等偏高 (High-Moderate) - 略高于平均水平
 * - 60-69: 偏高 (High) - 该特质高于平均水平
 * - ≥70: 非常高 (Very High) - 该特质非常显著
 */
type ScoreLevel = 'veryLow' | 'low' | 'lowModerate' | 'highModerate' | 'high' | 'veryHigh';

function getScoreLevel(tScore: number): ScoreLevel {
  if (tScore <= 30) return 'veryLow';
  if (tScore <= 40) return 'low';
  if (tScore <= 49) return 'lowModerate';
  if (tScore <= 59) return 'highModerate';
  if (tScore <= 69) return 'high';
  return 'veryHigh';
}

interface ScoreInterpretation {
  title: string;
  description: string;
  level: ScoreLevel;
  intensity: number;
}

function generateInterpretation(traitKey: string, tScore: number): ScoreInterpretation {
  const traitInfo = BIG_FIVE_TRAITS[traitKey];
  const level = getScoreLevel(tScore);
  const intensity = Math.max(1, Math.min(5, Math.round((tScore - 20) / 12)));

  const interpretations: Record<string, Record<ScoreLevel, { title: string; description: string }>> = {
    O: {
      veryLow: {
        title: '极度务实保守',
        description: `你在${traitInfo.name}方面得分非常低，强烈偏好熟悉和传统的方式。你对新想法和变化持明显的抗拒态度，非常重视稳定性和可预测性。面对未知事物时，你倾向于选择已知的安全选项。`
      },
      low: {
        title: '偏传统务实',
        description: `你在${traitInfo.name}方面得分偏低，更偏好熟悉的事物和经过验证的方法。你对新体验持谨慎态度，但并非完全排斥。你更看重实用性和可靠性。`
      },
      lowModerate: {
        title: '略偏务实',
        description: `你在${traitInfo.name}方面略低于平均水平，对新鲜事物有一定的兴趣但更倾向于实用主义。你能在传统与创新之间找到平衡，但遇到选择时更偏向熟悉的方式。`
      },
      highModerate: {
        title: '略偏开放',
        description: `你在${traitInfo.name}方面略高于平均水平，对新想法和体验有一定的兴趣。你愿意尝试新事物，但不会盲目追求变化，能在开放与务实之间保持平衡。`
      },
      high: {
        title: '高度开放性',
        description: `你在${traitInfo.name}方面得分较高，富有想象力和创造力，对新想法和经历持开放态度。你喜欢挑战传统，追求多样性，对艺术和哲学有浓厚兴趣。`
      },
      veryHigh: {
        title: '极度开放创新',
        description: `你在${traitInfo.name}方面得分非常高，拥有极其丰富的想象力和强烈的求知欲。你几乎本能地拥抱变化和新体验，对艺术、哲学和跨领域思维有深刻的热情。你可能需要留意过于理想化或难以在单一方向上深入的倾向。`
      }
    },
    C: {
      veryLow: {
        title: '极度随性自由',
        description: `你在${traitInfo.name}方面得分非常低，极度偏好自由随性的生活方式。你几乎不受计划和规则的约束，可能经常拖延，对条理性和自律有明显的抗拒。你需要找到能包容你灵活风格的环境。`
      },
      low: {
        title: '偏随性灵活',
        description: `你在${traitInfo.name}方面得分偏低，比较随性，喜欢顺其自然。你适应性强，不过分追求完美，但可能在时间管理和任务完成方面需要更多自律。`
      },
      lowModerate: {
        title: '略偏灵活',
        description: `你在${traitInfo.name}方面略低于平均水平，有一定的组织能力但更倾向于灵活应变。你能在需要时制定计划，但更享受即兴和适应性的工作方式。`
      },
      highModerate: {
        title: '略偏尽责',
        description: `你在${traitInfo.name}方面略高于平均水平，做事有一定的条理性和责任感。你能在灵活和规范之间切换，大多数情况下能按时完成任务。`
      },
      high: {
        title: '高度尽责性',
        description: `你在${traitInfo.name}方面得分较高，非常有条理、可靠、自律。你做事有计划，追求卓越，值得他人信赖，是团队中最可靠的成员。`
      },
      veryHigh: {
        title: '极度尽责完美',
        description: `你在${traitInfo.name}方面得分非常高，拥有极强的自律性和组织能力。你可能表现出明显的完美主义倾向，对自己和他人都有很高的标准。需要注意避免过度消耗和难以放松的问题。`
      }
    },
    E: {
      veryLow: {
        title: '极度内向独处',
        description: `你在${traitInfo.name}方面得分非常低，极度偏好独处和安静的环境。社交活动对你来说非常消耗能量，你几乎总是选择独自完成任务。你拥有极其深刻的内心世界，但可能需要适度拓展社交能力。`
      },
      low: {
        title: '偏内向',
        description: `你在${traitInfo.name}方面得分偏低，比较安静内敛，享受独处时间。你深思熟虑，做事专注，在小型社交场合中比大型聚会更自在。`
      },
      lowModerate: {
        title: '略偏内敛',
        description: `你在${traitInfo.name}方面略低于平均水平，社交上偏向内敛但不排斥互动。你享受适度的社交，但之后需要独处来恢复能量。`
      },
      highModerate: {
        title: '略偏外向',
        description: `你在${traitInfo.name}方面略高于平均水平，社交上比较活跃但不张扬。你能在社交和独处之间灵活切换，既享受与人互动也珍惜个人空间。`
      },
      high: {
        title: '高度外向性',
        description: `你在${traitInfo.name}方面得分较高，精力充沛，喜爱社交，乐观向上。你在人群中感到自在，喜欢成为焦点，善于表达和领导。`
      },
      veryHigh: {
        title: '极度外向活跃',
        description: `你在${traitInfo.name}方面得分非常高，拥有极其旺盛的社交精力和表现欲。你几乎无法忍受长时间的独处，总是寻求社交刺激和关注。需要注意在社交与内省之间找到平衡。`
      }
    },
    A: {
      veryLow: {
        title: '极度竞争直接',
        description: `你在${traitInfo.name}方面得分非常低，极度竞争性和直接坦率。你几乎不会为了和谐而妥协，对他人动机持高度怀疑态度。你的批判性思维极强，但可能需要注意人际关系的维护。`
      },
      low: {
        title: '偏竞争性',
        description: `你在${traitInfo.name}方面得分偏低，比较有竞争力，倾向于质疑和挑战。你实事求是，直接坦率，在竞争环境中表现出色。`
      },
      lowModerate: {
        title: '略偏独立',
        description: `你在${traitInfo.name}方面略低于平均水平，在合作与独立之间偏向独立思考。你能与人合作但不会轻易妥协自己的立场，重视诚实胜过圆滑。`
      },
      highModerate: {
        title: '略偏合作',
        description: `你在${traitInfo.name}方面略高于平均水平，在独立与合作之间偏向合作。你善于倾听他人意见，愿意为团队和谐做出适度让步。`
      },
      high: {
        title: '高度宜人性',
        description: `你在${traitInfo.name}方面得分较高，友善、合作、有同理心。你信任他人，乐于助人，容易相处，是团队中的和谐因子。`
      },
      veryHigh: {
        title: '极度友善利他',
        description: `你在${traitInfo.name}方面得分非常高，拥有极强的同理心和利他精神。你可能几乎无法拒绝他人的请求，总是把他人的需要放在自己之前。需要特别留意建立健康的个人边界，避免被他人利用。`
      }
    },
    N: {
      veryLow: {
        title: '极度敏感脆弱',
        description: `你在${traitInfo.name}方面得分非常低（即神经质极高），情绪极度敏感，几乎无法承受任何压力。你经常被焦虑和负面情绪困扰，日常功能可能受到明显影响。强烈建议寻求专业心理支持。`
      },
      low: {
        title: '情感较丰富',
        description: `你在${traitInfo.name}方面得分偏低（即神经质较高），情感比较丰富，对事物有强烈感受。你可能更容易感到焦虑或压力，在支持性环境中表现更好。`
      },
      lowModerate: {
        title: '略偏敏感',
        description: `你在${traitInfo.name}方面略低于平均水平，情绪上偏向敏感但不至于严重影响生活。你有时会对压力反应较大，但通常能自行调整。`
      },
      highModerate: {
        title: '略偏稳定',
        description: `你在${traitInfo.name}方面略高于平均水平，情绪上偏向稳定。你能在大多数情况下保持冷静，偶尔有情绪波动但恢复较快。`
      },
      high: {
        title: '高度情绪稳定',
        description: `你在${traitInfo.name}方面得分较高，情绪稳定，冷静自信，能很好地应对压力。你不容易焦虑或沮丧，是团队中的稳定器。`
      },
      veryHigh: {
        title: '极度冷静坚韧',
        description: `你在${traitInfo.name}方面得分非常高（即神经质极低），拥有极其出色的情绪调节能力。即使在极端压力下也能保持冷静和理性。需要注意可能因此低估情感的重要性或对他人情绪不够敏感。`
      }
    }
  };

  const interp = interpretations[traitKey]?.[level] || {
    title: `${traitInfo.name}中等`,
    description: `你在${traitInfo.name}方面表现中等。`
  };

  return {
    title: interp.title,
    description: interp.description,
    level,
    intensity
  };
}

function rawToTScore(raw: number, mean: number, sd: number): number {
  const tScore = Math.round(50 + 10 * (raw - mean) / sd);
  return Math.max(10, Math.min(90, tScore));
}

function calculateQuestionScore(response: number, isReverse: boolean): number {
  if (isReverse) {
    return 6 - response;
  }
  return response;
}

export function calculateBigFiveScores(
  answers: Record<string, number>,
  questions: Question[]
): TraitResult[] {
  const traitRawScores: Record<string, number> = {
    O: 0, C: 0, E: 0, A: 0, N: 0
  };
  
  const traitWeightSums: Record<string, number> = {
    O: 0, C: 0, E: 0, A: 0, N: 0
  };

  for (const question of questions) {
    const response = answers[question.id];
    if (response && question.trait) {
      const score = calculateQuestionScore(response, !!question.reverse);
      const weight = FACET_WEIGHTS[question.id] || 1.0;
      traitRawScores[question.trait] += score * weight;
      traitWeightSums[question.trait] += weight;
    }
  }

  const results: TraitResult[] = TRAIT_KEYS.map((traitKey) => {
    const weightedRawScore = traitRawScores[traitKey];
    const avgWeight = traitWeightSums[traitKey] / 12;
    const normalizedRawScore = weightedRawScore / avgWeight;
    
    const norm = NORMS[traitKey];
    const traitInfo = BIG_FIVE_TRAITS[traitKey];
    
    const tScore = rawToTScore(normalizedRawScore, norm.mean, norm.sd);
    
    const interpretation = generateInterpretation(traitKey, tScore);
    
    return {
      name: traitInfo.name,
      score: tScore,
      description: interpretation.description
    };
  });
  
  return results;
}

export function calculateOverallScore(traits: TraitResult[]): number {
  let total = 0;
  let weightSum = 0;
  
  TRAIT_KEYS.forEach((key) => {
    const trait = getTraitByKey(traits, key);
    if (!trait) return;
    const weight = key === 'N' ? 2 : 1;
    total += trait.score * weight;
    weightSum += weight;
  });
  
  return Math.round(total / weightSum);
}

export function generateBigFiveReport(
  traits: TraitResult[]
) {
  const traitAnalyses = TRAIT_KEYS.map((traitKey) => {
    const trait = traits.find(t => t.name === BIG_FIVE_TRAITS[traitKey].name);
    if (!trait) return null;
    
    const tScore = trait.score;
    const level = getScoreLevel(tScore);
    
    let interpretation;
    if (tScore >= 50) {
      interpretation = TRAIT_INTERPRETATIONS[traitKey].high;
    } else {
      interpretation = TRAIT_INTERPRETATIONS[traitKey].low;
    }
    
    return {
      key: traitKey,
      ...trait,
      fullInterpretation: interpretation,
      traitInfo: BIG_FIVE_TRAITS[traitKey],
      scoreLevel: level,
      scoreIntensity: Math.max(1, Math.min(5, Math.round((tScore - 20) / 12)))
    };
  }).filter(Boolean);

  const sortedTraits = [...traits].sort((a, b) => b.score - a.score);
  const topTraits = sortedTraits.slice(0, 3);
  
  const getTraitKey = (name: string) => {
    for (const key of TRAIT_KEYS) {
      if (BIG_FIVE_TRAITS[key].name === name) return key;
    }
    return null;
  };
  
  const topTraitKeys = topTraits.map(t => getTraitKey(t.name)).filter(Boolean) as string[];
  const combinationKey = topTraitKeys.slice(0, 3).join('_');
  const personalityType = PERSONALITY_COMBINATIONS[combinationKey as keyof typeof PERSONALITY_COMBINATIONS];

  const careerRecommendations: string[] = [];
  topTraitKeys.forEach(key => {
    if (key) {
      if (key === 'N') {
        const trait = traits.find(t => t.name === BIG_FIVE_TRAITS.N.name);
        if (trait && trait.score >= 60) {
          careerRecommendations.push(...CAREER_RECOMMENDATIONS.N_high);
        } else if (trait) {
          careerRecommendations.push(...CAREER_RECOMMENDATIONS.N_low);
        }
      } else if (CAREER_RECOMMENDATIONS[key as keyof typeof CAREER_RECOMMENDATIONS]) {
        careerRecommendations.push(...CAREER_RECOMMENDATIONS[key as keyof typeof CAREER_RECOMMENDATIONS]);
      }
    }
  });

  const uniqueCareers = [...new Set(careerRecommendations)].slice(0, 8);

  return {
    summary: {
      overallScore: calculateOverallScore(traits),
      topTraits,
      lowestTrait: sortedTraits[sortedTraits.length - 1],
      personalityType
    },
    traitAnalyses,
    recommendations: {
      career: uniqueCareers,
      personalGrowth: traitAnalyses.filter(a => a && a.fullInterpretation?.detailed?.growthAreas)
        .flatMap(a => a?.fullInterpretation?.detailed?.growthAreas || []).slice(0, 6),
      relationships: traitAnalyses.filter(a => a && a.fullInterpretation?.detailed?.relationships)
        .map(a => a?.fullInterpretation?.detailed?.relationships)[0],
      workStyle: traitAnalyses.filter(a => a && a.fullInterpretation?.detailed?.workStyle)
        .map(a => a?.fullInterpretation?.detailed?.workStyle)[0]
    },
    strengths: traitAnalyses.filter(a => a && a.fullInterpretation?.detailed?.strengths)
      .flatMap(a => a?.fullInterpretation?.detailed?.strengths || []).slice(0, 8),
    blindSpots: traitAnalyses.filter(a => a && a.fullInterpretation?.detailed?.potentialChallenges)
      .flatMap(a => a?.fullInterpretation?.detailed?.potentialChallenges || []).slice(0, 6)
  };
}

export function generatePersonalityProfile(traits: TraitResult[]): string {
  const sortedTraits = [...traits].sort((a, b) => b.score - a.score);
  const highestTrait = sortedTraits[0];
  const lowestTrait = sortedTraits[4];
  
  const profileParts: string[] = [];
  
  const highestLevel = getScoreLevel(highestTrait.score);
  const lowestLevel = getScoreLevel(lowestTrait.score);
  
  if (highestLevel === 'veryHigh') {
    profileParts.push(`你最突出的特质是【${highestTrait.name}】，表现极为显著。`);
  } else if (highestLevel === 'high') {
    profileParts.push(`你最突出的特质是【${highestTrait.name}】。`);
  } else {
    profileParts.push(`你相对最突出的特质是【${highestTrait.name}】，但整体表现较为均衡。`);
  }
  
  if (lowestLevel === 'veryLow') {
    profileParts.push(`而【${lowestTrait.name}】是你最不显著的特质，两者形成鲜明对比。`);
  } else if (lowestLevel === 'low') {
    profileParts.push(`相对较弱的是【${lowestTrait.name}】。`);
  } else if (lowestTrait.score < 45) {
    profileParts.push(`【${lowestTrait.name}】方面相对不那么突出。`);
  }
  
  const traitE = getTraitByKey(traits, 'E');
  if (traitE) {
    if (traitE.score > 60) {
      profileParts.push('你善于社交，喜欢与人交流。');
    } else if (traitE.score < 40) {
      profileParts.push('你比较内敛，喜欢安静独处的时间。');
    } else {
      profileParts.push('你在社交与独处之间能灵活切换。');
    }
  }
  
  const traitC = getTraitByKey(traits, 'C');
  if (traitC) {
    if (traitC.score > 60) {
      profileParts.push('你做事认真负责，值得信赖。');
    } else if (traitC.score < 40) {
      profileParts.push('你更偏好灵活自由的工作方式。');
    }
  }
  
  const traitO = getTraitByKey(traits, 'O');
  if (traitO) {
    if (traitO.score > 60) {
      profileParts.push('你对新体验和创意充满热情。');
    } else if (traitO.score < 40) {
      profileParts.push('你更重视实用性和稳定性。');
    }
  }
  
  const traitN = getTraitByKey(traits, 'N');
  if (traitN) {
    if (traitN.score > 60) {
      profileParts.push('你的情绪调节能力出色，是他人眼中的稳定力量。');
    } else if (traitN.score < 40) {
      profileParts.push('你对情感体验非常敏感，这赋予你深刻的共情能力。');
    }
  }
  
  return profileParts.join(' ');
}

export function calculateProgress(
  answers: Record<string, number>,
  totalQuestions: number
): { completed: number; percentage: number } {
  const completed = Object.keys(answers).length;
  const percentage = Math.round((completed / totalQuestions) * 100);
  return { completed, percentage };
}
