import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Users, Target, Heart, Sparkles } from 'lucide-react'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import { FadeInSection } from '@components/animations'
import { optimizedAnimationConfig } from '@utils/animation-config'

const timeline = [
  {
    year: '2023',
    title: '理念萌芽',
    description: '创始团队在深入研究心理学测评领域后，发现现有测评工具存在诸多不足：缺乏科学性、用户体验差、结果解读困难。于是萌生了打造一个真正专业、科学、易用的测评平台的想法。',
    icon: Sparkles
  },
  {
    year: '2023',
    title: '团队组建',
    description: '汇聚心理学专家、软件工程师、用户体验设计师等多领域人才，组建了跨学科的核心团队。团队成员来自知名高校和企业，拥有丰富的专业背景。',
    icon: Users
  },
  {
    year: '2024',
    title: '产品研发',
    description: '历时一年多的研发，完成了测评算法设计、题库建设、平台架构搭建等核心工作。期间进行了多轮用户测试和专家评审，确保产品的科学性和实用性。',
    icon: Target
  },
  {
    year: '2024',
    title: '平台上线',
    description: '心镜 MindMirror 正式上线，首批推出MBTI、大五人格、霍兰德职业兴趣等经典测评。平台采用现代化技术架构，提供流畅的用户体验和专业的测评服务。',
    icon: Heart
  }
]

const coreValues = [
  {
    title: '科学性',
    description: '所有测评均基于权威心理学理论，经过严格的信效度验证，确保测评结果的准确性和可靠性。'
  },
  {
    title: '专业性',
    description: '由心理学专家团队设计题目和解读报告，提供专业、深入的分析和建议。'
  },
  {
    title: '易用性',
    description: '简洁直观的界面设计，流畅的交互体验，让每个人都能轻松完成测评。'
  },
  {
    title: '隐私保护',
    description: '所有数据本地存储，严格保护用户隐私，用户完全掌控自己的数据。'
  }
]

export default function PlatformStoryPage() {
  const { navigate } = useTransitionNavigate()

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto safe-area-top safe-area-bottom">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={optimizedAnimationConfig.getTransition()}
        className="mb-8 sm:mb-12"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 min-h-[48px] px-4 -ml-4 touch-manipulation"
        >
          <ArrowLeft className="w-5 h-5 flex-shrink-0" />
          <span className="whitespace-nowrap">返回</span>
        </button>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          平台发展由来与背景故事
        </h1>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed">
          心镜 MindMirror 的诞生源于对人类自我认知的深刻思考。我们相信，每个人都值得被科学地理解和尊重。
        </p>
      </motion.div>

      <FadeInSection className="mb-12 sm:mb-16">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">我们的愿景</h2>
          <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
            在信息爆炸的时代，人们越来越渴望了解真实的自己。然而，市面上的测评工具良莠不齐，
            很多缺乏科学依据，甚至可能误导用户。我们希望改变这一现状，打造一个真正专业、
            科学、值得信赖的测评平台。
          </p>
          <p className="text-white/70 leading-relaxed text-sm sm:text-base">
            心镜 MindMirror 不仅仅是一个测评工具，更是一个帮助人们探索自我、发现潜能、规划人生的平台。
            我们相信，科学的自我认知是个人成长的基础，而专业的测评工具是实现这一目标的重要途径。
          </p>
        </div>
      </FadeInSection>

      <FadeInSection className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">发展历程</h2>
        <div className="space-y-4 sm:space-y-6">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: optimizedAnimationConfig.isMobile ? -15 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={optimizedAnimationConfig.getTransition({ delay: index * optimizedAnimationConfig.staggerDelay })}
              className="glass rounded-xl p-4 sm:p-6 touch-manipulation"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <Calendar className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    <span className="text-violet-400 font-medium">{item.year}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm sm:text-base">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">核心价值观</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: optimizedAnimationConfig.isMobile ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={optimizedAnimationConfig.getTransition({ delay: index * optimizedAnimationConfig.staggerDelay })}
              className="glass rounded-xl p-4 sm:p-6 touch-manipulation"
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{value.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">我们的团队</h2>
          <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
            心镜 MindMirror 团队由心理学专家、软件工程师、用户体验设计师等多领域人才组成。
            我们的团队成员来自知名高校和企业，拥有丰富的专业背景和实践经验。
          </p>
          <p className="text-white/70 leading-relaxed text-sm sm:text-base">
            我们相信，跨学科的合作是打造优秀产品的关键。心理学专家确保测评的科学性，
            工程师保证平台的稳定性和性能，设计师创造流畅的用户体验。正是这种协作，
            让心镜 MindMirror 能够为用户提供真正专业、易用的测评服务。
          </p>
        </div>
      </FadeInSection>
    </div>
  )
}
