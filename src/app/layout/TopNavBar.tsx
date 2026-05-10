import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'

interface TopNavBarProps {
  title: string
  onMenuClick?: () => void
}

export default function TopNavBar({ title, onMenuClick }: TopNavBarProps) {
  return (
    <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-violet-500/10 pt-safe">
      <div className="flex items-center justify-between h-14 px-4 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <svg viewBox="0 0 100 100" className="w-4 h-4">
              <path
                d="M25 80 Q25 30 50 30 L55 20 L60 30 Q75 30 75 80 L60 80 Q60 50 55 50 L50 55 L45 50 Q40 50 40 80 Z"
                fill="none"
                stroke="url(#topNavGold)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="topNavGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#f5e6c8" />
                  <stop offset="100%" stopColor="#d4af37" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-base font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent truncate max-w-[180px] sm:max-w-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {title}
          </motion.h1>
        </div>
        
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label="打开菜单"
          >
            <Menu size={20} className="text-white/70" />
          </button>
        )}
      </div>
    </div>
  )
}
