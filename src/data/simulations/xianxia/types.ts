export type Realm =
  | 'mortal'
  | 'qi_refining_1' | 'qi_refining_2' | 'qi_refining_3' | 'qi_refining_4' | 'qi_refining_5' | 'qi_refining_6' | 'qi_refining_7' | 'qi_refining_8' | 'qi_refining_9'
  | 'foundation_early' | 'foundation_mid' | 'foundation_late' | 'foundation_perfect'
  | 'golden_core_early' | 'golden_core_mid' | 'golden_core_late' | 'golden_core_perfect'
  | 'nascent_soul_early' | 'nascent_soul_mid' | 'nascent_soul_late' | 'nascent_soul_perfect'
  | 'soul_fusion_early' | 'soul_fusion_mid' | 'soul_fusion_late' | 'soul_fusion_perfect'
  | 'body_tribulation_early' | 'body_tribulation_mid' | 'body_tribulation_late' | 'body_tribulation_perfect'
  | 'void_refining_early' | 'void_refining_mid' | 'void_refining_late' | 'void_refining_perfect'
  | 'dao_integration_early' | 'dao_integration_mid' | 'dao_integration_late' | 'dao_integration_perfect'
  | 'true_immortal' | 'mystic_immortal' | 'celestial_immortal' | 'dao_immortal'
  | 'world_ancestor'

export type Attribute = 'spirit_root' | 'bone_quality' | 'comprehension' | 'mindstate' | 'luck' | 'charisma' | 'combat_power'

export type Element = 'metal' | 'wood' | 'water' | 'fire' | 'earth' | 'wind' | 'thunder' | 'ice' | 'light' | 'dark' | 'spatial' | 'time'

export type PillQuality = 'inferior' | 'common' | 'superior' | 'exquisite' | 'spirit' | 'immortal' | 'dao'

export type ArtifactQuality = 'mortal' | 'spirit' | 'earth' | 'heaven' | 'immortal' | 'dao' | 'chaos'

export type TechniqueRank = 'huang' | 'xuan' | 'di' | 'tian' | 'spirit' | 'immortal' | 'dao'

export type ResourceType = 'spirit_stone' | 'spirit_plant' | 'mineral' | 'monster_material' | 'soul_fragment' | 'dao_mark'

export type FactionStanding = 'hostile' | 'unfriendly' | 'neutral' | 'friendly' | 'allied' | 'disciple' | 'elder' | 'patriarch'

export type Mood = 'calm' | 'enlightened' | 'agitated' | 'depressed' | 'furious' | 'fearful' | 'greedy' | 'arrogant' | 'merciful'

export interface CharacterAttributes {
  spirit_root: number
  spirit_root_elements: Element[]
  bone_quality: number
  comprehension: number
  mindstate: number
  luck: number
  charisma: number
  combat_power: number
  max_spirit: number
  current_spirit: number
  spirit_regen: number
  soul_power: number
  divine_sense: number
  body_toughness: number
  dao_comprehension: Record<string, number>
}

export interface CultivationProgress {
  realm: Realm
  sub_realm: number
  progress: number
  bottleneck: boolean
  bottleneck_difficulty: number
  breakthrough_attempts: number
  last_breakthrough_day: number
  tribulation_cooldown: number
}

export interface VitalStats {
  age: number
  lifespan: number
  remaining_lifespan: number
  health: number
  max_health: number
  poison_resistance: number
  curse_resistance: number
  mood: Mood
  enlightenment_bonus: number
  karmic_value: number
  sin_value: number
  merit_value: number
}

export interface InventoryItem {
  id: string
  name: string
  type: string
  quality: string
  quantity: number
  description: string
  effects?: Record<string, number>
  createdAt: number
  ownerId?: string
}

export interface Pill extends InventoryItem {
  type: 'pill'
  efficacy: number
  toxicity: number
  formulaId: string
  alchemist: string
}

export interface Artifact extends InventoryItem {
  type: 'artifact'
  rank: ArtifactQuality
  attack: number
  defense: number
  special_effects: string[]
  bound: boolean
  spirit: number
}

export interface Technique {
  id: string
  name: string
  rank: TechniqueRank
  type: 'attack' | 'defense' | 'movement' | 'cultivation' | 'divine' | 'illusion' | 'poison' | 'healing'
  elements: Element[]
  description: string
  mastery: number
  max_mastery: number
  base_cultivation_speed: number
  effects: Record<string, number>
  breakthrough_requirements: Record<string, any>
  incompatibilities: string[]
}

export interface Dao {
  id: string
  name: string
  description: string
  depth: number
  max_depth: number
  insights: string[]
  abilities: string[]
  relatedTechniques: string[]
}

export interface NpcCharacter {
  id: string
  name: string
  title?: string
  realm: Realm
  attributes: Partial<CharacterAttributes>
  factionId?: string
  factionRole?: string
  personality: string[]
  goals: string[]
  secrets: string[]
  relationshipToPlayer: number
  knownTechniques: string[]
  inventory: string[]
  background: string
  aiProfile: 'honest' | 'cunning' | 'righteous' | 'evil' | 'neutral' | 'greedy' | 'altruistic'
  dailyRoutine: string[]
  lastInteraction: number
  favor: number
  hostility: number
  debt: number
}

export interface Faction {
  id: string
  name: string
  type: 'sect' | 'clan' | 'kingdom' | 'holy_land' | 'demonic' | 'casual' | 'merchant'
  rank: number
  reputation: number
  foundingDate: number
  headquarters: string
  patriarchId: string
  elders: string[]
  disciples: string[]
  totalStrength: number
  resources: Record<string, number>
  territories: string[]
  alliedFactions: string[]
  enemyFactions: string[]
  techniques: string[]
  incomePerTurn: Record<string, number>
  policies: string[]
  standing: FactionStanding
  playerContribution: number
  playerRank: string
}

export interface SecretRealm {
  id: string
  name: string
  description: string
  difficulty: number
  min_realm: Realm
  max_realm: Realm
  discovered: boolean
  explored: number
  remaining_days: number
  rewards: string[]
  bosses: string[]
  traps: string[]
  puzzles: string[]
  entranceLocation: string
  cooldown: number
  entryFee: Record<string, number>
}

export interface Quest {
  id: string
  name: string
  type: 'main' | 'side' | 'daily' | 'faction' | 'hidden'
  description: string
  objectives: QuestObjective[]
  progress: number[]
  rewards: Record<string, number | string>
  difficulty: number
  min_realm: Realm
  time_limit?: number
  accepted: boolean
  completed: boolean
  failed: boolean
  giver?: string
  storyline?: string
  choices?: QuestChoice[]
}

export interface QuestObjective {
  id: string
  description: string
  type: 'kill' | 'collect' | 'reach' | 'talk' | 'craft' | 'breakthrough' | 'protect' | 'escort'
  target: string | number
  current: number
  required: number
}

export interface QuestChoice {
  id: string
  description: string
  effects: Record<string, any>
  karmaChange: number
  requiredStats?: Record<string, number>
}

export interface CultivationEvent {
  id: string
  name: string
  type: 'opportunity' | 'crisis' | 'neutral' | 'encounter' | 'tribulation' | 'enlightenment'
  description: string
  choices: CultivationEventChoice[]
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic'
  min_realm: Realm
  cooldown: number
  conditions: Record<string, any>
  oneTime: boolean
  triggered: boolean
}

export interface CultivationEventChoice {
  id: string
  description: string
  successRate: number
  requiredStats?: Record<string, number>
  successEffects: Record<string, any>
  failEffects: Record<string, any>
  specialText: string
}

export interface Tribulation {
  id: string
  name: string
  realm: Realm
  type: 'heavenly' | 'heart' | 'fire' | 'water' | 'wind' | 'thunder' | 'demon'
  description: string
  difficulty: number
  stages: TribulationStage[]
  currentStage: number
  completed: boolean
  failed: boolean
  rewards: Record<string, number>
  penalties: Record<string, number>
}

export interface TribulationStage {
  id: string
  name: string
  description: string
  damage: number
  duration: number
  survivalThreshold: number
  bonusThreshold: number
}

export interface AlchemyRecipe {
  id: string
  name: string
  rank: number
  difficulty: number
  materials: Record<string, number>
  output: string
  outputQuantity: number
  baseSuccessRate: number
  min_realm: Realm
  experience: number
  specialConditions?: string[]
}

export interface RefiningRecipe {
  id: string
  name: string
  rank: number
  difficulty: number
  materials: Record<string, number>
  output: string
  baseSuccessRate: number
  min_realm: Realm
  experience: number
  enhancementSlots: number
}

export interface CultivationState {
  characterId: string
  characterName: string
  title?: string

  day: number
  tick: number
  gameSpeed: 1 | 2 | 5 | 10
  paused: boolean

  cultivation: CultivationProgress
  attributes: CharacterAttributes
  vitals: VitalStats

  inventory: InventoryItem[]
  gold: number
  spiritStones: {
    low: number
    mid: number
    high: number
    top: number
  }

  techniques: Technique[]
  activeTechniqueId: string
  daos: Dao[]

  knownNPCs: Record<string, number>
  factionRelations: Record<string, FactionStanding>
  currentFaction?: string
  factionRank?: string

  quests: Quest[]
  activeQuestId?: string

  events: CultivationEvent[]
  eventCooldowns: Record<string, number>
  activeEvent?: CultivationEvent

  currentTribulation?: Tribulation
  tribulationHistory: string[]

  alchemySkill: number
  alchemyLevel: number
  alchemyExperience: number
  knownRecipes: string[]

  refiningSkill: number
  refiningLevel: number
  refiningExperience: number
  knownRefiningRecipes: string[]

  exploredRealms: string[]
  currentLocation: string
  inSecretRealm?: SecretRealm
  secretRealmProgress: number

  ownedProperties: string[]
  caveId?: string

  stats: {
    daysCultivated: number
    breakthroughs: number
    pillsCreated: number
    artifactsRefined: number
    enemiesDefeated: number
    questsCompleted: number
    eventsExperienced: number
    tribulationsPassed: number
    totalKarma: number
    daoInsightsGained: number
  }

  history: CultivationHistoryEntry[]
  settings: {
    difficulty: 'casual' | 'normal' | 'hard' | 'immortal'
    autoMode: boolean
    eventNotifications: boolean
    tribulationWarnings: boolean
  }

  buffs: any[]
  achievements: string[]
  milestones: Record<string, number>
}

export interface CultivationHistoryEntry {
  day: number
  type: string
  message: string
  importance: 'minor' | 'normal' | 'major' | 'legendary'
}

export interface CombatState {
  playerHealth: number
  enemyHealth: number
  playerMaxHealth: number
  enemyMaxHealth: number
  turn: number
  playerBuffs: Record<string, number>
  enemyBuffs: Record<string, number>
  availableAbilities: string[]
  log: string[]
  completed: boolean
  victory: boolean
}
