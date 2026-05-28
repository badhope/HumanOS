import { create } from 'zustand';
import type { Question, Answer, Session } from '../services/api';
export type AssessmentState = 'idle' | 'initializing' | 'answering' | 'paused' | 'submitting' | 'completed' | 'error';
export interface AssessmentStateMachineStore {
 state: AssessmentState;
 session: Session | null;
 questions: Question[];
 currentQuestionIndex: number;
 answers: Map<string, Answer>;
 selectedOption: string | null;
 timeLeft: number;
 error: string | null;
 isTimeout: boolean;
 // 状态转换方法
 initialize: (assessmentId: string, mode: 'normal' | 'professional') => Promise<void>;
 startAnswering: () => void;
 selectOption: (optionId: string, value: number) => void;
 saveAnswer: (questionId: string, optionId: string, value: number) => Promise<void>;
 goToQuestion: (index: number) => void;
 goToNext: () => void;
 goToPrevious: () => void;
 pause: () => void;
 resume: () => void;
 submit: () => Promise<void>;
 complete: () => void;
 reset: () => void;
 setError: (error: string | null) => void;
 setTimeLeft: (time: number) => void;
 setTimeout: () => void;
 clearTimeout: () => void;
}
export const useAssessmentStateMachine = create<AssessmentStateMachineStore>((set, get) => ({
 state: 'idle',
 session: null,
 questions: [],
 currentQuestionIndex: 0,
 answers: new Map(),
 selectedOption: null,
 timeLeft: 3600,
 error: null,
 isTimeout: false,
 initialize: async (assessmentId: string, mode: 'normal' | 'professional') => {
 const { apiService } = await import('../services/api');
 set({ state: 'initializing', error: null });
 try {
 const sessionData = await apiService.createSession(assessmentId, mode);
 const storageKey = `mindmirror_answer_draft-${sessionData.session_id}`;
 const saved = localStorage.getItem(storageKey);
 let savedAnswers = new Map<string, Answer>();
 if (saved) {
 try {
 const parsed = JSON.parse(saved);
 if (Array.isArray(parsed)) {
 parsed.forEach((a: any) => {
 savedAnswers.set(a.question_id, a);
 });
 }
 }
 catch (e) {
 console.error('Failed to load saved answers:', e);
 }
 }
 set({
 session: sessionData,
 questions: sessionData.questions || [],
 answers: savedAnswers,
 state: 'answering',
 timeLeft: 3600,
 isTimeout: false,
 });
 }
 catch (err) {
 console.error('Failed to initialize session:', err);
 set({
 state: 'error',
 error: typeof err === 'string' ? err : '无法加载测评题目，请稍后重试',
 });
 }
 },
 startAnswering: () => {
 set({ state: 'answering' });
 },
 selectOption: (optionId: string, value: number) => {
 const { currentQuestionIndex, questions, answers } = get();
 const question = questions[currentQuestionIndex];
 if (!question)
 return;
 set({ selectedOption: optionId });
 const newAnswers = new Map(answers);
 newAnswers.set(question.id, {
 id: crypto.randomUUID(),
 session_id: get().session?.session_id || '',
 question_id: question.id,
 selected_option_id: optionId,
 value,
 created_at: new Date().toISOString(),
 });
 set({ answers: newAnswers });
 },
 saveAnswer: async (questionId: string, optionId: string, value: number) => {
 const { apiService } = await import('../services/api');
 const { session, answers } = get();
 if (!session)
 return;
 try {
 const answer = await apiService.saveAnswer(session.session_id, questionId, optionId, value);
 const newAnswers = new Map(answers);
 newAnswers.set(questionId, {
 id: answer.answer_id,
 session_id: session.session_id,
 question_id: questionId,
 selected_option_id: optionId,
 value,
 created_at: new Date().toISOString(),
 });
 set({ answers: newAnswers });
 const storageKey = `mindmirror_answer_draft-${session.session_id}`;
 localStorage.setItem(storageKey, JSON.stringify(Array.from(newAnswers.values())));
 }
 catch (err) {
 console.error('Failed to save answer:', err);
 }
 },
 goToQuestion: (index: number) => {
 const { questions } = get();
 if (index >= 0 && index < questions.length) {
 const question = questions[index];
 const savedAnswer = get().answers.get(question.id);
 set({
 currentQuestionIndex: index,
 selectedOption: savedAnswer?.selected_option_id || null,
 });
 }
 },
 goToNext: () => {
 const { currentQuestionIndex, questions } = get();
 if (currentQuestionIndex < questions.length - 1) {
 get().goToQuestion(currentQuestionIndex + 1);
 }
 },
 goToPrevious: () => {
 const { currentQuestionIndex } = get();
 if (currentQuestionIndex > 0) {
 get().goToQuestion(currentQuestionIndex - 1);
 }
 },
 pause: () => {
 set({ state: 'paused' });
 },
 resume: () => {
 set({ state: 'answering' });
 },
 submit: async () => {
 const { apiService } = await import('../services/api');
 const { session, answers, state } = get();
 if (!session || state !== 'answering')
 return;
 set({ state: 'submitting' });
 try {
 const storageKey = `mindmirror_answer_draft-${session.session_id}`;
 localStorage.removeItem(storageKey);
 }
 catch (e) {
 console.error('Failed to clear localStorage:', e);
 }
 },
 complete: () => {
 set({ state: 'completed' });
 },
 reset: () => {
 set({
 state: 'idle',
 session: null,
 questions: [],
 currentQuestionIndex: 0,
 answers: new Map(),
 selectedOption: null,
 timeLeft: 3600,
 error: null,
 isTimeout: false,
 });
 },
 setError: (error: string | null) => {
 set({ error, state: error ? 'error' : get().state });
 },
 setTimeLeft: (time: number) => {
 set({ timeLeft: time });
 },
 setTimeout: () => {
 set({ isTimeout: true });
 },
 clearTimeout: () => {
 set({ isTimeout: false });
 },
}));
export default useAssessmentStateMachine;
