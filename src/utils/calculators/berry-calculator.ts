/**
 * ==============================================
 * 🏴‍☠️ 海贼王赏金测算 - 核心计算器
 * ==============================================
 * 【测评定位】OP世界实力与威胁评估
 * 【核心算法】5维度 × 10题/维度 = 50题
 * 
 * 【⚠️  超级重要警告】
 * 1. 按题目dimension累加计分！
 * 2. dimension拼写错了 = 赏金永远50贝里！
 */

import type { Answer, AssessmentResult } from '../../types'
import { buildAnswerMap } from './calculator-utils'

/**
 * 海贼王赏金结果接口
 * 【五大赏金维度】
 * - combatPower: 战斗力
 * - influence: 势力影响力
 * - threatLevel: 对世界政府威胁度
 * - notoriety: 知名度/恶劣程度
 * - potential: 成长潜力
 */
export interface BountyResult extends Record<string, any> {
  totalBounty: number
  formattedBounty: string
  bountyLevel: 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C' | 'D'
  bountyEmoji: string
  dimensionScores: {
    combatPower: number
    influence: number
    threatLevel: number
    notoriety: number
    potential: number
  }
  radarData: { dimension: string; score: number; fullMark: number }[]
  pirateTitle: string
  epithet: string
  crewRole: string
  devilFruitType: string
  wantedPosterDescription: string
  marineAssessment: string
  grandLineCompatibility: number
  yonkoProbability: number
  comparisonCharacters: string[]
  bountyBreakdown: {
    category: string
    contribution: number
    amount: number
  }[]
}

const bountyTiers = [
  { min: 5000000000, level: 'SSS', emoji: '👑', title: '四皇级', base: 5500000000 },
  { min: 3000000000, level: 'SS', emoji: '💀', title: '皇副级', base: 3500000000 },
  { min: 1000000000, level: 'S', emoji: '🔥', title: '将星级', base: 1500000000 },
  { min: 500000000, level: 'A', emoji: '⚔️', title: '七武海级', base: 700000000 },
  { min: 200000000, level: 'B', emoji: '🗡️', title: '超新星级', base: 320000000 },
  { min: 50000000, level: 'C', emoji: '🏴‍☠️', title: '新人级', base: 80000000 },
  { min: 0, level: 'D', emoji: '⚓', title: '打杂级', base: 10000000 },
]

const epithets = [
  { name: '白胡子二世', condition: (d: BountyResult['dimensionScores']) => d.combatPower > 90 },
  { name: '最恶世代', condition: (d: BountyResult['dimensionScores']) => d.potential > 85 && d.threatLevel > 80 },
  { name: '革命之火', condition: (d: BountyResult['dimensionScores']) => d.influence > 90 },
  { name: '不死之身', condition: (d: BountyResult['dimensionScores']) => d.combatPower > 80 && d.potential > 80 },
  { name: '霸王色资质', condition: (d: BountyResult['dimensionScores']) => d.influence > 80 && d.notoriety > 75 },
  { name: '历史的杂音', condition: (d: BountyResult['dimensionScores']) => d.threatLevel > 90 },
  { name: '未来岛的逃犯', condition: (d: BountyResult['dimensionScores']) => d.potential > 90 },
]

const crewRoles = [
  { role: '船长', condition: (d: BountyResult['dimensionScores']) => d.influence > 70 && d.combatPower > 60 },
  { role: '战斗员', condition: (d: BountyResult['dimensionScores']) => d.combatPower > 80 },
  { role: '谋略家', condition: (d: BountyResult['dimensionScores']) => d.threatLevel > 75 && d.influence > 60 },
  { role: '船医', condition: (d: BountyResult['dimensionScores']) => d.potential > 70 && d.combatPower < 60 },
  { role: '航海士', condition: (d: BountyResult['dimensionScores']) => d.potential > 65 && d.influence < 60 },
  { role: '考古学家', condition: (d: BountyResult['dimensionScores']) => d.threatLevel > 85 && d.notoriety < 60 },
  { role: '音乐家', condition: (d: BountyResult['dimensionScores']) => d.notoriety > 70 && d.combatPower < 70 },
]

const devilFruitTypes = [
  { type: '幻兽种·神话级', condition: (d: BountyResult['dimensionScores']) => d.potential > 90 && d.combatPower > 85 },
  { type: '自然系·觉醒', condition: (d: BountyResult['dimensionScores']) => d.combatPower > 80 },
  { type: '超人系·觉醒', condition: (d: BountyResult['dimensionScores']) => d.threatLevel > 80 },
  { type: '动物系·古代种', condition: (d: BountyResult['dimensionScores']) => d.combatPower > 70 && d.potential > 70 },
  { type: '未吃果实', condition: (d: BountyResult['dimensionScores']) => d.combatPower > 65 && d.potential < 60 },
  { type: '普通果实', condition: () => true },
]

const marineAssessments = [
  { assessment: '⚠️ 必须抹杀的存在：此人知晓空白100年真相', condition: (d: BountyResult['dimensionScores']) => d.threatLevel > 95 },
  { assessment: '🔴 极其危险：拥有颠覆世界政府的潜力', condition: (d: BountyResult['dimensionScores']) => d.threatLevel > 85 },
  { assessment: '🟠 高度警戒：可能成为下一任四皇', condition: (d: BountyResult['dimensionScores']) => d.potential > 85 && d.influence > 75 },
  { assessment: '🟡 需要监视：成长速度超出预期', condition: (d: BountyResult['dimensionScores']) => d.potential > 70 },
  { assessment: '🟢 普通悬赏：常规海贼威胁', condition: () => true },
]

export function calculateBounty(answers: Answer[]): BountyResult & AssessmentResult {
  const answerMap = buildAnswerMap(answers)

  const combatItems = ['berry-1', 'berry-6', 'berry-11', 'berry-16', 'berry-21', 'berry-26', 'berry-31', 'berry-36', 'berry-41', 'berry-42']
  const influenceItems = ['berry-2', 'berry-7', 'berry-12', 'berry-17', 'berry-22', 'berry-27', 'berry-32', 'berry-37', 'berry-43', 'berry-44']
  const threatItems = ['berry-3', 'berry-8', 'berry-13', 'berry-18', 'berry-23', 'berry-28', 'berry-33', 'berry-38', 'berry-45', 'berry-46']
  const notorietyItems = ['berry-4', 'berry-9', 'berry-14', 'berry-19', 'berry-24', 'berry-29', 'berry-34', 'berry-39', 'berry-47', 'berry-48']
  const potentialItems = ['berry-5', 'berry-10', 'berry-15', 'berry-20', 'berry-25', 'berry-30', 'berry-35', 'berry-40', 'berry-49', 'berry-50']

  const calcDim = (items: string[]) => {
    const sum = items.reduce((s, id) => s + (answerMap[id] || 3), 0)
    return Math.round((sum / (items.length * 5)) * 100)
  }

  const dimensionScores = {
    combatPower: calcDim(combatItems),
    influence: calcDim(influenceItems),
    threatLevel: calcDim(threatItems),
    notoriety: calcDim(notorietyItems),
    potential: calcDim(potentialItems),
  }

  const radarData = [
    { dimension: '战力', score: dimensionScores.combatPower, fullMark: 100 },
    { dimension: '势力', score: dimensionScores.influence, fullMark: 100 },
    { dimension: '威胁', score: dimensionScores.threatLevel, fullMark: 100 },
    { dimension: '名声', score: dimensionScores.notoriety, fullMark: 100 },
    { dimension: '潜力', score: dimensionScores.potential, fullMark: 100 },
  ]

  const dimensionWeights = {
    combatPower: 0.30,
    influence: 0.20,
    threatLevel: 0.25,
    notoriety: 0.10,
    potential: 0.15,
  }

  const weightedScore = Object.entries(dimensionScores).reduce((sum, [key, value]) => {
    return sum + value * (dimensionWeights[key as keyof typeof dimensionWeights] || 0.2)
  }, 0)

  const baseBounty = 3000000
  const multiplier = Math.pow(weightedScore / 50, 2.5)
  let totalBounty = Math.round(baseBounty * multiplier)
  totalBounty = Math.max(5000000, Math.min(5600000000, totalBounty))

  const tier = bountyTiers.find(t => totalBounty >= t.min) || bountyTiers[bountyTiers.length - 1]

  const formatBounty = (amount: number) => {
    if (amount >= 100000000) return `${(amount / 100000000).toFixed(1)}亿贝利`
    if (amount >= 10000) return `${(amount / 10000).toFixed(0)}万贝利`
    return `${amount}贝利`
  }

  const epithet = epithets.find(e => e.condition(dimensionScores))?.name || '神秘新人'
  const crewRole = crewRoles.find(r => r.condition(dimensionScores))?.role || '实习生'
  const devilFruitType = devilFruitTypes.find(f => f.condition(dimensionScores))?.type || '未定'
  const marineAssessment = marineAssessments.find(a => a.condition(dimensionScores))?.assessment || ''

  const grandLineCompatibility = Math.round((dimensionScores.combatPower * 0.4 + dimensionScores.potential * 0.4 + dimensionScores.influence * 0.2))
  const yonkoProbability = Math.round((dimensionScores.influence * 0.3 + dimensionScores.threatLevel * 0.3 + dimensionScores.potential * 0.4))

  const comparisonCharacters = [
    dimensionScores.combatPower > 90 ? '香克斯' : dimensionScores.combatPower > 70 ? '马尔科' : '克洛克达尔',
    dimensionScores.threatLevel > 85 ? '罗宾' : dimensionScores.threatLevel > 60 ? '龙' : '普通海贼',
    dimensionScores.potential > 90 ? '路飞' : dimensionScores.potential > 70 ? '黑胡子' : '巴基',
  ]

  const bountyBreakdown = [
    { category: '战力评估', contribution: dimensionScores.combatPower, amount: Math.round(totalBounty * 0.30) },
    { category: '势力范围', contribution: dimensionScores.influence, amount: Math.round(totalBounty * 0.20) },
    { category: '政府威胁度', contribution: dimensionScores.threatLevel, amount: Math.round(totalBounty * 0.25) },
    { category: '世界知名度', contribution: dimensionScores.notoriety, amount: Math.round(totalBounty * 0.10) },
    { category: '未来潜力', contribution: dimensionScores.potential, amount: Math.round(totalBounty * 0.15) },
  ]

  return {
    totalBounty,
    formattedBounty: formatBounty(totalBounty),
    bountyLevel: tier.level as BountyResult['bountyLevel'],
    bountyEmoji: tier.emoji,
    dimensionScores,
    radarData,
    pirateTitle: tier.title,
    epithet: `"${epithet}"`,
    crewRole,
    devilFruitType,
    wantedPosterDescription: `DEAD OR ALIVE · ${formatBounty(totalBounty)}`,
    marineAssessment,
    grandLineCompatibility,
    yonkoProbability,
    comparisonCharacters,
    bountyBreakdown,
  }
}
