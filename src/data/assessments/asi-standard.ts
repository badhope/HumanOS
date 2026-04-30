import type { Assessment } from '../../types'
import { calculateASI } from '../../utils/calculators/asi-calculator'

export const asiStandardAssessment: Omit<Assessment, 'id'> & { id: string } = {
  id: 'asi-standard',
  title: 'ASI 归因风格量表',
  description: '塞利格曼习得性无助 | 你的逆商有多高？逆境时你如何解释决定了你的人生',
  icon: '🌊',
  category: '心理健康',
  subcategory: '积极心理学',
  difficulty: 'standard',
  duration: 6,
  quality: '学术级',
  resultCalculator: calculateASI,
  questions: [
    { id: 'asi1', type: 'likert-5', text: '遇到挫折时我倾向于认为这种情况会一直持续', reverseScored: true, dimension: 'stability', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi2', type: 'likert-5', text: '一件事不顺会影响到我生活的其他方面', reverseScored: true, dimension: 'globality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi3', type: 'likert-5', text: '遇到挫折通常是我自己的原因', reverseScored: false, dimension: 'internality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi4', type: 'likert-5', text: '我相信自己有能力改变困境', reverseScored: false, dimension: 'control', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi5', type: 'likert-5', text: '我很难从失败的阴影中走出来', reverseScored: true, dimension: 'stability', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi6', type: 'likert-5', text: '一个领域的失败会让我怀疑整个自己', reverseScored: true, dimension: 'globality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi7', type: 'likert-5', text: '成功更多是靠运气和环境', reverseScored: false, dimension: 'internality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi8', type: 'likert-5', text: '再大的困难我也能想办法克服', reverseScored: false, dimension: 'control', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi9', type: 'likert-5', text: '心情不好的时候持续很久都好不了', reverseScored: true, dimension: 'stability', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi10', type: 'likert-5', text: '家里的矛盾会影响我工作的心情', reverseScored: true, dimension: 'globality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi11', type: 'likert-5', text: '别人成功主要是因为他们运气好', reverseScored: false, dimension: 'internality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi12', type: 'likert-5', text: '我总是能找到解决问题的方法', reverseScored: false, dimension: 'control', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi13', type: 'likert-5', text: '一次失败就意味着永远失败', reverseScored: true, dimension: 'stability', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi14', type: 'likert-5', text: '一件事做不好就觉得自己什么都不行', reverseScored: true, dimension: 'globality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi15', type: 'likert-5', text: '我取得的成就很大程度上靠运气', reverseScored: false, dimension: 'internality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi16', type: 'likert-5', text: '面对困难我能主动出击而不是被动等待', reverseScored: false, dimension: 'control', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi17', type: 'likert-5', text: '痛苦的回忆总是挥之不去', reverseScored: true, dimension: 'stability', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi18', type: 'likert-5', text: '和伴侣吵架会让我一整天都情绪不好', reverseScored: true, dimension: 'globality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi19', type: 'likert-5', text: '没能完成目标主要是外界因素造成的', reverseScored: false, dimension: 'internality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi20', type: 'likert-5', text: '即使在压力下我也能保持冷静', reverseScored: false, dimension: 'control', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi21', type: 'likert-5', text: '我是一个容易陷入抑郁情绪的人', reverseScored: true, dimension: 'stability', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi22', type: 'likert-5', text: '工作不顺利时我回家也容易发脾气', reverseScored: true, dimension: 'globality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi23', type: 'likert-5', text: '很多时候我感觉自己无法控制人生的方向', reverseScored: false, dimension: 'internality', options: [
      { id: '1', text: '❌ 完全不同意', value: 1 },
      { id: '2', text: '⚪️ 不太同意', value: 2 },
      { id: '3', text: '🔵 中立', value: 3 },
      { id: '4', text: '🟢 比较同意', value: 4 },
      { id: '5', text: '✅ 完全同意', value: 5 },
    ]},
    { id: 'asi24', type: 'likert-5', text: '我相信人可以改变自己的命运', reverseScored: false, dimension: 'control', options: [
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
        title: '💫 ASI焦虑敏感指数量表报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-cyan-950 via-sky-800 to-blue-700">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🌊</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.anxietyLevel || '焦虑敏感度评估'}</h2>
              <p className="text-cyan-200/80 text-lg mb-4">Anxiety Sensitivity Index</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-cyan-400/30">
                <span className="text-white">ASI 指数</span>
                <span className="text-2xl font-black text-cyan-300">\${result.totalScore || 30}</span>
                <span className="text-white/60">分</span>
              </div>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 归因风格三维度',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['internality', 'stability', 'globality', 'control'],
        dimensionNames: {
          internality: '内在性',
          stability: '稳定性',
          globality: '普遍性',
          control: '可控性'
        }
      }
    ]
  }
}
