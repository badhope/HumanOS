import type { Question } from '../../../types'
import type { LoveStyleQuestionMeta } from './love-common'

const opts = [
  { id: '1', text: '❌ 完全不符合我', value: 1 },
  { id: '2', text: '⚪️ 不太符合我', value: 2 },
  { id: '3', text: '🔵 一般符合我', value: 3 },
  { id: '4', text: '🟢 比较符合我', value: 4 },
  { id: '5', text: '✅ 完全就是我', value: 5 },
]

export const loveNormalQuestions: Question[] = [
  { id: 'love_n01', text: '我相信一见钟情', type: 'scale', options: opts, meta: { dimension: 'eros', reverse: false, weight: 1.2 } },
  { id: 'love_n02', text: '我享受和不同的人玩爱情游戏', type: 'scale', options: opts, meta: { dimension: 'ludus', reverse: false, weight: 1.1 } },
  { id: 'love_n03', text: '真正的爱情是从深厚的友谊开始的', type: 'scale', options: opts, meta: { dimension: 'storge', reverse: false, weight: 1.1 } },
  { id: 'love_n04', text: '在选择伴侣前我会仔细考察对方的条件', type: 'scale', options: opts, meta: { dimension: 'pragma', reverse: false, weight: 1.2 } },
  { id: 'love_n05', text: '恋爱中我经常会嫉妒不安', type: 'scale', options: opts, meta: { dimension: 'mania', reverse: false, weight: 1.0 } },
  { id: 'love_n06', text: '我愿意为了爱人牺牲自己的利益', type: 'scale', options: opts, meta: { dimension: 'agape', reverse: false, weight: 1.1 } },
  { id: 'love_n07', text: '和喜欢的人身体接触会有触电的感觉', type: 'scale', options: opts, meta: { dimension: 'eros', reverse: false, weight: 1.0 } },
  { id: 'love_n08', text: '我很擅长撩别人', type: 'scale', options: opts, meta: { dimension: 'ludus', reverse: false, weight: 1.0 } },
  { id: 'love_n09', text: '陪伴比激情更重要', type: 'scale', options: opts, meta: { dimension: 'storge', reverse: false, weight: 1.1 } },
  { id: 'love_n10', text: '门当户对是很重要的', type: 'scale', options: opts, meta: { dimension: 'pragma', reverse: false, weight: 1.2 } },
  { id: 'love_n11', text: '我经常担心对方不够爱我', type: 'scale', options: opts, meta: { dimension: 'mania', reverse: false, weight: 1.0 } },
  { id: 'love_n12', text: '我希望爱人永远幸福快乐', type: 'scale', options: opts, meta: { dimension: 'agape', reverse: false, weight: 1.1 } },
  { id: 'love_n13', text: '我非常看重浪漫的仪式感', type: 'scale', options: opts, meta: { dimension: 'eros', reverse: false, weight: 1.0 } },
  { id: 'love_n14', text: '我不会因为一棵树放弃整片森林', type: 'scale', options: opts, meta: { dimension: 'ludus', reverse: false, weight: 1.0 } },
  { id: 'love_n15', text: '我和爱人更像好朋友一样相处', type: 'scale', options: opts, meta: { dimension: 'storge', reverse: false, weight: 1.1 } },
  { id: 'love_n16', text: '我会仔细考虑恋爱对未来的影响', type: 'scale', options: opts, meta: { dimension: 'pragma', reverse: false, weight: 1.0 } },
  { id: 'love_n17', text: '恋爱中我的情绪起伏很大', type: 'scale', options: opts, meta: { dimension: 'mania', reverse: false, weight: 1.0 } },
  { id: 'love_n18', text: '我愿意包容爱人的缺点', type: 'scale', options: opts, meta: { dimension: 'agape', reverse: false, weight: 1.1 } },
  { id: 'love_n19', text: '灵魂伴侣对我来说非常重要', type: 'scale', options: opts, meta: { dimension: 'eros', reverse: false, weight: 1.1 } },
  { id: 'love_n20', text: '暧昧让我觉得很有乐趣', type: 'scale', options: opts, meta: { dimension: 'ludus', reverse: false, weight: 1.0 } },
]
