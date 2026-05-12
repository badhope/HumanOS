import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Music, CloudSun, Leaf, Play, Pause, Volume2, VolumeX, Heart } from 'lucide-react'

const resources = [
  {
    id: 'meditation',
    title: '冥想音乐',
    description: '深度放松音频',
    icon: Music,
    badge: '热门',
    color: 'violet',
    colorGradient: 'from-violet-500/30 to-purple-500/30',
    colorBorder: 'border-violet-500/20',
    colorText: 'text-violet-400',
    tracks: [
      { id: 'med-1', name: '森林冥想', duration: '15:00' },
      { id: 'med-2', name: '海浪放松', duration: '20:00' },
      { id: 'med-3', name: '雨后清晨', duration: '12:00' },
      { id: 'med-4', name: '月光冥想', duration: '18:00' }
    ]
  },
  {
    id: 'whitenoise',
    title: '白噪音',
    description: '专注工作背景音',
    icon: CloudSun,
    color: 'blue',
    colorGradient: 'from-blue-500/30 to-cyan-500/30',
    colorBorder: 'border-blue-500/20',
    colorText: 'text-blue-400',
    tracks: [
      { id: 'white-1', name: '雨声', duration: '∞' },
      { id: 'white-2', name: '咖啡馆', duration: '∞' },
      { id: 'white-3', name: '图书馆', duration: '∞' },
      { id: 'white-4', name: '壁炉', duration: '∞' }
    ]
  },
  {
    id: 'nature',
    title: '自然声音',
    description: '森林、海浪等自然音效',
    icon: Leaf,
    color: 'emerald',
    colorGradient: 'from-emerald-500/30 to-teal-500/30',
    colorBorder: 'border-emerald-500/20',
    colorText: 'text-emerald-400',
    tracks: [
      { id: 'nat-1', name: '森林鸟鸣', duration: '∞' },
      { id: 'nat-2', name: '山间溪流', duration: '∞' },
      { id: 'nat-3', name: '海风吹拂', duration: '∞' },
      { id: 'nat-4', name: '夏夜虫鸣', duration: '∞' }
    ]
  }
]

function ResourcePlayer({ resource }: { resource: typeof resources[0] }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null)
  const [volume, setVolume] = useState(70)
  const [favorites, setFavorites] = useState<string[]>([])

  const togglePlay = () => setIsPlaying(!isPlaying)
  
  const toggleFavorite = (trackId: string) => {
    setFavorites(prev => 
      prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
    )
  }

  return (
    <div className="space-y-3">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${resource.colorGradient} flex items-center justify-center ${resource.colorText}`}>
              <resource.icon size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">{resource.title}</h3>
              <p className="text-[10px] text-white/50">{resource.description}</p>
            </div>
          </div>
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-violet-500/30 text-violet-400'
                : 'bg-white/10 text-white/70'
            }`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setVolume(volume > 0 ? volume - 10 : 0)}
            className="text-white/50 hover:text-white transition-colors"
          >
            <VolumeX size={16} />
          </button>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
              initial={{ width: '70%' }}
              animate={{ width: `${volume}%` }}
            />
          </div>
          <button
            onClick={() => setVolume(volume < 100 ? volume + 10 : 100)}
            className="text-white/50 hover:text-white transition-colors"
          >
            <Volume2 size={16} />
          </button>
        </div>

        <div className="text-[10px] text-white/30 text-center">
          {isPlaying && selectedTrack
            ? `正在播放: ${resource.tracks.find(t => t.id === selectedTrack)?.name}`
            : isPlaying
            ? '选择一首曲目开始播放'
            : '点击播放按钮开始'
          }
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-white/70 px-1">选择曲目</div>
        {resource.tracks.map((track) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedTrack(track.id)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
              selectedTrack === track.id
                ? 'bg-white/10 border-white/20'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                selectedTrack === track.id ? 'bg-violet-500/30' : 'bg-white/10'
              }`}>
                {selectedTrack === track.id && isPlaying ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Music size={14} className="text-violet-400" />
                  </motion.div>
                ) : (
                  <Music size={14} className="text-white/50" />
                )}
              </div>
              <div>
                <div className="text-sm text-white">{track.name}</div>
                <div className="text-[10px] text-white/40">{track.duration}</div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(track.id)
              }}
              className={`p-2 rounded-lg transition-colors ${
                favorites.includes(track.id)
                  ? 'text-red-400'
                  : 'text-white/30 hover:text-white/50'
              }`}
            >
              <Heart size={16} fill={favorites.includes(track.id) ? 'currentColor' : 'none'} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function LibraryResources() {
  const navigate = useNavigate()
  const [activeResource, setActiveResource] = useState<string | null>(null)

  const currentResource = resources.find(r => r.id === activeResource)

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <button 
          onClick={() => setActiveResource(null)}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          {activeResource ? '返回资源列表' : '返回探索'}
        </button>
        <h1 className="text-xl sm:text-2xl font-bold mb-1">🎵 放松资源</h1>
        <p className="text-xs sm:text-sm text-white/60">聆听声音，回归内心平静</p>
      </motion.div>

      {activeResource && currentResource ? (
        <motion.div
          key={activeResource}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ResourcePlayer resource={currentResource} />
        </motion.div>
      ) : (
        <div className="space-y-3">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveResource(resource.id)}
                className={`p-4 rounded-2xl bg-gradient-to-br ${resource.colorGradient} border ${resource.colorBorder} cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center ${resource.colorText}`}>
                    <Icon size={28} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-white">{resource.title}</h3>
                      {resource.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white/80">
                          {resource.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/50">{resource.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {resource.tracks.map((track) => (
                        <span key={track.id} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          {track.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-white/30">
                    <Play size={24} />
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
