import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles, Atom, Star, Circle } from 'lucide-react'
import { loadingAnimations, getRandomLoadingAnimation, prefersReducedMotion } from '@utils/page-transition-styles'

export type LoadingType = keyof typeof loadingAnimations | 'random' | 'auto'

interface LoadingAnimationProps {
  type?: LoadingType
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  text?: string
  showText?: boolean
  className?: string
}

const sizeMap = {
  sm: 24,
  md: 40,
  lg: 64,
  xl: 96,
}

export function LoadingSpinner({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: actualSize, height: actualSize }}
      variants={loadingAnimations.spinner.variants}
      animate="animate"
    >
      <Circle className="w-full h-full" style={{ color, strokeWidth: 2.5, opacity: 0.2 }} />
      <Circle 
        className="absolute w-full h-full" 
        style={{ color, strokeWidth: 2.5 }}
        strokeDasharray="70 100"
        strokeDashoffset="20"
      />
    </motion.div>
  )
}

export function LoadingPulse({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: actualSize, height: actualSize }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{ 
          width: actualSize * 0.6, 
          height: actualSize * 0.6,
          backgroundColor: color,
          opacity: 0.3,
        }}
        variants={loadingAnimations.pulse.variants}
        animate="animate"
      />
      <Brain 
        className="relative z-10"
        style={{ width: actualSize * 0.5, height: actualSize * 0.5, color }}
      />
    </motion.div>
  )
}

export function LoadingDots({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  const dotSize = actualSize / 4
  
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} style={{ height: actualSize }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ 
            width: dotSize, 
            height: dotSize,
            backgroundColor: color,
          }}
          custom={i}
          variants={loadingAnimations.dots.variants}
          animate="animate"
        />
      ))}
    </div>
  )
}

export function LoadingBars({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  const barWidth = actualSize / 6
  
  return (
    <div className={`flex items-end justify-center gap-1 ${className}`} style={{ height: actualSize }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="rounded-full origin-bottom"
          style={{ 
            width: barWidth, 
            height: actualSize * 0.8,
            backgroundColor: color,
          }}
          custom={i}
          variants={loadingAnimations.bars.variants}
          animate="animate"
        />
      ))}
    </div>
  )
}

export function LoadingRipple({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: actualSize, height: actualSize }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{ 
            width: actualSize * 0.6, 
            height: actualSize * 0.6,
            borderColor: color,
          }}
          variants={loadingAnimations.ripple.variants}
          animate="animate"
          transition={{ delay: i * 0.5 }}
        />
      ))}
      <Atom 
        className="relative z-10"
        style={{ width: actualSize * 0.4, height: actualSize * 0.4, color }}
      />
    </div>
  )
}

export function LoadingOrbit({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: actualSize, height: actualSize }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{ 
            width: actualSize * (0.5 + i * 0.2), 
            height: actualSize * (0.5 + i * 0.2),
            borderColor: color,
            opacity: 0.3 + i * 0.2,
          }}
          custom={i}
          variants={loadingAnimations.orbit.variants}
          animate="animate"
        />
      ))}
      <Sparkles 
        className="relative z-10"
        style={{ width: actualSize * 0.25, height: actualSize * 0.25, color }}
      />
    </div>
  )
}

export function LoadingGradient({ size = 'md', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <motion.div
      className={`rounded-full ${className}`}
      style={{ 
        width: actualSize, 
        height: actualSize,
        background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)',
        backgroundSize: '300% 300%',
      }}
      variants={loadingAnimations.gradient.variants}
      animate="animate"
    />
  )
}

export function LoadingMorph({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <motion.div
      className={`${className}`}
      style={{ 
        width: actualSize * 0.7, 
        height: actualSize * 0.7,
        backgroundColor: color,
      }}
      variants={loadingAnimations.morph.variants}
      animate="animate"
    />
  )
}

export function LoadingStars({ size = 'md', color = 'white', className = '' }: LoadingAnimationProps) {
  const actualSize = sizeMap[size]
  
  return (
    <div className={`relative ${className}`} style={{ width: actualSize, height: actualSize }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2
        const radius = actualSize * 0.35
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: actualSize / 2 + Math.cos(angle) * radius,
              top: actualSize / 2 + Math.sin(angle) * radius,
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 180],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Star className="fill-current" style={{ width: actualSize * 0.2, height: actualSize * 0.2, color }} />
          </motion.div>
        )
      })}
    </div>
  )
}

type PhoneLoadingStyle = 'skeleton' | 'progress' | 'scan' | 'glow' | 'waves'

interface PhoneLoadingProps {
  style?: PhoneLoadingStyle
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const phoneSizeMap = {
  sm: { width: 160, height: 320 },
  md: { width: 200, height: 400 },
  lg: { width: 280, height: 560 },
}

export function PhoneLoadingSkeleton({ size = 'md', className = '' }: PhoneLoadingProps) {
  const { width, height } = phoneSizeMap[size]
  const screenWidth = width * 0.88
  const screenHeight = height * 0.9
  
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"
        style={{ borderWidth: width * 0.06 }}
      >
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-4 rounded-full bg-black"
        />
        <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gray-950">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          
          <div className="p-4 space-y-4">
            <motion.div 
              className="w-3/4 h-6 rounded-lg bg-white/10 mx-auto"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-full h-10 rounded-lg bg-white/10"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.1,
                  repeat: Infinity 
                }}
              />
            ))}
            
            <div className="flex gap-3 mt-6">
              <motion.div 
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-violet-500/30 to-pink-500/30"
                animate={{ scale: [0.95, 1, 0.95], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="flex-1 h-12 rounded-xl bg-white/10"
                animate={{ scale: [0.95, 1, 0.95], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PhoneLoadingProgress({ size = 'md', className = '' }: PhoneLoadingProps) {
  const { width, height } = phoneSizeMap[size]
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + Math.random() * 15))
    }, 400)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"
        style={{ borderWidth: width * 0.06 }}
      >
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-4 rounded-full bg-black"
        />
        <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-950 via-gray-950 to-pink-950">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mb-8"
            >
              <div className="w-16 h-16 rounded-full border-4 border-violet-500/30 border-t-violet-400" />
            </motion.div>
            
            <div className="w-full mb-3">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500"
                  style={{ width: `${Math.min(100, progress)}%` }}
                />
              </div>
            </div>
            <p className="text-white/60 text-sm font-medium">
              处理中... {Math.round(progress)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PhoneLoadingScan({ size = 'md', className = '' }: PhoneLoadingProps) {
  const { width, height } = phoneSizeMap[size]
  
  const bars = [
    { label: '资源加载', color: 'from-violet-500 to-purple-500', delay: 0 },
    { label: '数据处理', color: 'from-pink-500 to-rose-500', delay: 0.15 },
    { label: '渲染准备', color: 'from-cyan-500 to-blue-500', delay: 0.3 },
    { label: '初始化完成', color: 'from-emerald-500 to-teal-500', delay: 0.45 },
  ]
  
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"
        style={{ borderWidth: width * 0.06 }}
      >
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-4 rounded-full bg-black"
        />
        <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950">
          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <motion.div
              className="text-center mb-8"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-white font-medium text-lg">正在准备</p>
              <p className="text-white/50 text-sm mt-1">请稍候...</p>
            </motion.div>
            
            <div className="space-y-5">
              {bars.map((bar, i) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white/60">{bar.label}</span>
                    <motion.span 
                      className="text-white/80 font-medium"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, delay: bar.delay, repeat: Infinity }}
                    >
                      {Math.round(50 + i * 12 + Math.sin(Date.now() / 500) * 10)}%
                    </motion.span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                      initial={{ width: '5%' }}
                      animate={{ 
                        width: [`${10 + i * 15}%`, `${50 + i * 12}%`, `${20 + i * 10}%`] 
                      }}
                      transition={{
                        duration: 2,
                        delay: bar.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PhoneLoadingGlow({ size = 'md', className = '' }: PhoneLoadingProps) {
  const { width, height } = phoneSizeMap[size]
  
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <motion.div
        className="absolute -inset-4 rounded-[3rem]"
        style={{
          background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)',
          filter: 'blur(30px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      
      <div 
        className="relative inset-0 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"
        style={{ width, height, borderWidth: width * 0.06 }}
      >
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-4 rounded-full bg-black"
        />
        <div className="absolute inset-4 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-gray-900 to-pink-900" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="relative mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ filter: 'blur(15px)' }}
              />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 via-pink-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">AI</span>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-white/80 font-medium text-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI 智能分析中
            </motion.p>
            <motion.p 
              className="text-white/40 text-sm mt-2 text-center"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            >
              正在生成您的专属报告
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PhoneLoadingWaves({ size = 'md', className = '' }: PhoneLoadingProps) {
  const { width, height } = phoneSizeMap[size]
  const waveColors = [
    'rgba(139, 92, 246, 0.3)',
    'rgba(236, 72, 153, 0.3)',
    'rgba(6, 182, 212, 0.3)',
  ]
  
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"
        style={{ borderWidth: width * 0.06 }}
      >
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-4 rounded-full bg-black"
        />
        <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950">
          <div className="absolute inset-0">
            {waveColors.map((color, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%]"
                style={{
                  width: width * 3,
                  height: height,
                  backgroundColor: color,
                  y: '50%',
                }}
                animate={{ 
                  rotate: [0, 360],
                  y: ['45%', '55%', '45%'],
                }}
                transition={{
                  duration: 3 + i,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="relative mb-6"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg className="w-8 h-8 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                      <path d="M2 17L12 22L22 17" />
                      <path d="M2 12L12 17L22 12" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-white/70 font-medium relative z-10"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                正在加载资源
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PhonePageOverlay({
  style = 'skeleton',
  text = '加载中...',
}: {
  style?: PhoneLoadingStyle
  text?: string
}) {
  const PhoneComponent = {
    skeleton: PhoneLoadingSkeleton,
    progress: PhoneLoadingProgress,
    scan: PhoneLoadingScan,
    glow: PhoneLoadingGlow,
    waves: PhoneLoadingWaves,
  }[style] || PhoneLoadingSkeleton

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-lg"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.15, type: 'spring', stiffness: 300 }}
          className="flex flex-col items-center gap-8"
        >
          <PhoneComponent size="lg" />
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
            className="text-white/70 text-lg font-medium"
          >
            {text}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function LogoLoading({ size = 260, className = '' }: { size?: number; className?: string }) {
  const rings = [
    { color: '#8b5cf6', delay: 0, radius: 1.0, width: 4 },
    { color: '#ec4899', delay: 0.25, radius: 1.3, width: 3.5 },
    { color: '#06b6d4', delay: 0.5, radius: 1.6, width: 3 },
    { color: '#f59e0b', delay: 0.75, radius: 1.9, width: 2.5 },
    { color: '#10b981', delay: 1.0, radius: 2.2, width: 2 },
  ]
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{ 
            border: `${ring.width}px solid ${ring.color}`,
          }}
          initial={{ scale: ring.radius, opacity: 0 }}
          animate={{ 
            scale: [ring.radius * 0.82, ring.radius * 1.18, ring.radius * 0.82],
            opacity: [0.2, 0.7, 0.2],
            rotate: i % 2 === 0 ? [0, 360] : [360, 0],
          }}
          transition={{
            duration: 5 + i * 0.8,
            delay: ring.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #f59e0b, #06b6d4, #10b981, #8b5cf6)',
          filter: 'blur(35px)',
          opacity: 0.65,
        }}
        animate={{ 
          scale: [0.7, 1.05, 0.7],
          rotate: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-amber-400 flex items-center justify-center shadow-2xl"
          animate={{ 
            scale: [1, 1.12, 1],
            boxShadow: [
              '0 0 40px rgba(139, 92, 246, 0.6)',
              '0 0 80px rgba(236, 72, 153, 0.6)',
              '0 0 100px rgba(245, 158, 11, 0.5)',
              '0 0 80px rgba(6, 182, 212, 0.5)',
              '0 0 40px rgba(139, 92, 246, 0.6)',
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.15, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-[85%] h-[85%] text-white" strokeWidth={1} fill="rgba(255,255,255,0.2)" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export function SmallLogo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
    >
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)',
          opacity: 0.3,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkles className="w-3/5 h-3/5 text-violet-400" />
      </div>
    </motion.div>
  )
}

export function PageLoadingOverlay({
  type = 'auto',
  text = '加载中...',
  showText = true,
}: {
  type?: LoadingType
  text?: string
  showText?: boolean
}) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const progressStages = [
      { target: 15, delay: 100 },
      { target: 35, delay: 250 },
      { target: 55, delay: 350 },
      { target: 75, delay: 400 },
      { target: 90, delay: 500 },
      { target: 98, delay: 600 },
    ]
    
    progressStages.forEach((stage) => {
      setTimeout(() => {
        setProgress(stage.target)
      }, stage.delay)
    })
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/92 backdrop-blur-3xl"
      >
        <motion.div
          initial={{ scale: 0.65, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -30 }}
          transition={{ 
            delay: prefersReducedMotion ? 0 : 0.2, 
            type: 'spring', 
            stiffness: 150,
            damping: 30,
            duration: 1,
          }}
          className="flex flex-col items-center gap-12"
        >
          <LogoLoading size={260} />
          
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.45, duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-white/95 text-3xl font-bold tracking-[0.2em]">
                MindMirror
              </p>
              <p className="text-white/65 text-xl">
                {text}
              </p>
            </motion.div>
          )}

          <motion.div
            className="w-96 flex flex-col items-center gap-3"
            initial={{ opacity: 0, scaleX: 0.7 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.65, duration: 0.7, ease: 'easeOut' }}
          >
            <div className="w-full h-5 rounded-full bg-white/10 overflow-hidden shadow-inner border border-white/5">
              <motion.div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #a855f7, #ec4899, #f59e0b, #06b6d4, #10b981, #8b5cf6)',
                  backgroundSize: '400% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '200% 50%', '400% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            </div>
            
            <motion.div 
              className="text-white/70 text-base font-medium tracking-wide"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {progress}%
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default {
  Spinner: LoadingSpinner,
  Pulse: LoadingPulse,
  Dots: LoadingDots,
  Bars: LoadingBars,
  Ripple: LoadingRipple,
  Orbit: LoadingOrbit,
  Gradient: LoadingGradient,
  Morph: LoadingMorph,
  Stars: LoadingStars,
  Overlay: PageLoadingOverlay,
}
