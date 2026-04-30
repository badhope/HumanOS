/**
 * ==============================================
 * 🌐 全局统一菜单按钮
 * ==============================================
 * 【集成功能】
 * - 📐 设置
 * - 🔍 快速搜索 (Cmd+K)
 * - 👤 个人中心
 * - ⌨️ 快捷键帮助
 * 
 * 【显示规则】
 * - 只在非沉浸页面显示（游戏/测评内隐藏）
 * - 固定右上角
 */

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Search, 
  User, 
  Keyboard, 
  ChevronRight,
  Menu,
  X,
  TrendingUp
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useShortcutContext } from '@hooks/useShortcutContext'
import { useAppStore } from '../store'
import { analyzeAchievements, type AssessmentRecord } from '../utils/achievementAnalysis'
import { getAssessmentById } from '../data/assessments'
import SettingsPanel from './Settings'

interface MenuItem {
  id: string
  name: string
  icon: React.ReactNode
  action: () => void
  shortcut?: string
  color: string
}

export default function GlobalMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { setSearchOpen, setHelpOpen } = useShortcutContext()
  const { completedAssessments, user, achievements } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  const analysisResult = useMemo(() => {
    const records: AssessmentRecord[] = completedAssessments.map(a => {
      const completedAt = a.completedAt instanceof Date ? a.completedAt.getTime() : 
                          typeof a.completedAt === 'number' ? a.completedAt : 
                          new Date(a.completedAt).getTime()
      return {
        assessmentId: a.assessmentId,
        completedAt,
        score: a.result?.score || 0,
        dimensions: a.result?.dimensions?.map(d => ({
          name: d.name,
          score: d.score,
          maxScore: typeof d.maxScore === 'number' ? d.maxScore : 100,
        })) || [],
        category: 'personality',
      }
    })
    return analyzeAchievements(records)
  }, [completedAssessments])

  const getAssessmentTitle = (id: string) => {
    const assessment = getAssessmentById(id)
    return assessment?.title || id
  }

  const toDate = (date: Date | string | number): Date => {
    if (date instanceof Date) return date
    if (typeof date === 'string') return new Date(date)
    return new Date(date)
  }

  const isImmersiveMode = 
    location.pathname.includes('/assessment/')

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  const menuItems: MenuItem[] = [
    {
      id: 'search',
      name: '快速搜索',
      icon: <Search className="w-5 h-5" />,
      shortcut: '⌘K',
      color: 'text-violet-400',
      action: () => {
        setSearchOpen(true)
        setIsOpen(false)
      },
    },
    {
      id: 'profile',
      name: '个人中心',
      icon: <User className="w-5 h-5" />,
      color: 'text-blue-400',
      action: () => {
        setProfileOpen(true)
        setIsOpen(false)
      },
    },
    {
      id: 'settings',
      name: '系统设置',
      icon: <SettingsIcon className="w-5 h-5" />,
      color: 'text-slate-400',
      action: () => {
        setSettingsOpen(true)
        setIsOpen(false)
      },
    },
    {
      id: 'shortcuts',
      name: '快捷键',
      icon: <Keyboard className="w-5 h-5" />,
      shortcut: '⌘/',
      color: 'text-emerald-400',
      action: () => {
        setHelpOpen(true)
        setIsOpen(false)
      },
    },
  ]

  if (isImmersiveMode) return null

  return (
    <>
      <div ref={containerRef} className="fixed top-4 right-4 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          aria-label="打开菜单"
          type="button"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute top-14 right-0 w-56 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden py-2"
            >
              <div className="px-3 py-2 mb-1 border-b border-white/5">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium px-2">
                  系统菜单
                </p>
              </div>
              
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/10 transition-colors group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <span className={item.color}>{item.icon}</span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.shortcut && (
                      <span className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 text-white/40 font-mono">
                        {item.shortcut}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </motion.button>
              ))}

              <div className="mt-2 pt-2 border-t border-white/5 px-3">
                <p className="text-[10px] text-white/30 px-2 text-center">
                  心镜 MindMirror v2.5.0
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {settingsOpen && (
          <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setProfileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-white/10 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setProfileOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 transition-colors"
                type="button"
              >
                <X className="w-6 h-6 text-white/70" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${analysisResult.level.gradient} flex items-center justify-center shadow-xl`}>
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{user?.name || '用户'}</h2>
                  <p className="text-white/50">{analysisResult.level.label}水平 · 完成 {completedAssessments.length} 项测评</p>
                </div>
              </div>

              {completedAssessments.length === 0 ? (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60 mb-4">还没有完成任何测评</p>
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      navigate('/categories')
                    }}
                    className="px-6 py-2 rounded-xl bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 transition-colors"
                    type="button"
                  >
                    开始测评
                  </button>
                </div>
              ) : (
                <div>
                  <div className="glass rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      最近测评记录
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {completedAssessments.slice(0, 5).map((record, index) => {
                        const completedDate = toDate(record.completedAt)
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                            onClick={() => {
                              setProfileOpen(false)
                              navigate(`/legacy/results/${record.id}`)
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500/20 to-blue-500/20 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-violet-400" />
                              </div>
                              <div>
                                <div className="text-white font-medium">{getAssessmentTitle(record.assessmentId)}</div>
                                <div className="text-white/50 text-sm">
                                  {completedDate.toLocaleDateString('zh-CN', {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-violet-400 font-semibold">{record.result?.score || 0}分</span>
                              <ChevronRight className="w-4 h-4 text-white/40" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/5">
                <div className="text-center px-6">
                  <div className="text-2xl font-bold text-white">{completedAssessments.length}</div>
                  <div className="text-xs text-white/40">完成测评</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center px-6">
                  <div className="text-2xl font-bold text-violet-400">{achievements.filter(a => a.unlockedAt).length}</div>
                  <div className="text-xs text-white/40">解锁成就</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center px-6">
                  <div className="text-2xl font-bold text-blue-400">Lv.{analysisResult.level.level}</div>
                  <div className="text-xs text-white/40">认知等级</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
