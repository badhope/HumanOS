import { useState, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, TreeDeciduous, BarChart4, Brain, Lock, Check, ChevronRight, Zap, AlertTriangle, TrendingUp, TrendingDown, Users, Scroll, ZoomIn, ZoomOut, Maximize2, Clock } from 'lucide-react'
import { default as GameTooltip } from '../ui/GameTooltip'
import { USA_TECH_TREE, TechNode, isTechResearchable } from '../../data/game/usa-tech-tree'
import { USA_FOCUS_TREE } from '../../data/game/usa-focus-tree'
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'
import InterestGroupsPanel from './InterestGroupsPanel'
import DecreesPanel from './DecreesPanel'
import FocusTreePanel from './FocusTreePanel'

interface CenterViewPanelProps {
  mode: string
  state: any
  onModeChange: (mode: string) => void
  onStartFocus?: (focusId: string) => void
  onStartResearch?: (techId: string) => void
  onUseDecree?: (decreeId: string) => void
}

const VIEW_MODES = [
  { id: 'world_map', name: '世界地图', icon: Globe },
  { id: 'focus_tree', name: '国策树', icon: TreeDeciduous },
  { id: 'tech_tree', name: '科技树', icon: Brain },
  { id: 'interest_groups', name: '利益集团', icon: Users },
  { id: 'decrees', name: '总统法令', icon: Scroll },
  { id: 'data_viz', name: '数据可视化', icon: BarChart4 },
]

const USA_STATES = [
  { abbr: 'AL', name: 'AL', name_cn: '阿拉巴马', party: 'R', ev: 9 },
  { abbr: 'AK', name: 'AK', name_cn: '阿拉斯加', party: 'R', ev: 3 },
  { abbr: 'AZ', name: 'AZ', name_cn: '亚利桑那', party: 'D', ev: 11 },
  { abbr: 'AR', name: 'AR', name_cn: '阿肯色', party: 'R', ev: 6 },
  { abbr: 'CA', name: 'CA', name_cn: '加州', party: 'D', ev: 55 },
  { abbr: 'CO', name: 'CO', name_cn: '科罗拉多', party: 'D', ev: 9 },
  { abbr: 'CT', name: 'CT', name_cn: '康涅狄格', party: 'D', ev: 7 },
  { abbr: 'DE', name: 'DE', name_cn: '特拉华', party: 'D', ev: 3 },
  { abbr: 'FL', name: 'FL', name_cn: '佛罗里达', party: 'R', ev: 29 },
  { abbr: 'GA', name: 'GA', name_cn: '佐治亚', party: 'R', ev: 16 },
  { abbr: 'HI', name: 'HI', name_cn: '夏威夷', party: 'D', ev: 4 },
  { abbr: 'ID', name: 'ID', name_cn: '爱达荷', party: 'R', ev: 4 },
  { abbr: 'IL', name: 'IL', name_cn: '伊利诺伊', party: 'D', ev: 20 },
  { abbr: 'IN', name: 'IN', name_cn: '印第安纳', party: 'R', ev: 11 },
  { abbr: 'IA', name: 'IA', name_cn: '爱荷华', party: 'R', ev: 6 },
  { abbr: 'KS', name: 'KS', name_cn: '堪萨斯', party: 'R', ev: 6 },
  { abbr: 'KY', name: 'KY', name_cn: '肯塔基', party: 'R', ev: 8 },
  { abbr: 'LA', name: 'LA', name_cn: '路易斯安那', party: 'R', ev: 8 },
  { abbr: 'ME', name: 'ME', name_cn: '缅因', party: 'D', ev: 4 },
  { abbr: 'MD', name: 'MD', name_cn: '马里兰', party: 'D', ev: 10 },
  { abbr: 'MA', name: 'MA', name_cn: '马萨诸塞', party: 'D', ev: 11 },
  { abbr: 'MI', name: 'MI', name_cn: '密歇根', party: 'D', ev: 16 },
  { abbr: 'MN', name: 'MN', name_cn: '明尼苏达', party: 'D', ev: 10 },
  { abbr: 'MS', name: 'MS', name_cn: '密西西比', party: 'R', ev: 6 },
  { abbr: 'MO', name: 'MO', name_cn: '密苏里', party: 'R', ev: 10 },
  { abbr: 'MT', name: 'MT', name_cn: '蒙大拿', party: 'R', ev: 3 },
  { abbr: 'NE', name: 'NE', name_cn: '内布拉斯加', party: 'R', ev: 5 },
  { abbr: 'NV', name: 'NV', name_cn: '内华达', party: 'D', ev: 6 },
  { abbr: 'NH', name: 'NH', name_cn: '新罕布什尔', party: 'D', ev: 4 },
  { abbr: 'NJ', name: 'NJ', name_cn: '新泽西', party: 'D', ev: 14 },
  { abbr: 'NM', name: 'NM', name_cn: '新墨西哥', party: 'D', ev: 5 },
  { abbr: 'NY', name: 'NY', name_cn: '纽约', party: 'D', ev: 29 },
  { abbr: 'NC', name: 'NC', name_cn: '北卡罗来纳', party: 'R', ev: 15 },
  { abbr: 'ND', name: 'ND', name_cn: '北达科他', party: 'R', ev: 3 },
  { abbr: 'OH', name: 'OH', name_cn: '俄亥俄', party: 'R', ev: 18 },
  { abbr: 'OK', name: 'OK', name_cn: '俄克拉荷马', party: 'R', ev: 7 },
  { abbr: 'OR', name: 'OR', name_cn: '俄勒冈', party: 'D', ev: 7 },
  { abbr: 'PA', name: 'PA', name_cn: '宾夕法尼亚', party: 'D', ev: 20 },
  { abbr: 'RI', name: 'RI', name_cn: '罗德岛', party: 'D', ev: 4 },
  { abbr: 'SC', name: 'SC', name_cn: '南卡罗来纳', party: 'R', ev: 9 },
  { abbr: 'SD', name: 'SD', name_cn: '南达科他', party: 'R', ev: 3 },
  { abbr: 'TN', name: 'TN', name_cn: '田纳西', party: 'R', ev: 11 },
  { abbr: 'TX', name: 'TX', name_cn: '得克萨斯', party: 'R', ev: 38 },
  { abbr: 'UT', name: 'UT', name_cn: '犹他', party: 'R', ev: 6 },
  { abbr: 'VT', name: 'VT', name_cn: '佛蒙特', party: 'D', ev: 3 },
  { abbr: 'VA', name: 'VA', name_cn: '弗吉尼亚', party: 'D', ev: 13 },
  { abbr: 'WA', name: 'WA', name_cn: '华盛顿', party: 'D', ev: 12 },
  { abbr: 'WV', name: 'WV', name_cn: '西弗吉尼亚', party: 'R', ev: 5 },
  { abbr: 'WI', name: 'WI', name_cn: '威斯康星', party: 'D', ev: 10 },
  { abbr: 'WY', name: 'WY', name_cn: '怀俄明', party: 'R', ev: 3 },
]

export default function CenterViewPanel({ mode, state, onModeChange, onStartFocus, onStartResearch, onUseDecree }: CenterViewPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="h-10 shrink-0 border-b border-white/5 flex items-center px-3 gap-1">
        {VIEW_MODES.map(viewMode => (
          <button
            key={viewMode.id}
            onClick={() => onModeChange(viewMode.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${mode === viewMode.id 
                ? 'bg-white/15 text-white' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <viewMode.icon className="w-3.5 h-3.5 inline mr-1.5" />
            {viewMode.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === 'world_map' && <USAElectoralMap />}
          {mode === 'focus_tree' && <FocusTreePanel state={state} onStartFocus={onStartFocus!} />}
          {mode === 'tech_tree' && <TechTreeView state={state} onStartResearch={onStartResearch} />}
          {mode === 'interest_groups' && state.groups && (
            <div className="p-4 overflow-y-auto h-full">
              <InterestGroupsPanel groups={state.groups.groups} />
            </div>
          )}
          {mode === 'decrees' && state.decrees && (
            <div className="p-4 overflow-y-auto h-full">
              <DecreesPanel 
                decrees={state.decrees} 
                politicalCapital={state.political?.politicalCapital || 100}
                onUseDecree={onUseDecree || (() => {})}
              />
            </div>
          )}
          {mode === 'data_viz' && <DataVisualizationView state={state} />}
          
          {/* ========== 开发中面板占位 ========== */}
          {mode === 'cabinet' && <PlaceholderPanel title="👔 内阁" />}
          {mode === 'congress' && <PlaceholderPanel title="🏛️ 国会" />}
          {mode === 'electoral_map' && <USAElectoralMap />}
          {mode === 'budget_chart' && <FederalBudgetPanel state={state} />}
          {mode === 'industry_map' && <PlaceholderPanel title="🏭 工业结构" />}
          {mode === 'monetary_policy' && <FedPolicyPanel state={state} />}
          {mode === 'trade_network' && <PlaceholderPanel title="🌐 国际贸易" />}
          {mode === 'alliance_map' && <PlaceholderPanel title="🔗 军事同盟" />}
          {mode === 'sanctions' && <PlaceholderPanel title="💥 制裁工具" />}
          {mode === 'treaties' && <PlaceholderPanel title="📜 国际条约" />}
          {mode === 'military_map' && <PlaceholderPanel title="🎖️ 武装力量" />}
          {mode === 'doctrine' && <PlaceholderPanel title="📖 军事学说" />}
          {mode === 'production' && <PlaceholderPanel title="⚙️ 军工生产" />}
          {mode === 'deploy_map' && <PlaceholderPanel title="🌍 全球部署" />}
          {mode === 'research_queue' && <ResearchQueuePanel state={state} />}
          {mode === 'mega_projects' && <PlaceholderPanel title="🚀 重大工程" />}
          {mode === 'demographics' && <DemographicsPanel state={state} />}
          {mode === 'culture_war' && <PlaceholderPanel title="🎭 文化战争" />}
          {mode === 'welfare' && <PlaceholderPanel title="🏥 社会福利" />}
          {mode === 'justice' && <PlaceholderPanel title="⚖️ 司法部" />}
        </AnimatePresence>
      </div>
    </div>
  )
}

function PlaceholderPanel({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center"
    >
      <div className="text-6xl mb-6 opacity-20">🚧</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-slate-500 mb-6">功能开发中，敬请期待！</p>
      <div className="flex gap-3">
        <div className="w-2 h-2 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-slate-600 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
     </motion.div>
    )
  }

function FedPolicyPanel({ state }: { state: any }) {
  const fedRate = (state?.economy?.interestRate || 0.0525) * 100
  const balanceSheet = 8.9
  const inflation = ((state?.economy?.inflation || 0.032) * 100).toFixed(1)
  const unemployment = ((state?.economy?.unemployment || 0.041) * 100).toFixed(1)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-4 overflow-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">🏦 联邦储备委员会</h3>
        <span className="px-2 py-1 bg-slate-700 rounded text-xs">FOMC 议息会议</span>
      </div>

      {/* 核心政策利率 */}
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          🎯 联邦基金利率 (Federal Funds Rate)
        </h4>
        
        <div className="flex items-center justify-center py-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-amber-400 font-mono">{fedRate.toFixed(1)}%</div>
            <div className="text-sm text-slate-400 mt-2">当前目标区间</div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded border border-red-500/30 hover:bg-red-500/30 transition-colors text-sm">
                -0.25% 降息
              </button>
              <button className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors text-sm">
                +0.25% 加息
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <GameTooltip
            position="auto"
            content={<div className="text-xs">通胀高于2%目标时倾向加息</div>}
          >
            <div className="text-center p-3 bg-slate-800/50 rounded-lg cursor-help">
              <div className="text-xs text-slate-500">通胀率</div>
              <div className={`text-xl font-bold mt-1 ${parseFloat(inflation) > 3 ? 'text-red-400' : 'text-emerald-400'}`}>
                {inflation}%
              </div>
              <div className="text-[10px] text-slate-500">目标: 2%</div>
            </div>
          </GameTooltip>

          <GameTooltip
            position="auto"
            content={<div className="text-xs">充分就业目标约4%</div>}
          >
            <div className="text-center p-3 bg-slate-800/50 rounded-lg cursor-help">
              <div className="text-xs text-slate-500">失业率</div>
              <div className="text-xl font-bold mt-1 text-blue-400">{unemployment}%</div>
              <div className="text-[10px] text-slate-500">目标: 4%</div>
            </div>
          </GameTooltip>
        </div>
      </div>

      {/* 资产负债表 */}
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          💹 美联储资产负债表
        </h4>
        
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-blue-400">${balanceSheet}T</span>
              <span className="text-sm text-slate-500">美元</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              峰值: $8.9T (2022年) | 2020年: $4.1T
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30 hover:bg-blue-500/30 transition-colors text-xs">
              QE 扩表
            </button>
            <button className="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded border border-orange-500/30 hover:bg-orange-500/30 transition-colors text-xs">
              QT 缩表
            </button>
          </div>
        </div>

        <div className="h-24 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { q: '2020Q1', val: 4.1 },
              { q: '2020Q2', val: 7.0 },
              { q: '2020Q4', val: 7.4 },
              { q: '2021Q4', val: 8.8 },
              { q: '2022Q4', val: 8.5 },
              { q: '2023Q4', val: 7.7 },
              { q: '2024Q2', val: 8.9 },
            ]}>
              <XAxis dataKey="q" tick={{ fill: '#64748b', fontSize: 9 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 9 }} domain={[3, 10]} />
              <defs>
                <linearGradient id="colorFed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="val" stroke="#3B82F6" fillOpacity={1} fill="url(#colorFed)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 泰勒规则 */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3">📐 泰勒规则 (Taylor Rule)</h4>
        <div className="text-xs text-slate-400 mb-3">
          利率 = 通胀 + 均衡利率 + 0.5×(通胀-2%) + 0.5×产出缺口
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2 bg-slate-800/50 rounded">
            <div className="text-[10px] text-slate-500">建议利率</div>
            <div className="text-lg font-bold text-slate-300">4.8%</div>
          </div>
          <div className="p-2 bg-slate-800/50 rounded">
            <div className="text-[10px] text-slate-500">实际利率</div>
            <div className="text-lg font-bold text-amber-400">{fedRate.toFixed(1)}%</div>
          </div>
          <div className="p-2 bg-slate-800/50 rounded">
            <div className="text-[10px] text-slate-500">偏差</div>
            <div className="text-lg font-bold text-emerald-400">+0.5%</div>
          </div>
          <div className="p-2 bg-slate-800/50 rounded">
            <div className="text-[10px] text-slate-500">立场</div>
            <div className="text-lg font-bold text-amber-400">偏鹰</div>
          </div>
        </div>
      </div>
    </motion.div>
   )
 }

function DemographicsPanel({ state }: { state: any }) {
  const laborForce = 167.2
  const employed = 160.4
  const unemployed = 6.8
  const participationRate = 62.5
  const avgHourlyWage = 34.57

  const ageData = [
    { group: '0-17', pop: 73, color: '#3B82F6' },
    { group: '18-34', pop: 68, color: '#10B981' },
    { group: '35-54', pop: 83, color: '#F59E0B' },
    { group: '55+', pop: 58, color: '#EF4444' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-4 overflow-auto"
    >
      <h3 className="text-lg font-bold mb-4">👥 人口与劳动力市场</h3>

      {/* 核心指标 */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <GameTooltip position="auto" content={<div className="text-xs">劳动力总人口（百万）</div>}>
          <div className="bg-white/5 rounded-lg p-3 text-center cursor-help">
            <div className="text-[10px] text-slate-500">劳动力</div>
            <div className="text-xl font-bold mt-1">{laborForce}M</div>
          </div>
        </GameTooltip>
        <GameTooltip position="auto" content={<div className="text-xs">就业人口（百万）</div>}>
          <div className="bg-emerald-500/10 rounded-lg p-3 text-center cursor-help border border-emerald-500/30">
            <div className="text-[10px] text-slate-500">就业</div>
            <div className="text-xl font-bold mt-1 text-emerald-400">{employed}M</div>
          </div>
        </GameTooltip>
        <GameTooltip position="auto" content={<div className="text-xs">失业人口（百万）</div>}>
          <div className="bg-red-500/10 rounded-lg p-3 text-center cursor-help border border-red-500/30">
            <div className="text-[10px] text-slate-500">失业</div>
            <div className="text-xl font-bold mt-1 text-red-400">{unemployed}M</div>
          </div>
        </GameTooltip>
        <GameTooltip position="auto" content={<div className="text-xs">劳动参与率 %</div>}>
          <div className="bg-blue-500/10 rounded-lg p-3 text-center cursor-help border border-blue-500/30">
            <div className="text-[10px] text-slate-500">参与率</div>
            <div className="text-xl font-bold mt-1 text-blue-400">{participationRate}%</div>
          </div>
        </GameTooltip>
      </div>

      {/* 薪资与行业 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* 薪资趋势 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3">💵 平均时薪趋势</h4>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-emerald-400">${avgHourlyWage}</span>
            <span className="text-xs text-emerald-400">+4.1% YoY</span>
          </div>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { m: '1月', wage: 33.20 },
                { m: '2月', wage: 33.50 },
                { m: '3月', wage: 33.82 },
                { m: '4月', wage: 34.03 },
                { m: '5月', wage: 34.31 },
                { m: '6月', wage: 34.57 },
              ]}>
                <XAxis dataKey="m" tick={{ fill: '#64748b', fontSize: 9 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 9 }} domain={[33, 35]} />
                <Line type="monotone" dataKey="wage" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 年龄分布 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3">🎂 年龄结构（百万人）</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={45}
                  paddingAngle={3}
                  dataKey="pop"
                  label={({ group, pop }) => `${group}: ${pop}M`}
                  labelLine={false}
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 行业就业分布 */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3">🏭 行业就业分布</h4>
        <div className="space-y-2">
          {[
            { name: '专业和商业服务', emp: 22.8, color: '#3B82F6' },
            { name: '医疗保健和社会救助', emp: 21.5, color: '#10B981' },
            { name: '零售贸易', emp: 15.2, color: '#F59E0B' },
            { name: '制造业', emp: 13.0, color: '#EF4444' },
            { name: '金融活动', emp: 8.9, color: '#8B5CF6' },
            { name: '建筑业', emp: 8.1, color: '#EC4899' },
          ].map(ind => (
            <div key={ind.name} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ind.color }} />
              <div className="w-24 text-[10px] text-slate-400 truncate">{ind.name}</div>
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(ind.emp / 25) * 100}%`, backgroundColor: ind.color }}
                />
              </div>
              <div className="w-12 text-right text-[10px] font-mono text-slate-400">{ind.emp}M</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function FederalBudgetPanel({ state }: { state: any }) {
  const revenueData = [
    { name: '个人所得税', value: 1.72, color: '#10B981' },
    { name: '企业所得税', value: 0.42, color: '#3B82F6' },
    { name: '社保税', value: 1.31, color: '#F59E0B' },
    { name: '消费税', value: 0.18, color: '#EF4444' },
    { name: '其他收入', value: 0.35, color: '#8B5CF6' },
  ]

  const spendingData = [
    { name: '社会保障', value: 1.19, color: '#10B981' },
    { name: '国防', value: 0.77, color: '#EF4444' },
    { name: '医疗保险', value: 0.72, color: '#3B82F6' },
    { name: '医疗补助', value: 0.45, color: '#8B5CF6' },
    { name: '债务利息', value: 0.39, color: '#F59E0B' },
    { name: '其他支出', value: 0.66, color: '#64748B' },
  ]

  const totalRevenue = revenueData.reduce((s, d) => s + d.value, 0)
  const totalSpending = spendingData.reduce((s, d) => s + d.value, 0)
  const deficit = totalSpending - totalRevenue

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-4 overflow-auto"
    >
      <h3 className="text-lg font-bold mb-4">💰 联邦预算 FY2025</h3>

      {/* 概览卡片 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <GameTooltip
          position="auto"
          content={<div className="text-xs">联邦政府年度总收入</div>}
        >
          <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30 cursor-help">
            <div className="text-xs text-slate-500">💰 总收入</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">${totalRevenue.toFixed(2)}T</div>
            <div className="text-xs text-emerald-400 mt-1">+2.4% YoY</div>
          </div>
        </GameTooltip>

        <GameTooltip
          position="auto"
          content={<div className="text-xs">联邦政府年度总支出</div>}
        >
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30 cursor-help">
            <div className="text-xs text-slate-500">💸 总支出</div>
            <div className="text-2xl font-bold text-red-400 mt-1">${totalSpending.toFixed(2)}T</div>
            <div className="text-xs text-red-400 mt-1">+5.1% YoY</div>
          </div>
        </GameTooltip>

        <GameTooltip
          position="auto"
          content={<div className="text-xs">财政赤字 = 支出 - 收入</div>}
        >
          <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30 cursor-help">
            <div className="text-xs text-slate-500">📉 赤字</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">${deficit.toFixed(2)}T</div>
            <div className="text-xs text-amber-400 mt-1">占GDP {((deficit / 21.4) * 100).toFixed(1)}%</div>
          </div>
        </GameTooltip>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 收入饼图 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3 text-emerald-400">📥 收入构成</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  formatter={(v: number) => [`$${v}T`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {revenueData.map(item => (
              <div key={item.name} className="flex items-center gap-2 text-[10px]">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 支出饼图 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3 text-red-400">📤 支出构成</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  formatter={(v: number) => [`$${v}T`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {spendingData.map(item => (
              <div key={item.name} className="flex items-center gap-2 text-[10px]">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 月度收支趋势 */}
      <div className="mt-4 bg-white/5 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3">📊 月度收支趋势</h4>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { month: '1月', revenue: 0.32, spending: 0.41 },
              { month: '2月', revenue: 0.29, spending: 0.38 },
              { month: '3月', revenue: 0.34, spending: 0.40 },
              { month: '4月', revenue: 0.56, spending: 0.39 },
              { month: '5月', revenue: 0.28, spending: 0.42 },
              { month: '6月', revenue: 0.31, spending: 0.43 },
            ]}>
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={false} name="收入" />
              <Line type="monotone" dataKey="spending" stroke="#EF4444" strokeWidth={2} dot={false} name="支出" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

function USAElectoralMap() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-4 overflow-auto"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">🗳️ 2020 美国总统选举</h3>
        <div className="flex items-center gap-4 text-sm">
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
            D 民主党 232 选举人票</span>
          <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded">
            R 共和党 306 选举人票</span>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1">
        {USA_STATES.map(state => (
          <GameTooltip
            key={state.abbr}
            position="auto"
            content={
              <div className="space-y-1.5 min-w-[140px]">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span className={state.party === 'D' ? 'text-blue-400' : 'text-red-400'}>
                    {state.name_cn}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {state.name} · {state.party === 'D' ? '民主党' : '共和党'}
                </div>
                <div className="border-t border-slate-700/50 pt-1.5">
                  <div className="text-[10px] text-amber-400">
                    🗳️ {state.ev} 张选举人票
                  </div>
                </div>
              </div>
            }
          >
            <div
              className={`
                aspect-square rounded flex flex-col items-center justify-center text-[8px] font-bold cursor-pointer hover:scale-105 transition-transform
                ${state.party === 'D' ? 'bg-blue-600/60' : 'bg-red-600/60'}
              `}
            >
              <span>{state.abbr}</span>
              <span className="opacity-60">{state.ev}</span>
            </div>
          </GameTooltip>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-xs text-slate-400">决胜州</div>
          <div className="text-lg font-bold">7</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-xs text-slate-400">共和党领先</div>
          <div className="text-lg font-bold text-red-400">+6%</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-xs text-slate-400">民主党领先</div>
          <div className="text-lg font-bold text-blue-400">+2%</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-xs text-slate-400">选举倒计时</div>
          <div className="text-lg font-bold text-amber-400">653天</div>
        </div>
      </div>
    </motion.div>
  )
}

function TechTreeView({ state, onStartResearch }: { state: any; onStartResearch?: (id: string) => void }) {
  const [selectedTech, setSelectedTech] = useState<TechNode | null>(null)
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 0.75 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const categoryColors: Record<string, string> = {
    it: '#3B82F6',
    energy: '#10B981',
    biotech: '#EC4899',
    military: '#EF4444',
    space: '#8B5CF6',
  }

  const categoryNames: Record<string, string> = {
    it: '💻 信息技术',
    energy: '⚡ 能源科技',
    biotech: '🧬 生物科技',
    military: '🛡️ 军事科技',
    space: '🚀 航天科技',
  }

  const getTechStatus = useCallback((tech: TechNode) => {
    if (!state?.tech) return 'locked'
    if (state.tech.researched?.includes(tech.id)) return 'researched'
    if (state.tech.currentResearch === tech.id) return 'researching'
    if (state.tech.researchQueue?.includes(tech.id)) return 'queued'
    
    const result = isTechResearchable(
      tech, 
      state.tech,
      state?.political?.politicalCapital || 0,
      state?.political?.approval || 0,
      state?.political?.stability || 0
    )
    
    if (result.available) return 'available'
    return 'locked'
  }, [state])

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
    setViewport({ x: 0, y: 0, zoom: 0.75 })
  }

  const renderConnections = () => {
    return USA_TECH_TREE.map(tech =>
      tech.requires.map((reqId: string) => {
        const fromTech = USA_TECH_TREE.find((f: TechNode) => f.id === reqId)
        if (!fromTech) return null
        
        const x1 = 100 + fromTech.position!.x * 110 + 24
        const y1 = 60 + fromTech.position!.y * 95 + 48
        const x2 = 100 + tech.position!.x * 110 + 24
        const y2 = 60 + tech.position!.y * 95 - 2

        const isComplete = state.tech?.researched?.includes(fromTech.id)
        const status = getTechStatus(tech)

        return (
          <line
            key={`${reqId}-${tech.id}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isComplete ? '#48BB78' : '#4A5568'}
            strokeWidth="2"
            strokeDasharray={status === 'locked' ? '4,4' : 'none'}
          />
        )
      })
    )
  }

  const renderTechNode = (tech: TechNode) => {
    const status = getTechStatus(tech)
    const color = categoryColors[tech.category]
    const progress = state?.tech?.progress?.[tech.id] || 0

    return (
      <GameTooltip
         position="auto"
         content={
           <div className="space-y-2 min-w-[180px]">
             <div className="font-bold text-white text-sm flex items-center gap-2" style={{ color: color }}>
               <span>{tech.icon}</span>
               {tech.name}
             </div>
             <div className="text-[10px] text-slate-300 leading-relaxed">{tech.description}</div>
             <div className="border-t border-slate-700/50 pt-2 text-[10px] text-slate-400">
               ⏱️ {tech.duration} 天
             </div>
           </div>
         }
       >
        <motion.div
          key={tech.id}
          onClick={() => setSelectedTech(tech)}
          className={`
            absolute w-12 h-12 rounded-lg flex items-center justify-center text-xl cursor-pointer
            transition-all duration-200 border-2
            ${status === 'researched' ? 'bg-emerald-600/80 border-emerald-400' : ''}
            ${status === 'researching' ? 'bg-blue-500/80 border-blue-400 animate-pulse' : ''}
            ${status === 'available' ? 'bg-slate-600/60 border-slate-400 hover:bg-slate-500/60' : ''}
            ${status === 'locked' ? 'bg-slate-800/60 border-slate-700 opacity-50' : ''}
          `}
          style={{
            left: `${100 + tech.position!.x * 110}px`,
            top: `${60 + tech.position!.y * 95}px`,
            boxShadow: status === 'researching' ? `0 0 15px ${color}` : 'none',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {status === 'researched' && <Check className="w-5 h-5 text-white" />}
          {status === 'researching' && (
            <div className="flex flex-col items-center">
              <span className="text-sm">{tech.icon}</span>
              <span className="text-[7px] text-white font-bold">
                {progress}/{tech.duration}
              </span>
            </div>
          )}
          {(status === 'available' || status === 'locked' || status === 'queued') && <span>{tech.icon}</span>}
        </motion.div>
      </GameTooltip>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex overflow-hidden"
    >
      <div
        className={`flex-1 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute top-3 left-4 flex gap-3 z-5">
          {Object.entries(categoryNames).map(([cat, name]) => (
            <div key={cat} className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: categoryColors[cat] }} />
              <span className="text-slate-400">{name}</span>
            </div>
          ))}
        </div>



        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <button onClick={() => setViewport(v => ({ ...v, zoom: Math.min(v.zoom * 1.2, 2.0) }))} className="w-8 h-8 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center text-white border border-white/10">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={() => setViewport(v => ({ ...v, zoom: Math.max(v.zoom * 0.8, 0.3) }))} className="w-8 h-8 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center text-white border border-white/10">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={resetViewport} className="w-8 h-8 bg-black/60 hover:bg-black/80 rounded-lg flex items-center justify-center text-white border border-white/10">
            <Maximize2 className="w-4 h-4" />
          </button>
          <div className="px-2 bg-black/60 rounded-lg flex items-center text-xs text-slate-400 border border-white/10">
            {Math.round(viewport.zoom * 100)}%
          </div>
        </div>

        <div style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}>
          <svg className="absolute pointer-events-none" style={{ width: '1600px', height: '800px' }}>
            {renderConnections()}
          </svg>
          <div className="relative" style={{ width: '1600px', height: '800px' }}>
            {USA_TECH_TREE.map(renderTechNode)}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-l border-white/5 bg-black/40 p-4 overflow-auto shrink-0"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedTech.icon}</span>
                  <h4 className="font-bold">{selectedTech.name}</h4>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {categoryNames[selectedTech.category]} · {selectedTech.duration} 天
                </div>
              </div>
              <button onClick={() => setSelectedTech(null)} className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center">✕</button>
            </div>

            <p className="text-sm text-slate-400 mb-4">{selectedTech.description}</p>

            {Object.keys(selectedTech.effects).length > 0 && (
              <>
                <div className="text-xs text-slate-500 mb-2 uppercase">效果一览</div>
                <div className="grid grid-cols-2 gap-1.5 text-xs mb-4">
                  {Object.entries(selectedTech.effects).map(([key, value]) => (
                    <div key={key} className={`p-1.5 rounded ${(value as number) >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                      <span className={(value as number) >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {(value as number) >= 0 ? '+' : ''}{value as number}%
                      </span>
                      <span className="text-slate-500 ml-1">{getEffectName(key)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {getTechStatus(selectedTech) === 'available' && onStartResearch && (
              <button onClick={() => onStartResearch(selectedTech.id)} className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-sm">开始研究</button>
            )}
            {getTechStatus(selectedTech) === 'researching' && (
              <div className="text-center py-2 bg-blue-500/20 rounded-lg text-blue-300 text-sm">⚡ 研究中... {Math.round((state?.tech?.progress?.[selectedTech.id] || 0) / selectedTech.duration * 100)}%</div>
            )}
            {getTechStatus(selectedTech) === 'researched' && (
              <div className="text-center py-2 bg-emerald-500/20 rounded-lg text-emerald-300 text-sm">✓ 已完成</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function DataVisualizationView({ state }: { state: any }) {
  const historyData = useMemo(() => {
    const data: Array<{ day: number; gdp: number; unemployment: number; approval: number }> = []
    for (let i = 0; i <= (state?.day || 0); i += Math.max(1, Math.floor((state?.day || 1) / 20))) {
      data.push({
        day: i,
        gdp: 21.4 + Math.sin(i / 100) * 2 + i / 500,
        unemployment: 4 + Math.sin(i / 80) * 2,
        approval: 42 + Math.sin(i / 60) * 10,
      })
    }
    return data
  }, [state?.day])

  const metrics = [
    { label: 'GDP', value: '$21.4T', change: '+2.9%', positive: true },
    { label: '失业率', value: `${((state?.economy?.unemployment || 0.04) * 100).toFixed(1)}%`, change: '-0.2%', positive: true },
    { label: '通胀率', value: `${((state?.economy?.inflation || 0.018) * 100).toFixed(1)}%`, change: '+0.1%', positive: false },
    { label: '联邦债务', value: '$22.7T', change: '+5.3%', positive: false },
    { label: '支持率', value: `${Math.round(state?.political?.approval || 42)}%`, change: '+2%', positive: true },
    { label: '稳定度', value: `${Math.round(state?.political?.stability || 76)}%`, change: '-1%', positive: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-4 overflow-auto"
    >
      <h3 className="text-lg font-bold mb-4">📊 关键指标趋势</h3>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {metrics.map(m => (
          <GameTooltip
            key={m.label}
            position="auto"
            content={
              <div className="space-y-1 min-w-[150px]">
                <div className="font-bold text-white text-sm">{m.label}</div>
                <div className="text-[10px] text-slate-400">当前值</div>
                <div className="text-lg font-bold">{m.value}</div>
                <div className={`text-xs flex items-center gap-1 ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {m.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  较上月 {m.change}
                </div>
              </div>
            }
          >
            <div className="bg-white/5 rounded-lg p-4 cursor-help hover:bg-white/10 transition-colors">
              <div className="text-xs text-slate-500">{m.label}</div>
              <div className="text-2xl font-bold mt-1">{m.value}</div>
              <div className={`text-sm mt-1 flex items-center gap-1 ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {m.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {m.change}
              </div>
            </div>
          </GameTooltip>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3">GDP 趋势</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} domain={['dataMin - 1', 'dataMax + 1']} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area type="monotone" dataKey="gdp" stroke="#3B82F6" fillOpacity={1} fill="url(#colorGdp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3">支持率趋势</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 100]} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Line type="monotone" dataKey="approval" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white/5 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3">失业率 vs 通胀率 (菲利普斯曲线)</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historyData}>
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Line type="monotone" dataKey="unemployment" stroke="#EF4444" strokeWidth={2} dot={false} name="失业率 %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

function getEffectName(key: string): string {
  const names: Record<string, string> = {
    stability: '稳定度',
    approval: '支持率',
    politicalCapital: '政治点数',
    gdpGrowth: 'GDP增长',
    inflation: '通胀率',
    unemployment: '失业率',
    treasury: '国库',
    productivity: '生产力',
    military: '军事力量',
  }
  return names[key] || key
}

function ResearchQueuePanel({ state }: { state: any }) {
  const currentFocus = state?.focus?.current 
    ? USA_FOCUS_TREE.find(f => f.id === state.focus.current) 
    : null
  const currentTech = state?.tech?.currentResearch
    ? USA_TECH_TREE.find(t => t.id === state.tech.currentResearch)
    : null
  const techQueue = state?.tech?.researchQueue || []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-4 overflow-auto"
    >
      <h3 className="text-lg font-bold mb-4">📋 研究队列</h3>

      <div className="space-y-6">
        {/* 当前国策 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TreeDeciduous className="w-4 h-4 text-amber-400" />
            当前国策
          </h4>
          
          {currentFocus ? (
            <GameTooltip
              position="auto"
              content={
                <div className="space-y-2 min-w-[180px]">
                  <div className="font-bold text-white">{currentFocus.name}</div>
                  <div className="text-xs text-slate-400">{currentFocus.description}</div>
                  <div className="text-xs text-amber-400">
                    进度: {state.focus.progress} / {currentFocus.duration} 天
                  </div>
                </div>
              }
            >
              <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                <span className="text-2xl">{currentFocus.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{currentFocus.name}</div>
                  <div className="w-full h-1.5 bg-slate-700 rounded-full mt-1.5">
                    <div 
                      className="h-full bg-yellow-500 rounded-full transition-all"
                      style={{ width: `${(state.focus.progress / currentFocus.duration) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-yellow-400 font-mono">
                  {Math.round((state.focus.progress / currentFocus.duration) * 100)}%
                </div>
              </div>
            </GameTooltip>
          ) : (
            <div className="text-sm text-slate-500 text-center py-4">
              暂无进行中的国策，请在国策树选择
            </div>
          )}
        </div>

        {/* 当前科技 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-400" />
            当前科技
          </h4>
          
          {currentTech ? (
            <GameTooltip
              position="auto"
              content={
                <div className="space-y-2 min-w-[180px]">
                  <div className="font-bold text-white">{currentTech.name}</div>
                  <div className="text-xs text-slate-400">{currentTech.description}</div>
                  <div className="text-xs text-blue-400">
                    进度: {state.tech.progress[currentTech.id] || 0} / {currentTech.duration} 天
                  </div>
                </div>
              }
            >
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <span className="text-2xl">{currentTech.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{currentTech.name}</div>
                  <div className="w-full h-1.5 bg-slate-700 rounded-full mt-1.5">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${((state.tech.progress[currentTech.id] || 0) / currentTech.duration) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-blue-400 font-mono">
                  {Math.round(((state.tech.progress[currentTech.id] || 0) / currentTech.duration) * 100)}%
                </div>
              </div>
            </GameTooltip>
          ) : (
            <div className="text-sm text-slate-500 text-center py-4">
              暂无进行中的科技，请在科技树选择
            </div>
          )}
        </div>

        {/* 科技队列 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            科技排队 ({techQueue.length})
          </h4>
          
          {techQueue.length > 0 ? (
            <div className="space-y-2">
              {techQueue.map((techId: string, idx: number) => {
                const tech = USA_TECH_TREE.find(t => t.id === techId)
                if (!tech) return null
                return (
                  <div key={techId} className="flex items-center gap-3 p-2 bg-slate-800/50 rounded">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-400">
                      {idx + 1}
                    </span>
                    <span className="text-xl">{tech.icon}</span>
                    <div className="flex-1 text-sm">{tech.name}</div>
                    <div className="text-xs text-slate-500">{tech.duration} 天</div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-sm text-slate-500 text-center py-4">
              暂无排队科技
            </div>
          )}
        </div>

        {/* 已完成 */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            已完成国策 ({state?.focus?.completed?.length || 0})
          </h4>
          
          <div className="flex flex-wrap gap-2">
            {(state?.focus?.completed || []).slice(0, 12).map((id: string) => {
              const focus = USA_FOCUS_TREE.find(f => f.id === id)
              if (!focus) return null
              return (
                <GameTooltip
                  key={id}
                  position="auto"
                  content={
                    <div className="space-y-1 min-w-[150px]">
                      <div className="font-bold text-white">{focus.name}</div>
                      <div className="text-xs text-slate-400">{focus.description}</div>
                    </div>
                  }
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-emerald-500/20 rounded-lg border border-emerald-500/30 cursor-help hover:bg-emerald-500/30 transition-colors">
                    <span className="text-xl">{focus.icon}</span>
                  </div>
                </GameTooltip>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
