import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageSkeleton } from './components/Loading'
import SplashScreen from './components/animations/SplashScreen'
import SettingsButton from './components/SettingsButton'
import ProfileButton from './components/ProfileButton'
import AdButton from './components/AdButton'
import { I18nProvider } from './i18n'
import { useAppStore } from './store'
import PageTransitionController from './components/animations/PageTransitionController'
import ErrorBoundary from './components/ErrorBoundary'
import QuickSearchModal from './components/QuickSearchModal'
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp'
import ShortcutInitializer from './components/ShortcutInitializer'
import { ToastProvider } from './components/ui/Toast'
import { ShortcutProvider } from './components/ShortcutProvider'

const Home = lazy(() => import('./pages/Home'))
const CategorySelect = lazy(() => import('./pages/CategorySelect'))
const AssessmentSelect = lazy(() => import('./pages/AssessmentSelect'))
const ModeSelect = lazy(() => import('./pages/ModeSelect'))
const SimulatedWorld = lazy(() => import('./pages/SimulatedWorld'))
const AssessmentConfirm = lazy(() => import('./pages/AssessmentConfirm'))
const Assessment = lazy(() => import('./pages/Assessment'))
const Loading = lazy(() => import('./pages/Loading'))
const Results = lazy(() => import('./pages/Results'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const About = lazy(() => import('./pages/About'))
const TheoryDetail = lazy(() => import('./pages/TheoryDetail'))
const PhilosophyHistoryPage = lazy(() => import('./pages/PhilosophyHistoryPage'))
const PsychologyHistoryPage = lazy(() => import('./pages/PsychologyHistoryPage'))
const IdeologyHistoryPage = lazy(() => import('./pages/IdeologyHistoryPage'))
const IsmsPage = lazy(() => import('./pages/IsmsPage'))
const PlatformStoryPage = lazy(() => import('./pages/PlatformStoryPage'))
const WorldHall = lazy(() => import('./pages/WorldHall'))
const WorldPlay = lazy(() => import('./pages/WorldPlay'))
const ScenarioSelect = lazy(() => import('./pages/ScenarioSelect'))
const ScenarioPlay = lazy(() => import('./pages/ScenarioPlay'))
const OnePieceModeSelect = lazy(() => import('./pages/OnePieceModeSelect'))
const EconomyDashboard = lazy(() => import('./components/economy/EconomyDashboard'))
const XianxiaDashboard = lazy(() => import('./pages/XianxiaDashboard'))
const QuestionOptimizer = lazy(() => import('./pages/QuestionOptimizer'))
const ThemeAnalysisDemo = lazy(() => import('./pages/ThemeAnalysisDemo'))
const ChartShowcase = lazy(() => import('./pages/ChartShowcase'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const theme = useAppStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.setAttribute('data-theme', theme)
  }, [theme])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <I18nProvider>
      <ErrorBoundary>
        <ToastProvider>
          <ShortcutProvider>
            <PageTransitionController useThemeTransition={true} defaultPreset="page">
              <>
                <ShortcutInitializer />
                {showSplash && (
                  <SplashScreen onComplete={handleSplashComplete} minDuration={4500} />
                )}

                <ProfileButton />
                <SettingsButton />
                <AdButton />
                <QuickSearchModal />
                <KeyboardShortcutsHelp />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<CategorySelect />} />
                <Route path="/assessments" element={<AssessmentSelect />} />
                <Route path="/mode-select/:id" element={<ModeSelect />} />
                <Route path="/mode-select/onepiece/:id" element={<OnePieceModeSelect />} />
                <Route path="/simulated-world" element={<SimulatedWorld />} />
                <Route path="/world" element={<WorldHall />} />
                <Route path="/world/scenarios" element={<ScenarioSelect />} />
                <Route path="/world/scenario/:scenarioId" element={<ScenarioPlay />} />
                <Route path="/world/play/:scenarioId" element={<WorldPlay />} />
                <Route path="/simulation/country" element={<EconomyDashboard />} />
                <Route path="/simulation/xianxia" element={<XianxiaDashboard />} />
                <Route path="/confirm/:id" element={<AssessmentConfirm />} />
                <Route path="/assessment/:id" element={<Assessment />} />
                <Route path="/loading/:id" element={<Loading />} />
                <Route path="/results/:id" element={<Results />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/theory/:theoryId" element={<TheoryDetail />} />
                <Route path="/history/philosophy" element={<PhilosophyHistoryPage />} />
                <Route path="/history/psychology" element={<PsychologyHistoryPage />} />
                <Route path="/history/ideology" element={<IdeologyHistoryPage />} />
                <Route path="/isms" element={<IsmsPage />} />
                <Route path="/story" element={<PlatformStoryPage />} />
                <Route path="/tools/question-optimizer" element={<QuestionOptimizer />} />
                <Route path="/demos/theme-analysis" element={<ThemeAnalysisDemo />} />
                <Route path="/demos/charts" element={<ChartShowcase />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
                </>
              </PageTransitionController>
            </ShortcutProvider>
          </ToastProvider>
        </ErrorBoundary>
      </I18nProvider>
  )
}
