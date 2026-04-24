import { motion } from 'framer-motion'
import { Crown, Star, Shield, TrendingUp, Award, Target, Zap, Users, Eye, Sparkles } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface OfficialdomReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const OFFICIAL_RANKS = [
  { min: 90, title: '摄政王', level: '正国级', color: 'from-amber-400 to-yellow-600', power: '一人之下，万人之上', icon: Crown },
  { min: 80, title: '军机大臣', level: '副国级', color: 'from-violet-500 to-purple-600', power: '参与最高决策', icon: Eye },
  { min: 70, title: '封疆大吏', level: '省部级', color: 'from-blue-500 to-cyan-600', power: '独掌一方，权倾朝野', icon: Shield },
  { min: 60, title: '四品道台', level: '厅局级', color: 'from-emerald-500 to-teal-600', power: '中流砥柱，承上启下', icon: Users },
  { min: 50, title: '七品知县', level: '县处级', color: 'from-lime-500 to-green-600', power: '百姓父母，基层栋梁', icon: Target },
  { min: 40, title: '八品县丞', level: '乡科级', color: 'from-sky-500 to-blue-600', power: '事务缠身，兢兢业业', icon: Zap },
  { min: 0, title: '白丁秀才', level: '科员级', color: 'from-slate-500 to-gray-600', power: '宦海初入，前途无量', icon: Sparkles },
]

const OFFICIAL_DIMENSIONS = [
  { name: '站队能力', key: 'alignment' },
  { name: '说话艺术', key: 'rhetoric' },
  { name: '办事手腕', key: 'execution' },
  { name: '后台硬度', key: 'connections' },
  { name: '抗风险力', key: 'resilience' },
]

export default function OfficialdomDreamProfessionalReport({ result, mode = 'normal' }: OfficialdomReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['alignment', 'rhetoric', 'execution', 'connections', 'resilience'])
  const officialScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const rankInfo = OFFICIAL_RANKS.find(r => officialScore >= r.min) || OFFICIAL_RANKS[OFFICIAL_RANKS.length - 1]
  const RankIcon = rankInfo.icon
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${rankInfo.color} opacity-90`} />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[100%] rounded-full bg-black/20 blur-3xl" />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">官阶梦测评 · 专业报告</span>
            </div>
            {mode === 'professional' && (
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center gap-2">
                <Award className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">专业版</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <RankIcon className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">
                  {rankInfo.title}
                </h1>
              </div>
              <p className="text-white/70 text-xl mb-2">{rankInfo.level} · {rankInfo.power}</p>
              <p className="text-white/80 text-lg">宦海指数: {Math.round(officialScore)} / 100</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">🎖️</div>
              <div className="text-white/70">官阶品级</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-amber-400" />
            官场五维能力
          </h3>
          <AdvancedBarChart
            dimensions={dimensions.map((d, i) => ({
              name: OFFICIAL_DIMENSIONS[i]?.name || d.name,
              score: d.score,
              maxScore: 100,
            }))}
            colorScheme="gradient"
            animated
          />
        </div>
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-violet-400" />
            官阶综合指数
          </h3>
          <CircularProgressChart
            score={officialScore}
            title="宦海成熟度"
            size="large"
            colorScheme="amber"
            showScore
            animated
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-rose-400" />
          官场生存指南
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-500/15 to-teal-500/15 rounded-xl p-5 border border-emerald-500/20">
            <h4 className="font-bold text-white mb-2">✅ 升官必备</h4>
            <ul className="text-white/60 text-sm space-y-1">
              <li>• 多请示，多汇报，少表态</li>
              <li>• 领会精神，执行到位</li>
              <li>• 功劳让给领导，责任自己承担</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-rose-500/15 to-red-500/15 rounded-xl p-5 border border-rose-500/20">
            <h4 className="font-bold text-white mb-2">❌ 官场禁忌</h4>
            <ul className="text-white/60 text-sm space-y-1">
              <li>• 不要站错队，不要拿错钱</li>
              <li>• 不要乱说话，不要乱办事</li>
              <li>• 功高震主，尾大不掉</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
