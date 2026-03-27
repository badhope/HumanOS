/**
 * HumanOS - App 主组件
 * 重构：确保首次访问和再次访问都能正确显示首页
 */

import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '@components/Layout'
import Home from '@pages/Home'
import Assessment from '@pages/Assessment'
import Results from '@pages/Results'
import Dashboard from '@pages/Dashboard'
import About from '@pages/About'
import NotFound from '@pages/NotFound'
import Intro from '@pages/Intro'
import SplashScreen from '@components/animations/SplashScreen'
import { pageVariants } from '@utils/animation-config'

function App() {
  const location = useLocation()
   // appState: 'loading' = 加载中, 'intro' = 首次引导页, 'splash' = 启动动画, 'ready' = 主页就绪
  const [appState, setAppState] = useState<'loading' | 'intro' | 'splash' | 'ready'>('loading')
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null)

  // 初始化：检查是否首次访问
  useEffect(() => {
    const hasVisited = localStorage.getItem('human-os-visited')
    if (hasVisited) {
      // 曾经访问过，直接进入 Splash 动画
      setIsFirstVisit(false)
      setAppState('splash')
    } else {
      // 首次访问，显示引导页
      setIsFirstVisit(true)
      setAppState('intro')
    }
  }, [])

  // 处理引导页完成
  const handleIntroComplete = useCallback(() => {
    // 标记为已访问
    localStorage.setItem('human-os-visited', 'true')
    setIsFirstVisit(false)
    // 进入启动动画
    setAppState('splash')
  }, [])

  // 处理启动动画完成
  const handleSplashComplete = useCallback(() => {
    setAppState('ready')
  }, [])

  // 加载中状态
  if (appState === 'loading' || isFirstVisit === null) {
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

  // 首次访问：显示引导页
  if (appState === 'intro') {
    return (
      <Intro onEnter={handleIntroComplete} />
    )
  }

  // 启动动画阶段
  if (appState === 'splash') {
    return (
      <SplashScreen
        onComplete={handleSplashComplete}
        minDuration={3000}
      />
    )
  }

  // 主页就绪：显示完整应用
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="min-h-screen"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/assessment/:id" element={<Assessment />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}

export default App
