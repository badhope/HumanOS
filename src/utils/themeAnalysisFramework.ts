/**
 * 多维度主题分析框架
 * 
 * 设计理念：
 * 1. 采用多维度研究方法，覆盖至少6个核心分析模块
 * 2. 每个模块包含：研究目标、数据收集方法、分析框架、评估指标
 * 3. 确保各维度之间逻辑关联紧密
 * 4. 分析过程科学严谨
 * 5. 支持扩展至更多维度
 * 
 * @deprecated 请使用 utils/theme-analysis 中的模块化导出
 */

export * from './theme-analysis'
export { ThemeAnalysisFramework, themeAnalysisFramework } from './theme-analysis/framework'
