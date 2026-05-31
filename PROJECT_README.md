# 心镜 MindMirror 微信小程序

一个专业、美观、易用的心理测评微信小程序。

## 项目特性

- 📊 心理测评：提供多种专业的心理测评工具
- 📈 成长档案：记录测评历史，追踪心理变化
- 📚 心理知识：学习心理学相关知识
- ⚙️ 个人设置：定制化用户体验
- 💾 本地存储：数据安全，隐私无忧

## 技术栈

- 微信小程序原生开发
- 微信本地存储 API
- 纯原生 JavaScript，无第三方依赖

## 项目结构

```
miniprogram/
├── app.js                 # 小程序入口
├── app.json               # 小程序配置
├── app.wxss               # 全局样式
├── sitemap.json           # 站点地图
│
├── pages/                 # 页面目录
│   ├── index/             # 首页
│   ├── library/           # 测评库
│   ├── assessment-intro/  # 测评详情
│   ├── assessment-taking/ # 答题页
│   ├── assessment-result/ # 结果页
│   ├── archive/           # 成长档案
│   ├── knowledge/         # 知识页
│   ├── knowledge-article/ # 文章详情
│   ├── profile/           # 个人中心
│   ├── profile-settings/  # 设置页
│   └── profile-about/     # 关于页
│
├── data/                  # 数据目录
│   ├── assessments/       # 测评数据
│   │   ├── index.js
│   │   ├── sample-1.js
│   │   └── sample-2.js
│   ├── categories.js      # 分类数据
│   └── knowledge.js       # 知识文章
│
├── utils/                 # 工具函数
│   ├── storage.js         # 存储工具
│   ├── calculator.js      # 计分引擎
│   ├── date.js            # 日期工具
│   ├── date.wxs           # WXS 日期格式化
│   ├── formatter.js       # 格式化工具
│   └── validator.js       # 验证工具
│
├── components/            # 自定义组件 (预留)
│
└── images/                # 图片资源 (预留)
    └── tabs/
```

## 主要功能

### 1. 首页
- 欢迎问候
- 快捷入口
- 数据概览
- 推荐测评
- 最近记录

### 2. 测评库
- 分类导航
- 搜索功能
- 测评列表

### 3. 测评流程
- 测评详情介绍
- 答题体验
- 结果展示
- 计分系统

### 4. 成长档案
- 测评历史
- 数据统计
- 时间线展示

### 5. 知识模块
- 文章列表
- 文章详情

### 6. 个人中心
- 用户信息
- 功能设置
- 关于页面

## 数据存储

使用微信小程序本地存储 API，数据完全本地保存：
- `mindmirror_records`：测评记录
- `mindmirror_settings`：用户设置
- `mindmirror_cache`：缓存数据

## 设计规范

- **色彩**：主色 #2E7CF5（医疗蓝）
- **圆角**：16-24rpx
- **间距**：24-48rpx
- **字体**：24-40rpx

## 开发说明

### 新增测评
在 `data/assessments/` 目录下新增测评数据文件，并在 `index.js` 中引入。

### 新增知识文章
在 `data/knowledge.js` 中添加新文章。

## 注意事项

1. 本小程序仅供参考，测评结果不作为诊断依据
2. 如有专业需求，请咨询专业心理医生
3. 数据存储在本地，卸载小程序会丢失数据
