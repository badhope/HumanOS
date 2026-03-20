import { db } from './database';
import { getAllResults } from './resultService';
import { getAllDrafts } from './draftService';
import { getAllSettingsFromDB } from './settingsService';
import { getProfile } from './profileService';
import type { ResultRecord, DraftRecord, LocalProfile } from '@/shared/types';

export interface ExportData {
  version: string;
  exportedAt: string;
  settings: Record<string, string | number | boolean>;
  profile: LocalProfile | null;
  results: ResultRecord[];
  drafts: DraftRecord[];
}

export async function exportAllData(): Promise<ExportData> {
  const results = await getAllResults();
  const drafts = await getAllDrafts();
  const settings = await getAllSettingsFromDB();
  const profile = await getProfile();

  return {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    settings,
    profile: profile || null,
    results,
    drafts,
  };
}

export function downloadExportData(data: ExportData): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `humans-os-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function clearAllData(): Promise<void> {
  await db.results.clear();
  await db.drafts.clear();
  await db.settings.clear();
  await db.profile.clear();
}

export async function clearResultsOnly(): Promise<void> {
  await db.results.clear();
}

export async function clearDraftsOnly(): Promise<void> {
  await db.drafts.clear();
}

export async function getStorageStats(): Promise<{
  resultsCount: number;
  draftsCount: number;
  settingsCount: number;
  profileExists: boolean;
}> {
  return {
    resultsCount: await db.results.count(),
    draftsCount: await db.drafts.filter(d => !d.isAbandoned).count(),
    settingsCount: await db.settings.count(),
    profileExists: (await db.profile.count()) > 0,
  };
}