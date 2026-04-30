import { lazy, Suspense, Component, ErrorInfo, ReactNode, useState, useEffect, useCallback } from 'react'
import type { AssessmentResult } from '../../types'
import { AlertTriangle, RefreshCw, Sparkles } from 'lucide-react'

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
const KolbProfessionalReport = lazy(() => import('./KolbProfessionalReport'))
const MLQProfessionalReport = lazy(() => import('./MLQProfessionalReport'))
const MFTProfessionalReport = lazy(() => import('./MFTProfessionalReport'))
const HardinessProfessionalReport = lazy(() => import('./HardinessProfessionalReport'))
const MindsetProfessionalReport = lazy(() => import('./MindsetProfessionalReport'))
const PUAResistanceProfessionalReport = lazy(() => import('./PUAResistanceProfessionalReport'))
const FuBaoIndexProfessionalReport = lazy(() => import('./FuBaoIndexProfessionalReport'))
const MoyuPurityProfessionalReport = lazy(() => import('./MoyuPurityProfessionalReport'))
const FoodieLevelProfessionalReport = lazy(() => import('./FoodieLevelProfessionalReport'))
const PatriotPurityProfessionalReport = lazy(() => import('./PatriotPurityProfessionalReport'))
const SexualExperienceProfessionalReport = lazy(() => import('./SexualExperienceProfessionalReport'))
const InternetAddictionProfessionalReport = lazy(() => import('./InternetAddictionProfessionalReport'))
const PCQProfessionalReport = lazy(() => import('./PCQProfessionalReport'))
const PSSProfessionalReport = lazy(() => import('./PSSProfessionalReport'))
const TKIProfessionalReport = lazy(() => import('./TKIProfessionalReport'))
const ELSProfessionalReport = lazy(() => import('./ELSProfessionalReport'))
const OCBProfessionalReport = lazy(() => import('./OCBProfessionalReport'))
const MetacognitionProfessionalReport = lazy(() => import('./MetacognitionProfessionalReport'))
const SchwartzValuesProfessionalReport = lazy(() => import('./SchwartzValuesProfessionalReport'))
const SDSDepressionProfessionalReport = lazy(() => import('./SDSDepressionProfessionalReport'))
const VIACharacterStrengthsProfessionalReport = lazy(() => import('./VIACharacterStrengthsProfessionalReport'))
const LoveLanguageProfessionalReport = lazy(() => import('./LoveLanguageProfessionalReport'))
const EnneagramProfessionalReport = lazy(() => import('./EnneagramProfessionalReport'))
const PoliticalCompassProfessionalReport = lazy(() => import('./PoliticalCompassProfessionalReport'))
const MoralFoundationsProfessionalReport = lazy(() => import('./MoralFoundationsProfessionalReport'))
const ASIProfessionalReport = lazy(() => import('./ASIProfessionalReport'))
const OnePieceBountyProfessionalReport = lazy(() => import('./OnePieceBountyProfessionalReport'))
const EnhancedReportTemplate = lazy(() => import('../EnhancedReportTemplate'))

interface ReportRouterProps {
  result: AssessmentResult
  assessmentType: string
  mode?: 'normal' | 'advanced' | 'professional'
  ideologyScores?: Map<string, number>
  primaryIdeology?: string
  matchScore?: number
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  retryCount: number
}

class ReportErrorBoundary extends Component<
  { children: ReactNode; onReset: () => void },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; onReset: () => void }) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      retryCount: 0,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    console.error('[ReportErrorBoundary] 捕获到错误:', error)
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ReportErrorBoundary] 错误详情:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryCount: prev.retryCount + 1,
    }))
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  handleContinue = () => {
    this.setState({
      hasError: false,
      error: null,
    })
    this.props.onReset()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass rounded-3xl p-12 text-center border border-amber-500/30">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">报告组件加载保护</h3>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            检测到报告渲染异常 (errr-776689)，已自动启动保护机制。
            这是网络或浏览器缓存的临时问题。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={this.handleRetry}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium flex items-center gap-2 mx-auto sm:mx-0"
              type="button"
            >
              <RefreshCw className="w-5 h-5" />
              刷新重试
            </button>
            <button
              onClick={this.handleContinue}
              className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium mx-auto sm:mx-0 hover:bg-white/15 transition-colors"
              type="button"
            >
              查看通用报告
            </button>
          </div>
          <p className="text-white/30 text-sm mt-6">
            错误码: 776689 | 重试次数: {this.state.retryCount}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

function ReportLoadingFallback() {
  return (
    <div className="glass rounded-3xl p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-violet-500 border-t-transparent animate-spin" />
      <h3 className="text-xl font-bold text-white mb-4">正在生成专业报告</h3>
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mt-8">
        <div className="h-32 bg-white/10 rounded-xl animate-pulse"></div>
        <div className="h-32 bg-white/10 rounded-xl animate-pulse delay-100"></div>
      </div>
      <p className="text-white/60 mt-8">正在加载可视化分析组件...</p>
    </div>
  )
}

function LazyReportWithRetry({
  component: Component,
  result,
  mode,
  extraProps,
}: {
  component: React.ComponentType<any>
  result: AssessmentResult
  mode: string
  extraProps: Record<string, any>
}) {
  const [hasFailed, setHasFailed] = useState(false)

  const handleError = useCallback(() => {
    setHasFailed(true)
  }, [])

  if (hasFailed) {
    return <EnhancedReportTemplate result={result} mode={mode as 'normal' | 'advanced' | 'professional'} assessmentType={extraProps.assessmentType || 'unknown'} {...extraProps} />
  }

  return (
    <ReportErrorBoundary onReset={handleError}>
      <Suspense fallback={<ReportLoadingFallback />}>
        <Component result={result} mode={mode} {...extraProps} />
      </Suspense>
    </ReportErrorBoundary>
  )
}

export default function LazyReportRouter(props: ReportRouterProps) {
  const { result, assessmentType, ideologyScores, primaryIdeology, matchScore } = props
  const type = assessmentType.toLowerCase()
  const mode = props.mode || 'normal'
  const [useFallback, setUseFallback] = useState(false)

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
    case type.includes('kolb') || type.includes('学习风格'):
      ReportComponent = KolbProfessionalReport
      break
    case type.includes('mlq') || type.includes('领导力') || type.includes('变革型'):
      ReportComponent = MLQProfessionalReport
      break
    case type.includes('mft') || type.includes('道德基础') || type.includes('moral'):
      ReportComponent = MFTProfessionalReport
      break
    case type.includes('hardiness') || type.includes('韧性') || type.includes('hardy') || type.includes('心理韧性'):
      ReportComponent = HardinessProfessionalReport
      break
    case type.includes('mindset') || type.includes('思维模式') || type.includes('成长型'):
      ReportComponent = MindsetProfessionalReport
      break
    case type.includes('pua') || type.includes('反pua') || type.includes('情感操纵'):
      ReportComponent = PUAResistanceProfessionalReport
      break
    case type.includes('fubao') || type.includes('福报') || type.includes('996'):
      ReportComponent = FuBaoIndexProfessionalReport
      break
    case type.includes('moyu') || type.includes('摸鱼') || type.includes('划水') || type.includes('slacking'):
      ReportComponent = MoyuPurityProfessionalReport
      break
    case type.includes('foodie') || type.includes('吃货') || type.includes('干饭'):
      ReportComponent = FoodieLevelProfessionalReport
      break
    case type.includes('patriot') || type.includes('爱国') || type.includes('战狼'):
      ReportComponent = PatriotPurityProfessionalReport
      break
    case type.includes('sexual') || type.includes('性阅历') || type.includes('老司机'):
      ReportComponent = SexualExperienceProfessionalReport
      break
    case type.includes('internet') || type.includes('网瘾') || type.includes('上网') || type.includes('addiction'):
      ReportComponent = InternetAddictionProfessionalReport
      break
    case type.includes('pcq') || type.includes('抱负') || type.includes('志向'):
      ReportComponent = PCQProfessionalReport
      break
    case type.includes('pss') || type.includes('压力') || type.includes('stress'):
      ReportComponent = PSSProfessionalReport
      break
    case type.includes('tki') || type.includes('冲突模式'):
      ReportComponent = TKIProfessionalReport
      break
    case type.includes('els') || type.includes('学习策略'):
      ReportComponent = ELSProfessionalReport
      break
    case type.includes('ocb') || type.includes('组织公民') || type.includes('公民行为'):
      ReportComponent = OCBProfessionalReport
      break
    case type.includes('metacognition') || type.includes('元认知'):
      ReportComponent = MetacognitionProfessionalReport
      break
    case type.includes('schwartz') || type.includes('施瓦茨'):
      ReportComponent = SchwartzValuesProfessionalReport
      break
    case type.includes('sds') && type.includes('抑郁'):
      ReportComponent = SDSDepressionProfessionalReport
      break
    case type.includes('via') || type.includes('性格优势'):
      ReportComponent = VIACharacterStrengthsProfessionalReport
      break
    case type.includes('love language') || type.includes('爱的语言') || type.includes('爱语'):
      ReportComponent = LoveLanguageProfessionalReport
      break
    case type.includes('enneagram') || type.includes('九型人格'):
      ReportComponent = EnneagramProfessionalReport
      break
    case type.includes('compass') || type.includes('政治罗盘'):
      ReportComponent = PoliticalCompassProfessionalReport
      break
    case type.includes('moral foundation') || type.includes('道德基础'):
      ReportComponent = MoralFoundationsProfessionalReport
      break
    case type.includes('asi') || type.includes('归因') || type.includes('逆商') || type.includes('塞利格曼'):
      ReportComponent = ASIProfessionalReport
      break
    case type.includes('bounty') || type.includes('onepiece') || type.includes('海贼') || type.includes('悬赏'):
      ReportComponent = OnePieceBountyProfessionalReport
      break
    default:
      ReportComponent = EnhancedReportTemplate
      extraProps.assessmentType = assessmentType
      extraProps.matchScore = matchScore
  }

  const Component = ReportComponent as React.ComponentType<any>
  extraProps.assessmentType = assessmentType

  if (useFallback || !Component) {
    return (
      <div className="glass rounded-3xl p-8 border border-violet-500/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">通用分析报告</h3>
            <p className="text-white/60 text-sm">测评类型: {assessmentType}</p>
          </div>
        </div>
        <Suspense fallback={<ReportLoadingFallback />}>
          <EnhancedReportTemplate result={result} mode={mode as 'normal' | 'advanced' | 'professional'} assessmentType={assessmentType} {...extraProps} />
        </Suspense>
      </div>
    )
  }

  return (
    <LazyReportWithRetry
      component={Component}
      result={result}
      mode={mode}
      extraProps={extraProps}
    />
  )
}
