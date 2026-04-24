import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Coins, Users, Building2, BarChart3, Globe, Shield,
  ChevronRight, ChevronLeft, Bell, Settings, Play, Pause,
  Home, X, Volume2, VolumeX, RefreshCw, Save, TrendingUp, TrendingDown
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import RightPanelWidgets from '../game/RightPanelWidgets'
import { default as GameTooltip } from '../ui/GameTooltip'

interface GameLayoutProps {
  children: React.ReactNode
  menuContent?: React.ReactNode
  onCategoryChange?: (id: string | null) => void
  date: { year: number; month: number; day: number }
  day: number
  gameState?: any
  resources: {
    treasury: number
    politicalCapital: number
    stability: number
    approval: number
  }
  isPaused: boolean
  onTogglePause: () => void
  speed: number
  onChangeSpeed: () => void
}

const HOI4_CATEGORIES = [
  { id: 'politics', name: '政治', icon: Shield, color: '#9C27B0' },
  { id: 'economy', name: '经济', icon: Coins, color: '#2196F3' },
  { id: 'diplomacy', name: '外交', icon: Globe, color: '#4CAF50' },
  { id: 'military', name: '军事', icon: Shield, color: '#F44336' },
  { id: 'research', name: '科技', icon: BarChart3, color: '#FF9800' },
  { id: 'society', name: '社会', icon: Users, color: '#795548' },
]

export default function Hoi4GameLayout({ 
  children, 
  menuContent,
  onCategoryChange,
  date, 
  day, 
  gameState,
  resources,
  isPaused,
  onTogglePause,
  speed,
  onChangeSpeed,
}: GameLayoutProps) {
  const navigate = useNavigate()
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [rightPanelVisible, setRightPanelVisible] = useState(true)

  const openCategory = useCallback((id: string) => {
    const newCat = activeCategory === id ? null : id
    setActiveCategory(newCat)
    setSidebarExpanded(true)
    onCategoryChange?.(newCat)
  }, [activeCategory, onCategoryChange])

  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col overflow-hidden">
      
      {/* ========================================
          TOP BAR - 40px 钢铁雄心式
          ======================================== */}
      <div className="h-10 bg-black/80 border-b border-white/5 flex items-center px-4 shrink-0">
        
        {/* 左侧: 日期 + 速度控制 */}
        <div className="flex items-center gap-4">
          <div className="text-sm font-mono text-slate-300 w-28">
            {date.year}年{date.month}月{date.day}日
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={onTogglePause}
              className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={onChangeSpeed}
              className="px-2 h-7 rounded bg-white/10 hover:bg-white/20 font-mono text-sm transition-colors"
            >
              {speed}×
            </button>
          </div>
        </div>

        {/* 中间: 核心资源条 - 5个数字 */}
        <div className="flex-1 flex justify-center items-center gap-6">
          <ResourceBadge icon={Coins} value={`$${Math.round(resources.treasury)}B`} label="国库" />
          <div className="w-px h-5 bg-white/10" />
          <ResourceBadge icon={Shield} value={resources.politicalCapital} label="政治点" />
          <div className="w-px h-5 bg-white/10" />
          <ResourceBadge icon={Shield} value={`${resources.stability}%`} label="稳定" warn={resources.stability < 40} />
          <div className="w-px h-5 bg-white/10" />
          <ResourceBadge icon={Users} value={`${resources.approval}%`} label="支持" warn={resources.approval < 30} />
        </div>

        {/* 右侧: 返回 + 通知 + 设置 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/simulated-world')}
            className="w-7 h-7 rounded bg-white/10 hover:bg-rose-500/30 flex items-center justify-center group"
            title="返回选择"
          >
            <Home className="w-4 h-4 group-hover:text-rose-400" />
          </button>
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowSettings(false) }}
            className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">3</span>
          </button>
          <button 
            onClick={() => { setShowSettings(!showSettings); setShowNotifications(false) }}
            className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Popup */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 right-4 z-50 bg-black/95 backdrop-blur rounded-xl p-4 border border-white/10 w-64 shadow-2xl"
          >
            <div className="font-bold mb-3 text-sm">⚙️ 游戏设置</div>
            <div className="space-y-3">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="text-sm">音效</span>
                </div>
                <div className={`w-10 h-5 rounded-full transition-colors ${soundEnabled ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </button>
              <button 
                onClick={() => setAutoSave(!autoSave)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  <span className="text-sm">自动存档</span>
                </div>
                <div className={`w-10 h-5 rounded-full transition-colors ${autoSave ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${autoSave ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </button>
              <hr className="border-white/10" />
              <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors text-left">
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">重新开始</span>
              </button>
              <button 
                onClick={() => navigate('/simulated-world')}
                className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-rose-500/20 transition-colors text-left text-rose-400"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">返回主菜单</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Popup */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 right-20 z-50 bg-black/95 backdrop-blur rounded-xl p-4 border border-white/10 w-80 shadow-2xl max-h-96 overflow-auto"
          >
            <div className="font-bold mb-3 text-sm">🔔 最近通知</div>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <div className="text-xs font-medium text-amber-400">稳定度警告</div>
                <div className="text-xs text-slate-400 mt-1">稳定度低于 40%，有政变风险</div>
                <div className="text-[10px] text-slate-500 mt-1">2天前</div>
              </div>
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30">
                <div className="text-xs font-medium text-rose-400">媒体攻击</div>
                <div className="text-xs text-slate-400 mt-1">主流媒体正在发布负面报道</div>
                <div className="text-[10px] text-slate-500 mt-1">5天前</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-xs font-medium text-emerald-400">研究完成</div>
                <div className="text-xs text-slate-400 mt-1">5G 技术研究完成</div>
                <div className="text-[10px] text-slate-500 mt-1">1周前</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {(showSettings || showNotifications) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => { setShowSettings(false); setShowNotifications(false) }}
        />
      )}

      {/* ========================================
          MAIN GAME AREA
          ======================================== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR - 6 Icons + flyout menu */}
        <div className="flex shrink-0">
          {/* Icon Bar - 50px */}
          <div className="w-12 bg-black/60 border-r border-white/5 flex flex-col items-center py-2 gap-1">
            {HOI4_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => openCategory(cat.id)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all relative group
                  ${activeCategory === cat.id ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                
                {/* Tooltip on hover */}
                <div className="absolute left-14 bg-black/90 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {cat.name}
                </div>
              </button>
            ))}
          </div>

          {/* Expandable Menu Panel - 250px */}
          <AnimatePresence>
            {activeCategory && sidebarExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-black/70 border-r border-white/5 overflow-hidden"
              >
                <div className="w-64 h-full p-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm uppercase tracking-wide">
                      {HOI4_CATEGORIES.find(c => c.id === activeCategory)?.name}
                    </h3>
                    <button 
                      onClick={() => setActiveCategory(null)}
                      className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    {menuContent || '选择左侧功能'}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER - 90% MAP AREA */}
        <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 relative">
          {children}
        </div>

        {/* RIGHT PANEL - 280px Collapsible Widgets */}
        <AnimatePresence>
          {rightPanelVisible && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-black/70 backdrop-blur-sm border-l border-white/5 shrink-0"
            >
              <div className="flex items-center justify-between p-2 border-b border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wide">信息面板</span>
                <button 
                  onClick={() => setRightPanelVisible(false)}
                  className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center"
                  title="收起面板"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <RightPanelWidgets state={gameState} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* BOTTOM ALERT BAR */}
      <div className="h-8 bg-black/60 border-t border-white/5 flex items-center px-4 shrink-0 gap-3">
        <div className="text-xs text-slate-500">警报:</div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs">⚠️ 稳定度偏低</span>
          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">💹 通胀危险</span>
          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">🗳️ 选举倒计时: 295天</span>
        </div>
      </div>
    </div>
  )
}

function ResourceBadge({ 
  icon: Icon, 
  value, 
  label, 
  warn = false,
  critical = false,
  tooltip,
  trend,
}: any) {
  const content = tooltip || (
    <div className="space-y-1">
      <div className="font-bold text-white text-sm">{label}</div>
      <div className="text-xs text-slate-300">当前值: {value}</div>
      {trend && (
        <div className={`text-xs flex items-center gap-1 ${trend > 0 ? 'text-green-400' : trend < 0 ? 'text-red-400' : 'text-slate-400'}`}>
          {trend > 0 ? <TrendingUp className="w-3 h-3" /> : trend < 0 ? <TrendingDown className="w-3 h-3" /> : null}
          {trend > 0 ? '+' : ''}{trend} 今日变化
        </div>
      )}
    </div>
  )

  return (
    <GameTooltip content={content}>
      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-colors cursor-help
        ${warn ? 'bg-amber-500/20 text-amber-400' : ''}
        ${critical ? 'bg-red-500/20 text-red-400' : ''}
        ${!warn && !critical ? 'text-slate-300' : ''}
      `}>
        <Icon className="w-3.5 h-3.5" />
        <span className="text-sm font-mono font-medium">{value}</span>
        <span className="text-[10px] text-slate-500">{label}</span>
      </div>
    </GameTooltip>
  )
}


