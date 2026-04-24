import type { CausalLink, WorldEvent, PlotThread } from '../world-v2-types'

export class CausalityEngine {
  private causalityGraph: CausalLink[] = []
  private pendingEvents: Map<number, WorldEvent[]> = new Map()
  private plotThreads: PlotThread[] = []
  private currentTurn: number = 0

  recordDecision(
    nodeId: string,
    decisionId: string,
    decisionText: string,
    influenceWeight: number = 0.5
  ): string {
    const linkId = 'cause_' + Date.now().toString(36)
    
    const link: CausalLink = {
      linkId,
      cause: {
        nodeId,
        decisionId,
        decisionText,
        timestamp: this.currentTurn,
        influenceWeight,
      },
      effect: {
        eventId: '',
        eventTitle: 'Unresolved',
        delayTurns: 0,
        magnitude: 0,
      },
      propagationPath: [],
      causalChainDepth: 0,
      isVisibleToPlayer: influenceWeight > 0.7,
    }
    
    this.causalityGraph.push(link)
    return linkId
  }

  spawnConsequence(
    causeLinkId: string,
    eventId: string,
    eventTitle: string,
    delayTurns: number = 0,
    magnitude: number = 1,
    propagationPath: string[] = []
  ): void {
    const causeLink = this.causalityGraph.find(c => c.linkId === causeLinkId)
    if (!causeLink) return

    causeLink.effect = {
      eventId,
      eventTitle,
      delayTurns,
      magnitude,
    }
    causeLink.propagationPath = propagationPath
    causeLink.causalChainDepth = propagationPath.length

    if (delayTurns === 0) {
      this.triggerEvent(eventId, eventTitle, magnitude, [causeLinkId])
    } else {
      const triggerTurn = this.currentTurn + delayTurns
      if (!this.pendingEvents.has(triggerTurn)) {
        this.pendingEvents.set(triggerTurn, [])
      }
      this.pendingEvents.get(triggerTurn)!.push({
        eventId,
        title: eventTitle,
        description: `Caused by: ${causeLink.cause.decisionText}`,
        type: 'personal',
        severity: magnitude,
        timestamp: triggerTurn,
        causes: [causeLinkId],
      })
    }
  }

  private triggerEvent(
    eventId: string,
    title: string,
    magnitude: number,
    causes: string[]
  ): WorldEvent {
    const event: WorldEvent = {
      eventId,
      title,
      description: title,
      type: magnitude > 7 ? 'global' : magnitude > 4 ? 'national' : magnitude > 2 ? 'local' : 'personal',
      severity: magnitude,
      timestamp: this.currentTurn,
      causes,
    }
    return event
  }

  advanceTurn(): WorldEvent[] {
    this.currentTurn++
    this.evolvePlotThreads()
    
    const events = this.pendingEvents.get(this.currentTurn) || []
    this.pendingEvents.delete(this.currentTurn)
    
    events.forEach(event => {
      this.propagateEvent(event)
    })
    
    return events
  }

  private propagateEvent(event: WorldEvent): void {
    const rippleMagnitude = event.severity * 0.5
    
    if (rippleMagnitude < 0.5) return
    
    const secondaryDelay = Math.ceil(event.severity / 2)
    const originalCauses = [...event.causes, event.eventId]
    
    if (rippleMagnitude >= 2) {
      this.spawnConsequence(
        event.causes[0],
        event.eventId + '_ripple',
        `${event.title} - 连锁反应`,
        secondaryDelay,
        rippleMagnitude,
        originalCauses
      )
    }
  }

  startPlotThread(
    title: string,
    description: string,
    initiator: string,
    stakes: number
  ): string {
    const threadId = 'plot_' + Date.now().toString(36)
    
    const thread: PlotThread = {
      threadId,
      title,
      description,
      initiator,
      relatedActors: [initiator],
      stakes,
      progression: 0,
      currentStage: 'initiated',
      nextCriticalPoint: this.currentTurn + Math.ceil(stakes / 2),
      possibleOutcomes: [],
    }
    
    this.plotThreads.push(thread)
    return threadId
  }

  private evolvePlotThreads(): void {
    this.plotThreads.forEach(thread => {
      if (thread.progression >= 100) return
      
      const progressionRate = thread.stakes / 10
      thread.progression = Math.min(100, thread.progression + progressionRate)
      
      if (this.currentTurn >= thread.nextCriticalPoint) {
        thread.currentStage = this.getNextStage(thread.currentStage)
        thread.nextCriticalPoint = this.currentTurn + Math.ceil(thread.stakes / 2)
        
        const criticalEvent: WorldEvent = {
          eventId: thread.threadId + '_critical_' + this.currentTurn,
          title: `${thread.title} - 关键节点`,
          description: `剧情达到关键阶段: ${thread.currentStage}`,
          type: thread.stakes > 7 ? 'global' : thread.stakes > 4 ? 'national' : 'local',
          severity: thread.stakes,
          timestamp: this.currentTurn,
          causes: [thread.threadId],
        }
        
        if (!this.pendingEvents.has(this.currentTurn)) {
          this.pendingEvents.set(this.currentTurn, [])
        }
        this.pendingEvents.get(this.currentTurn)!.push(criticalEvent)
      }
    })
  }

  private getNextStage(current: string): string {
    const stages = ['initiated', 'developing', 'escalating', 'critical', 'climax', 'resolved']
    const idx = stages.indexOf(current)
    return idx < stages.length - 1 ? stages[idx + 1] : 'resolved'
  }

  traceCausality(eventId: string): CausalLink[] {
    const chain: CausalLink[] = []
    const visited = new Set<string>()
    
    const trace = (eId: string) => {
      const link = this.causalityGraph.find(c => c.effect.eventId === eId)
      if (!link || visited.has(link.linkId)) return
      
      visited.add(link.linkId)
      chain.unshift(link)
      
      link.propagationPath.forEach(pId => trace(pId))
    }
    
    trace(eventId)
    return chain
  }

  getVisibleCausalChains(): CausalLink[] {
    return this.causalityGraph.filter(c => c.isVisibleToPlayer)
  }

  counterfactualSimulation(
    originalLinkId: string,
    whatIfDecision: string
  ): {
    divergence: number
    alternateEvents: string[]
    butterflyEffects: number
  } {
    const originalLink = this.causalityGraph.find(c => c.linkId === originalLinkId)
    if (!originalLink) {
      return { divergence: 0, alternateEvents: [], butterflyEffects: 0 }
    }
    
    const baseDivergence = originalLink.cause.influenceWeight * 100
    const depthFactor = 1 + (originalLink.causalChainDepth * 0.1)
    const finalDivergence = Math.min(100, baseDivergence * depthFactor)
    
    const butterflyEffects = Math.floor(finalDivergence / 10)
    
    return {
      divergence: finalDivergence,
      alternateEvents: [],
      butterflyEffects,
    }
  }

  getCurrentTurn(): number {
    return this.currentTurn
  }

  getGraph(): CausalLink[] {
    return [...this.causalityGraph]
  }

  getActivePlotThreads(): PlotThread[] {
    return this.plotThreads.filter(t => t.progression < 100)
  }

  getPendingEvents(): Map<number, WorldEvent[]> {
    return new Map(this.pendingEvents)
  }

  getEventForecast(turnsAhead: number = 10): WorldEvent[] {
    const forecast: WorldEvent[] = []
    for (let i = 1; i <= turnsAhead; i++) {
      const turn = this.currentTurn + i
      const events = this.pendingEvents.get(turn) || []
      events.forEach(e => forecast.push({ ...e, timestamp: turn }))
    }
    return forecast
  }
}
