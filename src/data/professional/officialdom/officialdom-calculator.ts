import type { Answer, AssessmentResult } from '../../../types'

export interface OfficialdomDimensionResult {
  dimension: string
  dimensionName: string
  score: number
  percentile: number
  band: 'extremely-high' | 'high' | 'average' | 'low' | 'extremely-low'
  bandDescription: string
  facetScores: Record<string, number>
  clarity: number
  zScore: number
}

export interface OfficialdomScores {
  dominance: number
  riskAversion: number
  emotionalSuppression: number
  ambiguityTolerance: number
  machiavellianism: number
}

const BAND_DESCRIPTIONS: Record<string, Record<string, string>> = {
  dominance: {
    'extremely-high': '您具有领袖级的支配本能，天生适合站在舞台中央接受众人仰望。不怒自威是您的出厂设置。',
    'high': '您具有出色的领导力潜质，能够在关键时刻掌控局面并推动团队前进。',
    'average': '您能够在需要时承担领导职责，但不刻意追求权力地位。',
    'low': '您更倾向于支持和配合他人的工作，是团队中可靠的执行者。',
    'extremely-low': '您极度反感发号施令，宁愿自己多做事也不愿指挥别人。',
  },
  riskAversion: {
    'extremely-high': '您的风险规避本能已刻入DNA。宁可不做，绝不做错；宁可平庸，绝不出头。',
    'high': '您具有高度的审慎思维，重大决策前总会反复权衡和多方请示。',
    'average': '您能够在风险和收益之间找到大多数人认可的平衡点。',
    'low': '您具有一定的创新和担当精神，愿意在可控范围内尝试新事物。',
    'extremely-low': '您是天生的改革派，敢于拍板、敢于负责、敢于第一个吃螃蟹。',
  },
  emotionalSuppression: {
    'extremely-high': '您已达到喜怒不形于色的化境。没有人能从您的微表情猜出真实想法，扑克脸宗师。',
    'high': '您具有出色的情绪管理能力，很少在公开场合流露真实的喜怒哀乐。',
    'average': '您能够在大多数场合保持得体的情绪表达。',
    'low': '您是真性情的人，喜怒哀乐都会比较直接地表达出来。',
    'extremely-low': '您爱憎分明，嫉恶如仇，看到不公就忍不住拍案而起。',
  },
  ambiguityTolerance: {
    'extremely-high': '您是领会领导意图的天纵奇才。话只说三分，您能听出七分；文件只读一遍，您能悟透九层。',
    'high': '您具有出色的模糊信息处理能力，善于在指示不明确时找到正确方向。',
    'average': '您能够处理大部分常规性的模糊情境。',
    'low': '您更喜欢清晰明确的指令和目标，不喜欢猜来猜去。',
    'extremely-low': '您极度痛恨模棱两可和潜规则，凡事都要讲清楚说明白。',
  },
  machiavellianism: {
    'extremely-high': '您是政治智慧的集大成者。没有永远的朋友，只有永远的利益。棋局大师。',
    'high': '您具有出色的政治敏感度，能够准确判断形势和站队时机。',
    'average': '您能够理解并运用基本的政治智慧处理复杂人际关系。',
    'low': '您更倾向于就事论事，对人际关系的复杂性考虑较少。',
    'extremely-low': '您极度反感办公室政治，坚信实力和实绩就是一切。',
  },
}

const DIMENSION_NAMES: Record<keyof OfficialdomScores, string> = {
  dominance: '支配欲',
  riskAversion: '风险规避',
  emotionalSuppression: '情绪压制',
  ambiguityTolerance: '模糊耐受',
  machiavellianism: '权谋智慧',
}

const FACET_NAMES: Record<keyof OfficialdomScores, string[]> = {
  dominance: ['气场强度', '话语权渴望', '决策掌控欲', '存在感维度'],
  riskAversion: ['求稳倾向', '出头恐惧', '问责焦虑', '免责本能'],
  emotionalSuppression: ['扑克脸等级', '真实感掩盖', '耐心阈值', '克制力'],
  ambiguityTolerance: ['意图领会', '潜规则嗅觉', '弦外之音解码', '眼色等级'],
  machiavellianism: ['站队智慧', '甩锅艺术', '画饼能力', '利益平衡'],
}

const ARCHETYPES = [
  {
    code: 'DREAM',
    name: '不倒翁型',
    archetype: '官场活化石',
    description: '五维全满的传奇人物。精通所有生存技能，历经无数风浪而屹立不倒。他们不是在做官，他们就是官场本身。',
    famousPeers: ['冯道', '和珅', '韦小宝'],
  },
  {
    code: 'DRE--',
    name: '老黄牛型',
    archetype: '单位基石',
    description: '踏实肯干，风险规避，情绪稳定。虽然缺乏野心和手腕，但每个单位都离不开这样的人。',
    famousPeers: ['李达康', '孙连城'],
  },
  {
    code: '--EAM',
    name: '老狐狸型',
    archetype: '隐形实权派',
    description: '深藏不露，大智若愚。表面与世无争，实则洞察一切。不到关键时刻绝不出手，出手必中。',
    famousPeers: ['高育良', '萧育'],
  },
  {
    code: 'D---M',
    name: '野心家型',
    archetype: '政治新星',
    description: '目标明确，手腕强硬，为达目的不择手段。上升速度快，但风险也大。',
    famousPeers: ['祁同伟', '夏冬春'],
  },
  {
    code: '-REA-',
    name: '技术官僚型',
    archetype: '专业型官员',
    description: '谨慎、理性、专业。他们相信制度和流程，不太相信人。',
    famousPeers: ['易学习', '季昌明'],
  },
  {
    code: '-----',
    name: '理想主义型',
    archetype: '官场异类',
    description: '五维全低的珍稀物种。通常是被保护得很好的技术骨干，或者刚来的年轻人。',
    famousPeers: ['侯亮平', '陈海'],
  },
]

function calculateBand(score: number): OfficialdomDimensionResult['band'] {
  if (score >= 85) return 'extremely-high'
  if (score >= 65) return 'high'
  if (score >= 35) return 'average'
  if (score >= 15) return 'low'
  return 'extremely-low'
}

function calculateZScore(score: number): number {
  return ((score - 50) / 15)
}

function calculateClarity(score: number): number {
  return Math.min(95, 60 + Math.abs(score - 50) * 0.7)
}

function determineOfficialdomProfile(scores: OfficialdomScores) {
  const { dominance, riskAversion, emotionalSuppression, ambiguityTolerance, machiavellianism } = scores
  
  const profileCode = 
    (dominance >= 65 ? 'D' : '-') +
    (riskAversion >= 65 ? 'R' : '-') +
    (emotionalSuppression >= 65 ? 'E' : '-') +
    (ambiguityTolerance >= 65 ? 'A' : '-') +
    (machiavellianism >= 65 ? 'M' : '-')
  
  const survivalIndex = Math.round(
    (riskAversion * 0.3 + emotionalSuppression * 0.25 + ambiguityTolerance * 0.25 + machiavellianism * 0.15 + dominance * 0.05)
  )
  
  let danger = '安全型'
  if (survivalIndex >= 80) danger = '国师级'
  else if (survivalIndex >= 65) danger = '老炮级'
  else if (survivalIndex >= 50) danger = '入门级'
  else if (survivalIndex >= 35) danger = '萌新级'
  else danger = '高危型'

  let archetypeData = ARCHETYPES[5]
  if (profileCode === 'DREAM') archetypeData = ARCHETYPES[0]
  else if (profileCode.startsWith('DRE')) archetypeData = ARCHETYPES[1]
  else if (profileCode.includes('EAM')) archetypeData = ARCHETYPES[2]
  else if (profileCode.startsWith('D') && profileCode.endsWith('M')) archetypeData = ARCHETYPES[3]
  else if (profileCode.includes('REA')) archetypeData = ARCHETYPES[4]

  return {
    code: profileCode,
    name: `${archetypeData.name}人格`,
    description: archetypeData.description,
    archetype: archetypeData.archetype,
    famousPeers: archetypeData.famousPeers,
    survivalIndex,
    dangerLevel: danger,
  }
}

function generateDynamicStrengths(dimensionResults: OfficialdomDimensionResult[]): string[] {
  const strengths: string[] = []
  const [D, R, E, A, M] = dimensionResults

  if (D.score >= 60 && D.score < 80) strengths.push('天然的气场和威慑力，不怒自威')
  if (R.score >= 60 && R.score < 80) strengths.push('超强的风险意识，能把危险消灭在萌芽状态')
  if (E.score >= 60 && E.score < 80) strengths.push('出色的情绪管理能力，泰山崩于前而色不变')
  if (A.score >= 60 && A.score < 80) strengths.push('领会意图的天纵奇才，话听一半就全懂了')
  if (M.score >= 60 && M.score < 80) strengths.push('平衡各方利益的政治智慧')

  if (D.score <= 40) strengths.push('平易近人，没有官架子，群众基础好')
  if (R.score <= 40) strengths.push('敢于担当，是能扛事的实干派')
  if (E.score <= 40) strengths.push('真性情，不虚伪，能赢得真正的信任')
  if (A.score <= 40) strengths.push('思路清晰，执行力强，从不搞弯弯绕绕')
  if (M.score <= 40) strengths.push('清正廉洁，光明磊落，行得正坐得端')

  const allHigh = dimensionResults.filter(d => d.score >= 65).length
  if (allHigh >= 4) strengths.push('五维均衡发展，具有成为一把手的潜质')
  
  const allLow = dimensionResults.filter(d => d.score <= 35).length
  if (allLow >= 4) strengths.push('极度稀有的理想主义者，是真正的脊梁')

  return strengths.filter((item, index) => strengths.indexOf(item) === index).slice(0, 6)
}

function generateSurvivalGuide(dimensionResults: OfficialdomDimensionResult[]): string[] {
  const guide: string[] = []
  const [D, R, E, A, M] = dimensionResults

  if (D.score >= 80) guide.push('注意锋芒毕露。枪打出头鸟，适当的时候要懂得藏拙')
  else if (D.score >= 65) guide.push('在展现领导力的同时，也要注意维护好群众基础')

  if (R.score >= 80) guide.push('过度求稳等于原地踏步。时代在变，不进步就是退步')
  else if (R.score >= 65) guide.push('谨慎是优点，但在需要担当的时候该出手就出手')

  if (E.score >= 80) guide.push('面具戴太久了会长在脸上。偶尔也可以流露一下真性情')
  else if (E.score >= 65) guide.push('情绪稳定是好事，但必要时也可以用愤怒作为工具')

  if (A.score >= 80) guide.push('能悟透潜规则是好事，但别变成只会猜心思的老油条')
  else if (A.score >= 65) guide.push('领会意图的能力是你的核心竞争力')

  if (M.score >= 80) guide.push('没有永远的朋友，也没有永远的敌人。但也要注意吃相')
  else if (M.score >= 65) guide.push('你的政治敏感度是大多数人望尘莫及的天赋')

  if (R.score <= 20) guide.push('木秀于林风必摧之。出头之前先想清楚退路')
  if (E.score <= 20) guide.push('真性情会害了你。学会闭嘴，学会微笑，学会"研究研究"')
  if (M.score <= 20) guide.push('办公室政治无处不在。你不玩别人，别人就玩你')

  return guide.filter((item, index) => guide.indexOf(item) === index).slice(0, 5)
}

export function calculateOfficialdom(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<keyof OfficialdomScores, string[]> = {
    dominance: ['off-1', 'off-2', 'off-3', 'off-4', 'off-5', 'off-6', 'off-31', 'off-32'],
    riskAversion: ['off-7', 'off-8', 'off-9', 'off-10', 'off-11', 'off-12', 'off-33', 'off-34'],
    emotionalSuppression: ['off-13', 'off-14', 'off-15', 'off-16', 'off-17', 'off-18', 'off-35', 'off-36'],
    ambiguityTolerance: ['off-19', 'off-20', 'off-21', 'off-22', 'off-23', 'off-24', 'off-37', 'off-38'],
    machiavellianism: ['off-25', 'off-26', 'off-27', 'off-28', 'off-29', 'off-30', 'off-39', 'off-40'],
  }

  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    answerMap[a.questionId] = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
  })

  const rawScores: OfficialdomScores = {} as OfficialdomScores
  Object.entries(dimensionMap).forEach(([dim, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    rawScores[dim as keyof OfficialdomScores] = Math.round((score / (ids.length * 5)) * 100)
  })

  const dimensionResults: OfficialdomDimensionResult[] = Object.entries(rawScores).map(([dim, score]) => {
    const band = calculateBand(score)
    return {
      dimension: dim,
      dimensionName: DIMENSION_NAMES[dim as keyof OfficialdomScores],
      score,
      percentile: score,
      band,
      bandDescription: BAND_DESCRIPTIONS[dim][band],
      facetScores: FACET_NAMES[dim as keyof OfficialdomScores].reduce((acc, name, i) => {
        acc[name] = Math.max(0, Math.min(100, score + Math.round((Math.random() - 0.5) * 20)))
        return acc
      }, {} as Record<string, number>),
      clarity: calculateClarity(score),
      zScore: calculateZScore(score),
    }
  })

  const profile = determineOfficialdomProfile(rawScores)
  const strengths = generateDynamicStrengths(dimensionResults)
  const survivalGuide = generateSurvivalGuide(dimensionResults)

  const dimensions = dimensionResults.map(dr => ({
    name: dr.dimensionName,
    score: dr.score,
    maxScore: 100,
    percentile: dr.percentile,
    description: dr.bandDescription,
    band: dr.band,
    zScore: dr.zScore,
    clarity: dr.clarity,
    subDimensions: Object.entries(dr.facetScores).map(([name, score]) => ({ name, score })),
  }))

  return {
    type: 'Officialdom',
    typeName: 'DREAM官场人格五维测评',
    typeCode: profile.code,
    archetype: profile.archetype,
    title: `${profile.name} - ${profile.dangerLevel}`,
    summary: profile.description,
    dimensions,
    overallScore: profile.survivalIndex,
    survivalIndex: profile.survivalIndex,
    dangerLevel: profile.dangerLevel,
    famousPeers: profile.famousPeers,
    strengths,
    survivalGuide,
    coreCompetencies: dimensionResults.sort((a, b) => b.score - a.score).slice(0, 2).map(d => d.dimensionName),
    interpretiveNotes: [
      profile.survivalIndex >= 80 ? '您的官场生存能力已击败全国99%的选手' : '',
      profile.code === '-----' ? '⚠️ 理想主义者在复杂环境中请务必注意自我保护' : '',
      profile.code === 'DREAM' ? '🏆 五维全满的您就是传说中的官场活化石' : '',
    ].filter(Boolean),
    references: [
      '《官场上的心理学》，2024',
      '《体制内生存法则》，2023',
      '《中国人的性格》，费孝通',
    ],
  }
}
