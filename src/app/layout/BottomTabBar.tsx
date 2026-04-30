import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Dumbbell, TrendingUp, Compass } from 'lucide-react'
import { clsx } from 'clsx'

const tabs = [
  { path: '/app/daily', label: '今日', icon: Home },
  { path: '/app/training', label: '训练', icon: Dumbbell },
  { path: '/app/progress', label: '进度', icon: TrendingUp },
  { path: '/app/discover', label: '探索', icon: Compass },
]

export default function BottomTabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-violet-500/20 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
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
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute top-0 w-12 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              <Icon
                size={24}
                className={clsx(
                  'transition-all duration-300',
                  isActive && 'drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]'
                )}
              />
              
              <span className={clsx(
                'text-xs mt-1 font-medium transition-all duration-300',
                isActive && 'font-semibold'
              )}>
                {tab.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
