import { SoulSystem } from './systems/soul-system'
import { CausalityEngine } from './systems/causality-engine'
import { TimelineSystem } from './systems/timeline-system'
import { EconomicEngine } from './systems/economic-system'
import { PoliticalEngine } from './systems/political-system'
import { CharacterEngine } from './systems/character-system'
import { DialogueEngine, ReputationEngine, IntelligenceSystem, BranchingSystem, NarrativeEngine } from './systems/dialogue-system'
import type { WorldStateV2, WorldEvent, EternalSoul, EconomicSystem, PoliticalSystem } from './world-v2-types'
import type { PlayState, ValueDimension } from './world-types'
import type { DialogueOption, DialogueNode, ChoiceBranch } from './systems/dialogue-system'

export class WorldEngineV2 {
  public readonly soulSystem: SoulSystem
  public readonly causality: CausalityEngine
  public readonly timeline: TimelineSystem
  public readonly economic?: EconomicEngine
  public readonly political?: PoliticalEngine
  public readonly characters: CharacterEngine
  public readonly dialogue: DialogueEngine
  public readonly reputation: ReputationEngine
  public readonly intelligence: IntelligenceSystem
  public readonly branching: BranchingSystem
  public readonly narrative: NarrativeEngine
  
  private worldState: WorldStateV2
  private scenarioId: string

  constructor(
    scenarioId: string,
    existingSoul?: EternalSoul,
    enableEconomicSimulation: boolean = false,
    enablePoliticalSimulation: boolean = false,
    enableCharacters: boolean = false
  ) {
    this.scenarioId = scenarioId
    this.soulSystem = new SoulSystem(existingSoul)
    this.causality = new CausalityEngine()
    this.timeline = new TimelineSystem()
    this.characters = new CharacterEngine()
    this.dialogue = new DialogueEngine()
    this.reputation = new ReputationEngine()
    this.intelligence = new IntelligenceSystem()
    this.branching = new BranchingSystem(scenarioId)
    this.narrative = new NarrativeEngine()
    
    if (enableEconomicSimulation || scenarioId === 'country-simulator') {
      this.economic = new EconomicEngine(
        scenarioId.includes('19th') ? '19th_century' : 'modern'
      )
    }
    
    if (enablePoliticalSimulation || scenarioId === 'country-simulator') {
      this.political = new PoliticalEngine(
        scenarioId === 'french-revolution' ? 'failed_state' : 'republic'
      )
    }
    
    if (enableCharacters || scenarioId === 'french-revolution' || scenarioId === 'country-simulator') {
      this.initializeHistoricalCharacters(scenarioId)
    }
    
    this.worldState = this.createInitialWorldState()
    this.soulSystem.startNewIncarnation()
  }

  private initializeHistoricalCharacters(scenarioId: string): void {
    if (scenarioId === 'french-revolution') {
      this.characters.spawnCharacter('robespierre', 'the_idealist')
      this.characters.spawnCharacter('danton', 'the_leader')
      this.characters.spawnCharacter('marat', 'the_rebel')
      this.characters.spawnCharacter('louis_xvi', 'the_guardian')
      this.characters.spawnCharacter('marie_antoinette', 'the_romantic')
      this.characters.spawnCharacter('napoleon', 'the_machiavellian')
      this.characters.spawnCharacter('sade', 'the_sociopath')
      this.characters.spawnCharacter('charlotte_corday', 'the_idealist')
      this.characters.spawnCharacter('mirabeau', 'the_jester')
      this.characters.spawnCharacter('saint_just', 'the_leader')
      this.characters.spawnCharacter('madame_rolland', 'the_sage')
      this.characters.spawnCharacter('hebert', 'the_rebel')
    }
  }

  private createInitialWorldState(): WorldStateV2 {
    return {
      worldId: this.scenarioId,
      worldName: this.getWorldName(this.scenarioId),
      era: this.scenarioId === 'french-revolution' ? '启蒙时代' : '现代',
      year: this.scenarioId === 'french-revolution' ? 1789 : 2024,
      turn: 0,
      
      soul: this.soulSystem.getSoul(),
      timeline: this.timeline.getActiveTimeline(),
      timelineAbilities: this.soulSystem.getTimelineAbilities(),
      
      actors: {},
      events: [],
      plotThreads: [],
      causalityGraph: [],
      
      economic: this.economic?.getState(),
      political: this.political?.getState(),
      characterActions: [],
      
      meta: {
        level: 0,
        glitchCount: 0,
        brokenWall: false,
        developerMessagesSeen: [],
        realityFragments: 0,
        canAccessDebug: false,
        canEditParameters: false,
        canSpawnEvents: false,
        adminMode: false,
      },
      
      gameSpeed: 1,
      isPaused: false,
    }
  }

  private getWorldName(id: string): string {
    const names: Record<string, string> = {
      'french-revolution': '法国大革命 1789',
      'modern-china-life': '当代中国人生',
      'china-civilization': '华夏文明五千年',
      'country-simulator': '国家经营模拟器',
      'xianxia-world': '修仙大世界',
    }
    return names[id] || '未知世界'
  }

  makeDecisionV2(
    nodeId: string,
    decisionId: string,
    decisionText: string,
    valueLoadings: { dimension: ValueDimension; weight: number }[],
    karmaChange: number = 0
  ): WorldEvent[] {
    this.timeline.recordDecision(decisionId, nodeId)
    
    const influenceWeight = Math.abs(valueLoadings.reduce((sum, l) => sum + l.weight, 0)) / 10 + 0.3
    const causeId = this.causality.recordDecision(nodeId, decisionId, decisionText, influenceWeight)
    
    if (karmaChange !== 0) {
      this.soulSystem.completeIncarnation(
        this.scenarioId,
        this.worldState.worldName,
        'Player',
        [],
        'ongoing',
        karmaChange,
        {}
      )
    }
    
    this.worldState.turn = this.causality.getCurrentTurn()
    const newEvents = this.causality.advanceTurn()
    this.worldState.events.push(...newEvents)
    
    newEvents.forEach(e => {
      this.timeline.recordKeyEvent(e.eventId)
    })
    
    this.worldState.causalityGraph = this.causality.getGraph()
    this.worldState.plotThreads = this.causality.getActivePlotThreads()
    this.worldState.soul = this.soulSystem.getSoul()
    this.worldState.timeline = this.timeline.getActiveTimeline()
    
    return newEvents
  }

  advanceWorldTurn(): {
    economicEvents: string[]
    politicalEvents: string[]
    characterActions: string[]
    year: number
    gdpGrowth: number
    unrest: number
  } {
    const economicEvents: string[] = []
    const politicalEvents: string[] = []
    const characterActions: string[] = []
    
    let gdpGrowth = 0
    let unrest = 0
    
    if (this.economic) {
      const econResult = this.economic.advanceTurn()
      gdpGrowth = econResult.gdpGrowth
      
      Object.entries(econResult.priceChanges).forEach(([commodity, change]) => {
        if (Math.abs(change) > 0.1) {
          const direction = change > 0 ? '上涨' : '下跌'
          economicEvents.push(`📈 ${commodity}价格${direction} ${Math.abs(change * 100).toFixed(1)}%`)
        }
      })
      
      if (econResult.cyclePhase) {
        economicEvents.push(`📊 经济进入${this.getPhaseName(econResult.cyclePhase)}`)
      }
      
      this.worldState.economic = this.economic.getState()
    }

    const characterActionMap = this.characters.advanceTurn()
    characterActionMap.forEach((actions, charId) => {
      const char = this.characters.getCharacter(charId)
      if (char) {
        actions.forEach(action => {
          if (!action.public) return
          const actionDesc = this.describeAction(char.template, action)
          if (actionDesc) characterActions.push(actionDesc)
        })
      }
    })
    
    this.worldState.characterActions = characterActions
    
    if (this.political) {
      const econHealth = this.economic?.getEconomicHealth() || 0.5
      const polResult = this.political.advanceTurn(econHealth)
      
      politicalEvents.push(...polResult.events)
      unrest = polResult.unrestChange
      
      this.worldState.political = this.political.getState()
    }
    
    this.worldState.year++
    this.worldState.turn = this.causality.getCurrentTurn()
    
    return {
      economicEvents,
      politicalEvents,
      characterActions,
      year: this.worldState.year,
      gdpGrowth,
      unrest,
    }
  }

  private describeAction(character: { name: string; portrait: string }, action: { type: string; content: string; riskLevel: number }): string {
    const actionIcons: Record<string, string> = {
      'dialogue': '💬',
      'propose_alliance': '🤝',
      'betray': '🔪',
      'blackmail': '📸',
      'bribe': '💰',
      'investigate': '🔍',
      'slander': '📢',
      'recruit': '📣',
      'assassinate': '💀',
      'donate': '🎁',
      'propose': '💍',
      'divorce': '💔',
      'promote': '⬆️',
      'demote': '⬇️',
      'conspire': '🎭',
    }
    const icon = actionIcons[action.type] || '🎯'
    return `${icon} ${character.portrait} ${character.name}: ${action.content}`
  }

  private getPhaseName(phase: string): string {
    const names: Record<string, string> = {
      'boom': '繁荣期',
      'expansion': '扩张期',
      'peak': '顶峰',
      'contraction': '收缩期',
      'recession': '衰退期',
      'depression': '大萧条',
      'recovery': '复苏期',
    }
    return names[phase] || phase
  }

  enactPolicy(lawId: string): boolean {
    if (!this.political) return false
    return this.political.enactLaw(lawId)
  }

  applyEconomicShock(shockType: 'oil_crisis' | 'financial_crash' | 'pandemic' | 'war' | 'tech_boom'): void {
    this.economic?.applyEconomicShock(shockType)
    if (this.economic) {
      this.worldState.economic = this.economic.getState()
    }
  }

  stageCoup(): boolean {
    if (!this.political) return false
    return this.political.stageCoup()
  }

  startRevolution(): boolean {
    if (!this.political) return false
    return this.political.startRevolution()
  }

  forkCurrentTimeline(nodeId: string, decisionId: string, description: string): string {
    if (!this.worldState.timelineAbilities.forkTimeline) {
      throw new Error('灵魂觉醒度不足，无法创建时间分支')
    }
    return this.timeline.forkTimeline(nodeId, decisionId, description)
  }

  switchToTimeline(timelineId: string): boolean {
    if (!this.worldState.timelineAbilities.timelineHop) {
      throw new Error('灵魂觉醒度不足，无法进行时间线跳跃')
    }
    return this.timeline.switchTimeline(timelineId)
  }

  rewindTime(steps: number): number {
    const maxRewind = this.worldState.timelineAbilities.rewindSteps
    const actualSteps = Math.min(steps, maxRewind)
    
    if (actualSteps <= 0) {
      throw new Error('灵魂觉醒度不足，无法回溯时间')
    }
    
    return this.timeline.rewindSteps(actualSteps)
  }

  getEventForecast(turnsAhead: number = 10): WorldEvent[] {
    if (!this.worldState.timelineAbilities.viewParallelOutcomes) {
      throw new Error('灵魂觉醒度不足，无法预见未来')
    }
    return this.causality.getEventForecast(turnsAhead)
  }

  traceEventCausality(eventId: string) {
    return this.causality.traceCausality(eventId)
  }

  startDialogueWith(npcId: string): DialogueNode | null {
    const npc = this.characters.getCharacter(npcId)
    if (!npc) return null

    const playerRel = this.characters.relationships.getRelationship('player', npcId)
    if (!playerRel) {
      this.characters.relationships.createRelationship('player', npcId)
    }
    const relationship = this.characters.relationships.getRelationship('player', npcId)!

    const playerMemories = this.characters.memories.recallRelatedMemories('player', npcId, this.worldState.turn)

    return this.dialogue.generateDialogue(
      npcId,
      npc.template.name,
      npc.personality,
      'player',
      relationship,
      playerMemories
    )
  }

  resolveDialogue(npcId: string, option: DialogueOption): {
    success: boolean
    events: string[]
    karmaChange: number
  } {
    const npc = this.characters.getCharacter(npcId)
    if (!npc) {
      return { success: false, events: ['NPC不存在'], karmaChange: 0 }
    }

    const result = this.dialogue.resolveDialogueChoice(
      'player',
      npcId,
      option,
      npc.personality
    )

    if (Object.keys(result.newRelationship).length > 0) {
      this.characters.relationships.updateRelationship('player', npcId, result.newRelationship)
    }

    const karmaChange = option.intent === 'bribe' || option.intent === 'blackmail' ? -2 :
                       option.intent === 'threaten' ? -1 :
                       option.intent === 'apologize' ? 1 :
                       option.successChance < 0.3 && result.success ? 2 : 0

    this.reputation.updateReputation(
      option.intent,
      [{ socialClass: npc.template.socialClass, faction: npc.template.faction }],
      result.success ? 0.2 : -0.1
    )

    this.characters.memories.addMemory(
      'player',
      `与${npc.template.name}对话: ${option.text}`,
      option.difficulty,
      result.success ? 0.5 : -0.3,
      this.worldState.turn,
      [npcId]
    )

    return {
      success: result.success,
      events: result.events,
      karmaChange,
    }
  }

  getAvailableChoices(): ChoiceBranch[] {
    return this.branching.getAvailableBranches(this.worldState.turn)
  }

  makeMajorChoice(branchId: string, optionId: string): {
    success: boolean
    worldLineDivergence: number
    events: string[]
  } | null {
    const option = this.branching.makeChoice(branchId, optionId)
    if (!option) return null

    Object.entries(option.consequences.factionChanges || {}).forEach(([faction, delta]) => {
      if (this.political) {
        const factionData = this.political.getState().factions[faction]
        if (factionData) {
          factionData.popularSupport = Math.max(0, Math.min(1, factionData.popularSupport + (delta as number)))
        }
      }
    })

    option.consequences.majorNPCDeaths?.forEach(npcId => {
      this.causality.startPlotThread(
        `death_${npcId}`,
        `${npcId}被处决`,
        npcId,
        1.0
      )
    })

    if (option.consequences.economicShock && this.economic) {
      this.economic.applyEconomicShock(option.consequences.economicShock as any)
    }

    this.timeline.recordKeyEvent(`choice_${branchId}_${optionId}`)

    const divergence = this.branching.getWorldLineDivergence()

    return {
      success: true,
      worldLineDivergence: divergence,
      events: [
        option.consequences.description,
        divergence > 0.5 ? '⚠️ 世界线发生重大偏移！' : '',
      ].filter(Boolean),
    }
  }

  investigateNPC(targetId: string, depth: number = 0.5) {
    const rel = this.characters.relationships.getRelationship('player', targetId)
    const opinion = rel ? (rel.trust + rel.affection) / 2 : 0.2
    return this.intelligence.investigate(targetId, depth, opinion)
  }

  getPlayerReputation() {
    return this.reputation.getPublicReputation()
  }

  getCurrentDivergence(): number {
    return this.branching.getWorldLineDivergence()
  }

  getVisibleCausalChains() {
    const visibilityBonus = this.soulSystem.calculateStatBonus('causalityVisibility')
    return this.causality.getVisibleCausalChains().filter(c => 
      c.isVisibleToPlayer || visibilityBonus > 0.5
    )
  }

  startPlot(title: string, description: string, initiator: string, stakes: number): string {
    return this.causality.startPlotThread(title, description, initiator, stakes)
  }

  spawnConsequence(
    causeLinkId: string,
    eventTitle: string,
    delayTurns: number = 0,
    magnitude: number = 1
  ): void {
    const eventId = 'event_' + Date.now().toString(36)
    this.causality.spawnConsequence(causeLinkId, eventId, eventTitle, delayTurns, magnitude)
  }

  unlockSoulAbility(abilityId: string): boolean {
    const soul = this.soulSystem.getSoul()
    return soul.unlockedAbilities.includes(abilityId)
  }

  grantBlessing(blessingId: string): void {
    import('./systems/soul-system').then(({ BLESSINGS }) => {
      const blessing = BLESSINGS.find(b => b.id === blessingId)
      if (blessing) {
        this.soulSystem.addBlessing(blessing)
      }
    })
  }

  inflictCurse(curceId: string): void {
    import('./systems/soul-system').then(({ CURSES }) => {
      const curse = CURSES.find(c => c.id === curceId)
      if (curse) {
        this.soulSystem.addCurse(curse)
      }
    })
  }

  removeCurse(curseId: string): boolean {
    return this.soulSystem.removeCurse(curseId)
  }

  grantTrait(traitId: string): boolean {
    return this.soulSystem.grantInnateTrait(traitId)
  }

  addMetaAwareness(amount: number): void {
    this.worldState.meta.level = Math.min(100, this.worldState.meta.level + amount)
    this.worldState.meta.glitchCount++
    
    if (this.worldState.meta.level >= 50 && !this.worldState.meta.canAccessDebug) {
      this.worldState.meta.canAccessDebug = true
    }
    if (this.worldState.meta.level >= 75 && !this.worldState.meta.canEditParameters) {
      this.worldState.meta.canEditParameters = true
    }
    if (this.worldState.meta.level >= 100 && !this.worldState.meta.brokenWall) {
      this.worldState.meta.brokenWall = true
      this.worldState.meta.adminMode = true
    }
  }

  getSoul(): EternalSoul {
    return this.soulSystem.getSoul()
  }

  getState(): WorldStateV2 {
    this.worldState.timeline = this.timeline.getActiveTimeline()
    this.worldState.timelineAbilities = this.soulSystem.getTimelineAbilities()
    this.worldState.turn = this.causality.getCurrentTurn()
    this.worldState.economic = this.economic?.getState()
    this.worldState.political = this.political?.getState()
    return { ...this.worldState }
  }

  getEconomicState(): EconomicSystem | undefined {
    return this.economic?.getState()
  }

  getPoliticalState(): PoliticalSystem | undefined {
    return this.political?.getState()
  }

  migrateFromV1State(v1State: PlayState): void {
    v1State.decisionPath.forEach(decision => {
      this.timeline.recordDecision(decision.optionId, decision.nodeId)
      
      const karma = decision.valueLoadings.reduce((sum, l) => sum + l.weight, 0)
      this.causality.recordDecision(
        decision.nodeId,
        decision.optionId,
        decision.optionText,
        Math.abs(karma) / 10 + 0.3
      )
    })
    
    for (let i = 0; i < v1State.decisionPath.length; i++) {
      this.causality.advanceTurn()
    }
  }

  getCurrentTurn(): number {
    return this.causality.getCurrentTurn()
  }

  getTimelineCount(): number {
    return this.timeline.getTimelineCount()
  }

  getStability(): number {
    return this.timeline.getStability()
  }

  getParadoxLevel() {
    return this.timeline.getParadoxLevel()
  }
}
