import type { Question } from '../../../types'
import type { MetacognitionQuestionMeta } from './metacognition-common'

export const metacognitionNormalQuestions: Question[] = [
  { id: 'mn1', text: '我知道自己擅长什么不擅长什么。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'mn2', text: '我能准确判断自己对某件事的理解程度。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.85, factorLoading: 0.81 } },
  { id: 'mn3', text: '我经常高估自己的能力。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: true, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'mn4', text: '我能立刻意识到自己是否真的理解了某个问题。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.84, factorLoading: 0.80 } },
  { id: 'mn5', text: '我能觉察到自己什么时候走神了。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'mn6', text: '我经常在事情出错后才意识到哪里不对。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: true, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'mn7', text: '遇到困难时，我知道该什么时候改变策略。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.85, factorLoading: 0.81 } },
  { id: 'mn8', text: '我能有效管理自己的注意力。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'mn9', text: '我习惯于用同样的方式处理不同的问题。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: true, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'mn10', text: '我会定期反思自己做事的方式。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.84, factorLoading: 0.80 } },
  { id: 'mn11', text: '我善于总结经验教训。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'mn12', text: '事情过去了就过去了，我很少回想。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: true, discrimination: 0.80, factorLoading: 0.76 } },
]
