import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts'
import type { Dimension } from '../../types'

interface AdvancedBarChartProps {
  dimensions: Dimension[]
  title?: string
  layout?: 'horizontal' | 'vertical'
  animated?: boolean
  colorScheme?: 'gradient' | 'solid' | 'rainbow'
  showDataLabels?: boolean
  showGridLines?: boolean
  showAverageLine?: boolean
  height?: number
  barSize?: number
  borderRadius?: number
}

const gradientColors = [
  { start: '#8b5cf6', end: '#a78bfa' },
  { start: '#ec4899', end: '#f472b6' },
  { start: '#06b6d4', end: '#22d3ee' },
  { start: '#10b981', end: '#34d399' },
  { start: '#f59e0b', end: '#fbbf24' },
  { start: '#ef4444', end: '#f87171' },
  { start: '#3b82f6', end: '#60a5fa' },
  { start: '#84cc16', end: '#a3e635' },
]

const solidColors = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#84cc16']

export default function AdvancedBarChart({
  dimensions,
  title,
  layout = 'horizontal',
  animated = true,
  colorScheme = 'gradient',
  showDataLabels = true,
  showGridLines = true,
  showAverageLine = true,
  height = 400,
  barSize = 40,
  borderRadius = 8,
}: AdvancedBarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), animated ? 300 : 0)
    return () => clearTimeout(timer)
  }, [animated])

  const barData = useMemo(() => {
    return dimensions.map((dim, index) => ({
      name: dim.name,
      score: dim.score,
      maxScore: dim.maxScore || 100,
      description: dim.description,
      percentage: Math.round((dim.score / (dim.maxScore || 100)) * 100),
      colorIndex: index,
    }))
  }, [dimensions])

  const averageScore = useMemo(() => {
    const total = barData.reduce((sum, item) => sum + item.percentage, 0)
    return Math.round(total / barData.length)
  }, [barData])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-4 border border-white/20 shadow-xl min-w-[200px]"
        >
          <p className="text-white font-semibold text-lg mb-1">{data.name}</p>
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-white text-3xl font-bold">{data.score}</p>
            <p className="text-white/60 text-sm">/ {data.maxScore}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.percentage}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
              />
            </div>
            <span className="text-white/80 text-sm font-semibold">{data.percentage}%</span>
          </div>
          {data.description && (
            <p className="text-white/70 text-sm mt-2">{data.description}</p>
          )}
        </motion.div>
      )
    }
    return null
  }

  const CustomBar = (props: any) => {
    const { x, y, width, height, payload, index } = props
    const isActive = activeIndex === index
    const colors = colorScheme === 'rainbow' 
      ? gradientColors[index % gradientColors.length]
      : gradientColors[0]

    return (
      <g>
        <defs>
          <linearGradient id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.start} stopOpacity={isActive ? 1 : 0.8} />
            <stop offset="100%" stopColor={colors.end} stopOpacity={isActive ? 0.8 : 0.6} />
          </linearGradient>
          <filter id={`barShadow-${index}`}>
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={colors.start} floodOpacity={isActive ? 0.5 : 0.3} />
          </filter>
        </defs>
        <motion.rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={borderRadius}
          ry={borderRadius}
          fill={`url(#barGradient-${index})`}
          filter={`url(#barShadow-${index})`}
          initial={animated ? { scaleY: 0, originY: 1 } : {}}
          animate={{ scaleY: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.02 }}
          style={{ transformOrigin: 'bottom' }}
        />
      </g>
    )
  }

  return (
    <motion.div
      initial={animated ? { opacity: 0 } : {}}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {title && (
        <motion.h3
          initial={animated ? { opacity: 0, y: -10 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-white mb-6"
        >
          {title}
        </motion.h3>
      )}

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            layout={layout}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="barGradientDefault" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            {showGridLines && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
                vertical={layout === 'horizontal'}
                horizontal={layout === 'vertical'}
              />
            )}

            {layout === 'horizontal' ? (
              <>
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  tickLine={false}
                />
              </>
            ) : (
              <>
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  tickLine={false}
                  width={120}
                />
              </>
            )}

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />

            <Bar
              dataKey="percentage"
              shape={<CustomBar />}
              barSize={barSize}
            >
              {showDataLabels && (
                <LabelList
                  dataKey="percentage"
                  position="top"
                  formatter={(value: number) => `${value}%`}
                  fill="rgba(255, 255, 255, 0.8)"
                  fontSize={12}
                  fontWeight="bold"
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {showAverageLine && (
        <motion.div
          initial={animated ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 glass rounded-lg p-4 flex items-center justify-between"
        >
          <span className="text-white/70">平均得分</span>
          <div className="flex items-center gap-3">
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${averageScore}%` }}
                transition={{ delay: 1, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
              />
            </div>
            <span className="text-white font-bold text-lg">{averageScore}%</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
