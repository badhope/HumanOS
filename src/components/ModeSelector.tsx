import { motion } from 'framer-motion'
import { Zap, Shield, Crown, Lock } from 'lucide-react'
import { cn } from '../utils/cn'

interface ModeSelectorProps {
  onSelectMode: (mode: 'standard' | 'hard' | 'expert') => void
  defaultMode?: 'standard' | 'hard' | 'expert'
  questionCounts?: { standard: number; hard: number; expert: number }
}

const modes = [
  {
    id: 'standard' as const,
    title: '标准模式',
    description: '基础题目，核心能力评估',
    icon: Shield,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    questionCount: 30,
  },
  {
    id: 'hard' as const,
    title: '困难模式',
    description: '进阶题目，覆盖更全面',
    icon: Zap,
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-400',
    questionCount: 60,
  },
  {
    id: 'expert' as const,
    title: '专家模式',
    description: '深度题目，完整能力分析',
    icon: Crown,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    questionCount: 100,
  },
]

export default function ModeSelector({
  onSelectMode,
  defaultMode = 'standard',
  questionCounts = { standard: 30, hard: 60, expert: 100 },
}: ModeSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-white mb-4">选择测评模式</h2>
        <p className="text-white/60">不同模式提供不同深度的测评，请根据需求选择</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modes.map((mode, index) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode(mode.id)}
            className={cn(
              'relative overflow-hidden rounded-2xl p-6 text-left',
              'border-2 transition-all duration-300 cursor-pointer',
              mode.borderColor,
              'bg-gradient-to-br',
              mode.color,
              'hover:shadow-lg hover:shadow-violet-500/20'
            )}
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />

            <motion.div
              className={cn(
                'w-14 h-14 rounded-xl bg-gradient-to-r flex items-center justify-center mb-4',
                mode.color
              )}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <mode.icon className={cn('w-7 h-7', mode.iconColor)} />
            </motion.div>

            <h3 className="text-xl font-bold text-white mb-2">{mode.title}</h3>
            <p className="text-white/60 text-sm mb-4">{mode.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">
                约 {questionCounts[mode.id]} 题
              </span>
              <motion.span
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium',
                  'bg-white/10 text-white/80'
                )}
                whileHover={{ scale: 1.05 }}
              >
                选择
              </motion.span>
            </div>

            {mode.id === defaultMode && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={cn(
                  'absolute top-4 right-4 w-3 h-3 rounded-full',
                  'bg-green-500 animate-pulse'
                )}
              />
            )}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 text-center"
      >
        <p className="text-white/40 text-sm">
          专家模式提供最详细的分析建议，但需要更长的时间完成
        </p>
      </motion.div>
    </div>
  )
}
