import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, X, Grid3x3, Clock, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'
import { useResponsive } from '../../hooks/useResponsive'
import { apiService, type Question, type Session, type Answer } from '../../../services/api'
import { useAppStore } from '../../../store'
import { cn } from '../../../utils/cn'
import AnswerSheet from '../../../components/AnswerSheet'
import { AssessmentOption } from '../../../components/AssessmentOption'
import type { Variants } from 'framer-motion'

const QUESTION_TIME_LIMIT = 3600
const ANSWER_STORAGE_KEY = 'mindmirror_answer_draft'

export default function AssessmentTaking() {
  const { assessmentId } = useParams<{ assessmentId: string }>()
  const navigate = useNavigate()
  const { isMobile } = useResponsive()
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showAnswerSheet, setShowAnswerSheet] = useState(false)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [isTimeout, setIsTimeout] = useState(false)
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
  const [calculating, setCalculating] = useState(false)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [savedAnswers, setSavedAnswers] = useState<Map<string, Answer>>(new Map())

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInitializedRef = useRef(false)

  const currentAssessmentMode = useAppStore((state) => state.currentAssessmentMode)
  const addCompletedAssessment = useAppStore((state) => state.addCompletedAssessment)
  
  const isEnhancedIdeology = assessmentId === 'ideology-enhanced'
  const effectiveMode = isEnhancedIdeology ? (currentAssessmentMode || 'normal') : 'normal'

  // 初始化会话
  useEffect(() => {
    const initializeSession = async () => {
      if (!assessmentId || isInitializedRef.current) return
      
      if (isEnhancedIdeology && !currentAssessmentMode) {
        navigate('/app/assessment/ideology-enhanced/mode-select')
        return
      }

      isInitializedRef.current = true
      setLoading(true)
      setError(null)

      try {
        const sessionData = await apiService.createSession(
          assessmentId,
          effectiveMode as 'normal' | 'professional'
        )
        
        setSession(sessionData)
        
        // 加载已保存的答案
        const storageKey = `${ANSWER_STORAGE_KEY}-${sessionData.session_id}`
        const saved = localStorage.getItem(storageKey)
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed)) {
              const answersMap = new Map<string, Answer>()
              parsed.forEach((a: any) => {
                answersMap.set(a.question_id, a)
              })
              setSavedAnswers(answersMap)
            }
          } catch (e) {
            console.error('Failed to load saved answers:', e)
          }
        }

        setTimeLeft(QUESTION_TIME_LIMIT)
      } catch (err) {
        console.error('初始化会话失败:', err)
        setError('无法加载测评题目，请稍后重试')
      } finally {
        setLoading(false)
      }
    }

    initializeSession()
  }, [assessmentId, effectiveMode, isEnhancedIdeology, currentAssessmentMode, navigate])

  // 计时器
  useEffect(() => {
    if (loading || !session) return

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeout(true)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [loading, session])

  // 加载已选答案
  useEffect(() => {
    if (!session || !session.questions) return
    
    const question = session.questions[currentQuestion]
    if (question && savedAnswers.has(question.id)) {
      const savedAnswer = savedAnswers.get(question.id)
      setSelectedOption(savedAnswer?.selected_option_id || null)
    } else {
      setSelectedOption(null)
    }
  }, [currentQuestion, session, savedAnswers])

  const questions = session?.questions || []

  const handleSelectOption = useCallback(async (optionId: string, value: number) => {
    if (!session || !questions[currentQuestion]) return

    setSelectedOption(optionId)

    try {
      const answer = await apiService.saveAnswer(
        session.session_id,
        questions[currentQuestion].id,
        optionId,
        value
      )

      const newAnswers = new Map(savedAnswers)
      newAnswers.set(questions[currentQuestion].id, {
        id: answer.answer_id,
        session_id: session.session_id,
        question_id: questions[currentQuestion].id,
        selected_option_id: optionId,
        value: value,
        created_at: new Date().toISOString(),
      } as Answer)
      setSavedAnswers(newAnswers)

      const storageKey = `${ANSWER_STORAGE_KEY}-${session.session_id}`
      localStorage.setItem(storageKey, JSON.stringify(Array.from(newAnswers.values())))

    } catch (err) {
      console.error('保存答案失败:', err)
    }
  }, [session, questions, currentQuestion, savedAnswers])

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = useCallback(async () => {
    if (!session || !assessmentId) return

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    setCalculating(true)
    setShowSubmitSuccess(true)
    
    try {
      setTimeout(async () => {
        try {
          const result = await apiService.submitAssessment(
            session.session_id,
            assessmentId,
            effectiveMode as 'normal' | 'professional'
          )
          
          addCompletedAssessment({
            id: result.result_id,
            assessmentId: assessmentId,
            answers: Array.from(savedAnswers.values()).map(a => ({
              questionId: a.question_id,
              selectedOptionId: a.selected_option_id,
              value: a.value,
            })),
            result: {
              dimension_scores: result.dimension_scores,
              left_right_score: result.left_right_score,
              auth_lib_score: result.auth_lib_score,
              accuracy: result.accuracy,
              mode: effectiveMode,
            },
            completedAt: new Date(),
            mode: effectiveMode as 'normal' | 'professional',
          })

          try {
            const storageKey = `${ANSWER_STORAGE_KEY}-${session.session_id}`
            localStorage.removeItem(storageKey)
          } catch (e) {
            console.error('Failed to clear localStorage:', e)
          }

          setCalculating(false)
          navigate(`/app/assessment/${assessmentId}/result/${result.result_id}`, {
            state: { calculationResult: result }
          })
        } catch (error) {
          console.error('提交失败:', error)
          setCalculating(false)
        }
      }, 800)
    } catch (error) {
      console.error('提交失败:', error)
      setCalculating(false)
      setShowSubmitSuccess(false)
    }
  }, [session, assessmentId, effectiveMode, savedAnswers, addCompletedAssessment, navigate])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">正在加载题目...</p>
        </div>
      </div>
    )
  }

  if (error || !session || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">加载失败</h2>
          <p className="text-white/60 mb-6">{error || '无法加载测评题目'}</p>
          <button
            onClick={() => navigate('/app/assessments')}
            className="px-6 py-3 bg-violet-500 text-white rounded-xl font-semibold"
          >
            返回测评列表
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const answeredCount = savedAnswers.size
  const progress = (answeredCount / questions.length) * 100

  const optionVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.2 }
    })
  }), [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                effectiveMode === 'professional' 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
              }`}>
                {effectiveMode === 'professional' ? '专业版' : '普通版'}
              </span>
              <span className="text-white/60 text-sm hidden sm:inline">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                timeLeft < 300 ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/60'
              }`}>
                <Clock size={16} />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              
              <button
                onClick={() => setShowAnswerSheet(true)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Grid3x3 size={20} className="text-white/60" />
              </button>
              
              <button
                onClick={() => setShowExitConfirm(true)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-white/60" />
              </button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Question text */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs mb-4">
                <span className="font-medium">{question.type === 'core-principle' ? '核心原则' : 
                  question.type === 'policy-stand' ? '政策立场' : 
                  question.type === 'value-question' ? '价值取向' : '权衡判断'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                {question.text}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <AssessmentOption
                  key={option.id || index}
                  option={option}
                  index={index}
                  selected={!!(option.id && selectedOption === option.id)}
                  onClick={(id) => handleSelectOption(id, option.value)}
                  variants={optionVariants}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pt-8 pb-6">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                currentQuestion === 0
                  ? "bg-white/5 text-white/30 cursor-not-allowed"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">上一题</span>
            </button>

            <div className="flex-1 text-center text-sm text-white/60">
              已回答 {answeredCount} / {questions.length} 题
            </div>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <CheckCircle2 size={20} />
                <span>提交</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <span className="hidden sm:inline">下一题</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Answer Sheet Modal */}
      {showAnswerSheet && (
        <AnswerSheet
          questions={questions.map((q, idx) => ({
            id: q.id,
            number: idx + 1,
            answered: savedAnswers.has(q.id),
            current: idx === currentQuestion,
          }))}
          onSelectQuestion={(idx) => {
            setCurrentQuestion(idx)
            setShowAnswerSheet(false)
          }}
          onClose={() => setShowAnswerSheet(false)}
        />
      )}

      {/* Exit Confirmation */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-3">确定要退出吗？</h3>
            <p className="text-white/60 mb-6">你的答题进度已自动保存，可以随时继续。</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20"
              >
                继续答题
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false)
                  navigate('/app/assessments')
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500/20 text-red-400 font-medium hover:bg-red-500/30"
              >
                退出
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Submit Confirmation */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-3">确认提交测评？</h3>
            <p className="text-white/60 mb-6">
              你已回答 {answeredCount} / {questions.length} 题，提交后将无法修改答案。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20"
              >
                继续答题
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium hover:opacity-90"
              >
                确认提交
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Submit Success */}
      {showSubmitSuccess && calculating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">正在计算结果...</h3>
            <p className="text-white/60">请稍候</p>
          </motion.div>
        </div>
      )}
    </div>
  )
}
