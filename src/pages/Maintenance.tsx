import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft, Sparkles } from 'lucide-react';
import { PageTransition } from '@/components/molecules';
import { Button, Card } from '@/components/atoms';
import { useSettingsStore } from '@/store/settingsStore';

const Maintenance: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { animationLevel, reducedMotion } = useSettingsStore();

  const moduleName = searchParams.get('name') || '';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion || animationLevel === 'none' ? 0 : 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/categories')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="mb-8"
          >
            返回分类
          </Button>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants}>
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <Construction className="h-10 w-10 text-amber-600 dark:text-amber-400" />
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-4 text-3xl font-bold text-gray-900 dark:text-white"
            >
              {moduleName ? `${moduleName} 模块维护中` : '模块维护中'}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 text-lg text-gray-600 dark:text-gray-400"
            >
              该模块正在完善中，敬请期待
            </motion.p>

            <motion.div variants={itemVariants}>
              <Card className="p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-primary-500" />
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    已有完整模块
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  我们推荐您先体验已完成的模块，其他模块正在陆续开放中：
                </p>
                <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• <strong>MBTI 职业性格测试</strong> - 完整可用</li>
                  <li>• 16种人格类型分析</li>
                  <li>• 四维性格倾向解读</li>
                  <li>• 个性化建议与发展指南</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/quiz/mbti-basic')}
                size="lg"
              >
                立即体验 MBTI
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/categories')}
                size="lg"
              >
                返回测评分类
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Maintenance;