/**
 * 色彩潜意识投射 计算器
 * 从 data/assessments/color-subconscious.ts 提取的独立计算逻辑
 */

export function calculateColorSubconscious(answers: Record<string, number> | any[]) {
  const dimensionScores: Record<string, number[]> = {
    extraversion: [],
    emotional: [],
    idealism: [],
    rebellion: [],
    spirituality: [],
  }
  const dimensionMap: Record<string, string> = {
    'color-1': 'extraversion', 'color-4': 'extraversion', 'color-12': 'extraversion',
    'color-2': 'emotional', 'color-3': 'emotional', 'color-14': 'emotional', 'color-15': 'emotional',
    'color-5': 'idealism', 'color-8': 'idealism', 'color-13': 'idealism',
    'color-6': 'rebellion', 'color-10': 'rebellion',
    'color-7': 'spirituality', 'color-9': 'spirituality', 'color-11': 'spirituality', 'color-16': 'spirituality',
  }

  const NINE_SOUL_COLORS = [
    { type: 'red', name: '赤焰', emoji: '🔥', hex: '#DC2626', desc: '热烈奔放的生命力' },
    { type: 'orange', name: '琥珀', emoji: '🌅', hex: '#EA580C', desc: '温暖包容的能量场' },
    { type: 'gold', name: '金辉', emoji: '✨', hex: '#D97706', desc: '尊贵而内敛的光芒' },
    { type: 'emerald', name: '翡翠', emoji: '💎', hex: '#059669', desc: '深邃而治愈的力量' },
    { type: 'azure', name: '碧澜', emoji: '🌊', hex: '#2563EB', desc: '宽广而平静的智慧' },
    { type: 'violet', name: '紫霄', emoji: '🔮', hex: '#7C3AED', desc: '神秘而灵性的直觉' },
    { type: 'silver', name: '银辉', emoji: '🌙', hex: '#6B7280', desc: '冷静而敏锐的洞察' },
    { type: 'rose', name: '蔷薇', emoji: '🌹', hex: '#DB2777', desc: '浪漫而感性的灵魂' },
    { type: 'obsidian', name: '墨曜', emoji: '🖤', hex: '#1F2937', desc: '深沉而强大的内在' },
  ]

  const answerArray = Array.isArray(answers)
    ? answers
    : Object.entries(answers).map(([questionId, value]) => ({ questionId, value }))

  answerArray.forEach((answer: any) => {
    const qid = answer.questionId
    const dim = dimensionMap[qid] || 'spirituality'
    const v = typeof answer.value === 'number' ? answer.value : parseInt(String(answer.value || 3))
    dimensionScores[dim].push(v)
  })

  const scores: Record<string, number> = {}
  Object.keys(dimensionScores).forEach(key => {
    const arr = dimensionScores[key]
    const avg = arr.reduce((a: number, b: number) => a + b, 0) / Math.max(1, arr.length)
    scores[key] = Math.round(avg * 20)
  })

  const signature = scores.extraversion * 10000 + scores.emotional * 1000 +
    scores.idealism * 100 + scores.rebellion * 10 + scores.spirituality

  const matchedColor = NINE_SOUL_COLORS[signature % 9]

  return {
    type: matchedColor.type,
    name: matchedColor.name,
    emoji: matchedColor.emoji,
    hex: matchedColor.hex,
    desc: matchedColor.desc,
    dimensionScores: scores,
    dimensions: [
      { name: '外向能量', score: scores.extraversion, color: '#F97316' },
      { name: '情感浓度', score: scores.emotional, color: '#8B5CF6' },
      { name: '理想主义', score: scores.idealism, color: '#EC4899' },
      { name: '反叛精神', score: scores.rebellion, color: '#0EA5E9' },
      { name: '灵性深度', score: scores.spirituality, color: '#10B981' },
    ],
    overall: matchedColor.name,
    allColors: NINE_SOUL_COLORS,
  }
}
