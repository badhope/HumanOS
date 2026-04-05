import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, CompletedAssessment, Answer } from '../types'

// ============ 类型定义 ============

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

// ============ 默认成就 ============

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

// ============ 统一 Store ============

interface AppStore {
  // User Profile (from both stores)
  user: UserProfile | null
  setUser: (user: UserProfile) => void
  updateUserName: (name: string) => void
  updateUserProfile: (updates: Partial<UserProfile>) => void

  // Current Assessment
  currentAssessmentId: string | null
  currentAnswers: Answer[]
  setCurrentAssessment: (id: string) => void
  addAnswer: (answer: Answer) => void
  updateAnswer: (questionId: string, answer: Answer) => void
  clearCurrentAssessment: () => void

  // Assessment History (from useStore)
  completedAssessments: CompletedAssessment[]
  addCompletedAssessment: (assessment: CompletedAssessment) => void
  deleteAssessment: (assessmentId: string, completedAt: Date) => void
  clearAllAssessments: () => void

  // Assessment Records (from useUserStore)
  records: AssessmentRecord[]
  addRecord: (record: AssessmentRecord) => void

  // Achievements
  achievements: Achievement[]
  unlockAchievement: (id: string) => void
  updateAchievementProgress: (id: string, progress: number) => void

  // Favorites
  favorites: string[]
  toggleFavorite: (assessmentId: string) => void

  // Stats
  stats: UserStats

  // Settings
  theme: 'dark' | 'light'
  toggleTheme: () => void

  // UI
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // User Profile
      user: null,
      setUser: (user) => set({ user }),
      updateUserName: (name) => {
        const { user } = get()
        if (user) {
          set({
            user: {
              ...user,
              name,
              updatedAt: new Date(),
            },
          })
        }
      },
      updateUserProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),

      // Current Assessment
      currentAssessmentId: null,
      currentAnswers: [],
      setCurrentAssessment: (id) => set({
        currentAssessmentId: id,
        currentAnswers: []
      }),
      addAnswer: (answer) => set((state) => ({
        currentAnswers: [...state.currentAnswers, answer],
      })),
      updateAnswer: (questionId, answer) => set((state) => ({
        currentAnswers: state.currentAnswers.map((a) =>
          a.questionId === questionId ? answer : a
        ),
      })),
      clearCurrentAssessment: () => set({
        currentAssessmentId: null,
        currentAnswers: [],
      }),

      // History
      completedAssessments: [],
      addCompletedAssessment: (assessment) => set((state) => ({
        completedAssessments: [assessment, ...state.completedAssessments],
      })),
      deleteAssessment: (assessmentId, completedAt) => set((state) => ({
        completedAssessments: state.completedAssessments.filter(
          (a) => !(a.assessmentId === assessmentId && a.completedAt === completedAt)
        ),
      })),
      clearAllAssessments: () => set({
        completedAssessments: [],
        records: [],
      }),

      // Records
      records: [],
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
        }
      }),

      // Achievements
      achievements: [...defaultAchievements],
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

      // Favorites
      favorites: [],
      toggleFavorite: (assessmentId) => set((state) => {
        const isFav = state.favorites.includes(assessmentId)
        return {
          favorites: isFav
            ? state.favorites.filter(id => id !== assessmentId)
            : [...state.favorites, assessmentId]
        }
      }),

      // Stats
      stats: {
        totalAssessments: 0,
        totalTime: 0,
        favoriteCategory: '心理测评',
        personalityTags: [],
        level: 1,
        points: 0,
        streak: 0,
      },

      // Theme
      theme: 'dark',
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'dark' ? 'light' : 'dark'
      })),

      // UI
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'human-os-unified', // 统一存储键
    }
  )
)

// ============ 兼容导出 (向后兼容) ============

// 兼容旧的 useStore
export const useStore = {
  getState: () => {
    const state = useAppStore.getState()
    return {
      user: state.user,
      setUser: state.setUser,
      updateUserName: state.updateUserName,
      currentAssessmentId: state.currentAssessmentId,
      currentAnswers: state.currentAnswers,
      setCurrentAssessment: state.setCurrentAssessment,
      addAnswer: state.addAnswer,
      updateAnswer: state.updateAnswer,
      clearCurrentAssessment: state.clearCurrentAssessment,
      completedAssessments: state.completedAssessments,
      addCompletedAssessment: state.addCompletedAssessment,
      deleteAssessment: state.deleteAssessment,
      isLoading: state.isLoading,
      setIsLoading: state.setIsLoading,
      theme: state.theme,
      toggleTheme: state.toggleTheme,
    }
  },
  subscribe: (listener: (state: any) => void) => useAppStore.subscribe(listener),
}

// 兼容旧的 useUserStore
export const useUserStore = {
  getState: () => {
    const state = useAppStore.getState()
    return {
      profile: state.user,
      records: state.records,
      achievements: state.achievements,
      favorites: state.favorites,
      settings: {
        theme: state.theme,
        notifications: true,
      },
      setProfile: state.setUser,
      updateProfile: state.updateUserProfile,
      addRecord: state.addRecord,
      getRecords: () => state.records,
      getRecordById: (id: string) => state.records.find(r => r.assessmentId === id),
      unlockAchievement: state.unlockAchievement,
      updateAchievementProgress: state.updateAchievementProgress,
      getAchievements: () => state.achievements,
      toggleFavorite: state.toggleFavorite,
      isFavorite: (id: string) => state.favorites.includes(id),
      getFavorites: () => state.favorites,
      getStats: () => {
        const records = state.records
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
    }
  },
  subscribe: (listener: (state: any) => void) => useAppStore.subscribe(listener),
}

export const createDefaultProfile = (): UserProfile => ({
  id: crypto.randomUUID(),
  name: '新用户',
  avatar: '',
  bio: '这个人很懒，什么都没写',
  createdAt: Date.now(),
  assessments: [],
})

export default useAppStore