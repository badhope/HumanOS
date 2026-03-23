import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Shield, Zap, Brain, Search } from 'lucide-react'
import AssessmentCard3D from '@components/AssessmentCard3D'
import TypingEffect, { ShimmerText } from '@components/TypingEffect'
import { assessments, getAllCategories } from '@data/assessments'
import { cn } from '@utils/cn'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [searchQuery, setSearchQuery] = useState('')

  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 400], [0, -120])
  const titleScale = useTransform(scrollY, [0, 400], [1, 0.8])
  const titleOpacity = useTransform(scrollY, [0, 300, 500], [1, 1, 0])
  const contentOpacity = useTransform(scrollY, [200, 400], [0, 1])

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
    <div className="relative">
      <div className="min-h-screen">
        <motion.div
          style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
          className="pt-24 pb-16"
        >
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/80"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-4 h-4 text-violet-400" />
                  </motion.div>
                  <ShimmerText text="全新升级 v2.0 · 30+ 专业测评" className="text-white/80" duration={3000} />
                </motion.span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
              >
                <span className="text-white">探索</span>
                <motion.span
                  className="text-gradient mx-2"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(139, 92, 246, 0.5)',
                      '0 0 40px rgba(236, 72, 153, 0.8)',
                      '0 0 20px rgba(139, 92, 246, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TypingEffect text="真实的" speed={150} />
                </motion.span>
                <br />
                <span className="text-white">自我</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10"
              >
                <TypingEffect
                  text="通过科学的心理测评，深入了解你的人格特质、认知风格和价值观。涵盖人格心理、职业能力、人际关系、认知思维、健康生活、价值观、学科知识7大领域。"
                  speed={30}
                  pauseDuration={1000}
                />
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass"
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/80 text-sm">快速测评</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass"
                >
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-white/80 text-sm">专业可靠</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass"
                >
                  <Brain className="w-4 h-4 text-pink-400" />
                  <span className="text-white/80 text-sm">科学方法</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>
        </motion.div>

        <motion.div
          style={{ opacity: contentOpacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="搜索测评..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssessments.map((assessment, index) => (
                <AssessmentCard3D key={assessment.id} assessment={assessment} index={index} />
              ))}
            </div>

            {filteredAssessments.length === 0 && (
              <div className="text-center py-20">
                <p className="text-white/60 text-lg">没有找到匹配的测评</p>
              </div>
            )}
          </section>
        </motion.div>
      </div>
    </div>
  )
}
