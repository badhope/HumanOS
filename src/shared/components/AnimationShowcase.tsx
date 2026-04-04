import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, Code2 } from 'lucide-react'
import { CodeBlock } from './CodeBlock'

interface AnimationExample {
  id: string
  name: string
  description: string
  code: string
  component: React.ReactNode
}

const animationExamples: AnimationExample[] = [
  {
    id: 'fade-in',
    name: '淡入淡出',
    description: '最基础的动画效果，适用于页面切换和元素显示',
    code: `motion.div({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 }
})`,
    component: (
      <motion.div
        className="w-32 h-32 bg-gradient-to-br from-violet-500 to-pink-500 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    )
  },
  {
    id: 'slide-up',
    name: '上滑进入',
    description: '元素从下方滑入，常用于列表项和卡片',
    code: `motion.div({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    type: "spring",
    stiffness: 100 
  }
})`,
    component: (
      <motion.div
        className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      />
    )
  },
  {
    id: 'scale',
    name: '缩放动画',
    description: '元素从小到大缩放，适合按钮点击和弹窗',
    code: `motion.div({
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { 
    type: "spring",
    stiffness: 200,
    damping: 15
  }
})`,
    component: (
      <motion.div
        className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />
    )
  },
  {
    id: 'rotate',
    name: '旋转动画',
    description: '元素旋转效果，可用于加载和切换状态',
    code: `motion.div({
  animate: { rotate: 360 },
  transition: { 
    duration: 2,
    repeat: Infinity,
    ease: "linear"
  }
})`,
    component: (
      <motion.div
        className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    )
  },
  {
    id: 'bounce',
    name: '弹跳效果',
    description: '物理弹跳动画，增加趣味性和互动感',
    code: `motion.div({
  animate: { y: [0, -30, 0] },
  transition: { 
    duration: 1,
    repeat: Infinity,
    ease: "easeInOut"
  }
})`,
    component: (
      <motion.div
        className="w-32 h-32 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    )
  },
  {
    id: 'stagger',
    name: '交错动画',
    description: '多个元素依次动画，适合列表和网格',
    code: `const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}`,
    component: (
      <motion.div
        className="flex gap-2"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-16 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          />
        ))}
      </motion.div>
    )
  }
]

export function AnimationShowcase() {
  const [activeExample, setActiveExample] = useState(animationExamples[0])
  const [key, setKey] = useState(0)

  const handleReplay = () => {
    setKey(prev => prev + 1)
  }

  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            动画效果展示
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            使用 Framer Motion 实现流畅的动画效果，提升用户体验
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {animationExamples.map((example) => (
                <motion.button
                  key={example.id}
                  type="button"
                  onClick={() => {
                    setActiveExample(example)
                    handleReplay()
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeExample.id === example.id
                      ? 'bg-violet-500 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {example.name}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeExample.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CodeBlock
                  code={activeExample.code}
                  language="typescript"
                  title={activeExample.name}
                  description={activeExample.description}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-white">实时预览</h4>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReplay}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors text-sm"
                type="button"
              >
                <RotateCcw className="w-3 h-3" />
                重播
              </motion.button>
            </div>

            <div className="flex-1 min-h-[400px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeExample.id}-${key}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {activeExample.component}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
