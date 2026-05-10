import { motion } from 'framer-motion'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import DOMPurify from 'dompurify'

interface EnhancedReportSection {
  id: string
  title: string
  type: 'cover-card' | 'data-visualization' | 'analysis-section'
  variant?: string
  chartType?: 'radar' | 'bar' | 'gauge'
  content?: string
  dimensions?: string[]
  dimensionNames?: Record<string, string>
}

interface EnhancedReportProps {
  result: any
  assessment: {
    resultInterpretation?: {
      templateType: string
      sections: EnhancedReportSection[]
    }
  }
}

function EnhancedReportTemplate({ result, assessment }: EnhancedReportProps) {
  const sections = assessment?.resultInterpretation?.sections || []

  const renderContent = (content: string) => {
    try {
      return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { USE_PROFILES: { html: true }, ALLOWED_TAGS: ['div', 'span', 'p', 'strong', 'em', 'b', 'i', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }) }} />
    } catch {
      return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { USE_PROFILES: { html: true }, ALLOWED_TAGS: ['div', 'span', 'p', 'strong', 'em', 'b', 'i', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }) }} />
    }
  }

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {section.type === 'cover-card' && (
            <div className="mb-6">
              {renderContent(section.content || '')}
            </div>
          )}

          {section.type === 'data-visualization' && (
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">{section.title}</h3>
              
              {section.chartType === 'radar' && result.dimensionResults && (
                <div className="h-72 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={Object.entries(result.dimensionResults || {}).map(([key, val]: [string, any]) => ({
                      dimension: section.dimensionNames?.[key] || key,
                      score: val.score || 50
                    }))}>
                      <PolarGrid stroke="#475569" />
                      <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Radar name="得分" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              {renderContent(section.content || '')}
            </div>
          )}

          {section.type === 'analysis-section' && (
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">{section.title}</h3>
              {renderContent(section.content || '')}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default EnhancedReportTemplate
