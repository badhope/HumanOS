import type { Question } from '../../../types'
import type { LoveStyleQuestionMeta } from './love-common'

const opts = [
  { id: '1', text: '❌ 完全不符合我', value: 1 },
  { id: '2', text: '⚪️ 不太符合我', value: 2 },
  { id: '3', text: '🔵 一般符合我', value: 3 },
  { id: '4', text: '🟢 比较符合我', value: 4 },
  { id: '5', text: '✅ 完全就是我', value: 5 },
]

export const loveAdvancedQuestions: Question[] = [
  { id: 'love_a01', text: '第一眼看到某个人我就能知道我们是否合适', type: 'scale', options: opts, meta: { dimension: 'eros', reverse: false, weight: 1.2 } },
  { id: 'love_a02', text: '我不会轻易对任何人做出承诺', type: 'scale', options: opts, meta: { dimension: 'ludus', reverse: false, weight: 1.1 } },
  { id: 'love_a03', text: '我和爱人是最好的朋友', type: 'scale', options: opts, meta: { dimension: 'storge', reverse: false, weight: 1.1 } },
  { id: 'love_a04', text: '我会考虑对方的家庭背景和经济条件', type: 'scale', options: opts, meta: { dimension: 'pragma', reverse: false, weight: 1.2 } },
  { id: 'love_a05', text: '如果爱人很久不回消息我会胡思乱想', type: 'scale', options: opts, meta: { dimension: 'mania', reverse: false, weight: 1.0 } },
  { id: 'love_a06', text: '即使爱人伤害了我我也会原谅他', type: 'scale', options: opts, meta: { dimension: 'agape', reverse: false, weight: 1.1 } },
  { id: 'love_a07', text: '我很看重两个人之间的化学反应', type: 'scale', options: opts, meta: { dimension: 'eros', reverse: false, weight: 1.0 } },
  { id: 'love_a08', text: '我喜欢和不同的人约会体验新鲜感', type: 'scale', options: opts, meta: { dimension: 'ludus', reverse: false, weight: 1.0 } },
  { id: 'love_a09', text: '细水长流的爱情比轰轰烈烈更真实', type: 'scale', options: opts, meta: { dimension: 'storge', reverse: false, weight: 1.1 } },
  { id: 'love_a10', text: '我会分析我们的性格是否匹配', type: 'scale', options: opts, meta: { dimension: 'pragma', reverse: false, weight: 1.2 } },
  { id: 'love_a11', text: '我会经常查看爱人的手机', type: 'scale', options: opts, meta: { dimension: 'mania', reverse: false, weight: 1.0 } },
  { id: 'love_a12', text: '我会默默支持爱人的梦想和追求', type: 'scale', options: opts, meta: { dimension: 'agape', reverse: false, weight: 1.1 } },
  { id: 'love_a13', text: '浪漫和惊喜是爱情不可或缺的', type: 'scale', options: opts, meta: { dimension: 'eros', reverse: false, weight: 1.2 } },
  { id: 'love_a14', text: '我不会把全部心思放在一个人身上', type: 'scale', options: opts, meta: { dimension: 'ludus', reverse: false, weight: 1.1 } },
  { id: 'love_a15', text: '我更看重安全感而不是心跳的感觉', type: 'scale', options: opts, meta: { dimension: 'storge', reverse: false, weight: 1.1 } },
  { id: 'love_a16', text: '我会考虑未来生活的实际问题', type: 'scale', options: opts, meta: { dimension: 'pragma', reverse: false, weight: 1.2 } },
  { id: 'love_a17', text: '我在爱情里很容易情绪化', type: 'scale', options: opts, meta: { dimension: 'mania', reverse: false, weight: 1.0 } },
  { id: 'love_a18', text: '我会主动关心爱人的身体健康', type: 'scale', options: opts, meta: { dimension: 'agape', reverse: false, weight: 1.1 } },
  { id: 'love_a19', text: '我相信真正的爱情是命中注定的', type: 'scale', options: opts, meta: { dimension: 'eros', reverse: false, weight: 1.0 } },
  { id: 'love_a20', text: '玩暧昧的感觉让我很享受', type: 'scale', options: opts, meta: { dimension: 'ludus', reverse: false, weight: 1.0 } },
  { id: 'love_a21', text: '认识很久才开始恋爱更靠谱', type: 'scale', options: opts, meta: { dimension: 'storge', reverse: false, weight: 1.1 } },
  { id: 'love_a22', text: '学历和职业对我来说很重要', type: 'scale', options: opts, meta: { dimension: 'pragma', reverse: false, weight: 1.2 } },
  { id: 'love_a23', text: '我经常因为爱情失眠', type: 'scale', options: opts, meta: { dimension: 'mania', reverse: false, weight: 1.0 } },
  { id: 'love_a24', text: '我愿意为爱人付出不求回报', type: 'scale', options: opts, meta: { dimension: 'agape', reverse: false, weight: 1.1 } },
]
