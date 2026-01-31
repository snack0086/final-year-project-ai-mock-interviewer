# Quick Start Guide - AI Interviewer

## Prerequisites
- Python 3.8+ with pip
- Node.js 16+ with npm
- MongoDB running locally or connection URI
- OpenAI API key

## Initial Setup (Run Once)

### 1. Setup Agent (Python)
```bash
cd agent
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
echo "OPENAI_API_KEY=your_key_here" > .env
echo "HOST=0.0.0.0" >> .env
echo "PORT=8000" >> .env
```

### 2. Setup Backend (Node.js)
```bash
cd backend
npm install

# Create .env file (update with your values)
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ai_interviewer
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
AGENT_URL=http://localhost:8000
EOF
```

### 3. Setup Frontend (React)
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

## Running the Application

### Option 1: Run Each Service Separately (Recommended for Development)

**Terminal 1 - Agent:**
```bash
cd agent
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using Windows PowerShell (Windows Users)

Create a file `start-all.ps1`:
```powershell
# Start Agent
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd agent; .\venv\Scripts\activate; uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

# Wait a bit for agent to start
Start-Sleep -Seconds 3

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
```

Run: `.\start-all.ps1`

### Option 3: Using Bash (Mac/Linux)

Create a file `start-all.sh`:
```bash
#!/bin/bash

# Start Agent
gnome-terminal -- bash -c "cd agent && source venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload; exec bash"

# Wait a bit
sleep 3

# Start Backend
gnome-terminal -- bash -c "cd backend && npm run dev; exec bash"

# Wait a bit
sleep 3

# Start Frontend
gnome-terminal -- bash -c "cd frontend && npm run dev; exec bash"
```

Make executable and run:
```bash
chmod +x start-all.sh
./start-all.sh
```

## Verify Services are Running

1. **Agent**: http://localhost:8000/health
   - Should return: `{"status":"ok"}`
   - Swagger docs: http://localhost:8000/docs

2. **Backend**: http://localhost:5000
   - Should return API welcome message
   - Health check: http://localhost:5000/api/interviews/agent-health

3. **Frontend**: http://localhost:5173
   - Should load the application UI

## Quick Test

### Test Agent Health via Backend:
```bash
curl http://localhost:5000/api/interviews/agent-health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "agentStatus": "healthy"
  }
}
```

## Common Issues

### Agent won't start
- Check if Python 3.8+ is installed: `python --version`
- Check if virtual environment is activated
- Check if all dependencies are installed: `pip list`
- Check if OpenAI API key is set in `.env`

### Backend won't start
- Check if Node.js is installed: `node --version`
- Check if MongoDB is running: `mongosh` or check connection URI
- Check if port 5000 is available
- Run `npm install` again if dependencies are missing

### Frontend won't start
- Check if Node.js is installed
- Check if port 5173 is available
- Run `npm install` again
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### "Agent is not available" error
- Make sure agent is running first
- Check `AGENT_URL` in backend `.env` is correct
- Try: `curl http://localhost:8000/health`

## Default Credentials (If using seeded data)

Check `backend/seeder.js` for default users if database is seeded.

## Next Steps

1. Create an account or login
2. As HR: Create job postings
3. As Candidate: Apply to jobs, upload resume
4. Start an interview session
5. Check evaluations in dashboard

## Stopping Services

Press `Ctrl+C` in each terminal window to stop services gracefully.

## Clean Start (Reset Everything)

```bash
# Stop all services (Ctrl+C in terminals)

# Clear MongoDB database
mongosh ai_interviewer --eval "db.dropDatabase()"

# Clear node_modules (optional)
cd backend && rm -rf node_modules
cd frontend && rm -rf node_modules

# Reinstall
cd backend && npm install
cd frontend && npm install

# Restart services
```

## Documentation

- Full integration guide: See `INTEGRATION_GUIDE.md`
- Agent setup: See `agent/ENV_SETUP.md`
- Backend setup: See `backend/ENV_SETUP.md`
- Frontend setup: See `frontend/ENV_SETUP.md`

