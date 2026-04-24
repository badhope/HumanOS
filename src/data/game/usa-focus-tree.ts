export interface FocusNode {
  id: string
  name: string
  icon: string
  description: string
  category: 'populist' | 'establishment' | 'militarist' | 'progressive'
  duration: number
  x: number
  y: number
  requires: string[]
  mutuallyExclusive: string[]
  oneTime: boolean
  effects: {
    approval?: number
    stability?: number
    politicalCapital?: number
    inflation?: number
    gdpGrowth?: number
  }
  groupOpinion: Record<string, number>
  completionEvent?: string
}

export interface FocusState {
  current: string | null
  progress: number
  completed: string[]
  available: string[]
  blocked: string[]
}

export const USA_FOCUS_TREE: FocusNode[] = [
  {
    id: 'populist_root',
    name: '人民的总统',
    icon: '🦅',
    description: '你是人民的选择，不是华盛顿的选择。 drain the swamp！',
    category: 'populist',
    duration: 7,
    x: 0,
    y: 0,
    requires: [],
    mutuallyExclusive: ['establishment_root'],
    oneTime: true,
    effects: { approval: 8, stability: 3 },
    groupOpinion: { nationalist_populists: 15, media_establishment: -10 },
  },
  {
    id: 'populist_media_war',
    name: '向假新闻宣战',
    icon: '📺',
    description: 'CNN和MSNBC是美国人民的敌人。开通每日推特风暴！',
    category: 'populist',
    duration: 14,
    x: 0,
    y: 1,
    requires: ['populist_root'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 5, stability: -5, politicalCapital: 25 },
    groupOpinion: { nationalist_populists: 20, media_establishment: -25 },
  },
  {
    id: 'populist_build_wall',
    name: '建造边境墙',
    icon: '🧱',
    description: '我们要在南部边境建一堵伟大的墙，而且墨西哥会付钱！',
    category: 'populist',
    duration: 28,
    x: -1,
    y: 2,
    requires: ['populist_media_war'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 10, stability: 5 },
    groupOpinion: { nationalist_populists: 25, labor_unions: 10, silicon_valley: -15 },
  },
  {
    id: 'populist_drain_swamp',
    name: '抽干华盛顿沼泽',
    icon: '🐊',
    description: '解雇所有第五纵队。解雇所有奥巴马的人。让官僚机构流血！',
    category: 'populist',
    duration: 35,
    x: 1,
    y: 2,
    requires: ['populist_media_war'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 12, stability: -15, politicalCapital: 50 },
    groupOpinion: { nationalist_populists: 30, military_industrial: -20, media_establishment: -20 },
  },
  {
    id: 'populist_tariffs',
    name: '美国优先贸易战',
    icon: '💵',
    description: '对所有进口商品征收25%关税。让制造业回家！',
    category: 'populist',
    duration: 21,
    x: -1,
    y: 3,
    requires: ['populist_build_wall'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 7, inflation: 1.5 },
    groupOpinion: { nationalist_populists: 20, industrialists: 15, labor_unions: 15, silicon_valley: -20 },
  },
  {
    id: 'populist_purge_deepstate',
    name: '清洗深层政府',
    icon: '🔫',
    description: 'CIA、FBI、NSA——这些人不属于这个国家。大清洗开始了。',
    category: 'populist',
    duration: 42,
    x: 0,
    y: 4,
    requires: ['populist_drain_swamp', 'populist_tariffs'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 15, stability: -30, politicalCapital: 80 },
    groupOpinion: { nationalist_populists: 40, military_industrial: -40, media_establishment: -35 },
  },
  {
    id: 'populist_total_control',
    name: '民选独裁者',
    icon: '👑',
    description: '第四个任期。第五个任期。人民希望你永远执政。宪法是个建议。',
    category: 'populist',
    duration: 56,
    x: 0,
    y: 5,
    requires: ['populist_purge_deepstate'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 20, stability: -40 },
    groupOpinion: { nationalist_populists: 50, military_industrial: -50, media_establishment: -50, industrialists: -30 },
    completionEvent: 'populist_dictatorship',
  },

  {
    id: 'establishment_root',
    name: '回归常态',
    icon: '🎩',
    description: '让成年人重新掌权。华盛顿的正常运作。',
    category: 'establishment',
    duration: 7,
    x: 4,
    y: 0,
    requires: [],
    mutuallyExclusive: ['populist_root'],
    oneTime: true,
    effects: { approval: 3, stability: 10 },
    groupOpinion: { media_establishment: 15, industrialists: 10, nationalist_populists: -15 },
  },
  {
    id: 'establishment_media_alliance',
    name: '事实核查联盟',
    icon: '✅',
    description: '与可信媒体合作打击虚假信息。国家安全高于言论自由。',
    category: 'establishment',
    duration: 14,
    x: 4,
    y: 1,
    requires: ['establishment_root'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { stability: 8 },
    groupOpinion: { media_establishment: 25, nationalist_populists: -20 },
  },
  {
    id: 'establishment_bipartisanship',
    name: '两党合作',
    icon: '🤝',
    description: '与民主党人达成伟大的协议！基础设施法案！',
    category: 'establishment',
    duration: 21,
    x: 3,
    y: 2,
    requires: ['establishment_media_alliance'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 5, stability: 12, politicalCapital: 30 },
    groupOpinion: { industrialists: 20, media_establishment: 15, nationalist_populists: -25 },
  },
  {
    id: 'establishment_wallstreet',
    name: '华尔街拯救计划',
    icon: '🏦',
    description: '美联储随时准备好。无限量QE。不要让市场崩溃。',
    category: 'establishment',
    duration: 28,
    x: 5,
    y: 2,
    requires: ['establishment_media_alliance'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { gdpGrowth: 0.5, inflation: 2 },
    groupOpinion: { industrialists: 30, silicon_valley: 20, labor_unions: -20 },
  },
  {
    id: 'establishment_forever_war',
    name: '永久战争共识',
    icon: '🌍',
    description: '我们必须保卫民主。到处都是。永远。',
    category: 'establishment',
    duration: 35,
    x: 4,
    y: 3,
    requires: ['establishment_bipartisanship', 'establishment_wallstreet'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { stability: 15 },
    groupOpinion: { military_industrial: 35, media_establishment: 20, nationalist_populists: -30 },
  },
  {
    id: 'establishment_great_reset',
    name: '大重置',
    icon: '🔄',
    description: '你将一无所有，并且会幸福。第四次工业革命开始了。',
    category: 'establishment',
    duration: 56,
    x: 4,
    y: 4,
    requires: ['establishment_forever_war'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: -10, stability: 20 },
    groupOpinion: { industrialists: 40, silicon_valley: 40, labor_unions: -35, nationalist_populists: -40 },
  },
  {
    id: 'establishment_one_world',
    name: '新世界秩序',
    icon: '🌐',
    description: '民族国家的时代已经结束。全球治理的新时代开始了。',
    category: 'establishment',
    duration: 70,
    x: 4,
    y: 5,
    requires: ['establishment_great_reset'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { stability: 30, approval: -20 },
    groupOpinion: { industrialists: 50, media_establishment: 45, nationalist_populists: -60 },
    completionEvent: 'establishment_nwo',
  },

  {
    id: 'militarist_root',
    name: '战时总统',
    icon: '⚔️',
    description: '美国的敌人无处不在。是时候展示力量了。',
    category: 'militarist',
    duration: 7,
    x: 8,
    y: 0,
    requires: [],
    mutuallyExclusive: ['progressive_root'],
    oneTime: true,
    effects: { stability: 5 },
    groupOpinion: { military_industrial: 20 },
  },
  {
    id: 'militarist_military_budget',
    name: '军费翻倍',
    icon: '💰',
    description: '7500亿还不够。我们需要万亿美元的国防预算！',
    category: 'militarist',
    duration: 14,
    x: 8,
    y: 1,
    requires: ['militarist_root'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: {},
    groupOpinion: { military_industrial: 30, industrialists: 15 },
  },
  {
    id: 'militarist_middle_east',
    name: '重返中东',
    icon: '🏜️',
    description: '撤军是个错误。我们要回去，而且这次要留下来。',
    category: 'militarist',
    duration: 28,
    x: 7,
    y: 2,
    requires: ['militarist_military_budget'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 3, stability: -5 },
    groupOpinion: { military_industrial: 35, media_establishment: 10, nationalist_populists: -15 },
  },
  {
    id: 'militarist_confront_china',
    name: '大国对抗',
    icon: '🐉',
    description: '中国是我们生存级别的威胁。新冷战开始了。',
    category: 'militarist',
    duration: 35,
    x: 9,
    y: 2,
    requires: ['militarist_military_budget'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 8, stability: 5 },
    groupOpinion: { military_industrial: 40, nationalist_populists: 20, industrialists: -10 },
  },
  {
    id: 'militarist_space_force',
    name: '太空军扩军',
    icon: '🚀',
    description: '谁控制了太空，谁就控制了未来。美国必须统治所有轨道。',
    category: 'militarist',
    duration: 42,
    x: 8,
    y: 3,
    requires: ['militarist_middle_east', 'militarist_confront_china'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 10 },
    groupOpinion: { military_industrial: 40, silicon_valley: 25 },
  },
  {
    id: 'militarist_war_plan',
    name: '全面战争计划',
    icon: '📋',
    description: '参谋长联席会议提交了所有潜在敌人的目标清单。',
    category: 'militarist',
    duration: 49,
    x: 8,
    y: 4,
    requires: ['militarist_space_force'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 5, stability: 10 },
    groupOpinion: { military_industrial: 50, media_establishment: 15 },
  },
  {
    id: 'militarist_ww3',
    name: '确保毁灭',
    icon: '💥',
    description: '将军们说现在是时候了。先发制人。全球帝国，或荣耀的毁灭。',
    category: 'militarist',
    duration: 56,
    x: 8,
    y: 5,
    requires: ['militarist_war_plan'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { stability: 25, approval: -30 },
    groupOpinion: { military_industrial: 60 },
    completionEvent: 'militarist_ww3',
  },

  {
    id: 'progressive_root',
    name: '革命正在到来',
    icon: '✊',
    description: '不仅要赢，还要彻底改变这个国家。不是改革，是革命。',
    category: 'progressive',
    duration: 7,
    x: 12,
    y: 0,
    requires: [],
    mutuallyExclusive: ['militarist_root'],
    oneTime: true,
    effects: { approval: 5 },
    groupOpinion: { labor_unions: 20, industrialists: -10 },
  },
  {
    id: 'progressive_m4a',
    name: '全民医保',
    icon: '🏥',
    description: '医疗是人权。废除所有私人保险公司。',
    category: 'progressive',
    duration: 28,
    x: 12,
    y: 1,
    requires: ['progressive_root'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 12, stability: -10 },
    groupOpinion: { labor_unions: 30, industrialists: -25, silicon_valley: -15 },
  },
  {
    id: 'progressive_breakup_bigtech',
    name: '拆分科技巨头',
    icon: '🔨',
    description: 'FAANG太大了，它们已经比政府更有权势。是时候反垄断了。',
    category: 'progressive',
    duration: 35,
    x: 11,
    y: 2,
    requires: ['progressive_m4a'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 8, politicalCapital: 40 },
    groupOpinion: { labor_unions: 25, silicon_valley: -40, media_establishment: -15 },
  },
  {
    id: 'progressive_tax_the_rich',
    name: '向富人征税',
    icon: '📊',
    description: '70%边际税率。财富税。遗产税。吃富人。',
    category: 'progressive',
    duration: 42,
    x: 13,
    y: 2,
    requires: ['progressive_m4a'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 10, stability: -15 },
    groupOpinion: { labor_unions: 35, industrialists: -45 },
  },
  {
    id: 'progressive_workers_control',
    name: '工人控制权',
    icon: '🏭',
    description: '所有500人以上的公司必须将49%的股份交给工人。',
    category: 'progressive',
    duration: 49,
    x: 12,
    y: 3,
    requires: ['progressive_breakup_bigtech', 'progressive_tax_the_rich'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 7, stability: -20 },
    groupOpinion: { labor_unions: 45, industrialists: -50, nationalist_populists: 10 },
  },
  {
    id: 'progressive_end_empire',
    name: '终结帝国',
    icon: '☮️',
    description: '关闭所有海外军事基地。把所有军队带回家。结束所有战争。',
    category: 'progressive',
    duration: 42,
    x: 12,
    y: 4,
    requires: ['progressive_workers_control'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 15, stability: -25 },
    groupOpinion: { labor_unions: 40, military_industrial: -60, nationalist_populists: 20 },
  },
  {
    id: 'progressive_revolution',
    name: '第二次美国革命',
    icon: '🔴',
    description: '资本家的时代结束了。一个新的美国诞生了。',
    category: 'progressive',
    duration: 70,
    x: 12,
    y: 5,
    requires: ['progressive_end_empire'],
    mutuallyExclusive: [],
    oneTime: true,
    effects: { approval: 25, stability: -40 },
    groupOpinion: { labor_unions: 60, military_industrial: -70, industrialists: -70, media_establishment: -50 },
    completionEvent: 'progressive_revolution',
  },
]

export function getInitialFocusState(): FocusState {
  return {
    current: null,
    progress: 0,
    completed: [],
    available: ['populist_root', 'establishment_root', 'militarist_root', 'progressive_root'],
    blocked: [],
  }
}

export function applyFocusEffects(state: any, focusId: string): any {
  const focus = USA_FOCUS_TREE.find(f => f.id === focusId)
  if (!focus) return state

  const newState = { ...state }
  const p = { ...newState.political }
  const e = { ...newState.economy }
  const groups = { ...newState.groups.groups }

  if (focus.effects.approval) p.approval = Math.min(100, Math.max(0, p.approval + focus.effects.approval))
  if (focus.effects.stability) p.stability = Math.min(100, Math.max(0, p.stability + focus.effects.stability))
  if (focus.effects.politicalCapital) p.politicalCapital = Math.max(0, p.politicalCapital + focus.effects.politicalCapital)
  if (focus.effects.inflation) e.inflation += focus.effects.inflation / 100
  if (focus.effects.gdpGrowth) e.gdpGrowth += focus.effects.gdpGrowth / 100

  Object.entries(focus.groupOpinion).forEach(([gid, value]) => {
    if (groups[gid]) {
      groups[gid] = {
        ...groups[gid],
        approval: Math.min(100, Math.max(0, groups[gid].approval + (value as number)))
      }
    }
  })

  newState.political = p
  newState.economy = e
  newState.groups = { ...newState.groups, groups }

  return newState
}

export function getAvailableFocuses(state: FocusState): string[] {
  const available: string[] = []
  
  USA_FOCUS_TREE.forEach(focus => {
    if (state.completed.includes(focus.id)) return
    if (state.current === focus.id) return
    if (state.blocked.includes(focus.id)) return
    if (focus.mutuallyExclusive.some(id => state.completed.includes(id))) return
    
    const requirementsMet = focus.requires.every(id => state.completed.includes(id))
    if (requirementsMet) {
      available.push(focus.id)
    }
  })
  
  return available
}
