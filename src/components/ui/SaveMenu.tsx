import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, FolderOpen, Trash2, X, Calendar, Users, Coins, Clock, Check } from 'lucide-react'
import type { GameSave } from '@data/simulations/market-economy/game-save'
import { getAllSaveSlots, saveGame, loadGame, deleteGame, type SaveSlot } from '@data/simulations/market-economy/game-save'
import type { EconomyState } from '@data/simulations/market-economy/types'

interface SaveMenuProps {
  isOpen: boolean
  onClose: () => void
  currentState?: EconomyState
  onLoad: (state: EconomyState) => void
  onSave?: () => void
}

export default function SaveMenu({ isOpen, onClose, currentState, onLoad, onSave }: SaveMenuProps) {
  const [slots, setSlots] = useState<SaveSlot[]>([])
  const [mode, setMode] = useState<'save' | 'load'>('save')
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      refreshSlots()
    }
  }, [isOpen])

  const refreshSlots = () => {
    setSlots(getAllSaveSlots())
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
      saveGame(currentState, slot)
      refreshSlots()
      onSave?.()
    }
  }

  const handleLoad = (slot: number, isAutosave = false) => {
    const saved = loadGame(slot, isAutosave)
    if (saved) {
      onLoad(saved)
      onClose()
    }
  }

  const handleDelete = (slot: number, isAutosave = false) => {
    deleteGame(slot, isAutosave)
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-2xl mx-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Save className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">存档管理</h2>
                    <p className="text-sm text-slate-400">管理游戏存档</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setMode('save')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    mode === 'save'
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  保存游戏
                </button>
                <button
                  onClick={() => setMode('load')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    mode === 'load'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <FolderOpen className="w-4 h-4 inline mr-2" />
                  读取存档
                </button>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto space-y-3">
              {slots.map((slotData) => (
                <motion.div
                  key={slotData.slot}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: slotData.slot * 0.05 }}
                  className={`relative p-4 rounded-xl border transition-all ${
                    slotData.save
                      ? 'bg-slate-700/30 border-slate-600/50 hover:border-amber-500/50'
                      : 'bg-slate-800/30 border-slate-700/30 border-dashed'
                  }`}
                >
                  {confirmDelete === slotData.slot ? (
                    <div className="flex items-center justify-between">
                      <span className="text-red-400">确定要删除这个存档吗？</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(slotData.slot, slotData.isAutosave)}
                          className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                          删除
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-3 py-1.5 rounded-lg bg-slate-600 text-white text-sm font-medium hover:bg-slate-500 transition-colors"
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  ) : slotData.save ? (
                    <>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            {slotData.isAutosave && (
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-medium">
                                自动存档
                              </span>
                            )}
                            <span className="font-semibold text-white">
                              {slotData.save.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(slotData.save.savedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              第 {slotData.save.day} 天
                            </span>
                          </div>
                        </div>
                        {!slotData.isAutosave && (
                          <button
                            onClick={() => setConfirmDelete(slotData.slot)}
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-slate-800/50 rounded-lg p-2">
                          <div className="text-xs text-slate-500">国家</div>
                          <div className="text-sm font-medium text-white">
                            {slotData.save.countryId.toUpperCase()}
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-2">
                          <div className="text-xs text-slate-500">人口</div>
                          <div className="text-sm font-medium text-white">
                            {(slotData.save.population / 100000000).toFixed(2)}亿
                          </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-2">
                          <div className="text-xs text-slate-500">GDP</div>
                          <div className="text-sm font-medium text-white">
                            ¥{(slotData.save.gdp / 1000000000000).toFixed(2)}万亿
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {mode === 'save' && !slotData.isAutosave && currentState && (
                          <button
                            onClick={() => handleSave(slotData.slot)}
                            className="flex-1 py-2 rounded-lg bg-amber-500/20 text-amber-400 font-medium hover:bg-amber-500/30 transition-colors"
                          >
                            <Save className="w-4 h-4 inline mr-2" />
                            覆盖存档
                          </button>
                        )}
                        {mode === 'load' && (
                          <button
                            onClick={() => handleLoad(slotData.slot, slotData.isAutosave)}
                            className="flex-1 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 font-medium hover:bg-emerald-500/30 transition-colors"
                          >
                            <FolderOpen className="w-4 h-4 inline mr-2" />
                            读取此存档
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    mode === 'save' &&
                    currentState && (
                      <button
                        onClick={() => handleSave(slotData.slot)}
                        className="w-full py-6 text-center text-slate-400 hover:text-amber-400 transition-colors"
                      >
                        <Save className="w-6 h-6 mx-auto mb-2" />
                        <span>空存档槽 - 点击保存</span>
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
