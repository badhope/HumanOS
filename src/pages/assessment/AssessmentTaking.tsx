import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Grid3x3, Clock, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';
import { apiService } from '../../services/api';
import { useAppStore } from '../../store';
import { useAssessmentStateMachine, AssessmentState } from '../../store/assessmentStateMachine';
import { cn } from '../../utils/cn';
import AnswerSheet from '../../components/assessment/AnswerSheet';
import { AssessmentOption } from '../../components/assessment/AssessmentOption';
import type { Variants } from 'framer-motion';

const QUESTION_TIME_LIMIT = 3600;

export default function AssessmentTaking() {
  const { assessmentId: paramAssessmentId } = useParams<{ assessmentId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  
  // 答题卡状态
  const [isAnswerSheetOpen, setIsAnswerSheetOpen] = useState(false);
  
  // Extract assessmentId from pathname
  const pathParts = location.pathname.split('/');
  const assessmentId = paramAssessmentId || (pathParts.length > 2 ? pathParts[2] : null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const {
    state,
    session,
    questions,
    currentQuestionIndex,
    answers,
    selectedOption,
    timeLeft,
    error,
    isTimeout,
    initialize,
    selectOption,
    saveAnswer,
    goToQuestion,
    goToNext,
    goToPrevious,
    submit,
    setTimeLeft,
    setTimeout: markTimeout,
    setError,
    reset,
    pause,
  } = useAssessmentStateMachine();

  const currentAssessmentMode = useAppStore((state) => state.currentAssessmentMode);
  const addCompletedAssessment = useAppStore((state) => state.addCompletedAssessment);

  console.log('assessmentId from useParams:', assessmentId);
  const isEnhancedIdeology = assessmentId === 'ideology-enhanced';
  const effectiveMode = isEnhancedIdeology ? (currentAssessmentMode || 'normal') : 'normal';
  console.log('AssessmentTaking:', { assessmentId, isEnhancedIdeology, currentAssessmentMode, effectiveMode });

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (state === 'answering' && answers.size > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state, answers.size]);

  useEffect(() => {
    if (!assessmentId) return;

    console.log('Running initialize with:', assessmentId, effectiveMode);
    initialize(assessmentId, effectiveMode as 'normal' | 'professional');

    return () => {
      reset();
    };
  }, [assessmentId, effectiveMode, navigate, initialize, reset]);

  useEffect(() => {
    if (state !== 'answering' || !session) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          markTimeout();
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state, session, setTimeLeft, markTimeout]);

  const handleSelectOption = useCallback(async (optionId: string, value: number) => {
    if (!session || !questions[currentQuestionIndex]) return;

    selectOption(optionId, value);
    await saveAnswer(questions[currentQuestionIndex].id, optionId, value);
  }, [session, questions, currentQuestionIndex, selectOption, saveAnswer]);

  const handleSubmit = useCallback(async () => {
    if (!session || !assessmentId) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    try {
      await submit(); // 使用 store 中已有的 submit 函数
      
      const result = await apiService.submitAssessment(session.session_id);
      
      addCompletedAssessment({
        id: result.result_id || result.id,
        assessmentId: assessmentId,
        answers: Array.from(answers.values()).map((a: any) => ({
          questionId: a.question_id,
          selectedOptionId: a.selected_option_id,
          value: a.value,
        })),
        result: result,
        completedAt: new Date(),
        mode: effectiveMode as 'normal' | 'professional',
      });

      navigate(`/assessment/${assessmentId}/result/${result.result_id || result.id}`, {
        state: { calculationResult: result },
      });
    } catch (error) {
      console.error('提交失败:', error);
      setError('提交失败，请稍后重试');
    }
  }, [session, assessmentId, answers, addCompletedAssessment, navigate, submit, setError]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = startXRef.current;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const deltaX = currentXRef.current - startXRef.current;
    const minSwipeDistance = isMobile ? 50 : 100;

    if (deltaX > minSwipeDistance && currentQuestionIndex > 0) {
      goToPrevious();
    } else if (deltaX < -minSwipeDistance && currentQuestionIndex < questions.length - 1) {
      goToNext();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    currentXRef.current = startXRef.current;
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const deltaX = currentXRef.current - startXRef.current;
    const minSwipeDistance = isMobile ? 50 : 100;

    if (deltaX > minSwipeDistance && currentQuestionIndex > 0) {
      goToPrevious();
    } else if (deltaX < -minSwipeDistance && currentQuestionIndex < questions.length - 1) {
      goToNext();
    }
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  // 所有的 Hook 和变量必须在条件语句之前定义
  const question = questions[currentQuestionIndex];
  const answeredCount = answers.size;
  const progress = (answeredCount / questions.length) * 100;

  const optionVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.2 },
      }),
    }),
    []
  );

  if (state === 'initializing') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">正在加载题目...</p>
        </div>
      </div>
    );
  }

  if (state === 'error' || !session || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">加载失败</h2>
          <p className="text-white/60 mb-6">{error || '无法加载测评题目'}</p>
          <button
            onClick={() => navigate('/assessments')}
            className="px-6 py-3 bg-violet-500 text-white rounded-xl font-semibold"
          >
            返回测评列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950">
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                  effectiveMode === 'professional'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                }`}
              >
                {effectiveMode === 'professional' ? '专业版' : '普通版'}
              </span>
              <span className="text-white/60 text-sm hidden sm:inline">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  timeLeft < 300 ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/60'
                }`}
              >
                <Clock size={16} />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>

              <button
                onClick={() => setIsAnswerSheetOpen(true)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Grid3x3 size={20} className="text-white/60" />
              </button>

              <button
                onClick={() => navigate('/assessments')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-white/60" />
              </button>
            </div>
          </div>

          <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="max-w-2xl mx-auto px-4 py-8 select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs mb-4">
                <span className="font-medium">
                  {question.type === 'core-principle'
                    ? '核心原则'
                    : question.type === 'policy-stand'
                    ? '政策立场'
                    : question.type === 'value-question'
                    ? '价值取向'
                    : '权衡判断'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                {question.text}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <AssessmentOption
                  key={option.id || index}
                  option={option}
                  index={index}
                  selected={!!(option.id && selectedOption === option.id)}
                  onClick={(id) => handleSelectOption(id, option.value)}
                  variants={optionVariants}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pt-8 pb-6 sm:pb-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevious}
              disabled={currentQuestionIndex === 0}
              className={cn(
                "flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all",
                currentQuestionIndex === 0
                  ? "bg-white/5 text-white/30 cursor-not-allowed"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">上一题</span>
            </button>

            <div className="flex-1 text-center text-sm text-white/60">
              已回答 {answeredCount} / {questions.length} 题
            </div>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
              >
                <CheckCircle2 size={18} />
                <span>提交</span>
              </button>
            ) : (
              <button
                onClick={goToNext}
                className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <span className="hidden sm:inline">下一题</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          {isMobile && (
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-white/40">
              <span>← 左滑上一题</span>
              <span>·</span>
              <span>右滑下一题 →</span>
            </div>
          )}
        </div>
      </div>

      {isTimeout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">正在计算结果...</h3>
            <p className="text-white/60">请稍候</p>
          </motion.div>
        </div>
      )}

      <AnswerSheet
        isOpen={isAnswerSheetOpen}
        onClose={() => setIsAnswerSheetOpen(false)}
        questions={questions}
        answers={Array.from(answers.values())}
        currentQuestion={currentQuestionIndex}
        onQuestionSelect={(index) => {
          goToQuestion(index);
          setIsAnswerSheetOpen(false);
        }}
      />
    </div>
  );
}
