import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils';
import { useSettingsStore } from '@/store/settingsStore';
import type { AssessmentCategory } from '@/shared/types';
import { ASSESSMENT_CATEGORIES } from '@/shared/constants';

interface CategoryCardProps {
  category: AssessmentCategory;
  onClick?: () => void;
  className?: string;
}

const categoryIcons: Record<AssessmentCategory, React.ReactNode> = {
  personality: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />,
  psychology: <path d="M12 8V4H8" />,
  cognitive: <path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 22v-4M19.07 19.07l-2.83-2.83M22 12h-4M19.07 4.93l-2.83 2.83" strokeLinecap="round" strokeLinejoin="round" />,
  ideology: <circle cx="12" cy="12" r="10" />,
  career: <rect x="2" y="7" width="20" height="14" rx="2" />,
};

export function CategoryCard({ category, onClick, className }: CategoryCardProps) {
  const { animationLevel, reducedMotion } = useSettingsStore();
  const config = ASSESSMENT_CATEGORIES[category];

  const isInteractive = !!onClick;

  const content = (
    <>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary-600 dark:text-primary-400"
        >
          {categoryIcons[category]}
        </svg>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {config.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {config.description}
      </p>
    </>
  );

  if (!isInteractive) {
    return (
      <div className={cn('rounded-xl bg-white p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700', className)}>
        {content}
      </div>
    );
  }

  if (reducedMotion || animationLevel === 'none') {
    return (
      <div
        onClick={onClick}
        className={cn('cursor-pointer rounded-xl bg-white p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all', className)}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: animationLevel === 'low' ? 0.2 : 0.4 }}
      className={cn('cursor-pointer rounded-xl bg-white p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700', className)}
    >
      {content}
    </motion.div>
  );
}
