import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface BootScreenProps {
  onComplete: () => void
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('正在初始化...')

  useEffect(() => {
    const stages = [
      { target: 30, text: '加载资源配置...', duration: 400 },
      { target: 55, text: '初始化组件...', duration: 350 },
      { target: 75, text: '加载测评数据...', duration: 300 },
      { target: 90, text: '准备用户界面...', duration: 250 },
      { target: 100, text: '启动完成', duration: 200 },
    ]

    let currentIndex = 0

    const runStage = () => {
      if (currentIndex >= stages.length) {
        setTimeout(onComplete, 300)
        return
      }

      const stage = stages[currentIndex]
      setStatusText(stage.text)

      const startProgress = progress
      const endProgress = stage.target
      const duration = stage.duration
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const t = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - t, 3)
        const newProgress = Math.round(startProgress + (endProgress - startProgress) * easeOut)

        setProgress(newProgress)

        if (t < 1) {
          requestAnimationFrame(animate)
        } else {
          currentIndex++
          runStage()
        }
      }

      requestAnimationFrame(animate)
    }

    const initialDelay = setTimeout(runStage, 200)
    return () => clearTimeout(initialDelay)
  }, [onComplete, progress])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-500/10 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-500/10 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="relative z-10 w-72 sm:w-80">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl"
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 via-pink-500 to-orange-500 p-1"
            animate={{
              boxShadow: [
                '0 0 30px rgba(139, 92, 246, 0.3)',
                '0 0 60px rgba(236, 72, 153, 0.4)',
                '0 0 30px rgba(139, 92, 246, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
              >
                OS
              </motion.span>
            </div>
          </motion.div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white mb-1">HumanOS</h2>
            <p className="text-slate-400 text-sm">自我认知系统</p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>{statusText}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <div className="space-y-1 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>版本</span>
              <span>2.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>内核</span>
              <span>PsychCore v3.2</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-slate-600"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 text-slate-500 text-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        正在进入系统...
      </motion.div>
    </motion.div>
  )
}
