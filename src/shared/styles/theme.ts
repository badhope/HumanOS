export const themes = {
  dark: {
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#06B6D4',
      background: '#0F0F23',
      surface: '#1A1A2E',
      text: '#FFFFFF',
      textMuted: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
      secondary: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      surface: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
      hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      glow: '0 0 40px rgba(139, 92, 246, 0.3)'
    }
  },
  light: {
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#06B6D4',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#111827',
      textMuted: 'rgba(17, 24, 39, 0.6)',
      border: 'rgba(17, 24, 39, 0.1)',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
      secondary: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      surface: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
      hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      glow: '0 0 40px rgba(139, 92, 246, 0.2)'
    }
  }
}

export type ThemeMode = 'light' | 'dark' | 'auto'

export const getThemeColors = (mode: ThemeMode) => {
  if (mode === 'auto') {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? themes.dark
        : themes.light
    }
    return themes.dark
  }
  return themes[mode]
}
