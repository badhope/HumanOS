import { motion } from 'framer-motion'
import { Crown, Sword, Users, Zap, Star, Award, Target, TrendingUp, Compass, Skull } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface BountyReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const BOUNTY_DIMENSIONS = [
  { id: 'combatPower', name: '战力指数', icon: Sword, desc: '正面硬刚的实力' },
  { id: 'influence', name: '势力规模', icon: Users, desc: '麾下船员与盟友' },
  { id: 'threatLevel', name: '威胁等级', icon: Skull, desc: '对世界政府的威胁' },
  { id: 'notoriety', name: '世界名声', icon: Star, desc: '伟大航路知名度' },
  { id: 'potential', name: '成长潜力', icon: Zap, desc: '未来的可能性' },
]

const BOUNTY_RANKS = [
  { min: 95, rank: 'SSS', title: '四皇级', color: 'from-amber-400 via-yellow-500 to-orange-500', berry: '40亿+', desc: '君临新世界的海上皇帝' },
  { min: 85, rank: 'SS', title: '大将级', color: 'from-red-500 to-rose-500', berry: '30亿-40亿', desc: '海军本部最高战力' },
  { min: 75, rank: 'S', title: '七武海级', color: 'from-violet-500 to-purple-600', berry: '10亿-30亿', desc: '世界政府认可的狠角色' },
  { min: 60, rank: 'A', title: '超新星级', color: 'from-blue-500 to-indigo-600', berry: '3亿-10亿', desc: '最恶世代，新人王者' },
  { min: 45, rank: 'B', title: '船长级', color: 'from-emerald-500 to-teal-600', berry: '5000万-3亿', desc: '独当一面的海贼团船长' },
  { min: 30, rank: 'C', title: '干部级', color: 'from-cyan-500 to-sky-600', berry: '1000万-5000万', desc: '海贼团核心战力' },
  { min: 15, rank: 'D', title: '船员级', color: 'from-slate-500 to-slate-600', berry: '100万-1000万', desc: '刚出道的新人海贼' },
  { min: 0, rank: 'E', title: '打杂级', color: 'from-gray-500 to-gray-600', berry: '100万以下', desc: '在酒吧吹牛的路人' },
]

const CREW_POSITIONS = [
  { dimension: 'combatPower', position: '战斗员', emoji: '⚔️', note: '草帽团三大战力级别' },
  { dimension: 'influence', position: '副船长', emoji: '👥', note: '深得船员信赖的二把手' },
  { dimension: 'threatLevel', position: '革命军', emoji: '🔥', note: '多拉格看中的人才' },
  { dimension: 'notoriety', position: '新闻人物', emoji: '📰', note: '摩根斯最喜欢的题材' },
  { dimension: 'potential', position: 'D之一族', emoji: '☀️', note: '乔伊波伊的继承人' },
]

const FAMOUS_BOUNTIES = [
  { name: '罗杰', berry: '55亿6480万', score: 99 },
  { name: '白胡子', berry: '50亿4600万', score: 97 },
  { name: '凯多', berry: '46亿1110万', score: 95 },
  { name: '香克斯', berry: '40亿4890万', score: 93 },
  { name: '大妈', berry: '43亿8800万', score: 94 },
  { name: '路飞', berry: '30亿', score: 88 },
  { name: '黑胡子', berry: '39亿9600万', score: 92 },
  { name: '米霍克', berry: '35亿9000万', score: 90 },
]

export default function OnePieceBountyProfessionalReport({ result, mode = 'normal' }: BountyReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['combatPower', 'influence', 'threatLevel', 'notoriety', 'potential'])
  const bountyScore = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  const rankInfo = BOUNTY_RANKS.find(r => bountyScore >= r.min) || BOUNTY_RANKS[BOUNTY_RANKS.length - 1]
  const topDimension = [...dimensions].sort((a, b) => b.score - a.score)[0]
  const bestPosition = CREW_POSITIONS.find(p => p.dimension === topDimension?.name) || CREW_POSITIONS[0]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${rankInfo.color} opacity-90`} />
        <div className="absolute top-[-30%] left-[-20%] w-[80%] h-[100%] rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">🏴‍☠️ 海贼王赏金测评 · 专业报告</span>
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
                <Skull className="w-12 h-12 text-white" />
                <h1 className="text-5xl font-black text-white">{rankInfo.title}</h1>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="px-4 py-1 rounded-full bg-white/20 text-white font-bold text-lg">
                  等级 {rankInfo.rank}
                </span>
                <span className="text-white/80 text-lg">💰 悬赏金 {rankInfo.berry} 贝利</span>
              </div>
              <p className="text-white/70 text-lg">{rankInfo.desc}</p>
            </div>
            <div className="text-center">
              <CircularProgressChart
                score={bountyScore}
                title="综合战力"
                size="large"
                colorScheme={bountyScore > 75 ? 'amber' : bountyScore > 60 ? 'violet' : 'blue'}
                showScore
                animated
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-400" />
          五维悬赏雷达
        </h3>
        <AdvancedBarChart dimensions={dimensions} animated />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Crown className="w-6 h-6 text-amber-400" />
          你的船上位置
        </h3>
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-7xl mb-4">{bestPosition.emoji}</div>
            <div className="text-3xl font-black text-amber-400 mb-2">{bestPosition.position}</div>
            <p className="text-slate-400">{bestPosition.note}</p>
            <p className="text-white/60 text-sm mt-2">
              最强维度: {BOUNTY_DIMENSIONS.find(d => d.id === bestPosition.dimension)?.name} {Math.round(topDimension.score)}分
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          知名人物悬赏对比
        </h3>
        <div className="space-y-3">
          {FAMOUS_BOUNTIES.map((character, i) => {
            const isUser = character.name === '你'
            return (
              <motion.div
                key={character.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="flex items-center gap-4"
              >
                <span className={`w-20 font-bold ${isUser ? 'text-amber-400' : 'text-white'}`}>
                  {character.name}
                </span>
                <div className="flex-1 h-6 rounded-full bg-slate-700/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${character.score}%` }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
                    className={`h-full rounded-full ${
                      character.score >= 95 ? 'bg-gradient-to-r from-amber-400 to-yellow-500' :
                      character.score >= 85 ? 'bg-gradient-to-r from-red-500 to-rose-500' :
                      'bg-gradient-to-r from-blue-500 to-indigo-500'
                    }`}
                  />
                </div>
                <span className="w-32 text-right text-slate-400 font-mono">
                  {character.berry}
                </span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6 text-violet-400" />
          伟大航路冒险建议
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
            <h4 className="font-bold text-emerald-400 mb-2">✅ 你的优势</h4>
            <p className="text-slate-300 text-sm">
              {bountyScore >= 60 
                ? '你已经具备进入新世界的基本实力，在伟大航路前半段难逢敌手。继续积累名声和势力！'
                : '在东海好好练级，先凑齐靠谱的伙伴吧！每个人都是从1500万贝利开始的。'
              }
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20">
            <h4 className="font-bold text-red-400 mb-2">⚠️ 需要注意</h4>
            <p className="text-slate-300 text-sm">
              {bountyScore >= 75 
                ? '海军本部已经注意到你了！大将可能随时出动，小心黄猿的光速踢！'
                : '避免和七武海正面冲突，他们的悬赏虽然看起来不高，但实际战力远超纸面。'
              }
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-amber-400 font-bold text-lg">
            🏴‍☠️ 成为海贼王的男人/女人！ONE PIECE是真实存在的！
          </p>
        </div>
      </motion.div>
    </div>
  )
}
