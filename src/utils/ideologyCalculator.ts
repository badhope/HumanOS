import type { Answer, AssessmentResult } from '../types'
import { 
  ideologyDimensions, 
  compositeIdeologies,
  calculateIdeologyScores,
  type IdeologyScoreResult 
} from '../data/ideology-framework'

export function calculateIdeologyProfessional(
  answers: Answer[],
  mode: 'normal' | 'advanced' | 'professional' = 'professional'
): AssessmentResult {
  if (mode === 'normal') {
    return calculateIdeologyNormal(answers)
  }

  const formattedAnswers = answers.map((answer) => ({
    questionId: answer.questionId,
    value: answer.value ?? 0,
    dimension: answer.subscale,
    trait: answer.trait
  }))

  const scoreResult = calculateIdeologyScores(formattedAnswers)

  const primaryIdeology = scoreResult.primaryIdeology
  const secondaryIdeologies = scoreResult.secondaryIdeologies

  let ideologyType: string
  let ideologyDescription: string
  let characteristics: string[]
  let weaknesses: string[]

  if (primaryIdeology) {
    ideologyType = `${primaryIdeology.name}`
    ideologyDescription = primaryIdeology.description
    characteristics = primaryIdeology.characteristics.slice(0, 4)
    weaknesses = primaryIdeology.weaknesses
  } else {
    const dimensionScores = scoreResult.dimensionScores
    const economicScore = dimensionScores.get('economic') || 50
    const politicalScore = dimensionScores.get('political') || 50
    const socialScore = dimensionScores.get('social') || 50
    const culturalScore = dimensionScores.get('cultural') || 50
    const internationalScore = dimensionScores.get('international') || 50
    const technologyScore = dimensionScores.get('technology') || 50

    ideologyType = '🎯 混合意识形态者'
    ideologyDescription = `您的意识形态倾向呈现独特的混合特征。您在经济制度上倾向于${getEconomicLabel(economicScore)}，在政治权力上倾向于${getPoliticalLabel(politicalScore)}，在社会结构上倾向于${getSocialLabel(socialScore)}，在文化价值上倾向于${getCulturalLabel(culturalScore)}，在国际关系上倾向于${getInternationalLabel(internationalScore)}，在技术态度上倾向于${getTechnologyLabel(technologyScore)}。这种独特的组合反映了您复杂而多元的思想体系。`
    
    characteristics = [
      `经济立场：${getEconomicLabel(economicScore)}`,
      `政治立场：${getPoliticalLabel(politicalScore)}`,
      `社会立场：${getSocialLabel(socialScore)}`,
      `文化立场：${getCulturalLabel(culturalScore)}`
    ]
    
    weaknesses = [
      '意识形态定位不够明确',
      '可能在不同议题上存在矛盾'
    ]
  }

  const overallScore = calculateOverallScore(scoreResult)

  const dimensionScores = scoreResult.dimensionScores
  const economicScore = dimensionScores.get('economic') || 50
  const politicalScore = dimensionScores.get('political') || 50
  const socialScore = dimensionScores.get('social') || 50
  const culturalScore = dimensionScores.get('cultural') || 50
  const internationalScore = dimensionScores.get('international') || 50
  const technologyScore = dimensionScores.get('technology') || 50

  const detailedAnalysis = generateDetailedAnalysis(
    scoreResult,
    primaryIdeology,
    secondaryIdeologies
  )

  return {
    type: ideologyType,
    title: `意识形态分析: ${ideologyType}`,
    description: ideologyDescription,
    score: overallScore,
    accuracy: mode === 'professional' ? 95 : mode === 'advanced' ? 90 : 85,
    dimensions: [
      { 
        name: '经济制度轴', 
        score: economicScore, 
        maxScore: 100, 
        description: getEconomicLabel(economicScore) 
      },
      { 
        name: '政治权力轴', 
        score: politicalScore, 
        maxScore: 100, 
        description: getPoliticalLabel(politicalScore) 
      },
      { 
        name: '社会结构轴', 
        score: socialScore, 
        maxScore: 100, 
        description: getSocialLabel(socialScore) 
      },
      { 
        name: '文化价值轴', 
        score: culturalScore, 
        maxScore: 100, 
        description: getCulturalLabel(culturalScore) 
      },
      { 
        name: '国际关系轴', 
        score: internationalScore, 
        maxScore: 100, 
        description: getInternationalLabel(internationalScore) 
      },
      { 
        name: '技术态度轴', 
        score: technologyScore, 
        maxScore: 100, 
        description: getTechnologyLabel(technologyScore) 
      },
    ],
    strengths: characteristics,
    weaknesses: weaknesses,
    careers: getCareers(primaryIdeology),
    suggestions: [detailedAnalysis],
    traits: [
      { name: '经济制度轴', score: economicScore, maxScore: 100, description: '' },
      { name: '政治权力轴', score: politicalScore, maxScore: 100, description: '' },
      { name: '社会结构轴', score: socialScore, maxScore: 100, description: '' },
      { name: '文化价值轴', score: culturalScore, maxScore: 100, description: '' },
      { name: '国际关系轴', score: internationalScore, maxScore: 100, description: '' },
      { name: '技术态度轴', score: technologyScore, maxScore: 100, description: '' },
    ],
    details: {
      strengths: characteristics,
      weaknesses: weaknesses,
      careers: getCareers(primaryIdeology),
      relationships: detailedAnalysis,
      compositeMatches: scoreResult.compositeMatches.slice(0, 5).map(match => ({
        name: match.ideology.name,
        score: Math.round(match.matchScore),
        description: match.ideology.description
      }))
    }
  }
}

function calculateIdeologyNormal(answers: Answer[]): AssessmentResult {
  const traits: Record<string, number> = {
    '生产主义': 0,
    '消费主义': 0,
    '自由主义': 0,
    '集体主义': 0,
    '市场派': 0,
    '计划派': 0,
    '传统派': 0,
    '进步派': 0,
    '全球派': 0,
    '民族派': 0,
    '技术乐观派': 0,
    '技术审慎派': 0,
    '中间派': 0,
  }

  answers.forEach((answer) => {
    if (answer.trait && answer.value) {
      traits[answer.trait] += answer.value
    }
  })

  const dimensionScores = {
    productionism: traits['生产主义'] - traits['消费主义'],
    libertarianism: traits['自由主义'] - traits['集体主义'],
    marketEconomy: traits['市场派'] - traits['计划派'],
    traditionalism: traits['传统派'] - traits['进步派'],
    globalism: traits['全球派'] - traits['民族派'],
    technoOptimism: traits['技术乐观派'] - traits['技术审慎派'],
  }

  const maxScores = {
    productionism: 30,
    libertarianism: 20,
    marketEconomy: 20,
    traditionalism: 20,
    globalism: 12,
    technoOptimism: 12,
  }

  const normalizedScores = Object.entries(dimensionScores).reduce((acc, [key, score]) => {
    const max = maxScores[key as keyof typeof maxScores]
    acc[key] = Math.round(((score + max) / (2 * max)) * 100)
    return acc
  }, {} as Record<string, number>)

  let ideologyType: string
  let ideologyDescription: string
  let characteristics: string[]
  let weaknesses: string[]

  const prodScore = normalizedScores.productionism
  const libScore = normalizedScores.libertarianism
  const marketScore = normalizedScores.marketEconomy
  const tradScore = normalizedScores.traditionalism
  const globalScore = normalizedScores.globalism
  const techScore = normalizedScores.technoOptimism

  if (prodScore >= 70 && libScore >= 60 && marketScore >= 60) {
    ideologyType = '🏭 自由意志生产主义者'
    ideologyDescription = '你是一位坚定的自由意志生产主义者。你深信个人自由和市场机制能够最大化激发人类的创造力和生产力。'
    characteristics = ['高度重视个人自由和自主权', '相信市场竞争能带来最优结果', '认为生产和创造是人生核心价值', '支持技术创新和企业家精神']
    weaknesses = ['可能忽视弱势群体的需求', '对社会公平问题关注不足']
  } else if (prodScore >= 70 && libScore <= 40 && marketScore <= 40) {
    ideologyType = '⚙️ 集体生产主义者'
    ideologyDescription = '你是一位集体生产主义者。你认为社会应该通过有组织的集体行动来实现生产目标。'
    characteristics = ['重视社会责任和集体利益', '支持政府在经济发展中的积极作用', '认为劳动创造价值', '强调社会团结和互助合作']
    weaknesses = ['可能限制个人的经济自由', '对市场机制的效率认识不足']
  } else {
    ideologyType = '🎯 务实中间派'
    ideologyDescription = '你是一位务实的中间派。你在各个意识形态维度上都持有相对温和的观点。'
    characteristics = ['在各维度上保持相对平衡', '愿意听取不同观点', '根据实际情况灵活调整立场', '避免极端化和教条主义']
    weaknesses = ['缺乏明确的意识形态标识', '可能在重大问题上犹豫不决']
  }

  const overallScore = Math.round(
    (normalizedScores.productionism +
     normalizedScores.libertarianism +
     normalizedScores.marketEconomy +
     normalizedScores.traditionalism +
     normalizedScores.globalism +
     normalizedScores.technoOptimism) / 6
  )

  return {
    type: ideologyType,
    title: `意识形态倾向: ${ideologyType}`,
    description: ideologyDescription,
    score: overallScore,
    accuracy: 85,
    dimensions: [
      { name: '生产-消费轴', score: normalizedScores.productionism, maxScore: 100, description: '' },
      { name: '自由-集体轴', score: normalizedScores.libertarianism, maxScore: 100, description: '' },
      { name: '市场-计划轴', score: normalizedScores.marketEconomy, maxScore: 100, description: '' },
      { name: '传统-进步轴', score: normalizedScores.traditionalism, maxScore: 100, description: '' },
      { name: '全球-民族轴', score: normalizedScores.globalism, maxScore: 100, description: '' },
      { name: '技术态度轴', score: normalizedScores.technoOptimism, maxScore: 100, description: '' },
    ],
    strengths: characteristics,
    weaknesses: weaknesses,
    careers: ['政策研究员', '政治评论员', '社会学学者', '公共政策顾问'],
    suggestions: [`🧭 意识形态倾向分析报告

📊 你的六维坐标：
• 生产-消费轴: ${prodScore}%
• 自由-集体轴: ${libScore}%
• 市场-计划轴: ${marketScore}%
• 传统-进步轴: ${tradScore}%
• 全球-民族轴: ${globalScore}%
• 技术态度轴: ${techScore}%

🎯 你的意识形态画像:
${ideologyType}

${ideologyDescription}`],
    traits: [
      { name: '生产-消费轴', score: normalizedScores.productionism, maxScore: 100, description: '' },
      { name: '自由-集体轴', score: normalizedScores.libertarianism, maxScore: 100, description: '' },
      { name: '市场-计划轴', score: normalizedScores.marketEconomy, maxScore: 100, description: '' },
      { name: '传统-进步轴', score: normalizedScores.traditionalism, maxScore: 100, description: '' },
      { name: '全球-民族轴', score: normalizedScores.globalism, maxScore: 100, description: '' },
      { name: '技术态度轴', score: normalizedScores.technoOptimism, maxScore: 100, description: '' },
    ],
    details: {
      strengths: characteristics,
      weaknesses: weaknesses,
      careers: ['政策研究员', '政治评论员', '社会学学者', '公共政策顾问'],
      relationships: ''
    }
  }
}

function calculateOverallScore(scoreResult: IdeologyScoreResult): number {
  const dimensionScores = scoreResult.dimensionScores
  const scores = Array.from(dimensionScores.values())
  const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
  
  if (scoreResult.primaryIdeology) {
    const matchScore = scoreResult.compositeMatches[0]?.matchScore || 50
    return Math.round((avgScore + matchScore) / 2)
  }
  
  return Math.round(avgScore)
}

function getEconomicLabel(score: number): string {
  if (score >= 80) return '自由市场倾向'
  if (score >= 60) return '混合经济倾向（偏市场）'
  if (score >= 40) return '混合经济倾向'
  if (score >= 20) return '混合经济倾向（偏计划）'
  return '计划经济倾向'
}

function getPoliticalLabel(score: number): string {
  if (score >= 80) return '自由意志主义倾向'
  if (score >= 60) return '民主主义倾向'
  if (score >= 40) return '中间立场'
  if (score >= 20) return '威权主义倾向'
  return '极权主义倾向'
}

function getSocialLabel(score: number): string {
  if (score >= 80) return '个人主义倾向'
  if (score >= 60) return '社群主义倾向（偏个人）'
  if (score >= 40) return '社群主义倾向'
  if (score >= 20) return '社群主义倾向（偏集体）'
  return '集体主义倾向'
}

function getCulturalLabel(score: number): string {
  if (score >= 80) return '传统主义倾向'
  if (score >= 60) return '保守主义倾向'
  if (score >= 40) return '现代主义倾向'
  if (score >= 20) return '进步主义倾向'
  return '激进进步主义倾向'
}

function getInternationalLabel(score: number): string {
  if (score >= 80) return '全球主义倾向'
  if (score >= 60) return '国际主义倾向'
  if (score >= 40) return '中间立场'
  if (score >= 20) return '民族主义倾向'
  return '民族民族主义倾向'
}

function getTechnologyLabel(score: number): string {
  if (score >= 80) return '技术乐观主义倾向'
  if (score >= 60) return '技术实用主义倾向（偏乐观）'
  if (score >= 40) return '技术实用主义倾向'
  if (score >= 20) return '技术实用主义倾向（偏审慎）'
  return '技术怀疑主义倾向'
}

function getCareers(ideology: any): string[] {
  if (!ideology) {
    return ['政策研究员', '政治评论员', '社会学学者', '公共政策顾问', '智库分析师']
  }
  
  const baseCareers = ['政策研究员', '政治评论员', '社会学学者', '公共政策顾问', '智库分析师']
  
  if (ideology.id === 'stalinism' || ideology.id === 'maoism') {
    return [...baseCareers, '政府公务员', '党务工作者', '国企管理者']
  } else if (ideology.id === 'nazism' || ideology.id === 'fascism') {
    return [...baseCareers, '国家安全顾问', '军事分析师']
  } else if (ideology.id === 'social-democracy') {
    return [...baseCareers, '非营利组织管理者', '工会工作者', '社会工作者']
  } else if (ideology.id === 'classical-liberalism' || ideology.id === 'libertarianism') {
    return [...baseCareers, '企业家', '经济分析师', '自由撰稿人']
  }
  
  return baseCareers
}

function generateDetailedAnalysis(
  scoreResult: IdeologyScoreResult,
  primaryIdeology: any,
  secondaryIdeologies: any[]
): string {
  const dimensionScores = scoreResult.dimensionScores
  const economicScore = dimensionScores.get('economic') || 50
  const politicalScore = dimensionScores.get('political') || 50
  const socialScore = dimensionScores.get('social') || 50
  const culturalScore = dimensionScores.get('cultural') || 50
  const internationalScore = dimensionScores.get('international') || 50
  const technologyScore = dimensionScores.get('technology') || 50

  let analysis = `🧭 多维度交叉意识形态分析报告

━━━━━━━━━━━━━━━━━━━━━

📊 你的六维坐标：

💰 经济制度轴: ${economicScore}%
   ${getEconomicDescription(economicScore)}

⚖️ 政治权力轴: ${politicalScore}%
   ${getPoliticalDescription(politicalScore)}

👥 社会结构轴: ${socialScore}%
   ${getSocialDescription(socialScore)}

📜 文化价值轴: ${culturalScore}%
   ${getCulturalDescription(culturalScore)}

🌐 国际关系轴: ${internationalScore}%
   ${getInternationalDescription(internationalScore)}

🔬 技术态度轴: ${technologyScore}%
   ${getTechnologyDescription(technologyScore)}

━━━━━━━━━━━━━━━━━━━━━

🎯 主要意识形态识别：

`

  if (primaryIdeology) {
    const matchScore = scoreResult.compositeMatches[0]?.matchScore || 0
    analysis += `**${primaryIdeology.name}** (匹配度: ${Math.round(matchScore)}%)

${primaryIdeology.description}

📅 历史渊源：
创立于${primaryIdeology.foundingYear || '20世纪初'}，代表人物包括${primaryIdeology.historicalFigures?.join('、') || '多位思想家'}。

🌍 历史实践：
${primaryIdeology.historicalExamples?.join('、') || '在多个国家和地区有过实践'}。

📚 核心文献：
${primaryIdeology.keyTexts?.join('、') || '相关理论著作'}。

`
  } else {
    analysis += `您的意识形态倾向呈现独特的混合特征，无法简单归类到某一特定意识形态类型。这反映了您思想的复杂性和多元性。

`
  }

  if (secondaryIdeologies.length > 0) {
    analysis += `━━━━━━━━━━━━━━━━━━━━━

🔗 相关意识形态影响：

`
    secondaryIdeologies.forEach((ideology, index) => {
      const match = scoreResult.compositeMatches[index + 1]
      if (match) {
        analysis += `${index + 1}. **${ideology.name}** (匹配度: ${Math.round(match.matchScore)}%)
   ${ideology.description.slice(0, 100)}...

`
      }
    })
  }

  analysis += `━━━━━━━━━━━━━━━━━━━━━

💡 深度解读：

您的意识形态倾向是由六个维度的复杂组合形成的独特光谱。这种多维度交叉分析方法能够更准确地识别您的政治哲学定位，特别是识别那些由多个维度组合而成的复合意识形态（如斯大林主义、纳粹主义等）。

理解自己的意识形态定位有助于：
• 更清晰地认识自己的价值观和政治立场
• 在讨论中更好地表达和理解不同观点
• 避免陷入单一视角的思维陷阱
• 以更开放的态度对待不同意见

记住：没有"正确"的意识形态，只有与你个人经历和价值观相契合的政治哲学。保持思考和质疑的精神是最重要的！`

  return analysis
}

function getEconomicDescription(score: number): string {
  if (score >= 80) return '▸ 强烈支持自由市场经济，主张最小化政府干预'
  if (score >= 60) return '▸ 倾向于市场机制，但接受适度的政府调控'
  if (score >= 40) return '▸ 支持混合经济模式，平衡市场与政府作用'
  if (score >= 20) return '▸ 倾向于政府主导，但保留一定市场空间'
  return '▸ 强烈支持计划经济，主张国家对经济的全面控制'
}

function getPoliticalDescription(score: number): string {
  if (score >= 80) return '▸ 强调个人自由，主张最小化政府权力'
  if (score >= 60) return '▸ 支持民主制度，重视权力制衡'
  if (score >= 40) return '▸ 在自由与秩序之间寻求平衡'
  if (score >= 20) return '▸ 倾向于强政府，重视社会秩序'
  return '▸ 支持高度集中的政治权力'
}

function getSocialDescription(score: number): string {
  if (score >= 80) return '▸ 强调个人利益和自主权'
  if (score >= 60) return '▸ 重视个人权利，但也关注社会责任'
  if (score >= 40) return '▸ 在个人与集体之间寻求平衡'
  if (score >= 20) return '▸ 重视集体利益，强调社会责任'
  return '▸ 强调集体利益高于个人利益'
}

function getCulturalDescription(score: number): string {
  if (score >= 80) return '▸ 高度重视传统文化和价值观念'
  if (score >= 60) return '▸ 尊重传统，但接受适度改革'
  if (score >= 40) return '▸ 在传统与进步之间寻求平衡'
  if (score >= 20) return '▸ 倾向于社会进步和变革'
  return '▸ 支持激进的社会变革'
}

function getInternationalDescription(score: number): string {
  if (score >= 80) return '▸ 强烈支持全球化和国际合作'
  if (score >= 60) return '▸ 支持国际主义，但维护国家利益'
  if (score >= 40) return '▸ 在全球化与民族利益之间寻求平衡'
  if (score >= 20) return '▸ 重视国家主权和民族利益'
  return '▸ 强调民族利益优先'
}

function getTechnologyDescription(score: number): string {
  if (score >= 80) return '▸ 对技术发展持极度乐观态度'
  if (score >= 60) return '▸ 支持技术进步，但关注伦理问题'
  if (score >= 40) return '▸ 对技术持理性中立态度'
  if (score >= 20) return '▸ 对技术发展持审慎态度'
  return '▸ 对技术发展持怀疑和批判态度'
}
