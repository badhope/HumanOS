import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, BookOpen, Compass, Lightbulb, Users } from 'lucide-react'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import { FadeInSection } from '@components/animations'
import { optimizedAnimationConfig } from '@utils/animation-config'

const timeline = [
  {
    period: '古希腊哲学',
    year: '公元前6-4世纪',
    title: '西方哲学的起源',
    description: '泰勒斯、赫拉克利特等自然哲学家开始用理性思考世界本原。苏格拉底将哲学从自然转向人事，开创了伦理学。柏拉图的理念论和亚里士多德的形而上学奠定了西方哲学的基础。',
    keyFigures: ['苏格拉底', '柏拉图', '亚里士多德'],
    keyIdeas: ['理念论', '形而上学', '伦理学'],
    icon: Lightbulb
  },
  {
    period: '中世纪哲学',
    year: '5-15世纪',
    title: '神学与哲学的融合',
    description: '基督教哲学成为主流，奥古斯丁和托马斯·阿奎那将古希腊哲学与基督教神学相结合。经院哲学探讨信仰与理性的关系，为后来的哲学发展提供了重要思想资源。',
    keyFigures: ['奥古斯丁', '托马斯·阿奎那', '安瑟尔谟'],
    keyIdeas: ['上帝存在的证明', '信仰与理性', '共相问题'],
    icon: BookOpen
  },
  {
    period: '近代哲学',
    year: '17-18世纪',
    title: '理性主义与经验主义',
    description: '笛卡尔的"我思故我在"开创了近代哲学。理性主义（笛卡尔、斯宾诺莎、莱布尼茨）和经验主义（洛克、贝克莱、休谟）的争论推动了认识论的发展。康德的批判哲学试图调和二者。',
    keyFigures: ['笛卡尔', '康德', '休谟'],
    keyIdeas: ['我思故我在', '先天综合判断', '物自体'],
    icon: Compass
  },
  {
    period: '德国古典哲学',
    year: '18-19世纪',
    title: '哲学体系的构建',
    description: '康德、费希特、谢林、黑格尔构建了宏大的哲学体系。黑格尔的辩证法影响了后来的哲学发展。费尔巴哈的人本主义和马克思的辩证唯物主义开创了新的哲学方向。',
    keyFigures: ['康德', '黑格尔', '马克思'],
    keyIdeas: ['绝对精神', '辩证法', '历史唯物主义'],
    icon: Users
  },
  {
    period: '现代哲学',
    year: '19-20世纪',
    title: '分析哲学与现象学',
    description: '弗雷格、罗素、维特根斯坦开创了分析哲学，关注语言和逻辑。胡塞尔创立现象学，海德格尔、萨特发展了存在主义。两大传统至今仍深刻影响着哲学研究。',
    keyFigures: ['维特根斯坦', '海德格尔', '萨特'],
    keyIdeas: ['语言分析', '存在主义', '现象学还原'],
    icon: Lightbulb
  },
  {
    period: '当代哲学',
    year: '20世纪至今',
    title: '多元化发展',
    description: '后现代主义、实用主义、心灵哲学等多元思潮并存。福柯、德里达等后现代哲学家质疑传统哲学的宏大叙事。认知科学的发展推动了心灵哲学的繁荣。',
    keyFigures: ['福柯', '德里达', '罗蒂'],
    keyIdeas: ['解构主义', '权力话语', '新实用主义'],
    icon: Compass
  }
]

const easternPhilosophy = [
  {
    name: '中国哲学',
    period: '公元前6世纪至今',
    description: '儒家、道家、墨家、法家等诸子百家争鸣，形成了独特的中国哲学传统。儒家强调仁义礼智，道家追求自然无为，对中国文化影响深远。',
    keyFigures: ['孔子', '老子', '庄子']
  },
  {
    name: '印度哲学',
    period: '公元前15世纪至今',
    description: '印度哲学源远流长，包括正统六派和非正统三派。佛教哲学对东亚文化影响深远，瑜伽哲学关注身心修炼，吠檀多哲学探讨宇宙本质。',
    keyFigures: ['释迦牟尼', '商羯罗', '龙树']
  },
  {
    name: '日本哲学',
    period: '7世纪至今',
    description: '日本哲学融合了中国哲学、佛教和西方哲学，形成了独特的思想体系。禅宗哲学、京都学派等对世界哲学产生了重要影响。',
    keyFigures: ['西田几多郎', '铃木大拙', '和辻哲郎']
  }
]

const majorQuestions = [
  {
    question: '什么是存在？',
    description: '形而上学探讨存在的本质，追问世界的本原和实在的性质。'
  },
  {
    question: '我们能知道什么？',
    description: '认识论研究知识的来源、范围和确定性，探讨认识的可能性。'
  },
  {
    question: '什么是善？',
    description: '伦理学探讨道德原则和价值判断，研究行为的对错标准。'
  },
  {
    question: '什么是美？',
    description: '美学研究美的本质和审美活动，探讨艺术和美的价值。'
  },
  {
    question: '什么是正义？',
    description: '政治哲学探讨理想社会的组织原则，研究权力的合法性。'
  },
  {
    question: '什么是心灵？',
    description: '心灵哲学研究意识的本质，探讨心身关系和心理现象。'
  }
]

export default function PhilosophyHistoryPage() {
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
          哲学思想演进历程简介
        </h1>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed">
          哲学是人类智慧的结晶，从苏格拉底的追问到现代存在主义的思考，哲学家们不断探索存在、知识、价值等根本问题。
        </p>
      </motion.div>

      <FadeInSection className="mb-12 sm:mb-16">
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">哲学：爱智慧之学</h2>
          <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
            哲学（Philosophy）一词源于希腊语"philo-sophia"，意为"爱智慧"。哲学是对世界、人生、
            知识、价值等根本问题的系统性思考和追问。它不满足于表面的答案，而是深入探究事物的本质。
          </p>
          <p className="text-white/70 leading-relaxed text-sm sm:text-base">
            从古希腊的城邦广场到现代的学术殿堂，哲学始终是人类思想的前沿。它不仅塑造了我们的世界观和价值观，
            也为科学、艺术、政治等领域提供了思想基础。哲学的历史，就是人类思想不断深化的历史。
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-amber-400 font-medium">{item.year}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/60 text-sm">{item.period}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-3 text-sm sm:text-base">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.keyFigures.map((figure, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs sm:text-sm"
                      >
                        {figure}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.keyIdeas.map((idea, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-xs"
                      >
                        {idea}
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
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">东方哲学</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {easternPhilosophy.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: optimizedAnimationConfig.isMobile ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={optimizedAnimationConfig.getTransition({ delay: index * optimizedAnimationConfig.staggerDelay })}
              className="glass rounded-xl p-4 sm:p-6 touch-manipulation"
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{region.name}</h3>
              <p className="text-amber-400 text-xs sm:text-sm mb-3">{region.period}</p>
              <p className="text-white/60 leading-relaxed mb-3 text-sm">{region.description}</p>
              <div className="flex flex-wrap gap-2">
                {region.keyFigures.map((figure, i) => (
                  <span key={i} className="text-white/40 text-xs">
                    {figure}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">哲学的核心问题</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {majorQuestions.map((q, index) => (
            <motion.div
              key={q.question}
              initial={{ opacity: 0, y: optimizedAnimationConfig.isMobile ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={optimizedAnimationConfig.getTransition({ delay: index * optimizedAnimationConfig.staggerDelay })}
              className="glass rounded-xl p-4 sm:p-6 touch-manipulation"
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{q.question}</h3>
              <p className="text-white/60 leading-relaxed text-sm">{q.description}</p>
            </motion.div>
          ))}
        </div>
      </FadeInSection>
    </div>
  )
}
