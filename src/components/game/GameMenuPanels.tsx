import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Users, DollarSign, Building2, Scale, Vote, BookOpen, BarChart3 } from 'lucide-react'

interface MenuPanelsProps {
  activeCategory: string | null
  onSelectTab: (tabId: string, centerMode: string) => void
  state: any
}

const MENU_TABS: Record<string, Array<{
  id: string
  name: string
  icon: string
  centerMode: string
  description: string
}>> = {
  politics: [
    { id: 'focus_tree', name: '国策树', icon: '🌳', centerMode: 'focus_tree', description: '选择国家发展路线' },
    { id: 'interest_groups', name: '利益集团', icon: '🎯', centerMode: 'interest_groups', description: '6大派系政治博弈' },
    { id: 'decrees', name: '总统法令', icon: '📜', centerMode: 'decrees', description: '动用紧急行政权力' },
    { id: 'government', name: '内阁', icon: '👔', centerMode: 'cabinet', description: '任命政府官员' },
    { id: 'congress', name: '国会', icon: '🏛️', centerMode: 'congress', description: '推动立法通过' },
    { id: 'elections', name: '选举', icon: '🗳️', centerMode: 'electoral_map', description: '2020大选倒计时' },
  ],
  economy: [
    { id: 'budget', name: '联邦预算', icon: '💰', centerMode: 'budget_chart', description: '收支与赤字' },
    { id: 'industry', name: '工业结构', icon: '🏭', centerMode: 'industry_map', description: '各州产能分布' },
    { id: 'fed', name: '美联储', icon: '🏦', centerMode: 'monetary_policy', description: '利率与货币政策' },
    { id: 'trade', name: '国际贸易', icon: '🌐', centerMode: 'trade_network', description: '关税与贸易战' },
  ],
  diplomacy: [
    { id: 'relations', name: '国际关系', icon: '🤝', centerMode: 'world_map', description: '全球外交关系' },
    { id: 'alliances', name: '军事同盟', icon: '🔗', centerMode: 'alliance_map', description: '北约与盟友' },
    { id: 'sanctions', name: '制裁工具', icon: '💥', centerMode: 'sanctions', description: '经济制裁权力' },
    { id: 'treaties', name: '国际条约', icon: '📜', centerMode: 'treaties', description: '条约与协定' },
  ],
  military: [
    { id: 'forces', name: '武装力量', icon: '🎖️', centerMode: 'military_map', description: '三军实力' },
    { id: 'doctrine', name: '军事学说', icon: '📖', centerMode: 'doctrine', description: '作战理论' },
    { id: 'production', name: '军工生产', icon: '⚙️', centerMode: 'production', description: '国防工业' },
    { id: 'deployments', name: '全球部署', icon: '🌍', centerMode: 'deploy_map', description: '海外驻军' },
  ],
  research: [
    { id: 'tech_tree', name: '科技树', icon: '🔬', centerMode: 'tech_tree', description: '科技研发路线' },
    { id: 'queue', name: '研究队列', icon: '📋', centerMode: 'research_queue', description: '当前研究项目' },
    { id: 'projects', name: '重大工程', icon: '🚀', centerMode: 'mega_projects', description: '国家级项目' },
  ],
  society: [
    { id: 'population', name: '人口统计', icon: '👥', centerMode: 'demographics', description: '人口结构变化' },
    { id: 'culture', name: '文化战争', icon: '🎭', centerMode: 'culture_war', description: '意识形态斗争' },
    { id: 'welfare', name: '社会福利', icon: '🏥', centerMode: 'welfare', description: '医保与社保' },
    { id: 'justice', name: '司法部', icon: '⚖️', centerMode: 'justice', description: '最高法院与司法' },
  ],
}

export default function GameMenuPanels({ activeCategory, onSelectTab, state }: MenuPanelsProps) {
  if (!activeCategory || !MENU_TABS[activeCategory]) {
    return (
      <div className="p-4 text-center text-slate-500 text-sm">
        点击左侧图标展开菜单
      </div>
    )
  }

  const tabs = MENU_TABS[activeCategory]

  return (
    <div className="h-full flex flex-col">
      <AnimatePresence mode="popLayout">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectTab(tab.id, tab.centerMode)}
            className="w-full p-3 hover:bg-white/10 rounded-lg text-left transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{tab.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-sm group-hover:text-white transition-colors">
                  {tab.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  {tab.description}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
            </div>
          </motion.button>
        ))}
      </AnimatePresence>

      <div className="mt-auto pt-4 border-t border-white/5">
        <QuickStats category={activeCategory} state={state} />
      </div>
    </div>
  )
}

function QuickStats({ category, state }: { category: string; state: any }) {
  const stats: Record<string, Array<{ label: string; value: string; trend?: string }>> = {
    politics: [
      { label: '支持率', value: `${Math.round(state.political?.approval || 42)}%`, trend: '-2' },
      { label: '稳定度', value: `${Math.round(state.political?.stability || 76)}%` },
      { label: '政治点', value: `${Math.round(state.political?.politicalCapital || 100)}` },
    ],
    economy: [
      { label: 'GDP增长', value: '+2.9%' },
      { label: '通胀率', value: `${(state.economy?.inflation * 100 || 1.8).toFixed(1)}%` },
      { label: '失业率', value: `${(state.economy?.unemployment * 100 || 4.0).toFixed(1)}%` },
    ],
    diplomacy: [
      { label: '盟友', value: '48国' },
      { label: '敌对', value: '5国' },
      { label: '制裁中', value: '12国' },
    ],
    military: [
      { label: '军费', value: '$716B' },
      { label: '现役', value: '134万' },
      { label: '海外基地', value: '800+' },
    ],
    research: [
      { label: '研发投入', value: '$580B' },
      { label: '进行中', value: '3项' },
      { label: '已完成', value: '12项' },
    ],
    society: [
      { label: '总人口', value: '3.28亿' },
      { label: '左翼倾向', value: '47%' },
      { label: '右翼倾向', value: '46%' },
    ],
  }

  return (
    <div className="space-y-2">
      {stats[category]?.map(stat => (
        <div key={stat.label} className="flex items-center justify-between text-xs">
          <span className="text-slate-500">{stat.label}</span>
          <span className="font-mono text-slate-300">
            {stat.value}
            {stat.trend && (
              <span className={`ml-1 ${stat.trend.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>
                {stat.trend}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  )
}
