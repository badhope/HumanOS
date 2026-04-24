import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, AlertTriangle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 2500)
  }, [])

  const toastStyles = {
    success: { bg: 'bg-emerald-500/90', icon: Check, color: 'text-emerald-100' },
    error: { bg: 'bg-red-500/90', icon: X, color: 'text-red-100' },
    warning: { bg: 'bg-amber-500/90', icon: AlertTriangle, color: 'text-amber-100' },
    info: { bg: 'bg-blue-500/90', icon: Info, color: 'text-blue-100' },
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      <div className="fixed bottom-8 right-8 z-[9999] space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => {
            const style = toastStyles[toast.type]
            const Icon = style.icon
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                className={`${style.bg} backdrop-blur px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 min-w-[240px] pointer-events-auto`}
              >
                <Icon className={`w-5 h-5 ${style.color} shrink-0`} />
                <span className={`text-sm text-white font-medium ${style.color}`}>{toast.message}</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
