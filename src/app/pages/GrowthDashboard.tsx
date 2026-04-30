import { motion } from 'framer-motion'
import { Brain, Heart, Users, Target, Zap, BookOpen, TrendingUp, Clock, Award } from 'lucide-react'
import AdvancedRadarChart from '../../components/charts/AdvancedRadarChart'
import { useAppStore } from '../../store'

const DIMENSIONS = [
  { key: 'emotion', name: '情绪稳定', icon: Heart, color: '#ec4899', desc: '应对焦虑、压力的能力' },
  { key: 'cognition', name: '认知清晰', icon: Brain, color: '#8b5cf6', desc: '思维模式的客观程度' },
  { key: 'social', name: '社交健康', icon: Users, color: '#06b6d4', desc: '边界感、共情能力平衡' },
  { key: 'behavior', name: '行动能力', icon: Zap, color: '#f97316', desc: '拖延、执行力、意志力' },
  { key: 'values', name: '价值明晰', icon: Target, color: '#10b981', desc: '知道自己要什么' },
  { key: 'fun', name: '趣味探索', icon: BookOpen, color: '#eab308', desc: '娱乐项目体验' },
]

export default function GrowthDashboard() {
  const { completedAssessments, moodHistory } = useAppStore() as any
  
  const trainingRecords = JSON.parse(localStorage.getItem('training-records') || '[]')
  
  const hasAnyData = completedAssessments.length > 0 || moodHistory.length > 0 || trainingRecords.length > 0

  const trainingByCategory: Record<string, number> = {}
  trainingRecords.forEach((r: any) => {
    trainingByCategory[r.category] = (trainingByCategory[r.category] || 0) + 1
  })

  const calculateGrowthScores = () => {
    return DIMENSIONS.map(dim => {
      let score = 0
      
      if (dim.key === 'emotion' && moodHistory.length > 0) {
        score = Math.min(100, moodHistory.length * 8)
      }
      if (dim.key === 'cognition' && completedAssessments.length > 0) {
        score = Math.min(100, completedAssessments.length * 12)
      }
      if (dim.key === 'social' && trainingByCategory['social']) {
        score = Math.min(100, trainingByCategory['social'] * 20)
      }
      if (dim.key === 'behavior' && trainingByCategory['behavior']) {
        score = Math.min(100, trainingByCategory['behavior'] * 20)
      }
      if (dim.key === 'values' && completedAssessments.length > 2) {
        score = Math.min(100, (completedAssessments.length - 2) * 15)
      }
      if (dim.key === 'fun' && trainingByCategory['fun']) {
        score = Math.min(100, trainingByCategory['fun'] * 25)
      }
      
      return {
        name: dim.name,
        score,
        maxScore: 100,
      }
    })
  }

  const growthScores = calculateGrowthScores()
  const totalSeconds = trainingRecords.reduce((s: number, r: any) => s + r.duration, 0)
  const totalMinutes = Math.floor(totalSeconds / 60)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4 md:p-6 space-y-6"
    >
      <div className="py-4 md:hidden">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          📊 全面成长分析
        </motion.h2>
        <p className="text-white/50">你的6大核心能力维度</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
            <Brain size={14} />
          </span>
          六维能力雷达图
        </h3>
        
        {!hasAnyData ? (
          <div className="text-center py-12 text-white/40">
            <Brain size={48} className="mx-auto mb-4 opacity-30" />
            <p>开始测评和训练后，这里会显示你的成长数据</p>
            <p className="text-sm mt-2">数据全部真实计算，没有模拟</p>
          </div>
        ) : (
          <>
            <AdvancedRadarChart
              dimensions={growthScores}
              colorScheme="multi"
              height={320}
              showDataLabels
              animated
            />

            <div className="grid grid-cols-3 gap-3 mt-6">
              {DIMENSIONS.map((dim, i) => {
                const score = growthScores[i]?.score || 0
                const Icon = dim.icon
                return (
                  <motion.div
                    key={dim.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="p-3 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: score > 0 ? dim.color + '20' : 'rgba(255,255,255,0.05)' }}
                      >
                        <Icon size={16} style={{ color: score > 0 ? dim.color : 'rgba(255,255,255,0.3)' }} />
                      </div>
                      <span className="text-xs font-medium">{dim.name}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${score}%`, backgroundColor: score > 0 ? dim.color : 'rgba(255,255,255,0.1)' }}
                      />
                    </div>
                    <div className="text-[10px] text-white/40 text-right">{score}分</div>
                  </motion.div>
                )
              })}
            </div>
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="grid grid-cols-2 gap-3"
      >
        {[
          { label: '完成测评', value: completedAssessments.length, icon: '📝', color: 'violet' },
          { label: '完成训练', value: trainingRecords.length, icon: '🏋️', color: 'pink' },
          { label: '心情打卡', value: moodHistory.length, icon: '😊', color: 'amber' },
          { label: '累计时长', value: totalMinutes + '分', icon: '⏱️', color: 'emerald' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-[10px] text-white/40">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white/5 rounded-2xl p-5 border border-white/10"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-emerald-400" />
          训练历史
        </h3>
        
        {trainingRecords.length === 0 ? (
          <div className="text-center py-6 text-white/40 text-sm">
            还没有训练记录，去开始第一个训练吧！
          </div>
        ) : (
          <div className="space-y-2">
            {trainingRecords.slice(-8).reverse().map((record: any, i: number) => {
              const dim = DIMENSIONS.find(d => d.key === record.category)
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: dim ? dim.color + '20' : 'rgba(139, 92, 246, 0.2)' }}
                  >
                    {dim?.icon ? <dim.icon size={18} style={{ color: dim.color }} /> : <Award size={18} className="text-violet-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{record.programId}</p>
                    <p className="text-xs text-white/40 flex items-center gap-2">
                      <Clock size={10} />
                      {new Date(record.completedAt).toLocaleDateString()}
                      <span>·</span>
                      {Math.floor(record.duration / 60)}分{record.duration % 60}秒
                    </p>
                  </div>
                  <div className="text-emerald-400 text-xs font-medium">+成长值</div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>

      {hasAnyData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-2xl p-5 border border-violet-500/20"
        >
          <h3 className="font-semibold mb-3">💡 AI 成长洞察</h3>
          <div className="space-y-3">
            {growthScores.filter(s => s.score >= 50).length > 0 && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-emerald-400 text-sm font-medium">✨ 你的优势领域</div>
                <p className="text-white/60 text-xs mt-1">
                  {growthScores.filter(s => s.score >= 50).map(s => s.name).join('、') || '暂无显著优势，继续加油！'}
                </p>
              </div>
            )}
            
            {growthScores.filter(s => s.score > 0 && s.score < 30).length > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="text-amber-400 text-sm font-medium">🎯 推荐重点提升</div>
                <p className="text-white/60 text-xs mt-1">
                  {growthScores.filter(s => s.score > 0 && s.score < 30).map(s => s.name).join('、')} 可以开始针对性训练了
                </p>
              </div>
            )}
            
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-violet-300 text-sm font-medium">📈 成长建议</div>
              <p className="text-white/60 text-xs mt-1">
                坚持每日心情打卡 + 每周 2-3 次训练，数据会逐步填充你的能力雷达图！
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {!hasAnyData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8 text-white/40"
        >
          <p className="text-lg mb-2">🌱 你的成长画卷还是空白的</p>
          <p className="text-sm">从今天开始记录心情和训练，让数据见证你的成长</p>
          <p className="text-xs mt-4 opacity-60">* 所有数据真实记录，无任何模拟填充</p>
        </motion.div>
      )}
    </motion.div>
  )
}
