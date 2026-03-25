import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '@components/Layout'
import Home from '@pages/Home'
import Assessment from '@pages/Assessment'
import Results from '@pages/Results'
import Dashboard from '@pages/Dashboard'
import About from '@pages/About'
import Intro from '@pages/Intro'
import BootScreen from '@components/BootScreen'

function App() {
  const location = useLocation()
  const [showIntro, setShowIntro] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)
  const [showBoot, setShowBoot] = useState(false)
  const [bootComplete, setBootComplete] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem('human-os-visited')
    if (hasVisited) {
      setShowIntro(false)
      setIntroComplete(true)
      setShowBoot(true)
    }
  }, [])

  const handleEnter = () => {
    localStorage.setItem('human-os-visited', 'true')
    setIntroComplete(true)
    setTimeout(() => {
      setShowIntro(false)
      setShowBoot(true)
      document.body.style.overflow = 'auto'
    }, 800)
  }

  const handleBootComplete = () => {
    setShowBoot(false)
    setBootComplete(true)
  }

  useEffect(() => {
    if (!showIntro && introComplete && !showBoot && bootComplete) {
      document.body.style.overflow = 'auto'
    } else if (showIntro || showBoot) {
      document.body.style.overflow = 'hidden'
    }
  }, [showIntro, introComplete, showBoot, bootComplete])

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ y: 0 }}
            animate={{ y: introComplete ? '-100%' : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <Intro onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBoot && (
          <BootScreen key="boot" onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showIntro && !showBoot && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: bootComplete || !localStorage.getItem('human-os-visited') ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Layout>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/assessment/:id" element={<Assessment />} />
                <Route path="/results/:id" element={<Results />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
