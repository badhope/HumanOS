# 心镜 - 微信小程序

这是心镜项目的微信小程序版本，使用 `web-view` 组件包装现有网页版应用，实现快速上线。

## 🎯 特性

- ✨ 精美的首页动画和用户体验
- 🌐 完善的 web-view 封装，支持错误处理和重试
- 📡 智能网络状态监听
- 🔄 自动更新检测
- 📱 支持分享到好友和朋友圈
- 🎨 美观的深色主题设计
- 📚 完整的文档和配置指南

## ✅ 项目检查清单

- [x] 完整的小程序项目结构
- [x] web-view 组件加载与错误处理
- [x] 加载状态和错误提示界面
- [x] 页面跳转和 TabBar 配置
- [x] 分享功能（好友 + 朋友圈）
- [x] 详细的使用说明文档
- [x] .gitignore 配置
- [x] 隐私合规指引
- [x] 网络状态监听
- [x] 小程序自动更新检测
- [x] 首页精美动画效果
- [x] 5分钟快速配置指南

## 📖 快速开始

**新用户请先看这里 → [SETUP.md](SETUP.md)**

这是一份 5 分钟快速上手指南，包含：
- 如何修改配置
- 开发阶段注意事项
- 正式发布检查清单
- 常见问题解决

## 项目结构

```
mindmirror-miniprogram/
├── app.js                 # 小程序入口文件
├── app.json               # 小程序全局配置
├── app.wxss               # 小程序全局样式
├── project.config.json    # 项目配置文件
├── sitemap.json           # 站点地图配置
├── pages/                 # 页面目录
│   ├── index/             # 首页
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── webview/           # WebView 页面
│       ├── webview.js
│       ├── webview.json
│       ├── webview.wxml
│       └── webview.wxss
├── images/                # 图片资源（需要自己添加）
│   ├── logo.png
│   ├── home.png
│   ├── home-active.png
│   ├── assess.png
│   └── assess-active.png
└── README.md              # 本文档
```

## 微信小程序 web-view 要求

根据微信官方文档，使用 `web-view` 组件需要满足以下条件：

### 1. 小程序主体要求
- **个人主体小程序不支持** `web-view` 组件
- 需要**企业、政府、媒体、其他组织等非个人主体**

### 2. 域名配置要求
- 必须在小程序管理后台配置**业务域名**
- 域名必须完成**ICP 备案**
- 必须使用**HTTPS 协议**
- 必须使用标准端口 **443**，不支持自定义端口
- 地址必须包含**顶级域名**，不可直接使用 IP 地址
- 网页内 iframe 的域名也需要配置到域名白名单

### 3. 配置步骤
1. 登录 [微信公众平台](https://mp.weixin.qq.com/)
2. 进入「开发」→「开发管理」→「开发设置」
3. 找到「业务域名」部分，点击「配置」
4. 下载校验文件（如 `MP_verify_xxxxx.txt`）
5. 将校验文件上传到网页服务器根目录
6. 确保能通过 `https://your-domain.com/MP_verify_xxxxx.txt` 访问
7. 在小程序后台填入业务域名并保存

### 4. 开发工具设置
在开发阶段，可以在微信开发者工具中：
- 关闭「详情」→「本地设置」→「不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书」
- 这样可以在开发时使用本地地址或未备案的域名进行测试

## 快速开始

### 1. 修改配置

编辑 `app.js`，修改 `globalData.webUrl` 为你的网页地址：

```javascript
globalData: {
  webUrl: 'https://your-domain.com'  // 修改为你的实际网址
}
```

编辑 `project.config.json`，修改 `appid` 为你的小程序 AppID：

```json
{
  "appid": "wx你的实际AppID",
  ...
}
```

### 2. 添加图片资源

在 `images/` 目录下添加以下图片：

- `logo.png` - 应用 Logo（建议尺寸：200x200px）
- `home.png` - 首页图标（未选中，建议尺寸：81x81px）
- `home-active.png` - 首页图标（选中，建议尺寸：81x81px）
- `assess.png` - 测评图标（未选中，建议尺寸：81x81px）
- `assess-active.png` - 测评图标（选中，建议尺寸：81x81px）

### 3. 打开项目

1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 打开微信开发者工具
3. 选择「导入项目」
4. 选择 `mindmirror-miniprogram` 目录
5. 填入 AppID
6. 点击「导入」

### 4. 预览和上传

- 在开发者工具中点击「预览」可以生成二维码，在微信中扫码预览
- 点击「上传」可以将代码上传到微信公众平台
- 在微信公众平台提交审核并发布

## 网页与小程序通信

如果需要网页与小程序之间进行通信，可以使用微信 JSSDK：

### 网页端引入 JSSDK

```html
<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
```

### 网页端调用小程序接口

```javascript
// 跳转到小程序页面
wx.miniProgram.navigateTo({ url: '/pages/index/index' })

// 返回小程序上一页
wx.miniProgram.navigateBack()

// 切换 Tab
wx.miniProgram.switchTab({ url: '/pages/index/index' })

// 向小程序发送消息（会在小程序后退、组件销毁、分享时触发）
wx.miniProgram.postMessage({ data: 'Hello from web' })

// 获取当前环境
wx.miniProgram.getEnv(function(res) {
  console.log(res.miniprogram) // true
})
```

## 注意事项

1. **个人主体小程序无法使用 web-view**，必须使用企业等非个人主体
2. **开发时可以关闭域名校验**，但正式发布必须配置业务域名
3. **web-view 会自动铺满整个页面**，`navigationStyle: custom` 对其无效
4. **个人信息保护**：确保网页遵守微信小程序的用户隐私保护规范
5. **内容审核**：网页内容需要符合微信小程序平台规范

## 常见问题

### Q: 为什么 web-view 显示空白？
A: 请检查：
- 小程序主体是否为非个人类型
- 业务域名是否已正确配置
- 域名是否支持 HTTPS
- 校验文件是否可访问

### Q: 可以在开发者工具中测试吗？
A: 可以，在「详情」→「本地设置」中关闭「不校验合法域名」即可。

### Q: web-view 可以打开哪些网页？
A: 只能打开配置在业务域名白名单中的网页，以及关联公众号的文章。

## 相关文档

- [微信小程序官方文档 - web-view](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)
- [微信小程序业务域名配置](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/domain.html)
- [微信开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 📄 其他文档

- [隐私合规说明](privacy.md) - 小程序审核必须了解的隐私政策要求
- [图片资源说明](images/README.md) - 如何添加和替换图标资源
