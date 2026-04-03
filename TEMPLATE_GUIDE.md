# HumanOS 项目模板使用指南

> 🎯 快速创建你的心理测评平台项目

## 📖 目录

- [简介](#简介)
- [快速开始](#快速开始)
- [项目类型](#项目类型)
- [功能模块](#功能模块)
- [配置说明](#配置说明)
- [自定义开发](#自定义开发)
- [部署指南](#部署指南)
- [常见问题](#常见问题)

---

## 简介

HumanOS 是一个功能完善的心理测评平台项目模板，适用于：

- 🎓 **毕业设计项目** - 本科/研究生毕业设计
- 🏢 **企业应用** - 内部测评、人才管理
- 👤 **个人项目** - 学习、原型开发、作品集

### 核心特性

✅ **开箱即用** - 完整的项目结构和配置
✅ **高度可定制** - 模块化设计，按需启用
✅ **丰富文档** - 详细的使用和开发文档
✅ **现代化技术栈** - React + TypeScript + Vite
✅ **精美UI** - Tailwind CSS + 动画效果
✅ **响应式设计** - 支持各种设备

---

## 快速开始

### 方式一：使用初始化脚本（推荐）

```bash
# 1. 克隆或下载项目
git clone https://github.com/badhope/HumanOS.git
cd HumanOS

# 2. 运行初始化脚本
node scripts/init.js

# 3. 按照提示配置项目
# - 输入项目名称和描述
# - 选择项目类型
# - 选择主题风格
# - 选择功能模块

# 4. 安装依赖
npm install

# 5. 启动开发服务器
npm run dev
```

### 方式二：手动配置

```bash
# 1. 克隆项目
git clone https://github.com/badhope/HumanOS.git my-project
cd my-project

# 2. 安装依赖
npm install

# 3. 复制环境变量文件
cp .env.development .env.local

# 4. 修改 package.json 中的项目信息

# 5. 启动开发服务器
npm run dev
```

---

## 项目类型

### 1. 毕业设计版 🎓

**适用场景**: 本科/研究生毕业设计

**包含内容**:
- 📄 论文模板 (docs/thesis-template/)
  - 开题报告模板
  - 中期检查模板
  - 论文正文模板
  - 参考文献
- 🎤 答辩材料 (docs/defense-presentation/)
  - PPT模板
  - 答辩稿
  - 常见问题
- 📊 测试报告 (docs/test-report/)
  - 功能测试报告
  - 性能测试报告
  - 用户测试报告
- 📚 学术支持
  - 相关论文引用
  - 理论基础说明
  - 研究方法指导

**推荐配置**:
```json
{
  "projectType": "graduation",
  "modules": {
    "assessments": true,
    "userSystem": true,
    "dataVisualization": true,
    "animations": true,
    "threeD": false
  }
}
```

### 2. 企业应用版 🏢

**适用场景**: 企业内部测评、人才管理

**包含内容**:
- 📡 API文档 (docs/api/)
  - RESTful API文档
  - 接口测试示例
  - SDK使用指南
- 🚀 部署指南 (docs/deployment/)
  - Docker部署
  - 云服务部署
  - 性能优化
- 📈 数据分析
  - 测评数据统计
  - 可视化报表
  - 导出功能
- 🔐 安全特性
  - 数据加密
  - 权限管理
  - 审计日志

**推荐配置**:
```json
{
  "projectType": "enterprise",
  "database": {
    "type": "mongodb"
  },
  "modules": {
    "assessments": true,
    "userSystem": true,
    "dataVisualization": true,
    "animations": false,
    "threeD": false
  }
}
```

### 3. 个人项目版 👤

**适用场景**: 学习、原型开发、作品集

**包含内容**:
- 📚 学习教程 (docs/tutorial/)
  - 快速入门
  - 核心概念
  - 最佳实践
- 💡 示例代码 (examples/)
  - 组件示例
  - 页面示例
  - 功能示例
- 🎨 主题定制
  - 颜色配置
  - 布局调整
  - 样式修改

**推荐配置**:
```json
{
  "projectType": "personal",
  "database": {
    "type": "local"
  },
  "modules": {
    "assessments": true,
    "userSystem": true,
    "dataVisualization": true,
    "animations": true,
    "threeD": true
  }
}
```

---

## 功能模块

### 1. 心理测评模块 🧠

**功能**: 提供多种心理测评工具

**支持的测评类型**:
- MBTI人格测试
- 大五人格测试
- 焦虑自评量表
- 情绪智力测试
- 职业兴趣测试
- 依恋风格测试
- 学习风格测试
- 批判性思维测试
- 压力管理测试
- 创造力测试

**自定义测评**:
```typescript
// src/data/assessments.ts
export const assessments: Assessment[] = [
  {
    id: 'custom-assessment',
    title: '自定义测评',
    description: '你的自定义测评描述',
    category: '自定义分类',
    difficulty: 'standard',
    duration: 10,
    questions: [
      {
        id: 'q1',
        text: '题目内容',
        type: 'single',
        options: [
          { id: '1', text: '选项1', value: 1 },
          { id: '2', text: '选项2', value: 2 },
        ]
      }
    ],
    resultCalculator: (answers) => {
      // 计算结果逻辑
      return {
        type: '结果类型',
        title: '结果标题',
        description: '结果描述',
        traits: [],
        details: {}
      }
    }
  }
]
```

### 2. 用户系统 👥

**功能**: 用户管理和数据存储

**特性**:
- 用户档案管理
- 测评历史记录
- 收藏功能
- 数据导入导出

**配置**:
```typescript
// src/store/userStore.ts
interface UserProfile {
  id: string
  name: string
  email?: string
  avatar?: string
  assessments: AssessmentResult[]
  favorites: string[]
  createdAt: string
  updatedAt: string
}
```

### 3. 数据可视化 📊

**功能**: 测评结果可视化展示

**支持的图表类型**:
- 雷达图 (人格特质)
- 柱状图 (维度对比)
- 折线图 (趋势分析)
- 饼图 (比例分布)

**自定义图表**:
```typescript
// 使用 PersonalityRadar 组件
<PersonalityRadar
  data={[
    { name: '开放性', score: 85, maxScore: 100 },
    { name: '尽责性', score: 70, maxScore: 100 },
    { name: '外向性', score: 60, maxScore: 100 },
  ]}
  config={{
    width: 400,
    height: 400,
    colors: ['#3b82f6', '#8b5cf6', '#ec4899']
  }}
/>
```

### 4. 动画效果 ✨

**功能**: 页面过渡和交互动画

**包含的动画组件**:
- PageTransition - 页面过渡
- Loading - 加载动画
- ResultReveal - 结果揭示
- AnimatedNumber - 数字动画
- AnimatedProgress - 进度条动画
- RippleButton - 波纹按钮

**使用示例**:
```typescript
import { PageTransition } from '@/components/animations'

function MyPage() {
  return (
    <PageTransition>
      <div>页面内容</div>
    </PageTransition>
  )
}
```

### 5. 3D效果 🎮

**功能**: 3D背景和卡片效果

**包含的3D组件**:
- Background3D - 3D背景
- AssessmentCard3D - 3D测评卡片
- ParticleBackground - 粒子背景

**性能优化**:
```typescript
// 根据设备性能自动调整
const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)
const enable3D = !isMobile && window.devicePixelRatio <= 2
```

---

## 配置说明

### 环境变量配置

创建 `.env.local` 文件:

```bash
# 项目基本信息
VITE_APP_NAME=MyApp
VITE_APP_DESCRIPTION=我的心理测评平台
VITE_APP_AUTHOR=Your Name

# 主题配置
VITE_THEME=default

# 数据库配置
VITE_DATABASE_TYPE=local

# API配置 (可选)
VITE_API_BASE_URL=http://localhost:3000/api

# Firebase配置 (可选)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 主题配置

修改 `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // 主题色
        secondary: '#8b5cf6', // 辅助色
        background: '#0f172a', // 背景色
      }
    }
  }
}
```

### 数据库配置

#### 本地存储 (默认)

```typescript
// 使用 localStorage
// 无需额外配置
```

#### Firebase

```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
```

#### MongoDB

```typescript
// 需要后端API支持
// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function saveResult(result: any) {
  const response = await fetch(`${API_BASE_URL}/results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result)
  })
  return response.json()
}
```

---

## 自定义开发

### 添加新的测评类型

1. 创建测评数据:

```typescript
// src/data/assessments.ts
{
  id: 'my-assessment',
  title: '我的测评',
  description: '测评描述',
  category: '自定义',
  difficulty: 'standard',
  duration: 10,
  questions: [
    // 添加题目
  ],
  resultCalculator: (answers) => {
    // 实现计算逻辑
  }
}
```

2. 添加结果展示:

```typescript
// src/pages/Results.tsx
// 添加结果展示逻辑
```

### 自定义主题

1. 修改颜色配置:

```typescript
// src/index.css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-background: #0f172a;
}
```

2. 创建主题切换:

```typescript
// src/store/themeStore.ts
import { create } from 'zustand'

interface ThemeState {
  theme: 'light' | 'dark' | 'default'
  setTheme: (theme: 'light' | 'dark' | 'default') => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'default',
  setTheme: (theme) => set({ theme })
}))
```

### 添加新页面

1. 创建页面组件:

```typescript
// src/pages/MyPage.tsx
export default function MyPage() {
  return (
    <div>
      <h1>我的页面</h1>
    </div>
  )
}
```

2. 添加路由:

```typescript
// src/App.tsx
<Route path="/my-page" element={<MyPage />} />
```

---

## 部署指南

### Vercel (推荐)

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 部署
vercel

# 3. 生产部署
vercel --prod
```

### Netlify

```bash
# 1. 构建
npm run build

# 2. 部署 dist 目录到 Netlify
```

### GitHub Pages

```bash
# 1. 安装 gh-pages
npm install --save-dev gh-pages

# 2. 添加部署脚本到 package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# 3. 部署
npm run deploy
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# 构建和运行
docker build -t humanos .
docker run -p 80:80 humanos
```

---

## 常见问题

### Q: 如何修改测评题目？

A: 编辑 `src/data/assessments.ts` 文件，找到对应的测评，修改 `questions` 数组。

### Q: 如何添加新的测评类型？

A: 在 `src/data/assessments.ts` 中添加新的测评对象，包含 `id`, `title`, `questions`, `resultCalculator` 等字段。

### Q: 如何修改主题颜色？

A: 修改 `tailwind.config.js` 中的颜色配置，或直接修改 `src/index.css` 中的CSS变量。

### Q: 如何禁用某些功能模块？

A: 运行 `node scripts/init.js` 重新配置项目，或在 `humanos.config.json` 中修改 `modules` 配置。

### Q: 如何部署到生产环境？

A: 参考[部署指南](#部署指南)部分，选择适合的部署平台。

### Q: 如何获取技术支持？

A:
- 📖 查看项目文档
- 💬 提交 GitHub Issue
- 📧 发送邮件到 support@example.com

---

## 许可证

MIT License - 可自由使用、修改和分发

---

## 联系方式

- 🌐 官网: https://github.com/badhope/HumanOS
- 📧 邮箱: support@example.com
- 💬 社区: GitHub Discussions

---

**🎉 祝你使用愉快！如有问题欢迎反馈。**
