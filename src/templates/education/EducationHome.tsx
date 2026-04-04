import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Award,
  MessageSquare,
  Bell,
  User,
  Menu,
  ChevronRight,
  Calendar,
  BarChart2,
  FileText,
  Video,
  Download,
  Filter
} from 'lucide-react'
import { SharedLayout } from '../../shared/layout/SharedLayout'

function EducationHome() {
  const [activeTab, setActiveTab] = useState('courses')

  const featuredCourses = [
    { id: 1, title: 'React 18 高级实战', category: '前端开发', level: '高级', duration: '40小时', students: 1234, rating: 4.9, image: '⚛️', teacher: '张老师' },
    { id: 2, title: 'TypeScript 深入理解', category: '前端开发', level: '中级', duration: '25小时', students: 856, rating: 4.8, image: '🔷', teacher: '李老师' },
    { id: 3, title: 'Node.js 全栈开发', category: '后端开发', level: '中级', duration: '35小时', students: 2341, rating: 4.7, image: '🟢', teacher: '王老师' },
    { id: 4, title: 'Tailwind CSS 实战', category: '前端开发', level: '初级', duration: '15小时', students: 567, rating: 4.9, image: '🎨', teacher: '赵老师' }
  ]

  const categories = [
    { name: '前端开发', icon: '💻', count: 45 },
    { name: '后端开发', icon: '🔧', count: 38 },
    { name: '移动开发', icon: '📱', count: 22 },
    { name: '数据科学', icon: '📊', count: 18 },
    { name: '人工智能', icon: '🤖', count: 15 },
    { name: 'UI/UX设计', icon: '🎯', count: 28 }
  ]

  const myCourses = [
    { id: 1, title: 'React 基础入门', progress: 75, totalLessons: 20, completedLessons: 15, image: '⚛️' },
    { id: 2, title: 'TypeScript 入门', progress: 45, totalLessons: 15, completedLessons: 7, image: '🔷' },
    { id: 3, title: 'CSS 动画实战', progress: 100, totalLessons: 12, completedLessons: 12, image: '✨' }
  ]

  const liveClasses = [
    { id: 1, title: 'React 性能优化实战', teacher: '张老师', time: '今天 19:00', viewers: 234, status: '即将开始' },
    { id: 2, title: 'TypeScript 高级类型', teacher: '李老师', time: '今天 21:00', viewers: 156, status: '即将开始' }
  ]

  const communityPosts = [
    { id: 1, user: '前端小明', avatar: '👨‍💻', content: '最近在学习 React 18 的新特性，感觉 Suspense 组件真的太强大了！', likes: 45, comments: 12, time: '2小时前' },
    { id: 2, user: '全栈小王', avatar: '👨‍💼', content: '分享一个 TypeScript 的技巧：使用 satisfies 关键字可以保持类型推断的同时进行类型约束', likes: 89, comments: 23, time: '5小时前' },
    { id: 3, user: '设计小李', avatar: '👩‍🎨', content: 'Tailwind CSS 3.4 发布了，新增了很多实用的功能，大家可以升级试试', likes: 67, comments: 8, time: '1天前' }
  ]

  return (
    <SharedLayout>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">HumanOS 学堂</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {['courses', 'live', 'community', 'my'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === tab ? 'text-sky-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  type="button"
                >
                  {tab === 'courses' ? '课程' : tab === 'live' ? '直播' : tab === 'community' ? '社区' : '我的学习'}
                </button>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索课程..."
                  className="w-48 pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <button className="p-2.5 rounded-full hover:bg-gray-100 relative" type="button">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="text-4xl font-bold mb-4">
                  开启你的学习之旅
                </h1>
                <p className="text-xl text-white/80 mb-8">
                  1000+ 优质课程，顶尖讲师团队，助你快速掌握前沿技术
                </p>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-8 py-3 bg-white text-sky-600 font-semibold rounded-full"
                    type="button"
                  >
                    探索课程
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-8 py-3 bg-white/20 text-white font-semibold rounded-full border border-white/30"
                    type="button"
                  >
                    免费体验
                  </motion.button>
                </div>
              </motion.div>
              <div className="hidden lg:flex justify-center text-[150px]">
                🎓
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '1000+', label: '优质课程' },
                { value: '50000+', label: '学习用户' },
                { value: '100+', label: '专家讲师' },
                { value: '98%', label: '好评率' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">课程分类</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md cursor-pointer text-center"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <div className="font-medium text-gray-900">{category.name}</div>
                  <div className="text-sm text-gray-500">{category.count} 门课程</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">热门课程</h2>
              <button className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1" type="button">
                查看全部 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all"
                >
                  <div className="relative h-40 bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center text-5xl">
                    {course.image}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700">
                      {course.level}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-sky-600 font-medium mb-1">{course.category}</div>
                    <div className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                      <Users className="w-4 h-4 ml-2" />
                      {course.students}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">{course.teacher}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* My Learning */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">我的学习</h2>
              <button className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1" type="button">
                学习中心 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {myCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-xl flex items-center justify-center text-3xl">
                      {course.image}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 line-clamp-1">{course.title}</div>
                      <div className="text-sm text-gray-500">
                        {course.completedLessons}/{course.totalLessons} 课时
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">学习进度</span>
                      <span className="text-sky-600 font-medium">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-2.5 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600"
                    type="button"
                  >
                    {course.progress === 100 ? '查看证书' : '继续学习'}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Classes */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">直播课程</h2>
              <button className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1" type="button">
                查看全部 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {liveClasses.map((live, index) => (
                <motion.div
                  key={live.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6 p-6 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl border border-sky-100"
                >
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center text-4xl">
                    📺
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">直播中</span>
                      <span className="text-sm text-gray-500">{live.time}</span>
                    </div>
                    <div className="font-semibold text-gray-900 mb-1">{live.title}</div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{live.teacher}</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {live.viewers} 人观看
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-2.5 bg-sky-500 text-white font-medium rounded-xl hover:bg-sky-600 flex items-center gap-2"
                    type="button"
                  >
                    <Play className="w-4 h-4" />
                    进入
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">社区动态</h2>
              <button className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1" type="button">
                发帖 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {communityPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{post.user}</span>
                        <span className="text-sm text-gray-500">{post.time}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SharedLayout>
  )
}

export default EducationHome