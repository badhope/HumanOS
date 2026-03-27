/**
 * HumanOS - 最小化版本
 * 先确保首页正常显示，再逐步添加引导动画
 */

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout'
import Home from '@pages/Home'
import Assessment from '@pages/Assessment'
import Results from '@pages/Results'
import Dashboard from '@pages/Dashboard'
import About from '@pages/About'
import NotFound from '@pages/NotFound'

// 简单的启动屏组件
function SimpleSplash({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 2秒后自动进入首页
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[100]">
      <div className="text-center">
        {/* Logo 动画 */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-violet-500 via-pink-500 to-orange-500 animate-pulse" />
        
        {/* 文字 */}
        <h1 className="text-3xl font-bold text-gradient mb-4">HumanOS</h1>
        <p className="text-white/50 text-sm">正在加载...</p>
      </div>
    </div>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showSplash, setShowSplash] = useState(true)

  // 检查是否首次访问
  useEffect(() => {
    const hasVisited = localStorage.getItem('human-os-visited')
    if (hasVisited) {
      // 曾访问过，直接进入
      setShowSplash(false)
    } else {
      // 首次访问，标记已访问
      localStorage.setItem('human-os-visited', 'true')
    }
  }, [])

  // 处理启动屏完成
  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  // 加载中
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 animate-pulse" />
      </div>
    )
  }

  // 启动屏阶段
  if (showSplash) {
    return <SimpleSplash onComplete={handleSplashComplete} />
  }

  // 正常显示应用
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/assessment/:id" element={<Assessment />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
