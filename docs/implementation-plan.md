# 心镜 MindMirror 微信小程序 - 详细开发实施计划

## 一、准备阶段

### 1.1 项目结构创建
- 创建 `/miniprogram/` 目录
- 创建标准微信小程序结构
- 创建 app.js、app.json、app.wxss
- 创建 sitemap.json

### 1.2 全局样式系统
- 定义色彩变量
- 定义间距、圆角、字号
- 定义基础组件样式（按钮、卡片等）
- 定义通用工具类（margin、padding 等）

```css
/* app.wxss */
page {
  background-color: #F8FAFC;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #1E293B;
  line-height: 1.6;
}

.container {
  padding: 0 24rpx;
  min-height: 100vh;
}

/* 卡片 */
.card {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 36rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.04);
}

/* 按钮 */
.btn-primary {
  background: linear-gradient(135deg, #2E7CF5 0%, #5A9CF7 100%);
  color: white;
  height: 96rpx;
  line-height: 96rpx;
  border-radius: 48rpx;
  text-align: center;
  font-size: 32rpx;
  font-weight: 600;
}

.btn-secondary {
  background: #FFFFFF;
  color: #2E7CF5;
  border: 2rpx solid #2E7CF5;
  height: 96rpx;
  line-height: 92rpx;
  border-radius: 48rpx;
  text-align: center;
  font-size: 32rpx;
  font-weight: 600;
}
```

### 1.3 工具库开发

#### 1.3.1 日期处理 (utils/date.js)
```javascript
const DateUtil = {
  // 格式化时间戳
  format(timestamp, fmt = 'YYYY-MM-DD HH:mm') {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return fmt
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hour)
      .replace('mm', minute);
  },

  // 人性化显示
  relative(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) return '刚刚';
    if (diff < hour) return Math.floor(diff / minute) + '分钟前';
    if (diff < day) return Math.floor(diff / hour) + '小时前';
    if (diff < 7 * day) return Math.floor(diff / day) + '天前';
    return this.format(timestamp, 'MM-DD');
  },

  // 获取今日问候语
  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 6) return '夜深了，注意休息';
    if (hour < 9) return '早上好，新的一天';
    if (hour < 12) return '上午好';
    if (hour < 14) return '中午好';
    if (hour < 18) return '下午好';
    if (hour < 22) return '晚上好';
    return '夜深了';
  }
};

module.exports = DateUtil;
```

#### 1.3.2 格式化工具 (utils/formatter.js)
```javascript
const Formatter = {
  // 数字格式化
  number(num) {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return String(num);
  },

  // 截断文本
  truncate(text, max = 30) {
    if (!text) return '';
    if (text.length <= max) return text;
    return text.slice(0, max) + '...';
  }
};

module.exports = Formatter;
```

#### 1.3.3 验证工具 (utils/validator.js)
```javascript
const Validator = {
  // 检查测评数据完整性
  checkAssessment(assessment) {
    if (!assessment) return { valid: false, error: '数据为空' };
    if (!assessment.id) return { valid: false, error: '缺少id' };
    if (!assessment.name) return { valid: false, error: '缺少名称' };
    if (!Array.isArray(assessment.questions) || assessment.questions.length === 0) {
      return { valid: false, error: '缺少题目' };
    }
    return { valid: true };
  },

  // 检查答案完整性
  checkAnswers(answers, total) {
    if (!Array.isArray(answers)) return { valid: false, error: '答案格式错误' };
    if (answers.length < total) return { valid: false, error: '还有题目未完成' };
    return { valid: true };
  }
};

module.exports = Validator;
```

---

## 二、Phase 1: 核心流程开发

### 2.1 数据层开发

#### 2.1.1 测评数据
创建两个示例测评，分别覆盖不同题型：

```javascript
// data/assessments/sample-1.js - 简单人格测试
module.exports = {
  id: 'sample-1',
  name: '简易人格测试',
  description: '快速了解你的性格倾向',
  fullDesc: '这是一个简单的人格测试...',
  category: '人格',
  tags: ['人格', '自我探索'],
  duration: 3,
  icon: '🧠',
  color: '#2E7CF5',

  questions: [
    {
      id: 'q1',
      text: '在社交聚会中，你通常：',
      type: 'single',
      dimension: 'extraversion',
      reverse: false,
      options: [
        { value: 5, text: '主动和很多人交谈' },
        { value: 4, text: '和几个朋友交谈' },
        { value: 3, text: '看情况' },
        { value: 2, text: '大多时候在听' },
        { value: 1, text: '喜欢一个人待着' }
      ]
    },
    {
      id: 'q2',
      text: '做决定时，你更依赖：',
      type: 'single',
      dimension: 'thinking',
      reverse: false,
      options: [
        { value: 1, text: '逻辑分析' },
        { value: 2, text: '比较客观' },
        { value: 3, text: '兼顾两者' },
        { value: 4, text: '比较感性' },
        { value: 5, text: '个人感受' }
      ]
    },
    {
      id: 'q3',
      text: '面对突发事件，你更倾向于：',
      type: 'single',
      dimension: 'stability',
      reverse: true,
      options: [
        { value: 1, text: '冷静处理' },
        { value: 2, text: '比较稳定' },
        { value: 3, text: '看情况' },
        { value: 4, text: '有点紧张' },
        { value: 5, text: '容易焦虑' }
      ]
    }
  ],

  scoring: {
    dimensions: [
      { key: 'extraversion', name: '外向性', questionIds: ['q1'] },
      { key: 'thinking', name: '思考方式', questionIds: ['q2'] },
      { key: 'stability', name: '情绪稳定性', questionIds: ['q3'] }
    ],
    ranges: [
      {
        min: 0, max: 35,
        template: {
          title: '内倾稳健型',
          summary: '你更关注内心世界，做事比较稳重',
          desc: '你是一个内敛且稳定的人...'
        }
      },
      {
        min: 36, max: 70,
        template: {
          title: '平衡型',
          summary: '你在各方面都比较均衡',
          desc: '你是一个适应性强的人...'
        }
      },
      {
        min: 71, max: 100,
        template: {
          title: '外倾灵活型',
          summary: '你善于社交，思维灵活',
          desc: '你是一个外向且开放的人...'
        }
      }
    ]
  }
};
```

```javascript
// data/assessments/sample-2.js - 压力测试
module.exports = {
  id: 'sample-2',
  name: '压力水平测试',
  description: '评估你当前的压力状况',
  fullDesc: '这个测试帮助你了解压力状况...',
  category: '情绪',
  tags: ['压力', '心理健康'],
  duration: 3,
  icon: '💆',
  color: '#16B39A',

  questions: [
    {
      id: 'q1',
      text: '最近一周，你感到紧张的频率是？',
      type: 'single',
      dimension: 'tension',
      reverse: false,
      options: [
        { value: 1, text: '几乎没有' },
        { value: 2, text: '偶尔' },
        { value: 3, text: '有时' },
        { value: 4, text: '经常' },
        { value: 5, text: '总是' }
      ]
    },
    {
      id: 'q2',
      text: '你是否因为压力而影响睡眠？',
      type: 'single',
      dimension: 'sleep',
      reverse: false,
      options: [
        { value: 1, text: '完全没有' },
        { value: 2, text: '很少' },
        { value: 3, text: '有时' },
        { value: 4, text: '经常' },
        { value: 5, text: '总是' }
      ]
    }
  ],

  scoring: {
    dimensions: [
      { key: 'tension', name: '紧张感', questionIds: ['q1'] },
      { key: 'sleep', name: '睡眠影响', questionIds: ['q2'] }
    ],
    ranges: [
      {
        min: 0, max: 30,
        template: {
          title: '压力较低',
          summary: '你目前状态比较放松',
          desc: '恭喜，你的压力控制得不错...'
        }
      },
      {
        min: 31, max: 60,
        template: {
          title: '压力适中',
          summary: '有一定压力但在可控范围',
          desc: '你的压力处于中等水平...'
        }
      },
      {
        min: 61, max: 100,
        template: {
          title: '压力较高',
          summary: '建议适当调整，注意休息',
          desc: '你目前的压力较大...'
        }
      }
    ]
  }
};
```

```javascript
// data/assessments/index.js
const Sample1 = require('./sample-1');
const Sample2 = require('./sample-2');

const Assessments = {
  list: [Sample1, Sample2],

  getAll() {
    return this.list;
  },

  getById(id) {
    return this.list.find(a => a.id === id) || null;
  },

  getByCategory(category) {
    return this.list.filter(a => a.category === category);
  },

  search(keyword) {
    const kw = keyword.toLowerCase();
    return this.list.filter(a =>
      a.name.toLowerCase().includes(kw) ||
      a.description.toLowerCase().includes(kw) ||
      a.tags.some(t => t.toLowerCase().includes(kw))
    );
  },

  getCategories() {
    const cats = new Set();
    this.list.forEach(a => cats.add(a.category));
    return Array.from(cats);
  }
};

module.exports = Assessments;
```

#### 2.1.2 分类数据
```javascript
// data/categories.js
module.exports = [
  { key: 'all', name: '全部' },
  { key: '人格', name: '人格' },
  { key: '情绪', name: '情绪' },
  { key: '职业', name: '职业' },
  { key: '关系', name: '关系' }
];
```

#### 2.1.3 知识数据
```javascript
// data/knowledge.js
module.exports = [
  {
    id: 'k1',
    title: '什么是心理测评',
    summary: '了解心理测评的基本概念',
    content: '心理测评是一种科学的评估方法...',
    cover: '',
    createdAt: Date.now()
  }
];
```

### 2.2 页面开发

#### 2.2.1 首页 (pages/index)

**考虑的边界情况：**
- 存储为空时的初始化
- 没有测评记录时的空状态
- 昵称为空时的默认值

```javascript
// pages/index/index.js
const DateUtil = require('../../utils/date');
const Assessments = require('../../data/assessments');
const Storage = require('../../utils/storage');

Page({
  data: {
    greeting: '',
    nickname: '用户',
    stats: {
      total: 0,
      streak: 0,
      lastWeek: 0
    },
    recentRecords: [],
    featuredAssessments: []
  },

  onLoad() {
    this.initPage();
  },

  onShow() {
    this.refreshStats();
  },

  // 初始化
  initPage() {
    this.setData({ greeting: DateUtil.getGreeting() });
    this.loadNickname();
    this.loadFeatured();
    this.refreshStats();
  },

  // 加载昵称
  loadNickname() {
    const settings = Storage.get(Storage.KEYS.SETTINGS) || {};
    this.setData({ nickname: settings.nickname || '用户' });
  },

  // 加载推荐测评
  loadFeatured() {
    const all = Assessments.getAll();
    const featured = all.slice(0, 3);
    this.setData({ featuredAssessments: featured });
  },

  // 刷新统计
  refreshStats() {
    const records = Storage.get(Storage.KEYS.RECORDS) || [];
    const stats = this.calcStats(records);
    this.setData({
      stats,
      recentRecords: records.slice(0, 3)
    });
  },

  // 计算统计数据
  calcStats(records) {
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    let streak = 0;
    let lastWeek = 0;
    const dates = new Set();

    records.forEach(r => {
      if (now - r.createdAt < oneWeek) lastWeek++;
      const d = new Date(r.createdAt).toDateString();
      dates.add(d);
    });

    // 计算连续天数（简化版）
    const sortedDates = Array.from(dates).sort().reverse();
    for (let i = 0; i < sortedDates.length; i++) {
      const expected = new Date();
      expected.setDate(expected.getDate() - i);
      if (sortedDates[i] === expected.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    return {
      total: records.length,
      streak,
      lastWeek
    };
  },

  // 跳转到测评详情
  goToAssessment(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/assessment-intro/intro?id=${id}`
    });
  },

  // 跳转到测评库
  goToLibrary() {
    wx.switchTab({
      url: '/pages/library/library'
    });
  },

  // 跳转到档案
  goToArchive() {
    wx.switchTab({
      url: '/pages/archive/archive'
    });
  }
});
```

```html
<!-- pages/index/index.wxml -->
<view class="container">
  <!-- 欢迎卡片 -->
  <view class="welcome-card">
    <view class="greeting">{{greeting}}</view>
    <view class="nickname">{{nickname}}</view>
    <view class="subtext">来探索你的内心世界吧</view>
  </view>

  <!-- 快捷入口 -->
  <view class="quick-actions">
    <view class="action-item" bindtap="goToLibrary">
      <view class="action-icon">📋</view>
      <view class="action-text">测评库</view>
    </view>
    <view class="action-item" bindtap="goToArchive">
      <view class="action-icon">📊</view>
      <view class="action-text">我的档案</view>
    </view>
    <view class="action-item" bindtap="goToArchive">
      <view class="action-icon">📚</view>
      <view class="action-text">知识</view>
    </view>
  </view>

  <!-- 统计卡片 -->
  <view class="section">
    <view class="section-header">
      <view class="section-title">数据概览</view>
    </view>
    <view class="stats-grid">
      <view class="stat-item">
        <view class="stat-value">{{stats.total}}</view>
        <view class="stat-label">完成测评</view>
      </view>
      <view class="stat-item">
        <view class="stat-value">{{stats.streak}}</view>
        <view class="stat-label">连续天数</view>
      </view>
      <view class="stat-item">
        <view class="stat-value">{{stats.lastWeek}}</view>
        <view class="stat-label">近7天</view>
      </view>
    </view>
  </view>

  <!-- 推荐测评 -->
  <view class="section" wx:if="{{featuredAssessments.length > 0}}">
    <view class="section-header">
      <view class="section-title">推荐测评</view>
      <view class="section-more" bindtap="goToLibrary">查看全部</view>
    </view>
    <view class="assessment-list">
      <view
        class="assessment-card"
        wx:for="{{featuredAssessments}}"
        wx:key="id"
        data-id="{{item.id}}"
        bindtap="goToAssessment"
      >
        <view class="assessment-icon" style="background: {{item.color}}15;">
          {{item.icon}}
        </view>
        <view class="assessment-info">
          <view class="assessment-name">{{item.name}}</view>
          <view class="assessment-desc">{{item.description}}</view>
          <view class="assessment-meta">
            <text>{{item.questions.length}}题</text>
            <text>·</text>
            <text>{{item.duration}}分钟</text>
          </view>
        </view>
      </view>
    </view>
  </view>

  <!-- 空状态 -->
  <view class="empty-state" wx:if="{{stats.total === 0 && featuredAssessments.length === 0}}">
    <view class="empty-icon">🌱</view>
    <view class="empty-text">开始探索自己吧</view>
    <view class="empty-hint">点击下方按钮，开始第一个测评</view>
    <view class="btn-primary empty-btn" bindtap="goToLibrary">去测评库</view>
  </view>
</view>
```

```css
/* pages/index/index.wxss */
.welcome-card {
  padding: 48rpx 24rpx;
  background: linear-gradient(135deg, #2E7CF5 0%, #5A9CF7 100%);
  color: white;
  border-radius: 0 0 48rpx 48rpx;
  margin: 0 -24rpx;
}

.greeting {
  font-size: 28rpx;
  opacity: 0.9;
}

.nickname {
  font-size: 48rpx;
  font-weight: 700;
  margin-top: 12rpx;
}

.subtext {
  font-size: 24rpx;
  opacity: 0.8;
  margin-top: 8rpx;
}

.quick-actions {
  display: flex;
  gap: 24rpx;
  padding: 36rpx 0;
}

.action-item {
  flex: 1;
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 36rpx 0;
  text-align: center;
}

.action-icon {
  font-size: 48rpx;
  margin-bottom: 12rpx;
}

.action-text {
  font-size: 28rpx;
  color: #1E293B;
}

.section {
  margin-bottom: 48rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: 600;
}

.section-more {
  font-size: 24rpx;
  color: #64748B;
}

.stats-grid {
  display: flex;
  gap: 24rpx;
}

.stat-item {
  flex: 1;
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 36rpx 0;
  text-align: center;
}

.stat-value {
  font-size: 48rpx;
  font-weight: 700;
  color: #2E7CF5;
}

.stat-label {
  font-size: 24rpx;
  color: #64748B;
  margin-top: 8rpx;
}

.assessment-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.assessment-card {
  display: flex;
  gap: 24rpx;
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 36rpx;
}

.assessment-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  flex-shrink: 0;
}

.assessment-info {
  flex: 1;
}

.assessment-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #1E293B;
}

.assessment-desc {
  font-size: 24rpx;
  color: #64748B;
  margin-top: 8rpx;
}

.assessment-meta {
  font-size: 22rpx;
  color: #94A3B8;
  margin-top: 12rpx;
}

.empty-state {
  text-align: center;
  padding: 96rpx 0;
}

.empty-icon {
  font-size: 96rpx;
  margin-bottom: 24rpx;
}

.empty-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #1E293B;
}

.empty-hint {
  font-size: 24rpx;
  color: #64748B;
  margin-top: 12rpx;
}

.empty-btn {
  margin-top: 48rpx;
}
```

#### 2.2.2 测评库 (pages/library)

**考虑的边界情况：**
- 搜索无结果
- 分类切换
- 页面加载时的初始状态

```javascript
// pages/library/library.js
const Assessments = require('../../data/assessments');
const Categories = require('../../data/categories');

Page({
  data: {
    categories: [],
    activeCategory: 'all',
    assessments: [],
    keyword: ''
  },

  onLoad() {
    this.initPage();
  },

  initPage() {
    this.setData({
      categories: Categories,
      assessments: Assessments.getAll()
    });
  },

  // 切换分类
  switchCategory(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ activeCategory: key });
    this.filterAssessments();
  },

  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value;
    this.setData({ keyword });
    this.filterAssessments();
  },

  // 过滤测评
  filterAssessments() {
    let list = Assessments.getAll();
    const { keyword, activeCategory } = this.data;

    if (activeCategory !== 'all') {
      list = Assessments.getByCategory(activeCategory);
    }

    if (keyword.trim()) {
      list = Assessments.search(keyword.trim());
    }

    this.setData({ assessments: list });
  },

  // 跳转到详情
  goToAssessment(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/assessment-intro/intro?id=${id}`
    });
  }
});
```

```html
<!-- pages/library/library.wxml -->
<view class="container">
  <!-- 搜索栏 -->
  <view class="search-bar">
    <input
      class="search-input"
      placeholder="搜索测评..."
      value="{{keyword}}"
      bindinput="onSearchInput"
    />
  </view>

  <!-- 分类导航 -->
  <scroll-view
    class="category-nav"
    scroll-x
    show-scrollbar="{{false}}"
  >
    <view class="category-list">
      <view
        class="category-item {{activeCategory === item.key ? 'active' : ''}}"
        wx:for="{{categories}}"
        wx:key="key"
        data-key="{{item.key}}"
        bindtap="switchCategory"
      >
        {{item.name}}
      </view>
    </view>
  </scroll-view>

  <!-- 测评列表 -->
  <view class="assessment-list" wx:if="{{assessments.length > 0}}">
    <view
      class="assessment-card"
      wx:for="{{assessments}}"
      wx:key="id"
      data-id="{{item.id}}"
      bindtap="goToAssessment"
    >
      <view class="assessment-icon" style="background: {{item.color}}15;">
        {{item.icon}}
      </view>
      <view class="assessment-info">
        <view class="assessment-name">{{item.name}}</view>
        <view class="assessment-desc">{{item.description}}</view>
        <view class="assessment-tags">
          <view class="tag" wx:for="{{item.tags}}" wx:key="*this">{{item}}</view>
        </view>
        <view class="assessment-meta">
          <text>{{item.questions.length}}题</text>
          <text>·</text>
          <text>{{item.duration}}分钟</text>
        </view>
      </view>
    </view>
  </view>

  <!-- 空状态 -->
  <view class="empty-state" wx:if="{{assessments.length === 0}}">
    <view class="empty-icon">🔍</view>
    <view class="empty-text">暂无相关测评</view>
    <view class="empty-hint">试试其他关键词吧</view>
  </view>
</view>
```

```css
/* pages/library/library.wxss */
.search-bar {
  margin-bottom: 36rpx;
}

.search-input {
  background: #FFFFFF;
  height: 88rpx;
  border-radius: 44rpx;
  padding: 0 36rpx;
  font-size: 28rpx;
}

.category-nav {
  margin-bottom: 36rpx;
}

.category-list {
  display: flex;
  gap: 24rpx;
  padding-right: 24rpx;
}

.category-item {
  padding: 16rpx 32rpx;
  background: #FFFFFF;
  border-radius: 48rpx;
  font-size: 28rpx;
  color: #64748B;
  white-space: nowrap;
}

.category-item.active {
  background: #2E7CF5;
  color: white;
}

.assessment-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.assessment-card {
  display: flex;
  gap: 24rpx;
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 36rpx;
}

.assessment-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  flex-shrink: 0;
}

.assessment-info {
  flex: 1;
}

.assessment-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #1E293B;
}

.assessment-desc {
  font-size: 24rpx;
  color: #64748B;
  margin-top: 8rpx;
}

.assessment-tags {
  display: flex;
  gap: 12rpx;
  margin-top: 12rpx;
  flex-wrap: wrap;
}

.tag {
  background: #F8FAFC;
  color: #64748B;
  font-size: 20rpx;
  padding: 6rpx 16rpx;
  border-radius: 12rpx;
}

.assessment-meta {
  font-size: 22rpx;
  color: #94A3B8;
  margin-top: 12rpx;
}

.empty-state {
  text-align: center;
  padding: 120rpx 0;
}

.empty-icon {
  font-size: 96rpx;
  margin-bottom: 24rpx;
}

.empty-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #1E293B;
}

.empty-hint {
  font-size: 24rpx;
  color: #64748B;
  margin-top: 12rpx;
}
```

#### 2.2.3 测评详情 (pages/assessment-intro)

**考虑的边界情况：**
- id 参数缺失
- 找不到对应的测评
- 从缓存恢复答题进度

```javascript
// pages/assessment-intro/intro.js
const Assessments = require('../../data/assessments');
const Validator = require('../../utils/validator');

Page({
  data: {
    assessment: null,
    loading: true,
    expanded: false
  },

  onLoad(options) {
    const { id } = options;
    if (!id) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.loadAssessment(id);
  },

  // 加载测评
  loadAssessment(id) {
    const assessment = Assessments.getById(id);
    if (!assessment) {
      wx.showToast({ title: '测评不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    const check = Validator.checkAssessment(assessment);
    if (!check.valid) {
      wx.showToast({ title: check.error, icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    wx.setNavigationBarTitle({ title: assessment.name });
    this.setData({ assessment, loading: false });
  },

  // 展开/收起详情
  toggleExpand() {
    this.setData({ expanded: !this.data.expanded });
  },

  // 开始测评
  startAssessment() {
    const { assessment } = this.data;
    wx.navigateTo({
      url: `/pages/assessment-taking/taking?id=${assessment.id}`
    });
  }
});
```

```html
<!-- pages/assessment-intro/intro.wxml -->
<view class="container" wx:if="{{!loading}}">
  <view class="intro-header">
    <view class="intro-icon" style="background: {{assessment.color}}15;">
      {{assessment.icon}}
    </view>
    <view class="intro-title">{{assessment.name}}</view>
    <view class="intro-desc">{{assessment.description}}</view>
    <view class="intro-meta">
      <text>{{assessment.questions.length}}题</text>
      <text>·</text>
      <text>约{{assessment.duration}}分钟</text>
    </view>
  </view>

  <view class="section">
    <view class="section-title">测评介绍</view>
    <view class="intro-content {{expanded ? 'expanded' : ''}}">
      {{assessment.fullDesc}}
    </view>
    <view class="toggle-btn" bindtap="toggleExpand">
      {{expanded ? '收起' : '展开'}}
    </view>
  </view>

  <view class="section">
    <view class="section-title">准备事项</view>
    <view class="tips">
      <view class="tip-item">
        <view class="tip-icon">💡</view>
        <view class="tip-text">请选择一个安静的环境</view>
      </view>
      <view class="tip-item">
        <view class="tip-icon">⏱️</view>
        <view class="tip-text">预留充足的时间</view>
      </view>
      <view class="tip-item">
        <view class="tip-icon">✓</view>
        <view class="tip-text">按照第一直觉回答</view>
      </view>
    </view>
  </view>

  <view class="footer">
    <view class="btn-primary" bindtap="startAssessment">开始测评</view>
  </view>
</view>
```

```css
/* pages/assessment-intro/intro.wxss */
.intro-header {
  text-align: center;
  padding: 48rpx 0;
}

.intro-icon {
  width: 160rpx;
  height: 160rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80rpx;
  margin: 0 auto;
}

.intro-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #1E293B;
  margin-top: 24rpx;
}

.intro-desc {
  font-size: 28rpx;
  color: #64748B;
  margin-top: 12rpx;
}

.intro-meta {
  font-size: 24rpx;
  color: #94A3B8;
  margin-top: 24rpx;
}

.section {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 36rpx;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 24rpx;
}

.intro-content {
  font-size: 28rpx;
  color: #64748B;
  line-height: 1.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.intro-content.expanded {
  display: block;
}

.toggle-btn {
  font-size: 24rpx;
  color: #2E7CF5;
  text-align: center;
  margin-top: 24rpx;
}

.tips {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.tip-item {
  display: flex;
  gap: 16rpx;
  align-items: flex-start;
}

.tip-icon {
  font-size: 32rpx;
}

.tip-text {
  font-size: 28rpx;
  color: #64748B;
}

.footer {
  padding: 24rpx 0 48rpx;
}
```

#### 2.2.4 答题页 (pages/assessment-taking)

**关键边界情况与异常处理：**
- 题目加载失败
- 上一题/下一题的边界（第一题不能上一题，最后一题显示完成）
- 未选择答案时点击下一题
- 退出时是否保存进度
- 震动反馈设置
- 页面卸载时清理临时数据

```javascript
// pages/assessment-taking/taking.js
const Assessments = require('../../data/assessments');
const Calculator = require('../../utils/calculator');
const Storage = require('../../utils/storage');
const Validator = require('../../utils/validator');

Page({
  data: {
    assessment: null,
    currentIndex: 0,
    answers: [],
    selectedValue: null,
    loading: true,
    showExitConfirm: false
  },

  onLoad(options) {
    const { id } = options;
    if (!id) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.loadAssessment(id);
  },

  onUnload() {
    // 页面卸载时清理临时缓存（可选）
  },

  // 加载测评
  loadAssessment(id) {
    const assessment = Assessments.getById(id);
    if (!assessment) {
      wx.showToast({ title: '测评不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    const check = Validator.checkAssessment(assessment);
    if (!check.valid) {
      wx.showToast({ title: check.error, icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    wx.setNavigationBarTitle({ title: assessment.name });
    this.setData({
      assessment,
      loading: false,
      answers: []
    });
    this.restoreAnswer();
  },

  // 恢复当前题已选答案
  restoreAnswer() {
    const { currentIndex, answers, assessment } = this.data;
    const question = assessment.questions[currentIndex];
    const saved = answers.find(a => a.questionId === question.id);
    this.setData({ selectedValue: saved ? saved.value : null });
  },

  // 选择答案
  selectOption(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ selectedValue: value });

    // 震动反馈
    const settings = Storage.get(Storage.KEYS.SETTINGS) || {};
    if (settings.vibration !== false) {
      wx.vibrateShort({ type: 'light' });
    }
  },

  // 确认答案并进入下一题
  confirmAnswer() {
    const { selectedValue, currentIndex, assessment, answers } = this.data;

    if (!selectedValue) {
      wx.showToast({ title: '请选择一个答案', icon: 'none' });
      return;
    }

    // 保存答案
    const question = assessment.questions[currentIndex];
    const newAnswers = answers.filter(a => a.questionId !== question.id);
    newAnswers.push({ questionId: question.id, value: selectedValue });

    // 是否是最后一题
    if (currentIndex >= assessment.questions.length - 1) {
      this.setData({ answers: newAnswers });
      this.finishAssessment();
    } else {
      this.setData({
        answers: newAnswers,
        currentIndex: currentIndex + 1,
        selectedValue: null
      });
      this.restoreAnswer();
    }
  },

  // 上一题
  goPrev() {
    const { currentIndex } = this.data;
    if (currentIndex <= 0) return;

    this.setData({
      currentIndex: currentIndex - 1,
      selectedValue: null
    });
    this.restoreAnswer();
  },

  // 完成测评
  finishAssessment() {
    const { assessment, answers } = this.data;

    // 再次验证完整性
    const check = Validator.checkAnswers(answers, assessment.questions.length);
    if (!check.valid) {
      wx.showToast({ title: check.error, icon: 'none' });
      return;
    }

    // 计算结果
    try {
      const result = Calculator.calculate(assessment, answers);

      // 保存记录
      const records = Storage.get(Storage.KEYS.RECORDS) || [];
      const newRecord = {
        id: 'record_' + Date.now(),
        assessmentId: assessment.id,
        assessmentName: assessment.name,
        assessmentIcon: assessment.icon,
        assessmentColor: assessment.color,
        answers,
        result,
        createdAt: Date.now(),
        tags: []
      };
      records.unshift(newRecord);
      Storage.set(Storage.KEYS.RECORDS, records);

      // 跳转到结果页
      wx.redirectTo({
        url: `/pages/assessment-result/result?recordId=${newRecord.id}`
      });
    } catch (e) {
      console.error('计算结果失败', e);
      wx.showToast({ title: '计算结果时出错', icon: 'none' });
    }
  },

  // 退出确认
  showExitDialog() {
    this.setData({ showExitConfirm: true });
  },

  hideExitDialog() {
    this.setData({ showExitConfirm: false });
  },

  confirmExit() {
    wx.navigateBack();
  }
});
```

```html
<!-- pages/assessment-taking/taking.wxml -->
<view class="container" wx:if="{{!loading && assessment}}">
  <!-- 进度条 -->
  <view class="progress-header">
    <view class="progress-bar">
      <view
        class="progress-fill"
        style="width: {{((currentIndex + (selectedValue ? 1 : 0)) / assessment.questions.length) * 100}}%"
      ></view>
    </view>
    <view class="progress-text">{{currentIndex + 1}} / {{assessment.questions.length}}</view>
  </view>

  <!-- 题目 -->
  <view class="question-area">
    <view class="question-text">{{assessment.questions[currentIndex].text}}</view>

    <!-- 选项 -->
    <view class="options">
      <view
        class="option {{selectedValue === item.value ? 'selected' : ''}}"
        wx:for="{{assessment.questions[currentIndex].options}}"
        wx:key="value"
        data-value="{{item.value}}"
        bindtap="selectOption"
      >
        <view class="option-circle"></view>
        <view class="option-text">{{item.text}}</view>
      </view>
    </view>
  </view>

  <!-- 底部操作 -->
  <view class="footer">
    <view
      class="btn-secondary prev-btn {{currentIndex === 0 ? 'disabled' : ''}}"
      bindtap="goPrev"
      wx:if="{{currentIndex > 0}}"
    >
      上一题
    </view>
    <view
      class="btn-primary next-btn"
      bindtap="confirmAnswer"
    >
      {{currentIndex === assessment.questions.length - 1 ? '完成' : '下一题'}}
    </view>
  </view>
</view>

<!-- 退出确认弹窗 -->
<view class="modal-mask" wx:if="{{showExitConfirm}}" bindtap="hideExitDialog"></view>
<view class="modal" wx:if="{{showExitConfirm}}">
  <view class="modal-title">确定退出吗？</view>
  <view class="modal-desc">你的进度将不会保存</view>
  <view class="modal-buttons">
    <view class="modal-btn cancel" bindtap="hideExitDialog">继续答题</view>
    <view class="modal-btn confirm" bindtap="confirmExit">退出</view>
  </view>
</view>
```

```css
/* pages/assessment-taking/taking.wxss */
.progress-header {
  margin-bottom: 48rpx;
}

.progress-bar {
  height: 8rpx;
  background: #E2E8F0;
  border-radius: 4rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2E7CF5 0%, #5A9CF7 100%);
  border-radius: 4rpx;
  transition: width 0.3s;
}

.progress-text {
  font-size: 24rpx;
  color: #64748B;
  text-align: right;
  margin-top: 12rpx;
}

.question-area {
  flex: 1;
}

.question-text {
  font-size: 36rpx;
  font-weight: 600;
  color: #1E293B;
  line-height: 1.6;
  margin-bottom: 48rpx;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.option {
  display: flex;
  gap: 24rpx;
  align-items: flex-start;
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 36rpx;
  border: 3rpx solid transparent;
  transition: all 0.2s;
}

.option.selected {
  border-color: #2E7CF5;
  background: rgba(46, 124, 245, 0.05);
}

.option-circle {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 3rpx solid #E2E8F0;
  flex-shrink: 0;
  margin-top: 4rpx;
}

.option.selected .option-circle {
  border-color: #2E7CF5;
  background: #2E7CF5;
  position: relative;
}

.option.selected .option-circle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12rpx;
  height: 8rpx;
  border-left: 3rpx solid white;
  border-bottom: 3rpx solid white;
  transform: translate(-50%, -50%) rotate(-45deg);
}

.option-text {
  flex: 1;
  font-size: 28rpx;
  color: #1E293B;
  line-height: 1.6;
}

.footer {
  display: flex;
  gap: 24rpx;
  padding: 24rpx 0;
}

.prev-btn {
  flex: 0 0 160rpx;
}

.prev-btn.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.next-btn {
  flex: 1;
}

/* 弹窗 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 32rpx;
  padding: 48rpx;
  width: 80%;
  z-index: 101;
}

.modal-title {
  font-size: 32rpx;
  font-weight: 600;
  text-align: center;
  color: #1E293B;
}

.modal-desc {
  font-size: 24rpx;
  text-align: center;
  color: #64748B;
  margin-top: 16rpx;
}

.modal-buttons {
  display: flex;
  gap: 24rpx;
  margin-top: 48rpx;
}

.modal-btn {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  border-radius: 44rpx;
  font-size: 28rpx;
}

.modal-btn.cancel {
  background: #F8FAFC;
  color: #1E293B;
}

.modal-btn.confirm {
  background: #2E7CF5;
  color: white;
}
```

#### 2.2.5 结果页 (pages/assessment-result)

**考虑的边界情况：**
- recordId 不存在
- 结果数据不完整
- 再测一次
- 保存/分享

```javascript
// pages/assessment-result/result.js
const Storage = require('../../utils/storage');
const DateUtil = require('../../utils/date');

Page({
  data: {
    record: null,
    loading: true
  },

  onLoad(options) {
    const { recordId } = options;
    if (!recordId) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.loadResult(recordId);
  },

  loadResult(recordId) {
    const records = Storage.get(Storage.KEYS.RECORDS) || [];
    const record = records.find(r => r.id === recordId);

    if (!record) {
      wx.showToast({ title: '记录不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    wx.setNavigationBarTitle({ title: record.assessmentName });
    this.setData({ record, loading: false });
  },

  // 再测一次
  retake() {
    const { record } = this.data;
    wx.redirectTo({
      url: `/pages/assessment-taking/taking?id=${record.assessmentId}`
    });
  },

  // 查看档案
  goToArchive() {
    wx.switchTab({
      url: '/pages/archive/archive'
    });
  }
});
```

```html
<!-- pages/assessment-result/result.wxml -->
<view class="container" wx:if="{{!loading}}">
  <!-- 结果概览 -->
  <view class="result-header" style="background: linear-gradient(135deg, {{record.assessmentColor}} 0%, {{record.assessmentColor}}cc 100%);">
    <view class="result-icon">{{record.assessmentIcon}}</view>
    <view class="result-title">{{record.result.title}}</view>
    <view class="result-summary">{{record.result.summary}}</view>
    <view class="result-score">{{record.result.overallScore}}</view>
    <view class="result-label">综合得分</view>
  </view>

  <!-- 维度得分 -->
  <view class="section" wx:if="{{record.result.dimensions}}">
    <view class="section-title">维度分析</view>
    <view class="dimension-list">
      <view class="dimension-item" wx:for="{{record.result.dimensions}}" wx:key="key">
        <view class="dimension-header">
          <view class="dimension-name">{{item.name}}</view>
          <view class="dimension-score">{{item.score}}</view>
        </view>
        <view class="dimension-bar">
          <view
            class="dimension-fill"
            style="width: {{item.score}}%"
          ></view>
        </view>
        <view class="dimension-desc">{{item.desc}}</view>
      </view>
    </view>
  </view>

  <!-- 详细解读 -->
  <view class="section">
    <view class="section-title">详细解读</view>
    <view class="result-desc">{{record.result.desc}}</view>
  </view>

  <!-- 时间 -->
  <view class="time-info">
    完成于 {{record.createdAt ? (record.createdAt | formatTime) : ''}}
  </view>

  <!-- 底部操作 -->
  <view class="footer">
    <view class="btn-secondary" bindtap="retake">再测一次</view>
    <view class="btn-primary" bindtap="goToArchive">查看档案</view>
  </view>
</view>
```

```css
/* pages/assessment-result/result.wxss */
.result-header {
  color: white;
  text-align: center;
  padding: 48rpx 24rpx;
  margin: 0 -24rpx;
  border-radius: 0 0 48rpx 48rpx;
}

.result-icon {
  font-size: 96rpx;
  margin-bottom: 24rpx;
}

.result-title {
  font-size: 40rpx;
  font-weight: 700;
}

.result-summary {
  font-size: 28rpx;
  opacity: 0.9;
  margin-top: 12rpx;
}

.result-score {
  font-size: 120rpx;
  font-weight: 800;
  margin-top: 36rpx;
  line-height: 1;
}

.result-label {
  font-size: 24rpx;
  opacity: 0.8;
  margin-top: 8rpx;
}

.section {
  background: #FFFFFF;
  border-radius: 24rpx;
  padding: 36rpx;
  margin-top: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 24rpx;
}

.dimension-list {
  display: flex;
  flex-direction: column;
  gap: 36rpx;
}

.dimension-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dimension-name {
  font-size: 28rpx;
  color: #1E293B;
}

.dimension-score {
  font-size: 36rpx;
  font-weight: 700;
  color: #2E7CF5;
}

.dimension-bar {
  height: 12rpx;
  background: #E2E8F0;
  border-radius: 6rpx;
  margin-top: 12rpx;
  overflow: hidden;
}

.dimension-fill {
  height: 100%;
  background: linear-gradient(90deg, #2E7CF5 0%, #5A9CF7 100%);
  border-radius: 6rpx;
}

.dimension-desc {
  font-size: 24rpx;
  color: #64748B;
  margin-top: 12rpx;
}

.result-desc {
  font-size: 28rpx;
  color: #64748B;
  line-height: 1.8;
}

.time-info {
  font-size: 22rpx;
  color: #94A3B8;
  text-align: center;
  margin-top: 48rpx;
}

.footer {
  display: flex;
  gap: 24rpx;
  padding: 48rpx 0;
}

.footer .btn-secondary,
.footer .btn-primary {
  flex: 1;
}
```

---

## 三、Phase 2: 成长档案开发

### 3.1 档案首页 (pages/archive)
展示概览、标签切换

### 3.2 时间线 (pages/archive-timeline)
展示所有记录的倒序时间线

### 3.3 趋势分析 (pages/archive-trends)
使用微信小程序图表组件

### 3.4 对比功能 (pages/archive-compare)
选择多次结果进行对比

---

## 四、Phase 3: 知识板块与个人中心开发

### 4.1 知识列表页
### 4.2 知识详情页
### 4.3 个人中心 (pages/profile)
### 4.4 设置页 (pages/profile-settings)
### 4.5 关于页 (pages/profile-about)

---

## 五、Phase 4: 完善与优化

### 5.1 组件抽取
- assessment-card
- progress-bar
- result-chart
- timeline-item

### 5.2 性能优化
- 图片懒加载
- 列表虚拟滚动（如需要）

### 5.3 体验优化
- 动画过渡
- 加载状态
- 错误提示

---

## 六、测试清单

### 功能测试
- [ ] 测评流程完整走通
- [ ] 答案正确保存
- [ ] 结果正确计算
- [ ] 档案正确显示
- [ ] 搜索正常工作
- [ ] 分类筛选正常

### 边界情况
- [ ] 空存储初始化
- [ ] 测评数据缺失处理
- [ ] 答案不完整处理
- [ ] 计算结果异常

### 兼容测试
- [ ] iOS
- [ ] Android
- [ ] 不同屏幕尺寸
