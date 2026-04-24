import { motion } from 'framer-motion'
import type { EconomyState } from '../types/economy-types'

interface MarketTabProps {
  state: EconomyState
}

export function MarketTab({ state }: MarketTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">市场行情</h3>
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <p className="text-slate-400 text-center py-8">市场深度图表开发中...</p>
      </div>
    </motion.div>
  )
}
