import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Check, Clock, ZoomIn, ZoomOut, Maximize2, TrendingUp, Shield } from 'lucide-react'
import { USA_FOCUS_TREE, FocusNode } from '../../data/game/usa-focus-tree'
import { default as GameTooltip } from '../ui/GameTooltip'

const CATEGORY_COLORS: Record<string, string> = {
  populist: '#E53E3E',
  establishment: '#3182CE',
  militarist: '#DD6B20',
  progressive: '#38A169',
}

const CATEGORY_NAMES: Record<string, string> = {
  populist: '🦅 民粹主义',
  establishment: '🎩 建制派',
  militarist: '⚔️ 军国主义',
  progressive: '✊ 进步主义',
}

interface FocusTreePanelProps {
  state: any
  onStartFocus: (focusId: string) => void
}

export default function FocusTreePanel({ state, onStartFocus }: FocusTreePanelProps) {
  const [selectedNode, setSelectedNode] = useState<FocusNode | null>(null)
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 0.85 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const getNodeStatus = (node: FocusNode) => {
    if (state.focus.completed.includes(node.id)) return 'completed'
    if (state.focus.current === node.id) return 'active'
    if (state.focus.blocked.includes(node.id)) return 'blocked'
    if (state.focus.available.includes(node.id)) return 'available'
    return 'locked'
  }

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.min(Math.max(viewport.zoom * delta, 0.3), 2.0)
    setViewport(v => ({ ...v, zoom: newZoom }))
  }, [viewport.zoom])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0 && !(e.target as HTMLElement).closest('button')) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y })
    }
  }, [viewport])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setViewport(v => ({
        ...v,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      }))
    }
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const resetViewport = () => {
    setViewport({ x: 0, y: 0, zoom: 0.85 })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDragging(false)
      }
    }
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleMouseUp])

  const renderNode = (node: FocusNode) => {
    const status = getNodeStatus(node)
    const color = CATEGORY_COLORS[node.category]

    return (
      <GameTooltip
          position="auto"
          content={
            <div className="space-y-2 min-w-[190px]">
              <div className="font-bold text-white text-sm flex items-center gap-2" style={{ color: color }}>
                <span>{node.icon}</span>
                {node.name}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">{node.description}</div>
              
              <div className="border-t border-slate-700/50 pt-2">
                <div className="text-[10px] text-slate-500 mb-1">效果</div>
                <div className="space-y-0.5">
                  {node.effects.approval && (
                    <div className="text-[10px] text-green-400">支持率 +{node.effects.approval}%</div>
                  )}
                  {node.effects.stability && (
                    <div className="text-[10px] text-green-400">稳定度 +{node.effects.stability}%</div>
                  )}
                  {node.effects.politicalCapital && (
                    <div className="text-[10px] text-amber-400">政治点 +{node.effects.politicalCapital}</div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-2 text-[10px] text-slate-400">
                ⏱️ {node.duration} 天
              </div>
            </div>
          }
        >
        <motion.div
          key={node.id}
          onClick={() => setSelectedNode(node)}
          className={`
            absolute w-14 h-14 rounded-lg flex items-center justify-center text-2xl cursor-pointer
            transition-all duration-200 border-2
            ${status === 'completed' ? 'bg-green-600/80 border-green-400' : ''}
            ${status === 'active' ? 'bg-yellow-500/80 border-yellow-400 animate-pulse' : ''}
            ${status === 'available' ? 'bg-blue-600/60 border-blue-400 hover:bg-blue-500/60' : ''}
            ${status === 'locked' ? 'bg-slate-700/60 border-slate-600 opacity-50' : ''}
            ${status === 'blocked' ? 'bg-red-900/40 border-red-800 opacity-30' : ''}
          `}
          style={{
            left: `${50 + node.x * 100}px`,
            top: `${30 + node.y * 90}px`,
            boxShadow: status === 'active' ? `0 0 20px ${color}` : 'none',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {status === 'completed' && <Check className="w-6 h-6 text-white" />}
          {status === 'blocked' && <Lock className="w-5 h-5 text-red-400" />}
          {status === 'active' && (
            <div className="flex flex-col items-center">
              <span className="text-lg">{node.icon}</span>
              <span className="text-[8px] text-white font-bold">
                {state.focus.progress}/{node.duration}
              </span>
            </div>
          )}
          {(status === 'available' || status === 'locked') && <span>{node.icon}</span>}
         </motion.div>
       </GameTooltip>
    )
  }

  const renderConnections = () => {
    return USA_FOCUS_TREE.map(node =>
      node.requires.map(reqId => {
        const fromNode = USA_FOCUS_TREE.find(f => f.id === reqId)
        if (!fromNode) return null
        
        const x1 = 50 + fromNode.x * 100 + 28
        const y1 = 30 + fromNode.y * 90 + 56
        const x2 = 50 + node.x * 100 + 28
        const y2 = 30 + node.y * 90 - 2

        const status = getNodeStatus(node)
        const fromStatus = getNodeStatus(fromNode)
        const isComplete = status === 'completed' || fromStatus === 'completed'
        
        return (
          <line
            key={`${reqId}-${node.id}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isComplete ? '#48BB78' : '#4A5568'}
            strokeWidth="3"
            strokeDasharray={status === 'locked' ? '5,5' : 'none'}
          />
        )
      })
    )
  }

  return (
    <div className="h-full flex">
      <div
        ref={containerRef}
        className={`flex-1 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute top-3 left-4 flex gap-4 z-5 pointer-events-none">
          {Object.entries(CATEGORY_NAMES).map(([cat, name]) => (
            <div key={cat} className="flex items-center gap-1 text-xs pointer-events-auto">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: CATEGORY_COLORS[cat] }}
              />
              <span className="text-slate-400">{name}</span>
            </div>
          ))}
        </div>



        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <button
            onClick={() => setViewport(v => ({ ...v, zoom: Math.min(v.zoom * 1.2, 2.0) }))}
            className="w-8 h-8 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center text-white transition-colors border border-white/10"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport(v => ({ ...v, zoom: Math.max(v.zoom * 0.8, 0.3) }))}
            className="w-8 h-8 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center text-white transition-colors border border-white/10"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetViewport}
            className="w-8 h-8 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center text-white transition-colors border border-white/10"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <div className="px-2 bg-black/60 rounded-lg flex items-center text-xs text-slate-400 border border-white/10">
            {Math.round(viewport.zoom * 100)}%
          </div>
        </div>

        <div
          style={{
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <svg className="absolute pointer-events-none" style={{ width: '1500px', height: '700px' }}>
            {renderConnections()}
          </svg>

          <div className="relative" style={{ width: '1500px', height: '700px' }}>
            {USA_FOCUS_TREE.map(renderNode)}
          </div>
        </div>
      </div>

      <div className="w-72 bg-black/60 border-l border-white/10 p-4">
        {selectedNode ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: CATEGORY_COLORS[selectedNode.category] + '40' }}
              >
                {selectedNode.icon}
              </div>
              <div>
                <h3 className="font-bold text-white">{selectedNode.name}</h3>
                <span className="text-xs" style={{ color: CATEGORY_COLORS[selectedNode.category] }}>
                  {CATEGORY_NAMES[selectedNode.category]}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedNode.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              <span>{selectedNode.duration} 天</span>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase">完成效果</div>
              {selectedNode.effects.approval && (
                <div className="text-sm text-green-400">支持率: +{selectedNode.effects.approval}%</div>
              )}
              {selectedNode.effects.stability && (
                <div className={`text-sm ${selectedNode.effects.stability > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  稳定度: {selectedNode.effects.stability > 0 ? '+' : ''}{selectedNode.effects.stability}%
                </div>
              )}
              {selectedNode.effects.politicalCapital && (
                <div className="text-sm text-blue-400">政治点数: +{selectedNode.effects.politicalCapital}</div>
              )}
            </div>

            {Object.keys(selectedNode.groupOpinion).length > 0 && (
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase">派系态度变化</div>
                {Object.entries(selectedNode.groupOpinion).map(([gid, value]) => (
                  <div key={gid} className={`text-sm ${(value as number) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {gid.replace('_', ' ')}: {(value as number) > 0 ? '+' : ''}{value}
                  </div>
                ))}
              </div>
            )}

            {getNodeStatus(selectedNode) === 'available' && !state.focus.current && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartFocus(selectedNode.id)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors mt-4"
              >
                🚀 启动国策
              </motion.button>
            )}
            {getNodeStatus(selectedNode) === 'available' && state.focus.current && (
              <div className="mt-4 p-3 bg-slate-500/20 border border-slate-500/50 rounded-lg text-center">
                <div className="text-sm text-slate-400">请先完成当前国策</div>
              </div>
            )}

            {getNodeStatus(selectedNode) === 'active' && (
              <div className="mt-4 space-y-2">
                <div className="p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                  <div className="text-sm text-yellow-400 font-medium">进行中...</div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all"
                      style={{ width: `${(state.focus.progress / selectedNode.duration) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {state.focus.progress} / {selectedNode.duration} 天 · 还需 {selectedNode.duration - state.focus.progress} 天
                  </div>
                </div>
                <button
                  onClick={() => onStartFocus('__cancel__')}
                  className="w-full py-2 bg-red-600/30 hover:bg-red-600/50 border border-red-500/50 text-red-300 rounded-lg text-sm transition-colors"
                >
                  ✕ 取消当前国策
                </button>
              </div>
            )}

            {getNodeStatus(selectedNode) === 'completed' && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                <div className="text-sm text-green-400 font-medium flex items-center gap-2">
                  <Check className="w-4 h-4" /> 已完成
                </div>
              </div>
            )}

            {getNodeStatus(selectedNode) === 'blocked' && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <div className="text-sm text-red-400 font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" /> 互斥路线已选择
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-sm text-center">点击任意国策节点查看详情</p>
            <p className="text-xs mt-2 text-slate-600">选择一条路线，永不回头！</p>
          </div>
        )}
      </div>
    </div>
  )
}
