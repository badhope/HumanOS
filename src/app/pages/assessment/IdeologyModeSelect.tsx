import { useNavigate } from 'react-router-dom'
import { Sparkles, Target, Zap, CheckCircle, Clock, List, Shield, ArrowLeft } from 'lucide-react'
import { useAppStore } from '../../../store'

export default function IdeologyModeSelect() {
  const navigate = useNavigate()
  const setCurrentAssessment = useAppStore((state) => state.setCurrentAssessment)

  const handleSelectMode = (mode: 'normal' | 'professional') => {
    // 设置当前评估和模式
    setCurrentAssessment('ideology-enhanced', mode)
    // 导航到评估介绍页面
    navigate('/app/assessment/ideology-enhanced')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <button
          onClick={() => navigate('/app/assessments')}
          className="mb-8 flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles size={16} className="text-violet-400" />
            <span className="text-violet-300 text-sm">意识形态罗盘</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">选择测评版本</h1>
          <p className="text-white/60 text-base">两个版本使用相同的题库，仅题量和计算方法不同</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelectMode('normal')}
            className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/20 hover:border-blue-400/40 transition-all text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center shrink-0">
                  <Target size={28} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">普通版</h3>
                  <p className="text-white/60 text-sm">快速了解你的意识形态倾向</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">推荐</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle size={16} className="text-blue-400 shrink-0" />
                  <span>35道精选题目</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Clock size={16} className="text-blue-400 shrink-0" />
                  <span>约6分钟完成</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <List size={16} className="text-blue-400 shrink-0" />
                  <span>基础分数计算</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 mb-3">适合人群</p>
                <p className="text-sm text-white/70">初次了解意识形态、时间有限的用户</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSelectMode('professional')}
            className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 border border-purple-500/20 hover:border-purple-400/40 transition-all text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 flex items-center justify-center shrink-0">
                  <Zap size={28} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">专业版</h3>
                  <p className="text-white/60 text-sm">更精确的意识形态定位</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">专业</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle size={16} className="text-purple-400 shrink-0" />
                  <span>50道完整题目</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Clock size={16} className="text-purple-400 shrink-0" />
                  <span>约12分钟完成</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Shield size={16} className="text-purple-400 shrink-0" />
                  <span>加权智能计算</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 mb-3">适合人群</p>
                <p className="text-sm text-white/70">对意识形态有深入了解、追求精确结果的用户</p>
              </div>
            </div>
          </button>
        </div>

        <div className="rounded-xl p-5 bg-white/5 border border-white/10">
          <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-amber-400" />
            关于两个版本
          </h4>
          <div className="space-y-2 text-xs text-white/60">
            <p>
              <span className="font-medium text-white/70">相同点：</span>
              两个版本使用完全相同的题目库，都是从50道标准题目中选择
            </p>
            <p>
              <span className="font-medium text-white/70">不同点：</span>
              普通版抽取35道核心题目，专业版使用全部50道题目并应用额外的权重算法
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
