// =============================================================================
//  后端服务模块索引
// =============================================================================
import { apiClient } from './apiClient'
import { calculatorService } from './calculatorWrapper'
import type {
  CalculationRequest,
  CalculationResponse,
  DimensionScore,
  AssessmentInfo,
  ApiConfig,
} from './apiClient'
import type { UnifiedCalculationResult } from './calculatorWrapper'

export { apiClient, calculatorService }
export type {
  CalculationRequest,
  CalculationResponse,
  DimensionScore,
  AssessmentInfo,
  ApiConfig,
  UnifiedCalculationResult,
}

export const SERVICES = {
  apiClient,
  calculatorService,
}

export default SERVICES
