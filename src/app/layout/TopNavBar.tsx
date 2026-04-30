import { motion } from 'framer-motion'
import { MoreVertical } from 'lucide-react'

interface TopNavBarProps {
  title: string
  showAction?: boolean
  action?: React.ReactNode
}

export default function TopNavBar({ title, showAction = true, action }: TopNavBarProps) {
  return (
    <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-violet-500/10 pt-safe">
      <div className="flex items-center justify-between h-14 px-4 max-w-md mx-auto">
        <motion.h1 
          className="text-lg font-semibold text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h1>
        
        {showAction && (
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
            {action || <MoreVertical size={20} className="text-white/60" />}
          </button>
        )}
      </div>
    </div>
  )
}
