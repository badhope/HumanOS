import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { GameEvent } from '../../data/game/usa-events'

interface EventModalProps {
  event: GameEvent | null
  onResolve: (eventId: string, optionIndex: number) => void
}

const categoryColors: Record<string, string> = {
  political: '#3B82F6',
  economic: '#10B981',
  social: '#EC4899',
  international: '#8B5CF6',
  pandemic: '#EF4444',
}

const categoryNames: Record<string, string> = {
  political: '政治',
  economic: '经济',
  social: '社会',
  international: '国际',
  pandemic: '疫情',
}

export default function EventModal({ event, onResolve }: EventModalProps) {
  return (
    <AnimatePresence>
      {event && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {}}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-lg mx-4 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div 
              className="h-1.5 w-full"
              style={{ backgroundColor: categoryColors[event.category] }}
            />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: categoryColors[event.category] + '20' }}
                  >
                    {event.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{event.name}</h3>
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: categoryColors[event.category] + '20', color: categoryColors[event.category] }}
                    >
                      {categoryNames[event.category]} 事件
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">
                {event.description}
              </p>

              <div className="space-y-2">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                  选择应对方案
                </div>
                {event.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => onResolve(event.id, index)}
                    whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full p-4 bg-white/5 rounded-lg border border-white/5 text-left hover:border-white/10 transition-all group"
                  >
                    <div className="font-medium text-sm group-hover:text-white transition-colors">
                      {option.text}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(option.effects).map(([key, value]) => (
                        <span
                          key={key}
                          className={`px-2 py-0.5 rounded text-xs $
                            Number(value) > 0 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {getEffectName(key)} {Number(value) > 0 ? '+' : ''}{value}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function getEffectName(key: string): string {
  const names: Record<string, string> = {
    stability: '稳定度',
    approval: '支持率',
    politicalCapital: '政治点数',
    gdpGrowth: 'GDP增长',
    inflation: '通胀率',
    unemployment: '失业率',
    treasury: '国库',
  }
  return names[key] || key
}
