import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Github, Twitter, Mail, Heart } from 'lucide-react'
import { useTemplateStore } from '../../store/templateStore'

export function SharedFooter() {
  const { templateConfig } = useTemplateStore()
  const currentYear = new Date().getFullYear()

  const links = {
    product: [
      { label: '模板库', href: '#templates' },
      { label: '组件库', href: '#components' },
      { label: '文档', href: '#docs' },
      { label: '更新日志', href: '#changelog' }
    ],
    resources: [
      { label: '快速开始', href: '#quickstart' },
      { label: '示例项目', href: '#examples' },
      { label: 'API文档', href: '#api' },
      { label: '常见问题', href: '#faq' }
    ],
    community: [
      { label: 'GitHub', href: 'https://github.com/badhope/HumanOS', external: true },
      { label: 'Discord', href: '#discord' },
      { label: 'Twitter', href: '#twitter' },
      { label: '贡献指南', href: '#contributing' }
    ]
  }

  return (
    <footer className="relative border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">HumanOS</h3>
                <p className="text-xs text-white/60">前端模板框架库</p>
              </div>
            </Link>
            <p className="text-white/60 text-sm mb-4 max-w-md">
              专业的前端模板框架库，提供多种场景模板和丰富的组件库，
              帮助开发者快速构建现代化的网站和应用。
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                href="https://github.com/badhope/HumanOS"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5 text-white/60" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5 text-white/60" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5 text-white/60" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">产品</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">资源</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">社区</h4>
            <ul className="space-y-2">
              {links.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © {currentYear} HumanOS. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-white/40">
              <span>当前模板:</span>
              <span className="text-white/60">{templateConfig.name}</span>
              <span className="mx-2">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by HumanOS Team
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
