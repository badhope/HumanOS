import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/shared/utils';
import { useSettingsStore } from '@/store/settingsStore';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function PageTransition({ children, className }: PageTransitionProps) {
  const { animationLevel, reducedMotion } = useSettingsStore();

  if (reducedMotion || animationLevel === 'none') {
    return <div className={className}>{children}</div>;
  }

  const duration = animationLevel === 'low' ? 0.3 : animationLevel === 'high' ? 0.8 : 0.5;

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={{ duration }}
      className={cn('w-full', className)}
    >
      {children}
    </motion.div>
  );
}

type MotionProps = HTMLMotionProps<'button'>;

interface MotionButtonProps extends Omit<MotionProps, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export function MotionButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: MotionButtonProps) {
  const { animationLevel, reducedMotion } = useSettingsStore();

  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const motionProps = reducedMotion || animationLevel === 'none'
    ? {}
    : {
        whileHover: 'hover',
        whileTap: 'tap',
        variants: buttonVariants,
      };

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  hover: { y: 0 },
};

export function MotionCard({ children, className, onClick }: MotionCardProps) {
  const { animationLevel, reducedMotion } = useSettingsStore();

  if (reducedMotion || animationLevel === 'none') {
    return (
      <div
        className={cn('rounded-xl bg-white p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 cursor-pointer transition-shadow hover:shadow-md', className)}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: animationLevel === 'low' ? 0.2 : 0.4 }}
      className={cn('rounded-xl bg-white p-6 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 cursor-pointer', className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
