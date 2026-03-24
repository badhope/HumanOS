import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { getAssessmentById } from '@data/assessments'
import { useStore } from '@store'
import type { Answer, Question } from '../types'
import { cn } from '@utils/cn'
import ModeSelector from '../components/ModeSelector'

type DifficultyMode = 'standard' | 'hard' | 'expert'

interface AssessmentWithModes {
  standard: Question[]
  hard: Question[]
  expert: Question[]
}

export default function Assessment() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedMode, setSelectedMode] = useState<DifficultyMode | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [isSelectingMode, setIsSelectingMode] = useState(true)

  const assessment = id ? getAssessmentById(id) : undefined
  const { addCompletedAssessment } = useStore()

  useEffect(() => {
    if (!assessment) {
      navigate('/')
    }
  }, [assessment, navigate])

  useEffect(() => {
    if (selectedMode && assessment) {
      const allQuestions = generateQuestionsForMode(assessment.id, selectedMode)
      setQuestions(allQuestions)
      setIsSelectingMode(false)
      setCurrentQuestion(0)
      setAnswers([])
      setSelectedOption(null)
    }
  }, [selectedMode, assessment])

  const generateQuestionsForMode = (assessmentId: string, mode: DifficultyMode): Question[] => {
    const baseQuestions: Question[] = []
    const questionCount = mode === 'standard' ? 30 : mode === 'hard' ? 60 : 100

    const templates: Record<string, { stems: string[], options: { text: string, trait: string, value: number }[] }> = {
      'mbti-standard': {
        stems: [
          '在社交聚会中，你通常：',
          '你更关注：',
          '做决定时，你更依赖：',
          '你更喜欢的生活方式：',
          '在工作环境中，你更倾向于：',
          '学习新技能时，你更喜欢：',
          '面对冲突，你的第一反应是：',
          '对于截止日期，你通常：',
          '空闲时间你更喜欢：',
          '当你需要能量时，你会：',
          '在团队项目中，你扮演的角色通常是：',
          '你更容易被什么激励：',
          '处理问题时你倾向于：',
          '你与他人交流的方式更像是：',
          '面对新环境时，你通常：',
          '你的工作空间通常是：',
          '你更喜欢什么样的反馈：',
          '你在压力下的反应通常是：',
          '你更容易因为什么而感到挫败：',
          '当收到批评时，你首先会：',
          '你更愿意为什么付出努力：',
          '你的学习风格更接近：',
          '在决策时，你更看重：',
          '你更容易信任什么样的人：',
          '你的沟通风格更像是：',
          '面对不确定性时，你倾向于：',
          '你更关注自己的：',
          '你理想的工作环境是：',
          '当你不同意某人观点时，你会：',
          '你更容易为什么感到兴奋：',
          '完成任务的方式通常是：',
          '你更喜欢什么样的任务：',
          '你的思维方式更偏向：',
          '你更容易被什么吸引：',
          '你的生活节奏通常是：',
          '你更看重什么类型的成就：',
          '当团队目标与个人目标冲突时，你：',
          '你更容易为什么感到满足：',
          '在陌生场合，你通常会：',
          '你处理信息的方式更倾向于：',
          '你更愿意与什么样的人合作：',
          '面对失败时，你的反应通常是：',
          '你更容易受到什么影响：',
          '你的表达方式更像是：',
          '你更关注生活中的：',
          '当事情没有按计划进行时，你：',
          '你更容易为什么感到压力：',
          '你更愿意为什么承担责任：',
          '你的创造力通常表现在：',
        ],
        options: [
          { text: '主动与陌生人交谈，感到 energised', trait: 'E', value: 2 },
          { text: '只与熟人交流，需要独处恢复能量', trait: 'I', value: 2 },
          { text: '具体的事实、细节和实际经验', trait: 'S', value: 2 },
          { text: '整体概念、未来可能性和抽象模式', trait: 'N', value: 2 },
          { text: '逻辑分析、客观标准和因果推理', trait: 'T', value: 2 },
          { text: '个人价值观、他人感受和和谐关系', trait: 'F', value: 2 },
          { text: '有计划、有条理、喜欢确定性和结构', trait: 'J', value: 2 },
          { text: '灵活、随性、保持开放和适应性', trait: 'P', value: 2 },
        ],
      },
      'big-five': {
        stems: [
          '我对抽象概念和理论思考感兴趣',
          '我做事有条理，喜欢按计划行事',
          '我在社交场合感到自在并乐于交际',
          '我关心他人的感受，愿意帮助他人',
          '我容易感到焦虑和情绪波动',
          '我喜欢尝试新事物和体验',
          '我总是按时完成任务和承诺',
          '我喜欢成为注意力的中心',
          '我对艺术和美学有浓厚兴趣',
          '我倾向于相信他人是善意的',
          '我容易感到紧张和不安',
          '我喜欢有条理和整洁的环境',
          '我喜欢领导而不是跟随',
          '我有丰富的想象力和创造力',
          '我善于处理冲突和人际问题',
          '我情绪稳定，不易波动',
          '我勤奋工作，追求成功',
          '我喜欢与他人合作而不是竞争',
          '我对美学有敏锐的感知',
          '我对他人的需求敏感',
          '我容易感到悲观和担忧',
          '我善于组织和管理时间',
          '我喜欢在人群中发言和表现',
          '我喜欢阅读诗歌和文学作品',
          '我信任他人的能力和诚信',
          '我能够很好地应对压力',
          '我是一个细心和有责任感的人',
          '我喜欢参与社交活动',
          '我对自然和环境有深刻感悟',
          '我愿意为他人做出牺牲',
          '我经常感到快乐和满足',
          '我能够坚持完成困难的任务',
          '我喜欢结识新朋友',
          '我喜欢欣赏音乐和艺术',
          '我倾向于把利益放在首位',
          '我能够保持冷静和控制情绪',
          '我是一个可信赖和可靠的人',
          '我喜欢在人群中产生影响',
          '我对哲学和人生意义感兴趣',
          '我善于倾听和理解他人',
          '我经常感到悲伤或沮丧',
          '我是一个完美主义者',
          '我喜欢组织活动和人际关系',
          '我有很多朋友和熟人',
          '我对文学和戏剧有深厚兴趣',
          '我能够原谅他人的错误',
          '我能够应对挫折和失败',
          '我是一个自律的人',
          '我喜欢在团队中承担责任',
          '我对美有敏锐的眼光',
        ],
        options: [
          { text: '非常不同意', trait: 'O', value: 1 },
          { text: '不同意', trait: 'O', value: 2 },
          { text: '中立', trait: 'O', value: 3 },
          { text: '同意', trait: 'O', value: 4 },
          { text: '非常同意', trait: 'O', value: 5 },
        ],
      },
    }

    const template = templates[assessmentId] || templates['mbti-standard']
    const stems = template.stems
    const options = template.options

    for (let i = 0; i < questionCount; i++) {
      const stem = stems[i % stems.length]
      const trait = options[i % (options.length / 2)].trait
      const baseValue = options[0].value

      baseQuestions.push({
        id: `${assessmentId}-${mode}-q${i + 1}`,
        text: `${stem} (${i + 1}/${questionCount})`,
        type: 'single',
        options: options.map((opt, idx) => ({
          id: `opt-${i}-${idx}`,
          text: opt.text,
          value: opt.value,
          trait: opt.trait,
        })),
        category: trait,
      })
    }

    return baseQuestions
  }

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

  const handleModeSelect = (mode: 'standard' | 'hard' | 'expert') => {
    setSelectedMode(mode)
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleConfirmAnswer = () => {
    if (!selectedOption || !question) return

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

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOption(null)
      }, 400)
    }
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
    setIsSelectingMode(true)
    setSelectedMode(null)
    setQuestions([])
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedOption(null)
  }

  const isLastQuestion = questions.length > 0 && currentQuestion === questions.length - 1
  const canProceed = selectedOption !== null || getCurrentAnswer() !== undefined

  if (isSelectingMode) {
    return (
      <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </button>
            <h1 className="text-3xl font-bold text-white mb-2">{assessment.title}</h1>
            <p className="text-white/60">{assessment.description}</p>
          </motion.div>

          <ModeSelector onSelectMode={handleModeSelect} />
        </div>
      </div>
    )
  }

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
          >
            <ArrowLeft className="w-4 h-4" />
            返回模式选择
          </button>

          <h1 className="text-3xl font-bold text-white mb-2">
            {assessment.title}
          </h1>
          <p className="text-white/60">
            {selectedMode === 'standard' ? '标准模式' : selectedMode === 'hard' ? '困难模式' : '专家模式'}
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
