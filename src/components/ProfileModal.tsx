import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, User, Sparkles } from 'lucide-react'
import { useAppStore, createDefaultProfile } from '../store'
import type { UserProfile } from '../types'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user: profile, setUser: setProfile, updateUserProfile: updateProfile } = useAppStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<UserProfile | null>(profile)

  const handleSave = () => {
    if (editData) {
      updateProfile(editData)
      setIsEditing(false)
    }
  }

  const handleCreateProfile = () => {
    const newProfile = createDefaultProfile()
    setProfile(newProfile)
    setEditData(newProfile)
  }

  if (!profile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl p-8 max-w-md w-full mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">欢迎来到 HumanOS</h2>
              <p className="text-white/60 mb-8">创建你的个人资料，开始探索自我之旅</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateProfile}
                className="px-8 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white font-semibold"
              >
                创建资料
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">个人资料</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-violet-500/30"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center border-4 border-violet-500/30">
                    <span className="text-3xl font-bold text-white">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 p-2 bg-violet-500 rounded-full shadow-lg"
                >
                  <Camera className="w-4 h-4 text-white" />
                </motion.button>
              </motion.div>

              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData?.name || ''}
                    onChange={(e) => setEditData({ ...editData!, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white mb-2 focus:outline-none focus:border-violet-500"
                    placeholder="你的昵称"
                    aria-label="昵称"
                  />
                ) : (
                  <h3 className="text-xl font-bold text-white mb-1">{profile.name}</h3>
                )}
                <p className="text-white/50 text-sm">
                  加入于 {new Date(profile.createdAt).toLocaleDateString('zh-CN')}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-white/60 text-sm mb-2 block">个人简介</label>
              {isEditing ? (
                <textarea
                  value={editData?.bio || ''}
                  onChange={(e) => setEditData({ ...editData!, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-violet-500 resize-none"
                  rows={3}
                  placeholder="介绍一下你自己..."
                />
              ) : (
                <p className="text-white/80 bg-white/5 rounded-xl p-4">
                  {profile.bio || '这个人很懒，什么都没写'}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white font-semibold"
                  >
                    保存
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setEditData(profile)
                      setIsEditing(false)
                    }}
                    className="px-6 py-3 glass rounded-xl text-white/80 font-semibold"
                  >
                    取消
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setEditData(profile)
                    setIsEditing(true)
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  编辑资料
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
