import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeatmapData {
  xDimension: string
  yDimension: string
  value: number
  label?: string
}

interface DimensionHeatmapProps {
  data: HeatmapData[]
  title?: string
  xLabels?: string[]
  yLabels?: string[]
  colorScale?: 'blue' | 'violet' | 'green' | 'rainbow'
  showValues?: boolean
  animated?: boolean
  size?: number
  onCellClick?: (data: HeatmapData) => void
}

const colorScales = {
  blue: [
    { threshold: 0, color: 'rgba(59, 130, 246, 0.1)' },
    { threshold: 25, color: 'rgba(59, 130, 246, 0.3)' },
    { threshold: 50, color: 'rgba(59, 130, 246, 0.5)' },
    { threshold: 75, color: 'rgba(59, 130, 246, 0.7)' },
    { threshold: 100, color: 'rgba(59, 130, 246, 0.9)' },
  ],
  violet: [
    { threshold: 0, color: 'rgba(139, 92, 246, 0.1)' },
    { threshold: 25, color: 'rgba(139, 92, 246, 0.3)' },
    { threshold: 50, color: 'rgba(139, 92, 246, 0.5)' },
    { threshold: 75, color: 'rgba(139, 92, 246, 0.7)' },
    { threshold: 100, color: 'rgba(139, 92, 246, 0.9)' },
  ],
  green: [
    { threshold: 0, color: 'rgba(16, 185, 129, 0.1)' },
    { threshold: 25, color: 'rgba(16, 185, 129, 0.3)' },
    { threshold: 50, color: 'rgba(16, 185, 129, 0.5)' },
    { threshold: 75, color: 'rgba(16, 185, 129, 0.7)' },
    { threshold: 100, color: 'rgba(16, 185, 129, 0.9)' },
  ],
  rainbow: [
    { threshold: 0, color: 'rgba(239, 68, 68, 0.3)' },
    { threshold: 25, color: 'rgba(245, 158, 11, 0.5)' },
    { threshold: 50, color: 'rgba(16, 185, 129, 0.5)' },
    { threshold: 75, color: 'rgba(59, 130, 246, 0.7)' },
    { threshold: 100, color: 'rgba(139, 92, 246, 0.9)' },
  ],
}

export default function DimensionHeatmap({
  data,
  title,
  xLabels,
  yLabels,
  colorScale = 'violet',
  showValues = true,
  animated = true,
  size = 50,
  onCellClick,
}: DimensionHeatmapProps) {
  const [activeCell, setActiveCell] = useState<HeatmapData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), animated ? 300 : 0)
    return () => clearTimeout(timer)
  }, [animated])

  const { uniqueX, uniqueY, matrix } = useMemo(() => {
    const xSet = new Set<string>()
    const ySet = new Set<string>()
    
    data.forEach(d => {
      xSet.add(d.xDimension)
      ySet.add(d.yDimension)
    })

    const uniqueX = xLabels || Array.from(xSet)
    const uniqueY = yLabels || Array.from(ySet)
    
    const matrix: Map<string, HeatmapData> = new Map()
    data.forEach(d => {
      matrix.set(`${d.xDimension}-${d.yDimension}`, d)
    })

    return { uniqueX, uniqueY, matrix }
  }, [data, xLabels, yLabels])

  const getColor = (value: number) => {
    const scale = colorScales[colorScale]
    for (let i = scale.length - 1; i >= 0; i--) {
      if (value >= scale[i].threshold) {
        return scale[i].color
      }
    }
    return scale[0].color
  }

  const getContrastColor = (value: number) => {
    return value > 50 ? 'white' : 'rgba(255, 255, 255, 0.8)'
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

      <div className="overflow-x-auto">
        <div className="inline-block">
          <div className="flex">
            <div style={{ width: '100px' }} />
            {uniqueX.map((label, i) => (
              <motion.div
                key={label}
                initial={animated ? { opacity: 0, y: -10 } : {}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                style={{ width: size, minWidth: size }}
                className="text-center text-white/70 text-xs font-medium px-1"
              >
                {label}
              </motion.div>
            ))}
          </div>

          {uniqueY.map((yLabel, rowIndex) => (
            <div key={yLabel} className="flex items-center">
              <motion.div
                initial={animated ? { opacity: 0, x: -10 } : {}}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + rowIndex * 0.05 }}
                style={{ width: '100px' }}
                className="text-right text-white/70 text-xs font-medium pr-3"
              >
                {yLabel}
              </motion.div>
              
              {uniqueX.map((xLabel, colIndex) => {
                const cellData = matrix.get(`${xLabel}-${yLabel}`)
                const value = cellData?.value || 0
                const isActive = activeCell === cellData
                
                return (
                  <motion.div
                    key={`${xLabel}-${yLabel}`}
                    initial={animated ? { opacity: 0, scale: 0.8 } : {}}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (rowIndex * uniqueX.length + colIndex) * 0.02 }}
                    style={{ width: size, height: size, minWidth: size, minHeight: size }}
                    className={`relative flex items-center justify-center cursor-pointer transition-all ${
                      isActive ? 'z-10' : ''
                    }`}
                    onMouseEnter={() => cellData && setActiveCell(cellData)}
                    onMouseLeave={() => setActiveCell(null)}
                    onClick={() => cellData && onCellClick?.(cellData)}
                  >
                    <motion.div
                      className="absolute inset-1 rounded-lg"
                      style={{ backgroundColor: getColor(value) }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    />
                    
                    {showValues && cellData && (
                      <motion.span
                        className="relative z-10 text-xs font-semibold"
                        style={{ color: getContrastColor(value) }}
                        initial={animated ? { opacity: 0 } : {}}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + (rowIndex * uniqueX.length + colIndex) * 0.02 }}
                      >
                        {value}
                      </motion.span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={animated ? { opacity: 0, y: 20 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 flex items-center justify-center gap-4"
      >
        <span className="text-white/60 text-sm">低</span>
        <div className="flex gap-1">
          {colorScales[colorScale].map((scale, i) => (
            <motion.div
              key={i}
              initial={animated ? { opacity: 0, scale: 0 } : {}}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.05 }}
              className="w-8 h-4 rounded"
              style={{ backgroundColor: scale.color }}
            />
          ))}
        </div>
        <span className="text-white/60 text-sm">高</span>
      </motion.div>

      <AnimatePresence>
        {activeCell && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 glass rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/60 text-sm mb-1">
                  {activeCell.xDimension} × {activeCell.yDimension}
                </div>
                {activeCell.label && (
                  <div className="text-white font-semibold">{activeCell.label}</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-white text-2xl font-bold">{activeCell.value}</div>
                <div className="text-white/60 text-sm">相关度</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
