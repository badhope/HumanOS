import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export default function Tooltip({ content, children, position = 'top', delay = 200 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<number | null>(null)

  const handleMouseEnter = () => {
    const id = window.setTimeout(() => {
      setIsVisible(true)
    }, delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsVisible(false)
  }

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowPositions = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-amber-500/40',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-amber-500/40',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-amber-500/40',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-amber-500/40',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${positions[position]} pointer-events-none`}
          >
            <div className="px-3 py-2 rounded-lg bg-gradient-to-br from-black/95 to-black/85 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-amber-500/10 whitespace-nowrap">
              <span className="text-amber-200/90 text-xs font-medium">{content}</span>
            </div>
            <div className={`absolute w-0 h-0 border-4 border-transparent ${arrowPositions[position]}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
