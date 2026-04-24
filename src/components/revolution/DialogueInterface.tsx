import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Info, ChevronDown, Eye, Lock } from 'lucide-react'
import type { DialogueNode, DialogueOption } from '@data/simulation-world/systems/dialogue-system'
import { RelationBadge } from './RevolutionTheme'

interface DialogueInterfaceProps {
  dialogue: DialogueNode | null
  npcData: {
    id: string
    name: string
    portrait: string
    title: string
  } | null
  relationship: {
    trust: number
    affection: number
    respect: number
    fear: number
  }
  onSelectOption: (option: DialogueOption) => void
  onClose: () => void
}

export function DialogueInterface({
  dialogue,
  npcData,
  relationship,
  onSelectOption,
  onClose,
}: DialogueInterfaceProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  useEffect(() => {
    setSelectedOption(null)
  }, [dialogue?.id])

  if (!dialogue || !npcData) return null

  const toneIcons: Record<string, string> = {
    formal: '🎩',
    casual: '😊',
    aggressive: '😠',
    friendly: '😄',
    sarcastic: '😏',
    suspicious: '🤨',
    respectful: '🙇',
    condescending: '👑',
    affectionate: '🥰',
    fearful: '😨',
    arrogant: '😤',
    humble: '🙏',
    mysterious: '🔮',
    playful: '😜',
  }

  const moodGradient = dialogue.mood > 0.6
    ? 'from-emerald-900/50 to-emerald-800/30'
    : dialogue.mood > 0.3
    ? 'from-amber-900/50 to-amber-800/30'
    : 'from-red-900/50 to-red-800/30'

  const visibleOptions = dialogue.options.filter(o => !o.hidden)
  const hiddenCount = dialogue.options.filter(o => o.hidden).length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl mx-4"
      >
        <div className={`
          relative rounded-2xl overflow-hidden
          bg-gradient-to-b ${moodGradient}
          border border-slate-600
        `}>
          <div className="bg-gradient-to-r from-[#002654] via-slate-800 to-[#8B0000] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-red-700 flex items-center justify-center text-3xl border-4 border-amber-400/50 shadow-lg">
                  {npcData.portrait}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {npcData.name}
                    <span className="text-lg">{toneIcons[dialogue.tone] || '💬'}</span>
                  </h3>
                  <p className="text-slate-300 text-sm">{npcData.title}</p>
                  <div className="flex gap-2 mt-1">
                    <RelationBadge type="trust" value={relationship.trust} showLabel={false} />
                    <RelationBadge type="affection" value={relationship.affection} showLabel={false} />
                    <RelationBadge type="respect" value={relationship.respect} showLabel={false} />
                    <RelationBadge type="fear" value={relationship.fear} showLabel={false} />
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-2"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            <motion.div
              key={dialogue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/60 rounded-xl p-6 mb-6 border-l-4 border-amber-500"
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="text-amber-400 mt-1 flex-shrink-0" size={24} />
                <p className="text-white text-lg leading-relaxed italic">
                  "{dialogue.text}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <span className="text-amber-400 flex items-center gap-1">
                  <Info size={14} />
                  语气: {dialogue.tone}
                </span>
                <span className="text-slate-400">
                  情绪: {dialogue.mood > 0.6 ? '😊 积极' : dialogue.mood > 0.3 ? '😐 平静' : '😠 负面'}
                </span>
              </div>
            </motion.div>

            <div className="space-y-3">
              <h4 className="text-slate-300 text-sm font-bold mb-2 flex items-center gap-2">
                <ChevronDown size={16} />
                你的回应
              </h4>

              <AnimatePresence>
                {visibleOptions.map((option, idx) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <button
                      className={`
                        w-full p-4 rounded-lg text-left transition-all duration-300
                        border-2
                        ${selectedOption === option.id
                          ? 'bg-amber-900/40 border-amber-500 scale-[1.01]'
                          : 'bg-slate-800/40 border-slate-600 hover:border-amber-500/50 hover:bg-slate-700/40'
                        }
                      `}
                      onClick={() => {
                        setSelectedOption(option.id)
                        setTimeout(() => onSelectOption(option), 300)
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          {option.difficulty > 0.7 ? (
                            <Lock className="text-red-400 mt-1 flex-shrink-0" size={18} />
                          ) : option.successChance > 0.7 ? (
                            <Eye className="text-emerald-400 mt-1 flex-shrink-0" size={18} />
                          ) : (
                            <span className="text-amber-400 mt-0">•</span>
                          )}
                          <span className="text-white leading-relaxed">{option.text}</span>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <div className={`text-sm font-bold ${
                            option.successChance > 0.6 ? 'text-emerald-400' :
                            option.successChance > 0.3 ? 'text-amber-400' : 'text-red-400'
                          }`}>
                            {(option.successChance * 100).toFixed(0)}%
                          </div>
                          <div className="text-xs text-slate-400">
                            {'⭐'.repeat(Math.ceil(option.difficulty * 3))}
                          </div>
                        </div>
                      </div>
                      {option.consequences.length > 0 && (
                        <div className="mt-2 text-xs text-slate-400 flex flex-wrap gap-2">
                          {option.consequences.slice(0, 2).map((c, i) => (
                            <span key={i} className="bg-slate-700/50 px-2 py-1 rounded">
                              {c.target === 'relationship' ? '💞' :
                               c.target === 'reputation' ? '⭐' :
                               c.target === 'faction' ? '🏛️' :
                               c.target === 'karma' ? '⚖️' : '📜'}
                              {c.delta > 0 ? '+' : ''}{(c.delta * 100).toFixed(0)}
                            </span>
                          ))}
                          {option.consequences.length > 2 && (
                            <span className="bg-slate-700/50 px-2 py-1 rounded">
                              +{option.consequences.length - 2} 隐藏影响
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {hiddenCount > 0 && (
                <div className="text-center text-slate-500 text-sm py-2">
                  🔒 还有 {hiddenCount} 个选项需要更高的信任度解锁...
                </div>
              )}
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
