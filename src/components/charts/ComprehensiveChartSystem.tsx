import React from 'react'

interface Dimension {
  name: string
  score: number
  maxScore: number
  description?: string
}

interface ComprehensiveChartSystemProps {
  dimensions: Dimension[]
  overallScore: number
  assessmentType?: string
  ideologyScores?: Map<string, number>
  primaryIdeology?: string
  matchScore?: number
  title?: string
}

const ComprehensiveChartSystem: React.FC<ComprehensiveChartSystemProps> = ({
  dimensions,
  overallScore,
  title = '综合数据可视化'
}) => {
  return (
    <div className="glass rounded-3xl p-8">
      <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="text-center p-6 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl">
            <div className="text-4xl font-bold text-white mb-2">{overallScore}</div>
            <div className="text-white/60">综合得分</div>
          </div>
        </div>
        <div className="space-y-3">
          {dimensions.map((dim, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">{dim.name}</span>
                <span className="text-white">{dim.score}/{dim.maxScore}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                  style={{ width: `${(dim.score / dim.maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComprehensiveChartSystem
