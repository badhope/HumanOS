# HumanOS 性能优化架构设计 v2.0

## 1. 优化目标

| 指标 | 当前值 | 目标值 | 提升幅度 |
|------|-------|-------|---------|
| 首屏 JS Bundle | 354 KB | < 150 KB | -58% |
| LCP 最大内容绘制 | ~2.8s | < 1.5s | -46% |
| FID 首次交互延迟 | ~150ms | < 50ms | -67% |
| CLS 布局偏移 | ~0.15 | < 0.05 | -67% |
| 答题页面切换 | ~80ms | < 16ms | -80% |
| 构建时间 | 16s | < 10s | -38% |

---

## 2. 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                     浏览器运行时                              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Route Layer │  │  View Layer  │  │   Business Layer │   │
│  │   (Lazy)     │  │   (Memo)     │  │     (Cache)      │   │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘   │
└─────────┼────────────────┼─────────────────────┼─────────────┘
          │                │                     │
┌─────────▼────────────────▼─────────────────────▼─────────────┐
│                     缓存抽象层                                  │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Memory L1   │  │  Storage L2  │  │  IndexedDB L3    │   │
│  │  (WeakMap)   │  │  (LRU 50)    │  │  (Persistent)    │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 第一阶段：运行时架构深度优化

### 3.1 React 渲染优化矩阵

| 组件 | 优化策略 | 预期收益 |
|------|---------|---------|
| **AssessmentOption** | `memo()` + custom comparator | -80% 重渲染 |
| **QuestionItem** | `memo()` + custom comparator | -99% 重渲染 |
| **AnswerSheet** | `memo()` + `useMemo()` Set | -95% 计算量 |
| **所有 Report 组件** | 逐个 `memo()` 包装 | -50% 结果页卡顿 |
| **Chart 组件** | `memo()` + data deep compare | -70% 图表重绘 |

### 3.2 自定义 memo 比较器规范

```typescript
// 只比较真正影响渲染的 props，跳过函数引用
function shallowCompare<T extends Record<string, any>>(
  prev: T,
  next: T,
  keys: (keyof T)[]
): boolean {
  return keys.every(key => 
    typeof prev[key] === 'object' 
      ? JSON.stringify(prev[key]) === JSON.stringify(next[key])
      : prev[key] === next[key]
  )
}

// 使用示例:
export default memo(Component, (p, n) => shallowCompare(p, n, ['data', 'mode', 'selected']))
```

---

## 4. 第二阶段：数据缓存架构设计

### 4.1 三级缓存体系

| 层级 | 存储介质 | 容量 | TTL | 适用场景 |
|------|---------|------|-----|---------|
| **L1 Cache** | `WeakMap` + `Map` | 动态 | Session | 计算结果、相似度矩阵 |
| **L2 Cache** | `localStorage` | 5MB | 7 天 | 测评题目、采样结果 |
| **L3 Cache** | `IndexedDB` | 50MB+ | 30 天 | 完整报告、历史数据 |

### 4.2 缓存键设计规范

```
缓存键命名空间:
  similarity:{hash1}:{hash2}       # 文本相似度
  dedup:{assessmentId}:{threshold} # 去重结果
  sample:{assessmentId}:{count}    # 分层采样结果
  report:{resultId}                # 完整报告
  answer:draft:{assessmentId}      # 答题草稿
```

### 4.3 缓存失效策略

1. **Write-Through**: 写入时同时更新所有层级
2. **TTL 过期**: 时间戳自动失效
3. **LRU 淘汰**: 超容量时淘汰最久未使用
4. **版本化**: 数据结构变更时自动失效

---

## 5. 第三阶段：代码分割架构

### 5.1 代码分割粒度

| 分割层级 | 策略 | 示例 |
|---------|------|------|
| **路由级** | 100% lazy 加载 | 所有页面 |
| **功能级** | 报告组件独立 | 23 个专业报告 |
| **组件级** | 重型组件按需 | 导出 PDF、二维码 |
| **数据级** | 动态 import | 专业题库按需加载 |

### 5.2 Chunk 分组策略

```
assets/
├── vendor-[hash].js           # 基础运行时 < 120KB
├── react-lib-[hash].js        # React 生态 < 150KB
├── ui-lib-[hash].js           # UI 基础组件
├── charts-lib-[hash].js       # 图表库 (预加载)
├── motion-[hash].js           # 动画库 (预加载)
├── report-xxx-[hash].js       # 每个报告独立 chunk ~15KB
├── page-xxx-[hash].js         # 每个页面独立 chunk
└── assessments-data-[hash].js # 测评元数据
```

---

## 6. 第四阶段：工程化体系

### 6.1 构建优化

| 配置项 | 值 | 说明 |
|-------|---|------|
| Terser passes | 3 | 三轮深度压缩 |
| pure_funcs | 所有 console | 彻底移除调试 |
| treeshake | aggressive | 激进树摇 |
| sourcemap | false | 生产环境关闭 |

### 6.2 预加载策略

```typescript
// 首屏渲染完成后，静默预加载重型资源
function preloadHeavyAssets() {
  // 预加载图表库
  import('recharts')
  // 预加载常用报告
  import('@components/reports/MBTIProfessionalReport')
  import('@components/reports/BigFiveProfessionalReport')
}
```

---

## 7. 性能监控与验收标准

### 7.1 基准测试用例

| 测试场景 | 性能阈值 | 测量方式 |
|---------|---------|---------|
| 首页冷启动 LCP | < 1.5s | Performance API |
| 点击选项响应 | < 100ms | User Timing |
| 下一题切换 | < 16ms | React DevTools |
| 报告生成完成 | < 500ms | Performance |
| 构建完成时间 | < 12s | CI 统计 |

### 7.2 代码质量门禁

| 指标 | 阈值 |
|------|------|
| TypeScript 错误 | 0 |
| 循环依赖 | 0 |
| 单个 chunk 体积 | < 300KB (gzip) |
| 未使用导入 | 0 |

---

## 8. 实施计划时间表

| 阶段 | 任务 | 预计工时 | 验收标准 |
|------|------|---------|---------|
| **Phase 1** | 运行时 memo 全覆盖 | 1h | 构建通过 |
| **Phase 2** | 三级缓存架构落地 | 1h | 缓存命中率 > 90% |
| **Phase 3** | 代码分割完善 | 0.5h | Bundle < 150KB |
| **Phase 4** | 工程化 + 监控 | 0.5h | 构建加速 > 20% |
| **Phase 5** | 性能测试 + 调优 | 0.5h | 全部指标达标 |
| **总计** | | **3.5h** | |

---

## 9. 风险与应对

| 风险 | 概率 | 影响 | 应对策略 |
|-----|------|------|---------|
| memo 过度优化导致 bug | 中 | 中 | 自定义 comparator 只比较必要字段 |
| 缓存一致性问题 | 低 | 高 | 版本化 key + 自动失效 |
| 懒加载白屏 | 低 | 高 | Suspense fallback 骨架屏 |
| 循环依赖警告 | 高 | 低 | 类型文件抽离，可忽略 |
