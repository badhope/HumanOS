import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { PageTransition } from '@/components/molecules';
import { Button, Progress, Card } from '@/components/atoms';
import { useSettingsStore } from '@/store/settingsStore';
import { useQuizStore } from '@/store/quizStore';

interface QuestionData {
  id: string;
  text: string;
  options: { id: string; text: string; value: number }[];
}

interface QuizData {
  id: string;
  name: string;
  duration: number;
  questions: QuestionData[];
}

const MOCK_QUIZ_DATA: Record<string, QuizData> = {
  mbti: {
    id: 'mbti',
    name: 'MBTI 职业性格测试',
    duration: 15,
    questions: [
      {
        id: 'q1',
        text: '在社交场合中，你通常会：',
        options: [
          { id: 'a', text: '主动与陌生人交谈', value: 1 },
          { id: 'b', text: '等待别人来接近你', value: 2 },
        ],
      },
      {
        id: 'q2',
        text: '你更倾向于：',
        options: [
          { id: 'a', text: '提前规划安排', value: 1 },
          { id: 'b', text: '随机应变', value: 2 },
        ],
      },
      {
        id: 'q3',
        text: '你更容易被什么所吸引：',
        options: [
          { id: 'a', text: '事实和数据', value: 1 },
          { id: 'b', text: '创意和可能性', value: 2 },
        ],
      },
    ],
  },
};

const Quiz: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const { animationLevel, reducedMotion } = useSettingsStore();
  const {
    currentQuestionIndex,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    setCurrentAssessment,
    completeQuiz,
  } = useQuizStore();

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (assessmentId) {
      setCurrentAssessment(assessmentId);
      if (MOCK_QUIZ_DATA[assessmentId]) {
        setQuizData(MOCK_QUIZ_DATA[assessmentId]);
        setTimeLeft(MOCK_QUIZ_DATA[assessmentId].duration * 60);
      }
    }
  }, [assessmentId, setCurrentAssessment]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    completeQuiz();
    if (assessmentId) {
      navigate(`/results/${assessmentId}`);
    }
  };

  if (!quizData) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </PageTransition>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/categories')}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              退出
            </Button>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-5 h-5" />
              <span className={`font-mono ${timeLeft < 60 ? 'text-red-500' : ''}`}>
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="mb-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>问题 {currentQuestionIndex + 1} / {quizData.questions.length}</span>
            <span>已回答 {answeredCount} 题</span>
          </div>

          <Progress value={progress} className="mb-8" />

          <motion.div
            key={currentQuestionIndex}
            initial={reducedMotion || animationLevel === 'none' ? {} : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6">
              <h2 className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
                {currentQuestion.text}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={reducedMotion || animationLevel === 'none' ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => setAnswer(currentQuestion.id, option.value)}
                    className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                    }`}
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {option.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="flex-1"
            >
              上一题
            </Button>
            {currentQuestionIndex < quizData.questions.length - 1 ? (
              <Button
                onClick={nextQuestion}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="flex-1"
              >
                下一题
              </Button>
            ) : (
              <Button
                onClick={() => setShowConfirm(true)}
                rightIcon={<AlertCircle className="w-4 h-4" />}
                className="flex-1"
              >
                交卷
              </Button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {quizData.questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => {
                  // Jump to question functionality
                }}
                className={`h-8 w-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-primary-500 text-white'
                    : answers[q.id] !== undefined
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {showConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setShowConfirm(false)}
            >
              <Card className="max-w-sm" onClick={(e) => e.stopPropagation()}>
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  确认交卷
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  你已回答 {answeredCount} / {quizData.questions.length} 题，确定要提交吗？
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => setShowConfirm(false)}
                    className="flex-1"
                  >
                    再检查一下
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1">
                    确定交卷
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Quiz;
