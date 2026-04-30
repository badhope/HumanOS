import './utils/logger'
import './utils/assessmentCache'
import { preloadTopAssessments } from './utils/dynamicAssessmentLoader'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// 检测运行环境，选择适合的路由模式
const getRouterMode = () => {
  const isGitHubPages = window.location.hostname.includes('github.io')
  const isCustomDomain = window.location.hostname === 'humanitysos.dpdns.org'
  const isProduction = import.meta.env.PROD
  
  // GitHub Pages（包括自定义域名）使用 HashRouter，Docker部署可使用BrowserRouter
  if (isGitHubPages || isCustomDomain || (isProduction && !import.meta.env.VITE_USE_BROWSER_ROUTER)) {
    return HashRouter
  }
  return BrowserRouter
}

const Router = getRouterMode()

setTimeout(() => {
  preloadTopAssessments()
  
  if (import.meta.env.DEV) {
    import('./utils/performanceBenchmark')
  }
}, 3000)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
)
