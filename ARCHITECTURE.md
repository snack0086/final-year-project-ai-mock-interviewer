# AI Interviewer - Architecture Diagrams

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AI INTERVIEWER SYSTEM                              │
│                          3-Tier Architecture                                 │
└─────────────────────────────────────────────────────────────────────────────┘

        ┌──────────────┐                                                       
        │   Browser    │                                                       
        │  (Chrome,    │                                                       
        │   Firefox)   │                                                       
        └──────┬───────┘                                                       
               │ HTTP                                                          
               │                                                               
    ┌──────────▼───────────┐                                                  
    │                      │                                                   
    │   FRONTEND LAYER     │                                                   
    │   React + Vite       │                                                   
    │   Port: 5173         │                                                   
    │                      │                                                   
    │  - Interview UI      │                                                   
    │  - Dashboard         │                                                   
    │  - Resume Upload     │                                                   
    │                      │                                                   
    └──────────┬───────────┘                                                  
               │ REST API                                                      
               │ (JSON)                                                        
    ┌──────────▼───────────┐                                                  
    │                      │                                                   
    │   BACKEND LAYER      │                                                   
    │   Node.js + Express  │                                                   
    │   Port: 5000         │                                                   
    │                      │                                                   
    │  - REST APIs         │◄─────────┐                                       
    │  - Authentication    │          │                                       
    │  - Business Logic    │          │ MongoDB                               
    │  - Agent Gateway     │          │ (Persistence)                         
    │                      │◄─────────┘                                       
    └──────────┬───────────┘                                                  
               │ HTTP                                                          
               │ (Internal)                                                    
    ┌──────────▼───────────┐                                                  
    │                      │                                                   
    │   AI AGENT LAYER     │                                                   
    │   Python + FastAPI   │                                                   
    │   Port: 8000         │                                                   
    │                      │                                                   
    │  - Resume Parser     │◄─────────┐                                       
    │  - Question Gen      │          │                                       
    │  - Answer Eval       │          │ OpenAI API                            
    │  - Verdict Engine    │          │ (LLM)                                 
    │  - STT/TTS           │◄─────────┘                                       
    │                      │                                                   
    └──────────────────────┘                                                  
```

## Data Flow - Interview Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      COMPLETE INTERVIEW FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌───────────┐   1. Upload      ┌───────────┐   Forward    ┌──────────┐
│           │   Resume (PDF)   │           │   File       │          │
│  Frontend │─────────────────►│  Backend  │─────────────►│  Agent   │
│           │                  │           │              │          │
└───────────┘                  └───────────┘              └─────┬────┘
                                                                │
                                                                │ 2. Extract
                                                                │    Text
                                                                │
                                                           ┌────▼─────┐
                                                           │ pdfplumber│
                                                           │ python-   │
                                                           │ docx      │
                                                           └────┬─────┘
                                                                │
┌───────────┐   3. Get Resume  ┌───────────┐   Return     ┌───▼──────┐
│           │◄─────Context─────│           │◄─────Text────│          │
│  Frontend │                  │  Backend  │              │  Agent   │
│           │                  │           │              │          │
└───────────┘                  └───────────┘              └──────────┘
      │
      │ 4. Request
      │    Questions
      ▼
┌───────────┐   Role + Resume  ┌───────────┐   Generate   ┌──────────┐
│           │─────────────────►│           │─────────────►│          │
│  Frontend │                  │  Backend  │              │  Agent   │
│           │                  │           │              │          │
└───────────┘                  └───────────┘              └─────┬────┘
                                                                │
                                                                │ 5. Use LLM
                                                                ▼
                                                           ┌─────────┐
                                                           │ OpenAI  │
                                                           │ GPT-4   │
                                                           └────┬────┘
                                                                │
┌───────────┐   6. Display     ┌───────────┐   Return     ┌───▼──────┐
│           │◄─────Questions───│           │◄────Q[]──────│          │
│  Frontend │                  │  Backend  │              │  Agent   │
└───────────┘                  └───────────┘              └──────────┘
      │
      │ 7. Candidate
      │    Answers
      ▼
┌───────────┐   Q+A for Eval   ┌───────────┐   Evaluate   ┌──────────┐
│           │─────────────────►│           │─────────────►│          │
│  Frontend │                  │  Backend  │              │  Agent   │
│           │                  │           │              │          │──►OpenAI
└───────────┘                  └───────────┘              └─────┬────┘
                                                                │
┌───────────┐   8. Score &     ┌───────────┐   Return     ┌───▼──────┐
│           │◄─────Feedback────│           │◄───Result────│          │
│  Frontend │                  │  Backend  │              │  Agent   │
└───────────┘                  └───────────┘              └──────────┘
      │
      │ 9. Repeat for
      │    all questions
      ▼
┌───────────┐   All Q+A Pairs  ┌───────────┐   Get Final  ┌──────────┐
│           │─────────────────►│           │─────Verdict──►│          │
│  Frontend │                  │  Backend  │              │  Agent   │
│           │                  │           │              │          │──►OpenAI
└───────────┘                  └───────────┘              └─────┬────┘
                                                                │
┌───────────┐   10. Display    ┌───────────┐   Return     ┌───▼──────┐
│           │◄────Final────────│           │◄───Verdict───│          │
│  Frontend │     Result       │  Backend  │   (Hire/No)  │  Agent   │
└───────────┘                  └───────────┘              └──────────┘
                                     │
                                     │ 11. Save to DB
                                     ▼
                                ┌─────────┐
                                │ MongoDB │
                                │         │
                                │ - User  │
                                │ - Job   │
                                │ - App   │
                                │ - Eval  │
                                └─────────┘
```

## API Communication Pattern

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    API REQUEST/RESPONSE FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

Frontend API Call
─────────────────
axios.post('/api/interviews/generate-questions', {
  resumeContext: "Software engineer...",
  role: "Senior Developer"
})
       │
       │ HTTP POST
       │ Content-Type: application/json
       ▼
┌────────────────────────────────────────┐
│ Backend: /api/interviews/generate-     │
│          questions                      │
│                                         │
│ Controller:                             │
│   interviewController.generateQuestions │
│       │                                 │
│       │ calls                           │
│       ▼                                 │
│   agentService.generateQuestions()      │
│       │                                 │
│       │ HTTP POST                       │
│       │ http://localhost:8000/api/v1/  │
│       │ qgen                            │
│       ▼                                 │
└────────────────────────────────────────┘
       │
       │ Request Body:
       │ {
       │   "resume_context": "...",
       │   "role": "..."
       │ }
       ▼
┌────────────────────────────────────────┐
│ Agent: /api/v1/qgen                    │
│                                         │
│ Router: qgen.router                     │
│       │                                 │
│       │ calls                           │
│       ▼                                 │
│   qgen_engine.generate_questions()      │
│       │                                 │
│       │ calls                           │
│       ▼                                 │
│   llm_client (OpenAI)                   │
│       │                                 │
│       │ API call                        │
│       ▼                                 │
│   OpenAI GPT-4                          │
│       │                                 │
│       │ Response:                       │
│       │ {                               │
│       │   "questions": [                │
│       │     "Q1...", "Q2...", ...       │
│       │   ]                             │
│       │ }                               │
│       ▼                                 │
└────────────────────────────────────────┘
       │
       │ Returns to Backend
       ▼
┌────────────────────────────────────────┐
│ Backend wraps response:                 │
│ {                                       │
│   "success": true,                      │
│   "data": {                             │
│     "questions": [...]                  │
│   }                                     │
│ }                                       │
└────────────────────────────────────────┘
       │
       │ Returns to Frontend
       ▼
Frontend receives:
{
  success: true,
  data: {
    questions: ["Q1", "Q2", "Q3", "Q4", "Q5"]
  }
}
```

## File Structure

```
AI_INTERVIEWER/
│
├── agent/                          # Python AI Agent (Port 8000)
│   ├── app/
│   │   ├── main.py                 # FastAPI app entry point
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── resume.py       # Resume extraction endpoint
│   │   │       ├── qgen.py         # Question generation endpoint
│   │   │       ├── evaluate.py     # Answer evaluation endpoint
│   │   │       ├── verdict.py      # Final verdict endpoint
│   │   │       ├── stt.py          # Speech-to-text endpoint
│   │   │       └── tts.py          # Text-to-speech endpoint
│   │   ├── services/
│   │   │   ├── llm_client.py       # OpenAI API client
│   │   │   ├── qgen_engine.py      # Question generation logic
│   │   │   ├── evaluation_engine.py# Evaluation logic
│   │   │   └── verdict_engine.py   # Verdict logic
│   │   └── models/                 # Pydantic models (request/response)
│   ├── chatgpt.txt                 # LLM prompts
│   ├── requirements.txt            # Python dependencies
│   └── ENV_SETUP.md               # Environment setup guide
│
├── backend/                        # Node.js Backend (Port 5000)
│   ├── server.js                   # Entry point
│   ├── app.js                      # Express app setup
│   ├── routes/
│   │   └── interviewRoutes.js     # Interview endpoints (MODIFIED)
│   ├── controllers/
│   │   └── interviewController.js  # Interview logic (MODIFIED)
│   ├── services/
│   │   └── agentService.js        # Agent communication (NEW)
│   ├── utils/
│   │   └── healthCheck.js         # Health monitoring (NEW)
│   ├── models/                     # MongoDB models
│   ├── package.json               # Node dependencies (MODIFIED)
│   └── ENV_SETUP.md               # Environment setup guide
│
├── frontend/                       # React Frontend (Port 5173)
│   ├── src/
│   │   ├── pages/
│   │   │   └── InterviewScreen/
│   │   │       └── InterviewScreen.jsx  # (MODIFIED)
│   │   ├── config.js              # API configuration
│   │   └── main.jsx               # Entry point
│   ├── package.json               # Node dependencies
│   └── ENV_SETUP.md               # Environment setup guide
│
└── Documentation/                  # Integration Documentation
    ├── INTEGRATION_COMPLETE.md    # This summary
    ├── INTEGRATION_GUIDE.md       # Detailed guide
    ├── QUICK_START.md            # Setup instructions
    ├── API_TESTING.md            # Testing guide
    └── ARCHITECTURE.md           # This file
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SECURITY LAYERS                                     │
└─────────────────────────────────────────────────────────────────────────────┘

Internet
    │
    │ HTTPS (Production)
    ▼
┌───────────────────┐
│  Frontend (React) │
│  - Client-side    │
│  - Public Access  │
│  - No Secrets     │
└────────┬──────────┘
         │
         │ JWT Token in Header
         │ Authorization: Bearer <token>
         ▼
┌───────────────────────────┐
│  Backend (Node.js)        │
│  ┌─────────────────────┐  │
│  │ Auth Middleware     │  │  ◄─── Validates JWT
│  │ (JWT Verification)  │  │
│  └──────────┬──────────┘  │
│             │              │
│             ▼              │
│  ┌─────────────────────┐  │
│  │ Route Handlers      │  │
│  └──────────┬──────────┘  │
│             │              │
│             ▼              │
│  ┌─────────────────────┐  │
│  │ Agent Service       │  │  ◄─── Internal HTTP
│  │ (HTTP Client)       │  │       Not exposed
│  └──────────┬──────────┘  │
└─────────────┼─────────────┘
              │
              │ Internal Network Only
              │ (Not publicly accessible)
              ▼
┌───────────────────────────┐
│  Agent (Python)           │
│  - OpenAI API Key stored  │  ◄─── Environment Variable
│  - No public access       │       Never exposed to frontend
│  - Processes AI requests  │
└───────────────────────────┘
              │
              │ HTTPS
              │ API Key in Header
              ▼
┌───────────────────────────┐
│  OpenAI API               │
│  - External Service       │
│  - Rate Limited           │
└───────────────────────────┘
```

## Deployment Architecture (Production)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PRODUCTION DEPLOYMENT                                  │
└─────────────────────────────────────────────────────────────────────────────┘

                               Internet
                                  │
                                  │
                    ┌─────────────▼─────────────┐
                    │  CloudFlare / CDN         │
                    │  - DDoS Protection        │
                    │  - SSL/TLS                │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │  Load Balancer (nginx)    │
                    │  - Route traffic          │
                    │  - SSL Termination        │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
         ┌──────────▼──────────┐    ┌──────────▼──────────┐
         │  Frontend            │    │  Backend API        │
         │  (Static Files)      │    │  (Node.js)          │
         │  ──────────────      │    │  ──────────────     │
         │  • S3 / Vercel       │    │  • EC2 / Docker     │
         │  • React Build       │    │  • Auto-scaling     │
         │  • Cached CDN        │    │  • Load Balanced    │
         └──────────────────────┘    └──────────┬──────────┘
                                                 │
                                                 │ Internal
                                                 │ Network
                                     ┌───────────▼───────────┐
                                     │  AI Agent (Python)    │
                                     │  ──────────────────   │
                                     │  • Not public         │
                                     │  • Docker / K8s       │
                                     │  • Auto-scaling       │
                                     └───────────┬───────────┘
                                                 │
                        ┌────────────────────────┼────────────────────────┐
                        │                        │                        │
              ┌─────────▼─────────┐   ┌─────────▼─────────┐   ┌─────────▼─────────┐
              │  MongoDB Atlas     │   │  Redis Cache      │   │  OpenAI API       │
              │  (Database)        │   │  (Sessions)       │   │  (External)       │
              │  • Replica Set     │   │  • TTL Keys       │   │  • Rate Limited   │
              │  • Automated       │   │  • Fast Access    │   │  • Monitored      │
              │    Backups         │   │                   │   │                   │
              └────────────────────┘   └───────────────────┘   └───────────────────┘
```

## Sequence Diagram - Resume Upload & Question Generation

```
┌────────┐    ┌─────────┐    ┌─────────┐    ┌────────┐    ┌─────────┐
│Frontend│    │ Backend │    │  Agent  │    │  LLM   │    │Database │
└───┬────┘    └────┬────┘    └────┬────┘    └───┬────┘    └────┬────┘
    │              │              │             │              │
    │ Upload       │              │             │              │
    │ Resume       │              │             │              │
    ├─────────────►│              │             │              │
    │              │              │             │              │
    │              │ Extract      │             │              │
    │              │ Resume       │             │              │
    │              ├─────────────►│             │              │
    │              │              │             │              │
    │              │              │ Parse PDF   │              │
    │              │              ├─────────┐   │              │
    │              │              │         │   │              │
    │              │              │◄────────┘   │              │
    │              │              │             │              │
    │              │ Resume Text  │             │              │
    │              │◄─────────────┤             │              │
    │              │              │             │              │
    │ Resume       │              │             │              │
    │ Context      │              │             │              │
    │◄─────────────┤              │             │              │
    │              │              │             │              │
    │ Generate     │              │             │              │
    │ Questions    │              │             │              │
    ├─────────────►│              │             │              │
    │              │              │             │              │
    │              │ Generate     │             │              │
    │              │ Questions    │             │              │
    │              ├─────────────►│             │              │
    │              │              │             │              │
    │              │              │ Call LLM    │              │
    │              │              ├────────────►│              │
    │              │              │             │              │
    │              │              │ Questions   │              │
    │              │              │◄────────────┤              │
    │              │              │             │              │
    │              │ Questions    │             │              │
    │              │ Array        │             │              │
    │              │◄─────────────┤             │              │
    │              │              │             │              │
    │ Display      │              │             │              │
    │ Questions    │              │             │              │
    │◄─────────────┤              │             │              │
    │              │              │             │              │
    │ [Interview   │              │             │              │
    │  Conducted]  │              │             │              │
    │              │              │             │              │
    │ Save         │              │             │              │
    │ Results      │              │             │              │
    ├─────────────►│              │             │              │
    │              │              │             │              │
    │              │ Store Eval   │             │              │
    │              ├─────────────────────────────────────────►│
    │              │              │             │              │
    │              │ Saved        │             │              │
    │              │◄─────────────────────────────────────────┤
    │              │              │             │              │
    │ Success      │              │             │              │
    │◄─────────────┤              │             │              │
    │              │              │             │              │
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TECHNOLOGY STACK                                   │
└─────────────────────────────────────────────────────────────────────────────┘

FRONTEND
├── React 18                   # UI Framework
├── Vite                       # Build Tool
├── Axios                      # HTTP Client
├── React Router               # Routing
└── CSS Modules                # Styling

BACKEND
├── Node.js 16+               # Runtime
├── Express.js 4.18           # Web Framework
├── Mongoose 7.8              # MongoDB ODM
├── JSON Web Token            # Authentication
├── Bcrypt                    # Password Hashing
├── Multer                    # File Upload
├── Axios                     # HTTP Client (for Agent)
├── Morgan                    # Logging
└── CORS                      # Cross-Origin

AGENT
├── Python 3.8+               # Runtime
├── FastAPI 0.127             # Web Framework
├── Uvicorn                   # ASGI Server
├── Pydantic 2.12             # Data Validation
├── pdfplumber 0.11           # PDF Parsing
├── python-docx 1.2           # DOCX Parsing
├── gTTS 2.5                  # Text-to-Speech
├── Vosk 0.3                  # Speech-to-Text
└── requests 2.32             # HTTP Client (for OpenAI)

DATABASE
└── MongoDB 7.8               # NoSQL Database

EXTERNAL SERVICES
└── OpenAI GPT-4              # Language Model
```

---

This architecture provides:
- ✅ Separation of concerns
- ✅ Scalability
- ✅ Security
- ✅ Maintainability
- ✅ Testability

