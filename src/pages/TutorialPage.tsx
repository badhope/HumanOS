import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code2, 
  Sparkles, 
  Layers, 
  Database,
  Palette,
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  Users
} from 'lucide-react'
import { SharedLayout } from '../shared/layout/SharedLayout'
import { TechStackShowcase } from '../shared/components/TechStackShowcase'
import { AnimationShowcase } from '../shared/components/AnimationShowcase'
import { FeatureAreaExplanation } from '../shared/components/FeatureAreaExplanation'
import { CodeBlock } from '../shared/components/CodeBlock'

const quickStartSteps = [
  {
    step: 1,
    title: '克隆项目',
    description: '从GitHub克隆项目到本地',
    code: 'git clone https://github.com/badhope/HumanOS.git'
  },
  {
    step: 2,
    title: '安装依赖',
    description: '使用npm或yarn安装项目依赖',
    code: 'npm install'
  },
  {
    step: 3,
    title: '启动开发服务器',
    description: '启动本地开发服务器',
    code: 'npm run dev'
  },
  {
    step: 4,
    title: '开始开发',
    description: '打开浏览器访问 http://localhost:5173',
    code: 'open http://localhost:5173'
  }
]

const learningPaths = [
  {
    title: '基础入门',
    description: '了解项目结构和基本概念',
    duration: '30分钟',
    lessons: 5,
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    topics: ['项目结构', '技术栈介绍', '开发环境配置', '基础组件使用', '模板切换']
  },
  {
    title: '组件开发',
    description: '学习如何开发和复用组件',
    duration: '1小时',
    lessons: 8,
    icon: Code2,
    color: 'from-purple-500 to-pink-500',
    topics: ['组件设计原则', 'Props和State', '事件处理', '生命周期', 'Hooks使用', '组件通信', '性能优化', '测试']
  },
  {
    title: '动画进阶',
    description: '掌握Framer Motion动画技巧',
    duration: '1.5小时',
    lessons: 10,
    icon: Sparkles,
    color: 'from-amber-500 to-orange-500',
    topics: ['基础动画', '过渡效果', '手势交互', '动画编排', '滚动动画', '布局动画', 'SVG动画', '3D效果', '性能优化', '最佳实践']
  },
  {
    title: '模板定制',
    description: '创建和定制自己的模板',
    duration: '2小时',
    lessons: 12,
    icon: Layers,
    color: 'from-green-500 to-emerald-500',
    topics: ['模板架构', '路由配置', '状态管理', '主题定制', '组件复用', '样式系统', '数据流', 'API集成', 'SEO优化', '部署配置', '性能监控', '错误处理']
  }
]

const architectureLayers = [
  {
    name: '展示层',
    icon: Palette,
    description: 'UI组件、页面、模板',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion']
  },
  {
    name: '业务层',
    icon: Zap,
    description: '业务逻辑、状态管理',
    technologies: ['Zustand', 'React Hooks', 'TypeScript']
  },
  {
    name: '数据层',
    icon: Database,
    description: '数据存储、API调用',
    technologies: ['LocalStorage', 'REST API', 'Mock Data']
  }
]

export default function TutorialPage() {
  return (
    <SharedLayout>
      <section className="relative min-h-screen flex items-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm mb-6"
            >
              <BookOpen className="w-4 h-4" />
              开发者教程
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              学习如何构建
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                现代化前端应用
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
              从零开始学习前端开发，掌握React、TypeScript、Tailwind CSS等现代技术栈，
              构建专业级的Web应用程序
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium"
                type="button"
              >
                <BookOpen className="w-4 h-4" />
                开始学习
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors"
                type="button"
              >
                <Code2 className="w-4 h-4" />
                查看源码
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: Clock, label: '学习时长', value: '5+ 小时' },
              { icon: BookOpen, label: '教程章节', value: '35+ 章节' },
              { icon: Users, label: '学习者', value: '1000+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <stat.icon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              快速开始
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              只需几个简单的步骤，即可在本地运行项目
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStartSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold text-sm z-10">
                  {step.step}
                </div>
                <div className="p-6 pt-8 rounded-xl bg-white/5 border border-white/10 h-full">
                  <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-white/60 mb-4">{step.description}</p>
                  <code className="block p-3 bg-slate-800 rounded-lg text-sm text-violet-300 font-mono">
                    {step.code}
                  </code>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TechStackShowcase />

      <FeatureAreaExplanation />

      <AnimationShowcase />

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              学习路径
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              系统化的学习路径，从入门到精通
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                    <path.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">{path.title}</h4>
                    <p className="text-sm text-white/60">{path.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {path.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {path.lessons} 章节
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {path.topics.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                  {path.topics.length > 4 && (
                    <span className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs">
                      +{path.topics.length - 4}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  开始学习
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              项目架构
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              清晰的分层架构，易于理解和扩展
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {architectureLayers.map((layer, index) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white">
                    <layer.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{layer.name}</h4>
                    <p className="text-sm text-white/60">{layer.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {layer.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CodeBlock
              code={`HumanOS/
├── src/
│   ├── config/           # 配置文件
│   │   └── templates.ts  # 模板配置
│   ├── shared/           # 共享资源
│   │   ├── components/   # 共享组件
│   │   ├── layout/       # 布局组件
│   │   ├── styles/       # 样式系统
│   │   └── types/        # 类型定义
│   ├── templates/        # 模板目录
│   │   ├── corporate/    # 企业官网
│   │   ├── blog/         # 个人博客
│   │   └── portfolio/    # 作品集
│   ├── pages/            # 页面组件
│   ├── store/            # 状态管理
│   └── utils/            # 工具函数
├── public/               # 静态资源
└── package.json          # 项目配置`}
              language="plaintext"
              title="项目目录结构"
              description="清晰的目录组织，便于维护和扩展"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-violet-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              准备好开始了吗？
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              加入我们，一起学习现代前端开发技术，构建令人惊叹的Web应用
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium text-lg"
                type="button"
              >
                <BookOpen className="w-5 h-5" />
                开始学习之旅
              </motion.button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {['免费学习', '实战项目', '社区支持'].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-white/60">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </SharedLayout>
  )
}
