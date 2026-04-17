import type { Realm } from './types'

export interface RealmConfig {
  id: Realm
  name: string
  tier: number
  description: string
  lifespanBonus: number
  baseStats: Record<string, number>
  breakthroughRequirements: {
    minProgress: number
    spiritRequired: number
    comprehensionThreshold: number
    bottleneckProbability: number
    breakthroughBaseRate: number
    tribulationChance: number
  }
  unlockedFeatures: string[]
  effects: Record<string, number>
}

export const REALM_HIERARCHY: Realm[] = [
  'mortal',
  'qi_refining_1', 'qi_refining_2', 'qi_refining_3', 'qi_refining_4', 'qi_refining_5',
  'qi_refining_6', 'qi_refining_7', 'qi_refining_8', 'qi_refining_9',
  'foundation_early', 'foundation_mid', 'foundation_late', 'foundation_perfect',
  'golden_core_early', 'golden_core_mid', 'golden_core_late', 'golden_core_perfect',
  'nascent_soul_early', 'nascent_soul_mid', 'nascent_soul_late', 'nascent_soul_perfect',
  'soul_fusion_early', 'soul_fusion_mid', 'soul_fusion_late', 'soul_fusion_perfect',
  'body_tribulation_early', 'body_tribulation_mid', 'body_tribulation_late', 'body_tribulation_perfect',
  'void_refining_early', 'void_refining_mid', 'void_refining_late', 'void_refining_perfect',
  'dao_integration_early', 'dao_integration_mid', 'dao_integration_late', 'dao_integration_perfect',
  'true_immortal', 'mystic_immortal', 'celestial_immortal', 'dao_immortal',
  'world_ancestor'
]

export const REALM_CONFIGS: Record<Realm, RealmConfig> = {
  mortal: {
    id: 'mortal',
    name: '凡俗',
    tier: 0,
    description: '尚未踏上修仙之路的凡人，寿元短暂，力量微薄',
    lifespanBonus: 0,
    baseStats: {
      max_spirit: 10,
      spirit_regen: 0.1,
      combat_power: 1,
      soul_power: 1,
      divine_sense: 1,
      body_toughness: 5
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 10,
      comprehensionThreshold: 10,
      bottleneckProbability: 0.1,
      breakthroughBaseRate: 0.9,
      tribulationChance: 0
    },
    unlockedFeatures: ['basic_meditation'],
    effects: {}
  },

  qi_refining_1: {
    id: 'qi_refining_1',
    name: '炼气一层',
    tier: 1,
    description: '引气入体，正式踏上修仙之路',
    lifespanBonus: 10,
    baseStats: {
      max_spirit: 50,
      spirit_regen: 0.5,
      combat_power: 5,
      soul_power: 2,
      divine_sense: 2,
      body_toughness: 10
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 50,
      comprehensionThreshold: 15,
      bottleneckProbability: 0.05,
      breakthroughBaseRate: 0.95,
      tribulationChance: 0
    },
    unlockedFeatures: ['basic_spells', 'spirit_sight'],
    effects: { spirit_regen_multiplier: 1.1 }
  },

  qi_refining_2: {
    id: 'qi_refining_2',
    name: '炼气二层',
    tier: 1,
    description: '灵力渐深，可施展低级法术',
    lifespanBonus: 12,
    baseStats: {
      max_spirit: 70,
      spirit_regen: 0.6,
      combat_power: 7,
      soul_power: 3,
      divine_sense: 3,
      body_toughness: 12
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 70,
      comprehensionThreshold: 18,
      bottleneckProbability: 0.05,
      breakthroughBaseRate: 0.95,
      tribulationChance: 0
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 1.15 }
  },

  qi_refining_3: {
    id: 'qi_refining_3',
    name: '炼气三层',
    tier: 1,
    description: '灵力充盈周身',
    lifespanBonus: 14,
    baseStats: {
      max_spirit: 90,
      spirit_regen: 0.7,
      combat_power: 9,
      soul_power: 4,
      divine_sense: 4,
      body_toughness: 14
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 90,
      comprehensionThreshold: 20,
      bottleneckProbability: 0.08,
      breakthroughBaseRate: 0.92,
      tribulationChance: 0
    },
    unlockedFeatures: ['item_refining_basic'],
    effects: { spirit_regen_multiplier: 1.2 }
  },

  qi_refining_4: {
    id: 'qi_refining_4',
    name: '炼气四层',
    tier: 1,
    description: '内力外放初现端倪',
    lifespanBonus: 16,
    baseStats: {
      max_spirit: 120,
      spirit_regen: 0.8,
      combat_power: 12,
      soul_power: 5,
      divine_sense: 5,
      body_toughness: 16
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 120,
      comprehensionThreshold: 22,
      bottleneckProbability: 0.08,
      breakthroughBaseRate: 0.9,
      tribulationChance: 0
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 1.25 }
  },

  qi_refining_5: {
    id: 'qi_refining_5',
    name: '炼气五层',
    tier: 1,
    description: '修炼小成，百病不侵',
    lifespanBonus: 20,
    baseStats: {
      max_spirit: 150,
      spirit_regen: 0.9,
      combat_power: 15,
      soul_power: 6,
      divine_sense: 6,
      body_toughness: 18
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 150,
      comprehensionThreshold: 25,
      bottleneckProbability: 0.1,
      breakthroughBaseRate: 0.88,
      tribulationChance: 0
    },
    unlockedFeatures: ['alchemy_basic'],
    effects: { spirit_regen_multiplier: 1.3 }
  },

  qi_refining_6: {
    id: 'qi_refining_6',
    name: '炼气六层',
    tier: 1,
    description: '灵力外放，可御使低级法器',
    lifespanBonus: 25,
    baseStats: {
      max_spirit: 180,
      spirit_regen: 1.0,
      combat_power: 18,
      soul_power: 7,
      divine_sense: 7,
      body_toughness: 20
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 180,
      comprehensionThreshold: 28,
      bottleneckProbability: 0.1,
      breakthroughBaseRate: 0.85,
      tribulationChance: 0
    },
    unlockedFeatures: ['artifact_manipulation'],
    effects: { spirit_regen_multiplier: 1.35 }
  },

  qi_refining_7: {
    id: 'qi_refining_7',
    name: '炼气七层',
    tier: 1,
    description: '神识初开，可感知周围灵气',
    lifespanBonus: 30,
    baseStats: {
      max_spirit: 220,
      spirit_regen: 1.2,
      combat_power: 22,
      soul_power: 8,
      divine_sense: 10,
      body_toughness: 25
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 220,
      comprehensionThreshold: 30,
      bottleneckProbability: 0.12,
      breakthroughBaseRate: 0.82,
      tribulationChance: 0
    },
    unlockedFeatures: ['divine_sense_basic'],
    effects: { spirit_regen_multiplier: 1.4 }
  },

  qi_refining_8: {
    id: 'qi_refining_8',
    name: '炼气八层',
    tier: 1,
    description: '灵力液化的前兆',
    lifespanBonus: 35,
    baseStats: {
      max_spirit: 260,
      spirit_regen: 1.4,
      combat_power: 26,
      soul_power: 9,
      divine_sense: 12,
      body_toughness: 28
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 260,
      comprehensionThreshold: 35,
      bottleneckProbability: 0.15,
      breakthroughBaseRate: 0.8,
      tribulationChance: 0
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 1.45 }
  },

  qi_refining_9: {
    id: 'qi_refining_9',
    name: '炼气九层',
    tier: 1,
    description: '炼气大圆满，冲击筑基的最后阶段',
    lifespanBonus: 40,
    baseStats: {
      max_spirit: 300,
      spirit_regen: 1.6,
      combat_power: 30,
      soul_power: 10,
      divine_sense: 15,
      body_toughness: 30
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 500,
      comprehensionThreshold: 40,
      bottleneckProbability: 0.5,
      breakthroughBaseRate: 0.4,
      tribulationChance: 0.1
    },
    unlockedFeatures: ['foundation_breakthrough'],
    effects: { spirit_regen_multiplier: 1.5 }
  },

  foundation_early: {
    id: 'foundation_early',
    name: '筑基初期',
    tier: 2,
    description: '灵力液化，寿元大增，正式成为修仙者',
    lifespanBonus: 100,
    baseStats: {
      max_spirit: 1000,
      spirit_regen: 5,
      combat_power: 80,
      soul_power: 25,
      divine_sense: 50,
      body_toughness: 60
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 1000,
      comprehensionThreshold: 45,
      bottleneckProbability: 0.2,
      breakthroughBaseRate: 0.7,
      tribulationChance: 0.2
    },
    unlockedFeatures: ['flight_basic', 'teleportation_short', 'sect_joining'],
    effects: { spirit_regen_multiplier: 2.0, lifespan_multiplier: 1.5 }
  },

  foundation_mid: {
    id: 'foundation_mid',
    name: '筑基中期',
    tier: 2,
    description: '道基愈发稳固',
    lifespanBonus: 120,
    baseStats: {
      max_spirit: 1500,
      spirit_regen: 7,
      combat_power: 120,
      soul_power: 35,
      divine_sense: 70,
      body_toughness: 75
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 1500,
      comprehensionThreshold: 50,
      bottleneckProbability: 0.2,
      breakthroughBaseRate: 0.65,
      tribulationChance: 0.25
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 2.2 }
  },

  foundation_late: {
    id: 'foundation_late',
    name: '筑基后期',
    tier: 2,
    description: '筑基境的关键阶段',
    lifespanBonus: 150,
    baseStats: {
      max_spirit: 2000,
      spirit_regen: 9,
      combat_power: 160,
      soul_power: 45,
      divine_sense: 90,
      body_toughness: 90
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 2000,
      comprehensionThreshold: 55,
      bottleneckProbability: 0.25,
      breakthroughBaseRate: 0.6,
      tribulationChance: 0.3
    },
    unlockedFeatures: ['faction_elder_qualification'],
    effects: { spirit_regen_multiplier: 2.4 }
  },

  foundation_perfect: {
    id: 'foundation_perfect',
    name: '筑基圆满',
    tier: 2,
    description: '筑基大圆满，可冲击金丹大道',
    lifespanBonus: 180,
    baseStats: {
      max_spirit: 3000,
      spirit_regen: 12,
      combat_power: 220,
      soul_power: 60,
      divine_sense: 120,
      body_toughness: 110
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 8000,
      comprehensionThreshold: 65,
      bottleneckProbability: 0.7,
      breakthroughBaseRate: 0.25,
      tribulationChance: 0.8
    },
    unlockedFeatures: ['golden_core_breakthrough'],
    effects: { spirit_regen_multiplier: 2.8 }
  },

  golden_core_early: {
    id: 'golden_core_early',
    name: '金丹初期',
    tier: 3,
    description: '金丹成就，万中无一的修士，一宗之柱石',
    lifespanBonus: 500,
    baseStats: {
      max_spirit: 10000,
      spirit_regen: 30,
      combat_power: 600,
      soul_power: 150,
      divine_sense: 300,
      body_toughness: 250
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 10000,
      comprehensionThreshold: 70,
      bottleneckProbability: 0.3,
      breakthroughBaseRate: 0.55,
      tribulationChance: 0.4
    },
    unlockedFeatures: ['sect_founding', 'secret_realm_exploration', 'dao_contemplation'],
    effects: { spirit_regen_multiplier: 4.0, lifespan_multiplier: 2.5 }
  },

  golden_core_mid: {
    id: 'golden_core_mid',
    name: '金丹中期',
    tier: 3,
    description: '金丹光华日盛',
    lifespanBonus: 600,
    baseStats: {
      max_spirit: 15000,
      spirit_regen: 40,
      combat_power: 800,
      soul_power: 200,
      divine_sense: 400,
      body_toughness: 300
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 15000,
      comprehensionThreshold: 75,
      bottleneckProbability: 0.3,
      breakthroughBaseRate: 0.5,
      tribulationChance: 0.45
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 4.5 }
  },

  golden_core_late: {
    id: 'golden_core_late',
    name: '金丹后期',
    tier: 3,
    description: '金丹九转的关键时刻',
    lifespanBonus: 750,
    baseStats: {
      max_spirit: 22000,
      spirit_regen: 55,
      combat_power: 1100,
      soul_power: 270,
      divine_sense: 550,
      body_toughness: 380
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 22000,
      comprehensionThreshold: 80,
      bottleneckProbability: 0.35,
      breakthroughBaseRate: 0.45,
      tribulationChance: 0.5
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 5.0 }
  },

  golden_core_perfect: {
    id: 'golden_core_perfect',
    name: '金丹圆满',
    tier: 3,
    description: '金丹九转圆满，破丹婴生之机',
    lifespanBonus: 900,
    baseStats: {
      max_spirit: 35000,
      spirit_regen: 75,
      combat_power: 1600,
      soul_power: 380,
      divine_sense: 750,
      body_toughness: 500
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 100000,
      comprehensionThreshold: 90,
      bottleneckProbability: 0.85,
      breakthroughBaseRate: 0.15,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['nascent_soul_breakthrough'],
    effects: { spirit_regen_multiplier: 6.0 }
  },

  nascent_soul_early: {
    id: 'nascent_soul_early',
    name: '元婴初期',
    tier: 4,
    description: '元婴出世，大陆称尊，开宗立派的大能',
    lifespanBonus: 2000,
    baseStats: {
      max_spirit: 120000,
      spirit_regen: 200,
      combat_power: 5000,
      soul_power: 1200,
      divine_sense: 2000,
      body_toughness: 1500
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 120000,
      comprehensionThreshold: 95,
      bottleneckProbability: 0.4,
      breakthroughBaseRate: 0.4,
      tribulationChance: 0.6
    },
    unlockedFeatures: ['soul_out_of_body', 'kingdom_founding', 'space_manipulation_basic'],
    effects: { spirit_regen_multiplier: 10.0, lifespan_multiplier: 5.0 }
  },

  nascent_soul_mid: {
    id: 'nascent_soul_mid',
    name: '元婴中期',
    tier: 4,
    description: '元婴日益壮大',
    lifespanBonus: 2500,
    baseStats: {
      max_spirit: 180000,
      spirit_regen: 280,
      combat_power: 7000,
      soul_power: 1600,
      divine_sense: 2800,
      body_toughness: 2000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 180000,
      comprehensionThreshold: 100,
      bottleneckProbability: 0.4,
      breakthroughBaseRate: 0.35,
      tribulationChance: 0.65
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 11.5 }
  },

  nascent_soul_late: {
    id: 'nascent_soul_late',
    name: '元婴后期',
    tier: 4,
    description: '元婴化形，神通自生',
    lifespanBonus: 3200,
    baseStats: {
      max_spirit: 280000,
      spirit_regen: 400,
      combat_power: 10000,
      soul_power: 2200,
      divine_sense: 4000,
      body_toughness: 2800
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 280000,
      comprehensionThreshold: 110,
      bottleneckProbability: 0.45,
      breakthroughBaseRate: 0.3,
      tribulationChance: 0.7
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 13.5 }
  },

  nascent_soul_perfect: {
    id: 'nascent_soul_perfect',
    name: '元婴圆满',
    tier: 4,
    description: '元婴巅峰，化神在望',
    lifespanBonus: 4000,
    baseStats: {
      max_spirit: 450000,
      spirit_regen: 600,
      combat_power: 15000,
      soul_power: 3200,
      divine_sense: 6000,
      body_toughness: 4000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 1500000,
      comprehensionThreshold: 130,
      bottleneckProbability: 0.9,
      breakthroughBaseRate: 0.1,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['soul_fusion_breakthrough'],
    effects: { spirit_regen_multiplier: 16.0 }
  },

  soul_fusion_early: {
    id: 'soul_fusion_early',
    name: '化神初期',
    tier: 5,
    description: '神魂合一，破界飞升指日可待',
    lifespanBonus: 10000,
    baseStats: {
      max_spirit: 1500000,
      spirit_regen: 1500,
      combat_power: 45000,
      soul_power: 10000,
      divine_sense: 15000,
      body_toughness: 10000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 1500000,
      comprehensionThreshold: 150,
      bottleneckProbability: 0.5,
      breakthroughBaseRate: 0.25,
      tribulationChance: 0.8
    },
    unlockedFeatures: ['immortal_ascension_path', 'time_perception_basic'],
    effects: { spirit_regen_multiplier: 25.0, lifespan_multiplier: 15.0 }
  },

  soul_fusion_mid: {
    id: 'soul_fusion_mid',
    name: '化神中期',
    tier: 5,
    description: '神魂交融，法力无边',
    lifespanBonus: 15000,
    baseStats: {
      max_spirit: 2500000,
      spirit_regen: 2300,
      combat_power: 70000,
      soul_power: 15000,
      divine_sense: 23000,
      body_toughness: 15000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 2500000,
      comprehensionThreshold: 170,
      bottleneckProbability: 0.5,
      breakthroughBaseRate: 0.22,
      tribulationChance: 0.85
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 30.0 }
  },

  soul_fusion_late: {
    id: 'soul_fusion_late',
    name: '化神后期',
    tier: 5,
    description: '法则感悟日益加深',
    lifespanBonus: 25000,
    baseStats: {
      max_spirit: 4000000,
      spirit_regen: 3500,
      combat_power: 110000,
      soul_power: 24000,
      divine_sense: 35000,
      body_toughness: 24000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 4000000,
      comprehensionThreshold: 200,
      bottleneckProbability: 0.55,
      breakthroughBaseRate: 0.18,
      tribulationChance: 0.9
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 38.0 }
  },

  soul_fusion_perfect: {
    id: 'soul_fusion_perfect',
    name: '化神圆满',
    tier: 5,
    description: '化神巅峰，炼虚合道',
    lifespanBonus: 40000,
    baseStats: {
      max_spirit: 7000000,
      spirit_regen: 5500,
      combat_power: 180000,
      soul_power: 40000,
      divine_sense: 55000,
      body_toughness: 40000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 25000000,
      comprehensionThreshold: 250,
      bottleneckProbability: 0.95,
      breakthroughBaseRate: 0.08,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['body_tribulation_path'],
    effects: { spirit_regen_multiplier: 50.0 }
  },

  body_tribulation_early: {
    id: 'body_tribulation_early',
    name: '炼体初期',
    tier: 6,
    description: '渡劫炼体，肉身成圣',
    lifespanBonus: 100000,
    baseStats: {
      max_spirit: 25000000,
      spirit_regen: 18000,
      combat_power: 600000,
      soul_power: 120000,
      divine_sense: 150000,
      body_toughness: 120000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 25000000,
      comprehensionThreshold: 300,
      bottleneckProbability: 0.6,
      breakthroughBaseRate: 0.15,
      tribulationChance: 0.95
    },
    unlockedFeatures: ['heavenly_tribulation_survival'],
    effects: { spirit_regen_multiplier: 80.0, lifespan_multiplier: 50.0 }
  },

  body_tribulation_mid: {
    id: 'body_tribulation_mid',
    name: '炼体中期',
    tier: 6,
    description: '万劫不磨之躯',
    lifespanBonus: 150000,
    baseStats: {
      max_spirit: 40000000,
      spirit_regen: 28000,
      combat_power: 950000,
      soul_power: 190000,
      divine_sense: 240000,
      body_toughness: 190000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 40000000,
      comprehensionThreshold: 350,
      bottleneckProbability: 0.6,
      breakthroughBaseRate: 0.12,
      tribulationChance: 1.0
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 100.0 }
  },

  body_tribulation_late: {
    id: 'body_tribulation_late',
    name: '炼体后期',
    tier: 6,
    description: '法体双修巅峰',
    lifespanBonus: 250000,
    baseStats: {
      max_spirit: 70000000,
      spirit_regen: 45000,
      combat_power: 1600000,
      soul_power: 320000,
      divine_sense: 400000,
      body_toughness: 320000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 70000000,
      comprehensionThreshold: 420,
      bottleneckProbability: 0.65,
      breakthroughBaseRate: 0.1,
      tribulationChance: 1.0
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 130.0 }
  },

  body_tribulation_perfect: {
    id: 'body_tribulation_perfect',
    name: '炼体圆满',
    tier: 6,
    description: '炼虚通道',
    lifespanBonus: 400000,
    baseStats: {
      max_spirit: 120000000,
      spirit_regen: 70000,
      combat_power: 2600000,
      soul_power: 520000,
      divine_sense: 650000,
      body_toughness: 550000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 400000000,
      comprehensionThreshold: 500,
      bottleneckProbability: 0.97,
      breakthroughBaseRate: 0.05,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['void_refining_path'],
    effects: { spirit_regen_multiplier: 170.0 }
  },

  void_refining_early: {
    id: 'void_refining_early',
    name: '炼虚初期',
    tier: 7,
    description: '炼虚化神，遨游太虚',
    lifespanBonus: 1000000,
    baseStats: {
      max_spirit: 400000000,
      spirit_regen: 220000,
      combat_power: 8000000,
      soul_power: 1600000,
      divine_sense: 2000000,
      body_toughness: 1700000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 400000000,
      comprehensionThreshold: 650,
      bottleneckProbability: 0.7,
      breakthroughBaseRate: 0.08,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['void_travel', 'world_creation_basic'],
    effects: { spirit_regen_multiplier: 300.0, lifespan_multiplier: 200.0 }
  },

  void_refining_mid: {
    id: 'void_refining_mid',
    name: '炼虚中期',
    tier: 7,
    description: '虚空造物之能',
    lifespanBonus: 2000000,
    baseStats: {
      max_spirit: 750000000,
      spirit_regen: 380000,
      combat_power: 14000000,
      soul_power: 2800000,
      divine_sense: 3500000,
      body_toughness: 3000000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 750000000,
      comprehensionThreshold: 800,
      bottleneckProbability: 0.7,
      breakthroughBaseRate: 0.06,
      tribulationChance: 1.0
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 400.0 }
  },

  void_refining_late: {
    id: 'void_refining_late',
    name: '炼虚后期',
    tier: 7,
    description: '一界之主的威能',
    lifespanBonus: 5000000,
    baseStats: {
      max_spirit: 1500000000,
      spirit_regen: 700000,
      combat_power: 26000000,
      soul_power: 5200000,
      divine_sense: 6500000,
      body_toughness: 5500000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 1500000000,
      comprehensionThreshold: 1000,
      bottleneckProbability: 0.75,
      breakthroughBaseRate: 0.04,
      tribulationChance: 1.0
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 550.0 }
  },

  void_refining_perfect: {
    id: 'void_refining_perfect',
    name: '炼虚圆满',
    tier: 7,
    description: '合道在即',
    lifespanBonus: 10000000,
    baseStats: {
      max_spirit: 3000000000,
      spirit_regen: 1300000,
      combat_power: 48000000,
      soul_power: 9600000,
      divine_sense: 12000000,
      body_toughness: 10000000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 10000000000,
      comprehensionThreshold: 1500,
      bottleneckProbability: 0.98,
      breakthroughBaseRate: 0.02,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['dao_integration_path'],
    effects: { spirit_regen_multiplier: 750.0 }
  },

  dao_integration_early: {
    id: 'dao_integration_early',
    name: '合体初期',
    tier: 8,
    description: '与道合真，万世不朽',
    lifespanBonus: 50000000,
    baseStats: {
      max_spirit: 10000000000,
      spirit_regen: 4000000,
      combat_power: 150000000,
      soul_power: 30000000,
      divine_sense: 37500000,
      body_toughness: 32000000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 10000000000,
      comprehensionThreshold: 2000,
      bottleneckProbability: 0.8,
      breakthroughBaseRate: 0.03,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['dao_law_manifestation', 'immortal_ascension'],
    effects: { spirit_regen_multiplier: 1500.0, lifespan_multiplier: 1000.0 }
  },

  dao_integration_mid: {
    id: 'dao_integration_mid',
    name: '合体中期',
    tier: 8,
    description: '道果凝结',
    lifespanBonus: 100000000,
    baseStats: {
      max_spirit: 20000000000,
      spirit_regen: 7500000,
      combat_power: 280000000,
      soul_power: 56000000,
      divine_sense: 70000000,
      body_toughness: 60000000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 20000000000,
      comprehensionThreshold: 3000,
      bottleneckProbability: 0.8,
      breakthroughBaseRate: 0.02,
      tribulationChance: 1.0
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 2200.0 }
  },

  dao_integration_late: {
    id: 'dao_integration_late',
    name: '合体后期',
    tier: 8,
    description: '法则为用',
    lifespanBonus: 250000000,
    baseStats: {
      max_spirit: 45000000000,
      spirit_regen: 16000000,
      combat_power: 600000000,
      soul_power: 120000000,
      divine_sense: 150000000,
      body_toughness: 130000000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 45000000000,
      comprehensionThreshold: 5000,
      bottleneckProbability: 0.85,
      breakthroughBaseRate: 0.01,
      tribulationChance: 1.0
    },
    unlockedFeatures: [],
    effects: { spirit_regen_multiplier: 3500.0 }
  },

  dao_integration_perfect: {
    id: 'dao_integration_perfect',
    name: '合体圆满',
    tier: 8,
    description: '大乘在望，仙道之门',
    lifespanBonus: 500000000,
    baseStats: {
      max_spirit: 100000000000,
      spirit_regen: 35000000,
      combat_power: 1300000000,
      soul_power: 260000000,
      divine_sense: 325000000,
      body_toughness: 280000000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 500000000000,
      comprehensionThreshold: 10000,
      bottleneckProbability: 0.99,
      breakthroughBaseRate: 0.005,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['immortal_path'],
    effects: { spirit_regen_multiplier: 6000.0 }
  },

  true_immortal: {
    id: 'true_immortal',
    name: '真仙',
    tier: 9,
    description: '永生不死，真仙道果',
    lifespanBonus: Infinity,
    baseStats: {
      max_spirit: 500000000000,
      spirit_regen: 100000000,
      combat_power: 4000000000,
      soul_power: 800000000,
      divine_sense: 1000000000,
      body_toughness: 850000000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 1e15,
      comprehensionThreshold: 25000,
      bottleneckProbability: 0.9,
      breakthroughBaseRate: 0.01,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['immortality', 'celestial_realm_access'],
    effects: { spirit_regen_multiplier: 15000.0 }
  },

  mystic_immortal: {
    id: 'mystic_immortal',
    name: '玄仙',
    tier: 9,
    description: '玄妙之道，仙界大能',
    lifespanBonus: Infinity,
    baseStats: {
      max_spirit: 2e12,
      spirit_regen: 350000000,
      combat_power: 14000000000,
      soul_power: 2800000000,
      divine_sense: 3500000000,
      body_toughness: 3000000000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 5e15,
      comprehensionThreshold: 50000,
      bottleneckProbability: 0.92,
      breakthroughBaseRate: 0.005,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['mystic_arts'],
    effects: { spirit_regen_multiplier: 40000.0 }
  },

  celestial_immortal: {
    id: 'celestial_immortal',
    name: '天仙',
    tier: 9,
    description: '天庭正神，天道代言人',
    lifespanBonus: Infinity,
    baseStats: {
      max_spirit: 1e13,
      spirit_regen: 1500000000,
      combat_power: 60000000000,
      soul_power: 12000000000,
      divine_sense: 15000000000,
      body_toughness: 13000000000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 3e16,
      comprehensionThreshold: 100000,
      bottleneckProbability: 0.95,
      breakthroughBaseRate: 0.002,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['heavenly_dao'],
    effects: { spirit_regen_multiplier: 120000.0 }
  },

  dao_immortal: {
    id: 'dao_immortal',
    name: '道仙',
    tier: 9,
    description: '道之化身，不朽道祖',
    lifespanBonus: Infinity,
    baseStats: {
      max_spirit: 1e14,
      spirit_regen: 10000000000,
      combat_power: 400000000000,
      soul_power: 80000000000,
      divine_sense: 100000000000,
      body_toughness: 85000000000
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: 1e18,
      comprehensionThreshold: 500000,
      bottleneckProbability: 0.98,
      breakthroughBaseRate: 0.001,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['dao_sovereign'],
    effects: { spirit_regen_multiplier: 500000.0 }
  },

  world_ancestor: {
    id: 'world_ancestor',
    name: '世界之祖',
    tier: 10,
    description: '开创世界，万道之源',
    lifespanBonus: Infinity,
    baseStats: {
      max_spirit: Infinity,
      spirit_regen: Infinity,
      combat_power: Infinity,
      soul_power: Infinity,
      divine_sense: Infinity,
      body_toughness: Infinity
    },
    breakthroughRequirements: {
      minProgress: 100,
      spiritRequired: Infinity,
      comprehensionThreshold: Infinity,
      bottleneckProbability: 1,
      breakthroughBaseRate: 0,
      tribulationChance: 1.0
    },
    unlockedFeatures: ['world_creator', 'omniscience'],
    effects: {}
  }
}

export function getNextRealm(current: Realm): Realm | null {
  const index = REALM_HIERARCHY.indexOf(current)
  return index < REALM_HIERARCHY.length - 1 ? REALM_HIERARCHY[index + 1] : null
}

export function getRealmTier(realm: Realm): number {
  return REALM_CONFIGS[realm].tier
}

export function compareRealm(a: Realm, b: Realm): number {
  return REALM_HIERARCHY.indexOf(a) - REALM_HIERARCHY.indexOf(b)
}

export function canFight(a: Realm, b: Realm): boolean {
  const diff = Math.abs(compareRealm(a, b))
  return diff <= 18
}
