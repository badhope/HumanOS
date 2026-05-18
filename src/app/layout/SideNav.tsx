import { useLocation, useNavigate } from 'react-router-dom'
import { Home, TestTube, Dumbbell, TrendingUp, BookOpen, Users, Sparkles, User, Settings, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

const mainMenuItems = [
  { path: '/app/home', label: '首页', icon: Home },
  { path: '/app/assessments', label: '测评中心', icon: TestTube },
  { path: '/app/training', label: '训练中心', icon: Dumbbell },
  { path: '/app/progress', label: '我的进度', icon: TrendingUp },
]

const exploreMenuItems = [
  { path: '/app/library', label: '心理图书馆', icon: BookOpen, description: '文章、工具、资源' },
  { path: '/app/community', label: '社区互动', icon: Users, description: '分享、讨论、专家' },
  { path: '/app/growth', label: '个人成长', icon: Sparkles, description: '训练计划、习惯养成' },
]

export default function SideNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div 
      className="fixed left-0 top-0 bottom-0 w-64 bg-slate-950 border-r border-violet-500/10 z-50 overflow-y-auto"
    >
      <div className="p-6">
        <button
          onClick={() => navigate('/app/home')}
          className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity w-full"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
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
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
                心镜
              </h1>
              <span className="text-sm font-medium text-white/50 whitespace-nowrap">
                MindMirror
              </span>
            </div>
            <p className="text-xs text-white/40 mt-0.5 leading-relaxed">
              照见自己，成为更好的自己
            </p>
          </div>
        </button>

        <nav className="space-y-2">
          <div className="space-y-2">
            {mainMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group',
                    isActive 
                      ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
                      : 'text-white/50 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <div className={isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''}>
                    <Icon size={20} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div 
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400"
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs text-white/30 uppercase tracking-wider">探索</p>
          </div>

          <div className="space-y-1">
            {exploreMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group',
                    isActive 
                      ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
                      : 'text-white/50 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <div className={isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  )}
                </button>
              )
            })}
          </div>
        </nav>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-violet-500/10 space-y-2 bg-slate-950"
      >
        <button 
          onClick={() => navigate('/app/settings')}
          className={clsx(
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
            location.pathname === '/app/settings'
              ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-400 border border-violet-500/20'
              : 'text-white/50 hover:bg-white/5 hover:text-white'
          )}
        >
          <Settings size={18} className={location.pathname === '/app/settings' ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
          <span className="text-sm">设置</span>
          {location.pathname === '/app/settings' && (
            <div 
              className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400"
            />
          )}
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
          <span className="text-white/70">访客用户</span>
          <User size={16} className="ml-auto text-white/30" />
        </button>
      </div>
    </div>
  )
}
