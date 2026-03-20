import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, X, List, AlertTriangle, Save, FileText } from 'lucide-react';
import { PageTransition } from '@/components/molecules';
import { Button, Progress, Card } from '@/components/atoms';
import { useSettingsStore } from '@/store/settingsStore';
import { useQuizStore } from '@/store/quizStore';
import { fetchAssessmentBySlug } from '@/features/assessment/registry';
import { saveDraft, getDraftByAssessmentSlug, deleteDraftByAssessmentSlug } from '@/features/storage/draftService';
import type { AssessmentDefinition, DraftRecord } from '@/shared/types';

const Quiz: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const { animationLevel, reducedMotion, autoSaveDraft, showTimer: showTimerSetting } = useSettingsStore();
  const {
    currentQuestionIndex,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    setCurrentAssessment,
    setCurrentQuestionIndex,
    completeQuiz,
    resetQuiz,
    startTime,
    setStartTime,
  } = useQuizStore();

  const [assessment, setAssessment] = useState<AssessmentDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnswerSheetOpen, setIsAnswerSheetOpen] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);
  const [draftRecord, setDraftRecord] = useState<DraftRecord | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    async function loadAssessment() {
      if (!assessmentId) {
        setError('测评 ID 不存在');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchAssessmentBySlug(assessmentId);
        if (!data) {
          setError('未找到该测评');
          setLoading(false);
          return;
        }
        setAssessment(data);

        const existingDraft = await getDraftByAssessmentSlug(assessmentId);
        if (existingDraft) {
          const questionIds = new Set(data.questions.map(q => q.id));
          const validAnswers: Record<string, number> = {};
          let hasInvalidAnswers = false;

          for (const [qId, answer] of Object.entries(existingDraft.answers)) {
            if (questionIds.has(qId)) {
              validAnswers[qId] = answer;
            } else {
              hasInvalidAnswers = true;
            }
          }

          if (hasInvalidAnswers) {
            await deleteDraftByAssessmentSlug(assessmentId);
            existingDraft.answers = validAnswers;
            if (Object.keys(validAnswers).length === 0) {
              setDraftRecord(null);
            } else {
              existingDraft.currentQuestionIndex = Math.min(
                existingDraft.currentQuestionIndex,
                data.questions.length - 1
              );
              setDraftRecord({ ...existingDraft, answers: validAnswers });
            }
          } else {
            const validQuestionIndex = Math.min(
              existingDraft.currentQuestionIndex,
              data.questions.length - 1
            );
            setDraftRecord({ ...existingDraft, currentQuestionIndex: validQuestionIndex });
          }
        }

        if (!startTime) {
          setStartTime(new Date());
        }
        setCurrentAssessment(assessmentId);
      } catch (err) {
        console.error('Failed to load assessment:', err);
        setError('加载测评失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    }

    loadAssessment();
  }, [assessmentId, setCurrentAssessment, setStartTime, startTime]);

  useEffect(() => {
    if (!showTimerSetting || !startTime) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimerSetting, startTime]);

  const handleRestoreDraft = useCallback(() => {
    if (!draftRecord) return;

    resetQuiz();
    
    const restoredStartTime = draftRecord.startedAt 
      ? new Date(draftRecord.startedAt) 
      : new Date();
    
    const validQuestionIndex = Math.min(
      draftRecord.currentQuestionIndex || 0,
      draftRecord.totalQuestions - 1,
      0
    );
    
    useQuizStore.setState({
      answers: draftRecord.answers || {},
      currentQuestionIndex: validQuestionIndex,
      isCompleted: false,
      startTime: restoredStartTime,
    });

    setDraftRecord(null);
  }, [draftRecord, resetQuiz]);

  const handleDiscardDraft = useCallback(async () => {
    if (!assessmentId) return;
    await deleteDraftByAssessmentSlug(assessmentId);
    resetQuiz();
    setDraftRecord(null);
  }, [assessmentId, resetQuiz]);

  const handleAutoSave = useCallback(async () => {
    if (!autoSaveDraft || !assessmentId || !assessment || submitting) return;

    const answeredCount = Object.keys(answers).length;
    if (answeredCount === 0) return;

    try {
      await saveDraft({
        assessmentId,
        assessmentSlug: assessment.slug,
        assessmentName: assessment.name,
        category: assessment.category,
        answers,
        currentQuestionIndex,
        totalQuestions: assessment.questions.length,
        startedAt: startTime?.toISOString() || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isAbandoned: false,
      });
      setLastSaved(new Date());
    } catch (err) {
      console.error('Failed to save draft:', err);
    }
  }, [autoSaveDraft, assessmentId, assessment, answers, currentQuestionIndex, startTime, submitting]);

  useEffect(() => {
    if (autoSaveDraft && assessment && Object.keys(answers).length > 0) {
      const timeoutId = setTimeout(handleAutoSave, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [answers, autoSaveDraft, handleAutoSave, assessment]);

  useEffect(() => {
    if (!autoSaveDraft || !assessmentId || !assessment) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const answeredCount = Object.keys(answers).length;
      if (answeredCount === 0) return;

      const draftKey = `humans_os_draft_${assessmentId}`;
      const draftData = {
        assessmentId,
        assessmentSlug: assessment.slug,
        assessmentName: assessment.name,
        category: assessment.category,
        answers,
        currentQuestionIndex,
        totalQuestions: assessment.questions.length,
        startedAt: startTime?.toISOString() || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isAbandoned: false,
      };

      try {
        localStorage.setItem(draftKey, JSON.stringify(draftData));
      } catch (err) {
        console.error('Failed to save draft before unload:', err);
      }

      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [autoSaveDraft, assessmentId, assessment, answers, currentQuestionIndex, startTime]);

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsAnswerSheetOpen(false);
  };

  const handleSubmit = async () => {
    if (!assessment || !assessmentId || submitting) return;

    const answeredCount = Object.keys(answers).length;
    const totalQuestions = assessment.questions.length;

    if (answeredCount < totalQuestions) {
      setShowIncompleteWarning(true);
      setTimeout(() => setShowIncompleteWarning(false), 3000);
      return;
    }

    setSubmitting(true);

    try {
      completeQuiz();

      await deleteDraftByAssessmentSlug(assessmentId);

      const resultData = {
        assessmentId,
        answers,
        completedAt: new Date().toISOString(),
      };
      localStorage.setItem(`quiz_result_${assessmentId}`, JSON.stringify(resultData));

      navigate(`/results/${assessmentId}`);
    } catch (err) {
      console.error('Failed to submit:', err);
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!assessment) return;

    const totalQuestions = assessment.questions.length;

    if (currentQuestionIndex < totalQuestions - 1) {
      nextQuestion();
    } else {
      const answeredCount = Object.keys(answers).length;
      if (answeredCount < totalQuestions) {
        setShowIncompleteWarning(true);
        setTimeout(() => setShowIncompleteWarning(false), 3000);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      prevQuestion();
    }
  };

  const handleOptionSelect = (questionId: string, optionValue: number) => {
    setAnswer(questionId, optionValue);
  };

  const formatElapsedTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">加载中...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !assessment) {
    return (
      <PageTransition>
        <div className="min-h-screen px-4 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {error || '加载失败'}
            </h2>
            <Button onClick={() => navigate('/categories')}>
              返回测评分类
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const totalQuestions = assessment.questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const allAnswered = answeredCount === totalQuestions;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const currentAnswer = answers[currentQuestion?.id];

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25 },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  return (
    <PageTransition>
      <div className="min-h-screen pb-32">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/categories')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="mb-4"
          >
            返回
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {assessment.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {assessment.shortDescription}
            </p>
          </motion.div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                第 {currentQuestionIndex + 1} / {totalQuestions} 题
              </span>
              <div className="flex items-center gap-3">
                {showTimerSetting && startTime && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatElapsedTime(elapsedTime)}
                  </span>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  约 {assessment.estimatedMinutes} 分钟
                </span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>已答 {answeredCount} 题</span>
              <span className={unansweredCount > 0 ? 'text-amber-500' : 'text-green-500'}>
                {unansweredCount > 0 ? `还有 ${unansweredCount} 题未答` : '已全部作答'}
              </span>
            </div>
          </div>

          {autoSaveDraft && lastSaved && (
            <div className="mb-4 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <Save className="w-3 h-3" />
              上次保存: {lastSaved.toLocaleTimeString('zh-CN')}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              variants={reducedMotion || animationLevel === 'none' ? {} : containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Card className="p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                    {assessment.dimensions.find(d => d.id === currentQuestion.dimension)?.name || currentQuestion.dimension}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 leading-relaxed">
                  {currentQuestion.text}
                </h2>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = currentAnswer === option.value;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-sm'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1 leading-snug">{option.text}</span>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-primary-500 shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {showIncompleteWarning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
              >
                请先完成所有题目，还剩 {unansweredCount} 题未答
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 z-40">
          <div className="mx-auto max-w-2xl px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className="shrink-0"
              >
                上一题
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsAnswerSheetOpen(true)}
                leftIcon={<List className="w-4 h-4" />}
                className="shrink-0"
              >
                答题卡
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded bg-gray-100 dark:bg-gray-800">
                  {answeredCount}/{totalQuestions}
                </span>
              </Button>

              {isLastQuestion ? (
                <Button
                  onClick={() => setShowSubmitConfirm(true)}
                  disabled={!allAnswered || submitting}
                  rightIcon={<CheckCircle className="w-4 h-4" />}
                  className={`shrink-0 ${!allAnswered ? 'opacity-50' : ''}`}
                >
                  {submitting ? '提交中...' : '提交'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="shrink-0"
                >
                  下一题
                </Button>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isAnswerSheetOpen && (
            <AnswerSheet
              assessment={assessment}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              onJumpToQuestion={handleJumpToQuestion}
              onClose={() => setIsAnswerSheetOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSubmitConfirm && (
            <SubmitConfirmModal
              totalQuestions={totalQuestions}
              onConfirm={handleSubmit}
              onCancel={() => setShowSubmitConfirm(false)}
              submitting={submitting}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {draftRecord && (
            <DraftRestoreModal
              assessmentName={assessment.name}
              onRestore={handleRestoreDraft}
              onDiscard={handleDiscardDraft}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

interface AnswerSheetProps {
  assessment: AssessmentDefinition;
  currentQuestionIndex: number;
  answers: Record<string, number>;
  onJumpToQuestion: (index: number) => void;
  onClose: () => void;
}

const AnswerSheet: React.FC<AnswerSheetProps> = ({
  assessment,
  currentQuestionIndex,
  answers,
  onJumpToQuestion,
  onClose,
}) => {
  const totalQuestions = assessment.questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed left-0 right-0 bottom-0 max-h-[70vh] bg-white dark:bg-gray-900 z-50 rounded-t-2xl shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              答题卡
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              已答 {answeredCount} 题 · 未答 {unansweredCount} 题
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              className="h-full bg-primary-500 rounded-full"
            />
          </div>
        </div>

        <div className="p-4 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-5 gap-2">
            {assessment.questions.map((question, index) => {
              const isAnswered = answers[question.id] !== undefined;
              const isCurrent = index === currentQuestionIndex;

              return (
                <button
                  key={question.id}
                  onClick={() => onJumpToQuestion(index)}
                  className={`
                    relative w-11 h-11 rounded-xl text-sm font-semibold transition-all
                    flex items-center justify-center
                    ${isCurrent ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-900' : ''}
                    ${isAnswered
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-300'
                    }
                  `}
                >
                  {index + 1}
                  {isAnswered && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-white" />
                    </span>
                  )}
                  {isCurrent && !isAnswered && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
              </span>
              <span className="text-gray-600 dark:text-gray-400">已答题</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-gray-100 dark:bg-gray-800"></span>
              <span className="text-gray-600 dark:text-gray-400">未答题</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded ring-2 ring-primary-500"></span>
              <span className="text-gray-600 dark:text-gray-400">当前题</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="primary" className="w-full" onClick={onClose}>
            继续答题
          </Button>
        </div>
      </motion.div>
    </>
  );
};

interface SubmitConfirmModalProps {
  totalQuestions: number;
  onConfirm: () => void;
  onCancel: () => void;
  submitting: boolean;
}

const SubmitConfirmModal: React.FC<SubmitConfirmModalProps> = ({
  totalQuestions,
  onConfirm,
  onCancel,
  submitting,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onCancel}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm w-full bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl z-50"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          确认提交
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          您已完成所有 {totalQuestions} 道题目。确认提交后将无法修改答案。
        </p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel} disabled={submitting}>
            再检查一下
          </Button>
          <Button variant="primary" className="flex-1" onClick={onConfirm} disabled={submitting}>
            {submitting ? '提交中...' : '确认提交'}
          </Button>
        </div>
      </motion.div>
    </>
  );
};

interface DraftRestoreModalProps {
  assessmentName: string;
  onRestore: () => void;
  onDiscard: () => void;
}

const DraftRestoreModal: React.FC<DraftRestoreModalProps> = ({
  assessmentName,
  onRestore,
  onDiscard,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm w-full bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl z-50"
      >
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-amber-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            发现未完成的测评
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          您之前开始过「{assessmentName}」的测评，是否要继续？
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
          选择「放弃」将清除之前的进度
        </p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onDiscard}>
            放弃
          </Button>
          <Button variant="primary" className="flex-1" onClick={onRestore}>
            继续作答
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default Quiz;