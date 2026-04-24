import { lazy, Suspense } from 'react'
import type { AssessmentResult } from '../../types'

const MBTIProfessionalReport = lazy(() => import('./MBTIProfessionalReport'))
const BigFiveProfessionalReport = lazy(() => import('./BigFiveProfessionalReport'))
const EQProfessionalReport = lazy(() => import('./EQProfessionalReport'))
const DISCProfessionalReport = lazy(() => import('./DISCProfessionalReport'))
const AttachmentProfessionalReport = lazy(() => import('./AttachmentProfessionalReport'))
const DarkTriadProfessionalReport = lazy(() => import('./DarkTriadProfessionalReport'))
const IQProfessionalReport = lazy(() => import('./IQProfessionalReport'))
const HollandProfessionalReport = lazy(() => import('./HollandProfessionalReport'))
const IdeologyProfessionalReport = lazy(() => import('./IdeologyProfessionalReport'))
const BurnoutProfessionalReport = lazy(() => import('./BurnoutProfessionalReport'))
const SASProfessionalReport = lazy(() => import('./SASProfessionalReport'))
const LacanProfessionalReport = lazy(() => import('./LacanProfessionalReport'))
const GMAProfessionalReport = lazy(() => import('./GMAProfessionalReport'))
const MentalAgeProfessionalReport = lazy(() => import('./MentalAgeProfessionalReport'))
const CASTParentingProfessionalReport = lazy(() => import('./CASTParentingProfessionalReport'))
const PhiloSpectrumProfessionalReport = lazy(() => import('./PhiloSpectrumProfessionalReport'))
const OfficialdomDreamProfessionalReport = lazy(() => import('./OfficialdomDreamProfessionalReport'))
const LoveAnimalProfessionalReport = lazy(() => import('./LoveAnimalProfessionalReport'))
const ColorSubconsciousProfessionalReport = lazy(() => import('./ColorSubconsciousProfessionalReport'))
const LifeMeaningProfessionalReport = lazy(() => import('./LifeMeaningProfessionalReport'))
const EnhancedReportTemplate = lazy(() => import('../EnhancedReportTemplate'))

interface ReportRouterProps {
  result: AssessmentResult
  assessmentType: string
  mode?: 'normal' | 'advanced' | 'professional'
  ideologyScores?: Map<string, number>
  primaryIdeology?: string
  matchScore?: number
}

function ReportLoadingFallback() {
  return (
    <div className="glass rounded-3xl p-12 text-center">
      <div className="animate-pulse">
        <div className="h-8 bg-white/10 rounded-lg w-3/4 mx-auto mb-6"></div>
        <div className="h-4 bg-white/10 rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-4 bg-white/10 rounded w-2/3 mx-auto mb-8"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 bg-white/10 rounded-xl"></div>
          <div className="h-32 bg-white/10 rounded-xl"></div>
        </div>
      </div>
      <p className="text-white/60 mt-8">正在生成专业分析报告...</p>
    </div>
  )
}

export default function LazyReportRouter(props: ReportRouterProps) {
  const { result, assessmentType, ideologyScores, primaryIdeology, matchScore } = props
  const type = assessmentType.toLowerCase()
  const mode = props.mode || 'normal'

  let ReportComponent: React.LazyExoticComponent<React.ComponentType<any>> | null = null
  const extraProps: Record<string, any> = {}

  switch (true) {
    case type.includes('mbti') || type === 'mbti' || type.includes('sbti'):
      ReportComponent = MBTIProfessionalReport
      break
    case type.includes('bigfive') || type.includes('big-five') || type.includes('ocean') || type === 'big5' || type === 'fivefactor':
      ReportComponent = BigFiveProfessionalReport
      break
    case type.includes('eq') || type.includes('emotional') || type.includes('情商') || type === 'ei':
      ReportComponent = EQProfessionalReport
      break
    case type.includes('disc') || type.includes('behavior') || type.includes('行为风格'):
      ReportComponent = DISCProfessionalReport
      break
    case type.includes('attachment') || type.includes('依恋') || type.includes('亲密关系') || type === 'ecr':
      ReportComponent = AttachmentProfessionalReport
      break
    case type.includes('dark') || type.includes('triad') || type.includes('黑暗') || type.includes('马基雅维利'):
      ReportComponent = DarkTriadProfessionalReport
      break
    case type.includes('iq') || type.includes('raven') || type.includes('智商') || type.includes('智力') || type.includes('瑞文'):
      ReportComponent = IQProfessionalReport
      break
    case type.includes('holland') || type.includes('sds') || type.includes('霍兰德') || type.includes('职业兴趣'):
      ReportComponent = HollandProfessionalReport
      break
    case type.includes('ideology') || type.includes('political') || type.includes('九宫格') || type.includes('意识形态') || type.includes('政治'):
      ReportComponent = IdeologyProfessionalReport
      extraProps.ideologyScores = ideologyScores
      extraProps.primaryIdeology = primaryIdeology
      break
    case type.includes('burnout') || type.includes('mbi') || type.includes('倦怠') || type.includes('职业耗竭'):
      ReportComponent = BurnoutProfessionalReport
      break
    case type.includes('sas') || type.includes('anxiety') || type.includes('焦虑') || type.includes('zung'):
      ReportComponent = SASProfessionalReport
      break
    case type.includes('lacan') || type.includes('拉康') || type.includes('精神分析'):
      ReportComponent = LacanProfessionalReport
      break
    case type.includes('gma') || type.includes('maturity') || type.includes('成熟度') || type.includes('心理成熟'):
      ReportComponent = GMAProfessionalReport
      break
    case type.includes('mental') || type.includes('age') || type.includes('心理年龄') || type.includes('精神年龄'):
      ReportComponent = MentalAgeProfessionalReport
      break
    case type.includes('cast') || type.includes('parent') || type.includes('教养') || type.includes('育儿') || type.includes('家庭教育'):
      ReportComponent = CASTParentingProfessionalReport
      break
    case type.includes('philo') || type.includes('spectrum') || type.includes('哲学') || type.includes('价值观'):
      ReportComponent = PhiloSpectrumProfessionalReport
      break
    case type.includes('officialdom') || type.includes('dream') || type.includes('官场') || type.includes('权力') || type.includes('官本位'):
      ReportComponent = OfficialdomDreamProfessionalReport
      break
    case type.includes('animal') || type.includes('love') || type.includes('恋爱动物') || type.includes('爱情观'):
      ReportComponent = LoveAnimalProfessionalReport
      break
    case type.includes('color') || type.includes('subconscious') || type.includes('色彩') || type.includes('潜意识'):
      ReportComponent = ColorSubconsciousProfessionalReport
      break
    case type.includes('meaning') || type.includes('life') || type.includes('意义') || type.includes('存在'):
      ReportComponent = LifeMeaningProfessionalReport
      break
    default:
      ReportComponent = EnhancedReportTemplate
      extraProps.assessmentType = assessmentType
      extraProps.matchScore = matchScore
  }

  const Component = ReportComponent as React.ComponentType<any>

  return (
    <Suspense fallback={<ReportLoadingFallback />}>
      {Component && <Component result={result} mode={mode} {...extraProps} />}
    </Suspense>
  )
}
