import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/atoms';
import { useSettingsStore } from '@/store/settingsStore';

const Home: React.FC = () => {
  const { animationLevel, reducedMotion } = useSettingsStore();

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reducedMotion || animationLevel === 'none' ? {} : titleVariants}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
            <Sparkles className="w-4 h-4" />
            <span>探索人性的多维入口</span>
          </div>
        </motion.div>

        <motion.h1
          className="mb-6 font-display text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl"
          initial="hidden"
          animate="visible"
          variants={reducedMotion || animationLevel === 'none' ? {} : titleVariants}
        >
          Human<span className="text-primary-500">OS</span>
        </motion.h1>

        <motion.p
          className="mb-10 text-lg text-gray-600 dark:text-gray-400 sm:text-xl"
          initial="hidden"
          animate="visible"
          variants={reducedMotion || animationLevel === 'none' ? {} : subtitleVariants}
        >
          聚合心理测评、人格测试、认知能力、价值观与职业倾向的全方位人类测评平台
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial="hidden"
          animate="visible"
          variants={reducedMotion || animationLevel === 'none' ? {} : ctaVariants}
        >
          <Link to="/categories">
            <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              开始探索
            </Button>
          </Link>
          <Link to="/profile">
            <Button size="lg" variant="ghost">
              查看历史
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {[
          { label: '人格类型', value: '12+' },
          { label: '心理特质', value: '8+' },
          { label: '认知能力', value: '15+' },
          { label: '职业倾向', value: '6+' },
          { label: '价值观念', value: '10+' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.7 + index * 0.1,
            }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
