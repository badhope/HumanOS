import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserSettings, Theme, AnimationLevel } from '@/shared/types';
import { saveAllSettings, loadSettingsFromDB, resetSettings as resetSettingsInDB, saveSettingTyped } from '@/features/storage/settingsService';

interface SettingsState extends UserSettings {
  setTheme: (theme: Theme) => void;
  setFontSize: (size: number) => void;
  setAnimationLevel: (level: AnimationLevel) => void;
  setReducedMotion: (reduced: boolean) => void;
  setShowTimer: (show: boolean) => void;
  setAutoSaveDraft: (autoSave: boolean) => void;
  resetSettings: () => void;
  syncFromDB: () => Promise<void>;
  syncToDB: () => Promise<void>;
  initialized: boolean;
  setInitialized: (val: boolean) => void;
}

const defaultSettings: UserSettings = {
  theme: 'system',
  fontSize: 16,
  animationLevel: 'medium',
  reducedMotion: false,
  showTimer: true,
  autoSaveDraft: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...defaultSettings,
      initialized: false,

      setTheme: async (theme) => {
        set({ theme });
        await saveSettingTyped('theme', theme);
      },

      setFontSize: async (fontSize) => {
        set({ fontSize });
        await saveSettingTyped('fontSize', fontSize);
      },

      setAnimationLevel: async (animationLevel) => {
        set({ animationLevel });
        await saveSettingTyped('animationLevel', animationLevel);
      },

      setReducedMotion: async (reducedMotion) => {
        set({ reducedMotion });
        await saveSettingTyped('reducedMotion', reducedMotion);
      },

      setShowTimer: async (showTimer) => {
        set({ showTimer });
        await saveSettingTyped('showTimer', showTimer);
      },

      setAutoSaveDraft: async (autoSaveDraft) => {
        set({ autoSaveDraft });
        await saveSettingTyped('autoSaveDraft', autoSaveDraft);
      },

      resetSettings: async () => {
        set({ ...defaultSettings, initialized: true });
        await resetSettingsInDB();
      },

      syncFromDB: async () => {
        try {
          const dbSettings = await loadSettingsFromDB();
          set({
            ...dbSettings,
            initialized: true
          });
        } catch (error) {
          console.error('Failed to sync settings from DB:', error);
          set({ initialized: true });
        }
      },

      syncToDB: async () => {
        try {
          const state = get();
          await saveAllSettings({
            theme: state.theme,
            fontSize: state.fontSize,
            animationLevel: state.animationLevel,
            reducedMotion: state.reducedMotion,
            showTimer: state.showTimer,
            autoSaveDraft: state.autoSaveDraft,
          });
        } catch (error) {
          console.error('Failed to sync settings to DB:', error);
        }
      },

      setInitialized: (val) => set({ initialized: val }),
    }),
    {
      name: 'humans-os-settings',
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
        animationLevel: state.animationLevel,
        reducedMotion: state.reducedMotion,
        showTimer: state.showTimer,
        autoSaveDraft: state.autoSaveDraft,
      }),
    }
  )
);