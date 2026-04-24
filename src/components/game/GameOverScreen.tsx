import { motion, AnimatePresence } from 'framer-motion'
import { CIVIL_WAR_SCENARIOS } from '../../data/game/game-over-events'

interface GameOverScreenProps {
  reason: 'civil_war' | 'impeached' | 'resigned' | 'lost_election'
  scenarioId?: string
  day: number
  onRestart: () => void
}

export default function GameOverScreen({ reason, scenarioId, day, onRestart }: GameOverScreenProps) {
  const scenario = CIVIL_WAR_SCENARIOS.find(s => s.id === scenarioId)
  const years = Math.floor(day / 365)
  const months = Math.floor((day % 365) / 30)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-8"
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="text-8xl mb-8">
            {reason === 'civil_war' ? scenario?.icon || '💥' : reason === 'impeached' ? '⚖️' : '🎬'}
          </div>

          <h1 className="text-5xl font-bold text-red-500 mb-4 tracking-wider">
            游戏结束
          </h1>

          <div className="text-2xl text-slate-300 mb-2">
            {reason === 'civil_war' && scenario?.name}
            {reason === 'impeached' && '你被弹劾了'}
            {reason === 'resigned' && '你被迫辞职'}
            {reason === 'lost_election' && '输掉大选'}
          </div>

          <div className="text-amber-400 text-lg mb-8">
            执政 {years} 年 {months} 个月 · 第 {day} 天
          </div>

          {scenario && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-slate-400 leading-relaxed mb-12 max-w-xl mx-auto"
            >
              {scenario.description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <button
              onClick={onRestart}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors text-lg"
            >
              🔄 重新开始
            </button>

            <p className="text-slate-600 text-sm mt-8">
              💡 提示：保持稳定度在15%以上，平衡各派系利益，不要同时与太多人为敌
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
