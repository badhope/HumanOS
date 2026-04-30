import type { ReactNode } from 'react'
import { useResponsive, type ContainerWidth } from './useResponsive'

export interface ResponsiveContainerProps {
  children: ReactNode
  type?: ContainerWidth
  className?: string
}

export function ResponsiveContainer({
  children,
  type = 'standard',
  className = '',
}: ResponsiveContainerProps) {
  const { maxWidthClass, guttersClass } = useResponsive(type)

  return (
    <div className={`${maxWidthClass} ${guttersClass} mx-auto ${className}`}>
      {children}
    </div>
  )
}

export function PageContainer({
  children,
  type = 'standard',
  className = '',
}: ResponsiveContainerProps) {
  return (
    <ResponsiveContainer type={type} className={`py-8 ${className}`}>
      {children}
    </ResponsiveContainer>
  )
}

export function NarrowContainer({
  children,
  className = '',
}: Omit<ResponsiveContainerProps, 'type'>) {
  return <ResponsiveContainer type="narrow" className={className}>{children}</ResponsiveContainer>
}

export function StandardContainer({
  children,
  className = '',
}: Omit<ResponsiveContainerProps, 'type'>) {
  return <ResponsiveContainer type="standard" className={className}>{children}</ResponsiveContainer>
}

export function WideContainer({
  children,
  className = '',
}: Omit<ResponsiveContainerProps, 'type'>) {
  return <ResponsiveContainer type="wide" className={className}>{children}</ResponsiveContainer>
}

export function FluidContainer({
  children,
  className = '',
}: Omit<ResponsiveContainerProps, 'type'>) {
  return <ResponsiveContainer type="fluid" className={className}>{children}</ResponsiveContainer>
}
