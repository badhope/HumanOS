import { useAppStore } from '../store';
import { type Locale } from '../i18n';

export function LanguageSwitcher() {
  const { locale, setLocale } = useAppStore();
  
  const toggleLocale = () => {
    const newLocale: Locale = locale === 'en' ? 'zh' : 'en';
    setLocale(newLocale);
  };
  
  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium"
      aria-label="Toggle language"
    >
      <span className="text-lg">{locale === 'en' ? '🇺🇸' : '🇨🇳'}</span>
      <span>{locale === 'en' ? '中文' : 'English'}</span>
    </button>
  );
}
