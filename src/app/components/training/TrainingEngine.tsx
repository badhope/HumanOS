import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, Pause, SkipForward, Volume2, VolumeX, Check, Trophy, Timer, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Exercise {
  id: string
  title: string
  instruction: string
  duration: number
  type: 'breathing' | 'guided' | 'reflection' | 'rest' | 'countdown'
  customRenderer?: (props: any) => JSX.Element
}

interface TrainingProgram {
  id: string
  title: string
  subtitle: string
  icon: string
  duration: string
  level: '入门' | '进阶' | '专业'
  benefits: string[]
  exercises: Exercise[]
  category: 'emotion' | 'cognition' | 'social' | 'behavior' | 'fun'
}

interface TrainingContextType {
  currentStep: number
  isPlaying: boolean
  timer: number
  phaseTimer: number
  exercises: Exercise[]
  goToNextStep: () => void
  togglePlay: () => void
  complete: () => void
  isCompleted: boolean
}

const TrainingContext = createContext<TrainingContextType | null>(null)

export function useTraining() {
  const context = useContext(TrainingContext)
  if (!context) throw new Error('useTraining must be used within TrainingEngine')
  return context
}

interface TrainingEngineProps {
  program: TrainingProgram
  onComplete?: () => void
}

export default function TrainingEngine({ program, onComplete }: TrainingEngineProps) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'intro' | 'training' | 'complete'>('intro')
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [phaseTimer, setPhaseTimer] = useState(0)
  const [totalTimer, setTotalTimer] = useState(0)
  const [startTime] = useState(Date.now())

  const exercise = program.exercises[currentStep]
  const progress = ((currentStep + 1) / program.exercises.length) * 100

  useEffect(() => {
    if (!isPlaying || phase !== 'training') return

    const interval = setInterval(() => {
      setPhaseTimer(t => t + 1)
      setTotalTimer(t => t + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, phase])

  useEffect(() => {
    if (!isPlaying || phase !== 'training') return
    if (program.exercises[currentStep].duration && phaseTimer >= program.exercises[currentStep].duration) {
      if (currentStep < program.exercises.length - 1) {
        setCurrentStep(s => s + 1)
        setPhaseTimer(0)
      } else {
        handleComplete()
      }
    }
  }, [phaseTimer, currentStep, isPlaying, phase, program.exercises])

  const goToNextStep = useCallback(() => {
    if (currentStep < program.exercises.length - 1) {
      setCurrentStep(s => s + 1)
      setPhaseTimer(0)
      setIsPlaying(false)
    } else {
      handleComplete()
    }
  }, [currentStep, program.exercises.length])

  const togglePlay = useCallback(() => {
    setIsPlaying(p => !p)
  }, [])

  const handleComplete = useCallback(() => {
    setPhase('complete')
    setIsPlaying(false)
    
    const existing = localStorage.getItem('training-records')
    const records = existing ? JSON.parse(existing) : []
    records.push({
      programId: program.id,
      completedAt: Date.now(),
      duration: Math.floor((Date.now() - startTime) / 1000),
      category: program.category,
    })
    localStorage.setItem('training-records', JSON.stringify(records))
    
    onComplete?.()
  }, [program, startTime, onComplete])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const contextValue: TrainingContextType = {
    currentStep,
    isPlaying,
    timer: totalTimer,
    phaseTimer,
    exercises: program.exercises,
    goToNextStep,
    togglePlay,
    complete: handleComplete,
    isCompleted: phase === 'complete',
  }

  return (
    <TrainingContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] text-white">
        <div className="sticky top-0 z-50 p-4 flex items-center justify-between bg-black/20 backdrop-blur-xl border-b border-white/5">
          <button
            onClick={() => navigate('/app/training')}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          {phase === 'training' && (
            <>
              <div className="text-center">
                <div className="text-sm font-medium">{exercise.title}</div>
                <div className="text-xs text-white/40">第 {currentStep + 1} 组 / 共 {program.exercises.length} 组</div>
              </div>
              <div className="w-10" />
            </>
          )}
          
          {phase === 'intro' && (
            <>
              <div className="text-center">
                <div className="text-sm font-medium">{program.title}</div>
                <div className="text-xs text-white/40">{program.subtitle}</div>
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                {isMuted ? <VolumeX size={18} className="text-white/40" /> : <Volume2 size={18} />}
              </button>
            </>
          )}

          {phase === 'complete' && (
            <>
              <div className="text-center">
                <div className="text-sm font-medium">训练完成！</div>
              </div>
              <div className="w-10" />
            </>
          )}
        </div>

        {phase === 'training' && (
          <div className="px-4 pt-3">
            <div className="flex gap-1 mb-2">
              {program.exercises.map((_, i) => (
                <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/5">
                  <div
                    className={`h-full transition-all duration-300 ${
                      i < currentStep
                        ? 'w-full bg-gradient-to-r from-violet-500 to-pink-500'
                        : i === currentStep
                        ? 'bg-gradient-to-r from-violet-500 to-pink-500'
                        : 'w-0'
                    }`}
                    style={{
                      width: i === currentStep && exercise.duration
                        ? `${Math.min((phaseTimer / exercise.duration) * 100, 100)}%`
                        : undefined
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-white/40">
              <span>{program.category === 'fun' ? '🎮 娱乐项目' : `🧠 ${program.level} · ${program.category}`}</span>
              <span className="flex items-center gap-1">
                <Timer size={10} />
                {formatTime(totalTimer)}
              </span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 pt-8 pb-32"
          >
            {phase === 'intro' && (
              <div className="text-center space-y-8 max-w-md mx-auto">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/20 flex items-center justify-center"
                >
                  <span className="text-6xl">{program.icon}</span>
                </motion.div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-black">{program.title}</h1>
                  <div className="flex items-center justify-center gap-3 text-white/50">
                    <span>{program.level}</span>
                    <span>·</span>
                    <span>约 {program.duration}</span>
                    <span>·</span>
                    <span>{program.exercises.length} 个动作</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-left space-y-4">
                  <h3 className="font-semibold text-violet-300">
                    {program.category === 'fun' ? '🎮 你将获得快乐：' : '✨ 你将学会：'}
                  </h3>
                  <div className="space-y-3">
                    {program.benefits.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-xs">
                          {i + 1}
                        </div>
                        <span className="text-white/70">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setPhase('training'); setIsPlaying(true); }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 font-bold text-lg flex items-center justify-center gap-2"
                >
                  <Play size={20} />
                  {program.category === 'fun' ? '开始玩！' : '开始训练'}
                </motion.button>
              </div>
            )}

            {phase === 'training' && (
              <div className="text-center space-y-12 max-w-md mx-auto">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="min-h-[180px] flex flex-col items-center justify-center"
                >
                  {exercise.duration && (
                    <div className="relative mb-8">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="6"
                        />
                        <motion.circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="url(#progressGradient)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={440}
                          strokeDashoffset={440 - (440 * Math.min(phaseTimer / exercise.duration, 1))}
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-mono font-bold">
                          {exercise.duration - phaseTimer}
                        </span>
                      </div>
                    </div>
                  )}

                  <p className="text-2xl font-light leading-relaxed px-4">
                    {exercise.instruction}
                  </p>
                </motion.div>

                <div className="flex justify-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={goToNextStep}
                    className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300"
                  >
                    <SkipForward size={28} />
                  </motion.button>
                </div>

                {exercise.type === 'rest' && (
                  <div className="animate-pulse">
                    <Heart className="w-8 h-8 mx-auto text-rose-400" />
                    <p className="text-rose-300 mt-2">休息一下，调整呼吸</p>
                  </div>
                )}
              </div>
            )}

            {phase === 'complete' && (
              <div className="text-center space-y-8 max-w-md mx-auto">
                <motion.div
                  initial={{ scale: 0.8, rotate: -10, y: 20 }}
                  animate={{ scale: 1, rotate: 0, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-amber-400/20 via-pink-500/20 to-violet-500/20 border border-amber-400/20 flex items-center justify-center"
                >
                  <Trophy size={80} className="text-amber-400" />
                </motion.div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-black">
                    {program.category === 'fun' ? '玩得开心！ 🎮' : '太棒了！ 🎉'}
                  </h1>
                  <p className="text-white/50">
                    {program.category === 'fun' 
                      ? '你完成了娱乐项目：' + program.title
                      : '你完成了：' + program.title
                    }
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: '训练时长', value: formatTime(Math.floor((Date.now() - startTime) / 1000)), icon: '⏱️' },
                    { label: '完成动作', value: program.exercises.length + '个', icon: '✅' },
                    { label: '获得', value: program.category === 'fun' ? '+20 趣点' : '+50 成长值', icon: '⭐' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="bg-white/5 rounded-2xl p-4 border border-white/5"
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-[10px] text-white/40">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/app/progress')}
                    className="flex-1 py-4 rounded-2xl bg-white/5 font-medium hover:bg-white/10 transition-colors"
                  >
                    查看我的成长
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/app/training')}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 font-bold"
                  >
                    下一个训练
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </TrainingContext.Provider>
  )
}

export type { TrainingProgram, Exercise }
