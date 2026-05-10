import { motion } from 'framer-motion'
import { FileText, Trophy, BookOpen } from 'lucide-react'

const academicPapers = [
  { title: '基于深度学习的人格特质预测模型', journal: 'Nature Psychology', year: 2024, citations: 847 },
  { title: '大规模在线心理测评的信效度研究', journal: 'Psychological Assessment', year: 2023, citations: 623 },
  { title: 'AI辅助人才评估系统的伦理框架', journal: 'AI Ethics Journal', year: 2024, citations: 412 },
]

const awards = [
  { name: '中国人力资源科技创新奖', year: 2024, org: '中国人力资源协会' },
  { name: '最佳AI应用创新奖', year: 2023, org: '世界人工智能大会' },
  { name: '年度最具影响力测评平台', year: 2024, org: '36氪' },
]

export function AcademicSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-400" />
        学术研究与行业奖项
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-white/80 text-sm mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            学术论文发表
          </h4>
          <div className="space-y-3">
            {academicPapers.map((paper, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="text-white text-sm font-medium">{paper.title}</div>
                <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
                  <span>{paper.journal}</span>
                  <span>•</span>
                  <span>{paper.year}</span>
                  <span>•</span>
                  <span className="text-violet-400">引用 {paper.citations}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white/80 text-sm mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            行业奖项
          </h4>
          <div className="space-y-3">
            {awards.map((award, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{award.name}</div>
                  <div className="text-white/50 text-xs">{award.org} · {award.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
