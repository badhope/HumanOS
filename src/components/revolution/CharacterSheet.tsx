import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Brain,
  Heart,
  Target,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Shield,
  Skull,
  Crown,
  Users,
} from 'lucide-react'
import { PersonalityRadar, RelationBadge, MetricGauge } from './RevolutionTheme'

interface CharacterSheetProps {
  character: {
    template: { id: string; name: string; portrait: string; title: string }
    personality: { openness: number; conscientiousness: number; extraversion: number; agreeableness: number; neuroticism: number }
    motives: Array<{ type: string; intensity: number }>
    agendas: Array<{ id: string; title: string; description: string; secrecy: number; progress: number }>
  } | null
  archetype: string
  recentMemories: Array<{ id: string; turn: number; content: string; importance: number }>
  investigationLevel: number
  onDialogue: () => void
  onClose: () => void
}

export function CharacterSheet({
  character,
  archetype,
  recentMemories,
  investigationLevel,
  onDialogue,
  onClose,
}: CharacterSheetProps) {
  const [showSecrets, setShowSecrets] = useState(false)

  if (!character) return null

  const { template, personality, motives, agendas } = character

  const motivesSorted = [...motives].sort((a, b) => b.intensity - a.intensity)

  const canSeeSecret = (level: number) => investigationLevel >= level

  const archetypeColors: Record<string, string> = {
    the_leader: 'from-amber-600 to-red-700',
    the_idealist: 'from-blue-600 to-indigo-700',
    the_machiavellian: 'from-slate-600 to-slate-800',
    the_hothead: 'from-red-600 to-orange-700',
    the_corrupt: 'from-emerald-700 to-teal-800',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-600">
          <div className={`bg-gradient-to-r ${archetypeColors[archetype] || 'from-slate-700 to-slate-800'} p-6`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-black/40 flex items-center justify-center text-4xl border-2 border-white/20 shadow-xl">
                  {template.portrait}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{template.name}</h2>
                  <p className="text-white/70">{template.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-black/30 text-white px-3 py-1 rounded-full text-sm">
                      {archetype.replace('the_', '')}
                    </span>
                    <span className="bg-black/30 text-amber-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <Eye size={14} />
                      调查 {(investigationLevel * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Brain size={18} className="text-amber-400" />
                  人格五维
                </h3>
                <PersonalityRadar personality={personality} size={140} />
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Target size={18} className="text-red-400" />
                  核心动机
                </h3>
                <div className="space-y-2">
                  {motivesSorted.slice(0, 4).map((motive, idx) => (
                    <MetricGauge
                      key={idx}
                      label={motive.type}
                      value={motive.intensity}
                      color={idx < 2 ? 'gold' : 'blue'}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Heart size={18} className="text-pink-400" />
                与你的关系
              </h3>
              <div className="flex gap-4 flex-wrap">
                <RelationBadge type="trust" value={0.5 + Math.random() * 0.3} />
                <RelationBadge type="affection" value={0.3 + Math.random() * 0.4} />
                <RelationBadge type="respect" value={0.4 + Math.random() * 0.4} />
                <RelationBadge type="fear" value={Math.random() * 0.5} />
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4">
              <button
                className="w-full flex justify-between items-center text-white font-bold mb-4"
                onClick={() => setShowSecrets(!showSecrets)}
              >
                <span className="flex items-center gap-2">
                  {canSeeSecret(0.7) ? <Eye size={18} className="text-purple-400" /> : <EyeOff size={18} className="text-slate-500" />}
                  隐藏议程
                </span>
                {showSecrets ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              <AnimatePresence>
                {showSecrets && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    {agendas.map((agenda, idx) => {
                      const visible = canSeeSecret(agenda.secrecy)
                      return (
                        <div
                          key={agenda.id}
                          className={`p-3 rounded-lg ${visible ? 'bg-purple-900/30 border border-purple-500/50' : 'bg-slate-700/30'}`}
                        >
                          {visible ? (
                            <>
                              <div className="flex items-center gap-2 text-white font-medium">
                                {agenda.title.includes('复仇') && <Skull size={16} className="text-red-400" />}
                                {agenda.title.includes('权力') && <Crown size={16} className="text-amber-400" />}
                                {agenda.title.includes('财富') && <Shield size={16} className="text-emerald-400" />}
                                {agenda.title}
                              </div>
                              <p className="text-slate-400 text-sm mt-1">
                                保密等级: {(agenda.secrecy * 100).toFixed(0)}% |
                                进度: {(agenda.progress * 100).toFixed(0)}%
                              </p>
                            </>
                          ) : (
                            <div className="text-slate-500 flex items-center gap-2">
                              <EyeOff size={16} />
                              需要更高调查等级 ({(agenda.secrecy * 100).toFixed(0)}%) 来解密
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <User size={18} className="text-blue-400" />
                近期记忆
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {recentMemories.slice(0, 5).map((memory) => (
                  <div key={memory.id} className="text-sm text-slate-300 bg-slate-700/30 p-2 rounded">
                    <span className="text-slate-500">[回合{memory.turn}]</span> {memory.content}
                    <span className="text-xs text-amber-400 ml-2">重要度: {(memory.importance * 100).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onDialogue}
                className="flex-1 py-4 bg-gradient-to-r from-amber-600 to-red-700 text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                开始对话
              </button>
            </div>
          </div>

          <div className="h-1 flex">
            <div className="flex-1 bg-[#002654]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#CE1126]" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
