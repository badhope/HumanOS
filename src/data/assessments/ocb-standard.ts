import type { Assessment } from '../../types'
import { calculateOCB } from '../../utils/calculators/professional-calculators-factory'

export const ocbStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'ocb-standard',
  title: 'OCB 组织公民行为量表',
  description: '组织行为学经典 | KPI之外的隐性绩效测评：你是老板心中的好员工吗？',
  icon: '🤝',
  category: '职业发展',
  subcategory: '企业文化',
  difficulty: 'standard',
  duration: 6,
  quality: '专业',
  resultCalculator: calculateOCB,
  questions: [
    { id: 'ocb1', type: 'likert-5', text: '我会主动帮助新同事适应工作', reverseScored: false, dimension: 'altruism', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb2', type: 'likert-5', text: '我经常提前完成自己的工作任务', reverseScored: false, dimension: 'conscientiousness', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb3', type: 'likert-5', text: '一点小事不如意我就会抱怨', reverseScored: true, dimension: 'sportsmanship', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb4', type: 'likert-5', text: '做可能影响别人的事时我会提前沟通', reverseScored: false, dimension: 'courtesy', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb5', type: 'likert-5', text: '我会主动参加公司的会议和活动', reverseScored: false, dimension: 'civic-virtue', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb6', type: 'likert-5', text: '有人请假时我愿意帮忙分担工作', reverseScored: false, dimension: 'altruism', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb7', type: 'likert-5', text: '就算没人检查我也会按规范做事', reverseScored: false, dimension: 'conscientiousness', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb8', type: 'likert-5', text: '我倾向于放大工作中的小问题', reverseScored: true, dimension: 'sportsmanship', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb9', type: 'likert-5', text: '我尊重别人的意见和想法', reverseScored: false, dimension: 'courtesy', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb10', type: 'likert-5', text: '我会关心公司的发展并提出建议', reverseScored: false, dimension: 'civic-virtue', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb11', type: 'likert-5', text: '我会和同事分享有用的信息和资源', reverseScored: false, dimension: 'altruism', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb12', type: 'likert-5', text: '我不会在工作时间做私人的事情', reverseScored: false, dimension: 'conscientiousness', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb13', type: 'likert-5', text: '吃亏的事我绝对不会做', reverseScored: true, dimension: 'sportsmanship', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb14', type: 'likert-5', text: '我不会贸然干涉别人的工作', reverseScored: false, dimension: 'courtesy', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb15', type: 'likert-5', text: '我愿意为公司牺牲个人时间', reverseScored: false, dimension: 'civic-virtue', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb16', type: 'likert-5', text: '当同事遇到困难时我会伸出援手', reverseScored: false, dimension: 'altruism', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb17', type: 'likert-5', text: '我总是保持工作区域的整洁有序', reverseScored: false, dimension: 'conscientiousness', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb18', type: 'likert-5', text: '我总觉得自己得到的比付出的少', reverseScored: true, dimension: 'sportsmanship', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb19', type: 'likert-5', text: '即使不同意我也会礼貌地表达', reverseScored: false, dimension: 'courtesy', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb20', type: 'likert-5', text: '我主动学习公司的新政策和制度', reverseScored: false, dimension: 'civic-virtue', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb21', type: 'likert-5', text: '我会指导新人帮助他们成长', reverseScored: false, dimension: 'altruism', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb22', type: 'likert-5', text: '我总是高标准要求自己的工作质量', reverseScored: false, dimension: 'conscientiousness', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb23', type: 'likert-5', text: '得到别人帮助后我会真诚地感谢', reverseScored: false, dimension: 'courtesy', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'ocb24', type: 'likert-5', text: '我会维护公司的形象和声誉', reverseScored: false, dimension: 'civic-virtue', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '🤝 组织公民行为量表报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-sky-950 via-blue-800 to-indigo-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">💙</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.ocbLevel || '组织公民行为评估'}</h2>
              <p className="text-sky-200/80 text-lg mb-4">Organizational Citizenship Behavior</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-sky-400/30">
                <span className="text-white">OCB 指数</span>
                <span className="text-2xl font-black text-sky-300">\${result.totalScore || 90}</span>
                <span className="text-white/60">分</span>
              </div>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 五维组织公民行为',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['altruism', 'courtesy', 'sportsmanship', 'conscientiousness', 'civic-virtue'],
        dimensionNames: {
          altruism: '利他主义',
          courtesy: '礼貌礼仪',
          sportsmanship: '运动员精神',
          conscientiousness: '尽职敬业',
          'civic-virtue': '公民美德'
        }
      }
    ]
  }
}
