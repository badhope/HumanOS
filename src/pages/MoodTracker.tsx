import { useState, useMemo, useCallback } from 'react';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import { moodTrackerService, MOOD_EMOJIS, MOOD_COLORS, MOOD_TAGS, MOOD_LABELS_ZH, MOOD_LABELS_EN, type MoodLevel, type MoodEntry } from '../services/mood/MoodTrackerService';
import { useToasts } from '../store/toastStore';
import { cn } from '../lib/utils';

type MoodLevelType = 1 | 2 | 3 | 4 | 5;

export function MoodTracker() {
  const { locale } = useAppStore();
  const i18n = getTranslation(locale);
  const t = i18n.mood;
  const addToast = useToasts((s) => s.addToast);

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [mood, setMood] = useState<MoodLevelType | null>(null);
  const [energy, setEnergy] = useState(3);
  const [anxiety, setAnxiety] = useState(3);
  const [sleep, setSleep] = useState(7);
  const [note, setNote] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'record' | 'calendar' | 'trend'>('record');
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [refreshCounter, setRefreshCounter] = useState(0);

  const existingEntry = useMemo(
    () => moodTrackerService.getByDate(selectedDate),
    [selectedDate, refreshCounter]
  );
  const stats = useMemo(
    () => moodTrackerService.getStats(),
    [refreshCounter]
  );
  const calendarData = useMemo(
    () => moodTrackerService.getCalendarData(calYear, calMonth),
    [calYear, calMonth, refreshCounter]
  );

  const moodLabels = locale === 'zh' ? MOOD_LABELS_ZH : MOOD_LABELS_EN;
  const currentTags = locale === 'zh' ? MOOD_TAGS.zh : MOOD_TAGS.en;

  const refreshData = useCallback(() => {
    setRefreshCounter((c) => c + 1);
  }, []);

  const loadEntry = useCallback(
    (entry: MoodEntry) => {
      setMood(entry.mood);
      setEnergy(entry.energy);
      setAnxiety(entry.anxiety);
      setSleep(entry.sleep);
      setNote(entry.note);
      setTags(entry.tags);
    },
    []
  );

  const handleSave = () => {
    if (!mood) return;
    moodTrackerService.add({
      date: selectedDate,
      mood,
      energy,
      anxiety,
      sleep,
      note,
      tags,
    });
    refreshData();
    addToast(locale === 'zh' ? '心情记录已保存！' : 'Mood recorded!', 'success');
  };

  const handleDelete = (id: string) => {
    moodTrackerService.delete(id);
    setMood(null);
    setEnergy(3);
    setAnxiety(3);
    setSleep(7);
    setNote('');
    setTags([]);
    refreshData();
    addToast(locale === 'zh' ? '记录已删除' : 'Record deleted', 'info');
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    const entry = moodTrackerService.getByDate(dateStr);
    if (entry) {
      loadEntry(entry);
    } else {
      setMood(null);
      setEnergy(3);
      setAnxiety(3);
      setSleep(7);
      setNote('');
      setTags([]);
    }
  };

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const renderMoodBar = (value: number, max: number, color: string) => (
    <div className="w-full bg-slate-100 rounded-full h-2">
      <div
        className="h-2 rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
      />
    </div>
  );

  const renderCalendar = () => {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); } else setCalMonth((m) => m - 1);
            }}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={locale === 'zh' ? '上一个月' : 'Previous month'}
          >←</button>
          <h3 className="font-semibold text-slate-800">
            {calYear} {locale === 'zh' ? '年' : ''} {calMonth + 1} {locale === 'zh' ? '月' : ''}
          </h3>
          <button
            onClick={() => {
              if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); } else setCalMonth((m) => m + 1);
            }}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={locale === 'zh' ? '下一个月' : 'Next month'}
          >→</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {(locale === 'zh' ? ['日', '一', '二', '三', '四', '五', '六'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']).map((d) => (
            <div key={d} className="text-center text-xs text-slate-500 font-medium py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;
            const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const entry = calendarData[dateStr] as MoodEntry | undefined;
            const isToday = dateStr === today;
            return (
              <button
                key={dateStr}
                onClick={() => handleDateSelect(dateStr)}
                className={cn(
                  'relative w-full aspect-square rounded-lg flex items-center justify-center text-sm transition-all',
                  isToday && 'ring-2 ring-blue-400',
                  entry ? 'text-white font-bold' : 'text-slate-600 hover:bg-slate-50',
                  selectedDate === dateStr && 'ring-2 ring-indigo-500'
                )}
                style={entry ? { backgroundColor: MOOD_COLORS[entry.mood] } : undefined}
                aria-label={dateStr + (entry ? ' ' + moodLabels[entry.mood] : '')}
              >
                {day}
                {entry && <span className="absolute bottom-0.5 text-[8px]">{MOOD_EMOJIS[entry.mood]}</span>}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
          {([1, 2, 3, 4, 5] as MoodLevel[]).map((level) => (
            <div key={level} className="flex items-center gap-1 text-xs text-slate-500">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: MOOD_COLORS[level] }} />
              {moodLabels[level]}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTrend = () => {
    const trend = stats.weeklyTrend;
    const maxMood = 5;
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">{t.trend7Days}</h3>
        <div className="space-y-2">
          {trend.map((item, i) => {
            const d = new Date(item.date);
            const dayLabel = `${d.getMonth() + 1}/${d.getDate()}`;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-12 text-right">{dayLabel}</span>
                <div className="flex-1">
                  {item.mood > 0 ? (
                    <div className="flex items-center gap-2">
                      <div
                        className="h-6 rounded-lg transition-all duration-500 flex items-center justify-center text-white text-xs font-medium"
                        style={{
                          width: `${(item.mood / maxMood) * 100}%`,
                          backgroundColor: MOOD_COLORS[item.mood as MoodLevel],
                          minWidth: '2rem',
                        }}
                      >
                        {MOOD_EMOJIS[item.mood as MoodLevel]}
                      </div>
                      <span className="text-xs text-slate-500">{moodLabels[item.mood as MoodLevel]}</span>
                    </div>
                  ) : (
                    <div className="h-6 rounded-lg bg-slate-50 flex items-center px-3">
                      <span className="text-xs text-slate-400">—</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderRecord = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-2">
          {existingEntry ? t.editRecord : t.newRecord}
        </h3>
        <p className="text-sm text-slate-500 mb-4">{selectedDate}</p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">{t.howAreYou}</label>
          <div className="flex gap-3 justify-center">
            {([1, 2, 3, 4, 5] as MoodLevelType[]).map((level) => (
              <button
                key={level}
                onClick={() => setMood(level)}
                className={cn(
                  'flex flex-col items-center gap-1 p-3 rounded-xl transition-all',
                  mood === level
                    ? 'bg-blue-50 ring-2 ring-blue-400 scale-110'
                    : 'hover:bg-slate-50'
                )}
                aria-label={moodLabels[level]}
              >
                <span className="text-3xl">{MOOD_EMOJIS[level]}</span>
                <span className="text-xs text-slate-600">{moodLabels[level]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">{t.energyLevel}</span>
              <span className="text-slate-500">{energy}/5</span>
            </div>
            <input type="range" min="1" max="5" value={energy} onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              aria-label={t.energyLevel} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">{t.anxietyLevel}</span>
              <span className="text-slate-500">{anxiety}/5</span>
            </div>
            <input type="range" min="1" max="5" value={anxiety} onChange={(e) => setAnxiety(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              aria-label={t.anxietyLevel} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">{t.sleepHours}</span>
              <span className="text-slate-500">{sleep}{locale === 'zh' ? '小时' : 'hrs'}</span>
            </div>
            <input type="range" min="0" max="12" value={sleep} onChange={(e) => setSleep(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              aria-label={t.sleepHours} />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">{t.tags}</label>
          <div className="flex flex-wrap gap-2">
            {currentTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium transition-all',
                  tags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">{t.note}</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t.notePlaceholder}
            className="w-full p-3 border border-slate-200 rounded-xl text-sm resize-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            rows={3}
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSave}
            disabled={!mood}
            className={cn(
              'flex-1 py-3 rounded-xl font-medium transition-all',
              mood
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            )}
          >
            {existingEntry ? t.update : t.save}
          </button>
          {existingEntry && (
            <button
              onClick={() => handleDelete(existingEntry.id)}
              className="px-4 py-3 rounded-xl font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
            >
              {t.delete}
            </button>
          )}
        </div>
      </div>

      {stats.totalEntries > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">{t.statistics}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.averageMood.toFixed(1)}</div>
              <div className="text-xs text-blue-500 mt-1">{t.avgMood}</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.streakDays}</div>
              <div className="text-xs text-green-500 mt-1">{t.streakDays}</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.averageEnergy.toFixed(1)}</div>
              <div className="text-xs text-orange-500 mt-1">{t.avgEnergy}</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.averageSleep.toFixed(1)}</div>
              <div className="text-xs text-purple-500 mt-1">{t.avgSleep}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <h4 className="text-sm font-medium text-slate-700 mb-3">{t.moodDistribution}</h4>
            <div className="space-y-2">
              {([5, 4, 3, 2, 1] as MoodLevel[]).map((level) => (
                <div key={level} className="flex items-center gap-2">
                  <span className="text-lg">{MOOD_EMOJIS[level]}</span>
                  <span className="text-xs text-slate-500 w-16">{moodLabels[level]}</span>
                  <div className="flex-1">
                    {renderMoodBar(stats.moodDistribution[level] || 0, Math.max(...(Object.values(stats.moodDistribution) as number[]), 1), MOOD_COLORS[level])}
                  </div>
                  <span className="text-xs text-slate-500 w-8 text-right">{stats.moodDistribution[level] || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {t.title}
        </h1>
        <p className="text-slate-500 mt-2">{t.subtitle}</p>
      </div>

      <div className="flex justify-center gap-2">
        {([
          { key: 'record' as const, label: t.record, icon: '✏️' },
          { key: 'calendar' as const, label: t.calendar, icon: '📅' },
          { key: 'trend' as const, label: t.trend, icon: '📈' },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setViewMode(tab.key)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2',
              viewMode === tab.key
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            )}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {viewMode === 'record' && renderRecord()}
      {viewMode === 'calendar' && renderCalendar()}
      {viewMode === 'trend' && renderTrend()}
    </div>
  );
}
