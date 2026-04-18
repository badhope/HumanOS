import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X, Lock, Check } from 'lucide-react'
import type { Achievement, AchievementState } from '@data/simulations/market-economy/achievement-system'
import { ACHIEVEMENTS, RARITY_COLORS, RARITY_GLOW, RARITY_NAMES } from '@data/simulations/market-economy/achievement-system'

const CATEGORY_NAMES: Record<string, string> = {
  economic: '💰 经济',
  diplomatic: '🤝 外交',
  social: '👥 社会',
  political: '🏛️ 政治',
  survival: '🛡️ 生存'
}

export default function AchievementPanel({ 
  achievementState, 
  onClose,
  onDismissNotification 
}: { 
  achievementState: AchievementState
  onClose: () => void
  onDismissNotification: (id: string) => void
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeRarity, setActiveRarity] = useState<string>('all')

  const categories = ['all', 'economic', 'social', 'political', 'survival']
  const rarities = ['all', 'common', 'rare', 'epic', 'legendary']

  const filteredAchievements = ACHIEVEMENTS.filter(a => {
    if (activeCategory !== 'all' && a.category !== activeCategory) return false
    if (activeRarity !== 'all' && a.rarity !== activeRarity) return false
    return true
  })

  const unlockedCount = achievementState.unlocked.length
  const totalCount = ACHIEVEMENTS.length
  const progress = (unlockedCount / totalCount) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed inset-y-0 right-0 w-full max-w-md z-50
      bg-gradient-to-br from-zinc-900/98 to-neutral-900/98 backdrop-blur-2xl
      border-l border-white/10 shadow-2xl"
    >
      <div className="h-full flex flex-col">
        <div className="p-6 bg-gradient-to-r from-amber-500/15 to-orange-500/10 border-b border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-400">成就系统</h2>
                <p className="text-sm text-slate-400">已解锁 {unlockedCount} / {totalCount}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
              style={{ width: `${Math.max(progress, 5)}%` }}
            >
              {progress >= 10 && (
                <span className="text-[10px] font-bold text-white drop-shadow-lg">
                  {progress.toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-white/5 space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {cat === 'all' ? '🎯 全部' : CATEGORY_NAMES[cat]}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {rarities.map(rarity => (
              <button
                key={rarity}
                onClick={() => setActiveRarity(rarity)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeRarity === rarity 
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                    : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {rarity === 'all' ? '⭐ 全部' : RARITY_NAMES[rarity as keyof typeof RARITY_NAMES]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredAchievements.map(achievement => {
            const isUnlocked = achievementState.unlocked.includes(achievement.id)
            const hasNotification = achievementState.notifications.includes(achievement.id)
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative p-4 rounded-xl border transition-all ${
                  isUnlocked 
                    ? `bg-gradient-to-br ${RARITY_COLORS[achievement.rarity]} ${RARITY_GLOW[achievement.rarity]}`
                    : 'bg-slate-800/30 border-slate-700/50 opacity-60'
                }`}
                onClick={() => hasNotification && onDismissNotification(achievement.id)}
              >
                {hasNotification && (
                  <div className="absolute -top-1 -right-1">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-br from-amber-400 to-orange-500" />
                    </span>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className={`text-3xl ${!isUnlocked && 'grayscale opacity-50'}`}>
                    {isUnlocked ? achievement.icon : <Lock className="w-8 h-8 text-slate-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                        {achievement.name}
                      </h3>
                      {isUnlocked && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{achievement.description}</p>
                    
                    {achievement.reward && isUnlocked && (
                      <div className="flex flex-wrap gap-2">
                        {achievement.reward.politicalCapital && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                            +{achievement.reward.politicalCapital} 政治点数
                          </span>
                        )}
                        {achievement.reward.approval && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                            +{achievement.reward.approval}% 支持率
                          </span>
                        )}
                        {achievement.reward.gold && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                            +{achievement.reward.gold} 资金
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    achievement.rarity === 'legendary' ? 'bg-amber-500/20 text-amber-400' :
                    achievement.rarity === 'epic' ? 'bg-violet-500/20 text-violet-400' :
                    achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {RARITY_NAMES[achievement.rarity]}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export function AchievementNotificationPopup({ 
  achievement, 
  onClose 
}: { 
  achievement: Achievement
  onClose: () => void 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ type: 'spring', damping: 20 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] pointer-events-auto"
    >
      <div className={`bg-gradient-to-br ${RARITY_COLORS[achievement.rarity]} rounded-2xl p-5 border shadow-2xl ${RARITY_GLOW[achievement.rarity]} backdrop-blur-xl max-w-sm`}>
        <div className="flex items-center gap-4">
          <div className="text-5xl animate-bounce">{achievement.icon}</div>
          <div>
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
              🏆 成就解锁！
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{achievement.name}</h3>
            <p className="text-sm text-slate-300">{achievement.description}</p>
            <div className="text-xs text-slate-400 mt-1">
              {RARITY_NAMES[achievement.rarity]} 成就
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-white/10 hover:bg-white/15 rounded-xl text-sm font-semibold transition-colors"
        >
          太棒了！
        </button>
      </div>
    </motion.div>
  )
}
