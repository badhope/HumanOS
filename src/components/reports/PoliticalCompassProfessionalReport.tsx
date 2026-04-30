import { motion } from 'framer-motion'
import { Compass, Target, Award, TrendingUp, Users, Zap, Scale, Globe } from 'lucide-react'
import type { AssessmentResult } from '../../types'
import { safeDimensions, getScoreBand } from './utils'

interface PoliticalCompassReportProps {
  result: AssessmentResult
  mode?: 'normal' | 'advanced' | 'professional'
}

const COMPASS_QUADRANTS = [
  { x: -1, y: 1, name: '威权左派', color: 'from-red-600 to-rose-500', desc: '大政府，高福利' },
  { x: 1, y: 1, name: '威权右派', color: 'from-blue-600 to-sky-500', desc: '大政府，低税收' },
  { x: -1, y: -1, name: '自由左派', color: 'from-green-600 to-emerald-500', desc: '小政府，高福利' },
  { x: 1, y: -1, name: '自由右派', color: 'from-yellow-600 to-amber-500', desc: '小政府，低税收' },
]

export default function PoliticalCompassProfessionalReport({ result, mode = 'normal' }: PoliticalCompassReportProps) {
  const dimensions = safeDimensions(result?.dimensions, ['economic', 'social'])
  const x = dimensions.find(d => d.name === 'economic')?.score || 50
  const y = dimensions.find(d => d.name === 'social')?.score || 50
  const economicAxis = ((x - 50) / 50).toFixed(2)
  const socialAxis = ((y - 50) / 50).toFixed(2)
  
  const quadrant = COMPASS_QUADRANTS.find(q => 
    (q.x > 0 ? x > 50 : x <= 50) && (q.y > 0 ? y > 50 : y <= 50)
  ) || COMPASS_QUADRANTS[0]
  
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${quadrant.color} opacity-90`} />
        <div className="relative p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-white/80" />
              <span className="text-white/80 font-medium">政治罗盘测评 · 专业报告</span>
            </div>
            {mode === 'professional' && (
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center gap-2">
                <Award className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">专业版</span>
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-5xl font-black text-white mb-3">{quadrant.name}</h1>
            <p className="text-white/80 text-xl mb-4">{quadrant.desc}</p>
            <div className="flex gap-6">
              <div className="text-white/60">
                <span className="text-white font-bold">经济轴: </span> {economicAxis} 
                <span className="text-white/40 ml-2">(左←→右)</span>
              </div>
              <div className="text-white/60">
                <span className="text-white font-bold">社会轴: </span> {socialAxis}
                <span className="text-white/40 ml-2">(自由←→威权)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Compass className="w-6 h-6 text-blue-400" />
          政治罗盘图
        </h3>
        <div className="relative w-full aspect-square max-w-lg mx-auto">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <div className="bg-red-500/20 border-r border-b border-white/10" />
            <div className="bg-blue-500/20 border-b border-white/10" />
            <div className="bg-emerald-500/20 border-r border-white/10" />
            <div className="bg-amber-500/20" />
          </div>
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30" />
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute w-6 h-6 rounded-full bg-white shadow-lg"
            style={{ left: `${x}%`, top: `${100 - y}%`, transform: 'translate(-50%, -50%)' }}
          />
          <div className="absolute top-2 left-2 text-red-300 text-sm font-bold">威权左派</div>
          <div className="absolute top-2 right-2 text-blue-300 text-sm font-bold">威权右派</div>
          <div className="absolute bottom-2 left-2 text-emerald-300 text-sm font-bold">自由左派</div>
          <div className="absolute bottom-2 right-2 text-amber-300 text-sm font-bold">自由右派</div>
        </div>
      </motion.div>
    </div>
  )
}
