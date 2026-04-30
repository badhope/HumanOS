import { motion } from 'framer-motion'
import { Brain, Lightbulb, BookOpen, TrendingUp, Target, ChevronRight, Sparkles, Heart, Star, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getKnowledgeForResult } from '@data/knowledge-base'

export function KnowledgeInjector({ assessmentId, result }: { assessmentId: string; result?: Record<string, any> | null }) {
  if (!assessmentId || !result) {
    return null
  }

  try {
    const knowledge = getKnowledgeForResult(assessmentId, result)

    if (knowledge) {
      return (
        <>
          <UniversalKnowledgePanel knowledge={knowledge} />
          <UniversalTrainingPanel knowledge={knowledge} />
        </>
      )
    }
  } catch (e) {
    console.warn('知识库加载失败:', e)
  }

  return <DefaultTrainingRecommendations assessmentId={assessmentId} />
}

function UniversalKnowledgePanel({ knowledge }: { 
  knowledge: { type: string; profile: any } 
}) {
  const { type, profile } = knowledge
  
  const colorMap: Record<string, any> = {
    'mbti': {
      gradient: 'from-violet-600/10 via-indigo-600/10 to-blue-600/10',
      border: 'border-violet-500/20',
      accent: 'text-violet-400',
      bgAccent: 'bg-violet-500/20',
      icon: Brain
    },
    'learning-style': {
      gradient: 'from-emerald-600/10 via-teal-600/10 to-cyan-600/10',
      border: 'border-emerald-500/20',
      accent: 'text-emerald-400',
      bgAccent: 'bg-emerald-500/20',
      icon: Lightbulb
    }
  }
  
  const colors = colorMap[type] || {
    gradient: 'from-slate-600/10',
    border: 'border-slate-500/20',
    accent: 'text-slate-400',
    bgAccent: 'bg-slate-500/20',
    icon: BookOpen
  }
  
  const Icon = colors.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="mt-16 space-y-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${colors.gradient} border ${colors.border}`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="shrink-0">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-500 flex items-center justify-center shadow-2xl`}>
                <Icon className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h2 className={`text-3xl font-bold ${colors.accent}`}>
                  {(profile as any).code || ''} - {(profile as any).name || '深度解析'}
                </h2>
                {(profile as any).nickname && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bgAccent} ${colors.accent} border ${colors.border}`}>
                    {(profile as any).nickname}
                  </span>
                )}
                {(profile as any).population && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    人群占比: {(profile as any).population}
                  </span>
                )}
              </div>
              
              <p className="text-white/80 leading-relaxed text-lg">
                {(profile as any).coreDescription}
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {(profile as any).coreMotivation && (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  核心驱动力
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {(profile as any).coreMotivation}
                </p>
              </div>
            )}
            
            {(profile as any).coreFear && (
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  深层恐惧
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {(profile as any).coreFear}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
            ✨ 核心优势
          </h3>
          <div className="space-y-2">
            {((profile as any).coreStrengths || (profile as any).strengths || []).map((s: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-emerald-400 mt-0.5">✓</span>
                {s}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
            🎯 成长领域
          </h3>
          <div className="space-y-2">
            {((profile as any).learningChallenges || (profile as any).growthAreas || []).map((g: string, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-amber-400 mt-0.5">→</span>
                {g}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function UniversalTrainingPanel({ knowledge }: { 
  knowledge: { type: string; profile: any } 
}) {
  const navigate = useNavigate()
  const { profile } = knowledge

  const plans = (profile as any).developmentPaths || 
                (profile as any).developmentPlan || 
                (profile as any).studyTips || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.15 }}
      className="mt-12"
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/20 via-pink-600/20 to-amber-600/20 border border-violet-500/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="absolute top-0 left-1/3 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl" />
        
        <div className="relative p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-violet-400" />
                定制化成长训练方案
              </h2>
              <p className="text-white/60">
                基于你的测评结果定制的可执行练习方案，科学提升个人能力
              </p>
            </div>
            
            <motion.button
              onClick={() => navigate('/app/training')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              💪 进入完整训练中心
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {plans.slice(0, 4).map((path: any, pathIndex: number) => (
              <div key={pathIndex} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-violet-400" />
                  {path.phase || path.category || path.focus || `训练阶段 ${pathIndex + 1}`}
                </h3>
                
                <div className="space-y-3">
                  {(path.practices || []).slice(0, 4).map((practice: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5 text-violet-300 text-xs font-bold group-hover:bg-violet-500/30 transition-colors">
                        {i + 1}
                      </div>
                      <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                        {practice}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DefaultTrainingRecommendations({ assessmentId }: { assessmentId?: string }) {
  const navigate = useNavigate()
  
  const recommendations = [
    {
      id: 1,
      title: '专注力提升训练',
      description: '21天冥想训练计划，提升深度工作能力',
      match: 87,
      icon: Brain,
      color: 'from-violet-500 to-indigo-500'
    },
    {
      id: 2,
      title: '高效学习方法',
      description: '费曼技巧 + 间隔重复 = 永久记忆',
      match: 92,
      icon: Lightbulb,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 3,
      title: '情绪管理大师',
      description: '掌握情绪调节的核心技巧，成为情商高手',
      match: 78,
      icon: Heart,
      color: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.95 }}
      className="mt-12"
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/15 via-pink-600/15 to-amber-600/15 border border-violet-500/25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl" />
        
        <div className="relative p-8">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-amber-400" />
            为你推荐的训练项目
          </h2>
          <p className="text-white/60 mb-8">
            基于你的测评档案，AI智能匹配的训练方案
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((plan, i) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05 + i * 0.1 }}
                  className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                  onClick={() => navigate('/app/training')}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{plan.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      {plan.match}% 匹配
                    </span>
                  </div>
                  
                  <p className="text-white/60 text-sm">
                    {plan.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-8 flex justify-center"
          >
            <motion.button
              onClick={() => navigate('/app/training')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              🚀 探索全部训练项目
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
