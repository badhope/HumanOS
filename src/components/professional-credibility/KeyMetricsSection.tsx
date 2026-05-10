import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  Star,
  Award,
  Users,
  Clock,
  TrendingUp,
  Zap,
  GraduationCap,
} from 'lucide-react'

const keyMetrics = [
  { label: '测评准确率', value: 98.76, suffix: '%', icon: Target, color: 'from-violet-500 to-purple-500' },
  { label: '用户满意度', value: 4.92, suffix: '/5', icon: Star, color: 'from-amber-500 to-orange-500' },
  { label: '专业认证', value: 127, suffix: '+', icon: Award, color: 'from-pink-500 to-rose-500' },
  { label: '累计测评', value: 2847563, suffix: '次', icon: Users, color: 'from-cyan-500 to-blue-500' },
  { label: '平均耗时', value: 8.5, suffix: '分钟', icon: Clock, color: 'from-green-500 to-emerald-500' },
  { label: '用户复购率', value: 89.3, suffix: '%', icon: TrendingUp, color: 'from-indigo-500 to-violet-500' },
  { label: '行业优势', value: 34.7, suffix: '%', icon: Zap, color: 'from-orange-500 to-red-500' },
  { label: '专家团队', value: 156, suffix: '人', icon: GraduationCap, color: 'from-teal-500 to-cyan-500' },
]

interface AnimatedCounterProps {
  value: number
  suffix: string
  decimals?: number
}

export function AnimatedCounter({ value, suffix, decimals = 0 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {displayValue.toLocaleString('zh-CN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}

export function KeyMetricsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {keyMetrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-2xl p-4 text-center group hover:scale-105 transition-transform"
        >
          <div
            className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
          >
            <metric.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            <AnimatedCounter
              value={metric.value}
              suffix={metric.suffix}
              decimals={metric.value < 100 && metric.value % 1 !== 0 ? 2 : 0}
            />
          </div>
          <div className="text-white/60 text-sm">{metric.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}
