import type { Assessment } from '../../types'
import { calculateELS } from '../../utils/calculators/professional-calculators-factory'

export const elsStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'els-standard',
  title: 'ELS 情绪劳动量表',
  description: 'Hochschild 社会学经典 | 打工人职业微笑诊断：表层扮演×深层扮演×情绪耗竭',
  icon: '😓',
  category: '职业发展',
  subcategory: '职业耗竭',
  difficulty: 'standard',
  duration: 5,
  quality: '学术级',
  resultCalculator: calculateELS,
  questions: [
    { id: 'els1', type: 'likert-5', text: '工作时我会假装心情很好', reverseScored: false, dimension: 'surface-acting', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els2', type: 'likert-5', text: '我会努力让自己真的感受到该有的情绪', reverseScored: false, dimension: 'deep-acting', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els3', type: 'likert-5', text: '我表达的情绪都是我真实感受到的', reverseScored: true, dimension: 'genuine', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els4', type: 'likert-5', text: '下班回家我感觉情绪已经被掏空了', reverseScored: false, dimension: 'emotional-exhaustion', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els5', type: 'likert-5', text: '面对客户我只是在"表演"友好', reverseScored: false, dimension: 'surface-acting', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els6', type: 'likert-5', text: '我会试图从内心去理解客户的感受', reverseScored: false, dimension: 'deep-acting', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els7', type: 'likert-5', text: '我不需要假装情绪，我本来就是那样', reverseScored: true, dimension: 'genuine', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els8', type: 'likert-5', text: '一想到明天上班就感到情绪疲惫', reverseScored: false, dimension: 'emotional-exhaustion', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els9', type: 'likert-5', text: '心情不好也必须在工作中保持专业笑容', reverseScored: false, dimension: 'surface-acting', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els10', type: 'likert-5', text: '我会努力调整自己的心态来适应工作要求', reverseScored: false, dimension: 'deep-acting', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els11', type: 'likert-5', text: '我的情绪表达与真实感受是一致的', reverseScored: true, dimension: 'genuine', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els12', type: 'likert-5', text: '和人打交道太多后我感到麻木', reverseScored: false, dimension: 'emotional-exhaustion', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els13', type: 'likert-5', text: '我只是"看起来"有耐心而已', reverseScored: false, dimension: 'surface-acting', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els14', type: 'likert-5', text: '我会尝试站在对方的角度产生共情', reverseScored: false, dimension: 'deep-acting', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els15', type: 'likert-5', text: '我在工作中能够真实地表达自己', reverseScored: true, dimension: 'genuine', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els16', type: 'likert-5', text: '工作中的情绪劳动让我身心俱疲', reverseScored: false, dimension: 'emotional-exhaustion', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els17', type: 'likert-5', text: '我擅长隐藏自己的真实情绪', reverseScored: false, dimension: 'surface-acting', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
    { id: 'els18', type: 'likert-5', text: '我会自我暗示来调动需要的情绪', reverseScored: false, dimension: 'deep-acting', options: [
      { id: '1', text: '❌ 从不', value: 1 },
      { id: '2', text: '⚪️ 偶尔', value: 2 },
      { id: '3', text: '🔵 一半时间', value: 3 },
      { id: '4', text: '🟢 经常', value: 4 },
      { id: '5', text: '✅ 总是', value: 5 },
    ]},
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '🎭 情绪劳动量表报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-slate-950 via-gray-800 to-zinc-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-slate-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gray-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🎭</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.emotionalLabor || '情绪劳动评估'}</h2>
              <p className="text-slate-200/80 text-lg mb-4">Emotional Labor Scale</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-slate-400/30">
                <span className="text-white">劳动强度</span>
                <span className="text-2xl font-black text-slate-300">\${result.totalScore || 50}</span>
                <span className="text-white/60">分</span>
              </div>
              
              <p className="text-slate-200 mt-6 text-sm">
                表层扮演 · 深层扮演 · 真实表达
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 三维情绪劳动策略',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['surface-acting', 'deep-acting', 'genuine-expression'],
        dimensionNames: {
          'surface-acting': '表层扮演',
          'deep-acting': '深层扮演',
          'genuine-expression': '真实表达'
        }
      }
    ]
  }
}
