import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Download, QrCode } from 'lucide-react';
import { PageTransition } from '@/components/molecules';
import { Button, Card, Badge } from '@/components/atoms';
import { useSettingsStore } from '@/store/settingsStore';
import { useQuizStore } from '@/store/quizStore';

interface DimensionResult {
  name: string;
  score: number;
  description: string;
}

interface ResultData {
  overallScore: number;
  percentile: number;
  dimensions: DimensionResult[];
  recommendation: string;
}

const MOCK_RESULT_DATA: Record<string, ResultData> = {
  mbti: {
    overallScore: 72,
    percentile: 68,
    dimensions: [
      { name: '外向 E', score: 65, description: '你更倾向于从外部世界获取能量' },
      { name: '直觉 N', score: 78, description: '你善于观察可能性和模式' },
      { name: '思考 T', score: 52, description: '你平衡逻辑与情感决策' },
      { name: '判断 J', score: 68, description: '你倾向于有计划和结构化' },
    ],
    recommendation: '你的人格类型可能适合需要创意和系统规划的职业，如产品经理、设计师或分析师。',
  },
};

const Results: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const { animationLevel, reducedMotion } = useSettingsStore();
  const { answers, isCompleted } = useQuizStore();
  const [resultData, setResultData] = useState<ResultData | null>(null);

  useEffect(() => {
    if (assessmentId && MOCK_RESULT_DATA[assessmentId]) {
      setResultData(MOCK_RESULT_DATA[assessmentId]);
    }
  }, [assessmentId]);

  if (!isCompleted || !resultData) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <p className="text-gray-500 dark:text-gray-400 mb-4">请先完成测评</p>
          <Button onClick={() => navigate('/categories')}>返回首页</Button>
        </div>
      </PageTransition>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion || animationLevel === 'none' ? 0 : 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="mb-6"
          >
            返回首页
          </Button>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <Badge variant="success" className="mb-4">测评完成</Badge>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              你的结果
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              基于 {Object.keys(answers).length} 道题目的回答
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="text-center">
                <div className="mb-4">
                  <span className="text-6xl font-bold text-primary-500">{resultData.overallScore}</span>
                  <span className="text-2xl text-gray-500">分</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  超过了 {resultData.percentile}% 的参与者
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                维度分析
              </h2>
              <div className="space-y-4">
                {resultData.dimensions.map((dim, index) => (
                  <Card key={dim.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{dim.name}</span>
                      <span className="text-primary-500 font-semibold">{dim.score}分</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${dim.score}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-primary-500 rounded-full"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{dim.description}</p>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">建议</h3>
                <p className="text-gray-600 dark:text-gray-400">{resultData.recommendation}</p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" leftIcon={<Share2 className="w-4 h-4" />}>
                  分享
                </Button>
                <Button variant="secondary" className="flex-1" leftIcon={<QrCode className="w-4 h-4" />}>
                  二维码
                </Button>
                <Button variant="secondary" className="flex-1" leftIcon={<Download className="w-4 h-4" />}>
                  导出
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Results;
