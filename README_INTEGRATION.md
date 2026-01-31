# AI Interviewer - Integrated System

> An intelligent interview platform powered by AI that conducts, evaluates, and provides hiring recommendations for technical interviews.

## 🎯 Overview

The AI Interviewer is a **3-tier integrated system** that combines:
- **Frontend (React/Vite)**: Modern, responsive user interface
- **Backend (Node.js/Express)**: RESTful API and business logic
- **AI Agent (Python/FastAPI)**: Intelligent interview processing with GPT-4

## 🏗️ Architecture

```
Frontend (React) → Backend (Node.js) → AI Agent (Python) → OpenAI GPT-4
    Port 5173         Port 5000           Port 8000
```

The system follows a **secure gateway pattern** where:
- Frontend only communicates with Backend
- Backend acts as a secure gateway to the AI Agent
- AI Agent handles all AI/ML operations with OpenAI

## ✨ Features

### For Candidates
- 📝 Upload resume (PDF/DOCX)
- 🎤 Voice-based interview sessions
- 📊 Real-time answer evaluation
- 📈 Performance feedback
- 📋 Interview history

### For HR/Recruiters
- 💼 Create job postings
- 👥 Review applications
- 🤖 AI-powered candidate screening
- 📊 Detailed evaluation reports
- ✅ Hiring recommendations

### AI Capabilities
- 📄 Resume parsing and analysis
- 🎯 Dynamic question generation based on resume
- 💡 Intelligent answer evaluation
- 🔍 Comprehensive performance assessment
- 📝 Final hiring verdict with reasoning

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB
- OpenAI API Key

### Setup & Run

```bash
# 1. Clone and navigate to project
cd AI_INTERVIEWER

# 2. Setup Agent
cd agent
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Create .env with OPENAI_API_KEY
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# 3. Setup Backend (new terminal)
cd backend
npm install
# Create .env with MONGO_URI, JWT_SECRET, AGENT_URL
npm run dev

# 4. Setup Frontend (new terminal)
cd frontend
npm install
# Create .env with VITE_API_URL
npm run dev
```

### Access
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **AI Agent API**: http://localhost:8000/docs (Swagger UI)

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [**QUICK_START.md**](QUICK_START.md) | Complete setup instructions |
| [**INTEGRATION_GUIDE.md**](INTEGRATION_GUIDE.md) | Detailed integration documentation |
| [**ARCHITECTURE.md**](ARCHITECTURE.md) | System architecture and diagrams |
| [**API_TESTING.md**](API_TESTING.md) | API testing examples |
| [**INTEGRATION_COMPLETE.md**](INTEGRATION_COMPLETE.md) | Integration summary |

## 🔌 API Endpoints

### Backend APIs

**AI Integration**
- `POST /api/interviews/extract-resume` - Extract resume text
- `POST /api/interviews/generate-questions` - Generate questions
- `POST /api/interviews/evaluate-answer` - Evaluate answer
- `POST /api/interviews/final-verdict` - Get final verdict
- `GET /api/interviews/agent-health` - Check AI agent status

**Interview Management**
- `POST /api/interviews/start` - Start interview session
- `GET /api/interviews/:id` - Get interview details
- `POST /api/interviews/:id/end` - End interview
- `POST /api/interviews/:id/evaluate` - Save evaluation

### AI Agent APIs

- `POST /api/v1/resume/context` - Resume extraction
- `POST /api/v1/qgen` - Question generation
- `POST /api/v1/evaluate` - Answer evaluation
- `POST /api/v1/verdict` - Final verdict
- `POST /api/v1/tts` - Text-to-speech
- `POST /api/v1/stt` - Speech-to-text
- `GET /health` - Health check

## 🛠️ Tech Stack

**Frontend**
- React 18
- Vite
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB/Mongoose
- JWT Authentication
- Axios

**AI Agent**
- Python 3.8+
- FastAPI
- pdfplumber (PDF parsing)
- python-docx (DOCX parsing)
- OpenAI GPT-4

## 📁 Project Structure

```
AI_INTERVIEWER/
├── agent/              # Python AI Agent
│   ├── app/           # Application code
│   ├── chatgpt.txt    # LLM prompts
│   └── requirements.txt
├── backend/           # Node.js Backend
│   ├── routes/        # API routes
│   ├── controllers/   # Business logic
│   ├── services/      # Agent communication
│   └── models/        # Database models
├── frontend/          # React Frontend
│   ├── src/
│   │   ├── pages/     # Page components
│   │   └── components/ # Reusable components
│   └── public/
└── [Documentation]    # Integration guides
```

## 🔒 Security

- JWT-based authentication
- Backend acts as secure gateway
- AI Agent not publicly exposed
- File type validation
- Size limits on uploads
- CORS properly configured

## 🧪 Testing

### Quick Health Check
```bash
# Check all services
curl http://localhost:8000/health
curl http://localhost:5000
curl http://localhost:5000/api/interviews/agent-health
```

### Test Question Generation
```bash
curl -X POST http://localhost:5000/api/interviews/generate-questions \
  -H "Content-Type: application/json" \
  -d '{"resumeContext":"Software engineer...","role":"Developer"}'
```

See [API_TESTING.md](API_TESTING.md) for comprehensive testing examples.

## 🚦 Development Workflow

1. Start AI Agent (port 8000)
2. Start Backend (port 5000) - automatically checks Agent health
3. Start Frontend (port 5173)
4. Access http://localhost:5173

## 📊 Monitoring

The backend automatically checks AI Agent health on startup:

```
✅ AI Agent: Healthy
✅ All services are healthy and ready!
```

## 🤝 Integration Flow

```
1. Candidate uploads resume
   → Backend → Agent extracts text

2. System generates questions
   → Backend → Agent uses GPT-4 based on resume

3. Interview conducted
   → Questions asked, answers recorded

4. Each answer evaluated
   → Backend → Agent provides score & feedback

5. Final verdict
   → Backend → Agent analyzes complete interview

6. Results saved
   → Backend stores in MongoDB
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Agent not available | Start agent first, check AGENT_URL |
| CORS errors | Verify URLs in .env files |
| MongoDB connection | Check MONGO_URI, ensure MongoDB running |
| OpenAI errors | Verify API key, check credits |

## 📝 Environment Variables

### Agent (.env)
```env
OPENAI_API_KEY=your_key
PORT=8000
```

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/ai_interviewer
JWT_SECRET=your_secret
AGENT_URL=http://localhost:8000
PORT=5000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎓 Usage Example

```javascript
// Frontend code
const conductInterview = async (applicationId) => {
  // 1. Extract resume
  const resumeRes = await API.post('/interviews/extract-resume', formData);
  
  // 2. Generate questions
  const questionsRes = await API.post('/interviews/generate-questions', {
    resumeContext: resumeRes.data.data.resume_context,
    role: job.title
  });
  
  // 3. Evaluate answers
  for (const question of questions) {
    const answer = await getAnswer(); // Your implementation
    await API.post('/interviews/evaluate-answer', {
      question, answer, resumeContext
    });
  }
  
  // 4. Get final verdict
  const verdict = await API.post('/interviews/final-verdict', {
    resumeContext, qaPairs, role
  });
  
  // 5. Save to database
  await API.post(`/interviews/${id}/evaluate`, verdict.data);
};
```

## 🌟 Key Features of Integration

✅ **Stateless Agent** - Can scale horizontally  
✅ **Secure Gateway** - Backend protects Agent  
✅ **RESTful APIs** - Standard HTTP/JSON  
✅ **Health Monitoring** - Automatic service checks  
✅ **Error Handling** - Graceful degradation  
✅ **Type Safety** - Pydantic models in Agent  

## 📈 Next Steps

- [ ] Add authentication to interview routes
- [ ] Implement rate limiting
- [ ] Add Redis caching for questions
- [ ] Set up logging infrastructure
- [ ] Deploy to production
- [ ] Add real-time progress updates
- [ ] Implement video recording

## 🤝 Contributing

This is an integrated system. When making changes:
1. Frontend changes: Test against Backend
2. Backend changes: Test against Agent
3. Agent changes: Test all endpoints
4. Document API changes

## 📄 License

[Your License Here]

## 👥 Support

For issues:
1. Check documentation in root directory
2. Review service logs (Agent, Backend, Frontend)
3. Verify environment variables
4. Check API endpoint connectivity

## 🎉 Credits

Built with:
- OpenAI GPT-4
- FastAPI
- Express.js
- React

---

**Status**: ✅ Fully Integrated and Ready to Use

For detailed setup instructions, see [QUICK_START.md](QUICK_START.md)

