# HumanOS - 前后端分离部署指南

## 📁 标准项目结构

```
HumanOS/
├── deploy/
│   ├── docker-compose.yml      # Docker 编排文件
│   ├── client/
│   │   ├── Dockerfile        # 前端镜像构建
│   │   └── nginx.conf        # Nginx 配置
│   └── server/
│   │   └── Dockerfile        # 后端镜像构建
│   └── DEPLOYMENT.md         # 本文件
├── src/                      # 前端源码 (React + TypeScript)
├── backend/                   # 后端源码 (FastAPI + Python)
└── README.md
```

---

## 🚀 一键部署 (推荐)

### 方式一：Docker Compose 部署

```bash
# 1. 进入部署目录
cd deploy

# 2. 启动全部服务
docker-compose up -d

# 或者带 Redis 完整版本
docker-compose --profile with-redis up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

访问地址: http://localhost

---

### 方式二：单独启动脚本

#### 前端开发模式：
```bash
# 前端单独部署
npm install
npm run build

# 将 dist/ 目录上传到任何静态服务器
# Nginx / Apache / Vercel / Netlify
```

#### 后端单独部署：
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🎯 生产环境配置

### 环境变量配置 (.env)

```env
# 后端
DATABASE_URL=sqlite:///data/humanos.db
ENVIRONMENT=production
CORS_ORIGINS=https://your-domain.com

# 前端
VITE_API_URL=/api
```

---

## 🔧 Nginx 反向代理配置

```nginx
server {
    listen 443 ssl;
    server_name humanos.your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # 前端静态文件
    location / {
        root /var/www/humanos;
        try_files $uri $uri/ /index.html;
    }

    # API 转发到后端
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
    }
}
```

---

## ✅ 部署验证清单

- [ ] 前端首页可访问 http://localhost
- [ ] API 健康检查 http://localhost/api/health
- [ ] 游戏数据正常加载
- [ ] 数据库正常保存
- [ ] 移动端适配正常

---

## 📊 推荐服务器配置

| 配置 | 最低配置 | 推荐配置 |
|------|----------|----------|
| CPU | 2核 | 4核 |
| 内存 | 2GB | 4GB |
| 硬盘 | 10GB | 20GB |
| 系统 | Ubuntu 22.04 | Ubuntu 22.04 |

---

## 🔒 安全建议

1. 启用 HTTPS (Let's Encrypt)
2. 配置防火墙只开放 80/443
3. 定期备份数据库
4. 配置日志轮转
5. 监控服务状态
