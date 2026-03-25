import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '@components/Layout'
import Home from '@pages/Home'
import Assessment from '@pages/Assessment'
import Results from '@pages/Results'
import Dashboard from '@pages/Dashboard'
import About from '@pages/About'
import Intro from '@pages/Intro'
import { SplashScreen } from '@components/animations'
import { pageVariants } from '@utils/animation-config'

function App() {
  const location = useLocation()
  const [appState, setAppState] = useState<'intro' | 'splash' | 'ready'>('intro')
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null)

  useEffect(() => {
    const hasVisited = localStorage.getItem('human-os-visited')
    if (hasVisited) {
      setIsFirstVisit(false)
      setAppState('ready')
    } else {
      setIsFirstVisit(true)
    }
  }, [])

  useEffect(() => {
    if (appState === 'intro' || appState === 'splash') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [appState])

  const handleIntroComplete = useCallback(() => {
    localStorage.setItem('human-os-visited', 'true')
    setAppState('splash')
  }, [])

  const handleSplashComplete = useCallback(() => {
    setAppState('ready')
  }, [])

  const skipToIntro = useCallback(() => {
    if (isFirstVisit === false) {
      setAppState('ready')
    }
  }, [isFirstVisit])

  if (isFirstVisit === null) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    )
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {appState === 'intro' && isFirstVisit && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <Intro onEnter={handleIntroComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {appState === 'splash' && (
          <SplashScreen
            key="splash"
            onComplete={handleSplashComplete}
            minDuration={4000}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {appState === 'ready' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Layout>
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  variants={pageVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/assessment/:id" element={<Assessment />} />
                    <Route path="/results/:id" element={<Results />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
