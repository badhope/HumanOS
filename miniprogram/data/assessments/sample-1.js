export default {
  id: 'sample-1',
  name: '简易人格测试',
  description: '快速了解你的性格倾向',
  fullDesc: '这个简易人格测试可以帮助你快速了解自己在社交、思考和情绪稳定性三个维度上的特点。测试由三个问题组成，答案无对错之分，只需要根据你的第一直觉回答即可。',
  category: '人格',
  tags: ['人格', '自我探索'],
  duration: 3,
  icon: '🧠',
  color: '#2E7CF5',

  questions: [
    {
      id: 'q1',
      text: '在社交聚会中，你通常：',
      type: 'single',
      dimension: 'extraversion',
      reverse: false,
      options: [
        { value: 5, text: '主动和很多人交谈' },
        { value: 4, text: '和几个朋友交谈' },
        { value: 3, text: '看情况而定' },
        { value: 2, text: '大多时候在听' },
        { value: 1, text: '喜欢一个人待着' }
      ]
    },
    {
      id: 'q2',
      text: '做决定时，你更依赖：',
      type: 'single',
      dimension: 'thinking',
      reverse: false,
      options: [
        { value: 1, text: '逻辑分析' },
        { value: 2, text: '比较客观' },
        { value: 3, text: '兼顾两者' },
        { value: 4, text: '比较感性' },
        { value: 5, text: '个人感受' }
      ]
    },
    {
      id: 'q3',
      text: '面对突发事件，你更倾向于：',
      type: 'single',
      dimension: 'stability',
      reverse: true,
      options: [
        { value: 1, text: '冷静处理' },
        { value: 2, text: '比较稳定' },
        { value: 3, text: '看情况' },
        { value: 4, text: '有点紧张' },
        { value: 5, text: '容易焦虑' }
      ]
    }
  ],

  scoring: {
    dimensions: [
      { key: 'extraversion', name: '外向性', questionIds: ['q1'] },
      { key: 'thinking', name: '思考方式', questionIds: ['q2'] },
      { key: 'stability', name: '情绪稳定性', questionIds: ['q3'] }
    ],
    ranges: [
      {
        min: 0, max: 35,
        template: {
          title: '内倾稳健型',
          summary: '你更关注内心世界，做事比较稳重',
          desc: '你是一个内敛且稳定的人。你倾向于在社交中保持相对低调，更关注自己的内心感受和思考。在做决定时，你比较理性，不容易被情绪左右。面对压力时，你通常能够保持冷静，不会轻易慌乱。这种性格让你在需要专注和耐心的任务中表现出色。'
        }
      },
      {
        min: 36, max: 70,
        template: {
          title: '平衡型',
          summary: '你在各方面都比较均衡',
          desc: '你是一个适应性很强的人。在社交场合中，你既可以主动参与，也懂得适时倾听。做决定时，你能够兼顾理性和感性。面对压力时，你有一定的情绪调节能力。这种平衡的性格让你在各种情境下都能较好地适应，是一个可靠的伙伴。'
        }
      },
      {
        min: 71, max: 100,
        template: {
          title: '外倾灵活型',
          summary: '你善于社交，思维灵活',
          desc: '你是一个外向且开放的人。你喜欢与人交往，在社交场合中如鱼得水。做决定时，你比较注重自己和他人的感受。虽然有时会感受到一些情绪波动，但你思维敏捷，能够快速适应变化。这种性格让你在需要团队合作和创意的工作中表现突出。'
        }
      }
    ]
  }
};
