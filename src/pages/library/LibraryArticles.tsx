import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileText, Clock, Eye, ArrowLeft, Heart, MessageCircle, Bookmark } from 'lucide-react'

const articles = [
  {
    id: 'article1',
    title: '为什么你总是害怕拒绝别人？',
    description: '深入理解人际边界的重要性',
    icon: FileText,
    badge: '热门',
    readTime: 8,
    views: 12580,
    likes: 892,
    category: '人际关系',
    content: `
# 为什么你总是害怕拒绝别人？

在人际交往中，你是否经常为了顾及他人的感受而委屈自己？明明想要说"不"，却总是点头答应？这种行为背后隐藏着复杂的心理机制。

## 害怕拒绝的心理学根源

### 1. 取悦型人格倾向
这类人通常在成长过程中被教导"要乖"、"要听话"，形成了一种根深蒂固的信念：只有让别人开心，自己才有价值。

### 2. 童年情感忽视
如果在童年时期，你的情感需求经常被忽视，你可能会形成一种补偿心理，认为必须满足他人才能获得爱和关注。

### 3. 害怕被抛弃
拒绝别人可能引发被拒绝的恐惧，在潜意识里，很多人担心一旦说"不"，就会失去这段关系。

## 如何建立健康的边界

### 第一步：识别自己的感受
当别人提出请求时，先问自己："我真实的想法是什么？""我愿意吗？"

### 第二步：用温和的方式表达
"我现在手头有紧急任务，可能没办法帮你"比直接拒绝更容易说出口。

### 第三步：接受"不舒服"的感觉
拒绝后感到内疚是正常的，允许这种感受存在，而不是立刻妥协。

## 写在最后

学会拒绝不是自私，而是自尊的体现。记住：你有权利说"不"，而且你不需要为此道歉。
    `
  },
  {
    id: 'article2',
    title: '高敏感人群的自我保护指南',
    description: '学会保护自己的敏感心灵',
    icon: Heart,
    badge: '推荐',
    readTime: 10,
    views: 9860,
    likes: 756,
    category: '心理调适',
    content: `
# 高敏感人群的自我保护指南

世界上有15-20%的人天生具有高敏感特质（HSP）。他们能更深刻地感知细节，也更容易被外界刺激影响。

## 什么是高敏感特质？

高敏感不等同于内向或神经质，它是一种神经系统更发达的特征，让你能够：
- 注意到细微的变化
- 更深入地思考问题
- 拥有丰富的内心世界
- 感受更强烈的情绪

## 高敏感人群的优势

1. **观察力强**：能注意到他人忽略的细节
2. **同理心高**：容易理解他人的感受
3. **创造力丰富**：内心世界的深度带来独特的创造力
4. **危机预警**：能提前感知潜在风险

## 自我保护策略

### 环境管理
- 选择安静的工作环境
- 限制社交媒体使用时间
- 定期进行"感官休息"

### 能量管理
- 了解自己的能量来源（独处/社交）
- 学会说"我需要休息一下"
- 不要强迫自己社交

### 情绪管理
- 接受自己的敏感特质
- 不要为此道歉或感到羞耻
- 建立情绪释放的渠道

## 写在最后

高敏感是一种天赋，不是缺陷。当你学会接纳自己，你会发现这个世界因为你的存在而更加美好。
    `
  },
  {
    id: 'article3',
    title: '拖延症的本质不是懒',
    description: '从心理学角度解读拖延',
    icon: FileText,
    readTime: 7,
    views: 15230,
    likes: 1034,
    category: '行为心理',
    content: `
# 拖延症的本质不是懒

很多人把拖延归咎于懒惰，但实际上，拖延是一种复杂的情绪调节问题，而不是简单的时间管理失败。

## 拖延的心理学机制

### 情绪回避
拖延的本质不是"不想做"，而是"不敢面对"。任务引发的负面情绪（焦虑、自我怀疑、恐惧失败）让人本能地想要逃避。

### 完美主义陷阱
"要么做到完美，要么不做"的思维模式，会让看似不可能完成的任务变得更加可怕。

### 时间感知偏差
我们的大脑倾向于低估未来任务的价值，夸大眼前享受的吸引力，这就是"未来折扣"现象。

## 拖延者的内心独白

> "我知道这件事很重要，但每次想到要做，我就感到莫名的抗拒..."
> "我一直在想这件事，但就是迈不出第一步..."
> "最后一刻的压力反而让我更有动力..."

## 破解拖延的实用方法

### 1. 2分钟法则
如果一件事能在2分钟内完成，就立刻去做。这能打破"开始"的阻力。

### 2. 分解任务
将大任务分解成最小的可执行单元，让"开始"变得更容易。

### 3. 情绪着陆
当感到焦虑时，先做5次深呼吸，然后问自己："最坏的结果是什么？真的那么可怕吗？"

### 4. 自我同情
研究表明，自我同情比自我批评更能提高行动力。

## 写在最后

拖延不是性格缺陷，而是可以改变的行为模式。理解自己为什么拖延，是改变的第一步。
    `
  },
  {
    id: 'article4',
    title: '如何建立健康的个人边界',
    description: '守护你的心理空间',
    icon: FileText,
    readTime: 9,
    views: 8740,
    likes: 623,
    category: '人际关系',
    content: `
# 如何建立健康的个人边界

个人边界是你为自己划定的"心理领土"，它决定了你可以接受什么样的对待，以及什么样的行为是不可容忍的。

## 什么是健康的边界？

### 物理边界
谁可以接触你的身体？你的私人空间范围有多大？

### 情感边界
你能接受什么样的情绪表达？哪些话题会让你感到不适？

### 时间边界
你的时间价值几何？你愿意为他人付出多少时间？

### 物质边界
你的物品可以被谁使用？借出的底线在哪里？

## 不健康边界的表现

### 边界模糊
- 很难对别人说"不"
- 经常为别人的情绪负责
- 不确定自己的价值观是什么

### 边界过紧
- 很难信任任何人
- 总是保持距离
- 害怕亲密关系

## 建立健康边界的方法

### 1. 明确你的底线
静下心来思考：在关系中，什么是我绝对不能接受的？

### 2. 用"我"来表达
"我感到..."比"你总是..."更有力量，也更容易被接受。

### 3. 保持一致性
边界必须前后一致，否则别人会认为你的"不"是可以商量的。

### 4. 接受冲突
设立边界可能会引发对方的不满，这是正常的，要有心理准备。

## 写在最后

建立边界是一个持续的过程，需要不断练习和调整。记住：保护自己不是自私，而是对自己最基本的尊重。
    `
  },
  {
    id: 'article5',
    title: '情绪管理的科学方法',
    description: '掌握情绪调节技巧',
    icon: Heart,
    readTime: 11,
    views: 11890,
    likes: 891,
    category: '情绪管理',
    content: `
# 情绪管理的科学方法

情绪是人类进化过程中形成的生存工具，它们本身没有好坏之分。但如何管理情绪，会直接影响我们的生活质量和人际关系。

## 认识情绪

### 情绪的组成
1. **生理反应**：心跳加速、手心出汗等身体变化
2. **认知解读**：对事件的解释和赋予的意义
3. **行为冲动**：想要做什么的冲动
4. **主观感受**：情绪带给我们的内心体验

### 基本情绪分类
- **愉悦类**：快乐、满足、幸福、兴奋
- **不愉悦类**：悲伤、愤怒、恐惧、焦虑
- **激活类**：惊讶、紧张、警觉

## 科学情绪管理方法

### 1. 认知重评
当负面情绪出现时，不要急着反应，而是问自己：
- 这个事件真的有那么糟糕吗？
- 还有没有其他的解释方式？
- 一年后，这件事还重要吗？

### 2. 情绪标注
研究显示，把情绪用语言表达出来（"我现在感到很沮丧"），可以降低杏仁核的活跃度。

### 3. 身体调节
- 深呼吸：激活副交感神经系统
- 渐进式肌肉放松：从头到脚逐个部位收紧然后放松
- 运动：释放内啡肽，改善情绪

### 4. 情绪日记
每天记录情绪波动，能帮助你识别情绪模式和触发因素。

## 写在最后

情绪管理不是压抑情绪，而是学会与情绪共处。接受情绪的存在，同时不让情绪控制你的行为，这是成熟的标志。
    `
  },
  {
    id: 'article6',
    title: '正念冥想入门指南',
    description: '开启内心平静之旅',
    icon: FileText,
    readTime: 8,
    views: 14320,
    likes: 1102,
    category: '心理调适',
    content: `
# 正念冥想入门指南

正念，源于佛教的禅修传统，如今已被科学证明能有效减轻压力、改善注意力、提升幸福感。

## 什么是正念？

正念是一种"有意识的注意"，是对当下时刻的觉知——不评判地接受此刻正在发生的一切。

### 正念的三个核心要素
1. **有意注意**：主动选择关注什么
2. **当下此刻**：专注于此时此刻
3. **不评判态度**：允许体验如实呈现

## 正念冥想的科学证据

现代神经科学研究发现：
- 8周正念训练可以改变大脑结构
- 长期练习能增强前额叶皮层功能
- 能减少杏仁核对压力的反应

## 入门练习：5分钟呼吸练习

### 准备
1. 找一个安静的、不被打扰的地方
2. 坐在椅子或垫子上，保持背部挺直
3. 设定5分钟计时器

### 练习步骤
1. 闭上眼睛或轻轻下垂
2. 做几次深呼吸，让身体放松
3. 将注意力放在呼吸上
4. 感受空气从鼻孔进入，又从鼻孔呼出
5. 当注意力游移时，温柔地把它带回来
6. 继续这个过程，直到计时器响起

## 常见问题

### Q：冥想时总是走神怎么办？
A：走神是正常的，这恰恰是冥想的练习——意识到走神，然后温柔地回来。

### Q：需要冥想多久才有效？
A：研究表明，即使是5-10分钟的练习，也能带来益处。关键是每天坚持。

### Q：什么时间冥想最好？
A：选择你能坚持的时间段。早晨冥想能让你一整天更平静。

## 写在最后

正念不是要你清空大脑，而是学会与自己的思想和平共处。开始练习，就是走向内心平静的第一步。
    `
  }
]

export default function LibraryArticles() {
  const navigate = useNavigate()

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <button 
          onClick={() => navigate('/app/discover')}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          返回探索
        </button>
        <h1 className="text-xl sm:text-2xl font-bold mb-1">📖 精选文章</h1>
        <p className="text-xs sm:text-sm text-white/60">深度阅读，洞见心灵</p>
      </motion.div>

      <div className="space-y-3">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/app/library/article/${article.id}`, { state: { article } })}
            className="p-4 rounded-2xl bg-gradient-to-br from-white/8 to-white/2 border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <article.icon size={22} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/20 text-blue-400">
                    {article.category}
                  </span>
                  {article.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold
                      ${article.badge === '热门' ? 'bg-red-500/30 text-red-400' : ''}
                      ${article.badge === '推荐' ? 'bg-violet-500/30 text-violet-400' : ''}
                    `}>
                      {article.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-white truncate mb-1">{article.title}</h3>
                <p className="text-xs text-white/50 line-clamp-2">{article.description}</p>
                <div className="flex items-center gap-4 mt-2 text-[10px] text-white/40">
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {article.readTime}分钟
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={10} />
                    {article.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={10} />
                    {article.likes}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { articles }
