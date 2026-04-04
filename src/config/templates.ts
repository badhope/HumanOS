export type TemplateId = 'quiz' | 'corporate' | 'blog' | 'portfolio' | 'landing' | 'dashboard' | 'ecommerce' | 'education' | 'social'

export interface TemplateConfig {
  id: TemplateId
  name: string
  nameEn: string
  description: string
  icon: string
  features: string[]
  pages: string[]
  theme: {
    primaryColor: string
    accentColor: string
    mode: 'light' | 'dark' | 'auto'
  }
  enabled: boolean
}

export const templates: TemplateConfig[] = [
  {
    id: 'quiz',
    name: '答题平台',
    nameEn: 'Quiz Platform',
    description: '交互式答题测评平台，展示表单、动画、数据可视化等前端技术',
    icon: '🎯',
    features: ['动态表单', '进度追踪', '结果可视化', '3D卡片效果', '粒子背景'],
    pages: ['首页', '测评', '结果', '仪表盘', '关于'],
    theme: {
      primaryColor: '#8B5CF6',
      accentColor: '#EC4899',
      mode: 'dark'
    },
    enabled: true
  },
  {
    id: 'corporate',
    name: '企业官网',
    nameEn: 'Corporate Website',
    description: '专业企业官网模板，展示公司形象、服务、团队和案例',
    icon: '🏢',
    features: ['Hero动画', '服务展示', '团队介绍', '案例画廊', '联系表单'],
    pages: ['首页', '关于', '服务', '案例', '团队', '联系'],
    theme: {
      primaryColor: '#3B82F6',
      accentColor: '#10B981',
      mode: 'light'
    },
    enabled: true
  },
  {
    id: 'blog',
    name: '个人博客',
    nameEn: 'Personal Blog',
    description: '简约优雅的个人博客模板，支持文章、分类、标签和搜索',
    icon: '📝',
    features: ['文章列表', '分类标签', '全文搜索', '代码高亮', '评论系统'],
    pages: ['首页', '文章', '分类', '标签', '归档', '关于'],
    theme: {
      primaryColor: '#F59E0B',
      accentColor: '#EF4444',
      mode: 'auto'
    },
    enabled: true
  },
  {
    id: 'portfolio',
    name: '作品集',
    nameEn: 'Portfolio',
    description: '创意作品集模板，完美展示项目、技能和个人经历',
    icon: '🎨',
    features: ['项目画廊', '技能图表', '时间线', '3D展示', '动画过渡'],
    pages: ['首页', '项目', '技能', '经历', '联系'],
    theme: {
      primaryColor: '#EC4899',
      accentColor: '#8B5CF6',
      mode: 'dark'
    },
    enabled: true
  },
  {
    id: 'landing',
    name: '落地页',
    nameEn: 'Landing Page',
    description: '高转化率落地页模板，强视觉冲击，适合产品推广',
    icon: '🚀',
    features: ['全屏Hero', '产品特性', '定价方案', '客户评价', 'CTA按钮'],
    pages: ['首页'],
    theme: {
      primaryColor: '#10B981',
      accentColor: '#F59E0B',
      mode: 'dark'
    },
    enabled: true
  },
  {
    id: 'dashboard',
    name: '后台管理',
    nameEn: 'Admin Dashboard',
    description: '功能完善的后台管理模板，包含数据统计、表格、图表',
    icon: '📊',
    features: ['数据仪表盘', '数据表格', '图表统计', '表单页面', '用户管理'],
    pages: ['仪表盘', '用户', '订单', '产品', '设置'],
    theme: {
      primaryColor: '#6366F1',
      accentColor: '#14B8A6',
      mode: 'light'
    },
    enabled: true
  },
  {
    id: 'ecommerce',
    name: '电商网站',
    nameEn: 'E-commerce',
    description: '现代化电商网站模板，展示商品、购物车、支付流程',
    icon: '🛒',
    features: ['商品展示', '购物车', '优惠券', '用户中心', '订单管理'],
    pages: ['首页', '商品', '详情', '购物车', '订单', '用户'],
    theme: {
      primaryColor: '#EF4444',
      accentColor: '#F97316',
      mode: 'light'
    },
    enabled: true
  },
  {
    id: 'education',
    name: '教育平台',
    nameEn: 'Education Platform',
    description: '在线教育平台模板，支持课程、直播、作业和社区',
    icon: '🎓',
    features: ['课程展示', '视频播放', '作业系统', '社区讨论', '进度追踪'],
    pages: ['首页', '课程', '学习', '社区', '作业', '个人'],
    theme: {
      primaryColor: '#0EA5E9',
      accentColor: '#8B5CF6',
      mode: 'light'
    },
    enabled: true
  },
  {
    id: 'social',
    name: '社交媒体',
    nameEn: 'Social Media',
    description: '社交媒体平台模板，支持动态发布、点赞、评论和消息',
    icon: '💬',
    features: ['动态信息流', '个人主页', '消息聊天', '关注系统', '内容分享'],
    pages: ['首页', '动态', '消息', '通知', '个人', '搜索'],
    theme: {
      primaryColor: '#06B6D4',
      accentColor: '#F472B6',
      mode: 'auto'
    },
    enabled: true
  }
]

export const getTemplate = (id: TemplateId): TemplateConfig | undefined => {
  return templates.find(t => t.id === id)
}

export const getEnabledTemplates = (): TemplateConfig[] => {
  return templates.filter(t => t.enabled)
}
