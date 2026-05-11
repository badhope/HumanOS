import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Brain, Sparkles, BookOpen, MessageCircle, Heart, Eye, Plus, Send, Search } from 'lucide-react'

const discussionItems = [
  {
    id: 'mental-health',
    title: '心理健康话题',
    description: '参与心理健康讨论',
    icon: Brain,
    badge: '推荐',
    color: 'violet',
    colorGradient: 'from-violet-500/30 to-purple-500/30',
    colorBorder: 'border-violet-500/20',
    colorText: 'text-violet-400'
  },
  {
    id: 'growth-stories',
    title: '成长心得分享',
    description: '分享你的成长故事',
    icon: Sparkles,
    color: 'emerald',
    colorGradient: 'from-emerald-500/30 to-teal-500/30',
    colorBorder: 'border-emerald-500/20',
    colorText: 'text-emerald-400'
  },
  {
    id: 'book-reviews',
    title: '书籍读后感',
    description: '交流心理学书籍心得',
    icon: BookOpen,
    color: 'amber',
    colorGradient: 'from-amber-500/30 to-orange-500/30',
    colorBorder: 'border-amber-500/20',
    colorText: 'text-amber-400'
  }
]

const topics = {
  'mental-health': [
    {
      id: 1,
      title: '如何判断自己是否需要心理咨询？',
      author: '心理探索者',
      avatar: '🧠',
      replies: 45,
      views: 1234,
      likes: 89,
      time: '2小时前',
      tags: ['心理咨询', '自我认知'],
      isHot: true
    },
    {
      id: 2,
      title: '长期失眠困扰，有什么好的解决方法吗？',
      author: '夜猫子',
      avatar: '🦉',
      replies: 67,
      views: 2156,
      likes: 123,
      time: '5小时前',
      tags: ['失眠', '睡眠质量'],
      isHot: true
    },
    {
      id: 3,
      title: '职场压力太大，如何调节心态？',
      author: '职场小白',
      avatar: '💼',
      replies: 34,
      views: 876,
      likes: 56,
      time: '1天前',
      tags: ['职场', '压力管理'],
      isHot: false
    }
  ],
  'growth-stories': [
    {
      id: 4,
      title: '从焦虑症到平静，我是这样走过来的',
      author: '阳光小美',
      avatar: '🌻',
      replies: 89,
      views: 3456,
      likes: 234,
      time: '3天前',
      tags: ['焦虑症康复', '个人经历'],
      isHot: true
    },
    {
      id: 5,
      title: '通过冥想改变生活的真实故事',
      author: '静心之旅',
      avatar: '🧘',
      replies: 56,
      views: 2345,
      likes: 178,
      time: '1周前',
      tags: ['冥想', '生活改变'],
      isHot: false
    }
  ],
  'book-reviews': [
    {
      id: 6,
      title: '《被讨厌的勇气》读后感：学会课题分离',
      author: '读书达人',
      avatar: '📚',
      replies: 78,
      views: 2876,
      likes: 201,
      time: '2天前',
      tags: ['读书笔记', '阿德勒'],
      isHot: true
    },
    {
      id: 7,
      title: '推荐几本对心理成长有帮助的书',
      author: '知识分享家',
      avatar: '💡',
      replies: 112,
      views: 4532,
      likes: 345,
      time: '3天前',
      tags: ['书单推荐', '心理学入门'],
      isHot: true
    }
  ]
}

function TopicList({ categoryId }: { categoryId: string }) {
  const [searchQuery, setSearchQuery] = useState('')
  const categoryTopics = topics[categoryId as keyof typeof topics] || []
  const filteredTopics = categoryTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索话题..."
          className="w-full pl-9 pr-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50"
        />
      </div>

      <div className="space-y-3">
        {filteredTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-lg">
                {topic.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">{topic.title}</span>
                  {topic.isHot && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500/30 text-red-400">
                      🔥 热门
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-white/50">{topic.author}</span>
                  <span className="text-[10px] text-white/30">·</span>
                  <span className="text-[10px] text-white/40">{topic.time}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {topic.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-2 text-[10px] text-white/40">
                  <span className="flex items-center gap-1">
                    <MessageCircle size={10} />
                    {topic.replies} 回复
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={10} />
                    {topic.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={10} />
                    {topic.likes}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function CommunityDiscussion() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showNewPost, setShowNewPost] = useState(false)

  const currentCategory = discussionItems.find(item => item.id === activeCategory)

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <button 
          onClick={() => {
            if (activeCategory) setActiveCategory(null)
            else if (showNewPost) setShowNewPost(false)
            else navigate('/app/discover')
          }}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          {activeCategory ? '返回分类' : showNewPost ? '返回话题' : '返回探索'}
        </button>
        <h1 className="text-xl sm:text-2xl font-bold mb-1">💬 话题讨论</h1>
        <p className="text-xs sm:text-sm text-white/60">分享观点，交流心得</p>
      </motion.div>

      {activeCategory ? (
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {currentCategory && (
                <>
                  <currentCategory.icon size={20} className={currentCategory.colorText} />
                  <span className="text-sm font-medium text-white">{currentCategory.title}</span>
                </>
              )}
            </div>
            <button
              onClick={() => setShowNewPost(true)}
              className="px-3 py-1.5 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 text-xs font-medium transition-colors flex items-center gap-1"
            >
              <Plus size={14} />
              发帖
            </button>
          </div>
          <TopicList categoryId={activeCategory} />
        </motion.div>
      ) : showNewPost ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <textarea
              placeholder="分享你的想法..."
              className="w-full h-40 bg-transparent text-sm text-white placeholder-white/30 resize-none focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl bg-violet-500/30 hover:bg-violet-500/40 text-violet-300 text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <Send size={16} />
              发布
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {discussionItems.map((item, index) => {
            const Icon = item.icon
            const topicCount = topics[item.id as keyof typeof topics]?.length || 0
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveCategory(item.id)}
                className={`p-4 rounded-2xl bg-gradient-to-br ${item.colorGradient} border ${item.colorBorder} cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${item.colorText}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white/80">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/50">{item.description}</p>
                    <div className="text-[10px] text-white/40 mt-1">{topicCount} 个话题</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
