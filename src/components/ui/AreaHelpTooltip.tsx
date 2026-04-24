import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, HelpCircle } from 'lucide-react'
import { getTooltip, type AreaTooltip } from '@data/simulations/market-economy/area-tooltips'

interface AreaHelpTooltipProps {
  areaId: string
  children: React.ReactNode
  showIcon?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function AreaHelpTooltip({ areaId, children, showIcon = true, position = 'top' }: AreaHelpTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tooltip, setTooltip] = useState<AreaTooltip | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setTooltip(getTooltip(areaId) || null)
  }, [areaId])

  if (!tooltip) return <>{children}</>

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200)
  }

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-800',
  }

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-2">
        {children}
        {showIcon && (
          <HelpCircle 
            className="w-4 h-4 text-slate-500 hover:text-emerald-400 cursor-help transition-colors flex-shrink-0" 
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
          />
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${positionClasses[position]} w-80`}
            style={{ pointerEvents: 'none' }}
          >
            <div className="bg-gradient-to-br from-slate-800 to-zinc-900 rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500/15 to-teal-500/10 px-4 py-3 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tooltip.icon}</span>
                  <h4 className="font-bold text-white">{tooltip.title}</h4>
                </div>
                <p className="text-sm text-slate-300 mt-1">{tooltip.summary}</p>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <div className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wider">功能说明</div>
                  <ul className="space-y-1">
                    {tooltip.details.map((detail, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-emerald-500/70 mt-0.5">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {tooltip.tips.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-amber-400 mb-2 uppercase tracking-wider">💡 游戏提示</div>
                    <ul className="space-y-1">
                      {tooltip.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-amber-300/80 flex items-start gap-2">
                          <span className="text-amber-500/70 mt-0.5">→</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className={`absolute w-3 h-3 border-4 border-transparent ${arrowClasses[position]}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
