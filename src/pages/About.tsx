import { useAppStore } from '../store';
import { getTranslation } from '../i18n';

export function About() {
  const { locale } = useAppStore();
  const i18n = getTranslation(locale);

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          {i18n.about.title}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {i18n.about.subtitle}
        </p>
      </div>

      <div className="space-y-6">
        {/* 使命 */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>🎯</span> {i18n.about.mission.title}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {i18n.about.mission.description}
          </p>
        </div>

        {/* 特性 */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>✨</span> {i18n.about.features.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">{i18n.about.features.scientific.title}</h3>
              <p className="text-sm text-slate-600">{i18n.about.features.scientific.desc}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">{i18n.about.features.precise.title}</h3>
              <p className="text-sm text-slate-600">{i18n.about.features.precise.desc}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">{i18n.about.features.privacy.title}</h3>
              <p className="text-sm text-slate-600">{i18n.about.features.privacy.desc}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
              <h3 className="font-bold text-slate-800 mb-2">{i18n.about.features.guidance.title}</h3>
              <p className="text-sm text-slate-600">{i18n.about.features.guidance.desc}</p>
            </div>
          </div>
        </div>

        {/* 联系信息 */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>📧</span> {i18n.about.contact.title}
          </h2>
          <p className="text-slate-600">
            {i18n.about.contact.description}
          </p>
          <div className="mt-4 p-4 bg-slate-50 rounded-xl text-center">
            <p className="text-blue-600 font-medium">{i18n.about.contact.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
