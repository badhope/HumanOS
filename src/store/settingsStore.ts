import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AppSettings {
  // 外观设置
  theme: 'dark' | 'light' | 'system'
  animationsEnabled: boolean
  accentColor: 'violet' | 'blue' | 'green' | 'pink' | 'orange'
  fontSize: number
  
  // 通知设置
  pushNotifications: boolean
  dailyReminder: boolean
  achievementNotifications: boolean
  soundEffects: boolean
  
  // 数据设置
  autoBackup: boolean
  
  // 无障碍设置
  highContrast: boolean
  reducedMotion: boolean
  
  // 隐私设置
  privacyMode: boolean

  // 方法
  setTheme: (theme: 'dark' | 'light' | 'system') => void
  toggleAnimations: () => void
  setAccentColor: (color: 'violet' | 'blue' | 'green' | 'pink' | 'orange') => void
  setFontSize: (size: number) => void
  togglePushNotifications: () => void
  toggleDailyReminder: () => void
  toggleAchievementNotifications: () => void
  toggleSoundEffects: () => void
  toggleAutoBackup: () => void
  toggleHighContrast: () => void
  toggleReducedMotion: () => void
  togglePrivacyMode: () => void
  resetSettings: () => void
}

const defaultSettings: Omit<AppSettings, keyof {
  setTheme: never
  toggleAnimations: never
  setAccentColor: never
  setFontSize: never
  togglePushNotifications: never
  toggleDailyReminder: never
  toggleAchievementNotifications: never
  toggleSoundEffects: never
  toggleAutoBackup: never
  toggleHighContrast: never
  toggleReducedMotion: never
  togglePrivacyMode: never
  resetSettings: never
}> = {
  theme: 'dark',
  animationsEnabled: true,
  accentColor: 'violet',
  fontSize: 100,
  pushNotifications: true,
  dailyReminder: true,
  achievementNotifications: true,
  soundEffects: false,
  autoBackup: true,
  highContrast: false,
  reducedMotion: false,
  privacyMode: true,
}

export const useSettingsStore = create<AppSettings>()(
  persist(
    (set, get) => ({
      ...defaultSettings,

      setTheme: (theme) => {
        set({ theme })
        const root = document.documentElement
        root.classList.remove('light', 'dark', 'system')
        root.classList.add(theme)
        root.setAttribute('data-theme', theme)
      },

      toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),

      setAccentColor: (color) => {
        set({ accentColor: color })
        const root = document.documentElement
        root.style.setProperty('--accent-color', getAccentColorValue(color))
      },

      setFontSize: (size) => {
        set({ fontSize: size })
        const root = document.documentElement
        root.style.fontSize = `${size}%`
      },

      togglePushNotifications: () => set((state) => ({ pushNotifications: !state.pushNotifications })),

      toggleDailyReminder: () => set((state) => ({ dailyReminder: !state.dailyReminder })),

      toggleAchievementNotifications: () => set((state) => ({ achievementNotifications: !state.achievementNotifications })),

      toggleSoundEffects: () => set((state) => ({ soundEffects: !state.soundEffects })),

      toggleAutoBackup: () => set((state) => ({ autoBackup: !state.autoBackup })),

      toggleHighContrast: () => {
        set((state) => ({ highContrast: !state.highContrast }))
        const root = document.documentElement
        root.classList.toggle('high-contrast')
      },

      toggleReducedMotion: () => {
        set((state) => ({ reducedMotion: !state.reducedMotion }))
        const root = document.documentElement
        root.classList.toggle('reduced-motion')
      },

      togglePrivacyMode: () => set((state) => ({ privacyMode: !state.privacyMode })),

      resetSettings: () => {
        set(defaultSettings)
        const root = document.documentElement
        root.classList.remove('light', 'dark', 'system', 'high-contrast', 'reduced-motion')
        root.classList.add('dark')
        root.setAttribute('data-theme', 'dark')
        root.style.setProperty('--accent-color', getAccentColorValue('violet'))
        root.style.fontSize = '100%'
      },
    }),
    {
      name: 'mindmirror-settings',
    }
  )
)

function getAccentColorValue(color: string): string {
  const colors: Record<string, string> = {
    violet: '#8b5cf6',
    blue: '#3b82f6',
    green: '#10b981',
    pink: '#ec4899',
    orange: '#f97316',
  }
  return colors[color] || '#8b5cf6'
}
