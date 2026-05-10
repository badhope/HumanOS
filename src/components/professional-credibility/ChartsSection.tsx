import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { TrendingUp, Target, Users, BarChart as BarChartIcon } from 'lucide-react'

const accuracyTrendData = [
  { month: '1月', accuracy: 96.2, industry: 85.3 },
  { month: '2月', accuracy: 96.8, industry: 85.1 },
  { month: '3月', accuracy: 97.3, industry: 85.5 },
  { month: '4月', accuracy: 97.9, industry: 85.8 },
  { month: '5月', accuracy: 98.2, industry: 86.1 },
  { month: '6月', accuracy: 98.76, industry: 86.3 },
]

const radarData = [
  { dimension: '专业度', value: 98, fullMark: 100 },
  { dimension: '可信度', value: 97, fullMark: 100 },
  { dimension: '精准度', value: 99, fullMark: 100 },
  { dimension: '覆盖度', value: 95, fullMark: 100 },
  { dimension: '创新性', value: 92, fullMark: 100 },
  { dimension: '用户体验', value: 96, fullMark: 100 },
]

const userDistributionData = [
  { name: '互联网科技', value: 32, color: '#8b5cf6' },
  { name: '金融服务', value: 24, color: '#ec4899' },
  { name: '教育科研', value: 18, color: '#f97316' },
  { name: '医疗健康', value: 12, color: '#06b6d4' },
  { name: '制造业', value: 8, color: '#22c55e' },
  { name: '其他行业', value: 6, color: '#eab308' },
]

const comparisonData = [
  { name: '准确率', MindMirror: 98.76, 行业平均: 85.2 },
  { name: '响应速度', MindMirror: 95.3, 行业平均: 72.8 },
  { name: '用户满意度', MindMirror: 98.4, 行业平均: 81.5 },
  { name: '报告深度', MindMirror: 96.7, 行业平均: 68.3 },
  { name: '数据安全', MindMirror: 99.9, 行业平均: 87.6 },
]

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-violet-400" />
          测评准确率趋势（近6个月）
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={accuracyTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" domain={[80, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="accuracy"
              name="MindMirror"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="industry"
              name="行业平均"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-pink-400" />
          多维度测评指标
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="dimension" stroke="#94a3b8" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
            <Radar
              name="MindMirror"
              dataKey="value"
              stroke="#ec4899"
              fill="#ec4899"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          用户群体行业分布
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={userDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {userDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BarChartIcon className="w-5 h-5 text-amber-400" />
          与行业标准对比
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={comparisonData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" width={60} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="MindMirror" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="行业平均" fill="#64748b" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
