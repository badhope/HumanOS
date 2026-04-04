import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Layout, 
  Palette, 
  Code2, 
  Database, 
  Zap, 
  Shield,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { cn } from '../../utils/cn'

interface FeatureArea {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  details: {
    title: string
    description: string
    technologies: string[]
    benefits: string[]
  }[]
}

const featureAreas: FeatureArea[] = [
  {
    id: 'templates',
    title: '模板系统',
    description: '多场景模板切换，一键切换不同网站风格',
    icon: <Layout className="w-6 h-6" />,
    color: 'from-violet-500 to-purple-500',
    details: [
      {
        title: '模板配置',
        description: '使用TypeScript定义模板配置，支持主题、路由、功能定制',
        technologies: ['TypeScript', 'Zustand', 'React Router'],
        benefits: ['类型安全', '状态持久化', '动态路由']
      },
      {
        title: '模板切换',
        description: '无缝切换不同模板，保持用户状态和数据',
        technologies: ['Framer Motion', 'React Suspense'],
        benefits: ['流畅动画', '懒加载', '无刷新切换']
      }
    ]
  },
  {
    id: 'styling',
    title: '样式系统',
    description: '现代化CSS方案，响应式设计',
    icon: <Palette className="w-6 h-6" />,
    color: 'from-cyan-500 to-blue-500',
    details: [
      {
        title: 'Tailwind CSS',
        description: '实用优先的CSS框架，快速构建现代界面',
        technologies: ['Tailwind CSS', 'PostCSS', 'Autoprefixer'],
        benefits: ['快速开发', '一致性', '小体积']
      },
      {
        title: '主题系统',
        description: '支持亮色/暗色主题，自定义颜色配置',
        technologies: ['CSS Variables', 'Tailwind Dark Mode'],
        benefits: ['动态主题', '用户偏好', '无缝切换']
      }
    ]
  },
  {
    id: 'components',
    title: '组件库',
    description: '可复用的UI组件，统一设计语言',
    icon: <Code2 className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-500',
    details: [
      {
        title: '共享组件',
        description: '导航栏、页脚、布局等共享组件',
        technologies: ['React', 'TypeScript', 'Framer Motion'],
        benefits: ['代码复用', '一致性', '易维护']
      },
      {
        title: 'UI组件',
        description: '按钮、卡片、表单等基础UI组件',
        technologies: ['Tailwind', 'Radix UI', 'Headless UI'],
        benefits: ['可访问性', '可定制', '无样式冲突']
      }
    ]
  },
  {
    id: 'state',
    title: '状态管理',
    description: '轻量级状态管理，简洁API',
    icon: <Database className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    details: [
      {
        title: 'Zustand',
        description: '极简状态管理，无需Provider包裹',
        technologies: ['Zustand', 'Immer', 'Persist'],
        benefits: ['体积小', 'API简洁', 'TypeScript友好']
      },
      {
        title: '数据持久化',
        description: '本地存储用户偏好和状态',
        technologies: ['LocalStorage', 'SessionStorage'],
        benefits: ['离线支持', '快速恢复', '用户友好']
      }
    ]
  },
  {
    id: 'animation',
    title: '动画效果',
    description: '流畅的交互动画，提升用户体验',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-500',
    details: [
      {
        title: 'Framer Motion',
        description: '生产级动画库，声明式API',
        technologies: ['Framer Motion', 'GSAP', 'CSS Animations'],
        benefits: ['高性能', '易用性', '手势支持']
      },
      {
        title: '动画预设',
        description: '可复用的动画配置和效果',
        technologies: ['Animation Variants', 'Orchestration'],
        benefits: ['一致性', '可维护', '可扩展']
      }
    ]
  },
  {
    id: 'performance',
    title: '性能优化',
    description: '极致性能优化，快速加载体验',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-indigo-500 to-blue-500',
    details: [
      {
        title: '代码分割',
        description: '按需加载，减少首屏加载时间',
        technologies: ['React.lazy', 'Vite', 'Dynamic Import'],
        benefits: ['快速加载', '按需加载', '缓存优化']
      },
      {
        title: '资源优化',
        description: '图片、字体、CSS优化',
        technologies: ['Image Optimization', 'Font Loading', 'CSS Minification'],
        benefits: ['小体积', '快速渲染', 'SEO友好']
      }
    ]
  }
]

export function FeatureAreaExplanation() {
  const [activeArea, setActiveArea] = useState<FeatureArea>(featureAreas[0])
  const [activeDetail, setActiveDetail] = useState(0)

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            功能区域详解
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            深入了解每个功能模块的实现原理和技术细节
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            {featureAreas.map((area, index) => (
              <motion.button
                key={area.id}
                type="button"
                onClick={() => {
                  setActiveArea(area)
                  setActiveDetail(0)
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left',
                  activeArea.id === area.id
                    ? 'bg-white/10 border border-white/20'
                    : 'hover:bg-white/5 border border-transparent'
                )}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center text-white`}>
                  {area.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{area.title}</h4>
                  <p className="text-sm text-white/60 line-clamp-1">{area.description}</p>
                </div>
                <ChevronRight className={cn(
                  'w-5 h-5 text-white/40 transition-transform',
                  activeArea.id === area.id && 'rotate-90'
                )} />
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArea.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
              >
                <div className={`p-6 bg-gradient-to-r ${activeArea.color} bg-opacity-10`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-white">
                      {activeArea.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{activeArea.title}</h3>
                      <p className="text-white/80">{activeArea.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex gap-2 mb-6">
                    {activeArea.details.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveDetail(index)}
                        className={cn(
                          'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                          activeDetail === index
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        )}
                      >
                        功能 {index + 1}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeDetail}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {activeArea.details[activeDetail].title}
                      </h4>
                      <p className="text-white/60 mb-6">
                        {activeArea.details[activeDetail].description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-sm font-medium text-white/80 mb-3">使用技术</h5>
                          <div className="flex flex-wrap gap-2">
                            {activeArea.details[activeDetail].technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-white/80 mb-3">核心优势</h5>
                          <ul className="space-y-2">
                            {activeArea.details[activeDetail].benefits.map((benefit) => (
                              <li key={benefit} className="flex items-center gap-2 text-sm text-white/60">
                                <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
