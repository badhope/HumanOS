import { motion } from 'framer-motion'
import type { EconomyState } from '../types/economy-types'

interface IndustryTabProps {
  state: EconomyState
  onToggleBuilding: (industryId: string, buildingId: string) => void
  onHireWorkers: (industryId: string, buildingId: string, amount: number) => void
}

export function IndustryTab({ state, onToggleBuilding, onHireWorkers }: IndustryTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">工业生产</h3>
      <div className="space-y-4">
        {state.industries.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            暂未解锁工业建筑，请继续发展
          </div>
        ) : (
          state.industries.map(industry => (
            <div
              key={industry.id}
              className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
            >
              <h4 className="font-semibold text-white mb-3">{industry.name}</h4>
              <div className="text-sm text-slate-400">
                产能利用率: {industry.utilization.toFixed(1)}%
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}
