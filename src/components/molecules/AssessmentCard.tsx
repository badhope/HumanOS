import { motion } from 'framer-motion';
import { cn } from '@/shared/utils';
import { useSettingsStore } from '@/store/settingsStore';
import { Clock, Users, BarChart2 } from 'lucide-react';
import type { AssessmentMetadata } from '@/shared/types';

interface AssessmentCardProps {
  assessment: AssessmentMetadata;
  onClick?: () => void;
  className?: string;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export function AssessmentCard({ assessment, onClick, className }: AssessmentCardProps) {
  const { animationLevel, reducedMotion } = useSettingsStore();

  const content = (
    <>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {assessment.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {assessment.description}
          </p>
        </div>
        <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium capitalize', difficultyColors[assessment.difficulty])}>
          {assessment.difficulty === 'easy' ? '简单' : assessment.difficulty === 'medium' ? '中等' : '困难'}
        </span>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{assessment.duration} 分钟</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span>{assessment.participantCount} 人测过</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BarChart2 className="w-4 h-4" />
          <span>{assessment.questionCount} 题</span>
        </div>
      </div>
      {assessment.averageScore !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500 dark:text-gray-400">平均得分</span>
            <span className="font-medium text-gray-900 dark:text-white">{assessment.averageScore}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${assessment.averageScore}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-primary-500 rounded-full"
            />
          </div>
        </div>
      )}
    </>
  );

  if (!onClick) {
    return (
      <div className={cn('rounded-xl bg-white p-5 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700', className)}>
        {content}
      </div>
    );
  }

  if (reducedMotion || animationLevel === 'none') {
    return (
      <div
        onClick={onClick}
        className={cn('cursor-pointer rounded-xl bg-white p-5 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow', className)}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -2, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
      transition={{ duration: animationLevel === 'low' ? 0.15 : 0.3 }}
      className={cn('cursor-pointer rounded-xl bg-white p-5 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700', className)}
    >
      {content}
    </motion.div>
  );
}
