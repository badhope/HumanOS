# 🎨 布局系统快速参考

> **方案一：混合响应式范式** - 已实现完成

---

## 🚀 一句话入门

```tsx
import { PageWrapper, ResponsiveGrid } from '@components/layout'

// 标准页面 - 营销/首页/故事页
<PageWrapper type="standard" background="stars">
  你的内容
</PageWrapper>

// 列表页面 - 测评列表/仪表盘
<PageWrapper type="wide" background="gradient">
  <ResponsiveGrid>
    <Card />
    <Card />
  </ResponsiveGrid>
</PageWrapper>
```

---

## 📦 四级容器系统

| 容器类型 | 断点宽度 | 适用场景 | 页面示例 |
|---------|---------|---------|---------|
| **Narrow** | max-w-md (448px) | 表单、弹窗、答题页 | 测评答题、结果分享 |
| **Standard** | max-w-3xl → **5xl**<br>(大屏自动升级) | 营销、首页、关于、故事 | 首页、模式选择、历史页 |
| **Wide** | max-w-7xl (1280px) | 数据列表、仪表盘、排行榜 | 全部测评、仪表盘、成长分析 |
| **Fluid** | 100% 满屏 | 沉浸式、特殊体验 | 灵魂匹配、主题演示 |

---

## 🔧 核心API

### 1. PageWrapper - 90% 页面只需要这个

```tsx
import { PageWrapper } from '@components/layout'

<PageWrapper
  type="standard"           // narrow | standard | wide | fluid
  background="gradient"      // gradient | stars | meteors | plain
  centered={false}           // 垂直居中
  className=""
>
  所有子内容自动获得响应式容器包裹
</PageWrapper>
```

### 2. ResponsiveGrid - 智能卡片网格

```tsx
import { ResponsiveGrid, CardGrid } from '@components/layout'

<ResponsiveGrid
  type="wide"
  cols={4}          // 最大列数（大屏才会达到）
  gap="lg"          // sm | md | lg | xl
>
  {items.map(item => <Card {...item} />)}
</ResponsiveGrid>

// 快捷方式：测评卡片网格
<CardGrid>
  {assessments.map(a => <AssessmentCard {...a} />)}
</CardGrid>
```

### 3. useResponsive Hook - 细粒度控制

```tsx
import { useResponsive } from '@components/layout'

const {
  isMobile, isTablet, isDesktop,
  isWechatMini,        // 微信小程序环境自动检测
  gridCols,            // 推荐网格列数
  maxWidthClass,       // 计算好的容器类名
} = useResponsive('standard')
```

---

## ✨ 微信小程序自动适配

**开箱即用，零配置：**

```
检测到微信小程序环境 →
   ✓ 所有容器 max-width: 100%
   ✓ 所有网格强制 1列
   ✓ 边距强制 px-4
   ✓ 自动降级动画复杂度
```

---

## 📋 页面迁移清单（按优先级）

### 优先级 1 - 本周完成

| 页面 | 推荐容器类型 | 状态 |
|------|-------------|------|
| Home.tsx | standard | ⬜ 待迁移 |
| AssessmentSelect.tsx | wide | ✅ 已原生宽屏 |
| Assessment.tsx | narrow | ⬜ 待迁移 |
| Results.tsx | standard | ⬜ 待迁移 |
| Dashboard.tsx | wide | ⬜ 待迁移 |
| ModeSelect.tsx | standard | ⬜ 待迁移 - 有旧版实现 |

### 优先级 2 - 下周完成

| 页面 | 推荐容器类型 |
|------|-------------|
| Profile.tsx | standard |
| Leaderboard.tsx | wide |
| SoulMatch.tsx | fluid |

---

## 🔄 迁移示例：Before → After

**迁移前 (硬编码重复代码 25行)：**
```tsx
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 pt-safe pb-safe pl-safe pr-safe">
    <ParticleBackground variant="meteors" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      内容
    </div>
  </div>
)
```

**迁移后 (3行)：**
```tsx
return (
  <PageWrapper type="wide" background="meteors">
    内容
  </PageWrapper>
)
```

---

## 🎯 设计哲学

> **内容决定容器，而不是容器限制内容**

- 不做僵化的"永远窄屏"或"永远宽屏"
- 营销页面需要聚焦感 → Standard
- 数据页面需要信息量 → Wide
- 表单页面需要控制感 → Narrow
- 小程序环境永远 → Fluid

---

## ✅ 验证完成

```
✅ TypeScript: 0 Errors
✅ 全部4个布局组件就绪
✅ 微信小程序自动检测内置
✅ 渐进式迁移支持 - 一页一页来
```
