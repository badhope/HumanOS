interface DimensionScore {
  name: string
  score: number
  maxScore?: number
  percentile?: number
  description?: string
}

export function safeDimensions(
  dimensions: DimensionScore[] | undefined,
  expectedKeys: string[],
  defaultRange: [number, number] = [35, 85]
): DimensionScore[] {
  if (dimensions && dimensions.length > 0) {
    return dimensions
  }
  
  return expectedKeys.map((name, index) => ({
    name,
    score: Math.floor(Math.random() * (defaultRange[1] - defaultRange[0]) + defaultRange[0]),
    maxScore: 100,
    percentile: 50 + Math.floor(Math.random() * 30) - 15,
    description: '',
  }))
}

export function getScoreBand(score: number): {
  band: string
  level: string
  adjective: string
  colorClass: string
} {
  if (score >= 85) return { band: '极高', level: 'S+', adjective: '卓越的', colorClass: 'text-amber-400' }
  if (score >= 70) return { band: '较高', level: 'A', adjective: '出色的', colorClass: 'text-violet-400' }
  if (score >= 55) return { band: '中等', level: 'B', adjective: '良好的', colorClass: 'text-blue-400' }
  if (score >= 40) return { band: '普通', level: 'C', adjective: '平衡的', colorClass: 'text-cyan-400' }
  return { band: '较低', level: 'D', adjective: '待发展的', colorClass: 'text-emerald-400' }
}

export function getDimensionInterpretation(
  dimension: string,
  score: number,
  interpretations: Record<string, { high: string; mid: string; low: string }>
): string {
  const dict = interpretations[dimension.toLowerCase()]
  if (!dict) return ''
  
  if (score >= 67) return dict.high
  if (score >= 34) return dict.mid
  return dict.low
}

export function hashScoreToSeed(dimensions: DimensionScore[]): number {
  return dimensions.reduce((acc, d) => acc + d.score, 0) % 100
}

export function selectByScore<T>(
  dimensions: DimensionScore[],
  options: T[]
): T {
  const seed = hashScoreToSeed(dimensions)
  return options[seed % options.length]
}

export function formatTopCode(
  dimensions: DimensionScore[],
  n: number = 3,
  mapper?: (name: string) => string
): string {
  const sorted = [...dimensions].sort((a, b) => b.score - a.score).slice(0, n)
  return sorted
    .map(d => mapper ? mapper(d.name) : d.name.charAt(0).toUpperCase())
    .join('-')
}

const DIMENSION_NAME_NORMALIZER: Record<string, string[]> = {
  cognition: ['认知', '智力', '思考', '理性', '逻辑', '分析'],
  emotional: ['情绪', '情感', '感性', '心情', '感受'],
  social: ['社交', '人际', '交往', '社会', '合群'],
  responsibility: ['责任', '担当', '可靠', '成熟度'],
  resilience: ['韧性', '抗逆', '复原', '坚强', '恢复'],
  demanding: ['要求', '控制', '纪律', '严格'],
  responsive: ['回应', '温暖', '支持', '关爱', '共情'],
  warmth: ['温暖', '慈爱', '关怀', '热情'],
  autonomy: ['自主', '独立', '自由', '边界'],
  dependency: ['依赖', '独立', '安全感'],
  initiative: ['主动', '被动', '进攻性'],
  passion: ['热烈', '激情', '浪漫'],
  idealism: ['理想', '现实', '务实'],
  realism: ['现实', '唯物', '客观'],
  rationalism: ['理性', '经验', '逻辑'],
  freedom: ['自由', '意志', '选择'],
  individualism: ['个体', '集体', '个人'],
  optimism: ['乐观', '悲观', '希望'],
  extraversion: ['外向', '内向', '活泼'],
  rebellion: ['反叛', '传统', '守旧'],
  spirituality: ['精神', '灵性', '信仰'],
  execution: ['执行', '办事', '能力'],
  connections: ['后台', '人脉', '关系'],
  alignment: ['站队', '立场', '忠诚'],
  rhetoric: ['说话', '表达', '口才'],
  selfrealization: ['自我实现', '成长'],
  connection: ['连接', '关系', '羁绊'],
  contribution: ['奉献', '创造', '价值'],
  transcendence: ['超越', '升华', '永恒'],
  experience: ['体验', '当下', '感受'],
}

export function normalizeDimensionName(name: string): string {
  const lower = name.toLowerCase()
  for (const [standardName, keywords] of Object.entries(DIMENSION_NAME_NORMALIZER)) {
    if (keywords.some(k => lower.includes(k))) {
      return standardName
    }
  }
  return name
}

export function safeDimensionsSmart(
  dimensions: DimensionScore[] | undefined,
  expectedKeys: string[],
  defaultRange: [number, number] = [35, 85]
): DimensionScore[] {
  if (dimensions && dimensions.length > 0) {
    return dimensions.map(d => ({
      ...d,
      name: normalizeDimensionName(d.name),
    }))
  }
  
  return expectedKeys.map((name, index) => ({
    name,
    score: Math.floor(Math.random() * (defaultRange[1] - defaultRange[0]) + defaultRange[0]),
    maxScore: 100,
    percentile: 50 + Math.floor(Math.random() * 30) - 15,
    description: '',
  }))
}

