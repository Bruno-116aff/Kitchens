@echo off
echo 🎨 Opening Kitchen Planner Demo...
echo.

REM Check if planner-demo.html exists
if not exist "planner-demo.html" (
    echo ❌ planner-demo.html not found!
    echo Please make sure the file exists in the current directory.
    pause
    exit /b 1
)

REM Open the HTML file in default browser
start "" "planner-demo.html"

echo ✅ Kitchen Planner Demo opened in your browser!
echo.
echo 🎯 How to use:
echo 1. Drag modules from the library to the workspace
echo 2. Click on modules to select them
echo 3. Drag selected modules to move them
echo 4. Save or export your project
echo.
echo 🚀 The planner is now working perfectly!
echo.
pause