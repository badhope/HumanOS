import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Eye, Heart, Skull, Crown, Users, Info } from 'lucide-react'
import { TricolorBanner } from './RevolutionTheme'

interface NetworkNode {
  id: string
  name: string
  portrait: string
  faction: string
  x: number
  y: number
  connections: number
}

interface NetworkEdge {
  from: string
  to: string
  type: 'alliance' | 'rival' | 'neutral' | 'lover' | 'enemy'
  strength: number
}

interface NetworkGraphProps {
  nodes: NetworkNode[]
  edges: NetworkEdge[]
  onNodeClick: (nodeId: string) => void
  selectedNode?: string
}

export function NetworkGraph({
  nodes,
  edges,
  onNodeClick,
  selectedNode,
}: NetworkGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [highlightFilter, setHighlightFilter] = useState<'all' | 'alliance' | 'enemy'>('all')

  const factionColors: Record<string, string> = {
    jacobin: '#CE1126',
    girondin: '#002654',
    monarchy: '#D4AF37',
    neutral: '#4A5568',
    cordelier: '#FF4500',
  }

  const edgeStyles = {
    alliance: { color: '#10B981', width: 3, dash: '' },
    rival: { color: '#F59E0B', width: 2, dash: '5,5' },
    neutral: { color: '#4A5568', width: 1, dash: '2,2' },
    lover: { color: '#EC4899', width: 3, dash: '' },
    enemy: { color: '#EF4444', width: 4, dash: '' },
  }

  const visibleEdges = useMemo(() => {
    if (highlightFilter === 'all') return edges
    return edges.filter(e => e.type === highlightFilter)
  }, [edges, highlightFilter])

  return (
    <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-600">
      <TricolorBanner
        title="人际网络图谱"
        subtitle="12位历史人物的社会关系"
        icon={<Users size={24} />}
      />

      <div className="p-4">
        <div className="flex gap-2 mb-4">
          {(['all', 'alliance', 'enemy'] as const).map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                highlightFilter === filter
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              onClick={() => setHighlightFilter(filter)}
            >
              {filter === 'all' && '全部关系'}
              {filter === 'alliance' && '🤝 同盟'}
              {filter === 'enemy' && '💀 仇敌'}
            </button>
          ))}
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4 relative" style={{ height: 420 }}>
          <svg width="100%" height="100%" viewBox="0 0 600 400">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {visibleEdges.map((edge, idx) => {
              const fromNode = nodes.find(n => n.id === edge.from)
              const toNode = nodes.find(n => n.id === edge.to)
              if (!fromNode || !toNode) return null

              const style = edgeStyles[edge.type]
              const isHighlighted = selectedNode && (edge.from === selectedNode || edge.to === selectedNode)

              return (
                <line
                  key={idx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={style.color}
                  strokeWidth={isHighlighted ? style.width + 2 : style.width}
                  strokeDasharray={style.dash}
                  opacity={isHighlighted ? 1 : 0.6}
                  filter={isHighlighted ? 'url(#glow)' : ''}
                />
              )
            })}

            {nodes.map((node) => {
              const isSelected = selectedNode === node.id
              const isHovered = hoveredNode === node.id
              const scale = isSelected || isHovered ? 1.3 : 1

              return (
                <g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={28 * scale}
                    fill={factionColors[node.faction] || factionColors.neutral}
                    stroke={isSelected ? '#D4AF37' : '#1A1A1A'}
                    strokeWidth={isSelected ? 4 : 2}
                    style={{ cursor: 'pointer', filter: isSelected ? 'url(#glow)' : '' }}
                    onClick={() => onNodeClick(node.id)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    whileHover={{ scale: 1.1 }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fontSize="24"
                    style={{ pointerEvents: 'none' }}
                  >
                    {node.portrait}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 48}
                    textAnchor="middle"
                    fontSize="10"
                    fill={isSelected || isHovered ? '#D4AF37' : '#A0AEC0'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    style={{ pointerEvents: 'none' }}
                  >
                    {node.name}
                  </text>
                </g>
              )
            })}
          </svg>

          {hoveredNode && (
            <div className="absolute top-4 right-4 bg-slate-800 rounded-lg p-3 w-48 border border-amber-500/50">
              {(() => {
                const node = nodes.find(n => n.id === hoveredNode)
                if (!node) return null
                const nodeEdges = edges.filter(e => e.from === hoveredNode || e.to === hoveredNode)
                const allies = nodeEdges.filter(e => e.type === 'alliance').length
                const enemies = nodeEdges.filter(e => e.type === 'enemy').length
                return (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{node.portrait}</span>
                      <span className="text-white font-bold">{node.name}</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="text-emerald-400">🤝 同盟: {allies} 人</div>
                      <div className="text-red-400">💀 仇敌: {enemies} 人</div>
                      <div className="text-slate-400">🔗 连接: {node.connections} 条</div>
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-emerald-500 rounded" />
            <span className="text-sm text-emerald-400">同盟</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-amber-500 rounded" style={{ borderStyle: 'dashed' }} />
            <span className="text-sm text-amber-400">竞争</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-red-500 rounded" />
            <span className="text-sm text-red-400">死敌</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-pink-500 rounded" />
            <span className="text-sm text-pink-400">情人</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const NETWORK_NODES: NetworkNode[] = [
  { id: 'robespierre', name: '罗伯斯庇尔', portrait: '👨‍⚖️', faction: 'jacobin', x: 300, y: 80, connections: 11 },
  { id: 'danton', name: '丹东', portrait: '🎤', faction: 'cordelier', x: 150, y: 120, connections: 8 },
  { id: 'marat', name: '马拉', portrait: '📰', faction: 'jacobin', x: 450, y: 120, connections: 6 },
  { id: 'louis_xvi', name: '路易十六', portrait: '👑', faction: 'monarchy', x: 300, y: 340, connections: 5 },
  { id: 'marie_antoinette', name: '玛丽王后', portrait: '👸', faction: 'monarchy', x: 400, y: 360, connections: 4 },
  { id: 'brissot', name: '布里索', portrait: '📜', faction: 'girondin', x: 100, y: 200, connections: 7 },
  { id: 'vergniaud', name: '韦尼奥', portrait: '⚖️', faction: 'girondin', x: 200, y: 260, connections: 5 },
  { id: 'hebert', name: '埃贝尔', portrait: '🔥', faction: 'cordelier', x: 500, y: 200, connections: 4 },
  { id: 'saint_just', name: '圣茹斯特', portrait: '⚔️', faction: 'jacobin', x: 380, y: 180, connections: 3 },
  { id: 'couthon', name: '库东', portrait: '♿', faction: 'jacobin', x: 220, y: 180, connections: 3 },
  { id: 'philippe', name: '菲利普', portrait: '🗡️', faction: 'monarchy', x: 150, y: 340, connections: 4 },
  { id: 'talleyrand', name: '塔列朗', portrait: '🦊', faction: 'neutral', x: 520, y: 280, connections: 10 },
]

export const NETWORK_EDGES: NetworkEdge[] = [
  { from: 'robespierre', to: 'danton', type: 'enemy', strength: 0.95 },
  { from: 'robespierre', to: 'marat', type: 'alliance', strength: 0.8 },
  { from: 'robespierre', to: 'saint_just', type: 'alliance', strength: 0.95 },
  { from: 'robespierre', to: 'couthon', type: 'alliance', strength: 0.9 },
  { from: 'robespierre', to: 'brissot', type: 'enemy', strength: 0.9 },
  { from: 'robespierre', to: 'louis_xvi', type: 'enemy', strength: 1.0 },
  { from: 'robespierre', to: 'talleyrand', type: 'rival', strength: 0.6 },
  { from: 'danton', to: 'marat', type: 'rival', strength: 0.5 },
  { from: 'danton', to: 'brissot', type: 'rival', strength: 0.4 },
  { from: 'danton', to: 'hebert', type: 'enemy', strength: 0.7 },
  { from: 'brissot', to: 'vergniaud', type: 'alliance', strength: 0.9 },
  { from: 'brissot', to: 'louis_xvi', type: 'enemy', strength: 0.7 },
  { from: 'louis_xvi', to: 'marie_antoinette', type: 'lover', strength: 0.9 },
  { from: 'louis_xvi', to: 'philippe', type: 'enemy', strength: 0.8 },
  { from: 'marie_antoinette', to: 'talleyrand', type: 'rival', strength: 0.5 },
  { from: 'hebert', to: 'marat', type: 'alliance', strength: 0.7 },
  { from: 'talleyrand', to: 'fouche', type: 'alliance', strength: 0.85 },
]
