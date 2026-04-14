import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 完全不感兴趣', value: 1 },
  { id: '2', text: '⚪️ 不太感兴趣', value: 2 },
  { id: '3', text: '🔵 一般', value: 3 },
  { id: '4', text: '🟢 比较感兴趣', value: 4 },
  { id: '5', text: '✅ 非常感兴趣', value: 5 },
]

export const hollandAdvancedQuestions: Question[] = [
  { id: 'hol_a01', text: '进行户外体力工作', type: 'scale', options: opts, meta: { dimension: 'realistic', reverse: false } },
  { id: 'hol_a02', text: '使用电动工具', type: 'scale', options: opts, meta: { dimension: 'realistic', reverse: false } },
  { id: 'hol_a03', text: '做物理化学实验', type: 'scale', options: opts, meta: { dimension: 'investigative', reverse: false } },
  { id: 'hol_a04', text: '阅读学术文献', type: 'scale', options: opts, meta: { dimension: 'investigative', reverse: false } },
  { id: 'hol_a05', text: '绘画或摄影', type: 'scale', options: opts, meta: { dimension: 'artistic', reverse: false } },
  { id: 'hol_a06', text: '写作或表演', type: 'scale', options: opts, meta: { dimension: 'artistic', reverse: false } },
  { id: 'hol_a07', text: '心理咨询', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'hol_a08', text: '社区服务', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'hol_a09', text: '创业或经营', type: 'scale', options: opts, meta: { dimension: 'enterprising', reverse: false } },
  { id: 'hol_a10', text: '市场营销', type: 'scale', options: opts, meta: { dimension: 'enterprising', reverse: false } },
  { id: 'hol_a11', text: '财务做账', type: 'scale', options: opts, meta: { dimension: 'conventional', reverse: false } },
  { id: 'hol_a12', text: '行政办公', type: 'scale', options: opts, meta: { dimension: 'conventional', reverse: false } },
  { id: 'hol_a13', text: '农业或园艺', type: 'scale', options: opts, meta: { dimension: 'realistic', reverse: false } },
  { id: 'hol_a14', text: '动物饲养', type: 'scale', options: opts, meta: { dimension: 'realistic', reverse: false } },
  { id: 'hol_a15', text: '数据统计分析', type: 'scale', options: opts, meta: { dimension: 'investigative', reverse: false } },
  { id: 'hol_a16', text: '程序开发', type: 'scale', options: opts, meta: { dimension: 'investigative', reverse: false } },
  { id: 'hol_a17', text: '服装设计', type: 'scale', options: opts, meta: { dimension: 'artistic', reverse: false } },
  { id: 'hol_a18', text: '室内设计', type: 'scale', options: opts, meta: { dimension: 'artistic', reverse: false } },
  { id: 'hol_a19', text: '医疗护理', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'hol_a20', text: '特殊教育', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'hol_a21', text: '金融投资', type: 'scale', options: opts, meta: { dimension: 'enterprising', reverse: false } },
  { id: 'hol_a22', text: '商务谈判', type: 'scale', options: opts, meta: { dimension: 'enterprising', reverse: false } },
  { id: 'hol_a23', text: '档案管理', type: 'scale', options: opts, meta: { dimension: 'conventional', reverse: false } },
  { id: 'hol_a24', text: '流程优化', type: 'scale', options: opts, meta: { dimension: 'conventional', reverse: false } },
]
