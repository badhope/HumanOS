export default {
  id: 'sample-2',
  name: '压力水平测试',
  description: '评估你当前的压力状况',
  fullDesc: '在现代生活中，压力是不可避免的。这个测试可以帮助你了解自己当前的压力水平，以及压力对你生活的影响程度。通过了解自己的压力状态，你可以更好地调整生活节奏，保护身心健康。',
  category: '情绪',
  tags: ['压力', '心理健康'],
  duration: 3,
  icon: '💆',
  color: '#16B39A',

  questions: [
    {
      id: 'q1',
      text: '最近一周，你感到紧张的频率是？',
      type: 'single',
      dimension: 'tension',
      reverse: false,
      options: [
        { value: 1, text: '几乎没有' },
        { value: 2, text: '偶尔' },
        { value: 3, text: '有时' },
        { value: 4, text: '经常' },
        { value: 5, text: '总是' }
      ]
    },
    {
      id: 'q2',
      text: '你是否因为压力而影响睡眠？',
      type: 'single',
      dimension: 'sleep',
      reverse: false,
      options: [
        { value: 1, text: '完全没有' },
        { value: 2, text: '很少' },
        { value: 3, text: '有时' },
        { value: 4, text: '经常' },
        { value: 5, text: '总是' }
      ]
    },
    {
      id: 'q3',
      text: '最近你感到心情愉快的频率是？',
      type: 'single',
      dimension: 'mood',
      reverse: true,
      options: [
        { value: 5, text: '几乎没有' },
        { value: 4, text: '偶尔' },
        { value: 3, text: '有时' },
        { value: 2, text: '经常' },
        { value: 1, text: '总是' }
      ]
    },
    {
      id: 'q4',
      text: '你是否觉得事情多到无法应付？',
      type: 'single',
      dimension: 'overload',
      reverse: false,
      options: [
        { value: 1, text: '完全没有' },
        { value: 2, text: '很少' },
        { value: 3, text: '有时' },
        { value: 4, text: '经常' },
        { value: 5, text: '总是' }
      ]
    }
  ],

  scoring: {
    dimensions: [
      { key: 'tension', name: '紧张感', questionIds: ['q1'] },
      { key: 'sleep', name: '睡眠影响', questionIds: ['q2'] },
      { key: 'mood', name: '情绪状态', questionIds: ['q3'] },
      { key: 'overload', name: '负荷感', questionIds: ['q4'] }
    ],
    ranges: [
      {
        min: 0, max: 30,
        template: {
          title: '压力较低',
          summary: '你目前状态比较放松',
          desc: '恭喜你，你目前的压力水平较低。你能够较好地应对生活中的挑战，睡眠质量也比较好，情绪状态稳定。这是一个很好的状态，建议你保持良好的生活习惯，继续关注自己的身心健康。可以尝试一些放松活动，如冥想、轻度运动等，来维持这种平衡状态。'
        }
      },
      {
        min: 31, max: 60,
        template: {
          title: '压力适中',
          summary: '有一定压力但在可控范围',
          desc: '你目前的压力处于中等水平。虽然会感受到一些压力，但整体上还在可以控制的范围内。建议你注意观察自己的情绪变化，适当调整工作和休息的节奏。可以尝试一些简单的放松技巧，如深呼吸、短暂的休息等，来缓解紧张感。保持规律的作息和适度的运动也会很有帮助。'
        }
      },
      {
        min: 61, max: 100,
        template: {
          title: '压力较高',
          summary: '建议适当调整，注意休息',
          desc: '你目前的压力水平较高，可能已经开始影响你的睡眠和情绪。这是身体发出的信号，提醒你需要关注自己的健康了。建议你尽快调整生活节奏，确保有充足的休息时间。可以尝试一些减压方法，如运动、冥想、或者与朋友倾诉。如果压力持续存在，不妨寻求专业人士的帮助。记住，关心自己的心理健康和关心身体健康同样重要。'
        }
      }
    ]
  }
};
