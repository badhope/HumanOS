import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, FolderOpen, Trash2, X, Calendar, Clock, Zap, Heart } from 'lucide-react'
import type { GameState } from '@data/simulations/xianxia/event-system/types'
import {
  getAllXianxiaSaveSlots,
  saveXianxiaGame,
  loadXianxiaGame,
  deleteXianxiaSave,
  type XianxiaSaveSlot,
} from '@data/simulations/xianxia/xianxia-save'

interface XianxiaSaveMenuProps {
  isOpen: boolean
  onClose: () => void
  currentState?: GameState
  onLoad: (state: GameState) => void
  onSave?: () => void
}

export default function XianxiaSaveMenu({ isOpen, onClose, currentState, onLoad, onSave }: XianxiaSaveMenuProps) {
  const [slots, setSlots] = useState<XianxiaSaveSlot[]>([])
  const [mode, setMode] = useState<'save' | 'load'>('save')
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      refreshSlots()
    }
  }, [isOpen])

  const refreshSlots = () => {
    setSlots(getAllXianxiaSaveSlots())
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleSave = (slot: number, isAutosave = false) => {
    if (!currentState) return
    if (!isAutosave) {
      saveXianxiaGame(currentState, slot)
      refreshSlots()
      onSave?.()
    }
  }

  const handleLoad = (slot: number, isAutosave = false) => {
    const saved = loadXianxiaGame(slot, isAutosave)
    if (saved) {
      onLoad(saved)
      onClose()
    }
  }

  const handleDelete = (slot: number, isAutosave = false) => {
    deleteXianxiaSave(slot, isAutosave)
    setConfirmDelete(null)
    refreshSlots()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-2xl mx-4 bg-gradient-to-br from-amber-950/80 via-black to-stone-950/80 rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                    <Save className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-amber-100">仙途存档</h2>
                    <p className="text-sm text-amber-400/60">记录你的修仙历程</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-amber-500/10 transition-colors"
                >
                  <X className="w-5 h-5 text-amber-400/60" />
                </button>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setMode('save')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    mode === 'save'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/20'
                      : 'bg-amber-500/10 text-amber-400/60 hover:bg-amber-500/20'
                  }`}
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  保存进度
                </button>
                <button
                  onClick={() => setMode('load')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    mode === 'load'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400/60 hover:bg-amber-500/20'
                  }`}
                >
                  <FolderOpen className="w-4 h-4 inline mr-2" />
                  读取存档
                </button>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto space-y-3">
              {slots.map((slotData, index) => (
                <motion.div
                  key={slotData.slot}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative p-4 rounded-xl border transition-all ${
                    slotData.save
                      ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40'
                      : 'bg-black/30 border-amber-500/10 border-dashed'
                  }`}
                >
                  {confirmDelete === slotData.slot ? (
                    <div className="flex items-center justify-between">
                      <span className="text-red-400">确定要删除这个存档吗？道途将就此消散...</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(slotData.slot, slotData.isAutosave)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/80 text-white text-sm font-medium hover:bg-red-500 transition-colors"
                        >
                          确认删除
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-3 py-1.5 rounded-lg bg-stone-700 text-white text-sm font-medium hover:bg-stone-600 transition-colors"
                        >
                          留下仙缘
                        </button>
                      </div>
                    </div>
                  ) : slotData.save ? (
                    <>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            {slotData.isAutosave && (
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-medium border border-amber-500/30">
                                自动存档
                              </span>
                            )}
                            <span className="font-semibold text-amber-100">
                              {slotData.save.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-amber-400/60">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(slotData.save.savedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              第 {slotData.save.turn} 回合
                            </span>
                          </div>
                        </div>
                        {!slotData.isAutosave && (
                          <button
                            onClick={() => setConfirmDelete(slotData.slot)}
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-amber-400/40 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-4 gap-2 mb-3">
                        <div className="bg-black/40 rounded-lg p-2 border border-amber-500/10">
                          <div className="text-xs text-amber-400/50">灵根</div>
                          <div className="text-sm font-bold text-amber-300 flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            {slotData.save.state.stats.spiritualRoot}
                          </div>
                        </div>
                        <div className="bg-black/40 rounded-lg p-2 border border-amber-500/10">
                          <div className="text-xs text-amber-400/50">心境</div>
                          <div className="text-sm font-bold text-blue-300">
                            {slotData.save.state.stats.mindset}
                          </div>
                        </div>
                        <div className="bg-black/40 rounded-lg p-2 border border-amber-500/10">
                          <div className="text-xs text-amber-400/50">心机</div>
                          <div className="text-sm font-bold text-rose-300">
                            {slotData.save.state.stats.cunning}
                          </div>
                        </div>
                        <div className="bg-black/40 rounded-lg p-2 border border-amber-500/10">
                          <div className="text-xs text-amber-400/50">气运</div>
                          <div className="text-sm font-bold text-yellow-300 flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {slotData.save.state.stats.luck}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {mode === 'save' && !slotData.isAutosave && currentState && (
                          <button
                            onClick={() => handleSave(slotData.slot)}
                            className="flex-1 py-2 rounded-lg bg-amber-500/20 text-amber-400 font-medium hover:bg-amber-500/30 transition-colors border border-amber-500/30"
                          >
                            <Save className="w-4 h-4 inline mr-2" />
                            覆盖此存档
                          </button>
                        )}
                        {mode === 'load' && (
                          <button
                            onClick={() => handleLoad(slotData.slot, slotData.isAutosave)}
                            className="flex-1 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                          >
                            <FolderOpen className="w-4 h-4 inline mr-2" />
                            重入此仙途
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    mode === 'save' &&
                    currentState && (
                      <button
                        onClick={() => handleSave(slotData.slot)}
                        className="w-full py-6 text-center text-amber-400/40 hover:text-amber-400 transition-colors"
                      >
                        <Save className="w-6 h-6 mx-auto mb-2" />
                        <span>空仙缘 - 点击记录此刻修为</span>
                      </button>
                    )
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
