import { LucideIcon } from 'lucide-react'
import { FileText, Heart, Brain, Shield, Lightbulb, Moon, Sparkles, BookOpen, Users, Briefcase, Target, Sun, CloudSun, Zap, Coffee, Music } from 'lucide-react'

export interface LibraryArticle {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  category: string
  readTime: string
  views: number
  featured?: boolean
  author?: string
  content: ArticleSection[]
}

export interface ArticleSection {
  type: 'heading' | 'paragraph' | 'list' | 'quote' | 'tip'
  content: string | string[]
}

export const LIBRARY_ARTICLES: LibraryArticle[] = [
  {
    id: 'article-boundaries',
    title: '为什么你总是害怕拒绝别人？',
    subtitle: '深入理解人际边界的重要性',
    icon: Shield,
    category: '人际关系',
    readTime: '8分钟',
    views: 3240,
    featured: true,
    author: '心理专家李明',
    content: [
      {
        type: 'paragraph',
        content: '你是否有过这样的经历：明明自己很忙，却还是答应了别人的请求？明明心里不愿意，却还是说不出"不"？这背后可能是因为你没有建立健康的个人边界。'
      },
      {
        type: 'heading',
        content: '什么是个人边界？'
      },
      {
        type: 'paragraph',
        content: '个人边界是指我们在身体、情感和心理上与他人保持的距离。它像是一道无形的屏障，保护我们的自我认同、价值观和个人空间。健康的边界让我们能够：'
      },
      {
        type: 'list',
        content: [
          '保护自己的时间和精力',
          '维护健康的人际关系',
          '避免被他人过度影响',
          '保持自我完整性'
        ]
      },
      {
        type: 'heading',
        content: '为什么说"不"如此困难？'
      },
      {
        type: 'paragraph',
        content: '害怕拒绝别人通常源于以下几种心理：'
      },
      {
        type: 'list',
        content: [
          '害怕被讨厌或排斥',
          '渴望被认可和喜爱',
          '担心被视为自私',
          '习惯性取悦他人'
        ]
      },
      {
        type: 'heading',
        content: '如何建立健康的边界？'
      },
      {
        type: 'paragraph',
        content: '建立边界是一个学习和练习的过程。以下是一些实用的方法：'
      },
      {
        type: 'tip',
        content: '从小事开始练习说"不"，比如拒绝一个无关紧要的请求，逐渐建立信心。'
      },
      {
        type: 'paragraph',
        content: '记住，你的感受和需求与他人同样重要。健康的边界不是自私，而是对自己和他人的尊重。'
      },
      {
        type: 'quote',
        content: '"你的时间有限，不要浪费在重复他人的生活上。" - 史蒂夫·乔布斯'
      }
    ]
  },
  {
    id: 'article-highly-sensitive',
    title: '高敏感人群的自我保护指南',
    subtitle: '学会保护自己的敏感心灵',
    icon: Heart,
    category: '自我成长',
    readTime: '10分钟',
    views: 2890,
    featured: true,
    author: '心理咨询师王芳',
    content: [
      {
        type: 'paragraph',
        content: '你是否常常被外界的声音、光线、情绪所影响？你是否更容易感受到他人的痛苦？如果你回答"是"，那么你可能是一个高敏感人群（HSP）。'
      },
      {
        type: 'heading',
        content: '什么是高敏感性？'
      },
      {
        type: 'paragraph',
        content: '高敏感性是一种与生俱来的人格特质，约占人口的15-20%。高敏感人群具有以下特点：'
      },
      {
        type: 'list',
        content: [
          '对环境刺激高度敏感',
          '深刻的情感体验',
          '强烈的同理心',
          '丰富的内心世界'
        ]
      },
      {
        type: 'heading',
        content: '高敏感不是弱点'
      },
      {
        type: 'paragraph',
        content: '很多高敏感的人会觉得自己的敏感性是一种负担，但实际上，这也是一种天赋。高敏感人群通常：'
      },
      {
        type: 'list',
        content: [
          '更富有创造力',
          '更善于倾听和理解他人',
          '更有深度和洞察力',
          '更注重细节和品质'
        ]
      },
      {
        type: 'heading',
        content: '自我保护的实用技巧'
      },
      {
        type: 'tip',
        content: '为自己创造一个"安全空间"，当感到疲惫时可以在这里充电恢复。'
      },
      {
        type: 'paragraph',
        content: '重要的是要记住，你的敏感不是缺陷，而是你独特的天赋。学会接纳和保护自己，你会发现这种特质可以成为你的优势。'
      }
    ]
  },
  {
    id: 'article-procrastination',
    title: '拖延症的本质不是懒',
    subtitle: '从心理学角度解读拖延',
    icon: Lightbulb,
    category: '心理科普',
    readTime: '7分钟',
    views: 4150,
    author: '心理研究员张伟',
    content: [
      {
        type: 'paragraph',
        content: '拖延不是因为懒，而是一种复杂的心理机制。很多人认为拖延是时间管理问题，但实际上，它往往与我们的情绪、焦虑和自我价值感有关。'
      },
      {
        type: 'heading',
        content: '拖延的心理根源'
      },
      {
        type: 'paragraph',
        content: '拖延背后通常有以下几种心理原因：'
      },
      {
        type: 'list',
        content: [
          '害怕失败：担心做得不够好',
          '完美主义：追求完美导致无法开始',
          '焦虑逃避：用拖延来暂时缓解焦虑',
          '缺乏动力：目标不够清晰或缺乏意义'
        ]
      },
      {
        type: 'heading',
        content: '如何克服拖延？'
      },
      {
        type: 'tip',
        content: '使用"两分钟法则"：如果一件事能在两分钟内完成，就立刻去做。'
      },
      {
        type: 'paragraph',
        content: '克服拖延需要耐心和练习。关键是要理解拖延背后的心理原因，而不是简单地责备自己。'
      }
    ]
  },
  {
    id: 'article-emotion-management',
    title: '情绪管理的科学方法',
    subtitle: '掌握情绪调节技巧',
    icon: CloudSun,
    category: '情绪管理',
    readTime: '9分钟',
    views: 3580,
    author: '情绪管理教练陈静',
    content: [
      {
        type: 'paragraph',
        content: '情绪管理不是压抑情绪，而是学会与情绪和谐共处。有效的情绪管理可以帮助我们更好地应对压力，改善人际关系。'
      },
      {
        type: 'heading',
        content: '情绪管理的三个层次'
      },
      {
        type: 'list',
        content: [
          '觉察：意识到自己的情绪状态',
          '接纳：不评判地接受情绪的存在',
          '调节：运用技巧调整情绪反应'
        ]
      },
      {
        type: 'heading',
        content: '实用的情绪调节技巧'
      },
      {
        type: 'tip',
        content: '情绪来临时，先深呼吸三次，给自己一点空间再做出反应。'
      },
      {
        type: 'paragraph',
        content: '情绪管理是一项可以学习和提升的技能。通过持续的练习，你可以成为自己情绪的主人。'
      }
    ]
  },
  {
    id: 'article-mindfulness-meditation',
    title: '正念冥想入门指南',
    subtitle: '开启内心平静之旅',
    icon: Moon,
    category: '冥想放松',
    readTime: '6分钟',
    views: 2920,
    author: '冥想导师林静',
    content: [
      {
        type: 'paragraph',
        content: '正念冥想是一种源自东方传统的练习，如今已被科学证实对身心健康有诸多益处。它不仅可以帮助我们放松，还能提升专注力和自我觉察。'
      },
      {
        type: 'heading',
        content: '正念冥想的好处'
      },
      {
        type: 'list',
        content: [
          '减轻压力和焦虑',
          '改善睡眠质量',
          '提升专注力',
          '增强自我觉察'
        ]
      },
      {
        type: 'heading',
        content: '如何开始正念冥想？'
      },
      {
        type: 'tip',
        content: '每天只需5分钟，坚持比时长更重要。'
      },
      {
        type: 'paragraph',
        content: '正念冥想不需要特殊的装备或环境，只需找一个安静的地方，坐下来，专注于当下。'
      }
    ]
  },
  {
    id: 'article-growth-mindset',
    title: '成长型思维的力量',
    subtitle: '从固定思维到成长思维',
    icon: Sparkles,
    category: '自我成长',
    readTime: '8分钟',
    views: 3680,
    author: '心理学博士刘洋',
    content: [
      {
        type: 'paragraph',
        content: '斯坦福大学心理学家卡罗尔·德韦克提出的"成长型思维"理论，改变了我们对能力和学习的理解。拥有成长型思维的人相信能力可以通过努力和学习来提升。'
      },
      {
        type: 'heading',
        content: '两种思维模式的对比'
      },
      {
        type: 'paragraph',
        content: '固定型思维认为能力是天生的，而成长型思维认为能力可以发展。这两种思维模式会影响我们面对挑战、接受反馈和追求目标的方式。'
      },
      {
        type: 'heading',
        content: '如何培养成长型思维？'
      },
      {
        type: 'tip',
        content: '把"我不行"换成"我还不会，但我可以学"。'
      },
      {
        type: 'paragraph',
        content: '培养成长型思维是一个持续的过程，需要我们不断觉察和调整自己的思维模式。但这个过程是值得的，因为它可以帮助我们实现更大的成长和成就。'
      }
    ]
  },
  {
    id: 'article-stress-management',
    title: '压力管理的艺术',
    subtitle: '在压力中保持平衡',
    icon: Coffee,
    category: '心理科普',
    readTime: '7分钟',
    views: 2750,
    author: '压力管理专家赵明',
    content: [
      {
        type: 'paragraph',
        content: '适度的压力可以激励我们前进，但过多的压力会损害身心健康。学会管理压力是现代生活中必不可少的技能。'
      },
      {
        type: 'heading',
        content: '压力的来源'
      },
      {
        type: 'list',
        content: [
          '工作和学业压力',
          '人际关系问题',
          '经济和生活压力',
          '健康问题'
        ]
      },
      {
        type: 'heading',
        content: '有效的压力管理策略'
      },
      {
        type: 'tip',
        content: '每天留出10分钟做一些让你感到放松和快乐的事情。'
      },
      {
        type: 'paragraph',
        content: '压力管理不是消除所有压力，而是学会与压力和谐共处，找到适合自己的平衡方式。'
      }
    ]
  },
  {
    id: 'article-communication',
    title: '非暴力沟通的艺术',
    subtitle: '建立深度连接的沟通方式',
    icon: Users,
    category: '人际关系',
    readTime: '9分钟',
    views: 3120,
    author: '沟通培训师孙丽',
    content: [
      {
        type: 'paragraph',
        content: '非暴力沟通（NVC）是一种基于同理心的沟通方式，它帮助我们在表达自己的同时，也能理解和尊重他人。'
      },
      {
        type: 'heading',
        content: '非暴力沟通的四要素'
      },
      {
        type: 'list',
        content: [
          '观察：客观描述事实，不评判',
          '感受：表达自己的情绪',
          '需要：说出背后的需求',
          '请求：提出具体的请求'
        ]
      },
      {
        type: 'tip',
        content: '用"我感到..."代替"你让我..."，这样更容易被对方接受。'
      },
      {
        type: 'paragraph',
        content: '非暴力沟通需要练习，但它可以帮助我们建立更健康、更和谐的人际关系。'
      }
    ]
  }
]

export const LIBRARY_CATEGORIES = [
  { id: 'all', name: '全部文章', icon: BookOpen },
  { id: '人际关系', name: '人际关系', icon: Users },
  { id: '自我成长', name: '自我成长', icon: Sparkles },
  { id: '心理科普', name: '心理科普', icon: Brain },
  { id: '情绪管理', name: '情绪管理', icon: CloudSun },
  { id: '冥想放松', name: '冥想放松', icon: Moon },
]

export const LIBRARY_TIPS = [
  { id: 'tip1', title: '阅读建议', content: '每天阅读一篇文章，持续学习成长', icon: BookOpen },
  { id: 'tip2', title: '做笔记', content: '记录重要观点，加深理解', icon: FileText },
  { id: 'tip3', title: '实践应用', content: '将学到的知识应用到生活中', icon: Target },
]
