export type SoulAge = 'infant' | 'young' | 'mature' | 'ancient' | 'primordial'

export type KarmaAlignment = 'holy' | 'virtuous' | 'neutral' | 'villainous' | 'demonic'

export interface InnateTrait {
  id: string
  name: string
  description: string
  icon: string
  effect: Record<string, number>
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic'
}

export interface PastLifeMemory {
  scenarioId: string
  worldName: string
  role: string
  keyAchievements: string[]
  finalFate: string
  karmaEarned: number
  dominantValues: Record<string, number>
}

export interface SoulAbility {
  id: string
  name: string
  description: string
  icon: string
  requiredAwakening: number
  cooldown: number
  effect: string
}

export interface Blessing {
  id: string
  name: string
  description: string
  source: string
  duration: 'permanent' | number
  effects: Record<string, number>
}

export interface Curse {
  id: string
  name: string
  description: string
  source: string
  removable: boolean
  effects: Record<string, number>
}

export interface EternalSoul {
  soulId: string
  soulName: string
  incarnationCount: number
  totalPlayTime: number
  accumulatedKarma: number
  karmaAlignment: KarmaAlignment
  soulAge: SoulAge
  
  enlightenment: number
  dimensionalAnchor: Record<string, number>
  
  innateTraits: InnateTrait[]
  pastLives: PastLifeMemory[]
  
  unlockedAbilities: string[]
  activeBlessings: Blessing[]
  activeCurses: Curse[]
  
  completedWorlds: string[]
  unlockedEndings: Record<string, string[]>
  achievements: string[]
  permanentBonuses: Record<string, number>
}

export type ParadoxSeverity = 'none' | 'minor' | 'moderate' | 'severe' | 'catastrophic'

export interface Timeline {
  timelineId: string
  parentTimelineId?: string
  branchPoint?: {
    nodeId: string
    decisionId: string
    description: string
  }
  divergenceScore: number
  
  worldStateSnapshot: string
  playerDecisions: string[]
  keyEvents: string[]
  
  stability: number
  paradoxLevel: ParadoxSeverity
  isCanon: boolean
  
  createdAt: number
  accessedAt: number
}

export interface TimelineAbilities {
  saveScum: boolean
  rewindSteps: number
  forkTimeline: boolean
  mergeTimelines: boolean
  timelineHop: boolean
  viewParallelOutcomes: boolean
}

export interface CausalLink {
  linkId: string
  cause: {
    nodeId: string
    decisionId: string
    decisionText: string
    timestamp: number
    influenceWeight: number
  }
  effect: {
    eventId: string
    eventTitle: string
    delayTurns: number
    magnitude: number
  }
  propagationPath: string[]
  causalChainDepth: number
  isVisibleToPlayer: boolean
}

export interface WorldEvent {
  eventId: string
  title: string
  description: string
  type: 'personal' | 'local' | 'national' | 'global' | 'existential'
  severity: number
  timestamp: number
  causes: string[]
  
  consequences?: string[]
  resolved?: boolean
  resolution?: string
}

export interface PlotThread {
  threadId: string
  title: string
  description: string
  initiator: string
  relatedActors: string[]
  stakes: number
  
  progression: number
  currentStage: string
  nextCriticalPoint: number
  possibleOutcomes: string[]
}

export interface Actor {
  actorId: string
  name: string
  portrait: string
  role: string
  faction?: string
  
  bigFive: {
    openness: number
    conscientiousness: number
    extraversion: number
    agreeableness: number
    neuroticism: number
  }
  
  valueMatrix: Record<string, number>
  primaryMotives: string[]
  hiddenAgendas: string[]
  
  relationshipToPlayer: {
    trust: number
    affection: number
    respect: number
    fear: number
    acquaintanceLevel: number
  }
  
  behaviorState: string
  memoryWindow: string[]
  opinionOfPlayer: string
}

export type EconomicPhase = 'boom' | 'expansion' | 'peak' | 'contraction' | 'recession' | 'depression' | 'recovery'

export interface Commodity {
  id: string
  name: string
  category: 'agricultural' | 'industrial' | 'consumer' | 'financial' | 'strategic'
  icon: string
  
  supply: number
  demand: number
  price: number
  priceHistory: number[]
  volatility: number
  
  producers: string[]
  consumers: string[]
}

export interface Industry {
  id: string
  name: string
  sector: string
  productionCapacity: number
  utilizationRate: number
  employment: number
  profitMargin: number
  technologyLevel: number
}

export interface PopulationStrata {
  size: number
  averageIncome: number
  wealth: number
  consumption: Record<string, number>
  ideology: Record<string, number>
  militancy: number
  literacy: number
  lifeExpectancy: number
}

export interface EconomicSystem {
  commodities: Record<string, Commodity>
  industries: Record<string, Industry>
  
  population: {
    total: number
    growthRate: number
    aristocracy: PopulationStrata
    bourgeoisie: PopulationStrata
    petiteBourgeoisie: PopulationStrata
    proletariat: PopulationStrata
    peasantry: PopulationStrata
    lumpenproletariat: PopulationStrata
  }
  
  gdp: number
  gdpGrowth: number[]
  inflationRate: number
  unemploymentRate: number
  giniCoefficient: number
  
  interestRate: number
  nationalDebt: number
  currencyStrength: number
  creditRating: string
  
  businessCycle: {
    phase: EconomicPhase
    amplitude: number
    durationInPhase: number
    nextPhaseEstimate: number
  }
}

export type RegimeType =
  | 'absolute_monarchy' | 'constitutional_monarchy'
  | 'parliamentary_republic' | 'presidential_republic'
  | 'military_dictatorship' | 'one_party_state'
  | 'theocracy' | 'anarchism' | 'provisional_government'

export interface PoliticalFaction {
  id: string
  name: string
  ideology: string
  icon: string
  color: string
  
  membership: number
  popularSupport: number
  eliteSupport: number
  militarySupport: number
  
  partyPlatform: Record<string, number>
  keyFigures: string[]
  paramilitaryForces: number
}

export interface Law {
  id: string
  name: string
  description: string
  category: string
  effects: Record<string, number>
  enacted: number
  popularity: number
  constitutionality: number
}

export interface PoliticalSystem {
  regimeType: RegimeType
  headOfState: string
  headOfGovernment: string
  
  legitimacy: number
  approvalRating: number
  termRemaining?: number
  
  factions: Record<string, PoliticalFaction>
  rulingCoalition: string[]
  opposition: string[]
  
  laws: Record<string, Law>
  activePolicies: Record<string, number>
  pendingReforms: string[]
  
  unrest: number
  radicalization: number
  generalStrikeRisk: number
  revolutionRisk: number
  coupRisk: number
  civilWarRisk: number
}

export interface MetaAwareness {
  level: number
  glitchCount: number
  brokenWall: boolean
  developerMessagesSeen: string[]
  realityFragments: number
  
  canAccessDebug: boolean
  canEditParameters: boolean
  canSpawnEvents: boolean
  adminMode: boolean
}

export interface WorldStateV2 {
  worldId: string
  worldName: string
  era: string
  year: number
  turn: number
  
  soul: EternalSoul
  timeline: Timeline
  timelineAbilities: TimelineAbilities
  
  actors: Record<string, Actor>
  events: WorldEvent[]
  plotThreads: PlotThread[]
  causalityGraph: CausalLink[]
  
  economic?: EconomicSystem
  political?: PoliticalSystem
  characterActions: string[]
  
  meta: MetaAwareness
  gameSpeed: number
  isPaused: boolean
}


