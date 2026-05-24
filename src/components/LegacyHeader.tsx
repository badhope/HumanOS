import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../hooks/useResponsive'

interface LegacyHeaderProps {
  title: string
  showBackTo?: string
}

export default function LegacyHeader({ 
  title, 
  showBackTo = '/app/discover',
}: LegacyHeaderProps) {
  const navigate = useNavigate()
  const { isDesktop } = useResponsive()

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-violet-500/10">
      <div className={`${isDesktop ? 'max-w-2xl' : 'max-w-md'} mx-auto px-4 py-3 flex items-center gap-3`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(showBackTo)}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <ArrowLeft size={18} />
        </motion.button>
        
        <h1 className="text-lg font-semibold flex-1 truncate">{title}</h1>
        
        <div className="w-10" />
      </div>
    </header>
  )
}
