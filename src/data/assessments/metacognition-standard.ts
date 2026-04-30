import type { Assessment } from '../../types'
import { calculateMetacognition } from '../../utils/calculators/professional-calculators-factory'

export const metacognitionStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'metacognition-standard',
  title: '元认知能力量表',
  description: '思考你如何思考 | 测量自我觉察和认知管理的核心能力',
  icon: '👁️',
  category: '经典心理学',
  subcategory: '流体智力',
  difficulty: 'standard',
  duration: 6,
  quality: '专业',
  resultCalculator: calculateMetacognition,
  questions: [
    { id: 'meta1', type: 'likert-5', text: '我知道自己擅长什么、不擅长什么', reverseScored: false, dimension: 'knowledge', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta2', type: 'likert-5', text: '遇到困难时我会主动调整思考策略', reverseScored: false, dimension: 'regulation', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta3', type: 'likert-5', text: '思考时我能觉察自己的情绪状态', reverseScored: false, dimension: 'monitoring', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta4', type: 'likert-5', text: '做完决策后我会复盘思考过程', reverseScored: false, dimension: 'evaluation', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta5', type: 'likert-5', text: '我很少反思自己的思考过程', reverseScored: true, dimension: 'knowledge', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta6', type: 'likert-5', text: '我会有意识地使用不同的思维工具', reverseScored: false, dimension: 'regulation', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta7', type: 'likert-5', text: '我能觉察自己何时进入了认知偏差', reverseScored: false, dimension: 'monitoring', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta8', type: 'likert-5', text: '我能够识别自己思维中的逻辑漏洞', reverseScored: false, dimension: 'evaluation', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta9', type: 'likert-5', text: '我知道哪些认知策略适合哪些场景', reverseScored: false, dimension: 'knowledge', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta10', type: 'likert-5', text: '陷入负面思维时我难以跳出来', reverseScored: true, dimension: 'regulation', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta11', type: 'likert-5', text: '我能实时观察自己的思考过程', reverseScored: false, dimension: 'monitoring', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta12', type: 'likert-5', text: '我会验证自己的假设是否正确', reverseScored: false, dimension: 'evaluation', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta13', type: 'likert-5', text: '我了解各种认知偏差和启发式', reverseScored: false, dimension: 'knowledge', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta14', type: 'likert-5', text: '面对问题我会先选择合适的思考框架', reverseScored: false, dimension: 'regulation', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta15', type: 'likert-5', text: '注意涣散时我难以自我觉察', reverseScored: true, dimension: 'monitoring', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta16', type: 'likert-5', text: '我会主动寻找自己思维的盲点', reverseScored: false, dimension: 'evaluation', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta17', type: 'likert-5', text: '我知道自己的认知边界在哪里', reverseScored: false, dimension: 'knowledge', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta18', type: 'likert-5', text: '我会有意识地转换思考视角', reverseScored: false, dimension: 'regulation', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta19', type: 'likert-5', text: '我能觉察自己何时被情绪影响判断', reverseScored: false, dimension: 'monitoring', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'meta20', type: 'likert-5', text: '我很少质疑自己结论的正确性', reverseScored: true, dimension: 'evaluation', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '🧠 元认知量表报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-violet-950 via-purple-800 to-fuchsia-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">💭</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.metacognitionLevel || '元认知水平评估'}</h2>
              <p className="text-violet-200/80 text-lg mb-4">Metacognition Scale</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-violet-400/30">
                <span className="text-white">元认知指数</span>
                <span className="text-2xl font-black text-violet-300">\${result.totalScore || 75}</span>
                <span className="text-white/60">分</span>
              </div>
              
              <p className="text-violet-200 mt-6 text-sm">
                知识 · 监控 · 调节 · 计划 · 评价
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 五维元认知能力',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['knowledge', 'monitoring', 'regulation', 'planning', 'evaluation'],
        dimensionNames: {
          knowledge: '元认知知识',
          monitoring: '监控',
          regulation: '调节',
          planning: '计划',
          evaluation: '评价'
        }
      }
    ]
  }
}
