import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  Github, 
  Eye,
  Code2,
  Palette,
  Smartphone,
  Globe,
  Mail,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react'
import { SharedLayout } from '../../shared/layout/SharedLayout'
import { cn } from '../../utils/cn'

function PortfolioHome() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: '全部' },
    { id: 'web', label: '网站' },
    { id: 'app', label: '应用' },
    { id: 'design', label: '设计' }
  ]

  const projects = [
    {
      id: 1,
      title: '电商平台',
      description: '全栈电商解决方案，支持多商户、多语言',
      image: '🛒',
      category: 'web',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: '社交媒体App',
      description: '移动端社交应用，实时聊天与动态分享',
      image: '📱',
      category: 'app',
      tags: ['React Native', 'Firebase', 'Redux'],
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: '品牌设计',
      description: '企业品牌视觉设计，Logo与VI系统',
      image: '🎨',
      category: 'design',
      tags: ['Figma', 'Illustrator', 'Branding'],
      link: '#',
      github: null
    },
    {
      id: 4,
      title: '数据可视化平台',
      description: '企业数据分析与可视化展示平台',
      image: '📊',
      category: 'web',
      tags: ['Vue', 'D3.js', 'Python'],
      link: '#',
      github: '#'
    },
    {
      id: 5,
      title: '健康管理App',
      description: '个人健康数据追踪与管理应用',
      image: '💪',
      category: 'app',
      tags: ['Flutter', 'HealthKit', 'Firebase'],
      link: '#',
      github: '#'
    },
    {
      id: 6,
      title: 'UI组件库',
      description: '企业级React UI组件库',
      image: '🧩',
      category: 'design',
      tags: ['React', 'TypeScript', 'Storybook'],
      link: '#',
      github: '#'
    }
  ]

  const skills = [
    { name: 'React', level: 95, icon: Code2 },
    { name: 'TypeScript', level: 90, icon: Code2 },
    { name: 'Node.js', level: 85, icon: Code2 },
    { name: 'UI/UX设计', level: 88, icon: Palette },
    { name: '移动开发', level: 80, icon: Smartphone },
    { name: '后端开发', level: 82, icon: Globe }
  ]

  const experience = [
    {
      title: '高级前端工程师',
      company: '某科技公司',
      period: '2022 - 至今',
      description: '负责核心产品前端架构设计与开发'
    },
    {
      title: '前端开发工程师',
      company: '某互联网公司',
      period: '2020 - 2022',
      description: '参与多个大型项目的前端开发'
    },
    {
      title: '初级前端开发',
      company: '某创业公司',
      period: '2018 - 2020',
      description: '从零开始学习并实践前端开发'
    }
  ]

  const education = [
    {
      degree: '计算机科学与技术 学士',
      school: '某大学',
      period: '2014 - 2018'
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <SharedLayout>
      <section className="relative min-h-screen flex items-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-8xl mb-6">👨‍💻</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                你好，我是
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  张三
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-6">
                全栈开发者 / UI设计师
              </p>
              <p className="text-white/60 mb-8 max-w-lg">
                热爱创造优雅的用户体验，专注于现代Web技术栈。
                拥有5年+前端开发经验，擅长React生态系统和移动端开发。
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium"
                  type="button"
                >
                  <Mail className="w-4 h-4" />
                  联系我
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors"
                  type="button"
                >
                  <ExternalLink className="w-4 h-4" />
                  下载简历
                </motion.button>
              </div>

              <div className="flex items-center gap-6 mt-8 text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>北京</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>5年经验</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>10+项目</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-3xl opacity-30" />
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-6">技能概览</h3>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/80">{skill.name}</span>
                          <span className="text-white/60 text-sm">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">作品展示</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8">
              精选项目作品，展示技术实力与设计能力
            </p>

            <div className="flex justify-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    'px-6 py-2 rounded-full font-medium transition-all',
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all"
                >
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-6xl">
                    {project.image}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.link && (
                        <button
                          type="button"
                          className="flex items-center gap-1 text-sm text-pink-400 hover:text-pink-300 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          预览
                        </button>
                      )}
                      {project.github && (
                        <button
                          type="button"
                          className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          源码
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-pink-400" />
                工作经历
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 pb-6 border-l-2 border-pink-500/30 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-pink-500" />
                    <div className="flex items-center gap-2 text-sm text-pink-400 mb-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                    <p className="text-white/60 text-sm mb-2">{exp.company}</p>
                    <p className="text-white/40 text-sm">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-purple-400" />
                教育背景
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 pb-6 border-l-2 border-purple-500/30 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-purple-500" />
                    <div className="flex items-center gap-2 text-sm text-purple-400 mb-1">
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                    <p className="text-white/60 text-sm">{edu.school}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">让我知道你的想法</h3>
                <p className="text-white/60 text-sm mb-4">
                  如果你有项目想要合作，或者只是想打个招呼，随时联系我！
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium"
                  type="button"
                >
                  发送邮件
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SharedLayout>
  )
}

export default PortfolioHome
