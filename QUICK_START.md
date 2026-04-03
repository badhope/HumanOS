# 🚀 快速开始指南

> 5分钟快速创建你的心理测评平台项目

## 📋 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

## ⚡ 快速开始

### 1️⃣ 克隆项目

```bash
git clone https://github.com/badhope/HumanOS.git
cd HumanOS
```

### 2️⃣ 初始化项目

```bash
# 运行初始化脚本
npm run init

# 或使用快捷命令
node scripts/init.js
```

按照提示完成配置：
- 输入项目名称
- 选择项目类型（毕业设计/企业应用/个人项目）
- 选择主题风格
- 选择功能模块

### 3️⃣ 安装依赖

```bash
npm install
```

### 4️⃣ 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看项目

## 🎯 项目类型快速选择

### 毕业设计版 🎓

```bash
npm run template:graduation
```

**适合**: 本科/研究生毕业设计
**包含**: 论文模板、答辩材料、测试报告

### 企业应用版 🏢

```bash
npm run template:enterprise
```

**适合**: 企业内部测评、人才管理
**包含**: API文档、部署指南、性能优化

### 个人项目版 👤

```bash
npm run template:personal
```

**适合**: 学习、原型开发、作品集
**包含**: 学习教程、示例代码、快速启动

## 📁 项目结构

```
HumanOS/
├── src/
│   ├── components/        # 组件
│   │   ├── animations/    # 动画组件
│   │   └── ...
│   ├── data/             # 测评数据
│   ├── pages/            # 页面
│   ├── store/            # 状态管理
│   ├── types/            # 类型定义
│   └── utils/            # 工具函数
├── docs/                 # 文档
├── scripts/              # 脚本
├── public/               # 静态资源
└── ...配置文件
```

## 🎨 快速自定义

### 修改主题颜色

编辑 `src/index.css`:

```css
:root {
  --color-primary: #3b82f6;    /* 主题色 */
  --color-secondary: #8b5cf6;  /* 辅助色 */
  --color-background: #0f172a; /* 背景色 */
}
```

### 添加新测评

编辑 `src/data/assessments.ts`:

```typescript
{
  id: 'my-assessment',
  title: '我的测评',
  questions: [
    { id: 'q1', text: '题目1', options: [...] },
    { id: 'q2', text: '题目2', options: [...] },
  ],
  resultCalculator: (answers) => {
    // 计算结果
  }
}
```

### 修改页面内容

编辑 `src/pages/` 目录下的对应文件

## 📚 下一步

- 📖 阅读 [完整文档](./TEMPLATE_GUIDE.md)
- 🎓 查看 [毕业设计指南](./docs/thesis-template/)
- 🏢 查看 [企业部署指南](./docs/deployment/)
- 💡 查看 [示例代码](./examples/)

## 🛠️ 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint

# 格式化代码
npm run format

# 类型检查
npm run typecheck
```

## 🚀 部署

### Vercel (推荐)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# 上传 dist 目录到 Netlify
```

### GitHub Pages

```bash
npm run build
# 使用 gh-pages 部署
```

## ❓ 遇到问题？

- 📖 查看 [常见问题](./TEMPLATE_GUIDE.md#常见问题)
- 💬 提交 [GitHub Issue](https://github.com/badhope/HumanOS/issues)
- 📧 发送邮件到 support@example.com

## 📄 许可证

MIT License - 可自由使用、修改和分发

---

**🎉 开始构建你的心理测评平台吧！**
