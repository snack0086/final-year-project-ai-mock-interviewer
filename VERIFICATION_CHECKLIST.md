# Integration Verification Checklist ✓

Use this checklist to verify that the integration is working correctly.

## Initial Setup

### Agent Setup
- [ ] Virtual environment created (`python -m venv venv`)
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created with `OPENAI_API_KEY`
- [ ] Agent starts successfully (`uvicorn app.main:app --reload`)
- [ ] Can access http://localhost:8000/docs
- [ ] Health endpoint returns `{"status":"ok"}`

### Backend Setup
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with `MONGO_URI`, `JWT_SECRET`, `AGENT_URL`
- [ ] MongoDB is running
- [ ] Backend starts successfully (`npm run dev`)
- [ ] Can access http://localhost:5000
- [ ] Startup shows "✅ AI Agent: Healthy"

### Frontend Setup
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with `VITE_API_URL`
- [ ] Frontend starts successfully (`npm run dev`)
- [ ] Can access http://localhost:5173
- [ ] No console errors on page load

## Integration Testing

### Health Checks
```bash
curl http://localhost:8000/health
```
- [ ] Returns: `{"status":"ok"}`

```bash
curl http://localhost:5000
```
- [ ] Returns: API welcome message

```bash
curl http://localhost:5000/api/interviews/agent-health
```
- [ ] Returns: `{"success":true,"data":{"agentStatus":"healthy"}}`

### Resume Extraction
```bash
curl -X POST http://localhost:5000/api/interviews/extract-resume \
  -F "resume=@path/to/resume.pdf"
```
- [ ] Returns: `{"success":true,"data":{"resume_context":"...","length":...}}`
- [ ] No errors in agent logs
- [ ] No errors in backend logs

### Question Generation
```bash
curl -X POST http://localhost:5000/api/interviews/generate-questions \
  -H "Content-Type: application/json" \
  -d '{"resumeContext":"Experienced software engineer","role":"Senior Developer"}'
```
- [ ] Returns: `{"success":true,"data":{"questions":[...]}}`
- [ ] Questions array has 3-5 questions
- [ ] Questions are relevant to role
- [ ] No OpenAI API errors

### Answer Evaluation
```bash
curl -X POST http://localhost:5000/api/interviews/evaluate-answer \
  -H "Content-Type: application/json" \
  -d '{
    "question":"Tell me about yourself",
    "answer":"I am a software engineer with 5 years experience",
    "resumeContext":"Software engineer"
  }'
```
- [ ] Returns: `{"success":true,"data":{"score":...,"feedback":"..."}}`
- [ ] Score is between 0-10
- [ ] Feedback is present
- [ ] No errors

### Final Verdict
```bash
curl -X POST http://localhost:5000/api/interviews/final-verdict \
  -H "Content-Type: application/json" \
  -d '{
    "resumeContext":"Software engineer",
    "role":"Developer",
    "qaPairs":[{"question":"Q1","answer":"A1","evaluation":{"score":8}}]
  }'
```
- [ ] Returns: `{"success":true,"data":{"overall_score":...,"should_hire":...}}`
- [ ] Has summary and interpretation
- [ ] No errors

## Frontend Integration

### Browser Tests
- [ ] Open http://localhost:5173
- [ ] Login page loads
- [ ] No console errors
- [ ] Can navigate to candidate/HR dashboards

### API Calls from Frontend
Open browser console on http://localhost:5173:
```javascript
// Test 1: Health check
const res1 = await fetch('http://localhost:5000/api/interviews/agent-health');
console.log(await res1.json());
```
- [ ] Returns healthy status

```javascript
// Test 2: Question generation
const res2 = await fetch('http://localhost:5000/api/interviews/generate-questions', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    resumeContext: 'Software engineer',
    role: 'Developer'
  })
});
console.log(await res2.json());
```
- [ ] Returns questions array
- [ ] No CORS errors

## Error Handling

### Test Error Cases

#### Invalid File Type
```bash
curl -X POST http://localhost:5000/api/interviews/extract-resume \
  -F "resume=@image.jpg"
```
- [ ] Returns 400 error
- [ ] Error message mentions file type

#### Agent Down
- [ ] Stop agent (Ctrl+C)
- [ ] Request: `curl http://localhost:5000/api/interviews/agent-health`
- [ ] Returns: `{"agentStatus":"unhealthy"}`
- [ ] Backend logs show warning
- [ ] Restart agent and verify health returns

#### Missing Fields
```bash
curl -X POST http://localhost:5000/api/interviews/generate-questions \
  -H "Content-Type: application/json" \
  -d '{}'
```
- [ ] Returns 400 error
- [ ] Error message mentions missing fields

## Code Verification

### Agent Files
- [ ] `agent/app/main.py` has CORS origins for ports 5000, 5173
- [ ] Agent endpoints return JSON
- [ ] No hardcoded credentials

### Backend Files
- [ ] `backend/package.json` includes axios
- [ ] `backend/services/agentService.js` exists
- [ ] `backend/controllers/interviewController.js` has new endpoints
- [ ] `backend/routes/interviewRoutes.js` has new routes
- [ ] `backend/utils/healthCheck.js` exists
- [ ] `backend/server.js` calls startup health check

### Frontend Files
- [ ] `frontend/src/pages/InterviewScreen/InterviewScreen.jsx` uses API calls
- [ ] No hardcoded WebSocket connections
- [ ] Uses backend URL from config

## Documentation

- [ ] `INTEGRATION_GUIDE.md` exists and is complete
- [ ] `QUICK_START.md` exists with setup instructions
- [ ] `API_TESTING.md` exists with curl examples
- [ ] `ARCHITECTURE.md` exists with diagrams
- [ ] `INTEGRATION_COMPLETE.md` exists with summary
- [ ] `agent/ENV_SETUP.md` exists
- [ ] `backend/ENV_SETUP.md` exists
- [ ] `frontend/ENV_SETUP.md` exists

## Performance

### Response Times
- [ ] Health check < 100ms
- [ ] Resume extraction < 5s
- [ ] Question generation < 10s (depends on OpenAI)
- [ ] Answer evaluation < 5s
- [ ] Final verdict < 10s

### Concurrent Requests
- [ ] Can handle multiple simultaneous question generation requests
- [ ] No race conditions
- [ ] Proper error handling

## Production Readiness

### Environment Variables
- [ ] All `.env` files use placeholders in documentation
- [ ] No hardcoded API keys in code
- [ ] Environment-specific configurations

### Security
- [ ] Agent not publicly accessible (only via backend)
- [ ] File upload size limits in place
- [ ] File type validation working
- [ ] CORS properly configured

### Logging
- [ ] Agent logs requests
- [ ] Backend logs API calls (Morgan)
- [ ] Frontend logs errors to console
- [ ] Error messages are helpful

## Final Verification

### All Services Running
```bash
# Check all ports
netstat -an | grep LISTEN | grep -E "(5000|5173|8000)"
```
- [ ] Port 8000 listening (Agent)
- [ ] Port 5000 listening (Backend)
- [ ] Port 5173 listening (Frontend)

### Complete Flow Test
- [ ] Upload a real resume PDF
- [ ] Extract text successfully
- [ ] Generate 5 questions
- [ ] Simulate answering questions
- [ ] Evaluate each answer
- [ ] Get final verdict
- [ ] Save to database
- [ ] View in dashboard

### Cleanup
- [ ] No unused files created
- [ ] No test data in git
- [ ] No sensitive data in logs
- [ ] All temporary files cleaned up

## Sign Off

- [ ] All checklist items completed
- [ ] Integration tested end-to-end
- [ ] Documentation reviewed
- [ ] Ready for development/staging deployment

---

**Date Verified**: _________________

**Verified By**: _________________

**Notes**: 
_________________________________________
_________________________________________
_________________________________________

