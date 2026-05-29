/**
 * @file src/services/index.ts
 * @description 前端服务模块索引
 * @package MindMirror - 心镜心理测评平台
 */

import visitorService from './visitorIdentity'
import apiService from './api'

export { visitorService, apiService }

export type {
  Option,
  Question,
  Assessment,
  Session,
  SessionProgress,
  Result,
} from './api'

export default {
  visitorService,
  apiService,
}
