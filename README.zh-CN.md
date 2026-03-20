# HumanOS

[English](./README.md) | 中文

---

## 项目名称

**HumanOS** - 自我探索测评平台

## 一句话简介

一个基于可扩展 JSON 题库系统的静态网页平台，提供人格、心理、认知与职业倾向等多元化测评，支持 Lite/Standard/Expert 三版本体系。

## 当前版本

**v1.1.0** - 多模块版本化发布 (2026-03-21)

---

## 当前开放状态

### 主打模块（完整可用）

| 测评 | 版本 | 状态 |
|------|------|------|
| MBTI 职业性格测试 | Lite(12) / Standard(32) / Expert(64) | ✅ 完整可用 |

### 已开放模块（版本化）

| 测评 | 分类 | 版本 | 状态 |
|------|------|------|------|
| 压力指数评估 | psychology | Lite(10) / Standard(20) / Expert(36) | ✅ 已开放 |
| 心理韧性评估 | psychology | Lite(10) / Standard(20) / Expert(32) | ✅ 已开放 |
| 逻辑思维评估 | cognition | Lite(8) / Standard(15) / Expert(24) | ✅ 已开放 |
| 注意力与思维风格 | cognition | Lite(10) / Standard(20) / Expert(30) | ✅ 已开放 |
| 价值观光谱 | ideology | Lite(12) / Standard(24) / Expert(36) | ✅ 已开放 |
| 霍兰德职业兴趣测试 | career | Lite(18) / Standard(36) / Expert(54) | ✅ 已开放 |
| 工作方式偏好 | career | Lite(12) / Standard(24) / Expert(36) | ✅ 已开放 |

---

## 核心功能

- **动态题库加载** - 基于 JSON 的可扩展题库系统
- **Family + Version 架构** - 每个测评族都有 Lite/Standard/Expert 版本
- **多种题型支持** - 单选、多选、Likert量表、排序
- **本地优先数据** - 所有数据存储在浏览器 IndexedDB/localStorage
- **响应式设计** - 移动端友好，支持深色模式
- **3D 视觉体验** - Three.js 沉浸式背景效果
- **流畅动画** - Framer Motion 驱动，支持配置动画级别
- **多维度分析图表** - 雷达图、柱状图、分布图可视化
- **5 大测评分类** - 人格、心理、认知、价值观、职业
- **草稿自动保存** - 答题进度自动保存并可恢复
- **个人数据中心** - 历史记录、草稿箱、设置中心
- **统一状态页** - Maintenance、Preparing、Empty、Error、Unavailable

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建工具 | Vite 5 |
| 路由 | React Router v6 (HashRouter) |
| 状态管理 | Zustand |
| 数据库 | Dexie (IndexedDB 封装) |
| 样式 | Tailwind CSS |
| 动画 | Framer Motion + Three.js |
| 图表 | Recharts |
| 图标 | Lucide React |
| 部署 | GitHub Pages (静态部署) |

---

## 项目结构

```
HumanOS/
├── public/
│   └── assessments/
│       ├── family-registry.json    # 测评家族注册表
│       ├── personality/
│       │   └── mbti/              # MBTI 家族（多版本）
│       ├── psychology/
│       │   ├── stress/            # 压力评估
│       │   └── resilience/        # 心理韧性评估
│       ├── cognition/
│       │   ├── logic/             # 逻辑思维评估
│       │   └── focus/             # 注意力评估
│       ├── ideology/
│       │   └── values/            # 价值观光谱
│       └── career/
│           ├── holland/            # 霍兰德职业兴趣
│           └── work-style/         # 工作方式偏好
├── src/
│   ├── components/
│   │   ├── 3d/                    # Three.js 组件
│   │   ├── atoms/                 # 基础 UI 组件
│   │   ├── molecules/             # 复合组件
│   │   │   └── StatusPageTemplate.tsx  # 统一状态页模板
│   │   └── organisms/             # 复杂组件
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Categories.tsx
│   │   ├── AssessmentList.tsx
│   │   ├── Quiz.tsx
│   │   ├── Results.tsx
│   │   ├── Profile.tsx
│   │   ├── Maintenance.tsx        # 维护中
│   │   ├── Preparing.tsx           # 准备中
│   │   ├── Empty.tsx               # 空状态
│   │   ├── ErrorPage.tsx           # 错误页
│   │   ├── Unavailable.tsx         # 不可用
│   │   └── NotFound.tsx            # 404
│   ├── features/
│   │   └── assessment/
│   ├── store/
│   │   ├── quizStore.ts
│   │   └── settingsStore.ts
│   ├── shared/
│   │   └── types/
│   └── App.tsx
├── docs/
│   ├── architecture.md         # 系统架构
│   ├── content-system.md       # 题库系统
│   └── developer-guide.md      # 开发者指南
├── package.json
└── vite.config.ts
```

---

## 文档

| 文档 | 说明 |
|------|------|
| [架构文档](./docs/architecture.md) | 系统架构与设计 |
| [内容系统](./docs/content-system.md) | 题库格式与版本化 |
| [开发者指南](./docs/developer-guide.md) | 如何扩展平台 |

---

## 本地开发

### 环境要求

- Node.js 18+
- npm 9+

### 初始化

```bash
# 克隆仓库
git clone https://github.com/badhope/HumanOS.git
cd HumanOS

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 运行 ESLint |
| `npm run typecheck` | 运行 TypeScript 类型检查 |

---

## 数据与存储

所有数据都存储在浏览器本地：

- **IndexedDB (Dexie)**：测评结果、用户档案、草稿
- **localStorage**：用户设置（主题、字号、动画级别）

无需后端 - 数据持久化在浏览器中。

---

## 路由

使用 HashRouter 兼容 GitHub Pages：

| 路由 | 页面 |
|------|------|
| `#/` | 首页 |
| `#/categories` | 分类页 |
| `#/assessments/:category` | 测评列表 |
| `#/quiz/:assessmentId` | 答题页 |
| `#/results/:assessmentId` | 结果页 |
| `#/profile` | 个人中心 |
| `#/maintenance` | 维护中 |
| `#/preparing` | 准备中 |
| `#/empty` | 空状态 |
| `#/error` | 错误页 |
| `#/unavailable` | 不可用 |
| `#/*` | 404 |

---

## License

MIT
