import type { Question } from '../../types'

const opts = [
  { id: '1', text: '❌ 完全不符合', value: 1 },
  { id: '2', text: '⚪️ 不太符合', value: 2 },
  { id: '3', text: '🔵 一般符合', value: 3 },
  { id: '4', text: '🟢 比较符合', value: 4 },
  { id: '5', text: '✅ 完全符合', value: 5 },
]

export const pesNormalQuestions: Question[] = [
  { id: 'pes_n01', text: '我的工作对我来说非常有意义', type: 'scale', options: opts, meta: { dimension: 'meaning', weight: 1.0 } },
  { id: 'pes_n02', text: '我对自己的工作能力很有信心', type: 'scale', options: opts, meta: { dimension: 'competence', weight: 1.0 } },
  { id: 'pes_n03', text: '我能自主决定如何开展我的工作', type: 'scale', options: opts, meta: { dimension: 'autonomy', weight: 1.0 } },
  { id: 'pes_n04', text: '我能影响工作中重要的决策', type: 'scale', options: opts, meta: { dimension: 'impact', weight: 1.0 } },
  { id: 'pes_n05', text: '我做的工作对我个人很重要', type: 'scale', options: opts, meta: { dimension: 'meaning', weight: 1.0 } },
  { id: 'pes_n06', text: '我擅长完成工作中的各项任务', type: 'scale', options: opts, meta: { dimension: 'competence', weight: 1.0 } },
  { id: 'pes_n07', text: '我可以独立安排自己的工作节奏', type: 'scale', options: opts, meta: { dimension: 'autonomy', weight: 1.0 } },
  { id: 'pes_n08', text: '我的意见能影响团队的决策', type: 'scale', options: opts, meta: { dimension: 'impact', weight: 1.0 } },
  { id: 'pes_n09', text: '我的工作目标和我个人价值观一致', type: 'scale', options: opts, meta: { dimension: 'meaning', weight: 1.0 } },
  { id: 'pes_n10', text: '我很自信能做好我的工作', type: 'scale', options: opts, meta: { dimension: 'competence', weight: 1.0 } },
  { id: 'pes_n11', text: '我有很大的自由度来决定工作方法', type: 'scale', options: opts, meta: { dimension: 'autonomy', weight: 1.0 } },
  { id: 'pes_n12', text: '我能对工作结果产生重大影响', type: 'scale', options: opts, meta: { dimension: 'impact', weight: 1.0 } },
  { id: 'pes_n13', text: '我对自己从事的工作充满热情', type: 'scale', options: opts, meta: { dimension: 'meaning', weight: 1.0 } },
  { id: 'pes_n14', text: '我掌握了完成工作所需的各项技能', type: 'scale', options: opts, meta: { dimension: 'competence', weight: 1.0 } },
  { id: 'pes_n15', text: '我不需要事事都向领导请示', type: 'scale', options: opts, meta: { dimension: 'autonomy', weight: 1.0 } },
  { id: 'pes_n16', text: '我在团队中有相当的话语权', type: 'scale', options: opts, meta: { dimension: 'impact', weight: 1.0 } },
  { id: 'pes_n17', text: '我能在工作中实现自我价值', type: 'scale', options: opts, meta: { dimension: 'meaning', weight: 1.0 } },
  { id: 'pes_n18', text: '即使遇到困难我也能把工作做好', type: 'scale', options: opts, meta: { dimension: 'competence', weight: 1.0 } },
  { id: 'pes_n19', text: '我可以自己设定工作的优先级', type: 'scale', options: opts, meta: { dimension: 'autonomy', weight: 1.0 } },
  { id: 'pes_n20', text: '我的工作表现能影响战略方向', type: 'scale', options: opts, meta: { dimension: 'impact', weight: 1.0 } },
]
