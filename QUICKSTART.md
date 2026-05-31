# 心镜 MindMirror - 快速启动指南

## 项目已完成！

恭喜，心镜 MindMirror 微信小程序已经完整开发完成！

## 📦 项目位置

所有代码位于：`/workspace/miniprogram/`

## 🚀 如何运行

### 1. 安装微信开发者工具

下载并安装：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

### 2. 导入项目

1. 打开微信开发者工具
2. 选择 "小程序"
3. 点击 "+" 号或 "导入项目"
4. 填写：
   - 项目名称：心镜 MindMirror
   - 目录：选择 `/workspace/miniprogram/`
   - AppID：可以选择"测试号"或填入你的 AppID
5. 点击"新建"或"导入"

### 3. 开始测试

项目导入后即可在开发者工具中预览和测试所有功能！

## 📱 功能列表

### 首页 (pages/index)
- ✅ 欢迎问候
- ✅ 快捷入口
- ✅ 数据概览
- ✅ 推荐测评
- ✅ 最近记录

### 测评库 (pages/library)
- ✅ 搜索功能
- ✅ 分类导航
- ✅ 测评列表

### 测评流程
- ✅ 测评详情 (pages/assessment-intro)
- ✅ 答题页面 (pages/assessment-taking)
- ✅ 结果展示 (pages/assessment-result)

### 成长档案 (pages/archive)
- ✅ 测评历史
- ✅ 数据统计

### 知识模块
- ✅ 文章列表 (pages/knowledge)
- ✅ 文章详情 (pages/knowledge-article)

### 个人中心
- ✅ 用户信息 (pages/profile)
- ✅ 功能设置 (pages/profile-settings)
- ✅ 关于页面 (pages/profile-about)

## 💾 数据存储

所有数据保存在本地：
- `mindmirror_records` - 测评记录
- `mindmirror_settings` - 用户设置

## 🎨 设计规范

- 主色：#2E7CF5（医疗蓝）
- 风格：简洁、专业、友好
- 字体：24-40rpx
- 圆角：16-24rpx

## 📝 开发说明

### 添加新测评

1. 在 `data/assessments/` 创建新文件
2. 参考 `sample-1.js` 和 `sample-2.js` 的格式
3. 在 `data/assessments/index.js` 中引入

### 添加新知识文章

直接在 `data/knowledge.js` 中添加新文章对象

## 📄 相关文档

- `PROJECT_README.md` - 项目总览
- `docs/design-spec.md` - 设计规范
- `docs/implementation-plan.md` - 开发计划

## ⚠️ 重要提示

本小程序提供的测评结果仅供参考，不作为诊断依据。如有专业需求，请咨询专业心理医生。
