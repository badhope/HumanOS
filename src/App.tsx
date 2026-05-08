import { lazy, Suspense, useState, useEffect, createContext, useContext, useCallback } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { PageSkeleton } from './components/Loading'
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
import { LoadingProgress } from './components/ui/LoadingProgress'

import AppLayout from './app/layout/AppLayout'
import Daily from './app/pages/Daily'
import Training from './app/pages/Training'
import Progress from './app/pages/Progress'
import Discover from './app/pages/Discover'
import SettingsPage from './app/pages/SettingsPage'
import GrowthDashboard from './app/pages/GrowthDashboard'
import GettingStarted from './app/pages/GettingStarted'
import UniversalTraining from './app/pages/training/UniversalTraining'

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

const LoadingContext = createContext<{
  startLoading: (msg?: string, showProg?: boolean) => void
  stopLoading: () => void
  updateProgress: (p: number) => void
} | undefined>(undefined)

export function useGlobalLoading() {
  const ctx = useContext(LoadingContext)
  if (!ctx) return { startLoading: () => {}, stopLoading: () => {}, updateProgress: () => {} }
  return ctx
}

export default function App() {
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const [transitionMessage, setTransitionMessage] = useState('')
  const [transitionProgress, setTransitionProgress] = useState(0)
  const theme = useAppStore((state) => state.theme)
  const location = useLocation()
  
  const isNewApp = location.pathname.startsWith('/app')

  const startLoading = useCallback((msg: string, showProg: boolean = true) => {
    setTransitionMessage(msg)
    setTransitionProgress(0)
    setIsPageTransitioning(true)
    
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 90) {
        clearInterval(interval)
      }
      setTransitionProgress(Math.min(progress, 90))
    }, 200)
  }, [])

  const stopLoading = useCallback(() => {
    setTransitionProgress(100)
    setTimeout(() => {
      setIsPageTransitioning(false)
    }, 300)
  }, [])

  const updateProgress = useCallback((p: number) => {
    setTransitionProgress(Math.min(p, 90))
  }, [])

  useEffect(() => {
    visitorService.getVisitorId()
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading, updateProgress }}>
      <I18nProvider>
        <ErrorBoundary>
          <ToastProvider>
            <ShortcutProvider>
              <PageTransitionController useThemeTransition={true} defaultPreset="page">
                <div className="min-h-screen bg-slate-900 text-white">
                  <ShortcutInitializer />
                  
                  {!isNewApp && <GlobalMenu />}
                  {!isNewApp && <QuickSearchModal />}
                  {!isNewApp && <KeyboardShortcutsHelp />}

                  <Suspense fallback={<PageSkeleton />}>
                    <Routes>
                      <Route path="/" element={<Navigate to="/app/daily" replace />} />

                      <Route path="/app" element={<AppLayout title="心镜 MindMirror" />}>
                        <Route path="daily" element={<Daily />} />
                        <Route path="training" element={<Training />} />
                        <Route path="progress" element={<Progress />} />
                        <Route path="discover" element={<Discover />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="getting-started" element={<GettingStarted />} />
                      </Route>

                      <Route path="/app/training/:programId" element={<UniversalTraining />} />
                      <Route path="/app/growth" element={<GrowthDashboard />} />

                      <Route path="/assessments" element={<Navigate to="/app/discover" replace />} />
                      <Route path="/categories" element={<Navigate to="/app/discover" replace />} />
                      <Route path="/legacy/categories" element={<Navigate to="/app/discover" replace />} />
                      <Route path="/legacy/assessments" element={<Navigate to="/app/discover" replace />} />
                      <Route path="/legacy/home" element={<Navigate to="/app/daily" replace />} />
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

                  <LoadingProgress
                    isLoading={isPageTransitioning}
                    message={transitionMessage}
                    progress={transitionProgress}
                    showProgress={true}
                  />
                </div>
              </PageTransitionController>
            </ShortcutProvider>
          </ToastProvider>
        </ErrorBoundary>
      </I18nProvider>
    </LoadingContext.Provider>
  )
}
