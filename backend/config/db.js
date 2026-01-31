const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai_interviewer";

    const conn = await mongoose.connect(MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME || "ai_interviewer",
    });

    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;









