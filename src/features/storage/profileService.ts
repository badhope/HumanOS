import { db, type LocalProfile } from './database';
import type { AssessmentCategory } from '@/shared/types';
import { getAllResults } from './resultService';

export async function getProfile(): Promise<LocalProfile | undefined> {
  const profiles = await db.profile.toArray();
  return profiles[0];
}

export async function createProfile(nickname: string = '探索者'): Promise<number> {
  const existing = await getProfile();
  if (existing) {
    return existing.id!;
  }

  const profile: Omit<LocalProfile, 'id'> = {
    nickname,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalAssessments: 0,
    totalDurationSpent: 0,
    lastAssessmentAt: null,
    favoriteCategory: null,
    settings: {
      theme: 'system',
      fontSize: 16,
    },
  };

  return await db.profile.add(profile as LocalProfile);
}

export async function updateProfile(updates: Partial<LocalProfile>): Promise<void> {
  const existing = await getProfile();
  if (!existing) {
    await createProfile();
  }
  await db.profile.update(existing!.id!, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function syncProfileFromResults(): Promise<void> {
  const results = await getAllResults();
  const profile = await getProfile();

  if (!profile) {
    await createProfile();
    return;
  }

  const totalAssessments = results.length;
  const totalDurationSpent = results.reduce((sum, r) => sum + (r.durationSpent || 0), 0);
  const lastAssessmentAt = results.length > 0 ? results[0].completedAt : null;

  const categoryCounts: Record<string, number> = {};
  results.forEach(r => {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
  });
  const favoriteCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as AssessmentCategory || null;

  await db.profile.update(profile.id!, {
    totalAssessments,
    totalDurationSpent,
    lastAssessmentAt,
    favoriteCategory,
    updatedAt: new Date().toISOString(),
  });
}

export async function updateProfileNickname(nickname: string): Promise<void> {
  await updateProfile({ nickname });
}

export async function deleteProfile(): Promise<void> {
  await db.profile.clear();
}

export async function getProfileStats(): Promise<{
  totalAssessments: number;
  totalDurationSpent: number;
  lastAssessmentAt: string | null;
  favoriteCategory: AssessmentCategory | null;
  categoryBreakdown: Record<string, number>;
}> {
  const results = await getAllResults();

  const totalAssessments = results.length;
  const totalDurationSpent = results.reduce((sum, r) => sum + (r.durationSpent || 0), 0);
  const lastAssessmentAt = results.length > 0 ? results[0].completedAt : null;

  const categoryCounts: Record<string, number> = {};
  results.forEach(r => {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
  });

  const favoriteCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as AssessmentCategory || null;

  return {
    totalAssessments,
    totalDurationSpent,
    lastAssessmentAt,
    favoriteCategory,
    categoryBreakdown: categoryCounts,
  };
}
