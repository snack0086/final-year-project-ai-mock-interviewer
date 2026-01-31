# Environment Setup for Backend

Create a `.env` file in the `/backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/ai_interviewer

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d

# Cloudinary Configuration (for resume uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# AI Agent Service URL
AGENT_URL=http://localhost:8000
```

## Configuration Details:

- **PORT**: Backend server port (default: 5000)
- **NODE_ENV**: development or production
- **MONGO_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT token generation
- **JWT_EXPIRE**: Token expiration time
- **CLOUDINARY_***: Cloudinary credentials for file uploads
- **AGENT_URL**: URL of the Python AI Agent service (default: http://localhost:8000)

