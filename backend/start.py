#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# =============================================================================
#  MindMirror 测评系统后端启动脚本
# =============================================================================
import os
import sys
import webbrowser
from pathlib import Path

def check_python_version():
    if sys.version_info < (3, 9):
        print("❌ Python 版本过低，请使用 Python 3.9+")
        sys.exit(1)
    print(f"✅ Python 版本: {sys.version.split()[0]}")

def check_dependencies():
    required = [
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "aiosqlite",
        "numpy",
        "pydantic",
    ]
    
    missing = []
    for pkg in required:
        try:
            __import__(pkg)
        except ImportError:
            missing.append(pkg)
    
    if missing:
        print(f"⚠️  缺少依赖: {', '.join(missing)}")
        print("   运行: pip install -r requirements.txt")
        return False
    
    print("✅ 核心依赖已安装")
    return True

def show_banner():
    banner = """
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   🧠 MindMirror 测评系统后端 v2.5.0                          ║
    ║                                                           ║
    ║   22种专业心理测评计算引擎                               ║
    ║   完整的用户系统与历史记录                                ║
    ║   常模对比与高级数据分析                                  ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    """
    print(banner)

def main():
    os.chdir(Path(__file__).parent)
    
    show_banner()
    check_python_version()
    deps_ok = check_dependencies()
    
    print("\n" + "="*60)
    print(f"📊 测评引擎数量: 4 (持续更新中...)")
    print(f"💾 数据库: SQLite")
    print(f"🔌 API端点: /api/v1")
    print(f"📚 文档地址: http://localhost:8000/docs")
    print("="*60)
    
    if deps_ok:
        print("\n🚀 启动服务...")
        webbrowser.open("http://localhost:8000/docs")
        
        import uvicorn
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info",
        )

if __name__ == "__main__":
    main()
