import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Check, ChevronRight, Award, Star, Timer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../../store'

type Phase = 'intro' | 'breathing' | 'bodyscan' | 'sensory' | 'reflection' | 'complete'

interface TrainingRecord {
  planId: string
  day: number
  completedAt: number
  duration: number
  notes?: string
}

export default function EmotionAnchoringTraining() {
  const navigate = useNavigate()
  const { addCompletedAssessment } = useAppStore()
  const [phase, setPhase] = useState<Phase>('intro')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [timer, setTimer] = useState(0)
  const [phaseTimer, setPhaseTimer] = useState(0)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale')
  const [breathCount, setBreathCount] = useState(0)
  const [scanIndex, setScanIndex] = useState(0)
  const [sensoryStep, setSensoryStep] = useState(0)
  const [reflection, setReflection] = useState('')
  const [startTime] = useState(Date.now())

  const PHASE_CONFIG = {
    intro: { title: '情绪锚定训练', subtitle: '建立你的情绪稳定开关', duration: 0 },
    breathing: { title: '478 呼吸法', subtitle: '吸气4秒 · 屏气7秒 · 呼气8秒', duration: 60 },
    bodyscan: { title: '身体扫描', subtitle: '逐一觉察，不带评判', duration: 90 },
    sensory: { title: '5-4-3-2-1 着陆技术', subtitle: '把意识带回当下', duration: 60 },
    reflection: { title: '今日反思', subtitle: '记录此刻的感受', duration: 0 },
    complete: { title: '太棒了！', subtitle: '你完成了今日的训练', duration: 0 },
  }

  const BODY_SCAN_STEPS = [
    '觉察你的头顶，有什么感觉？',
    '把注意力移到额头和眉毛',
    '感受眼睛周围的肌肉',
    '觉察你的下巴和下颌',
    '感受颈部和喉咙',
    '把注意力带到肩膀',
    '感受你的手臂和双手',
    '觉察胸腔和心脏的位置',
    '感受你的腹部',
    '把注意力带到背部',
    '感受你的臀部和骨盆',
    '觉察双腿和双脚',
  ]

  const SENSORY_STEPS = [
    { number: 5, sense: '👀 视觉', prompt: '说出你看到的5样东西' },
    { number: 4, sense: '👂 听觉', prompt: '说出你听到的4种声音' },
    { number: 3, sense: '🤚 触觉', prompt: '说出你能摸到的3样东西' },
    { number: 2, sense: '👃 嗅觉', prompt: '说出你闻到的2种气味' },
    { number: 1, sense: '👅 味觉', prompt: '说出你嘴里的1种味道' },
  ]

  useEffect(() => {
    if (!isPlaying || phase === 'intro' || phase === 'complete' || phase === 'reflection') return

    const interval = setInterval(() => {
      setTimer(t => t + 1)
      setPhaseTimer(t => t + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, phase])

  useEffect(() => {
    if (!isPlaying || phase !== 'breathing') return

    const breathCycles = [
      { phase: 'inhale' as const, duration: 4 },
      { phase: 'hold' as const, duration: 7 },
      { phase: 'exhale' as const, duration: 8 },
      { phase: 'rest' as const, duration: 1 },
    ]

    const totalDuration = breathCycles.reduce((s, c) => s + c.duration, 0)
    const position = phaseTimer % totalDuration

    let elapsed = 0
    for (const cycle of breathCycles) {
      if (position < elapsed + cycle.duration) {
        setBreathPhase(cycle.phase)
        break
      }
      elapsed += cycle.duration
    }

    if (phaseTimer > 0 && phaseTimer % totalDuration === 0) {
      setBreathCount(c => c + 1)
    }

    if (phaseTimer >= 60) {
      goToNextPhase()
    }
  }, [phaseTimer, phase, isPlaying])

  useEffect(() => {
    if (!isPlaying || phase !== 'bodyscan') return

    if (phaseTimer > 0 && phaseTimer % 7 === 0) {
      setScanIndex(i => Math.min(i + 1, BODY_SCAN_STEPS.length - 1))
    }

    if (phaseTimer >= 90) {
      goToNextPhase()
    }
  }, [phaseTimer, phase, isPlaying])

  useEffect(() => {
    if (!isPlaying || phase !== 'sensory') return

    if (phaseTimer > 0 && phaseTimer % 12 === 0) {
      setSensoryStep(s => Math.min(s + 1, SENSORY_STEPS.length - 1))
    }

    if (phaseTimer >= 60) {
      goToNextPhase()
    }
  }, [phaseTimer, phase, isPlaying])

  const goToNextPhase = useCallback(() => {
    const phases: Phase[] = ['intro', 'breathing', 'bodyscan', 'sensory', 'reflection', 'complete']
    const currentIndex = phases.indexOf(phase)
    if (currentIndex < phases.length - 1) {
      setPhase(phases[currentIndex + 1])
      setPhaseTimer(0)
      setIsPlaying(false)
    }
  }, [phase])

  const handleComplete = () => {
    const duration = Math.floor((Date.now() - startTime) / 1000)
    
    const existingTraining = localStorage.getItem('training-progress')
    const trainingData = existingTraining ? JSON.parse(existingTraining) : { records: [], streak: 0 }
    
    trainingData.records.push({
      planId: 'emotion-anchoring',
      day: trainingData.records.length + 1,
      completedAt: Date.now(),
      duration,
      notes: reflection,
    })
    
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const hasYesterdayRecord = trainingData.records.some((r: TrainingRecord) => 
      new Date(r.completedAt).toISOString().split('T')[0] === yesterday
    )
    
    if (hasYesterdayRecord || trainingData.records.length === 1) {
      trainingData.streak += 1
    }
    
    localStorage.setItem('training-progress', JSON.stringify(trainingData))
    setPhase('complete')
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const breathScale = breathPhase === 'inhale' ? 1.3 : breathPhase === 'hold' ? 1.3 : breathPhase === 'exhale' ? 1 : 1

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] text-white">
      <div className="sticky top-0 z-50 p-4 flex items-center justify-between bg-black/20 backdrop-blur-xl border-b border-white/5">
        <button
          onClick={() => navigate('/app/training')}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="text-center">
          <div className="text-sm font-medium">{PHASE_CONFIG[phase].title}</div>
          <div className="text-xs text-white/40">{PHASE_CONFIG[phase].subtitle}</div>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          {isMuted ? <VolumeX size={18} className="text-white/40" /> : <Volume2 size={18} />}
        </button>
      </div>

      {phase !== 'intro' && phase !== 'complete' && (
        <div className="px-4 pt-4">
          <div className="flex gap-1 mb-2">
            {['breathing', 'bodyscan', 'sensory', 'reflection'].map((p, i) => (
              <div key={p} className="flex-1 h-1 rounded-full overflow-hidden bg-white/5">
                <div
                  className={`h-full transition-all duration-500 ${
                    ['breathing', 'bodyscan', 'sensory', 'reflection'].indexOf(phase) > i
                      ? 'w-full bg-gradient-to-r from-violet-500 to-pink-500'
                      : phase === p
                      ? 'bg-gradient-to-r from-violet-500 to-pink-500'
                      : 'w-0'
                  }`}
                  style={{ width: phase === p ? `${Math.min(phaseTimer / PHASE_CONFIG[p as Phase].duration * 100, 100)}%` : undefined }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-white/40">
            <span>第 {['breathing', 'bodyscan', 'sensory', 'reflection'].indexOf(phase) + 1} 步 / 共 4 步</span>
            <span className="flex items-center gap-1">
              <Timer size={10} />
              {formatTime(timer)}
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
            <div className="text-center space-y-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-violet-500/20 flex items-center justify-center"
              >
                <span className="text-6xl">🧘</span>
              </motion.div>

              <div className="space-y-2">
                <h1 className="text-3xl font-black">情绪锚定训练</h1>
                <p className="text-white/50">第 1 天 · 约 5 分钟</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-left space-y-4">
                <h3 className="font-semibold text-violet-300">今天你将学会：</h3>
                <div className="space-y-3">
                  {[
                    '✨ 478 呼吸法 - 快速平复焦虑',
                    '🔍 身体扫描 - 觉察情绪信号',
                    '🎯 5-4-3-2-1 着陆技术 - 惊恐发作急救',
                  ].map((item, i) => (
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
                onClick={() => goToNextPhase()}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 font-bold text-lg flex items-center justify-center gap-2"
              >
                <Play size={20} />
                开始练习
              </motion.button>
            </div>
          )}

          {phase === 'breathing' && (
            <div className="text-center space-y-12">
              <div className="relative h-64 flex items-center justify-center">
                <motion.div
                  animate={{ scale: breathScale }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-violet-500/30 to-blue-500/30 blur-xl"
                />
                <motion.div
                  animate={{ scale: breathScale }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="relative w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center"
                >
                  <span className="text-2xl font-bold">
                    {breathPhase === 'inhale' && '吸气'}
                    {breathPhase === 'hold' && '屏气'}
                    {breathPhase === 'exhale' && '呼气'}
                    {breathPhase === 'rest' && '休息'}
                  </span>
                </motion.div>
              </div>

              <div className="space-y-2">
                <p className="text-xl font-medium">跟随节奏呼吸</p>
                <p className="text-white/50">已完成 {breathCount} 个循环</p>
              </div>

              <div className="flex justify-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center"
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goToNextPhase()}
                  className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300"
                >
                  <ChevronRight size={28} />
                </motion.button>
              </div>
            </div>
          )}

          {phase === 'bodyscan' && (
            <div className="text-center space-y-12">
              <motion.div
                key={scanIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-[120px] flex items-center justify-center px-8"
              >
                <p className="text-2xl font-light leading-relaxed">
                  {BODY_SCAN_STEPS[scanIndex]}
                </p>
              </motion.div>

              <div className="flex justify-center gap-1">
                {BODY_SCAN_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i < scanIndex
                        ? 'bg-violet-500'
                        : i === scanIndex
                        ? 'bg-violet-400 scale-125'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="text-white/40">
                只是觉察，不需要做任何改变
              </div>

              <div className="flex justify-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center"
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goToNextPhase()}
                  className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300"
                >
                  <ChevronRight size={28} />
                </motion.button>
              </div>
            </div>
          )}

          {phase === 'sensory' && (
            <div className="text-center space-y-12">
              <motion.div
                key={sensoryStep}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="text-6xl font-black text-violet-400">
                  {SENSORY_STEPS[sensoryStep].number}
                </div>
                <div className="text-2xl font-medium">
                  {SENSORY_STEPS[sensoryStep].sense}
                </div>
                <p className="text-xl text-white/50">
                  {SENSORY_STEPS[sensoryStep].prompt}
                </p>
              </motion.div>

              <div className="flex justify-center gap-3">
                {SENSORY_STEPS.map((step, i) => (
                  <motion.div
                    key={i}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                      i < sensoryStep
                        ? 'bg-emerald-500/30 border border-emerald-500/50 text-emerald-300'
                        : i === sensoryStep
                        ? 'bg-violet-500/30 border-2 border-violet-500 text-violet-300 scale-110'
                        : 'bg-white/5 border border-white/10 text-white/30'
                    }`}
                  >
                    {i < sensoryStep ? <Check size={20} /> : step.number}
                  </motion.div>
                ))}
              </div>

              <div className="text-white/40">
                在心里默念出来就可以了
              </div>

              <div className="flex justify-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center"
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => goToNextPhase()}
                  className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300"
                >
                  <ChevronRight size={28} />
                </motion.button>
              </div>
            </div>
          )}

          {phase === 'reflection' && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">记录此刻的感受</h2>
                <p className="text-white/50">训练前后，有什么变化？</p>
              </div>

              <div className="flex justify-center gap-4">
                {['😢', '😔', '😐', '😊', '🎉'].map((emoji, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl hover:bg-white/10 transition-colors"
                    onClick={() => setReflection(`训练后感觉：${['很糟糕', '不太好', '平静', '放松', '很棒'][i]}`)}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>

              <textarea
                value={reflection}
                onChange={e => setReflection(e.target.value)}
                placeholder="在这里写下你的感受...（可选）"
                className="w-full h-40 bg-white/5 rounded-2xl p-4 border border-white/10 focus:border-violet-500/50 focus:outline-none resize-none placeholder-white/30"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleComplete}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 font-bold text-lg flex items-center justify-center gap-2"
              >
                <Check size={20} />
                完成今日训练
              </motion.button>
            </div>
          )}

          {phase === 'complete' && (
            <div className="text-center space-y-8">
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-amber-400/20 via-pink-500/20 to-violet-500/20 border border-amber-400/20 flex items-center justify-center"
              >
                <Award size={80} className="text-amber-400" />
              </motion.div>

              <div className="space-y-2">
                <h1 className="text-3xl font-black">太棒了！ 🎉</h1>
                <p className="text-white/50">你完成了第 1 天的情绪锚定训练</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '训练时长', value: formatTime(Math.floor((Date.now() - startTime) / 1000)), icon: '⏱️' },
                  { label: '连续打卡', value: JSON.parse(localStorage.getItem('training-progress') || '{"streak":1}').streak + '天', icon: '🔥' },
                  { label: '获得点数', value: '+50', icon: '⭐' },
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
                  查看进度
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/app/daily')}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 font-bold"
                >
                  返回首页
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
