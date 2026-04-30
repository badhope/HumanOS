import type { Assessment } from '../../types'
import { calculateTKI } from '../../utils/calculators/professional-calculators-factory'

export const tkiStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'tki-standard',
  title: 'TKI 冲突模式量表',
  description: '冲突管理金标准 | 托马斯-基尔曼：竞争×协作×妥协×回避×迁就 五维诊断',
  icon: '⚔️',
  category: '职业发展',
  subcategory: '职场行为',
  difficulty: 'standard',
  duration: 6,
  quality: '经典',
  resultCalculator: calculateTKI,
  questions: [
    { id: 'tki1', type: 'likert-5', text: '我会据理力争证明自己的观点是对的', reverseScored: false, dimension: 'competing', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki2', type: 'likert-5', text: '我更愿意满足对方的需求', reverseScored: false, dimension: 'accommodating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki3', type: 'likert-5', text: '我会寻求双方都能接受的折中方案', reverseScored: false, dimension: 'compromising', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki4', type: 'likert-5', text: '我喜欢直接面对并解决冲突', reverseScored: false, dimension: 'collaborating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki5', type: 'likert-5', text: '我宁愿回避也不想产生矛盾', reverseScored: false, dimension: 'avoiding', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki6', type: 'likert-5', text: '我坚持自己的立场不妥协', reverseScored: false, dimension: 'competing', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki7', type: 'likert-5', text: '我重视维持和谐的人际关系', reverseScored: false, dimension: 'accommodating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki8', type: 'likert-5', text: '我建议双方都做出一些让步', reverseScored: false, dimension: 'compromising', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki9', type: 'likert-5', text: '我会和对方一起分析问题找到双赢方案', reverseScored: false, dimension: 'collaborating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki10', type: 'likert-5', text: '我尽量避开有争议的话题', reverseScored: false, dimension: 'avoiding', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki11', type: 'likert-5', text: '我喜欢用数据和事实说服对方', reverseScored: false, dimension: 'competing', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki12', type: 'likert-5', text: '我常常同意别人的建议', reverseScored: false, dimension: 'accommodating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki13', type: 'likert-5', text: '谈判时我追求公平的结果', reverseScored: false, dimension: 'compromising', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki14', type: 'likert-5', text: '我相信坦诚沟通能解决大部分问题', reverseScored: false, dimension: 'collaborating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki15', type: 'likert-5', text: '我宁愿保持沉默也不愿引发争论', reverseScored: false, dimension: 'avoiding', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki16', type: 'likert-5', text: '遇到分歧时我会主动争取', reverseScored: false, dimension: 'competing', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki17', type: 'likert-5', text: '别人的感受对我很重要', reverseScored: false, dimension: 'accommodating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki18', type: 'likert-5', text: '我相信退一步海阔天空', reverseScored: false, dimension: 'compromising', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki19', type: 'likert-5', text: '我会分享我的想法也倾听对方的想法', reverseScored: false, dimension: 'collaborating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki20', type: 'likert-5', text: '我等事情冷静下来再处理', reverseScored: false, dimension: 'avoiding', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki21', type: 'likert-5', text: '我不介意使用权力获得优势', reverseScored: false, dimension: 'competing', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki22', type: 'likert-5', text: '我愿意牺牲自己成全别人', reverseScored: false, dimension: 'accommodating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki23', type: 'likert-5', text: '我相信适当让步是必要的', reverseScored: false, dimension: 'compromising', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki24', type: 'likert-5', text: '我把冲突看作成长的机会', reverseScored: false, dimension: 'collaborating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki25', type: 'likert-5', text: '我避免发表可能引起争议的观点', reverseScored: false, dimension: 'avoiding', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki26', type: 'likert-5', text: '我为了胜利可以全力以赴', reverseScored: false, dimension: 'competing', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki27', type: 'likert-5', text: '我不喜欢让别人感到不舒服', reverseScored: false, dimension: 'accommodating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki28', type: 'likert-5', text: '谈判就是互相让步的艺术', reverseScored: false, dimension: 'compromising', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki29', type: 'likert-5', text: '我相信坦诚比输赢更重要', reverseScored: false, dimension: 'collaborating', options: [
      { id: '1', text: '❌ 完全不符合', value: 1 },
      { id: '2', text: '⚪️ 不太符合', value: 2 },
      { id: '3', text: '🔵 一般符合', value: 3 },
      { id: '4', text: '🟢 比较符合', value: 4 },
      { id: '5', text: '✅ 完全符合', value: 5 },
    ]},
    { id: 'tki30', type: 'likert-5', text: '时间会解决大部分冲突', reverseScored: false, dimension: 'avoiding', options: [
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
        title: '⚔️ TKI冲突处理风格报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-stone-950 via-slate-800 to-zinc-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">⚖️</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.dominantStyle || '冲突风格诊断'}</h2>
              <p className="text-amber-200/80 text-lg mb-4">Thomas-Kilmann Conflict Mode Instrument</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-amber-400/30">
                <span className="text-white">主导风格</span>
                <span className="text-2xl font-black text-amber-300">\${result.dominantStyle || '协作型'}</span>
              </div>
              
              <p className="text-amber-200 mt-6 text-sm">
                竞争 · 协作 · 妥协 · 回避 · 迁就
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 冲突模式五因子',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['competing', 'collaborating', 'compromising', 'avoiding', 'accommodating'],
        dimensionNames: {
          competing: '竞争型',
          collaborating: '协作型',
          compromising: '妥协型',
          avoiding: '回避型',
          accommodating: '迁就型'
        }
      }
    ]
  }
}
