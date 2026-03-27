/**
 * HumanOS - 直接显示首页版本
 * 底层做好后，再加启动动画
 */

import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout'
import Home from '@pages/Home'
import Assessment from '@pages/Assessment'
import Results from '@pages/Results'
import Dashboard from '@pages/Dashboard'
import About from '@pages/About'
import NotFound from '@pages/NotFound'

export default function App() {
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
