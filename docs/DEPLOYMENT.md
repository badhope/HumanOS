# 心镜 MindMirror 部署和打包指南

## 📋 目录
- [Web 网站部署](#web-网站部署)
- [Windows EXE 打包](#windows-exe-打包)
- [小程序适配方案](#小程序适配方案)
- [完整用户流程](#完整用户流程)

---

## 🌐 Web 网站部署

### 1. 构建 Web 版本
```bash
# 1. 安装依赖
npm install

# 2. 构建生产版本
npm run build

# 3. 预览构建结果
npm run preview
```

### 2. 部署到云平台

#### Vercel
```bash
npm run deploy:vercel
```

#### Netlify
```bash
npm run deploy:netlify
```

#### Cloudflare Pages
```bash
npm run deploy:cloudflare
```

#### 其他部署
```bash
npm run deploy:surge
```

### 3. 自定义部署
将 `dist` 目录下的文件上传到任何静态托管服务。

---

## 💻 Windows EXE 打包

### 前置要求

### 1. 新增依赖安装

由于需要安装额外的 Electron 依赖（package.json会包含这些，但先确保安装）。

### 2. 打包流程

```bash
# 1. 先构建 Web 版本
npm run build

# 2. 打包 Windows 版本
npm run build:win

# 3. 打包所有平台
npm run build:all
```

### 3. 打包输出

打包完成后，`release` 目录下会有：

- `心镜-MindMirror-{version}-x64.exe (NSIS 安装包)
- `心镜-MindMirror-{version}-x64-便携版.exe (便携版)

### 4. macOS 打包

```bash
# 打包 macOS 版本 (需在 macOS 上运行)
npm run build:mac
```

### 5. Linux 打包

```bash
# 打包 Linux 版本 (需在 Linux 上运行)
npm run build:linux
```

---

## 📱 小程序适配方案

### 方案一：直接使用 PWA 版
项目已集成 PWA 支持！

```javascript
// 用户可以通过浏览器"添加到主屏幕"
```

### 方案二：使用 uni-app 迁移
如果需要真正的原生小程序，建议使用以下方案：

1. 使用 Taro 或 uni-app 框架重构

```
项目结构建议：
├── src-uniapp/
│   ├── pages/
│   ├── components/
│   └── static/
├── dist/ (编译输出)
```

### 方案三：使用小程序嵌入
使用 WebView 嵌入：

```
小程序内使用 WebView 组件加载 web 版本
```

---

## 🔄 完整用户流程

### 🚀 新用户完整体验流程

```
1. 进入应用
   ↓
2. 欢迎弹窗 (已实现 WelcomeModal
   ↓
3. 每日任务列表引导 (DailyTaskList
   ↓
4. 心情打卡 (Mood
   ↓
5. 选择测评 (Discover
   ↓
6. 模式选择 (ModeSelect
   ↓
7. 开始测评 (Assessment
   ↓
8. 查看报告 (Results
   ↓
9. 训练 (Training
   ↓
10. 查看进度 (Progress
```

### ✅ 核心功能完整性检查

| 功能 | 状态 | 位置 |
|-----|------|------|
| 心情打卡 | ✅ 已实现 | Daily.tsx |
| 测评中心 | ✅ 已实现 | Discover.tsx |
| 训练系统 | ✅ 已实现 | Training.tsx |
| 进度追踪 | ✅ 已实现 | Progress.tsx |
| 个人成长 | ✅ 已实现 | GrowthDashboard.tsx |
| 系统设置 | ✅ 已实现 | SettingsPage.tsx |
| 数据导出 | ✅ 已实现 | SettingsPage.tsx |
| 错误边界 | ✅ 已实现 | ErrorBoundary.tsx |
| 加载状态 | ✅ 已实现 | Loading.tsx |

---

## 🛠️ 开发命令速查

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建 Web 版本 |
| `npm run electron:dev` | 启动 Electron 开发模式 |
| `npm run build:win` | 打包 Windows EXE |
| `npm run build:all` | 打包所有平台 |
| `npm run typecheck` | 类型检查 |
| `npm run lint` | 代码规范检查 |

---

## 📊 需要注意事项

1. **图标准备**
- 将应用图标放入 `build/` 目录:
  - `icon.ico` (Windows)
  - `icon.icns` (macOS)
  - `icon.png` (所有平台，1024x1024 像素)

2. **首次打包时会先确保已先构建 Web 版本！

3. **小程序适配建议使用方案一（PWA 先上线，有时间再做方案二的完整迁移。

---

## 📞 技术栈

| 技术 | 说明 |
|------|------|
| React 18 | UI 框架 |
| Vite 5 | 构建工具 |
| TypeScript 5 | 类型安全 |
| Tailwind CSS 3 | 样式框架 |
| Framer Motion | 动画库 |
| Electron 27 | 桌面打包工具 |
| Zustand | 状态管理 |

## 🔧 配置文件

- `vite.config.ts` - Vite 配置
- `electron/main.ts` - Electron 主进程
- `electron/preload.mjs` - Electron 预加载脚本
- `electron-builder.json` - 打包配置
