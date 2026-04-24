const PRELOAD_PRIORITY = {
  critical: [
    'recharts',
  ],
  high: [
    '@components/reports/MBTIProfessionalReport',
    '@components/reports/BigFiveProfessionalReport',
  ],
  medium: [
    '@components/reports/DISCProfessionalReport',
    '@components/reports/EQProfessionalReport',
    '@components/reports/AttachmentProfessionalReport',
    '@components/reports/DarkTriadProfessionalReport',
    '@components/reports/IdeologyProfessionalReport',
  ],
  low: [
    'html2canvas',
    'jspdf',
  ],
}

class Preloader {
  private loaded = new Set<string>()
  private preloading = false

  start(): void {
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => this.preloadPriority('critical'))
      requestIdleCallback(() => this.preloadPriority('high'), { timeout: 3000 })
      requestIdleCallback(() => this.preloadPriority('medium'), { timeout: 5000 })
      requestIdleCallback(() => this.preloadPriority('low'), { timeout: 8000 })
    } else {
      setTimeout(() => this.preloadPriority('critical'), 500)
      setTimeout(() => this.preloadPriority('high'), 1500)
      setTimeout(() => this.preloadPriority('medium'), 3000)
      setTimeout(() => this.preloadPriority('low'), 5000)
    }
  }

  private async preloadPriority(priority: keyof typeof PRELOAD_PRIORITY): Promise<void> {
    if (this.preloading) return
    this.preloading = true

    const modules = PRELOAD_PRIORITY[priority]

    for (const module of modules) {
      if (this.loaded.has(module)) continue
      if (document.visibilityState === 'hidden') {
        await new Promise(r => setTimeout(r, 1000))
      }
      try {
        await import(module)
        this.loaded.add(module)
      } catch (e) {
      }
    }

    this.preloading = false
  }

  preload(module: string): void {
    if (this.loaded.has(module)) return
    import(module).then(() => {
      this.loaded.add(module)
    }).catch(() => {})
  }

  get stats() {
    return {
      loaded: this.loaded.size,
      total: Object.values(PRELOAD_PRIORITY).flat().length,
    }
  }
}

export const preloader = new Preloader()
