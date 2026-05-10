import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Quote } from 'lucide-react'

const successCases = [
  {
    company: '腾讯科技',
    industry: '互联网',
    logo: '🏢',
    metrics: '员工测评满意度提升 47%',
    quote: '心镜帮助我们建立了科学的人才评估体系，招聘效率提升了3倍。',
    author: '人力资源总监 刘女士',
  },
  {
    company: '招商银行',
    industry: '金融',
    logo: '🏦',
    metrics: '人才匹配准确率达 96.8%',
    quote: '专业的测评工具让我们的管培生选拔更加精准，离职率下降了35%。',
    author: '培训发展部总经理 张先生',
  },
  {
    company: '华为技术',
    industry: '科技',
    logo: '📱',
    metrics: '团队协作效能提升 52%',
    quote: '通过心镜的团队诊断，我们优化了组织架构，项目交付周期缩短了40%。',
    author: '组织发展部负责人 王先生',
  },
  {
    company: '字节跳动',
    industry: '互联网',
    logo: '🎵',
    metrics: '候选人筛选效率提升 68%',
    quote: 'AI驱动的测评系统大大提升了我们的招聘效率，推荐准确率行业领先。',
    author: '招聘中心总监 李女士',
  },
]

export function SuccessCasesSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Building2 className="w-6 h-6 text-amber-400" />
        成功案例
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {successCases.map((caseItem, index) => (
          <motion.div
            key={caseItem.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-5 rounded-xl cursor-pointer transition-all ${
              activeIndex === index
                ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30'
                : 'bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{caseItem.logo}</span>
              <div>
                <div className="text-white font-medium">{caseItem.company}</div>
                <div className="text-white/50 text-xs">{caseItem.industry}</div>
              </div>
              <div className="ml-auto px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                {caseItem.metrics}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 text-white/30 flex-shrink-0 mt-1" />
              <p className="text-white/70 text-sm italic">{caseItem.quote}</p>
            </div>
            <div className="text-white/40 text-xs mt-3 text-right">— {caseItem.author}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
