export type Theme = 'light' | 'dark' | 'system';
export type AnimationLevel = 'none' | 'low' | 'medium' | 'high';

export interface UserSettings {
  theme: Theme;
  fontSize: number;
  animationLevel: AnimationLevel;
  reducedMotion: boolean;
  showTimer: boolean;
  autoSaveDraft: boolean;
}

export const defaultSettings: UserSettings = {
  theme: 'system',
  fontSize: 16,
  animationLevel: 'medium',
  reducedMotion: false,
  showTimer: true,
  autoSaveDraft: true,
};

export interface SettingRecord {
  key: string;
  value: string | number | boolean;
}