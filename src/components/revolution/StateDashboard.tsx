import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  BarChart3,
  Scale,
  Globe,
  AlertTriangle,
  Activity,
  Crown,
} from 'lucide-react'
import { MetricGauge, TricolorBanner } from './RevolutionTheme'

interface StateDashboardProps {
  economicState: {
    gdp: number
    gdpGrowth: number
    inflationRate: number
    unemploymentRate: number
    giniCoefficient: number
    businessCycle: string
    commodities: Array<{ name: string; price: number; change: number }>
  }
  politicalState: {
    unrest: number
    regimeLegitimacy: number
    factions: Array<{ name: string; support: number; color: string }>
    lawsInEffect: string[]
  }
  year: number
  turn: number
}

export function StateDashboard({
  economicState,
  politicalState,
  year,
  turn,
}: StateDashboardProps) {
  const [activeTab, setActiveTab] = useState<'economic' | 'political'>('economic')

  const cycleNames: Record<string, string> = {
    expansion: '📈 扩张期',
    peak: '🔥 顶峰',
    recession: '📉 衰退期',
    depression: '💀 大萧条',
    recovery: '🌱 复苏期',
  }

  const overallHealth = Math.max(0, 1 - politicalState.unrest * 0.7 - Math.abs(economicState.inflationRate - 0.02) * 5)

  return (
    <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-600">
      <TricolorBanner
        title="国家状态仪表盘"
        subtitle={`公元 ${year} 年 | 第 ${turn} 回合`}
        icon={<Activity size={24} />}
      />

      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">📊</div>
            <div className="text-2xl font-bold text-white">
              {(economicState.gdp / 1e9).toFixed(1)}B
            </div>
            <div className="text-emerald-400 text-sm">GDP 总值</div>
            <div className={`text-xs mt-1 flex items-center justify-center gap-1 ${economicState.gdpGrowth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {economicState.gdpGrowth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {(economicState.gdpGrowth * 100).toFixed(2)}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">💰</div>
            <div className="text-2xl font-bold text-white">
              {(economicState.inflationRate * 100).toFixed(1)}%
            </div>
            <div className="text-amber-400 text-sm">通胀率</div>
            <div className="text-xs mt-1 text-slate-400">
              {economicState.inflationRate < 0.03 ? '✅ 稳定' : economicState.inflationRate < 0.08 ? '⚠️ 温和' : '🔥 恶性'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">🏭</div>
            <div className="text-2xl font-bold text-white">
              {(economicState.unemploymentRate * 100).toFixed(1)}%
            </div>
            <div className="text-blue-400 text-sm">失业率</div>
            <div className="text-xs mt-1 text-slate-400">
              {economicState.unemploymentRate < 0.05 ? '✅ 充分就业' : '⚠️ 失业严重'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">⚖️</div>
            <div className="text-2xl font-bold text-white">
              {(overallHealth * 100).toFixed(0)}
            </div>
            <div className="text-red-400 text-sm">稳定指数</div>
            <div className="text-xs mt-1 text-slate-400">
              {overallHealth > 0.7 ? '✅ 稳定' : overallHealth > 0.4 ? '⚠️ 动荡' : '💀 革命边缘'}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'economic'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            onClick={() => setActiveTab('economic')}
          >
            <DollarSign size={16} className="inline mr-2" />
            经济
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'political'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            onClick={() => setActiveTab('political')}
          >
            <Scale size={16} className="inline mr-2" />
            政治
          </button>
        </div>

        {activeTab === 'economic' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-slate-700/40 rounded-xl p-4">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <BarChart3 size={18} className="text-amber-400" />
                经济周期
              </h4>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-amber-300">
                  {cycleNames[economicState.businessCycle] || economicState.businessCycle}
                </div>
                <div className="text-slate-400 text-sm">
                  基尼系数: {(economicState.giniCoefficient * 100).toFixed(0)}
                </div>
              </div>
            </div>

            <div className="bg-slate-700/40 rounded-xl p-4">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <Building2 size={18} className="text-emerald-400" />
                大宗商品价格
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {economicState.commodities.slice(0, 6).map((item) => (
                  <div key={item.name} className="bg-slate-800/60 rounded-lg p-3">
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-amber-400 font-bold">₶{item.price.toFixed(0)}</span>
                      <span className={`text-xs ${item.change >= 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {item.change >= 0 ? '↑' : '↓'}{Math.abs(item.change * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'political' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/40 rounded-xl p-4">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-400" />
                  社会动荡
                </h4>
                <MetricGauge
                  label="动荡程度"
                  value={politicalState.unrest}
                  color="red"
                  threshold={0.7}
                />
                <div className="text-center mt-2">
                  {politicalState.unrest > 0.7 ? (
                    <span className="text-red-400 text-sm">⚠️ 革命一触即发!</span>
                  ) : politicalState.unrest > 0.4 ? (
                    <span className="text-amber-400 text-sm">⚠️ 民众不满</span>
                  ) : (
                    <span className="text-emerald-400 text-sm">✅ 社会稳定</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-700/40 rounded-xl p-4">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <Crown size={18} className="text-amber-400" />
                  政权合法性
                </h4>
                <MetricGauge
                  label="民众支持"
                  value={politicalState.regimeLegitimacy}
                  color="gold"
                  threshold={0.5}
                />
                <div className="text-center mt-2">
                  {politicalState.regimeLegitimacy < 0.3 ? (
                    <span className="text-red-400 text-sm">💀 丧失民心</span>
                  ) : politicalState.regimeLegitimacy < 0.5 ? (
                    <span className="text-amber-400 text-sm">⚠️ 人心浮动</span>
                  ) : (
                    <span className="text-emerald-400 text-sm">✅ 民心所向</span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-700/40 rounded-xl p-4">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <Globe size={18} className="text-purple-400" />
                派系支持率
              </h4>
              <div className="space-y-2">
                {politicalState.factions.map((faction) => (
                  <div key={faction.name} className="flex items-center gap-3">
                    <div className="w-20 text-sm text-slate-300">{faction.name}</div>
                    <div className="flex-1 h-4 bg-slate-600 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: faction.color, width: `${faction.support * 100}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${faction.support * 100}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <div className="w-10 text-right text-white font-bold text-sm">
                      {(faction.support * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-700/40 rounded-xl p-4">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <Users size={18} className="text-blue-400" />
                现行法律 ({politicalState.lawsInEffect.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {politicalState.lawsInEffect.map((law) => (
                  <span key={law} className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm">
                    📜 {law}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
