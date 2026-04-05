import { motion } from 'framer-motion'
import { Shield, Lock, Sparkles, Github, Heart, ArrowLeft, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Shield,
      title: '现代化架构',
      description:
        '采用React 18 + TypeScript + Vite技术栈，构建高性能、可维护的企业级应用。',
    },
    {
      icon: Lock,
      title: '设计系统',
      description:
        '完整的UI组件库和设计规范，支持主题定制和响应式布局。',
    },
    {
      icon: Sparkles,
      title: '开发体验',
      description:
        '热重载、类型检查、代码格式化等完善的开发工具链，提升开发效率。',
    },
  ]

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          type="button"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回主页</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
            关于 HumanOS
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            HumanOS是一个专业的前端框架展示平台，演示现代Web开发的最佳实践，
            为企业客户和开发者提供参考实现。
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">技术栈</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              'React 18',
              'TypeScript',
              'Vite',
              'Tailwind CSS',
              'Three.js',
              'Framer Motion',
              'Zustand',
              'Recharts',
            ].map((tech) => (
              <div
                key={tech}
                className="px-4 py-3 rounded-xl bg-white/5 text-white/80 text-center text-sm font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Open Source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <Github className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-4">开源项目</h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            HumanOS是一个开源的前端框架展示项目，欢迎企业客户和开发者参考使用。
          </p>
          <a
            href="https://github.com/badhope/HumanOS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <Github className="w-5 h-5" />
            访问 GitHub
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-pink-500" /> by badhope
          </p>
          <p className="text-white/30 text-sm mt-2">
            © {new Date().getFullYear()} HumanOS. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
