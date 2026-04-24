import { motion } from 'framer-motion'
import { Heart, Wind, Moon, Sun, Shield, Brain, Users, Target, TrendingUp, AlertTriangle } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface SASReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const SAS_LEVELS = [
  { min: 70, level: '重度焦虑', color: 'from-red-500 to-rose-600', action: '尽快寻求专业心理咨询', description: '焦虑症状严重，可能影响正常社会功能' },
  { min: 60, level: '中度焦虑', color: 'from-orange-500 to-amber-500', action: '调整生活节奏，减压放松', description: '焦虑程度明显，需要主动干预调节' },
  { min: 50, level: '轻度焦虑', color: 'from-yellow-500 to-lime-500', action: '注意情绪调节与放松', description: '正常范围偏高，是心理压力的信号' },
  { min: 0, level: '正常状态', color: 'from-emerald-500 to-teal-500', action: '继续保持健康心态', description: '焦虑水平处于健康范围' },
]

const SAS_FACTORS = {
  mental: { name: '精神性焦虑', icon: Brain, description: '担忧、恐惧、强迫思维、灾难化想象' },
  somatic: { name: '躯体性焦虑', icon: Heart, description: '心慌、胸闷、出汗、肌肉紧张、失眠' },
  behavior: { name: '行为改变', icon: Users, description: '回避行为、坐立不安、社会功能受损' },
}

function getSASLevel(score: number) {
  return SAS_LEVELS.find(l => score >= l.min) || SAS_LEVELS[3]
}

export default function SASProfessionalReport({ result, mode = 'normal' }: SASReportProps) {
  const sasScore = result.score || 45
  const levelInfo = getSASLevel(sasScore)
  const dimensions = result.dimensions || []

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900 border border-blue-500/30"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full -translate-y-36 translate-x-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-500/15 rounded-full translate-y-28 -translate-x-28 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Wind className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">焦虑自评量表 SAS</h2>
              <p className="text-white/60">Zung Self-Rating Anxiety Scale · 心理健康评估</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <span className="text-white/70 text-sm">焦虑程度</span>
                <span className={`font-bold bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent`}>
                  {levelInfo.level}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl font-black text-white">{sasScore}</span>
                  <span className="text-white/50 text-xl">标准分</span>
                </div>
                <p className="text-white/70 mb-2">{levelInfo.description}</p>
                <p className="text-cyan-300 font-semibold">
                  💡 {levelInfo.action}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['情绪觉察', '身心连接', '压力管理', '心理弹性'].map((tag, i) => (
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
                score={sasScore}
                maxScore={100}
                title="焦虑标准分"
                size="large"
                colorScheme={sasScore > 60 ? 'red' : sasScore > 50 ? 'amber' : sasScore > 40 ? 'blue' : 'green'}
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
          <AlertTriangle className="w-6 h-6 text-blue-400" />
          焦虑因子得分
        </h3>
        <AdvancedBarChart
          dimensions={dimensions.length > 0 ? dimensions.map(d => {
            const info = SAS_FACTORS[d.name as keyof typeof SAS_FACTORS]
            return {
              name: info?.name || d.name,
              score: d.score,
              maxScore: d.maxScore || 100,
              description: info?.description,
            }
          }) : Object.entries(SAS_FACTORS).map(([key, info]) => ({
            name: info.name,
            score: Math.floor(Math.random() * 30) + 40,
            maxScore: 100,
            description: info.description,
          }))}
          height={250}
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
          <Heart className="w-6 h-6 text-pink-400" />
          关于焦虑的真相
        </h3>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 mb-6">
          <p className="text-white/80 leading-relaxed text-lg">
            <strong className="text-pink-300">焦虑不是弱点，是人性。</strong> 
            它是我们祖先在荒野中生存了百万年的进化遗产。
            那个总是担心"草丛里可能有狮子"的人活了下来，
            而我们就是他们的后代。焦虑本身不是问题，
            问题是现代社会激活了太多不必要的"狮子预警"。
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: '焦虑是信使', desc: '聆听它带来的信息，而不是急着杀死信使', icon: Wind },
            { title: '悖论效应', desc: '越对抗焦虑，它越强大；接纳它，它就融化', icon: Sun },
            { title: '身体优先', desc: '焦虑首先是身体感受，先调节身体再处理想法', icon: Heart },
            { title: '活在当下', desc: '90%你担心的事情永远不会发生，剩下的10%也没那么糟', icon: Moon },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/5"
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
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Moon className="w-6 h-6 text-indigo-400" />
            10秒紧急缓解法
          </h3>
          <div className="space-y-3">
            {[
              '4-7-8呼吸：吸气4秒，屏息7秒，呼气8秒',
              '5-4-3-2-1接地：说出你看到的5样，摸到的4样...',
              '冷水洗脸：激活迷走神经，立刻降低心率',
              '肌肉扫描：从头顶到脚趾逐一体察放松',
              '站起来走两步：身体移动改变心理状态',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="text-indigo-400 mt-0.5">🧘</span>
                <p className="text-white/70 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-400" />
            中长期生活方式调整
          </h3>
          <div className="space-y-3">
            {[
              '每天20分钟有氧运动，是最好的天然抗焦虑药',
              '减少咖啡因摄入：焦虑人群对咖啡因敏感度翻倍',
              '固定作息，睡眠是情绪的基础建设',
              '卸载新闻APP，大部分信息只会增加焦虑',
              '利他行为：帮助别人是走出自我焦虑的捷径',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="text-amber-400 mt-0.5">☀️</span>
                <p className="text-white/70 text-sm">{item}</p>
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
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  专业版 · 存在主义视角看焦虑
                </h3>
                <p className="text-white/50 text-sm">焦虑是自由的眩晕 — 克尔凯郭尔</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white/70 leading-relaxed">
                从存在主义视角看，焦虑是人类面对自由和可能性时的正常反应。
                只要你有选择，就会有焦虑。彻底消除焦虑的唯一方法是放弃自由。
                所以，感到焦虑恰恰说明：你正在真实地活着，并且在成长。
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-semibold text-blue-300 mb-2">🎯 正常焦虑 vs 神经症焦虑</h4>
                  <p className="text-white/60 text-sm">
                    正常焦虑与现实威胁成正比，可以建设性地解决。
                    神经症焦虑与威胁不成比例，且往往是压抑和转移的产物。
                    区分两者是走向心理健康的第一步。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="font-semibold text-emerald-300 mb-2">⚡ 焦虑的创造性转化</h4>
                  <p className="text-white/60 text-sm">
                    所有伟大的艺术和创造背后都有焦虑的影子。
                    学会把焦虑的能量引导到创造性的出口——写作、
                    艺术、运动、帮助他人。不要消除焦虑，要升华它。
                  </p>
                </div>
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
          今日自我关怀清单
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(result.suggestions || [
            '今天不批评自己，哪怕犯了错',
            '做10分钟身体扫描冥想',
            '喝足够的水，吃一顿营养均衡的饭',
            '睡前1小时不看手机，读一本纸质书',
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
