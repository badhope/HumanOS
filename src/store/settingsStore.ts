import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserSettings, Theme, AnimationLevel } from '@/shared/types';

interface SettingsState extends UserSettings {
  setTheme: (theme: Theme) => void;
  setFontSize: (size: number) => void;
  setAnimationLevel: (level: AnimationLevel) => void;
  setReducedMotion: (reduced: boolean) => void;
  resetSettings: () => void;
}

const defaultSettings: UserSettings = {
  theme: 'system',
  fontSize: 16,
  animationLevel: 'medium',
  reducedMotion: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setTheme: (theme) => set({ theme }),

      setFontSize: (fontSize) => set({ fontSize }),

      setAnimationLevel: (animationLevel) => set({ animationLevel }),

      setReducedMotion: (reducedMotion) => set({ reducedMotion }),

      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'humans-os-settings',
    }
  )
);
