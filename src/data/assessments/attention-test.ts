import type { Assessment } from '../../types'
import { calculateAttention } from '../../utils/calculators/attention-calculator'

export const attentionTestAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'attention-test',
  title: '注意力测试',
  description: '聚焦你的注意力 | 评估持续性、选择性、分配性和转换性注意力',
  icon: '🎯',
  category: '认知功能',
  subcategory: '注意力',
  difficulty: 'easy',
  duration: 5,
  quality: '专业',
  resultCalculator: calculateAttention,
  questions: [
    {
      id: 'att1',
      type: 'likert-5',
      text: '工作时，我能够长时间保持专注，不容易被其他事情打断',
      reverseScored: false,
      dimension: 'sustained',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att2',
      type: 'likert-5',
      text: '在嘈杂的环境中，我仍然能够专注于手头的任务',
      reverseScored: false,
      dimension: 'selective',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att3',
      type: 'likert-5',
      text: '我能同时处理多项任务，比如一边听音乐一边工作',
      reverseScored: false,
      dimension: 'divided',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att4',
      type: 'likert-5',
      text: '当我需要从一项工作切换到另一项工作时，能够快速调整状态',
      reverseScored: false,
      dimension: 'shifting',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att5',
      type: 'likert-5',
      text: '阅读长篇文章时，我能从头到尾保持注意力集中',
      reverseScored: false,
      dimension: 'sustained',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att6',
      type: 'likert-5',
      text: '在众多信息中，我能快速找到自己需要的关键信息',
      reverseScored: false,
      dimension: 'selective',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att7',
      type: 'likert-5',
      text: '参加线上会议时，我能在记笔记的同时理解讨论内容',
      reverseScored: false,
      dimension: 'divided',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att8',
      type: 'likert-5',
      text: '从休息状态切换到学习/工作状态，我通常需要较长时间',
      reverseScored: true,
      dimension: 'shifting',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att9',
      type: 'likert-5',
      text: '长时间学习时，我很少出现走神或思绪飘远的情况',
      reverseScored: false,
      dimension: 'sustained',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att10',
      type: 'likert-5',
      text: '在有很多干扰因素的场合（如咖啡厅），我仍能专注于重要的事情',
      reverseScored: false,
      dimension: 'selective',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att11',
      type: 'likert-5',
      text: '我能边做家务边听有声书或播客',
      reverseScored: false,
      dimension: 'divided',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att12',
      type: 'likert-5',
      text: '当我中断一项任务去做别的事情后，能轻松地重新回到原任务',
      reverseScored: false,
      dimension: 'shifting',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att13',
      type: 'likert-5',
      text: '观看完整的电影或纪录片时，我能全程保持兴趣和专注',
      reverseScored: false,
      dimension: 'sustained',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att14',
      type: 'likert-5',
      text: '在一堆文件或资料中，我擅长找到目标内容而忽略其他信息',
      reverseScored: false,
      dimension: 'selective',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
    {
      id: 'att15',
      type: 'likert-5',
      text: '我能灵活地在不同难度的任务之间切换，而不会感到混乱',
      reverseScored: false,
      dimension: 'shifting',
      options: [
        { id: '1', text: '❌ 完全不符合', value: 1 },
        { id: '2', text: '⚪️ 比较不符合', value: 2 },
        { id: '3', text: '🔵 一般', value: 3 },
        { id: '4', text: '🟢 比较符合', value: 4 },
        { id: '5', text: '✅ 完全符合', value: 5 },
      ],
    },
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '🎯 注意力测试报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-amber-950 via-orange-800 to-red-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🎯</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.attentionLevel || '注意力水平评估'}</h2>
              <p className="text-amber-200/80 text-lg mb-4">Attention Test Report</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-amber-400/30">
                <span className="text-white">注意力指数</span>
                <span className="text-2xl font-black text-amber-300">\${result.totalScore || 75}</span>
                <span className="text-white/60">分</span>
              </div>
              
              <p className="text-amber-200 mt-6 text-sm">
                持续性 · 选择性 · 分配性 · 转换性
              </p>
            </div>
          </div>
        `,
      },
      {
        id: 'dimensions',
        title: '📊 四维注意力能力',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['sustained', 'selective', 'divided', 'shifting'],
        dimensionNames: {
          sustained: '持续性注意力',
          selective: '选择性注意力',
          divided: '分配性注意力',
          shifting: '转换性注意力',
        },
      },
    ],
  },
}
