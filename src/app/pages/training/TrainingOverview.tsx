import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../../store'
import { useResponsive } from '../../../hooks/useResponsive'
import { ALL_TRAINING_TRACKS, checkLevelUnlocked, type UserProgress } from '../../data/training-levels'
import { getRecommendedTrainings } from '../../data/training-library'
import TrainingGuide from '../../components/training/TrainingGuide'
import { useState, useMemo } from 'react'
import { Play, ChevronRight, Brain, Heart, Users, Briefcase, Sun, Compass } from 'lucide-react'

const TRACK_GRADIENTS: Record<string, string> = {
  emotion: 'from-amber-500 to-rose-500',
  cognition: 'from-blue-500 to-cyan-500',
  social: 'from-emerald-500 to-teal-500',
  attachment: 'from-pink-500 to-rose-500',
  career: 'from-blue-500 to-violet-500',
}

// 轨道图标映射
const getTrackIcon = (trackId: string) => {
  switch(trackId) {
    case 'emotion': return <Sun size={24} />
    case 'cognition': return <Brain size={24} />
    case 'social': return <Users size={24} />
    case 'attachment': return <Heart size={24} />
    case 'career': return <Briefcase size={24} />
    default: return <Compass size={24} />
  }
}

export default function TrainingOverview() {
  const [view, setView] = useState<'guide' | 'tracks' | 'recommended'>('tracks')
  const { completedAssessments: assessmentHistory, getMoodForDate, results, trainingRecords: storeTrainingRecords } = useAppStore()
  const { isDesktop } = useResponsive()
  const navigate = useNavigate()

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  const todayMood = getMoodForDate(today)

  const trainingRecords = useMemo(() => {
    try {
      const localStorageRecords = JSON.parse(localStorage.getItem('training-records') || '[]')
      return storeTrainingRecords.length > 0 ? storeTrainingRecords : localStorageRecords
    } catch {
      return storeTrainingRecords
    }
  }, [storeTrainingRecords])

  const userProgress: UserProgress = useMemo(() => ({
    completedLevels: {},
    completedTrainings: trainingRecords.map(r => r.programId),
    completedAssessments: assessmentHistory.map(a => a.id)
  }), [trainingRecords, assessmentHistory])

  const recommendedTrainings = getRecommendedTrainings(todayMood?.mood, results?.['bigfive']?.data?.dimensions)

  if (view === 'guide') {
    return (
      <div className="p-4 md:p-6">
        <TrainingGuide />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="py-4 md:hidden md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          💪 训练中心
        </h2>
        <p className="text-white/50">选择你的成长路径</p>
      </div>

      {trainingRecords.length > 0 && (
        <div className="bg-gradient-to-br from-violet-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl p-5 border border-violet-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              🔥
            </div>
            <div>
              <h3 className="font-semibold">继续你的训练</h3>
              <p className="text-xs text-white/50">已完成 {trainingRecords.length} 个训练</p>
            </div>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(trainingRecords.length * 10, 100)}%` }}
            />
          </div>

          <button 
            onClick={() => navigate(`/app/training/${trainingRecords[trainingRecords.length - 1].programId}`)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Play size={18} />
            继续上次训练
          </button>
        </div>
      )}

      {trainingRecords.length === 0 && (
        <div className="bg-gradient-to-br from-violet-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl p-5 border border-violet-500/20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-3xl">
            🎯
          </div>
          <h3 className="font-semibold mb-2">开始你的第一个训练</h3>
          <p className="text-sm text-white/50 mb-4">每天5分钟，看见更好的自己</p>
          <button 
            onClick={() => navigate('/app/training/emotion-anchoring')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play size={18} />
            开始体验
          </button>
        </div>
      )}

      <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
        <button
          onClick={() => setView('tracks')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            view === 'tracks'
              ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          训练轨道
        </button>
        <button
          onClick={() => setView('recommended')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            view === 'recommended'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          为你推荐
        </button>
        <button
          onClick={() => setView('guide')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            view === 'guide'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          智能向导
        </button>
      </div>

      {view === 'tracks' && (
        <div className={`grid gap-4 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {ALL_TRAINING_TRACKS.map(track => {
            const firstUnlockedLevel = track.levels.find(
              l => checkLevelUnlocked(track.id, l.level, userProgress)
            )
            const totalLevels = track.levels.length

            return (
              <div
                key={track.id}
                onClick={() => navigate(`/app/training/track/${track.id}`)}
                className="rounded-2xl p-6 border bg-white/5 border-white/5 cursor-pointer hover:scale-[1.01] transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${TRACK_GRADIENTS[track.id]} flex items-center justify-center`}>
                      {getTrackIcon(track.id)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{track.name}</h3>
                      <p className="text-xs text-white/50">{track.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-white/30 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                </div>

                <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
                  <span>共 {totalLevels} 个等级</span>
                  <span>·</span>
                  <span>
                    {firstUnlockedLevel 
                      ? `当前: ${firstUnlockedLevel.title}` 
                      : '需要解锁'}
                  </span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${TRACK_GRADIENTS[track.id]} transition-all`}
                    style={{ 
                      width: `${
                        ((track.levels.findIndex(
                          l => !checkLevelUnlocked(track.id, l.level, userProgress)
                        ) === -1 ? totalLevels : track.levels.findIndex(
                          l => !checkLevelUnlocked(track.id, l.level, userProgress)
                        )) / totalLevels) * 100
                      }%` 
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {view === 'recommended' && recommendedTrainings.length > 0 && (
        <div className={`grid gap-3 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {recommendedTrainings.map(training => (
            <div
              key={training.id}
              onClick={() => navigate(`/app/training/${training.id}`)}
              className="rounded-xl p-4 border bg-white/5 border-white/5 cursor-pointer hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{training.icon}</span>
                    <span className="text-xs text-white/50">{training.duration}</span>
                  </div>
                  <h4 className="font-medium mb-1">{training.title}</h4>
                  <p className="text-xs text-white/50 line-clamp-2">
                    {training.benefits[0]}
                  </p>
                </div>
                <ChevronRight size={18} className="text-white/30 group-hover:text-violet-400 group-hover:translate-x-1 transition-all mt-1" />
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/app/growth')}
        className="w-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-2xl p-5 border border-violet-500/20 cursor-pointer hover:scale-[1.01] transition-transform text-left"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              📊 查看我的完整成长报告
            </h3>
            <p className="text-sm text-white/50 mt-1">
              6大核心能力维度 · 全面数据追踪
            </p>
          </div>
          <ChevronRight size={20} className="text-violet-400" />
        </div>
      </button>
    </div>
  )
}
