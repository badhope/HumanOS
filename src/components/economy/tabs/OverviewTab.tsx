import { motion } from 'framer-motion'
import type { EconomyState } from '../types/economy-types'
import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters'

interface OverviewTabProps {
  state: EconomyState
}

export function OverviewTab({ state }: OverviewTabProps) {
  const stats = [
    { label: '国库资金', value: formatCurrency(state.money), icon: '💰' },
    { label: 'GDP', value: formatCurrency(state.treasury), icon: '📈' },
    { label: '人口', value: formatNumber(state.population), icon: '👥' },
    { label: '民众幸福度', value: formatPercent(state.happiness), icon: '😊' },
    { label: '社会稳定度', value: formatPercent(state.stability), icon: '⚖️' },
    { label: '当前回合', value: `第 ${state.turn} 回合`, icon: '⏱️' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
