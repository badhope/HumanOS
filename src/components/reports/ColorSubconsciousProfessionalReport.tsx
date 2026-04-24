import { motion } from 'framer-motion'
import { Palette, Eye, Heart, Brain, Sparkles, Award, Target, Users, Moon, Sun } from 'lucide-react'
import { AdvancedBarChart } from '../charts'
import type { AssessmentResult } from '../../types'
import { safeDimensions, selectByScore } from './utils'

interface ColorSubconsciousReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const COLOR_LANGUAGES = [
  { id: 'red', name: '红色灵魂', hex: '#ef4444', desc: '热情、行动力、生命力，天生的领导者', traits: ['精力旺盛', '好胜心强', '直接坦率', '性感魅力'] },
  { id: 'orange', name: '橙色灵魂', hex: '#f97316', desc: '乐观、社交、创造力，派对的灵魂人物', traits: ['热爱自由', '幽默风趣', '艺术家', '元气满满'] },
  { id: 'yellow', name: '黄色灵魂', hex: '#eab308', desc: '阳光、智慧、希望，照亮他人的小太阳', traits: ['乐观积极', '逻辑清晰', '温暖治愈', '好奇心强'] },
  { id: 'green', name: '绿色灵魂', hex: '#22c55e', desc: '和平、自然、治愈，温柔的调和者', traits: ['热爱和平', '善解人意', '自然纯粹', '守护型'] },
  { id: 'blue', name: '蓝色灵魂', hex: '#3b82f6', desc: '深度、冷静、智慧，安静的思考者', traits: ['深邃内敛', '理性冷静', '忠诚可靠', '精神追求'] },
  { id: 'violet', name: '紫色灵魂', hex: '#a855f7', desc: '神秘、高贵、灵性，天生的魔法师', traits: ['直觉强大', '艺术家', '神秘主义', '完美主义'] },
  { id: 'pink', name: '粉色灵魂', hex: '#ec4899', desc: '温柔、浪漫、爱意，永远的少女心', traits: ['浪漫主义', '温柔善良', '少女心', '相信爱情'] },
  { id: 'black', name: '黑色灵魂', hex: '#6b7280', desc: '神秘、力量、独立，暗夜的君王', traits: ['特立独行', '神秘性感', '反叛精神', '深度思考'] },
  { id: 'white', name: '白色灵魂', hex: '#f8fafc', desc: '纯净、简单、通透，圣洁的天使', traits: ['纯粹简单', '完美主义', '理想主义', '干净通透'] },
]

const COLOR_DIMENSIONS = [
  { name: '感性 vs 理性' },
  { name: '外放 vs 内敛' },
  { name: '理想 vs 现实' },
  { name: '传统 vs 反叛' },
  { name: '精神 vs 物质' },
]

export default function ColorSubconsciousProfessionalReport({ result, mode = 'normal' }: ColorSubconsciousReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['emotional', 'extraversion', 'idealism', 'rebellion', 'spirituality'])
  const matchedColor = selectByScore(dimensions, COLOR_LANGUAGES)
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
        style={{ backgroundColor: matchedColor.hex }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Palette className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">颜色潜意识测评 · 专业报告</span>
            </div>
            {mode === 'professional' && (
              <div className="px-4 py-2 rounded-full bg-white/20 flex items-center gap-2">
                <Award className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">专业版</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-8">
            <div 
              className="w-24 h-24 rounded-3xl shadow-2xl border-4 border-white/30"
              style={{ backgroundColor: matchedColor.hex }}
            />
            <div>
              <h1 className="text-5xl font-black text-white mb-3">
                {matchedColor.name}
              </h1>
              <p className="text-white/80 text-lg max-w-xl mb-4">{matchedColor.desc}</p>
              <div className="flex flex-wrap gap-2">
                {matchedColor.traits.map((t: string, i: number) => (
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
          <Target className="w-6 h-6 text-cyan-400" />
          潜意识五维光谱
        </h3>
        <AdvancedBarChart
          dimensions={dimensions.map((d, i) => ({
            name: COLOR_DIMENSIONS[i]?.name || d.name,
            score: d.score,
            maxScore: 100,
          }))}
          colorScheme="gradient"
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
          <Eye className="w-6 h-6 text-violet-400" />
          灵魂调色盘
        </h3>
        <div className="flex justify-center gap-4 flex-wrap">
          {COLOR_LANGUAGES.map((color, i) => (
            <motion.div
              key={color.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`p-4 rounded-2xl text-center transition-all cursor-pointer hover:scale-105 ${
                color.id === matchedColor.id ? 'ring-2 ring-white/50 scale-110' : ''
              }`}
            >
              <div 
                className="w-14 h-14 rounded-2xl mb-2 shadow-lg mx-auto"
                style={{ backgroundColor: color.hex }}
              />
              <div className="text-white/80 text-xs font-medium">{color.name}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
