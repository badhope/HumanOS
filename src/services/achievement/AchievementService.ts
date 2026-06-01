import { storage } from '../../lib/utils';
import type { AssessmentResult } from '../../types';

export interface Achievement {
  id: string;
  key: string;
  icon: string;
  category: 'assessment' | 'training' | 'streak' | 'social' | 'special';
  requirement: number;
  unlockedAt?: string;
  progress: number;
}

export interface AchievementDefinition {
  id: string;
  key: string;
  icon: string;
  category: 'assessment' | 'training' | 'streak' | 'social' | 'special';
  descriptionZh: string;
  descriptionEn: string;
  nameZh: string;
  nameEn: string;
  requirement: number;
  condition: (state: AchievementCheckState) => boolean;
  progressFn: (state: AchievementCheckState) => number;
}

export interface AchievementCheckState {
  totalAssessments: number;
  bigFiveCount: number;
  stressCount: number;
  anxietyCount: number;
  trainingCompleted: number;
  streakDays: number;
  moodEntries: number;
  compareCount: number;
  allAssessments: AssessmentResult[];
}

const STORAGE_KEY = 'achievements_unlocked';

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    id: 'first_assessment',
    key: 'firstAssessment',
    icon: '🎯',
    category: 'assessment',
    nameZh: '初探内心',
    nameEn: 'First Step',
    descriptionZh: '完成第一次心理测评',
    descriptionEn: 'Complete your first assessment',
    requirement: 1,
    condition: (s) => s.totalAssessments >= 1,
    progressFn: (s) => Math.min(s.totalAssessments, 1),
  },
  {
    id: 'explorer',
    key: 'explorer',
    icon: '🧭',
    category: 'assessment',
    nameZh: '探索者',
    nameEn: 'Explorer',
    descriptionZh: '完成3次心理测评',
    descriptionEn: 'Complete 3 assessments',
    requirement: 3,
    condition: (s) => s.totalAssessments >= 3,
    progressFn: (s) => Math.min(s.totalAssessments, 3),
  },
  {
    id: 'self_knower',
    key: 'selfKnower',
    icon: '🪞',
    category: 'assessment',
    nameZh: '自知之明',
    nameEn: 'Self-Knower',
    descriptionZh: '完成10次心理测评',
    descriptionEn: 'Complete 10 assessments',
    requirement: 10,
    condition: (s) => s.totalAssessments >= 10,
    progressFn: (s) => Math.min(s.totalAssessments, 10),
  },
  {
    id: 'personality_master',
    key: 'personalityMaster',
    icon: '🎭',
    category: 'assessment',
    nameZh: '人格大师',
    nameEn: 'Personality Master',
    descriptionZh: '完成大五人格测评3次',
    descriptionEn: 'Complete Big Five assessment 3 times',
    requirement: 3,
    condition: (s) => s.bigFiveCount >= 3,
    progressFn: (s) => Math.min(s.bigFiveCount, 3),
  },
  {
    id: 'stress_aware',
    key: 'stressAware',
    icon: '⚡',
    category: 'assessment',
    nameZh: '压力觉察者',
    nameEn: 'Stress Aware',
    descriptionZh: '完成压力测评3次',
    descriptionEn: 'Complete stress assessment 3 times',
    requirement: 3,
    condition: (s) => s.stressCount >= 3,
    progressFn: (s) => Math.min(s.stressCount, 3),
  },
  {
    id: 'anxiety_guardian',
    key: 'anxietyGuardian',
    icon: '🛡️',
    category: 'assessment',
    nameZh: '焦虑守护者',
    nameEn: 'Anxiety Guardian',
    descriptionZh: '完成焦虑测评3次',
    descriptionEn: 'Complete anxiety assessment 3 times',
    requirement: 3,
    condition: (s) => s.anxietyCount >= 3,
    progressFn: (s) => Math.min(s.anxietyCount, 3),
  },
  {
    id: 'first_training',
    key: 'firstTraining',
    icon: '🌱',
    category: 'training',
    nameZh: '初学乍练',
    nameEn: 'Beginner',
    descriptionZh: '完成第一次心理训练',
    descriptionEn: 'Complete your first training',
    requirement: 1,
    condition: (s) => s.trainingCompleted >= 1,
    progressFn: (s) => Math.min(s.trainingCompleted, 1),
  },
  {
    id: 'dedicated_learner',
    key: 'dedicatedLearner',
    icon: '📚',
    category: 'training',
    nameZh: '勤学不辍',
    nameEn: 'Dedicated Learner',
    descriptionZh: '完成5次心理训练',
    descriptionEn: 'Complete 5 training sessions',
    requirement: 5,
    condition: (s) => s.trainingCompleted >= 5,
    progressFn: (s) => Math.min(s.trainingCompleted, 5),
  },
  {
    id: 'training_master',
    key: 'trainingMaster',
    icon: '🧘',
    category: 'training',
    nameZh: '修炼达人',
    nameEn: 'Training Master',
    descriptionZh: '完成15次心理训练',
    descriptionEn: 'Complete 15 training sessions',
    requirement: 15,
    condition: (s) => s.trainingCompleted >= 15,
    progressFn: (s) => Math.min(s.trainingCompleted, 15),
  },
  {
    id: 'week_streak',
    key: 'weekStreak',
    icon: '🔥',
    category: 'streak',
    nameZh: '七日之约',
    nameEn: '7-Day Streak',
    descriptionZh: '连续7天使用应用',
    descriptionEn: 'Use the app for 7 consecutive days',
    requirement: 7,
    condition: (s) => s.streakDays >= 7,
    progressFn: (s) => Math.min(s.streakDays, 7),
  },
  {
    id: 'month_streak',
    key: 'monthStreak',
    icon: '💎',
    category: 'streak',
    nameZh: '月度坚持',
    nameEn: '30-Day Streak',
    descriptionZh: '连续30天使用应用',
    descriptionEn: 'Use the app for 30 consecutive days',
    requirement: 30,
    condition: (s) => s.streakDays >= 30,
    progressFn: (s) => Math.min(s.streakDays, 30),
  },
  {
    id: 'mood_tracker_start',
    key: 'moodTrackerStart',
    icon: '📝',
    category: 'special',
    nameZh: '心情记录者',
    nameEn: 'Mood Tracker',
    descriptionZh: '记录7天心情',
    descriptionEn: 'Track your mood for 7 days',
    requirement: 7,
    condition: (s) => s.moodEntries >= 7,
    progressFn: (s) => Math.min(s.moodEntries, 7),
  },
  {
    id: 'mood_habit',
    key: 'moodHabit',
    icon: '🌈',
    category: 'special',
    nameZh: '心情习惯',
    nameEn: 'Mood Habit',
    descriptionZh: '记录30天心情',
    descriptionEn: 'Track your mood for 30 days',
    requirement: 30,
    condition: (s) => s.moodEntries >= 30,
    progressFn: (s) => Math.min(s.moodEntries, 30),
  },
  {
    id: 'comparative_analyst',
    key: 'comparativeAnalyst',
    icon: '📊',
    category: 'special',
    nameZh: '对比分析师',
    nameEn: 'Comparative Analyst',
    descriptionZh: '使用3次测评对比功能',
    descriptionEn: 'Use the comparison feature 3 times',
    requirement: 3,
    condition: (s) => s.compareCount >= 3,
    progressFn: (s) => Math.min(s.compareCount, 3),
  },
  {
    id: 'all_rounder',
    key: 'allRounder',
    icon: '🏆',
    category: 'special',
    nameZh: '全面发展',
    nameEn: 'All-Rounder',
    descriptionZh: '完成所有类型的测评各至少1次',
    descriptionEn: 'Complete each type of assessment at least once',
    requirement: 3,
    condition: (s) => s.bigFiveCount >= 1 && s.stressCount >= 1 && s.anxietyCount >= 1,
    progressFn: (s) => {
      const types = [s.bigFiveCount >= 1 ? 1 : 0, s.stressCount >= 1 ? 1 : 0, s.anxietyCount >= 1 ? 1 : 0];
      return types.reduce((a, b) => a + b, 0);
    },
  },
];

class AchievementService {
  getUnlocked(): Record<string, string> {
    return storage.get<Record<string, string>>(STORAGE_KEY, {});
  }

  checkAndUnlock(state: AchievementCheckState): string[] {
    const unlocked = this.getUnlocked();
    const newlyUnlocked: string[] = [];

    ACHIEVEMENT_DEFINITIONS.forEach(def => {
      if (!unlocked[def.id] && def.condition(state)) {
        unlocked[def.id] = new Date().toISOString();
        newlyUnlocked.push(def.id);
      }
    });

    if (newlyUnlocked.length > 0) {
      storage.set(STORAGE_KEY, unlocked);
    }

    return newlyUnlocked;
  }

  getAchievements(state: AchievementCheckState): Achievement[] {
    const unlocked = this.getUnlocked();
    return ACHIEVEMENT_DEFINITIONS.map(def => ({
      id: def.id,
      key: def.key,
      icon: def.icon,
      category: def.category,
      requirement: def.requirement,
      unlockedAt: unlocked[def.id],
      progress: def.progressFn(state),
    }));
  }

  getStats(state: AchievementCheckState): { total: number; unlocked: number; byCategory: Record<string, { total: number; unlocked: number }> } {
    const unlocked = this.getUnlocked();
    const achievements = this.getAchievements(state);
    const byCategory: Record<string, { total: number; unlocked: number }> = {};

    achievements.forEach(a => {
      if (!byCategory[a.category]) byCategory[a.category] = { total: 0, unlocked: 0 };
      byCategory[a.category].total++;
      if (a.unlockedAt) byCategory[a.category].unlocked++;
    });

    return {
      total: ACHIEVEMENT_DEFINITIONS.length,
      unlocked: Object.keys(unlocked).length,
      byCategory,
    };
  }

  reset(): void {
    storage.remove(STORAGE_KEY);
  }
}

export const achievementService = new AchievementService();
