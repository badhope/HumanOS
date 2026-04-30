import type { Assessment } from '../../types'
import { calculateMFT } from '../../utils/calculators/professional-calculators-factory'

export const mftStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'mft-standard',
  title: 'MFT 道德基础量表',
  description: 'Haidt 政治心理学 | 为什么左派右派永远说不到一起？5大道德基因解密',
  icon: '⚖️',
  category: '意识形态',
  subcategory: '哲学立场',
  difficulty: 'standard',
  duration: 8,
  quality: '学术级',
  resultCalculator: calculateMFT,
  questions: [
    { id: 'mft1', type: 'likert-5', text: '看到有人受到情感伤害我会感到不安', reverseScored: false, dimension: 'care', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft2', type: 'likert-5', text: '如果有人作弊就应该受到惩罚', reverseScored: false, dimension: 'fairness', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft3', type: 'likert-5', text: '背叛自己的国家是最严重的罪行之一', reverseScored: false, dimension: 'loyalty', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft4', type: 'likert-5', text: '尊重权威是每个人应该学习的', reverseScored: false, dimension: 'authority', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft5', type: 'likert-5', text: '有些行为就是错的，不管有没有人受害', reverseScored: false, dimension: 'sanctity', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft6', type: 'likert-5', text: '照顾弱者是很重要的', reverseScored: false, dimension: 'care', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft7', type: 'likert-5', text: '付出多少就该得到多少回报', reverseScored: false, dimension: 'fairness', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft8', type: 'likert-5', text: '背叛朋友是不可原谅的', reverseScored: false, dimension: 'loyalty', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft9', type: 'likert-5', text: '传统对我来说很重要', reverseScored: false, dimension: 'authority', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft10', type: 'likert-5', text: '我无法接受违背自然法则的行为', reverseScored: false, dimension: 'sanctity', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft11', type: 'likert-5', text: '我会同情正在受苦的人', reverseScored: false, dimension: 'care', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft12', type: 'likert-5', text: '公平对待所有人是我的核心原则', reverseScored: false, dimension: 'fairness', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft13', type: 'likert-5', text: '我为自己的集体感到骄傲', reverseScored: false, dimension: 'loyalty', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft14', type: 'likert-5', text: '人们应该遵守社会规则', reverseScored: false, dimension: 'authority', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft15', type: 'likert-5', text: '有些事情即使不伤害任何人也是不对的', reverseScored: false, dimension: 'sanctity', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft16', type: 'likert-5', text: '我很难对动物的痛苦视而不见', reverseScored: false, dimension: 'care', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft17', type: 'likert-5', text: '不劳而获的人应该受到谴责', reverseScored: false, dimension: 'fairness', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft18', type: 'likert-5', text: '即使有理由也不应该背叛集体', reverseScored: false, dimension: 'loyalty', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft19', type: 'likert-5', text: '我尊重长辈和传统', reverseScored: false, dimension: 'authority', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft20', type: 'likert-5', text: '有些东西是神圣的不容亵渎的', reverseScored: false, dimension: 'sanctity', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft21', type: 'likert-5', text: '保护弱势群体是我的责任', reverseScored: false, dimension: 'care', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft22', type: 'likert-5', text: '正义必须得到伸张', reverseScored: false, dimension: 'fairness', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft23', type: 'likert-5', text: '我的家人和朋友高于一切', reverseScored: false, dimension: 'loyalty', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft24', type: 'likert-5', text: '井然有序的社会才能繁荣', reverseScored: false, dimension: 'authority', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft25', type: 'likert-5', text: '人应该保持自己的尊严和纯洁', reverseScored: false, dimension: 'sanctity', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft26', type: 'likert-5', text: '我会主动安慰情绪低落的人', reverseScored: false, dimension: 'care', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft27', type: 'likert-5', text: '做错事就必须付出代价', reverseScored: false, dimension: 'fairness', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft28', type: 'likert-5', text: '我愿意为集体牺牲个人利益', reverseScored: false, dimension: 'loyalty', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft29', type: 'likert-5', text: '社会需要领导者和追随者', reverseScored: false, dimension: 'authority', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'mft30', type: 'likert-5', text: '有些行为本质上就是肮脏的', reverseScored: false, dimension: 'sanctity', options: [
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
        title: '⚖️ 道德基础理论量表报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-amber-950 via-yellow-800 to-lime-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">⚖️</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.moralFoundation || '道德基础画像'}</h2>
              <p className="text-amber-200/80 text-lg mb-4">Moral Foundations Theory</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-amber-400/30">
                <span className="text-white">核心道德</span>
                <span className="text-2xl font-black text-amber-300">\${result.dominant || '关爱/伤害'}</span>
              </div>
              
              <p className="text-amber-200 mt-6 text-sm">
                关爱 · 公平 · 忠诚 · 权威 · 圣洁
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 道德五基础模型',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['care', 'fairness', 'loyalty', 'authority', 'sanctity'],
        dimensionNames: {
          care: '关爱/伤害',
          fairness: '公平/欺骗',
          loyalty: '忠诚/背叛',
          authority: '权威/颠覆',
          sanctity: '圣洁/堕落'
        }
      }
    ]
  }
}
