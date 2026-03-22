import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { getAssessmentById } from '@data/assessments'
import { useStore } from '@store'
import type { Answer } from '@types'
import { cn } from '@utils/cn'

export default function Assessment() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  
  const assessment = id ? getAssessmentById(id) : undefined
  const { addCompletedAssessment } = useStore()

  useEffect(() => {
    if (!assessment) {
      navigate('/')
    } else {
      // Reset state when assessment changes
      setCurrentQuestion(0)
      setAnswers([])
      setSelectedOption(null)
    }
  }, [assessment, navigate, id])

  // Get current answer for this question
  const getCurrentAnswer = useCallback(() => {
    if (!assessment) return null
    return answers.find(a => a.questionId === assessment.questions[currentQuestion]?.id)
  }, [answers, assessment, currentQuestion])

  // Update selected option when question changes
  useEffect(() => {
    const currentAnswer = getCurrentAnswer()
    setSelectedOption(currentAnswer?.selectedOptions[0] || null)
  }, [currentQuestion, getCurrentAnswer])

  if (!assessment) return null

  const question = assessment.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleConfirmAnswer = () => {
    if (!selectedOption || !question) return

    const newAnswer: Answer = {
      questionId: question.id,
      selectedOptions: [selectedOption],
      value: question.options.find((o) => o.id === selectedOption)?.value,
    }

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

    // Auto advance after selection
    if (currentQuestion < assessment.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOption(null)
      }, 400)
    }
  }

  const handleSubmit = async () => {
    // Ensure current question's answer is saved
    let finalAnswers = [...answers]
    
    if (selectedOption && question) {
      const currentAnswer: Answer = {
        questionId: question.id,
        selectedOptions: [selectedOption],
        value: question.options.find((o) => o.id === selectedOption)?.value,
      }
      
      const existingIndex = finalAnswers.findIndex(a => a.questionId === question.id)
      if (existingIndex >= 0) {
        finalAnswers[existingIndex] = currentAnswer
      } else {
        finalAnswers.push(currentAnswer)
      }
    }

    // Fill unanswered questions with default
    const completeAnswers = assessment.questions.map((q) => {
      const existing = finalAnswers.find((a) => a.questionId === q.id)
      if (existing) return existing
      return {
        questionId: q.id,
        selectedOptions: [q.options[0].id],
        value: q.options[0].value,
      }
    })
    
    setIsSubmitting(true)
    
    // Simulate calculation delay
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
    // Save current answer before moving
    if (selectedOption && question) {
      const newAnswer: Answer = {
        questionId: question.id,
        selectedOptions: [selectedOption],
        value: question.options.find((o) => o.id === selectedOption)?.value,
      }

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

    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedOption(null)
    }
  }

  const handlePrev = () => {
    // Save current answer before moving back
    if (selectedOption && question) {
      const newAnswer: Answer = {
        questionId: question.id,
        selectedOptions: [selectedOption],
        value: question.options.find((o) => o.id === selectedOption)?.value,
      }

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

  const isLastQuestion = currentQuestion === assessment.questions.length - 1
  const canProceed = selectedOption !== null || getCurrentAnswer() !== undefined

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {assessment.title}
          </h1>
          <p className="text-white/60">{assessment.description}</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-white/60 mb-2">
            <span>进度</span>
            <span>
              {currentQuestion + 1} / {assessment.questions.length}
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

        {/* Question Card */}
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
              {currentQuestion + 1}. {question.text}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => {
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

        {/* Navigation */}
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
          >
            <ArrowLeft className="w-4 h-4" />
            上一题
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
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
