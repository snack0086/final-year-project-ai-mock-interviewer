const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { startupHealthCheck } = require("./utils/healthCheck");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  
  // Check external services health
  await startupHealthCheck();
});

