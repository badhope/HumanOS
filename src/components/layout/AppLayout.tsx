import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopNavBar from './TopNavBar'
import SideNav from './SideNav'
import SideDrawer from './SideDrawer'
import { useResponsive } from '../../hooks/useResponsive'
import ParticleBackground from '../../components/ParticleBackground'

interface AppLayoutProps {
  title: string
}

export default function AppLayout({ title }: AppLayoutProps) {
  const { isDesktop } = useResponsive()
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (isDesktop) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] text-white relative overflow-hidden">
        <ParticleBackground variant="stars" particleCount={80} showConnections={true} />
        
        <div className="relative z-10">
          <SideNav />
          
          <div className="pl-64">
            <header className="sticky top-0 z-40 bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-b border-violet-500/10">
              <div className="max-w-4xl mx-auto p-8 pb-4">
                <h1 className="text-2xl font-bold text-white">{title}</h1>
              </div>
            </header>
            
            <main className="max-w-4xl mx-auto px-8 pb-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white relative overflow-hidden">
      <ParticleBackground variant="stars" particleCount={60} showConnections={true} />
      
      <div className="relative z-10">
        <TopNavBar 
          title={title} 
          onMenuClick={() => setDrawerOpen(true)} 
        />
        
        <SideDrawer 
          isOpen={drawerOpen} 
          onClose={() => setDrawerOpen(false)} 
        />
        
        <main className="max-w-md mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
