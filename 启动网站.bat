@echo off
chcp 65001 >nul
echo ========================================
echo       心镜 MindMirror - 快速启动
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] 检查 Node.js 环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误：未安装 Node.js
    echo 请先安装 Node.js 18+ 版本
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js 环境正常

echo.
echo [2/3] 检查依赖...
if not exist "node_modules" (
    echo 📦 正在安装依赖，首次启动可能需要几分钟...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
)
echo ✅ 依赖已就绪

echo.
echo [3/3] 启动开发服务器...
echo.
echo 🌐 网站地址：http://localhost:5173
echo 💡 按 Ctrl+C 停止服务器
echo.
echo ========================================
echo.

call npm run dev
pause