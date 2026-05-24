/**
 * @file src/services/index.ts
 * @description 前端服务模块索引
 * @package MindMirror - 心镜心理测评平台
 */

import visitorService from './visitorIdentity'
import { apiService, apiClient } from './api'

export { visitorService, apiService, apiClient }

export type {
  Option,
  Question,
  Assessment,
  Session,
  SessionProgress,
  Answer,
  DimensionScores,
  Result,
  CalculationResult,
} from './api'

export default {
  visitorService,
  apiService,
}
