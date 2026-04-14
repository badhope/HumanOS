import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CircularProgressChartProps {
  score: number
  maxScore?: number
  title?: string
  subtitle?: string
  size?: 'small' | 'medium' | 'large'
  colorScheme?: 'violet' | 'blue' | 'green' | 'amber' | 'red' | 'rainbow'
  showPercentage?: boolean
  showScore?: boolean
  animated?: boolean
  thickness?: number
}

const sizeConfig = {
  small: { diameter: 120, fontSize: 32, strokeWidth: 8 },
  medium: { diameter: 180, fontSize: 48, strokeWidth: 12 },
  large: { diameter: 240, fontSize: 64, strokeWidth: 16 },
}

const colorSchemes = {
  violet: { start: '#8b5cf6', end: '#a78bfa', glow: 'rgba(139, 92, 246, 0.5)' },
  blue: { start: '#3b82f6', end: '#60a5fa', glow: 'rgba(59, 130, 246, 0.5)' },
  green: { start: '#10b981', end: '#34d399', glow: 'rgba(16, 185, 129, 0.5)' },
  amber: { start: '#f59e0b', end: '#fbbf24', glow: 'rgba(245, 158, 11, 0.5)' },
  red: { start: '#ef4444', end: '#f87171', glow: 'rgba(239, 68, 68, 0.5)' },
  rainbow: { start: '#8b5cf6', end: '#ec4899', glow: 'rgba(139, 92, 246, 0.5)' },
}

export default function CircularProgressChart({
  score,
  maxScore = 100,
  title,
  subtitle,
  size = 'medium',
  colorScheme = 'violet',
  showPercentage = true,
  showScore = false,
  animated = true,
  thickness,
}: CircularProgressChartProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), animated ? 300 : 0)
    return () => clearTimeout(timer)
  }, [animated])

  const config = sizeConfig[size]
  const colors = colorSchemes[colorScheme]
  const percentage = Math.round((score / maxScore) * 100)
  const radius = (config.diameter - config.strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  const actualThickness = thickness || config.strokeWidth

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return colorSchemes.green
    if (percentage >= 70) return colorSchemes.blue
    if (percentage >= 50) return colorSchemes.amber
    return colorSchemes.red
  }

  const gradeColors = colorScheme === 'rainbow' ? getGradeColor(percentage) : colors

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="flex flex-col items-center justify-center"
    >
      <div className="relative" style={{ width: config.diameter, height: config.diameter }}>
        <svg
          width={config.diameter}
          height={config.diameter}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id={`progressGradient-${colorScheme}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradeColors.start} />
              <stop offset="100%" stopColor={gradeColors.end} />
            </linearGradient>
            <filter id={`progressGlow-${colorScheme}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`progressShadow-${colorScheme}`}>
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor={gradeColors.glow} />
            </filter>
          </defs>

          <circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={actualThickness}
            fill="none"
          />

          <motion.circle
            cx={config.diameter / 2}
            cy={config.diameter / 2}
            r={radius}
            stroke={`url(#progressGradient-${colorScheme})`}
            strokeWidth={actualThickness}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={animated ? { strokeDashoffset: circumference } : { strokeDashoffset }}
            animate={{ strokeDashoffset: isLoaded ? strokeDashoffset : circumference }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
            filter={`url(#progressGlow-${colorScheme})`}
          />

          {isLoaded && (
            <motion.circle
              cx={config.diameter / 2 + radius * Math.cos((percentage / 100) * 2 * Math.PI - Math.PI / 2)}
              cy={config.diameter / 2 + radius * Math.sin((percentage / 100) * 2 * Math.PI - Math.PI / 2)}
              r={actualThickness / 2 + 2}
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.7, duration: 0.3 }}
              filter={`url(#progressShadow-${colorScheme})`}
            />
          )}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={animated ? { opacity: 0, scale: 0.5 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center"
          >
            {showScore ? (
              <div className="text-white font-bold" style={{ fontSize: config.fontSize }}>
                {score}
              </div>
            ) : (
              <div className="text-white font-bold" style={{ fontSize: config.fontSize }}>
                {percentage}
                {showPercentage && <span className="text-2xl">%</span>}
              </div>
            )}
            {subtitle && (
              <div className="text-white/60 text-sm mt-1">{subtitle}</div>
            )}
          </motion.div>
        </div>
      </div>

      {title && (
        <motion.h3
          initial={animated ? { opacity: 0, y: 10 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-white font-semibold text-lg mt-4 text-center"
        >
          {title}
        </motion.h3>
      )}

      <motion.div
        initial={animated ? { opacity: 0 } : {}}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-3 flex items-center gap-2"
      >
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={animated ? { opacity: 0, scale: 0 } : {}}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 + i * 0.1 }}
              className={`w-2 h-2 rounded-full ${
                i < Math.ceil(percentage / 20)
                  ? 'bg-gradient-to-r from-violet-500 to-pink-500'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
        <span className="text-white/60 text-xs">
          {percentage >= 90 ? '优秀' : percentage >= 70 ? '良好' : percentage >= 50 ? '中等' : '待提升'}
        </span>
      </motion.div>
    </motion.div>
  )
}
