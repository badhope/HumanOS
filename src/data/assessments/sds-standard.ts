import type { Assessment } from '../../types'
import { calculateSDS } from '../../utils/calculators/professional-calculators-factory'

export const sdsStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'sds-standard',
  title: 'SDS 抑郁自评量表',
  description: '国际通用的抑郁症筛查工具，Zung氏标准化量表，准确识别抑郁风险',
  icon: '🩹',
  category: '心理健康',
  subcategory: '情绪健康',
  difficulty: 'standard',
  duration: 5,
  quality: '专业',
  resultCalculator: calculateSDS,
  questions: [
    { id: 'sds_n01', type: 'likert-4', text: '我感到情绪低落，闷闷不乐', reverseScored: false, dimension: 'affective', options: [
      { id: '1', text: '完全没有这种感觉', value: 1 },
      { id: '2', text: '偶尔会有一点', value: 2 },
      { id: '3', text: '经常有这种感觉', value: 3 },
      { id: '4', text: '大部分时间都这样', value: 4 },
    ]},
    { id: 'sds_n02', type: 'likert-4', text: '我觉得一天之中早晨心情最好', reverseScored: true, dimension: 'affective', options: [
      { id: '1', text: '早晨心情确实最好', value: 1 },
      { id: '2', text: '早晨心情还行', value: 2 },
      { id: '3', text: '早晨没什么特别感觉', value: 3 },
      { id: '4', text: '早晨心情最差', value: 4 },
    ]},
    { id: 'sds_n03', type: 'likert-4', text: '我容易哭出来或者觉得想哭', reverseScored: false, dimension: 'affective', options: [
      { id: '1', text: '完全不会', value: 1 },
      { id: '2', text: '看感动的内容才会', value: 2 },
      { id: '3', text: '莫名就会眼眶湿润', value: 3 },
      { id: '4', text: '经常控制不住流泪', value: 4 },
    ]},
    { id: 'sds_n04', type: 'likert-4', text: '我晚上睡眠不好', reverseScored: false, dimension: 'somatic', options: [
      { id: '1', text: '沾枕头就睡着', value: 1 },
      { id: '2', text: '半小时内能睡着', value: 2 },
      { id: '3', text: '翻来覆去很久', value: 3 },
      { id: '4', text: '整夜失眠或早醒', value: 4 },
    ]},
    { id: 'sds_n05', type: 'likert-4', text: '我吃得跟平常一样多', reverseScored: true, dimension: 'somatic', options: [
      { id: '1', text: '胃口特别好', value: 1 },
      { id: '2', text: '食欲正常', value: 2 },
      { id: '3', text: '吃得比以前少', value: 3 },
      { id: '4', text: '完全没胃口', value: 4 },
    ]},
    { id: 'sds_n06', type: 'likert-4', text: '我与异性接触时和以往一样愉快', reverseScored: true, dimension: 'psychomotor', options: [
      { id: '1', text: '和以前一样开心', value: 1 },
      { id: '2', text: '还行，差不多', value: 2 },
      { id: '3', text: '没以前那么有兴致', value: 3 },
      { id: '4', text: '完全提不起兴趣', value: 4 },
    ]},
    { id: 'sds_n07', type: 'likert-4', text: '我发现我的体重在下降', reverseScored: false, dimension: 'somatic', options: [
      { id: '1', text: '体重很稳定', value: 1 },
      { id: '2', text: '有小幅波动', value: 2 },
      { id: '3', text: '明显轻了一些', value: 3 },
      { id: '4', text: '掉了很多斤', value: 4 },
    ]},
    { id: 'sds_n08', type: 'likert-4', text: '我有便秘的苦恼', reverseScored: false, dimension: 'somatic', options: [
      { id: '1', text: '完全没有', value: 1 },
      { id: '2', text: '偶尔会有', value: 2 },
      { id: '3', text: '经常这样', value: 3 },
      { id: '4', text: '一直困扰我', value: 4 },
    ]},
    { id: 'sds_n09', type: 'likert-4', text: '我的心跳比平时快', reverseScored: false, dimension: 'somatic', options: [
      { id: '1', text: '很平稳', value: 1 },
      { id: '2', text: '运动后才会', value: 2 },
      { id: '3', text: '偶尔莫名心慌', value: 3 },
      { id: '4', text: '经常心跳加速', value: 4 },
    ]},
    { id: 'sds_n10', type: 'likert-4', text: '我无缘无故地感到疲劳', reverseScored: false, dimension: 'somatic', options: [
      { id: '1', text: '精力充沛', value: 1 },
      { id: '2', text: '晚上才会累', value: 2 },
      { id: '3', text: '起床就觉得累', value: 3 },
      { id: '4', text: '什么都没做也累', value: 4 },
    ]},
    { id: 'sds_n11', type: 'likert-4', text: '我的头脑跟平常一样清楚', reverseScored: true, dimension: 'cognitive', options: [
      { id: '1', text: '思路特别清晰', value: 1 },
      { id: '2', text: '和平时一样', value: 2 },
      { id: '3', text: '有点反应迟钝', value: 3 },
      { id: '4', text: '脑子一团浆糊', value: 4 },
    ]},
    { id: 'sds_n12', type: 'likert-4', text: '我做事情像平时一样不感到困难', reverseScored: true, dimension: 'psychomotor', options: [
      { id: '1', text: '做什么都很顺手', value: 1 },
      { id: '2', text: '和平时差不多', value: 2 },
      { id: '3', text: '比以前费劲一些', value: 3 },
      { id: '4', text: '什么都不想做', value: 4 },
    ]},
    { id: 'sds_n13', type: 'likert-4', text: '我坐卧不安，难以保持平静', reverseScored: false, dimension: 'psychomotor', options: [
      { id: '1', text: '很平静', value: 1 },
      { id: '2', text: '偶尔有点烦躁', value: 2 },
      { id: '3', text: '经常坐不住', value: 3 },
      { id: '4', text: '如坐针毡', value: 4 },
    ]},
    { id: 'sds_n14', type: 'likert-4', text: '我对未来抱有希望', reverseScored: true, dimension: 'cognitive', options: [
      { id: '1', text: '充满期待', value: 1 },
      { id: '2', text: '还行吧', value: 2 },
      { id: '3', text: '不太抱希望', value: 3 },
      { id: '4', text: '看不到未来', value: 4 },
    ]},
    { id: 'sds_n15', type: 'likert-4', text: '我比平时更容易生气激动', reverseScored: false, dimension: 'affective', options: [
      { id: '1', text: '脾气特别好', value: 1 },
      { id: '2', text: '和平时一样', value: 2 },
      { id: '3', text: '容易不耐烦', value: 3 },
      { id: '4', text: '一点就炸', value: 4 },
    ]},
    { id: 'sds_n16', type: 'likert-4', text: '我觉得做出决定是容易的', reverseScored: true, dimension: 'cognitive', options: [
      { id: '1', text: '果断不纠结', value: 1 },
      { id: '2', text: '和平时一样', value: 2 },
      { id: '3', text: '选择困难', value: 3 },
      { id: '4', text: '什么决定都做不了', value: 4 },
    ]},
    { id: 'sds_n17', type: 'likert-4', text: '我觉得自己是个有用的人', reverseScored: true, dimension: 'cognitive', options: [
      { id: '1', text: '觉得自己很棒', value: 1 },
      { id: '2', text: '还行，普通人', value: 2 },
      { id: '3', text: '没什么价值', value: 3 },
      { id: '4', text: '活着就是累赘', value: 4 },
    ]},
    { id: 'sds_n18', type: 'likert-4', text: '我的生活过得很有意思', reverseScored: true, dimension: 'affective', options: [
      { id: '1', text: '特别有意思', value: 1 },
      { id: '2', text: '还可以', value: 2 },
      { id: '3', text: '有点无聊', value: 3 },
      { id: '4', text: '生不如死', value: 4 },
    ]},
    { id: 'sds_n19', type: 'likert-4', text: '我认为如果我死了别人会生活得更好', reverseScored: false, dimension: 'cognitive', options: [
      { id: '1', text: '绝对不会', value: 1 },
      { id: '2', text: '没想过', value: 2 },
      { id: '3', text: '偶尔这样想', value: 3 },
      { id: '4', text: '确信是这样', value: 4 },
    ]},
    { id: 'sds_n20', type: 'likert-4', text: '平常感兴趣的事我仍然感兴趣', reverseScored: true, dimension: 'psychomotor', options: [
      { id: '1', text: '兴趣依然浓厚', value: 1 },
      { id: '2', text: '和以前差不多', value: 2 },
      { id: '3', text: '兴趣淡了很多', value: 3 },
      { id: '4', text: '对什么都没兴趣', value: 4 },
    ]},
  ]
}
