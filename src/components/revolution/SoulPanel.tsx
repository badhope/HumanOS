import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Eye, Flame, Crown, Skull, Star, Heart, Zap } from 'lucide-react'
import { MetricGauge, TricolorBanner } from './RevolutionTheme'

interface SoulStatus {
  karma: number
  awakening: number
  blessings: Array<{ id: string; name: string; icon: string; description: string; level: number }>
  curses: Array<{ id: string; name: string; icon: string; description: string; level: number }>
  pastLives: number
  soulAge: number
  alignment: 'light' | 'neutral' | 'dark'
}

interface SoulPanelProps {
  soul: SoulStatus
}

export function SoulPanel({ soul }: SoulPanelProps) {
  const [activeTab, setActiveTab] = useState<'blessings' | 'curses'>('blessings')

  const alignmentColors = {
    light: 'from-amber-500 to-yellow-400',
    neutral: 'from-slate-500 to-slate-400',
    dark: 'from-purple-700 to-red-600',
  }

  const alignmentNames = {
    light: '⚪ 光明',
    neutral: '⚖️ 中立',
    dark: '⚫ 黑暗',
  }

  return (
    <div className="bg-gradient-to-b from-slate-800/60 to-slate-900/80 rounded-2xl overflow-hidden border border-slate-600">
      <TricolorBanner
        title="灵魂状态"
        subtitle={`第 ${soul.pastLives + 1} 世 | 灵魂年龄: ${soul.soulAge} 劫`}
        icon={<Sparkles size={24} />}
      />

      <div className="p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${alignmentColors[soul.alignment]} opacity-30 blur-sm absolute inset-0`}
            />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-4 border-amber-500/50 flex items-center justify-center relative">
              <Sparkles size={32} className="text-amber-400" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-bold text-white">灵魂属性</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${alignmentColors[soul.alignment]} text-white`}>
                {alignmentNames[soul.alignment]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <MetricGauge
                label="⚖️ 业力值"
                value={soul.karma / 100}
                color={soul.karma > 60 ? 'gold' : soul.karma > 30 ? 'blue' : 'red'}
              />
              <MetricGauge
                label="👁️ 觉醒度"
                value={soul.awakening / 100}
                color="blue"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'blessings'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
            onClick={() => setActiveTab('blessings')}
          >
            <Star size={16} className="text-amber-400" />
            祝福 ({soul.blessings.length})
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'curses'
                ? 'bg-red-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
            onClick={() => setActiveTab('curses')}
          >
            <Skull size={16} className="text-red-400" />
            诅咒 ({soul.curses.length})
          </button>
        </div>

        <div className="space-y-3">
          {activeTab === 'blessings' && soul.blessings.map((blessing, idx) => (
            <motion.div
              key={blessing.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{blessing.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{blessing.name}</span>
                    <span className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded">
                      Lv.{blessing.level}
                    </span>
                  </div>
                  <p className="text-sm text-amber-200/70">{blessing.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {activeTab === 'curses' && soul.curses.map((curse, idx) => (
            <motion.div
              key={curse.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-red-900/20 border border-red-500/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{curse.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{curse.name}</span>
                    <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">
                      Lv.{curse.level}
                    </span>
                  </div>
                  <p className="text-sm text-red-200/70">{curse.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const DEFAULT_SOUL: SoulStatus = {
  karma: 58,
  awakening: 35,
  pastLives: 27,
  soulAge: 3,
  alignment: 'neutral',
  blessings: [
    { id: 'b1', name: '革命者之魂', icon: '🔥', description: '在动荡时代获得额外行动力', level: 2 },
    { id: 'b2', name: '人民之声', icon: '📢', description: '演说时获得额外声望加成', level: 1 },
    { id: 'b3', name: '命运眷顾', icon: '🍀', description: '关键时刻成功率+15%', level: 3 },
  ],
  curses: [
    { id: 'c1', name: '断头台阴影', icon: '⚔️', description: '所有选择的世界线变动率翻倍', level: 1 },
    { id: 'c2', name: '信任危机', icon: '💔', description: '所有NPC初始信任-10%', level: 2 },
  ],
}
