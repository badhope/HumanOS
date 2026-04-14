import type { Question } from '../../../types'
import type { HardinessQuestionMeta } from './hardiness-common'

export const hardinessAdvancedQuestions: Question[] = [
  { id: 'ha1', text: '大多数日子里，我对自己的生活充满热情和目标感。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'commitment', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'ha2', text: '即使遇到困难，我也能在工作和活动中找到意义。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'commitment', reverse: false, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'ha3', text: '我全身心地投入到我所做的每一件事情中。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'commitment', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'ha4', text: '我经常感到生活空虚无聊，缺乏方向。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'commitment', reverse: true, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'ha5', text: '我相信我所做的事情能够产生积极的影响。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'commitment', reverse: false, discrimination: 0.78, factorLoading: 0.74 } },
  { id: 'ha6', text: '遇到问题时，我首先想到的是如何解决而不是抱怨。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.85, factorLoading: 0.81 } },
  { id: 'ha7', text: '我相信自己的能力能够改变不利的局面。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'ha8', text: '面对挑战，我倾向于主动出击而不是被动等待。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'ha9', text: '遇到困难时，我常常感到无能为力。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: true, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'ha10', text: '我对自己的决策能力充满信心。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'ha11', text: '我视变化为成长的机会而非威胁。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'challenge', reverse: false, discrimination: 0.84, factorLoading: 0.80 } },
  { id: 'ha12', text: '我乐于尝试新事物，即使意味着可能失败。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'challenge', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'ha13', text: '从失败中学习和成长对我来说是自然而然的事情。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'challenge', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'ha14', text: '改变会让我感到不安和焦虑。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'challenge', reverse: true, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'ha15', text: '我不断寻求新的挑战来促进个人成长。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'challenge', reverse: false, discrimination: 0.76, factorLoading: 0.72 } },
  { id: 'ha16', text: '即使在压力下，我也能保持专注和冷静。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.85, factorLoading: 0.81 } },
  { id: 'ha17', text: '危机过后，我通常能比以前变得更好。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'challenge', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'ha18', text: '我很少担心自己无法应对困难。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'ha19', text: '我对未来持乐观和积极的态度。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'ha20', text: '我有强烈的归属感和连接感。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'commitment', reverse: false, discrimination: 0.77, factorLoading: 0.73 } },
  { id: 'ha21', text: '我对自己的价值观和人生目标非常清楚。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'commitment', reverse: false, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'ha22', text: '在困难时期，我能够看到长远的前景。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'ha23', text: '当面对反对意见时，我能够坚持自己的立场。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'ha24', text: '我能够有效地管理时间和资源。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
]
