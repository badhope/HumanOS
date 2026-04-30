import type { Assessment } from '../../types'
import { calculateHardiness } from '../../utils/calculators/professional-calculators-factory'

export const hardinessStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'hardiness-standard',
  title: 'HRD 心理韧性量表',
  description: 'Kobasa经典坚韧性人格 | 测量3C核心品质：投入×控制×挑战',
  icon: '🗿',
  category: '心理健康',
  subcategory: '积极心理学',
  difficulty: 'standard',
  duration: 6,
  quality: '专业',
  resultCalculator: calculateHardiness,
  questions: [
    { id: 'h1', type: 'likert-5', text: '大多数日子里，我对生活充满热情和目标感', reverseScored: false, dimension: 'commitment', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h2', type: 'likert-5', text: '我全身心地投入到所做的每一件事', reverseScored: false, dimension: 'commitment', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h3', type: 'likert-5', text: '我经常感到生活空虚无聊，缺乏方向', reverseScored: true, dimension: 'commitment', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h4', type: 'likert-5', text: '我对周围发生的事情感到深深的兴趣', reverseScored: false, dimension: 'commitment', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h5', type: 'likert-5', text: '我觉得自己与这个世界是连接的', reverseScored: false, dimension: 'commitment', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h6', type: 'likert-5', text: '我觉得生活好像一个旁观者', reverseScored: true, dimension: 'commitment', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h7', type: 'likert-5', text: '遇到问题时，我首先想到如何解决而不是抱怨', reverseScored: false, dimension: 'control', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h8', type: 'likert-5', text: '我相信自己的能力能够改变不利局面', reverseScored: false, dimension: 'control', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h9', type: 'likert-5', text: '遇到困难时，我常常感到无能为力', reverseScored: true, dimension: 'control', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h10', type: 'likert-5', text: '即使在压力下，我也能保持专注和冷静', reverseScored: false, dimension: 'control', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h11', type: 'likert-5', text: '我能影响环境中发生的事情', reverseScored: false, dimension: 'control', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h12', type: 'likert-5', text: '我常常觉得自己无法应对生活的要求', reverseScored: true, dimension: 'control', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h13', type: 'likert-5', text: '我视变化为成长的机会而非威胁', reverseScored: false, dimension: 'challenge', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h14', type: 'likert-5', text: '我乐于尝试新事物，即使意味着可能失败', reverseScored: false, dimension: 'challenge', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h15', type: 'likert-5', text: '改变会让我感到不安和焦虑', reverseScored: true, dimension: 'challenge', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h16', type: 'likert-5', text: '我喜欢在生活中的意外惊喜', reverseScored: false, dimension: 'challenge', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h17', type: 'likert-5', text: '我视挫折为学习和成长的机会', reverseScored: false, dimension: 'challenge', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
    { id: 'h18', type: 'likert-5', text: '重复同样的事情会让我感到厌倦', reverseScored: false, dimension: 'challenge', options: [
      { id: '1', text: '❌ 几乎从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 几乎总是', value: 5 },
    ]},
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '🗿 人格坚韧性量表报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-stone-950 via-neutral-800 to-zinc-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-stone-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🏔️</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.hardinessLevel || '坚韧性评估'}</h2>
              <p className="text-stone-200/80 text-lg mb-4">Hardiness Scale</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-stone-400/30">
                <span className="text-white">坚韧指数</span>
                <span className="text-2xl font-black text-stone-300">\${result.totalScore || 75}</span>
                <span className="text-white/60">分</span>
              </div>
              
              <p className="text-stone-200 mt-6 text-sm">
                承诺 · 控制 · 挑战
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 坚韧人格三维度',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['commitment', 'control', 'challenge'],
        dimensionNames: {
          commitment: '承诺',
          control: '控制',
          challenge: '挑战'
        }
      }
    ]
  }
}
