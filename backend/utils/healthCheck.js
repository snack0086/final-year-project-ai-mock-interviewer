// Health check utilities for the application
const agentService = require("../services/agentService");

/**
 * Check if all external services are healthy
 */
async function checkServicesHealth() {
  const results = {
    agent: false,
  };

  // Check AI Agent
  try {
    results.agent = await agentService.healthCheck();
  } catch (error) {
    console.error("❌ AI Agent health check failed:", error.message);
  }

  return results;
}

/**
 * Log service health status
 */
async function logServiceStatus() {
  console.log("\n🔍 Checking external services...");
  
  const health = await checkServicesHealth();

  console.log("\n📊 Service Status:");
  console.log("─────────────────────────────");
  
  if (health.agent) {
    console.log("✅ AI Agent: Healthy");
  } else {
    console.log("❌ AI Agent: Unavailable");
    console.log("   Make sure the Python agent is running on:", 
                process.env.AGENT_URL || "http://localhost:8000");
  }
  
  console.log("─────────────────────────────\n");

  return health;
}

/**
 * Perform startup health checks
 */
async function startupHealthCheck() {
  const health = await logServiceStatus();
  
  if (!health.agent) {
    console.warn("⚠️  Warning: AI Agent is not available. Interview features will not work.");
    console.warn("   Start the agent with: cd agent && uvicorn app.main:app --reload\n");
  } else {
    console.log("✅ All services are healthy and ready!\n");
  }
}

module.exports = {
  checkServicesHealth,
  logServiceStatus,
  startupHealthCheck,
};

