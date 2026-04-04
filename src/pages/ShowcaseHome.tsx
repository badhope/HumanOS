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
  Smartphone
} from 'lucide-react'
import { useTemplateStore } from '../store/templateStore'
import QuizShowcase from '../components/QuizShowcase'
import Navbar from '../components/Navbar'

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
  { value: '6+', label: '模板类型', icon: Layers },
  { value: '8+', label: '核心技术', icon: Code2 },
  { value: '35+', label: '教程章节', icon: BookOpen },
  { value: '1000+', label: '用户使用', icon: Users }
]

const useCases = [
  {
    title: '企业官网',
    description: '专业商务风格，适合企业品牌展示',
    image: '🏢',
    features: ['Hero区域', '服务展示', '团队介绍', '客户案例'],
    template: 'corporate'
  },
  {
    title: '个人博客',
    description: '简约优雅设计，内容创作者首选',
    image: '📝',
    features: ['文章列表', '分类标签', '搜索功能', '评论系统'],
    template: 'blog'
  },
  {
    title: '作品集展示',
    description: '创意设计师的完美选择',
    image: '🎨',
    features: ['项目画廊', '技能图表', '时间线', '联系表单'],
    template: 'portfolio'
  },
  {
    title: '答题测评平台',
    description: '交互式答题体验，数据可视化分析',
    image: '🎯',
    features: ['动态表单', '进度追踪', '结果可视化', '3D效果'],
    template: 'quiz'
  }
]

const techStack = [
  { name: 'React 18', category: '框架' },
  { name: 'TypeScript', category: '语言' },
  { name: 'Vite', category: '构建工具' },
  { name: 'Tailwind CSS', category: '样式' },
  { name: 'Framer Motion', category: '动画' },
  { name: 'Zustand', category: '状态管理' }
]

function ShowcaseHome() {
  const [activeUseCase, setActiveUseCase] = useState(0)
  const { setTemplate } = useTemplateStore()

  const handleTryTemplate = (templateId: string) => {
    setTemplate(templateId as any)
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
              应用场景
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              多种预设模板，满足不同业务需求。点击即可预览效果。
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {useCases.map((useCase, index) => (
                <motion.button
                  key={useCase.title}
                  onClick={() => setActiveUseCase(index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className={`w-full flex items-center gap-4 p-6 rounded-2xl border transition-all text-left ${
                    activeUseCase === index
                      ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 border-violet-500/50'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                  type="button"
                >
                  <div className={`text-4xl ${activeUseCase === index ? 'scale-110' : ''} transition-transform`}>
                    {useCase.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">{useCase.title}</h4>
                    <p className="text-sm text-white/60">{useCase.description}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${activeUseCase === index ? 'text-violet-400' : 'text-white/40'} transition-colors`} />
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeUseCase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
              >
                <div className="text-8xl text-center mb-6">
                  {useCases[activeUseCase].image}
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  {useCases[activeUseCase].title}
                </h3>
                <p className="text-white/60 text-center mb-8">
                  {useCases[activeUseCase].description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {useCases[activeUseCase].features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTryTemplate(useCases[activeUseCase].template)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/25"
                  type="button"
                >
                  <Play className="w-5 h-5" />
                  预览此模板
                </motion.button>
              </motion.div>
            </AnimatePresence>
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
