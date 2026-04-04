import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, 
  Clock, 
  Users, 
  BarChart3,
  Play,
  ArrowRight,
  CheckCircle,
  Star,
  Eye,
  ChevronRight,
  BookOpen
} from 'lucide-react'
import { Link } from 'react-router-dom'

const quizData = [
  {
    id: 'personality',
    title: '人格类型测评',
    description: '基于心理学理论的专业人格分析',
    icon: '🧠',
    questions: 20,
    duration: '10分钟',
    difficulty: '入门',
    category: '心理测评',
    tags: ['MBTI', '性格分析', '职业规划'],
    features: ['多维度分析', '详细报告', '可视化结果']
  },
  {
    id: 'frontend-skills',
    title: '前端技能评估',
    description: '测试你的前端开发能力水平',
    icon: '💻',
    questions: 30,
    duration: '15分钟',
    difficulty: '中级',
    category: '技术测试',
    tags: ['React', 'TypeScript', 'CSS'],
    features: ['技术栈评估', '能力雷达图', '学习建议']
  },
  {
    id: 'design-sense',
    title: '设计感知力测试',
    description: '评估你的UI/UX设计直觉和审美',
    icon: '🎨',
    questions: 25,
    duration: '12分钟',
    difficulty: '进阶',
    category: '设计能力',
    tags: ['UI设计', '色彩搭配', '用户体验'],
    features: ['审美评分', '风格分析', '改进建议']
  }
]

const stats = [
  { value: '3', label: '测评类型', icon: Target },
  { value: '75+', label: '题目总数', icon: BarChart3 },
  { value: '37', label: '平均时长(分)', icon: Clock },
  { value: '1000+', label: '完成人数', icon: Users }
]

export default function QuizShowcase() {
  const [activeQuiz, setActiveQuiz] = useState(0)
  const [hoveredQuiz, setHoveredQuiz] = useState<number | null>(null)

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm mb-6">
            <Target className="w-4 h-4" />
            交互式演示模块
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            答题测评平台
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
            作为前端框架的展示案例之一，答题平台展示了表单处理、状态管理、数据可视化等核心功能。
            这只是众多应用场景中的一种。
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10"
              >
                <stat.icon className="w-5 h-5 text-pink-400" />
                <div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            {quizData.map((quiz, index) => (
              <motion.button
                key={quiz.id}
                onClick={() => setActiveQuiz(index)}
                onMouseEnter={() => setHoveredQuiz(index)}
                onMouseLeave={() => setHoveredQuiz(null)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 8 }}
                className={`w-full flex items-center gap-4 p-6 rounded-2xl border transition-all text-left group ${
                  activeQuiz === index || hoveredQuiz === index
                    ? 'bg-gradient-to-r from-pink-500/10 to-violet-500/10 border-pink-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
                type="button"
              >
                <motion.div
                  animate={activeQuiz === index ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  className="text-5xl"
                >
                  {quiz.icon}
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors">
                      {quiz.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      quiz.difficulty === '入门' ? 'bg-green-500/20 text-green-300' :
                      quiz.difficulty === '中级' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">{quiz.description}</p>
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/40">
                    <span>{quiz.questions} 题</span>
                    <span>·</span>
                    <span>{quiz.duration}</span>
                    <span>·</span>
                    <span>{quiz.category}</span>
                  </div>
                </div>

                <ChevronRight className={`w-5 h-5 ${activeQuiz === index ? 'text-pink-400' : 'text-white/40'} transition-colors`} />
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuiz}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
            >
              <div className="text-center mb-6">
                <motion.div
                  key={quizData[activeQuiz].icon}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-8xl inline-block"
                >
                  {quizData[activeQuiz].icon}
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {quizData[activeQuiz].title}
              </h3>
              <p className="text-white/60 text-center mb-6">
                {quizData[activeQuiz].description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-pink-400">{quizData[activeQuiz].questions}</div>
                  <div className="text-xs text-white/60">题目数量</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-violet-400">{quizData[activeQuiz].duration}</div>
                  <div className="text-xs text-white/60">预计时长</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-cyan-400">{quizData[activeQuiz].difficulty}</div>
                  <div className="text-xs text-white/60">难度等级</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-3">主要特性</h4>
                <div className="space-y-2">
                  {quizData[activeQuiz].features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-3">涉及技术</h4>
                <div className="flex flex-wrap gap-2">
                  {quizData[activeQuiz].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={`/assessment/${quizData[activeQuiz].id}`}
                className="group w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                开始测评
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => setActiveQuiz((prev) => (prev + 1) % quizData.length)}
                className="w-full mt-3 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
              >
                查看下一个测评 →
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                这只是展示的一部分
              </h3>
              <p className="text-white/60 leading-relaxed mb-6">
                答题测评平台是本框架展示的众多应用场景之一。我们还提供企业官网、个人博客、作品集展示等多种模板，
                每个模板都展示了不同的前端技术和最佳实践。
              </p>
              
              <div className="space-y-3">
                {[
                  { icon: Eye, text: '查看更多应用场景' },
                  { icon: BookOpen, text: '学习如何构建这些功能' },
                  { icon: Star, text: '探索完整的技术文档' }
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-white/80">
                    <item.icon className="w-5 h-5 text-pink-400" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { name: '企业官网', emoji: '🏢', color: 'from-blue-500 to-cyan-500' },
                { name: '个人博客', emoji: '📝', color: 'from-purple-500 to-pink-500' },
                { name: '作品集', emoji: '🎨', color: 'from-amber-500 to-orange-500' },
                { name: '后台管理', emoji: '📊', color: 'from-green-500 to-emerald-500' }
              ].map((template) => (
                <motion.div
                  key={template.name}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-center cursor-pointer"
                >
                  <div className="text-3xl mb-2">{template.emoji}</div>
                  <div className="text-sm font-medium text-white">{template.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
