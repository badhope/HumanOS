# 心镜 MindMirror 微信小程序 - 完整设计规范

## 1. 产品概述

### 1.1 定位
心镜 MindMirror 是一款专业、简洁的心理测评小程序，帮助用户了解自己、探索内心、记录成长。

### 1.2 核心价值
- **专业性**：科学的测评工具，准确的结果分析
- **完整性**：从测评到记录到分析的完整闭环
- **隐私性**：本地存储，数据安全
- **成长性**：趋势追踪，见证变化

---

## 2. 功能架构

### 2.1 整体结构

```
微信小程序
├── Tab 1: 首页
│   ├── 欢迎区
│   ├── 今日建议
│   ├── 快捷入口
│   ├── 精选推荐
│   ├── 进度概览
│   └── 最近动态
├── Tab 2: 测评库
│   ├── 顶部搜索
│   ├── 分类导航
│   ├── 测评列表
│   └── 筛选排序
├── Tab 3: 成长档案
│   ├── 概览面板
│   ├── 时间线
│   ├── 趋势分析
│   ├── 多维度对比
│   └── 收藏标签
└── Tab 4: 我的
    ├── 用户信息
    ├── 数据统计
    ├── 提醒设置
    ├── 主题设置
    └── 关于帮助
```

### 2.2 核心流程

```
首页 → 测评库 → 测评详情 → 答题 → 结果 → 保存到档案
                        ↑
                    知识板块
```

---

## 3. 数据模型设计

### 3.1 测评数据 (Assessment)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | ✓ | 唯一标识 |
| name | String | ✓ | 测评名称 |
| description | String | ✓ | 简短描述 |
| fullDesc | String | ✓ | 详细介绍 |
| category | String | ✓ | 分类 |
| tags | String[] | - | 标签 |
| questions | Question[] | ✓ | 题目数组 |
| scoring | ScoringConfig | ✓ | 计分规则 |
| icon | String | - | 图标 |
| color | String | - | 主题色 |
| duration | Number | - | 预计时长(分钟) |

### 3.2 题目 (Question)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | ✓ | 题目ID |
| text | String | ✓ | 题面 |
| type | String | ✓ | single/likert |
| options | Option[] | ✓ | 选项 |
| dimension | String | ✓ | 所属维度 |
| reverse | Boolean | - | 是否反向计分 |

### 3.3 选项 (Option)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| value | Number | ✓ | 选项值 |
| text | String | ✓ | 选项文本 |

### 3.4 计分配置 (ScoringConfig)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dimensions | Dimension[] | ✓ | 维度配置 |
| ranges | ResultRange[] | ✓ | 结果区间 |

### 3.5 维度配置 (Dimension)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| key | String | ✓ | 维度标识 |
| name | String | ✓ | 维度名称 |
| questionIds | String[] | ✓ | 该维度题目ID |

### 3.6 结果区间 (ResultRange)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| min | Number | ✓ | 最小得分 |
| max | Number | ✓ | 最大得分 |
| template | ResultTemplate | ✓ | 结果模板 |

### 3.7 结果模板 (ResultTemplate)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | ✓ | 结果标题 |
| summary | String | ✓ | 摘要 |
| desc | String | ✓ | 详细描述 |

### 3.8 测评记录 (Record)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | ✓ | 记录ID |
| assessmentId | String | ✓ | 测评ID |
| assessmentName | String | ✓ | 测评名称 |
| answers | Answer[] | ✓ | 答案数组 |
| result | AssessmentResult | ✓ | 测评结果 |
| createdAt | Number | ✓ | 创建时间戳 |
| tags | String[] | - | 标签 |

### 3.9 答案 (Answer)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| questionId | String | ✓ | 题目ID |
| value | Number | ✓ | 选项值 |

### 3.10 测评结果 (AssessmentResult)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| overallScore | Number | ✓ | 综合得分 0-100 |
| dimensions | DimensionScore[] | ✓ | 各维度得分 |
| title | String | ✓ | 结果标题 |
| summary | String | ✓ | 结果摘要 |
| desc | String | ✓ | 详细描述 |

### 3.11 维度得分 (DimensionScore)

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| key | String | ✓ | 维度标识 |
| name | String | ✓ | 维度名称 |
| score | Number | ✓ | 得分 0-100 |
| desc | String | - | 该维度描述 |

### 3.12 用户设置 (Settings)

| 字段 | 类型 | 默认 | 说明 |
|------|------|------|------|
| theme | String | 'light' | 主题 |
| vibration | Boolean | true | 震动反馈 |
| autoSave | Boolean | true | 自动保存 |

---

## 4. 页面详细设计

### 4.1 首页 (pages/index/index)

| 模块 | 交互 |
|------|------|
| 欢迎卡片 | 展示昵称、今日问候语 |
| 今日建议 | 点击跳转到推荐测评 |
| 快捷入口 | 点击跳转到对应功能 |
| 精选推荐 | 卡片式，点击进入测评详情 |
| 进度概览 | 展示完成测评数、连续天数等 |
| 最近动态 | 时间线展示最近活动 |

### 4.2 测评库 (pages/library/library)

| 模块 | 交互 |
|------|------|
| 顶部搜索 | 输入关键词，实时过滤列表 |
| 分类导航 | 横向滚动，点击切换分类 |
| 测评列表 | 卡片式，展示图标、名称、描述、题数、时长 |
| 筛选排序 | 下拉菜单，选择排序方式 |

### 4.3 测评详情 (pages/assessment-intro/intro)

| 模块 | 交互 |
|------|------|
| 测评信息 | 图标、名称、简介、题数、时长 |
| 详细介绍 | 可折叠展开 |
| 开始按钮 | 点击进入答题页 |

### 4.4 答题页 (pages/assessment-taking/taking)

| 模块 | 交互 |
|------|------|
| 顶部进度 | 进度条 + 当前/总数 |
| 题目区域 | 题面 + 选项列表 |
| 选项点击 | 选中效果，震动反馈 |
| 上一题 | 点击回到上一题 |
| 下一题 | 点击进入下一题 |
| 完成按钮 | 最后一题显示，点击计算结果 |
| 退出 | 弹窗确认是否保存进度 |

### 4.5 结果页 (pages/assessment-result/result)

| 模块 | 交互 |
|------|------|
| 结果概览 | 综合得分 + 结果标题 + 摘要 |
| 维度分析 | 柱状图展示各维度 |
| 详细描述 | 多段文字解读 |
| 再测一次 | 重新开始 |
| 保存/分享 | 保存到档案、分享 |

### 4.6 成长档案 (pages/archive/archive)

| 模块 | 交互 |
|------|------|
| 概览面板 | 关键指标卡片 |
| 标签栏 | 切换时间线/趋势/对比 |
| 时间线 | 倒序展示测评记录 |
| 趋势分析 | 折线图展示变化 |
| 多维度对比 | 雷达图对比多次结果 |

### 4.7 我的 (pages/profile/profile)

| 模块 | 交互 |
|------|------|
| 用户信息 | 头像、昵称 |
| 数据统计 | 测评次数、完成天数等 |
| 功能列表 | 点击进入各设置页 |

---

## 5. 技术架构

### 5.1 目录结构

```
miniprogram/
├── app.js
├── app.json
├── app.wxss
├── sitemap.json
│
├── pages/
│   ├── index/                  # 首页
│   ├── library/                # 测评库
│   ├── library-search/         # 搜索
│   ├── library-category/       # 分类
│   ├── assessment-intro/       # 测评详情
│   ├── assessment-taking/      # 答题
│   ├── assessment-result/      # 结果
│   ├── archive/                # 档案
│   ├── archive-timeline/       # 时间线
│   ├── archive-trends/         # 趋势
│   ├── archive-compare/        # 对比
│   ├── knowledge/              # 知识
│   ├── knowledge-article/      # 文章
│   ├── profile/                # 我的
│   ├── profile-settings/       # 设置
│   └── profile-about/          # 关于
│
├── data/
│   ├── assessments/            # 测评数据
│   │   ├── index.js
│   │   ├── sample-1.js
│   │   └── sample-2.js
│   ├── categories.js
│   └── knowledge.js
│
├── utils/
│   ├── storage.js              # 存储工具
│   ├── calculator.js           # 计分引擎
│   ├── formatter.js            # 格式化
│   ├── date.js                 # 日期处理
│   └── validator.js            # 验证
│
├── components/
│   ├── assessment-card/
│   ├── progress-bar/
│   ├── result-chart/
│   └── timeline-item/
│
└── images/
    ├── icons/
    └── tabs/
```

### 5.2 核心模块

#### 5.2.1 存储工具 (utils/storage.js)

```javascript
const Storage = {
  // 存储键名
  KEYS: {
    ASSESSMENTS: 'mindmirror_assessments',
    RECORDS: 'mindmirror_records',
    SETTINGS: 'mindmirror_settings',
    CACHE: 'mindmirror_cache'
  },

  // 获取
  get(key) {
    try {
      return wx.getStorageSync(key);
    } catch (e) {
      return null;
    }
  },

  // 保存
  set(key, data) {
    try {
      wx.setStorageSync(key, data);
      return true;
    } catch (e) {
      return false;
    }
  },

  // 删除
  remove(key) {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (e) {
      return false;
    }
  },

  // 清空所有
  clear() {
    try {
      wx.clearStorageSync();
      return true;
    } catch (e) {
      return false;
    }
  }
};

module.exports = Storage;
```

#### 5.2.2 计分引擎 (utils/calculator.js)

```javascript
const Calculator = {
  // 计算测评结果
  calculate(assessment, answers) {
    const { questions, scoring } = assessment;
    const answerMap = this.buildAnswerMap(answers);

    // 计算各维度
    const dimensions = scoring.dimensions.map(dim => {
      const score = this.calcDimensionScore(dim, answerMap, questions);
      return {
        key: dim.key,
        name: dim.name,
        score,
        desc: this.getDimensionDesc(dim.key, score)
      };
    });

    // 计算综合得分
    const overallScore = this.calcOverallScore(dimensions);

    // 匹配结果模板
    const template = this.matchTemplate(scoring.ranges, overallScore);

    return {
      overallScore,
      dimensions,
      title: template.title,
      summary: template.summary,
      desc: template.desc
    };
  },

  // 构建答案Map
  buildAnswerMap(answers) {
    const map = {};
    answers.forEach(a => {
      map[a.questionId] = a.value;
    });
    return map;
  },

  // 计算维度得分
  calcDimensionScore(dimension, answerMap, questions) {
    const { questionIds } = dimension;
    let total = 0;
    let count = 0;

    questionIds.forEach(qid => {
      const question = questions.find(q => q.id === qid);
      if (question && answerMap[qid] !== undefined) {
        let value = answerMap[qid];
        // 反向计分
        if (question.reverse) {
          value = 6 - value; // 假设是1-5
        }
        total += value;
        count++;
      }
    });

    if (count === 0) return 0;
    return Math.round(((total / count - 1) / 4) * 100);
  },

  // 计算综合得分
  calcOverallScore(dimensions) {
    const sum = dimensions.reduce((acc, d) => acc + d.score, 0);
    return Math.round(sum / dimensions.length);
  },

  // 匹配结果模板
  matchTemplate(ranges, score) {
    for (const range of ranges) {
      if (score >= range.min && score <= range.max) {
        return range.template;
      }
    }
    return ranges[0]?.template || { title: '', summary: '', desc: '' };
  },

  // 生成维度描述（可扩展）
  getDimensionDesc(key, score) {
    if (score >= 70) return '较高';
    if (score >= 40) return '中等';
    return '较低';
  }
};

module.exports = Calculator;
```

### 5.3 app.json 配置

```json
{
  "pages": [
    "pages/index/index",
    "pages/library/library",
    "pages/library-search/search",
    "pages/library-category/category",
    "pages/assessment-intro/intro",
    "pages/assessment-taking/taking",
    "pages/assessment-result/result",
    "pages/archive/archive",
    "pages/archive-timeline/timeline",
    "pages/archive-trends/trends",
    "pages/archive-compare/compare",
    "pages/knowledge/knowledge",
    "pages/knowledge-article/article",
    "pages/profile/profile",
    "pages/profile-settings/settings",
    "pages/profile-about/about"
  ],
  "window": {
    "backgroundTextStyle": "dark",
    "navigationBarBackgroundColor": "#2E7CF5",
    "navigationBarTitleText": "心镜",
    "navigationBarTextStyle": "white",
    "backgroundColor": "#F8FAFC"
  },
  "tabBar": {
    "color": "#94A3B8",
    "selectedColor": "#2E7CF5",
    "backgroundColor": "#FFFFFF",
    "borderStyle": "white",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/tabs/home.png",
        "selectedIconPath": "images/tabs/home-active.png"
      },
      {
        "pagePath": "pages/library/library",
        "text": "测评库",
        "iconPath": "images/tabs/library.png",
        "selectedIconPath": "images/tabs/library-active.png"
      },
      {
        "pagePath": "pages/archive/archive",
        "text": "档案",
        "iconPath": "images/tabs/archive.png",
        "selectedIconPath": "images/tabs/archive-active.png"
      },
      {
        "pagePath": "pages/profile/profile",
        "text": "我的",
        "iconPath": "images/tabs/profile.png",
        "selectedIconPath": "images/tabs/profile-active.png"
      }
    ]
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json",
  "lazyCodeLoading": "requiredComponents"
}
```

---

## 6. 设计系统

### 6.1 色彩体系

| 用途 | 颜色值 |
|------|--------|
| 主色 | #2E7CF5 |
| 主色(浅) | #5A9CF7 |
| 主色(深) | #1A5CC4 |
| 辅助绿 | #16B39A |
| 辅助橙 | #F59E0B |
| 危险红 | #EF4444 |
| 背景 | #F8FAFC |
| 卡片 | #FFFFFF |
| 分割线 | #E2E8F0 |
| 正文 | #1E293B |
| 辅助文字 | #64748B |
| 占位文字 | #94A3B8 |

### 6.2 间距与圆角

| 类型 | 值(rpx) |
|------|---------|
| 超小间距 | 12 |
| 小间距 | 24 |
| 中间距 | 36 |
| 大间距 | 48 |
| 小圆角 | 8 |
| 中圆角 | 16 |
| 大圆角 | 24 |

### 6.3 字号

| 类型 | 值(rpx) | 用途 |
|------|---------|------|
| 最小 | 22 | 辅助标签 |
| 小 | 24 | 辅助文字 |
| 正文 | 28 | 正文内容 |
| 小标题 | 32 | 卡片标题 |
| 标题 | 36 | 页面标题 |
| 大标题 | 48 | 重要信息 |

---

## 7. 示例数据结构

### 7.1 示例测评

```javascript
// data/assessments/sample-personality.js
module.exports = {
  id: 'sample-personality',
  name: 'SBTI 人格测试',
  description: '探索你的人格类型',
  fullDesc: '这是一个示例测评...',
  category: '人格',
  tags: ['人格', '自我探索'],
  duration: 5,
  icon: '🧠',
  color: '#2E7CF5',

  questions: [
    {
      id: 'q1',
      text: '在社交场合中，你更倾向于：',
      type: 'single',
      dimension: 'extraversion',
      reverse: false,
      options: [
        { value: 1, text: '主动与人交谈' },
        { value: 5, text: '等待别人来找我' }
      ]
    },
    // ... 更多题目
  ],

  scoring: {
    dimensions: [
      { key: 'extraversion', name: '外向性', questionIds: ['q1', 'q3', 'q5'] },
      { key: 'neuroticism', name: '神经质', questionIds: ['q2', 'q4', 'q6'] }
    ],
    ranges: [
      {
        min: 0, max: 40,
        template: { title: '内倾型', summary: '你更关注内心世界', desc: '...' }
      },
      {
        min: 41, max: 70,
        template: { title: '平衡型', summary: '内外向较为平衡', desc: '...' }
      },
      {
        min: 71, max: 100,
        template: { title: '外倾型', summary: '你更关注外部世界', desc: '...' }
      }
    ]
  }
};
```

---

## 8. 开发优先级

### Phase 1: 核心流程
1. 项目脚手架、基础配置
2. 首页、测评库、测评详情
3. 答题页、结果页
4. 计分引擎
5. 基础存储

### Phase 2: 成长档案
1. 历史记录、时间线
2. 结果展示、趋势图表
3. 标签、收藏功能

### Phase 3: 完善功能
1. 知识板块
2. 提醒功能
3. 主题设置
4. 数据统计

### Phase 4: 优化体验
1. 动画、交互优化
2. 性能优化
3. 细节打磨

---

**设计文档完成，请审核！**
