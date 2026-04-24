
import { useMemo, useCallback } from 'react'
import { useAppStore } from '@store'

/**
 * 🏆 排行榜玩家记录接口
 */
export interface LeaderboardPlayer {
  id: string
  nickname: string
  avatar: string
  totalScore: number
  rank: number
  darkTriadScore: number
  assessmentsCount: number
  title: string
  isYou?: boolean
}

/**
 * ⏳ 历史测评记录接口
 */
export interface HistoricalRecord {
  completedAt: number
  darkTriadScore: number
  machiavellianism: number
  narcissism: number
  psychopathy: number
  change?: number
}

/**
 * 🏆 全局排行榜系统 Hook
 * 
 * 🔧 核心功能:
 * 1. 模拟全球玩家排行榜数据
 * 2. 计算用户当前排名
 * 3. 生成称号系统
 * 4. 击败百分比计算
 * 
 * 🎮 游戏化设计:
 * - 青铜/白银/黄金/钻石/传说 分段
 * - 独特称号系统
 * - 击败全国XX%用户显示
 */
export function useLeaderboard() {
  const completedAssessments = useAppStore((state) => state.completedAssessments)

  /**
   * 🎭 暗黑人格称号系统
   */
  const getTitle = useCallback((score: number): string => {
    if (score >= 95) return '传说级暗黑'
    if (score >= 90) return '暗黑之神'
    if (score >= 85) return '深渊凝视者'
    if (score >= 80) return '绝命毒师'
    if (score >= 75) return '战略大师'
    if (score >= 70) return '社会老油条'
    if (score >= 60) return '精致利己主义'
    if (score >= 50) return '普通凡人'
    if (score >= 40) return '善良市民'
    return '圣母白莲花'
  }, [])

  /**
   * 🎲 生成模拟排行榜数据
   * 加入真实用户数据到排行榜中
   */
  const generateLeaderboard = useCallback((): LeaderboardPlayer[] => {
    const nicknames = [
      '暗夜行者', '孤独的观测者', '面具人', '第四面墙', '薛定谔的猫',
      '局外人', '无声告白', '隐秘的角落', '沉默的大多数', '黑天鹅',
      '反脆弱', '理性乐观派', '自私的基因', '机器人叛乱', '黑客与画家',
      '万历十五年', '人类简史', '未来简史', '今日简史', '思考快与慢'
    ]

    const avatars = ['🃏', '🎭', '🦇', '🕶️', '🥷', '🔮', '⚔️', '🗡️', '💀', '👁️']

    const basePlayers: LeaderboardPlayer[] = Array.from({ length: 97 }, (_, i) => {
      const baseScore = Math.max(10, 99 - i * 0.9 + (Math.random() * 3 - 1.5))
      return {
        id: `player-${i}`,
        nickname: nicknames[i % nicknames.length],
        avatar: avatars[i % avatars.length],
        totalScore: Math.round(baseScore * 10) / 10,
        rank: i + 1,
        darkTriadScore: Math.round(baseScore * 10) / 10,
        assessmentsCount: Math.floor(Math.random() * 20) + 1,
        title: getTitle(baseScore),
      }
    })

    const userDarkAssessment = completedAssessments.find(
      a => a.assessmentId === 'dark-triad'
    )

    if (userDarkAssessment) {
      const userScore = (userDarkAssessment.result.overall as number) || 65
      
      const userRecord: LeaderboardPlayer = {
        id: 'user',
        nickname: '你',
        avatar: '👤',
        totalScore: userScore,
        rank: 0,
        darkTriadScore: userScore,
        assessmentsCount: completedAssessments.length,
        title: getTitle(userScore),
        isYou: true,
      }

      const allPlayers = [...basePlayers, userRecord].sort((a, b) => b.totalScore - a.totalScore)
      
      return allPlayers.map((p, i) => ({
        ...p,
        rank: i + 1,
      }))
    }

    return basePlayers
  }, [completedAssessments, getTitle])

  /**
   * ⏳ 获取用户的历史记录（时光机数据）
   */
  const getHistoricalRecords = useCallback((): HistoricalRecord[] => {
    const darkTriadResults = completedAssessments
      .filter(a => a.assessmentId === 'dark-triad')
      .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())

    return darkTriadResults.map((r, i, arr) => {
      const prevScore = i > 0 ? (arr[i - 1].result.overall as number) : null
      const currentScore = r.result.overall as number
      
      return {
        completedAt: new Date(r.completedAt).getTime(),
        darkTriadScore: currentScore,
        machiavellianism: r.result.machiavellianism as number,
        narcissism: r.result.narcissism as number,
        psychopathy: r.result.psychopathy as number,
        change: prevScore ? currentScore - prevScore : 0,
      }
    })
  }, [completedAssessments])

  /**
   * 📊 用户当前排名数据
   */
  const userRanking = useMemo(() => {
    const leaderboard = generateLeaderboard()
    const user = leaderboard.find(p => p.isYou)
    
    return {
      rank: user?.rank || null,
      totalScore: user?.totalScore || 0,
      title: user?.title || '还未测评',
      defeatPercent: user ? Math.round((1 - user.rank / 100) * 100) : 0,
    }
  }, [generateLeaderboard])

  return {
    leaderboard: useMemo(() => generateLeaderboard(), [generateLeaderboard]),
    userRanking,
    historicalRecords: useMemo(() => getHistoricalRecords(), [getHistoricalRecords]),
    getTitle,
  }
}
