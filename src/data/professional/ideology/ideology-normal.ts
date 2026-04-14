import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const ideologyNormalQuestions: Question[] = [
  { id: 'ideo_n01', text: '我相信政府应该提供全民医保', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: false } },
  { id: 'ideo_n02', text: '富人应该缴纳更高的税率', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: false } },
  { id: 'ideo_n03', text: '我相信小政府更有效率', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: true } },
  { id: 'ideo_n04', text: '我支持传统家庭价值观', type: 'scale', options: opts, meta: { dimension: 'social', reverse: true } },
  { id: 'ideo_n05', text: '我支持LGBTQ+权利', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'ideo_n06', text: '我支持堕胎合法化', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'ideo_n07', text: '我相信强大的国防很重要', type: 'scale', options: opts, meta: { dimension: 'diplomatic', reverse: true } },
  { id: 'ideo_n08', text: '我相信国际合作很重要', type: 'scale', options: opts, meta: { dimension: 'diplomatic', reverse: false } },
  { id: 'ideo_n09', text: '我支持反腐败措施', type: 'scale', options: opts, meta: { dimension: 'governance', reverse: false } },
  { id: 'ideo_n10', text: '我支持言论自由', type: 'scale', options: opts, meta: { dimension: 'civil', reverse: false } },
  { id: 'ideo_n11', text: '我相信气候变化是真实存在的威胁', type: 'scale', options: opts, meta: { dimension: 'environment', reverse: false } },
  { id: 'ideo_n12', text: '我支持环境保护法规', type: 'scale', options: opts, meta: { dimension: 'environment', reverse: false } },
  { id: 'ideo_n13', text: '政府应该增加社会福利支出', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: false } },
  { id: 'ideo_n14', text: '市场能够比政府更有效配置资源', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: true } },
  { id: 'ideo_n15', text: '我们应该对移民采取更开放的政策', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'ideo_n16', text: '宗教应该在公共生活中扮演更重要角色', type: 'scale', options: opts, meta: { dimension: 'social', reverse: true } },
  { id: 'ideo_n17', text: '我们应该更积极地参与国际事务', type: 'scale', options: opts, meta: { dimension: 'diplomatic', reverse: false } },
  { id: 'ideo_n18', text: '我们应该优先考虑国家利益', type: 'scale', options: opts, meta: { dimension: 'diplomatic', reverse: true } },
  { id: 'ideo_n19', text: '我支持更严格的枪支管制法律', type: 'scale', options: opts, meta: { dimension: 'civil', reverse: false } },
  { id: 'ideo_n20', text: '我支持发展可再生能源', type: 'scale', options: opts, meta: { dimension: 'environment', reverse: false } },
]
