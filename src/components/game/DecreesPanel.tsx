import { useState } from 'react'
import { TrendingUp, TrendingDown, Clock, Shield } from 'lucide-react'
import { Decree, USA_DECREES } from '../../data/game/usa-interest-groups'
import { DecreesState } from '../../engine/MathematicalEconomyEngine'
import { default as GameTooltip } from '../ui/GameTooltip'

interface DecreesPanelProps {
  decrees: DecreesState
  politicalCapital: number
  onUseDecree: (decreeId: string) => void
}

const CATEGORY_ICONS: Record<string, string> = {
  economic: '💰',
  social: '🏥',
  diplomatic: '🌍',
  military: '⚔️',
}

export default function DecreesPanel({ decrees, politicalCapital, onUseDecree }: DecreesPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredDecrees = selectedCategory
    ? USA_DECREES.filter(d => d.category === selectedCategory)
    : USA_DECREES

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-[10px] text-slate-500 uppercase tracking-wide">
          总统法令 · 紧急权力
        </div>
        <div className="text-xs text-amber-400 font-mono">
          🎯 {Math.round(politicalCapital)} 政治点
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {Object.entries(CATEGORY_ICONS).map(([cat, icon]) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`px-2 py-1 rounded text-xs transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
            }`}
          >
            {icon} {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredDecrees.map(decree => {
          const onCooldown = decrees.cooldowns[decree.id] > 0
          const canAfford = politicalCapital >= decree.cost
          const canActivate = !onCooldown && canAfford

          return (
            <GameTooltip
              key={decree.id}
              position="auto"
              content={
                <div className="space-y-2 min-w-[220px]">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{decree.icon}</span>
                    {decree.name}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">{decree.description}</div>
                  
                  <div className="border-t border-slate-700/50 pt-2">
                    <div className="text-xs text-slate-500 mb-1.5">消耗</div>
                    <div className="text-xs text-amber-400 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {decree.cost} 政治点
                    </div>
                  </div>

                  <div className="border-t border-slate-700/50 pt-2">
                    <div className="text-xs text-slate-500 mb-1.5">效果</div>
                    <div className="space-y-1">
                      {Object.entries(decree.effects).map(([key, value]) => (
                        <div key={key} className={`text-xs flex items-center gap-1 ${
                          (value as number) > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {(value as number) > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {(value as number) > 0 ? '+' : ''}{value} {key}
                        </div>
                      ))}
                    </div>
                  </div>

                  {decree.duration && (
                    <div className="border-t border-slate-700/50 pt-2">
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        持续时间: {decree.duration} 天
                      </div>
                    </div>
                  )}

                  {onCooldown && (
                    <div className="border-t border-slate-700/50 pt-2">
                      <div className="text-xs text-red-400">
                        ⏱️ 冷却中: {decrees.cooldowns[decree.id]} 天
                      </div>
                    </div>
                  )}

                  {!canAfford && !onCooldown && (
                    <div className="border-t border-slate-700/50 pt-2">
                      <div className="text-xs text-red-400">
                        ❌ 政治点不足 (需要 {decree.cost})
                      </div>
                    </div>
                  )}
                </div>
              }
            >
              <div
                className={`p-3 rounded-lg border transition-all ${
                  canActivate
                    ? 'bg-amber-900/20 border-amber-500/30 hover:bg-amber-900/30 cursor-pointer'
                    : onCooldown
                      ? 'bg-slate-900/50 border-slate-600/30 opacity-60'
                      : 'bg-slate-900/50 border-slate-600/30 opacity-60'
                }`}
                onClick={() => canActivate && onUseDecree(decree.id)}
              >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{decree.icon}</span>
                  <div>
                    <div className="text-xs font-medium">{decree.name}</div>
                    <div className="text-[10px] text-slate-500">
                      {CATEGORY_ICONS[decree.category]} {decree.category}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {onCooldown ? (
                    <div className="text-xs text-slate-400 font-mono">
                      ⏱️ {decrees.cooldowns[decree.id]}天
                    </div>
                  ) : (
                    <div className={`text-xs font-mono font-bold ${
                      canAfford ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {decree.cost} 点
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed mb-2">
                {decree.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-2">
                {Object.entries(decree.effects).slice(0, 4).map(([key, value]) => (
                  <span
                    key={key}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                      value > 0
                        ? 'bg-emerald-900/30 text-emerald-400'
                        : 'bg-red-900/30 text-red-400'
                    }`}
                  >
                    {value > 0 ? '+' : ''}{value} {key}
                  </span>
                ))}
                {decree.duration && (
                  <span className="px-1.5 py-0.5 bg-blue-900/30 text-blue-400 rounded text-[9px]">
                    {decree.duration}天
                  </span>
                )}
              </div>

              <div className="flex gap-2 text-[9px]">
                {decree.supportedBy.length > 0 && (
                  <div className="text-emerald-500">
                    ✓ {decree.supportedBy.join(', ')}
                  </div>
                )}
                {decree.opposedBy.length > 0 && (
                  <div className="text-red-500">
                    ✗ {decree.opposedBy.join(', ')}
                  </div>
                )}
              </div>
            </div>
              </GameTooltip>
          )
        })}
      </div>

      <div className="p-3 bg-black/30 rounded-lg border border-white/5 mt-4">
        <div className="text-[10px] text-slate-400 leading-relaxed">
          <span className="text-amber-400">💡 提示:</span> 法令是即时生效的紧急政策，但会
          影响利益集团的立场。每月恢复约4-5点政治点数，稳定度和支持度越高恢复越快。
        </div>
      </div>
    </div>
  )
}
