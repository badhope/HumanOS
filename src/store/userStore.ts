import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserProfile {
  id: string
  name: string
  avatar: string
  bio: string
  createdAt: number
}

export interface AssessmentRecord {
  assessmentId: string
  completedAt: number
  answers: Record<string, string | number>
  result: Record<string, number | string>
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: number
  progress?: number
  target?: number
}

export interface UserStats {
  totalAssessments: number
  totalTime: number
  favoriteCategory: string
  personalityTags: string[]
  level: number
  points: number
  streak: number
}

interface UserState {
  profile: UserProfile | null
  records: AssessmentRecord[]
  achievements: Achievement[]
  favorites: string[]
  settings: {
    theme: 'dark' | 'light'
    notifications: boolean
  }

  setProfile: (profile: UserProfile) => void
  updateProfile: (updates: Partial<UserProfile>) => void

  addRecord: (record: AssessmentRecord) => void
  getRecords: () => AssessmentRecord[]
  getRecordById: (id: string) => AssessmentRecord | undefined

  unlockAchievement: (id: string) => void
  updateAchievementProgress: (id: string, progress: number) => void
  getAchievements: () => Achievement[]

  toggleFavorite: (assessmentId: string) => void
  isFavorite: (assessmentId: string) => boolean
  getFavorites: () => string[]

  updateStats: () => void
  getStats: () => UserStats

  addPoints: (points: number) => void
  checkLevelUp: () => boolean
}

const defaultAchievements: Achievement[] = [
  { id: 'first-assessment', title: '初次测评', description: '完成你的第一个测评', icon: '🌟', progress: 0, target: 1 },
  { id: 'explorer', title: '探索者', description: '尝试5个不同的测评', icon: '🔍', progress: 0, target: 5 },
  { id: 'psychologist', title: '心理学爱好者', description: '完成10个心理测评', icon: '🧠', progress: 0, target: 10 },
  { id: 'knowledge-seeker', title: '知识追寻者', description: '完成所有认知能力测评', icon: '📚', progress: 0, target: 5 },
  { id: 'social-butterfly', title: '社交达人', description: '分享3次测评结果', icon: '🦋', progress: 0, target: 3 },
  { id: 'streak-7', title: '连续7天', description: '连续7天完成测评', icon: '🔥', progress: 0, target: 7 },
  { id: 'streak-30', title: '月度坚持', description: '连续30天完成测评', icon: '💎', progress: 0, target: 30 },
  { id: 'completionist', title: '完美主义', description: '完成50个测评', icon: '🏆', progress: 0, target: 50 },
  { id: 'night-owl', title: '夜猫子', description: '在凌晨完成测评', icon: '🦉' },
  { id: 'early-bird', title: '早起鸟', description: '在早晨6点前完成测评', icon: '🐦' },
]

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      records: [],
      achievements: [...defaultAchievements],
      favorites: [],
      settings: {
        theme: 'dark',
        notifications: true,
      },

      setProfile: (profile) => set({ profile }),

      updateProfile: (updates) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      })),

      addRecord: (record) => set((state) => {
        const newRecords = [record, ...state.records]
        const completedIds = new Set(newRecords.map(r => r.assessmentId))

        const updatedAchievements = state.achievements.map(a => {
          if (a.id === 'first-assessment' && newRecords.length >= 1) {
            return { ...a, progress: 1, unlockedAt: Date.now() }
          }
          if (a.id === 'explorer' && completedIds.size >= 5) {
            return { ...a, progress: 5, unlockedAt: Date.now() }
          }
          if (a.id === 'completionist' && newRecords.length >= 50) {
            return { ...a, progress: 50, unlockedAt: Date.now() }
          }
          return a
        })

        return {
          records: newRecords,
          achievements: updatedAchievements,
          profile: state.profile ? {
            ...state.profile,
          } : null
        }
      }),

      getRecords: () => get().records,

      getRecordById: (id) => get().records.find(r => r.assessmentId === id),

      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map(a =>
          a.id === id ? { ...a, unlockedAt: Date.now(), progress: a.target || 1 } : a
        )
      })),

      updateAchievementProgress: (id, progress) => set((state) => ({
        achievements: state.achievements.map(a =>
          a.id === id ? { ...a, progress } : a
        )
      })),

      getAchievements: () => get().achievements,

      toggleFavorite: (assessmentId) => set((state) => {
        const isFav = state.favorites.includes(assessmentId)
        return {
          favorites: isFav
            ? state.favorites.filter(id => id !== assessmentId)
            : [...state.favorites, assessmentId]
        }
      }),

      isFavorite: (assessmentId) => get().favorites.includes(assessmentId),

      getFavorites: () => get().favorites,

      updateStats: () => {
        const records = get().records
        const categories = records.map(r => r.assessmentId.split('-')[0])
        const categoryCount: Record<string, number> = {}
        categories.forEach(c => { categoryCount[c] = (categoryCount[c] || 0) + 1 })

        const maxCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]

        set((state) => ({
          profile: state.profile ? {
            ...state.profile,
          } : null
        }))
      },

      getStats: () => {
        const records = get().records
        const points = records.length * 10
        const level = Math.floor(points / 100) + 1

        return {
          totalAssessments: records.length,
          totalTime: records.length * 5,
          favoriteCategory: '心理测评',
          personalityTags: ['内向', '理性', '好奇'],
          level,
          points,
          streak: 0,
        }
      },

      addPoints: (points) => set((state) => {
        if (!state.profile) return state
        return state
      }),

      checkLevelUp: () => {
        const stats = get().getStats()
        return stats.points >= (stats.level * 100)
      },
    }),
    {
      name: 'human-os-user',
    }
  )
)

export const createDefaultProfile = (): UserProfile => ({
  id: crypto.randomUUID(),
  name: '新用户',
  avatar: '',
  bio: '这个人很懒，什么都没写',
  createdAt: Date.now(),
})
