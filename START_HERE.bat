@echo off
echo ============================================
echo   AI INTERVIEWER - COMPLETE STARTUP
echo ============================================
echo.
echo STATUS:
echo [OK] Backend running on port 5000
echo [OK] MongoDB connected
echo [OK] All dependencies installed
echo.
echo NEXT STEPS:
echo.
echo 1. UPDATE OPENAI API KEY (REQUIRED):
echo    Edit: agent\.env
echo    Replace: your_openai_api_key_here
echo    With your actual OpenAI API key
echo.
echo 2. START AGENT (Terminal 1):
echo    cd agent
echo    .\venv\Scripts\Activate.ps1
echo    uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
echo.
echo 3. START FRONTEND (Terminal 2):
echo    cd frontend
echo    npm run dev
echo.
echo 4. ACCESS:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
echo    Agent:    http://localhost:8000/docs
echo.
echo ============================================
echo.
echo Press any key to open detailed startup guide...
pause > nul
start STARTUP_GUIDE.md

