import type { AssessmentResult } from '../../types'

import MBTIProfessionalReport from './MBTIProfessionalReport'
import BigFiveProfessionalReport from './BigFiveProfessionalReport'
import EQProfessionalReport from './EQProfessionalReport'
import DISCProfessionalReport from './DISCProfessionalReport'
import AttachmentProfessionalReport from './AttachmentProfessionalReport'
import DarkTriadProfessionalReport from './DarkTriadProfessionalReport'
import IQProfessionalReport from './IQProfessionalReport'
import HollandProfessionalReport from './HollandProfessionalReport'
import IdeologyProfessionalReport from './IdeologyProfessionalReport'
import BurnoutProfessionalReport from './BurnoutProfessionalReport'
import SASProfessionalReport from './SASProfessionalReport'
import LacanProfessionalReport from './LacanProfessionalReport'
import GMAProfessionalReport from './GMAProfessionalReport'
import MentalAgeProfessionalReport from './MentalAgeProfessionalReport'
import CASTParentingProfessionalReport from './CASTParentingProfessionalReport'
import PhiloSpectrumProfessionalReport from './PhiloSpectrumProfessionalReport'
import OfficialdomDreamProfessionalReport from './OfficialdomDreamProfessionalReport'
import LoveAnimalProfessionalReport from './LoveAnimalProfessionalReport'
import ColorSubconsciousProfessionalReport from './ColorSubconsciousProfessionalReport'
import LifeMeaningProfessionalReport from './LifeMeaningProfessionalReport'
import EnhancedReportTemplate from '../EnhancedReportTemplate'

interface ReportRouterProps {
  result: AssessmentResult
  assessmentType: string
  mode?: 'normal' | 'advanced' | 'professional'
  ideologyScores?: Map<string, number>
  primaryIdeology?: string
  matchScore?: number
}

export default function ReportRouter({
  result,
  assessmentType,
  mode = 'normal',
  ideologyScores,
  primaryIdeology,
  matchScore,
}: ReportRouterProps) {
  const type = assessmentType.toLowerCase()

  if (type.includes('mbti') || type === 'mbti' || type.includes('sbti')) {
    return <MBTIProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('bigfive') || type.includes('big-five') || type.includes('ocean') || type === 'big5' || type === 'fivefactor') {
    return <BigFiveProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('eq') || type.includes('emotional') || type.includes('情商') || type === 'ei') {
    return <EQProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('disc') || type.includes('behavior') || type.includes('行为风格')) {
    return <DISCProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('attachment') || type.includes('依恋') || type.includes('亲密关系') || type === 'ecr') {
    return <AttachmentProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('dark') || type.includes('triad') || type.includes('黑暗') || type.includes('马基雅维利')) {
    return <DarkTriadProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('iq') || type.includes('raven') || type.includes('智商') || type.includes('智力') || type.includes('瑞文')) {
    return <IQProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('holland') || type.includes('sds') || type.includes('霍兰德') || type.includes('职业兴趣')) {
    return <HollandProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('ideology') || type.includes('political') || type.includes('九宫格') || type.includes('意识形态') || type.includes('政治')) {
    return <IdeologyProfessionalReport result={result} mode={mode} ideologyScores={ideologyScores} primaryIdeology={primaryIdeology} />
  }

  if (type.includes('burnout') || type.includes('mbi') || type.includes('倦怠') || type.includes('职业耗竭')) {
    return <BurnoutProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('sas') || type.includes('anxiety') || type.includes('焦虑') || type.includes('zung')) {
    return <SASProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('lacan') || type.includes('拉康') || type.includes('精神分析')) {
    return <LacanProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('gma') || type.includes('maturity') || type.includes('成熟度') || type.includes('心理成熟')) {
    return <GMAProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('mental') || type.includes('age') || type.includes('心理年龄') || type.includes('精神年龄')) {
    return <MentalAgeProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('cast') || type.includes('parent') || type.includes('教养') || type.includes('育儿') || type.includes('家庭教育')) {
    return <CASTParentingProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('philo') || type.includes('spectrum') || type.includes('哲学') || type.includes('世界观')) {
    return <PhiloSpectrumProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('official') || type.includes('dream') || type.includes('官阶') || type.includes('官场') || type.includes('仕途')) {
    return <OfficialdomDreamProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('abm') || type.includes('love') || type.includes('animal') || type.includes('爱情动物') || type.includes('恋爱人格')) {
    return <LoveAnimalProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('color') || type.includes('subconscious') || type.includes('颜色') || type.includes('潜意识')) {
    return <ColorSubconsciousProfessionalReport result={result} mode={mode} />
  }

  if (type.includes('meaning') || type.includes('life') || type.includes('人生意义') || type.includes('虚无主义') || type.includes('nihil')) {
    return <LifeMeaningProfessionalReport result={result} mode={mode} />
  }

  return (
    <EnhancedReportTemplate
      result={result}
      assessmentType={assessmentType}
      mode={mode}
      ideologyScores={ideologyScores}
      primaryIdeology={primaryIdeology}
      matchScore={matchScore}
    />
  )
}

export {
  MBTIProfessionalReport,
  BigFiveProfessionalReport,
  EQProfessionalReport,
  DISCProfessionalReport,
  AttachmentProfessionalReport,
  DarkTriadProfessionalReport,
  IQProfessionalReport,
  HollandProfessionalReport,
  IdeologyProfessionalReport,
  BurnoutProfessionalReport,
  SASProfessionalReport,
  LacanProfessionalReport,
  GMAProfessionalReport,
  MentalAgeProfessionalReport,
  CASTParentingProfessionalReport,
  PhiloSpectrumProfessionalReport,
  OfficialdomDreamProfessionalReport,
  LoveAnimalProfessionalReport,
  ColorSubconsciousProfessionalReport,
  LifeMeaningProfessionalReport,
}
