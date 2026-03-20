import { db } from './database';
import { defaultSettings, type UserSettings } from '@/shared/types';
import type { Theme, AnimationLevel } from '@/shared/types';

export async function saveSetting(key: string, value: string | number | boolean): Promise<void> {
  await db.settings.put({ key, value });
}

export async function getSetting(key: string): Promise<string | number | boolean | undefined> {
  const record = await db.settings.get(key);
  return record?.value;
}

export async function getAllSettingsFromDB(): Promise<Record<string, string | number | boolean>> {
  const records = await db.settings.toArray();
  return records.reduce(
    (acc, { key, value }) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string | number | boolean>
  );
}

export async function initializeSettings(): Promise<void> {
  const count = await db.settings.count();
  if (count === 0) {
    await db.settings.bulkPut(
      Object.entries(defaultSettings).map(([key, value]) => ({
        key,
        value: value as string | number | boolean,
      }))
    );
  }
}

export async function saveAllSettings(settings: Partial<UserSettings>): Promise<void> {
  await db.settings.bulkPut(
    Object.entries(settings).map(([key, value]) => ({
      key,
      value: value as string | number | boolean,
    }))
  );
}

export async function resetSettings(): Promise<void> {
  await db.settings.clear();
  await initializeSettings();
}

export async function getSettingTyped<K extends keyof UserSettings>(key: K): Promise<UserSettings[K]> {
  const value = await getSetting(key);
  return value as UserSettings[K];
}

export async function hasSettings(): Promise<boolean> {
  const count = await db.settings.count();
  return count > 0;
}

export async function loadSettingsFromDB(): Promise<UserSettings> {
  const records = await getAllSettingsFromDB();
  return {
    theme: (records.theme as Theme) || defaultSettings.theme,
    fontSize: (records.fontSize as number) || defaultSettings.fontSize,
    animationLevel: (records.animationLevel as AnimationLevel) || defaultSettings.animationLevel,
    reducedMotion: (records.reducedMotion as boolean) || defaultSettings.reducedMotion,
    showTimer: (records.showTimer as boolean) ?? (records.showTimer === false ? false : defaultSettings.showTimer),
    autoSaveDraft: (records.autoSaveDraft as boolean) ?? (records.autoSaveDraft === false ? false : defaultSettings.autoSaveDraft),
  };
}

export async function saveSettingTyped<K extends keyof UserSettings>(key: K, value: UserSettings[K]): Promise<void> {
  await saveSetting(key, value as string | number | boolean);
}

export async function getThemeSetting(): Promise<Theme> {
  return (await getSettingTyped('theme')) || 'system';
}

export async function getFontSizeSetting(): Promise<number> {
  return (await getSettingTyped('fontSize')) || 16;
}

export async function getAnimationLevelSetting(): Promise<AnimationLevel> {
  return (await getSettingTyped('animationLevel')) || 'medium';
}

export async function getShowTimerSetting(): Promise<boolean> {
  const val = await getSetting('showTimer');
  return val === false ? false : true;
}

export async function getAutoSaveDraftSetting(): Promise<boolean> {
  const val = await getSetting('autoSaveDraft');
  return val === false ? false : true;
}
