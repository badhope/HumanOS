import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Home,
  MessageSquare,
  Bell,
  User,
  MoreHorizontal,
  Heart,
  Share2,
  Send,
  Image,
  Video,
  Smile,
  MapPin,
  Calendar,
  Settings,
  LogOut,
  Users,
  TrendingUp,
  Hash,
  Plus,
  X,
  ThumbsUp,
  MessageCircle,
  Share
} from 'lucide-react'
import { SharedLayout } from '../../shared/layout/SharedLayout'

function SocialHome() {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'messages' | 'profile'>('home')

  const posts = [
    {
      id: 1,
      user: { name: '前端工程师', avatar: '👨‍💻', handle: '@frontend_dev' },
      content: '今天终于完成了公司项目的重构，从 Vue2 迁移到 React 18，配合 TypeScript 和 Vite，性能提升了 3 倍！成就感满满 💪',
      image: null,
      likes: 234,
      comments: 45,
      shares: 12,
      time: '2小时前',
      liked: false
    },
    {
      id: 2,
      user: { name: '产品经理小王', avatar: '👩‍💼', handle: '@pm_wang' },
      content: '分享一个最近学到的产品思维：不要试图满足所有用户，找到核心用户群体并深度理解他们的需求，比做一百个功能更有价值。',
      image: '📊',
      likes: 189,
      comments: 32,
      shares: 8,
      time: '4小时前',
      liked: true
    },
    {
      id: 3,
      user: { name: 'UI设计师', avatar: '👩‍🎨', handle: '@ui_designer' },
      content: '新完成的设计稿，分享给大家看看~ 这是一个面向年轻用户的社交APP，整体风格偏活泼和扁平化。',
      image: '🎨',
      likes: 567,
      comments: 89,
      shares: 34,
      time: '6小时前',
      liked: false
    },
    {
      id: 4,
      user: { name: '全栈开发者', avatar: '👨‍💼', handle: '@fullstack' },
      content: '又到了每周技术分享时间，这次聊聊如何从零开始搭建一个微服务架构。从服务注册、负载均衡、到容器化部署，手把手教学 🚀',
      image: null,
      likes: 345,
      comments: 67,
      shares: 23,
      time: '8小时前',
      liked: false
    }
  ]

  const trending = [
    { category: '科技', topic: '#React19', posts: '12.5k' },
    { category: '前端', topic: '#TypeScript', posts: '8.3k' },
    { category: '职场', topic: '#面试技巧', posts: '5.7k' },
    { category: '设计', topic: '#UI设计', posts: '4.2k' }
  ]

  const suggestions = [
    { name: '技术总监张三', avatar: '👨‍💼', handle: '@tech_lead', followers: '1.2k' },
    { name: '架构师李四', avatar: '👨‍🔧', handle: '@architect', followers: '980' },
    { name: '产品总监王五', avatar: '👩‍💼', handle: '@product_director', followers: '2.1k' }
  ]

  const messages = [
    { id: 1, user: '前端小明', avatar: '👨‍💻', lastMessage: '那个React问题解决了吗？', time: '3分钟前', unread: true },
    { id: 2, user: 'UI设计师', avatar: '👩‍🎨', lastMessage: '设计稿已更新~', time: '1小时前', unread: false },
    { id: 3, user: '产品经理', avatar: '👩‍💼', lastMessage: '明天开会讨论新需求', time: '昨天', unread: false }
  ]

  return (
    <SharedLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
          <div className="flex items-center justify-between h-14 px-4">
            <div className="text-2xl font-bold text-cyan-500">HumanOS</div>
            <div className="relative flex-1 max-w-xs mx-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索..."
                className="w-full pl-9 pr-4 py-1.5 bg-gray-100 rounded-full text-sm"
              />
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto flex pt-14 md:pt-0">
          {/* Left Sidebar - Desktop */}
          <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 p-4 border-r border-gray-200 bg-white">
            <div className="text-2xl font-bold text-cyan-500 mb-8 px-4">HumanOS</div>

            <nav className="space-y-2">
              {[
                { icon: Home, label: '首页', active: true },
                { icon: Hash, label: '探索', active: false },
                { icon: MessageSquare, label: '消息', active: false },
                { icon: Bell, label: '通知', active: false },
                { icon: User, label: '我的', active: false }
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    item.active
                      ? 'bg-cyan-50 text-cyan-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  type="button"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <motion.button
              whileHover={{ scale: 1.02 }}
              className="mt-6 w-full py-3 bg-cyan-500 text-white font-semibold rounded-xl"
              type="button"
            >
              发推
            </motion.button>

            <div className="mt-auto pt-4 border-t">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl" type="button">
                <Settings className="w-5 h-5" />
                <span>设置</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl" type="button">
                <LogOut className="w-5 h-5" />
                <span>退出</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-2xl mx-auto border-r border-l border-gray-200 bg-white">
            {/* Post Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">
                  👤
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="有什么新鲜事？"
                    className="w-full text-lg bg-transparent resize-none focus:outline-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex gap-2">
                      {([Image, Video, Smile, MapPin, Calendar] as const).map((Icon, i) => (
                        <button
                          key={i}
                          className="p-2 text-cyan-500 hover:bg-cyan-50 rounded-full"
                          type="button"
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-2 bg-cyan-500 text-white font-medium rounded-full"
                      type="button"
                    >
                      发布
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0">
                      {post.user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{post.user.name}</span>
                        <span className="text-gray-500">{post.user.handle}</span>
                        <span className="text-gray-400">· {post.time}</span>
                      </div>
                      <p className="text-gray-800 mb-3">{post.content}</p>

                      {post.image && (
                        <div className="mb-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center text-6xl">
                          {post.image}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-gray-500">
                        <button className={`flex items-center gap-2 hover:text-rose-500 ${post.liked ? 'text-rose-500' : ''}`} type="button">
                          <Heart className={`w-5 h-5 ${post.liked ? 'fill-rose-500' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-cyan-500" type="button">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-500" type="button">
                          <Share2 className="w-5 h-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600" type="button">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:flex flex-col w-80 h-screen sticky top-0 p-4">
            {/* Search - Desktop */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索"
                className="w-full pl-9 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Trending */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
                热门话题
              </h3>
              <div className="space-y-4">
                {trending.map((item) => (
                  <div key={item.topic} className="cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                    <div className="font-semibold text-gray-900">{item.topic}</div>
                    <div className="text-xs text-gray-500">{item.posts} 帖子</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who to Follow */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-500" />
                推荐关注
              </h3>
              <div className="space-y-4">
                {suggestions.map((user) => (
                  <div key={user.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xl">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.followers} 粉丝</div>
                      </div>
                    </div>
                    <button
                      className="px-4 py-1.5 text-sm text-cyan-500 font-medium hover:bg-cyan-50 rounded-full"
                      type="button"
                    >
                      + 关注
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="flex items-center justify-around h-14">
            {[
              { icon: Home, label: '首页', active: true },
              { icon: Search, label: '探索', active: false },
              { icon: Plus, label: '', active: false, special: true },
              { icon: MessageSquare, label: '消息', active: false },
              { icon: User, label: '我的', active: false }
            ].map((item) => (
              <button
                key={item.label}
                className={`p-2 ${item.special ? 'relative -top-6' : ''}`}
                type="button"
              >
                {item.special ? (
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <item.icon className={`w-6 h-6 ${item.active ? 'text-cyan-500' : 'text-gray-500'}`} />
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </SharedLayout>
  )
}

export default SocialHome