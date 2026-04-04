import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  ArrowRight, 
  Code2, 
  Palette, 
  Zap, 
  Layout, 
  Star,
  Github,
  ChevronRight,
  Play
} from 'lucide-react'
import { useTemplateStore } from '../store/templateStore'
import { SharedLayout } from '../shared/layout/SharedLayout'
import { TemplateSelector } from '../shared/components'
import { cn } from '../utils/cn'

function ShowcaseHome() {
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const { currentTemplate, setTemplate, getTemplateList } = useTemplateStore()
  const templates = getTemplateList()

  const stats = [
    { label: '模板数量', value: '6+', icon: Layout },
    { label: '组件数量', value: '50+', icon: Code2 },
    { label: '动画效果', value: '100+', icon: Zap },
    { label: 'GitHub Stars', value: '1K+', icon: Star }
  ]

  const features = [
    {
      icon: Layout,
      title: '多场景模板',
      description: '企业官网、个人博客、作品集、落地页等多种场景模板，一键切换'
    },
    {
      icon: Palette,
      title: '精美设计',
      description: '每个模板都经过精心设计，支持暗色/亮色主题，响应式布局'
    },
    {
      icon: Zap,
      title: '丰富动画',
      description: '页面过渡、滚动动画、3D效果、粒子背景等丰富的动画效果'
    },
    {
      icon: Code2,
      title: '开箱即用',
      description: 'TypeScript + React + Vite，现代化技术栈，完善的文档'
    }
  ]

  return (
    <SharedLayout>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <section className="relative min-h-[90vh] flex items-center justify-center px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5 text-violet-400" />
                </motion.div>
                <span className="text-white/90 font-medium">v2.3.0 · 专业前端模板框架库</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  HumanOS
                </span>
                <br />
                <span className="text-3xl md:text-4xl text-white/80">前端模板框架库</span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8">
                提供多种场景模板、丰富的组件库和动画效果，
                帮助开发者快速构建现代化的网站和应用
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  onClick={() => setShowTemplateSelector(true)}
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                >
                  <Layout className="w-5 h-5" />
                  浏览模板
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.a
                  href="https://github.com/badhope/HumanOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl glass text-white font-medium hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-xl glass text-center"
                >
                  <stat.icon className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                核心特性
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                HumanOS 提供了构建现代化网站所需的一切
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl glass border border-white/10 hover:border-violet-500/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                选择你的模板
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                每个模板都针对特定场景优化，选择最适合你的开始构建
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setTemplate(template.id)
                  }}
                  className={cn(
                    'group relative p-6 rounded-2xl border cursor-pointer transition-all overflow-hidden',
                    currentTemplate === template.id
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  )}
                >
                  {currentTemplate === template.id && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-violet-500 text-white">
                        当前
                      </span>
                    </div>
                  )}

                  <div className="text-5xl mb-4">{template.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
                  <p className="text-xs text-white/40 mb-3">{template.nameEn}</p>
                  <p className="text-sm text-white/60 mb-4">{template.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">
                      {template.pages.length} 个页面
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl glass border border-white/10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                准备好开始了吗？
              </h2>
              <p className="text-white/60 mb-8">
                克隆仓库，选择模板，开始构建你的下一个项目
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  onClick={() => setShowTemplateSelector(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                >
                  <Play className="w-4 h-4" />
                  在线预览
                </motion.button>
                <Link
                  to="/about"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl glass text-white font-medium hover:bg-white/10 transition-colors"
                >
                  了解更多
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
      />
    </SharedLayout>
  )
}

export default ShowcaseHome
