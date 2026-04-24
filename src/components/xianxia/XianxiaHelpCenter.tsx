import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle,
  Search,
  X,
  BookOpen,
  Mountain,
  Sparkles,
  ScrollText,
  Sword,
  GraduationCap,
  Keyboard,
  Lightbulb,
  Zap,
  BookMarked,
} from 'lucide-react'
import { getAllXianxiaTooltips, type XianxiaTooltip } from '@data/simulations/xianxia/xianxia-tooltips'
import {
  XIANXIA_CONCEPTS,
  searchXianxiaConcepts,
  getXianxiaConceptsByCategory,
  type XianxiaConcept,
} from '@data/simulations/xianxia/xianxia-glossary'

interface XianxiaHelpCenterProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = 'areas' | 'concepts' | 'guide' | 'shortcuts'

const categoryLabels: Record<string, { label: string; icon: string }> = {
  all: { label: '全部', icon: '📚' },
  realm: { label: '修炼境界', icon: '🏔️' },
  cultivation: { label: '修真之道', icon: '🧘' },
  resources: { label: '天材地宝', icon: '💎' },
  technique: { label: '功法技艺', icon: '⚔️' },
  'game-mechanic': { label: '游戏机制', icon: '⚙️' },
  strategy: { label: '修仙攻略', icon: '📖' },
}

export default function XianxiaHelpCenter({ isOpen, onClose }: XianxiaHelpCenterProps) {
  const [activeTab, setActiveTab] = useState<TabType>('areas')
  const [searchTerm, setSearchTerm] = useState('')
  const [conceptCategory, setConceptCategory] = useState<string>('all')
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null)

  const allTooltips = getAllXianxiaTooltips()

  const tabs = [
    { id: 'areas' as TabType, label: '界面说明', icon: <Mountain className="w-4 h-4" /> },
    { id: 'concepts' as TabType, label: '修真词典', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'guide' as TabType, label: '修仙攻略', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'shortcuts' as TabType, label: '快捷键', icon: <Keyboard className="w-4 h-4" /> },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const filteredConcepts = searchTerm
    ? searchXianxiaConcepts(searchTerm)
    : conceptCategory === 'all'
    ? XIANXIA_CONCEPTS
    : getXianxiaConceptsByCategory(conceptCategory as XianxiaConcept['category'])

  const renderContent = () => {
    switch (activeTab) {
      case 'areas':
        return (
          <div className="space-y-4">
            {allTooltips.map((tooltip) => (
              <motion.div
                key={tooltip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10"
              >
                <h4 className="font-bold text-purple-300 mb-2">{tooltip.title}</h4>
                <p className="text-sm text-slate-300 mb-3">{tooltip.description}</p>
                <div className="space-y-1">
                  {tooltip.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <Lightbulb className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'concepts':
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(categoryLabels).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setConceptCategory(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    conceptCategory === key
                      ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {val.icon} {val.label}
                </button>
              ))}
            </div>

            {filteredConcepts.map((concept, index) => (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="rounded-xl overflow-hidden bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-white/10"
              >
                <button
                  onClick={() =>
                    setExpandedConcept(expandedConcept === concept.id ? null : concept.id)
                  }
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{concept.icon}</span>
                    <div>
                      <h4 className="font-bold text-purple-200">{concept.term}</h4>
                      <span className="text-xs text-slate-500">
                        {categoryLabels[concept.category]?.label}
                      </span>
                    </div>
                  </div>
                  <X
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      expandedConcept === concept.id ? 'rotate-45' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {expandedConcept === concept.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 space-y-3 border-t border-white/10">
                        <p className="text-sm text-slate-300">{concept.definition}</p>

                        {concept.mechanic && (
                          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Zap className="w-3 h-3 text-blue-400" />
                              <span className="text-xs font-medium text-blue-400">游戏机制</span>
                            </div>
                            <p className="text-xs text-slate-300 whitespace-pre-line">{concept.mechanic}</p>
                          </div>
                        )}

                        {concept.strategy && (
                          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Lightbulb className="w-3 h-3 text-amber-400" />
                              <span className="text-xs font-medium text-amber-400">玩法攻略</span>
                            </div>
                            <p className="text-xs text-slate-300 whitespace-pre-line">{concept.strategy}</p>
                          </div>
                        )}

                        {concept.examples && concept.examples.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {concept.examples.map((ex, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 rounded-full text-xs bg-white/10 text-slate-400"
                              >
                                📌 {ex}
                              </span>
                            ))}
                          </div>
                        )}

                        {concept.related && concept.related.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            <span className="text-xs text-slate-500">相关概念：</span>
                            {concept.related.map((r) => {
                              const rel = XIANXIA_CONCEPTS.find((c) => c.id === r)
                              return rel ? (
                                <button
                                  key={r}
                                  onClick={() => setExpandedConcept(r)}
                                  className="text-xs text-purple-400 hover:text-purple-300 underline"
                                >
                                  {rel.term}
                                </button>
                              ) : null
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )

      case 'guide':
        return (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30">
              <h3 className="text-lg font-bold text-purple-200 mb-4 flex items-center gap-2">
                <ScrollText className="w-5 h-5" />
                从零开始的修真指南
              </h3>
              <div className="space-y-4 text-sm text-slate-300">
                {XIANXIA_CONCEPTS.find((c) => c.id === 'novice-guide')?.strategy?.split('\n\n').map((section, i) => (
                  <div key={i} className="space-y-1">
                    {section.split('\n').map((line, j) => (
                      <p key={j} className={line.startsWith('【') || line.startsWith('⚠️') ? 'font-bold text-purple-300 mt-2' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
                <h4 className="font-bold text-emerald-300 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  胜利条件
                </h4>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>🏆 渡劫飞升，成就仙道</li>
                  <li>⭐ 大乘期至尊，无敌世间</li>
                  <li>🏔️ 开宗立派，万代传承</li>
                  <li>📚 丹器双绝，万古流芳</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30">
                <h4 className="font-bold text-red-300 mb-2 flex items-center gap-2">
                  <Sword className="w-4 h-4" />
                  身死道消
                </h4>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>💀 寿元耗尽，坐化归西</li>
                  <li>⚡ 渡劫失败，形神俱灭</li>
                  <li>👹 走火入魔，万劫不复</li>
                  <li>⚔️ 与人争斗，兵败身亡</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <h4 className="font-bold text-amber-300 mb-2">💡 老玩家忠告</h4>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• 不要一上来就想突破筑基，先打牢根基</li>
                <li>• 打不过就跑，修真界最忌逞英雄</li>
                <li>• 是药三分毒，丹药不能当饭吃</li>
                <li>• 境界不代表一切，心境才是根本</li>
                <li>• 修仙路漫漫，慢慢来比较快</li>
              </ul>
            </div>
          </div>
        )

      case 'shortcuts':
        return (
          <div className="space-y-4">
            {XIANXIA_CONCEPTS.find((c) => c.id === 'keyboard-shortcuts')?.examples?.map((shortcut) => {
              const [key, desc] = shortcut.split(' - ')
              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <kbd className="px-3 py-1.5 rounded-lg bg-slate-800 text-sm font-mono text-purple-300 border border-white/10">
                    {key}
                  </kbd>
                  <span className="text-sm text-slate-400">{desc}</span>
                </div>
              )
            })}
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-l border-white/10 shadow-2xl flex flex-col"
          >
            <div className="flex-shrink-0 p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-indigo-500/30 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">修真百科</h2>
                    <p className="text-xs text-slate-400">修仙界的维基百科</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索修真术语..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setActiveTab('concepts')
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>

            <div className="flex-shrink-0 px-6 py-3 border-b border-white/10">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {renderContent()}
            </div>

            <div className="flex-shrink-0 p-6 border-t border-white/10 bg-gradient-to-t from-purple-500/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-purple-400">修真无岁月，弹指已千年</div>
                  <p className="text-xs text-slate-400">按 F1 随时打开修真百科</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
