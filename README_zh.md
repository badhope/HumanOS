# 心镜 MindMirror

照见自己，成为更好的自己。开源专业心理测评与成长平台。

## 功能特点

- 50+ 种专业心理测评
- 详细的分析报告
- 视觉化数据展示
- PWA 支持

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量（可选）
cp .env.example .env.development
# 编辑 .env.development 文件配置你的环境变量

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 环境变量

项目使用以下环境变量（可在 `.env.example` 中查看完整说明）：

- `VITE_APP_TITLE` - 应用标题
- `VITE_API_BASE_URL` - API 基础地址
- `VITE_USE_BACKEND_CALCULATION` - 是否使用后端计算引擎
- `VITE_ENABLE_USER_SYSTEM` - 是否启用用户系统
- `VITE_CLOUD_SAVE_ENABLED` - 是否启用云端保存
- `VITE_DEBUG_MODE` - 是否启用调试模式

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Framer Motion
- Recharts

## License

本项目仅供学习和个人使用。
