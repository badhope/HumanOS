import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, CheckCircle, Clock, Eye, Lock, Star, Scroll, Sword } from 'lucide-react'
import { TricolorBanner } from './RevolutionTheme'

interface Quest {
  id: string
  type: 'main' | 'side' | 'secret'
  title: string
  description: string
  objectives: Array<{ id: string; text: string; completed: boolean }>
  progress: number
  reward: {
    karma?: number
    influence?: number
    reputation?: Record<string, number>
    item?: string
  }
  difficulty: 1 | 2 | 3 | 4 | 5
  unlocked: boolean
}

interface QuestSystemProps {
  quests: Quest[]
  onQuestSelect?: (questId: string) => void
}

export function QuestSystem({ quests, onQuestSelect }: QuestSystemProps) {
  const [filter, setFilter] = useState<'all' | 'main' | 'side' | 'secret'>('all')

  const filteredQuests = quests.filter(q => filter === 'all' ? true : q.type === filter)

  const typeColors = {
    main: 'border-l-4 border-amber-500',
    side: 'border-l-4 border-blue-500',
    secret: 'border-l-4 border-purple-500',
  }

  const typeLabels = {
    main: '⚔️ 主线',
    side: '📜 支线',
    secret: '🔮 秘密',
  }

  const typeBg = {
    main: 'bg-amber-600',
    side: 'bg-blue-600',
    secret: 'bg-purple-600',
  }

  return (
    <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-600">
      <TricolorBanner
        title="任务日志"
        subtitle={`进行中: ${quests.filter(q => !q.objectives.every(o => o.completed)).length} | 已完成: ${quests.filter(q => q.objectives.every(o => o.completed)).length}`}
        icon={<Target size={24} />}
      />

      <div className="p-4">
        <div className="flex gap-2 mb-4">
          {(['all', 'main', 'side', 'secret'] as const).map((type) => (
            <button
              key={type}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === type
                  ? typeBg[type] + ' text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => setFilter(type)}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredQuests.map((quest, idx) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-slate-700/40 rounded-lg overflow-hidden ${quest.unlocked ? '' : 'opacity-60'} ${typeColors[quest.type]}`}
              onClick={() => quest.unlocked && onQuestSelect?.(quest.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${typeBg[quest.type]} text-white`}>
                      {typeLabels[quest.type]}
                    </span>
                    <h4 className="text-white font-bold">{quest.title}</h4>
                    {!quest.unlocked && <Lock size={14} className="text-slate-400" />}
                  </div>
                  <div className="flex items-center gap-1">
                    {'⭐'.repeat(quest.difficulty)}
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-3">{quest.description}</p>

                <div className="space-y-2">
                  {quest.objectives.map((obj) => (
                    <div key={obj.id} className="flex items-center gap-2 text-sm">
                      {obj.completed ? (
                        <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Clock size={16} className="text-amber-400 flex-shrink-0" />
                      )}
                      <span className={obj.completed ? 'text-emerald-300 line-through' : 'text-slate-300'}>
                        {obj.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${quest.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">{quest.progress}%</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    {quest.reward.karma && <span>⚖️ 业力 +{quest.reward.karma}</span>}
                    {quest.reward.influence && <span>👑 影响力 +{quest.reward.influence}</span>}
                    {quest.reward.item && <span>📦 {quest.reward.item}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const DEFAULT_QUESTS: Quest[] = [
  {
    id: 'q1',
    type: 'main',
    title: '国王的审判',
    description: '路易十六的命运掌握在你的手中。投票决定法兰西的未来。',
    objectives: [
      { id: 'o1', text: '收集各派系对于国王命运的意见', completed: true },
      { id: 'o2', text: '与罗伯斯庇尔讨论处决方案', completed: true },
      { id: 'o3', text: '与丹东讨论和解的可能性', completed: false },
      { id: 'o4', text: '在国民公会进行最终投票', completed: false },
    ],
    progress: 50,
    reward: { karma: 50, influence: 25, reputation: { jacobin: 15 } },
    difficulty: 5,
    unlocked: true,
  },
  {
    id: 'q2',
    type: 'main',
    title: '限价法令',
    description: '人民正在挨饿。推动全面限价法令的通过。',
    objectives: [
      { id: 'o1', text: '获得科德利埃派的支持', completed: true },
      { id: 'o2', text: '说服雅各宾派接受经济干预', completed: true },
      { id: 'o3', text: '击败吉伦特派的自由市场提案', completed: false },
    ],
    progress: 66,
    reward: { karma: 30, reputation: { proletariat: 25, peasantry: 20 } },
    difficulty: 4,
    unlocked: true,
  },
  {
    id: 'q3',
    type: 'side',
    title: '马拉的医生',
    description: '马拉的皮肤病日益严重。帮助他寻找治疗方法。',
    objectives: [
      { id: 'o1', text: '寻找巴黎最好的医生', completed: false },
      { id: 'o2', text: '获取稀有药材', completed: false },
    ],
    progress: 0,
    reward: { influence: 15, item: '马拉的推荐信' },
    difficulty: 2,
    unlocked: true,
  },
  {
    id: 'q4',
    type: 'side',
    title: '塔列朗的秘密',
    description: '塔列朗掌握着某个危险的秘密。查明他隐藏了什么。',
    objectives: [
      { id: 'o1', text: '建立与塔列朗的信任关系', completed: false },
      { id: 'o2', text: '收集相关证据', completed: false },
      { id: 'o3', text: '决定是否公开真相', completed: false },
    ],
    progress: 0,
    reward: { karma: -20, influence: 40 },
    difficulty: 3,
    unlocked: true,
  },
  {
    id: 'q5',
    type: 'secret',
    title: '奥尔良公爵的阴谋',
    description: '有传言说菲利普·平等在暗中策划着什么...',
    objectives: [
      { id: 'o1', text: '渗透进奥尔良公爵的社交圈', completed: false },
      { id: 'o2', text: '截获密信', completed: false },
      { id: 'o3', text: '面对最终真相', completed: false },
    ],
    progress: 0,
    reward: { karma: 100, item: '真相揭示者' },
    difficulty: 5,
    unlocked: false,
  },
]
