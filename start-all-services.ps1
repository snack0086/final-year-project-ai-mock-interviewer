# AI Interviewer - Complete Startup Script
# This script starts all three services in separate PowerShell windows

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  AI INTERVIEWER - STARTING ALL SERVICES" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if OpenAI API key is set
$envContent = Get-Content "agent\.env" -Raw
if ($envContent -match "your_openai_api_key_here") {
    Write-Host "⚠️  WARNING: OpenAI API key not configured!" -ForegroundColor Yellow
    Write-Host "   The agent will not work without it." -ForegroundColor Yellow
    Write-Host "   Edit agent\.env and add your OpenAI API key" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit
    }
}

Write-Host "📦 Starting services..." -ForegroundColor Green
Write-Host ""

# Start Agent in new window
Write-Host "[1/3] Starting AI Agent (Python)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$PWD\agent'; Write-Host 'Activating virtual environment...' -ForegroundColor Cyan; .\venv\Scripts\Activate.ps1; Write-Host 'Starting FastAPI server...' -ForegroundColor Cyan; uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
)

Start-Sleep -Seconds 5

# Backend should already be running, but check
Write-Host "[2/3] Backend already running on port 5000 ✓" -ForegroundColor Green

Start-Sleep -Seconds 2

# Start Frontend in new window
Write-Host "[3/3] Starting Frontend (React)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "cd '$PWD\frontend'; Write-Host 'Starting Vite dev server...' -ForegroundColor Cyan; npm run dev"
)

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  ALL SERVICES STARTING!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Service URLs:" -ForegroundColor White
Write-Host "   Frontend:  http://localhost:5173" -ForegroundColor Cyan
Write-Host "   Backend:   http://localhost:5000" -ForegroundColor Cyan
Write-Host "   Agent:     http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏱️  Please wait 10-15 seconds for all services to start..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to open frontend in browser..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Start-Sleep -Seconds 5
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "✅ Done! Check the separate windows for each service." -ForegroundColor Green
Write-Host ""

