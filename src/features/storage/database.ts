import Dexie, { type Table } from 'dexie';
import type {
  ResultRecord,
  DraftRecord,
  LocalProfile,
} from '@/shared/types';

export { type ResultRecord, type DraftRecord, type LocalProfile };

export interface SettingRecord {
  key: string;
  value: string | number | boolean;
}

export class HumanOSDatabase extends Dexie {
  results!: Table<ResultRecord, number>;
  drafts!: Table<DraftRecord, number>;
  profile!: Table<LocalProfile, number>;
  settings!: Table<SettingRecord, string>;

  constructor() {
    super('HumanOSDB');

    this.version(1).stores({
      assessments: '++id, assessmentId, category, completedAt',
      settings: 'key',
    });

    this.version(2).stores({
      results: '++id, assessmentId, assessmentSlug, category, completedAt, resultType',
      drafts: '++id, assessmentId, assessmentSlug, updatedAt',
      settings: 'key',
      profile: '++id',
    });
  }
}

export const db = new HumanOSDatabase();

export async function initializeDatabase(): Promise<void> {
  try {
    await db.open();
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export async function clearDatabase(): Promise<void> {
  await db.results.clear();
  await db.drafts.clear();
  await db.profile.clear();
  await db.settings.clear();
}
