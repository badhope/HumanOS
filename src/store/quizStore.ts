import { create } from 'zustand';

interface QuizState {
  currentAssessmentId: string | null;
  currentQuestionIndex: number;
  answers: Record<string, number>;
  isCompleted: boolean;
  startTime: Date | null;
  setCurrentAssessment: (id: string) => void;
  setAnswer: (questionId: string, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  setCurrentQuestionIndex: (index: number) => void;
  setStartTime: (time: Date) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  currentAssessmentId: null,
  currentQuestionIndex: 0,
  answers: {},
  isCompleted: false,
  startTime: null,

  setCurrentAssessment: (id) =>
    set({
      currentAssessmentId: id,
      currentQuestionIndex: 0,
      answers: {},
      isCompleted: false,
      startTime: new Date(),
    }),

  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),

  prevQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
    })),

  setCurrentQuestionIndex: (index) =>
    set({ currentQuestionIndex: index }),

  setStartTime: (time) =>
    set({ startTime: time }),

  completeQuiz: () =>
    set({
      isCompleted: true,
    }),

  resetQuiz: () =>
    set({
      currentAssessmentId: null,
      currentQuestionIndex: 0,
      answers: {},
      isCompleted: false,
      startTime: null,
    }),
}));
