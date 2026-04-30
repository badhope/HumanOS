import type { Assessment } from '../../types'
import { calculatePCQ } from '../../utils/calculators/professional-calculators-factory'

export const pcqStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'pcq-standard',
  title: 'PCQ-26 心理资本测评',
  description: '积极心理学核心量表 | 测量你的HERO四大心理资本：希望×效能×韧性×乐观',
  icon: '💎',
  category: '心理健康',
  subcategory: '积极心理学',
  difficulty: 'standard',
  duration: 8,
  quality: '专业',
  resultCalculator: calculatePCQ,
  questions: [
    { id: 'pcq1', type: 'likert-5', text: '面对困难的任务时，我相信自己能够完成它', reverseScored: false, dimension: 'efficacy', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq2', type: 'likert-5', text: '我对自己的工作能力充满信心', reverseScored: false, dimension: 'efficacy', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq3', type: 'likert-5', text: '即使遇到挫折，我也相信自己能够克服', reverseScored: false, dimension: 'efficacy', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq4', type: 'likert-5', text: '面对新的挑战时，我感到焦虑和不安', reverseScored: true, dimension: 'efficacy', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq5', type: 'likert-5', text: '我怀疑自己能否有效地处理压力', reverseScored: true, dimension: 'efficacy', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq6', type: 'likert-5', text: '面对困难时，我有多种方法来克服它们', reverseScored: false, dimension: 'hope', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq7', type: 'likert-5', text: '我总是能找到解决问题的方法', reverseScored: false, dimension: 'hope', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq8', type: 'likert-5', text: '我对自己的未来有明确的目标', reverseScored: false, dimension: 'hope', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq9', type: 'likert-5', text: '我能想象自己成功实现目标的场景', reverseScored: false, dimension: 'hope', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq10', type: 'likert-5', text: '面对困难时，我很容易放弃目标', reverseScored: true, dimension: 'hope', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq11', type: 'likert-5', text: '遇到挫折时，我能够很快调整状态', reverseScored: false, dimension: 'resilience', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq12', type: 'likert-5', text: '我能够很快地从挫折中恢复过来', reverseScored: false, dimension: 'resilience', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq13', type: 'likert-5', text: '我将困难视为成长的机会', reverseScored: false, dimension: 'resilience', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq14', type: 'likert-5', text: '压力下我能够保持冷静', reverseScored: false, dimension: 'resilience', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq15', type: 'likert-5', text: '遇到困难时，我很容易感到绝望', reverseScored: true, dimension: 'resilience', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq16', type: 'likert-5', text: '我总是看到事情好的一面', reverseScored: false, dimension: 'optimism', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq17', type: 'likert-5', text: '我相信好事会发生在我身上', reverseScored: false, dimension: 'optimism', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq18', type: 'likert-5', text: '遇到不确定时，我总是期待最好的结果', reverseScored: false, dimension: 'optimism', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq19', type: 'likert-5', text: '我相信自己的努力会得到回报', reverseScored: false, dimension: 'optimism', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq20', type: 'likert-5', text: '失败时，我倾向于看到消极的一面', reverseScored: true, dimension: 'optimism', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq21', type: 'likert-5', text: '我对未来持乐观态度', reverseScored: false, dimension: 'optimism', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq22', type: 'likert-5', text: '我相信乌云背后总有阳光', reverseScored: false, dimension: 'optimism', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq23', type: 'likert-5', text: '我对生活充满热情', reverseScored: false, dimension: 'optimism', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq24', type: 'likert-5', text: '遇到困难时，我很难保持积极', reverseScored: true, dimension: 'optimism', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq25', type: 'likert-5', text: '我相信自己有能力实现梦想', reverseScored: false, dimension: 'efficacy', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
    { id: 'pcq26', type: 'likert-5', text: '我觉得自己的人生充满可能性', reverseScored: false, dimension: 'hope', options: [
      { id: '1', text: '❌ 几乎从不这样', value: 1 },
      { id: '2', text: '⚪️ 偶尔这样', value: 2 },
      { id: '3', text: '🔵 一半时间这样', value: 3 },
      { id: '4', text: '🟢 经常这样', value: 4 },
      { id: '5', text: '✅ 几乎总是这样', value: 5 },
    ]},
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '💎 PCQ心理资本量表报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-rose-950 via-pink-900 to-fuchsia-800">
            <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">💎</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.capitalLevel || '心理资本评估'}</h2>
              <p className="text-rose-200/80 text-lg mb-4">Psychological Capital Questionnaire</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-rose-400/30">
                <span className="text-white"> PsyCap 指数 </span>
                <span className="text-4xl font-black text-rose-300">\${result.totalScore || 100}</span>
                <span className="text-white/60">分</span>
              </div>
              
              <p className="text-rose-200 mt-6 text-sm">
                自我效能 · 希望 · 韧性 · 乐观
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 HERO四维度心理资本',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['efficacy', 'hope', 'resilience', 'optimism'],
        dimensionNames: {
          efficacy: '自我效能',
          hope: '希望',
          resilience: '韧性',
          optimism: '乐观'
        }
      }
    ]
  }
}
