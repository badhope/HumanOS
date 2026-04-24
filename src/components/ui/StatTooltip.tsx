import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info } from 'lucide-react'

interface StatTooltipProps {
  children: ReactNode
  title: string
  description: string
  formula?: string
  example?: string
  tips?: string
}

export default function StatTooltip({ children, title, description, formula, example, tips }: StatTooltipProps) {
  const [show, setShow] = useState(false)

  return (
    <div 
      className="relative cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="flex items-center gap-1.5">
        {children}
        <Info className="w-3.5 h-3.5 text-slate-500 hover:text-emerald-400 transition-colors" />
      </div>
      
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 z-50 min-w-[280px] max-w-sm pointer-events-none
          bg-gradient-to-br from-zinc-900/98 to-neutral-900/98 backdrop-blur-2xl
          rounded-2xl border border-emerald-500/20 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)
          overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-b border-emerald-500/15">
              <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                📊 {title}
              </h4>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                {description}
              </p>
              
              {formula && (
                <div className="bg-slate-800/50 rounded-xl p-3">
                  <div className="text-[10px] text-slate-500 mb-1 font-medium uppercase tracking-wider">计算公式</div>
                  <code className="text-xs text-emerald-400 font-mono">{formula}</code>
                </div>
              )}
              
              {example && (
                <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20">
                  <div className="text-[10px] text-amber-400 mb-1 font-medium uppercase tracking-wider">💡 示例</div>
                  <p className="text-xs text-slate-300">{example}</p>
                </div>
              )}
              
              {tips && (
                <div className="text-[11px] text-slate-400 flex items-start gap-2">
                  <span>🎯</span>
                  <span>{tips}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


