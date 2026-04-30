import type { ReactNode } from 'react'
import ParticleBackground from '../ParticleBackground'
import { useResponsive, type ContainerWidth } from './useResponsive'
import { ResponsiveContainer } from './ResponsiveContainer'

export interface PageWrapperProps {
  children: ReactNode
  type?: ContainerWidth
  background?: 'gradient' | 'stars' | 'meteors' | 'plain'
  className?: string
  contentClassName?: string
  centered?: boolean
}

const backgroundMap: Record<string, 'stars' | 'meteors' | null> = {
  gradient: null,
  stars: 'stars',
  meteors: 'meteors',
  plain: null,
}

export function PageWrapper({
  children,
  type = 'standard',
  background = 'gradient',
  className = '',
  contentClassName = '',
  centered = false,
}: PageWrapperProps) {
  const { isDesktop } = useResponsive(type)

  const bgClasses = {
    gradient: 'bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950',
    stars: 'bg-slate-950',
    meteors: 'bg-slate-950',
    plain: 'bg-slate-950',
  }

  return (
    <div
      className={`
        min-h-screen relative overflow-hidden
        pt-safe pb-safe pl-safe pr-safe
        ${bgClasses[background]}
        ${className}
      `}
    >
      {backgroundMap[background] && (
        <div className="absolute inset-0 pointer-events-none">
          <ParticleBackground variant={backgroundMap[background]!} />
        </div>
      )}

      {isDesktop && background === 'gradient' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl animate-pulse delay-1000" />
        </div>
      )}

      <div
        className={`
          relative z-10
          ${centered ? 'min-h-screen flex items-center justify-center py-12' : 'py-8 md:py-12'}
          ${contentClassName}
        `}
      >
        <ResponsiveContainer type={type}>
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
