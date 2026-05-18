import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { PageSkeleton } from './components/Loading'
import GlobalMenu from './components/GlobalMenu'
import { I18nProvider } from './i18n'
import { useAppStore } from './store'
import ErrorBoundary from './components/ErrorBoundary'
import QuickSearchModal from './components/QuickSearchModal'
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp'
import ShortcutInitializer from './components/ShortcutInitializer'
import { ToastProvider } from './components/ui/Toast'
import { ShortcutProvider } from './components/ShortcutProvider'
import NotFound from './pages/NotFound'

import AppLayout from './app/layout/AppLayout'
import HomePage from './app/pages/HomePage'
import Daily from './app/pages/Daily'
import AssessmentsPage from './app/pages/AssessmentsPage'
import Training from './app/pages/Training'
import Progress from './app/pages/Progress'
import SettingsPage from './app/pages/SettingsPage'
import GrowthDashboard from './app/pages/GrowthDashboard'
import GettingStarted from './app/pages/GettingStarted'
import UniversalTraining from './app/pages/training/UniversalTraining'
import LibraryArticles from './app/pages/library/LibraryArticles'
import ArticleDetail from './app/pages/library/ArticleDetail'
import LibraryTools from './app/pages/library/LibraryTools'
import LibraryResources from './app/pages/library/LibraryResources'
import CommunityShare from './app/pages/community/CommunityShare'
import CommunityDiscussion from './app/pages/community/CommunityDiscussion'
import CommunityExpert from './app/pages/community/CommunityExpert'
import GrowthTraining from './app/pages/growth/GrowthTraining'
import GrowthHabits from './app/pages/growth/GrowthHabits'

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

export default function App() {
  const theme = useAppStore((state) => state.theme)
  const location = useLocation()
  
  const isNewApp = location.pathname.startsWith('/app')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <I18nProvider>
      <ErrorBoundary>
        <ToastProvider>
          <ShortcutProvider>
            <div className="min-h-screen bg-slate-900 text-white">
              <ShortcutInitializer />
              
              {!isNewApp && <GlobalMenu />}
              {!isNewApp && <QuickSearchModal />}
              {!isNewApp && <KeyboardShortcutsHelp />}

              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/" element={<Navigate to="/app/home" replace />} />

                  <Route path="/app" element={<AppLayout title="心镜" />}>
                    <Route path="home" element={<HomePage />} />
                    <Route path="daily" element={<Daily />} />
                    <Route path="assessments" element={<AssessmentsPage />} />
                    <Route path="training" element={<Training />} />
                    <Route path="progress" element={<Progress />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="getting-started" element={<GettingStarted />} />
                    <Route path="library" element={<LibraryArticles />} />
                    <Route path="library/articles" element={<LibraryArticles />} />
                    <Route path="library/article/:id" element={<ArticleDetail />} />
                    <Route path="library/tools" element={<LibraryTools />} />
                    <Route path="library/resources" element={<LibraryResources />} />
                    <Route path="community" element={<CommunityShare />} />
                    <Route path="community/share" element={<CommunityShare />} />
                    <Route path="community/discussion" element={<CommunityDiscussion />} />
                    <Route path="community/expert" element={<CommunityExpert />} />
                    <Route path="growth" element={<GrowthDashboard />} />
                    <Route path="growth/training" element={<GrowthTraining />} />
                    <Route path="growth/habits" element={<GrowthHabits />} />
                    <Route path="training/:programId" element={<UniversalTraining />} />
                  </Route>

                  <Route path="/app/discover" element={<Navigate to="/app/assessments" replace />} />
                  <Route path="/assessments" element={<Navigate to="/app/assessments" replace />} />
                  <Route path="/categories" element={<Navigate to="/app/assessments" replace />} />
                  <Route path="/legacy/categories" element={<Navigate to="/app/assessments" replace />} />
                  <Route path="/legacy/assessments" element={<Navigate to="/app/assessments" replace />} />
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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </ShortcutProvider>
        </ToastProvider>
      </ErrorBoundary>
    </I18nProvider>
  )
}
