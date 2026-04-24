import { useMemo, useState, useEffect } from 'react'

export interface SoulProfile {
  id: string
  name: string
  avatar: string
  distance: number
  matchPercentage: number
  dimensions: Record<string, number>
  tags: string[]
  quote: string
  compatibility: {
    love: number
    friendship: number
    work: number
  }
}

const mockUserPool: SoulProfile[] = [
  {
    id: '1',
    name: '夜行猫咪',
    avatar: '🐱',
    distance: 0.3,
    matchPercentage: 98,
    dimensions: { darkTriad: 72, empathy: 65, openness: 88 },
    tags: ['INFJ', '猫系', '熬夜党'],
    quote: '我们都是在深夜里偷偷崩溃的成年人',
    compatibility: { love: 95, friendship: 99, work: 92 },
  },
  {
    id: '2',
    name: '书店流浪者',
    avatar: '📚',
    distance: 0.8,
    matchPercentage: 95,
    dimensions: { darkTriad: 45, empathy: 92, openness: 95 },
    tags: ['INFP', '理想主义', '老灵魂'],
    quote: '书读多了，就越来越难遇到同类了',
    compatibility: { love: 90, friendship: 98, work: 85 },
  },
  {
    id: '3',
    name: '深夜出租车',
    avatar: '🚕',
    distance: 1.2,
    matchPercentage: 92,
    dimensions: { darkTriad: 68, empathy: 78, openness: 72 },
    tags: ['INTJ', '观察者', '人间清醒'],
    quote: '看过太多故事，所以不再轻易讲故事',
    compatibility: { love: 88, friendship: 95, work: 96 },
  },
  {
    id: '4',
    name: '彩虹收藏家',
    avatar: '🌈',
    distance: 1.5,
    matchPercentage: 89,
    dimensions: { darkTriad: 30, empathy: 95, openness: 98 },
    tags: ['ENFP', '快乐修勾', '小太阳'],
    quote: '即使世界是灰色的，我也要给它涂上颜色',
    compatibility: { love: 96, friendship: 92, work: 80 },
  },
  {
    id: '5',
    name: '黑咖啡诗人',
    avatar: '☕',
    distance: 2.1,
    matchPercentage: 87,
    dimensions: { darkTriad: 55, empathy: 62, openness: 85 },
    tags: ['ISTP', '技术宅', '嘴硬心软'],
    quote: '咖啡越喝越苦，话越来越少',
    compatibility: { love: 75, friendship: 85, work: 95 },
  },
  {
    id: '6',
    name: '月亮失眠症',
    avatar: '🌙',
    distance: 2.8,
    matchPercentage: 85,
    dimensions: { darkTriad: 80, empathy: 88, openness: 60 },
    tags: ['INFJ-T', '极致共情', '抑郁质'],
    quote: '月亮不睡我不睡，我是人间小美味',
    compatibility: { love: 85, friendship: 90, work: 70 },
  },
  {
    id: '7',
    name: '咸鱼工程师',
    avatar: '🐟',
    distance: 3.2,
    matchPercentage: 82,
    dimensions: { darkTriad: 40, empathy: 70, openness: 55 },
    tags: ['ISTJ', '吗喽本喽', '躺平大师'],
    quote: '代码写得再好，不如奶茶喝得饱',
    compatibility: { love: 70, friendship: 88, work: 90 },
  },
  {
    id: '8',
    name: '荒岛唱片店',
    avatar: '🎵',
    distance: 3.7,
    matchPercentage: 78,
    dimensions: { darkTriad: 50, empathy: 85, openness: 90 },
    tags: ['ISFP', '艺术家', '社恐但温柔'],
    quote: '耳机是人类的避难所，音乐是心脏的救命丸',
    compatibility: { love: 82, friendship: 95, work: 75 },
  },
]

export function useSoulMatch(userDimensions: Record<string, number> = {}) {
  const [matches, setMatches] = useState<SoulProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      const calculated = mockUserPool.map(user => {
        const dimensionKeys = Object.keys({ ...userDimensions, ...user.dimensions })
        let similarity = 0
        let count = 0

        dimensionKeys.forEach(key => {
          const userVal = userDimensions[key] || 50
          const matchVal = user.dimensions[key] || 50
          similarity += 100 - Math.abs(userVal - matchVal)
          count++
        })

        const matchPercentage = Math.round(similarity / count)

        return {
          ...user,
          matchPercentage,
        }
      }).sort((a, b) => b.matchPercentage - a.matchPercentage)

      setMatches(calculated)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [JSON.stringify(userDimensions)])

  const topMatch = useMemo(() => matches[0], [matches])

  const getMatchLevel = (percentage: number): { level: string; color: string; description: string } => {
    if (percentage >= 95) return { level: '灵魂双生', color: 'from-violet-500 to-fuchsia-500', description: '穿越人海，终于找到你' }
    if (percentage >= 90) return { level: '深度共鸣', color: 'from-blue-500 to-violet-500', description: '世界上另一个你' }
    if (percentage >= 85) return { level: '精神挚友', color: 'from-cyan-500 to-blue-500', description: '懂你的奇奇怪怪' }
    if (percentage >= 80) return { level: '默契伙伴', color: 'from-emerald-500 to-cyan-500', description: '相处舒服不累' }
    return { level: '普通朋友', color: 'from-gray-500 to-slate-500', description: '君子之交淡如水' }
  }

  return {
    matches,
    topMatch,
    loading,
    getMatchLevel,
  }
}
