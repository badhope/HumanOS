# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
