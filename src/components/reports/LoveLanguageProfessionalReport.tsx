import { motion } from 'framer-motion'
import { Heart, Users, Award, Target, TrendingUp, Sparkles, MessageCircle, Gift, Clock, Share2 } from 'lucide-react'
import { AdvancedBarChart, AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface LoveLanguageReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const LOVE_LANGUAGES = [
  { id: 'words', name: '肯定的言词', icon: MessageCircle, desc: '赞美、感谢、鼓励的话语', example: '"你今天真好看" "谢谢你"', color: 'from-pink-500 to-rose-500' },
  { id: 'quality', name: '精心的时刻', icon: Clock, desc: '专注的、高质量的陪伴时间', example: '认真倾听、放下手机的约会', color: 'from-red-500 to-orange-500' },
  { id: 'gifts', name: '接受礼物', icon: Gift, desc: '通过礼物表达爱意与重视', example: '精心挑选的小惊喜', color: 'from-amber-500 to-yellow-500' },
  { id: 'service', name: '服务的行动', icon: Share2, desc: '为对方做事，减轻TA的负担', example: '做一顿饭、修一个东西', color: 'from-emerald-500 to-teal-500' },
  { id: 'touch', name: '身体的接触', icon: Heart, desc: '拥抱、牵手、抚摸的力量', example: '一个拥抱、拍拍肩膀', color: 'from-violet-500 to-purple-500' },
]

export default function LoveLanguageProfessionalReport({ result, mode = 'normal' }: LoveLanguageReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['words', 'quality', 'gifts', 'service', 'touch'])
  const primary = [...dimensions].sort((a, b) => b.score - a.score)[0]
  const primaryInfo = LOVE_LANGUAGES.find(l => l.id === primary?.name) || LOVE_LANGUAGES[0]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${primaryInfo.color} opacity-90`} />
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">爱的语言测评 · 专业报告</span>
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
              {(() => { const Icon = primaryInfo.icon; return <Icon className="w-12 h-12 text-white" />; })()}
              <h1 className="text-5xl font-black text-white">{primaryInfo.name}</h1>
            </div>
            <p className="text-white/80 text-lg mb-2">{primaryInfo.desc}</p>
            <p className="text-white/60 italic">💡 例如: {primaryInfo.example}</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-pink-400" />
          五种爱的语言雷达
        </h3>
        <AdvancedRadarChart dimensions={dimensions.map(d => {
          const info = LOVE_LANGUAGES.find(l => l.id === d.name);
          return { name: info?.name || d.name, score: d.score, maxScore: 100 };
        })} animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-emerald-400" />
          给爱人们的建议
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOVE_LANGUAGES.map((lang, i) => {
            const Icon = lang.icon;
            const score = dimensions.find(d => d.name === lang.id)?.score || 50;
            return (
              <motion.div key={lang.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.1 }} className={`p-5 rounded-xl bg-gradient-to-br ${lang.color}/10 border border-white/10`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-white" />
                    <span className="font-bold text-white text-sm">{lang.name}</span>
                  </div>
                  <span className="text-white font-bold">{score}</span>
                </div>
                <p className="text-white/50 text-xs">{lang.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  )
}
