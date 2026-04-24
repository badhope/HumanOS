import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Search, X, BookOpen, Target, TrendingUp, Trophy, Skull, BookMarked, GraduationCap, Keyboard, Lightbulb, ArrowRight, Link2 } from 'lucide-react'
import { getAllTooltips, type AreaTooltip } from '@data/simulations/market-economy/area-tooltips'
import { CONCEPTS_GLOSSARY, searchConcepts, getConceptsByCategory, type Concept } from '@data/simulations/market-economy/concepts-glossary'

interface GameHelpCenterProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = 'areas' | 'concepts' | 'guide' | 'shortcuts'

export default function GameHelpCenter({ isOpen, onClose }: GameHelpCenterProps) {
  const [activeTab, setActiveTab] = useState<TabType>('areas')
  const [searchTerm, setSearchTerm] = useState('')
  const [conceptCategory, setConceptCategory] = useState<string>('all')
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null)

  const allTooltips = getAllTooltips()

  const tabs = [
    { id: 'areas' as TabType, label: '区域说明', icon: <Target className="w-4 h-4" /> },
    { id: 'concepts' as TabType, label: '概念词典', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'guide' as TabType, label: '完整攻略', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'shortcuts' as TabType, label: '快捷键', icon: <Keyboard className="w-4 h-4" /> },
  ]

  const conceptCategories = [
    { id: 'all', label: '全部' },
    { id: 'economics', label: '经济学原理' },
    { id: 'game-mechanic', label: '游戏机制' },
    { id: 'strategy', label: '玩法攻略' },
    { id: 'interface', label: '界面操作' },
  ]

  const getFilteredItems = () => {
    if (activeTab === 'areas') {
      if (!searchTerm) return allTooltips
      const term = searchTerm.toLowerCase()
      return allTooltips.filter(t => 
        t.title.toLowerCase().includes(term) ||
        t.summary.toLowerCase().includes(term)
      )
    }
    
    if (activeTab === 'concepts') {
      let concepts = conceptCategory === 'all' 
        ? CONCEPTS_GLOSSARY 
        : getConceptsByCategory(conceptCategory as Concept['category'])
      
      if (searchTerm) {
        concepts = searchConcepts(searchTerm)
      }
      
      return concepts
    }
    
    return []
  }

  const filteredItems = getFilteredItems()
  const shortcuts = CONCEPTS_GLOSSARY.find(c => c.id === 'keyboard-shortcuts')
  const tutorialGuide = CONCEPTS_GLOSSARY.find(c => c.id === 'tutorial-summary')

  const renderContent = () => {
    if (activeTab === 'shortcuts') {
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-sky-500/10 rounded-xl border border-blue-500/20 p-6">
            <h4 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              {shortcuts?.term}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {shortcuts?.examples?.map((shortcut, i) => {
                const [key, desc] = shortcut.split(' - ')
                return (
                  <div key={i} className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3">
                    <kbd className="px-3 py-1.5 bg-slate-700 rounded-lg font-mono text-sm text-amber-400 border border-slate-600">
                      {key}
                    </kbd>
                    <span className="text-sm text-slate-300">{desc}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === 'guide') {
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20 p-6">
            <h4 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              {tutorialGuide?.term}
            </h4>
            <p className="text-slate-300 mb-4">{tutorialGuide?.definition}</p>
            {tutorialGuide?.strategy && (
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  完整攻略路线图
                </div>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                  {tutorialGuide.strategy}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20 p-6">
            <h4 className="text-lg font-bold text-amber-400 mb-4">🎯 胜利条件</h4>
            <div className="space-y-3">
              {[
                { name: '经济霸权', desc: 'GDP达到世界第一，人均收入超过发达国家水平', icon: '🏆' },
                { name: '财政大师', desc: '零国债、国库充足、年年盈余的财政健康国家', icon: '💰' },
                { name: '稳定乐土', desc: '高就业、低通胀、人民安居乐业的和谐社会', icon: '🏡' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-800/30 rounded-lg p-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-sm text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-xl border border-red-500/20 p-6">
            <h4 className="text-lg font-bold text-red-400 mb-4">💀 失败结局</h4>
            <div className="space-y-3">
              {[
                { name: '主权违约', desc: '还不起国债本息，国家信用破产', icon: '💸' },
                { name: '恶性通胀', desc: '通胀率超过50%，货币体系崩溃', icon: '🔥' },
                { name: '大饥荒', desc: '粮食严重短缺，民不聊生', icon: '🌾' },
                { name: '政权崩溃', desc: '稳定度太低，爆发革命推翻政府', icon: '⚔️' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-800/30 rounded-lg p-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-sm text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === 'concepts') {
      return (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap mb-2">
            {conceptCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setConceptCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  conceptCategory === cat.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 mb-4">
            找到 {filteredItems.length} 个概念
          </div>

          <div className="space-y-3">
            {(filteredItems as Concept[]).map((concept) => (
              <motion.div
                key={concept.id}
                layout
                className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedConcept(expandedConcept === concept.id ? null : concept.id)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{concept.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{concept.term}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
                        {conceptCategories.find(c => c.id === concept.category)?.label}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-slate-500 transition-transform ${
                    expandedConcept === concept.id ? 'rotate-90' : ''
                  }`} />
                </button>

                <AnimatePresence>
                  {expandedConcept === concept.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-4">
                        <p className="text-slate-300 text-sm">{concept.definition}</p>

                        {concept.formula && (
                          <div className="bg-emerald-500/10 rounded-lg p-3">
                            <div className="text-xs font-semibold text-emerald-400 mb-1">📐 计算公式</div>
                            <code className="text-sm text-emerald-300 font-mono">{concept.formula}</code>
                          </div>
                        )}

                        {concept.mechanic && (
                          <div className="bg-blue-500/10 rounded-lg p-3">
                            <div className="text-xs font-semibold text-blue-400 mb-1">⚙️ 游戏机制</div>
                            <p className="text-sm text-blue-300">{concept.mechanic}</p>
                          </div>
                        )}

                        {concept.strategy && (
                          <div className="bg-amber-500/10 rounded-lg p-3">
                            <div className="text-xs font-semibold text-amber-400 mb-1">💡 玩法攻略</div>
                            <p className="text-sm text-amber-300">{concept.strategy}</p>
                          </div>
                        )}

                        {concept.examples && concept.examples.length > 0 && (
                          <div className="bg-purple-500/10 rounded-lg p-3">
                            <div className="text-xs font-semibold text-purple-400 mb-1">📚 历史案例</div>
                            <ul className="space-y-1">
                              {concept.examples.map((ex, i) => (
                                <li key={i} className="text-sm text-purple-300 flex items-start gap-2">
                                  <span className="text-purple-500">•</span>
                                  {ex}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {concept.related && concept.related.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Link2 className="w-4 h-4 text-slate-500" />
                            <span className="text-xs text-slate-500">相关概念：</span>
                            {concept.related.map((relId) => {
                              const rel = CONCEPTS_GLOSSARY.find(c => c.id === relId)
                              return rel ? (
                                <button
                                  key={relId}
                                  onClick={() => setExpandedConcept(relId)}
                                  className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
                                >
                                  {rel.term.split(' ')[0]}
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

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-slate-500">没有找到匹配的概念</p>
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        <div className="text-xs text-slate-500 mb-2">
          找到 {filteredItems.length} 个帮助主题
        </div>
        
        {(filteredItems as AreaTooltip[]).map((tooltip) => (
          <motion.div
            key={tooltip.areaId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 px-4 py-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <span className="text-xl">{tooltip.icon}</span>
                <h4 className="font-bold text-white">{tooltip.title}</h4>
              </div>
              <p className="text-sm text-slate-300 mt-1">{tooltip.summary}</p>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <div className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wider">功能说明</div>
                <ul className="space-y-1.5">
                  {tooltip.details.map((detail, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                      <span className="text-emerald-500/70 mt-0.5">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {tooltip.tips.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    💡 游戏提示
                  </div>
                  <ul className="space-y-1.5">
                    {tooltip.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-amber-300/80 flex items-start gap-2">
                        <span className="text-amber-500/70 mt-0.5">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-500">没有找到匹配的帮助内容</p>
          </div>
        )}
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/85 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[520px] z-50 bg-gradient-to-b from-zinc-900 to-black border-l-2 border-emerald-500/30 shadow-2xl flex flex-col"
          >
            <div className="flex-shrink-0 p-6 border-b border-white/10 bg-gradient-to-b from-emerald-500/10 to-transparent">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30">
                    <HelpCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">游戏百科全书</h2>
                    <p className="text-xs text-slate-400">按 F1 随时打开 · 覆盖 {CONCEPTS_GLOSSARY.length + allTooltips.length}+ 条目</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-1 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setExpandedConcept(null) }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all flex-1 justify-center ${
                      activeTab === tab.id
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder={`搜索${activeTab === 'concepts' ? '经济学概念、游戏机制...' : '帮助内容...'}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 text-sm"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {renderContent()}
            </div>

            <div className="flex-shrink-0 p-6 border-t border-white/10 bg-gradient-to-t from-amber-500/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="font-medium text-amber-400">经济学家养成中...</div>
                  <p className="text-xs text-slate-400">不懂的名词随时查这里，玩完你也是经济学专家</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
