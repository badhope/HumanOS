import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 从不', value: 0 },
  { id: '2', text: '⚪️ 几乎不', value: 1 },
  { id: '3', text: '🔵 有时', value: 2 },
  { id: '4', text: '🟢 相当经常', value: 3 },
  { id: '5', text: '✅ 非常经常', value: 4 },
]

export const pssAdvancedQuestions: Question[] = [
  { id: 'pss_a01', text: '上个月里，有多少时候您对生活中的意外事件感到紧张不安？', type: 'scale', options: opts, meta: { dimension: 'perceivedStress', reverse: false } },
  { id: 'pss_a02', text: '上个月里，有多少时候您感到无法控制生活中的重要事情？', type: 'scale', options: opts, meta: { dimension: 'uncontrollability', reverse: false } },
  { id: 'pss_a03', text: '上个月里，有多少时候您感到神经紧张和有压力？', type: 'scale', options: opts, meta: { dimension: 'perceivedStress', reverse: false } },
  { id: 'pss_a04', text: '上个月里，有多少时候您对处理日常事务感到信心不足？', type: 'scale', options: opts, meta: { dimension: 'copingAbility', reverse: false } },
  { id: 'pss_a05', text: '上个月里，有多少时候您感到事情的发展超出了您的控制？', type: 'scale', options: opts, meta: { dimension: 'uncontrollability', reverse: false } },
  { id: 'pss_a06', text: '上个月里，有多少时候您感到困难积累得太多，您无法克服？', type: 'scale', options: opts, meta: { dimension: 'overload', reverse: false } },
  { id: 'pss_a07', text: '上个月里，有多少时候您能够成功地处理生活中的烦恼？', type: 'scale', options: opts, meta: { dimension: 'copingAbility', reverse: true } },
  { id: 'pss_a08', text: '上个月里，有多少时候您感到能够控制自己的生活？', type: 'scale', options: opts, meta: { dimension: 'uncontrollability', reverse: true } },
  { id: 'pss_a09', text: '上个月里，有多少时候您感到能够冷静并处理好所有必须做的事？', type: 'scale', options: opts, meta: { dimension: 'copingAbility', reverse: true } },
  { id: 'pss_a10', text: '上个月里，有多少时候您能够控制自己的烦躁情绪？', type: 'scale', options: opts, meta: { dimension: 'copingAbility', reverse: true } },
  { id: 'pss_a11', text: '上个月里，有多少时候您觉得所有事情都在您的掌握之中？', type: 'scale', options: opts, meta: { dimension: 'uncontrollability', reverse: true } },
  { id: 'pss_a12', text: '上个月里，有多少时候您因发生的事不在控制范围内而生气？', type: 'scale', options: opts, meta: { dimension: 'perceivedStress', reverse: false } },
  { id: 'pss_a13', text: '上个月里，有多少时候您感到被各种要求压得喘不过气？', type: 'scale', options: opts, meta: { dimension: 'overload', reverse: false } },
  { id: 'pss_a14', text: '上个月里，有多少时候您感到能够有效管理时间？', type: 'scale', options: opts, meta: { dimension: 'copingAbility', reverse: true } },
  { id: 'pss_a15', text: '上个月里，有多少时候您感到工作和生活难以平衡？', type: 'scale', options: opts, meta: { dimension: 'overload', reverse: false } },
  { id: 'pss_a16', text: '上个月里，有多少时候您能从工作中抽离并好好休息？', type: 'scale', options: opts, meta: { dimension: 'copingAbility', reverse: true } },
  { id: 'pss_a17', text: '上个月里，有多少时候您感到对未来感到担忧？', type: 'scale', options: opts, meta: { dimension: 'perceivedStress', reverse: false } },
  { id: 'pss_a18', text: '上个月里，有多少时候您能获得家人朋友的支持？', type: 'scale', options: opts, meta: { dimension: 'copingAbility', reverse: true } },
  { id: 'pss_a19', text: '上个月里，有多少时候您感到身心俱疲？', type: 'scale', options: opts, meta: { dimension: 'overload', reverse: false } },
  { id: 'pss_a20', text: '上个月里，有多少时候您能找到放松的方式？', type: 'scale', options: opts, meta: { dimension: 'copingAbility', reverse: true } },
  { id: 'pss_a21', text: '上个月里，有多少时候您感到任务截止日期太紧？', type: 'scale', options: opts, meta: { dimension: 'overload', reverse: false } },
  { id: 'pss_a22', text: '上个月里，有多少时候您能保持积极心态？', type: 'scale', options: opts, meta: { dimension: 'copingAbility', reverse: true } },
  { id: 'pss_a23', text: '上个月里，有多少时候您感到工作负担太重？', type: 'scale', options: opts, meta: { dimension: 'overload', reverse: false } },
  { id: 'pss_a24', text: '上个月里，有多少时候您能好好照顾自己？', type: 'scale', options: opts, meta: { dimension: 'copingAbility', reverse: true } },
]
