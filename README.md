<!-- Powered by AI Agent -->
<!-- Professional Frontend Framework Showcase Platform -->

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=45&duration=4000&pause=1000&color=61DAFB&background=0F0F23&center=true&vCenter=true&multiline=true&width=900&height=100&lines=HumanOS+%F0%9F%8C%8E+~+Political+Economy+Simulator" alt="HumanOS">
</p>

<p align="center">
  <a href="https://github.com/badhope/HumanOS">
    <img src="https://img.shields.io/badge/Version-v2.5.0-61dafb?style=for-the-badge" alt="Version">
  </a>
  <a href="https://creativecommons.org/licenses/by-nc/4.0/">
    <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue?style=for-the-badge" alt="License">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge" alt="TypeScript">
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react" alt="React">
  </a>
  <a href="https://humanos.dpdns.org/">
    <img src="https://img.shields.io/badge/Demo-Live-success?style=for-the-badge" alt="Demo">
  </a>
  <img src="https://img.shields.io/badge/Build-%E2%9C%85%20Passing-brightgreen?style=for-the-badge" alt="Build">
</p>

---

## 🎮 Hearts of Iron 风格政治经济模拟器

> **钢铁雄心级别的大战略游戏体验，现在可以在浏览器中玩了！**

### 🔥 核心特色

| 🏛️ 政治系统 | 💹 经济引擎 | 🎯 国策系统 | 🎲 随机事件 |
|------------|------------|------------|------------|
| 6大利益集团 | 数学经济引擎 | 4条国策路线 | 危机事件系统 |
| 意识形态斗争 | 美联储货币政策 | 28个独特国策 | 游戏结束机制 |
| 总统法令 | 联邦预算管理 | 互斥路线选择 | 每日判定 |

---

### 🎯 11个完整可玩面板

| | 模块 | 状态 | 功能 |
|---|------|------|------|
| 🌳 | **国策树** | ✅ 完成 | 4条路线 × 28个国策 |
| 🔬 | **科技树** | ✅ 完成 | 缩放平移 + 完整Tooltip |
| 📜 | **总统法令** | ✅ 完成 | 即时生效 + 冷却机制 |
| 🏛️ | **利益集团** | ✅ 完成 | 6大派系 + 满意度系统 |
| 🗳️ | **选举地图** | ✅ 完成 | 50州选举人团可视化 |
| 📊 | **数据可视化** | ✅ 完成 | 6指标 + 3张趋势图 |
| 📋 | **研究队列** | ✅ 完成 | 国策/科技进度跟踪 |
| 💰 | **联邦预算** | ✅ 完成 | 收支双饼图 + 月度趋势 |
| 🏦 | **美联储** | ✅ 完成 | 加息/降息 + QE/QT |
| 👥 | **人口统计** | ✅ 完成 | 劳动力市场 + 行业分布 |
| 💹 | **经济面板** | ✅ 完成 | 完整市场数据 |

---

### 🧠 智能Tooltip系统

```
✅ 自动四方向定位 - 永不超出视口
✅ 永不遮挡内容 - 智能选最佳位置
✅ 全部11面板覆盖 - 每个元素都有详情
✅ 动画过渡效果 - Framer Motion 驱动
```

---

### 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/badhope/HumanOS.git

# 进入目录
cd HumanOS

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build
```

---

### 🛠️ 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| ⚛️ **框架** | React | 18.2 |
| 📘 **语言** | TypeScript | 5.2 |
| 💨 **样式** | Tailwind CSS | 3.4 |
| ✨ **动画** | Framer Motion | 11.0 |
| 📊 **图表** | Recharts | 2.12 |
| 🛠️ **构建** | Vite | 5.2 |
| 📱 **PWA** | Vite PWA | 0.19 |

---

### 🎮 游戏玩法演示

```
┌─────────────────────────────────────────────────┐
│  【游戏循环】                                    │
├─────────────────────────────────────────────────┤
│  1. 选择国策 → 等待天数 → 自动生效              │
│  2. 研究科技 → 解锁加成 → 影响经济              │
│  3. 签署法令 → 改变参数 → 影响派系好感           │
│  4. 平衡6大利益集团 → 维持稳定度                │
│  5. 应对随机事件 → 做出选择 → 承担后果          │
│  6. 管理经济 → 控制通胀 → 降低失业              │
│  7. 避免游戏结束 → 政变/弹劾/经济崩溃            │
└─────────────────────────────────────────────────┘
```

---

### 📸 游戏截图

| 国策树系统 | 利益集团面板 |
|-----------|------------|
| 4条路线互斥选择 | 6派系好感度实时计算 |

| 美联储面板 | 联邦预算 |
|-----------|---------|
| 加息/降息货币政策 | 收支双饼图可视化 |

---

### 🧮 数学经济引擎

游戏背后的核心计算模型：

```typescript
// 稳定度计算公式
stability = baseStability 
  + Σ(集团满意度 ? 势力 × 加成 : 势力 × 惩罚)
  + 国策效果 + 法令效果 + 事件修正

// 支持率计算公式
approval = baseApproval
  + 0.4 × gdpGrowth - 0.3 × inflation - 0.3 × unemployment
  + 媒体修正 + 事件选择修正
```

---

### 🌟 项目亮点

1. **✅ 零类型错误** - 严格TypeScript类型检查
2. **✅ 零运行警告** - 完整ESLint覆盖
3. **✅ 全组件Tooltip** - 100% 信息不遗漏
4. **✅ 响应式设计** - 完美适配各种屏幕
5. **✅ PWA支持** - 可离线安装使用
6. **✅ 专业图表** - Recharts 数据可视化
7. **✅ 丝滑动画** - Framer Motion 60fps

---

### 📁 项目结构

```
HumanOS/
├── src/
│   ├── components/game/          # 🎮 游戏核心面板
│   │   ├── FocusTreePanel.tsx    # 国策树
│   │   ├── TechTreeView.tsx      # 科技树
│   │   ├── DecreesPanel.tsx      # 总统法令
│   │   ├── InterestGroupsPanel.tsx # 利益集团
│   │   └── CenterViewPanel.tsx   # 11个面板入口
│   ├── data/game/                # 📊 游戏数据
│   │   ├── usa-focus-tree.ts     # 28个国策定义
│   │   ├── usa-tech-tree.ts      # 科技树定义
│   │   ├── usa-interest-groups.ts # 6大派系
│   │   └── usa-random-events.ts  # 随机事件库
│   └── engine/
│       └── MathematicalEconomyEngine.ts # 核心计算引擎
├── package.json
├── vite.config.ts
└── README.md
```

---

### 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

---

### 📄 许可证

CC BY-NC 4.0 - 非商业使用

---

<p align="center">
  <strong>Made with ❤️ by HumanOS Team</strong>
  <br>
  <sub>钢铁雄心级政治经济模拟器 · 浏览器即可游玩</sub>
</p>
