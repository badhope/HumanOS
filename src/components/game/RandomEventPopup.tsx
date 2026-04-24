import { motion, AnimatePresence } from 'framer-motion'
import { RandomEvent } from '../../data/game/usa-random-events'

interface RandomEventPopupProps {
  event: RandomEvent | null
  onSelect: (optionIndex: number) => void
}

const CATEGORY_COLORS: Record<string, string> = {
  economic: 'border-amber-500/50 bg-amber-900/80',
  political: 'border-blue-500/50 bg-blue-900/80',
  social: 'border-rose-500/50 bg-rose-900/80',
  international: 'border-cyan-500/50 bg-cyan-900/80',
  disaster: 'border-red-600/50 bg-red-950/90',
}

export default function RandomEventPopup({ event, onSelect }: RandomEventPopupProps) {
  if (!event) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={e => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className={`w-full max-w-lg rounded-lg border ${CATEGORY_COLORS[event.category]} backdrop-blur-lg shadow-2xl overflow-hidden`}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{event.icon}</div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">
                  {event.category} 事件
                </div>
                <h3 className="text-xl font-bold">{event.name}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {event.description}
            </p>

            <div className="space-y-2">
              {event.options.map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => onSelect(idx)}
                  className="w-full p-4 rounded-lg bg-black/40 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
                >
                  <div className="font-medium text-sm mb-1 group-hover:text-amber-400 transition-colors">
                    {option.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mb-2">
                    {option.description}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(option.effects).map(([key, value]) => (
                      <span
                        key={key}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                          value > 0
                            ? 'bg-emerald-900/30 text-emerald-400'
                            : 'bg-red-900/30 text-red-400'
                        }`}
                      >
                        {value > 0 ? '+' : ''}{value} {key}
                      </span>
                    ))}
                  </div>
                  {option.groupOpinion && Object.keys(option.groupOpinion).length > 0 && (
                    <div className="flex gap-2 mt-2 text-[9px]">
                      {Object.entries(option.groupOpinion).map(([gid, opinion]) => (
                        <span
                          key={gid}
                          className={opinion > 0 ? 'text-emerald-500' : 'text-red-500'}
                        >
                          {opinion > 0 ? '+' : ''}{opinion}% {gid}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
