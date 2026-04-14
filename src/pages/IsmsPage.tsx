import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Compass, Lightbulb, Users } from 'lucide-react'
import { useTransitionNavigate } from '@hooks/useTransitionNavigate'
import { FadeInSection } from '@components/animations'

const isms = [
  {
    name: '存在主义',
    category: '哲学',
    description: '强调个人存在、自由和选择。认为人首先存在，然后通过选择定义自己。萨特、海德格尔、加缪是代表人物。',
    keyIdeas: ['存在先于本质', '自由选择', '荒诞'],
    icon: Lightbulb
  },
  {
    name: '实用主义',
    category: '哲学',
    description: '强调实践和效果，认为真理在于其实用价值。皮尔士、詹姆斯、杜威是代表人物，对美国文化影响深远。',
    keyIdeas: ['实用即真理', '工具主义', '经验主义'],
    icon: Compass
  },
  {
    name: '理性主义',
    category: '哲学',
    description: '强调理性是知识的来源，反对经验主义。笛卡尔、斯宾诺莎、莱布尼茨是代表人物，奠定了近代哲学基础。',
    keyIdeas: ['天赋观念', '理性直观', '演绎推理'],
    icon: Lightbulb
  },
  {
    name: '经验主义',
    category: '哲学',
    description: '强调经验是知识的来源，反对天赋观念。洛克、贝克莱、休谟是代表人物，推动了科学方法论发展。',
    keyIdeas: ['白板说', '感觉经验', '归纳推理'],
    icon: BookOpen
  },
  {
    name: '唯物主义',
    category: '哲学',
    description: '认为物质是世界的本原，意识是物质的产物。从古代唯物主义到辩证唯物主义，形成了完整体系。',
    keyIdeas: ['物质第一性', '意识第二性', '辩证法'],
    icon: Compass
  },
  {
    name: '唯心主义',
    category: '哲学',
    description: '认为精神或意识是世界的本原。从柏拉图的理念论到黑格尔的绝对精神，形成了丰富的思想传统。',
    keyIdeas: ['理念世界', '绝对精神', '主观唯心'],
    icon: Lightbulb
  },
  {
    name: '集体主义',
    category: '政治',
    description: '强调集体利益高于个人利益，个人应服从集体。在不同历史时期有不同的表现形式。',
    keyIdeas: ['集体优先', '公共利益', '社会责任'],
    icon: Users
  },
  {
    name: '个人主义',
    category: '政治',
    description: '强调个人自由、权利和价值，反对集体对个人的压制。是自由主义的核心价值。',
    keyIdeas: ['个人自由', '个人权利', '自我实现'],
    icon: Compass
  },
  {
    name: '功利主义',
    category: '伦理',
    description: '主张行为的正确性取决于其结果，追求最大多数人的最大幸福。边沁、密尔是代表人物。',
    keyIdeas: ['最大幸福原则', '效用计算', '结果主义'],
    icon: Lightbulb
  },
  {
    name: '虚无主义',
    category: '哲学',
    description: '否认传统价值和意义，认为生命没有内在目的。尼采、海德格尔等哲学家深入探讨了虚无主义问题。',
    keyIdeas: ['价值重估', '上帝已死', '虚无'],
    icon: BookOpen
  },
  {
    name: '相对主义',
    category: '哲学',
    description: '否认绝对真理和普遍价值，认为真理和价值是相对的。文化相对主义、道德相对主义是其重要形式。',
    keyIdeas: ['真理相对性', '文化差异', '价值多元'],
    icon: Compass
  },
  {
    name: '绝对主义',
    category: '哲学',
    description: '主张存在绝对真理和普遍价值，反对相对主义。在伦理学、认识论等领域有重要影响。',
    keyIdeas: ['绝对真理', '普遍价值', '客观标准'],
    icon: Lightbulb
  }
]

const categories = [
  { name: '哲学', count: isms.filter(i => i.category === '哲学').length },
  { name: '政治', count: isms.filter(i => i.category === '政治').length },
  { name: '伦理', count: isms.filter(i => i.category === '伦理').length }
]

export default function IsmsPage() {
  const { navigate } = useTransitionNavigate()

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </button>

        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          各种主义
        </h1>
        <p className="text-lg text-white/70 leading-relaxed">
          "主义"是系统化的思想和主张。从存在主义到实用主义，从理性主义到经验主义，这些思想体系塑造了人类文明的面貌。
        </p>
      </motion.div>

      {/* Introduction */}
      <FadeInSection className="mb-16">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">什么是"主义"？</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            "主义"（-ism）是一种后缀，表示某种学说、主张或运动。它代表了一套系统化的思想体系，
            包含特定的世界观、价值观和方法论。不同的主义反映了人们对世界、社会、人生的不同理解。
          </p>
          <p className="text-white/70 leading-relaxed">
            从哲学上的存在主义、实用主义，到政治上的自由主义、社会主义，再到伦理上的功利主义、
            德性伦理学，各种主义构成了人类思想宝库的重要组成部分。了解这些主义，有助于我们更好地
            理解世界和自己。
          </p>
        </div>
      </FadeInSection>

      {/* Categories */}
      <FadeInSection className="mb-12">
        <div className="flex flex-wrap gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl px-6 py-3"
            >
              <span className="text-white font-medium">{category.name}</span>
              <span className="text-violet-400 ml-2">({category.count})</span>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      {/* Isms Grid */}
      <FadeInSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isms.map((ism, index) => (
            <motion.div
              key={ism.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl p-6 hover:bg-white/5 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <ism.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{ism.name}</h3>
                    <span className="text-violet-400 text-sm">{ism.category}</span>
                  </div>
                  <p className="text-white/60 leading-relaxed mb-3 text-sm">{ism.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {ism.keyIdeas.map((idea, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs"
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
    </div>
  )
}
