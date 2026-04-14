import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const ecrAdvancedQuestions: Question[] = [
  { id: 'ecr_a01', text: '我担心伴侣会离开我', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_a02', text: '我害怕自己不够好不值得被爱', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_a03', text: '伴侣长时间不回消息时我会胡思乱想', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_a04', text: '我需要反复确认对方是爱我的', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_a05', text: '我经常担心我们的关系会破裂', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_a06', text: '发生争执时我害怕对方会说分手', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_a07', text: '一点小事就会触发我的不安全感', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_a08', text: '对方稍微冷淡我就会想很多', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_a09', text: '我在关系中感到很安心', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'ecr_a10', text: '我相信对方不会背叛我', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'ecr_a11', text: '即使吵架我也知道我们会和好', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'ecr_a12', text: '我对我们的未来充满信心', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'ecr_a13', text: '我不想让别人太了解真实的我', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_a14', text: '我感到完全信任一个人很困难', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_a15', text: '过于亲密的关系让我感到不舒服', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_a16', text: '我喜欢保持独立不依赖任何人', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_a17', text: '我很少向别人表达内心深处的感受', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_a18', text: '遇到问题时我更愿意自己解决', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_a19', text: '发生冲突时我倾向于撤退和沉默', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_a20', text: '别人对我过度热情我会想要逃跑', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_a21', text: '我喜欢和别人建立亲密的连接', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'ecr_a22', text: '对我来说敞开心扉是件容易的事', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'ecr_a23', text: '依赖别人让我感到很舒适', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'ecr_a24', text: '遇到困难我会主动寻求支持', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
]
