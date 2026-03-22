import { motion } from 'framer-motion'
import { Shield, Lock, Sparkles, Github, Heart } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: Shield,
      title: '本地优先',
      description:
        '所有数据存储在你的浏览器中，无需注册账号，无需联网即可使用。你的数据只属于你。',
    },
    {
      icon: Lock,
      title: '隐私保护',
      description:
        '我们不上传任何个人数据到服务器。测评结果仅在本地生成和存储，完全保护你的隐私。',
    },
    {
      icon: Sparkles,
      title: '科学方法',
      description:
        '测评内容基于心理学研究和标准化工具，确保结果的科学性和可靠性。',
    },
  ]

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            HumanOS 是一个本地优先的人格评估平台，帮助用户深入了解自己，
            探索人格特质、认知风格和核心价值观。
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
            HumanOS 是一个开源项目，欢迎贡献代码、提交 Issue 或提出改进建议。
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
