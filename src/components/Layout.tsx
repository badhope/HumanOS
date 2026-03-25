import { ReactNode, ComponentType } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Background3D from './Background3D'
import ParticleBackground from './ParticleBackground'
import ErrorFallback from './ErrorFallback'

interface LayoutProps {
  children: ReactNode
}

function Background3DWrapper() {
  return <Background3D />
}

function ParticleBackgroundWrapper() {
  return <ParticleBackground />
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-gradient-mesh overflow-hidden">
      <ErrorFallback fallback={<div className="fixed inset-0 bg-slate-950" />}>
        <Background3DWrapper />
      </ErrorFallback>
      <ErrorFallback fallback={<div className="fixed inset-0 bg-slate-950/50" />}>
        <ParticleBackgroundWrapper />
      </ErrorFallback>
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
