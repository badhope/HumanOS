import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Dumbbell, TrendingUp, Compass, User, Settings } from 'lucide-react'
import { clsx } from 'clsx'

const menuItems = [
  { path: '/app/daily', label: '今日', icon: Home },
  { path: '/app/training', label: '训练', icon: Dumbbell },
  { path: '/app/progress', label: '进度', icon: TrendingUp },
  { path: '/app/discover', label: '探索', icon: Compass },
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
          transition={{ delay: 0.1 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">心</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">心镜 MindMirror</h1>
            <p className="text-xs text-white/40">照见自己，成为更好的自己</p>
          </div>
        </motion.div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                  isActive 
                    ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div 
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400"
                    layoutId="activeDot"
                  />
                )}
              </motion.button>
            )
          })}
        </nav>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-violet-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
          <span className="text-white/70">访客用户</span>
          <User size={16} className="ml-auto text-white/30" />
        </button>
      </motion.div>
    </motion.div>
  )
}
