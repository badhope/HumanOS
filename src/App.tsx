import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageSkeleton } from './components/Loading'
import SplashScreen from './components/SplashScreen'
import SettingsButton from './components/SettingsButton'
import ProfileButton from './components/ProfileButton'
import { I18nProvider } from './i18n'
import { useAppStore } from './store'

const Home = lazy(() => import('./pages/Home'))
const AssessmentSelect = lazy(() => import('./pages/AssessmentSelect'))
const ModeSelect = lazy(() => import('./pages/ModeSelect'))
const AssessmentConfirm = lazy(() => import('./pages/AssessmentConfirm'))
const Assessment = lazy(() => import('./pages/Assessment'))
const Loading = lazy(() => import('./pages/Loading'))
const Results = lazy(() => import('./pages/Results'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const About = lazy(() => import('./pages/About'))
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
      <>
        {showSplash && !hasVisited && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}

        <ProfileButton />
        <SettingsButton />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assessments" element={<AssessmentSelect />} />
              <Route path="/mode-select/:id" element={<ModeSelect />} />
              <Route path="/confirm/:id" element={<AssessmentConfirm />} />
              <Route path="/assessment/:id" element={<Assessment />} />
              <Route path="/loading/:id" element={<Loading />} />
              <Route path="/results/:id" element={<Results />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </>
    </I18nProvider>
  )
}
