import type { Assessment } from '../../types'
import { calculateMLQ } from '../../utils/calculators/professional-calculators-factory'

export const mlqStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'mlq-standard',
  title: 'MLQ 变革型领导力',
  description: '巴斯领导力经典 | 你能带领多大的团队？魅力×愿景×智慧×关怀 四维诊断',
  icon: '🦁',
  category: '职业发展',
  subcategory: '权力适应',
  difficulty: 'standard',
  duration: 5,
  quality: '专业',
  resultCalculator: calculateMLQ,
  questions: [
    { id: 'mlq1', type: 'likert-5', text: '我是大家可以信赖和依靠的人', reverseScored: false, dimension: 'idealized-influence', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq2', type: 'likert-5', text: '我擅长描绘令人激动的未来愿景', reverseScored: false, dimension: 'inspirational-motivation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq3', type: 'likert-5', text: '我鼓励大家挑战旧的思维方式', reverseScored: false, dimension: 'intellectual-stimulation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq4', type: 'likert-5', text: '我会关注每个人的个人成长需求', reverseScored: false, dimension: 'individualized-consideration', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq5', type: 'likert-5', text: '我会以身作则成为大家的榜样', reverseScored: false, dimension: 'idealized-influence', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq6', type: 'likert-5', text: '我对团队的未来充满乐观', reverseScored: false, dimension: 'inspirational-motivation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq7', type: 'likert-5', text: '我欣赏不同角度的观点和创意', reverseScored: false, dimension: 'intellectual-stimulation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq8', type: 'likert-5', text: '我花时间培养团队成员的能力', reverseScored: false, dimension: 'individualized-consideration', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq9', type: 'likert-5', text: '我会为了团队的整体利益牺牲个人', reverseScored: false, dimension: 'idealized-influence', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq10', type: 'likert-5', text: '我能让大家对目标感到兴奋', reverseScored: false, dimension: 'inspirational-motivation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq11', type: 'likert-5', text: '我支持大家大胆尝试不怕犯错', reverseScored: false, dimension: 'intellectual-stimulation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq12', type: 'likert-5', text: '我认真倾听每个人的想法和顾虑', reverseScored: false, dimension: 'individualized-consideration', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq13', type: 'likert-5', text: '我的行为符合我宣扬的价值观', reverseScored: false, dimension: 'idealized-influence', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq14', type: 'likert-5', text: '我传达清晰的方向感和使命感', reverseScored: false, dimension: 'inspirational-motivation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq15', type: 'likert-5', text: '我鼓励大家跳出框框思考', reverseScored: false, dimension: 'intellectual-stimulation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq16', type: 'likert-5', text: '我对待每一个人都有耐心', reverseScored: false, dimension: 'individualized-consideration', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq17', type: 'likert-5', text: '关键时刻我能挺身而出承担责任', reverseScored: false, dimension: 'idealized-influence', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq18', type: 'likert-5', text: '我对团队的成就表示认可和庆祝', reverseScored: false, dimension: 'inspirational-motivation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq19', type: 'likert-5', text: '我提出问题引导大家自己找到答案', reverseScored: false, dimension: 'intellectual-stimulation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'mlq20', type: 'likert-5', text: '我帮助大家发现自己的优势和潜能', reverseScored: false, dimension: 'individualized-consideration', options: [        
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
        title: '👑 MLQ使命感量表报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-yellow-950 via-amber-800 to-orange-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🌟</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.leadershipStyle || '领导力评估'}</h2>
              <p className="text-amber-200/80 text-lg mb-4">Multifactor Leadership Questionnaire</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-amber-400/30">
                <span className="text-white">变革型领导力指数</span>
                <span className="text-2xl font-black text-amber-300">\${result.transformational || 75}</span>
                <span className="text-white/60">分</span>
              </div>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 四维领导力模型',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['idealized-influence', 'inspirational-motivation', 'intellectual-stimulation', 'individualized-consideration'],
        dimensionNames: {
          'idealized-influence': '理想化影响力',
          'inspirational-motivation': '鼓舞性激励',
          'intellectual-stimulation': '智力激发',
          'individualized-consideration': '个性化关怀'
        }
      }
    ]
  }
}
