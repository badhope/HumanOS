import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IdeologyHexagonChartProps {
  dimensionScores: Map<string, number>
  title?: string
  showLabels?: boolean
  showValues?: boolean
  animated?: boolean
  size?: number
  primaryIdeology?: string
  matchScore?: number
}

export default function IdeologyHexagonChart({
  dimensionScores,
  title,
  showLabels = true,
  showValues = true,
  animated = true,
  size = 400,
  primaryIdeology,
  matchScore,
}: IdeologyHexagonChartProps) {
  const [activeDimension, setActiveDimension] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), animated ? 500 : 0)
    return () => clearTimeout(timer)
  }, [animated])

  const hexagonData = useMemo(() => {
    const dimensions = [
      { id: 'economic', name: '经济制度', icon: '💰', description: '政府与市场的关系，从计划经济到自由放任' },
      { id: 'political', name: '政治权力', icon: '⚖️', description: '权力集中与分散的平衡，威权与民主的光谱' },
      { id: 'social', name: '社会结构', icon: '👥', description: '平等与等级，个体与集体的价值取向' },
      { id: 'cultural', name: '文化价值', icon: '📜', description: '传统与进步，保守与开放的文化立场' },
      { id: 'international', name: '国际关系', icon: '🌐', description: '民族主义与全球主义，孤立与合作的选择' },
      { id: 'technology', name: '技术态度', icon: '🔬', description: '对科技进步的乐观与审慎，加速与限制' },
    ]

    return dimensions.map((dim, index) => {
      const score = dimensionScores.get(dim.id) || 50
      const angle = (index * 60 - 90) * (Math.PI / 180)
      const radius = (score / 100) * (size / 2 - 60)

      return {
        ...dim,
        score,
        angle,
        radius,
        x: (size / 2) + radius * Math.cos(angle),
        y: (size / 2) + radius * Math.sin(angle),
        labelX: (size / 2) + ((size / 2 - 30) * Math.cos(angle)),
        labelY: (size / 2) + ((size / 2 - 30) * Math.sin(angle)),
      }
    })
  }, [dimensionScores, size])

  const hexagonPath = useMemo(() => {
    if (hexagonData.length === 0) return ''
    
    const points = hexagonData.map(d => `${d.x},${d.y}`)
    return `M ${points.join(' L ')} Z`
  }, [hexagonData])

  const gridLines = useMemo(() => {
    const lines: Array<Array<{ x: number; y: number }>> = []
    for (let i = 1; i <= 5; i++) {
      const radius = (i / 5) * (size / 2 - 60)
      const points: Array<{ x: number; y: number }> = []
      for (let j = 0; j < 6; j++) {
        const angle = (j * 60 - 90) * (Math.PI / 180)
        points.push({
          x: (size / 2) + radius * Math.cos(angle),
          y: (size / 2) + radius * Math.sin(angle),
        })
      }
      lines.push(points)
    }
    return lines
  }, [size])

  const axisLines = useMemo(() => {
    return hexagonData.map(d => ({
      x1: size / 2,
      y1: size / 2,
      x2: (size / 2) + ((size / 2 - 60) * Math.cos(d.angle)),
      y2: (size / 2) + ((size / 2 - 60) * Math.sin(d.angle)),
    }))
  }, [hexagonData, size])

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.9 } : {}}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
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

      {primaryIdeology && (
        <motion.div
          initial={animated ? { opacity: 0, y: -10 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 text-center"
        >
          <div className="glass rounded-xl px-6 py-3 inline-block">
            <div className="text-white/60 text-sm mb-1">主要意识形态</div>
            <div className="text-white font-bold text-lg">{primaryIdeology}</div>
            {matchScore !== undefined && (
              <div className="text-violet-400 text-sm mt-1">匹配度: {Math.round(matchScore)}%</div>
            )}
          </div>
        </motion.div>
      )}

      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <defs>
            <linearGradient id="hexagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6} />
              <stop offset="50%" stopColor="#ec4899" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.6} />
            </linearGradient>
            <filter id="hexagonGlow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hexagonShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(139, 92, 246, 0.3)" />
            </filter>
          </defs>

          {gridLines.map((line, i) => (
            <motion.path
              key={i}
              d={`M ${line.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ')} Z`}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={1}
              initial={animated ? { opacity: 0 } : {}}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
            />
          ))}

          {axisLines.map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth={1}
              strokeDasharray="4 4"
              initial={animated ? { pathLength: 0 } : {}}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
            />
          ))}

          <motion.path
            d={hexagonPath}
            fill="url(#hexagonGradient)"
            stroke="url(#hexagonGradient)"
            strokeWidth={3}
            filter="url(#hexagonGlow)"
            initial={animated ? { opacity: 0, scale: 0.5 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
          />

          {hexagonData.map((data, index) => {
            const isActive = activeDimension === data.id
            return (
              <g key={data.id}>
                <motion.circle
                  cx={data.x}
                  cy={data.y}
                  r={isActive ? 12 : 8}
                  fill="white"
                  stroke={isActive ? '#8b5cf6' : '#a78bfa'}
                  strokeWidth={isActive ? 3 : 2}
                  filter="url(#hexagonShadow)"
                  initial={animated ? { scale: 0 } : {}}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActiveDimension(data.id)}
                  onMouseLeave={() => setActiveDimension(null)}
                />

                {showValues && (
                  <motion.text
                    x={data.x}
                    y={data.y - 18}
                    textAnchor="middle"
                    fill="white"
                    fontSize={isActive ? 14 : 11}
                    fontWeight={isActive ? 'bold' : 'normal'}
                    initial={animated ? { opacity: 0 } : {}}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {data.score}
                  </motion.text>
                )}
              </g>
            )
          })}

          {showLabels && hexagonData.map((data, index) => {
            const isActive = activeDimension === data.id
            const textAnchor = data.labelX > size / 2 ? 'start' : data.labelX < size / 2 ? 'end' : 'middle'
            
            return (
              <motion.g
                key={`label-${data.id}`}
                initial={animated ? { opacity: 0 } : {}}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + index * 0.05 }}
              >
                <text
                  x={data.labelX}
                  y={data.labelY}
                  textAnchor={textAnchor}
                  fill={isActive ? 'white' : 'rgba(255, 255, 255, 0.7)'}
                  fontSize={isActive ? 14 : 12}
                  fontWeight={isActive ? 'bold' : 'normal'}
                  className="select-none"
                >
                  <tspan>{data.icon} </tspan>
                  <tspan>{data.name}</tspan>
                </text>
              </motion.g>
            )
          })}
        </svg>

        <AnimatePresence>
          {activeDimension && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass rounded-xl p-4 pointer-events-none"
              style={{ minWidth: '200px' }}
            >
              {(() => {
                const active = hexagonData.find(d => d.id === activeDimension)
                if (!active) return null
                
                return (
                  <div>
                    <div className="text-white font-bold text-lg mb-2">
                      {active.icon} {active.name}
                    </div>
                    <div className="text-white text-3xl font-bold mb-2">{active.score}</div>
                    {active.description && (
                      <div className="text-white/70 text-sm">{active.description}</div>
                    )}
                  </div>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={animated ? { opacity: 0, y: 20 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {hexagonData.map((data, index) => (
          <motion.div
            key={data.id}
            initial={animated ? { opacity: 0, scale: 0.8 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 + index * 0.05 }}
            className="glass rounded-lg p-3 text-center hover:scale-105 transition-transform cursor-pointer"
            onMouseEnter={() => setActiveDimension(data.id)}
            onMouseLeave={() => setActiveDimension(null)}
          >
            <div className="text-white/60 text-xs mb-1">{data.icon} {data.name}</div>
            <div className="text-white font-bold text-lg">{data.score}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
