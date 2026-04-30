import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface AssessmentCardProps {
  onDismiss?: () => void
}

export default function AssessmentCard({ onDismiss }: AssessmentCardProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative"
    >
      <div className="bg-gradient-to-br from-violet-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl p-5 border border-violet-500/20">
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 hover:text-white/60 transition-colors"
          >
            ✕
          </button>
        )}

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🧠</span>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">还没做过测评？</h3>
            <p className="text-sm text-white/50 mb-4">
              3分钟完成人格测评，定制专属于你的心灵成长方案
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/legacy/categories')}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                开始测评
              </button>
              <button
                onClick={onDismiss}
                className="px-5 py-2 rounded-lg bg-white/5 text-white/60 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                下次再说
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
