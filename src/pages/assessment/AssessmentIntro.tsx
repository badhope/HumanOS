import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Clock, List, ArrowLeft,
  Sparkles, Brain, Heart, Shield, Zap,
  CheckCircle2, Star, Users, Target, Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { apiService, type Assessment } from '../../services/api';
import { useAppStore } from '../../store';
import { useResponsive } from '../../hooks/useResponsive';

const CATEGORY_ICONS: Record<string, typeof Brain> = {
  '人格': Brain,
  '关系': Heart,
  '心理': Shield,
  '职业': Users,
  '价值观': Star,
  '趣味': Sparkles,
  '意识形态': Target,
};

const CATEGORY_COLORS: Record<string, string> = {
  '人格': 'from-violet-500 to-purple-500',
  '关系': 'from-pink-500 to-rose-500',
  '心理': 'from-blue-500 to-cyan-500',
  '职业': 'from-emerald-500 to-teal-500',
  '价值观': 'from-amber-500 to-orange-500',
  '趣味': 'from-fuchsia-500 to-pink-500',
  '意识形态': 'from-violet-500 to-fuchsia-500',
};

export default function AssessmentIntro() {
  const { assessmentId: paramAssessmentId } = useParams<{ assessmentId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  
  // Extract assessmentId from pathname
  const pathParts = location.pathname.split('/');
  const assessmentId = paramAssessmentId || (pathParts.length > 2 ? pathParts[2] : null);

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentAssessmentMode = useAppStore((state) => state.currentAssessmentMode);
  const setCurrentAssessment = useAppStore((state) => state.setCurrentAssessment);

  const actualAssessmentId = assessmentId || 'ideology-enhanced';
  const isEnhancedIdeology = actualAssessmentId === 'ideology-enhanced';

  useEffect(() => {
    if (isEnhancedIdeology && !currentAssessmentMode) {
      navigate('/assessment/ideology-enhanced/mode-select');
    }
  }, [isEnhancedIdeology, currentAssessmentMode, navigate]);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!actualAssessmentId) return;

      setLoading(true);
      setError(null);

      try {
        const data = await apiService.getAssessment(actualAssessmentId);
        setAssessment(data);
      } catch (err) {
        console.error('获取测评失败:', err);
        setError('无法加载测评信息，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [actualAssessmentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-white mb-4">
            {error || '测评未找到'}
          </h2>
          <button
            onClick={() => navigate('/assessments')}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white font-semibold"
          >
            返回测评列表
          </button>
        </div>
      </div>
    );
  }

  const CategoryIcon = CATEGORY_ICONS[assessment.category] || Brain;
  const gradientColor = CATEGORY_COLORS[assessment.category] || 'from-violet-500 to-purple-500';

  const handleStartAssessment = () => {
    navigate(`/assessment/${actualAssessmentId}/start`);
  };

  const modeLabel = currentAssessmentMode === 'professional' ? '专业版' : '普通版';
  
  // 计算题目数量
  let questionCount = 0;
  if (isEnhancedIdeology && currentAssessmentMode === 'professional') {
    questionCount = (assessment as any).professional_question_count || 28;
  } else if (assessment.questions && Array.isArray(assessment.questions)) {
    // 如果有questions数组，直接用长度
    questionCount = assessment.questions.length;
  } else if ((assessment as any).questionCount) {
    // 如果有questionCount字段
    questionCount = (assessment as any).questionCount;
  } else {
    // 默认值
    questionCount = 24;
  }
  
  // 计算估计时间
  const estimatedTime = isEnhancedIdeology
    ? (currentAssessmentMode === 'professional' ? '~12分钟' : '~6分钟')
    : `~${assessment.duration}分钟`;

  return (
    <div className="min-h-screen bg-slate-950 pb-28 sm:pb-32">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${gradientColor} opacity-10 rounded-full blur-3xl`} />
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br ${gradientColor} opacity-10 rounded-full blur-3xl`} />
      </div>

      <div className="relative z-10 p-4 sm:p-6">
        <button
          onClick={() => navigate('/assessments')}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={isMobile ? 20 : 24} />
          <span className={`${isMobile ? 'text-sm' : 'text-base'}`}>返回测评列表</span>
        </button>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 mt-4 sm:mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${gradientColor}/20 rounded-3xl p-5 sm:p-8 border border-white/10`}
        >
          <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center flex-shrink-0`}>
              <CategoryIcon size={isMobile ? 28 : 36} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 break-words leading-tight`}>
                {assessment.title}
              </h1>
              {isEnhancedIdeology && (
                <div className="mb-2 sm:mb-3">
                  <span className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${
                    currentAssessmentMode === 'professional'
                      ? 'bg-purple-500/30 text-purple-300'
                      : 'bg-blue-500/30 text-blue-300'
                  }`}>
                    {modeLabel}
                  </span>
                </div>
              )}
              <p className={`text-white/60 text-sm sm:text-base leading-relaxed break-words`}>
                {assessment.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center">
              <List size={isMobile ? 16 : 20} className="mx-auto mb-1 sm:mb-2 text-violet-400" />
              <p className={`text-base sm:text-lg font-bold text-white`}>{questionCount}题</p>
              <p className={`text-[10px] sm:text-xs text-white/50`}>题目数量</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center">
              <Clock size={isMobile ? 16 : 20} className="mx-auto mb-1 sm:mb-2 text-emerald-400" />
              <p className={`text-base sm:text-lg font-bold text-white`}>{estimatedTime}</p>
              <p className={`text-[10px] sm:text-xs text-white/50`}>预计时长</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center">
              <CheckCircle2 size={isMobile ? 16 : 20} className="mx-auto mb-1 sm:mb-2 text-amber-400" />
              <p className={`text-base sm:text-lg font-bold text-white`}>{assessment.quality}</p>
              <p className={`text-[10px] sm:text-xs text-white/50`}>测评类型</p>
            </div>
          </div>

          {assessment.badge && (
            <div className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs sm:text-sm">
              <Sparkles size={isMobile ? 12 : 14} />
              {assessment.badge}
            </div>
          )}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10"
        >
          <h2 className={`text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4`}>测评说明</h2>
          <ul className="space-y-2 sm:space-y-3">
            {[
              '请根据您的真实情况作答，无对错之分',
              '答题过程中可随时退出，进度会自动保存',
              '完成后将生成专属分析报告'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3">
                <CheckCircle2 size={isMobile ? 14 : 16} className="text-emerald-400 mt-0.5 shrink-0" />
                <span className={`text-white/70 text-xs sm:text-sm leading-relaxed break-words`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleStartAssessment}
          className={`w-full py-4 sm:py-5 px-6 rounded-2xl font-semibold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${gradientColor} shadow-lg shadow-violet-500/20`}
        >
          <span className={`text-sm sm:text-base`}>开始测评</span>
        </motion.button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}
