import { ReactNode, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AutoPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  delay?: number
  position?: AutoPosition | 'auto'
}

export default function Tooltip({ content, children, delay = 150, position = 'auto' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [autoPosition, setAutoPosition] = useState<AutoPosition>('right')
  const triggerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const calculatePosition = (): AutoPosition => {
    if (position !== 'auto' && position !== undefined) {
      return position as AutoPosition
    }

    if (!triggerRef.current) return 'right'

    const rect = triggerRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const spaceRight = viewportWidth - rect.right
    const spaceLeft = rect.left
    const spaceTop = rect.top
    const spaceBottom = viewportHeight - rect.bottom

    const threshold = 220

    if (spaceRight >= threshold) return 'right'
    if (spaceLeft >= threshold) return 'left'
    if (spaceBottom >= 150) return 'bottom'
    return 'top'
  }

  const handleMouseEnter = () => {
    setAutoPosition(calculatePosition())
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay)
  }

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const getPositionStyles = (pos: AutoPosition) => {
    const styles: Record<AutoPosition, any> = {
      top: {
        transform: 'translateX(-50%)',
        bottom: '100%',
        left: '50%',
        marginBottom: '10px',
      },
      bottom: {
        transform: 'translateX(-50%)',
        top: '100%',
        left: '50%',
        marginTop: '10px',
      },
      left: {
        transform: 'translateY(-50%)',
        right: '100%',
        top: '50%',
        marginRight: '10px',
      },
      right: {
        transform: 'translateY(-50%)',
        left: '100%',
        top: '50%',
        marginLeft: '10px',
      },
    }
    return styles[pos]
  }

  const getArrowStyles = (pos: AutoPosition) => {
    const arrows: Record<AutoPosition, any> = {
      top: { bottom: '-6px', left: '50%', marginLeft: '-6px', borderTop: 'none' },
      bottom: { top: '-6px', left: '50%', marginLeft: '-6px', transform: 'rotate(225deg)', borderRight: 'none' },
      left: { right: '-6px', top: '50%', marginTop: '-6px', transform: 'rotate(135deg)', borderBottom: 'none' },
      right: { left: '-6px', top: '50%', marginTop: '-6px', transform: 'rotate(315deg)', borderTop: 'none' },
    }
    return arrows[pos]
  }

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.08 }}
            className="absolute z-[99999] pointer-events-none"
            style={getPositionStyles(autoPosition)}
          >
            <div className="bg-slate-900/98 backdrop-blur-sm border border-slate-600/80 rounded-lg shadow-2xl py-2 px-3 min-w-[170px] max-w-[250px]">
              {typeof content === 'string' ? (
                <p className="text-xs text-slate-200 leading-relaxed">{content}</p>
              ) : (
                content
              )}
            </div>
            
            <div
              className="absolute w-3 h-3 bg-slate-900/98 border border-slate-600/80 rotate-45"
              style={getArrowStyles(autoPosition)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
