import Dexie, { type Table } from 'dexie';
import type { AssessmentResult, UserSettings } from '@/shared/types';

export interface SettingRecord {
  key: string;
  value: string | number | boolean;
}

export class HumanOSDatabase extends Dexie {
  assessments!: Table<AssessmentResult, number>;
  settings!: Table<SettingRecord, string>;

  constructor() {
    super('HumanOSDB');

    this.version(1).stores({
      assessments: '++id, assessmentId, category, completedAt',
      settings: 'key',
    });
  }
}

export const db = new HumanOSDatabase();

export async function saveAssessmentResult(
  result: Omit<AssessmentResult, 'id'>
): Promise<number> {
  return await db.assessments.add(result as AssessmentResult);
}

export async function getAssessmentResults(): Promise<AssessmentResult[]> {
  return await db.assessments.orderBy('completedAt').reverse().toArray();
}

export async function getAssessmentResultById(
  assessmentId: string
): Promise<AssessmentResult | undefined> {
  return await db.assessments
    .where('assessmentId')
    .equals(assessmentId)
    .first();
}

export async function deleteAssessmentResult(id: number): Promise<void> {
  await db.assessments.delete(id);
}

export async function saveSetting(
  key: string,
  value: string | number | boolean
): Promise<void> {
  await db.settings.put({ key, value });
}

export async function getSetting(key: string): Promise<string | number | boolean | undefined> {
  const record = await db.settings.get(key);
  return record?.value;
}

export async function getAllSettings(): Promise<Record<string, string | number | boolean>> {
  const records = await db.settings.toArray();
  return records.reduce(
    (acc, { key, value }) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string | number | boolean>
  );
}

export async function initializeSettings(
  defaultSettings: UserSettings
): Promise<void> {
  const existingSettings = await db.settings.count();
  if (existingSettings === 0) {
    await db.settings.bulkPut(
      Object.entries(defaultSettings).map(([key, value]) => ({
        key,
        value,
      }))
    );
  }
}
