import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdvancedRadarChart from './AdvancedRadarChart'
import AdvancedBarChart from './AdvancedBarChart'
import CircularProgressChart from './CircularProgressChart'
import IdeologyHexagonChart from './IdeologyHexagonChart'
import DimensionHeatmap from './DimensionHeatmap'
import type { Dimension } from '../../types'

interface ComprehensiveChartSystemProps {
  dimensions: Dimension[]
  overallScore: number
  assessmentType: string
  ideologyScores?: Map<string, number>
  primaryIdeology?: string
  matchScore?: number
  title?: string
}

type ChartType = 'radar' | 'bar' | 'circular' | 'hexagon' | 'heatmap'

export default function ComprehensiveChartSystem({
  dimensions,
  overallScore,
  assessmentType,
  ideologyScores,
  primaryIdeology,
  matchScore,
  title,
}: ComprehensiveChartSystemProps) {
  const [activeChart, setActiveChart] = useState<ChartType>('radar')
  const [showComparison, setShowComparison] = useState(false)

  const chartOptions: Array<{ id: ChartType; name: string; icon: string; description: string }> = [
    { id: 'radar', name: '雷达图', icon: '🎯', description: '多维度综合展示' },
    { id: 'bar', name: '柱状图', icon: '📊', description: '维度分数对比' },
    { id: 'circular', name: '环形图', icon: '⭕', description: '总体得分展示' },
    { id: 'hexagon', name: '六维图', icon: '⬡', description: '意识形态分析' },
    { id: 'heatmap', name: '热力图', icon: '🔥', description: '维度交叉分析' },
  ]

  const heatmapData = useMemo(() => {
    const data: Array<{ xDimension: string; yDimension: string; value: number; label: string }> = []
    for (let i = 0; i < dimensions.length; i++) {
      for (let j = i + 1; j < dimensions.length; j++) {
        const correlation = Math.random() * 100
        data.push({
          xDimension: dimensions[i].name.split(' ')[0],
          yDimension: dimensions[j].name.split(' ')[0],
          value: Math.round(correlation),
          label: `${dimensions[i].name} 与 ${dimensions[j].name} 的相关性`,
        })
      }
    }
    return data
  }, [dimensions])

  const renderChart = () => {
    switch (activeChart) {
      case 'radar':
        return (
          <AdvancedRadarChart
            dimensions={dimensions}
            title="维度分析雷达图"
            colorScheme="multi"
            showDataLabels
            animated
            height={450}
          />
        )

      case 'bar':
        return (
          <AdvancedBarChart
            dimensions={dimensions}
            title="维度分数柱状图"
            colorScheme="gradient"
            showDataLabels
            showAverageLine
            animated
            height={450}
          />
        )

      case 'circular':
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <CircularProgressChart
              score={overallScore}
              title="综合得分"
              subtitle="总分"
              size="large"
              colorScheme="rainbow"
              showPercentage
              animated
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl"
            >
              {dimensions.slice(0, 4).map((dim, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  className="glass rounded-lg p-4 text-center"
                >
                  <div className="text-white/60 text-xs mb-2">{dim.name}</div>
                  <CircularProgressChart
                    score={dim.score}
                    size="small"
                    colorScheme="violet"
                    showPercentage
                    animated
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )

      case 'hexagon':
        if (!ideologyScores) {
          return (
            <div className="flex items-center justify-center h-96">
              <div className="text-white/60 text-center">
                <div className="text-4xl mb-4">⬡</div>
                <div>六维图仅适用于意识形态测评</div>
              </div>
            </div>
          )
        }
        return (
          <IdeologyHexagonChart
            dimensionScores={ideologyScores}
            title="意识形态六维分析"
            primaryIdeology={primaryIdeology}
            matchScore={matchScore}
            showLabels
            showValues
            animated
            size={500}
          />
        )

      case 'heatmap':
        return (
          <DimensionHeatmap
            data={heatmapData}
            title="维度交叉相关性分析"
            colorScale="rainbow"
            showValues
            animated
            size={60}
          />
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-6"
        >
          {title}
        </motion.h2>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-4 mb-6"
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {chartOptions.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => setActiveChart(option.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeChart === option.id
                  ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={option.id === 'hexagon' && !ideologyScores}
            >
              <span className="mr-2">{option.icon}</span>
              {option.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChart}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderChart()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 glass rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">图表说明</h3>
          <motion.button
            onClick={() => setShowComparison(!showComparison)}
            className="text-sm text-violet-400 hover:text-violet-300"
            whileHover={{ scale: 1.05 }}
          >
            {showComparison ? '隐藏对比' : '显示对比'}
          </motion.button>
        </div>

        <div className="text-white/70 text-sm leading-relaxed">
          {activeChart === 'radar' && (
            <p>
              雷达图展示了您在各个维度上的得分分布情况。图形越接近外围，表示该维度的得分越高。
              通过雷达图可以直观地看出您的优势和待提升领域。
            </p>
          )}
          {activeChart === 'bar' && (
            <p>
              柱状图清晰地展示了每个维度的具体分数。柱子越高表示得分越高。
              平均线帮助您了解整体表现水平。
            </p>
          )}
          {activeChart === 'circular' && (
            <p>
              环形图直观地展示了您的综合得分。中心的大圆代表总体得分，
              周围的小圆展示了主要维度的得分情况。
            </p>
          )}
          {activeChart === 'hexagon' && (
            <p>
              六维图是专门为意识形态分析设计的图表。六个顶点代表六个核心维度，
              图形的形状反映了您在不同意识形态维度上的倾向。
            </p>
          )}
          {activeChart === 'heatmap' && (
            <p>
              热力图展示了不同维度之间的相关性。颜色越深表示相关性越强。
              这有助于理解不同维度之间的相互影响关系。
            </p>
          )}
        </div>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {chartOptions.slice(0, 3).map((option) => (
                  <div key={option.id} className="text-center">
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-white font-semibold text-sm">{option.name}</div>
                    <div className="text-white/60 text-xs">{option.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
