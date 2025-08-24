@echo off
echo Text Reader Extension Installer
echo ================================
echo.
echo This script will help you install the Text Reader extension in Chrome/Edge
echo.

REM Check if Chrome is installed
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    echo Chrome detected. Opening extensions page...
    start chrome://extensions/
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    echo Chrome detected. Opening extensions page...
    start chrome://extensions/
) else (
    echo Chrome not found in default location.
)

REM Check if Edge is installed
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    echo Edge detected. Opening extensions page...
    start msedge://extensions/
) else if exist "C:\Program Files\Microsoft\Edge\Application\msedge.exe" (
    echo Edge detected. Opening extensions page...
    start msedge://extensions/
) else (
    echo Edge not found in default location.
)

echo.
echo Installation Instructions:
echo 1. Enable "Developer mode" (toggle in top right)
echo 2. Click "Load unpacked"
echo 3. Select this folder: %CD%
echo 4. The extension should now appear in your browser
echo.
echo Press any key to continue...
pause > nul
