import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, BookOpen, LayoutTemplate, Github, ExternalLink } from 'lucide-react'
import { cn } from '@utils/cn'

const navItems = [
  { label: '首页', path: '/', icon: Sparkles },
  { label: '教程', path: '/tutorial', icon: BookOpen },
  { label: '模板', path: '/#templates', icon: LayoutTemplate },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-violet-500 to-pink-500 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">HumanOS</span>
                <span className="text-[10px] text-white/40 font-medium tracking-wider">FRONTEND SHOWCASE</span>
              </div>
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
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-lg -z-10 border border-white/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/badhope/HumanOS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all group"
              >
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <Link
                to="/tutorial"
                className="group flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
              >
                开始学习
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={isOpen}
              type="button"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-white" aria-hidden="true" />
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
            className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-slate-900/95 backdrop-blur-xl"
          >
            <div className="p-6 space-y-8 pt-12">
              {/* Nav Items */}
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 text-base',
                        isActive
                          ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 text-white border border-white/10'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* CTA Section */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <a
                  href="https://github.com/badhope/HumanOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-medium bg-white/10 hover:bg-white/20 transition-all"
                >
                  <Github className="w-5 h-5" />
                  查看 GitHub
                </a>
                
                <Link
                  to="/tutorial"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/25"
                >
                  开始学习教程
                  →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
