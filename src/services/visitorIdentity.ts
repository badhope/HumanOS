// =============================================================================
//  匿名访客身份系统 - 行为追踪
// =============================================================================
// 【设计原则】
//  - 无需登录即可获得唯一身份
//  - 不收集个人隐私，只做聚合统计
//  - localStorage + Cookie 双存储，防丢失
//  - 后端可基于此做漏斗分析

const VISITOR_ID_KEY = 'mindmirror_visitor_id'
const VISITOR_COOKIE_KEY = 'visitor_id'

export interface VisitorProfile {
  id: string
  firstVisit: number
  lastVisit: number
  visitCount: number
  assessmentsCompleted: number
  userAgent: string
  fingerprint: string
}

class VisitorIdentityService {
  private profile: VisitorProfile | null = null

  constructor() {
    this.init()
  }

  private init() {
    let stored = localStorage.getItem(VISITOR_ID_KEY)
    
    if (stored) {
      try {
        this.profile = JSON.parse(stored)
        this.updateVisit()
      } catch {
        this.createNewProfile()
      }
    } else {
      const fromCookie = this.getFromCookie()
      if (fromCookie) {
        this.profile = fromCookie
        this.updateVisit()
      } else {
        this.createNewProfile()
      }
    }

    this.persist()
  }

  private getFromCookie(): VisitorProfile | null {
    const match = document.cookie.match(new RegExp('(^| )' + VISITOR_COOKIE_KEY + '=([^;]+)'))
    if (match && match[2]) {
      try {
        return JSON.parse(atob(match[2]))
      } catch {
        return null
      }
    }
    return null
  }

  private generateFingerprint(): string {
    const features = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      navigator.platform,
      navigator.hardwareConcurrency || 'unknown',
    ]
    
    let hash = 0
    const str = features.join('|')
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(36)
  }

  private createNewProfile() {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })

    this.profile = {
      id: uuid,
      firstVisit: Date.now(),
      lastVisit: Date.now(),
      visitCount: 1,
      assessmentsCompleted: 0,
      userAgent: navigator.userAgent.slice(0, 100),
      fingerprint: this.generateFingerprint(),
    }
  }

  private updateVisit() {
    if (!this.profile) return
    
    this.profile.lastVisit = Date.now()
    this.profile.visitCount++
  }

  private persist() {
    if (!this.profile) return
    
    localStorage.setItem(VISITOR_ID_KEY, JSON.stringify(this.profile))
    
    try {
      const cookieValue = btoa(JSON.stringify({ id: this.profile.id }))
      document.cookie = `${VISITOR_COOKIE_KEY}=${cookieValue}; max-age=31536000; path=/; SameSite=Lax`
    } catch {}
  }

  getVisitorId(): string {
    return this.profile?.id || 'anonymous'
  }

  getProfile(): VisitorProfile {
    return this.profile!
  }

  recordAssessmentCompleted() {
    if (!this.profile) return
    this.profile.assessmentsCompleted++
    this.persist()
  }

  resetIdentity() {
    localStorage.removeItem(VISITOR_ID_KEY)
    document.cookie = `${VISITOR_COOKIE_KEY}=; max-age=0; path=/`
    this.createNewProfile()
    this.persist()
  }
}

const visitorService = new VisitorIdentityService()

export { visitorService }

export default visitorService
