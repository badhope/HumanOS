import { motion } from 'framer-motion'
import { Brain, Heart, Users, Shield, Target, Award, TrendingUp, Compass, Zap, Layers } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface GMAReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const GMA_LEVELS = [
  { min: 85, level: '高度整合成熟', color: 'from-emerald-500 to-teal-500', description: '展现出卓越的心理整合能力，能从容应对复杂人生挑战' },
  { min: 70, level: '发展中成熟', color: 'from-blue-500 to-cyan-500', description: '具备良好的心理功能，大部分情境下表现成熟' },
  { min: 55, level: '过渡整合期', color: 'from-amber-500 to-yellow-500', description: '正在从半成熟向成熟过渡，某些领域还在发展' },
  { min: 40, level: '自我探索期', color: 'from-orange-500 to-amber-500', description: '正在建立自我认同，处于关键的成长期' },
  { min: 0, level: '分化初期', color: 'from-pink-500 to-rose-500', description: '自我与他人的边界正在形成中，这是成长的必经阶段' },
]

const GMA_DIMENSIONS = {
  affect: { name: '情感成熟', icon: Heart, description: '情绪调节、共情能力、情感深度' },
  cognition: { name: '认知成熟', icon: Brain, description: '批判性思维、认知复杂度、现实检验' },
  relation: { name: '关系成熟', icon: Users, description: '边界感、客体恒常性、亲密能力' },
  value: { name: '价值整合', icon: Layers, description: '价值观内化、道德发展、意义建构' },
}

function getGMALevel(score: number) {
  return GMA_LEVELS.find(l => score >= l.min) || GMA_LEVELS[4]
}

export default function GMAProfessionalReport({ result, mode = 'normal' }: GMAReportProps) {
  const gmaScore = result.score || 65
  const levelInfo = getGMALevel(gmaScore)
  const dimensions = result.dimensions || []

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-emerald-900 via-cyan-800 to-blue-900 border border-emerald-500/30"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/20 rounded-full -translate-y-36 translate-x-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-500/15 rounded-full translate-y-28 -translate-x-28 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">心理成熟度评估 GMA</h2>
              <p className="text-white/60">Psychological Maturity Assessment · 人格整合水平</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <span className="text-white/70 text-sm">整合发展阶段</span>
                <span className={`font-bold bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent`}>
                  {levelInfo.level}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl font-black text-white">{gmaScore}</span>
                  <span className="text-white/50 text-xl">分</span>
                </div>
                <p className="text-white/70 mb-2">{levelInfo.description}</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  心理成熟不是变得冷漠和"想开了"，而是能够容纳矛盾，
                  在复杂和不确定中依然能够去爱、去创造、去承担责任。
                  这是一个终生的发展过程。
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['情绪整合', '认知复杂度', '客体恒常', '自我分化'].map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <CircularProgressChart
                score={gmaScore}
                title="心理成熟度"
                size="large"
                colorScheme="green"
                showScore
                animated
              />
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
          <Target className="w-6 h-6 text-emerald-400" />
          四维度成熟度剖面
        </h3>
        <AdvancedBarChart
          dimensions={dimensions.length > 0 ? dimensions.map(d => {
            const info = GMA_DIMENSIONS[d.name as keyof typeof GMA_DIMENSIONS]
            return {
              name: info?.name || d.name,
              score: d.score,
              maxScore: d.maxScore || 100,
              description: info?.description,
            }
          }) : Object.entries(GMA_DIMENSIONS).map(([key, info]) => ({
            name: info.name,
            score: Math.floor(Math.random() * 30) + 55,
            maxScore: 100,
            description: info.description,
          }))}
          height={300}
          colorScheme="gradient"
          animated
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-cyan-400" />
          成熟的标志
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: '能接纳矛盾',
              desc: '不再非黑即白，能理解同一个人可以同时既好又坏，同一件事可以同时既对也错',
              icon: Brain,
            },
            {
              title: '能承受不确定',
              desc: '不需要立刻有答案，能在不知道结果的情况下依然行动和投入',
              icon: Shield,
            },
            {
              title: '能为自己负责',
              desc: '不再怪罪原生家庭和环境，承认选择的自由和随之而来的重量',
              icon: Target,
            },
            {
              title: '客体恒常性',
              desc: '爱人暂时的负面反应不会摧毁你对关系的基本安全感',
              icon: Heart,
            },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 rounded-3xl blur-xl" />
        <div className="relative glass rounded-3xl p-8 border border-amber-500/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-400" />
            不成熟的三个典型陷阱
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                trap: '应该暴政',
                desc: '坚信世界"应该"如何运作，现实不符合想象时产生巨大的道德义愤',
                emoji: '⚖️',
              },
              {
                trap: '全能幻想',
                desc: '相信只要足够努力就可以控制一切，无法接受自身的有限性',
                emoji: '⚡',
              },
              {
                trap: '救世主情结',
                desc: '通过拯救别人来逃避面对自己的问题和空虚',
                emoji: '✨',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.1 }}
                className="p-5 rounded-xl bg-white/5"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h4 className="font-semibold text-amber-300 mb-2">{item.trap}</h4>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {mode === 'professional' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-3xl blur-xl" />
          <div className="relative glass rounded-3xl p-8 border border-amber-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  专业版 · 成熟的黑暗面
                </h3>
                <p className="text-white/50 text-sm">成熟不是变成完美的人，而是成为完整的人</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white/70 leading-relaxed">
                大众话语中的"成熟"往往是社会规训的产物：变得圆滑、隐忍、情绪不外露、
                接受现实。但真正的心理成熟恰恰相反：它是解放，是从自动化的反应模式中解脱，
                是获得真正的选择自由。成熟的人可以愤怒，可以脆弱，可以混乱——
                但这一切都是有意识的选择，而不是无意识的强迫性重复。
              </p>
              
              <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                <h4 className="font-semibold text-emerald-300 mb-2">🌗 整合阴影</h4>
                <p className="text-white/60 text-sm">
                  真正成熟的标志是你能接纳自己的阴影。你不再需要做一个"好人"，
                  你可以既善良又残忍，既慷慨又自私，既温暖又冷漠。
                  完整比完美重要。接纳自己所有的面向，包括那些黑暗的部分，
                  才是真正的心理整合。
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          人格整合修习路径
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(result.suggestions || [
            '每周进行15分钟的书写，诚实面对你不愿意承认的感受',
            '故意做一些"不应该"的小事，打破超我的暴政',
            '练习：当别人让你不舒服时，晚一小时再反应',
            '接受不完美：主动让事情做到"足够好"而非完美',
          ]).map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + index * 0.08 }}
              className="flex items-start gap-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-5 border border-emerald-500/20"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 font-bold">{index + 1}</span>
              </div>
              <p className="text-white/80 leading-relaxed pt-1">{suggestion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
