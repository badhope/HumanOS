import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PageTransition, AssessmentCard } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { useSettingsStore } from '@/store/settingsStore';
import { ASSESSMENT_CATEGORIES } from '@/shared/constants';
import type { AssessmentMetadata } from '@/shared/types';

const MOCK_ASSESSMENTS: Record<string, AssessmentMetadata[]> = {
  personality: [
    {
      assessmentId: 'mbti',
      name: 'MBTI 职业性格测试',
      category: 'personality',
      description: '基于迈尔斯-布里格斯类型指标，揭示你的性格倾向与职业匹配',
      duration: 15,
      questionCount: 93,
      difficulty: 'medium',
      participantCount: 12847,
      averageScore: 72,
    },
    {
      assessmentId: 'bigfive',
      name: '大五人格测试',
      category: 'personality',
      description: '测量开放性、责任心、外向性、宜人性和神经质五个核心维度',
      duration: 20,
      questionCount: 60,
      difficulty: 'medium',
      participantCount: 8932,
      averageScore: 68,
    },
  ],
  psychology: [
    {
      assessmentId: 'eq',
      name: '情商测试',
      category: 'psychology',
      description: '评估你的情绪智力、社交技巧和自我管理能力',
      duration: 12,
      questionCount: 45,
      difficulty: 'easy',
      participantCount: 15623,
      averageScore: 75,
    },
  ],
  cognitive: [
    {
      assessmentId: 'iq',
      name: '综合智力测试',
      category: 'cognitive',
      description: '测试逻辑推理、空间感知、工作记忆等认知能力',
      duration: 30,
      questionCount: 40,
      difficulty: 'hard',
      participantCount: 23456,
      averageScore: 58,
    },
  ],
  ideology: [
    {
      assessmentId: 'values',
      name: '核心价值观测试',
      category: 'ideology',
      description: '探索对你最重要的价值理念和生活原则',
      duration: 10,
      questionCount: 50,
      difficulty: 'easy',
      participantCount: 7654,
      averageScore: 70,
    },
  ],
  career: [
    {
      assessmentId: 'holland',
      name: '霍兰德职业兴趣测试',
      category: 'career',
      description: '根据霍兰德职业兴趣理论，匹配你的职业兴趣类型',
      duration: 15,
      questionCount: 90,
      difficulty: 'medium',
      participantCount: 11234,
      averageScore: 65,
    },
  ],
};

const AssessmentList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { animationLevel, reducedMotion } = useSettingsStore();
  const [assessments, setAssessments] = useState<AssessmentMetadata[]>([]);

  useEffect(() => {
    if (category && MOCK_ASSESSMENTS[category]) {
      setAssessments(MOCK_ASSESSMENTS[category]);
    }
  }, [category]);

  const categoryInfo = category ? ASSESSMENT_CATEGORIES[category as keyof typeof ASSESSMENT_CATEGORIES] : null;

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
      transition: { duration: 0.4 },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/categories')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="mb-6"
          >
            返回分类
          </Button>

          {categoryInfo && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
              >
                {categoryInfo.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 text-lg text-gray-600 dark:text-gray-400"
              >
                {categoryInfo.description}
              </motion.p>
            </>
          )}

          <motion.div
            className="grid gap-6 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {assessments.map((assessment) => (
              <motion.div key={assessment.assessmentId} variants={itemVariants}>
                <AssessmentCard
                  assessment={assessment}
                  onClick={() => navigate(`/quiz/${assessment.assessmentId}`)}
                />
              </motion.div>
            ))}
          </motion.div>

          {assessments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">该分类下暂无测评</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default AssessmentList;
