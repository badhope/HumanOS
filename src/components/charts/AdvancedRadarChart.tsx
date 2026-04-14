import React, { useMemo, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import type { Dimension } from '../../types'

interface AdvancedRadarChartProps {
  dimensions: Dimension[]
  title?: string
  showLegend?: boolean
  animated?: boolean
  colorScheme?: 'violet' | 'blue' | 'green' | 'amber' | 'multi'
  showDataLabels?: boolean
  showGridLines?: boolean
  height?: number
}

const colorSchemes = {
  violet: {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    gradient: ['#8b5cf6', '#a78bfa', '#c4b5fd'],
    fill: 'rgba(139, 92, 246, 0.3)',
    stroke: '#8b5cf6',
  },
  blue: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    gradient: ['#3b82f6', '#60a5fa', '#93c5fd'],
    fill: 'rgba(59, 130, 246, 0.3)',
    stroke: '#3b82f6',
  },
  green: {
    primary: '#10b981',
    secondary: '#34d399',
    gradient: ['#10b981', '#34d399', '#6ee7b7'],
    fill: 'rgba(16, 185, 129, 0.3)',
    stroke: '#10b981',
  },
  amber: {
    primary: '#f59e0b',
    secondary: '#fbbf24',
    gradient: ['#f59e0b', '#fbbf24', '#fcd34d'],
    fill: 'rgba(245, 158, 11, 0.3)',
    stroke: '#f59e0b',
  },
  multi: {
    primary: '#8b5cf6',
    secondary: '#ec4899',
    gradient: ['#8b5cf6', '#ec4899', '#06b6d4'],
    fill: 'rgba(139, 92, 246, 0.3)',
    stroke: '#8b5cf6',
  },
}

export default function AdvancedRadarChart({
  dimensions,
  title,
  showLegend = false,
  animated = true,
  colorScheme = 'violet',
  showDataLabels = true,
  showGridLines = true,
  height = 400,
}: AdvancedRadarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), animated ? 500 : 0)
    return () => clearTimeout(timer)
  }, [animated])

  const colors = colorSchemes[colorScheme]

  const radarData = useMemo(() => {
    return dimensions.map((dim, index) => ({
      dimension: dim.name,
      score: dim.score,
      fullMark: dim.maxScore || 100,
      description: dim.description,
      fill: colors.gradient[index % colors.gradient.length],
    }))
  }, [dimensions, colors])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-4 border border-white/20 shadow-xl"
        >
          <p className="text-white font-semibold text-lg mb-1">{data.dimension}</p>
          <p className="text-white/90 text-2xl font-bold mb-2">
            {data.score}
            <span className="text-white/60 text-sm ml-1">/ {data.fullMark}</span>
          </p>
          {data.description && (
            <p className="text-white/70 text-sm">{data.description}</p>
          )}
        </motion.div>
      )
    }
    return null
  }

  const CustomPolarAngleAxis = ({ payload, x, y, cx, cy, ...props }: any) => {
    const isActive = activeIndex !== null && radarData[activeIndex]?.dimension === payload.value

    return (
      <g>
        <text
          x={x}
          y={y}
          textAnchor="middle"
          fill={isActive ? colors.primary : 'rgba(255, 255, 255, 0.7)'}
          fontSize={isActive ? 14 : 12}
          fontWeight={isActive ? 'bold' : 'normal'}
          className="transition-all duration-300"
        >
          {payload.value}
        </text>
      </g>
    )
  }

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.95 } : {}}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {title && (
        <motion.h3
          initial={animated ? { opacity: 0, y: -10 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-white mb-6 text-center"
        >
          {title}
        </motion.h3>
      )}

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={radarData}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <defs>
              <linearGradient id={`radarGradient-${colorScheme}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={colors.gradient[0]} stopOpacity={0.8} />
                <stop offset="50%" stopColor={colors.gradient[1]} stopOpacity={0.6} />
                <stop offset="100%" stopColor={colors.gradient[2]} stopOpacity={0.4} />
              </linearGradient>
              <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="radarShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor={colors.primary} floodOpacity="0.3" />
              </filter>
            </defs>

            {showGridLines && (
              <PolarGrid
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={1}
                radialLines={true}
                strokeDasharray="3 3"
              />
            )}

            <PolarAngleAxis
              dataKey="dimension"
              tick={(props) => <CustomPolarAngleAxis {...props} />}
              tickLine={false}
            />

            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }}
              tickCount={5}
              stroke="rgba(255, 255, 255, 0.1)"
            />

            <Radar
              name="得分"
              dataKey="score"
              stroke={`url(#radarGradient-${colorScheme})`}
              fill={`url(#radarGradient-${colorScheme})`}
              fillOpacity={0.6}
              strokeWidth={3}
              dot={(props: any) => {
                const { cx, cy, payload } = props
                const isActive = activeIndex !== null && radarData[activeIndex]?.dimension === payload.dimension

                return (
                  <g>
                    <motion.circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? 8 : 5}
                      fill={colors.primary}
                      stroke="white"
                      strokeWidth={2}
                      initial={animated ? { scale: 0 } : {}}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      filter="url(#radarGlow)"
                    />
                    {showDataLabels && (
                      <motion.text
                        x={cx}
                        y={cy - 15}
                        textAnchor="middle"
                        fill="white"
                        fontSize={isActive ? 14 : 11}
                        fontWeight={isActive ? 'bold' : 'normal'}
                        initial={animated ? { opacity: 0 } : {}}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        {payload.score}
                      </motion.text>
                    )}
                  </g>
                )
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            {showLegend && (
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-white/80">{value}</span>}
              />
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {showDataLabels && (
        <motion.div
          initial={animated ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
        >
          {radarData.map((data, index) => (
            <motion.div
              key={index}
              initial={animated ? { opacity: 0, scale: 0.8 } : {}}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.05 }}
              className="glass rounded-lg p-3 text-center hover:scale-105 transition-transform cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="text-white/60 text-xs mb-1">{data.dimension}</div>
              <div className="text-white font-bold text-lg">{data.score}</div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
