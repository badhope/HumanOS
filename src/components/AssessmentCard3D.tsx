import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, BarChart3, ChevronRight, Sparkles } from 'lucide-react'
import type { Assessment } from '../types'
import { cn } from '../utils/cn'

interface AssessmentCard3DProps {
  assessment: Assessment
  index?: number
}

export default function AssessmentCard3D({ assessment, index = 0 }: AssessmentCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isFlipped, setIsFlipped] = useState(false)

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setMousePosition({ x, y })

    if (assessment.cardStyle === 'flip') {
      rotateX.set(0)
      rotateY.set(0)
      return
    }

    const rotateYVal = ((x - centerX) / centerX) * 12
    const rotateXVal = -((y - centerY) / centerY) * 12

    rotateX.set(rotateXVal)
    rotateY.set(rotateYVal)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    scale.set(1.05)
    if (assessment.cardStyle === 'flip') {
      setIsFlipped(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    if (assessment.cardStyle === 'flip') {
      setIsFlipped(false)
    }
  }

  const difficultyColors = {
    lite: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    standard: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    expert: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  }

  const glowColors = {
    lite: { shadow: 'shadow-green-500/30', border: 'border-green-500/50', gradient: 'from-green-500/30' },
    standard: { shadow: 'shadow-blue-500/30', border: 'border-blue-500/50', gradient: 'from-blue-500/30' },
    expert: { shadow: 'shadow-purple-500/30', border: 'border-purple-500/50', gradient: 'from-purple-500/30' },
  }

  const difficultyLabels = {
    lite: '入门',
    standard: '标准',
    expert: '专业',
  }

  const cardStyle = assessment.cardStyle || 'default'

  const getCardClasses = () => {
    const base = 'relative overflow-hidden rounded-2xl glass p-6 transition-all duration-500 border border-white/10'

    if (cardStyle === 'glow') {
      return cn(
        base,
        'backdrop-blur-xl',
        isHovered && `shadow-[0_0_60px_rgba(139,92,246,0.4)] ${glowColors[assessment.difficulty].border} border-opacity-60`
      )
    }

    if (cardStyle === 'flip') {
      return cn(
        base,
        'backdrop-blur-xl'
      )
    }

    return cn(
      base,
      isHovered && 'border-violet-500/50 shadow-[0_0_40px_rgba(139,92,246,0.2)]'
    )
  }

  const renderCardContent = () => (
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80">
            {assessment.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-violet-500/20 to-pink-500/20 text-white">
            {difficultyLabels[assessment.difficulty]}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className={cn(
            'w-5 h-5 transition-colors',
            isHovered ? 'text-violet-400' : 'text-white/40'
          )} />
        </motion.div>
      </div>

      <motion.h3
        className="text-xl font-bold text-white mb-2"
        style={{ transform: 'translateZ(30px)' }}
        animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
      >
        {assessment.title}
      </motion.h3>

      <p className="text-white/60 text-sm mb-6 line-clamp-2">
        {assessment.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            className="flex items-center gap-1 text-white/50"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm">{assessment.duration} 分钟</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1 text-white/50"
            whileHover={{ scale: 1.05 }}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">{assessment.questions.length} 题</span>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center gap-1 text-violet-400"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <span className="text-sm font-medium">开始</span>
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  )

  const renderFlipCardBack = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-900/90 to-purple-900/90 backdrop-blur-sm p-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-4">翻转效果</h3>
        <p className="text-white/70 text-sm mb-6">
          这是一个支持翻转效果的测评卡片
        </p>
        <div className="flex items-center justify-center gap-1 text-violet-400">
          <span className="text-sm font-medium">查看详情</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  )

  const renderGlowEffect = () => (
    <>
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500',
          isHovered && 'opacity-100',
          difficultyColors[assessment.difficulty]
        )}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.25) 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {cardStyle === 'glow' && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0"
          animate={{
            opacity: isHovered ? [0, 0.5, 0] : 0,
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.4) 0%, transparent 50%)`,
          }}
        />
      )}
    </>
  )

  if (cardStyle === 'flip') {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        style={{ perspective: 1000 }}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            scale,
            transformStyle: 'preserve-3d',
          }}
          className="relative"
        >
          <Link to={`/assessment/${assessment.id}`}>
            <motion.div
              className={getCardClasses()}
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className={cn(!isFlipped ? 'block' : 'hidden')}>
                {renderCardContent()}
              </div>
              <div className={cn(isFlipped ? 'block' : 'hidden')} style={{ transform: 'rotateY(180deg)' }}>
                {renderFlipCardBack()}
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        <Link to={`/assessment/${assessment.id}`}>
          <div className={getCardClasses()}>
            {renderGlowEffect()}

            {renderCardContent()}
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}
