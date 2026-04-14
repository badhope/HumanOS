import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  AdvancedRadarChart,
  AdvancedBarChart,
  CircularProgressChart,
  IdeologyHexagonChart,
  DimensionHeatmap,
  ComprehensiveChartSystem,
} from '../components/charts'

const sampleDimensions = [
  { name: '经济制度', score: 72, maxScore: 100, description: '倾向于混合经济模式' },
  { name: '政治权力', score: 65, maxScore: 100, description: '支持民主制度' },
  { name: '社会结构', score: 78, maxScore: 100, description: '重视社会公平' },
  { name: '文化价值', score: 58, maxScore: 100, description: '传统与现代并重' },
  { name: '国际关系', score: 83, maxScore: 100, description: '主张国际合作' },
  { name: '技术态度', score: 91, maxScore: 100, description: '积极拥抱新技术' },
]

const sampleHeatmapData = [
  { xDimension: '经济', yDimension: '政治', value: 75, label: '经济-政治相关性' },
  { xDimension: '经济', yDimension: '社会', value: 82, label: '经济-社会相关性' },
  { xDimension: '经济', yDimension: '文化', value: 45, label: '经济-文化相关性' },
  { xDimension: '政治', yDimension: '社会', value: 88, label: '政治-社会相关性' },
  { xDimension: '政治', yDimension: '文化', value: 67, label: '政治-文化相关性' },
  { xDimension: '社会', yDimension: '文化', value: 91, label: '社会-文化相关性' },
]

export default function ChartShowcase() {
  const [activeSection, setActiveSection] = useState('comprehensive')

  const ideologyScores = useMemo(() => {
    const scores = new Map<string, number>()
    sampleDimensions.forEach(dim => {
      const id = dim.name.includes('经济') ? 'economic' 
        : dim.name.includes('政治') ? 'political'
        : dim.name.includes('社会') ? 'social'
        : dim.name.includes('文化') ? 'cultural'
        : dim.name.includes('国际') ? 'international'
        : 'technology'
      scores.set(id, dim.score)
    })
    return scores
  }, [])

  const sections = [
    { id: 'comprehensive', name: '综合图表系统', icon: '📊' },
    { id: 'radar', name: '高级雷达图', icon: '🎯' },
    { id: 'bar', name: '高级柱状图', icon: '📈' },
    { id: 'circular', name: '环形进度图', icon: '⭕' },
    { id: 'hexagon', name: '六维极坐标图', icon: '⬡' },
    { id: 'heatmap', name: '维度热力图', icon: '🔥' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">高级图表系统展示</h1>
          <p className="text-white/60">专业级数据可视化解决方案，提供美观、准确、数据丰富的图表展示</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{section.icon}</span>
                {section.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'comprehensive' && (
            <ComprehensiveChartSystem
              dimensions={sampleDimensions}
              overallScore={74}
              assessmentType="ideology"
              ideologyScores={ideologyScores}
              primaryIdeology="社会民主主义"
              matchScore={85}
              title="综合数据可视化"
            />
          )}

          {activeSection === 'radar' && (
            <div className="glass rounded-3xl p-8">
              <AdvancedRadarChart
                dimensions={sampleDimensions}
                title="多维度雷达分析"
                colorScheme="multi"
                showDataLabels
                showLegend
                animated
                height={500}
              />
            </div>
          )}

          {activeSection === 'bar' && (
            <div className="glass rounded-3xl p-8">
              <AdvancedBarChart
                dimensions={sampleDimensions}
                title="维度分数柱状分析"
                colorScheme="gradient"
                showDataLabels
                showAverageLine
                animated
                height={500}
              />
            </div>
          )}

          {activeSection === 'circular' && (
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-8 text-center">环形进度图展示</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <CircularProgressChart
                    score={74}
                    title="综合得分"
                    subtitle="总分"
                    size="large"
                    colorScheme="rainbow"
                    showPercentage
                    animated
                  />
                </div>
                <div className="flex flex-col items-center">
                  <CircularProgressChart
                    score={91}
                    title="技术态度"
                    subtitle="高分项"
                    size="large"
                    colorScheme="green"
                    showPercentage
                    animated
                  />
                </div>
                <div className="flex flex-col items-center">
                  <CircularProgressChart
                    score={58}
                    title="文化价值"
                    subtitle="待提升"
                    size="large"
                    colorScheme="amber"
                    showPercentage
                    animated
                  />
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-4">
                {sampleDimensions.map((dim, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="glass rounded-lg p-4 flex flex-col items-center"
                  >
                    <CircularProgressChart
                      score={dim.score}
                      size="small"
                      colorScheme="violet"
                      showPercentage
                      animated
                    />
                    <div className="text-white/70 text-xs mt-2 text-center">{dim.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'hexagon' && (
            <div className="glass rounded-3xl p-8">
              <IdeologyHexagonChart
                dimensionScores={ideologyScores}
                title="意识形态六维分析"
                primaryIdeology="社会民主主义"
                matchScore={85}
                showLabels
                showValues
                animated
                size={600}
              />
            </div>
          )}

          {activeSection === 'heatmap' && (
            <div className="glass rounded-3xl p-8">
              <DimensionHeatmap
                data={sampleHeatmapData}
                title="维度交叉相关性热力图"
                colorScale="rainbow"
                showValues
                animated
                size={80}
              />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">图表系统特性</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-violet-400 font-semibold mb-2">🎨 视觉精美</div>
              <p className="text-white/70 text-sm">采用渐变色彩、动画效果和现代化设计，提供专业级的视觉体验</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-pink-400 font-semibold mb-2">📊 数据丰富</div>
              <p className="text-white/70 text-sm">支持多种数据展示方式，包括数值、百分比、标签等，信息呈现完整</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-cyan-400 font-semibold mb-2">⚡ 交互流畅</div>
              <p className="text-white/70 text-sm">支持悬停、点击等交互操作，动画过渡自然流畅，用户体验优秀</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
