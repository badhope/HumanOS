import type { AssessmentResult, Dimension } from '../../types'

// 简单的 HTML 净化函数（前端安全措施）
function sanitizeText(text: unknown): string {
  if (typeof text !== 'string') return ''
  // 移除 HTML 标签和危险字符
  return text
    .replace(/<[^>]*>/g, '') // 移除 HTML 标签
    .replace(/javascript:/gi, '') // 移除 javascript 协议
    .replace(/data:/gi, '') // 移除 data 协议
    .trim()
}

function sanitizeArray(arr: unknown): string[] {
  if (!Array.isArray(arr)) return []
  return arr
    .map(item => typeof item === 'string' ? sanitizeText(item) : '')
    .filter(item => item.length > 0)
}

const DIMENSION_NAME_MAP: Record<string, string> = {
  O: '开放性', C: '尽责性', E: '外向性', A: '宜人性', N: '神经质',
  machiavellianism: '马基雅维利主义', narcissism: '自恋', psychopathy: '精神病态',
  selfAwareness: '自我意识', selfRegulation: '自我调节', motivation: '动机',
  empathy: '共情', socialSkills: '社交技能',
  anxiety: '焦虑', avoidance: '回避', secure: '安全',
  authoritative: '权威型', authoritarian: '专制型', permissive: '放任型', neglectful: '忽视型',
  somatic: '躯体化', cognitive: '认知焦虑', behavioral: '行为焦虑',
  openness: '开放性', conscientiousness: '尽责性', extraversion: '外向性',
  agreeableness: '宜人性', neuroticism: '神经质',
  traditional: '传统', progressive: '进步', authority: '权威', liberty: '自由',
  slacking: '摸鱼', working: '工作', focus: '专注', distraction: '分心',
  experience: '经验', curiosity: '好奇', boldness: '大胆', conservatism: '保守',
  addiction: '成瘾', control: '控制', withdrawal: '戒断', socialImpact: '社交影响',
  meaning: '意义', coherence: '连贯', purpose: '目的', significance: '重要性',
  patriotism: '爱国', nationalism: '民族主义', criticism: '批判', pride: '自豪',
  manipulation: '操纵', guilt: '内疚', isolation: '孤立', gaslighting: '煤气灯',
  foodie: '吃货', picky: '挑食', adventure: '冒险', comfort: '舒适',
  fubao: '福报', overwork: '过劳', endurance: '忍耐', resistance: '抵抗',
  logical: '逻辑', verbal: '语言', spatial: '空间', memory: '记忆',
  maturity: '成熟度', independence: '独立性', responsibility: '责任感', adaptability: '适应性',
  physical: '身体', emotional: '情绪', social: '社交', cognitive_dim: '认知',
  positive: '积极', negative: '消极', neutral: '中性',
  dominance: '支配', submission: '顺从', cooperation: '合作', competition: '竞争',
  introversion: '内向', extroversion: '外向', stability: '稳定', plasticity: '可塑性',
  warmth: '热情', reasoning: '推理', emotionalStability: '情绪稳定性',
  dominance_d: '支配型', influence_i: '影响型', steadiness_s: '稳健型', compliance_c: '服从型',
  realistic: '现实型', investigative: '研究型', artistic: '艺术型',
  social_type: '社会型', enterprising: '企业型', conventional: '常规型',
}

function normalizeDimensions(dimensions: unknown): Dimension[] {
  if (Array.isArray(dimensions)) {
    return dimensions.map(d => ({
      name: sanitizeText(d.name) || '未知维度',
      score: typeof d.score === 'number' ? Math.max(0, Math.min(200, d.score)) : 0,
      maxScore: typeof d.maxScore === 'number' ? Math.max(0, d.maxScore) : undefined,
      description: sanitizeText(d.description),
      dimensionId: sanitizeText(d.dimensionId),
    }))
  }
  if (dimensions && typeof dimensions === 'object') {
    return Object.entries(dimensions as Record<string, any>).map(([key, value]) => {
      const safeKey = sanitizeText(key)
      if (typeof value === 'object' && value !== null && 'score' in value) {
        return {
          name: sanitizeText((value as any).name) || DIMENSION_NAME_MAP[safeKey] || safeKey,
          score: typeof (value as any).score === 'number' ? Math.max(0, Math.min(200, (value as any).score)) : 0,
          maxScore: typeof (value as any).maxScore === 'number' ? Math.max(0, (value as any).maxScore) : undefined,
          description: sanitizeText((value as any).description),
          dimensionId: safeKey,
        }
      }
      return {
        name: DIMENSION_NAME_MAP[safeKey] || safeKey,
        score: typeof value === 'number' ? Math.max(0, Math.min(200, value)) : 0,
        dimensionId: safeKey,
      }
    })
  }
  return []
}

export function normalizeResult(rawResult: any, assessmentType?: string): AssessmentResult {
  if (!rawResult || typeof rawResult !== 'object') {
    return {
      type: sanitizeText(assessmentType) || 'unknown',
      score: 0,
      accuracy: 0,
      title: '计算错误',
      description: '结果计算失败，请重新测评',
      dimensions: [],
      strengths: [],
      weaknesses: [],
      careers: [],
      suggestions: [],
    }
  }

  const dimensions = normalizeDimensions(rawResult.dimensions)

  // 确保不保留原始数据的未知属性，防止意外注入
  return {
    type: sanitizeText(rawResult.type) || sanitizeText(assessmentType) || 'unknown',
    score: typeof rawResult.score === 'number' ? Math.max(0, Math.min(200, rawResult.score)) : 0,
    accuracy: typeof rawResult.accuracy === 'number' ? Math.max(0, Math.min(100, rawResult.accuracy)) : 85,
    title: sanitizeText(rawResult.title),
    description: sanitizeText(rawResult.description),
    dimensions,
    strengths: sanitizeArray(rawResult.strengths),
    weaknesses: sanitizeArray(rawResult.weaknesses),
    careers: sanitizeArray(rawResult.careers),
    suggestions: sanitizeArray(rawResult.suggestions),
  }
}

export { normalizeDimensions }
