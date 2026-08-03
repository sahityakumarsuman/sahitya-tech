@echo off
REM ============================================================
REM  Portfolio - one-click setup
REM  Installs all dependencies and (optionally) starts the app.
REM ============================================================

setlocal
cd /d "%~dp0"

echo(
echo ==========================================================
echo   Sahitya Kumar Suman - Portfolio  ::  Setup
echo ==========================================================
echo(

REM --- Check Node.js is installed ---
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not on PATH.
    echo         Please install Node.js 18+ from https://nodejs.org/ and re-run this file.
    echo(
    pause
    exit /b 1
)

REM --- Check npm is installed ---
where npm >nul 2>nul
if errorlevel 1 (
    echo [ERROR] npm was not found on PATH.
    echo         It normally ships with Node.js - please reinstall Node.js.
    echo(
    pause
    exit /b 1
)

for /f "delims=" %%v in ('node -v') do set NODE_VERSION=%%v
echo Using Node.js %NODE_VERSION%
echo(

echo Installing dependencies (npm install)...
echo ----------------------------------------------------------
call npm install
if errorlevel 1 (
    echo(
    echo [ERROR] npm install failed. Please check the output above.
    echo(
    pause
    exit /b 1
)

echo(
echo ==========================================================
echo   All dependencies installed successfully.
echo ==========================================================
echo(
echo   Available commands:
echo     npm run dev      Start the local dev server (http://localhost:5173)
echo     npm run build    Build the production bundle into /dist
echo     npm run preview  Preview the production build locally
echo(

set /p RUNDEV="Start the dev server now? (Y/N): "
if /i "%RUNDEV%"=="Y" (
    echo(
    echo Starting dev server... press Ctrl+C to stop.
    call npm run dev
)

endlocal
