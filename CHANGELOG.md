# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.5.0] - 2026-04-17

### 🌍 模拟世界系统史诗级发布 🚀

#### 🏛️ 国家治理模拟器 - 完整沙盒系统
- ✅ **7个真实国家数据** - 中美日德英法俄完整宏观经济数据库
- ✅ **12维经济模拟系统** - GDP/通胀/失业/债务/利率/汇率完整计算引擎
- ✅ **国策树系统** - 4大类50+项政策可执行
- ✅ **随机事件系统** - 100+随机事件覆盖经济/政治/社会/外交/科技领域
- ✅ **国家精神系统** - 每个国家独特buff系统
- ✅ **成就系统** - 完整成就解锁与追踪
- ✅ **难度系统** - 4级难度动态平衡调整
- ✅ **教程系统** - 完整/快速/跳过三种引导模式
- ✅ **数据格式化** - 现实单位显示，万亿级数据友好展示
- ✅ **游戏结束条件优化** - 债务阈值从300%提升至500%，60天连续判定

#### ☯️ 修仙大世界系统 - 完整修炼体系
- ✅ **63个完整境界** - 从炼气期到道祖完整修炼体系
- ✅ **灵根系统** - 五行/变异/混沌灵根资质系统
- ✅ **功法神通系统** - 10大类50+功法与神通
- ✅ **炼丹炼器系统** - 完整物品合成与品质机制
- ✅ **渡劫系统** - 心魔/天雷/心魔三重天劫机制
- ✅ **Buff系统** - 18类状态效果持续生效系统
- ✅ **机缘奇遇系统** - 随机事件与NPC互动
- ✅ **宗门系统** - 创建/发展/管理修仙门派
- ✅ **寿元系统** - 境界突破提升寿命机制

#### 🎮 模拟世界大厅 - 统一入口系统
- ✅ **统一入口界面** - 4大世界同屏展示，一键进入
- ✅ **入口层级简化** - 删除冗余跳转，首页→模拟世界大厅→直接游戏
- ✅ **世界卡片系统** - 状态/难度/时长/特性完整信息展示
- ✅ **特色世界置顶** - 大型沙盒世界高亮优先显示
- ✅ **循环依赖彻底修复** - 场景注册架构重构

### 📐 系统架构与质量保证

#### 🔌 注册机制与完整性系统
- ✅ **完整性检查脚本** - 自动检测计算器/测评注册遗漏
- ✅ **索引文件自动生成** - 22个计算器全部正确注册
- ✅ **23项测评全覆盖** - 职业倦怠MBI测评全新上线
- ✅ **npm quality命令** - 一键执行typecheck+lint+integrity三重检查
- ✅ **场景注册中心化** - 彻底解决循环导入死锁问题

#### 🐛 全部已知Bug修复
- ✅ **日本开局立即结束** - 债务/GDP比值阈值与判定逻辑修复
- ✅ **双结局判定系统冲突** - 删除冗余硬编码条件，统一判定逻辑
- ✅ **React Hook警告** - 5个依赖数组问题全部修复
- ✅ **React安全警告** - AdButton javascript:协议移除
- ✅ **Fast Refresh警告** - 匿名组件命名规范化
- ✅ **时间错乱问题** - 时间推进逻辑验证修复
- ✅ **界面入口混乱问题** - 彻底梳理统一入口架构

### ✅ 质量认证
- ✅ **TypeScript 0 errors** - 全项目类型安全
- ✅ **ESLint 0 errors** - 代码规范达标
- ✅ **Build 100% 通过** - 生产构建验证
- ✅ **2993 modules transformed** - 完整模块系统健康
- ✅ **四大沙盒世界正常运行**
- ✅ **23项测评全部可用**

---

## [2.4.0] - 2026-04-14

### 🎯 核心功能全面升级

#### 📚 理论知识与学术支撑模块 🔥
- ✅ **四大理论框架详情页** - 戈尔曼情商模型、中国式家长研究、行为经济学、政治光谱分析
- ✅ **历史背景时间轴** - 每个理论完整发展历程可视化
- ✅ **学术奠基者展示** - 核心学者与贡献矩阵
- ✅ **核心概念卡片** - 互动式知识点讲解
- ✅ **应用领域矩阵** - 跨学科应用场景展示
- ✅ **推荐阅读列表** - 学术文献指引
- ✅ **首页集成入口** - 悬停显示「了解更多」导航按钮
- ✅ **高品质视觉设计** - 渐变背景、动画过渡、响应式布局

#### ❓ 情境化题目质量全面提升
- ✅ **官场梦测评** - 5大维度 × 4个子维度 × 20道情境化选择题
- ✅ **中国式家长测评** - 4大维度 × 10道题 = 40道高质量情境化问题
- ✅ **彻底移除模板化选项** - 消灭「完全不符/比较不符/一般/比较符合/完全符合」通用模板
- ✅ **每道题独立选项设计** - 选项与题目强相关，具有争议性和区分度
- ✅ **高区分度选项** - 消除趋同选项，确保不同性格用户选择明显差异

#### 🔬 多维度多视角分析系统
- ✅ **中国式家长四维十六项** - 期望/教养/沟通/价值观四大主维度 × 4个子维度
- ✅ **16项子维度深度解析** - 每一项都有独立评分与解释
- ✅ **教育风格矩阵** - 4×4教育风格分类系统
- ✅ **8种家长原型匹配** - 佛系鸡娃/权威掌控/民主协商等经典类型
- ✅ **戈尔曼情商十大情绪画像** - 从5种扩充到10种，显著提升结果多样性

#### 📊 测评结果多样性优化
- ✅ **结果收敛问题修复** - 放宽原型匹配条件，增加分类层次
- ✅ **情绪画像扩充** - EQ测评从5种到10种结果类型
- ✅ **分数阈值精细化** - 多层级分数段划分避免结果集中
- ✅ **后备匹配机制** - 无强匹配时自动选择次优原型

### 🔧 技术质量与代码健康

#### 🐛 致命错误全部修复
- ✅ **TypeScript类型重复定义** - 3个接口重复定义全部清理
- ✅ **Switch case词法声明** - 块作用域问题修复
- ✅ **路由404错误** - 首页测评入口路径修正
- ✅ **Toast组件内存泄漏** - ref清除函数竞态问题修复
- ✅ **键盘事件闭包问题** - useEffect依赖数组补全

#### ✨ 用户体验优化
- ✅ **确认页面真实数据对接** - 题目数量/预计时长/测评质量全部动态计算
- ✅ **移动端刘海屏适配** - pb-safe安全区域支持
- ✅ **选项点击区域优化** - 移动端最小48px触控目标
- ✅ **倒计时闪烁提醒** - <10秒红色脉动动画
- ✅ **完整键盘快捷键** - 答题/答题卡全屏快捷键支持

#### 🧹 项目瘦身与净化
- ✅ **删除50+历史报告文档**
- ✅ **删除60+废弃脚本文件**
- ✅ **删除2个完整备份目录**
- ✅ **删除旧部署目录**
- ✅ **项目目录清爽化**

### ✅ 质量保证体系
- ✅ **TypeScript编译 0 errors**
- ✅ **ESLint检查 0 errors**
- ✅ **生产构建 100% 通过**
- ✅ **核心流程端到端验证**
- ✅ **移动端响应式适配达标**
- ✅ **全面质检报告发布**

---

## [2.4.0] - 2026-04-11

### 🔥 极致争议性题库全面升级

#### 🏆 题目质量史诗级提升
- ✅ **全题库极致争议性** - 480道题目100%升级到"extreme"争议级别，彻底消除中立选项空间
- ✅ **表述绝对化处理** - 所有模糊表述全部修改为具体、明确、非黑即白的极端立场陈述
- ✅ **消除模棱两可** - 移除"某个阈值"、"一定程度"等模糊词汇，全部改为量化标准

#### 📚 三大题库全面覆盖
| 题库 | 题数 | 维度 | 特点 |
|------|------|------|------|
| **标准版** | 60 | 5维 | 核心意识形态入门级深度考察 |
| **进阶版** | 120 | 7维 | 心理测量学参数校准 |
| **专业版** | 300 | 12维 | IRT项目反应理论 + 9大维度A/B双组深度理论题 |

#### 🔍 质量控制与审计系统
- ✅ **ID唯一性验证** - 修复economic/ecological维度命名空间冲突导致的25个ID重复
- ✅ **计算可追溯性** - 完整审计日志系统：每题贡献值 + 维度加权 + 算法分步记录
- ✅ **结果可重现** - 纯函数确定性计算 + LRU缓存机制 + 哈希完整性校验
- ✅ **跨题库无重复** - 三大题库命名空间完全隔离，无内容重复

---

## [2.4.0] - 2026-04-10

### 🎯 Major: 核心计算引擎净化与科学化

#### 🔬 专业测评计算模型修复 (Critical Fix)
**修复了8个核心专业测评全部使用随机数的严重问题**
- ✅ **意识形态专业测评** - 替换随机数为完整IRT参数模型 + 8维度欧氏距离匹配32种意识形态分类
- ✅ **Kolb学习风格** - 实现CE/RO/AC/AE四维度学习风格科学计算 + 4种类型判定算法
- ✅ **ECR亲密关系依恋** - 焦虑/回避二维度 + 4种依恋类型(安全型/痴迷型/疏离型/恐惧型)
- ✅ **Haidt道德基础理论** - 关怀/公平/忠诚/权威/圣洁五基础 + 个体化vs约束性二阶因子
- ✅ **Flavell元认知能力** - 知识/监控/控制三因素模型 + 5级发展水平划分
- ✅ **Dweck思维模式** - 挑战拥抱/努力信念/挫折韧性三维 + 4种思维模式分级
- ✅ **Enhanced分析框架** - 移除随机填充，实现基线常模百分位计算
- ✅ **Theme主题分析框架** - 替换模拟数据随机生成，实现心理测量学基线值计算
- ✅ **IQ专业测评** - 修复信度计算，基于实际得分动态计算(0.80-0.98)

#### 📊 分析引擎增强
- 所有测评结果计算基于心理测量学标准算法
- 维度映射、反向计分、标准化转换、边界截断、加权平均完整实现
- Logistic CDF百分位转换算法标准化应用
- 所有Math.random()已从核心计算引擎清除（剩余仅用于娱乐类趣味性和UI动画）

### 🚀 Features

#### 🧠 意识形态测评系统全面深化
- 专业版题目扩充至100题，覆盖8大模块：经济/社会/外交/治理/民权/环境/文化/科技
- 每道题目配备IRT参数：因子载荷、区分度、难度、方向、项目反应曲线
- 32种意识形态分类系统，基于欧氏距离匹配
- Cronbach's α信度、Pearson相关效度检验机制
- 六边形意识形态雷达图可视化

#### 📋 专业测评全面标准化
- 全部32+测评普通版题目标准化至20题
- 覆盖专业心理、个人成长、娱乐趣味三大类别
- 题目分属维度映射关系明确
- 计分算法与学术标准对齐

#### 💾 数据管理功能完善
- 用户测评数据JSON完整导出/导入
- 单条记录管理与批量清除
- 测评权重配置面板与框架说明文档
- 隐私模式切换：公开/私人数据隔离

### 🔧 Infrastructure

#### ⚙️ CI/CD Pipeline
- GitHub Actions Node.js版本统一为20.x
- Lint → TypeCheck → Build → Deploy 四阶段流水线
- 构建产物自动上传GitHub Pages
- Workflow Dispatch手动触发支持

#### 🏗️ Build优化
- TypeScript严格模式验证通过
- Vite生产构建无错误
- 动态import代码分割优化
- 3084 modules transformed成功

### 🐛 Bug Fixes
- 修复6个专业测评计算器随机数生成问题
- 修复2个分析框架模拟数据随机性
- TypeScript类型错误全部修复
- 所有模块导出路径正确，前端入口完整

---

## [2.3.0] - 2026-03-20

### Added
- Comprehensive chart system with 5 visualization types
- Professional report generation with PDF export
- Enhanced weight configuration system
- Multi-language support (Chinese/English)

---

## [2.0.0] - 2024-01-15

### Added

#### 🎨 Animation System
- Complete animation configuration system with centralized variants and transitions
- **SplashScreen** component with boot sequence animation
- **GlowCard** component with 3D tilt and hover glow effects
- **RippleButton** component with click ripple animation
- **AnimatedNumber** component for number counting animations
- **AnimatedProgress** component for animated progress bars
- **FadeInSection** component for scroll-triggered fade-in animations
- **ResultReveal** component for assessment result reveal animations
- **AchievementUnlock** component for achievement notification animations

#### 👤 User System
- User profile management with avatar support
- Achievement system with 6 types of badges
- User level and points system
- Favorites and history records management
- Personality radar chart visualization

#### 🧠 Assessment Features
- 30+ professional assessments across 7 categories
- Card flip and hover glow effects for assessment cards
- Assessment result persistence with localStorage
- Progress tracking and completion history

#### 📱 UI/UX Improvements
- Glassmorphism design style
- Responsive layout for all devices
- Smooth page transitions
- Scroll-triggered animations
- Interactive micro-interactions

#### 📚 Documentation
- Comprehensive README in Chinese and English
- Contributing guidelines
- Code of conduct
- Security policy
- Issue and PR templates

### Changed

#### 🔄 Refactoring
- Migrated to TypeScript 5.x
- Improved component architecture with better separation of concerns
- Enhanced state management with Zustand
- Optimized build configuration with better code splitting

#### ⚡ Performance
- Reduced bundle size through intelligent code splitting
- Improved animation performance with Framer Motion
- Optimized 3D rendering with React Three Fiber

### Fixed

#### 🐛 Bug Fixes
- Fixed CI/CD pipeline issues
- Resolved TypeScript path alias errors
- Fixed animation component export issues
- Corrected ESLint configuration warnings

## [1.5.0] - 2024-01-01

### Added
- Initial release with core assessment functionality
- Basic UI components and layouts
- Local storage for assessment results
- Simple animation effects

### Features
- MBTI personality assessment
- Big Five personality assessment
- Basic result visualization
- Dark theme support

## [1.0.0] - 2023-12-01

### Added
- Project initialization
- Basic React setup with Vite
- Tailwind CSS configuration
- ESLint and Prettier setup

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 2.0.0 | 2024-01-15 | Major update with animation system and user features |
| 1.5.0 | 2024-01-01 | Enhanced assessment features |
| 1.0.0 | 2023-12-01 | Initial release |

---

## Upcoming Features

### [2.1.0] - Planned

#### 🎯 Assessment Expansion
- Expand question bank to 100+ items
- Add more assessment categories
- Implement adaptive testing algorithm

#### 🎮 Gamification
- Daily challenges and streaks
- Leaderboards and rankings
- More achievement badges

#### 🔗 Social Features
- Share results to social media
- Export results as PDF
- Compare with friends

#### 🤖 AI Integration
- Intelligent assessment recommendations
- Personalized insights
- Natural language result interpretation

### [2.2.0] - Planned

#### 🌐 Internationalization
- Multi-language support
- RTL language support
- Localized content

#### 📊 Advanced Analytics
- Detailed personality insights
- Trend analysis over time
- Comparative statistics

---

<div align="center">

**[View all releases](https://github.com/badhope/HumanOS/releases)**

</div>
