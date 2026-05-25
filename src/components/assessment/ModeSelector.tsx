import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  Microscope,
  Check,
  Crown,
  Sparkles,
  AlertTriangle,
} from 'lucide-react'
import { AssessmentMode, ModeConfiguration } from '@data/political-ideology/mode-configuration'
import { MODE_CONFIGURATIONS } from '@data/political-ideology/mode-configuration'
import { cn } from '@utils/cn'

interface ModeSelectorProps {
  selectedMode: AssessmentMode
  onModeChange: (mode: AssessmentMode) => void
  showDetails?: boolean
  compact?: boolean
}

interface ModeFeature {
  name: string
  included: boolean
}

function getModeFeatures(mode: AssessmentMode): ModeFeature[] {
  const config = MODE_CONFIGURATIONS[mode]
  return [
    { name: '核心维度分析', included: true },
    { name: '意识形态匹配', included: true },
    { name: '光谱可视化', included: true },
    { name: `${config.questionConfig.totalQuestions}道题目`, included: true },
    { name: '意识形态冲突检测', included: true },
    { name: '历史上下文解读', included: true },
    { name: '增强深度分析', included: true },
    { name: '推荐阅读书单', included: mode !== 'professional' ? mode === 'normal' : true },
    { name: '多视角交叉分析', included: mode !== 'normal' },
    { name: '亚维度精密分解', included: mode === 'professional' },
    { name: '小众意识形态检测', included: mode === 'professional' },
    { name: '跨维度相关性分析', included: mode === 'professional' },
    { name: '校准集成算法', included: mode === 'professional' },
    { name: '完整数据导出', included: true },
  ]
}

export default function ModeSelector({
  selectedMode,
  onModeChange,
  showDetails = true,
  compact = false,
}: ModeSelectorProps) {
  const [hoveredMode, setHoveredMode] = useState<AssessmentMode | null>(null)

  const modes: { mode: AssessmentMode; icon: React.ReactNode; description: string }[] = [
    { 
      mode: 'normal', 
      icon: <Target className="w-6 h-6" />,
      description: '适合初次测试，快速了解你的政治立场'
    },
    { 
      mode: 'advanced', 
      icon: <Microscope className="w-6 h-6" />,
      description: '深度剖析，多维度交叉验证分析'
    },
    { 
      mode: 'professional', 
      icon: <Crown className="w-6 h-6" />,
      description: '学术级精度，完整意识形态谱系分析'
    },
  ]

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/5">
        {modes.map(({ mode, icon }) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={cn(
              'relative px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-semibold',
              selectedMode === mode
                ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            )}
          >
            {icon}
            <span className="capitalize">{mode}</span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4 mb-8 p-6 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-500/10">
          <Sparkles className="w-7 h-7 text-amber-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight">选择你的征程</h3>
          <p className="text-sm text-slate-500 mt-1">每一种模式，都是一次思想的深度探险</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {modes.map(({ mode, icon, description }) => {
          const config: ModeConfiguration = MODE_CONFIGURATIONS[mode]
          const isSelected = selectedMode === mode
          const isHovered = hoveredMode === mode
          const features = getModeFeatures(mode)

          return (
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 30, rotateX: '5deg' }}
              animate={{ opacity: 1, y: 0, rotateX: '0deg' }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 300,
                delay: modes.findIndex(m => m.mode === mode) * 0.15 
              }}
              onHoverStart={() => setHoveredMode(mode)}
              onHoverEnd={() => setHoveredMode(null)}
              onClick={() => onModeChange(mode)}
              className={cn(
                'relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 group',
                isSelected
                  ? 'scale-[1.03] shadow-[0_32px_64px_-12px_rgba(251,191,36,0.2)]'
                  : 'hover:scale-[1.01] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]'
              )}
            >
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 to-orange-500/10 pointer-events-none" />
              )}
              
              <div
                className={cn(
                  'p-7 h-full border transition-all duration-500 relative z-10',
                  isSelected
                    ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/40'
                    : 'bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-white/20 hover:from-white/8'
                )}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500',
                      isSelected
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30'
                        : 'bg-gradient-to-br from-white/10 to-white/5 text-slate-400 group-hover:text-amber-400 group-hover:from-amber-500/20 group-hover:to-orange-500/10'
                    )}
                  >
                    {icon}
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>

                <div className="mb-5">
                  <h4 className={cn(
                    'text-lg font-bold tracking-tight mb-2 transition-all duration-300',
                    isSelected ? 'text-amber-400' : 'group-hover:text-amber-400'
                  )}>
                    {config.displayName}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-slate-400 font-semibold border border-white/5">
                    ⏱️ {config.questionConfig.totalQuestions} 题
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-slate-400 font-semibold border border-white/5">
                    📊 {config.questionConfig.totalQuestions * 10} 秒
                  </span>
                </div>

                {showDetails && (
                  <motion.div
                    animate={{
                      height: isHovered || isSelected ? 'auto' : '0px',
                      opacity: isHovered || isSelected ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-white/5 space-y-2">
                      {features.slice(0, 6).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          {feature.included ? (
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center flex-shrink-0">
                              <AlertTriangle className="w-2.5 h-2.5 text-slate-600" />
                            </div>
                          )}
                          <span className={cn(
                            'text-xs',
                            feature.included ? 'text-slate-400' : 'text-slate-600'
                          )}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className={cn(
                  'mt-6 flex items-center justify-between text-xs font-semibold transition-all duration-300',
                  isSelected ? 'text-amber-400' : 'text-slate-500 group-hover:text-amber-400'
                )}>
                  <span>{isSelected ? '已选择' : '点击选择'}</span>
                  <motion.div
                    animate={{ x: isHovered || isSelected ? 3 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
