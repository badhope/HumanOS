/**
 * ==============================================
 * 📝 测评答题页面组件
 * ==============================================
 * 【页面功能】
 * - 题目分页/滑屏切换
 * - 答案实时保存
 * - 进度条显示
 * - 专业版/娱乐版双模式
 * 
 * 【核心机制】
 * - 防刷新：答案存在localStorage
 * - 防作弊：禁止题目回溯
 * - 自动保存：每题答完自动存
 * - 键盘快捷键：支持方向键答题
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, X, Grid3x3, Clock, AlertTriangle, Home, CheckCircle2, Cloud, CloudOff, RefreshCw } from 'lucide-react'
import LegacyHeader from '../app/components/LegacyHeader'
import { useResponsive } from '../app/hooks/useResponsive'
import { getAssessmentById } from '@data/assessments'
import { LoadingState, ErrorState } from '@components/ui/LoadingState'
import { useAppStore } from '../store'
import type { Answer, Question, ProfessionalQuestion } from '../types'
import { cn } from '@utils/cn'
import AnswerSheet from '@components/AnswerSheet'
import { AssessmentOption } from '@components/AssessmentOption'
import { calculateProfessionalResult } from '@utils/professionalCalculators'
import { calculatorService } from '@services/calculatorWrapper'
import type { CalculationResponse as UnifiedCalculationResult } from '@services/apiClient'
import {
  mbtiProfessionalQuestions,
  bigFiveProfessionalQuestions,
  sasProfessionalQuestions,
  eqProfessionalQuestions,
  hollandProfessionalQuestions,
  ecrProfessionalQuestions,
  mlqProfessionalQuestions,
  kolbProfessionalQuestions,
  pssProfessionalQuestions,
  watsonGlaserQuestions,
  iqProfessionalQuestions,
  politicalIdeologyQuestions,
  sdsProfessionalQuestions,
} from '@data/professional'
import { processAssessmentQuestions } from '@utils/questionQualityControl'

const QUESTION_TIME_LIMIT = 45
const ANSWER_STORAGE_KEY = 'assessment-answers-draft'

export default function Assessment() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [showAnswerSheet, setShowAnswerSheet] = useState(false)
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [isTimeout, setIsTimeout] = useState(false)
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
  const [calculationSource, setCalculationSource] = useState<'auto' | 'frontend' | 'backend' | 'checking'>('checking')
  const [calculating, setCalculating] = useState(false)
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInitializedRef = useRef(false)

  const mode = searchParams.get('mode') || 'normal'
  const assessment = useMemo(() => id ? getAssessmentById(id) : undefined, [id])
  const addCompletedAssessment = useAppStore((state) => state.addCompletedAssessment)

  const getProfessionalQuestions = useCallback((assessmentId: string): ProfessionalQuestion[] => {
    const questionSets: Record<string, ProfessionalQuestion[]> = {
      'mbti-standard': mbtiProfessionalQuestions.professional,
      'mbti': mbtiProfessionalQuestions.professional,
      'mbti-professional': mbtiProfessionalQuestions.professional,
      'big-five': bigFiveProfessionalQuestions.professional,
      'bigfive': bigFiveProfessionalQuestions.professional,
      'anxiety-scale': sasProfessionalQuestions.professional,
      'anxiety': sasProfessionalQuestions.professional,
      'emotional-intelligence': eqProfessionalQuestions.professional,
      'eq-test': eqProfessionalQuestions.professional,
      'holland-career': hollandProfessionalQuestions.professional,
      'holland': hollandProfessionalQuestions.professional,
      'attachment-style': ecrProfessionalQuestions.professional,
      'attachment': ecrProfessionalQuestions.professional,
      'leadership-style': mlqProfessionalQuestions.professional,
      'leadership': mlqProfessionalQuestions.professional,
      'learning-style': kolbProfessionalQuestions.professional,
      'critical-thinking': watsonGlaserQuestions.professional,
      'stress-management': pssProfessionalQuestions.professional,
      'iq-test': iqProfessionalQuestions.professional,
      'iq': iqProfessionalQuestions.professional,
      'political-ideology': politicalIdeologyQuestions.professional,
      'political': politicalIdeologyQuestions.professional,
      'sds-depression': sdsProfessionalQuestions.professional,
      'sds': sdsProfessionalQuestions.professional,
    }
    return questionSets[assessmentId] || []
  }, [])

  const convertProfessionalToQuestion = useCallback((pq: ProfessionalQuestion): Question => {
    return {
      id: pq.id,
      text: pq.text,
      type: pq.type === 'ranking' ? 'single' : pq.type,
      options: pq.options.map(opt => ({
        id: opt.id,
        text: opt.text,
        value: opt.value,
        trait: opt.trait,
      })),
    }
  }, [])

  useEffect(() => {
    calculatorService.checkBackendAvailability().then((available) => {
      setCalculationSource(available ? 'backend' : 'frontend')
    })
  }, [])

  useEffect(() => {
    if (!assessment) {
      navigate('/assessments')
      return
    }

    if (isInitializedRef.current) return
    isInitializedRef.current = true

    let selectedQuestions: Question[] = []
    const professionalQuestions = getProfessionalQuestions(assessment.id)
    
    if (assessment.professionalQuestions) {
      if (mode === 'normal' && assessment.professionalQuestions.normal) {
        selectedQuestions = assessment.professionalQuestions.normal
      } else if (mode === 'advanced' && assessment.professionalQuestions.advanced) {
        selectedQuestions = assessment.professionalQuestions.advanced
      } else if (mode === 'professional' && assessment.professionalQuestions.professional) {
        selectedQuestions = assessment.professionalQuestions.professional
      } else {
        selectedQuestions = assessment.questions
      }
    } else {
      selectedQuestions = assessment.questions
    }

    const processedQuestions = processAssessmentQuestions(
      selectedQuestions,
      mode as any
    )
    
    setQuestions(processedQuestions)
    
    const storageKey = `${ANSWER_STORAGE_KEY}-${assessment.id}-${mode}`
    const savedDraft = localStorage.getItem(storageKey)
    
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        if (draft.answers && draft.answers.length > 0) {
          setAnswers(draft.answers)
          setCurrentQuestion(Math.min(draft.answers.length, processedQuestions.length - 1))
        }
      } catch {
        setCurrentQuestion(0)
        setAnswers([])
      }
    } else {
      setCurrentQuestion(0)
      setAnswers([])
    }
    
    setSelectedOption(null)
    setTimeLeft(QUESTION_TIME_LIMIT)
  }, [assessment, mode, navigate, getProfessionalQuestions, convertProfessionalToQuestion])

  useEffect(() => {
    if (questions.length === 0 || isTimeout) return

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current)
          }
          setIsTimeout(true)
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
  }, [currentQuestion, questions.length, isTimeout])

  useEffect(() => {
    if (questions.length === 0) return
    
    const current = answers.find(a => a.questionId === questions[currentQuestion]?.id)
    if (current) {
      setSelectedOption(current.selectedOptions[0] || null)
    } else {
      setSelectedOption(null)
    }
  }, [answers, questions, currentQuestion])

  const createAnswer = useCallback((questionId: string, optionId: string, question: Question): Answer => {
    const selectedOpt = question.options.find((o) => o.id === optionId)
    return {
      questionId,
      selectedOptions: [optionId],
      value: selectedOpt?.value,
      trait: selectedOpt?.trait,
    }
  }, [])

  const handleOptionSelect = useCallback((optionId: string) => {
    setSelectedOption(optionId)
    
    setAnswers(prev => {
      const question = questions[currentQuestion]
      if (!question) return prev
      
      const newAnswer = createAnswer(question.id, optionId, question)
      const filtered = prev.filter(a => a.questionId !== question.id)
      const newAnswers = [...filtered, newAnswer]
      
      if (assessment) {
        const storageKey = `${ANSWER_STORAGE_KEY}-${assessment.id}-${mode}`
        localStorage.setItem(storageKey, JSON.stringify({
          answers: newAnswers,
          lastQuestion: currentQuestion,
          savedAt: Date.now(),
        }))
      }
      
      return newAnswers
    })
    
    setTimeLeft(QUESTION_TIME_LIMIT)
  }, [questions, currentQuestion, assessment, mode, createAnswer])

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setTimeLeft(QUESTION_TIME_LIMIT)
    }
  }, [currentQuestion, questions.length])

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setTimeLeft(QUESTION_TIME_LIMIT)
    }
  }, [currentQuestion])

  const handleQuestionSelect = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(index)
      setTimeLeft(QUESTION_TIME_LIMIT)
      setShowAnswerSheet(false)
    }
  }, [questions.length])

  const submitAssessment = useCallback(async () => {
    if (!assessment) return

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    setCalculating(true)
    setShowSubmitSuccess(true)
    
    setTimeout(async () => {
      let result: UnifiedCalculationResult
      
      const answerMap: Record<string, number> = {}
      answers.forEach((a, idx) => {
        const qNum = idx + 1
        answerMap[String(qNum)] = a.value ?? 3
      })
      
      try {
        result = await calculatorService.calculate(
          assessment.id as any,
          answerMap,
          { forceFrontend: mode === 'professional' }
        )
        
        setCalculationSource(result.source || 'frontend')
      } catch (error) {
        console.warn('计算失败，使用前端计算:', error)
        let rawResult
        if (mode === 'professional') {
          rawResult = calculateProfessionalResult(assessment.id, answers, mode)
        } else {
          rawResult = assessment.resultCalculator(answers)
        }
        
        result = {
          ...rawResult,
          source: 'frontend',
          calculated_at: new Date().toISOString(),
          version: 'fallback',
          assessment_id: assessment.id,
          assessment_name: assessment.title,
          dimensions: [],
        } as unknown as UnifiedCalculationResult
      }
      
      const adaptedResult = calculatorService.adaptToFrontendNativeFormat(result)
      const recordId = crypto.randomUUID()
      
      addCompletedAssessment({
        id: recordId,
        assessmentId: assessment.id,
        answers,
        result: adaptedResult,
        completedAt: new Date(),
        mode,
      })

      const storageKey = `${ANSWER_STORAGE_KEY}-${assessment.id}-${mode}`
      localStorage.removeItem(storageKey)

      setCalculating(false)
      navigate(`/legacy/loading/${recordId}`, {
        state: { calculationSource: adaptedResult.source, calculationResult: adaptedResult }
      })
    }, 800)
  }, [assessment, answers, addCompletedAssessment, mode, navigate])

  const handleSubmit = useCallback(() => {
    if (answers.length < questions.length) {
      setShowSubmitConfirm(true)
      return
    }
    submitAssessment()
  }, [answers.length, questions.length, submitAssessment])

  const handleExit = useCallback(() => {
    setShowExitConfirm(true)
  }, [])

  const confirmExit = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    navigate('/assessments')
  }, [navigate])

  const goHome = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    navigate('/')
  }, [navigate])

  const progress = useMemo(() => ((currentQuestion + 1) / questions.length) * 100, [currentQuestion, questions.length])
  const answeredCount = answers.length
  const allAnswered = answeredCount === questions.length
  const currentQ = questions[currentQuestion]
  const { isDesktop } = useResponsive()
  
  const estimatedTimeRemaining = useMemo(() => {
    const remaining = questions.length - currentQuestion - 1
    const minutes = Math.ceil(remaining * 0.25)
    if (minutes <= 1) return '约1分钟'
    return `约 ${minutes} 分钟`
  }, [currentQuestion, questions.length])

  const modeLabels: Record<string, string> = {
    normal: '标准版',
    advanced: '进阶版',
    professional: '专业版',
  }

  useEffect(() => {
    if (!currentQ) return
    
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      const optionIndex = key.charCodeAt(0) - 97
      
      if (key >= 'a' && key <= 'z' && optionIndex < currentQ.options.length) {
        const option = currentQ.options[optionIndex]
        if (option) {
          handleOptionSelect(option.id || optionIndex.toString())
        }
      }
      
      if (e.key === 'Enter' && selectedOption !== null) {
        handleNext()
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentQ, selectedOption, handleNext, handleOptionSelect])

  const optionVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.2 }
    })
  }), [])

  if (!assessment || questions.length === 0) {
    return <LoadingState type="neural" text="测评题目加载中..." />
  }

  if (!currentQ) {
    return (
      <ErrorState
        title="题目加载失败"
        message="测评数据可能已损坏，请重试或返回测评列表"
        onRetry={() => window.location.reload()}
        onBack={() => navigate(-1)}
      />
    )
  }

  const showDraftRecovery = answeredCount > 0 && answeredCount < questions.length && currentQuestion > 0

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden relative pt-safe pb-safe pl-safe pr-safe">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-pink-600/8 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
        
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 opacity-[0.03]"
          animate={{
            rotate: 360,
            scale: [1, 1.15, 1],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-violet-400">
            <path d="M12 2L8 6h8l-4-4zm0 20l4-4H8l4 4zm-6-8l-4 4 4 4v-8zm12 0v8l4-4-4-4z" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-16 w-24 h-24 opacity-[0.03]"
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
            scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-pink-400">
            <path d="M19 3L5 12l14 9V3z" />
          </svg>
        </motion.div>
      </div>
      
      <LegacyHeader title={(assessment as any)?.title || '答题中'} />

      {showDraftRecovery && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border-b border-emerald-500/30"
        >
          <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm">
              ✨ 已自动恢复上次答题进度（已完成 {answeredCount} 题）
            </span>
          </div>
        </motion.div>
      )}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <motion.button
          onClick={handleExit}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/60 hover:text-white hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
        >
          <X className="w-5 h-5" />
          <span className="hidden sm:inline">退出</span>
        </motion.button>

        <div className="flex-1 max-w-md mx-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center gap-3">
              <span className="text-white/60">
                第 {currentQuestion + 1} 题 / 共 {questions.length} 题
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                mode === 'professional' 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
              }`}>
                {modeLabels[mode] || '标准版'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 text-xs hidden sm:inline">
                剩余 {estimatedTimeRemaining}
              </span>
              <button
                onClick={() => {
                  const newVal = calculationSource === 'backend' ? 'frontend' : 'backend'
                  calculatorService.setUseBackend(newVal === 'backend')
                  setCalculationSource(newVal)
                }}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/10 transition-all"
                title="切换计算引擎"
                type="button"
              >
                {calculationSource === 'backend' ? (
                  <Cloud className="w-4 h-4 text-emerald-400" />
                ) : calculationSource === 'checking' ? (
                  <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                ) : (
                  <CloudOff className="w-4 h-4 text-slate-400" />
                )}
                <span className="text-xs">
                  {calculationSource === 'backend' ? '云端计算' :
                   calculationSource === 'checking' ? '连接中' : '本地计算'}
                </span>
              </button>
              <span className="text-white/60">
                已答 {answeredCount} / {questions.length}
              </span>
            </div>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 via-pink-500 to-violet-500 relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </div>
        </div>

        <motion.button
          onClick={() => setShowAnswerSheet(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/60 hover:text-white hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
        >
          <Grid3x3 className="w-5 h-5" />
          <span className="hidden sm:inline">答题卡</span>
        </motion.button>
      </div>

      <div className="flex justify-center mb-3">
        <motion.div
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full',
            timeLeft <= 10 ? 'bg-red-500/20 text-red-400' : 'glass text-white/60'
          )}
          animate={timeLeft <= 10 ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
        >
          <Clock className="w-4 h-4" />
          <span className="font-mono font-semibold">{timeLeft}s</span>
        </motion.div>
      </div>



      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 80, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 sm:p-8 border border-white/10 shadow-2xl shadow-black/20">
              <motion.h2
                className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-6 sm:mb-8 text-center leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {currentQ.text}
              </motion.h2>

              <div className="space-y-2.5 sm:space-y-3">
                {currentQ.options.map((option, index) => (
                  <AssessmentOption
                    key={option.id || index}
                    option={option}
                    index={index}
                    selected={!!(option.id && selectedOption === option.id)}
                    onClick={handleOptionSelect}
                    variants={optionVariants}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between p-4 sm:p-6 md:px-8 pb-safe">
        <motion.button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 border border-white/5"
          whileHover={{ scale: currentQuestion === 0 ? 1 : 1.03 }}
          whileTap={{ scale: currentQuestion === 0 ? 1 : 0.97 }}
          type="button"
        >
          <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="hidden sm:inline">上一题</span>
        </motion.button>

        {currentQuestion === questions.length - 1 ? (
          <motion.button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-violet-500 via-pink-500 to-violet-500 text-white font-semibold shadow-xl shadow-violet-500/30 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97, y: 1 }}
            type="button"
          >
            提交答案
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-violet-500 via-pink-500 to-violet-500 text-white font-semibold shadow-xl shadow-violet-500/30 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 disabled:opacity-30 disabled:pointer-events-none"
            whileHover={{ scale: selectedOption === null ? 1 : 1.03, y: selectedOption === null ? 0 : -1 }}
            whileTap={{ scale: selectedOption === null ? 1 : 0.97, y: selectedOption === null ? 0 : 1 }}
            type="button"
          >
            <span className="hidden sm:inline">下一题</span>
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </motion.button>
        )}
      </div>

      <AnswerSheet
        isOpen={showAnswerSheet}
        onClose={() => setShowAnswerSheet(false)}
        questions={questions}
        answers={answers}
        currentQuestion={currentQuestion}
        onQuestionSelect={handleQuestionSelect}
      />

      <AnimatePresence>
        {showSubmitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[500] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">答案提交成功！</h3>
              <p className="text-white/60">正在为您生成专属分析报告...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl p-8 max-w-md w-full text-center"
            >
              <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">确定要退出吗？</h3>
              <p className="text-white/60 mb-6">退出后当前答题进度将不会保存</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="w-full px-6 py-3 rounded-xl glass text-white hover:bg-white/10 transition-colors"
                  type="button"
                >
                  继续答题
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={goHome}
                    className="flex-1 px-6 py-3 rounded-xl glass text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    type="button"
                  >
                    <Home className="w-4 h-4" />
                    返回主页
                  </button>
                  <button
                    onClick={confirmExit}
                    className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                    type="button"
                  >
                    返回列表
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSubmitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl p-8 max-w-md w-full text-center"
            >
              <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">还有题目未完成</h3>
              <p className="text-white/60 mb-2">
                您还有 <span className="text-violet-400 font-semibold">{questions.length - answeredCount}</span> 道题目未作答
              </p>
              <p className="text-white/40 text-sm mb-6">请完成所有题目后再提交</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 px-6 py-3 rounded-xl glass text-white hover:bg-white/10 transition-colors"
                  type="button"
                >
                  继续答题
                </button>
                <button
                  onClick={submitAssessment}
                  className="flex-1 px-6 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors"
                  type="button"
                >
                  强制提交
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTimeout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl p-8 max-w-md w-full text-center"
            >
              <Clock className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">答题超时</h3>
              <p className="text-white/60 mb-6">很抱歉，您未在规定时间内完成答题</p>
              <button
                onClick={() => navigate('/assessments')}
                className="w-full px-6 py-3 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors"
                type="button"
              >
                返回测评列表
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
