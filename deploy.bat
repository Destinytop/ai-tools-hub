@echo off
chcp 65001 >nul
echo ==========================================
echo   AI Tools Hub - 部署脚本
echo ==========================================
echo.

REM 检查 Git 是否安装
git --version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未检测到 Git，请先安装 Git
    pause
    exit /b 1
)

echo [1/5] 检查 Git 状态...
cd /d "%~dp0"
git status

echo.
echo [2/5] 添加所有更改...
git add .

echo.
echo [3/5] 提交更改...
set /p commit_msg="请输入提交信息 (直接回车使用默认): "
if "%commit_msg%"=="" set commit_msg="Update: %date% %time%"
git commit -m "%commit_msg%"

echo.
echo [4/5] 推送到 GitHub...
echo 正在推送到 origin main...
git push origin main
if errorlevel 1 (
    echo.
    echo [错误] 推送失败！可能的解决方案：
    echo 1. 确保 GitHub 仓库已创建: https://github.com/new
    echo 2. 检查远程仓库地址: git remote -v
    echo 3. 如果使用 Token，确保格式正确
    pause
    exit /b 1
)

echo.
echo [5/5] 部署完成！
echo.
echo ==========================================
echo   下一步：部署到 Vercel
echo ==========================================
echo.
echo 请访问: https://vercel.com/new
echo.
echo 配置信息：
echo   - Framework: Next.js
echo   - Build Command: npm run build
echo   - Output Directory: dist
echo.
echo 或者使用 Vercel CLI:
echo   npm i -g vercel
echo   vercel --prod
echo.
pause
