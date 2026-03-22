import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, CompletedAssessment, Answer, AssessmentResult } from '@types'

interface AppState {
  // User Profile
  user: UserProfile | null
  setUser: (user: UserProfile) => void
  updateUserName: (name: string) => void
  
  // Current Assessment
  currentAssessmentId: string | null
  currentAnswers: Answer[]
  setCurrentAssessment: (id: string) => void
  addAnswer: (answer: Answer) => void
  updateAnswer: (questionId: string, answer: Answer) => void
  clearCurrentAssessment: () => void
  
  // Assessment History
  completedAssessments: CompletedAssessment[]
  addCompletedAssessment: (assessment: CompletedAssessment) => void
  deleteAssessment: (assessmentId: string, completedAt: Date) => void
  
  // UI State
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Theme
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User
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
      
      // UI
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      
      // Theme
      theme: 'dark',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),
    }),
    {
      name: 'human-os-storage',
    }
  )
)

export default useStore
