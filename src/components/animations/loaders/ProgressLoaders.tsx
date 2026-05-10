import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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

export type { PhoneLoadingStyle, PhoneLoadingProps }
