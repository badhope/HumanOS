import { motion } from 'framer-motion'
import { 
  Brain, 
  Target, 
  Heart, 
  Zap, 
  Shield, 
  Users, 
  Briefcase, 
  TrendingUp, 
  AlertTriangle,
  Award,
  Sparkles,
  Compass,
  Lock,
  Sun,
  Moon
} from 'lucide-react'
import { AdvancedRadarChart, AdvancedBarChart } from '../charts'
import { MBTI_DIMENSION_NAMES, MBTI_TYPES, MBTI_DIMENSION_BANDS, EXTENDED_MBTI_TYPES } from '@data/professional/mbti/mbti-common'
import type { AssessmentResult } from '../../types'

interface MBTIReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const MBTI_COLORS = {
  'INTJ': 'from-violet-500 to-purple-600',
  'INTP': 'from-blue-500 to-cyan-600',
  'ENTJ': 'from-amber-500 to-orange-600',
  'ENTP': 'from-yellow-500 to-amber-600',
  'INFJ': 'from-emerald-500 to-teal-600',
  'INFP': 'from-pink-500 to-rose-600',
  'ENFJ': 'from-red-500 to-pink-600',
  'ENFP': 'from-fuchsia-500 to-pink-600',
  'ISTJ': 'from-slate-500 to-gray-600',
  'ISFJ': 'from-green-500 to-emerald-600',
  'ESTJ': 'from-zinc-500 to-stone-600',
  'ESFJ': 'from-lime-500 to-green-600',
  'ISTP': 'from-cyan-500 to-blue-600',
  'ISFP': 'from-rose-500 to-pink-600',
  'ESTP': 'from-orange-500 to-red-600',
  'ESFP': 'from-sky-500 to-blue-600',
}

const COGNITIVE_FUNCTIONS: Record<string, { name: string; description: string; position: string }[]> = {
  'INTJ': [
    { name: 'Ni - 内倾直觉', description: '洞察模式与未来可能性，深层意义感知', position: '主导功能' },
    { name: 'Te - 外倾思考', description: '构建逻辑框架，高效执行与组织', position: '辅助功能' },
    { name: 'Fi - 内倾情感', description: '内在价值观与情感深度', position: '第三功能' },
    { name: 'Se - 外倾感觉', description: '体验当下，感知外部世界细节', position: '劣势功能' },
  ],
  'INTP': [
    { name: 'Ti - 内倾思考', description: '深度逻辑分析，构建内部思维框架', position: '主导功能' },
    { name: 'Ne - 外倾直觉', description: '探索可能性，连接看似无关的想法', position: '辅助功能' },
    { name: 'Si - 内倾感觉', description: '存储和比较过去的经验数据', position: '第三功能' },
    { name: 'Fe - 外倾情感', description: '连接他人，创造和谐的人际环境', position: '劣势功能' },
  ],
  'ENTJ': [
    { name: 'Te - 外倾思考', description: '战略执行，组织和高效达成目标', position: '主导功能' },
    { name: 'Ni - 内倾直觉', description: '预见未来，洞察深层模式', position: '辅助功能' },
    { name: 'Se - 外倾感觉', description: '活在当下，采取果断行动', position: '第三功能' },
    { name: 'Fi - 内倾情感', description: '个人价值观和内在情感', position: '劣势功能' },
  ],
  'ENTP': [
    { name: 'Ne - 外倾直觉', description: '创意迸发，探索无限可能性', position: '主导功能' },
    { name: 'Ti - 内倾思考', description: '逻辑分析，拆解复杂问题', position: '辅助功能' },
    { name: 'Fe - 外倾情感', description: '人际连接，魅力型沟通', position: '第三功能' },
    { name: 'Si - 内倾感觉', description: '细节记忆，传统与经验', position: '劣势功能' },
  ],
  'INFJ': [
    { name: 'Ni - 内倾直觉', description: '深刻洞察力，预见未来', position: '主导功能' },
    { name: 'Fe - 外倾情感', description: '共情连接，帮助他人成长', position: '辅助功能' },
    { name: 'Ti - 内倾思考', description: '框架构建，逻辑分析', position: '第三功能' },
    { name: 'Se - 外倾感觉', description: '感官体验，活在当下', position: '劣势功能' },
  ],
  'INFP': [
    { name: 'Fi - 内倾情感', description: '核心价值观，真实自我表达', position: '主导功能' },
    { name: 'Ne - 外倾直觉', description: '想象力，可能性探索', position: '辅助功能' },
    { name: 'Si - 内倾感觉', description: '深度记忆，个人历史', position: '第三功能' },
    { name: 'Te - 外倾思考', description: '效率执行，结构组织', position: '劣势功能' },
  ],
  'ENFJ': [
    { name: 'Fe - 外倾情感', description: '人际和谐，赋能他人', position: '主导功能' },
    { name: 'Ni - 内倾直觉', description: '洞察人心，意义追寻', position: '辅助功能' },
    { name: 'Se - 外倾感觉', description: '环境感知，审美鉴赏', position: '第三功能' },
    { name: 'Ti - 内倾思考', description: '逻辑框架，系统分析', position: '劣势功能' },
  ],
  'ENFP': [
    { name: 'Ne - 外倾直觉', description: '热情创造，灵感迸发', position: '主导功能' },
    { name: 'Fi - 内倾情感', description: '价值驱动，真实表达', position: '辅助功能' },
    { name: 'Te - 外倾思考', description: '项目推进，目标达成', position: '第三功能' },
    { name: 'Si - 内倾感觉', description: '细节关注，传统尊重', position: '劣势功能' },
  ],
  'ISTJ': [
    { name: 'Si - 内倾感觉', description: '可靠记忆，传统守护', position: '主导功能' },
    { name: 'Te - 外倾思考', description: '流程优化，制度执行', position: '辅助功能' },
    { name: 'Fi - 内倾情感', description: '忠诚坚持，内在价值', position: '第三功能' },
    { name: 'Ne - 外倾直觉', description: '创新思维，模式识别', position: '劣势功能' },
  ],
  'ISFJ': [
    { name: 'Si - 内倾感觉', description: '细节记忆，责任担当', position: '主导功能' },
    { name: 'Fe - 外倾情感', description: '温暖关怀，服务奉献', position: '辅助功能' },
    { name: 'Ti - 内倾思考', description: '问题分析，务实解决', position: '第三功能' },
    { name: 'Ne - 外倾直觉', description: '创意想象，未来展望', position: '劣势功能' },
  ],
  'ESTJ': [
    { name: 'Te - 外倾思考', description: '秩序建立，效率管理', position: '主导功能' },
    { name: 'Si - 内倾感觉', description: '传统遵循，细节执行', position: '辅助功能' },
    { name: 'Ne - 外倾直觉', description: '进步构想，改进机会', position: '第三功能' },
    { name: 'Fi - 内倾情感', description: '个人信念，忠诚坚持', position: '劣势功能' },
  ],
  'ESFJ': [
    { name: 'Fe - 外倾情感', description: '社交连接，和谐创造', position: '主导功能' },
    { name: 'Si - 内倾感觉', description: '传统珍视，记忆宝库', position: '辅助功能' },
    { name: 'Ne - 外倾直觉', description: '创新探索，新可能性', position: '第三功能' },
    { name: 'Ti - 内倾思考', description: '逻辑分析，客观决策', position: '劣势功能' },
  ],
  'ISTP': [
    { name: 'Ti - 内倾思考', description: '问题解决，机械天赋', position: '主导功能' },
    { name: 'Se - 外倾感觉', description: '冒险精神，感官敏锐', position: '辅助功能' },
    { name: 'Ni - 内倾直觉', description: '洞见感知，本能行动', position: '第三功能' },
    { name: 'Fe - 外倾情感', description: '群体和谐，人际温暖', position: '劣势功能' },
  ],
  'ISFP': [
    { name: 'Fi - 内倾情感', description: '美学敏感，价值守护', position: '主导功能' },
    { name: 'Se - 外倾感觉', description: '艺术表达，体验当下', position: '辅助功能' },
    { name: 'Ni - 内倾直觉', description: '深度洞察，意义感知', position: '第三功能' },
    { name: 'Te - 外倾思考', description: '执行推进，效率追求', position: '劣势功能' },
  ],
  'ESTP': [
    { name: 'Se - 外倾感觉', description: '行动导向，刺激追求', position: '主导功能' },
    { name: 'Ti - 内倾思考', description: '务实分析，问题解决', position: '辅助功能' },
    { name: 'Fe - 外倾情感', description: '魅力社交，人际影响', position: '第三功能' },
    { name: 'Ni - 内倾直觉', description: '未来愿景，模式识别', position: '劣势功能' },
  ],
  'ESFP': [
    { name: 'Se - 外倾感觉', description: '生活热爱，表演天赋', position: '主导功能' },
    { name: 'Fi - 内倾情感', description: '真诚善良，价值驱动', position: '辅助功能' },
    { name: 'Te - 外倾思考', description: '资源调度，现场指挥', position: '第三功能' },
    { name: 'Ni - 内倾直觉', description: '深层洞察，象征理解', position: '劣势功能' },
  ],
}

const getDimensionBand = (dimension: string, score: number) => {
  const bands = MBTI_DIMENSION_BANDS[dimension as keyof typeof MBTI_DIMENSION_BANDS]
  if (!bands) return { band: '未知', description: '' }
  return bands.find(b => score >= b.range[0] && score <= b.range[1]) || bands[5]
}

export default function MBTIProfessionalReport({ result, mode = 'normal' }: MBTIReportProps) {
  const typeCode = result.typeCode || 'INTJ'
  const baseType = typeCode.substring(0, 4)
  const typeInfo = MBTI_TYPES[baseType] || MBTI_TYPES['INTJ']
  const extendedTypeInfo = EXTENDED_MBTI_TYPES[typeCode] || EXTENDED_MBTI_TYPES['INTJ-A']
  const colorClass = MBTI_COLORS[baseType as keyof typeof MBTI_COLORS] || MBTI_COLORS['INTJ']
  const functions = COGNITIVE_FUNCTIONS[baseType] || COGNITIVE_FUNCTIONS['INTJ']
  const dimensions = result.dimensions || []

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${colorClass}`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-2"
              >
                <span className="px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                  {mode === 'professional' ? '专业版报告' : mode === 'advanced' ? '高级版报告' : '标准版报告'}
                </span>
                <span className="px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                  {extendedTypeInfo.archetype}
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-white mb-2"
              >
                {typeCode} · {typeInfo.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-lg"
              >
                {extendedTypeInfo.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 mt-4"
              >
                {typeInfo.nicknames.map((nickname, i) => (
                  <span key={i} className="px-3 py-1 bg-white/15 rounded-full text-white/80 text-sm">
                    「{nickname}」
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AdvancedRadarChart
          dimensions={dimensions.map(d => ({
            name: MBTI_DIMENSION_NAMES[d.name] || d.name,
            score: d.score,
            maxScore: 100,
            description: d.description,
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
          <Compass className="w-6 h-6 text-violet-400" />
          维度深度解析 · 5大倾向
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dimensions.map((dim, index) => {
            const bandInfo = getDimensionBand(dim.name, dim.score)
            return (
              <motion.div
                key={dim.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.08 }}
                className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-xl p-5 border border-violet-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold text-lg">{dim.name}</span>
                  <span className="text-violet-300 text-2xl font-bold">{dim.score}%</span>
                </div>
                <div className="text-violet-200 text-sm font-medium mb-2">
                  {bandInfo.band}
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  {bandInfo.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-cyan-400" />
          荣格八维认知功能栈
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {functions.map((fn, index) => (
            <motion.div
              key={fn.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + index * 0.1 }}
              className={`relative rounded-xl p-6 border ${
                index === 0 ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30' :
                index === 1 ? 'bg-gradient-to-br from-blue-500/15 to-sky-500/15 border-blue-500/30' :
                index === 2 ? 'bg-gradient-to-br from-slate-500/15 to-gray-500/15 border-slate-500/30' :
                'bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  index === 0 ? 'bg-cyan-500 text-white' :
                  index === 1 ? 'bg-blue-500 text-white' :
                  index === 2 ? 'bg-slate-500 text-white' :
                  'bg-red-500/70 text-white'
                }`}>
                  {fn.position}
                </span>
                <span className="text-white font-bold text-lg">{fn.name}</span>
              </div>
              <p className="text-white/70 leading-relaxed">{fn.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-green-400" />
            核心天赋优势
          </h3>
          <ul className="space-y-4">
            {result.strengths?.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 mt-2 flex-shrink-0" />
                <span className="text-white/80 leading-relaxed">{strength}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            潜在成长盲区
          </h3>
          <ul className="space-y-4">
            {result.weaknesses?.map((weakness, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 mt-2 flex-shrink-0" />
                <span className="text-white/80 leading-relaxed">{weakness}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-400" />
          职业发展指南
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {result.careers?.map((career, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + index * 0.1 }}
              className="bg-gradient-to-br from-blue-500/15 to-indigo-500/15 rounded-xl p-5 border border-blue-500/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">推荐方向 {index + 1}</span>
              </div>
              <p className="text-white/80">{career}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          个性化成长建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {result.suggestions?.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75 + index * 0.08 }}
              className="flex items-start gap-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border border-emerald-500/20"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400 font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-white/80 leading-relaxed pt-0.5">{suggestion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {mode === 'professional' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-3xl p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-amber-400" />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              专业版专属 · 亲密关系深度指南
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="text-white font-semibold">最佳匹配类型</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['ENFP', 'ENFJ', 'INFP', 'INFJ'].map(type => (
                  <span key={type} className="px-3 py-1 bg-pink-500/20 rounded-lg text-pink-300 text-sm font-medium">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-semibold">沟通风格要点</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                作为{typeInfo.name}，您偏好深度有意义的对话。在关系中请记得：
                1) 主动分享您的内心想法，不要期望对方能读懂您的心思
                2) 重视日常的情感表达，即使是小事也要回应
                3) 安排专门的高质量共处时间
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
