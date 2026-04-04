import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, Layout, Home, Info, BarChart3 } from 'lucide-react'
import { useTemplateStore } from '../../store/templateStore'
import { TemplateSelector } from './TemplateSelector'
import { cn } from '../../utils/cn'

export function SharedNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const location = useLocation()
  const { templateConfig } = useTemplateStore()

  const navItems = [
    { label: '首页', path: '/', icon: Home },
    { label: '模板', path: '#templates', icon: Layout, onClick: () => setShowTemplateSelector(true) },
    { label: '仪表盘', path: '/dashboard', icon: BarChart3 },
    { label: '关于', path: '/about', icon: Info },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <div className="glass-effect border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-white">HumanOS</h1>
                  <p className="text-xs text-white/60">{templateConfig.name}</p>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  item.onClick ? (
                    <motion.button
                      key={item.label}
                      onClick={item.onClick}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        'text-white/70 hover:text-white hover:bg-white/10'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </motion.button>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        location.pathname === item.path
                          ? 'text-white bg-white/10'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  )
                ))}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label={isOpen ? '关闭菜单' : '打开菜单'}
                aria-expanded={isOpen}
                type="button"
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

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-effect border-b border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.onClick ? (
                      <button
                        onClick={() => {
                          item.onClick?.()
                          setIsOpen(false)
                        }}
                        className={cn(
                          'flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all',
                          'text-white/70 hover:text-white hover:bg-white/10'
                        )}
                        type="button"
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all',
                          location.pathname === item.path
                            ? 'text-white bg-white/10'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
      />
    </>
  )
}
