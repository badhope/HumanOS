import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, BookOpen, Brain, Users, Lightbulb } from 'lucide-react'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import { FadeInSection } from '@components/animations'
import { optimizedAnimationConfig } from '@utils/animation-config'

const timeline = [
  {
    period: '古希腊时期',
    year: '公元前5-4世纪',
    title: '哲学心理学的萌芽',
    description: '苏格拉底、柏拉图、亚里士多德等哲学家开始探讨灵魂、心智、情感等心理现象。亚里士多德的《论灵魂》被认为是第一部心理学著作，为后来的心理学研究奠定了哲学基础。',
    keyFigures: ['苏格拉底', '柏拉图', '亚里士多德'],
    icon: Lightbulb
  },
  {
    period: '文艺复兴时期',
    year: '14-17世纪',
    title: '人文主义与理性主义',
    description: '随着文艺复兴运动的兴起，人们开始重新审视人的本质。笛卡尔提出"我思故我在"，将心灵与身体区分开来，为现代心理学的研究对象奠定了基础。',
    keyFigures: ['笛卡尔', '斯宾诺莎', '莱布尼茨'],
    icon: BookOpen
  },
  {
    period: '科学心理学诞生',
    year: '1879年',
    title: '冯特建立第一个心理学实验室',
    description: '威廉·冯特在德国莱比锡大学建立了世界上第一个心理学实验室，标志着心理学从哲学中分离出来，成为一门独立的科学。冯特被誉为"心理学之父"。',
    keyFigures: ['威廉·冯特', '铁钦纳', '詹姆斯'],
    icon: Brain
  },
  {
    period: '行为主义时代',
    year: '1913-1950年代',
    title: '行为主义的兴起与主导',
    description: '华生发表《行为主义者眼中的心理学》，开创了行为主义学派。行为主义强调可观察的行为，反对研究内在心理过程。斯金纳的操作性条件反射理论影响深远。',
    keyFigures: ['华生', '斯金纳', '巴甫洛夫'],
    icon: Users
  },
  {
    period: '认知革命',
    year: '1950-1960年代',
    title: '认知心理学的崛起',
    description: '随着计算机科学的发展，心理学家开始用信息加工的观点研究心理过程。认知心理学重新关注注意、记忆、思维等内在心理过程，开创了心理学研究的新纪元。',
    keyFigures: ['奈瑟', '米勒', '西蒙'],
    icon: Brain
  },
  {
    period: '现代心理学',
    year: '1980年代至今',
    title: '多元化发展',
    description: '现代心理学呈现多元化发展趋势，认知神经科学、进化心理学、积极心理学等新兴领域不断涌现。心理学与其他学科的交叉融合，推动了心理学的快速发展。',
    keyFigures: ['卡尼曼', '塞利格曼', '戈尔曼'],
    icon: Lightbulb
  }
]

const majorSchools = [
  {
    name: '构造主义',
    founder: '冯特、铁钦纳',
    description: '研究意识的结构，通过内省法分析心理元素。',
    influence: '为实验心理学奠定基础'
  },
  {
    name: '机能主义',
    founder: '詹姆斯、杜威',
    description: '研究意识的机能，关注心理活动的作用和目的。',
    influence: '推动应用心理学发展'
  },
  {
    name: '行为主义',
    founder: '华生、斯金纳',
    description: '研究可观察的行为，强调环境对行为的塑造作用。',
    influence: '广泛应用于教育和治疗'
  },
  {
    name: '格式塔心理学',
    founder: '韦特海默、考夫卡',
    description: '强调整体大于部分之和，研究知觉组织原则。',
    influence: '影响认知心理学和设计学'
  },
  {
    name: '精神分析',
    founder: '弗洛伊德、荣格',
    description: '研究无意识心理过程，强调早期经历的影响。',
    influence: '开创心理治疗新方法'
  },
  {
    name: '人本主义',
    founder: '马斯洛、罗杰斯',
    description: '强调人的潜能和自我实现，关注积极心理品质。',
    influence: '推动积极心理学发展'
  }
]

export default function PsychologyHistoryPage() {
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
          人类心理学发展脉络概述
        </h1>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed">
          从古希腊哲学家的灵魂探索，到现代认知神经科学的突破，人类对心理的理解经历了漫长而精彩的旅程。
        </p>
      </motion.div>

      <FadeInSection className="mb-12 sm:mb-16">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">心理学：探索心灵的科学</h2>
          <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
            心理学是研究心理现象及其规律的科学。它既是一门基础学科，探索心理活动的基本规律；
            也是一门应用学科，将研究成果应用于教育、医疗、管理、体育等各个领域。
          </p>
          <p className="text-white/70 leading-relaxed text-sm sm:text-base">
            从哲学的思辨到科学的实验，从关注意识结构到研究行为表现，从探索无意识到认知革命，
            心理学的发展历程反映了人类对自身认识的不断深化。
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-blue-400 font-medium">{item.year}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/60 text-sm">{item.period}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-3 text-sm sm:text-base">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.keyFigures.map((figure, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm"
                      >
                        {figure}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">主要学派</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {majorSchools.map((school, index) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: optimizedAnimationConfig.isMobile ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={optimizedAnimationConfig.getTransition({ delay: index * optimizedAnimationConfig.staggerDelay })}
              className="glass rounded-xl p-4 sm:p-6 touch-manipulation"
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{school.name}</h3>
              <p className="text-blue-400 text-xs sm:text-sm mb-2 sm:mb-3">创始人：{school.founder}</p>
              <p className="text-white/60 leading-relaxed mb-2 sm:mb-3 text-sm">{school.description}</p>
              <p className="text-white/40 text-xs sm:text-sm">影响：{school.influence}</p>
            </motion.div>
          ))}
        </div>
      </FadeInSection>
    </div>
  )
}
