import type { Answer, AssessmentResult, Dimension } from '../../../types'
import type { EthicsAxis, MoralsAxis, AlignmentType } from './dnd-common'
import { alignmentProfiles } from './dnd-common'

interface DndAnswer extends Answer {
  meta?: {
    ethics: EthicsAxis
    morals: MoralsAxis
    weight: number
  }
}

export function calculateDndAlignment(answers: Answer[]): AssessmentResult {
  const ethicsScores: Record<EthicsAxis, number> = { lawful: 0, neutral: 0, chaotic: 0 }
  const moralsScores: Record<MoralsAxis, number> = { good: 0, neutral: 0, evil: 0 }

  answers.forEach((answer: DndAnswer) => {
    const meta = answer.meta
    if (!meta) return

    const value = (answer.value || 3) * (meta.weight || 1)
    ethicsScores[meta.ethics] += value
    moralsScores[meta.morals] += value
  })

  const ethics = (Object.keys(ethicsScores) as EthicsAxis[]).reduce(
    (a, b) => ethicsScores[a] > ethicsScores[b] ? a : b
  )

  const morals = (Object.keys(moralsScores) as MoralsAxis[]).reduce(
    (a, b) => moralsScores[a] > moralsScores[b] ? a : b
  )

  const alignmentType = `${ethics}-${morals}` as AlignmentType
  const trueAlignment = (alignmentType as string) === 'neutral-neutral' ? 'true-neutral' : alignmentType as AlignmentType
  const profile = alignmentProfiles[trueAlignment] || alignmentProfiles['true-neutral']

  const dimensions: Dimension[] = [
    {
      name: '守序 - 混乱',
      score: ((ethicsScores.chaotic - ethicsScores.lawful) + 50),
      description: `偏向${ethics === 'lawful' ? '守序' : ethics === 'chaotic' ? '混乱' : '中立'}`,
    },
    {
      name: '善良 - 邪恶',
      score: ((moralsScores.evil - moralsScores.good) + 50),
      description: `偏向${morals === 'good' ? '善良' : morals === 'evil' ? '邪恶' : '中立'}`,
    },
  ]

  const traits = generateTraits(trueAlignment)

  return {
    type: 'dnd-alignment',
    title: `你的阵营是「${profile.name}」`,
    subtitle: profile.title,
    summary: profile.description,
    quote: profile.quote,
    archetype: profile.archetype,
    celebrities: profile.celebrities,
    dimensions,
    traits,
  }
}

function generateTraits(alignment: AlignmentType) {
  const traits: any[] = []

  switch (alignment) {
    case 'lawful-good':
      traits.push({ name: '原则至上', description: '绝不牺牲原则换取结果', positive: true })
      traits.push({ name: '守护天使', description: '用秩序保护弱者', positive: true })
      break
    case 'lawful-neutral':
      traits.push({ name: '程序正义', description: '法律高于一切，包括善恶', positive: true })
      break
    case 'lawful-evil':
      traits.push({ name: '合法犯罪', description: '用规则作为武器', positive: false })
      traits.push({ name: '优雅的恶人', description: '体面地做尽坏事', positive: false })
      break
    case 'neutral-good':
      traits.push({ name: '灵活行善', description: '怎么做善事比要不要做更重要', positive: true })
      break
    case 'true-neutral':
      traits.push({ name: '平衡之道', description: '不站队，保持中立', positive: true })
      break
    case 'neutral-evil':
      traits.push({ name: '精致利己', description: '没有底线，只有利益', positive: false })
      break
    case 'chaotic-good':
      traits.push({ name: '侠义精神', description: '人心即是正义', positive: true })
      traits.push({ name: '规则破坏者', description: '恶法非法', positive: true })
      break
    case 'chaotic-neutral':
      traits.push({ name: '绝对自由', description: '我是自己的法则', positive: true })
      break
    case 'chaotic-evil':
      traits.push({ name: '混乱之源', description: '破坏即是目的', positive: false })
      traits.push({ name: '无拘无束', description: '道德法律与我何干', positive: false })
      break
  }

  return traits
}
