import { motion } from 'framer-motion'
import { 
  SiReact, 
  SiTypescript, 
  SiVite, 
  SiTailwindcss, 
  SiFramer,
  SiGithub
} from 'react-icons/si'
import { Code2, Package, Zap, Shield, Sparkles, Database, BarChart3 } from 'lucide-react'

interface TechItem {
  name: string
  icon: React.ReactNode
  description: string
  version: string
  category: 'core' | 'styling' | 'animation' | 'state' | 'visualization'
  url: string
}

const techStack: TechItem[] = [
  {
    name: 'React 18',
    icon: <SiReact className="w-8 h-8" />,
    description: '现代化UI构建库，支持并发渲染和自动批处理',
    version: '18.2',
    category: 'core',
    url: 'https://react.dev'
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript className="w-8 h-8" />,
    description: '类型安全的JavaScript超集，提供完整类型支持',
    version: '5.2',
    category: 'core',
    url: 'https://www.typescriptlang.org'
  },
  {
    name: 'Vite',
    icon: <SiVite className="w-8 h-8" />,
    description: '下一代前端构建工具，极速开发体验',
    version: '5.0',
    category: 'core',
    url: 'https://vitejs.dev'
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className="w-8 h-8" />,
    description: '实用优先的CSS框架，快速构建现代界面',
    version: '3.4',
    category: 'styling',
    url: 'https://tailwindcss.com'
  },
  {
    name: 'Framer Motion',
    icon: <SiFramer className="w-8 h-8" />,
    description: '生产级动画库，流畅的交互体验',
    version: '11.0',
    category: 'animation',
    url: 'https://www.framer.com/motion'
  },
  {
    name: 'Zustand',
    icon: <Database className="w-8 h-8" />,
    description: '轻量级状态管理，简洁的API设计',
    version: '4.5',
    category: 'state',
    url: 'https://zustand-demo.pmnd.rs'
  },
  {
    name: 'Recharts',
    icon: <BarChart3 className="w-8 h-8" />,
    description: '基于React的图表库，数据可视化展示',
    version: '2.10',
    category: 'visualization',
    url: 'https://recharts.org'
  },
  {
    name: 'Three.js',
    icon: <Sparkles className="w-8 h-8" />,
    description: '3D图形库，创建沉浸式视觉体验',
    version: '0.160',
    category: 'visualization',
    url: 'https://threejs.org'
  }
]

const categories = {
  core: { label: '核心框架', icon: Code2, color: 'from-blue-500 to-cyan-500' },
  styling: { label: '样式系统', icon: Package, color: 'from-cyan-500 to-teal-500' },
  animation: { label: '动画效果', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  state: { label: '状态管理', icon: Zap, color: 'from-amber-500 to-orange-500' },
  visualization: { label: '数据可视化', icon: Shield, color: 'from-green-500 to-emerald-500' }
}

export function TechStackShowcase() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            技术栈
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            采用现代化前端技术栈，确保最佳的开发体验和用户性能
          </p>
        </motion.div>

        <div className="grid gap-8">
          {Object.entries(categories).map(([categoryKey, category], categoryIndex) => {
            const items = techStack.filter(item => item.category === categoryKey)
            if (items.length === 0) return null

            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.label}</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`text-white/80 group-hover:text-white transition-colors ${category.color}`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                              {item.name}
                            </h4>
                            <span className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded">
                              v{item.version}
                            </span>
                          </div>
                          <p className="text-sm text-white/60">{item.description}</p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-white/10"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h4 className="font-semibold text-white mb-1">为什么选择这个技术栈？</h4>
              <p className="text-sm text-white/60">
                经过深思熟虑的技术选型，确保性能、开发体验和可维护性的最佳平衡
              </p>
            </div>
            <motion.a
              href="https://github.com/badhope/HumanOS"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <SiGithub className="w-4 h-4" />
              查看源码
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
