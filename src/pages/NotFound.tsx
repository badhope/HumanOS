import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { PageWrapper } from '@components/layout'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <PageWrapper type="standard" background="gradient" centered>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Search className="w-32 h-32 text-violet-500/20 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-6xl font-bold text-white mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-white/60 mb-8"
        >
          页面未找到
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-white/40 mb-12"
        >
          抱歉，您访问的页面不存在或已被移除
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-violet-500 to-pink-500 text-white px-8 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-500/25 transition-all"
          >
            <Home className="w-5 h-5" />
            返回首页
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="glass border border-white/10 text-white px-8 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            返回上一页
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 p-4 glass rounded-lg"
        >
          <p className="text-sm text-white/40">
            如果您认为这是一个错误，请联系管理员或尝试清除浏览器缓存
          </p>
        </motion.div>
      </motion.div>
    </PageWrapper>
  )
}
