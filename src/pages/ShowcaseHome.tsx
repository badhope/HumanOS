import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  Code2,
  Palette,
  Zap,
  BookOpen,
  Layers,
  BarChart3,
  Users,
  Star,
  CheckCircle,
  Play,
  ExternalLink,
  Github,
  ChevronRight,
  Rocket,
  Shield,
  Globe,
  Smartphone,
  LayoutGrid,
  Filter
} from 'lucide-react'
import { useTemplateStore } from '../store/templateStore'
import { templates, type TemplateId } from '../config/templates'
import QuizShowcase from '../components/QuizShowcase'
import Navbar from '../components/Navbar'

// 模板分类
type TemplateCategory = 'all' | 'business' | 'personal' | 'tool' | 'commerce'

const templateCategories: { id: TemplateCategory; name: string; icon: typeof LayoutGrid }[] = [
  { id: 'all', name: '全部', icon: LayoutGrid },
  { id: 'business', name: '商业网站', icon: Layers },
  { id: 'personal', name: '个人主页', icon: Users },
  { id: 'tool', name: '工具面板', icon: BarChart3 },
  { id: 'commerce', name: '电商平台', icon: Zap },
]

// 模板分类映射
const templateCategoryMap: Record<string, TemplateCategory[]> = {
  corporate: ['business'],
  blog: ['personal'],
  portfolio: ['personal'],
  quiz: ['tool'],
  landing: ['business'],
  dashboard: ['tool'],
  ecommerce: ['commerce'],
  education: ['business', 'tool'],
  social: ['personal', 'tool'],
}

const features = [
  {
    icon: Code2,
    title: '现代化技术栈',
    description: 'React 18 + TypeScript + Vite，采用最新前端技术',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Palette,
    title: '精美UI设计',
    description: 'Tailwind CSS + Framer Motion，流畅的视觉体验',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: '极致性能优化',
    description: '代码分割、懒加载、缓存策略，快速响应',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Layers,
    title: '多模板架构',
    description: '6种场景模板，一键切换不同网站风格',
    color: 'from-green-500 to-emerald-500'
  }
]

const stats = [
  { value: '9+', label: '模板类型', icon: Layers },
  { value: '8+', label: '核心技术', icon: Code2 },
  { value: '35+', label: '教程章节', icon: BookOpen },
  { value: '1000+', label: '用户使用', icon: Users }
]

// 映射到配置文件的模板
const allTemplates = templates.filter(t => t.enabled)

const techStack = [
  { name: 'React 18', category: '框架' },
  { name: 'TypeScript', category: '语言' },
  { name: 'Vite', category: '构建工具' },
  { name: 'Tailwind CSS', category: '样式' },
  { name: 'Framer Motion', category: '动画' },
  { name: 'Zustand', category: '状态管理' }
]

function ShowcaseHome() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('all')
  const { setTemplate } = useTemplateStore()

  // 过滤模板
  const filteredTemplates = activeCategory === 'all'
    ? allTemplates
    : allTemplates.filter(t => {
        const categories = templateCategoryMap[t.id] || []
        return categories.includes(activeCategory)
      })

  const handleTryTemplate = (templateId: string) => {
    setTemplate(templateId as TemplateId)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900" />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-2 h-2 bg-violet-400 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-40 left-32 w-3 h-3 bg-cyan-400 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/3 w-4 h-4 bg-pink-400/50 rounded-full"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm mb-6"
              >
                <Sparkles className="w-4 h-4" />
                企业级前端解决方案
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                构建下一代
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400">
                  Web应用
                </span>
              </h1>

              <p className="text-xl text-white/60 mb-8 leading-relaxed max-w-xl">
                专业的前端框架展示平台，提供完整的教程指导和技术实现方案。
                助力企业快速搭建现代化Web应用。
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTryTemplate('corporate')}
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
                  type="button"
                >
                  <Rocket className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                  开始探索
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <Link
                  to="/tutorial"
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 border border-white/20 transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  学习教程
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-2 rounded-lg bg-white/5">
                      <stat.icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
                
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-sm text-white/40 font-mono">human-os.com</span>
                    </div>

                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - i * 15}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className="h-16 bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-xl border border-white/10"
                        />
                      ))}
                    </div>

                    <div className="pt-4 grid grid-cols-2 gap-3">
                      <div className="p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-white">98%</div>
                        <div className="text-xs text-white/60">性能评分</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-white">A+</div>
                        <div className="text-xs text-white/60">代码质量</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              核心特性
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              采用业界领先的技术栈和最佳实践，为企业提供可靠的前端解决方案
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="templates" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              模板画廊
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              多种预设模板，满足不同业务需求。点击即可预览效果。
            </p>
          </motion.div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {templateCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
                type="button"
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* 模板画廊 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                onClick={() => handleTryTemplate(template.id)}
              >
                {/* 模板预览区域 */}
                <div
                  className="h-48 flex items-center justify-center text-7xl relative"
                  style={{
                    background: `linear-gradient(135deg, ${template.theme.primaryColor}20, ${template.theme.accentColor}20)`
                  }}
                >
                  <span className="text-6xl">{template.icon}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                    <span className="text-xs text-white/70 bg-black/30 px-2 py-1 rounded-full">
                      {template.pages.length} 页面
                    </span>
                  </div>
                </div>

                {/* 模板信息 */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                      {template.name}
                    </h3>
                    <span className="text-sm text-white/60">{template.nameEn}</span>
                  </div>

                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* 特性标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* 预览按钮 */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2"
                    type="button"
                  >
                    <Play className="w-4 h-4" />
                    预览模板
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                完整的
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                  教程体系
                </span>
              </h2>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
                从基础到进阶的系统化学习路径，帮助开发者掌握现代前端开发技术。
                包含35+章节的详细教程，涵盖项目架构、组件开发、动画效果等核心主题。
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { title: '基础入门', desc: '30分钟 · 5章节', progress: 100 },
                  { title: '组件开发', desc: '1小时 · 8章节', progress: 100 },
                  { title: '动画进阶', desc: '1.5小时 · 10章节', progress: 85 },
                  { title: '模板定制', desc: '2小时 · 12章节', progress: 70 }
                ].map((course, index) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{course.title}</h4>
                      <span className="text-sm text-white/60">{course.desc}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${course.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/tutorial"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all group"
              >
                <BookOpen className="w-5 h-5" />
                开始学习
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
              
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <BookOpen className="w-6 h-6 text-violet-400" />
                  <h3 className="text-xl font-bold text-white">教程目录</h3>
                </div>

                {[
                  { chapter: '01', title: '项目结构与环境配置', time: '5分钟' },
                  { chapter: '02', title: 'React 18 核心概念', time: '8分钟' },
                  { chapter: '03', title: 'TypeScript 类型系统', time: '10分钟' },
                  { chapter: '04', title: 'Tailwind CSS 实战', time: '12分钟' },
                  { chapter: '05', title: 'Framer Motion 动画', time: '15分钟' }
                ].map((item, index) => (
                  <motion.div
                    key={item.chapter}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center text-sm font-bold text-violet-300 group-hover:from-violet-500/30 group-hover:to-pink-500/30 transition-colors">
                      {item.chapter}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white group-hover:text-violet-400 transition-colors">{item.title}</h4>
                      <p className="text-xs text-white/60">{item.time}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))}

                <Link
                  to="/tutorial"
                  className="block text-center py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                >
                  查看全部 35+ 章节 →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              技术栈
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              采用经过验证的现代技术栈，确保项目的可维护性和扩展性
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 text-center group cursor-pointer"
              >
                <div className="text-2xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                  {tech.name}
                </div>
                <div className="text-sm text-white/60">{tech.category}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-white/10"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">安全可靠</h4>
                  <p className="text-sm text-white/60">遵循最佳安全实践，代码质量有保障</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-green-500/20">
                  <Globe className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">跨平台兼容</h4>
                  <p className="text-sm text-white/60">支持所有现代浏览器和设备</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <Smartphone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">响应式设计</h4>
                  <p className="text-sm text-white/60">完美适配各种屏幕尺寸</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <QuizShowcase />

      <section className="py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              准备好开始了吗？
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              加入我们，一起构建现代化的Web应用。提供完整的技术支持和持续更新。
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a
                href="https://github.com/badhope/HumanOS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 border border-white/20 transition-all group"
              >
                <Github className="w-5 h-5" />
                GitHub
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              
              <Link
                to="/tutorial"
                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all group"
              >
                <BookOpen className="w-5 h-5" />
                查看教程
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-white/60">
              {[
                { icon: Star, text: '免费开源' },
                { icon: CheckCircle, text: '完整文档' },
                { icon: Users, text: '社区支持' },
                { icon: Zap, text: '持续更新' }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-violet-400" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ShowcaseHome
