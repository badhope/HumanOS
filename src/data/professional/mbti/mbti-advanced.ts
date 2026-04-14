import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 几乎从不这样', value: 1 },
  { id: '2', text: '⚪️ 偶尔会这样', value: 2 },
  { id: '3', text: '🔵 一半时间会这样', value: 3 },
  { id: '4', text: '🟢 经常会这样', value: 4 },
  { id: '5', text: '✅ 几乎总是这样', value: 5 },
]

export const mbtiAdvancedQuestions: Question[] = [
  { id: 'mbti_a01', text: '周末聚会后我需要独处半天恢复', type: 'scale', options: opts, meta: { dimension: 'EI', reverse: true } },
  { id: 'mbti_a02', text: '我主动在陌生人多的场合发起话题', type: 'scale', options: opts, meta: { dimension: 'EI', reverse: false } },
  { id: 'mbti_a03', text: '边工作边聊天让我更有活力', type: 'scale', options: opts, meta: { dimension: 'EI', reverse: false } },
  { id: 'mbti_a04', text: '我更喜欢深度交流而不是多人热闹', type: 'scale', options: opts, meta: { dimension: 'EI', reverse: true } },
  { id: 'mbti_a05', text: '我经常成为带动气氛的人', type: 'scale', options: opts, meta: { dimension: 'EI', reverse: false } },
  { id: 'mbti_a06', text: '长时间独处让我感到空虚', type: 'scale', options: opts, meta: { dimension: 'EI', reverse: false } },
  { id: 'mbti_a07', text: '遇到问题先找现成的验证过的方案', type: 'scale', options: opts, meta: { dimension: 'SN', reverse: false } },
  { id: 'mbti_a08', text: '我更关注创新而不是实际用途', type: 'scale', options: opts, meta: { dimension: 'SN', reverse: true } },
  { id: 'mbti_a09', text: '我关注细节多于整体框架', type: 'scale', options: opts, meta: { dimension: 'SN', reverse: false } },
  { id: 'mbti_a10', text: '散步时常常冒出改变人生的想法', type: 'scale', options: opts, meta: { dimension: 'SN', reverse: true } },
  { id: 'mbti_a11', text: '我喜欢按部就班执行流程', type: 'scale', options: opts, meta: { dimension: 'SN', reverse: false } },
  { id: 'mbti_a12', text: '我总是在寻找事物间的隐藏联系', type: 'scale', options: opts, meta: { dimension: 'SN', reverse: true } },
  { id: 'mbti_a13', text: '正确的决定即使伤人也要执行', type: 'scale', options: opts, meta: { dimension: 'TF', reverse: false } },
  { id: 'mbti_a14', text: '看到人难过我先安慰再解决问题', type: 'scale', options: opts, meta: { dimension: 'TF', reverse: true } },
  { id: 'mbti_a15', text: '批评应该直接不需要绕弯子', type: 'scale', options: opts, meta: { dimension: 'TF', reverse: false } },
  { id: 'mbti_a16', text: '我很容易感受到他人的情绪变化', type: 'scale', options: opts, meta: { dimension: 'TF', reverse: true } },
  { id: 'mbti_a17', text: '争论时我追求赢而不是和谐', type: 'scale', options: opts, meta: { dimension: 'TF', reverse: false } },
  { id: 'mbti_a18', text: '为照顾他人感受我可以不说真话', type: 'scale', options: opts, meta: { dimension: 'TF', reverse: true } },
  { id: 'mbti_a19', text: '我喜欢所有事情都提前安排好', type: 'scale', options: opts, meta: { dimension: 'JP', reverse: false } },
  { id: 'mbti_a20', text: '我喜欢出发前几分钟才收拾行李', type: 'scale', options: opts, meta: { dimension: 'JP', reverse: true } },
  { id: 'mbti_a21', text: '清单和日程表让我感到安心', type: 'scale', options: opts, meta: { dimension: 'JP', reverse: false } },
  { id: 'mbti_a22', text: '我享受突发奇想带来的惊喜', type: 'scale', options: opts, meta: { dimension: 'JP', reverse: true } },
  { id: 'mbti_a23', text: '截止日期前很久我就完成工作', type: 'scale', options: opts, meta: { dimension: 'JP', reverse: false } },
  { id: 'mbti_a24', text: '我讨厌计划被临时改变', type: 'scale', options: opts, meta: { dimension: 'JP', reverse: false } },
]
