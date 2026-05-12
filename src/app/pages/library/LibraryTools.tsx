import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Wind, Calendar, Droplets, Target, Play, Pause, RotateCcw, Check, X } from 'lucide-react'

const tools = [
  {
    id: 'breathing',
    title: '呼吸练习',
    description: '快速放松身心',
    icon: Wind,
    badge: '推荐',
    color: 'blue',
    colorGradient: 'from-blue-500/30 to-cyan-500/30',
    colorBorder: 'border-blue-500/20',
    colorText: 'text-blue-400'
  },
  {
    id: 'mood-diary',
    title: '情绪日记',
    description: '记录与追踪情绪',
    icon: Calendar,
    color: 'violet',
    colorGradient: 'from-violet-500/30 to-purple-500/30',
    colorBorder: 'border-violet-500/20',
    colorText: 'text-violet-400'
  },
  {
    id: 'stress-management',
    title: '压力管理',
    description: '有效的减压技巧',
    icon: Droplets,
    color: 'emerald',
    colorGradient: 'from-emerald-500/30 to-teal-500/30',
    colorBorder: 'border-emerald-500/20',
    colorText: 'text-emerald-400'
  },
  {
    id: 'goal-setting',
    title: '目标设定',
    description: '科学制定目标',
    icon: Target,
    color: 'amber',
    colorGradient: 'from-amber-500/30 to-orange-500/30',
    colorBorder: 'border-amber-500/20',
    colorText: 'text-amber-400'
  }
]

const breathingPatterns = [
  { name: '4-7-8 呼吸法', inhale: 4, hold: 7, exhale: 8, description: '快速入睡，缓解焦虑' },
  { name: '箱式呼吸', inhale: 4, hold: 4, exhale: 4, holdAfter: 4, description: '提高专注力，平衡情绪' },
  { name: '深度放松', inhale: 4, hold: 2, exhale: 6, description: '日常放松，减轻压力' },
  { name: '能量呼吸', inhale: 6, hold: 0, exhale: 2, description: '快速提升能量水平' }
]

const moods = [
  { id: 'happy', emoji: '😊', label: '开心', color: 'bg-amber-400' },
  { id: 'excited', emoji: '🤩', label: '兴奋', color: 'bg-orange-400' },
  { id: 'calm', emoji: '😌', label: '平静', color: 'bg-emerald-400' },
  { id: 'neutral', emoji: '😐', label: '一般', color: 'bg-slate-400' },
  { id: 'worried', emoji: '😟', label: '担忧', color: 'bg-yellow-400' },
  { id: 'sad', emoji: '😢', label: '难过', color: 'bg-blue-400' },
  { id: 'angry', emoji: '😠', label: '生气', color: 'bg-red-400' },
  { id: 'anxious', emoji: '😰', label: '焦虑', color: 'bg-purple-400' }
]

const stressTechniques = [
  { title: '渐进式肌肉放松', description: '收紧然后放松身体各部位肌肉，从头到脚，释放身体紧张', duration: '10分钟' },
  { title: '身体扫描冥想', description: '有意识地关注身体每个部位的感受，培养身心连接', duration: '15分钟' },
  { title: '接地练习', description: '通过五感练习将注意力带回当下，减少焦虑思维', duration: '5分钟' },
  { title: '感恩日记', description: '每天记录3件感恩的事，培养积极心态', duration: '5分钟' }
]

const goalMethods = [
  { title: 'SMART目标', description: '具体(S)、可衡量(M)、可达成(A)、相关性(R)、时限性(T)' },
  { title: 'WOOP心理学', description: '愿望(W)、结果(O)、障碍(O)、计划(P)' },
  { title: '倒推法', description: '从最终目标倒推到当下第一步，明确路径' },
  { title: '习惯堆叠', description: '将新习惯与已有习惯绑定，更容易坚持' }
]

function BreathingTool() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdAfter'>('inhale')
  const [countdown, setCountdown] = useState(4)
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0])
  const [totalTime, setTotalTime] = useState(0)

  const handlePatternSelect = (pattern: typeof breathingPatterns[0]) => {
    setSelectedPattern(pattern)
    setIsActive(false)
    setPhase('inhale')
    setCountdown(pattern.inhale)
  }

  const toggleActive = () => {
    if (isActive) {
      setIsActive(false)
      setPhase('inhale')
      setCountdown(selectedPattern.inhale)
    } else {
      setIsActive(true)
      setPhase('inhale')
      setCountdown(selectedPattern.inhale)
    }
  }

  const reset = () => {
    setIsActive(false)
    setPhase('inhale')
    setCountdown(selectedPattern.inhale)
    setTotalTime(0)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {breathingPatterns.map((pattern) => (
          <button
            key={pattern.name}
            onClick={() => handlePatternSelect(pattern)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedPattern.name === pattern.name
                ? 'bg-blue-500/20 border-blue-500/40'
                : 'bg-white/5 border-white/10 hover:border-blue-500/30'
            }`}
          >
            <div className="text-xs font-medium text-white">{pattern.name}</div>
            <div className="text-[10px] text-white/50 mt-0.5">{pattern.description}</div>
          </button>
        ))}
      </div>

      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 flex flex-col items-center"
        animate={isActive && phase === 'exhale' ? { scale: [1, 0.95, 1] } : {}}
        transition={{ duration: 1 }}
      >
        <div className="text-xs text-white/50 mb-4">{selectedPattern.name}</div>
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/40 to-cyan-500/20 border-4 border-blue-400/50 flex items-center justify-center mb-4"
          animate={{
            scale: isActive
              ? phase === 'inhale'
                ? [1, 1.2]
                : phase === 'exhale'
                ? [1.2, 1]
                : [1, 1]
              : 1
          }}
          transition={{
            duration: selectedPattern[phase === 'holdAfter' ? 'hold' : phase] || 4,
            ease: phase === 'inhale' ? 'easeOut' : phase === 'exhale' ? 'easeIn' : 'linear'
          }}
        >
          <span className="text-2xl font-bold text-white">{countdown}</span>
        </motion.div>
        <div className="text-sm text-white/70 capitalize mb-4">
          {phase === 'inhale' ? '吸气...' : phase === 'hold' ? '屏息...' : phase === 'exhale' ? '呼气...' : '屏息...'}
        </div>
        <div className="flex gap-3">
          <button
            onClick={toggleActive}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              isActive
                ? 'bg-red-500/30 hover:bg-red-500/40 text-red-300'
                : 'bg-blue-500/30 hover:bg-blue-500/40 text-blue-300'
            }`}
          >
            {isActive ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 transition-all"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function MoodDiaryTool() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (selectedMood) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="text-sm font-medium text-white/70 mb-3">此刻的感受</div>
        <div className="grid grid-cols-4 gap-2">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-2 rounded-lg flex flex-col items-center transition-all ${
                selectedMood === mood.id
                  ? 'bg-white/20 ring-2 ring-violet-400'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <span className="text-xl">{mood.emoji}</span>
              <span className="text-[10px] text-white/60 mt-1">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="text-sm font-medium text-white/70 mb-3">记录原因（可选）</div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="今天发生了什么..."
          className="w-full h-24 px-3 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:border-violet-500/50"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={!selectedMood}
        className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
          saved
            ? 'bg-emerald-500/30 text-emerald-300'
            : selectedMood
            ? 'bg-violet-500/30 hover:bg-violet-500/40 text-violet-300'
            : 'bg-white/10 text-white/30 cursor-not-allowed'
        }`}
      >
        {saved ? (
          <>
            <Check size={18} />
            已保存
          </>
        ) : (
          '保存日记'
        )}
      </button>
    </div>
  )
}

function StressManagementTool() {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {stressTechniques.map((technique, index) => (
        <motion.div
          key={technique.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            selectedTechnique === technique.title
              ? 'bg-emerald-500/20 border-emerald-500/40'
              : 'bg-white/5 border-white/10 hover:border-emerald-500/30'
          }`}
          onClick={() => setSelectedTechnique(technique.title === selectedTechnique ? null : technique.title)}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-white">{technique.title}</h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
              {technique.duration}
            </span>
          </div>
          <p className="text-xs text-white/50">{technique.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

function GoalSettingTool() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {goalMethods.map((method, index) => (
        <motion.div
          key={method.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            selectedMethod === method.title
              ? 'bg-amber-500/20 border-amber-500/40'
              : 'bg-white/5 border-white/10 hover:border-amber-500/30'
          }`}
          onClick={() => setSelectedMethod(method.title === selectedMethod ? null : method.title)}
        >
          <h4 className="text-sm font-medium text-white mb-1">{method.title}</h4>
          <p className="text-xs text-white/50">{method.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default function LibraryTools() {
  const navigate = useNavigate()
  const [activeTool, setActiveTool] = useState<string | null>(null)

  const currentTool = tools.find(t => t.id === activeTool)
  const ToolIcon = currentTool?.icon || Wind

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <button 
          onClick={() => activeTool ? setActiveTool(null) : navigate('/app/discover')}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          {activeTool ? '返回工具列表' : '返回探索'}
        </button>
        <h1 className="text-xl sm:text-2xl font-bold mb-1">
          {activeTool ? (
            <span className="flex items-center gap-2">
              <ToolIcon size={22} className={currentTool?.colorText} />
              {currentTool?.title}
            </span>
          ) : '🛠️ 心理工具'}
        </h1>
        <p className="text-xs sm:text-sm text-white/60">
          {activeTool ? currentTool?.description : '实用工具助力心理健康'}
        </p>
      </motion.div>

      {activeTool ? (
        <motion.div
          key={activeTool}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {activeTool === 'breathing' && <BreathingTool />}
          {activeTool === 'mood-diary' && <MoodDiaryTool />}
          {activeTool === 'stress-management' && <StressManagementTool />}
          {activeTool === 'goal-setting' && <GoalSettingTool />}
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTool(tool.id)}
                className={`p-4 rounded-2xl bg-gradient-to-br ${tool.colorGradient} border ${tool.colorBorder} cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3 ${tool.colorText}`}>
                  <Icon size={24} />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white">{tool.title}</h3>
                  {tool.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white/80">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/50">{tool.description}</p>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
