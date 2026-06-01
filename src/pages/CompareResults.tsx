import { useMemo, useState } from 'react';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import { cn } from '../lib/utils';
import type { AssessmentResult } from '../types';

export function CompareResults() {
  const { locale, assessmentHistory } = useAppStore();
  const i18n = getTranslation(locale);
  const t = i18n.compare;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [assessmentFilter, setAssessmentFilter] = useState<string>('all');

  const groupedHistory = useMemo(() => {
    const groups: Record<string, AssessmentResult[]> = {};
    assessmentHistory.forEach(r => {
      const key = r.assessmentId;
      if (!groups[key]) groups[key] = [];
      groups[key].push(r);
    });
    return groups;
  }, [assessmentHistory]);

  const filteredHistory = useMemo(() => {
    if (assessmentFilter === 'all') return assessmentHistory;
    return assessmentHistory.filter(r => r.assessmentId === assessmentFilter);
  }, [assessmentHistory, assessmentFilter]);

  const selectedResults = useMemo(() => {
    return selectedIds.map(id => assessmentHistory.find(r => r.id === id)).filter(Boolean) as AssessmentResult[];
  }, [selectedIds, assessmentHistory]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const getAssessmentName = (id: string) => {
    const map: Record<string, { zh: string; en: string }> = {
      'big-five': { zh: '大五人格', en: 'Big Five' },
      '1': { zh: '大五人格', en: 'Big Five' },
      'stress-test': { zh: '压力测试', en: 'Stress Test' },
      '2': { zh: '压力测试', en: 'Stress Test' },
      'anxiety-gad7': { zh: '焦虑测评', en: 'Anxiety (GAD-7)' },
      '3': { zh: '焦虑测评', en: 'Anxiety (GAD-7)' },
    };
    const entry = map[id] || { zh: id, en: id };
    return locale === 'zh' ? entry.zh : entry.en;
  };

  const getAssessmentColor = (id: string) => {
    switch (id) {
      case 'big-five': case '1': return 'from-blue-500 to-indigo-600';
      case 'stress-test': case '2': return 'from-orange-500 to-red-500';
      case 'anxiety-gad7': case '3': return 'from-purple-500 to-pink-500';
      default: return 'from-slate-400 to-slate-500';
    }
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderComparison = () => {
    if (selectedResults.length < 2) {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <span className="text-4xl">📊</span>
          <p className="text-slate-500 mt-3">{t.selectAtLeastTwo}</p>
        </div>
      );
    }

    const sameType = selectedResults.every(r => r.assessmentId === selectedResults[0].assessmentId);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">{t.scoreComparison}</h3>
          <div className="space-y-4">
            {selectedResults.map(result => (
              <div key={result.id}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-3 h-3 rounded-full bg-gradient-to-r', getAssessmentColor(result.assessmentId))} />
                    <span className="text-sm font-medium text-slate-700">
                      {formatDate(result.completedAt)}
                    </span>
                    <span className="text-xs text-slate-400">
                      {getAssessmentName(result.assessmentId)}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{result.totalScore}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4">
                  <div
                    className={cn('h-4 rounded-full bg-gradient-to-r transition-all duration-700', getAssessmentColor(result.assessmentId))}
                    style={{ width: `${Math.min((result.totalScore / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {sameType && selectedResults.length >= 2 && (
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={cn(
                    'text-2xl font-bold',
                    selectedResults[0].totalScore > selectedResults[selectedResults.length - 1].totalScore ? 'text-green-600' : 'text-red-600'
                  )}>
                    {selectedResults[0].totalScore > selectedResults[selectedResults.length - 1].totalScore ? '↑' : '↓'}
                    {Math.abs(selectedResults[0].totalScore - selectedResults[selectedResults.length - 1].totalScore)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{t.scoreChange}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedResults.reduce((s, r) => s + r.totalScore, 0) / selectedResults.length}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{t.averageScore}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.max(...selectedResults.map(r => r.totalScore)) - Math.min(...selectedResults.map(r => r.totalScore))}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{t.scoreRange}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {sameType && selectedResults[0].traits.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">{t.traitComparison}</h3>
            <div className="space-y-4">
              {selectedResults[0].traits.map((trait, traitIdx) => {
                const traitName = trait.name;
                return (
                  <div key={traitName}>
                    <div className="text-sm font-medium text-slate-700 mb-2">{traitName}</div>
                    <div className="space-y-1.5">
                      {selectedResults.map(result => {
                        const t = result.traits[traitIdx];
                        if (!t) return null;
                        return (
                          <div key={result.id} className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 w-20">{formatDate(result.completedAt)}</span>
                            <div className="flex-1 bg-slate-100 rounded-full h-3">
                              <div
                                className={cn('h-3 rounded-full bg-gradient-to-r transition-all duration-700', getAssessmentColor(result.assessmentId))}
                                style={{ width: `${Math.min(t.score, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-slate-600 w-10 text-right">{t.score}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">{t.insights}</h3>
          <div className="space-y-3">
            {sameType && (() => {
              const first = selectedResults[0];
              const last = selectedResults[selectedResults.length - 1];
              const scoreDiff = last.totalScore - first.totalScore;
              const insights: string[] = [];

              if (scoreDiff > 5) {
                insights.push(locale === 'zh'
                  ? `你的${getAssessmentName(first.assessmentId)}得分从${first.totalScore}上升到${last.totalScore}，整体呈上升趋势。`
                  : `Your ${getAssessmentName(first.assessmentId)} score increased from ${first.totalScore} to ${last.totalScore}, showing an upward trend.`);
              } else if (scoreDiff < -5) {
                insights.push(locale === 'zh'
                  ? `你的${getAssessmentName(first.assessmentId)}得分从${first.totalScore}下降到${last.totalScore}，整体呈下降趋势。`
                  : `Your ${getAssessmentName(first.assessmentId)} score decreased from ${first.totalScore} to ${last.totalScore}, showing a downward trend.`);
              } else {
                insights.push(locale === 'zh'
                  ? `你的${getAssessmentName(first.assessmentId)}得分变化不大，保持在相对稳定的水平。`
                  : `Your ${getAssessmentName(first.assessmentId)} score has remained relatively stable.`);
              }

              if (first.traits.length > 0) {
                const maxChange = first.traits.reduce((max, trait, i) => {
                  const lastTrait = last.traits[i];
                  if (!lastTrait) return max;
                  const diff = Math.abs(lastTrait.score - trait.score);
                  return diff > max.diff ? { name: trait.name, diff } : max;
                }, { name: '', diff: 0 });

                if (maxChange.diff > 5) {
                  insights.push(locale === 'zh'
                    ? `变化最大的维度是"${maxChange.name}"，变化幅度为${maxChange.diff}分。`
                    : `The dimension with the most change is "${maxChange.name}", with a change of ${maxChange.diff} points.`);
                }
              }

              return insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <span className="text-blue-500">💡</span>
                  <p className="text-sm text-blue-800">{insight}</p>
                </div>
              ));
            })()}

            {!sameType && (
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                <span className="text-amber-500">ℹ️</span>
                <p className="text-sm text-amber-800">{t.differentTypes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          {t.title}
        </h1>
        <p className="text-slate-500 mt-2">{t.subtitle}</p>
      </div>

      {assessmentHistory.length < 2 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <span className="text-4xl">📊</span>
          <p className="text-slate-500 mt-3">{t.needMoreData}</p>
        </div>
      ) : (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setAssessmentFilter('all')}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                assessmentFilter === 'all'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              )}
            >
              {locale === 'zh' ? '全部' : 'All'}
            </button>
            {Object.keys(groupedHistory).map(id => (
              <button
                key={id}
                onClick={() => setAssessmentFilter(id)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                  assessmentFilter === id
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                )}
              >
                {getAssessmentName(id)} ({groupedHistory[id].length})
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-800">{t.selectResults}</h3>
              <span className="text-xs text-slate-400">{t.selectHint}</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredHistory.map(result => (
                <button
                  key={result.id}
                  onClick={() => toggleSelection(result.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left',
                    selectedIds.includes(result.id)
                      ? 'bg-teal-50 border-2 border-teal-400'
                      : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                  )}
                >
                  <div className={cn(
                    'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0',
                    selectedIds.includes(result.id) ? 'bg-teal-500 border-teal-500' : 'border-slate-300'
                  )}>
                    {selectedIds.includes(result.id) && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700">{getAssessmentName(result.assessmentId)}</span>
                      <span className="text-xs text-slate-400">{formatDate(result.completedAt)}</span>
                    </div>
                    <span className="text-xs text-slate-500">{t.score}: {result.totalScore}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {renderComparison()}
        </>
      )}
    </div>
  );
}
