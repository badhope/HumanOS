import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, RotateCcw, GitBranch, AlertTriangle, Crown } from 'lucide-react'
import { TricolorBanner } from './RevolutionTheme'

interface TimelineNode {
  id: string
  title: string
  description: string
  turn: number
  worldLineId: string
  divergence: number
  isMain: boolean
  children: string[]
  choiceMade?: string
}

interface TimelineTreeProps {
  nodes: TimelineNode[]
  currentNodeId: string
  onRewind: (nodeId: string) => void
  onSwitchTimeline: (worldLineId: string) => void
}

export function TimelineTree({
  nodes,
  currentNodeId,
  onRewind,
  onSwitchTimeline,
}: TimelineTreeProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const maxDivergence = Math.max(...nodes.map(n => n.divergence), 0.01)

  const getDivergenceColor = (divergence: number) => {
    if (divergence < 0.1) return '#10B981'
    if (divergence < 0.3) return '#F59E0B'
    if (divergence < 0.6) return '#F97316'
    return '#EF4444'
  }

  const getDivergenceLabel = (divergence: number) => {
    if (divergence < 0.1) return '✅ 正史'
    if (divergence < 0.3) return '⚠️ 小幅偏离'
    if (divergence < 0.6) return '🔥 重大分歧'
    return '💀 世界线收束'
  }

  const layers: TimelineNode[][] = []
  const maxTurn = Math.max(...nodes.map(n => n.turn))

  for (let t = 0; t <= maxTurn; t++) {
    const turnNodes = nodes.filter(n => n.turn === t)
    if (turnNodes.length > 0) layers.push(turnNodes)
  }

  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null

  return (
    <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-600">
      <TricolorBanner
        title="世界线分支树"
        subtitle="你的每一个选择都在创造新的平行宇宙"
        icon={<GitBranch size={24} />}
      />

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="text-white">
              当前世界线偏离度:
              <span
                className="ml-2 px-3 py-1 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: getDivergenceColor(nodes.find(n => n.id === currentNodeId)?.divergence || 0),
                  color: 'white',
                }}
              >
                {((nodes.find(n => n.id === currentNodeId)?.divergence || 0) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="text-slate-400 text-sm">
            共 {nodes.length} 个时间节点 | {new Set(nodes.map(n => n.worldLineId)).size} 条世界线
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 overflow-x-auto">
          <div className="min-w-[600px]">
            {layers.map((layer, layerIdx) => (
              <div key={layerIdx} className="flex mb-2">
                <div className="w-16 text-slate-500 text-sm flex items-center">
                  回合 {layer[0].turn}
                </div>
                <div className="flex-1 flex gap-2 justify-center">
                  {layer.map((node) => {
                    const isCurrent = node.id === currentNodeId
                    const isSelected = node.id === selectedNode
                    const canRewind = node.turn < (nodes.find(n => n.id === currentNodeId)?.turn || 0) - 1

                    return (
                      <motion.div
                        key={node.id}
                        className={`
                          relative p-3 rounded-lg cursor-pointer min-w-[140px] max-w-[160px]
                          transition-all duration-300
                          ${isCurrent ? 'bg-amber-600 ring-2 ring-amber-400 scale-105' : ''}
                          ${isSelected && !isCurrent ? 'bg-slate-600 ring-2 ring-blue-400' : ''}
                          ${!isCurrent && !isSelected ? 'bg-slate-700/50 hover:bg-slate-600/50' : ''}
                          ${node.divergence > 0.5 ? 'border-l-4 border-red-500' : ''}
                          ${node.isMain ? 'border-l-4 border-emerald-500' : ''}
                        `}
                        onClick={() => setSelectedNode(isSelected ? null : node.id)}
                        whileHover={{ scale: 1.03 }}
                      >
                        <div className="text-xs text-white font-medium truncate">
                          {node.divergence > 0.5 && <AlertTriangle size={12} className="inline mr-1 text-red-400" />}
                          {node.title}
                        </div>
                        {isCurrent && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
                        )}
                        <div className="text-[10px] text-slate-400 mt-1">
                          {(node.divergence * 100).toFixed(0)}% 偏离
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedNodeData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-slate-700/40 rounded-xl p-4"
          >
            {(() => {
              const currentTurn = nodes.find(n => n.id === currentNodeId)?.turn || 0
              const canRewind = selectedNodeData.turn < currentTurn - 1
              
              return (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white font-bold text-lg flex items-center gap-2">
                        {selectedNodeData.title}
                        {selectedNodeData.isMain && (
                          <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded">正史</span>
                        )}
                        {selectedNodeData.divergence > 0.6 && (
                          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">重大分歧</span>
                        )}
                      </h4>
                      <p className="text-slate-300 mt-1">{selectedNodeData.description}</p>
                      {selectedNodeData.choiceMade && (
                        <p className="text-amber-400 text-sm mt-2">
                          🎯 关键抉择: {selectedNodeData.choiceMade}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">世界线偏离</div>
                      <div className="text-2xl font-bold" style={{ color: getDivergenceColor(selectedNodeData.divergence) }}>
                        {(selectedNodeData.divergence * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs" style={{ color: getDivergenceColor(selectedNodeData.divergence) }}>
                        {getDivergenceLabel(selectedNodeData.divergence)}
                      </div>
                    </div>
                  </div>

                  {selectedNodeData.id !== currentNodeId && (
                    <div className="flex gap-3 mt-4">
                      <button
                        className="flex-1 py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        onClick={() => onSwitchTimeline(selectedNodeData.worldLineId)}
                      >
                        <GitBranch size={18} />
                        切换至此世界线
                      </button>
                      <button
                        className="flex-1 py-3 bg-gradient-to-r from-amber-700 to-amber-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => onRewind(selectedNodeData.id)}
                        disabled={!canRewind}
                      >
                        <RotateCcw size={18} />
                        读档回此处
                      </button>
                    </div>
                  )}
                </>
              )
            })()}
          </motion.div>
        )}

        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500" />
            <span className="text-sm text-slate-400">正史世界线</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500" />
            <span className="text-sm text-slate-400">当前位置</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500" />
            <span className="text-sm text-slate-400">重大分歧点</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-600" />
            <span className="text-sm text-slate-400">可回档节点</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DEMO_TIMELINE_NODES: TimelineNode[] = [
  { id: 't0', title: '游戏开始', description: '你从沉睡中醒来，1789年的法国正处在变革的边缘', turn: 0, worldLineId: 'alpha', divergence: 0, isMain: true, children: ['t1', 't2'] },
  { id: 't1', title: '网球场宣誓', description: '第三等级代表被拒之门外，历史性的抉择', turn: 5, worldLineId: 'alpha', divergence: 0, isMain: true, children: ['t3'], choiceMade: '加入宣誓' },
  { id: 't2', title: '背叛人民', description: '你选择与宫廷合作，历史走向不同道路', turn: 5, worldLineId: 'beta', divergence: 0.3, isMain: false, children: ['t4'], choiceMade: '效忠国王' },
  { id: 't3', title: '攻占巴士底狱', description: '人民的怒火点燃了革命的烽火', turn: 10, worldLineId: 'alpha', divergence: 0, isMain: true, children: ['t5'] },
  { id: 't4', title: '解散议会', description: '国王下令逮捕反对派，内战一触即发', turn: 10, worldLineId: 'beta', divergence: 0.5, isMain: false, children: [] },
  { id: 't5', title: '国王审判', description: '路易十六被送上审判台，历史的十字路口', turn: 25, worldLineId: 'alpha', divergence: 0, isMain: true, children: ['t6', 't7', 't8'] },
  { id: 't6', title: '处决国王', description: '路易十六被送上断头台，共和国诞生', turn: 28, worldLineId: 'alpha', divergence: 0, isMain: true, children: [], choiceMade: '投票赞成处决' },
  { id: 't7', title: '流放国王', description: '君主立宪派掌权，革命转向温和', turn: 28, worldLineId: 'gamma', divergence: 0.6, isMain: false, children: [], choiceMade: '投票赞成流放' },
  { id: 't8', title: '营救国王', description: '保王党发动政变，波旁王朝复辟', turn: 28, worldLineId: 'omega', divergence: 1.0, isMain: false, children: [], choiceMade: '暗中营救国王' },
]
