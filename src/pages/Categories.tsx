import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PageTransition, CategoryCard } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { useSettingsStore } from '@/store/settingsStore';
import { ASSESSMENT_CATEGORIES } from '@/shared/constants';
import type { AssessmentCategory } from '@/shared/types';

const Categories: FC = () => {
  const navigate = useNavigate();
  const { animationLevel, reducedMotion } = useSettingsStore();

  const categories = Object.keys(ASSESSMENT_CATEGORIES) as AssessmentCategory[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion || animationLevel === 'none' ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="mb-6"
            >
              返回
            </Button>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
            >
              测评分类
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              选择一个分类开始你的测评之旅
            </motion.p>
          </div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.div key={category} variants={itemVariants}>
                <CategoryCard
                  category={category}
                  onClick={() => navigate(`/assessments/${category}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Categories;
