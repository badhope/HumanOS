import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

interface SkeletonProps {
  className?: string
  variant?: 'rect' | 'circle' | 'text'
  width?: number | string
  height?: number | string
}

export function Skeleton({ 
  className, 
  variant = 'rect', 
  width, 
  height 
}: SkeletonProps) {
  const baseClasses = cn(
    'relative overflow-hidden bg-gradient-to-r from-white/5 to-white/10',
    variant === 'circle' && 'rounded-full',
    variant === 'rect' && 'rounded-xl',
    variant === 'text' && 'rounded-md h-4',
    className
  )

  return (
    <div 
      className={baseClasses}
      style={{ 
        width: width ?? (variant === 'text' ? '100%' : undefined),
        height: height ?? (variant === 'text' ? '1rem' : undefined)
      }}
    >
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </div>
  )
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-3xl p-6 space-y-4">
          <Skeleton variant="rect" className="h-40 w-full" />
          <Skeleton variant="text" className="h-6 w-3/4" />
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-1/2" />
          <div className="flex gap-3 pt-2">
            <Skeleton variant="circle" className="w-8 h-8" />
            <Skeleton variant="text" className="w-24 h-8" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-4 flex items-center gap-4">
          <Skeleton variant="circle" className="w-12 h-12 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-2/3" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
          <Skeleton variant="rect" className="w-20 h-10" />
        </div>
      ))}
    </div>
  )
}

export function AssessmentSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950">
      <div className="flex items-center justify-between p-4 sm:p-6">
        <Skeleton variant="rect" className="w-20 h-10" />
        <div className="flex-1 max-w-md mx-4 space-y-2">
          <div className="flex justify-between">
            <Skeleton variant="text" className="w-24" />
            <Skeleton variant="text" className="w-24" />
          </div>
          <Skeleton variant="rect" className="h-2 w-full rounded-full" />
        </div>
        <Skeleton variant="rect" className="w-20 h-10" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-4">
        <div className="w-full max-w-3xl">
          <div className="glass rounded-3xl p-6 sm:p-10 space-y-8">
            <Skeleton variant="text" className="h-8 w-full mx-auto" />
            
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="rect" className="h-20 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 sm:p-6">
        <Skeleton variant="rect" className="w-24 h-12" />
        <Skeleton variant="rect" className="w-28 h-12" />
      </div>
    </div>
  )
}

export function ResultsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton variant="rect" className="w-12 h-12 rounded-xl" />
        <div className="flex gap-3">
          <Skeleton variant="rect" className="w-12 h-12 rounded-xl" />
          <Skeleton variant="rect" className="w-12 h-12 rounded-xl" />
        </div>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="text-center space-y-3">
          <Skeleton variant="text" className="h-10 w-48 mx-auto" />
          <Skeleton variant="text" className="w-72 mx-auto" />
          <Skeleton variant="text" className="w-64 mx-auto" />
        </div>

        <Skeleton variant="rect" className="h-80 w-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton variant="text" className="h-6 w-32" />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rect" className="h-16 w-full" />
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton variant="text" className="h-6 w-32" />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rect" className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
