import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Shield, Zap, Brain, Search } from 'lucide-react'
import AssessmentCard from '@components/AssessmentCard'
import { assessments, getAllCategories } from '@data/assessments'
import { cn } from '@utils/cn'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [searchQuery, setSearchQuery] = useState('')
  
  const categories = ['全部', ...getAllCategories()]
  
  const filteredAssessments = assessments.filter(a => {
    const matchesCategory = selectedCategory === '全部' || a.category === selectedCategory
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="pt-24 pb-12">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/80">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>全新升级 v2.0 · 30+ 专业测评</span>
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">探索</span>
            <span className="text-gradient">真实的</span>
            <br />
            <span className="text-white">自我</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10"
          >
            通过科学的心理测评，深入了解你的人格特质、认知风格和价值观。
            <br className="hidden sm:block" />
            涵盖人格心理、职业能力、人际关系、认知思维、健康生活、价值观、学科知识7大领域。
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/assessment/mbti-standard"
              className="group relative px-8 py-4 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-2 text-white font-semibold">
                开始测评
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-2xl glass text-white/80 font-semibold hover:text-white hover:bg-white/10 transition-all"
            >
              查看结果
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Shield,
              title: '隐私保护',
              description: '所有数据仅存储在本地，不上传任何服务器，完全保护隐私',
            },
            {
              icon: Zap,
              title: '即时反馈',
              description: '完成测评后立即获得详细的结果分析和可视化报告',
            },
            {
              icon: Brain,
              title: '科学方法',
              description: '基于心理学研究的标准化测评工具，涵盖7大知识领域',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 hover-lift"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Assessments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            可⽤测评
          </h2>
          <p className="text-white/60 mb-6">
            共 {assessments.length} 个专业测评，选择适合你的开始探索
          </p>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="搜索测评..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl glass bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                    : 'glass text-white/60 hover:text-white hover:bg-white/10'
                )}
              >
                {category}
                {category !== '全部' && (
                  <span className="ml-2 text-white/50">
                    ({assessments.filter(a => a.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment, index) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              index={index}
            />
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">没有找到匹配的测评</p>
          </div>
        )}
      </section>
    </div>
  )
}
