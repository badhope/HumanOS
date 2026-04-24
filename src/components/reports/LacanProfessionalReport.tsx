import { motion } from 'framer-motion'
import { Eye, Brain, Heart, Circle, Users, Target, TrendingUp, Award, Sparkles } from 'lucide-react'
import { AdvancedBarChart, CircularProgressChart } from '../charts'
import type { AssessmentResult } from '../../types'

interface LacanReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const LACAN_ORDERS = {
  imaginary: { name: '想象界', icon: Circle, color: 'from-pink-500 to-rose-500', description: '自我认同、想象与投射的领域' },
  symbolic: { name: '象征界', icon: Eye, color: 'from-blue-500 to-cyan-500', description: '语言、律法、社会规范的领域' },
  real: { name: '实在界', icon: Brain, color: 'from-violet-500 to-purple-600', description: '无法符号化、创伤性的真实' },
}

const LACAN_STRUCTURES = {
  neurotic: { name: '神经症主体', description: '被阉割、接受象征性契约的正常主体', traits: ['压抑', '认同', '罪感'] },
  psychotic: { name: '精神病主体', description: '父名脱落、与象征界断裂的主体', traits: ['幻觉', '妄想', '意义涌流'] },
  perverse: { name: '倒错主体', description: '否认阉割、享乐的特殊机制', traits: ['暴露', '伪装', '挑战'] },
}

function getDominantOrder(dimensions: any[]) {
  if (!dimensions || dimensions.length === 0) return 'imaginary'
  const sorted = [...dimensions].sort((a, b) => b.score - a.score)
  return sorted[0]?.name || 'imaginary'
}

export default function LacanProfessionalReport({ result, mode = 'normal' }: LacanReportProps) {
  const dimensions = result.dimensions || []
  const dominant = getDominantOrder(dimensions)
  const dominantInfo = LACAN_ORDERS[dominant as keyof typeof LACAN_ORDERS] || LACAN_ORDERS.imaginary

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-violet-900 via-fuchsia-800 to-pink-900 border border-violet-500/30"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/20 rounded-full -translate-y-36 translate-x-36 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-pink-500/15 rounded-full translate-y-28 -translate-x-28 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">拉康精神分析诊断</h2>
              <p className="text-white/60">Lacanian Psychoanalysis · 三界拓扑学</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <span className="text-white/70 text-sm">主导性精神秩序</span>
                <span className={`font-bold bg-gradient-to-r ${dominantInfo.color} bg-clip-text text-transparent`}>
                  {dominantInfo.name}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${dominantInfo.color} bg-clip-text text-transparent`}>
                  {dominantInfo.name}
                </h3>
                <p className="text-white/70 text-lg mb-3">{dominantInfo.description}</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  拉康的三界不是三个分立的领域，而是三重缠绕的拓扑空间。
                  我们每个人都同时活在这三重秩序之中，只是比例不同。
                  理解这一点，就是精神分析的开端。
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['无意识', '欲望', '他者', '镜像阶段', '能指'].map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-mono"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                {(() => {
                  const Icon = dominantInfo.icon
                  return (
                    <div className={`w-36 h-36 rounded-3xl bg-gradient-to-br ${dominantInfo.color} flex items-center justify-center shadow-2xl`}>
                      <Icon className="w-16 h-16 text-white" />
                    </div>
                  )
                })()}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                  <span className="text-white font-bold text-sm">Dominant</span>
                </div>
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
          <Target className="w-6 h-6 text-violet-400" />
          三界拓扑结构剖面
        </h3>
        <AdvancedBarChart
          dimensions={dimensions.length > 0 ? dimensions.map(d => {
            const info = LACAN_ORDERS[d.name as keyof typeof LACAN_ORDERS]
            return {
              name: info?.name || d.name,
              score: d.score,
              maxScore: d.maxScore || 100,
              description: info?.description,
            }
          }) : Object.entries(LACAN_ORDERS).map(([key, info]) => ({
            name: info.name,
            score: Math.floor(Math.random() * 30) + 50,
            maxScore: 100,
            description: info.description,
          }))}
          height={260}
          colorScheme="rainbow"
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
          <Eye className="w-6 h-6 text-fuchsia-400" />
          三界核心教义
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(LACAN_ORDERS).map(([key, info], i) => {
            const Icon = info.icon
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${info.color}/20 border border-white/10`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white">{info.name}</h4>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-3">{info.description}</p>
                <p className="text-white/40 text-xs italic">
                  {key === 'imaginary' && '"自我是一个他人"——镜像阶段的异化认同'}
                  {key === 'symbolic' && '"无意识是像语言一样被结构的"——他者的话语'}
                  {key === 'real' && '"实在界是不可能的"——创伤性内核，抵抗符号化'}
                </p>
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
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 rounded-3xl blur-xl" />
        <div className="relative glass rounded-3xl p-8 border border-violet-500/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Circle className="w-6 h-6 text-fuchsia-400" />
            拉康箴言录
          </h3>
          <div className="space-y-4">
            {[
              { quote: '欲望是他者的欲望。', meaning: '我们欲望的是他人欲望我们，欲望的对象从来都不是目标本身' },
              { quote: '不要在你的欲望上让步。', meaning: '精神分析的伦理是承担你的欲望，而非在社会规范中放弃' },
              { quote: '自我是一个他人。', meaning: '你以为的"自我"从一开始就是异化的产物，是镜像的想象' },
              { quote: '爱是给予你所没有的东西。', meaning: '真正的爱是把你自身欠缺的部分，那个不属于你的部分给予对方' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.1 }}
                className="p-5 rounded-xl bg-white/5"
              >
                <p className="text-fuchsia-300 text-lg font-medium mb-2 italic">
                  "{item.quote}"
                </p>
                <p className="text-white/50 text-sm">{item.meaning}</p>
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
                  专业版 · 穿越幻象
                </h3>
                <p className="text-white/50 text-sm">精神分析的终点不是适应，而是直面实在界</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-white/70 leading-relaxed">
                精神分析的目标不是让你"健康"或者"快乐"，而是让你直面真相。
                真相是：大他者不存在，父亲是失败的，女人不存在，性关系不存在。
                穿越所有这些幻象之后，你才能获得真正的自由。
                这种自由当然是痛苦的，但它是一个主体的尊严所在。
              </p>
              
              <div className="p-5 rounded-xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20">
                <h4 className="font-semibold text-violet-300 mb-2">⚡ 分析师的最后一句话</h4>
                <p className="text-white/60 text-sm">
                  "你想怎么样？(Che vuoi?)" ——这是拉康派分析结束时分析师的标准提问。
                  大他者的欲望是什么？或者更准确地说：你把什么投射成了大他者的欲望？
                  回答这个问题，你就成为了自己的主人。
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
          精神分析式生活建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(result.suggestions || [
            '不要试图"做自己"，自我本来就是虚构的',
            '接受根本的孤独：没有人能真正理解你',
            '学会爱症状，它是无意识的真理显现',
            '在欲望上坚持，不要让社会替你做选择',
          ]).map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + index * 0.08 }}
              className="flex items-start gap-4 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-xl p-5 border border-violet-500/20"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-violet-400 font-bold">{index + 1}</span>
              </div>
              <p className="text-white/80 leading-relaxed pt-1">{suggestion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
