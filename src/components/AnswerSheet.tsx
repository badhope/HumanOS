import { memo, useMemo } from 'react'
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

interface QuestionItemProps {
  question: Question
  index: number
  isAnswered: boolean
  isCurrent: boolean
  onClick: () => void
}

const QuestionItem = memo(function QuestionItem({
  question,
  index,
  isAnswered,
  isCurrent,
  onClick,
}: QuestionItemProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'w-full p-3 rounded-lg text-left transition-all flex items-center justify-between',
        isCurrent
          ? 'bg-violet-500/30 border-2 border-violet-500 text-white'
          : isAnswered
          ? 'bg-emerald-500/20 border-2 border-emerald-500/50 text-white/80'
          : 'bg-white/5 border-2 border-transparent text-white/50 hover:bg-white/10'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
    >
      <span className="font-medium">
        {index + 1}. {question.text?.slice(0, 30)}{question.text?.length > 30 ? '...' : ''}
      </span>
      {isAnswered && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />}
    </motion.button>
  )
}, (prev, next) => {
  return (
    prev.isAnswered === next.isAnswered &&
    prev.isCurrent === next.isCurrent &&
    prev.question.id === next.question.id
  )
})

function AnswerSheet({
  isOpen,
  onClose,
  questions,
  answers,
  currentQuestion,
  onQuestionSelect,
}: AnswerSheetProps) {
  const answeredIds = useMemo(() => {
    return new Set(answers.map(a => a.questionId))
  }, [answers])

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

              <div className="space-y-2">
                {questions.map((question, index) => (
                  <QuestionItem
                    key={question.id || index}
                    question={question}
                    index={index}
                    isAnswered={answeredIds.has(question.id)}
                    isCurrent={index === currentQuestion}
                    onClick={() => onQuestionSelect(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default memo(AnswerSheet, (prev, next) => {
  return (
    prev.isOpen === next.isOpen &&
    prev.currentQuestion === next.currentQuestion &&
    prev.questions.length === next.questions.length &&
    prev.answers.length === next.answers.length
  )
})
