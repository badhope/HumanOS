import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, BarChart3, History, Moon, Sun, Monitor, Zap, EyeOff } from 'lucide-react';
import { Card } from '@/components/atoms';
import { useSettingsStore } from '@/store/settingsStore';
import { useTheme } from '@/features/theme';
import type { AssessmentResult } from '@/shared/types';

const MOCK_HISTORY: AssessmentResult[] = [
  {
    id: 1,
    assessmentId: 'mbti',
    category: 'personality',
    completedAt: new Date('2024-01-15'),
    answers: {},
    score: 72,
    dimensions: { E: 65, N: 78, T: 52, J: 68 },
  },
  {
    id: 2,
    assessmentId: 'eq',
    category: 'psychology',
    completedAt: new Date('2024-01-10'),
    answers: {},
    score: 85,
    dimensions: { selfAwareness: 88, selfRegulation: 82, empathy: 80 },
  },
];

const Profile: React.FC = () => {
  const { animationLevel, reducedMotion } = useSettingsStore();
  const { theme, setTheme } = useTheme();
  const { animationLevel: animLevel, setAnimationLevel, fontSize, setFontSize } = useSettingsStore();
  const [history, setHistory] = React.useState<AssessmentResult[]>([]);

  React.useEffect(() => {
    setHistory(MOCK_HISTORY);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion || animationLevel === 'none' ? 0 : 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          个人中心
        </h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">用户</h2>
                  <p className="text-gray-500 dark:text-gray-400">已完成 {history.length} 个测评</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <History className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">历史记录</h2>
            </div>
            <div className="space-y-3">
              {history.map((result) => (
                <Card key={result.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                        {result.category}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {result.completedAt.toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary-500">{result.score}</span>
                      <span className="text-gray-500">分</span>
                    </div>
                  </div>
                </Card>
              ))}
              {history.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  暂无测评记录
                </p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">设置</h2>
            </div>
            <Card>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    主题
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: 'light', icon: Sun, label: '浅色' },
                      { value: 'dark', icon: Moon, label: '深色' },
                      { value: 'system', icon: Monitor, label: '跟随系统' },
                    ].map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setTheme(t.value as 'light' | 'dark' | 'system')}
                        className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                          theme === t.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <t.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    动画强度
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: 'none', icon: EyeOff, label: '关闭' },
                      { value: 'low', icon: Zap, label: '低' },
                      { value: 'medium', icon: Zap, label: '中' },
                      { value: 'high', icon: Zap, label: '高' },
                    ].map((a) => (
                      <button
                        key={a.value}
                        onClick={() => setAnimationLevel(a.value as typeof animLevel)}
                        className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                          animationLevel === a.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <a.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{a.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    字号: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="14"
                    max="20"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">统计</h2>
            </div>
            <Card>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-500">{history.length}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">完成测评</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-3xl font-bold text-green-500">
                    {history.length > 0 ? Math.round(history.reduce((sum, h) => sum + h.score, 0) / history.length) : 0}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">平均得分</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
