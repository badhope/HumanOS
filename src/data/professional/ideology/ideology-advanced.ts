import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const ideologyAdvancedQuestions: Question[] = [
  { id: 'ideo_a01', text: '我相信政府应该提供全民医保', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: false } },
  { id: 'ideo_a02', text: '富人应该缴纳更高的税率', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: false } },
  { id: 'ideo_a03', text: '我支持免费高等教育', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: false } },
  { id: 'ideo_a04', text: '我相信小政府更有效率', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: true } },
  { id: 'ideo_a05', text: '我相信自由市场能解决大多数问题', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: true } },
  { id: 'ideo_a06', text: '我反对过多的政府监管', type: 'scale', options: opts, meta: { dimension: 'economic', reverse: true } },
  { id: 'ideo_a07', text: '我支持传统家庭价值观', type: 'scale', options: opts, meta: { dimension: 'social', reverse: true } },
  { id: 'ideo_a08', text: '我支持严格的移民政策', type: 'scale', options: opts, meta: { dimension: 'social', reverse: true } },
  { id: 'ideo_a09', text: '我支持LGBTQ+权利', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'ideo_a10', text: '我支持堕胎合法化', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'ideo_a11', text: '我支持大麻合法化', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'ideo_a12', text: '我支持开放的移民政策', type: 'scale', options: opts, meta: { dimension: 'social', reverse: false } },
  { id: 'ideo_a13', text: '我相信强大的国防很重要', type: 'scale', options: opts, meta: { dimension: 'diplomatic', reverse: true } },
  { id: 'ideo_a14', text: '我支持增加军费开支', type: 'scale', options: opts, meta: { dimension: 'diplomatic', reverse: true } },
  { id: 'ideo_a15', text: '我支持自由贸易协定', type: 'scale', options: opts, meta: { dimension: 'diplomatic', reverse: false } },
  { id: 'ideo_a16', text: '我相信国际合作很重要', type: 'scale', options: opts, meta: { dimension: 'diplomatic', reverse: false } },
  { id: 'ideo_a17', text: '我支持反腐败措施', type: 'scale', options: opts, meta: { dimension: 'governance', reverse: false } },
  { id: 'ideo_a18', text: '我相信媒体应该独立于政府', type: 'scale', options: opts, meta: { dimension: 'governance', reverse: false } },
  { id: 'ideo_a19', text: '我支持保护公民隐私', type: 'scale', options: opts, meta: { dimension: 'civil', reverse: false } },
  { id: 'ideo_a20', text: '我支持言论自由', type: 'scale', options: opts, meta: { dimension: 'civil', reverse: false } },
  { id: 'ideo_a21', text: '我相信气候变化是真实存在的威胁', type: 'scale', options: opts, meta: { dimension: 'environment', reverse: false } },
  { id: 'ideo_a22', text: '我支持环境保护法规', type: 'scale', options: opts, meta: { dimension: 'environment', reverse: false } },
  { id: 'ideo_a23', text: '我支持向可再生能源转型', type: 'scale', options: opts, meta: { dimension: 'environment', reverse: false } },
  { id: 'ideo_a24', text: '我相信我们有责任保护环境', type: 'scale', options: opts, meta: { dimension: 'environment', reverse: false } },
]
