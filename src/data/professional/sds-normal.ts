import type { Question } from '../../types'

const opts = [
  { id: '1', text: '❌ 几乎没有', value: 1 },
  { id: '2', text: '⚪️ 有时有', value: 2 },
  { id: '3', text: '🔵 经常有', value: 3 },
  { id: '4', text: '🟢 总是有', value: 4 },
]

export const sdsNormalQuestions: Question[] = [
  { id: 'sds_n01', text: '我感到情绪低落，闷闷不乐', type: 'scale', options: opts, meta: { dimension: 'affective', weight: 1.0 } },
  { id: 'sds_n02', text: '我觉得一天之中早晨心情最好', type: 'scale', options: opts, meta: { dimension: 'affective', reverse: true, weight: 1.0 } },
  { id: 'sds_n03', text: '我容易哭出来或者觉得想哭', type: 'scale', options: opts, meta: { dimension: 'affective', weight: 1.0 } },
  { id: 'sds_n04', text: '我晚上睡眠不好', type: 'scale', options: opts, meta: { dimension: 'somatic', weight: 1.0 } },
  { id: 'sds_n05', text: '我吃得跟平常一样多', type: 'scale', options: opts, meta: { dimension: 'somatic', reverse: true, weight: 1.0 } },
  { id: 'sds_n06', text: '我与异性接触时和以往一样愉快', type: 'scale', options: opts, meta: { dimension: 'psychomotor', reverse: true, weight: 1.0 } },
  { id: 'sds_n07', text: '我发现我的体重在下降', type: 'scale', options: opts, meta: { dimension: 'somatic', weight: 1.0 } },
  { id: 'sds_n08', text: '我有便秘的苦恼', type: 'scale', options: opts, meta: { dimension: 'somatic', weight: 1.0 } },
  { id: 'sds_n09', text: '我的心跳比平时快', type: 'scale', options: opts, meta: { dimension: 'somatic', weight: 1.0 } },
  { id: 'sds_n10', text: '我无缘无故地感到疲劳', type: 'scale', options: opts, meta: { dimension: 'somatic', weight: 1.0 } },
  { id: 'sds_n11', text: '我的头脑跟平常一样清楚', type: 'scale', options: opts, meta: { dimension: 'cognitive', reverse: true, weight: 1.0 } },
  { id: 'sds_n12', text: '我做事情像平时一样不感到困难', type: 'scale', options: opts, meta: { dimension: 'psychomotor', reverse: true, weight: 1.0 } },
  { id: 'sds_n13', text: '我坐卧不安，难以保持平静', type: 'scale', options: opts, meta: { dimension: 'psychomotor', weight: 1.0 } },
  { id: 'sds_n14', text: '我对未来抱有希望', type: 'scale', options: opts, meta: { dimension: 'cognitive', reverse: true, weight: 1.0 } },
  { id: 'sds_n15', text: '我比平时更容易生气激动', type: 'scale', options: opts, meta: { dimension: 'affective', weight: 1.0 } },
  { id: 'sds_n16', text: '我觉得做出决定是容易的', type: 'scale', options: opts, meta: { dimension: 'cognitive', reverse: true, weight: 1.0 } },
  { id: 'sds_n17', text: '我觉得自己是个有用的人', type: 'scale', options: opts, meta: { dimension: 'cognitive', reverse: true, weight: 1.0 } },
  { id: 'sds_n18', text: '我的生活过得很有意思', type: 'scale', options: opts, meta: { dimension: 'affective', reverse: true, weight: 1.0 } },
  { id: 'sds_n19', text: '我认为如果我死了别人会生活得更好', type: 'scale', options: opts, meta: { dimension: 'cognitive', weight: 1.0 } },
  { id: 'sds_n20', text: '平常感兴趣的事我仍然感兴趣', type: 'scale', options: opts, meta: { dimension: 'psychomotor', reverse: true, weight: 1.0 } },
]
