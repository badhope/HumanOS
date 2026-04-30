import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageSkeleton } from './components/Loading'
import SplashScreen from './components/animations/SplashScreen'
import GlobalMenu from './components/GlobalMenu'
import { I18nProvider } from './i18n'
import { useAppStore } from './store'
import visitorService from './services/visitorIdentity'
import PageTransitionController from './components/animations/PageTransitionController'
import ErrorBoundary from './components/ErrorBoundary'
import QuickSearchModal from './components/QuickSearchModal'
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp'
import ShortcutInitializer from './components/ShortcutInitializer'
import { ToastProvider } from './components/ui/Toast'
import { ShortcutProvider } from './components/ShortcutProvider'

import AppLayout from './app/layout/AppLayout'
import Daily from './app/pages/Daily'
import Training from './app/pages/Training'
import Progress from './app/pages/Progress'
import Discover from './app/pages/Discover'
import Settings from './components/Settings'
import GrowthDashboard from './app/pages/GrowthDashboard'
import UniversalTraining from './app/pages/training/UniversalTraining'

const Home = lazy(() => import('./pages/Home'))
const AssessmentSelect = lazy(() => import('./pages/AssessmentSelect'))
const ModeSelect = lazy(() => import('./pages/ModeSelect'))
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
const OnePieceModeSelect = lazy(() => import('./pages/OnePieceModeSelect'))
const QuestionOptimizer = lazy(() => import('./pages/QuestionOptimizer'))
const ThemeAnalysisDemo = lazy(() => import('./pages/ThemeAnalysisDemo'))
const ChartShowcase = lazy(() => import('./pages/ChartShowcase'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const SoulMatch = lazy(() => import('./pages/SoulMatch'))
const Profile = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const theme = useAppStore((state) => state.theme)
  const location = useLocation()
  
  const isFullscreenGame = 
    location.pathname.includes('/assessment')

  const isNewApp = location.pathname.startsWith('/app')

  useEffect(() => {
    visitorService.getVisitorId()
  }, [])

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
                
                {!isNewApp && showSplash && (
                  <SplashScreen onComplete={handleSplashComplete} minDuration={4500} />
                )}

                {!isNewApp && <GlobalMenu />}
                {!isNewApp && <QuickSearchModal />}
                {!isNewApp && <KeyboardShortcutsHelp />}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                {/* 默认首页：直接进入新架构 */}
                <Route path="/" element={<Navigate to="/app/daily" replace />} />

                {/* 新架构 - 心灵健身房 */}
                <Route path="/app" element={<AppLayout title="心镜 MindMirror" />}>
                  <Route path="daily" element={<Daily />} />
                  <Route path="training" element={<Training />} />
                  <Route path="progress" element={<Progress />} />
                  <Route path="discover" element={<Discover />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* 独立训练页面 - 全屏沉浸式 */}
                <Route path="/app/training/:programId" element={<UniversalTraining />} />
                <Route path="/app/growth" element={<GrowthDashboard />} />

                {/* 统一入口：新旧路径全部重定向到测评列表 */}
                <Route path="/assessments" element={<Navigate to="/legacy/assessments" replace />} />
                <Route path="/categories" element={<Navigate to="/legacy/assessments" replace />} />
                <Route path="/legacy/home" element={<Home />} />
                <Route path="/legacy/categories" element={<Navigate to="/legacy/assessments" replace />} />
                <Route path="/legacy/assessments" element={<AssessmentSelect />} />
                <Route path="/legacy/mode-select/:id" element={<ModeSelect />} />
                <Route path="/legacy/mode-select/onepiece/:id" element={<OnePieceModeSelect />} />
                <Route path="/legacy/confirm/:id" element={<AssessmentConfirm />} />
                <Route path="/legacy/assessment/:id" element={<Assessment />} />
                <Route path="/legacy/loading/:id" element={<Loading />} />
                <Route path="/legacy/results/:id" element={<Results />} />
                <Route path="/legacy/result/:hash" element={<Results />} />
                <Route path="/legacy/dashboard" element={<Dashboard />} />
                <Route path="/legacy/about" element={<About />} />
                <Route path="/legacy/theory/:theoryId" element={<TheoryDetail />} />
                <Route path="/legacy/history/philosophy" element={<PhilosophyHistoryPage />} />
                <Route path="/legacy/history/psychology" element={<PsychologyHistoryPage />} />
                <Route path="/legacy/history/ideology" element={<IdeologyHistoryPage />} />
                <Route path="/legacy/isms" element={<IsmsPage />} />
                <Route path="/legacy/story" element={<PlatformStoryPage />} />
                <Route path="/legacy/tools/question-optimizer" element={<QuestionOptimizer />} />
                <Route path="/legacy/demos/theme-analysis" element={<ThemeAnalysisDemo />} />
                <Route path="/legacy/demos/charts" element={<ChartShowcase />} />
                <Route path="/legacy/leaderboard" element={<Leaderboard />} />
                <Route path="/legacy/soul-match" element={<SoulMatch />} />
                <Route path="/legacy/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/app/daily" replace />} />
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
