import type { Question } from '../../../types'
import type { PcqQuestionMeta } from './pcq-common'

export const pcqNormalQuestions: Question[] = [
  { id: 'pcqn1', text: '面对困难的任务时，我相信自己能够完成它。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'efficacy', reverse: false, discrimination: 0.84, factorLoading: 0.80 } },
  { id: 'pcqn2', text: '我对自己的工作能力充满信心。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'efficacy', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'pcqn3', text: '我对自己的未来有明确的目标。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'hope', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'pcqn4', text: '面对困难时，我很容易放弃目标。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'hope', reverse: true, discrimination: 0.84, factorLoading: 0.80 } },
  { id: 'pcqn5', text: '我能够很快地从挫折中恢复过来。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'resilience', reverse: false, discrimination: 0.85, factorLoading: 0.81 } },
  { id: 'pcqn6', text: '遇到困难时，我很容易感到绝望。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'resilience', reverse: true, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'pcqn7', text: '我总是看到事情好的一面。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'optimism', reverse: false, discrimination: 0.84, factorLoading: 0.80 } },
  { id: 'pcqn8', text: '我相信好事会发生在我身上。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'optimism', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'pcqn9', text: '即使遇到挫折，我也相信自己能够克服。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'efficacy', reverse: false, discrimination: 0.85, factorLoading: 0.81 } },
  { id: 'pcqn10', text: '面对压力时，我能够保持冷静和专注。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'resilience', reverse: false, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'pcqn11', text: '我对未来持乐观态度。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'optimism', reverse: false, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'pcqn12', text: '任何问题都有很多解决方法。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'hope', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
]
