import { motion } from 'framer-motion'
import type { EconomyState } from '../types/economy-types'

interface BuildingsTabProps {
  state: EconomyState
}

export function BuildingsTab({ state }: BuildingsTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">建筑管理</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.industries.flatMap(i => i.buildings).map(building => (
          <div
            key={building.id}
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
          >
            <h4 className="font-semibold text-white mb-2">{building.name}</h4>
            <div className="text-sm text-slate-400 space-y-1">
              <div>等级: Lv.{building.level}</div>
              <div>工人: {building.workers}/{building.maxWorkers}</div>
              <div>效率: {(building.efficiency * 100).toFixed(0)}%</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
