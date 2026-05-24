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

import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import Daily from './pages/Daily'
import AssessmentsPage from './pages/AssessmentsPage'
import TrainingOverview from './pages/training/TrainingOverview'
import TrainingTrackPage from './pages/training/TrainingTrackPage'
import Progress from './pages/Progress'
import SettingsPage from './pages/SettingsPage'
import GrowthDashboard from './pages/GrowthDashboard'
import GettingStarted from './pages/GettingStarted'
import UniversalTraining from './pages/training/UniversalTraining'
import LibraryArticles from './pages/library/LibraryArticles'
import ArticleDetail from './pages/library/ArticleDetail'
import LibraryTools from './pages/library/LibraryTools'
import LibraryResources from './pages/library/LibraryResources'
import CommunityShare from './pages/community/CommunityShare'
import CommunityDiscussion from './pages/community/CommunityDiscussion'
import CommunityExpert from './pages/community/CommunityExpert'
import GrowthTraining from './pages/growth/GrowthTraining'
import GrowthHabits from './pages/growth/GrowthHabits'
import AssessmentIntro from './pages/assessment/AssessmentIntro'
import AssessmentTaking from './pages/assessment/AssessmentTaking'
import AssessmentResult from './pages/assessment/AssessmentResult'
import IdeologyModeSelect from './pages/assessment/IdeologyModeSelect'
import About from './pages/About'
import AssessmentConfirm from './pages/AssessmentConfirm'
import Assessment from './pages/Assessment'
import Loading from './pages/Loading'
import Results from './pages/Results'
import Dashboard from './pages/Dashboard'
import TheoryDetail from './pages/TheoryDetail'
import PhilosophyHistoryPage from './pages/PhilosophyHistoryPage'
import PsychologyHistoryPage from './pages/PsychologyHistoryPage'
import IdeologyHistoryPage from './pages/IdeologyHistoryPage'
import IsmsPage from './pages/IsmsPage'
import PlatformStoryPage from './pages/PlatformStoryPage'
import OnePieceModeSelect from './pages/OnePieceModeSelect'
import Leaderboard from './pages/Leaderboard'
import SoulMatch from './pages/SoulMatch'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import ChartShowcase from './pages/ChartShowcase'
import ModeSelect from './pages/ModeSelect'
import Discover from './pages/Discover'
import Training from './pages/Training'

export default function App() {
  const theme = useAppStore((state) => state.theme)
  const location = useLocation()

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
              
              <GlobalMenu />
              <QuickSearchModal />
              <KeyboardShortcutsHelp />

              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  
                  <Route path="/" element={<AppLayout title="心镜" />}>
                    <Route path="home" element={<HomePage />} />
                    <Route path="daily" element={<Daily />} />
                    <Route path="discover" element={<Discover />} />
                    <Route path="assessments" element={<AssessmentsPage />} />
                    <Route path="training" element={<Training />} />
                    <Route path="training/overview" element={<TrainingOverview />} />
                    <Route path="training/track/:trackId" element={<TrainingTrackPage />} />
                    <Route path="training/:programId" element={<UniversalTraining />} />
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
                    <Route path="assessment/ideology-enhanced/mode-select" element={<IdeologyModeSelect />} />
                    <Route path="assessment/ideology-enhanced" element={<AssessmentIntro />} />
                    <Route path="assessment/ideology-enhanced/start" element={<AssessmentTaking />} />
                    <Route path="assessment/ideology-enhanced/result/:resultId" element={<AssessmentResult />} />
                    <Route path="assessment/:assessmentId" element={<AssessmentIntro />} />
                    <Route path="assessment/:assessmentId/start" element={<AssessmentTaking />} />
                    <Route path="assessment/:assessmentId/result/:resultId" element={<AssessmentResult />} />
                    <Route path="mode-select/:id" element={<ModeSelect />} />
                    <Route path="confirm/:id" element={<AssessmentConfirm />} />
                    <Route path="take/:id" element={<Assessment />} />
                    <Route path="loading/:id" element={<Loading />} />
                    <Route path="results/:id" element={<Results />} />
                    <Route path="result/:hash" element={<Results />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="about" element={<About />} />
                    <Route path="theory/:theoryId" element={<TheoryDetail />} />
                    <Route path="history/philosophy" element={<PhilosophyHistoryPage />} />
                    <Route path="history/psychology" element={<PsychologyHistoryPage />} />
                    <Route path="history/ideology" element={<IdeologyHistoryPage />} />
                    <Route path="isms" element={<IsmsPage />} />
                    <Route path="story" element={<PlatformStoryPage />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="soul-match" element={<SoulMatch />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="charts" element={<ChartShowcase />} />
                    <Route path="mode-select/onepiece/:id" element={<OnePieceModeSelect />} />
                  </Route>
                  
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
