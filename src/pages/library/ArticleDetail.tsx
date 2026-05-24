import { motion } from 'framer-motion'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Clock, Eye, Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react'
import { articles } from './LibraryArticles'

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  const article = location.state?.article || articles.find(a => a.id === id)
  const Icon = article?.icon || Heart

  if (!article) {
    return (
      <div className="px-3 sm:px-4 pb-4 flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-white/60 mb-4">文章不存在</p>
        <button 
          onClick={() => navigate('/app/library/articles')}
          className="px-4 py-2 rounded-lg bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 transition-colors"
        >
          返回文章列表
        </button>
      </div>
    )
  }

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <button 
          onClick={() => navigate('/app/library/articles')}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          返回文章列表
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-white/8 to-white/2 border border-white/10 overflow-hidden"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
              {article.category}
            </span>
            {article.badge && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                ${article.badge === '热门' ? 'bg-red-500/30 text-red-400' : ''}
                ${article.badge === '推荐' ? 'bg-violet-500/30 text-violet-400' : ''}
              `}>
                {article.badge}
              </span>
            )}
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-3">{article.title}</h1>
          
          <p className="text-sm text-white/60 mb-4">{article.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-white/40 pb-4 border-b border-white/10">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {article.readTime}分钟阅读
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {article.views.toLocaleString()} 阅读
            </span>
            <span className="flex items-center gap-1">
              <Heart size={12} />
              {article.likes} 喜欢
            </span>
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-6">
          <div className="prose prose-invert prose-sm max-w-none">
            {article.content.trim().split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return (
                  <motion.h1 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="text-xl sm:text-2xl font-bold text-white mt-6 mb-3"
                  >
                    {line.replace('# ', '')}
                  </motion.h1>
                )
              }
              if (line.startsWith('## ')) {
                return (
                  <motion.h2 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="text-lg font-bold text-white/90 mt-5 mb-2"
                  >
                    {line.replace('## ', '')}
                  </motion.h2>
                )
              }
              if (line.startsWith('### ')) {
                return (
                  <motion.h3 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="text-base font-semibold text-white/80 mt-4 mb-2"
                  >
                    {line.replace('### ', '')}
                  </motion.h3>
                )
              }
              if (line.startsWith('> ')) {
                return (
                  <motion.blockquote
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-l-2 border-violet-500/50 pl-3 py-1 my-3 italic text-white/70"
                  >
                    {line.replace('> ', '')}
                  </motion.blockquote>
                )
              }
              if (line.startsWith('- ')) {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="flex items-start gap-2 my-1 text-white/80"
                  >
                    <span className="text-violet-400">•</span>
                    <span>{line.replace('- ', '')}</span>
                  </motion.div>
                )
              }
              if (line.match(/^\d+\./)) {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="flex items-start gap-2 my-1 text-white/80"
                  >
                    <span className="text-violet-400 font-medium">{line.match(/^\d+\./)?.[0]}</span>
                    <span>{line.replace(/^\d+\.\s*/, '')}</span>
                  </motion.div>
                )
              }
              if (line.trim()) {
                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="text-white/70 leading-relaxed my-2"
                  >
                    {line}
                  </motion.p>
                )
              }
              return <div key={index} className="h-2" />
            })}
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-5">
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Heart size={16} className="text-white/70" />
              <span className="text-sm text-white/70">喜欢</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Bookmark size={16} className="text-white/70" />
              <span className="text-sm text-white/70">收藏</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Share2 size={16} className="text-white/70" />
              <span className="text-sm text-white/70">分享</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
