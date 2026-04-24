import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'
import { useToast } from '@hooks/useToast'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (type: ToastType, message: string, duration?: number) => void
  removeToast: (id: string) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export { ToastContext }

const TOAST_CONFIG = {
  success: {
    icon: CheckCircle,
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/50',
    text: 'text-emerald-400',
  },
  error: {
    icon: XCircle,
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-500/10',
    border: 'border-red-500/50',
    text: 'text-red-400',
  },
  info: {
    icon: Info,
    gradient: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/50',
    text: 'text-cyan-400',
  },
  warning: {
    icon: AlertTriangle,
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/50',
    text: 'text-amber-400',
  },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeoutMapRef = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    const timeoutMap = timeoutMapRef.current
    return () => {
      timeoutMap.forEach(id => clearTimeout(id))
      timeoutMap.clear()
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    const timeoutId = timeoutMapRef.current.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutMapRef.current.delete(id)
    }
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToast = useCallback((type: ToastType, message: string, duration: number = 4000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, type, message, duration }])

    if (duration > 0) {
      const timeoutId = window.setTimeout(() => {
        removeToast(id)
      }, duration)
      timeoutMapRef.current.set(id, timeoutId)
    }
  }, [removeToast])

  const success = useCallback((message: string, duration?: number) => {
    addToast('success', message, duration)
  }, [addToast])

  const error = useCallback((message: string, duration?: number) => {
    addToast('error', message, duration)
  }, [addToast])

  const info = useCallback((message: string, duration?: number) => {
    addToast('info', message, duration)
  }, [addToast])

  const warning = useCallback((message: string, duration?: number) => {
    addToast('warning', message, duration)
  }, [addToast])

  const value: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 w-80 max-w-[calc(100vw-2rem)]">
      <AnimatePresence>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const config = TOAST_CONFIG[toast.type]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.3, type: 'spring', damping: 20 }}
      className={`relative p-4 rounded-xl backdrop-blur-md border shadow-lg ${config.bg} ${config.border}`}
    >
      <div className="flex items-start gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1, type: 'spring' }}
          className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}
        >
          <Icon className="text-white" size={18} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-sm font-medium text-white leading-relaxed"
          >
            {toast.message}
          </motion.p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-1 rounded-full hover:bg-slate-700/50 transition-colors"
        >
          <X className="text-slate-400 hover:text-white" size={16} />
        </motion.button>
      </div>

      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${config.gradient}`}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: (toast.duration || 4000) / 1000, ease: 'linear' }}
      />
    </motion.div>
  )
}
