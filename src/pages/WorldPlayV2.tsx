import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Globe,
  GitBranch,
  BarChart3,
  Scroll,
  Crown,
  Play,
  Bell,
  Target,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  MessageSquare,
  Trophy,
  Clock,
} from 'lucide-react'

import {
  StateDashboard,
  CharacterSheet,
  NetworkGraph,
  TimelineTree,
  RevolutionCard,
  TricolorBanner,
  EventToast,
  ReputationMatrix,
  DEFAULT_REPUTATIONS,
  SoulPanel,
  DEFAULT_SOUL,
  QuestSystem,
  DEFAULT_QUESTS,
  MetricGauge,
  DialogueInterface,
  AchievementSystem,
  DEFAULT_ACHIEVEMENTS,
  AchievementToast,
  type Achievement,
  DecisionHistory,
  MOCK_DECISIONS,
  QuickActions,
} from '../components/revolution'

import { DialogueEngine } from '../data/simulation-world/systems/dialogue-engine'
import type { DialogueNode, DialogueOption } from '../data/simulation-world/systems/dialogue-system'

import { NETWORK_NODES, NETWORK_EDGES } from '../components/revolution/NetworkGraph'
import { DEMO_TIMELINE_NODES } from '../components/revolution/TimelineTree'

type ViewMode = 'dashboard' | 'characters' | 'network' | 'timeline' | 'reputation' | 'soul' | 'quests' | 'achievements' | 'decisions' | 'events'

interface GameEvent {
  id: string
  type: 'revolution' | 'death' | 'law' | 'discovery' | 'betrayal'
  title: string
  message: string
  turn: number
}

interface PlayerStats {
  politicalCapital: number
  influence: number
  prestige: number
  suspicion: number
  charisma: number
}

interface EconomicData {
  gdp: number
  gdpGrowth: number
  inflationRate: number
  unemploymentRate: number
  giniCoefficient: number
  businessCycle: string
  commodities: Array<{ name: string; price: number; change: number }>
}

interface PoliticalData {
  unrest: number
  regimeLegitimacy: number
  factions: Array<{ name: string; support: number; color: string }>
  lawsInEffect: string[]
}

const MOCK_ECONOMIC_STATE: EconomicData = {
  gdp: 1250,
  gdpGrowth: 0.08,
  inflationRate: 0.06,
  unemploymentRate: 0.12,
  giniCoefficient: 0.65,
  businessCycle: 'expansion',
  commodities: [
    { name: '小麦', price: 0.85, change: 0.12 },
    { name: '面包', price: 1.1, change: 0.08 },
    { name: '葡萄酒', price: 2.2, change: -0.03 },
    { name: '布匹', price: 1.5, change: 0.05 },
    { name: '铁器', price: 1.8, change: 0.02 },
    { name: '煤炭', price: 0.6, change: -0.01 },
  ],
}

const MOCK_POLITICAL_STATE: PoliticalData = {
  unrest: 0.35,
  regimeLegitimacy: 0.55,
  factions: [
    { name: '雅各宾派', support: 0.45, color: '#CE1126' },
    { name: '吉伦特派', support: 0.35, color: '#002654' },
    { name: '君主立宪派', support: 0.5, color: '#D4AF37' },
    { name: '科德利埃', support: 0.25, color: '#FF4500' },
    { name: '斐扬派', support: 0.3, color: '#4A5568' },
  ],
  lawsInEffect: ['全面限价法令', '全民皆兵法令', '嫌疑犯法令'],
}

const MOCK_CHARACTERS = [
  {
    id: 'robespierre',
    template: {
      id: 'robespierre',
      name: '马克西米连·罗伯斯庇尔',
      portrait: '👨‍⚖️',
      title: '雅各宾派领袖 | 不可腐蚀者',
    },
    personality: {
      openness: 0.4,
      conscientiousness: 0.95,
      extraversion: 0.3,
      agreeableness: 0.2,
      neuroticism: 0.7,
    },
    motives: [
      { type: '德行共和', intensity: 0.95 },
      { type: '消灭腐败', intensity: 0.9 },
      { type: '保护人民', intensity: 0.85 },
      { type: '个人权力', intensity: 0.3 },
    ],
    agendas: [
      { id: 'a1', title: '建立美德共和国', description: '清除一切革命的敌人', secrecy: 2, progress: 0.4 },
      { id: 'a2', title: '处决丹东派', description: '消灭腐化的革命投机者', secrecy: 5, progress: 0.7 },
      { id: 'a3', title: '最高主宰崇拜', description: '建立新的公民宗教', secrecy: 3, progress: 0.2 },
    ],
  },
  {
    id: 'danton',
    template: {
      id: 'danton',
      name: '乔治·丹东',
      portrait: '🎤',
      title: '科德利埃英雄 | 人民的演说家',
    },
    personality: {
      openness: 0.7,
      conscientiousness: 0.4,
      extraversion: 0.95,
      agreeableness: 0.6,
      neuroticism: 0.3,
    },
    motives: [
      { type: '革命成功', intensity: 0.8 },
      { type: '个人财富', intensity: 0.7 },
      { type: '结束恐怖', intensity: 0.85 },
      { type: '保护同志', intensity: 0.75 },
    ],
    agendas: [
      { id: 'a1', title: '结束恐怖统治', description: '恢复法治与宽容', secrecy: 1, progress: 0.5 },
      { id: 'a2', title: '与吉伦特派和解', description: '结束革命内斗', secrecy: 2, progress: 0.3 },
    ],
  },
  {
    id: 'louis_xvi',
    template: {
      id: 'louis_xvi',
      name: '路易十六',
      portrait: '👑',
      title: '法兰西国王 | 锁匠国王',
    },
    personality: {
      openness: 0.3,
      conscientiousness: 0.6,
      extraversion: 0.2,
      agreeableness: 0.5,
      neuroticism: 0.8,
    },
    motives: [
      { type: '保护王权', intensity: 0.95 },
      { type: '保护家人', intensity: 0.9 },
      { type: '维持稳定', intensity: 0.7 },
      { type: '改革国家', intensity: 0.4 },
    ],
    agendas: [
      { id: 'a1', title: '联系奥地利', description: '请求军事干涉', secrecy: 5, progress: 0.6 },
      { id: 'a2', title: '逃离巴黎', description: '前往旺代组织保王军', secrecy: 5, progress: 0.8 },
    ],
  },
  {
    id: 'marat',
    template: {
      id: 'marat',
      name: '让-保尔·马拉',
      portrait: '📰',
      title: '人民之友 | 革命记者',
    },
    personality: {
      openness: 0.5,
      conscientiousness: 0.8,
      extraversion: 0.4,
      agreeableness: 0.3,
      neuroticism: 0.9,
    },
    motives: [
      { type: '揭露腐败', intensity: 0.95 },
      { type: '人民代言人', intensity: 0.9 },
      { type: '消灭贵族', intensity: 0.85 },
    ],
    agendas: [
      { id: 'a1', title: '人民之友报', description: '持续出版革命报纸', secrecy: 1, progress: 0.9 },
    ],
  },
  {
    id: 'marie_antoinette',
    template: {
      id: 'marie_antoinette',
      name: '玛丽·安托瓦内特',
      portrait: '👸',
      title: '法兰西王后 | 赤字夫人',
    },
    personality: {
      openness: 0.6,
      conscientiousness: 0.3,
      extraversion: 0.8,
      agreeableness: 0.4,
      neuroticism: 0.6,
    },
    motives: [
      { type: '保护家人', intensity: 0.95 },
      { type: '奢华生活', intensity: 0.8 },
      { type: '恢复王权', intensity: 0.9 },
    ],
    agendas: [
      { id: 'a1', title: '联系母国奥地利', description: '请求军事援助', secrecy: 5, progress: 0.7 },
    ],
  },
  {
    id: 'brissot',
    template: {
      id: 'brissot',
      name: '雅克·布里索',
      portrait: '📜',
      title: '吉伦特派领袖 | 战争鼓吹者',
    },
    personality: {
      openness: 0.8,
      conscientiousness: 0.7,
      extraversion: 0.6,
      agreeableness: 0.5,
      neuroticism: 0.4,
    },
    motives: [
      { type: '输出革命', intensity: 0.9 },
      { type: '建立共和国', intensity: 0.85 },
      { type: '温和改革', intensity: 0.7 },
    ],
    agendas: [
      { id: 'a1', title: '对奥宣战', description: '通过战争输出革命', secrecy: 2, progress: 0.6 },
    ],
  },
  {
    id: 'saint_just',
    template: {
      id: 'saint_just',
      name: '圣茹斯特',
      portrait: '⚔️',
      title: '恐怖的大天使 | 革命执政官',
    },
    personality: {
      openness: 0.3,
      conscientiousness: 0.95,
      extraversion: 0.5,
      agreeableness: 0.1,
      neuroticism: 0.5,
    },
    motives: [
      { type: '革命纯洁', intensity: 0.95 },
      { type: '支持罗伯斯庇尔', intensity: 0.95 },
      { type: '军事胜利', intensity: 0.8 },
    ],
    agendas: [
      { id: 'a1', title: '建立革命军队', description: '清洗军队中的反革命分子', secrecy: 3, progress: 0.4 },
    ],
  },
  {
    id: 'hebert',
    template: {
      id: 'hebert',
      name: '雅克·埃贝尔',
      portrait: '🔥',
      title: '愤怒者领袖 | 无神论者',
    },
    personality: {
      openness: 0.5,
      conscientiousness: 0.4,
      extraversion: 0.9,
      agreeableness: 0.3,
      neuroticism: 0.7,
    },
    motives: [
      { type: '激进化', intensity: 0.9 },
      { type: '消灭基督教', intensity: 0.95 },
      { type: '底层利益', intensity: 0.85 },
    ],
    agendas: [
      { id: 'a1', title: '理性崇拜', description: '建立无神论的革命宗教', secrecy: 2, progress: 0.5 },
    ],
  },
  {
    id: 'talleyrand',
    template: {
      id: 'talleyrand',
      name: '塔列朗',
      portrait: '🦊',
      title: '变色龙主教 | 外交大师',
    },
    personality: {
      openness: 0.9,
      conscientiousness: 0.6,
      extraversion: 0.7,
      agreeableness: 0.5,
      neuroticism: 0.2,
    },
    motives: [
      { type: '保存自身', intensity: 0.95 },
      { type: '国家利益', intensity: 0.7 },
      { type: '权力平衡', intensity: 0.85 },
    ],
    agendas: [
      { id: 'a1', title: '多方下注', description: '同时与所有派系保持联系', secrecy: 5, progress: 0.9 },
    ],
  },
  {
    id: 'vergniaud',
    template: {
      id: 'vergniaud',
      name: '皮埃尔·韦尼奥',
      portrait: '⚖️',
      title: '吉伦特派雄辩家',
    },
    personality: {
      openness: 0.7,
      conscientiousness: 0.6,
      extraversion: 0.8,
      agreeableness: 0.6,
      neuroticism: 0.5,
    },
    motives: [
      { type: '法治', intensity: 0.85 },
      { type: '议会主权', intensity: 0.8 },
      { type: '保护私有财产', intensity: 0.75 },
    ],
    agendas: [
      { id: 'a1', title: '捍卫宪法', description: '反对雅各宾派的越权行为', secrecy: 2, progress: 0.4 },
    ],
  },
  {
    id: 'couthon',
    template: {
      id: 'couthon',
      name: '乔治·库东',
      portrait: '♿',
      title: '罗伯斯庇尔的右臂',
    },
    personality: {
      openness: 0.2,
      conscientiousness: 0.9,
      extraversion: 0.3,
      agreeableness: 0.4,
      neuroticism: 0.4,
    },
    motives: [
      { type: '忠诚罗伯斯庇尔', intensity: 0.95 },
      { type: '革命信仰', intensity: 0.9 },
      { type: '消灭反对派', intensity: 0.85 },
    ],
    agendas: [
      { id: 'a1', title: '牧月法令', description: '加速革命法庭审判程序', secrecy: 3, progress: 0.6 },
    ],
  },
  {
    id: 'philippe',
    template: {
      id: 'philippe',
      name: '菲利普·平等',
      portrait: '🗡️',
      title: '奥尔良公爵 | 王位觊觎者',
    },
    personality: {
      openness: 0.6,
      conscientiousness: 0.5,
      extraversion: 0.6,
      agreeableness: 0.3,
      neuroticism: 0.6,
    },
    motives: [
      { type: '夺取王位', intensity: 0.95 },
      { type: '维持身份', intensity: 0.7 },
      { type: '操纵局势', intensity: 0.9 },
    ],
    agendas: [
      { id: 'a1', title: '成为国王', description: '在混乱中登上王位', secrecy: 5, progress: 0.5 },
    ],
  },
]

const MOCK_EVENTS: GameEvent[] = [
  { id: 'e1', type: 'law', title: '🎯 表决通过', message: '你成功推动了限价法令通过', turn: 23 },
  { id: 'e2', type: 'discovery', title: '🔮 因果连锁', message: '马拉遇刺，科黛的审判将在3回合后开始...', turn: 21 },
  { id: 'e3', type: 'revolution', title: '⚡ 粮食暴动', message: '巴黎第5区发生骚乱，50人被捕', turn: 20 },
  { id: 'e4', type: 'betrayal', title: '⚠️ 军队动向', message: '普奥联军在边境集结，战争临近', turn: 18 },
  { id: 'e5', type: 'law', title: '📜 历史抉择', message: '国王审判即将到来，准备你的投票', turn: 15 },
  { id: 'e6', type: 'death', title: '💀 重要死亡', message: '米拉波伯爵因纵欲过度去世', turn: 12 },
]

const DEFAULT_PLAYER_STATS: PlayerStats = {
  politicalCapital: 45,
  influence: 38,
  prestige: 52,
  suspicion: 22,
  charisma: 65,
}

const VIEW_CONFIG: Array<{ mode: ViewMode; label: string; icon: React.ReactNode }> = [
  { mode: 'dashboard', label: '国家状态', icon: <BarChart3 size={18} /> },
  { mode: 'characters', label: '人物', icon: <Users size={18} /> },
  { mode: 'network', label: '关系网', icon: <Globe size={18} /> },
  { mode: 'timeline', label: '世界线', icon: <GitBranch size={18} /> },
  { mode: 'reputation', label: '声望', icon: <Crown size={18} /> },
  { mode: 'soul', label: '灵魂', icon: <Sparkles size={18} /> },
  { mode: 'quests', label: '任务', icon: <Target size={18} /> },
  { mode: 'achievements', label: '成就', icon: <Trophy size={18} /> },
  { mode: 'decisions', label: '决策', icon: <Clock size={18} /> },
  { mode: 'events', label: '日志', icon: <Scroll size={18} /> },
]

export default function WorldPlayV2() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [turn, setTurn] = useState(25)
  const [year, setYear] = useState(1793)
  const [selectedNpc, setSelectedNpc] = useState<string | null>(null)
  const [events, setEvents] = useState<GameEvent[]>(MOCK_EVENTS)
  const [toast, setToast] = useState<GameEvent | null>(null)
  const [investigationLevel] = useState(3)
  const [playerStats, setPlayerStats] = useState<PlayerStats>(DEFAULT_PLAYER_STATS)
  const [reputations, setReputations] = useState(DEFAULT_REPUTATIONS)
  const [soul, setSoul] = useState(DEFAULT_SOUL)
  const [quests] = useState(DEFAULT_QUESTS)

  const [activeDialogue, setActiveDialogue] = useState<DialogueNode | null>(null)
  const [dialoguePartner, setDialoguePartner] = useState<string | null>(null)
  const [npcRelationships, setNpcRelationships] = useState<Record<string, {
    trust: number; affection: number; respect: number; fear: number
  }>>(() => {
    const rels: Record<string, any> = {}
    MOCK_CHARACTERS.forEach(c => {
      rels[c.id] = {
        trust: 0.3 + Math.random() * 0.3,
        affection: 0.2 + Math.random() * 0.3,
        respect: 0.4 + Math.random() * 0.3,
        fear: 0.1 + Math.random() * 0.2,
      }
    })
    return rels
  })
  const [achievements, setAchievements] = useState(DEFAULT_ACHIEVEMENTS)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)
  const [decisions] = useState(MOCK_DECISIONS)

  const currentNpc = MOCK_CHARACTERS.find(c => c.id === selectedNpc) || null

  const startDialogue = useCallback((npcId: string) => {
    const npc = MOCK_CHARACTERS.find(c => c.id === npcId)
    if (!npc) return

    const engine = new DialogueEngine({
      speakerId: npcId,
      speakerName: npc.template.name,
      listenerId: 'player',
      relationship: npcRelationships[npcId],
      personality: npc.personality,
      contextTags: ['meeting', 'revolution', '1793'],
      year,
      turn,
    })

    const greeting = engine.generateGreeting()
    setActiveDialogue(greeting)
    setDialoguePartner(npcId)
  }, [npcRelationships, reputations, soul, year, turn])

  const handleDialogueChoice = useCallback((option: DialogueOption) => {
    if (!dialoguePartner) return

    const npc = MOCK_CHARACTERS.find(c => c.id === dialoguePartner)
    if (!npc) return

    const engine = new DialogueEngine({
      speakerId: dialoguePartner,
      speakerName: npc.template.name,
      listenerId: 'player',
      relationship: npcRelationships[dialoguePartner],
      personality: npc.personality,
      contextTags: activeDialogue?.context || [],
      year,
      turn,
    })

    const result = engine.processChoice(option)

    result.consequences.forEach(consequence => {
      if (!consequence.delayed) {
        if (consequence.target === 'relationship') {
          setNpcRelationships(prev => ({
            ...prev,
            [dialoguePartner]: {
              trust: Math.max(0, Math.min(1, prev[dialoguePartner].trust + consequence.delta)),
              affection: Math.max(0, Math.min(1, prev[dialoguePartner].affection + consequence.delta * 0.5)),
              respect: Math.max(0, Math.min(1, prev[dialoguePartner].respect + consequence.delta * 0.5)),
              fear: Math.max(0, Math.min(1, prev[dialoguePartner].fear - consequence.delta * 0.3)),
            },
          }))
        }
        if (consequence.target === 'karma') {
          setSoul(prev => ({
            ...prev,
            karma: Math.max(0, Math.min(100, prev.karma + consequence.delta)),
          }))
        }
        if (consequence.target === 'reputation') {
          setReputations(prev => {
            const updated = { ...prev }
            Object.keys(updated).forEach(key => {
              if (typeof updated[key] === 'object') {
                Object.keys(updated[key]).forEach(subKey => {
                  updated[key][subKey] = Math.max(0, Math.min(1, updated[key][subKey] + consequence.delta))
                })
              }
            })
            return updated
          })
        }
        if (consequence.target === 'faction') {
          setPlayerStats(prev => ({
            ...prev,
            influence: Math.max(0, Math.min(100, prev.influence + consequence.delta * 50)),
          }))
        }
      } else {
        const delayedEvent: GameEvent = {
          id: `delay-${Date.now()}`,
          type: consequence.target === 'plot' ? 'betrayal' : 'discovery',
          title: consequence.target === 'plot' ? '🔮 因果连锁' : '📜 延迟影响',
          message: consequence.description,
          turn: turn + consequence.delayTurns,
        }
        setTimeout(() => {
          setEvents(prev => [delayedEvent, ...prev])
          setToast(delayedEvent)
          setTimeout(() => setToast(null), 4000)
        }, 1000)
      }
    })

    if (result.nextDialogue && !option.unlocks.includes('end_conversation') && !option.unlocks.includes('end_conversation_angry')) {
      setActiveDialogue(result.nextDialogue)
    } else {
      setActiveDialogue(null)
      setDialoguePartner(null)
    }

    const event: GameEvent = {
      id: `conv-${Date.now()}`,
      type: result.success ? 'discovery' : 'betrayal',
      title: result.success ? '✅ 对话成功' : '❌ 对话失败',
      message: `与${npc.template.name}的会面${result.success ? '进展顺利' : '出现波折'}`,
      turn,
    }
    setEvents(prev => [event, ...prev].slice(0, 20))
  }, [dialoguePartner, npcRelationships, reputations, soul, activeDialogue, year, turn])

  const advanceTurn = useCallback(() => {
    setTurn(t => t + 1)
    if ((turn + 1) % 12 === 0) {
      setYear(y => y + 1)
    }

    const randomEvent = MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)]
    const newEvent = { ...randomEvent, id: `e-${Date.now()}`, turn: turn + 1 }
    setEvents(prev => [newEvent, ...prev].slice(0, 20))
    setToast(newEvent)

    setTimeout(() => setToast(null), 4000)

    setPlayerStats(stats => ({
      ...stats,
      politicalCapital: Math.max(0, Math.min(100, stats.politicalCapital + Math.floor(Math.random() * 7) - 3)),
      influence: Math.max(0, Math.min(100, stats.influence + Math.floor(Math.random() * 5) - 2)),
      suspicion: Math.max(0, Math.min(100, stats.suspicion + Math.floor(Math.random() * 5) - 2)),
    }))
  }, [turn])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex">
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 220 : 72 }}
        className="bg-slate-800/60 border-r border-slate-700 flex-shrink-0"
      >
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Crown className="text-amber-500" size={24} />
              <span className="font-bold text-white">HumanOS</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Menu size={18} />
          </button>
        </div>

        <div className="p-3 space-y-1">
          {VIEW_CONFIG.map(({ mode, label, icon }) => (
            <button
              key={mode}
              className={`
                w-full px-3 py-2.5 rounded-lg font-medium text-sm flex items-center gap-3 transition-all
                ${currentView === mode
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50'
                }
              `}
              onClick={() => setCurrentView(mode)}
            >
              {icon}
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">{label}</span>
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          ))}
        </div>

        {sidebarOpen && (
          <div className="p-3 mt-4 border-t border-slate-700">
            <div className="text-xs text-slate-400 mb-3">玩家属性</div>
            <div className="space-y-2">
              <MetricGauge label="政治资本" value={playerStats.politicalCapital / 100} color="gold" />
              <MetricGauge label="影响力" value={playerStats.influence / 100} color="blue" />
              <MetricGauge label="嫌疑度" value={playerStats.suspicion / 100} color="red" />
            </div>
          </div>
        )}
      </motion.div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-slate-800/80 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-40">
          <div className="px-6 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">
                {VIEW_CONFIG.find(v => v.mode === currentView)?.label}
              </h1>
              <div className="text-xs text-slate-400">HumanOS 大革命 · 元宇宙 v2.5</div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">{year}</div>
                <div className="text-xs text-slate-400">第 {turn} 回合</div>
              </div>

              <div className="w-px h-10 bg-slate-700" />

              <div className="text-center">
                <div className="text-xl font-bold flex items-center gap-1">
                  <span className={soul.karma > 60 ? 'text-amber-400' : soul.karma > 30 ? 'text-slate-300' : 'text-red-400'}>
                    {soul.karma}
                  </span>
                </div>
                <div className="text-xs text-slate-400">业力值</div>
              </div>

              <div className="w-px h-10 bg-slate-700" />

              <button
                className="px-6 py-3 bg-gradient-to-r from-red-700 via-white to-blue-700 text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-red-900/30"
                onClick={advanceTurn}
              >
                <Play size={18} />
                下一回合
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === 'dashboard' && (
                <StateDashboard
                  economicState={MOCK_ECONOMIC_STATE}
                  politicalState={MOCK_POLITICAL_STATE}
                  year={year}
                  turn={turn}
                />
              )}

              {currentView === 'characters' && (
                <div className="space-y-6">
                  <TricolorBanner
                    title="历史人物档案"
                    subtitle={`${MOCK_CHARACTERS.length} 位关键人物正在影响革命进程`}
                    icon={<Users size={24} />}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {MOCK_CHARACTERS.map((char) => (
                      <RevolutionCard
                        key={char.id}
                        variant="parchment"
                        glow={selectedNpc === char.id}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{char.template.portrait}</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm truncate">{char.template.name}</h3>
                            <p className="text-xs text-slate-600 truncate">{char.template.title}</p>
                            <div className="flex gap-1 mt-2 flex-wrap">
                              {char.motives.slice(0, 2).map((m, idx) => (
                                <span key={idx} className="text-[10px] bg-amber-700/20 text-amber-800 px-1.5 py-0.5 rounded truncate max-w-full">
                                  {m.type}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-200 flex gap-2">
                          <button
                            className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded transition-colors"
                            onClick={() => setSelectedNpc(char.id)}
                          >
                            查看档案
                          </button>
                          <button
                            className="flex-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs rounded transition-colors flex items-center justify-center gap-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              startDialogue(char.id)
                            }}
                          >
                            <MessageSquare size={12} />
                            对话
                          </button>
                        </div>
                      </RevolutionCard>
                    ))}
                  </div>
                </div>
              )}

              {currentView === 'network' && (
                <NetworkGraph
                  nodes={NETWORK_NODES}
                  edges={NETWORK_EDGES}
                  onNodeClick={setSelectedNpc}
                  selectedNode={selectedNpc || undefined}
                />
              )}

              {currentView === 'timeline' && (
                <TimelineTree
                  nodes={DEMO_TIMELINE_NODES}
                  currentNodeId="t6"
                  onRewind={(id) => alert(`准备回档到节点: ${id}`)}
                  onSwitchTimeline={(id) => alert(`准备切换到世界线: ${id}`)}
                />
              )}

              {currentView === 'reputation' && (
                <ReputationMatrix reputations={reputations} />
              )}

              {currentView === 'soul' && (
                <div className="max-w-2xl mx-auto">
                  <SoulPanel soul={soul} />
                </div>
              )}

              {currentView === 'quests' && (
                <QuestSystem quests={quests} />
              )}

              {currentView === 'achievements' && (
                <AchievementSystem achievements={achievements} />
              )}

              {currentView === 'decisions' && (
                <DecisionHistory
                  decisions={decisions}
                  onRewind={(id) => alert(`准备回档到决策点: ${id}\n\n此功能将允许你改变历史选择！`)}
                  onViewAlternatives={(id) => alert(`查看决策 ${id} 的平行世界线分支`)}
                />
              )}

              {currentView === 'events' && (
                <div className="bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-600">
                  <TricolorBanner
                    title="因果事件日志"
                    subtitle={`共记录 ${events.length} 个事件，蝴蝶效应正在上演`}
                    icon={<Bell size={24} />}
                  />
                  <div className="p-4 space-y-3">
                    {events.map((event) => (
                      <EventToast
                        key={event.id}
                        type={event.type}
                        title={event.title}
                        message={event.message}
                        turn={event.turn}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {selectedNpc && currentNpc && (
          <CharacterSheet
            character={currentNpc}
            archetype={
              selectedNpc === 'robespierre' ? 'the_machiavellian'
              : selectedNpc === 'danton' ? 'the_hothead'
              : selectedNpc === 'saint_just' ? 'the_idealist'
              : selectedNpc === 'louis_xvi' ? 'the_corrupt'
              : selectedNpc === 'talleyrand' ? 'the_machiavellian'
              : 'the_leader'
            }
            recentMemories={[
              { id: 'm1', turn: 25, content: '你向他询问了关于革命前途的看法', importance: 3 },
              { id: 'm2', turn: 23, content: '在雅各宾俱乐部与他发生争论', importance: 5 },
              { id: 'm3', turn: 18, content: '第一次在制宪议会上见面', importance: 2 },
            ]}
            investigationLevel={investigationLevel}
            onDialogue={() => {
              startDialogue(selectedNpc)
              setSelectedNpc(null)
            }}
            onClose={() => setSelectedNpc(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-4 z-50 w-80"
          >
            <EventToast
              type={toast.type}
              title={toast.title}
              message={toast.message}
              turn={toast.turn}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeDialogue && dialoguePartner && (
          <DialogueInterface
            dialogue={activeDialogue}
            npcData={MOCK_CHARACTERS.find(c => c.id === dialoguePartner)?.template || null}
            relationship={npcRelationships[dialoguePartner]}
            onSelectOption={handleDialogueChoice}
            onClose={() => {
              setActiveDialogue(null)
              setDialoguePartner(null)
            }}
          />
        )}
      </AnimatePresence>

      <QuickActions
        onNavigate={(view) => setCurrentView(view as ViewMode)}
        onStartDialogue={startDialogue}
        currentNpcs={MOCK_CHARACTERS.map(c => ({
          id: c.id,
          name: c.template.name,
          portrait: c.template.portrait,
        }))}
      />

      <AnimatePresence>
        {newAchievement && (
          <AchievementToast achievement={newAchievement} />
        )}
      </AnimatePresence>
    </div>
  )
}
