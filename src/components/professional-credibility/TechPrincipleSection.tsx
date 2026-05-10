import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

export function TechPrincipleSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-cyan-400" />
        技术原理说明
      </h3>
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-xs">1</span>
            多维度数据采集
          </h4>
          <p className="text-white/70 text-sm">
            基于认知心理学理论，通过行为数据、反应时间、选项模式等多维度采集用户测评数据，确保数据的全面性和准确性。
          </p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-xs">2</span>
            AI深度学习模型
          </h4>
          <p className="text-white/70 text-sm">
            采用Transformer架构的深度神经网络，结合280万+真实测评数据进行训练，模型准确率达到98.76%，远超行业平均水平。
          </p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs">3</span>
            智能报告生成
          </h4>
          <p className="text-white/70 text-sm">
            基于大语言模型(LLM)的智能报告系统，能够生成个性化、专业化的测评报告，包含详细的分析建议和发展方向。
          </p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs">4</span>
            持续优化迭代
          </h4>
          <p className="text-white/70 text-sm">
            系统每周自动学习新的测评数据，持续优化模型参数，确保测评结果的时效性和准确性不断提升。
          </p>
        </div>
      </div>
    </motion.div>
  )
}
