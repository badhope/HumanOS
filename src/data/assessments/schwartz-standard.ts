import type { Assessment } from '../../types'
import { calculateSchwartz } from '../../utils/calculators/professional-calculators-factory'

export const schwartzStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'schwartz-standard',
  title: 'SVS 施瓦茨价值观量表',
  description: '跨文化验证的人类价值观模型 | 10大核心价值观+4高阶维度全景画像',
  icon: '🌍',
  category: '意识形态',
  subcategory: '哲学立场',
  difficulty: 'standard',
  duration: 8,
  quality: '学术级',
  resultCalculator: calculateSchwartz,
  questions: [
    { id: 'sw1', type: 'likert-5', text: '思考和创造新想法对我很重要', reverseScored: false, dimension: 'self-direction', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw2', type: 'likert-5', text: '我渴望生活中充满刺激和兴奋', reverseScored: false, dimension: 'stimulation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw3', type: 'likert-5', text: '获得成功和他人认可是我的核心动力', reverseScored: false, dimension: 'achievement', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw4', type: 'likert-5', text: '积累财富和物质资源对我很重要', reverseScored: false, dimension: 'power', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw5', type: 'likert-5', text: '遵守社会规则对我很重要', reverseScored: false, dimension: 'conformity', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw6', type: 'likert-5', text: '我重视传统和文化习俗', reverseScored: false, dimension: 'tradition', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw7', type: 'likert-5', text: '我愿意为了别人的福祉做出牺牲', reverseScored: false, dimension: 'benevolence', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw8', type: 'likert-5', text: '我相信所有人都应该被公正对待', reverseScored: false, dimension: 'universalism', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw9', type: 'likert-5', text: '安全稳定的环境对我最重要', reverseScored: false, dimension: 'security', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw10', type: 'likert-5', text: '我喜欢按照自己的方式做事', reverseScored: false, dimension: 'self-direction', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw11', type: 'likert-5', text: '我喜欢尝试新事物和冒险', reverseScored: false, dimension: 'stimulation', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw12', type: 'likert-5', text: '在竞争中获胜对我很重要', reverseScored: false, dimension: 'achievement', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw13', type: 'likert-5', text: '我希望能够影响和领导他人', reverseScored: false, dimension: 'power', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw14', type: 'likert-5', text: '我尽量避免让别人不高兴', reverseScored: false, dimension: 'conformity', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw15', type: 'likert-5', text: '我重视家族和宗教的传承', reverseScored: false, dimension: 'tradition', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw16', type: 'likert-5', text: '我总是尽力帮助身边的人', reverseScored: false, dimension: 'benevolence', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw17', type: 'likert-5', text: '保护环境对我非常重要', reverseScored: false, dimension: 'universalism', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw18', type: 'likert-5', text: '我希望未来没有任何风险', reverseScored: false, dimension: 'security', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw19', type: 'likert-5', text: '追求知识和智慧对我很重要', reverseScored: false, dimension: 'self-direction', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'sw20', type: 'likert-5', text: '生活有乐趣对我非常重要', reverseScored: false, dimension: 'hedonism', options: [
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
        title: '🌈 Schwartz基本价值观量表报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-rose-950 via-pink-800 to-red-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🎭</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.dominantValue || '价值观画像'}</h2>
              <p className="text-rose-200/80 text-lg mb-4">Schwartz Values Theory</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-rose-400/30">
                <span className="text-white">核心价值观</span>
                <span className="text-2xl font-black text-rose-300">\${result.dominantValue || '成就型'}</span>
              </div>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 十大基本价值观',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['power', 'achievement', 'hedonism', 'stimulation', 'selfDirection', 'universalism', 'benevolence', 'tradition', 'conformity', 'security'],
        dimensionNames: {
          power: '权力',
          achievement: '成就',
          hedonism: '享乐',
          stimulation: '刺激',
          selfDirection: '自主',
          universalism: '普世',
          benevolence: '慈善',
          tradition: '传统',
          conformity: '遵从',
          security: '安全'
        }
      }
    ]
  }
}
