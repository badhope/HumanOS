import { ReactNode, memo } from 'react'
import { motion } from 'framer-motion'

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  trend?: number
  delay?: number
}

export const StatCard = memo(function StatCard({
  label,
  value,
  icon,
  trend,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
    >
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="flex items-baseline justify-between">
        <span className="text-xl font-bold text-white">{value}</span>
        {trend !== undefined && (
          <span className={trend >= 0 ? 'text-green-400' : 'text-red-400'}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
          </span>
        )}
      </div>
    </motion.div>
  )
})
