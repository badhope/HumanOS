import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { Assessments } from './pages/Assessments';
import AssessmentDetail from './pages/AssessmentDetail';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { About } from './pages/About';
import { Training } from './pages/Training';
import TrainingDetail from './pages/TrainingDetail';
import { PersonalDashboard } from './components/dashboard/PersonalDashboard';
import { PluginManager } from './components/plugin/PluginManager';
import { Sidebar, MenuButton } from './components/Sidebar';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { useAppStore } from './store';
import { getTranslation } from './i18n';
import './index.css';

export default function App() {
  const { locale, initializeAuth, initializePlugins } = useAppStore();
  const i18n = getTranslation(locale);

  useEffect(() => {
    initializeAuth();
    initializePlugins();
  }, [initializeAuth, initializePlugins]);
  
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl">
                  🧠
                </div>
                <span>{i18n.app.name}</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-5">
                <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm">
                  {i18n.nav.home}
                </Link>
                <Link to="/assessments" className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm">
                  {i18n.nav.assessments}
                </Link>
                <Link to="/training" className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm">
                  {i18n.nav.training}
                </Link>
                <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm">
                  {i18n.nav.dashboard}
                </Link>
                <LanguageSwitcher />
              </div>
              
              <div className="flex items-center gap-3 md:hidden">
                <LanguageSwitcher />
                <MenuButton />
              </div>
            </div>
          </div>
        </nav>

        <Sidebar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/assessments/:id" element={<AssessmentDetail />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training/:id" element={<TrainingDetail />} />
          <Route path="/dashboard" element={<PersonalDashboard />} />
          <Route path="/plugins" element={<PluginManager />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

        <footer className="mt-auto border-t border-slate-200 py-6 sm:py-10 bg-white/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-slate-500">
            <p className="text-sm sm:text-lg">{i18n.app.copyright}</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
