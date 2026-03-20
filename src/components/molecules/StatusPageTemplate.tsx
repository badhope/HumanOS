import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/molecules';
import { Button, Card } from '@/components/atoms';
import { useSettingsStore } from '@/store/settingsStore';
import { ArrowLeft, Search } from 'lucide-react';

export interface StatusPageTemplateProps {
  icon: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  title: string;
  description: string;
  details?: {
    title?: string;
    items?: string[];
  };
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  alternativeModules?: {
    name: string;
    description: string;
    status: string;
  }[];
  showBackButton?: boolean;
  backTarget?: string;
  statusType?: 'maintenance' | 'preparing' | 'empty' | 'error' | 'unavailable';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const StatusPageTemplate: FC<StatusPageTemplateProps> = ({
  icon,
  iconBgColor = 'bg-gray-100 dark:bg-gray-800',
  title,
  description,
  details,
  primaryAction,
  secondaryAction,
  alternativeModules,
  showBackButton = true,
  backTarget = '/categories',
  statusType = 'preparing',
}) => {
  const navigate = useNavigate();
  const { animationLevel, reducedMotion } = useSettingsStore();
  const isAnimationsEnabled = animationLevel !== 'none' && !reducedMotion;

  const getStatusColor = () => {
    switch (statusType) {
      case 'maintenance':
        return 'text-amber-600 dark:text-amber-400';
      case 'preparing':
        return 'text-blue-600 dark:text-blue-400';
      case 'empty':
        return 'text-gray-600 dark:text-gray-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'unavailable':
        return 'text-gray-500 dark:text-gray-500';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getIconBgColor = () => {
    switch (statusType) {
      case 'maintenance':
        return 'bg-amber-100 dark:bg-amber-900/30';
      case 'preparing':
        return 'bg-blue-100 dark:bg-blue-900/30';
      case 'empty':
        return 'bg-gray-100 dark:bg-gray-800';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30';
      case 'unavailable':
        return 'bg-gray-100 dark:bg-gray-800';
      default:
        return iconBgColor;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-xl">
          {showBackButton && (
            <Button
              variant="ghost"
              onClick={() => navigate(backTarget)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="mb-8"
            >
              返回
            </Button>
          )}

          <motion.div
            variants={isAnimationsEnabled ? containerVariants : {}}
            initial={isAnimationsEnabled ? 'hidden' : false}
            animate="visible"
            className="text-center"
          >
            <motion.div variants={isAnimationsEnabled ? itemVariants : {}}>
              <div className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full ${getIconBgColor()}`}>
                <div className={getStatusColor()}>
                  {icon}
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={isAnimationsEnabled ? itemVariants : {}}
              className="mb-4 text-3xl font-bold text-gray-900 dark:text-white"
            >
              {title}
            </motion.h1>

            <motion.p
              variants={isAnimationsEnabled ? itemVariants : {}}
              className="mb-8 text-lg text-gray-600 dark:text-gray-400"
            >
              {description}
            </motion.p>

            {details && (
              <motion.div variants={isAnimationsEnabled ? itemVariants : {}}>
                <Card className="p-6 mb-8 text-left">
                  {details.title && (
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="font-semibold text-gray-900 dark:text-white">
                        {details.title}
                      </h2>
                    </div>
                  )}
                  {details.items && details.items.length > 0 && (
                    <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
                      {details.items.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  )}
                </Card>
              </motion.div>
            )}

            {alternativeModules && alternativeModules.length > 0 && (
              <motion.div variants={isAnimationsEnabled ? itemVariants : {}}>
                <Card className="p-6 mb-8 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      可用模块
                    </h2>
                  </div>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    {alternativeModules.map((module, index) => (
                      <li key={index}>
                        <strong>{module.name}</strong> - {module.description}
                        <span className="ml-2 text-sm text-green-600 dark:text-green-400">
                          {module.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}

            <motion.div
              variants={isAnimationsEnabled ? itemVariants : {}}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {primaryAction && (
                <Button onClick={primaryAction.onClick} size="lg">
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  variant="outline"
                  onClick={secondaryAction.onClick}
                  size="lg"
                >
                  {secondaryAction.label}
                </Button>
              )}
              {!primaryAction && !secondaryAction && (
                <Button
                  variant="outline"
                  onClick={() => navigate('/categories')}
                  size="lg"
                  leftIcon={<Search className="w-4 h-4" />}
                >
                  浏览所有测评
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};
