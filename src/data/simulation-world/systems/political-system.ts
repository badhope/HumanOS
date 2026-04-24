import type {
  PoliticalSystem,
  PoliticalFaction,
  Law,
  RegimeType,
} from '../world-v2-types'
import { FACTIONS_DATABASE } from './economic-system'

export const POLICY_AXES = {
  economic: {
    nationalization: -2,
    taxation: 0,
    welfare: 0,
    regulation: -1,
    trade: 1,
  },
  social: {
    religion: -1,
    tradition: -1,
    immigration: 1,
    drugs: 1,
    abortion: 1,
    lgbt: 1,
  },
  security: {
    surveillance: -1,
    military: -1,
    police: -1,
    censorship: -1,
    gun_control: 1,
  },
  foreign: {
    imperialism: -1,
    globalism: 0,
    alliances: 0,
    immigration_policy: 1,
  },
}

export const LAW_DATABASE: Omit<Law, 'enacted' | 'popularity' | 'constitutionality'>[] = [
  {
    id: 'universal_suffrage',
    name: '普选权',
    description: '所有成年公民享有投票权',
    category: 'political',
    effects: { legitimacy: 0.1, unrest: -0.1, radicalization: -0.05 },
  },
  {
    id: 'eight_hour_day',
    name: '八小时工作制',
    description: '法定每日工作不超过8小时',
    category: 'labor',
    effects: { proletariat_militancy: -0.2, business_profit: -0.05 },
  },
  {
    id: 'minimum_wage',
    name: '最低工资法',
    description: '设立法定最低工资标准',
    category: 'labor',
    effects: { unemployment: 0.01, proletariat_militancy: -0.1 },
  },
  {
    id: 'welfare_state',
    name: '福利国家',
    description: '全民医疗、教育、养老金保障',
    category: 'social',
    effects: { gini: -0.05, radicalization: -0.1, tax_rate: 0.1 },
  },
  {
    id: 'land_reform',
    name: '土地改革',
    description: '重新分配大地产给无地农民',
    category: 'economic',
    effects: { peasantry_militancy: -0.3, aristocracy_militancy: 0.5, gini: -0.1 },
  },
  {
    id: 'nationalization',
    name: '工业国有化',
    description: '关键工业部门收归国有',
    category: 'economic',
    effects: { bourgeoisie_militancy: 0.4, investment: -0.1, legitimacy: 0.05 },
  },
  {
    id: 'privatization',
    name: '大规模私有化',
    description: '国有企业私有化',
    category: 'economic',
    effects: { bourgeoisie_militancy: -0.2, proletariat_militancy: 0.2, corruption: 0.1 },
  },
  {
    id: 'prohibition',
    name: '禁酒令',
    description: '酒精饮料生产销售非法化',
    category: 'social',
    effects: { organized_crime: 0.3, conservatism_support: 0.1 },
  },
  {
    id: 'drug_legalization',
    name: '毒品合法化',
    description: '软性毒品合法化并监管',
    category: 'social',
    effects: { liberal_support: 0.15, conservative_support: -0.15, crime: -0.1 },
  },
  {
    id: 'abortion_legalization',
    name: '堕胎合法化',
    description: '怀孕前三个月堕胎合法',
    category: 'social',
    effects: { feminist_support: 0.2, religious_militancy: 0.2 },
  },
  {
    id: 'death_penalty',
    name: '死刑',
    description: '对严重犯罪适用死刑',
    category: 'justice',
    effects: { crime: -0.1, human_rights: -0.1, conservative_support: 0.1 },
  },
  {
    id: 'gun_control',
    name: '枪支管制',
    description: '限制民用枪支持有',
    category: 'security',
    effects: { gun_violence: -0.2, conservative_militancy: 0.2 },
  },
  {
    id: 'universal_conscription',
    name: '义务兵役制',
    description: '所有成年男性义务服兵役',
    category: 'military',
    effects: { military_support: 0.1, nationalism: 0.1, youth_militancy: 0.1 },
  },
  {
    id: 'censorship',
    name: '审查制度',
    description: '媒体和出版物事前审查',
    category: 'security',
    effects: { opposition_activity: -0.2, free_speech: -0.2, unrest: 0.1 },
  },
  {
    id: 'surveillance_state',
    name: '监控国家',
    description: '大规模监控全体公民',
    category: 'security',
    effects: { terrorism_risk: -0.2, privacy: -0.3, radicalization: -0.1 },
  },
  {
    id: 'marriage_equality',
    name: '婚姻平权',
    description: '同性婚姻合法化',
    category: 'social',
    effects: { lgbt_support: 0.2, religious_militancy: 0.15 },
  },
  {
    id: 'open_borders',
    name: '开放边境',
    description: '人员自由流动政策',
    category: 'foreign',
    effects: { nationalist_militancy: 0.3, globalist_support: 0.2, gdp_growth: 0.01 },
  },
  {
    id: 'protectionism',
    name: '贸易保护主义',
    description: '高关税保护本国产业',
    category: 'economic',
    effects: { nationalist_support: 0.15, gdp_growth: -0.01 },
  },
  {
    id: 'free_trade',
    name: '自由贸易',
    description: '取消关税和贸易壁垒',
    category: 'economic',
    effects: { bourgeoisie_support: 0.1, gdp_growth: 0.01, proletariat_militancy: 0.1 },
  },
  {
    id: 'secularization',
    name: '世俗化',
    description: '政教分离，国家世俗化',
    category: 'social',
    effects: { religious_militancy: 0.25, liberal_support: 0.15 },
  },
  {
    id: 'state_religion',
    name: '国教',
    description: '确立官方国家宗教',
    category: 'social',
    effects: { religious_support: 0.2, secular_opposition: 0.2, legitimacy: 0.05 },
  },
  {
    id: 'amnesty',
    name: '政治犯大赦',
    description: '释放所有政治犯',
    category: 'justice',
    effects: { opposition_militancy: -0.2, legitimacy: 0.1 },
  },
  {
    id: 'martial_law',
    name: '戒严令',
    description: '军队接管国内治安',
    category: 'emergency',
    effects: { unrest: -0.3, coup_risk: 0.2, legitimacy: -0.2 },
  },
  {
    id: 'war_declaration',
    name: '宣战',
    description: '全国进入战争状态',
    category: 'foreign',
    effects: { nationalist_support: 0.3, internal_opposition: -0.4, war_economy: 1 },
  },
]

export class PoliticalEngine {
  private state: PoliticalSystem
  private turn: number = 0
  private eventLog: string[] = []

  constructor(setup: 'monarchy' | 'republic' | 'dictatorship' | 'failed_state' = 'republic') {
    this.state = this.createInitialPoliticalState(setup)
  }

  private createInitialPoliticalState(setup: string): PoliticalSystem {
    const factions: Record<string, PoliticalFaction> = {}
    
    const activeFactions = setup === 'dictatorship' 
      ? FACTIONS_DATABASE.slice(0, 4) 
      : setup === 'monarchy'
        ? FACTIONS_DATABASE.filter(f => ['conservatives', 'liberals', 'clerical', 'military_junta'].includes(f.id))
        : FACTIONS_DATABASE.slice(0, 8)

    activeFactions.forEach(f => {
      factions[f.id] = {
        ...f,
        membership: 10000 + Math.random() * 50000,
        popularSupport: 0.1 + Math.random() * 0.3,
        eliteSupport: 0.2 + Math.random() * 0.4,
        militarySupport: f.id === 'military_junta' ? 0.9 : 0.1 + Math.random() * 0.3,
        partyPlatform: {},
        keyFigures: [],
        paramilitaryForces: f.id === 'fascists' ? 5000 : f.id === 'communists' ? 3000 : Math.floor(Math.random() * 500),
      }
    })

    const regimeTypes: Record<string, RegimeType> = {
      'monarchy': 'constitutional_monarchy',
      'republic': 'parliamentary_republic',
      'dictatorship': 'one_party_state',
      'failed_state': 'provisional_government',
    }

    const laws: Record<string, Law> = {}
    LAW_DATABASE.slice(0, 5).forEach(law => {
      laws[law.id] = {
        ...law,
        enacted: this.turn,
        popularity: 0.5 + Math.random() * 0.3,
        constitutionality: 0.8 + Math.random() * 0.2,
      }
    })

    return {
      regimeType: regimeTypes[setup] || 'parliamentary_republic',
      headOfState: setup === 'monarchy' ? '国王陛下' : '总统先生',
      headOfGovernment: '总理大臣',
      
      legitimacy: setup === 'failed_state' ? 0.2 : setup === 'dictatorship' ? 0.5 : 0.7,
      approvalRating: setup === 'failed_state' ? 0.15 : 0.45,
      termRemaining: setup === 'dictatorship' ? undefined : 48,
      
      factions,
      rulingCoalition: Object.keys(factions).slice(0, 2),
      opposition: Object.keys(factions).slice(2),
      
      laws,
      activePolicies: POLICY_AXES.economic,
      pendingReforms: [],
      
      unrest: setup === 'failed_state' ? 0.7 : setup === 'dictatorship' ? 0.4 : 0.2,
      radicalization: setup === 'failed_state' ? 0.6 : 0.25,
      generalStrikeRisk: 0,
      revolutionRisk: setup === 'failed_state' ? 0.5 : 0.1,
      coupRisk: setup === 'failed_state' ? 0.4 : setup === 'dictatorship' ? 0.2 : 0.05,
      civilWarRisk: setup === 'failed_state' ? 0.6 : 0.05,
    }
  }

  advanceTurn(economicHealth: number = 0.5): {
    events: string[]
    approvalChange: number
    unrestChange: number
    coupAttempt?: boolean
    revolutionAttempt?: boolean
  } {
    this.turn++
    const events: string[] = []

    this.updateFactionSupport(economicHealth)
    
    const oldApproval = this.state.approvalRating
    this.state.approvalRating = this.calculateApproval(economicHealth)
    const approvalChange = this.state.approvalRating - oldApproval

    const oldUnrest = this.state.unrest
    this.updateUnrest(economicHealth)
    const unrestChange = this.state.unrest - oldUnrest

    this.state.termRemaining = this.state.termRemaining !== undefined 
      ? Math.max(0, this.state.termRemaining - 1) 
      : undefined

    const coupAttempt = this.checkCoup()
    if (coupAttempt) {
      events.push('⚠️ 军队正在密谋政变！')
    }

    const revolutionAttempt = this.checkRevolution()
    if (revolutionAttempt) {
      events.push('🔥 革命正在酝酿中！')
    }

    const randomEvent = this.generateRandomPoliticalEvent()
    if (randomEvent) {
      events.push(randomEvent)
    }

    if (this.state.termRemaining === 0) {
      events.push('🗳️ 大选开始！')
      this.holdElection()
      this.state.termRemaining = 48
    }

    return {
      events,
      approvalChange,
      unrestChange,
      coupAttempt,
      revolutionAttempt,
    }
  }

  private updateFactionSupport(economicHealth: number): void {
    Object.values(this.state.factions).forEach(faction => {
      const baseDrift = (Math.random() - 0.5) * 0.02
      const economicModifier = (1 - economicHealth) * 0.01
      
      if (this.isInCoalition(faction.id)) {
        faction.popularSupport += baseDrift + (economicHealth - 0.5) * 0.02
        faction.popularSupport -= this.state.unrest * 0.01
      } else {
        faction.popularSupport += baseDrift - economicModifier
        faction.popularSupport += this.state.unrest * 0.005
      }
      
      faction.popularSupport = Math.max(0.01, Math.min(0.6, faction.popularSupport))
    })

    const totalSupport = Object.values(this.state.factions).reduce((s, f) => s + f.popularSupport, 0)
    Object.values(this.state.factions).forEach(f => {
      f.popularSupport /= totalSupport
    })
  }

  private calculateApproval(economicHealth: number): number {
    const economicFactor = economicHealth * 0.4
    const legitimacyFactor = this.state.legitimacy * 0.2
    const lawAndOrder = (1 - this.state.unrest) * 0.2
    const randomFactor = (Math.random() - 0.5) * 0.1
    
    return Math.max(0.05, Math.min(0.95, 
      economicFactor + legitimacyFactor + lawAndOrder + randomFactor
    ))
  }

  private updateUnrest(economicHealth: number): void {
    const economicMisery = (1 - economicHealth) * 0.3
    const inequality = 0.15
    const repressionEffect = (this.state.civilWarRisk > 0.3 ? -0.1 : 0)
    const decay = this.state.unrest * 0.05
    
    this.state.unrest += economicMisery * 0.02 - decay + repressionEffect + (Math.random() - 0.5) * 0.02
    this.state.unrest = Math.max(0, Math.min(1, this.state.unrest))

    this.state.radicalization = this.state.unrest * 0.7 + 0.15

    this.state.revolutionRisk = this.state.unrest * 0.5 + this.state.radicalization * 0.3
    this.state.coupRisk = (1 - this.state.legitimacy) * 0.3 + (1 - economicHealth) * 0.2
    this.state.civilWarRisk = this.state.revolutionRisk * 0.6 + this.state.coupRisk * 0.4
    this.state.generalStrikeRisk = this.state.unrest * 0.5
  }

  private checkCoup(): boolean {
    if (this.turn < 12) return false
    
    const militaryLoyalty = this.state.factions['military_junta']?.militarySupport || 0.5
    const coupThreshold = 0.95 - militaryLoyalty * 0.3 - this.state.legitimacy * 0.3
    
    return Math.random() > coupThreshold && this.state.coupRisk > 0.4
  }

  private checkRevolution(): boolean {
    if (this.turn < 24) return false
    
    const revolutionThreshold = 0.98 - this.state.unrest * 0.5
    return Math.random() > revolutionThreshold && this.state.revolutionRisk > 0.6
  }

  private generateRandomPoliticalEvent(): string | null {
    const roll = Math.random()
    
    if (roll < 0.02) {
      const faction = Object.values(this.state.factions)[Math.floor(Math.random() * Object.values(this.state.factions).length)]
      return `🗣️ ${faction.name}发起了大规模抗议活动`
    }
    if (roll < 0.04) {
      return '📰 重大政治丑闻曝光！'
    }
    if (roll < 0.05) {
      return '🎯 针对政府高层的暗杀企图'
    }
    if (roll < 0.06) {
      return '⚖️ 宪法法院作出关键裁决'
    }
    
    return null
  }

  private holdElection(): void {
    const results: Record<string, number> = {}
    Object.values(this.state.factions).forEach(f => {
      const bonus = this.isInCoalition(f.id) ? this.state.approvalRating * 0.2 : (1 - this.state.approvalRating) * 0.15
      results[f.id] = f.popularSupport * (1 + bonus + (Math.random() - 0.5) * 0.2)
    })

    const totalVotes = Object.values(results).reduce((a, b) => a + b, 0)
    Object.keys(results).forEach(id => {
      this.state.factions[id].popularSupport = results[id] / totalVotes
    })

    const sortedFactions = Object.entries(this.state.factions)
      .sort(([, a], [, b]) => b.popularSupport - a.popularSupport)
    
    this.state.rulingCoalition = [sortedFactions[0][0]]
    this.state.opposition = sortedFactions.slice(1).map(([id]) => id)

    let coalitionSupport = sortedFactions[0][1].popularSupport
    let i = 1
    while (coalitionSupport < 0.5 && i < sortedFactions.length) {
      this.state.rulingCoalition.push(sortedFactions[i][0])
      this.state.opposition.shift()
      coalitionSupport += sortedFactions[i][1].popularSupport
      i++
    }
  }

  enactLaw(lawId: string): boolean {
    const lawTemplate = LAW_DATABASE.find(l => l.id === lawId)
    if (!lawTemplate || this.state.laws[lawId]) return false

    const opposition = this.calculateOppositionStrength(lawId)
    if (Math.random() < opposition) {
      this.state.unrest += 0.05
      return false
    }

    this.state.laws[lawId] = {
      ...lawTemplate,
      enacted: this.turn,
      popularity: 0.5 + Math.random() * 0.3,
      constitutionality: 0.7 + Math.random() * 0.3,
    }

    this.applyLawEffects(lawId)
    return true
  }

  repealLaw(lawId: string): boolean {
    if (!this.state.laws[lawId]) return false
    
    delete this.state.laws[lawId]
    return true
  }

  private calculateOppositionStrength(lawId: string): number {
    let opposition = 0
    this.state.opposition.forEach(fid => {
      const faction = this.state.factions[fid]
      opposition += faction.popularSupport * (0.3 + Math.random() * 0.4)
    })
    return Math.min(0.9, opposition)
  }

  private applyLawEffects(lawId: string): void {
    const law = LAW_DATABASE.find(l => l.id === lawId)
    if (!law) return
    
    if (law.effects.legitimacy) {
      this.state.legitimacy += law.effects.legitimacy
    }
    if (law.effects.unrest) {
      this.state.unrest += law.effects.unrest
    }
    if (law.effects.radicalization) {
      this.state.radicalization += law.effects.radicalization
    }
  }

  isInCoalition(factionId: string): boolean {
    return this.state.rulingCoalition.includes(factionId)
  }

  getRulingCoalitionSupport(): number {
    return this.state.rulingCoalition.reduce((sum, fid) => {
      return sum + (this.state.factions[fid]?.popularSupport || 0)
    }, 0)
  }

  purgeOpposition(): void {
    this.state.opposition.forEach(fid => {
      const faction = this.state.factions[fid]
      if (faction) {
        faction.popularSupport *= 0.5
        faction.membership = Math.floor(faction.membership * 0.3)
        faction.paramilitaryForces = Math.floor(faction.paramilitaryForces * 0.1)
      }
    })
    
    this.state.legitimacy -= 0.15
    this.state.coupRisk += 0.1
    this.state.unrest += 0.2
  }

  stageCoup(installFaction?: string): boolean {
    if (this.state.coupRisk < 0.3) return false
    
    if (Math.random() > 0.3 + this.state.coupRisk * 0.5) {
      this.state.coupRisk = 0.05
      this.state.legitimacy += 0.1
      this.eventLog.push('政变失败！')
      return false
    }

    this.state.regimeType = 'military_dictatorship'
    this.state.rulingCoalition = [installFaction || 'military_junta']
    this.state.opposition = Object.keys(this.state.factions).filter(f => f !== (installFaction || 'military_junta'))
    this.state.legitimacy = 0.3
    this.state.unrest = 0.5
    this.state.coupRisk = 0.15
    
    Object.values(this.state.factions).forEach(f => {
      f.militarySupport = f.id === 'military_junta' ? 0.95 : 0.1
    })

    this.eventLog.push('⚔️ 政变成功！军政府接管政权')
    return true
  }

  startRevolution(revolutionaryFaction: string = 'communists'): boolean {
    if (this.state.revolutionRisk < 0.5) return false

    if (Math.random() > 0.2 + this.state.revolutionRisk * 0.6) {
      this.state.revolutionRisk = 0.2
      this.state.legitimacy += 0.1
      this.state.unrest = 0.3
      this.eventLog.push('革命被镇压了')
      return false
    }

    this.state.regimeType = 'one_party_state'
    this.state.rulingCoalition = [revolutionaryFaction]
    this.state.opposition = Object.keys(this.state.factions).filter(f => f !== revolutionaryFaction)
    
    this.state.legitimacy = 0.5
    this.state.unrest = 0.2
    this.state.revolutionRisk = 0.1
    this.state.civilWarRisk = 0.3

    this.purgeOpposition()
    this.eventLog.push('🚩 革命胜利！新政权宣告成立')
    return true
  }

  getState(): PoliticalSystem {
    return JSON.parse(JSON.stringify(this.state))
  }

  getTurn(): number {
    return this.turn
  }

  getEventLog(): string[] {
    return [...this.eventLog]
  }

  getPowerBalance(): Record<string, number> {
    const balance: Record<string, number> = {}
    Object.entries(this.state.factions).forEach(([id, faction]) => {
      const power = 
        faction.popularSupport * 0.3 +
        faction.eliteSupport * 0.25 +
        faction.militarySupport * 0.25 +
        (faction.paramilitaryForces / 10000) * 0.2
      balance[id] = power
    })
    return balance
  }
}
