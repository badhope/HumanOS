import { useState } from 'react';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';

export const Settings = () => {
  const { locale, clearHistory, assessmentHistory } = useAppStore();
  const i18n = getTranslation(locale);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearHistory = () => {
    if (assessmentHistory.length === 0) {
      alert(i18n.settings.data.clearHistoryDesc);
      return;
    }

    if (window.confirm(`${i18n.settings.data.clearHistory}?\n${i18n.common.confirm}`)) {
      setIsClearing(true);
      setTimeout(() => {
        clearHistory();
        setIsClearing(false);
        alert(i18n.settings.data.historyCleared);
      }, 300);
    }
  };

  const handleResetApp = () => {
    if (window.confirm(i18n.settings.data.resetAppDesc)) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center py-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">{i18n.settings.title}</h1>
        <p className="text-lg text-slate-600">{i18n.settings.subtitle}</p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">🎨</span> {i18n.settings.appearance.title}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-800">{i18n.settings.appearance.darkMode}</p>
                <p className="text-sm text-slate-500">{i18n.settings.appearance.darkModeDesc}</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  darkMode ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">🔔</span> {i18n.settings.notifications.title}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-800">{i18n.settings.notifications.push}</p>
                <p className="text-sm text-slate-500">{i18n.settings.notifications.pushDesc}</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  notifications ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span> {i18n.settings.data.title}
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={handleClearHistory}
              disabled={isClearing || assessmentHistory.length === 0}
              className="w-full text-left p-4 bg-slate-50 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{i18n.settings.data.clearHistory}</p>
                  <p className="text-sm text-slate-500">{i18n.settings.data.clearHistoryDesc}</p>
                </div>
                <span className="text-slate-400">
                  {isClearing ? i18n.settings.data.clearing : i18n.settings.data.records.replace('{count}', String(assessmentHistory.length))}
                </span>
              </div>
            </button>
            
            <button
              onClick={handleResetApp}
              className="w-full text-left p-4 bg-red-50 rounded-xl text-red-700 hover:bg-red-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{i18n.settings.data.resetApp}</p>
                  <p className="text-sm text-red-500">{i18n.settings.data.resetAppDesc}</p>
                </div>
                <span className="text-red-400">⚠️</span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-lg border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">ℹ️</span> {i18n.settings.about.title}
          </h2>
          
          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span>{i18n.settings.about.version}</span>
              <span className="text-slate-400">1.0.0</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p>{i18n.settings.about.description}</p>
              <p className="mt-2 text-slate-500">{i18n.settings.about.tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
