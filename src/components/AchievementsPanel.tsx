import { motion } from 'framer-motion'
import { Trophy, Lock, Star, Check } from 'lucide-react'
import { useAppStore, type Achievement } from '../store'

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const isUnlocked = achievement.unlockedAt !== undefined
  const progress = achievement.progress || 0
  const target = achievement.target || 1
  const progressPercent = target > 0 ? (progress / target) * 100 : 0

  return (
    <motion.div
      key={achievement.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-4 rounded-xl border transition-all ${
        isUnlocked
          ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30'
          : 'bg-white/5 border-white/10 opacity-60'
      }`}
    >
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl backdrop-blur-sm">
          <Lock size={24} className="text-white/40" />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          isUnlocked
            ? 'bg-gradient-to-br from-amber-400 to-orange-500'
            : 'bg-white/10'
        }`}>
          {isUnlocked ? (
            <span className="text-xl">{achievement.icon}</span>
          ) : (
            <span className="text-xl opacity-30">{achievement.icon}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`font-medium text-sm ${isUnlocked ? 'text-amber-300' : 'text-white/60'}`}>
              {achievement.title}
            </h4>
            {isUnlocked && (
              <Check size={14} className="text-emerald-400" />
            )}
          </div>
          <p className="text-xs text-white/40 line-clamp-2">
            {achievement.description}
          </p>

          {!isUnlocked && achievement.target && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
                <span>进度</span>
                <span>{progress}/{target}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <motion.div
                  className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
            </div>
          )}

          {isUnlocked && achievement.unlockedAt && (
            <p className="text-[10px] text-white/30 mt-2">
              {new Date(achievement.unlockedAt).toLocaleDateString()} 解锁
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function AchievementsPanel() {
  const { achievements } = useAppStore()
  
  const unlockedCount = achievements.filter(a => a.unlockedAt).length
  const totalCount = achievements.length
  const progressPercent = (unlockedCount / totalCount) * 100

  const sortedAchievements = [...achievements].sort((a, b) => {
    const aUnlocked = a.unlockedAt ? 0 : 1
    const bUnlocked = b.unlockedAt ? 0 : 1
    if (aUnlocked !== bUnlocked) return aUnlocked - bUnlocked
    return (a.unlockedAt || 0) - (b.unlockedAt || 0)
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-2xl p-5 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Trophy size={14} className="text-white" />
          </span>
          成就系统
        </h3>
        <div className="flex items-center gap-2">
          <Star size={14} className="text-amber-400" />
          <span className="text-sm font-medium text-amber-400">
            {unlockedCount}/{totalCount}
          </span>
        </div>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2 mb-4">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="space-y-3">
        {sortedAchievements.map((achievement, index) => (
          <AchievementCard key={achievement.id} achievement={achievement} index={index} />
        ))}
      </div>

      {unlockedCount === 0 && (
        <div className="text-center py-8 text-white/40">
          <Trophy size={48} className="mx-auto mb-4 opacity-30" />
          <p>完成测评和训练来解锁成就！</p>
        </div>
      )}
    </motion.div>
  )
}