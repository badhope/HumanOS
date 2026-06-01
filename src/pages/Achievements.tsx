import { useMemo, useState } from 'react';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import { achievementService, ACHIEVEMENT_DEFINITIONS, type AchievementCheckState } from '../services/achievement/AchievementService';
import { moodTrackerService } from '../services/mood/MoodTrackerService';
import { cn } from '../lib/utils';

export function Achievements() {
  const { locale, assessmentHistory } = useAppStore();
  const i18n = getTranslation(locale);
  const t = i18n.achievements;
  const [filter, setFilter] = useState<string>('all');

  const checkState = useMemo<AchievementCheckState>(() => {
    const bigFiveCount = assessmentHistory.filter(a => a.assessmentId === 'big-five' || a.assessmentId === '1').length;
    const stressCount = assessmentHistory.filter(a => a.assessmentId === 'stress-test' || a.assessmentId === '2').length;
    const anxietyCount = assessmentHistory.filter(a => a.assessmentId === 'anxiety-gad7' || a.assessmentId === '3').length;
    const moodEntries = moodTrackerService.getAll().length;
    const streakDays = moodTrackerService.getStats().streakDays;

    return {
      totalAssessments: assessmentHistory.length,
      bigFiveCount,
      stressCount,
      anxietyCount,
      trainingCompleted: 0,
      streakDays,
      moodEntries,
      compareCount: 0,
      allAssessments: assessmentHistory,
    };
  }, [assessmentHistory]);

  const achievements = useMemo(() => achievementService.getAchievements(checkState), [checkState]);
  const stats = useMemo(() => achievementService.getStats(checkState), [checkState]);

  const filteredAchievements = filter === 'all'
    ? achievements
    : achievements.filter(a => a.category === filter);

  const categories = [
    { key: 'all', label: t.allCategories, icon: '🏆' },
    { key: 'assessment', label: t.categoryAssessment, icon: '📝' },
    { key: 'training', label: t.categoryTraining, icon: '💪' },
    { key: 'streak', label: t.categoryStreak, icon: '🔥' },
    { key: 'special', label: t.categorySpecial, icon: '⭐' },
  ];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'assessment': return 'from-blue-500 to-blue-600';
      case 'training': return 'from-green-500 to-green-600';
      case 'streak': return 'from-orange-500 to-red-500';
      case 'special': return 'from-purple-500 to-indigo-600';
      default: return 'from-slate-400 to-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {t.title}
        </h1>
        <p className="text-slate-500 mt-2">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 text-center border border-purple-100">
          <div className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.unlocked}</div>
          <div className="text-xs text-purple-500 mt-1">{t.unlocked}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 text-center border border-slate-200">
          <div className="text-2xl sm:text-3xl font-bold text-slate-600">{stats.total}</div>
          <div className="text-xs text-slate-500 mt-1">{t.total}</div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 text-center border border-amber-100">
          <div className="text-2xl sm:text-3xl font-bold text-amber-600">{Math.round((stats.unlocked / stats.total) * 100)}%</div>
          <div className="text-xs text-amber-500 mt-1">{t.completionRate}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">{t.overallProgress}</span>
          <span className="text-sm text-slate-500">{stats.unlocked}/{stats.total}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-500"
            style={{ width: `${(stats.unlocked / stats.total) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5',
              filter === cat.key
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            )}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredAchievements.map(achievement => {
          const def = ACHIEVEMENT_DEFINITIONS.find(d => d.id === achievement.id);
          const isUnlocked = !!achievement.unlockedAt;
          const progressPercent = Math.min((achievement.progress / achievement.requirement) * 100, 100);

          return (
            <div
              key={achievement.id}
              className={cn(
                'relative rounded-2xl p-5 transition-all border',
                isUnlocked
                  ? 'bg-white shadow-md border-slate-200'
                  : 'bg-slate-50 border-slate-100 opacity-75'
              )}
            >
              {isUnlocked && (
                <div className="absolute top-3 right-3">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">✓ {t.unlocked}</span>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0',
                  isUnlocked
                    ? `bg-gradient-to-br ${getCategoryColor(achievement.category)} shadow-lg`
                    : 'bg-slate-200'
                )}>
                  {isUnlocked ? achievement.icon : '🔒'}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800">
                    {locale === 'zh' ? def?.nameZh : def?.nameEn}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {locale === 'zh' ? def?.descriptionZh : def?.descriptionEn}
                  </p>

                  {!isUnlocked && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>{achievement.progress}/{achievement.requirement}</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {isUnlocked && achievement.unlockedAt && (
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(achievement.unlockedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
