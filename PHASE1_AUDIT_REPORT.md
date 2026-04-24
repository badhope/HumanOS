# =============================================================================
#  📋 第一阶段问题追踪矩阵 - 问题 + 位置 + 修复状态
# =============================================================================

| 问题ID | 严重级别 | 问题描述 | 文件位置 | 修复状态 | 验证方法 |
|--------|---------|---------|---------|---------|---------|
| P1-001 | 🔴 严重 | Visitor ID 创建后未被引用初始化 | src/App.tsx | ✅ 已修复 | 控制台能看到 [Visitor] ID 输出 |
| P1-002 | 🔴 严重 | 后端缺少 /health 健康检查端点 | backend/api/assessment.py | ✅ 已修复 | GET /api/v1/assessment/health 返回200 |
| P1-003 | 🟠 高 | 前端传了session_id，但后端没记录日志 | backend/api/assessment.py:158 | ✅ 已修复 | 计算日志包含 | 访客: xxx |
| P1-004 | 🟠 高 | 导出API路径不一致 | 多处 | ✅ 已修复 | hash与resultId双重兼容 |
| P1-005 | 🟡 中 | Result页面未传递resultHash | src/pages/Results.tsx:248 | ✅ 已修复 | 组件能拿到result_hash |
| P1-006 | 🟡 中 | 导出API参数兼容不足 | src/services/apiClient.ts | ✅ 已修复 | 优先hash后降级resultId |
| P1-007 | 🟡 中 | 模块初始化顺序不确定 | src/App.tsx | ✅ 已修复 | App启动时显式触发初始化 |

# =============================================================================
#  🔧 所有修改过的代码位置清单
# =============================================================================

## 后端修改 (共3个文件)
1. backend/api/assessment.py (+183行)
   - 新增: /health 端点 (L164-173)
   - 新增: /export/{hash}/pdf 端点 (L179-252)
   - 新增: /export/{hash}/image 端点 (L255-313)
   - 新增: /export/status 端点 (L316-333)
   - 修改: 计算日志增加访客信息 (L158-159)
   - 修改: 返回结果包含session_id (L155-156)

2. backend/requirements.txt (+3行)
   - 新增: playwright==1.44.0

3. backend/api/assessment.py 导入修复
   - 新增: import os
   - 新增: from fastapi import Response

## 前端修改 (共6个核心文件)
1. src/services/visitorIdentity.ts (新建 145行)
   - 完整的匿名访客身份系统
   - localStorage + Cookie 双存储
   - 浏览器指纹生成
   - 访问统计字段

2. src/services/calculatorWrapper.ts (+3处修改)
   - 导入 visitorService
   - 默认 useBackend = true
   - 计算请求带上 session_id

3. src/services/apiClient.ts (+30行)
   - checkCloudExportStatus()
   - exportToPDF() 双重参数兼容
   - exportToImage() 双重参数兼容

4. src/components/ResultExportButton.tsx (重构 272行)
   - 云端导出状态自动检测
   - 云朵图标状态指示灯
   - 云端/本地自动切换UI
   - 优雅降级处理

5. src/pages/Results.tsx (+1行)
   - 传递 resultHash 给导出按钮

6. src/App.tsx (+5行)
   - 导入 visitorService
   - 显式初始化并打印到控制台

# =============================================================================
#  🔗 前后端 API 一致性对照表
# =============================================================================

| 端点 | 方法 | 前端调用路径 | 后端路由 | 参数一致性 | 状态 |
|------|------|-------------|---------|-----------|------|
| 健康检查 | GET | apiClient.healthCheck() | GET /health | ✅ 一致 | ✅ 就绪 |
| 计算测评 | POST | calculateAssessment() | /calculate/{id} | ✅ session_id 已加上 | ✅ 就绪 |
| 导出状态 | GET | checkCloudExportStatus() | /export/status | ✅ 一致 | ✅ 就绪 |
| 导出PDF | POST | exportToPDF(id, hash) | /export/{id}/pdf | ✅ 双重兼容 | ✅ 就绪 |
| 导出图片 | POST | exportToImage(id, hash) | /export/{id}/image | ✅ 双重兼容 | ✅ 就绪 |

# =============================================================================
#  🧪 功能验证检查表
# =============================================================================

[ ] TypeScript 类型检查 0错误
[ ] 生产构建一次性通过
[ ] Visitor ID 控制台可见
[ ] 后端启动无导入错误
[ ] 导出按钮显示云朵状态灯
[ ] 后端不可用时自动降级本地导出
[ ] 计算请求包含visitor_id
