import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Sparkles } from 'lucide-react'
import { useTemplateStore } from '../../store/templateStore'
import { cn } from '../../utils/cn'

interface TemplateSelectorProps {
  isOpen: boolean
  onClose: () => void
}

export function TemplateSelector({ isOpen, onClose }: TemplateSelectorProps) {
  const { currentTemplate, setTemplate, getTemplateList } = useTemplateStore()
  const templates = getTemplateList()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:max-h-[80vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-6 h-6 text-violet-400" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-white">选择模板</h2>
                    <p className="text-sm text-white/60">选择一个模板来预览不同的网站风格</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  type="button"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setTemplate(template.id)
                        onClose()
                      }}
                      className={cn(
                        'relative p-5 rounded-xl cursor-pointer transition-all duration-300',
                        'border-2',
                        currentTemplate === template.id
                          ? 'border-violet-500 bg-violet-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                      )}
                    >
                      {currentTemplate === template.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}

                      <div className="text-4xl mb-3">{template.icon}</div>
                      <h3 className="text-lg font-bold text-white mb-1">{template.name}</h3>
                      <p className="text-xs text-white/40 mb-3">{template.nameEn}</p>
                      <p className="text-sm text-white/60 mb-4 line-clamp-2">{template.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {template.features.slice(0, 3).map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/70"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-white/10 bg-white/5">
                <p className="text-xs text-white/40 text-center">
                  💡 提示：切换模板将改变整个网站的布局和风格
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
