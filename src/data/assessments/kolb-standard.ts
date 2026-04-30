import type { Assessment } from '../../types'
import { calculateKolb } from '../../utils/calculators/kolb-calculator'

export const kolbStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'kolb-standard',
  title: 'Kolb 学习风格量表',
  description: '教育心理学经典 | 发现你最有效的学习方式：发散×同化×收敛×调适 四象限',
  icon: '🧠',
  category: '经典心理学',
  subcategory: '流体智力',
  difficulty: 'standard',
  duration: 4,
  quality: '经典',
  resultCalculator: calculateKolb,
  questions: [
    { id: 'kolb1', type: 'likert-5', text: '我倾向于从亲身经历中学习', reverseScored: false, dimension: 'concrete-experience', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb2', type: 'likert-5', text: '我喜欢观察和分析后再行动', reverseScored: false, dimension: 'reflective-observation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb3', type: 'likert-5', text: '我喜欢建立概念和理论模型', reverseScored: false, dimension: 'abstract-conceptualization', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb4', type: 'likert-5', text: '我喜欢动手实践和尝试新事物', reverseScored: false, dimension: 'active-experimentation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb5', type: 'likert-5', text: '我对人的感受和情绪很敏感', reverseScored: false, dimension: 'concrete-experience', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb6', type: 'likert-5', text: '我会多角度思考同一个问题', reverseScored: false, dimension: 'reflective-observation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb7', type: 'likert-5', text: '我擅长归纳总结形成体系', reverseScored: false, dimension: 'abstract-conceptualization', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb8', type: 'likert-5', text: '遇到问题我会马上尝试解决', reverseScored: false, dimension: 'active-experimentation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb9', type: 'likert-5', text: '我相信直觉和感受的判断', reverseScored: false, dimension: 'concrete-experience', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb10', type: 'likert-5', text: '做决定前我会充分考虑各种可能性', reverseScored: false, dimension: 'reflective-observation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb11', type: 'likert-5', text: '我追求逻辑的严谨性', reverseScored: false, dimension: 'abstract-conceptualization', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'kolb12', type: 'likert-5', text: '我从错误中学习进步最快', reverseScored: false, dimension: 'active-experimentation', options: [
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
        title: '📚 KOLB学习风格量表报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-800">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🎓</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.learningStyle || '学习风格诊断'}</h2>
              <p className="text-emerald-200/80 text-lg mb-4">Kolb Learning Style Inventory</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-emerald-400/30">
                <span className="text-white">学习模式</span>
                <span className="text-2xl font-black text-emerald-300">\${result.learningStyle || '发现型'}</span>
              </div>
              
              <p className="text-emerald-200 mt-6 text-sm">
                CE / RO / AC / AE 四维模型
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 四维学习模型',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['concrete-experience', 'reflective-observation', 'abstract-conceptualization', 'active-experimentation'],
        dimensionNames: {
          'concrete-experience': '具体经验',
          'reflective-observation': '反思观察',
          'abstract-conceptualization': '抽象概念化',
          'active-experimentation': '主动实验'
        }
      }
    ]
  }
}
