# PowerShell UTF-8 编码修复脚本
# 执行: .\scripts\fix-encoding.ps1

Write-Host "`n🔧 PowerShell UTF-8 编码修复工具" -ForegroundColor Cyan
Write-Host "=".PadRight(50, "=") -ForegroundColor Cyan

$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8

$env:LC_ALL = 'en_US.UTF-8'
$env:LANG = 'en_US.UTF-8'

Write-Host "`n✅ 终端编码已设置为 UTF-8" -ForegroundColor Green
Write-Host "`n📋 验证输出:" -ForegroundColor Yellow

Write-Host "   🌍 中文 emoji 测试"
Write-Host "   ✅ 对号 ❌ 错号"
Write-Host "   🚀 🔥 ⭐ 💡 🎯"
Write-Host "   情商测评 人格测试 开源项目"

Write-Host "`n💡 永久生效方法:" -ForegroundColor Cyan
Write-Host "   把下面代码加入你的 PowerShell $PROFILE:`n"
Write-Host '   $OutputEncoding = [System.Text.Encoding]::UTF8'
Write-Host '   [Console]::OutputEncoding = [System.Text.Encoding]::UTF8'
Write-Host '   [Console]::InputEncoding = [System.Text.Encoding]::UTF8'

Write-Host "`n🎉 编码修复完成！`n" -ForegroundColor Green
