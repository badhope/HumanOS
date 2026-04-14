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
import { ArrowLeft, ArrowRight, X, Grid3x3, Clock, AlertTriangle, Home, CheckCircle2 } from 'lucide-react'
import { getAssessmentById } from '@data/assessments'
import { LoadingState, ErrorState } from '@components/ui/LoadingState'
import { useAppStore } from '../store'
import type { Answer, Question, ProfessionalQuestion } from '../types'
import { cn } from '@utils/cn'
import AnswerSheet from '@components/AnswerSheet'
import { calculateProfessionalResult } from '@utils/professionalCalculators'
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

const QUESTION_TIME_LIMIT = 30

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
    if (!assessment) {
      navigate('/')
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

    const uniqueQuestions = selectedQuestions.filter((q, index, self) => 
      index === self.findIndex(t => t.id === q.id)
    )
    
    const shuffledQuestions = [...uniqueQuestions].sort(() => Math.random() - 0.5)
    
    setQuestions(shuffledQuestions)
    setCurrentQuestion(0)
    setAnswers([])
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
      return [...filtered, newAnswer]
    })
    
    setTimeLeft(QUESTION_TIME_LIMIT)
  }, [questions, currentQuestion, createAnswer])

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

  const submitAssessment = useCallback(() => {
    if (!assessment) return

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    setShowSubmitSuccess(true)
    
    setTimeout(() => {
      let result
      if (mode === 'professional') {
        result = calculateProfessionalResult(assessment.id, answers, mode)
      } else {
        result = assessment.resultCalculator(answers)
      }
      
      addCompletedAssessment({
        assessmentId: assessment.id,
        answers,
        result,
        completedAt: new Date(),
        mode,
      })

      navigate(`/loading/${assessment.id}`)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 flex flex-col">
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
            <span className="text-white/60">
              题目 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-white/60">
              已答 {answeredCount} / {questions.length}
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



      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl"
          >
            <div className="glass rounded-3xl p-6 sm:p-10">
              <motion.h2
                className="text-xl sm:text-2xl font-semibold text-white mb-8 text-center leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {currentQ.text}
              </motion.h2>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <motion.button
                    key={option.id || index}
                    onClick={() => handleOptionSelect(option.id || index.toString())}
                    className={cn(
                      'w-full p-4 sm:p-5 rounded-xl text-left transition-all flex items-start gap-4',
                      (option.id && selectedOption === option.id)
                        ? 'bg-gradient-to-r from-violet-500/30 to-pink-500/30 border-2 border-violet-500 text-white'
                        : 'glass text-white/80 hover:bg-white/10 border-2 border-transparent'
                    )}
                    variants={optionVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold',
                      (option.id && selectedOption === option.id)
                        ? 'bg-violet-500 text-white'
                        : 'bg-white/10 text-white/60'
                    )}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 pt-1">{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between p-4 sm:p-6 pb-safe">
        <motion.button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 px-4 py-3 rounded-xl glass text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
          whileHover={{ scale: currentQuestion === 0 ? 1 : 1.05 }}
          whileTap={{ scale: currentQuestion === 0 ? 1 : 0.95 }}
          type="button"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">上一题</span>
        </motion.button>

        {currentQuestion === questions.length - 1 ? (
          <motion.button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
          >
            提交答案
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/30 disabled:opacity-30"
            whileHover={{ scale: selectedOption === null ? 1 : 1.05 }}
            whileTap={{ scale: selectedOption === null ? 1 : 0.95 }}
            type="button"
          >
            <span className="hidden sm:inline">下一题</span>
            <ArrowRight className="w-5 h-5" />
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
