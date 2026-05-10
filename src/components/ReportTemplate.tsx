/**
 * ==============================================
 * 📊 测评报告渲染核心组件 - ReportTemplate.tsx
 * ==============================================
 * 
 * 【功能定位】
 * 这是整个测评系统的报告输出引擎，负责将计算器返回的原始数据
 * 转换成可视化的、人类可读的测评报告页面。
 * 
 * 【架构设计】
 * 1. 入口路由层: 根据assessmentType分发到对应报告组件
 * 2. 组件层: 每个测评一个独立的报告渲染函数
 * 3. 标准报告结构: 头部概览 → 雷达图 → 维度分析 → 金句/建议
 * 
 * 【文件规模】约200行，调度入口
 */

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { getAssessmentById } from '../data/assessments'
import EnhancedReportTemplate from './report-templates/EnhancedReportTemplate'
import { SASReport, ECRReport, HollandReport } from './report-templates/ProfessionalReports'
import { 
  OfficialdomReport, 
  GMAReport, 
  CASTReport, 
  IdeologyReport, 
  IQReport, 
  EQReport, 
  DarkTriadReport, 
  OceanReport 
} from './report-templates/WorkplaceReports'
import { 
  LifeMeaningReport, 
  PatriotismReport, 
  SlackingReport, 
  FoodieReport, 
  InternetAddictionReport, 
  SexualExperienceReport,
  ColorSubconsciousReport,
  AbmLoveAnimalReport,
  MentalAgeReport,
  SBTIPersonalityReport
} from './report-templates/FunReports'
import type { SASResult, ECRResult, HollandResult } from '../utils/calculators'

interface ReportTemplateProps {
  result: ReportResult
  assessmentType: string
  mode?: string
}

interface GenericReportResult {
  [key: string]: any
}

export default function ReportTemplate({ result, assessmentType }: ReportTemplateProps) {
  const assessment = getAssessmentById(assessmentType)
  if (assessment?.resultInterpretation?.templateType === 'enhanced') {
    return <EnhancedReportTemplate result={result} assessment={assessment} />
  }

  if (assessmentType === 'sas-standard') {
    return <SASReport result={result as SASResult} />
  }

  if (assessmentType === 'ecr-attachment') {
    return <ECRReport result={result as ECRResult} />
  }

  if (assessmentType === 'holland-sds') {
    return <HollandReport result={result as HollandResult} />
  }

  if (assessmentType === 'officialdom-dream') {
    return <OfficialdomReport result={result as GenericReportResult} />
  }

  if (assessmentType === 'gma-maturity') {
    return <GMAReport result={result as GenericReportResult} />
  }

  if (assessmentType === 'cast-parenting') {
    return <CASTReport result={result as GenericReportResult} />
  }

  if (assessmentType === 'ideology-9square') {
    return <IdeologyReport result={result as GenericReportResult} />
  }

  if (assessmentType === 'iq-ravens') {
    return <IQReport result={result as GenericReportResult} />
  }

  if (assessmentType === 'eq-goleman') {
    return <EQReport result={result as GenericReportResult} />
  }

  if (assessmentType === 'dark-triad') {
    return <DarkTriadReport result={result as GenericReportResult} />
  }

  if (assessmentType === 'ocean-bigfive') {
    return <OceanReport result={result as GenericReportResult} />
  }

  if (assessmentType === 'life-meaning')      return <LifeMeaningReport result={result as GenericReportResult} />
  if (assessmentType === 'patriotism-purity') return <PatriotismReport result={result as GenericReportResult} />
  if (assessmentType === 'slacking-purity')   return <SlackingReport result={result as GenericReportResult} />
  if (assessmentType === 'foodie-level')      return <FoodieReport result={result as GenericReportResult} />
  if (assessmentType === 'internet-addiction')return <InternetAddictionReport result={result as GenericReportResult} />
  if (assessmentType === 'sexual-experience') return <SexualExperienceReport result={result as GenericReportResult} />
  if (assessmentType === 'color-subconscious') return <ColorSubconsciousReport result={result as GenericReportResult} />
  if (assessmentType === 'abm-love-animal')   return <AbmLoveAnimalReport result={result as GenericReportResult} />
  if (assessmentType === 'mental-age')        return <MentalAgeReport result={result as GenericReportResult} />
  if (assessmentType === 'sbti-personality')  return <SBTIPersonalityReport result={result as GenericReportResult} />

  return <DefaultReport result={result as GenericReportResult} />
}

function DefaultReport({ result }: { result: GenericReportResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{result.title || '测评完成'}</h2>
            <p className="text-white/60">综合得分: {result.score || '-'}</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.description || '感谢您完成测评'}</p>
      </motion.div>
    </div>
  )
}
