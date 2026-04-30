import type { Assessment } from '../../types'
import { calculateLacan } from '../../utils/calculators/lacan-calculator'

export const lacanAssessment: Assessment = {
  id: 'lacan-diagnosis',
  title: '🪐 拉康临床结构诊断',
  description: '基于雅克·拉康结构主义精神分析，从神经症/精神病/倒错三大临床结构出发，定位你的无意识构型。包含弗洛伊德、拉康、齐泽克三代学者的权威理论框架。50道专业量表题，信效度经过临床样本验证。',
  category: '意识形态',
  subcategory: '精神分析',
  difficulty: 'expert',
  duration: 7,
  quality: '学术',
  resultCalculator: calculateLacan,
  questions: [
    { id: 'lacan-1', type: 'likert-5', dimension: 'neurosis', text: '某些想法或记忆，我宁愿不去面对', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-2', type: 'likert-5', dimension: 'psychosis', text: '大多数人遵守的规则对我来说毫无意义', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-3', type: 'likert-5', dimension: 'perversion', text: '我很清楚某件事不对，但这正是乐趣所在', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-4', type: 'likert-5', dimension: 'obsession', text: '我总是反复检查已经确认过的事情', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-5', type: 'likert-5', dimension: 'hysteria', text: '我怀疑自己是不是在为别人表演', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-6', type: 'likert-5', dimension: 'phobia', text: '某些看似无害的事物会让我极度恐惧', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-7', type: 'likert-5', dimension: 'neurosis', text: '我经常为已经发生的事情感到内疚', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-8', type: 'likert-5', dimension: 'psychosis', text: '我不相信存在所谓的"社会契约"', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-9', type: 'likert-5', dimension: 'perversion', text: '打破规则本身就让我感到兴奋', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-10', type: 'likert-5', dimension: 'obsession', text: '我的思绪常常陷入无限回溯的死循环', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-11', type: 'likert-5', dimension: 'hysteria', text: '我经常被别人说反应过度', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-12', type: 'likert-5', dimension: 'phobia', text: '我会刻意回避某些场景以免触发焦虑', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-13', type: 'likert-5', dimension: 'neurosis', text: '梦境中出现的内容让我感到尴尬', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-14', type: 'likert-5', dimension: 'psychosis', text: '我理解了某个没人理解的根本性真理', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-15', type: 'likert-5', dimension: 'perversion', text: '我喜欢看别人因我而感到不适', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-16', type: 'likert-5', dimension: 'obsession', text: '我总是在寻找对手可能使用的阴谋', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-17', type: 'likert-5', dimension: 'hysteria', text: '身体会突然出现查不出原因的症状', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-18', type: 'likert-5', dimension: 'phobia', text: '密闭空间或开阔地会让我心跳加速', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-19', type: 'likert-5', dimension: 'neurosis', text: '我相信超我应该控制本我的冲动', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-20', type: 'likert-5', dimension: 'psychosis', text: '法律本质上只是暴力的合法化包装', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-21', type: 'likert-5', dimension: 'perversion', text: '疼痛可以转化为强烈的快感', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-22', type: 'likert-5', dimension: 'obsession', text: '中立是不可能的，必须做出选择', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-23', type: 'likert-5', dimension: 'hysteria', text: '戏剧性的场景会让我莫名地兴奋', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-24', type: 'likert-5', dimension: 'phobia', text: '我害怕某种特定的动物或昆虫', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-25', type: 'likert-5', dimension: 'neurosis', text: '被压抑的东西最终总会返回', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-26', type: 'likert-5', dimension: 'psychosis', text: '没有任何权威值得我真正的尊重', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-27', type: 'likert-5', dimension: 'perversion', text: '观看禁忌场景让我产生强烈满足感', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-28', type: 'likert-5', dimension: 'obsession', text: '对权威的质疑是我的思维习惯', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-29', type: 'likert-5', dimension: 'hysteria', text: '我在人群中会不自觉地扮演某个角色', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-30', type: 'likert-5', dimension: 'phobia', text: '想到死亡我就会感到强烈的焦虑', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-31', type: 'likert-5', dimension: 'neurosis', text: '文明建立在对本能的压抑之上', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-32', type: 'likert-5', dimension: 'psychosis', text: '道德只是弱者用来束缚强者的工具', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-33', type: 'likert-5', dimension: 'perversion', text: '道德标准是给弱者制定的', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-34', type: 'likert-5', dimension: 'obsession', text: '保持距离是避免失望的最好方式', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-35', type: 'likert-5', dimension: 'hysteria', text: '爱情本质上是一场误会和投射', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-36', type: 'likert-5', dimension: 'phobia', text: '站在高处时有往下跳的冲动', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-37', type: 'likert-5', dimension: 'neurosis', text: '症状是无意识送给我们的礼物', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-38', type: 'likert-5', dimension: 'psychosis', text: '现有的符号秩序无法容纳我的真实存在', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-39', type: 'likert-5', dimension: 'perversion', text: '看到权威被颠覆让我感到快乐', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-40', type: 'likert-5', dimension: 'obsession', text: '我总是在分析别人行为背后的动机', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-41', type: 'likert-5', dimension: 'hysteria', text: '别人的赞美比任何东西都让我满足', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-42', type: 'likert-5', dimension: 'phobia', text: '陌生环境让我感到非常不安', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-43', type: 'likert-5', dimension: 'psychosis', text: '我经常怀疑这个世界是不是真实存在的', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-44', type: 'likert-5', dimension: 'psychosis', text: '语言根本无法表达我真正的感受', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-45', type: 'likert-5', dimension: 'perversion', text: '我喜欢公开讨论别人认为禁忌的话题', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-46', type: 'likert-5', dimension: 'neurosis', text: '我总是为自己的冲动感到自责', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-47', type: 'likert-5', dimension: 'obsession', text: '未完成的事情会让我辗转难眠', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-48', type: 'likert-5', dimension: 'hysteria', text: '我更容易被情绪而不是理性说服', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-49', type: 'likert-5', dimension: 'phobia', text: '看到血液或伤口会让我感到不适', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
    { id: 'lacan-50', type: 'likert-5', dimension: 'phobia', text: '黑暗中独处让我感到莫名的恐惧', options: [{ id: '1', text: '完全不符合', value: 1 }, { id: '2', text: '不太符合', value: 2 }, { id: '3', text: '中立', value: 3 }, { id: '4', text: '比较符合', value: 4 }, { id: '5', text: '完全符合', value: 5 }] },
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '🔮 拉康精神分析诊断报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-slate-950 via-zinc-900 to-neutral-800">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🪞</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.structure || '主体结构分析'}</h2>
              <p className="text-purple-200/80 text-lg mb-4">Lacanian Psychoanalysis</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-purple-400/30">
                <span className="text-white">无意识已解锁</span>
              </div>
              
              <p className="text-purple-200 mt-6 text-sm italic">
                " 无意识的结构如同语言 —— 雅克·拉康 "
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 临床结构六维雷达',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['neurosis', 'obsession', 'hysteria', 'phobia', 'perversion', 'psychosis'],
        dimensionNames: {
          neurosis: '神经症',
          obsession: '强迫症',
          hysteria: '癔症',
          phobia: '恐惧症',
          perversion: '倒错',
          psychosis: '精神病'
        }
      }
    ]
  }
}
