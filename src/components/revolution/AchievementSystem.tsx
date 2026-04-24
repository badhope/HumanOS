import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Star, Lock, Check, Trophy, Flame, Target, Users, Sword, Scale, BookOpen, Eye, Zap } from 'lucide-react'

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  category: 'revolution' | 'diplomacy' | 'combat' | 'wisdom' | 'vice' | 'virtue'
  unlocked: boolean
  unlockedAt?: number
  progress: number
  maxProgress: number
  hidden: boolean
  rewards: {
    karma?: number
    prestige?: number
    influence?: number
  }
}

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    name: '第一次处决',
    description: '见证第一位贵族被送上断头台',
    icon: '⚔️',
    rarity: 'common',
    category: 'combat',
    unlocked: true,
    unlockedAt: 12,
    progress: 1,
    maxProgress: 1,
    hidden: false,
    rewards: { prestige: 10, influence: 5 },
  },
  {
    id: 'people_hero',
    name: '人民英雄',
    description: '在巴黎民众中声望达到崇敬级别',
    icon: '👑',
    rarity: 'rare',
    category: 'revolution',
    unlocked: true,
    unlockedAt: 18,
    progress: 1,
    maxProgress: 1,
    hidden: false,
    rewards: { prestige: 25, influence: 15 },
  },
  {
    id: 'oracle',
    name: '预言家',
    description: '成功预测3次重大历史事件',
    icon: '🔮',
    rarity: 'epic',
    category: 'wisdom',
    unlocked: false,
    progress: 2,
    maxProgress: 3,
    hidden: false,
    rewards: { influence: 30, karma: 20 },
  },
  {
    id: 'king_slayer',
    name: '弑君者',
    description: '投票赞成处决路易十六',
    icon: '🗡️',
    rarity: 'legendary',
    category: 'revolution',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    hidden: true,
    rewards: { prestige: 50, karma: -30 },
  },
  {
    id: 'power_behind_throne',
    name: '王座幕后之人',
    description: '成为所有派系都敬畏的存在',
    icon: '🎭',
    rarity: 'legendary',
    category: 'diplomacy',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    hidden: true,
    rewards: { influence: 50 },
  },
  {
    id: 'butterfly_master',
    name: '蝴蝶效应大师',
    description: '通过一次对话引发世界线重大分歧',
    icon: '🦋',
    rarity: 'epic',
    category: 'wisdom',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    hidden: true,
    rewards: { karma: 25, influence: 20 },
  },
  {
    id: 'virtuous',
    name: '美德典范',
    description: '业力值达到80以上',
    icon: '✨',
    rarity: 'epic',
    category: 'virtue',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    hidden: false,
    rewards: { prestige: 30, karma: 10 },
  },
  {
    id: 'corrupted',
    name: '堕落之路',
    description: '业力值低于20',
    icon: '💀',
    rarity: 'epic',
    category: 'vice',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    hidden: true,
    rewards: { influence: 40 },
  },
  {
    id: 'alliance_builder',
    name: '联盟缔造者',
    description: '与5位历史人物建立信任关系',
    icon: '🤝',
    rarity: 'rare',
    category: 'diplomacy',
    unlocked: true,
    unlockedAt: 22,
    progress: 3,
    maxProgress: 5,
    hidden: false,
    rewards: { influence: 25, prestige: 15 },
  },
  {
    id: 'survivor',
    name: '恐怖幸存者',
    description: '在恐怖统治时期存活超过50回合',
    icon: '🏆',
    rarity: 'legendary',
    category: 'virtue',
    unlocked: false,
    progress: 25,
    maxProgress: 50,
    hidden: false,
    rewards: { prestige: 100, karma: 50 },
  },
  {
    id: 'historian',
    name: '历史记录者',
    description: '完整记录100个重大历史事件',
    icon: '📜',
    rarity: 'rare',
    category: 'wisdom',
    unlocked: false,
    progress: 45,
    maxProgress: 100,
    hidden: false,
    rewards: { prestige: 20 },
  },
  {
    id: 'revolution_incarnate',
    name: '革命化身',
    description: '所有派系支持度同时达到75%以上',
    icon: '🔥',
    rarity: 'legendary',
    category: 'revolution',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    hidden: true,
    rewards: { influence: 100, prestige: 100, karma: 50 },
  },
]

interface AchievementSystemProps {
  achievements: Achievement[]
  onUnlock?: (achievement: Achievement) => void
}

const RARITY_COLORS = {
  common: 'from-slate-500 to-slate-400',
  rare: 'from-blue-500 to-blue-400',
  epic: 'from-purple-600 to-purple-500',
  legendary: 'from-amber-500 via-yellow-400 to-amber-500',
}

const RARITY_BORDERS = {
  common: 'border-slate-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-amber-500',
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  revolution: <Flame size={14} className="text-red-500" />,
  diplomacy: <Users size={14} className="text-blue-500" />,
  combat: <Sword size={14} className="text-orange-500" />,
  wisdom: <Eye size={14} className="text-purple-500" />,
  vice: <Scale size={14} className="text-red-700" />,
  virtue: <Scale size={14} className="text-emerald-500" />,
}

export function AchievementSystem({ achievements, onUnlock }: AchievementSystemProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  const filteredAchievements = achievements.filter(a => {
    if (a.hidden && !a.unlocked) return false
    if (filter === 'unlocked') return a.unlocked
    if (filter === 'locked') return !a.unlocked
    return true
  })

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.filter(a => !a.hidden).length

  return (
    <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-600">
      <div className="bg-gradient-to-r from-amber-900/50 via-slate-800 to-purple-900/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg">
              <Trophy className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                成就殿堂
                <span className="text-sm font-normal text-slate-300">
                  {unlockedCount} / {totalCount} 已解锁
                </span>
              </h2>
              <p className="text-slate-400 text-sm">
                记录你在大革命中的每一个里程碑
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {[
              { key: 'all', label: '全部' },
              { key: 'unlocked', label: '已获得' },
              { key: 'locked', label: '未解锁' },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === key
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
                onClick={() => setFilter(key as any)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"
          />
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredAchievements.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`
                  relative rounded-xl overflow-hidden border-2 ${RARITY_BORDERS[achievement.rarity]}
                  ${achievement.unlocked ? 'bg-gradient-to-br from-slate-700/80 to-slate-800/80' : 'bg-slate-800/50 opacity-75'}
                `}
              >
                <div className={`h-1 bg-gradient-to-r ${RARITY_COLORS[achievement.rarity]}`} />

                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-14 h-14 rounded-xl flex items-center justify-center text-2xl
                      ${achievement.unlocked
                        ? `bg-gradient-to-br ${RARITY_COLORS[achievement.rarity]} shadow-lg`
                        : 'bg-slate-700'
                      }
                    `}>
                      {achievement.unlocked ? achievement.icon : <Lock size={20} className="text-slate-500" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {CATEGORY_ICONS[achievement.category]}
                        <h3 className={`font-bold ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`}>
                          {achievement.unlocked ? achievement.name : '???'}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {achievement.unlocked ? achievement.description : '完成隐藏条件以解锁'}
                      </p>
                    </div>
                  </div>

                  {!achievement.unlocked && achievement.maxProgress > 1 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>进度</span>
                        <span>{achievement.progress} / {achievement.maxProgress}</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all duration-500"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {achievement.unlocked ? (
                        <span className="flex items-center gap-1 text-emerald-400 text-xs">
                          <Check size={12} />
                          第 {achievement.unlockedAt} 回合获得
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs flex items-center gap-1">
                          <Lock size={12} />
                          未解锁
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 text-xs">
                      {achievement.rewards.prestige && (
                        <span className="bg-amber-900/30 text-amber-400 px-2 py-0.5 rounded">
                          ⭐ +{achievement.rewards.prestige}
                        </span>
                      )}
                      {achievement.rewards.influence && (
                        <span className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded">
                          👑 +{achievement.rewards.influence}
                        </span>
                      )}
                      {achievement.rewards.karma && achievement.rewards.karma > 0 && (
                        <span className="bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded">
                          ⚖️ +{achievement.rewards.karma}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export function AchievementToast({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
    >
      <div className={`
        px-8 py-4 rounded-xl border-2 ${RARITY_BORDERS[achievement.rarity]}
        bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
        shadow-2xl shadow-black/50
      `}>
        <div className="flex items-center gap-4">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-2xl
            bg-gradient-to-br ${RARITY_COLORS[achievement.rarity]}
            animate-pulse shadow-lg
          `}>
            {achievement.icon}
          </div>
          <div>
            <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              🏆 成就解锁！
            </div>
            <h3 className="text-xl font-bold text-white">{achievement.name}</h3>
            <p className="text-slate-400 text-sm">{achievement.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
