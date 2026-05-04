import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Dumbbell, TrendingUp, Compass, Settings } from 'lucide-react'
import { clsx } from 'clsx'
import { motionPresets, buttonPress, staggerContainer } from '../../utils/motionPresets'

const tabs = [
  { path: '/app/daily', label: '今日', icon: Home, preset: 'slideUp' as const },
  { path: '/app/training', label: '训练', icon: Dumbbell, preset: 'bounce' as const },
  { path: '/app/progress', label: '进度', icon: TrendingUp, preset: 'scale' as const },
  { path: '/app/discover', label: '探索', icon: Compass, preset: 'elastic' as const },
  { path: '/app/settings', label: '设置', icon: Settings, preset: 'fadeIn' as const },
]

export default function BottomTabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-violet-500/20 pb-safe"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
    >
      <motion.div 
        className="flex items-center justify-around h-16 max-w-md mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = location.pathname === tab.path
          
          return (
            <motion.button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={clsx(
                'relative flex flex-col items-center justify-center w-full h-full transition-all duration-300',
                isActive ? 'text-violet-400' : 'text-white/40'
              )}
              custom={index}
              variants={{
                initial: { opacity: 0, y: 10, scale: 0.8 },
                animate: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { delay: 0.15 + index * 0.06 },
                },
              }}
              {...buttonPress}
            >
              {isActive && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute top-0 w-12 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              <motion.div
                animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                transition={{ 
                  duration: 0.3, 
                  times: [0, 0.5, 1],
                  type: 'spring',
                }}
              >
                <Icon
                  size={24}
                  className={clsx(
                    'transition-all duration-300',
                    isActive && 'drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]'
                  )}
                />
              </motion.div>
              
              <span className={clsx(
                'text-xs mt-1 font-medium transition-all duration-300',
                isActive && 'font-semibold'
              )}>
                {tab.label}
              </span>
            </motion.button>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
