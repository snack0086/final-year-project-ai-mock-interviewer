# AI Interviewer Backend API

Backend API for the AI Interviewer application built with Node.js and Express.js using MVC architecture.

## Project Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Route controllers (business logic)
├── middleware/      # Custom middleware
├── models/          # Database models (for future use)
├── routes/          # API routes
├── app.js           # Express app configuration
├── server.js        # Server entry point
└── package.json     # Dependencies
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration values.

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Routes

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Candidate Routes (`/api/candidates`)
- `GET /api/candidates/dashboard` - Get candidate dashboard
- `GET /api/candidates/jobs` - Get available jobs
- `GET /api/candidates/applications` - Get candidate applications
- `POST /api/candidates/apply` - Apply for a job
- `POST /api/candidates/upload-resume` - Upload resume

### Job Routes (`/api/jobs`)
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (HR only)
- `PUT /api/jobs/:id` - Update job (HR only)
- `DELETE /api/jobs/:id` - Delete job (HR only)

### Interview Routes (`/api/interviews`)
- `POST /api/interviews/start` - Start interview
- `GET /api/interviews/:id` - Get interview details
- `POST /api/interviews/:id/end` - End interview
- `POST /api/interviews/:id/evaluate` - Evaluate interview (AI)
- `GET /api/interviews/candidate/:candidateId` - Get candidate interviews

### HR Routes (`/api/hr`)
- `GET /api/hr/dashboard` - Get HR dashboard
- `GET /api/hr/jobs/:jobId/candidates` - Get job candidates
- `GET /api/hr/candidates/:candidateId/evaluation` - Get candidate evaluation
- `PUT /api/hr/candidates/:candidateId/status` - Update candidate status

## Architecture

This project follows the **MVC (Model-View-Controller)** pattern:

- **Models**: Data models and database schemas (to be implemented)
- **Views**: API responses (JSON)
- **Controllers**: Business logic and request handling
- **Routes**: API endpoint definitions

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Authentication with JWT
- File upload handling (Multer)
- AI service integration
- WebSocket for real-time interview
- Email notifications
- Data validation (Joi/express-validator)









