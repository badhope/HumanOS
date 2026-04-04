import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { SharedNavbar, SharedFooter } from '../components'

interface SharedLayoutProps {
  children: ReactNode
  showFooter?: boolean
}

export function SharedLayout({ children, showFooter = true }: SharedLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <SharedNavbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 pt-16"
      >
        {children}
      </motion.main>

      {showFooter && <SharedFooter />}
    </div>
  )
}
