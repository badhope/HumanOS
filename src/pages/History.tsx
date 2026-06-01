import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { AssessmentResult } from '../types';
import { mockAssessments, getQuestionsForAssessment } from '../data/mockData';
import { getTranslation } from '../i18n';

function formatDateTime(date: Date | string, i18n: ReturnType<typeof getTranslation>): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  if (diff < 24 * 60 * 60 * 1000 && d.getDate() === now.getDate()) {
    return `${i18n.history.today} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.getDate() === yesterday.getDate() && d.getMonth() === yesterday.getMonth()) {
    return `${i18n.history.yesterday} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }
  
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function HistoryCard({ result, onDelete, i18n, locale }: { result: AssessmentResult; onDelete: (id: string) => void; i18n: ReturnType<typeof getTranslation>; locale: 'en' | 'zh' }) {
  const { 
    setCurrentAssessment, 
    setQuestions, 
    setCurrentQuestionIndex, 
    setCurrentStep, 
    setResult 
  } = useAppStore();

  const handleViewAgain = () => {
    const assessment = mockAssessments.find((a: { id: string; }) => a.id === result.assessmentId);
    if (assessment) {
      setCurrentAssessment(assessment);
      const questions = getQuestionsForAssessment(assessment.id);
      setQuestions(questions);
      setCurrentQuestionIndex(0);
      setResult(result);
      setCurrentStep('result');
    }
  };

  const handleDelete = () => {
    if (window.confirm(i18n.common.deleteConfirm)) {
      onDelete(result.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">{result.assessmentTitle}</h3>
          <p className="text-sm sm:text-base text-slate-500 mt-1">{formatDateTime(result.completedAt, i18n)}</p>
        </div>
        <button
          onClick={handleDelete}
          className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
        >
          🗑️
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-blue-600">{result.totalScore}</div>
            <div className="text-sm sm:text-base text-slate-600 mt-1">{i18n.results.comprehensiveScore}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {result.traits.slice(0, 3).map((trait, idx) => (
          <span 
            key={idx} 
            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm"
          >
            {trait.name} {trait.score}{locale === 'zh' ? '分' : ''}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          to={`/assessments/${result.assessmentId}`}
          onClick={handleViewAgain}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all text-center shadow-md"
        >
          {i18n.history.viewDetails}
        </Link>
      </div>
    </div>
  );
}

function EmptyState({ i18n }: { i18n: ReturnType<typeof getTranslation> }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-12 sm:p-16 shadow-lg border border-slate-100 text-center">
      <div className="text-6xl sm:text-7xl mb-4 sm:mb-6">📚</div>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">{i18n.history.empty}</h2>
      <p className="text-slate-600 mb-8 max-w-md mx-auto text-base sm:text-lg">
        {i18n.history.emptyDesc}
      </p>
      <Link
        to="/assessments"
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
      >
        {i18n.history.startFirst}
        <span>→</span>
      </Link>
    </div>
  );
}

export const History = () => {
  const { assessmentHistory, loadHistory, deleteHistoryItem, clearHistory, locale } = useAppStore();
  const i18n = getTranslation(locale);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleClearAll = () => {
    if (window.confirm(i18n.history.confirmClear)) {
      clearHistory();
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">{i18n.history.title}</h1>
          <p className="text-lg text-slate-600 mt-2">
            {i18n.history.subtitle.replace('{count}', String(assessmentHistory.length))}
          </p>
        </div>
        {assessmentHistory.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
          >
            {i18n.history.clearAll}
          </button>
        )}
      </div>

      {assessmentHistory.length === 0 ? (
        <EmptyState i18n={i18n} />
      ) : (
        <div className="grid gap-6">
          {assessmentHistory.map((result) => (
            <HistoryCard 
              key={result.id} 
              result={result} 
              onDelete={deleteHistoryItem}
              i18n={i18n}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
};
