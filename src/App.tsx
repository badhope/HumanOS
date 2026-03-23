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

function App() {
  const location = useLocation()
  const [showIntro, setShowIntro] = useState(true)
  const [isIntroExiting, setIsIntroExiting] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem('human-os-visited')
    if (hasVisited) {
      setShowIntro(false)
    }
    setIsReady(true)
  }, [])

  const handleEnter = () => {
    if (isIntroExiting) return
    setIsIntroExiting(true)
    setTimeout(() => {
      localStorage.setItem('human-os-visited', 'true')
      setShowIntro(false)
    }, 600)
  }

  if (!isReady) {
    return (
      <div className="fixed inset-0 bg-[#0f172a] flex items-center justify-center">
        <motion.div
          className="w-10 h-10 border-3 border-violet-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed inset-0 z-[100]"
          >
            <Intro onEnter={handleEnter} isExiting={isIntroExiting} />
          </motion.div>
        )}
      </AnimatePresence>

      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/assessment/:id" element={<Assessment />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  )
}

export default App
