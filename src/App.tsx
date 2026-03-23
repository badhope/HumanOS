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
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem('human-os-visited')
    if (hasVisited) {
      setShowIntro(false)
      setIntroComplete(true)
    }
  }, [])

  const handleEnter = () => {
    localStorage.setItem('human-os-visited', 'true')
    setShowIntro(false)
    setTimeout(() => setIntroComplete(true), 800)
  }

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
