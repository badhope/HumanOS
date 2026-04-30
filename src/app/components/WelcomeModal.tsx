import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface WelcomeModalProps {
  onClose: () => void
}

export default function WelcomeModal({ onClose }: WelcomeModalProps) {
  const navigate = useNavigate()

  const handleStart = () => {
    onClose()
    navigate('/legacy/categories')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-full max-w-sm bg-slate-900 rounded-3xl border border-violet-500/20 overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 via-pink-500 to-orange-500 flex items-center justify-center"
            >
              <span className="text-4xl">✨</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-2"
            >
              欢迎来到心镜 MindMirror
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-white/50 text-sm mb-6"
            >
              开启你的心灵成长之旅
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 mb-6"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">🧠</span>
                <span className="text-sm">3分钟完成人格测评</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">💪</span>
                <span className="text-sm">获得定制化训练方案</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">📈</span>
                <span className="text-sm">每日追踪成长进度</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-white/5 text-white/60 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                稍后再说
              </button>
              <button
                onClick={handleStart}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                立即开始
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
