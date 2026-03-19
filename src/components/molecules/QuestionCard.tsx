import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, Check } from 'lucide-react';
import { Button } from '@/components/atoms';
import type { AssessmentDefinition } from '@/shared/types';

interface QuestionCardProps {
  assessment: AssessmentDefinition;
  currentQuestionIndex: number;
  answers: Record<string, number>;
  onJumpToQuestion: (index: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  assessment,
  currentQuestionIndex,
  answers,
  onJumpToQuestion,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalQuestions = assessment.questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const getQuestionStatus = (questionId: string, index: number) => {
    const isAnswered = answers[questionId] !== undefined;
    const isCurrent = index === currentQuestionIndex;

    return { isAnswered, isCurrent };
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        leftIcon={<List className="w-4 h-4" />}
        className="fixed bottom-6 right-6 z-40 shadow-lg"
      >
        答题卡
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-white dark:bg-gray-900 z-50 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    答题卡
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    leftIcon={<X className="w-4 h-4" />}
                  >
                    关闭
                  </Button>
                </div>

                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>已答: {answeredCount}</span>
                    <span>未答: {unansweredCount}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                      className="h-full bg-green-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <div className="grid grid-cols-5 gap-2">
                    {assessment.questions.map((question, index) => {
                      const { isAnswered, isCurrent } = getQuestionStatus(question.id, index);

                      return (
                        <button
                          key={question.id}
                          onClick={() => {
                            onJumpToQuestion(index);
                            setIsOpen(false);
                          }}
                          className={`
                            relative w-10 h-10 rounded-lg text-sm font-medium transition-all
                            flex items-center justify-center
                            ${
                              isCurrent
                                ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-900'
                                : ''
                            }
                            ${
                              isAnswered
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }
                          `}
                        >
                          {index + 1}
                          {isAnswered && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-2 h-2 text-white" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30"></span>
                      已答题
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-800"></span>
                      未答题
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-4 h-4 rounded ring-2 ring-primary-500"></span>
                      当前题
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    继续答题
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuestionCard;
