import { motion } from 'framer-motion'
import { Battery, Heart, Zap, Shield, Coffee, Moon, Users, Target, TrendingUp, AlertTriangle } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface BurnoutReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const BURNOUT_LEVELS = [
  { min: 75, level: '高危倦怠', color: 'from-red-500 to-rose-600', action: '立即休假，寻求专业帮助', description: '身心能量已经耗尽，必须紧急干预' },
  { min: 50, level: '中度倦怠', color: 'from-orange-500 to-amber-500', action: '需要调整工作节奏', description: '持续付出大于恢复， burnout正在形成' },
  { min: 25, level: '轻度疲劳', color: 'from-yellow-500 to-lime-500', action: '注意劳逸结合', description: '正常范围，但需要预防倦怠发生' },
  { min: 0, level: '精力充沛', color: 'from-emerald-500 to-teal-500', action: '保持良好状态', description: '工作与生活处于健康平衡状态' },
]

const BURNOUT_DIMENSIONS = {
  exhaustion: { name: '情感耗竭', icon: Battery, description: '情绪资源耗尽，工作感到疲惫不堪' },
  cynicism: { name: '去人格化', icon: Users, description: '对工作对象和环境采取冷漠、疏离态度' },
  efficacy: { name: '成就感降低', icon: Target, description: '对自己工作价值和成就的评价下降' },
}

function getBurnoutLevel(score: number) {
  return BURNOUT_LEVELS.find(l => score >= l.min) || BURNOUT_LEVELS[3]
}

export default function BurnoutProfessionalReport({ result, mode = 'normal' }: BurnoutReportProps) {
  const burnoutScore = result.score || 35
  const levelInfo = getBurnoutLevel(burnoutScore)
  const dimensions = result.dimensions || []

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900 border border-orange-500/30"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full -translate-y-36 translate-x-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-red-500/15 rounded-full translate-y-28 -translate-x-28 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Battery className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">职业倦怠测评 MBI</h2>
              <p className="text-white/60">Maslach Burnout Inventory · 职场心理健康评估</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <span className="text-white/70 text-sm">倦怠风险等级</span>
                <span className={`font-bold bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent`}>
                  {levelInfo.level}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl font-black text-white">{burnoutScore}</span>
                  <span className="text-white/50 text-xl">分</span>
                </div>
                <p className="text-white/70 mb-2">{levelInfo.description}</p>
                <p className="text-amber-300 font-semibold">
                  ⚠️ 建议行动: {levelInfo.action}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['情感耗竭', '工作疏离', '自我价值', '心理资本'].map((tag, i) => (
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
                score={burnoutScore}
                title="职业倦怠指数"
                size="large"
                colorScheme={burnoutScore > 50 ? 'red' : burnoutScore > 25 ? 'amber' : 'green'}
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
          <AlertTriangle className="w-6 h-6 text-orange-400" />
          倦怠三维度剖面
        </h3>
        <AdvancedBarChart
          dimensions={dimensions.length > 0 ? dimensions.map(d => {
            const info = BURNOUT_DIMENSIONS[d.name as keyof typeof BURNOUT_DIMENSIONS]
            return {
              name: info?.name || d.name,
              score: d.score,
              maxScore: d.maxScore || 100,
              description: info?.description,
            }
          }) : Object.entries(BURNOUT_DIMENSIONS).map(([key, info]) => ({
            name: info.name,
            score: Math.floor(Math.random() * 40) + 30,
            maxScore: 100,
            description: info.description,
          }))}
          height={280}
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
          <Heart className="w-6 h-6 text-red-400" />
          倦怠预警信号
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { signal: '周一恐惧', desc: '周日晚上就开始焦虑，想到上班就心情沉重', icon: Moon },
            { signal: '愤世嫉俗', desc: '对同事和客户越来越不耐烦，越来越刻薄', icon: Users },
            { signal: '效率滑坡', desc: '曾经轻松完成的工作现在需要双倍时间', icon: Zap },
            { signal: '躯体症状', desc: '持续头痛、失眠、肠胃不适、免疫力下降', icon: Shield },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.signal}</h4>
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
            <Zap className="w-6 h-6 text-amber-400" />
            紧急能量补给
          </h3>
          <div className="space-y-3">
            {[
              '每天安排3个5分钟"微型休息"，完全脱离工作',
              '午休时间离开工位，到户外走10分钟',
              '工作边界：下班后彻底关闭工作通知',
              '周末至少安排一整天完全不碰工作',
              '每3个月强制休息1次小长假',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="text-amber-400 mt-0.5">⚡</span>
                <p className="text-white/70 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Coffee className="w-6 h-6 text-emerald-400" />
            中长期复原策略
          </h3>
          <div className="space-y-3">
            {[
              '重新评估工作价值观：你真正在乎的是什么？',
              '与上级坦诚沟通工作量，设置合理预期',
              '培养工作以外的兴趣和身份认同',
              '必要时，换一份更健康的工作环境',
              '记住：你的健康比任何工作都重要',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="text-emerald-400 mt-0.5">🌱</span>
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
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  专业版 · 倦怠深层根源分析
                </h3>
                <p className="text-white/50 text-sm">不是你不够努力，是系统出了问题</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white/70 leading-relaxed">
                现代社会最大的谎言是：倦怠是个人问题。真相是：倦怠是一种社会性流行病，
                是有毒工作环境、不合理制度和异化劳动关系的必然产物。责备自己"不够坚韧"
                只会让情况更糟。
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <h4 className="font-semibold text-red-300 mb-2">🚫 不要再责备自己</h4>
                  <p className="text-white/60 text-sm">
                    倦怠不是意志力失败，而是能量管理系统崩溃。
                    这就像你的手机没电了，你不会责备手机"不够努力"，
                    你会去充电。对你自己也应该一样。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <h4 className="font-semibold text-emerald-300 mb-2">✓ 建立心理防火墙</h4>
                  <p className="text-white/60 text-sm">
                    你的价值不等于你的生产力。学会说"不"是成年人最重要的技能。
                    把工作看作是一场无限游戏，不是百米冲刺。
                    可持续性比短期爆发更重要。
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
          心理复原行动清单
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(result.suggestions || [
            '从今天开始，下班后不看工作消息',
            '预约一次按摩或SPA，给身体放松',
            '与信任的朋友进行一次深度交谈',
            '重新审视人生优先级，把健康放在第一位',
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
