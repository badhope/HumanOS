import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Globe, Users, BookOpen, Lightbulb } from 'lucide-react'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import { FadeInSection } from '@components/animations'
import { optimizedAnimationConfig } from '@utils/animation-config'

const timeline = [
  {
    period: '古代意识形态',
    year: '公元前3000年-公元5世纪',
    title: '宗教与神话时代',
    description: '古代社会的意识形态以宗教信仰和神话传说为核心。古埃及的法老崇拜、美索不达米亚的城邦神祇、中国的天命思想，都为统治提供了神圣合法性。儒家思想成为中国两千年的主流意识形态。',
    keyIdeologies: ['宗教神权', '天命思想', '儒家伦理'],
    icon: Lightbulb
  },
  {
    period: '中世纪意识形态',
    year: '5-15世纪',
    title: '宗教统治与神权政治',
    description: '基督教成为欧洲的主导意识形态，教会掌握精神权威。伊斯兰教在中东兴起并迅速传播。佛教在东亚地区影响深远。宗教意识形态深刻影响着政治、经济和社会生活。',
    keyIdeologies: ['基督教神权', '伊斯兰教法', '佛教思想'],
    icon: BookOpen
  },
  {
    period: '启蒙时代',
    year: '17-18世纪',
    title: '理性主义与人权思想',
    description: '启蒙运动挑战了传统的宗教权威，倡导理性、自由、平等。洛克、卢梭、孟德斯鸠等思想家提出了社会契约论、人民主权说、三权分立等现代政治理念，为现代民主制度奠定了思想基础。',
    keyIdeologies: ['自由主义', '民主主义', '人权思想'],
    icon: Lightbulb
  },
  {
    period: '19世纪',
    year: '19世纪',
    title: '意识形态的多元化',
    description: '工业革命带来了社会结构的深刻变化，催生了多种意识形态。自由主义、保守主义、社会主义、民族主义等思潮并存。马克思主义的诞生为工人运动提供了理论武器，深刻影响了世界历史。',
    keyIdeologies: ['马克思主义', '自由主义', '民族主义'],
    icon: Users
  },
  {
    period: '20世纪',
    year: '20世纪',
    title: '意识形态的对抗与融合',
    description: '自由主义、法西斯主义、共产主义三大意识形态激烈对抗。冷战结束后，自由民主制似乎取得胜利，但新的意识形态挑战不断涌现。后现代主义、多元文化主义等新思潮兴起。',
    keyIdeologies: ['自由民主', '共产主义', '法西斯主义'],
    icon: Globe
  },
  {
    period: '当代意识形态',
    year: '21世纪',
    title: '全球化与多元共存',
    description: '全球化带来了意识形态的碰撞与融合。民粹主义、环保主义、女权主义等新兴意识形态崛起。传统意识形态面临挑战，新的价值观念不断涌现，意识形态呈现多元化发展趋势。',
    keyIdeologies: ['民粹主义', '环保主义', '多元文化主义'],
    icon: Globe
  }
]

const majorIdeologies = [
  {
    name: '自由主义',
    origin: '17世纪英国',
    description: '强调个人自由、权利和有限政府。主张市场经济、法治和民主制度。从古典自由主义到现代自由主义，经历了长期发展。',
    keyFigures: ['洛克', '密尔', '罗尔斯'],
    influence: '现代民主制度的思想基础'
  },
  {
    name: '保守主义',
    origin: '18世纪末',
    description: '强调传统、秩序和渐进改革。反对激进变革，维护社会稳定和道德秩序。现代保守主义与自由主义有诸多融合。',
    keyFigures: ['伯克', '奥克肖特', '斯克拉顿'],
    influence: '维护社会稳定的重要力量'
  },
  {
    name: '社会主义',
    origin: '19世纪初',
    description: '追求社会平等和公正，反对资本主义剥削。从空想社会主义到科学社会主义，形成了多种流派。民主社会主义在北欧取得成功。',
    keyFigures: ['马克思', '恩格斯', '伯恩施坦'],
    influence: '推动了社会福利制度建立'
  },
  {
    name: '民族主义',
    origin: '18-19世纪',
    description: '强调民族认同和民族自决。推动了民族国家的建立，但也导致了诸多冲突。现代民族主义呈现复杂面貌。',
    keyFigures: ['赫尔德', '费希特', '安德森'],
    influence: '塑造了现代世界政治格局'
  },
  {
    name: '女权主义',
    origin: '19世纪',
    description: '追求性别平等和女性权利。从争取选举权到追求全面平等，经历了多个发展阶段。现代女权主义关注多元议题。',
    keyFigures: ['沃斯通克拉夫特', '波伏娃', '巴特勒'],
    influence: '推动了性别平等运动'
  },
  {
    name: '环保主义',
    origin: '20世纪60年代',
    description: '关注环境保护和可持续发展。从环境保护运动到气候变化应对，环保主义已成为重要政治力量。',
    keyFigures: ['卡逊', '戈尔', '通贝里'],
    influence: '推动了环保政策制定'
  }
]

const ideologicalFunctions = [
  {
    function: '世界观塑造',
    description: '意识形态为人们提供理解世界的框架，解释社会现象和历史进程。'
  },
  {
    function: '价值引导',
    description: '意识形态确立价值标准，引导人们的行为选择和社会实践。'
  },
  {
    function: '政治动员',
    description: '意识形态能够凝聚人心，动员群众参与政治活动和社会运动。'
  },
  {
    function: '合法性建构',
    description: '意识形态为政治权力提供合法性论证，维护社会秩序稳定。'
  },
  {
    function: '社会整合',
    description: '意识形态促进社会团结，形成共同认同和集体意识。'
  },
  {
    function: '批判反思',
    description: '意识形态提供批判现实的思想武器，推动社会变革和进步。'
  }
]

export default function IdeologyHistoryPage() {
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
          意识形态发展历史纲要
        </h1>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed">
          意识形态塑造了人类社会的面貌。从古代的宗教信仰到现代的政治理念，不同的意识形态反映了人类对理想社会的追求和探索。
        </p>
      </motion.div>

      <FadeInSection className="mb-12 sm:mb-16">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">意识形态：思想的武器</h2>
          <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
            意识形态（Ideology）一词由法国哲学家德斯蒂·德·特拉西在18世纪末创造，原意为"观念的科学"。
            后来，马克思赋予了它新的含义，指代统治阶级维护自身利益的观念体系。
          </p>
          <p className="text-white/70 leading-relaxed text-sm sm:text-base">
            意识形态是一套系统的观念和信仰，它解释世界、确立价值、指导行动。从宗教神权到世俗理念，
            从个人主义到集体主义，意识形态塑造了人类社会的政治、经济和文化面貌。理解意识形态的发展，
            有助于我们认识当代世界的复杂性和多样性。
          </p>
        </div>
      </FadeInSection>

      <FadeInSection className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">意识形态发展历程</h2>
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <Calendar className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span className="text-pink-400 font-medium">{item.year}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/60 text-sm">{item.period}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-3 text-sm sm:text-base">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.keyIdeologies.map((ideology, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs sm:text-sm"
                      >
                        {ideology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">主要意识形态</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {majorIdeologies.map((ideology, index) => (
            <motion.div
              key={ideology.name}
              initial={{ opacity: 0, y: optimizedAnimationConfig.isMobile ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={optimizedAnimationConfig.getTransition({ delay: index * optimizedAnimationConfig.staggerDelay })}
              className="glass rounded-xl p-4 sm:p-6 touch-manipulation"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-white">{ideology.name}</h3>
                <span className="text-pink-400 text-xs sm:text-sm">{ideology.origin}</span>
              </div>
              <p className="text-white/60 leading-relaxed mb-2 sm:mb-3 text-sm">{ideology.description}</p>
              <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                {ideology.keyFigures.map((figure, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs sm:text-sm"
                  >
                    {figure}
                  </span>
                ))}
              </div>
              <p className="text-white/40 text-xs sm:text-sm">影响：{ideology.influence}</p>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">意识形态的功能</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {ideologicalFunctions.map((item, index) => (
            <motion.div
              key={item.function}
              initial={{ opacity: 0, y: optimizedAnimationConfig.isMobile ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={optimizedAnimationConfig.getTransition({ delay: index * optimizedAnimationConfig.staggerDelay })}
              className="glass rounded-xl p-4 sm:p-6 touch-manipulation"
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{item.function}</h3>
              <p className="text-white/60 leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </FadeInSection>
    </div>
  )
}
