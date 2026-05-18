import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, TestTube, Dumbbell, TrendingUp, BookOpen, Users, Sparkles, User, Settings, X } from 'lucide-react'
import { clsx } from 'clsx'

const mainMenuItems = [
  { path: '/app/home', label: '首页', icon: Home },
  { path: '/app/assessments', label: '测评中心', icon: TestTube },
  { path: '/app/training', label: '训练中心', icon: Dumbbell },
  { path: '/app/progress', label: '我的进度', icon: TrendingUp },
]

const exploreMenuItems = [
  { path: '/app/library', label: '心理图书馆', icon: BookOpen },
  { path: '/app/community', label: '社区互动', icon: Users },
  { path: '/app/growth', label: '个人成长', icon: Sparkles },
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
            className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-br from-slate-900 to-slate-800 border-r border-violet-500/20 z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
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
                  </div>
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                      心镜
                    </h1>
                    <p className="text-xs text-white/40">MindMirror</p>
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
                {mainMenuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className={clsx(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                        isActive 
                          ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
                          : 'text-white/50 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <Icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
                      )}
                    </button>
                  )
                })}

                <div className="pt-4 pb-2">
                  <p className="px-4 text-xs text-white/30 uppercase tracking-wider">探索</p>
                </div>

                {exploreMenuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigate(item.path)}
                      className={clsx(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                        isActive 
                          ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
                          : 'text-white/50 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <Icon size={18} className={isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
                      <span className="font-medium text-sm">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-violet-500/10 space-y-2 bg-slate-900/95 backdrop-blur-sm">
              <button 
                onClick={() => handleNavigate('/app/settings')}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                  location.pathname === '/app/settings'
                    ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                )}
              >
                <Settings size={18} className={location.pathname === '/app/settings' ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
                <span className="text-sm">设置</span>
              </button>
              
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
                <span className="text-white/70 text-sm">访客用户</span>
                <User size={16} className="ml-auto text-white/30" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}