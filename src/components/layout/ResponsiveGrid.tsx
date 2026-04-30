import type { ReactNode } from 'react'
import { useResponsive, type ContainerWidth } from './useResponsive'

export interface ResponsiveGridProps {
  children: ReactNode
  type?: ContainerWidth
  cols?: number
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const gapMap = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

const colClassMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
}

export function ResponsiveGrid({
  children,
  type = 'standard',
  cols = 3,
  gap = 'md',
  className = '',
}: ResponsiveGridProps) {
  const { gridCols, isWechatMini } = useResponsive(type)

  const effectiveCols = isWechatMini ? 1 : Math.min(cols, gridCols)

  return (
    <div
      className={`
        grid
        ${colClassMap[effectiveCols] || colClassMap[3]}
        ${gapMap[gap]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export function CardGrid({
  children,
  type = 'wide',
  className = '',
}: Omit<ResponsiveGridProps, 'cols' | 'gap'>) {
  return (
    <ResponsiveGrid
      type={type}
      cols={4}
      gap="lg"
      className={className}
    >
      {children}
    </ResponsiveGrid>
  )
}
