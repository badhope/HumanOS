import { Outlet } from 'react-router-dom'
import TopNavBar from './TopNavBar'
import BottomTabBar from './BottomTabBar'
import SideNav from './SideNav'
import { useResponsive } from '../hooks/useResponsive'

interface AppLayoutProps {
  title: string
}

export default function AppLayout({ title }: AppLayoutProps) {
  const { isDesktop } = useResponsive()

  if (isDesktop) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <SideNav />
        
        <div className="pl-64">
          <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-violet-500/10">
            <div className="max-w-4xl mx-auto p-8 pb-4">
              <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
          </header>
          
          <main className="max-w-4xl mx-auto px-8 pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <TopNavBar title={title} />
      
      <main className="pb-20 max-w-md mx-auto">
        <Outlet />
      </main>
      
      <BottomTabBar />
    </div>
  )
}
