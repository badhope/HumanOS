import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Assessment } from '../types';
import { mockAssessments } from '../data/mockData';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import { cn } from '../lib/utils';

const CATEGORY_KEYS = ['all', 'personality', 'health', 'emotion', 'social', 'career', 'life'] as const;
type CategoryKey = typeof CATEGORY_KEYS[number];

export const Assessments = () => {
  const { setAssessments, assessments, locale } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const i18n = getTranslation(locale);

  const getCategoryLabel = (key: CategoryKey) => {
    const map: Record<CategoryKey, string> = {
      all: i18n.assessments.all,
      personality: i18n.assessments.personality,
      health: i18n.assessments.health,
      emotion: i18n.assessments.emotion,
      social: i18n.assessments.social,
      career: i18n.assessments.career,
      life: i18n.assessments.life,
    };
    return map[key];
  };

  useEffect(() => {
    if (assessments.length === 0) {
      setAssessments(mockAssessments);
    }
  }, [assessments.length, setAssessments]);

  const filteredAssessments = useMemo(() => {
    if (selectedCategory === 'all') return assessments;
    const label = getCategoryLabel(selectedCategory);
    return assessments.filter((a) => a.category === label);
  }, [assessments, selectedCategory, locale]);

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center py-6 sm:py-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-800 mb-2 sm:mb-4">
          {i18n.assessments.title}
        </h1>
        <p className="text-base sm:text-xl text-slate-600">
          {i18n.assessments.subtitle}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {CATEGORY_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={cn(
              "px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-medium transition-all text-sm",
              selectedCategory === key
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300"
            )}
          >
            {getCategoryLabel(key)}
          </button>
        ))}
      </div>

      <div className="text-center">
        <p className="text-slate-500">
          {i18n.assessments.found.replace('{count}', String(filteredAssessments.length))}
        </p>
      </div>

      {filteredAssessments.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">{i18n.assessments.noAssessment}</h3>
          <p className="text-slate-500">{i18n.assessments.noAssessmentDesc}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAssessments.map((assessment) => (
            <AssessmentCard key={assessment.id} assessment={assessment} i18n={i18n} />
          ))}
        </div>
      )}
    </div>
  );
};

interface AssessmentCardProps {
  assessment: Assessment;
  i18n: ReturnType<typeof getTranslation>;
}

function AssessmentCard({ assessment, i18n }: AssessmentCardProps) {
  return (
    <Link
      to={`/assessments/${assessment.id}`}
      className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all"
    >
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-xl text-xs sm:text-sm font-semibold">
            {assessment.category}
          </span>
          {assessment.difficulty && (
            <span className="px-2.5 sm:px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
              {assessment.difficulty}
            </span>
          )}
        </div>
        <span className="text-2xl sm:text-4xl group-hover:scale-110 transition-transform">
          {assessment.icon}
        </span>
      </div>
      <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
        {assessment.title}
      </h3>
      <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 line-clamp-2">
        {assessment.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500">
          <span>📝</span>
          {i18n.assessments.questions.replace('{count}', String(assessment.totalQuestions))}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-blue-600 font-semibold group-hover:gap-2.5 transition-all text-sm">
          {i18n.assessments.start}
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
