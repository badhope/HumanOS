import { create } from 'zustand';
import { Assessment, Question, AssessmentResult } from '../types';
import type { User, AuthCredentials, RegisterData } from '../types/auth';
import { storage } from '../lib/utils';
import { 
  calculateBigFiveScores, 
  calculateOverallScore 
} from '../services/bigFiveScoring';
import { calculateStressTestTraits } from '../services/stressTestScoring';
import { calculateGAD7Traits } from '../services/anxietyGad7Scoring';
import { authService } from '../services/auth';
import { pluginLoader } from '../services/plugin/PluginLoader';
import type { Locale } from '../i18n';

const STORAGE_KEY_HISTORY = 'assessmentHistory';
const STORAGE_KEY_LOCALE = 'locale';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;

  assessments: Assessment[];
  currentAssessment: Assessment | null;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, number>;
  
  result: AssessmentResult | null;
  
  isLoading: boolean;
  currentStep: 'intro' | 'quiz' | 'result';
  isSidebarOpen: boolean;
  
  locale: Locale;
  
  assessmentHistory: AssessmentResult[];

  pluginInitialized: boolean;

  initializeAuth: () => void;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  clearAuthError: () => void;

  initializePlugins: () => Promise<void>;

  setAssessments: (assessments: Assessment[]) => void;
  setCurrentAssessment: (assessment: Assessment | null) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setAnswer: (questionId: string, score: number) => void;
  setCurrentStep: (step: 'intro' | 'quiz' | 'result') => void;
  setResult: (result: AssessmentResult | null) => void;
  resetAssessment: () => void;
  calculateResult: (assessmentId: string, assessmentTitle: string) => void;
  
  setLocale: (locale: Locale) => void;
  
  loadHistory: () => void;
  addToHistory: (result: AssessmentResult) => void;
  clearHistory: () => void;
  deleteHistoryItem: (id: string) => void;
  
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => {
  const initialHistory = storage.get<AssessmentResult[]>(STORAGE_KEY_HISTORY, []);
  const initialLocale = storage.get<Locale>(STORAGE_KEY_LOCALE, 'en');
  const initialUser = authService.getCurrentUser();
  
  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
    authLoading: false,
    authError: null,

    assessments: [],
    currentAssessment: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    result: null,
    isLoading: false,
    currentStep: 'intro',
    isSidebarOpen: false,
    locale: initialLocale,
    assessmentHistory: initialHistory,
    pluginInitialized: false,
    
    initializeAuth: () => {
      const user = authService.getCurrentUser();
      set({ 
        user, 
        isAuthenticated: !!user,
        authError: null 
      });
    },

    initializePlugins: async () => {
      if (get().pluginInitialized) return;
      try {
        await pluginLoader.initialize();
        set({ pluginInitialized: true });
      } catch (error) {
        console.error('Failed to initialize plugins:', error);
        set({ pluginInitialized: true });
      }
    },

    login: async (credentials: AuthCredentials) => {
      set({ authLoading: true, authError: null });
      
      try {
        const response = await authService.login(credentials);
        
        if (response.success && response.user) {
          set({ 
            user: response.user, 
            isAuthenticated: true,
            authLoading: false,
            authError: null 
          });
          return true;
        } else {
          set({ 
            authLoading: false,
            authError: response.error || 'Login failed'
          });
          return false;
        }
      } catch (error) {
        set({ 
          authLoading: false,
          authError: 'An unexpected error occurred'
        });
        return false;
      }
    },

    register: async (data: RegisterData) => {
      set({ authLoading: true, authError: null });
      
      try {
        const response = await authService.register(data);
        
        if (response.success && response.user) {
          set({ 
            user: response.user, 
            isAuthenticated: true,
            authLoading: false,
            authError: null 
          });
          return true;
        } else {
          set({ 
            authLoading: false,
            authError: response.error || 'Registration failed'
          });
          return false;
        }
      } catch (error) {
        set({ 
          authLoading: false,
          authError: 'An unexpected error occurred'
        });
        return false;
      }
    },

    logout: () => {
      authService.logout();
      set({ 
        user: null, 
        isAuthenticated: false,
        authError: null 
      });
    },

    clearAuthError: () => {
      set({ authError: null });
    },

    setAssessments: (assessments) => set({ assessments }),
    
    setCurrentAssessment: (assessment) => set({ currentAssessment: assessment }),
    
    setQuestions: (questions) => set({ questions }),
    
    setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
    
    setAnswer: (questionId, score) => 
      set((state) => ({ 
        answers: { ...state.answers, [questionId]: score } 
      })),
    
    setCurrentStep: (step) => set({ currentStep: step }),
    
    setResult: (result) => set({ result }),
    
    setLocale: (locale) => {
      storage.set(STORAGE_KEY_LOCALE, locale);
      set({ locale });
    },
    
    resetAssessment: () => 
      set({ 
        currentQuestionIndex: 0, 
        answers: {}, 
        result: null, 
        currentStep: 'intro' 
      }),
    
    calculateResult: (assessmentId, assessmentTitle) => {
      const { answers, questions } = get();
      
      let traits;
      let totalScore;
      
      if (assessmentId === 'stress-test' || assessmentId === '2') {
        traits = calculateStressTestTraits(answers, questions);
        totalScore = traits[0]?.score || 0;
      } else if (assessmentId === 'anxiety-gad7' || assessmentId === '3') {
        traits = calculateGAD7Traits(answers, questions);
        totalScore = traits[0]?.score || 0;
      } else {
        traits = calculateBigFiveScores(answers, questions);
        totalScore = calculateOverallScore(traits);
      }
      
      const result: AssessmentResult = {
        id: Date.now().toString(),
        totalScore,
        traits,
        completedAt: new Date(),
        assessmentId,
        assessmentTitle
      };
      
      set({ result, currentStep: 'result' });
      get().addToHistory(result);
    },
    
    loadHistory: () => {
      const history = storage.get<AssessmentResult[]>(STORAGE_KEY_HISTORY, []);
      set({ assessmentHistory: history });
    },
    
    addToHistory: (result) => 
      set((state) => {
        const newHistory = [result, ...state.assessmentHistory];
        storage.set(STORAGE_KEY_HISTORY, newHistory);
        return { assessmentHistory: newHistory };
      }),
    
    clearHistory: () => 
      set(() => {
        storage.set(STORAGE_KEY_HISTORY, []);
        return { assessmentHistory: [] };
      }),
    
    deleteHistoryItem: (id) => 
      set((state) => {
        const newHistory = state.assessmentHistory.filter(item => item.id !== id);
        storage.set(STORAGE_KEY_HISTORY, newHistory);
        return { assessmentHistory: newHistory };
      }),
    
    toggleSidebar: () => 
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    
    setSidebarOpen: (open) => 
      set({ isSidebarOpen: open })
  };
});
