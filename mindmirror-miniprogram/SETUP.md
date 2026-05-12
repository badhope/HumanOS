# 小程序快速配置指南

## 🚀 5分钟快速开始

### 1. 修改 AppID

打开 [project.config.json](project.config.json)，将第 43 行的 AppID 改为你的：

```json
"appid": "wx你的实际AppID"
```

### 2. 修改网页地址

打开 [app.js](app.js)，将第 85 行的地址改为你的：

```javascript
globalData: {
  webUrl: 'https://your-domain.com',
  userInfo: null
}
```

### 3. 打开微信开发者工具

1. 下载安装：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. 点击「导入项目」
3. 选择本项目的 `mindmirror-miniprogram` 文件夹
4. 填入项目名称和 AppID

## 🔧 开发阶段配置

在微信开发者工具中：

1. 点击右上角「详情」
2. 进入「本地设置」
3. 确保勾选：
   - ☑️ 不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书
   - ☑️ ES6 转 ES5
   - ☑️ 增强编译
   - ☑️ 启用 WXML 编译插件

这样就可以在开发阶段使用任何网址了！

## 🔒 正式发布前必须完成

### 1. 注册企业小程序

个人小程序无法使用 web-view，必须：
- 使用企业/组织/个体工商户资质注册
- 完成微信认证（300元/年）

### 2. 配置业务域名

1. 登录 https://mp.weixin.qq.com
2. 进入「开发」→「开发管理」→「开发设置」
3. 找到「业务域名」区域
4. 下载校验文件（如 `MP_verify_xxxxx.txt`）
5. 上传到你的网站根目录
6. 确保能通过 https://your-domain.com/MP_verify_xxxxx.txt 访问
7. 回到小程序后台填入域名并保存

**注意**：
- 域名必须完成 ICP 备案
- 必须使用 HTTPS
- 不能带端口号
- 不能直接用 IP 地址

### 3. 完善小程序信息

在微信公众平台：
- 上传小程序头像
- 填写小程序介绍
- 选择服务类目（建议：工具 > 教育/测评）
- 配置用户隐私保护指引

## 📋 发布检查清单

- [ ] AppID 已正确配置
- [ ] 网页地址已改为生产环境
- [ ] 业务域名已在后台配置完成
- [ ] 校验文件可正常访问
- [ ] 小程序头像和介绍已填写
- [ ] 服务类目已选择
- [ ] 用户隐私保护指引已配置
- [ ] 测试通过，功能正常
- [ ] 在开发者工具中点击「上传」
- [ ] 在微信公众平台提交审核
- [ ] 审核通过后点击「发布」

## 💡 常见问题解决

### 问题：web-view 一片空白

**可能原因**：
1. 小程序是个人主体 → 必须用企业主体
2. 业务域名未配置 → 去微信后台配置
3. 网址不是 HTTPS → 必须用 HTTPS
4. 开发时未关闭域名校验 → 去开发者工具勾选「不校验合法域名」

### 问题：提示"该网页已停止访问"

**原因**：域名不在白名单中

**解决**：确认业务域名配置正确，且校验文件可访问

### 问题：审核被拒

**常见原因**：
1. 内容不符合平台规范
2. 未配置用户隐私保护指引
3. 服务类目选择不当
4. web-view 网页内容违规

## 📞 更多帮助

- 微信小程序官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/
- web-view 组件文档：https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html
