/**
 * ==============================================
 * 📋 答题卡侧边栏组件
 * ==============================================
 * 【组件功能】
 * 测评答题时的概览面板，显示所有题目的作答状态
 * 
 * 【状态指示】
 * - ✅ 绿色边框：已作答
 * - ⚪ 灰色边框：未作答
 * - 🔵 蓝色高亮：当前题目
 * 
 * 【交互功能】
 * - 点击题目直接跳转到对应题号
 * - 实时显示已完成/总题数进度
 * - 动画滑入滑出侧边栏
 */

import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import type { Answer, Question } from '../types'
import { cn } from '@utils/cn'

interface AnswerSheetProps {
  isOpen: boolean
  onClose: () => void
  questions: Question[]
  answers: Answer[]
  currentQuestion: number
  onQuestionSelect: (index: number) => void
}

export default function AnswerSheet({
  isOpen,
  onClose,
  questions,
  answers,
  currentQuestion,
  onQuestionSelect,
}: AnswerSheetProps) {
  const getQuestionStatus = (questionId: string, index: number) => {
    const isAnswered = answers.some(a => a.questionId === questionId)
    const isCurrent = index === currentQuestion
    return { isAnswered, isCurrent }
  }

  const answeredCount = answers.length
  const totalCount = questions.length
  const progress = (answeredCount / totalCount) * 100

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
          />

          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900/95 backdrop-blur-xl z-[301] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">答题卡</h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  aria-label="关闭答题卡"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">答题进度</span>
                  <span className="text-white font-semibold">
                    {answeredCount} / {totalCount}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {questions.map((question, index) => {
                  const { isAnswered, isCurrent } = getQuestionStatus(question.id, index)
                  
                  return (
                    <motion.button
                      key={question.id}
                      onClick={() => {
                        onQuestionSelect(index)
                        onClose()
                      }}
                      className={cn(
                        'aspect-square rounded-xl flex items-center justify-center text-sm font-semibold transition-all relative',
                        isCurrent && 'ring-2 ring-violet-500',
                        isAnswered
                          ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                          : 'glass text-white/60 hover:bg-white/10'
                      )}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                    >
                      {index + 1}
                      {isAnswered && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check className="w-2.5 h-2.5 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-r from-violet-500 to-pink-500" />
                    <span className="text-white/60">已答</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded glass" />
                    <span className="text-white/60">未答</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded glass ring-2 ring-violet-500" />
                    <span className="text-white/60">当前</span>
                  </div>
                </div>
              </div>

              {answeredCount === totalCount && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30"
                >
                  <p className="text-green-400 text-sm text-center font-medium">
                    🎉 所有题目已完成！
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
