import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageSkeleton } from './components/Loading'
import SplashScreen from './components/SplashScreen'
import SettingsButton from './components/SettingsButton'
import ProfileButton from './components/ProfileButton'
import AdButton from './components/AdButton'
import { I18nProvider } from './i18n'
import { useAppStore } from './store'
import PageTransitionController from './components/animations/PageTransitionController'
import ErrorBoundary from './components/ErrorBoundary'

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
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)
  const theme = useAppStore((state) => state.theme)

  useEffect(() => {
    const visited = localStorage.getItem('humanos-visited')
    if (visited) {
      setHasVisited(true)
      setShowSplash(false)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.setAttribute('data-theme', theme)
  }, [theme])

  const handleSplashComplete = () => {
    setShowSplash(false)
    localStorage.setItem('humanos-visited', 'true')
  }

  return (
    <I18nProvider>
      <ErrorBoundary>
        <PageTransitionController useThemeTransition={true} defaultPreset="page">
          <>
            {showSplash && !hasVisited && (
              <SplashScreen onComplete={handleSplashComplete} />
            )}

            <ProfileButton />
            <SettingsButton />
            <AdButton />

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
                <Route path="/simulated-world" element={<SimulatedWorld />} />
                <Route path="/confirm/:id" element={<AssessmentConfirm />} />
                <Route path="/assessment/:id" element={<Assessment />} />
                <Route path="/loading/:id" element={<Loading />} />
                <Route path="/results/:id" element={<Results />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/theory/:theoryId" element={<TheoryDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </>
      </PageTransitionController>
      </ErrorBoundary>
    </I18nProvider>
  )
}
