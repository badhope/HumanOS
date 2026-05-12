import { Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface TopNavBarProps {
  title: string
  onMenuClick?: () => void
}

export default function TopNavBar({ title, onMenuClick }: TopNavBarProps) {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-violet-500/10 pt-safe">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 max-w-md mx-auto">
        <button
          onClick={() => navigate('/app/home')}
          className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-5.5 sm:h-5.5">
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
          </div>
          
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
              心镜
            </span>
            <span className="text-xs sm:text-sm font-medium text-white/50 whitespace-nowrap">
              MindMirror
            </span>
            {title && title !== '心镜' && (
              <span className="text-sm sm:text-base font-medium text-white/80 truncate">
                · {title}
              </span>
            )}
          </div>
        </button>
        
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label="打开菜单"
          >
            <Menu size={20} className="w-5 h-5 sm:w-5 sm:h-5 text-white/70" />
          </button>
        )}
      </div>
    </div>
  )
}
