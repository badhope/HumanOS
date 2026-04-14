import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 几乎从不这样', value: 1 },
  { id: '2', text: '⚪️ 偶尔这样', value: 2 },
  { id: '3', text: '🔵 有时这样', value: 3 },
  { id: '4', text: '🟢 经常这样', value: 4 },
  { id: '5', text: '✅ 总是这样', value: 5 },
]

export const sasAdvancedQuestions: Question[] = [
  { id: 'sas_a01', text: '我感到比往常更加神经过敏和焦虑', type: 'scale', options: opts, meta: { dimension: 'psychicAnxiety', reverse: false } },
  { id: 'sas_a02', text: '我无缘无故感到担心', type: 'scale', options: opts, meta: { dimension: 'psychicAnxiety', reverse: false } },
  { id: 'sas_a03', text: '我容易心烦意乱或感到恐慌', type: 'scale', options: opts, meta: { dimension: 'psychicAnxiety', reverse: false } },
  { id: 'sas_a04', text: '我感到我的身体好像被分成几块', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a05', text: '我感到一切都很好，不会发生什么不幸', type: 'scale', options: opts, meta: { dimension: 'psychicAnxiety', reverse: true } },
  { id: 'sas_a06', text: '我的手脚发抖打颤', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a07', text: '我因头痛、颈痛和背痛而烦恼', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a08', text: '我感到无力且容易疲劳', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a09', text: '我能安静地坐下来并轻松地放松自己', type: 'scale', options: opts, meta: { dimension: 'psychicAnxiety', reverse: true } },
  { id: 'sas_a10', text: '我感到我的心跳很快', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a11', text: '我因阵阵的眩晕而困扰', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a12', text: '我有过晕倒发作或觉得要晕倒似的', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a13', text: '我呼气吸气都感到很容易', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: true } },
  { id: 'sas_a14', text: '我手脚麻木和刺痛', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a15', text: '我因胃痛和消化不良而苦恼', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a16', text: '我常常要小便', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a17', text: '我的手常常是干燥温暖的', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: true } },
  { id: 'sas_a18', text: '我脸红发热', type: 'scale', options: opts, meta: { dimension: 'somaticAnxiety', reverse: false } },
  { id: 'sas_a19', text: '我容易入睡并且一夜睡得很好', type: 'scale', options: opts, meta: { dimension: 'sleepDisturbance', reverse: true } },
  { id: 'sas_a20', text: '我做噩梦', type: 'scale', options: opts, meta: { dimension: 'sleepDisturbance', reverse: false } },
  { id: 'sas_a21', text: '我难以集中注意力', type: 'scale', options: opts, meta: { dimension: 'cognitiveImpairment', reverse: false } },
  { id: 'sas_a22', text: '我的思绪经常飘走', type: 'scale', options: opts, meta: { dimension: 'cognitiveImpairment', reverse: false } },
  { id: 'sas_a23', text: '我对未来感到担忧', type: 'scale', options: opts, meta: { dimension: 'psychicAnxiety', reverse: false } },
  { id: 'sas_a24', text: '我感到紧张不安', type: 'scale', options: opts, meta: { dimension: 'psychicAnxiety', reverse: false } },
]
