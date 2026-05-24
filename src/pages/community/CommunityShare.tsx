import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2, Users, Link2, Image, MessageCircle, Heart, Eye } from 'lucide-react'

const shareItems = [
  {
    id: 'share-result',
    title: '分享我的测评结果',
    description: '与他人分享你的洞察',
    icon: Share2,
    badge: '热门',
    color: 'pink',
    colorGradient: 'from-pink-500/30 to-rose-500/30',
    colorBorder: 'border-pink-500/20',
    colorText: 'text-pink-400'
  },
  {
    id: 'find-souls',
    title: '发现相似灵魂',
    description: '找到志同道合的朋友',
    icon: Users,
    color: 'violet',
    colorGradient: 'from-violet-500/30 to-purple-500/30',
    colorBorder: 'border-violet-500/20',
    colorText: 'text-violet-400'
  },
  {
    id: 'leaderboard',
    title: '测评排行榜',
    description: '看看谁完成的测评最多',
    icon: Image,
    color: 'amber',
    colorGradient: 'from-amber-500/30 to-orange-500/30',
    colorBorder: 'border-amber-500/20',
    colorText: 'text-amber-400'
  }
]

const sharedResults = [
  {
    id: 1,
    user: '林小雅',
    avatar: '🎀',
    assessment: 'MBTI 16型人格测试',
    result: 'INTJ - 建筑师',
    date: '2小时前',
    likes: 128,
    comments: 23,
    views: 1542
  },
  {
    id: 2,
    user: '陈思远',
    avatar: '🌟',
    assessment: '大五人格测试',
    result: '高开放性、高尽责性',
    date: '5小时前',
    likes: 89,
    comments: 15,
    views: 987
  },
  {
    id: 3,
    user: '张明轩',
    avatar: '🎭',
    assessment: '戈尔曼情商测试',
    result: '情商得分：142/160',
    date: '1天前',
    likes: 234,
    comments: 45,
    views: 2341
  },
  {
    id: 4,
    user: '李雨桐',
    avatar: '🌸',
    assessment: '焦虑自评量表',
    result: '轻度焦虑，正在调整中',
    date: '1天前',
    likes: 67,
    comments: 12,
    views: 765
  },
  {
    id: 5,
    user: '王子健',
    avatar: '🚀',
    assessment: '心理韧性测试',
    result: '韧性较强，压力大时表现稳定',
    date: '2天前',
    likes: 156,
    comments: 28,
    views: 1890
  }
]

function ShareResultPage() {
  const [selectedResult, setSelectedResult] = useState<typeof sharedResults[0] | null>(null)
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/20 to-rose-500/10 border border-pink-500/30">
        <h3 className="text-sm font-medium text-white mb-2">分享你的测评结果</h3>
        <p className="text-xs text-white/60 mb-3">将你的洞察分享给朋友，或浏览他人分享的结果</p>
        
        <div className="flex gap-2">
          <button className="flex-1 py-2 px-3 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
            <Share2 size={14} />
            立即分享
          </button>
          <button className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
            <Eye size={14} />
            浏览他人
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs font-medium text-white/70 px-1">最新分享</div>
        {sharedResults.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedResult(selectedResult?.id === result.id ? null : result)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selectedResult?.id === result.id
                ? 'bg-pink-500/10 border-pink-500/30'
                : 'bg-white/5 border-white/10 hover:border-pink-500/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-lg">
                {result.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">{result.user}</span>
                  <span className="text-[10px] text-white/40">{result.date}</span>
                </div>
                <div className="text-xs text-white/60 mb-1">{result.assessment}</div>
                <div className="text-sm text-pink-300 font-medium">{result.result}</div>
                <div className="flex items-center gap-4 mt-2 text-[10px] text-white/40">
                  <span className="flex items-center gap-1">
                    <Heart size={10} />
                    {result.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={10} />
                    {result.comments}
                  </span>
                </div>
              </div>
            </div>

            {selectedResult?.id === result.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 pt-3 border-t border-white/10 flex gap-2"
              >
                <button className="flex-1 py-2 px-3 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-xs font-medium transition-colors flex items-center justify-center gap-1">
                  <Heart size={12} />
                  点赞
                </button>
                <button className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 text-xs font-medium transition-colors flex items-center justify-center gap-1">
                  <MessageCircle size={12} />
                  评论
                </button>
                <button 
                  onClick={copyLink}
                  className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Link2 size={12} />
                  {copied ? '已复制' : '复制'}
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FindSoulsPage() {
  const [soulmates] = useState([
    { id: 1, name: '小明', avatar: '🎯', traits: ['INTJ', '理性', '独立'], match: 96 },
    { id: 2, name: '小雨', avatar: '🌈', traits: ['INFP', '理想主义', '敏感'], match: 94 },
    { id: 3, name: '小晨', avatar: '✨', traits: ['ENTP', '好奇', '活泼'], match: 91 },
    { id: 4, name: '小艺', avatar: '🎨', traits: ['ISFP', '艺术', '温柔'], match: 89 }
  ])

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/20 to-purple-500/10 border border-violet-500/30">
        <h3 className="text-sm font-medium text-white mb-1">发现与你相似的人</h3>
        <p className="text-xs text-white/60">基于你的测评结果，找到与你性格相投的朋友</p>
      </div>

      <div className="space-y-3">
        {soulmates.map((soulmate, index) => (
          <motion.div
            key={soulmate.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center text-xl">
                {soulmate.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">{soulmate.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400">
                    {soulmate.match}% 匹配
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {soulmate.traits.map((trait) => (
                    <span key={trait} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 text-xs font-medium transition-colors">
                关注
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function LeaderboardPage() {
  const [leaderboard] = useState([
    { id: 1, rank: 1, name: '心灵探索者', avatar: '👑', score: 15820, assessments: 45 },
    { id: 2, rank: 2, name: '心理学爱好者', avatar: '🏆', score: 14250, assessments: 42 },
    { id: 3, rank: 3, name: '自我认知达人', avatar: '⭐', score: 13890, assessments: 40 },
    { id: 4, rank: 4, name: '好奇小王子', avatar: '🎭', score: 12450, assessments: 38 },
    { id: 5, rank: 5, name: '心灵成长者', avatar: '🌱', score: 11200, assessments: 35 }
  ])

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30">
        <h3 className="text-sm font-medium text-white mb-1">测评完成排行榜</h3>
        <p className="text-xs text-white/60">完成更多测评，提升你的排名</p>
      </div>

      <div className="space-y-2">
        {leaderboard.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
              user.rank <= 3 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/10'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
              user.rank === 1 ? 'bg-amber-500/30 text-amber-300' :
              user.rank === 2 ? 'bg-slate-400/30 text-slate-300' :
              user.rank === 3 ? 'bg-orange-600/30 text-orange-400' :
              'bg-white/10 text-white/50'
            }`}>
              {user.rank <= 3 ? user.avatar : `#${user.rank}`}
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
              {user.avatar === '👑' || user.avatar === '🏆' || user.avatar === '⭐' ? user.avatar : '👤'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user.name}</div>
              <div className="text-[10px] text-white/50">{user.assessments} 个测评</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-amber-400">{user.score.toLocaleString()}</div>
              <div className="text-[10px] text-white/40">积分</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function CommunityShare() {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState<string | null>('share')

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <button 
          onClick={() => activePage ? setActivePage(null) : navigate('/app/discover')}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          {activePage ? '返回' : '返回探索'}
        </button>
        <h1 className="text-xl sm:text-2xl font-bold mb-1">📤 测评分享</h1>
        <p className="text-xs sm:text-sm text-white/60">分享洞察，发现相似灵魂</p>
      </motion.div>

      {activePage ? (
        <motion.div
          key={activePage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {activePage === 'share' && <ShareResultPage />}
          {activePage === 'souls' && <FindSoulsPage />}
          {activePage === 'leaderboard' && <LeaderboardPage />}
        </motion.div>
      ) : (
        <div className="space-y-3">
          {shareItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  if (item.id === 'share-result') setActivePage('share')
                  else if (item.id === 'find-souls') setActivePage('souls')
                  else if (item.id === 'leaderboard') setActivePage('leaderboard')
                }}
                className={`p-4 rounded-2xl bg-gradient-to-br ${item.colorGradient} border ${item.colorBorder} cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${item.colorText}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white/80">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/50">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
