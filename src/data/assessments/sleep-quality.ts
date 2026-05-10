import type { Assessment } from '../../types'
import { calculatePSQI } from '../../utils/calculators/psqi-calculator'

export const sleepQualityAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'sleep-quality',
  title: '睡眠质量测评 (PSQI简化版)',
  description: '匹兹堡睡眠质量指数，评估你的睡眠质量和日间功能状态',
  icon: '🌙',
  category: '健康',
  subcategory: '睡眠健康',
  difficulty: 'lite',
  duration: 5,
  quality: '专业',
  resultCalculator: calculatePSQI,
  questions: [
    { id: 'psqi_n01', type: 'likert-4', text: '最近一个月，你的睡眠质量怎么样？', reverseScored: false, dimension: 'sleepQuality', options: [
      { id: '0', text: '很好', value: 0 },
      { id: '1', text: '较好', value: 1 },
      { id: '2', text: '较差', value: 2 },
      { id: '3', text: '很差', value: 3 },
    ]},
    { id: 'psqi_n02', type: 'likert-4', text: '最近一个月，你通常需要多久才能入睡？', reverseScored: false, dimension: 'sleepLatency', options: [
      { id: '0', text: '≤15分钟', value: 0 },
      { id: '1', text: '16-30分钟', value: 1 },
      { id: '2', text: '31-60分钟', value: 2 },
      { id: '3', text: '>60分钟', value: 3 },
    ]},
    { id: 'psqi_n03', type: 'likert-4', text: '最近一个月，你躺在床上后通常多久会实际睡着？', reverseScored: false, dimension: 'sleepLatency', options: [
      { id: '0', text: '没有问题', value: 0 },
      { id: '1', text: '轻微问题', value: 1 },
      { id: '2', text: '有问题', value: 2 },
      { id: '3', text: '严重问题', value: 3 },
    ]},
    { id: 'psqi_n04', type: 'likert-4', text: '最近一个月，你平均每晚实际睡眠多少小时？', reverseScored: false, dimension: 'sleepDuration', options: [
      { id: '0', text: '≥7小时', value: 0 },
      { id: '1', text: '6-7小时（不含）', value: 1 },
      { id: '2', text: '5-6小时（不含）', value: 2 },
      { id: '3', text: '<5小时', value: 3 },
    ]},
    { id: 'psqi_n05', type: 'likert-4', text: '最近一个月，你通常几点上床睡觉？', reverseScored: false, dimension: 'sleepEfficiency', options: [
      { id: '0', text: '22:00之前', value: 0 },
      { id: '1', text: '22:00-23:30', value: 1 },
      { id: '2', text: '23:30-01:00', value: 2 },
      { id: '3', text: '01:00之后', value: 3 },
    ]},
    { id: 'psqi_n06', type: 'likert-4', text: '最近一个月，你通常几点起床？', reverseScored: false, dimension: 'sleepEfficiency', options: [
      { id: '0', text: '06:00之前', value: 0 },
      { id: '1', text: '06:00-07:30', value: 1 },
      { id: '2', text: '07:30-09:00', value: 2 },
      { id: '3', text: '09:00之后', value: 3 },
    ]},
    { id: 'psqi_n07', type: 'likert-4', text: '最近一个月，你是否因为以下情况影响睡眠？①夜间易醒或早醒 ②夜间去厕所 ③呼吸不畅 ④咳嗽或鼾声 ⑤感觉冷 ⑥感觉热 ⑦做噩梦 ⑧疼痛', reverseScored: false, dimension: 'sleepDisturbance', options: [
      { id: '0', text: '过去一个月没有', value: 0 },
      { id: '1', text: '每周平均不足1次', value: 1 },
      { id: '2', text: '每周平均1-2次', value: 2 },
      { id: '3', text: '每周平均3次或以上', value: 3 },
    ]},
    { id: 'psqi_n08', type: 'likert-4', text: '最近一个月，你是否经常因为以下情况而早醒？①醒来后无法再次入睡 ②早上醒来时感觉疲惫', reverseScored: false, dimension: 'sleepDisturbance', options: [
      { id: '0', text: '过去一个月没有', value: 0 },
      { id: '1', text: '每周平均不足1次', value: 1 },
      { id: '2', text: '每周平均1-2次', value: 2 },
      { id: '3', text: '每周平均3次或以上', value: 3 },
    ]},
    { id: 'psqi_n09', type: 'likert-4', text: '最近一个月，你是否服用过安眠药物（处方药或非处方药）来帮助睡眠？', reverseScored: false, dimension: 'hypnoticDrugs', options: [
      { id: '0', text: '过去一个月没有', value: 0 },
      { id: '1', text: '每周平均不足1次', value: 1 },
      { id: '2', text: '每周平均1-2次', value: 2 },
      { id: '3', text: '每周平均3次或以上', value: 3 },
    ]},
    { id: 'psqi_n10', type: 'likert-4', text: '最近一个月，你在开车、吃饭或社交活动中，是否会因为困倦而出现注意力不集中或困难？', reverseScored: false, dimension: 'daytimeDysfunction', options: [
      { id: '0', text: '过去一个月没有', value: 0 },
      { id: '1', text: '每周平均不足1次', value: 1 },
      { id: '2', text: '每周平均1-2次', value: 2 },
      { id: '3', text: '每周平均3次或以上', value: 3 },
    ]},
    { id: 'psqi_n11', type: 'likert-4', text: '最近一个月，你是否经常在白天感到困倦，影响日常工作和学习？', reverseScored: false, dimension: 'daytimeDysfunction', options: [
      { id: '0', text: '没有', value: 0 },
      { id: '1', text: '偶尔', value: 1 },
      { id: '2', text: '有时', value: 2 },
      { id: '3', text: '经常', value: 3 },
    ]},
    { id: 'psqi_n12', type: 'likert-4', text: '最近一个月，你是否经常熬夜刷手机、短视频或打游戏？', reverseScored: false, dimension: 'sleepHabits', options: [
      { id: '0', text: '几乎没有', value: 0 },
      { id: '1', text: '每周1-2次', value: 1 },
      { id: '2', text: '每周3-4次', value: 2 },
      { id: '3', text: '几乎每天', value: 3 },
    ]},
    { id: 'psqi_n13', type: 'likert-4', text: '最近一个月，你是否有午睡的习惯？', reverseScored: false, dimension: 'sleepHabits', options: [
      { id: '0', text: '每天午睡15-30分钟', value: 0 },
      { id: '1', text: '偶尔午睡', value: 1 },
      { id: '2', text: '经常午睡超过1小时', value: 2 },
      { id: '3', text: '从不午睡', value: 3 },
    ]},
    { id: 'psqi_n14', type: 'likert-4', text: '最近一个月，你是否因为压力大、焦虑或担忧而难以入睡？', reverseScored: false, dimension: 'sleepQuality', options: [
      { id: '0', text: '过去一个月没有', value: 0 },
      { id: '1', text: '每周平均不足1次', value: 1 },
      { id: '2', text: '每周平均1-2次', value: 2 },
      { id: '3', text: '每周平均3次或以上', value: 3 },
    ]},
    { id: 'psqi_n15', type: 'likert-4', text: '最近一个月，你的卧室环境（光线、噪音、温度、床铺舒适度）对你睡眠的影响程度？', reverseScored: false, dimension: 'sleepEnvironment', options: [
      { id: '0', text: '没有影响', value: 0 },
      { id: '1', text: '影响较小', value: 1 },
      { id: '2', text: '有一定影响', value: 2 },
      { id: '3', text: '影响很大', value: 3 },
    ]},
    { id: 'psqi_n16', type: 'likert-4', text: '最近一个月，你是否因为睡眠问题而在白天需要更多时间恢复精力？', reverseScored: false, dimension: 'daytimeDysfunction', options: [
      { id: '0', text: '不需要', value: 0 },
      { id: '1', text: '偶尔需要', value: 1 },
      { id: '2', text: '有时需要', value: 2 },
      { id: '3', text: '经常需要', value: 3 },
    ]},
    { id: 'psqi_n17', type: 'likert-4', text: '最近一个月，你是否在周末或休息日比工作日睡得更晚或更久？', reverseScored: false, dimension: 'sleepHabits', options: [
      { id: '0', text: '作息规律，没有差异', value: 0 },
      { id: '1', text: '稍微晚一些或久一些', value: 1 },
      { id: '2', text: '晚1-2小时或多睡1-2小时', value: 2 },
      { id: '3', text: '晚2小时以上或多睡2小时以上', value: 3 },
    ]},
    { id: 'psqi_n18', type: 'likert-4', text: '综合来看，你认为过去一个月的睡眠状况对你的整体生活质量有多大影响？', reverseScored: false, dimension: 'sleepQuality', options: [
      { id: '0', text: '没有影响', value: 0 },
      { id: '1', text: '有一点影响', value: 1 },
      { id: '2', text: '有较大影响', value: 2 },
      { id: '3', text: '影响很大', value: 3 },
    ]},
  ]
}
