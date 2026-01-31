# 🚀 AI Interviewer - Complete Startup Guide

## ✅ Prerequisites Verified

- ✅ Python 3.14.0 installed
- ✅ Node.js installed
- ✅ MongoDB running (connected at 127.0.0.1/ai_interviewer)
- ✅ All dependencies installed:
  - ✅ Agent: venv with all packages
  - ✅ Backend: node_modules installed (0 vulnerabilities)
  - ✅ Frontend: node_modules installed

## 🔧 Environment Files Created

All `.env` files have been created with default values:

### Agent `.env`
```
OPENAI_API_KEY=your_openai_api_key_here
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=development
```

⚠️ **IMPORTANT**: Replace `your_openai_api_key_here` with your actual OpenAI API key!

### Backend `.env`
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ai_interviewer
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
AGENT_URL=http://localhost:8000
```

✅ MongoDB is already connected. Cloudinary credentials are optional for basic functionality.

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

✅ Frontend is configured to call the backend.

---

## 🚦 How to Start All Services

### Option 1: Manual Start (3 Terminals)

#### Terminal 1 - Agent (Python)
```powershell
cd C:\Ai_Interviewer\agent
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

#### Terminal 2 - Backend (Node.js) - ALREADY RUNNING! ✅
```powershell
cd C:\Ai_Interviewer\backend
npm run dev
```

Expected output:
```
Server is running on port 5000
Environment: development
✅ AI Agent: Healthy
✅ All services are healthy and ready!
```

#### Terminal 3 - Frontend (React)
```powershell
cd C:\Ai_Interviewer\frontend
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## 🌐 Access URLs

Once all services are running:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Main application UI |
| **Backend API** | http://localhost:5000 | REST API |
| **Agent API Docs** | http://localhost:8000/docs | FastAPI Swagger UI |
| **Agent Health** | http://localhost:8000/health | Agent status check |

---

## ✅ Quick Verification

### 1. Check Agent Health
```powershell
curl http://localhost:8000/health
```
Expected: `{"status":"ok"}`

### 2. Check Backend → Agent Connection
```powershell
curl http://localhost:5000/api/interviews/agent-health
```
Expected: `{"success":true,"data":{"agentStatus":"healthy"}}`

### 3. Open Frontend
Open browser to http://localhost:5173

---

## 🎯 Current Status

### ✅ Completed
- [x] Agent dependencies installed (venv ready)
- [x] Backend dependencies installed (0 vulnerabilities)
- [x] Frontend dependencies installed
- [x] All .env files created
- [x] MongoDB connected
- [x] Backend running on port 5000
- [x] Health check system working

### ⏳ To Start
- [ ] Agent - Needs OpenAI API key and start command
- [ ] Frontend - Ready to start with `npm run dev`

---

## 🔑 Important Notes

### OpenAI API Key Required
The agent **requires** an OpenAI API key to function. Without it:
- Question generation will fail
- Answer evaluation will fail
- Interview features won't work

**To get an API key:**
1. Go to https://platform.openai.com/api-keys
2. Create an account or sign in
3. Create a new API key
4. Copy the key and update `agent\.env`

### MongoDB
Already connected! No action needed. ✅

### Cloudinary (Optional)
Only needed if you want to store resumes in the cloud. For local development, you can skip this.

---

## 🐛 Troubleshooting

### Agent won't start
**Issue**: `uvicorn: command not found`  
**Fix**: Make sure virtual environment is activated:
```powershell
cd agent
.\venv\Scripts\Activate.ps1
```

**Issue**: OpenAI API errors  
**Fix**: Update the API key in `agent\.env`

### Backend shows "Agent Unavailable"
**Fix**: Start the agent first (Terminal 1)

### Frontend can't connect
**Fix**: Make sure backend is running on port 5000

### Port already in use
**Fix**: 
```powershell
# Find process using port
netstat -ano | findstr :8000
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Kill process by PID
taskkill /PID <PID> /F
```

---

## 📝 Next Steps After Starting

1. **Open Frontend**: http://localhost:5173
2. **Create Account**: Sign up as HR or Candidate
3. **Test Integration**:
   - Upload a resume
   - Generate questions
   - Conduct interview
   - View evaluations

---

## 🎉 You're Ready!

The system is fully installed and configured. Just:
1. Add your OpenAI API key to `agent\.env`
2. Start the agent in a new terminal
3. Start the frontend in another terminal
4. Access http://localhost:5173

**Backend is already running and waiting for the agent! 🚀**

