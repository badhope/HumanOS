import type { Question } from '../../../types'
import type { MetacognitionQuestionMeta } from './metacognition-common'

export const metacognitionProfessionalQuestions: Question[] = [
  { id: 'm1', text: '我知道自己擅长什么不擅长什么。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'm2', text: '我能准确判断自己对某件事的理解程度。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.85, factorLoading: 0.81 } },
  { id: 'm3', text: '我很清楚哪种学习方法对自己最有效。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'm4', text: '我知道自己在哪些方面容易犯错误。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'm5', text: '我经常高估自己的能力。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: true, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'm6', text: '我很难说清自己究竟懂了多少。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: true, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm7', text: '我能立刻意识到自己是否真的理解了某个问题。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.84, factorLoading: 0.80 } },
  { id: 'm8', text: '我能觉察到自己什么时候走神了。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'm9', text: '我会经常检查自己的思路是否正确。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'm10', text: '我能意识到自己什么时候犯了错误。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'm11', text: '我发现不了自己理解上的偏差。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: true, discrimination: 0.78, factorLoading: 0.74 } },
  { id: 'm12', text: '我经常在事情出错后才意识到哪里不对。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: true, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm13', text: '遇到困难时，我知道该什么时候改变策略。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.85, factorLoading: 0.81 } },
  { id: 'm14', text: '我能有效管理自己的注意力。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'm15', text: '我会根据不同的任务调整自己的学习方法。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'm16', text: '我知道什么时候该寻求他人的帮助。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm17', text: '我习惯于用同样的方式处理不同的问题。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: true, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'm18', text: '我很难集中精力做一件事。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: true, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'm19', text: '我会定期反思自己做事的方式。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.84, factorLoading: 0.80 } },
  { id: 'm20', text: '我善于总结经验教训。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'm21', text: '我会深入分析成功或失败的原因。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'm22', text: '我会把反思的结果运用到以后的行动中。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.83, factorLoading: 0.79 } },
  { id: 'm23', text: '事情过去了就过去了，我很少回想。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: true, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm24', text: '我经常重复犯同样的错误。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: true, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'm25', text: '我清楚地知道自己的兴趣所在。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.78, factorLoading: 0.74 } },
  { id: 'm26', text: '我了解自己的思维习惯和偏好。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'm27', text: '我能意识到自己什么时候状态不好。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm28', text: '我能区分哪些信息自己知道哪些不知道。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'm29', text: '我能觉察到自己的情绪如何影响思考。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.77, factorLoading: 0.73 } },
  { id: 'm30', text: '我会在心里默默复述刚学到的内容。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.78, factorLoading: 0.74 } },
  { id: 'm31', text: '我会时不时问自己"真的懂了吗"。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm32', text: '我能觉察到自己思维中的偏见。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'm33', text: '遇到障碍时，我会尝试多种解决办法。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'm34', text: '我会为自己设定合理的进度安排。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm35', text: '我知道如何分解复杂的问题。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'm36', text: '我会有意识地排除干扰。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.78, factorLoading: 0.74 } },
  { id: 'm37', text: '每完成一个项目我都会做总结。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.77, factorLoading: 0.73 } },
  { id: 'm38', text: '我会记录下自己学到的重要经验。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'm39', text: '我经常思考"怎样能做得更好"。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm40', text: '我会从他人的反馈中反思自己。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'm41', text: '我常常觉得自己无所不知。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: true, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm42', text: '我对自己的评价和别人对我的评价差别很大。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: true, discrimination: 0.78, factorLoading: 0.74 } },
  { id: 'm43', text: '我常常意识不到自己在浪费时间。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: true, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'm44', text: '我容易忽略细节中的错误。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: true, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'm45', text: '我明知方法不对还是会继续做下去。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: true, discrimination: 0.82, factorLoading: 0.78 } },
  { id: 'm46', text: '我不擅长合理规划自己的时间。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: true, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm47', text: '我很少想"为什么要这么做"。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: true, discrimination: 0.78, factorLoading: 0.74 } },
  { id: 'm48', text: '我觉得反思是浪费时间。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: true, discrimination: 0.77, factorLoading: 0.73 } },
  { id: 'm49', text: '我清楚自己的注意力特点。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'm50', text: '我知道如何发挥自己的长处。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm51', text: '我能感受到自己理解过程的变化。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.78, factorLoading: 0.74 } },
  { id: 'm52', text: '我会验证自己的想法是否正确。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: false, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'm53', text: '我能够有效地控制自己的学习节奏。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm54', text: '我知道什么时候应该休息。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: false, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'm55', text: '我经常和自己对话。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.77, factorLoading: 0.73 } },
  { id: 'm56', text: '经验让我变得越来越智慧。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: false, discrimination: 0.78, factorLoading: 0.74 } },
  { id: 'm57', text: '我对自己的判断过于自信。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'knowledge', reverse: true, discrimination: 0.80, factorLoading: 0.76 } },
  { id: 'm58', text: '我意识不到自己的认知局限。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'monitoring', reverse: true, discrimination: 0.81, factorLoading: 0.77 } },
  { id: 'm59', text: '我用老办法解决新问题。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'control', reverse: true, discrimination: 0.79, factorLoading: 0.75 } },
  { id: 'm60', text: '我从不反思自己的人生选择。',     type: 'scale',
  options: [
    { id: '1', text: '❌ 几乎从不这样做', value: 1 },
    { id: '2', text: '⚪️ 偶尔会这样做', value: 2 },
    { id: '3', text: '🔵 一半时间会这样', value: 3 },
    { id: '4', text: '🟢 经常这样做', value: 4 },
    { id: '5', text: '✅ 几乎总是这样做', value: 5 },
  ],

  meta: { dimension: 'reflection', reverse: true, discrimination: 0.82, factorLoading: 0.78 } },
]
