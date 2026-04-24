import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Users, Briefcase, Search, MapPin, Sparkles, RefreshCw, ArrowRight } from 'lucide-react'
import { useSoulMatch } from '@hooks/useSoulMatch'
import { GlowCard } from '@components/animations'
import ParticleBackground from '@components/ParticleBackground'
import { usePageTransition } from '@components/animations/PageTransitionController'

const mockUserDimensions = {
  darkTriad: 62,
  empathy: 78,
  openness: 85,
  neuroticism: 45,
}

export default function SoulMatch() {
  const { navigateWithTransition } = usePageTransition()
  const [scanning, setScanning] = useState(true)
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const { matches, loading, getMatchLevel } = useSoulMatch(mockUserDimensions)

  const handleNavigate = (path: string) => {
    navigateWithTransition(path, {
      preset: 'page',
      loadingText: '正在加载...',
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (scanning || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-950 to-fuchsia-950 flex items-center justify-center relative overflow-hidden">
        <ParticleBackground variant="mixed" />
        <div className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-violet-500/30"
          >
            <Search className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white mb-2"
          >
            正在扫描你的灵魂...
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/60"
          >
            寻找三公里内和你同频的灵魂
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2 }}
            className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full mt-6 max-w-xs mx-auto"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-950 to-fuchsia-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <ParticleBackground variant="stars" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              🔮 灵魂匹配
            </span>
          </h1>
          <p className="text-white/60 text-lg">
            在这个星球上，总有一个和你同频的灵魂
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <GlowCard
            className="rounded-3xl overflow-hidden"
            glowColor="rgba(139, 92, 246, 0.4)"
          >
            <div className="p-8 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 border border-violet-500/20">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center text-4xl shadow-xl"
                  >
                    {matches[0]?.avatar}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {matches[0]?.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/60 text-sm justify-center">
                    <MapPin className="w-4 h-4" />
                    <span>{matches[0]?.distance}km · 你附近</span>
                  </div>
                </div>

                <div className="text-center">
                  <Sparkles className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                  <motion.div
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-5xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent bg-size-200"
                  >
                    {matches[0]?.matchPercentage}%
                  </motion.div>
                  <p className={`text-lg font-semibold bg-gradient-to-r ${getMatchLevel(matches[0]?.matchPercentage || 0).color} bg-clip-text text-transparent`}>
                    {getMatchLevel(matches[0]?.matchPercentage || 0).level}
                  </p>
                </div>

                <div className="text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-4xl shadow-xl"
                  >
                    🧑
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    你
                  </h3>
                  <div className="text-white/60 text-sm">
                    正在寻找灵魂伴侣
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-black/20 border border-white/5">
                <p className="text-center text-white/80 italic">
                  "{matches[0]?.quote}"
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { icon: Heart, label: '恋爱契合', value: matches[0]?.compatibility.love },
                  { icon: Users, label: '友情契合', value: matches[0]?.compatibility.friendship },
                  { icon: Briefcase, label: '工作契合', value: matches[0]?.compatibility.work },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <item.icon className="w-6 h-6 mx-auto mb-2 text-violet-400" />
                    <div className="text-2xl font-bold text-white">{item.value}%</div>
                    <div className="text-white/60 text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">其他可能的灵魂</h2>
          <button
            onClick={() => setScanning(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            重新匹配
          </button>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {matches.slice(1).map((match, index) => {
              const level = getMatchLevel(match.matchPercentage)
              const isExpanded = selectedMatch === match.id

              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  layout
                >
                  <GlowCard
                    className="rounded-2xl overflow-hidden cursor-pointer"
                    glowColor="rgba(139, 92, 246, 0.2)"
                    onClick={() => setSelectedMatch(isExpanded ? null : match.id)}
                  >
                    <div className="p-5 bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                          {match.avatar}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-white">{match.name}</h3>
                            <span className={`px-2 py-0.5 rounded-lg text-xs font-medium bg-gradient-to-r ${level.color} text-white`}>
                              {match.matchPercentage}%
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {match.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-lg text-xs bg-white/5 text-white/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-white/60">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{match.distance}km</span>
                          <ArrowRight
                            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-white/5">
                              <p className="text-white/70 italic mb-4">"{match.quote}"</p>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="text-center p-2 rounded-xl bg-white/5">
                                  <Heart className="w-4 h-4 mx-auto mb-1 text-pink-400" />
                                  <div className="font-bold text-white">{match.compatibility.love}%</div>
                                  <div className="text-white/50 text-xs">恋爱</div>
                                </div>
                                <div className="text-center p-2 rounded-xl bg-white/5">
                                  <Users className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                                  <div className="font-bold text-white">{match.compatibility.friendship}%</div>
                                  <div className="text-white/50 text-xs">友情</div>
                                </div>
                                <div className="text-center p-2 rounded-xl bg-white/5">
                                  <Briefcase className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                                  <div className="font-bold text-white">{match.compatibility.work}%</div>
                                  <div className="text-white/50 text-xs">工作</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-center"
        >
          <p className="text-white/40 text-sm">
            * 本功能仅供娱乐，真正的灵魂需要用心寻找 💜
          </p>
          <button
            onClick={() => handleNavigate('/')}
            className="mt-4 px-6 py-2 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 text-violet-300 transition-colors"
          >
            去测更多测评，提高匹配准确度 →
          </button>
        </motion.div>
      </div>
    </div>
  )
}
