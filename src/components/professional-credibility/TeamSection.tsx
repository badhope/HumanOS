import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const teamMembers = [
  { name: '张明远', title: '首席心理学家', desc: '北京大学心理学博士，20年临床经验', avatar: '🧠' },
  { name: '李思琪', title: 'AI算法专家', desc: 'MIT人工智能实验室博士后研究员', avatar: '🤖' },
  { name: '王建华', title: '数据科学总监', desc: '前Google数据科学家，IEEE会员', avatar: '📊' },
  { name: '陈雅文', title: '用户体验专家', desc: '斯坦福大学人机交互硕士', avatar: '🎨' },
]

export function TeamSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-violet-400" />
        专家团队
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="text-4xl mb-3">{member.avatar}</div>
            <div className="text-white font-medium">{member.name}</div>
            <div className="text-violet-400 text-sm">{member.title}</div>
            <div className="text-white/50 text-xs mt-2">{member.desc}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
