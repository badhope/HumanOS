import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

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
