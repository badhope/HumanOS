import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface PersonalityRadarProps {
  data: {
    label: string
    value: number
    max?: number
  }[]
  size?: number
  showLabels?: boolean
}

export default function PersonalityRadar({ data, size = 300, showLabels = true }: PersonalityRadarProps) {
  const center = size / 2
  const maxRadius = size / 2 - 40

  const points = useMemo(() => {
    const angleStep = (2 * Math.PI) / data.length
    return data.map((item, index) => {
      const angle = index * angleStep - Math.PI / 2
      const value = item.value / (item.max || 100)
      const radius = value * maxRadius
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
        label: item.label,
        value: item.value,
      }
    })
  }, [data, center, maxRadius])

  const gridLevels = [0.25, 0.5, 0.75, 1]

  const getPolygonPoints = (level: number) => {
    const angleStep = (2 * Math.PI) / data.length
    return data.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2
      const radius = level * maxRadius
      return `${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`
    }).join(' ')
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        {gridLevels.map((level, i) => (
          <polygon
            key={i}
            points={getPolygonPoints(level)}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {data.map((_, index) => {
          const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2
          const x = center + maxRadius * Math.cos(angle)
          const y = center + maxRadius * Math.sin(angle)
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          )
        })}

        <polygon
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="url(#radarGradient)"
          fillOpacity="0.3"
          stroke="url(#radarGradient)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#8b5cf6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </svg>

      {showLabels && points.map((point, index) => {
        const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2
        const labelRadius = maxRadius + 25
        const textX = center + labelRadius * Math.cos(angle)
        const textY = center + labelRadius * Math.sin(angle)

        return (
          <div
            key={index}
            className="absolute text-center pointer-events-none"
            style={{
              left: textX,
              top: textY,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="text-xs text-white/60">{point.label}</div>
            <div className="text-sm font-bold text-violet-400">{point.value}</div>
          </div>
        )
      })}
    </div>
  )
}
