import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, RefreshCw, CheckCircle } from 'lucide-react';
import { PageTransition } from '@/components/molecules';
import { Button, Card, Badge, Progress } from '@/components/atoms';
import { useSettingsStore } from '@/store/settingsStore';
import { useQuizStore } from '@/store/quizStore';
import { fetchAssessmentBySlug } from '@/features/assessment/registry';
import {
  calculateMBTIScores,
  getResultProfile,
  generateDimensionDescriptions,
  generateRecommendations,
} from '@/features/assessment/scoring';
import type { AssessmentDefinition } from '@/shared/types';

interface DimensionResult {
  name: string;
  letter: string;
  score: number;
  percentage: number;
  description: string;
  isPrimary: boolean;
}

interface FullResultData {
  mbtiType: string;
  typeName: string;
  typeDescription: string;
  overallScore: number;
  dimensions: DimensionResult[];
  strengths: string[];
  potentialRisks: string[];
  relationships: string;
  recommendations: string[];
  careers: string[];
}

interface StoredResultData {
  assessmentId: string;
  answers: Record<string, number>;
  completedAt: string;
}

const Results: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const { animationLevel, reducedMotion } = useSettingsStore();
  const storeAnswers = useQuizStore((state) => state.answers);
  const storeIsCompleted = useQuizStore((state) => state.isCompleted);
  const { resetQuiz } = useQuizStore();

  const [, setAssessment] = useState<AssessmentDefinition | null>(null);
  const [resultData, setResultData] = useState<FullResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRestoredFromStorage, setIsRestoredFromStorage] = useState(false);

  useEffect(() => {
    async function loadResult() {
      if (!assessmentId) {
        setError('测评 ID 不存在');
        setLoading(false);
        return;
      }

      let answers = storeAnswers;
      let isCompleted = storeIsCompleted;

      if (!isCompleted || Object.keys(answers).length === 0) {
        const storedData = localStorage.getItem(`quiz_result_${assessmentId}`);
        if (storedData) {
          try {
            const parsed: StoredResultData = JSON.parse(storedData);
            if (parsed.assessmentId === assessmentId && parsed.answers) {
              answers = parsed.answers;
              isCompleted = true;
              setIsRestoredFromStorage(true);
              useQuizStore.setState({
                answers,
                isCompleted: true,
              });
            }
          } catch (e) {
            console.error('Failed to parse stored result:', e);
          }
        }
      }

      if (!isCompleted || Object.keys(answers).length === 0) {
        setError('请先完成测评');
        setLoading(false);
        return;
      }

      try {
        const assessmentData = await fetchAssessmentBySlug(assessmentId);
        if (!assessmentData) {
          setError('未找到该测评');
          setLoading(false);
          return;
        }

        setAssessment(assessmentData);

        const { dimensionScores, mbtiType } = calculateMBTIScores(assessmentData, answers);
        const profile = getResultProfile(assessmentData, mbtiType, dimensionScores);
        const dimensionDescriptions = generateDimensionDescriptions(dimensionScores);
        const recommendations = generateRecommendations(mbtiType, dimensionScores);

        const dimensionMap: Record<string, { left: string; right: string }> = {
          EI: { left: '内向 I', right: '外向 E' },
          SN: { left: '感觉 S', right: '直觉 N' },
          TF: { left: '情感 F', right: '思考 T' },
          JP: { left: '知觉 P', right: '判断 J' },
        };

        const dimensions: DimensionResult[] = Object.entries(dimensionScores).map(([dim, score]) => {
          const [left, right] = dim === 'EI' || dim === 'SN' || dim === 'TF' || dim === 'JP'
            ? [dimensionMap[dim].left, dimensionMap[dim].right]
            : [dim, dim];
          const percentage = Math.min(100, Math.max(0, ((score + 2) / 4) * 100));
          const isPrimary = Math.abs(score) >= 0.5;

          return {
            name: dim,
            letter: score >= 0 ? right[0] : left[0],
            score,
            percentage,
            description: dimensionDescriptions[dim] || '',
            isPrimary,
          };
        });

        const strengths = getStrengths(mbtiType);
        const potentialRisks = getPotentialRisks(mbtiType);
        const relationships = getRelationships(mbtiType);
        const careers = profile?.careers || getDefaultCareers(mbtiType);

        const fullResult: FullResultData = {
          mbtiType,
          typeName: profile?.name || `${mbtiType}型`,
          typeDescription: profile?.description || `${mbtiType}是一种有趣的人格类型。`,
          overallScore: Math.round((dimensions.reduce((sum, d) => sum + Math.abs(d.percentage - 50), 0) / 4) * 2),
          dimensions,
          strengths,
          potentialRisks,
          relationships,
          recommendations,
          careers,
        };

        setResultData(fullResult);
      } catch (err) {
        console.error('Failed to load result:', err);
        setError('加载结果失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    }

    loadResult();
  }, [assessmentId, storeAnswers, storeIsCompleted]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion || animationLevel === 'none' ? 0 : 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <RefreshCw className="w-8 h-8 animate-spin text-primary-500 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">正在分析您的答案...</p>
        </div>
      </PageTransition>
    );
  }

  if (error || !resultData) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <p className="text-red-500 mb-4">{error || '结果加载失败'}</p>
          <Button onClick={() => navigate('/categories')}>返回首页</Button>
        </div>
      </PageTransition>
    );
  }

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
            <Badge variant="success" className="mb-4">
              <CheckCircle className="w-3 h-3 mr-1" />
              测评完成
              {isRestoredFromStorage && ' (已恢复)'}
            </Badge>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {resultData.mbtiType}
            </h1>
            <p className="text-xl text-primary-500 font-medium mb-2">
              {resultData.typeName}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              基于 {Object.keys(storeAnswers).length} 道题目的回答
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="p-6 text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {resultData.typeDescription}
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                四维人格分析
              </h2>
              <div className="space-y-4">
                {resultData.dimensions.map((dim) => (
                  <Card key={dim.name} className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {dim.letter}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">vs</span>
                        <span className="text-lg text-gray-600 dark:text-gray-400">
                          {getOppositeLetter(dim.letter)}
                        </span>
                      </div>
                      <span className={`font-semibold ${dim.isPrimary ? 'text-primary-500' : 'text-gray-500'}`}>
                        {Math.round(dim.percentage)}%
                      </span>
                    </div>
                    <Progress
                      value={dim.percentage}
                      className="h-3"
                      colorScheme={dim.isPrimary ? 'primary' : 'success'}
                    />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {dim.description}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                性格优势
              </h2>
              <Card className="p-4">
                <ul className="space-y-2">
                  {resultData.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-primary-500 mt-1">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                成长建议
              </h2>
              <Card className="p-4">
                <ul className="space-y-2">
                  {resultData.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-amber-500 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  leftIcon={<Share2 className="w-4 h-4" />}
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `我的 MBTI 是 ${resultData.mbtiType}`,
                        text: resultData.typeDescription,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  分享
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  leftIcon={<RefreshCw className="w-4 h-4" />}
                  onClick={() => {
                    resetQuiz();
                    navigate('/quiz/mbti-basic');
                  }}
                >
                  重新测试
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/categories')}
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

function getOppositeLetter(letter: string): string {
  const opposites: Record<string, string> = {
    E: 'I', I: 'E',
    S: 'N', N: 'S',
    T: 'F', F: 'T',
    J: 'P', P: 'J',
  };
  return opposites[letter] || letter;
}

function getStrengths(mbtiType: string): string[] {
  const strengths: string[] = [];
  const firstLetter = mbtiType[0];
  const thirdLetter = mbtiType[2];

  if (firstLetter === 'E') {
    strengths.push('社交能力强，善于与人交流和建立联系');
    strengths.push('能够快速适应新环境，充满活力');
  } else {
    strengths.push('深思熟虑，善于独立分析和解决问题');
    strengths.push('专注力强，能够长时间集中精力在重要事务上');
  }

  if (thirdLetter === 'T') {
    strengths.push('逻辑思维清晰，善于客观分析利弊');
    strengths.push('决策理性，不易被情感左右');
  } else {
    strengths.push('富有同理心，善于理解和支持他人');
    strengths.push('决策考虑多方感受，人际协调能力强');
  }

  return strengths;
}

function getPotentialRisks(mbtiType: string): string[] {
  const risks: string[] = [];
  const firstLetter = mbtiType[0];
  const thirdLetter = mbtiType[2];
  const fourthLetter = mbtiType[3];

  if (firstLetter === 'E') {
    risks.push('有时可能过于冲动，需要学会独处和内省');
  } else {
    risks.push('可能过于封闭，需要主动走出舒适区');
  }

  if (thirdLetter === 'T') {
    risks.push('有时可能显得过于冷酷，需要注意情感表达');
  } else {
    risks.push('决策可能受情感影响过大，需要平衡理性考量');
  }

  if (fourthLetter === 'J') {
    risks.push('可能过于固执，需要学会接受变化和不确定性');
  } else {
    risks.push('可能缺乏计划性，需要建立更清晰的目标');
  }

  return risks;
}

function getRelationships(mbtiType: string): string {
  const relationshipMap: Record<string, string> = {
    'INTJ': '您倾向于独立思考，在关系中寻求深度和理解。您欣赏能力和智慧，但也需要学会表达情感和接受他人的支持。',
    'INTP': '您是思想的探索者，在亲密关系中重视智识交流和独立性。您需要学会更多地表达情感，而不是仅仅停留在思考层面。',
    'ENTJ': '您果断且有领导力，在关系中倾向于主动和直接。请注意在表达关切时平衡果断与温柔。',
    'ENTP': '您充满创意和好奇心，在关系中喜欢智识碰撞和新鲜感。请记得在追逐可能性时珍惜已建立的情感联系。',
    'INFJ': '您理想主义且富有同理心，在关系中追求深度的精神连接。请学会照顾自己的需求，而不仅是他人的期望。',
    'INFP': '您温柔且有理想，在关系中重视情感的真实和深度。请勇敢表达自己的需求和边界。',
    'ENFJ': '您热情且有感染力，善于激励和理解他人。请注意不要过度牺牲自己来满足他人。',
    'ENFP': '您充满热情和创意，在关系中带来活力和新鲜感。请学会在自由探索和承诺之间找到平衡。',
    'ISTJ': '您务实可靠，在关系中重视责任和承诺。请记得表达情感，让伴侣感受到您的爱意。',
    'ISFJ': '您温柔体贴，善于照顾他人需求。请学会接受他人的关心，而不只是付出。',
    'ESTJ': '您务实有责任感，在关系中重视秩序和效率。请记得在规划中留出浪漫和弹性。',
    'ESFJ': '您热情友善，在关系中重视和谐和关怀。请学会说"不"，并尊重自己的需求。',
    'ISTP': '您冷静务实，在关系中给予空间和自由。请主动表达您的关心，而不只是通过行动。',
    'ISFP': '您温柔敏感，在关系中重视当下的美好体验。请学会为未来做规划，而不是只看现在。',
    'ESTP': '您充满活力，享受生活的刺激。请学会倾听和深入交流，而不只是表面的社交。',
    'ESFP': '您乐观开朗，在关系中带来欢乐和活力。请学会面对困难时的深度情感交流。',
  };
  return relationshipMap[mbtiType] || '每个人都是独特的，您的性格特点会影响您的人际关系模式。';
}

function getDefaultCareers(mbtiType: string): string[] {
  const careerMap: Record<string, string[]> = {
    'INTJ': ['战略咨询师', '金融分析师', '软件架构师', '科研人员'],
    'INTP': ['数据科学家', '哲学家', '软件工程师', '大学教授'],
    'ENTJ': ['企业高管', '律师', '管理顾问', '创业者'],
    'ENTP': ['营销策划', '创业者', '律师', '公关专家'],
    'INFJ': ['心理咨询师', '作家', '人力资源经理', '社工'],
    'INFP': ['作家', '艺术家', '心理咨询师', '教师'],
    'ENFJ': ['教师', '培训师', '人力资源经理', '社会活动家'],
    'ENFP': ['市场营销', '创意总监', '记者', '导游'],
    'ISTJ': ['财务管理', '审计', '律师', '行政主管'],
    'ISFJ': ['护士', '教师', '社会工作者', '图书管理员'],
    'ESTJ': ['项目经理', '行政主管', '质量管理', '金融经理'],
    'ESFJ': ['人力资源', '教师', '护士', '客户服务'],
    'ISTP': ['工程师', '机械师', '飞行员', 'IT支持'],
    'ISFP': ['设计师', '摄影师', '艺术家', '室内设计师'],
    'ESTP': ['销售', '企业家', '活动策划', '经纪人'],
    'ESFP': ['演员', '主持人', '市场营销', '活动策划'],
  };
  return careerMap[mbtiType] || ['通用职业发展'];
}

export default Results;