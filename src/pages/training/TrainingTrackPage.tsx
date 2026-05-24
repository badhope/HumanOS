import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Lock, Zap, Brain, Heart, Users, Briefcase, Sun } from 'lucide-react'
import { useMemo } from 'react'
import { useAppStore } from '../../store'
import { ALL_TRAINING_TRACKS, checkLevelUnlocked, type UserProgress } from '../../data/training-levels'

const TRACK_GRADIENTS: Record<string, string> = {
  emotion: 'from-amber-500 to-rose-500',
  cognition: 'from-blue-500 to-cyan-500',
  social: 'from-emerald-500 to-teal-500',
  attachment: 'from-pink-500 to-rose-500',
  career: 'from-blue-500 to-violet-500',
}

// 图标映射 - 使用lucide-react图标替代emoji
const getIconComponent = (iconStr: string, category: string) => {
  switch(category) {
    case 'emotion': return <Sun size={20} />
    case 'cognition': return <Brain size={20} />
    case 'social': return <Users size={20} />
    case 'attachment': return <Heart size={20} />
    case 'career': return <Briefcase size={20} />
    default: return <Sun size={20} />
  }
}

export default function TrainingTrackPage() {
  const { trackId } = useParams<{ trackId: string }>()
  const navigate = useNavigate()
  const { trainingRecords: storeTrainingRecords, completedAssessments: assessmentHistory } = useAppStore()

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

  const track = ALL_TRAINING_TRACKS.find(t => t.id === trackId)

  if (!track) {
    return (
      <div className="p-4 md:p-6">
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-2">训练轨道未找到</h2>
          <button
            onClick={() => navigate('/app/training')}
            className="text-violet-400 hover:text-violet-300"
          >
            返回训练中心
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <button
        onClick={() => navigate('/app/training')}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
      >
        <ChevronLeft size={18} />
        <span>返回训练中心</span>
      </button>

      <div className={`bg-gradient-to-br ${TRACK_GRADIENTS[track.id]}/20 rounded-2xl p-6 border border-white/10`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${TRACK_GRADIENTS[track.id]} flex items-center justify-center`}>
            {getIconComponent(track.icon, track.id)}
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{track.name}</h2>
            <p className="text-white/60">{track.description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {track.levels.map((level, index) => {
          const isUnlocked = checkLevelUnlocked(track.id, level.level, userProgress)
          const allTrainingsCompleted = level.trainings.every(
            t => userProgress.completedTrainings.includes(t.id)
          )

          return (
            <div
              key={level.level}
              className={`rounded-2xl p-5 border ${
                isUnlocked
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/3 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${TRACK_GRADIENTS[track.id]} flex items-center justify-center font-bold`}>
                    {level.level}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{level.title}</h3>
                      {allTrainingsCompleted && (
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                          已完成
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/50">{level.description}</p>
                  </div>
                </div>
                {!isUnlocked && <Lock size={18} className="text-white/40" />}
              </div>

              {isUnlocked && (
                <div className="space-y-3">
                  {level.trainings.map(training => {
                    const isCompleted = userProgress.completedTrainings.includes(training.id)
                    return (
                      <div
                        key={training.id}
                        onClick={() => navigate(`/app/training/${training.id}`)}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${TRACK_GRADIENTS[track.id]}/30 flex items-center justify-center`}>
                            {getIconComponent(training.icon, track.id)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${isCompleted ? 'text-white/60 line-through' : ''}`}>
                                {training.title}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-violet-500/20 text-violet-300">
                                <Zap size={10} />
                                L{training.level}
                              </span>
                            </div>
                            <p className="text-xs text-white/50">{training.duration}</p>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-white/30" />
                      </div>
                    )
                  })}
                </div>
              )}

              {level.rewards.length > 0 && isUnlocked && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-white/50 mb-2">完成奖励</p>
                  <div className="flex flex-wrap gap-2">
                    {level.rewards.map((reward, i) => (
                      <span
                        key={i}
                        className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full"
                      >
                        🎖️ {reward}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
