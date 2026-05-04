import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Dumbbell, TrendingUp, Compass, User, Settings } from 'lucide-react'
import { clsx } from 'clsx'
import { motionPresets, buttonPress, cardHover, staggerContainer } from '../../utils/motionPresets'

const menuItems = [
  { path: '/app/daily', label: '今日', icon: Home, preset: 'slideRight' as const },
  { path: '/app/training', label: '训练', icon: Dumbbell, preset: 'scale' as const },
  { path: '/app/progress', label: '进度', icon: TrendingUp, preset: 'bounce' as const },
  { path: '/app/discover', label: '探索', icon: Compass, preset: 'elastic' as const },
]

export default function SideNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <motion.div 
      className="fixed left-0 top-0 bottom-0 w-64 bg-slate-950 border-r border-violet-500/10 z-50"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <div className="p-6">
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <svg viewBox="0 0 100 100" className="w-7 h-7">
              <path
                d="M25 80 Q25 30 50 30 L55 20 L60 30 Q75 30 75 80 L60 80 Q60 50 55 50 L50 55 L45 50 Q40 50 40 80 Z"
                fill="none"
                stroke="url(#sideNavGold)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="sideNavGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#f5e6c8" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-white">心镜 MindMirror</h1>
            <p className="text-xs text-white/40">照见自己，成为更好的自己</p>
          </div>
        </motion.div>

        <nav className="space-y-2">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-2"
          >
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group',
                    isActive 
                      ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
                      : 'text-white/50 hover:bg-white/5 hover:text-white'
                  )}
                  variants={{
                    initial: { opacity: 0, x: -20 },
                    animate: { 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: 0.1 + index * 0.07 },
                    },
                  }}
                  {...cardHover}
                >
                  <motion.div
                    animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
                  </motion.div>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400"
                      layoutId="activeDot"
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        </nav>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-violet-500/10 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button 
          onClick={() => navigate('/app/settings')}
          className={clsx(
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
            location.pathname === '/app/settings'
              ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
              : 'text-white/50 hover:bg-white/5 hover:text-white'
          )}
          {...buttonPress}
        >
          <Settings size={18} className={location.pathname === '/app/settings' ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
          <span className="text-sm">设置</span>
          {location.pathname === '/app/settings' && (
            <motion.div 
              className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400"
              layoutId="activeDotSettings"
            />
          )}
        </motion.button>
        <motion.button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all" {...buttonPress}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
          <span className="text-white/70">访客用户</span>
          <User size={16} className="ml-auto text-white/30" />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
