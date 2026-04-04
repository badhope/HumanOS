import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, RotateCcw, Download, Award, TrendingUp, Users, Lightbulb } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useAppStore } from '../store'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'

export default function Results() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const completedAssessments = useAppStore((state) => state.completedAssessments)

  const latestResult = completedAssessments.find(
    (a) => a.assessmentId === id
  )

  useEffect(() => {
    if (!latestResult) {
      navigate('/')
      return
    }

    // Trigger confetti
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval: ReturnType<typeof setInterval> = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [latestResult, navigate])

  if (!latestResult) return null

  const { result, completedAt } = latestResult

  // Prepare chart data - ensure valid data
  const radarData = result.traits?.length > 0 
    ? result.traits.map((trait) => ({
        subject: trait.name.length > 6 ? trait.name.slice(0, 6) + '...' : trait.name,
        A: Math.max(0, trait.score || 0),
        fullMark: Math.max(1, trait.maxScore || 1),
      }))
    : []

  const barData = result.traits?.length > 0
    ? result.traits.map((trait) => ({
        name: trait.name.length > 8 ? trait.name.slice(0, 8) + '...' : trait.name,
        score: Math.max(0, trait.score || 0),
        max: Math.max(1, trait.maxScore || 1),
      }))
    : []

  // Calculate overall score
  const totalScore = result.traits?.reduce((sum, t) => sum + (t.score || 0), 0) || 0
  const maxTotalScore = result.traits?.reduce((sum, t) => sum + Math.max(1, t.maxScore || 1), 0) || 1
  const percentage = Math.round((totalScore / maxTotalScore) * 100)

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
            返回仪表盘
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                {result.title || '测评结果'}
              </h1>
              <p className="text-white/60">{result.description || '完成测评'}</p>
              <p className="text-white/40 text-sm mt-1">
                完成时间: {new Date(completedAt).toLocaleString('zh-CN')}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/assessment/${id}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/80 hover:text-white hover:bg-white/10 transition-all"
                type="button"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">重新测试</span>
              </button>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `我的${result.title}测评结果`,
                      text: `我在HumanOS完成了${result.title}测评，结果是：${result.type}`,
                      url: window.location.href
                    }).catch(() => {})
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert('链接已复制到剪贴板！')
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/80 hover:text-white hover:bg-white/10 transition-all"
                type="button"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/80 hover:text-white hover:bg-white/10 transition-all"
                type="button"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Result Type Badge & Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-wrap gap-4"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30">
            <Award className="w-5 h-5 text-violet-400" />
            <span className="text-sm text-white/60">测评结果</span>
            <span className="text-2xl font-bold text-gradient">
              {result.type || '完成'}
            </span>
          </div>
          
          {percentage > 0 && (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-white/10">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm text-white/60">综合得分</span>
              <span className="text-2xl font-bold text-white">{percentage}%</span>
            </div>
          )}
        </motion.div>

        {/* Charts Grid - Only show if we have data */}
        {radarData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-6">特质分布</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 'dataMax']}
                      tick={false}
                      axisLine={false}
                    />
                    <Radar
                      name="得分"
                      dataKey="A"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'white' }}
                      itemStyle={{ color: '#8b5cf6' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-6">详细得分</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    layout="vertical"
                    margin={{ left: 20, right: 30, top: 10, bottom: 10 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                      width={80}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'white' }}
                      itemStyle={{ color: '#8b5cf6' }}
                    />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                      {barData.map((_, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`hsl(${260 + index * 20}, 70%, 60%)`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        )}

        {/* Trait Details */}
        {result.traits?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">维度详解</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.traits.map((trait, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">{trait.name}</span>
                    <span className="text-violet-400 font-semibold">
                      {trait.score}/{trait.maxScore}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${((trait.score || 0) / Math.max(1, trait.maxScore || 1)) * 100}%` }}
                    />
                  </div>
                  {trait.description && (
                    <p className="text-white/50 text-xs mt-2">{trait.description}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          {result.details?.strengths?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-green-400" />
                优势特点
              </h3>
              <ul className="space-y-3">
                {result.details.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Weaknesses */}
          {result.details?.weaknesses?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                发展建议
              </h3>
              <ul className="space-y-3">
                {result.details.weaknesses.map((weakness, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white/80"
                  >
                    <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">!</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Careers */}
        {result.details?.careers?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              适合的方向
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.details.careers.map((career, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 text-violet-300 text-sm border border-violet-500/20"
                >
                  {career}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Relationships */}
        {result.details?.relationships && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-2">关系洞察</h3>
            <p className="text-white/70">{result.details.relationships}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
