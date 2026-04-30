import { motion } from 'framer-motion'
import { Heart, Users, Award, Target, TrendingUp, Share2, Star, Sparkles } from 'lucide-react'
import { AdvancedBarChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface OCBReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const OCB_DIMENSIONS = [
  { id: 'altruism', name: '利他行为', icon: Heart, desc: '主动帮助同事解决问题' },
  { id: 'conscientiousness', name: '尽责行为', icon: Star, desc: '恪守规范，超越最低要求' },
  { id: 'sportsmanship', name: '运动员精神', icon: Sparkles, desc: '不抱怨，保持积极' },
  { id: 'courtesy', name: '礼貌礼仪', icon: Share2, desc: '尊重他人，提前沟通' },
  { id: 'civic', name: '公民美德', icon: Users, desc: '主动参与团队事务' },
]

const OCB_LEVELS = [
  { min: 80, title: '团队之光', desc: '组织公民行为楷模' },
  { min: 60, title: '优秀团队成员', desc: '积极主动，乐于助人' },
  { min: 40, title: '合格贡献者', desc: '做好本分，偶尔利他' },
  { min: 0, title: '按章办事', desc: '恪尽职守，不求有功' },
]

export default function OCBProfessionalReport({ result, mode = 'normal' }: OCBReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['altruism', 'conscientiousness', 'sportsmanship', 'courtesy', 'civic'])
  const ocbScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const levelInfo = OCB_LEVELS.find(l => ocbScore >= l.min) || OCB_LEVELS[OCB_LEVELS.length - 1]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-emerald-800 via-teal-700 to-cyan-800"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-white/80" />
            <span className="text-white/80 font-medium">OCB 组织公民行为 · 专业报告</span>
          </div>
          {mode === 'professional' && (
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center gap-2">
              <Award className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">专业版</span>
            </div>
          )}
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-12 h-12 text-white" />
            <h1 className="text-4xl font-black text-white">{levelInfo.title}</h1>
          </div>
          <p className="text-white/80 text-lg">{levelInfo.desc}</p>
          <div className="text-white/60 mt-2">OCB 综合指数: {ocbScore.toFixed(0)}</div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-emerald-400" />
          组织公民行为五维雷达
        </h3>
        <AdvancedRadarChart dimensions={dimensions.map(d => {
          const info = OCB_DIMENSIONS.find(o => o.id === d.name);
          return { name: info?.name || d.name, score: d.score, maxScore: 100 };
        })} animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          维度解析
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OCB_DIMENSIONS.map((dim, i) => {
            const Icon = dim.icon;
            const score = dimensions.find(d => d.name === dim.id)?.score || 50;
            return (
              <motion.div key={dim.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.1 }} className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-white text-sm">{dim.name}</span>
                  </div>
                  <span className="text-emerald-400 font-bold">{score}</span>
                </div>
                <p className="text-white/50 text-xs">{dim.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  )
}
