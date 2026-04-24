import type { Timeline, ParadoxSeverity } from '../world-v2-types'

export class TimelineSystem {
  private timelines: Map<string, Timeline> = new Map()
  private activeTimelineId: string
  private maxStoredTimelines: number = 50

  constructor() {
    this.activeTimelineId = this.createTimeline()
  }

  createTimeline(parentTimelineId?: string, branchPoint?: {
    nodeId: string
    decisionId: string
    description: string
  }): string {
    const timelineId = 'tl_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 4)
    
    const timeline: Timeline = {
      timelineId,
      parentTimelineId,
      branchPoint,
      divergenceScore: parentTimelineId ? 0 : 1,
      worldStateSnapshot: '',
      playerDecisions: [],
      keyEvents: [],
      stability: parentTimelineId ? 90 : 100,
      paradoxLevel: 'none',
      isCanon: !parentTimelineId,
      createdAt: Date.now(),
      accessedAt: Date.now(),
    }
    
    this.timelines.set(timelineId, timeline)
    this.cleanupOldTimelines()
    
    return timelineId
  }

  forkTimeline(
    nodeId: string,
    decisionId: string,
    description: string
  ): string {
    const parent = this.getActiveTimeline()
    const newTimelineId = this.createTimeline(this.activeTimelineId, {
      nodeId,
      decisionId,
      description,
    })
    
    const newTimeline = this.timelines.get(newTimelineId)!
    newTimeline.playerDecisions = [...parent.playerDecisions]
    newTimeline.keyEvents = [...parent.keyEvents]
    newTimeline.worldStateSnapshot = parent.worldStateSnapshot
    newTimeline.divergenceScore = 5
    
    return newTimelineId
  }

  switchTimeline(timelineId: string): boolean {
    if (!this.timelines.has(timelineId)) return false
    
    const targetTimeline = this.timelines.get(timelineId)!
    const divergence = targetTimeline.divergenceScore
    
    if (divergence > 75) {
      targetTimeline.paradoxLevel = this.increaseParadox(
        targetTimeline.paradoxLevel,
        Math.floor(divergence / 25)
      )
      targetTimeline.stability = Math.max(0, targetTimeline.stability - divergence / 5)
    }
    
    this.activeTimelineId = timelineId
    targetTimeline.accessedAt = Date.now()
    
    return true
  }

  mergeTimelines(timelineIds: string[]): string {
    const mergedId = this.createTimeline()
    const merged = this.timelines.get(mergedId)!
    
    timelineIds.forEach(id => {
      const tl = this.timelines.get(id)
      if (!tl) return
      
      tl.playerDecisions.forEach(d => {
        if (!merged.playerDecisions.includes(d)) {
          merged.playerDecisions.push(d)
        }
      })
      
      tl.keyEvents.forEach(e => {
        if (!merged.keyEvents.includes(e)) {
          merged.keyEvents.push(e)
        }
      })
    })
    
    merged.divergenceScore = timelineIds.length * 25
    merged.stability = Math.max(0, 50 - timelineIds.length * 10)
    merged.paradoxLevel = timelineIds.length > 3 ? 'severe' : timelineIds.length > 2 ? 'moderate' : 'minor'
    merged.isCanon = false
    
    return mergedId
  }

  recordDecision(decisionId: string, nodeId: string): void {
    const timeline = this.getActiveTimeline()
    timeline.playerDecisions.push(`${nodeId}:${decisionId}`)
    timeline.accessedAt = Date.now()
    timeline.divergenceScore = Math.min(100, timeline.divergenceScore + 1)
  }

  recordKeyEvent(eventId: string): void {
    const timeline = this.getActiveTimeline()
    if (!timeline.keyEvents.includes(eventId)) {
      timeline.keyEvents.push(eventId)
    }
  }

  saveWorldStateSnapshot(snapshot: string): void {
    const timeline = this.getActiveTimeline()
    timeline.worldStateSnapshot = snapshot
  }

  rewindToDecision(decisionIndex: number): boolean {
    const timeline = this.getActiveTimeline()
    if (decisionIndex < 0 || decisionIndex >= timeline.playerDecisions.length) {
      return false
    }
    
    timeline.playerDecisions = timeline.playerDecisions.slice(0, decisionIndex)
    timeline.paradoxLevel = this.increaseParadox(timeline.paradoxLevel, 1)
    timeline.stability = Math.max(0, timeline.stability - 2)
    
    return true
  }

  rewindSteps(steps: number): number {
    const timeline = this.getActiveTimeline()
    const actualSteps = Math.min(steps, timeline.playerDecisions.length)
    
    if (actualSteps > 0) {
      timeline.playerDecisions = timeline.playerDecisions.slice(0, -actualSteps)
      timeline.paradoxLevel = this.increaseParadox(timeline.paradoxLevel, Math.ceil(actualSteps / 3))
      timeline.stability = Math.max(0, timeline.stability - actualSteps)
    }
    
    return actualSteps
  }

  private increaseParadox(current: ParadoxSeverity, levels: number): ParadoxSeverity {
    const order: ParadoxSeverity[] = ['none', 'minor', 'moderate', 'severe', 'catastrophic']
    const currentIdx = order.indexOf(current)
    const newIdx = Math.min(order.length - 1, currentIdx + levels)
    return order[newIdx]
  }

  private cleanupOldTimelines(): void {
    if (this.timelines.size <= this.maxStoredTimelines) return
    
    const sorted = Array.from(this.timelines.values())
      .filter(t => !t.isCanon)
      .sort((a, b) => a.accessedAt - b.accessedAt)
    
    const toDelete = sorted.slice(0, sorted.length - this.maxStoredTimelines)
    toDelete.forEach(t => this.timelines.delete(t.timelineId))
  }

  getActiveTimeline(): Timeline {
    return this.timelines.get(this.activeTimelineId)!
  }

  getTimeline(timelineId: string): Timeline | undefined {
    return this.timelines.get(timelineId)
  }

  getAllTimelines(): Timeline[] {
    return Array.from(this.timelines.values())
  }

  getParallelBranches(): Timeline[] {
    return Array.from(this.timelines.values())
      .filter(t => t.parentTimelineId === this.activeTimelineId)
  }

  getParadoxLevel(): ParadoxSeverity {
    return this.getActiveTimeline().paradoxLevel
  }

  getStability(): number {
    return this.getActiveTimeline().stability
  }

  getActiveTimelineId(): string {
    return this.activeTimelineId
  }

  getDecisionCount(): number {
    return this.getActiveTimeline().playerDecisions.length
  }

  getDecisionPath(): string[] {
    return [...this.getActiveTimeline().playerDecisions]
  }

  applyParadoxEffects(effectCallback: (severity: ParadoxSeverity) => void): void {
    const severity = this.getParadoxLevel()
    if (severity !== 'none') {
      effectCallback(severity)
    }
  }

  healParadox(): void {
    const timeline = this.getActiveTimeline()
    const order: ParadoxSeverity[] = ['none', 'minor', 'moderate', 'severe', 'catastrophic']
    const currentIdx = order.indexOf(timeline.paradoxLevel)
    if (currentIdx > 0) {
      timeline.paradoxLevel = order[currentIdx - 1]
    }
    timeline.stability = Math.min(100, timeline.stability + 5)
  }

  getTimelineCount(): number {
    return this.timelines.size
  }
}
