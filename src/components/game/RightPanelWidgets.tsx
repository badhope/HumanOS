import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, ChevronRight, X, Clock, Zap, AlertTriangle } from 'lucide-react'

interface RightPanelWidgetsProps {
  state: any
  collapsible?: boolean
}

const WIDGETS = [
  { id: 'focus', name: '进行中国策', icon: '🎯', defaultExpanded: true },
  { id: 'research', name: '研究队列', icon: '🔬', defaultExpanded: true },
  { id: 'events', name: '待处理事件', icon: '📢', defaultExpanded: true },
  { id: 'election', name: '选举倒计时', icon: '🗳️', defaultExpanded: false },
  { id: 'notifications', name: '通知日志', icon: '📋', defaultExpanded: false },
]

export default function RightPanelWidgets({ state }: RightPanelWidgetsProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    WIDGETS.reduce((acc, w) => ({ ...acc, [w.id]: w.defaultExpanded }), {})
  )

  const toggleWidget = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const pendingEvents = state?.randomEvents?.pending?.length || 0

  return (
    <div className="h-full p-2 space-y-2 overflow-y-auto">
      {WIDGETS.map(widget => (
        <div
          key={widget.id}
          className={`bg-black/40 backdrop-blur-sm rounded-lg border overflow-hidden transition-all ${
            widget.id === 'events' && pendingEvents > 0
              ? 'border-red-500/50 animate-pulse'
              : 'border-white/5'
          }`}
        >
          <button
            onClick={() => toggleWidget(widget.id)}
            className="w-full p-2 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{widget.icon}</span>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-300">
                {widget.name}
              </span>
              {widget.id === 'events' && pendingEvents > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full font-bold animate-bounce">
                  {pendingEvents}
                </span>
              )}
            </div>
            {expanded[widget.id] ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          <AnimatePresence>
            {expanded[widget.id] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 pt-0 border-t border-white/5">
                  {widget.id === 'focus' && <FocusWidget />}
                  {widget.id === 'research' && <ResearchWidget />}
                  {widget.id === 'events' && <EventsWidget />}
                  {widget.id === 'election' && <ElectionWidget />}
                  {widget.id === 'notifications' && <NotificationsWidget />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function FocusWidget() {
  const focuses = [
    {
      id: 'consolidate_power',
      name: '巩固权力基础',
      icon: '🏛️',
      progress: 65,
      daysRemaining: 45,
      effects: ['+15% 稳定度', '+10 政治点数'],
    },
  ]

  return (
    <div className="space-y-2">
      {focuses.map(focus => (
        <div key={focus.id} className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
          <div className="flex items-center gap-2">
            <span className="text-lg">{focus.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{focus.name}</div>
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <Clock className="w-3 h-3" />
                剩余 {focus.daysRemaining} 天
              </div>
            </div>
          </div>
          
          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
              style={{ width: `${focus.progress}%` }}
            />
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {focus.effects.map((e, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 bg-white/5 rounded text-[10px] text-emerald-400"
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      ))}
      
      <button className="w-full mt-1 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs text-slate-400 transition-colors">
        + 选择新国策
      </button>
    </div>
  )
}

function ResearchWidget() {
  const research = [
    { id: '5g', name: '5G网络部署', icon: '📡', progress: 68, category: '信息' },
    { id: 'ai', name: '人工智能研究', icon: '🤖', progress: 23, category: '信息' },
    { id: 'quantum', name: '量子计算', icon: '⚛️', progress: 8, category: '科学' },
  ]

  return (
    <div className="space-y-1.5">
      {research.map(r => (
        <div key={r.id} className="p-2 bg-white/5 rounded-lg">
          <div className="flex items-center gap-2">
            <span>{r.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">{r.name}</div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">{r.category}</span>
                <span className="text-[10px] text-amber-400 font-mono">{r.progress}%</span>
              </div>
            </div>
          </div>
          <div className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
              style={{ width: `${r.progress}%` }}
            />
          </div>
        </div>
      ))}
      
      <button className="w-full mt-1 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs text-slate-400 transition-colors">
        + 添加研究项目
      </button>
    </div>
  )
}

function EventsWidget() {
  const events = [
    { id: 'covid', name: '武汉出现不明肺炎', icon: '🦠', urgency: 'low', daysOld: 0 },
    { id: 'trade_war', name: '中美贸易战升级', icon: '💥', urgency: 'medium', daysOld: 12 },
    { id: 'election', name: '民主党初选辩论', icon: '🗣️', urgency: 'high', daysOld: 3 },
  ]

  const urgencyColors = {
    low: 'bg-slate-500/20 border-slate-500/30 text-slate-400',
    medium: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
    high: 'bg-red-500/20 border-red-500/30 text-red-400',
  }

  return (
    <div className="space-y-1.5">
      {events.map(event => (
        <button
          key={event.id}
          className={`w-full p-2 rounded-lg border text-left transition-all hover:scale-[1.01] ${urgencyColors[event.urgency as keyof typeof urgencyColors]}`}
        >
          <div className="flex items-center gap-2">
            <span>{event.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">{event.name}</div>
              <div className="text-[10px] opacity-60">{event.daysOld} 天前</div>
            </div>
            <Zap className="w-3 h-3 opacity-60" />
          </div>
        </button>
      ))}
    </div>
  )
}

function ElectionWidget() {
  const daysRemaining = 653

  return (
    <div className="p-2">
      <div className="text-center">
        <div className="text-3xl font-bold font-mono text-blue-400 mb-1">
          {daysRemaining}
        </div>
        <div className="text-[10px] text-slate-500 uppercase tracking-wide">
          2020大选倒计时（天）
        </div>
      </div>
      
      <div className="mt-3 space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">共和党领先</span>
          <span className="text-red-400">+6%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">摇摆州数量</span>
          <span className="text-amber-400">7个</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">选举人票差距</span>
          <span className="text-red-400">74票</span>
        </div>
      </div>
    </div>
  )
}

function NotificationsWidget() {
  const notifications = [
    { id: 1, text: '美联储宣布加息25个基点', time: '今天' },
    { id: 2, text: '失业率降至3.6%，创50年新低', time: '3天前' },
    { id: 3, text: '国会通过国防授权法案', time: '1周前' },
    { id: 4, text: '墨西哥达成贸易协定', time: '2周前' },
  ]

  return (
    <div className="space-y-1">
      {notifications.map(n => (
        <div key={n.id} className="py-1 px-2 hover:bg-white/5 rounded">
          <div className="text-xs">{n.text}</div>
          <div className="text-[10px] text-slate-500">{n.time}</div>
        </div>
      ))}
    </div>
  )
}
