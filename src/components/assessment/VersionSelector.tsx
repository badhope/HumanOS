import { FC } from 'react';
import { motion } from 'framer-motion';
import { Clock, FileText, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Card } from '@/components/atoms';
import type { AssessmentFamily, VersionInfo } from '@/shared/types';

interface VersionSelectorProps {
  family: AssessmentFamily;
  onSelectVersion: (version: VersionInfo, slug: string) => void;
  onBack: () => void;
}

const levelLabels: Record<string, { label: string; color: string }> = {
  lite: { label: '简单版', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  standard: { label: '标准版', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  expert: { label: '专家版', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
};

const levelDescriptions: Record<string, { short: string; features: string[] }> = {
  lite: {
    short: '快速体验',
    features: ['题目最少', '耗时最短', '适合初次体验'],
  },
  standard: {
    short: '推荐版本',
    features: ['题量适中', '维度覆盖均衡', '结果稳定可靠'],
  },
  expert: {
    short: '深度分析',
    features: ['题目最全', '增加边界题和校验题', '结果最精细'],
  },
};

export const VersionSelector: FC<VersionSelectorProps> = ({
  family,
  onSelectVersion,
  onBack,
}) => {
  const getSlug = (level: string): string => {
    return `${family.familyId}-${level}`;
  };

  const sortedVersions = [...family.versions].sort((a, b) => {
    const order = { lite: 0, standard: 1, expert: 2 };
    return order[a.level] - order[b.level];
  });

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          ← 返回
        </button>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            选择版本
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {family.familyName}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {family.description}
          </p>
        </div>

        <div className="space-y-4">
          {sortedVersions.map((version, index) => {
            const levelInfo = levelLabels[version.level];
            const descInfo = levelDescriptions[version.level];
            const slug = getSlug(version.level);

            return (
              <motion.div
                key={version.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`relative cursor-pointer transition-all hover:shadow-md ${
                    version.recommended
                      ? 'border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-900/10'
                      : 'border border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => onSelectVersion(version, slug)}
                >
                  {version.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                        <Star className="h-3 w-3" />
                        推荐版本
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {version.name}
                        </h3>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${levelInfo.color}`}>
                          {levelInfo.label}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {version.description}
                      </p>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          约 {version.estimatedMinutes} 分钟
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          {version.questionCount} 题
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {descInfo.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                          >
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      {version.status === 'active' ? (
                        <Button
                          size="sm"
                          variant={version.recommended ? 'primary' : 'secondary'}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectVersion(version, slug);
                          }}
                        >
                          开始测试
                        </Button>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          <AlertCircle className="h-3 w-3" />
                          即将上线
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            如何选择？
          </h4>
          <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
            <li>• <strong>简单版</strong>：适合想快速了解大概情况的用户</li>
            <li>• <strong>标准版</strong>：适合大多数用户，推荐作为首次测评的选择</li>
            <li>• <strong>专家版</strong>：适合想获得更精细分析结果的用户</li>
          </ul>
        </div>
      </div>
    </div>
  );
};