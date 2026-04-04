import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Play, Code2, Eye } from 'lucide-react'
import { cn } from '../../utils/cn'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  description?: string
  showPreview?: boolean
  previewComponent?: React.ReactNode
}

export function CodeBlock({
  code,
  language = 'typescript',
  title,
  description,
  showPreview = false,
  previewComponent
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlightCode = (code: string) => {
    const keywords = ['import', 'export', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'interface', 'type', 'from', 'default', 'async', 'await']
    const types = ['string', 'number', 'boolean', 'void', 'any', 'never', 'React', 'FC', 'Component']
    
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g')
      highlighted = highlighted.replace(regex, '<span class="text-purple-400">$1</span>')
    })
    
    types.forEach(type => {
      const regex = new RegExp(`\\b(${type})\\b`, 'g')
      highlighted = highlighted.replace(regex, '<span class="text-cyan-400">$1</span>')
    })
    
    highlighted = highlighted
      .replace(/(["'`])(.*?)\1/g, '<span class="text-amber-300">$1$2$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-slate-500">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-slate-500">$1</span>')
    
    return highlighted
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden border border-white/10 bg-slate-900/50"
    >
      {(title || description) && (
        <div className="px-4 py-3 border-b border-white/10 bg-white/5">
          {title && <h4 className="font-semibold text-white">{title}</h4>}
          {description && <p className="text-sm text-white/60 mt-1">{description}</p>}
        </div>
      )}

      {showPreview && (
        <div className="flex border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'code'
                ? 'text-white bg-white/10 border-b-2 border-violet-500'
                : 'text-white/60 hover:text-white'
            )}
          >
            <Code2 className="w-4 h-4" />
            代码
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'preview'
                ? 'text-white bg-white/10 border-b-2 border-violet-500'
                : 'text-white/60 hover:text-white'
            )}
          >
            <Eye className="w-4 h-4" />
            预览
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {activeTab === 'code' ? (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">
                {language}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                type="button"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-white/60" />
                )}
              </motion.button>
            </div>

            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
              <code
                className="text-slate-300"
                dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
              />
            </pre>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 bg-white/5 min-h-[200px]"
          >
            {previewComponent || (
              <div className="text-center text-white/40">
                预览不可用
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
