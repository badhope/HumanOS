<div align="center">

# HumanOS

**下一代人格评估平台 | Next Generation Personality Assessment Platform**

[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)](https://vitejs.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Stars](https://img.shields.io/github/stars/badhope/HumanOS?style=social)](https://github.com/badhope/HumanOS)

**[English](./README_EN.md) | 简体中文**

<img src="https://via.placeholder.com/800x400?text=HumanOS+Screenshot" alt="HumanOS Screenshot" width="80%">

</div>

---

## 📖 目录

- [✨ 特性](#-特性)
- [🚀 快速开始](#-快速开始)
- [🎯 测评类型](#-测评类型)
- [🛠️ 技术栈](#️-技术栈)
- [📁 项目结构](#-项目结构)
- [🎨 动画系统](#-动画系统)
- [🤝 贡献指南](#-贡献指南)
- [📄 许可证](#-许可证)
- [🙏 致谢](#-致谢)

---

## ✨ 特性

### 🔒 隐私优先
- **本地存储** - 所有数据仅存储在浏览器本地，不上传任何服务器
- **零追踪** - 不使用任何分析工具或追踪代码
- **开源透明** - 完全开源，代码可审计

### 🧠 专业测评
- **30+ 专业测评** - 涵盖人格心理、职业能力、人际关系等7大领域
- **科学方法** - 基于心理学研究的标准化测评工具
- **即时反馈** - 完成测评后立即获得详细的结果分析

### 🎨 精美设计
- **现代UI** - 采用玻璃态设计风格，视觉效果出众
- **流畅动画** - 基于 Framer Motion 的丝滑动画体验
- **响应式布局** - 完美适配桌面端和移动端

### ⚡ 高性能
- **Vite 构建** - 极速的开发体验和生产构建
- **代码分割** - 智能分包，按需加载
- **PWA 支持** - 可安装为桌面应用

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 安装

```bash
# 克隆仓库
git clone https://github.com/badhope/HumanOS.git

# 进入项目目录
cd HumanOS

# 安装依赖
npm install
# 或使用 pnpm
pnpm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 在浏览器中打开 http://localhost:5173
```

### 构建

```bash
# 生产构建
npm run build

# 预览构建结果
npm run preview
```

### 代码检查

```bash
# 运行 ESLint
npm run lint

# 运行 TypeScript 类型检查
npm run typecheck
```

---

## 🎯 测评类型

HumanOS 提供多种专业测评，涵盖以下领域：

| 类别 | 测评数量 | 包含内容 |
|------|---------|---------|
| 🧠 人格心理 | 8+ | MBTI、大五人格、九型人格等 |
| 💼 职业能力 | 5+ | 职业倾向、领导力、团队角色等 |
| 💑 人际关系 | 4+ | 沟通风格、依恋类型、社交能力等 |
| 🎓 认知思维 | 5+ | 思维风格、决策方式、创造力等 |
| 💪 健康生活 | 4+ | 压力水平、睡眠质量、情绪管理等 |
| 💎 价值观 | 3+ | 价值观取向、人生意义等 |
| 📚 学科知识 | 5+ | 多领域知识测评 |

---

## 🛠️ 技术栈

### 核心框架
- **[React 18](https://reactjs.org/)** - 用户界面库
- **[TypeScript 5](https://www.typescriptlang.org/)** - 类型安全
- **[Vite 5](https://vitejs.dev/)** - 下一代前端构建工具

### UI & 样式
- **[Tailwind CSS](https://tailwindcss.com/)** - 原子化 CSS 框架
- **[Framer Motion](https://www.framer.com/motion/)** - 动画库
- **[Lucide Icons](https://lucide.dev/)** - 图标库

### 状态管理
- **[Zustand](https://github.com/pmndrs/zustand)** - 轻量级状态管理

### 3D 效果
- **[Three.js](https://threejs.org/)** - 3D 渲染
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - React 3D 渲染器

### 工具链
- **[ESLint](https://eslint.org/)** - 代码检查
- **[Prettier](https://prettier.io/)** - 代码格式化
- **[PostCSS](https://postcss.org/)** - CSS 后处理

---

## 📁 项目结构

```
HumanOS/
├── .github/                # GitHub 配置
│   ├── workflows/          # CI/CD 工作流
│   ├── ISSUE_TEMPLATE/     # Issue 模板
│   └── PULL_REQUEST_TEMPLATE.md
├── public/                 # 静态资源
├── src/
│   ├── components/         # React 组件
│   │   ├── animations/     # 动画组件
│   │   ├── AssessmentCard3D.tsx
│   │   ├── PersonalityRadar.tsx
│   │   └── ...
│   ├── data/               # 测评数据
│   ├── pages/              # 页面组件
│   ├── store/              # 状态管理
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # 工具函数
│   ├── App.tsx             # 应用入口
│   └── main.tsx            # 渲染入口
├── CHANGELOG.md            # 更新日志
├── CODE_OF_CONDUCT.md      # 行为准则
├── CONTRIBUTING.md         # 贡献指南
├── LICENSE                 # 许可证
├── README.md               # 项目说明（中文）
├── README_EN.md            # 项目说明（英文）
├── SECURITY.md             # 安全政策
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 动画系统

HumanOS 拥有一套完整的动画系统，提供丰富的视觉效果：

### 页面过渡动画
- 淡入淡出 (Fade)
- 滑动切换 (Slide)
- 3D 翻转 (Flip)
- 缩放效果 (Zoom)

### 交互动画
- **GlowCard** - 悬停发光卡片效果
- **RippleButton** - 点击波纹按钮
- **AnimatedNumber** - 数字滚动动画
- **AnimatedProgress** - 进度条动画

### 场景动画
- **SplashScreen** - 启动加载动画
- **ResultReveal** - 结果揭晓动画
- **AchievementUnlock** - 成就解锁动画

### 动画配置
```typescript
// 自定义动画变体
import { pageVariants, cardVariants } from '@utils/animation-config'

// 使用动画组件
import { GlowCard, RippleButton, FadeInSection } from '@components/animations'
```

---

## 🤝 贡献指南

我们非常欢迎社区贡献！请阅读 [贡献指南](CONTRIBUTING.md) 了解详情。

### 贡献方式

1. 🍴 Fork 本仓库
2. 🌿 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 💾 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 📤 推送到分支 (`git push origin feature/AmazingFeature`)
5. 🎉 创建 Pull Request

### 开发规范

- 遵循 [Conventional Commits](https://www.conventionalcommits.org/) 提交规范
- 确保代码通过 ESLint 和 TypeScript 检查
- 为新功能添加适当的测试
- 更新相关文档

---

## 📄 许可证

本项目采用 [Creative Commons Attribution-NonCommercial 4.0 International](LICENSE) 许可证。

这意味着你可以：
- ✅ 共享 — 复制、发行本作品
- ✅ 演绎 — 修改、转换或基于本作品进行创作

但必须遵守：
- ⚠️ 署名 — 必须给出适当的署名
- ⚠️ 非商业性使用 — 不得将本作品用于商业目的

---

## 🙏 致谢

### 灵感来源
- 心理学测评理论与实践
- 现代前端技术社区

### 开源项目
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)

### 特别感谢
感谢所有为这个项目做出贡献的开发者！

---

<div align="center">

**[⬆ 返回顶部](#humanos)**

---

Made with ❤️ by [HumanOS Team](https://github.com/badhope)

**如果这个项目对你有帮助，请给一个 ⭐️ Star 支持我们！**

</div>
