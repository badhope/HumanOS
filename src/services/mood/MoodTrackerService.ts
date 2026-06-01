import { storage } from '../../lib/utils';

export interface MoodEntry {
  id: string;
  date: string;
  mood: MoodLevel;
  energy: number;
  anxiety: number;
  sleep: number;
  note: string;
  tags: string[];
  createdAt: string;
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface MoodStats {
  averageMood: number;
  averageEnergy: number;
  averageAnxiety: number;
  averageSleep: number;
  totalEntries: number;
  streakDays: number;
  moodDistribution: Record<number, number>;
  weeklyTrend: { date: string; mood: number }[];
  monthlyTrend: { date: string; mood: number }[];
}

export const MOOD_EMOJIS: Record<MoodLevel, string> = {
  1: '😢',
  2: '😔',
  3: '😐',
  4: '😊',
  5: '😄',
};

export const MOOD_LABELS_ZH: Record<MoodLevel, string> = {
  1: '很糟糕',
  2: '不太好',
  3: '一般',
  4: '还不错',
  5: '很开心',
};

export const MOOD_LABELS_EN: Record<MoodLevel, string> = {
  1: 'Terrible',
  2: 'Bad',
  3: 'Okay',
  4: 'Good',
  5: 'Great',
};

export const MOOD_COLORS: Record<MoodLevel, string> = {
  1: '#EF4444',
  2: '#F97316',
  3: '#EAB308',
  4: '#22C55E',
  5: '#3B82F6',
};

export const MOOD_TAGS = {
  zh: ['工作', '学习', '社交', '运动', '家庭', '健康', '休闲', '创造', '冥想', '旅行', '美食', '音乐'],
  en: ['Work', 'Study', 'Social', 'Exercise', 'Family', 'Health', 'Leisure', 'Creative', 'Meditation', 'Travel', 'Food', 'Music'],
};

const STORAGE_KEY = 'moodTracker_entries';

class MoodTrackerService {
  getAll(): MoodEntry[] {
    return storage.get<MoodEntry[]>(STORAGE_KEY, []);
  }

  getByDate(date: string): MoodEntry | undefined {
    return this.getAll().find(e => e.date === date);
  }

  getByDateRange(startDate: string, endDate: string): MoodEntry[] {
    return this.getAll().filter(e => e.date >= startDate && e.date <= endDate);
  }

  add(entry: Omit<MoodEntry, 'id' | 'createdAt'>): MoodEntry {
    const existing = this.getByDate(entry.date);
    if (existing) {
      return this.update(existing.id, entry);
    }
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const entries = this.getAll();
    entries.push(newEntry);
    entries.sort((a, b) => b.date.localeCompare(a.date));
    storage.set(STORAGE_KEY, entries);
    return newEntry;
  }

  update(id: string, updates: Partial<MoodEntry>): MoodEntry {
    const entries = this.getAll();
    const index = entries.findIndex(e => e.id === id);
    if (index === -1) {
      return this.add(updates as Omit<MoodEntry, 'id' | 'createdAt'>);
    }
    entries[index] = { ...entries[index], ...updates };
    storage.set(STORAGE_KEY, entries);
    return entries[index];
  }

  delete(id: string): void {
    const entries = this.getAll().filter(e => e.id !== id);
    storage.set(STORAGE_KEY, entries);
  }

  getStats(days = 30): MoodStats {
    const entries = this.getAll();
    const now = new Date();
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const recentEntries = entries.filter(e => new Date(e.createdAt) >= cutoff);

    const moodDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    recentEntries.forEach(e => { moodDistribution[e.mood] = (moodDistribution[e.mood] || 0) + 1; });

    const weeklyTrend = this.getTrend(entries, 7);
    const monthlyTrend = this.getTrend(entries, 30);

    return {
      averageMood: recentEntries.length > 0 ? recentEntries.reduce((s, e) => s + e.mood, 0) / recentEntries.length : 0,
      averageEnergy: recentEntries.length > 0 ? recentEntries.reduce((s, e) => s + e.energy, 0) / recentEntries.length : 0,
      averageAnxiety: recentEntries.length > 0 ? recentEntries.reduce((s, e) => s + e.anxiety, 0) / recentEntries.length : 0,
      averageSleep: recentEntries.length > 0 ? recentEntries.reduce((s, e) => s + e.sleep, 0) / recentEntries.length : 0,
      totalEntries: entries.length,
      streakDays: this.calculateStreak(entries),
      moodDistribution,
      weeklyTrend,
      monthlyTrend,
    };
  }

  private getTrend(entries: MoodEntry[], days: number): { date: string; mood: number }[] {
    const result: { date: string; mood: number }[] = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      const entry = entries.find(e => e.date === dateStr);
      result.push({ date: dateStr, mood: entry ? entry.mood : 0 });
    }
    return result;
  }

  private calculateStreak(entries: MoodEntry[]): number {
    if (entries.length === 0) return 0;
    let streak = 0;
    const now = new Date();
    const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
    for (let i = 0; i < 365; i++) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      if (sorted.find(e => e.date === dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  }

  getCalendarData(year: number, month: number): Record<string, MoodEntry> {
    const entries = this.getAll();
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    const result: Record<string, MoodEntry> = {};
    entries
      .filter(e => e.date.startsWith(prefix))
      .forEach(e => { result[e.date] = e; });
    return result;
  }
}

export const moodTrackerService = new MoodTrackerService();
