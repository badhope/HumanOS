# HumanOS Reborn - 中文文档

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

> **下一代人格评估平台** - 探索真实的自我

*[📖 English](./README.md) • [🌐 中文](./README_zh.md)*

**[在线演示](https://badhope.github.io/HumanOS)** ·
**[文档](https://github.com/badhope/HumanOS/wiki)** ·
**[贡献指南](CONTRIBUTING.md)** ·
**[更新日志](CHANGELOG.md)**

---

## ✨ 特性

### 🎯 核心功能

| 功能 | 描述 |
|------|------|
| 📊 **30+ 专业测评** | 涵盖人格、认知、心理的全方位测评 |
| 🎨 **现代化UI** | 3D粒子背景、玻璃态设计、流畅动画 |
| 📱 **完全响应式** | 完美适配桌面、平板、手机 |
| 🔒 **隐私优先** | 数据仅存储在浏览器本地 |
| ⚡ **高性能** | Lighthouse 评分 >90 |
| 🌐 **国际化** | 英文为主，中文可用 |

### 🧪 测评分类

| 分类 | 数量 | 示例 |
|------|------|------|
| 🧠 人格与心理 | 8+ | MBTI、大五人格、焦虑、情商 |
| 💼 职业与工作 | 6+ | 领导力、团队协作、沟通能力 |
| ❤️ 人际关系 | 5+ | 依恋风格、社交技能 |
| 🧩 认知与思维 | 4+ | 问题解决、批判性思维 |
| 🏃 健康与生活 | 4+ | 压力管理、幸福感 |
| 💡 价值观与哲学 | 3+ | 伦理框架、人生目标 |

### 🎮 难度模式

每个测评提供三种难度级别：

| 模式 | 题数 | 深度 | 适用场景 |
|------|------|------|----------|
| 🟢 **标准** | 30 | 核心能力 | 快速自我检查 |
| 🟡 **困难** | 60 | +30%维度 | 全面分析 |
| 🔴 **专家** | 100 | 完整覆盖 | 专业评估 |

---

## 🚀 快速开始

### 环境要求

- **Node.js**: v18.0.0 或更高
- **npm**: v9.0.0 或更高
- **浏览器**: 现代浏览器 (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+)

### 安装

```bash
# 克隆仓库
git clone https://github.com/badhope/HumanOS.git
cd HumanOS

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build
```

### 可用命令

| 命令 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 (http://localhost:5173) |
| `npm run build` | 生产构建 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 运行 ESLint |
| `npm run format` | 使用 Prettier 格式化代码 |

---

## 📖 项目结构

```
HumanOS/
├── src/
│   ├── components/       # 可复用UI组件
│   ├── pages/            # 页面组件
│   ├── data/             # 静态数据
│   ├── store/            # Zustand 状态管理
│   ├── types/            # TypeScript 类型定义
│   └── utils/            # 工具函数
├── .github/              # GitHub 配置
├── docs/                 # 文档
├── ARCHITECTURE.md       # 系统架构
├── CONTRIBUTING.md       # 贡献指南
└── README.md             # 英文文档
```

---

## 🔮 未来路线图

### 第一阶段：基础（当前）
- [x] 核心测评系统
- [x] 3D卡片动画
- [x] 粒子背景
- [x] 响应式设计
- [x] 专业文档

### 第二阶段：扩展（计划中）
- [ ] **国际化 (i18n)**
  - 完整中文翻译
  - 语言切换组件

- [ ] **测评扩展**
  - 50+ 测评总数
  - 职业倾向测评
  - 情商测评

- [ ] **UI/UX 增强**
  - 交互式3D头像
  - 动态结果摘要
  - 进度追踪仪表盘

### 第三阶段：社区（未来）
- [ ] **题库系统**
  - 模块化测评框架
  - 社区贡献题目

- [ ] **分析仪表盘**
  - 纵向追踪
  - 多测评关联

### 第四阶段：平台（长期）
- [ ] **白标解决方案**
  - 自定义品牌
  - 独立部署

- [ ] **AI 集成**
  - GPT 驱动的洞察
  - 个性化推荐

---

## 🤝 贡献

我们欢迎贡献！请参阅 [贡献指南](CONTRIBUTING.md)。

### 快速指南

```bash
# 1. Fork 仓库
# 2. 克隆你的 fork
git clone https://github.com/YOUR_USERNAME/HumanOS.git

# 3. 创建功能分支
git checkout -b feature/amazing-feature

# 4. 进行更改
# 5. 测试
npm run build && npm run lint

# 6. 提交并推送
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature

# 7. 打开 Pull Request
```

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE)。

---

## 🙏 致谢

- [React](https://react.dev/) - UI 框架
- [Framer Motion](https://www.framer.com/motion/) - 动画
- [Three.js](https://threejs.org/) - 3D 图形
- [Tailwind CSS](https://tailwindcss.com/) - 样式
- [Lucide](https://lucide.dev/) - 图标
- 所有 [贡献者](https://github.com/badhope/HumanOS/graphs/contributors)

---

<div align="center">

**由 HumanOS 团队用心打造 ❤️**

</div>
