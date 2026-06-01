# MindMirror

<div align="center">

![MindMirror](https://img.shields.io/badge/MindMirror-Psychological%20Assessment-4F46E5?style=for-the-badge&logo=brain&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-6DD58C?style=flat-square)
![PRs](https://img.shields.io/badge/PRs-Welcome-FF6B6B?style=flat-square)

**🌐 [Live Demo](https://mindmirror.app)** | **📖 [中文文档](#中文介绍)** | **🤝 [Contributing](CONTRIBUTING.md)**

*Discover yourself, grow every day.*

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧠 **Big Five Personality Assessment** | Scientific NEO-PI-R based personality test with detailed trait analysis |
| 😰 **Stress Evaluation** | PSS-10 based stress assessment with personalized recommendations |
| 😨 **Anxiety Assessment** | GAD-7 clinical-grade anxiety screening |
| 😊 **Mood Tracker** | Daily mood logging with trend visualization |
| 🏆 **Achievements System** | Gamified progress tracking and milestone rewards |
| 📊 **Results Comparison** | Compare assessments across different time periods |
| 💪 **Mental Training** | CBT-based exercises for stress management |
| 🌐 **Bilingual Support** | Full English / Chinese (简体中文) internationalization |
| 🔐 **OAuth Authentication** | GitHub & Google social login support |
| 📱 **Responsive Design** | Mobile-first, works on all devices |
| 🔌 **Plugin System** | Extensible architecture for custom assessments |
| 🎨 **Smooth Animations** | Polished micro-interactions with Framer Motion |

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0 or pnpm ≥ 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/badhope/MindMirror.git
cd MindMirror

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Backend Setup (Optional)

MindMirror works with localStorage by default. To enable cloud sync with Supabase:

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration SQL in `supabase/migrations/001_initial_schema.sql`
3. Enable GitHub and Google OAuth providers in Supabase dashboard
4. Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript 5.8, Vite 6 |
| **State Management** | Zustand 5 |
| **Styling** | Tailwind CSS 3, Framer Motion 12 |
| **Routing** | React Router v7 |
| **Backend (Optional)** | Supabase (PostgreSQL + Auth) |
| **API** | Express.js (Vercel Serverless Functions) |
| **i18n** | Custom lightweight i18n (EN/ZH) |
| **Build** | Vite + TypeScript Compiler |

---

## 📁 Project Structure

```
MindMirror/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── animations/  # Framer Motion animation components
│   ├── data/            # Assessment question data
│   ├── hooks/           # Custom React hooks
│   ├── i18n/            # EN/ZH translation files
│   ├── lib/              # Supabase client, utilities
│   ├── pages/            # Route page components (15+ pages)
│   ├── services/         # Business logic (scoring, auth)
│   ├── store/            # Zustand global state
│   └── types/            # TypeScript type definitions
├── api/                  # Express.js serverless API routes
│   └── routes/          # auth.ts, data.ts
├── supabase/             # Database migrations
├── public/               # Static assets, PWA files
└── tests/                # Unit tests for scoring logic
```

---

## 🧪 Assessments

### Big Five Personality (NEO-PI-R Based)

50 questions measuring five major personality traits:

- **Openness** — Imagination, creativity, curiosity
- **Conscientiousness** — Organization, responsibility, diligence
- **Extraversion** — Sociability, assertiveness, positive emotions
- **Agreeableness** — Cooperation, trust, empathy
- **Neuroticism** — Emotional instability, anxiety, moodiness

### Perceived Stress Scale (PSS-10)

10 questions measuring perceived stress levels with clinical thresholds.

### Generalized Anxiety Disorder (GAD-7)

7-question clinical screening tool for anxiety severity assessment.

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting PRs.

**Development workflow:**

```bash
# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and run type checking
npm run typecheck
npm run lint

# Commit your changes (conventional commits)
git commit -m "feat: add amazing feature"

# Push and open a Pull Request
git push origin feature/amazing-feature
```

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Assessment methodologies based on [IPIP](https://ipip.ori.org/) (International Personality Item Pool)
- GAD-7 scale from [Spitzer et al.](https://doi.org/10.1001/archpsyc.63.9.1043)
- PSS-10 from [Cohen et al.](https://doi.org/10.1037/t00791-000)
- Inspired by [MindGarden](https://www.mindgarden.com/) and [16Personalities](https://www.16personalities.com/)

---

## 🌟 Star History

If MindMirror helps you, please give it a ⭐ — it means a lot!

[![Star History Chart](https://api.star-history.com/svg?repos=badhope/MindMirror&type=Timeline)](https://star-history.com/#badhope/MindMirror&Timeline)

---

<br>

---

# 🌟 MindMirror

<div align="center">

![MindMirror](https://img.shields.io/badge/MindMirror-心理测评平台-4F46E5?style=for-the-badge&logo=brain&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-6DD58C?style=flat-square)

**🌐 [在线体验](https://mindmirror.app)** | **🇺🇸 [English Version](#)** | **🤝 [贡献指南](CONTRIBUTING.md)**

*发现自我，每天成长。*

</div>

---

## ✨ 功能特点

| 功能 | 描述 |
|------|------|
| 🧠 **大五人格测评** | 基于 NEO-PI-R 的科学人格测试，详细的特质分析 |
| 😰 **压力评估** | 基于 PSS-10 的压力测评，个性化建议 |
| 😨 **焦虑评估** | GAD-7 临床焦虑筛查量表 |
| 😊 **心情追踪** | 每日心情记录与趋势可视化 |
| 🏆 **成就系统** | 游戏化进度追踪与里程碑奖励 |
| 📊 **结果对比** | 对比不同时期的测评结果 |
| 💪 **心理训练** | CBT 认知行为疗法练习 |
| 🌐 **双语支持** | 完整英文 / 中文国际化 |
| 🔐 **OAuth 登录** | GitHub & Google 社交登录 |
| 📱 **响应式设计** | 移动端优先，适配所有设备 |
| 🔌 **插件系统** | 可扩展架构，支持自定义测评 |
| 🎨 **流畅动画** | Framer Motion 精制微交互动画 |

---

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/badhope/MindMirror.git
cd MindMirror

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

在浏览器中打开 [http://localhost:5173](http://localhost:5173)。

---

## 🏗️ 技术栈

| 层级 | 技术 |
|------|------|
| **前端** | React 18, TypeScript 5.8, Vite 6 |
| **状态管理** | Zustand 5 |
| **样式** | Tailwind CSS 3, Framer Motion 12 |
| **路由** | React Router v7 |
| **后端（可选）** | Supabase (PostgreSQL + Auth) |
| **API** | Express.js (Vercel Serverless) |
| **国际化** | 轻量级 i18n (EN/ZH) |
| **构建** | Vite + TypeScript Compiler |

---

## 🧪 测评介绍

### 大五人格 (基于 NEO-PI-R)

50 道题测量五大核心人格特质：

- **开放性** — 想象力、创造力、好奇心
- **尽责性** — 条理性、责任感、勤奋
- **外向性** — 社交性、主动性、积极情绪
- **宜人性** — 合作性、信任感、同理心
- **神经质** — 情绪不稳定、焦虑、情绪波动

### 感知压力量表 (PSS-10)

10 道题测量主观压力感知，附带临床阈值参考。

### 广泛性焦虑量表 (GAD-7)

7 道题临床焦虑筛查工具，评估焦虑严重程度。

---

## 🤝 贡献指南

欢迎贡献！提交 PR 前请阅读 [贡献指南](CONTRIBUTING.md)。

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源。

---

## 🙏 致谢

- 测评方法论基于 [IPIP](https://ipip.ori.org/)（国际人格题库）
- GAD-7 量表来自 [Spitzer et al.](https://doi.org/10.1001/archpsyc.63.9.1043)
- PSS-10 来自 [Cohen et al.](https://doi.org/10.1037/t00791-000)
- 灵感来自 [MindGarden](https://www.mindgarden.com/) 和 [16Personalities](https://www.16personalities.com/)
