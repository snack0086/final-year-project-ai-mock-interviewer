# API Testing Examples

These examples demonstrate how to test the integration between Frontend → Backend → Agent.

## Prerequisites
- All services running (Agent on :8000, Backend on :5000, Frontend on :5173)
- `curl` or Postman for testing
- Sample resume file (PDF or DOCX)

## 1. Health Checks

### Agent Direct Health Check
```bash
curl http://localhost:8000/health
```
Expected: `{"status":"ok"}`

### Backend Health Check
```bash
curl http://localhost:5000
```
Expected: `{"message":"AI Interviewer API is running","version":"1.0.0"}`

### Agent Health via Backend
```bash
curl http://localhost:5000/api/interviews/agent-health
```
Expected: `{"success":true,"data":{"agentStatus":"healthy"}}`

## 2. Resume Extraction

### Extract Resume Context
```bash
curl -X POST http://localhost:5000/api/interviews/extract-resume \
  -F "resume=@/path/to/your/resume.pdf"
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "resume_context": "John Doe - Software Engineer with 5 years experience...",
    "length": 1234
  }
}
```

### Direct to Agent (for debugging)
```bash
curl -X POST http://localhost:8000/api/v1/resume/context \
  -F "file=@/path/to/your/resume.pdf"
```

## 3. Question Generation

### Generate Questions via Backend
```bash
curl -X POST http://localhost:5000/api/interviews/generate-questions \
  -H "Content-Type: application/json" \
  -d '{
    "resumeContext": "Experienced software engineer with expertise in Python, JavaScript, and React. Built scalable web applications.",
    "role": "Senior Full Stack Developer"
  }'
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "questions": [
      "Can you describe your experience with React and how you've used it in production?",
      "Tell me about a scalable web application you built. What challenges did you face?",
      "How do you approach code reviews and maintaining code quality?",
      "Describe your experience with Python backend development.",
      "What's your approach to testing in full-stack applications?"
    ]
  }
}
```

### Direct to Agent (for debugging)
```bash
curl -X POST http://localhost:8000/api/v1/qgen \
  -H "Content-Type: application/json" \
  -d '{
    "resume_context": "Experienced software engineer...",
    "role": "Senior Developer"
  }'
```

## 4. Answer Evaluation

### Evaluate Single Answer via Backend
```bash
curl -X POST http://localhost:5000/api/interviews/evaluate-answer \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Tell me about yourself and your experience",
    "answer": "I am a software engineer with 5 years of experience in full-stack development. I have worked on various projects using React, Node.js, and Python.",
    "resumeContext": "Software engineer with 5 years experience in web development"
  }'
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "score": 8.5,
    "feedback": "Good answer with specific technologies mentioned",
    "weak_areas": ["Could provide more specific examples"],
    "question": "Tell me about yourself and your experience"
  }
}
```

## 5. Final Verdict

### Get Final Interview Verdict
```bash
curl -X POST http://localhost:5000/api/interviews/final-verdict \
  -H "Content-Type: application/json" \
  -d '{
    "resumeContext": "Software engineer with 5 years experience",
    "role": "Senior Developer",
    "qaPairs": [
      {
        "question": "Tell me about yourself",
        "answer": "I am a software engineer with 5 years of experience",
        "evaluation": {
          "score": 8.5,
          "feedback": "Good answer"
        }
      },
      {
        "question": "What are your strengths?",
        "answer": "Problem solving and teamwork",
        "evaluation": {
          "score": 7.0,
          "feedback": "Could be more specific"
        }
      }
    ]
  }'
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "overall_score": 7.75,
    "should_hire": true,
    "summary": "Strong candidate with good technical background",
    "interpretation": "The candidate demonstrated solid experience...",
    "strengths": ["Technical knowledge", "Communication"],
    "weaknesses": ["Could provide more specific examples"]
  }
}
```

## 6. Complete Interview Flow (Sequential)

### Step 1: Start Interview Session
```bash
curl -X POST http://localhost:5000/api/interviews/start \
  -H "Content-Type: application/json" \
  -d '{
    "candidateId": "candidate123",
    "jobId": "job456"
  }'
```

Save the `interviewId` from response.

### Step 2: Extract Resume
```bash
curl -X POST http://localhost:5000/api/interviews/extract-resume \
  -F "resume=@resume.pdf"
```

### Step 3: Generate Questions
```bash
curl -X POST http://localhost:5000/api/interviews/generate-questions \
  -H "Content-Type: application/json" \
  -d '{
    "resumeContext": "...(from step 2)...",
    "role": "Software Engineer"
  }'
```

### Step 4: Evaluate Each Answer
```bash
# For each question-answer pair
curl -X POST http://localhost:5000/api/interviews/evaluate-answer \
  -H "Content-Type: application/json" \
  -d '{
    "question": "...",
    "answer": "...",
    "resumeContext": "..."
  }'
```

### Step 5: Get Final Verdict
```bash
curl -X POST http://localhost:5000/api/interviews/final-verdict \
  -H "Content-Type: application/json" \
  -d '{
    "resumeContext": "...",
    "qaPairs": [...],
    "role": "..."
  }'
```

### Step 6: Save to Database
```bash
curl -X POST http://localhost:5000/api/interviews/{interviewId}/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "candidateId": "candidate123",
    "jobId": "job456",
    "hrId": "hr789",
    "rating": 7.75,
    "summary": "...",
    "interpretation": "...",
    "shouldHire": true,
    "transcript": [...]
  }'
```

## 7. Error Cases

### Invalid File Type
```bash
curl -X POST http://localhost:5000/api/interviews/extract-resume \
  -F "resume=@image.jpg"
```
Expected: `400 Bad Request` - Only PDF and DOCX files are allowed

### Missing Required Fields
```bash
curl -X POST http://localhost:5000/api/interviews/generate-questions \
  -H "Content-Type: application/json" \
  -d '{}'
```
Expected: `400 Bad Request` - Resume context and role are required

### Agent Not Available
```bash
# Stop the agent first, then:
curl http://localhost:5000/api/interviews/agent-health
```
Expected: `{"success":true,"data":{"agentStatus":"unhealthy"}}`

## 8. Using Postman

### Import Collection
Create a Postman collection with these requests:

1. **Health Check**
   - Method: GET
   - URL: `http://localhost:5000/api/interviews/agent-health`

2. **Extract Resume**
   - Method: POST
   - URL: `http://localhost:5000/api/interviews/extract-resume`
   - Body: form-data with key "resume" and file value

3. **Generate Questions**
   - Method: POST
   - URL: `http://localhost:5000/api/interviews/generate-questions`
   - Body: raw JSON
   ```json
   {
     "resumeContext": "{{resumeContext}}",
     "role": "Software Engineer"
   }
   ```

4. **Evaluate Answer**
   - Method: POST
   - URL: `http://localhost:5000/api/interviews/evaluate-answer`
   - Body: raw JSON

5. **Final Verdict**
   - Method: POST
   - URL: `http://localhost:5000/api/interviews/final-verdict`
   - Body: raw JSON

## 9. Frontend Integration Testing

Open browser console on http://localhost:5173 and run:

```javascript
// Test agent health
const healthRes = await fetch('http://localhost:5000/api/interviews/agent-health');
console.log(await healthRes.json());

// Test question generation
const questionsRes = await fetch('http://localhost:5000/api/interviews/generate-questions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    resumeContext: 'Software engineer with 5 years experience',
    role: 'Senior Developer'
  })
});
console.log(await questionsRes.json());
```

## Troubleshooting

### CORS Errors
- Check agent CORS settings in `agent/app/main.py`
- Verify backend and frontend URLs match environment variables

### Connection Refused
- Ensure all services are running
- Check ports: Agent (8000), Backend (5000), Frontend (5173)
- Verify firewall settings

### 502 Bad Gateway
- Agent is not running or not reachable
- Check `AGENT_URL` in backend `.env`
- Check agent logs for errors

### OpenAI API Errors
- Verify API key is set in agent `.env`
- Check API key has credits
- Review rate limits

## Performance Testing

### Load Test (using `ab` - Apache Bench)
```bash
# Test question generation endpoint
ab -n 10 -c 2 -p question_payload.json -T application/json \
  http://localhost:5000/api/interviews/generate-questions

# question_payload.json:
# {"resumeContext":"...","role":"Developer"}
```

## Monitoring

### Watch Logs in Real-time

**Agent logs:**
```bash
cd agent
uvicorn app.main:app --reload --log-level debug
```

**Backend logs:**
```bash
cd backend
NODE_ENV=development npm run dev
```

The backend will automatically log each request using Morgan middleware.

