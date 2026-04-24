import { motion } from 'framer-motion'
import { Heart, Users, Shield, Eye, Sparkles, Award, Compass, Moon, Sun, Star } from 'lucide-react'
import { AdvancedRadarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, selectByScore } from './utils'

interface LoveAnimalReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const LOVE_ANIMALS = [
  { id: 'fox', name: '狐狸系', emoji: '🦊', desc: '聪明灵动，撩人高手，永远保持神秘', color: 'from-orange-500 to-amber-600', traits: ['高段位', '会撩', '独立', '有趣'] },
  { id: 'cat', name: '猫咪系', emoji: '🐱', desc: '时而粘人时而高冷，需要被宠爱', color: 'from-pink-500 to-rose-600', traits: ['傲娇', '粘人', '可爱', '需要陪伴'] },
  { id: 'dog', name: '狗狗系', emoji: '🐕', desc: '忠诚专一，热情直接，安全感满满', color: 'from-amber-500 to-yellow-600', traits: ['忠诚', '粘人', '温暖', '治愈'] },
  { id: 'deer', name: '小鹿系', emoji: '🦌', desc: '温柔敏感，容易受惊，需要被保护', color: 'from-violet-500 to-purple-600', traits: ['温柔', '敏感', '害羞', '文艺'] },
  { id: 'wolf', name: '狼系', emoji: '🐺', desc: '霸道占有欲强，一生只认一个人', color: 'from-slate-500 to-zinc-600', traits: ['霸道', '专一', '占有欲', '保护欲'] },
  { id: 'bunny', name: '兔子系', emoji: '🐰', desc: '软萌可爱，纯真无害，让人想呵护', color: 'from-pink-400 to-fuchsia-600', traits: ['软萌', '纯真', '胆小', '可爱'] },
  { id: 'lion', name: '狮子系', emoji: '🦁', desc: '王者气场，光芒万丈，带你躺赢', color: 'from-amber-500 to-orange-600', traits: ['王者', '自信', '强大', '护短'] },
  { id: 'owl', name: '猫头鹰系', emoji: '🦉', desc: '理智清醒，情感疏离，灵魂伴侣', color: 'from-blue-500 to-indigo-600', traits: ['理智', '深刻', '独立', '灵魂共鸣'] },
  { id: 'swan', name: '天鹅系', emoji: '🦢', desc: '优雅骄傲，一生一世一双人', color: 'from-cyan-500 to-blue-600', traits: ['优雅', '骄傲', '专一', '完美主义'] },
  { id: 'bear', name: '熊熊系', emoji: '🐻', desc: '憨厚可靠，抱抱最治愈了', color: 'from-amber-700 to-orange-800', traits: ['可靠', '温柔', '会照顾人', '吃货'] },
  { id: 'penguin', name: '企鹅系', emoji: '🐧', desc: '慢热笨拙，认定了就是一辈子', color: 'from-slate-600 to-blue-700', traits: ['慢热', '专一', '笨拙', '长情'] },
  { id: 'dolphin', name: '海豚系', emoji: '🐬', desc: '阳光开朗，永远有趣，治愈心灵', color: 'from-blue-400 to-cyan-500', traits: ['阳光', '有趣', '治愈', '自由'] },
]

const LOVE_DIMENSIONS = [
  { name: '依赖 vs 独立' },
  { name: '主动 vs 被动' },
  { name: '热烈 vs 克制' },
  { name: '感性 vs 理性' },
  { name: '理想 vs 现实' },
]

export default function LoveAnimalProfessionalReport({ result, mode = 'normal' }: LoveAnimalReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['dependency', 'initiative', 'passion', 'emotional', 'idealism'])
  const matchedAnimal = selectByScore(dimensions, LOVE_ANIMALS)
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${matchedAnimal.color} opacity-90`} />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">ABM 爱情动物测评 · 专业报告</span>
            </div>
            {mode === 'professional' && (
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center gap-2">
                <Award className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">专业版</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-8xl">{matchedAnimal.emoji}</div>
            <div>
              <h1 className="text-5xl font-black text-white mb-3">
                {matchedAnimal.name}恋人
              </h1>
              <p className="text-white/80 text-lg max-w-xl mb-4">{matchedAnimal.desc}</p>
              <div className="flex flex-wrap gap-2">
                {matchedAnimal.traits.map((t: string, i: number) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/15 text-white/80 text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6 text-rose-400" />
          爱情五维倾向
        </h3>
        <AdvancedRadarChart
          dimensions={dimensions.map((d, i) => ({
            name: LOVE_DIMENSIONS[i]?.name || d.name,
            score: d.score,
            maxScore: 100,
          }))}
          animated
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-pink-400" />
          恋爱动物园全景
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {LOVE_ANIMALS.map((animal, i) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`p-4 rounded-2xl text-center transition-all ${
                animal.id === matchedAnimal.id 
                  ? 'bg-gradient-to-br from-pink-500/30 to-rose-500/30 border-2 border-pink-400/50 scale-105' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="text-4xl mb-2">{animal.emoji}</div>
              <div className="text-white/80 text-sm font-medium">{animal.name}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
