import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Brain, User, BarChart3, Info } from 'lucide-react'
import { cn } from '@utils/cn'

const navItems = [
  { label: '首页', path: '/', icon: Brain },
  { label: '测评', path: '/', icon: BarChart3 },
  { label: '仪表盘', path: '/dashboard', icon: User },
  { label: '关于', path: '/about', icon: Info },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass mx-4 mt-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-violet-500 to-pink-500 p-2 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-gradient">HumanOS</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path.split('/')[1]))
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                      'hover:bg-white/10 flex items-center gap-2',
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-2"
          >
            <div className="glass rounded-2xl p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                      isActive
                        ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 text-white'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
