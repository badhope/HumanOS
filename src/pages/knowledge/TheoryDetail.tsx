import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Clock, Award, Users, Lightbulb, GraduationCap, FileText, ChevronRight } from 'lucide-react'

const theoryDatabase: Record<string, {
  title: string
  subtitle: string
  icon: string
  gradient: string
  history: { title: string; content: string }[]
  foundations: { author: string; year: string; contribution: string }[]
  keyConcepts: { name: string; description: string; icon: React.ReactNode }[]
  applications: string[]
  references: { title: string; author: string }[]
}> = {
  'eq-goleman': {
    title: '戈尔曼情商模型',
    subtitle: 'Daniel Goleman Emotional Intelligence Framework',
    icon: '🧠',
    gradient: 'from-pink-500 to-rose-500',
    history: [
      {
        title: '理论起源',
        content: '1990年，心理学家彼得·萨洛维（Peter Salovey）和约翰·梅耶（John Mayer）首次提出"情绪智力"概念，将其定义为"监控自己和他人的感受和情绪，并用这些信息来指导自己的思考和行动的能力"。'
      },
      {
        title: '戈尔曼的贡献',
        content: '1995年，《纽约时报》科学记者丹尼尔·戈尔曼（Daniel Goleman）出版《情商：为什么情商比智商更重要》一书，将情商理论带入大众视野。他提出了五维情商框架，强调情商在职业成功和个人生活中的决定性作用。'
      },
      {
        title: '商业界的接纳',
        content: '至2000年，情商已成为全球500强企业领导力培训的核心内容。研究表明，高层管理者的成功中，情商因素贡献超过80%，而传统智商仅占不到20%。'
      }
    ],
    foundations: [
      { author: 'Peter Salovey & John Mayer', year: '1990', contribution: '首次提出情绪智力概念' },
      { author: 'Daniel Goleman', year: '1995', contribution: '《情商》出版，五维模型建立' },
      { author: 'Richard Boyatzis', year: '1998', contribution: '情商与领导力实证研究' },
      { author: 'Goleman et al.', year: '2002', contribution: '《Primal Leadership》出版' },
    ],
    keyConcepts: [
      { name: '自我觉察', description: '识别自身情绪、优势、局限、价值观和驱动力的能力', icon: <Lightbulb className="w-5 h-5" /> },
      { name: '自我管理', description: '控制或转移破坏性情绪和冲动的能力', icon: <Clock className="w-5 h-5" /> },
      { name: '自我激励', description: '面对挫折坚持不懈、延迟满足的能力', icon: <Award className="w-5 h-5" /> },
      { name: '同理心', description: '感受他人情绪、换位思考的能力', icon: <Users className="w-5 h-5" /> },
      { name: '社交技能', description: '管理他人情绪、建立人际关系网络的能力', icon: <Users className="w-5 h-5" /> },
    ],
    applications: [
      '企业领导力培训与高管选拔',
      '学校情商教育课程开发',
      '心理咨询与心理治疗干预',
      '团队建设与组织发展',
      '冲突调解与谈判策略',
      '婚姻家庭关系辅导',
    ],
    references: [
      { title: '《情商：为什么情商比智商更重要》', author: 'Daniel Goleman, 1995' },
      { title: '《Working with Emotional Intelligence》', author: 'Daniel Goleman, 1998' },
      { title: '《Primal Leadership》', author: 'Goleman, Boyatzis, McKee, 2002' },
      { title: '《Emotional Intelligence 2.0》', author: 'Bradberry & Greaves, 2009' },
    ],
  },
  'cast-parenting': {
    title: '中国式家长研究',
    subtitle: 'Cultural Psychology of East Asian Parenting',
    icon: '👨‍👩‍👧‍👦',
    gradient: 'from-violet-500 to-purple-500',
    history: [
      {
        title: '文化心理学视角',
        content: '斯坦福教育人类学家对东亚家庭教养方式的跨文化研究表明，中国式育儿的核心特征是"高投入+高期望+高控制"的"三高"模式，这与集体主义文化和科举传统深刻相关。'
      },
      {
        title: '社会转型期的焦虑',
        content: '1978年改革开放后，中国社会快速阶层流动加剧了教育焦虑。"寒门出贵子"的信念与阶层固化的现实形成巨大张力，催生了独特的"报班狂热"与"攀比文化"。'
      },
      {
        title: '三维教养矩阵模型',
        content: '当代研究者提出焦虑-控制-温暖三维模型：焦虑维度源于社会竞争压力，控制维度承袭儒家家长权威传统，温暖维度则体现现代化过程中的亲子观念变迁。'
      }
    ],
    foundations: [
      { author: 'Stanford GSE', year: '2010', contribution: '东亚家庭教养方式跨文化研究' },
      { author: 'Chua, Amy', year: '2011', contribution: '《虎妈战歌》出版引发全球讨论' },
      { author: '北大教育学院', year: '2015', contribution: '中国家庭教育投入追踪调查' },
      { author: '复旦社会学院', year: '2020', contribution: '教育焦虑与阶层再生产研究' },
    ],
    keyConcepts: [
      { name: '报班焦虑', description: '教育消费主义驱动下的集体非理性行为', icon: <Clock className="w-5 h-5" /> },
      { name: '攀比狂热', description: '横向比较成为育儿成功的主要标尺', icon: <Award className="w-5 h-5" /> },
      { name: '阶层执念', description: '教育作为阶层跃迁的唯一合法路径', icon: <GraduationCap className="w-5 h-5" /> },
      { name: '道德绑架', description: '用牺牲叙事构建的亲子权力关系', icon: <FileText className="w-5 h-5" /> },
    ],
    applications: [
      '家庭教育咨询与干预',
      '家长心理健康支持',
      '学校-家庭合作机制建设',
      '教育政策制定参考',
      '亲子关系调解',
      '青少年心理健康干预',
    ],
    references: [
      { title: '《虎妈战歌》', author: 'Amy Chua, 2011' },
      { title: '《吾国教育病理》', author: '郑也夫, 2013' },
      { title: '《教育的目的》', author: '怀特海, 1929' },
      { title: '《爱弥儿》', author: '卢梭, 1762' },
    ],
  },
  'behavioral-economics': {
    title: '行为经济学',
    subtitle: 'Kahneman Prospect Theory & Heuristics',
    icon: '⚖️',
    gradient: 'from-blue-500 to-cyan-500',
    history: [
      {
        title: '对理性人假设的挑战',
        content: '传统经济学假设人是理性且自私的。1970年代，卡尼曼和特沃斯基通过一系列心理实验证明：人类决策系统性偏离理性预期，开创了行为经济学这一全新领域。'
      },
      {
        title: '前景理论的诞生',
        content: '1979年，卡尼曼和特沃斯基发表《前景理论：风险决策的分析》，揭示了损失厌恶、锚定效应、框架效应等认知偏差。该论文成为经济学史上被引用最多的文献之一。'
      },
      {
        title: '诺贝尔奖的认可',
        content: '2002年，丹尼尔·卡尼曼获得诺贝尔经济学奖。2017年，理查德·塞勒因"助推理论"再次获奖。行为经济学从边缘走向主流，深刻改变了政策制定和商业实践。'
      }
    ],
    foundations: [
      { author: 'Kahneman & Tversky', year: '1979', contribution: '前景理论发表，行为经济学奠基' },
      { author: 'Richard Thaler', year: '1980', contribution: '心理账户概念提出' },
      { author: 'Daniel Kahneman', year: '2002', contribution: '诺贝尔经济学奖' },
      { author: 'Richard Thaler', year: '2017', contribution: '助推理论获诺奖认可' },
    ],
    keyConcepts: [
      { name: '损失厌恶', description: '损失带来的痛苦是同等收益快乐的2.5倍', icon: <Lightbulb className="w-5 h-5" /> },
      { name: '锚定效应', description: '第一印象成为后续判断的参照点', icon: <FileText className="w-5 h-5" /> },
      { name: '框架效应', description: '同一个问题的不同表述导致截然不同的决策', icon: <FileText className="w-5 h-5" /> },
      { name: '心理账户', description: '人们在心中将钱分门别类管理', icon: <FileText className="w-5 h-5" /> },
      { name: '沉没成本谬误', description: '因为已经投入而继续错误的行为', icon: <Clock className="w-5 h-5" /> },
    ],
    applications: [
      '公共政策制定与助推设计',
      '金融投资行为分析',
      '市场营销与消费者行为研究',
      '产品设计与用户体验优化',
      '健康行为干预',
      '组织管理与激励机制设计',
    ],
    references: [
      { title: '《思考，快与慢》', author: 'Daniel Kahneman, 2011' },
      { title: '《错误的行为》', author: 'Richard Thaler, 2015' },
      { title: '《助推》', author: 'Thaler & Sunstein, 2008' },
      { title: '《非理性繁荣》', author: 'Robert Shiller, 2000' },
    ],
  },
  'political-spectrum': {
    title: '政治光谱分析',
    subtitle: 'Multi-dimensional Ideology Mapping',
    icon: '🏛️',
    gradient: 'from-amber-500 to-orange-500',
    history: [
      {
        title: '左右二分法的起源',
        content: '1789年法国大革命期间，支持王室的坐在议会右侧，支持革命的坐在左侧——这就是"左-右"政治分野的由来。这种简单二分法主导了政治话语两个世纪。'
      },
      {
        title: '二维模型的突破',
        content: '1960年代后，研究者意识到单维左右光谱不足以描述复杂意识形态。经济议题（平等vs自由）和社会议题（权威vs自由）构成的二维矩阵成为学术界主流范式。'
      },
      {
        title: '多维意识形态时代',
        content: '当代研究进一步细化：国家主义vs个人主义、进步主义vs保守主义、全球化vs本土主义、集体主义vs个体主义，构成超越左右的复杂意识形态空间。'
      }
    ],
    foundations: [
      { author: '法国大革命', year: '1789', contribution: '左-右分野的起源' },
      { author: 'Hans Eysenck', year: '1954', contribution: '第一个二维政治光谱模型' },
      { author: 'Milton Rokeach', year: '1973', contribution: '自由-平等两维度理论' },
      { author: '当代政治科学', year: '2000+', contribution: '多维意识形态模型' },
    ],
    keyConcepts: [
      { name: '经济维度', description: '经济平等 vs 市场自由', icon: <FileText className="w-5 h-5" /> },
      { name: '文化维度', description: '传统价值 vs 进步多元', icon: <FileText className="w-5 h-5" /> },
      { name: '国家维度', description: '威权秩序 vs 个人自由', icon: <FileText className="w-5 h-5" /> },
      { name: '认同维度', description: '民族主义 vs 全球主义', icon: <FileText className="w-5 h-5" /> },
    ],
    applications: [
      '选民行为分析与选举预测',
      '政治传播与话语分析',
      '公共舆论研究',
      '政策制定与共识构建',
      '国际关系与外交分析',
      '政治极化研究',
    ],
    references: [
      { title: '《开放社会及其敌人》', author: 'Karl Popper, 1945' },
      { title: '《正义论》', author: 'John Rawls, 1971' },
      { title: '《自由宪章》', author: 'Friedrich Hayek, 1960' },
      { title: '《意识形态的终结》', author: 'Daniel Bell, 1960' },
    ],
  },
}

export default function TheoryDetail() {
  const { theoryId } = useParams<{ theoryId: string }>()
  const navigate = useNavigate()
  const theory = theoryId ? theoryDatabase[theoryId] : null

  if (!theory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">理论不存在</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl bg-violet-500 text-white"
            type="button"
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
            返回理论基石
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`relative overflow-hidden rounded-3xl p-8 mb-12 bg-gradient-to-br ${theory.gradient}/20 border border-white/10`}
        >
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${theory.gradient} opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
          
          <div className="relative">
            <div className="text-6xl mb-4">{theory.icon}</div>
            <h1 className="text-4xl font-bold text-white mb-2">{theory.title}</h1>
            <p className="text-white/60 text-lg">{theory.subtitle}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-amber-400" />
            历史背景
          </h2>
          <div className="space-y-6">
            {theory.history.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative pl-8 pb-6 border-l-2 border-white/10 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Award className="w-6 h-6 text-violet-400" />
            理论奠基
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {theory.foundations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="rounded-2xl p-5 bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
              >
                <div className="text-violet-400 text-sm font-bold mb-1">{item.year}</div>
                <div className="text-white font-semibold mb-1">{item.author}</div>
                <div className="text-white/50 text-sm">{item.contribution}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            核心概念
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {theory.keyConcepts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="group rounded-2xl p-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">{item.name}</h3>
                </div>
                <p className="text-white/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            应用领域
          </h2>
          <div className="rounded-2xl p-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {theory.applications.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-white/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-rose-400" />
            推荐阅读
          </h2>
          <div className="space-y-3">
            {theory.references.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/5 border border-rose-500/20"
              >
                <BookOpen className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">{item.title}</div>
                  <div className="text-white/50 text-sm">{item.author}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
