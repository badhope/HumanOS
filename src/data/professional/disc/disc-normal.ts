import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 这绝不是我', value: 1 },
  { id: '2', text: '⚪️ 这不像我', value: 2 },
  { id: '3', text: '🔵 中立', value: 3 },
  { id: '4', text: '🟢 这很像我', value: 4 },
  { id: '5', text: '✅ 这完全就是我', value: 5 },
]

export const discNormalQuestions: Question[] = [
  { id: 'disc_n01', text: '我喜欢直接掌控局面', type: 'scale', options: opts, meta: { dimension: 'D', pole: 'high', reverseScored: false, factorLoading: 0.88, discrimination: 0.80, ipsativeValue: { D: 5, I: 2, S: 1, C: 2 }, constructValidity: 0.85 } },
  { id: 'disc_n02', text: '我热衷于结交新朋友', type: 'scale', options: opts, meta: { dimension: 'I', pole: 'high', reverseScored: false, factorLoading: 0.85, discrimination: 0.77, ipsativeValue: { D: 2, I: 5, S: 3, C: 1 }, constructValidity: 0.82 } },
  { id: 'disc_n03', text: '我优先考虑团队的和谐', type: 'scale', options: opts, meta: { dimension: 'S', pole: 'high', reverseScored: false, factorLoading: 0.87, discrimination: 0.79, ipsativeValue: { D: 1, I: 3, S: 5, C: 2 }, constructValidity: 0.84 } },
  { id: 'disc_n04', text: '我做事追求精准无误', type: 'scale', options: opts, meta: { dimension: 'C', pole: 'high', reverseScored: false, factorLoading: 0.90, discrimination: 0.82, ipsativeValue: { D: 2, I: 1, S: 2, C: 5 }, constructValidity: 0.87 } },
  { id: 'disc_n05', text: '我面对挑战毫不退缩', type: 'scale', options: opts, meta: { dimension: 'D', pole: 'high', reverseScored: false, factorLoading: 0.86, discrimination: 0.78, ipsativeValue: { D: 5, I: 3, S: 2, C: 2 }, constructValidity: 0.83 } },
  { id: 'disc_n06', text: '我说话很有感染力', type: 'scale', options: opts, meta: { dimension: 'I', pole: 'high', reverseScored: false, factorLoading: 0.84, discrimination: 0.76, ipsativeValue: { D: 3, I: 5, S: 2, C: 1 }, constructValidity: 0.81 } },
  { id: 'disc_n07', text: '我是耐心的倾听者', type: 'scale', options: opts, meta: { dimension: 'S', pole: 'high', reverseScored: false, factorLoading: 0.89, discrimination: 0.81, ipsativeValue: { D: 1, I: 2, S: 5, C: 3 }, constructValidity: 0.86 } },
  { id: 'disc_n08', text: '我重视规则胜于人情', type: 'scale', options: opts, meta: { dimension: 'C', pole: 'high', reverseScored: false, factorLoading: 0.83, discrimination: 0.75, ipsativeValue: { D: 3, I: 1, S: 2, C: 5 }, constructValidity: 0.80 } },
  { id: 'disc_n09', text: '我做决定非常果断', type: 'scale', options: opts, meta: { dimension: 'D', pole: 'high', reverseScored: false, factorLoading: 0.91, discrimination: 0.83, ipsativeValue: { D: 5, I: 2, S: 1, C: 3 }, constructValidity: 0.88 } },
  { id: 'disc_n10', text: '我总是充满热情', type: 'scale', options: opts, meta: { dimension: 'I', pole: 'high', reverseScored: false, factorLoading: 0.82, discrimination: 0.74, ipsativeValue: { D: 2, I: 5, S: 3, C: 1 }, constructValidity: 0.79 } },
  { id: 'disc_n11', text: '我不喜欢突然的变化', type: 'scale', options: opts, meta: { dimension: 'S', pole: 'high', reverseScored: false, factorLoading: 0.80, discrimination: 0.72, ipsativeValue: { D: 2, I: 1, S: 5, C: 3 }, constructValidity: 0.77 } },
  { id: 'disc_n12', text: '我习惯用数据说话', type: 'scale', options: opts, meta: { dimension: 'C', pole: 'high', reverseScored: false, factorLoading: 0.85, discrimination: 0.77, ipsativeValue: { D: 2, I: 1, S: 2, C: 5 }, constructValidity: 0.82 } },
  { id: 'disc_n13', text: '我喜欢直接面对问题', type: 'scale', options: opts, meta: { dimension: 'D', pole: 'high', reverseScored: false, factorLoading: 0.88, discrimination: 0.80, ipsativeValue: { D: 5, I: 3, S: 1, C: 2 }, constructValidity: 0.85 } },
  { id: 'disc_n14', text: '我擅长激励团队士气', type: 'scale', options: opts, meta: { dimension: 'I', pole: 'high', reverseScored: false, factorLoading: 0.80, discrimination: 0.73, ipsativeValue: { D: 2, I: 5, S: 3, C: 1 }, constructValidity: 0.78 } },
  { id: 'disc_n15', text: '我总是可靠地完成承诺', type: 'scale', options: opts, meta: { dimension: 'S', pole: 'high', reverseScored: false, factorLoading: 0.86, discrimination: 0.78, ipsativeValue: { D: 2, I: 2, S: 5, C: 2 }, constructValidity: 0.83 } },
  { id: 'disc_n16', text: '我追求完美和高标准', type: 'scale', options: opts, meta: { dimension: 'C', pole: 'high', reverseScored: false, factorLoading: 0.82, discrimination: 0.74, ipsativeValue: { D: 3, I: 1, S: 2, C: 5 }, constructValidity: 0.79 } },
  { id: 'disc_n17', text: '我不害怕挑战权威', type: 'scale', options: opts, meta: { dimension: 'D', pole: 'high', reverseScored: false, factorLoading: 0.85, discrimination: 0.77, ipsativeValue: { D: 5, I: 2, S: 1, C: 3 }, constructValidity: 0.81 } },
  { id: 'disc_n18', text: '我善于讲故事和调动气氛', type: 'scale', options: opts, meta: { dimension: 'I', pole: 'high', reverseScored: false, factorLoading: 0.84, discrimination: 0.76, ipsativeValue: { D: 2, I: 5, S: 3, C: 1 }, constructValidity: 0.80 } },
  { id: 'disc_n19', text: '我是稳定可靠的团队成员', type: 'scale', options: opts, meta: { dimension: 'S', pole: 'high', reverseScored: false, factorLoading: 0.83, discrimination: 0.75, ipsativeValue: { D: 1, I: 2, S: 5, C: 3 }, constructValidity: 0.80 } },
  { id: 'disc_n20', text: '我喜欢分析问题的根源', type: 'scale', options: opts, meta: { dimension: 'C', pole: 'high', reverseScored: false, factorLoading: 0.81, discrimination: 0.73, ipsativeValue: { D: 2, I: 1, S: 2, C: 5 }, constructValidity: 0.78 } },
]