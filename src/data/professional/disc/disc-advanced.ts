import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 几乎从不', value: 1 },
  { id: '2', text: '⚪️ 偶尔这样', value: 2 },
  { id: '3', text: '🔵 一半时间', value: 3 },
  { id: '4', text: '🟢 经常这样', value: 4 },
  { id: '5', text: '✅ 几乎总是', value: 5 },
]

export const discAdvancedQuestions: Question[] = [
  { id: 'disc_a01', text: '我喜欢亲自做决定', type: 'scale', options: opts, meta: { dimension: 'dominance', reverse: false } },
  { id: 'disc_a02', text: '我渴望立刻看到结果', type: 'scale', options: opts, meta: { dimension: 'dominance', reverse: false } },
  { id: 'disc_a03', text: '我善于激励团队士气', type: 'scale', options: opts, meta: { dimension: 'influence', reverse: false } },
  { id: 'disc_a04', text: '我说话充满感染力', type: 'scale', options: opts, meta: { dimension: 'influence', reverse: false } },
  { id: 'disc_a05', text: '我是忠诚可靠的团队成员', type: 'scale', options: opts, meta: { dimension: 'steadiness', reverse: false } },
  { id: 'disc_a06', text: '我善于调解人际矛盾', type: 'scale', options: opts, meta: { dimension: 'steadiness', reverse: false } },
  { id: 'disc_a07', text: '我注重质量和准确性', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
  { id: 'disc_a08', text: '我善于发现逻辑漏洞', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
  { id: 'disc_a09', text: '我意志坚定不轻易妥协', type: 'scale', options: opts, meta: { dimension: 'dominance', reverse: false } },
  { id: 'disc_a10', text: '我喜欢竞争胜过合作', type: 'scale', options: opts, meta: { dimension: 'dominance', reverse: false } },
  { id: 'disc_a11', text: '我喜欢成为关注焦点', type: 'scale', options: opts, meta: { dimension: 'influence', reverse: false } },
  { id: 'disc_a12', text: '我结交朋友毫不费力', type: 'scale', options: opts, meta: { dimension: 'influence', reverse: false } },
  { id: 'disc_a13', text: '我做事有条不紊不慌不忙', type: 'scale', options: opts, meta: { dimension: 'steadiness', reverse: false } },
  { id: 'disc_a14', text: '我对变化需要时间适应', type: 'scale', options: opts, meta: { dimension: 'steadiness', reverse: false } },
  { id: 'disc_a15', text: '我遵循系统和流程', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
  { id: 'disc_a16', text: '我对自己和别人高标准', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
  { id: 'disc_a17', text: '我敢于质疑权威', type: 'scale', options: opts, meta: { dimension: 'dominance', reverse: false } },
  { id: 'disc_a18', text: '我对效率低下没有耐心', type: 'scale', options: opts, meta: { dimension: 'dominance', reverse: false } },
  { id: 'disc_a19', text: '我乐观看待一切事物', type: 'scale', options: opts, meta: { dimension: 'influence', reverse: false } },
  { id: 'disc_a20', text: '我擅长即兴演讲', type: 'scale', options: opts, meta: { dimension: 'influence', reverse: false } },
  { id: 'disc_a21', text: '我一贯支持我的同事', type: 'scale', options: opts, meta: { dimension: 'steadiness', reverse: false } },
  { id: 'disc_a22', text: '我建立了长期稳定关系', type: 'scale', options: opts, meta: { dimension: 'steadiness', reverse: false } },
  { id: 'disc_a23', text: '我喜欢用数据说话', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
  { id: 'disc_a24', text: '我谨慎不轻易下结论', type: 'scale', options: opts, meta: { dimension: 'conscientiousness', reverse: false } },
]
