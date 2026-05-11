import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Lightbulb, FileText, MessageCircle, Send, Clock, CheckCircle, User } from 'lucide-react'

const expertItems = [
  {
    id: 'qa',
    title: '在线问答',
    description: '向专家提问',
    icon: Lightbulb,
    badge: '专业',
    color: 'amber',
    colorGradient: 'from-amber-500/30 to-orange-500/30',
    colorBorder: 'border-amber-500/20',
    colorText: 'text-amber-400'
  },
  {
    id: 'articles',
    title: '心理科普',
    description: '专家科普文章',
    icon: FileText,
    color: 'blue',
    colorGradient: 'from-blue-500/30 to-cyan-500/30',
    colorBorder: 'border-blue-500/20',
    colorText: 'text-blue-400'
  }
]

const experts = [
  {
    id: 1,
    name: '张明博士',
    avatar: '👨‍⚕️',
    title: '临床心理咨询师',
    specialties: ['焦虑抑郁', '情绪管理', '职场心理'],
    answered: 234
  },
  {
    id: 2,
    name: '李华教授',
    avatar: '👩‍🏫',
    title: '发展心理学专家',
    specialties: ['儿童心理', '亲子关系', '成长发展'],
    answered: 189
  },
  {
    id: 3,
    name: '王强老师',
    avatar: '🧑‍💼',
    title: '婚姻家庭咨询师',
    specialties: ['亲密关系', '婚姻家庭', '沟通技巧'],
    answered: 156
  }
]

const qaCategories = [
  { id: 'anxiety', name: '焦虑问题', count: 45 },
  { id: 'depression', name: '抑郁情绪', count: 38 },
  { id: 'relationship', name: '人际关系', count: 56 },
  { id: 'career', name: '职业发展', count: 29 },
  { id: 'family', name: '家庭关系', count: 42 },
  { id: 'growth', name: '个人成长', count: 67 }
]

const popularQuestions = [
  {
    id: 1,
    question: '总是过度担心一些小事怎么办？',
    expert: '张明博士',
    expertAvatar: '👨‍⚕️',
    answer: '过度担心可能是一种焦虑倾向。建议尝试以下方法：1) 识别触发担心的思维；2) 问自己"最坏的结果是什么？发生的可能性有多大？"；3) 练习深呼吸和正念冥想；4) 如果影响日常生活，建议寻求专业帮助。',
    time: '2天前',
    likes: 89
  },
  {
    id: 2,
    question: '如何改善和父母的沟通？',
    expert: '李华教授',
    expertAvatar: '👩‍🏫',
    answer: '代际沟通确实存在挑战。建议：1) 先理解父母的出发点；2) 选择合适的时机表达自己的感受；3) 使用"我感受到..."而非"你总是..."的表达方式；4) 给彼此一些空间和时间。',
    time: '1周前',
    likes: 156
  }
]

function ExpertQAPage() {
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null)
  const [question, setQuestion] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (question.trim()) {
      setSent(true)
      setTimeout(() => {
        setSent(false)
        setQuestion('')
      }, 2000)
    }
  }

  return (
    <div className="space-y-4">
      {!selectedExpert ? (
        <>
          <div className="space-y-3">
            <div className="text-xs font-medium text-white/70 px-1">选择专家</div>
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedExpert(expert)}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-xl">
                    {expert.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{expert.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                        已回答 {expert.answered} 题
                      </span>
                    </div>
                    <div className="text-xs text-white/50 mb-1">{expert.title}</div>
                    <div className="flex items-center gap-2">
                      {expert.specialties.map((spec) => (
                        <span key={spec} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="text-xs font-medium text-white/70 px-1 mb-3">热门问答</div>
            <div className="space-y-3">
              {popularQuestions.map((qa, index) => (
                <motion.div
                  key={qa.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="text-sm font-medium text-white mb-2">Q: {qa.question}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-white/50">A:</span>
                    <span className="text-[10px] text-amber-400">{qa.expert}</span>
                    <span className="text-[10px] text-white/40">· {qa.time}</span>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-3">{qa.answer}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-white/40 flex items-center gap-1">
                      <CheckCircle size={10} className="text-emerald-400" />
                      专业解答
                    </span>
                    <span className="text-[10px] text-white/40 flex items-center gap-1">
                      👍 {qa.likes}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-xl">
              {selectedExpert.avatar}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{selectedExpert.name}</div>
              <div className="text-xs text-white/60">{selectedExpert.title}</div>
            </div>
            <button
              onClick={() => setSelectedExpert(null)}
              className="text-xs text-white/50 hover:text-white transition-colors"
            >
              更换
            </button>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-white/50 mb-2">选择问题类型</div>
            <div className="flex flex-wrap gap-2">
              {qaCategories.map((cat) => (
                <button
                  key={cat.id}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 transition-colors"
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="详细描述你的问题..."
              className="w-full h-32 bg-transparent text-sm text-white placeholder-white/30 resize-none focus:outline-none"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
              <span className="text-[10px] text-white/40 flex items-center gap-1">
                <Clock size={10} />
                预计 24 小时内回复
              </span>
              <button
                onClick={handleSend}
                disabled={!question.trim() || sent}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  sent
                    ? 'bg-emerald-500/30 text-emerald-300'
                    : question.trim()
                    ? 'bg-amber-500/30 hover:bg-amber-500/40 text-amber-300'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                {sent ? (
                  <>
                    <CheckCircle size={16} />
                    已发送
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    发送问题
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function ExpertArticlesPage() {
  const [articles] = useState([
    {
      id: 1,
      title: '如何识别和应对焦虑情绪',
      expert: '张明博士',
      expertAvatar: '👨‍⚕️',
      category: '情绪管理',
      readTime: 8,
      views: 2345
    },
    {
      id: 2,
      title: '儿童心理健康：家长必知的信号',
      expert: '李华教授',
      expertAvatar: '👩‍🏫',
      category: '儿童心理',
      readTime: 10,
      views: 1890
    },
    {
      id: 3,
      title: '建立健康亲密关系的心理学建议',
      expert: '王强老师',
      expertAvatar: '🧑‍💼',
      category: '关系心理',
      readTime: 12,
      views: 3456
    }
  ])

  return (
    <div className="space-y-3">
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-lg">
              {article.expertAvatar}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 mb-1 inline-block">
                {article.category}
              </span>
              <h3 className="text-sm font-medium text-white mb-1">{article.title}</h3>
              <div className="flex items-center gap-3 text-[10px] text-white/50">
                <span>{article.expert}</span>
                <span>·</span>
                <span>{article.readTime}分钟阅读</span>
                <span>·</span>
                <span>{article.views} 阅读</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function CommunityExpert() {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState<string | null>(null)

  const currentPage = expertItems.find(item => item.id === activePage)

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <button 
          onClick={() => activePage ? setActivePage(null) : navigate('/app/discover')}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          {activePage ? '返回' : '返回探索'}
        </button>
        <h1 className="text-xl sm:text-2xl font-bold mb-1">👨‍⚕️ 专家咨询</h1>
        <p className="text-xs sm:text-sm text-white/60">专业解答你的心理困惑</p>
      </motion.div>

      {activePage ? (
        <motion.div
          key={activePage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {activePage === 'qa' && <ExpertQAPage />}
          {activePage === 'articles' && <ExpertArticlesPage />}
        </motion.div>
      ) : (
        <div className="space-y-3">
          {expertItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActivePage(item.id)}
                className={`p-4 rounded-2xl bg-gradient-to-br ${item.colorGradient} border ${item.colorBorder} cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${item.colorText}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white/80">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/50">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
