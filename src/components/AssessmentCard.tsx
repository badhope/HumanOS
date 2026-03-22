import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, BarChart3, ChevronRight, Sparkles } from 'lucide-react'
import type { Assessment } from '@types'
import { cn } from '@utils/cn'

interface AssessmentCardProps {
  assessment: Assessment
  index?: number
}

export default function AssessmentCard({ assessment, index = 0 }: AssessmentCardProps) {
  const difficultyColors = {
    lite: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    standard: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    expert: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  }

  const difficultyLabels = {
    lite: '入门',
    standard: '标准',
    expert: '专业',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/assessment/${assessment.id}`}>
        <div
          className={cn(
            'group relative overflow-hidden rounded-2xl glass p-6',
            'hover-lift transition-all duration-500',
            'border border-white/10'
          )}
        >
          {/* Gradient Background */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
              difficultyColors[assessment.difficulty]
            )}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    'bg-white/10 text-white/80'
                  )}
                >
                  {assessment.category}
                </span>
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    'bg-gradient-to-r from-violet-500/20 to-pink-500/20 text-white'
                  )}
                >
                  {difficultyLabels[assessment.difficulty]}
                </span>
              </div>
              <Sparkles className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
              {assessment.title}
            </h3>
            <p className="text-white/60 text-sm mb-6 line-clamp-2">
              {assessment.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-white/50">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{assessment.duration} 分钟</span>
                </div>
                <div className="flex items-center gap-1 text-white/50">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">{assessment.questions.length} 题</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-1 text-violet-400 group-hover:text-violet-300 transition-colors">
                <span className="text-sm font-medium">开始</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute -inset-px bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  )
}
