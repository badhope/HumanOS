# HumanOS Reborn 🧠

[![Deploy](https://github.com/badhope/HumanOS/actions/workflows/deploy.yml/badge.svg)](https://github.com/badhope/HumanOS/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-30%2B%20assessments-green.svg)]()

> **下一代人格评估平台** - 探索真实的自我

🌐 **在线访问**: https://badhope.github.io/HumanOS

📊 **30+ 专业测评** · 🎨 **现代化UI** · 🔒 **完全本地**

---

## ✨ 特性

- 🔒 **完全本地** - 数据仅存储在浏览器，无需服务器
- 🎨 **现代化UI** - 3D粒子背景、玻璃态设计、流畅动画
- 📊 **可视化结果** - 雷达图、柱状图展示测评结果
- 🤖 **AI就绪** - 支持接入 AI 进行智能分析
- 📱 **响应式设计** - 完美适配桌面、平板、手机

---

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/badhope/HumanOS.git
cd HumanOS

# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
```

---

## 🧪 30+ 专业测评

### 测评分类

| 分类 | 数量 | 测评 |
|------|------|------|
| 🧠 人格心理 | 4 | MBTI、大五人格、焦虑、情商 |
| 💼 职业能力 | 4 | 霍兰德、领导力、学习风格、创造力 |
| 🤝 人际关系 | 3 | 依恋风格、沟通、冲突处理 |
| 🧮 认知思维 | 3 | 批判思维、认知风格、决策 |
| 🏃 健康生活 | 3 | 睡眠、工作生活平衡、数字健康 |
| 💎 价值观 | 3 | 人生价值、道德基础、满意度 |
| 📚 学科知识 | 10 | 金融、科学、逻辑、时间管理等 |

**总计**: 30个专业测评，100+题目，涵盖7大领域

---

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建**: Vite
- **样式**: Tailwind CSS
- **3D**: Three.js + React Three Fiber
- **动画**: Framer Motion
- **状态**: Zustand
- **图表**: Recharts

---

## 📁 项目结构

```
src/
├── components/    # 组件
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Background3D.tsx
│   └── AssessmentCard.tsx
├── pages/         # 页面
│   ├── Home.tsx
│   ├── Assessment.tsx
│   ├── Results.tsx
│   ├── Dashboard.tsx
│   └── About.tsx
├── data/          # 测评数据
│   └── assessments.ts
├── store/         # 状态管理
│   └── index.ts
├── types/         # TypeScript 类型
│   └── index.ts
└── utils/         # 工具函数
    └── cn.ts
```

---

## 📄 许可证

MIT License © 2024 HumanOS
