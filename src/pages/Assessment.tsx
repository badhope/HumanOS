import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { getAssessmentById } from '@data/assessments'
import { useStore } from '@store'
import type { Answer, Question } from '../types'
import { cn } from '@utils/cn'

export default function Assessment() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])

  const assessment = id ? getAssessmentById(id) : undefined
  const { addCompletedAssessment } = useStore()

  useEffect(() => {
    if (!assessment) {
      navigate('/')
    }
  }, [assessment, navigate])

  useEffect(() => {
    if (assessment) {
      setQuestions(assessment.questions)
      setCurrentQuestion(0)
      setAnswers([])
      setSelectedOption(null)
    }
  }, [assessment])

  const createAnswer = useCallback((questionId: string, optionId: string, question: Question): Answer => {
    const selectedOpt = question.options.find((o) => o.id === optionId)
    return {
      questionId,
      selectedOptions: [optionId],
      value: selectedOpt?.value,
      trait: selectedOpt?.trait,
    }
  }, [])

  const getCurrentAnswer = useCallback(() => {
    if (!questions.length) return null
    return answers.find(a => a.questionId === questions[currentQuestion]?.id)
  }, [answers, questions, currentQuestion])

  useEffect(() => {
    const currentAnswer = getCurrentAnswer()
    setSelectedOption(currentAnswer?.selectedOptions[0] || null)
  }, [currentQuestion, getCurrentAnswer])

  if (!assessment) return null

  const question = questions[currentQuestion]
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleSubmit = async () => {
    const finalAnswers = [...answers]

    if (selectedOption && question) {
      const currentAnswer = createAnswer(question.id, selectedOption, question)

      const existingIndex = finalAnswers.findIndex(a => a.questionId === question.id)
      if (existingIndex >= 0) {
        finalAnswers[existingIndex] = currentAnswer
      } else {
        finalAnswers.push(currentAnswer)
      }
    }

    const completeAnswers = questions.map((q) => {
      const existing = finalAnswers.find((a) => a.questionId === q.id)
      if (existing) return existing
      const firstOption = q.options[0]
      return {
        questionId: q.id,
        selectedOptions: [firstOption.id],
        value: firstOption.value,
        trait: firstOption.trait,
      }
    })

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const result = assessment.resultCalculator(completeAnswers)

    addCompletedAssessment({
      assessmentId: assessment.id,
      completedAt: new Date(),
      result,
      answers: completeAnswers,
    })

    navigate(`/results/${assessment.id}`)
  }

  const handleNext = () => {
    if (selectedOption && question) {
      const newAnswer = createAnswer(question.id, selectedOption, question)

      setAnswers(prevAnswers => {
        const existingIndex = prevAnswers.findIndex(
          (a) => a.questionId === question.id
        )

        if (existingIndex >= 0) {
          const newAnswers = [...prevAnswers]
          newAnswers[existingIndex] = newAnswer
          return newAnswers
        } else {
          return [...prevAnswers, newAnswer]
        }
      })
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedOption(null)
    }
  }

  const handlePrev = () => {
    if (selectedOption && question) {
      const newAnswer = createAnswer(question.id, selectedOption, question)

      setAnswers(prevAnswers => {
        const existingIndex = prevAnswers.findIndex(
          (a) => a.questionId === question.id
        )

        if (existingIndex >= 0) {
          const newAnswers = [...prevAnswers]
          newAnswers[existingIndex] = newAnswer
          return newAnswers
        } else {
          return [...prevAnswers, newAnswer]
        }
      })
    }

    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleBackToModes = () => {
    navigate('/')
  }

  const isLastQuestion = questions.length > 0 && currentQuestion === questions.length - 1
  const canProceed = selectedOption !== null || getCurrentAnswer() !== undefined

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={handleBackToModes}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
            返回模式选择
          </button>

          <h1 className="text-3xl font-bold text-white mb-2">
            {assessment.title}
          </h1>
          <p className="text-white/60">
            {assessment.description}
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-white/60 mb-2">
            <span>进度</span>
            <span>
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${assessment.id}-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-8 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              {currentQuestion + 1}. {question?.text}
            </h2>

            <div className="space-y-3">
              {question?.options.map((option, index) => {
                const isSelected = selectedOption === option.id

                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleOptionSelect(option.id)}
                    className={cn(
                      'w-full text-left p-4 rounded-xl transition-all duration-300',
                      'border-2',
                      isSelected
                        ? 'border-violet-500 bg-violet-500/20'
                        : 'border-white/10 hover:border-white/30 bg-white/5'
                    )}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                          isSelected
                            ? 'border-violet-500 bg-violet-500'
                            : 'border-white/30'
                        )}
                      >
                        {isSelected && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-white">{option.text}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
              currentQuestion === 0
                ? 'text-white/30 cursor-not-allowed'
                : 'text-white hover:bg-white/10'
            )}
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
            上一题
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              type="button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  计算中...
                </>
              ) : (
                <>
                  查看结果
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                canProceed
                  ? 'text-white hover:bg-white/10'
                  : 'text-white/30 cursor-not-allowed'
              )}
              type="button"
            >
              下一题
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
