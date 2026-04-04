import { useState, useEffect, ReactNode } from 'react'

interface FallbackProps {
  children: ReactNode
  fallback: ReactNode
  onError?: () => void
}

export default function ErrorFallback({ children, fallback, onError }: FallbackProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Component Error:', event.error)
      setHasError(true)
      onError?.()
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection:', event.reason)
      setHasError(true)
      onError?.()
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [onError])

  if (hasError) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
