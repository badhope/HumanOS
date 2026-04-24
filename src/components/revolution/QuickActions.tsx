import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare,
  Users,
  Vote,
  Scroll,
  Zap,
  Eye,
  BarChart3,
  Crown,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Bell,
  Clock,
  Trophy,
  Target,
} from 'lucide-react'

interface QuickAction {
  id: string
  name: string
  icon: React.ReactNode
  action: () => void
  hotkey?: string
  enabled: boolean
  notification?: number
  category: 'social' | 'political' | 'information' | 'special'
}

interface QuickActionsProps {
  onNavigate: (view: string) => void
  onStartDialogue: (npcId: string) => void
  currentNpcs: Array<{ id: string; name: string; portrait: string }>
}

export function QuickActions({ onNavigate, onStartDialogue, currentNpcs }: QuickActionsProps) {
  const [expanded, setExpanded] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const quickActions: QuickAction[] = [
    {
      id: 'quick-dashboard',
      name: '国家概览',
      icon: <BarChart3 size={18} />,
      action: () => onNavigate('dashboard'),
      enabled: true,
      category: 'information',
    },
    {
      id: 'quick-npcs',
      name: '人物列表',
      icon: <Users size={18} />,
      action: () => onNavigate('characters'),
      enabled: true,
      notification: 3,
      category: 'social',
    },
    {
      id: 'quick-reputation',
      name: '声望矩阵',
      icon: <Crown size={18} />,
      action: () => onNavigate('reputation'),
      enabled: true,
      category: 'political',
    },
    {
      id: 'quick-soul',
      name: '灵魂状态',
      icon: <Sparkles size={18} />,
      action: () => onNavigate('soul'),
      enabled: true,
      category: 'special',
    },
    {
      id: 'quick-quests',
      name: '任务追踪',
      icon: <Target size={18} />,
      action: () => onNavigate('quests'),
      enabled: true,
      notification: 2,
      category: 'information',
    },
    {
      id: 'quick-achievements',
      name: '成就殿堂',
      icon: <Trophy size={18} />,
      action: () => onNavigate('achievements'),
      enabled: true,
      category: 'special',
    },
    {
      id: 'quick-decisions',
      name: '决策时空',
      icon: <Clock size={18} />,
      action: () => onNavigate('decisions'),
      enabled: true,
      category: 'information',
    },
    {
      id: 'quick-vote',
      name: '议会投票',
      icon: <Vote size={18} />,
      action: () => alert('即将召开紧急议会会议...'),
      enabled: true,
      notification: 1,
      category: 'political',
    },
    {
      id: 'quick-decree',
      name: '颁布法令',
      icon: <Scroll size={18} />,
      action: () => alert('选择要颁布的法令...'),
      enabled: true,
      category: 'political',
    },
    {
      id: 'quick-intrigue',
      name: '情报网络',
      icon: <Eye size={18} />,
      action: () => alert('激活秘密情报网络...'),
      enabled: true,
      category: 'political',
    },
    {
      id: 'quick-events',
      name: '事件日志',
      icon: <Bell size={18} />,
      action: () => onNavigate('events'),
      enabled: true,
      category: 'information',
    },
  ]

  const categories = [
    { id: 'social', name: '社交', icon: <Users size={14} /> },
    { id: 'political', name: '政治', icon: <Crown size={14} /> },
    { id: 'information', name: '信息', icon: <Eye size={14} /> },
    { id: 'special', name: '特殊', icon: <Sparkles size={14} /> },
  ]

  const filteredActions = activeCategory
    ? quickActions.filter(a => a.category === activeCategory)
    : quickActions

  const importantNpcs = currentNpcs.slice(0, 4)

  return (
    <motion.div
      initial={false}
      animate={{ width: expanded ? 200 : 64 }}
      className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-lg border-l border-slate-700 flex-shrink-0 relative"
    >
      <button
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg z-10"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="p-3 h-full flex flex-col">
        {expanded && (
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white mb-3 px-2">快捷操作</h3>
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 transition-all ${
                    activeCategory === cat.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-1 flex-1">
          {expanded ? (
            filteredActions.map((action) => (
              <button
                key={action.id}
                className={`
                  w-full px-3 py-2.5 rounded-lg text-left flex items-center gap-3 transition-all
                  ${action.enabled
                    ? 'hover:bg-slate-700/50 text-white'
                    : 'opacity-50 cursor-not-allowed text-slate-500'
                  }
                `}
                onClick={action.enabled ? action.action : undefined}
              >
                <span className="relative">
                  {action.icon}
                  {action.notification && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">
                      {action.notification}
                    </span>
                  )}
                </span>
                <span className="text-sm flex-1">{action.name}</span>
              </button>
            ))
          ) : (
            quickActions.slice(0, 8).map((action) => (
              <button
                key={action.id}
                className={`
                  w-full p-2.5 rounded-lg flex items-center justify-center transition-all relative
                  ${action.enabled
                    ? 'hover:bg-slate-700/50 text-white'
                    : 'opacity-50 cursor-not-allowed text-slate-500'
                  }
                `}
                onClick={action.enabled ? action.action : undefined}
                title={action.name}
              >
                {action.icon}
                {action.notification && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </button>
            ))
          )}
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <h4 className="text-xs text-slate-400 mb-2 px-1">快速对话</h4>
            <div className="space-y-1">
              {importantNpcs.map((npc) => (
                <button
                  key={npc.id}
                  className="w-full px-3 py-2 rounded-lg hover:bg-slate-700/50 flex items-center gap-2 transition-colors"
                  onClick={() => onStartDialogue(npc.id)}
                >
                  <span className="text-lg">{npc.portrait}</span>
                  <span className="text-sm text-white truncate">{npc.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="bg-gradient-to-r from-red-900/30 via-slate-700/30 to-blue-900/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="text-amber-400" size={16} />
                <span className="text-xs font-bold text-amber-400">革命能量</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-2">
                <div className="h-full w-3/4 bg-gradient-to-r from-amber-500 to-red-500 rounded-full" />
              </div>
              <p className="text-[10px] text-slate-400">
                距离下一个关键事件还有 3 回合
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
