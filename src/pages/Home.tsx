/**
 * ==============================================
 * 🏠 首页主页面组件 - v2.5.0
 * ==============================================
 * 【极简设计】
 * - 单一大按钮「进入我的世界」居中
 * - 深邃宇宙背景 + 粒子效果
 */

import { useEffect } from 'react'
import { preloader } from '@utils/preloader'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { usePageTransition } from '@components/animations/PageTransitionController'
import { ShimmerText } from '@components/TypingEffect'
import ParticleBackground from '@components/ParticleBackground'
import { StandardContainer } from '@components/layout'
import {
  staggerContainer,
  staggerItem,
} from '@utils/animation-config'
import { useRef } from 'react'

export default function Home() {
  const { navigateWithTransition } = usePageTransition()
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { once: true })

  useEffect(() => {
    preloader.start()
  }, [])

  const handleEnter = () => {
    navigateWithTransition('/assessments', {
      preset: 'page',
      loadingText: '正在打开你的世界...',
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground variant="stars" />
      <motion.section
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-safe pb-safe pl-safe pr-safe"
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-violet-500/15 blur-3xl"
            animate={{
              x: [0, 80, 0],
              y: [0, 50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl"
            animate={{
              x: [0, -60, 0],
              y: [0, -40, 0],
              scale: [1.3, 1, 1.3],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-violet-500/8 to-blue-500/8 blur-3xl"
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <StandardContainer className="relative z-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? 'enter' : 'initial'}
            className="text-center"
          >
          <motion.div
            variants={staggerItem}
            className="mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-br from-white/8 to-transparent border border-violet-500/20 backdrop-blur-xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5 text-violet-400" />
              </motion.div>
              <ShimmerText
                  text="v3.0.0 · 心镜 MindMirror · 心灵镜像"
                  shimmerColor="rgba(139, 92, 246, 0.8)"
                  className="text-white/90 font-medium"
              />
            </motion.div>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 leading-tight tracking-tight"
          >
            <motion.span
              className="inline-block text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              humanitys
            </motion.span>
            <motion.span
              className="inline-block bg-gradient-to-br from-violet-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent mx-1"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              style={{
                textShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
              }}
            >
              OS
            </motion.span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-2xl text-violet-400/80 font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            心镜 MindMirror
          </motion.p>

          <motion.p
            variants={staggerItem}
            className="text-xl sm:text-2xl text-white/50 mb-16 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            观照内心，自成一界
          </motion.p>

          <motion.div
            variants={staggerItem}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2, type: 'spring' }}
          >
            <motion.button
              onClick={handleEnter}
              className="group relative overflow-hidden px-16 py-6 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 text-white font-bold text-xl shadow-2xl shadow-violet-500/30"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative flex items-center gap-4">
                <span>进入我的世界</span>
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.span>
              </div>
            </motion.button>
          </motion.div>

          <motion.div
            variants={staggerItem}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-16 flex justify-center gap-12"
          >
            {[
              { value: 50, suffix: '+', label: '专业测评' },
              { value: 1000000, suffix: '+', label: '用户信赖' },
              { value: 2, suffix: '+', label: '模拟世界' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.15, duration: 0.6 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-br from-violet-400 to-blue-500 bg-clip-text text-transparent">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          </motion.div>
          </StandardContainer>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 border-t border-violet-500/10 bg-gradient-to-b from-slate-950 to-slate-900"
        >
          <StandardContainer>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6"
              >
                <span className="text-violet-400 text-sm">🪞 关于心镜</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                  心镜 MindMirror
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-light text-white/60 mb-4"
              >
                照见自己，成为更好的自己
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg text-white/40 max-w-2xl mx-auto"
              >
                以心为镜，用科学的方法认识真实的自己
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: '🔍',
                  title: '科学测评',
                  desc: '基于经典心理学理论，43+ 专业测评帮你全面认识自己',
                  gradient: 'from-violet-500 to-blue-500'
                },
                {
                  icon: '💪',
                  title: '系统训练',
                  desc: '不止于测评，更提供可执行的系统化心理训练方案',
                  gradient: 'from-pink-500 to-rose-500'
                },
                {
                  icon: '📈',
                  title: '成长追踪',
                  desc: '可视化的成长数据，见证你每一步的改变与进步',
                  gradient: 'from-amber-500 to-orange-500'
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all group"
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-white/50">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="max-w-3xl mx-auto text-center p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-pink-500/10 border border-violet-500/20"
            >
              <p className="text-xl text-white/70 leading-relaxed mb-6 italic">
                "你的潜意识指引着你的人生，而你称其为命运。
                <br />当潜意识被呈现，命运就被改写了。"
              </p>
              <p className="text-white/40">—— 卡尔·荣格</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center mt-16 pt-8 border-t border-white/10"
            >
              <p className="text-white/30 text-sm">
                © {new Date().getFullYear()} 心镜 MindMirror. 照见自己，成为更好的自己。
              </p>
            </motion.div>
          </StandardContainer>
        </motion.section>
    </div>
  )
}
