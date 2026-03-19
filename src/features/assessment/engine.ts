import type { Assessment, AssessmentResult, Dimension } from '@/shared/types';

export interface AssessmentEngine {
  loadAssessment: (assessmentId: string) => Promise<Assessment>;
  calculateDimensionScores: (
    answers: Record<string, number>,
    dimensions: Dimension[]
  ) => Record<string, number>;
  calculateOverallScore: (dimensionScores: Record<string, number>) => number;
  calculatePercentiles: (
    dimensionScores: Record<string, number>,
    norms: Record<string, number[]>
  ) => Record<string, number>;
  calculateReliability: (answers: Record<string, number>) => number;
  generateAnalysis: (
    assessment: Assessment,
    result: AssessmentResult
  ) => string | Promise<string>;
}

export interface AssessmentNorms {
  [dimensionId: string]: number[];
}

export function createAssessmentEngine(): AssessmentEngine {
  return {
    async loadAssessment(assessmentId: string): Promise<Assessment> {
      const response = await fetch(`/assessments/${assessmentId}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load assessment: ${assessmentId}`);
      }
      return response.json();
    },

    calculateDimensionScores(
      answers: Record<string, number>,
      dimensions: Dimension[]
    ): Record<string, number> {
      const scores: Record<string, number> = {};

      for (const dimension of dimensions) {
        const dimensionQuestions = Object.entries(answers).filter(([qId]) =>
          qId.startsWith(dimension.id)
        );

        if (dimensionQuestions.length > 0) {
          const sum = dimensionQuestions.reduce((acc, [, value]) => acc + value, 0);
          scores[dimension.id] = Math.round((sum / dimensionQuestions.length) * 20);
        } else {
          scores[dimension.id] = 0;
        }
      }

      return scores;
    },

    calculateOverallScore(dimensionScores: Record<string, number>): number {
      const values = Object.values(dimensionScores);
      if (values.length === 0) return 0;
      return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
    },

    calculatePercentiles(
      dimensionScores: Record<string, number>,
      norms: AssessmentNorms
    ): Record<string, number> {
      const percentiles: Record<string, number> = {};

      for (const [dimensionId, score] of Object.entries(dimensionScores)) {
        const normScores = norms[dimensionId];
        if (normScores && normScores.length > 0) {
          const sorted = [...normScores].sort((a, b) => a - b);
          const rank = sorted.findIndex((s) => s >= score);
          percentiles[dimensionId] = Math.round((rank / sorted.length) * 100);
        } else {
          percentiles[dimensionId] = 50;
        }
      }

      return percentiles;
    },

    calculateReliability(answers: Record<string, number>): number {
      const values = Object.values(answers);
      if (values.length < 2) return 0;

      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const variance =
        values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / values.length;
      const stdDev = Math.sqrt(variance);

      const consistencyIndex = Math.min(stdDev / 10, 1);
      return Math.round(consistencyIndex * 100) / 100;
    },

    async generateAnalysis(
      assessment: Assessment,
      result: AssessmentResult
    ): Promise<string> {
      const { analysisTemplate } = assessment;
      let analysis = analysisTemplate;

      analysis = analysis.replace('{score}', result.score.toString());

      for (const [dimensionId, score] of Object.entries(result.dimensions)) {
        analysis = analysis.replace(`{${dimensionId}}`, score.toString());
      }

      return analysis;
    },
  };
}

export const assessmentEngine = createAssessmentEngine();
