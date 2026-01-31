# AI Interviewer - Complete Integration Guide

## Architecture Overview

```
┌─────────────────┐      HTTP/REST      ┌──────────────────┐      HTTP/REST      ┌─────────────────┐
│                 │ ─────────────────► │                  │ ─────────────────► │                 │
│   Frontend      │                     │   Backend        │                     │   AI Agent      │
│   (React/Vite)  │ ◄───────────────── │   (Node.js)      │ ◄───────────────── │   (FastAPI)     │
│   Port 5173     │      JSON          │   Port 5000      │      JSON          │   Port 8000     │
└─────────────────┘                     └──────────────────┘                     └─────────────────┘
```

## Integration Flow

### 1. Resume Processing Flow
```
Frontend → Backend → Agent
1. User uploads resume (PDF/DOCX)
2. Frontend: POST /api/interviews/extract-resume (multipart/form-data)
3. Backend: Receives file, forwards to Agent
4. Agent: POST /api/v1/resume/context
5. Agent: Extracts text using pdfplumber/python-docx
6. Returns: { resume_context: "...", length: 1234 }
```

### 2. Question Generation Flow
```
Backend → Agent
1. Backend: POST /api/v1/qgen
   Body: { resume_context: "...", role: "Software Engineer" }
2. Agent: Uses LLM to generate role-specific questions
3. Returns: { questions: ["Q1", "Q2", ...] }
```

### 3. Answer Evaluation Flow
```
Backend → Agent (per answer)
1. Backend: POST /api/v1/evaluate
   Body: { question: "...", answer: "...", resume_context: "..." }
2. Agent: Uses LLM to evaluate answer quality
3. Returns: { score, feedback, weak_areas }
```

### 4. Final Verdict Flow
```
Backend → Agent (after all questions)
1. Backend: POST /api/v1/verdict
   Body: { resume_context: "...", qa_pairs: [...], role: "..." }
2. Agent: Analyzes complete interview performance
3. Returns: { overall_score, should_hire, summary, interpretation }
```

## API Endpoints

### Backend APIs (Node.js - Port 5000)

#### AI Integration Endpoints
- `POST /api/interviews/extract-resume` - Extract resume text
- `POST /api/interviews/generate-questions` - Generate interview questions
- `POST /api/interviews/evaluate-answer` - Evaluate single answer
- `POST /api/interviews/final-verdict` - Get final interview verdict
- `GET /api/interviews/agent-health` - Check AI agent status

#### Interview Session Endpoints
- `POST /api/interviews/start` - Start interview session
- `GET /api/interviews/:id` - Get interview details
- `POST /api/interviews/:id/end` - End interview session
- `POST /api/interviews/:id/evaluate` - Save evaluation to DB
- `GET /api/interviews/candidate/:candidateId` - Get candidate's interviews

### Agent APIs (Python FastAPI - Port 8000)

#### Core AI Endpoints
- `POST /api/v1/resume/context` - Extract resume text (multipart/form-data)
- `POST /api/v1/qgen` - Generate questions (JSON)
- `POST /api/v1/evaluate` - Evaluate answer (JSON)
- `POST /api/v1/verdict` - Final verdict (JSON)
- `POST /api/v1/tts` - Text-to-speech (JSON)
- `POST /api/v1/stt` - Speech-to-text (multipart/form-data)

#### Health Endpoints
- `GET /health` - Agent health check
- `GET /version` - Agent version info

## Setup Instructions

### 1. Agent (Python) Setup

```bash
cd agent

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment (see agent/ENV_SETUP.md)
# Create .env file with OPENAI_API_KEY

# Start agent
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Verify**: Open http://localhost:8000/docs to see FastAPI Swagger UI

### 2. Backend (Node.js) Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment (see backend/ENV_SETUP.md)
# Create .env file with MongoDB URI, JWT secret, etc.

# Start MongoDB (if using local)
mongod

# Start backend
npm run dev
```

**Verify**: Open http://localhost:5000 - should see API welcome message

### 3. Frontend (React) Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment (see frontend/ENV_SETUP.md)
# Create .env file with VITE_API_URL

# Start frontend
npm run dev
```

**Verify**: Open http://localhost:5173 - application should load

## Testing the Integration

### Test 1: Agent Health Check
```bash
# From terminal
curl http://localhost:8000/health

# Expected: {"status":"ok"}
```

### Test 2: Backend → Agent Communication
```bash
# Check agent health via backend
curl http://localhost:5000/api/interviews/agent-health

# Expected: {"success":true,"data":{"agentStatus":"healthy"}}
```

### Test 3: Resume Extraction
```bash
# Using backend endpoint (requires file)
curl -X POST http://localhost:5000/api/interviews/extract-resume \
  -F "resume=@/path/to/resume.pdf"

# Expected: {"success":true,"data":{"resume_context":"...","length":...}}
```

### Test 4: Question Generation
```bash
curl -X POST http://localhost:5000/api/interviews/generate-questions \
  -H "Content-Type: application/json" \
  -d '{"resumeContext":"Experienced software engineer...","role":"Senior Developer"}'

# Expected: {"success":true,"data":{"questions":[...]}}
```

### Test 5: Answer Evaluation
```bash
curl -X POST http://localhost:5000/api/interviews/evaluate-answer \
  -H "Content-Type: application/json" \
  -d '{
    "question":"Tell me about yourself",
    "answer":"I am a software engineer with 5 years experience",
    "resumeContext":"..."
  }'

# Expected: {"success":true,"data":{"score":...,"feedback":"..."}}
```

## Example Usage Flow

### Complete Interview Flow (Code Example)

```javascript
// Frontend code example
const conductInterview = async (applicationId, jobId) => {
  // 1. Get application and job details
  const application = await API.get(`/candidates/applications/${applicationId}`);
  const job = application.data.job;
  
  // 2. Extract resume context (if not already done)
  const resumeFormData = new FormData();
  resumeFormData.append('resume', resumeFile);
  const resumeRes = await API.post('/interviews/extract-resume', resumeFormData);
  const resumeContext = resumeRes.data.data.resume_context;
  
  // 3. Generate questions
  const questionsRes = await API.post('/interviews/generate-questions', {
    resumeContext,
    role: job.title
  });
  const questions = questionsRes.data.data.questions;
  
  // 4. Conduct interview (ask questions, collect answers)
  const qaPairs = [];
  for (const question of questions) {
    const answer = await askQuestionAndGetAnswer(question);
    
    // 5. Evaluate each answer
    const evalRes = await API.post('/interviews/evaluate-answer', {
      question,
      answer,
      resumeContext
    });
    
    qaPairs.push({
      question,
      answer,
      evaluation: evalRes.data.data
    });
  }
  
  // 6. Get final verdict
  const verdictRes = await API.post('/interviews/final-verdict', {
    resumeContext,
    qaPairs,
    role: job.title
  });
  
  // 7. Save to database
  await API.post(`/interviews/${interviewId}/evaluate`, {
    candidateId: application.candidate._id,
    jobId: job._id,
    hrId: job.hr,
    rating: verdictRes.data.data.overall_score,
    summary: verdictRes.data.data.summary,
    interpretation: verdictRes.data.data.interpretation,
    shouldHire: verdictRes.data.data.should_hire,
    transcript: qaPairs
  });
};
```

## Files Modified/Created

### Agent (Python)
- **Modified**: `agent/app/main.py` - Added CORS origins for backend
- **Created**: `agent/ENV_SETUP.md` - Environment setup guide

### Backend (Node.js)
- **Modified**: `backend/package.json` - Added axios dependency
- **Created**: `backend/services/agentService.js` - Service to call Agent APIs
- **Modified**: `backend/controllers/interviewController.js` - Added agent integration
- **Modified**: `backend/routes/interviewRoutes.js` - Added new routes
- **Created**: `backend/ENV_SETUP.md` - Environment setup guide

### Frontend (React)
- **Modified**: `frontend/src/pages/InterviewScreen/InterviewScreen.jsx` - Updated to use backend APIs
- **Created**: `frontend/ENV_SETUP.md` - Environment setup guide

## Troubleshooting

### Issue: "Agent is not available"
- Ensure Python agent is running on port 8000
- Check `AGENT_URL` in backend `.env`
- Run: `curl http://localhost:8000/health`

### Issue: "Failed to extract resume"
- Ensure file is PDF or DOCX format
- Check file size (< 5MB)
- Verify agent has required packages (pdfplumber, python-docx)

### Issue: "LLM Error" or "502 Bad Gateway"
- Check OpenAI API key is set in agent `.env`
- Verify API key has credits/is valid
- Check agent logs for detailed error

### Issue: CORS errors in browser
- Verify backend URL in frontend `.env`
- Check CORS settings in `agent/app/main.py`
- Ensure all services are running on correct ports

## Development Workflow

1. **Start Agent**: `cd agent && uvicorn app.main:app --reload`
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Access App**: http://localhost:5173

## Production Deployment

### Environment Variables to Set:
- **Agent**: `OPENAI_API_KEY`, `ENVIRONMENT=production`
- **Backend**: `MONGO_URI`, `JWT_SECRET`, `AGENT_URL`, `NODE_ENV=production`
- **Frontend**: `VITE_API_URL` (production backend URL)

### Recommended Architecture:
```
Internet → Nginx/CloudFlare → Frontend (Static)
                            → Backend API
                            → Agent API (internal only)
```

## Notes

- The agent should NOT be publicly accessible in production
- Backend acts as a secure gateway to the agent
- Frontend only communicates with backend, never directly with agent
- All file uploads go through backend for security validation
- JWT authentication should be enforced on all backend routes

## Support

For issues or questions:
1. Check agent logs: Look for FastAPI startup messages
2. Check backend logs: Look for connection errors to agent
3. Check browser console: Look for API call failures
4. Verify all environment variables are set correctly

