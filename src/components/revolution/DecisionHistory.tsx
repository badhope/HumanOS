import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  GitBranch,
  ArrowLeft,
  Eye,
  MessageSquare,
  Vote,
  Scroll,
  Zap,
  Users,
  Scale,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
} from 'lucide-react'

export interface GameDecision {
  id: string
  turn: number
  year: number
  type: 'dialogue' | 'vote' | 'policy' | 'violence' | 'alliance' | 'betrayal' | 'worldline'
  title: string
  description: string
  choices: Array<{
    id: string
    text: string
    selected: boolean
    consequences: string[]
  }>
  impact: {
    worldLineDivergence: number
    karmaChange: number
    npcRelationshipChanges: Record<string, { delta: number; type: string }>
    factionChanges: Record<string, number>
  }
  worldLine: string
  critical: boolean
  historicalDeviation: boolean
}

export const MOCK_DECISIONS: GameDecision[] = [
  {
    id: 'd1',
    turn: 24,
    year: 1793,
    type: 'vote',
    title: '国王审判投票',
    description: '国民公会就路易十六的最终判决进行了历史性投票。你的选择将永远改变法国的命运。',
    choices: [
      {
        id: 'c1',
        text: '投票赞成处决国王',
        selected: true,
        consequences: [
          '君主制的象征被彻底摧毁',
          '欧洲各国开始组建反法同盟',
          '保王党叛乱在旺代爆发',
          '业力 -25',
        ],
      },
      {
        id: 'c2',
        text: '支持终身监禁',
        selected: false,
        consequences: [
          '保留国王作为政治人质',
          '雅各宾派内部出现分裂',
          '避免立即的军事干预',
        ],
      },
      {
        id: 'c3',
        text: '流亡海外',
        selected: false,
        consequences: [
          '国王成为流亡政府领袖',
          '革命威信严重受损',
        ],
      },
    ],
    impact: {
      worldLineDivergence: 0.45,
      karmaChange: -25,
      npcRelationshipChanges: {
        robespierre: { delta: 0.2, type: '信任' },
        louis_xvi: { delta: -0.8, type: '仇恨' },
      },
      factionChanges: {
        雅各宾派: 0.15,
        吉伦特派: -0.1,
      },
    },
    worldLine: '弑君者线',
    critical: true,
    historicalDeviation: false,
  },
  {
    id: 'd2',
    turn: 22,
    year: 1793,
    type: 'dialogue',
    title: '与罗伯斯庇尔的秘密会面',
    description: '深夜在雅各宾俱乐部的密室中，你与不可腐蚀者进行了一次改变命运的谈话。',
    choices: [
      {
        id: 'c1',
        text: '表达对恐怖政策的担忧',
        selected: true,
        consequences: [
          '获得了罗伯斯庇尔的谨慎尊重',
          '他开始将你视为潜在的盟友',
          '丹东派对你的立场产生怀疑',
        ],
      },
      {
        id: 'c2',
        text: '极力鼓吹更激进的措施',
        selected: false,
        consequences: [
          '被认定为狂热分子',
          '圣茹斯特开始注意你',
        ],
      },
    ],
    impact: {
      worldLineDivergence: 0.12,
      karmaChange: 5,
      npcRelationshipChanges: {
        robespierre: { delta: 0.15, type: '尊重' },
        danton: { delta: -0.1, type: '怀疑' },
      },
      factionChanges: {
        雅各宾派: 0.05,
      },
    },
    worldLine: '主世界线',
    critical: false,
    historicalDeviation: false,
  },
  {
    id: 'd3',
    turn: 19,
    year: 1792,
    type: 'policy',
    title: '全面限价法令',
    description: '面对恶性通货膨胀和民众饥荒，你必须决定是否干预市场价格。',
    choices: [
      {
        id: 'c1',
        text: '支持全面价格管制',
        selected: true,
        consequences: [
          '巴黎饥荒暂时缓解',
          '黑市活动开始猖獗',
          '获得无套裤汉的支持',
          '商人阶级的强烈反对',
        ],
      },
      {
        id: 'c2',
        text: '坚持自由市场原则',
        selected: false,
        consequences: [
          '面包价格继续飞涨',
          '城市暴动风险急剧上升',
          '获得吉伦特派支持',
        ],
      },
    ],
    impact: {
      worldLineDivergence: 0.22,
      karmaChange: 15,
      npcRelationshipChanges: {
        hebert: { delta: 0.25, type: '支持' },
        brissot: { delta: -0.2, type: '反对' },
      },
      factionChanges: {
        科德利埃: 0.12,
        吉伦特派: -0.15,
      },
    },
    worldLine: '主世界线',
    critical: true,
    historicalDeviation: false,
  },
  {
    id: 'd4',
    turn: 15,
    year: 1792,
    type: 'violence',
    title: '九月屠杀的抉择',
    description: '暴民冲击监狱，一场血腥的大屠杀正在酝酿。你是否动用你的影响力来阻止它？',
    choices: [
      {
        id: 'c1',
        text: '暗中鼓励清洗反革命分子',
        selected: true,
        consequences: [
          '超过1200名囚犯被处决',
          '欧洲舆论哗然',
          '激进分子将你视为英雄',
          '温和派与你彻底决裂',
          '业力 -40',
        ],
      },
      {
        id: 'c2',
        text: '冒着风险试图阻止屠杀',
        selected: false,
        consequences: [
          '挽救了数百条生命',
          '被贴上反革命同情者标签',
          '你的生命安全受到威胁',
          '业力 +30',
        ],
      },
    ],
    impact: {
      worldLineDivergence: 0.35,
      karmaChange: -40,
      npcRelationshipChanges: {
        marat: { delta: 0.3, type: '同志情谊' },
      },
      factionChanges: {},
    },
    worldLine: '铁血线',
    critical: true,
    historicalDeviation: true,
  },
  {
    id: 'd5',
    turn: 12,
    year: 1792,
    type: 'alliance',
    title: '与吉伦特派的秘密协议',
    description: '布里索向你伸出橄榄枝，提议在对奥宣战问题上建立政治同盟。',
    choices: [
      {
        id: 'c1',
        text: '接受提议，支持战争政策',
        selected: false,
        consequences: [
          '法国提前3个月向奥地利宣战',
          '战争初期的军事灾难',
        ],
      },
      {
        id: 'c2',
        text: '拒绝并警告罗伯斯庇尔',
        selected: true,
        consequences: [
          '获得雅各宾派核心圈信任',
          '吉伦特派将你视为敌人',
          '战争推迟了2个月',
        ],
      },
    ],
    impact: {
      worldLineDivergence: 0.18,
      karmaChange: 8,
      npcRelationshipChanges: {
        brissot: { delta: -0.25, type: '敌意' },
        robespierre: { delta: 0.2, type: '信任' },
      },
      factionChanges: {
        雅各宾派: 0.1,
        吉伦特派: -0.2,
      },
    },
    worldLine: '主世界线',
    critical: false,
    historicalDeviation: true,
  },
]

interface DecisionHistoryProps {
  decisions: GameDecision[]
  onRewind?: (decisionId: string) => void
  onViewAlternatives?: (decisionId: string) => void
}

const DECISION_ICONS: Record<string, React.ReactNode> = {
  dialogue: <MessageSquare size={20} />,
  vote: <Vote size={20} />,
  policy: <Scroll size={20} />,
  violence: <Zap size={20} />,
  alliance: <Users size={20} />,
  betrayal: <AlertTriangle size={20} />,
  worldline: <GitBranch size={20} />,
}

const DECISION_COLORS: Record<string, string> = {
  dialogue: 'text-blue-400 bg-blue-900/30',
  vote: 'text-amber-400 bg-amber-900/30',
  policy: 'text-purple-400 bg-purple-900/30',
  violence: 'text-red-400 bg-red-900/30',
  alliance: 'text-emerald-400 bg-emerald-900/30',
  betrayal: 'text-orange-400 bg-orange-900/30',
  worldline: 'text-cyan-400 bg-cyan-900/30',
}

export function DecisionHistory({ decisions, onRewind, onViewAlternatives }: DecisionHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'critical' | 'deviations'>('all')

  const filteredDecisions = decisions.filter(d => {
    if (filter === 'critical') return d.critical
    if (filter === 'deviations') return d.historicalDeviation
    return true
  })

  const totalDivergence = decisions.reduce((sum, d) => sum + d.impact.worldLineDivergence, 0)
  const criticalCount = decisions.filter(d => d.critical).length

  return (
    <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-600">
      <div className="bg-gradient-to-r from-cyan-900/40 via-slate-800 to-purple-900/40 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Clock className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                决策时空
                <span className="text-sm font-normal text-slate-300">
                  共 {decisions.length} 个重大决定
                </span>
              </h2>
              <p className="text-slate-400 text-sm">
                每一个选择都在创造属于你的历史
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                {(totalDivergence * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-slate-400">世界线分歧度</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{criticalCount}</div>
              <div className="text-xs text-slate-400">关键决策</div>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="flex gap-2">
              {[
                { key: 'all', label: '全部' },
                { key: 'critical', label: '关键' },
                { key: 'deviations', label: '分歧' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filter === key
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                  onClick={() => setFilter(key as any)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
        <AnimatePresence>
          {filteredDecisions.map((decision) => (
            <motion.div
              key={decision.id}
              layout
              className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50"
            >
              <button
                className="w-full p-4 flex items-center gap-4 text-left hover:bg-slate-700/30 transition-colors"
                onClick={() => setExpandedId(expandedId === decision.id ? null : decision.id)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${DECISION_COLORS[decision.type]}`}>
                  {DECISION_ICONS[decision.type]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white">{decision.title}</h3>
                    {decision.critical && (
                      <span className="px-2 py-0.5 bg-red-900/50 text-red-400 text-xs rounded-full">
                        关键
                      </span>
                    )}
                    {decision.historicalDeviation && (
                      <span className="px-2 py-0.5 bg-purple-900/50 text-purple-400 text-xs rounded-full flex items-center gap-1">
                        <GitBranch size={10} />
                        历史分歧
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-1">
                    {decision.description}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-amber-500">{decision.year}</div>
                  <div className="text-xs text-slate-400">第 {decision.turn} 回合</div>
                </div>

                <div className="text-slate-400">
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${expandedId === decision.id ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {expandedId === decision.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 pb-4 pt-2 border-t border-slate-700/50">
                      <p className="text-slate-300 mb-4">{decision.description}</p>

                      <div className="space-y-3 mb-4">
                        {decision.choices.map((choice) => (
                          <div
                            key={choice.id}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              choice.selected
                                ? 'bg-amber-900/30 border-amber-500'
                                : 'bg-slate-700/30 border-slate-600 opacity-60'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              {choice.selected ? (
                                <CheckCircle className="text-amber-400 flex-shrink-0" size={18} />
                              ) : (
                                <HelpCircle className="text-slate-500 flex-shrink-0" size={18} />
                              )}
                              <span className={`font-medium ${
                                choice.selected ? 'text-amber-400' : 'text-slate-400'
                              }`}>
                                {choice.selected ? '你的选择：' : '未选选项：'}
                              </span>
                            </div>
                            <p className={choice.selected ? 'text-white' : 'text-slate-400'}>
                              {choice.text}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {choice.consequences.map((c, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2 py-1 rounded text-xs ${
                                    choice.selected
                                      ? 'bg-amber-900/50 text-amber-300'
                                      : 'bg-slate-600/50 text-slate-400'
                                  }`}
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-lg">
                        <div>
                          <div className="text-xs text-slate-400 mb-1">世界线分歧</div>
                          <div className="text-xl font-bold text-cyan-400">
                            {(decision.impact.worldLineDivergence * 100).toFixed(0)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">业力影响</div>
                          <div className={`text-xl font-bold ${
                            decision.impact.karmaChange >= 0 ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {decision.impact.karmaChange >= 0 ? '+' : ''}{decision.impact.karmaChange}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">所属世界线</div>
                          <div className="text-xl font-bold text-purple-400">
                            {decision.worldLine}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3">
                        {onViewAlternatives && (
                          <button
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm flex items-center gap-2 transition-colors"
                            onClick={() => onViewAlternatives(decision.id)}
                          >
                            <Eye size={16} />
                            查看分歧世界线
                          </button>
                        )}
                        {onRewind && (
                          <button
                            className="px-4 py-2 bg-red-900/50 hover:bg-red-800/50 text-red-300 rounded-lg text-sm flex items-center gap-2 transition-colors border border-red-700/50"
                            onClick={() => onRewind(decision.id)}
                          >
                            <ArrowLeft size={16} />
                            从此处回档
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
