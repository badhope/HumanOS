import { TrendingUp, TrendingDown, Shield, DollarSign, Users } from 'lucide-react'
import { default as GameTooltip } from '../ui/GameTooltip'
import { InterestGroup } from '../../data/game/usa-interest-groups'

interface InterestGroupsPanelProps {
  groups: Record<string, InterestGroup>
}

const IDEOLOGY_COLORS: Record<string, string> = {
  conservative: 'bg-amber-500',
  liberal: 'bg-blue-500',
  socialist: 'bg-red-500',
  nationalist: 'bg-rose-600',
  libertarian: 'bg-yellow-500',
  authoritarian: 'bg-slate-600',
}

const IDEOLOGY_NAMES: Record<string, string> = {
  conservative: '保守主义',
  liberal: '自由主义',
  socialist: '社会主义',
  nationalist: '民族主义',
  libertarian: '自由主义',
  authoritarian: '威权主义',
}

export default function InterestGroupsPanel({ groups }: InterestGroupsPanelProps) {
  const groupsArray = Object.values(groups).sort((a, b) => b.currentPower - a.currentPower)

  return (
    <div className="space-y-3">
      <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">
        利益集团 · 6大派系
      </div>
      
      {groupsArray.map(group => {
        const isHappy = group.approval >= group.effects.approvalThreshold
        
        return (
          <GameTooltip
            key={group.id}
            position="auto"
            content={
              <div className="space-y-2 min-w-[200px]">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="text-xl">{group.icon}</span>
                  {group.name}
                  <span className={`w-2.5 h-2.5 rounded-full ${IDEOLOGY_COLORS[group.ideology]}`} />
                </div>
                <div className="text-[10px] text-slate-500">
                  {IDEOLOGY_NAMES[group.ideology]}
                </div>
                
                <div className="text-xs text-slate-300 leading-relaxed">{group.description}</div>
                
                <div className="border-t border-slate-700/50 pt-2">
                  <div className="text-[10px] text-slate-500 mb-1">基础信息</div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div className="flex items-center gap-1 text-slate-300">
                      <Users className="w-3 h-3" /> 势力: {group.currentPower}%
                    </div>
                    <div className={`flex items-center gap-1 ${isHappy ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isHappy ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      好感: {Math.round(group.approval)}%
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-2">
                  <div className="text-[10px] text-slate-500 mb-1">政策诉求</div>
                  <div className="space-y-0.5">
                    {group.demands.slice(0, 4).map(demand => (
                      <div key={demand} className="text-[10px] text-slate-300 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-amber-400" />
                        {demand.replace(/_/g, ' ')}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-2">
                  <div className={`text-[10px] ${isHappy ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isHappy 
                      ? `✅ 满意阈值: ≥${group.effects.approvalThreshold}% (已达成)`
                      : `❌ 满意阈值: ≥${group.effects.approvalThreshold}% (未达成)`
                    }
                  </div>
                </div>
              </div>
            }
          >
            <div 
              className={`p-3 rounded-lg border transition-all cursor-help ${
                isHappy 
                  ? 'bg-emerald-900/20 border-emerald-500/30 hover:bg-emerald-900/30' 
                  : 'bg-red-900/20 border-red-500/30 hover:bg-red-900/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{group.icon}</span>
                  <div>
                    <div className="text-xs font-medium flex items-center gap-1">
                      {group.name}
                      <span className={`w-2 h-2 rounded-full ${IDEOLOGY_COLORS[group.ideology]}`} />
                    </div>
                    <div className="text-[10px] text-slate-500">
                      势力: {group.currentPower}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-mono font-bold ${
                    isHappy ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {Math.round(group.approval)}%
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {isHappy ? '支持' : '反对'}
                  </div>
                </div>
              </div>

              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    isHappy ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${group.approval}%` }}
                />
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {group.demands.slice(0, 2).map(demand => (
                  <span 
                    key={demand}
                    className="px-1.5 py-0.5 bg-white/5 rounded text-[9px] text-slate-400"
                  >
                    {demand.split('_')[0]}
                  </span>
                ))}
              </div>
            </div>
          </GameTooltip>
        )
      })}

      <div className="p-3 bg-black/30 rounded-lg border border-white/5 mt-4">
        <div className="text-[10px] text-slate-400 leading-relaxed">
          <span className="text-amber-400">💡 提示:</span> 派系的支持度会永久影响所有计算。
          每个派系满意时会带来加成，不满时会带来惩罚。势力越大，影响越明显。
        </div>
      </div>
    </div>
  )
}
