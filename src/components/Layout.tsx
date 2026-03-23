import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Background3D from './Background3D'
import ParticleBackground from './ParticleBackground'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-gradient-mesh overflow-hidden">
      <Background3D />
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="min-h-[calc(100vh-64px-80px)]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
