import { motion } from 'framer-motion'
import { 
  Search, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Heart
} from 'lucide-react'
import { SharedLayout } from '../../shared/layout/SharedLayout'
import { cn } from '../../utils/cn'

function BlogHome() {
  const featuredPost = {
    title: '深入理解 React 18 的新特性',
    excerpt: 'React 18 带来了许多令人兴奋的新特性，包括并发渲染、自动批处理、Suspense改进等。本文将深入探讨这些特性及其应用场景...',
    date: '2024-01-15',
    readTime: '12 分钟',
    category: 'React',
    image: '🚀',
    tags: ['React', '前端', 'JavaScript']
  }

  const posts = [
    {
      title: 'TypeScript 高级类型技巧',
      excerpt: '掌握 TypeScript 的高级类型系统，提升代码质量...',
      date: '2024-01-12',
      readTime: '8 分钟',
      category: 'TypeScript',
      image: '📘'
    },
    {
      title: 'Tailwind CSS 最佳实践',
      excerpt: '如何高效使用 Tailwind CSS 构建现代化界面...',
      date: '2024-01-10',
      readTime: '6 分钟',
      category: 'CSS',
      image: '🎨'
    },
    {
      title: 'Node.js 性能优化指南',
      excerpt: '从内存管理到异步优化，全面提升 Node.js 应用性能...',
      date: '2024-01-08',
      readTime: '10 分钟',
      category: 'Node.js',
      image: '⚡'
    },
    {
      title: '前端工程化实践',
      excerpt: '构建高效的前端工程化体系，提升开发效率...',
      date: '2024-01-05',
      readTime: '15 分钟',
      category: '工程化',
      image: '🛠️'
    }
  ]

  const categories = [
    { name: '全部', count: 42 },
    { name: 'React', count: 12 },
    { name: 'TypeScript', count: 8 },
    { name: 'CSS', count: 6 },
    { name: 'Node.js', count: 10 },
    { name: '工程化', count: 6 }
  ]

  const tags = ['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js', '前端架构', '性能优化', '工程化']

  const stats = [
    { icon: BookOpen, value: '42', label: '文章' },
    { icon: TrendingUp, value: '10K+', label: '阅读' },
    { icon: Heart, value: '500+', label: '喜欢' }
  ]

  return (
    <SharedLayout>
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              技术博客
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              分享前端开发经验、技术思考和学习心得
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
                >
                  <stat.icon className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-slate-900">{stat.value}</span>
                  <span className="text-sm text-slate-500">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="搜索文章..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4">精选文章</h2>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video md:aspect-auto bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-8xl">
                {featuredPost.image}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-sm text-slate-500">{featuredPost.date}</span>
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-2">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span key={tag} className="text-xs text-slate-500">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">最新文章</h2>
                <div className="flex gap-2">
                  {categories.slice(0, 4).map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        cat.name === '全部'
                          ? 'bg-amber-500 text-white'
                          : 'bg-white text-slate-600 hover:bg-amber-50'
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-6xl">
                      {post.image}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-400">{post.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                        <span className="text-amber-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          阅读更多
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:border-amber-300 transition-colors"
                  type="button"
                >
                  加载更多文章
                </motion.button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-slate-900 mb-4">分类</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between py-2 cursor-pointer hover:text-amber-500 transition-colors"
                    >
                      <span className="text-slate-600">{cat.name}</span>
                      <span className="text-sm text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {cat.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold text-slate-900 mb-4">热门标签</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-amber-100 hover:text-amber-700 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">订阅更新</h3>
                <p className="text-sm text-white/80 mb-4">
                  获取最新文章推送，不错过任何精彩内容
                </p>
                <input
                  type="email"
                  placeholder="输入邮箱地址"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm placeholder:text-white/60 text-white border border-white/20 focus:border-white/40 outline-none mb-3"
                />
                <button
                  type="button"
                  className="w-full py-2 bg-white text-amber-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  订阅
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SharedLayout>
  )
}

export default BlogHome
