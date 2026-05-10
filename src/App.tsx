import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { PageSkeleton } from './components/Loading'
import { I18nProvider } from './i18n'
import { useAppStore } from './store'
import NotFound from './pages/NotFound'

import AppLayout from './app/layout/AppLayout'
import HomePage from './app/pages/HomePage'

export default function App() {
  const [showSplash, setShowSplash] = useState(false)
  const theme = useAppStore((state) => state.theme)
  const location = useLocation()
  
  const isNewApp = location.pathname.startsWith('/app')

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.setAttribute('data-theme', theme)
  }, [theme])

  console.log('[App] Rendering, location:', location.pathname, 'showSplash:', showSplash)

  return (
    <I18nProvider>
      <div className="min-h-screen bg-slate-900 text-white">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Navigate to="/app/home" replace />} />
            <Route path="/app" element={<AppLayout title="心镜" />}>
              <Route path="home" element={<HomePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </I18nProvider>
  )
}
