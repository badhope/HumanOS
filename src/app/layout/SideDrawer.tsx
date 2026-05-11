import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Dumbbell, TrendingUp, Compass, User, Settings, X } from 'lucide-react'
import { clsx } from 'clsx'
import { buttonPress, cardHover } from '../../utils/motionPresets'

const menuItems = [
  { path: '/app/home', label: '首页', icon: Home },
  { path: '/app/training', label: '训练', icon: Dumbbell },
  { path: '/app/progress', label: '进度', icon: TrendingUp },
  { path: '/app/discover', label: '探索', icon: Compass },
]

interface SideDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-br from-slate-900 to-slate-800 border-r border-violet-500/20 z-50 shadow-2xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <svg viewBox="0 0 100 100" className="w-7 h-7">
                      <path
                        d="M25 80 Q25 30 50 30 L55 20 L60 30 Q75 30 75 80 L60 80 Q60 50 55 50 L50 55 L45 50 Q40 50 40 80 Z"
                        fill="none"
                        stroke="url(#sideDrawerGold)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="sideDrawerGold" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#d4af37" />
                          <stop offset="50%" stopColor="#f5e6c8" />
                          <stop offset="100%" stopColor="#d4af37" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                      心镜
                      <span className="hidden md:inline"> MindMirror</span>
                    </h1>
                    <p className="text-xs text-white/40">照见自己，成为更好的自己</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={20} className="text-white/60" />
                </button>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <motion.button
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className={clsx(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group',
                        isActive 
                          ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
                          : 'text-white/50 hover:bg-white/5 hover:text-white'
                      )}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.05 }}
                      {...cardHover}
                    >
                      <Icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div 
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400"
                          layoutId="activeDotDrawer"
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </nav>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-violet-500/10 space-y-2">
              <motion.button 
                onClick={() => handleNavigate('/app/settings')}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                  location.pathname === '/app/settings'
                    ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                {...buttonPress}
              >
                <Settings size={18} className={location.pathname === '/app/settings' ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
                <span className="text-sm">设置</span>
              </motion.button>
              
              <motion.div 
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
                <span className="text-white/70 text-sm">访客用户</span>
                <User size={16} className="ml-auto text-white/30" />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
