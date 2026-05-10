import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface EQResult {
  [key: string]: any
}

export function EQReport({ result }: { result: EQResult }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-pink-900/20 to-slate-900 p-8 border border-pink-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center shadow-2xl shadow-pink-500/30">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold">
                {result.classificationEmoji} EQ {result.classification || '待评估'}
              </span>
              <span className="text-white/40 text-sm">总情商 {result.totalEQ || '-'}</span>
              <span className="text-white/40 text-sm">超过 {result.percentile || 0}% 人群</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">戈尔曼情绪智力专业测评报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.typeDescription || ''}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
              {result.totalEQ || '-'}
            </div>
            <div className="text-white/40 text-sm mt-1">总情商指数</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
