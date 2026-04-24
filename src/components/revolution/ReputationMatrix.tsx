import { motion } from 'framer-motion'
import { Crown, Users, Factory, Wheat, Hammer, Shield } from 'lucide-react'
import { TricolorBanner } from './RevolutionTheme'

const FACTIONS = [
  { id: 'jacobin', name: '雅各宾派', color: '#CE1126', icon: '🔥' },
  { id: 'girondin', name: '吉伦特派', color: '#002654', icon: '📜' },
  { id: 'monarchist', name: '保王党', color: '#D4AF37', icon: '👑' },
  { id: 'cordelier', name: '科德利埃', color: '#FF4500', icon: '⚔️' },
  { id: 'neutral', name: '中立派', color: '#4A5568', icon: '⚖️' },
]

const STRATA = [
  { id: 'aristocracy', name: '贵族', icon: <Crown size={14} /> },
  { id: 'clergy', name: '教士', icon: <Shield size={14} /> },
  { id: 'bourgeois', name: '资产阶级', icon: <Factory size={14} /> },
  { id: 'peasantry', name: '农民', icon: <Wheat size={14} /> },
  { id: 'proletariat', name: '无产者', icon: <Hammer size={14} /> },
  { id: 'military', name: '军队', icon: <Users size={14} /> },
]

interface ReputationMatrixProps {
  reputations: Record<string, Record<string, number>>
}

export function ReputationMatrix({ reputations }: ReputationMatrixProps) {
  const getReputationColor = (value: number) => {
    if (value >= 0.8) return 'bg-emerald-500'
    if (value >= 0.6) return 'bg-emerald-400'
    if (value >= 0.4) return 'bg-amber-400'
    if (value >= 0.2) return 'bg-orange-500'
    return 'bg-red-600'
  }

  const getReputationLabel = (value: number) => {
    if (value >= 0.8) return '崇敬'
    if (value >= 0.6) return '友好'
    if (value >= 0.4) return '中立'
    if (value >= 0.2) return '怀疑'
    return '敌视'
  }

  return (
    <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-600">
      <TricolorBanner
        title="声望矩阵"
        subtitle="你在6个社会阶层和5大派系中的声望"
        icon={<Users size={24} />}
      />

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-3 text-left text-slate-400 text-sm"></th>
                {FACTIONS.map(faction => (
                  <th key={faction.id} className="p-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">{faction.icon}</span>
                      <span className="text-xs text-white font-medium" style={{ color: faction.color }}>
                        {faction.name}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="p-3 text-center text-slate-400 text-sm">阶层总计</th>
              </tr>
            </thead>
            <tbody>
              {STRATA.map(stratum => {
                const stratumValues = FACTIONS.map(f => reputations[stratum.id]?.[f.id] || 0.5)
                const stratumAvg = stratumValues.reduce((a, b) => a + b, 0) / FACTIONS.length
                return (
                  <tr key={stratum.id} className="border-t border-slate-700/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {stratum.icon}
                        <span className="text-white text-sm font-medium">{stratum.name}</span>
                      </div>
                    </td>
                    {FACTIONS.map(faction => {
                      const value = reputations[stratum.id]?.[faction.id] || 0.5
                      return (
                        <td key={faction.id} className="p-3">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center gap-1"
                          >
                            <div className={`w-12 h-3 rounded-full ${getReputationColor(value)}`} />
                            <span className="text-[10px] text-slate-400">
                              {getReputationLabel(value)}
                            </span>
                            <span className="text-[10px] font-bold text-white">
                              {Math.round(value * 100)}%
                            </span>
                          </motion.div>
                        </td>
                      )
                    })}
                    <td className="p-3 text-center">
                      <div className="text-lg font-bold" style={{
                        color: stratumAvg >= 0.5 ? '#10B981' : '#EF4444'
                      }}>
                        {Math.round(stratumAvg * 100)}%
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-5 gap-3">
          {FACTIONS.map(faction => {
            const factionValues = STRATA.map(s => reputations[s.id]?.[faction.id] || 0.5)
            const factionAvg = factionValues.reduce((a, b) => a + b, 0) / STRATA.length
            return (
              <div key={faction.id} className="bg-slate-700/40 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{faction.icon}</div>
                <div className="text-xs text-white font-medium" style={{ color: faction.color }}>
                  {faction.name}
                </div>
                <div className="text-xl font-bold text-white mt-1">
                  {Math.round(factionAvg * 100)}%
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const DEFAULT_REPUTATIONS = {
  aristocracy: { jacobin: 0.1, girondin: 0.5, monarchist: 0.9, cordelier: 0.05, neutral: 0.6 },
  clergy: { jacobin: 0.15, girondin: 0.45, monarchist: 0.85, cordelier: 0.1, neutral: 0.55 },
  bourgeois: { jacobin: 0.4, girondin: 0.75, monarchist: 0.5, cordelier: 0.25, neutral: 0.7 },
  peasantry: { jacobin: 0.65, girondin: 0.35, monarchist: 0.45, cordelier: 0.55, neutral: 0.5 },
  proletariat: { jacobin: 0.8, girondin: 0.25, monarchist: 0.2, cordelier: 0.75, neutral: 0.4 },
  military: { jacobin: 0.5, girondin: 0.4, monarchist: 0.65, cordelier: 0.45, neutral: 0.65 },
}
