import { useMemo } from 'react';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import { dailyTipService, type PersonalizedTip } from '../services/tips/DailyTipService';

export function DailyTips() {
  const { locale, assessmentHistory } = useAppStore();
  const i18n = getTranslation(locale);
  const t = i18n.dailyTips;

  const tips = useMemo(() => {
    return dailyTipService.getDailyTips(locale, 3, assessmentHistory);
  }, [locale, assessmentHistory]);

  const categoryIcons: Record<string, string> = {
    personality: '🎭',
    stress: '⚡',
    anxiety: '🛡️',
    general: '💡',
    sleep: '🌙',
    social: '🤝',
    mindfulness: '🧘',
  };

  const categoryColors: Record<string, string> = {
    personality: 'from-blue-500 to-indigo-500',
    stress: 'from-orange-500 to-red-500',
    anxiety: 'from-purple-500 to-pink-500',
    general: 'from-green-500 to-teal-500',
    sleep: 'from-indigo-500 to-purple-500',
    social: 'from-pink-500 to-rose-500',
    mindfulness: 'from-teal-500 to-cyan-500',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span>💡</span>
          {t.title}
        </h2>
        <span className="text-xs text-slate-400">{t.dailyRefresh}</span>
      </div>

      <div className="space-y-3">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryColors[tip.category] || 'from-slate-400 to-slate-500'} flex items-center justify-center text-lg shrink-0`}>
                {categoryIcons[tip.category] || '💡'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-slate-500 uppercase">
                    {t.categories?.[tip.category as keyof typeof t.categories] || tip.category}
                  </span>
                  {tip.relevance >= 3 && (
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                      {locale === 'zh' ? tip.reasonZh : tip.reasonEn}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {locale === 'zh' ? tip.tipZh : tip.tipEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
