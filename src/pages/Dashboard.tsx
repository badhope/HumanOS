import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  Clock,
  Trash2,
  ChevronRight,
  User,
  BarChart3,
  Heart,
  Trophy,
  Sparkles,
  Home,
  ArrowLeft,
  Crown,
} from 'lucide-react'
import { useAppStore } from '@store'
import { assessments } from '@data/assessments'
import { cn } from '@utils/cn'
import PersonalityRadar from '@components/PersonalityRadar'
import ProfileModal from '@components/ProfileModal'
import {
  GlowCard,
  RippleButton,
  AnimatedNumber,
  AnimatedProgress,
  FadeInSection,
} from '@components/animations'
import {
  staggerContainer,
  staggerItem,
  cardVariants,
} from '@utils/animation-config'

export default function Dashboard() {
  const navigate = useNavigate()
  const { completedAssessments, deleteAssessment, records, achievements, favorites, user: profile } = useAppStore()

  const [showProfile, setShowProfile] = useState(false)

  const stats = useAppStore((state) => {
    const records = state.records
    const points = records.length * 10
    const level = Math.floor(points / 100) + 1
    return {
      totalAssessments: records.length,
      totalTime: records.length * 5,
      favoriteCategory: '心理测评',
      personalityTags: ['内向', '理性', '好奇'],
      level,
      points,
      streak: 0,
    }
  })

  const radarData = [
    { label: '外向性', value: 72, max: 100 },
    { label: '宜人性', value: 85, max: 100 },
    { label: '尽责性', value: 68, max: 100 },
    { label: '神经质', value: 35, max: 100 },
    { label: '开放性', value: 90, max: 100 },
  ]

  const unlockedAchievements = achievements.filter((a) => a.unlockedAt)
  const recentRecords = completedAssessments.slice(0, 5)

  const getAssessmentTitle = (id: string) => {
    return assessments.find((a) => a.id === id)?.title || '未知测评'
  }

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          type="button"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回主页</span>
        </motion.button>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="enter"
          className="mb-8"
        >
          <GlowCard
            className="glass rounded-2xl p-6"
            glowColor="rgba(139, 92, 246, 0.3)"
            enableTilt={false}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <motion.div
                variants={staggerItem}
                className="flex flex-col items-center"
              >
                <div
                  onClick={() => setShowProfile(true)}
                  className="cursor-pointer relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 p-1"
                  >
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                      {profile?.avatar ? (
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-white" />
                      )}
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-black/50"
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                <h2 className="text-xl font-bold text-white mt-4">
                  {profile?.name || '新用户'}
                </h2>
                <p className="text-white/60 text-sm">
                  Lv.<AnimatedNumber value={stats.level} duration={1} /> · <AnimatedNumber value={stats.points} duration={1.5} /> 积分
                </p>

                <div className="mt-4 w-32">
                  <AnimatedProgress
                    value={(stats.level % 10) * 10}
                    max={100}
                    duration={1.5}
                    delay={0.5}
                    showLabel={false}
                    color="violet"
                    size="sm"
                  />
                </div>
              </motion.div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: stats.totalAssessments, label: '完成测评', color: 'text-violet-400' },
                  { value: favorites.length, label: '收藏', color: 'text-pink-400' },
                  { value: unlockedAchievements.length, label: '成就', color: 'text-orange-400' },
                  { value: assessments.length, label: '可用', color: 'text-emerald-400' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    className="glass rounded-xl p-4 text-center"
                  >
                    <div className={cn('text-3xl font-bold', stat.color)}>
                      <AnimatedNumber
                        value={stat.value}
                        duration={1.5}
                        delay={0.2 + index * 0.1}
                      />
                    </div>
                    <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <FadeInSection delay={0.1}>
            <GlowCard
              className="glass rounded-2xl p-6 h-full"
              glowColor="rgba(139, 92, 246, 0.2)"
              enableTilt={false}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-violet-400" />
                  性格雷达图
                </h3>
                <span className="text-sm text-white/40">基于测评结果分析</span>
              </div>

              <div className="flex justify-center">
                <PersonalityRadar data={radarData} size={220} />
              </div>
            </GlowCard>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <GlowCard
              className="glass rounded-2xl p-6 h-full"
              glowColor="rgba(251, 191, 36, 0.2)"
              enableTilt={false}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  成就徽章
                </h3>
                <span className="text-sm text-white/40">
                  {unlockedAchievements.length}/{achievements.length}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {achievements.slice(0, 6).map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.08,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    className={cn(
                      'aspect-square rounded-xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer',
                      achievement.unlockedAt
                        ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                        : 'bg-white/5 border border-white/10 opacity-50'
                    )}
                  >
                    <motion.span
                      className="text-2xl"
                      animate={achievement.unlockedAt ? {
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {achievement.icon}
                    </motion.span>
                    <span className="text-xs text-white/60 mt-1 text-center">
                      {achievement.title}
                    </span>
                  </motion.div>
                ))}
              </div>

              <RippleButton
                variant="ghost"
                className="w-full mt-4 py-2 text-sm"
                onClick={() => alert('成就系统开发中，敬请期待！')}
              >
                查看全部成就
              </RippleButton>
            </GlowCard>
          </FadeInSection>

          <FadeInSection delay={0.25}>
            <GlowCard
              className="glass rounded-2xl p-6 h-full"
              glowColor="rgba(236, 72, 153, 0.2)"
              enableTilt={false}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Crown className="w-5 h-5 text-pink-400" />
                  全球排行榜
                </h3>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">
                  <span className="text-2xl">🥇</span>
                  <div className="flex-1">
                    <div className="text-white font-medium">暗夜行者</div>
                    <div className="text-white/40 text-xs">暗黑指数 98.7</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-2xl">🥈</span>
                  <div className="flex-1">
                    <div className="text-white font-medium">面具人</div>
                    <div className="text-white/40 text-xs">暗黑指数 97.2</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-2xl">🥉</span>
                  <div className="flex-1">
                    <div className="text-white font-medium">局外人</div>
                    <div className="text-white/40 text-xs">暗黑指数 95.1</div>
                  </div>
                </div>
              </div>

              <RippleButton
                variant="primary"
                className="w-full py-3"
                onClick={() => navigate('/leaderboard')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                查看完整排行榜
              </RippleButton>
            </GlowCard>
          </FadeInSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FadeInSection delay={0.3}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-violet-400" />
              最近测评
            </h3>

            {recentRecords.length === 0 ? (
              <GlowCard className="glass rounded-2xl p-8 text-center" enableTilt={false}>
                <BarChart3 className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/60">还没有测评记录</p>
                <RippleButton
                  variant="primary"
                  className="mt-4"
                  onClick={() => navigate('/')}
                >
                  开始测评
                </RippleButton>
              </GlowCard>
            ) : (
              <div className="space-y-3">
                {recentRecords.map((record, index) => (
                  <motion.div
                    key={`${record.assessmentId}-${record.completedAt}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.08 }}
                    whileHover={{ x: 5 }}
                  >
                    <GlowCard
                      className="glass rounded-xl p-4 flex items-center justify-between cursor-pointer"
                      glowColor="rgba(139, 92, 246, 0.2)"
                      onClick={() => navigate(`/results/${record.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {getAssessmentTitle(record.assessmentId)}
                          </div>
                          <div className="text-xs text-white/40">
                            {new Date(record.completedAt).toLocaleDateString('zh-CN')}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40" />
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            )}
          </FadeInSection>

          <FadeInSection delay={0.4}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              我的收藏
            </h3>

            {favorites.length === 0 ? (
              <GlowCard className="glass rounded-2xl p-8 text-center" enableTilt={false}>
                <Heart className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/60">还没有收藏</p>
                <RippleButton
                  variant="primary"
                  className="mt-4 bg-gradient-to-r from-pink-500 to-rose-500"
                  onClick={() => navigate('/')}
                >
                  探索测评
                </RippleButton>
              </GlowCard>
            ) : (
              <div className="space-y-3">
                {favorites.slice(0, 4).map((favId, index) => {
                  const assessment = assessments.find((a) => a.id === favId)
                  if (!assessment) return null

                  return (
                    <motion.div
                      key={favId}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.08 }}
                      whileHover={{ x: -5 }}
                    >
                      <GlowCard
                        className="glass rounded-xl p-4 flex items-center justify-between cursor-pointer"
                        glowColor="rgba(236, 72, 153, 0.2)"
                        onClick={() => navigate(`/assessment/${favId}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                            <Heart className="w-5 h-5 text-pink-400" />
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {assessment.title}
                            </div>
                            <div className="text-xs text-white/40">
                              {assessment.category} · {assessment.duration}分钟
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/40" />
                      </GlowCard>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </FadeInSection>
        </div>

        <FadeInSection delay={0.5}>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            全部历史
          </h3>

          {completedAssessments.length === 0 ? (
            <GlowCard className="glass rounded-2xl p-12 text-center" enableTilt={false}>
              <BarChart3 className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">
                还没有测评记录
              </h4>
              <p className="text-white/60 mb-6">
                开始你的第一次测评，探索真实的自己
              </p>
              <RippleButton
                variant="primary"
                size="lg"
                onClick={() => navigate('/')}
              >
                开始测评
              </RippleButton>
            </GlowCard>
          ) : (
            <div className="space-y-4">
              {completedAssessments.map((assessment, index) => (
                <motion.div
                  key={`${assessment.assessmentId}-${assessment.completedAt}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <GlowCard
                    className="glass rounded-2xl p-6 group"
                    glowColor="rgba(139, 92, 246, 0.15)"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-violet-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white group-hover:text-gradient transition-all">
                            {getAssessmentTitle(assessment.assessmentId)}
                          </h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(assessment.completedAt).toLocaleDateString('zh-CN')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(assessment.completedAt).toLocaleTimeString('zh-CN', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="text-sm text-white/80">
                              结果: {assessment.result.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <RippleButton
                          variant="secondary"
                          onClick={() => navigate(`/results/${assessment.id}`)}
                        >
                          查看结果
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </RippleButton>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteAssessment(assessment.id!)}
                          className="p-2 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          aria-label="删除此测评记录"
                          type="button"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          )}
        </FadeInSection>
      </div>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}
