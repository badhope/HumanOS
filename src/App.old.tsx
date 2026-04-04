import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '@components/Layout'
import { PageSkeleton } from '@components/Loading'

const Home = lazy(() => import('@pages/Home'))
const Assessment = lazy(() => import('@pages/Assessment'))
const Results = lazy(() => import('@pages/Results'))
const Dashboard = lazy(() => import('@pages/Dashboard'))
const About = lazy(() => import('@pages/About'))
const NotFound = lazy(() => import('@pages/NotFound'))

export default function App() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/assessment/:id" element={<Assessment />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </Layout>
  )
}
