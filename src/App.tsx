import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTemplateStore } from './store/templateStore'
import { PageSkeleton } from './components/Loading'

const ShowcaseHome = lazy(() => import('./pages/ShowcaseHome'))
const Home = lazy(() => import('./pages/Home'))
const Assessment = lazy(() => import('./pages/Assessment'))
const Results = lazy(() => import('./pages/Results'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

const CorporateHome = lazy(() => import('./templates/corporate/CorporateHome'))
const BlogHome = lazy(() => import('./templates/blog/BlogHome'))
const PortfolioHome = lazy(() => import('./templates/portfolio/PortfolioHome'))

function TemplateRouter() {
  const { currentTemplate } = useTemplateStore()

  switch (currentTemplate) {
    case 'quiz':
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment/:id" element={<Assessment />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )
    
    case 'corporate':
      return (
        <Routes>
          <Route path="/" element={<CorporateHome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )
    
    case 'blog':
      return (
        <Routes>
          <Route path="/" element={<BlogHome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )
    
    case 'portfolio':
      return (
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )
    
    case 'landing':
    case 'dashboard':
    default:
      return (
        <Routes>
          <Route path="/" element={<ShowcaseHome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )
  }
}

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Suspense fallback={<PageSkeleton />}>
        <TemplateRouter />
      </Suspense>
    </motion.div>
  )
}
