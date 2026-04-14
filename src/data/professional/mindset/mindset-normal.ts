import type { Question } from '../../../types'
import type { MindsetQuestionMeta } from './mindset-common'

export const mindsetNormalQuestions: Question[] = [
  { id: 'msn1', text: '我喜欢尝试对我来说全新的困难的事物。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'challenge', reverse: false, discrimination: 0.84, factorLoading: 0.80 } },
  { id: 'msn2', text: '遇到障碍时，我通常会放弃。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'failure', reverse: true, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'msn3', text: '努力是没有天赋的人的借口。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'effort', reverse: true, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'msn4', text: '我把失败看作学习和成长的机会。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'failure', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'msn5', text: '别人的批评会让我感到受到攻击。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'criticism', reverse: true, discrimination: 0.85, factorLoading: 0.81 } },
  { id: 'msn6', text: '别人的成功会让我感到受到威胁。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'success', reverse: true, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'msn7', text: '我的智力是天生的，无法改变太多。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'effort', reverse: true, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'msn8', text: '遇到困难时，我会坚持尝试不同的方法。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'challenge', reverse: false, discrimination: 0.84, factorLoading: 0.80 } },
  { id: 'msn9', text: '我相信只要努力就能够不断进步。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'effort', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'msn10', text: '我喜欢接受反馈并从中学习。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'criticism', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'msn11', text: '我欣赏并学习别人的成功经验。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'success', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'msn12', text: '失败会让我感到自己很没用。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'failure', reverse: true, discrimination: 0.84, factorLoading: 0.80 } },
]
