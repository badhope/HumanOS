import type { Answer, AssessmentResult, Dimension } from '../../types'

export type TkiMode = 'competing' | 'collaborating' | 'compromising' | 'avoiding' | 'accommodating'

const modeNames: Record<TkiMode, string> = {
  competing: '竞争型',
  collaborating: '协作型',
  compromising: '妥协型',
  avoiding: '回避型',
  accommodating: '迁就型',
}

const modeDescriptions: Record<TkiMode, string> = {
  competing: '坚定自信、追求胜负，运用优势争取自身利益',
  collaborating: '深度合作、寻求双赢，共同探索满足双方的方案',
  compromising: '寻找中间立场，双方都做出让步以达成协议',
  avoiding: '规避冲突、暂缓处理，选择不直接面对分歧',
  accommodating: '优先满足对方，为维持关系而牺牲自身利益',
}

export function calculateTKI(answers: Answer[]): AssessmentResult {
  const dimensionMap: Record<string, string[]> = {
    competing: ['tki1', 'tki6', 'tki11', 'tki16', 'tki21', 'tki26'],
    collaborating: ['tki4', 'tki9', 'tki14', 'tki19', 'tki24', 'tki29'],
    compromising: ['tki3', 'tki8', 'tki13', 'tki18', 'tki23', 'tki28'],
    avoiding: ['tki5', 'tki10', 'tki15', 'tki20', 'tki25', 'tki30'],
    accommodating: ['tki2', 'tki7', 'tki12', 'tki17', 'tki22', 'tki27'],
  }

  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    const value = typeof a.value === 'number' ? a.value : parseInt(String(a.value || 3))
    const qid = a.questionId.replace('tki_n', 'tki')
    answerMap[qid] = value
  })

  const dimensions: Dimension[] = []
  const modeScores: Record<string, number> = {}

  Object.entries(dimensionMap).forEach(([mode, ids]) => {
    const score = ids.reduce((sum, id) => sum + (answerMap[id] || 3), 0)
    const normalizedScore = Math.min(100, Math.max(0, (((score / ids.length) - 1) / 4) * 100))
    modeScores[mode] = Math.round(normalizedScore)
    
    dimensions.push({
      name: modeNames[mode as TkiMode],
      score: Math.round(normalizedScore),
      description: modeDescriptions[mode as TkiMode],
    })
  })

  const dominantMode = Object.entries(modeScores).sort((a, b) => b[1] - a[1])[0]
  const dominantModeName = modeNames[dominantMode[0] as TkiMode]
  const overallScore = Math.round(Object.values(modeScores).reduce((a, b) => a + b, 0) / 5)
  const traits = generateTraits(modeScores)

  const subtitles: Record<string, string> = {
    competing: '竞争就是硬道理',
    collaborating: '双赢才是真赢',
    compromising: '中庸之道',
    avoiding: '时间解决一切',
    accommodating: '和为贵',
  }

  return {
    type: 'tki',
    title: '冲突模式测评完成',
    subtitle: `主导风格: ${dominantModeName}`,
    summary: `你的核心冲突处理风格是「${dominantModeName}」——${subtitles[dominantMode[0]]}。冲突没有对错，每种模式都有最佳适用场景。`,
    overallScore,
    dimensions,
    traits,
  }
}

function generateTraits(scores: Record<string, number>) {
  const traits: any[] = []
  const highModes = Object.entries(scores).filter(([_, s]) => s >= 75).map(([k]) => k)
  const lowModes = Object.entries(scores).filter(([_, s]) => s <= 30).map(([k]) => k)

  if (highModes.includes('competing') && scores['competing'] >= 85) {
    traits.push({ name: '谈判鲨鱼', description: '零和博弈大师，寸土不让的竞争高手', positive: true })
  }

  if (highModes.includes('collaborating') && scores['collaborating'] >= 85) {
    traits.push({ name: '整合大师', description: '真正的双赢思维，总能找到创造性解决方案', positive: true })
  }

  if (highModes.includes('avoiding') && scores['avoiding'] >= 80) {
    traits.push({ name: '和平使者', description: '用时间和距离化解矛盾的高手', positive: true })
  }

  if (highModes.includes('accommodating') && scores['accommodating'] >= 80) {
    traits.push({ name: '关系优先', description: '牺牲小我，成就大我，以和为贵', positive: true })
  }

  if (highModes.includes('compromising') && scores['compromising'] >= 80) {
    traits.push({ name: '实用主义', description: '各让一步，达成共识是你的信条', positive: true })
  }

  if (scores['collaborating'] >= 70 && scores['competing'] >= 60) {
    traits.push({ name: '鹰派外交官', description: '既能坚持原则，又能寻求共识', positive: true })
  }

  if (lowModes.includes('competing')) {
    traits.push({ name: '厌争体质', description: '天生不喜欢竞争和对抗', positive: true })
  }

  if (lowModes.includes('collaborating')) {
    traits.push({ name: '独行者', description: '更倾向于自己解决问题', positive: false })
  }

  if (lowModes.includes('avoiding') && scores['competing'] >= 70) {
    traits.push({ name: '火力全开', description: '有问题就正面刚，绝不回避', positive: true })
  }

  return traits
}
