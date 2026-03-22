import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Trash2, ChevronRight, User, BarChart3 } from 'lucide-react'
import { useStore } from '@store'
import { assessments } from '@data/assessments'
import { cn } from '@utils/cn'

export default function Dashboard() {
  const navigate = useNavigate()
  const { completedAssessments, deleteAssessment, user, setUser } = useStore()
  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState(user?.name || '')

  const handleSaveName = () => {
    if (tempName.trim()) {
      if (user) {
        useStore.getState().updateUserName(tempName.trim())
      } else {
        useStore.getState().setUser({
          id: crypto.randomUUID(),
          name: tempName.trim(),
          assessments: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    }
    setEditingName(false)
  }

  const getAssessmentTitle = (id: string) => {
    return assessments.find((a) => a.id === id)?.title || '未知测评'
  }

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="glass rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>

              {/* Info */}
              <div className="flex-1">
                {editingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                      className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 focus:border-violet-500 outline-none"
                      placeholder="输入你的名字"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      className="px-4 py-2 rounded-xl bg-violet-500 text-white text-sm"
                    >
                      保存
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-white">
                      {user?.name || '匿名用户'}
                    </h1>
                    <button
                      onClick={() => setEditingName(true)}
                      className="text-white/40 hover:text-white text-sm"
                    >
                      编辑
                    </button>
                  </div>
                )}
                <p className="text-white/60 mt-1">
                  已完成 {completedAssessments.length} 个测评
                </p>
                {user?.createdAt && (
                  <p className="text-white/40 text-sm mt-1">
                    加入时间: {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">
                    {completedAssessments.length}
                  </div>
                  <div className="text-sm text-white/60">完成测评</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">
                    {assessments.length}
                  </div>
                  <div className="text-sm text-white/60">可⽤测评</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">测评历史</h2>

          {completedAssessments.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <BarChart3 className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                还没有测评记录
              </h3>
              <p className="text-white/60 mb-6">
                开始你的第一次测评，探索真实的自己
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium"
              >
                开始测评
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {completedAssessments.map((assessment, index) => (
                <motion.div
                  key={`${assessment.assessmentId}-${assessment.completedAt}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 hover-lift group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-gradient transition-all">
                          {getAssessmentTitle(assessment.assessmentId)}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(assessment.completedAt).toLocaleDateString(
                              'zh-CN'
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(assessment.completedAt).toLocaleTimeString(
                              'zh-CN',
                              { hour: '2-digit', minute: '2-digit' }
                            )}
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
                      <button
                        onClick={() =>
                          navigate(`/results/${assessment.assessmentId}`)
                        }
                        className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                      >
                        查看结果
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          deleteAssessment(
                            assessment.assessmentId,
                            assessment.completedAt
                          )
                        }
                        className="p-2 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
