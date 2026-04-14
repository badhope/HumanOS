export {
  StandardScoreCalculator,
  type QuestionResponse,
  type DimensionScore,
  type CalculationResult,
  type ItemMeta,
  type NormData,
  type CalculationOptions,
} from './standard-calculator'

export { FineGrainedInterpreter, type InterpretationResult } from './fine-grained-interpreter'

export { PersonalitySignatureExtractor, type PersonalitySignature } from './signature-extractor'

import { StandardScoreCalculator, type ItemMeta, type NormData } from './standard-calculator'

export function createAssessmentCalculator(
  assessmentId: string,
  itemMetas: Record<string, ItemMeta>,
  normData: NormData[]
) {
  return new StandardScoreCalculator(itemMetas, normData)
}
