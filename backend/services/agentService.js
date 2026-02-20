const axios = require("axios");

// Agent service URL from environment variable or default
const AGENT_URL = process.env.AGENT_URL || "http://localhost:8000";

/**
 * Service to communicate with Python AI Agent
 */
class AgentService {
  constructor() {
    this.baseURL = `${AGENT_URL}/api/v1`;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30 seconds timeout
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Extract text context from resume file
   * @param {Buffer} fileBuffer - Resume file buffer
   * @param {String} filename - Original filename
   * @returns {Promise<{resume_context: string, length: number}>}
   */
  async extractResumeContext(fileBuffer, filename) {
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("file", fileBuffer, filename);

      const response = await axios.post(`${this.baseURL}/resume/context`, formData, {
        headers: formData.getHeaders(),
        timeout: 30000,
      });

      return response.data;
    } catch (error) {
      console.error("Error extracting resume context:", error.message);
      throw new Error(
        error.response?.data?.detail || "Failed to extract resume context"
      );
    }
  }

  /**
   * Generate interview questions based on resume and role
   * @param {String} resumeContext - Extracted resume text
   * @param {String} role - Job role/title
   * @returns {Promise<{questions: string[]}>}
   */
  async generateQuestions(resumeContext, role) {
    try {
      const response = await this.client.post("/qgen", {
        resume_context: resumeContext,
        role: role,
      });

      return response.data;
    } catch (error) {
      console.error("Error generating questions:", error.message);
      throw new Error(
        error.response?.data?.detail || "Failed to generate questions"
      );
    }
  }

  /**
   * Evaluate a single answer
   * @param {String} question - Interview question
   * @param {String} answer - Candidate's answer
   * @param {String} resumeContext - Resume context for reference
   * @returns {Promise<Object>} Evaluation result
   */
  async evaluateAnswer(question, answer, resumeContext) {
    try {
      const response = await this.client.post("/evaluate", {
        question,
        answer,
        resume_context: resumeContext,
      });

      return response.data;
    } catch (error) {
      console.error("Error evaluating answer:", error.message);
      throw new Error(
        error.response?.data?.detail || "Failed to evaluate answer"
      );
    }
  }

  /**
   * Get final interview verdict
   * @param {String} resumeContext - Resume context
   * @param {Array} qaPairs - Array of {question, answer, evaluation} objects
   * @param {String} role - Job role
   * @returns {Promise<Object>} Final verdict with score and recommendation
   */
  async getFinalVerdict(sessionContext, role) {
    try {
      const response = await this.client.post("/verdict", {
        session_context: sessionContext,
        role: role,
      });

      return response.data;
    } catch (error) {
      console.error("Error getting final verdict:", error.message);
      throw new Error(
        error.response?.data?.detail || "Failed to get interview verdict"
      );
    }
  }

  /**
   * Synthesize text to speech
   * @param {String} text - Text to convert to speech
   * @returns {Promise<{audio: string}>} Base64 encoded audio
   */
  async textToSpeech(text) {
    try {
      const response = await this.client.post("/tts", {
        text,
      });

      return response.data;
    } catch (error) {
      console.error("Error in text-to-speech:", error.message);
      throw new Error(
        error.response?.data?.detail || "Failed to synthesize speech"
      );
    }
  }

  /**
   * Convert speech to text
   * @param {Buffer} audioBuffer - Audio file buffer
   * @param {String} filename - Original filename
   * @returns {Promise<{text: string}>}
   */
  async speechToText(audioBuffer, filename) {
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("file", audioBuffer, filename);

      const response = await axios.post(`${this.baseURL}/stt`, formData, {
        headers: formData.getHeaders(),
        timeout: 30000,
      });

      return response.data;
    } catch (error) {
      console.error("Error in speech-to-text:", error.message);
      throw new Error(
        error.response?.data?.detail || "Failed to transcribe speech"
      );
    }
  }

  /**
   * Health check for agent service
   * @returns {Promise<boolean>}
   */
  async healthCheck() {
    try {
      const response = await axios.get(`${AGENT_URL}/health`, {
        timeout: 5000,
      });
      return response.data.status === "ok";
    } catch (error) {
      console.error("Agent health check failed:", error.message);
      return false;
    }
  }
}

// Export singleton instance
module.exports = new AgentService();

