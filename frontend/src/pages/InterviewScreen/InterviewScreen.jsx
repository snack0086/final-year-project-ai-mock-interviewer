import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./InterviewScreen.css";
import API from "../../config";

export default function InterviewScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get("applicationId");
  const jobId = searchParams.get("jobId");

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [interviewTime, setInterviewTime] = useState(0);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [sessionId, setSessionId] = useState(null);
  const [interviewStatus, setInterviewStatus] = useState("pending"); // pending, countdown, in-progress, completed
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState("");

  const candidateVideoRef = useRef(null);
  const aiVideoRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);
  const userInteractedRef = useRef(false);

  // Initialize interview
  useEffect(() => {
    if (!applicationId || !jobId) {
      alert("Missing interview parameters. Redirecting to dashboard.");
      navigate("/candidates/dashboard");
      return;
    }

    fetchInterviewData();

    return () => {
      stopListening();
      stopCamera();
    };
  }, [applicationId, jobId, navigate]);

  // Fetch interview data and start interview
  const fetchInterviewData = async () => {
    try {
      // Get application details
      const appRes = await API.get(`/candidates/applications`);
      const application = appRes.data.data.find(
        (app) => app._id === applicationId
      );

      if (!application || !application.job) {
        throw new Error("Application or job not found");
      }

      const job = application.job;

      // Check if agent is healthy
      const healthRes = await API.get("/interviews/agent-health");
      if (!healthRes.data.data.agentStatus === "healthy") {
        throw new Error("AI Agent is not available");
      }

      // Note: In a real implementation, you would:
      // 1. Get resume context from application
      // 2. Generate questions via backend: POST /api/interviews/generate-questions
      // 3. Start the interview session
      
      // For now, set a simple question flow
      setSessionId(`session-${Date.now()}`);
      setInterviewStatus("countdown");
      startCountdown(3, () => {
        // Start with first question after countdown
        const demoQuestions = [
          "Tell me about yourself and your background.",
          "What interests you about this position?",
          "Describe a challenging project you worked on.",
          "What are your greatest strengths?",
          "Where do you see yourself in 5 years?",
        ];
        setQuestions(demoQuestions);
        setTotalQuestions(demoQuestions.length);
        askNextQuestion(demoQuestions, 0);
      });
    } catch (error) {
      console.error("Error fetching interview data:", error);
      alert("Failed to start interview. Please try again.");
      navigate("/candidates/dashboard");
    }
  };

  // Ask next question in sequence
  const askNextQuestion = (questionsList, index) => {
    if (index >= questionsList.length) {
      // All questions completed
      completeInterview();
      return;
    }

    const question = questionsList[index];
    setCurrentQuestion(question);
    setQuestionIndex(index);
    setInterviewStatus("in-progress");
    setCurrentTranscript("");

    setTimeout(() => {
      speakQuestion(question);
      setTimeout(() => {
        startListening();
      }, 1000);
    }, 300);
  };

  // Start countdown
  const startCountdown = (seconds, onComplete) => {
    let count = seconds;
    setCountdown(count);

    // Test speech synthesis during countdown to ensure it works
    // This helps bypass browser security restrictions
    if (count === 5 && "speechSynthesis" in window) {
      const testUtterance = new SpeechSynthesisUtterance(" ");
      testUtterance.volume = 0;
      window.speechSynthesis.speak(testUtterance);
      window.speechSynthesis.cancel();
    }

    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);

      if (count <= 0) {
        clearInterval(countdownInterval);
        setCountdown(null);
        startCamera();
        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);
  };

  // Complete interview and save results
  const completeInterview = async () => {
    setInterviewStatus("completed");
    stopListening();
    
    try {
      // In a real implementation, you would:
      // 1. Call POST /api/interviews/final-verdict with all Q&A pairs
      // 2. Save evaluation to database via POST /api/interviews/:id/evaluate
      
      alert("Interview completed! Thank you for your time.");
      navigate("/candidates/dashboard");
    } catch (error) {
      console.error("Error completing interview:", error);
      alert("Interview completed but failed to save results.");
      navigate("/candidates/dashboard");
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (candidateVideoRef.current) {
        candidateVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera/microphone. Please check permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Speak question using Web Speech API
  const speakQuestion = (text) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported in this browser");
      alert(`Question: ${text}`); // Fallback: show question in alert
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setIsSpeaking(true);

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "en-US";

    // Add event listeners for debugging
    utterance.onstart = () => {
      console.log("✅ Started speaking:", text);
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      console.log("✅ Finished speaking");
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error("❌ Speech synthesis error:", event.error);
      setIsSpeaking(false);
      // Fallback: show question in console and alert
      console.log("Question (fallback):", text);
      alert(`Question: ${text}`);
    };

    // Try to speak immediately
    try {
      window.speechSynthesis.speak(utterance);
      console.log("🎤 Speaking question:", text);
    } catch (error) {
      console.error("❌ Error speaking:", error);
      setIsSpeaking(false);
      // Fallback
      alert(`Question: ${text}`);
    }
  };

  // Start listening for candidate's answer
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      console.warn("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log("Transcript:", transcript);
      setCurrentTranscript(transcript);
      
      // Store answer and move to next question after a pause
      // In a real implementation, you would:
      // 1. Send to backend for evaluation: POST /api/interviews/evaluate-answer
      // 2. Get evaluation result before moving to next question
      
      setTimeout(() => {
        answers.push({
          question: currentQuestion,
          answer: transcript,
        });
        setAnswers([...answers]);
        
        // Move to next question
        const nextIndex = questionIndex + 1;
        askNextQuestion(questions, nextIndex);
      }, 2000);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "no-speech") {
        // Restart listening if no speech detected
        setTimeout(() => {
          if (interviewStatus === "in-progress") {
            recognition.start();
          }
        }, 1000);
      }
    };

    recognition.onend = () => {
      // Restart listening if interview is still in progress
      if (interviewStatus === "in-progress" && !showEndConfirm) {
        setTimeout(() => {
          recognition.start();
        }, 500);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsRecording(false);
    }
  };

  // Interview timer
  useEffect(() => {
    if (interviewStatus === "in-progress") {
      const timer = setInterval(() => {
        setInterviewTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [interviewStatus]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoOn;
      });
    }
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !isAudioOn;
      });
    }
  };

  const handleEndInterview = () => {
    setShowEndConfirm(true);
  };

  const confirmEndInterview = () => {
    stopListening();
    stopCamera();
    navigate("/candidates/dashboard");
  };

  const cancelEndInterview = () => {
    setShowEndConfirm(false);
  };

  return (
    <div className="interview-screen">
      <div className="interview-header">
        <div className="interview-info">
          <h2>
            <i className="fas fa-video"></i> AI Interview Session
          </h2>
          {interviewStatus === "in-progress" && (
            <div className="interview-timer">
              <i className="fas fa-clock"></i> {formatTime(interviewTime)}
            </div>
          )}
          {countdown !== null && (
            <div className="countdown-display">
              <span className="countdown-number">{countdown}</span>
            </div>
          )}
        </div>
        <div className="interview-status">
          {isRecording && (
            <span className="recording-indicator">
              <i className="fas fa-circle"></i> Recording
            </span>
          )}
          {currentQuestion && (
            <span className="question-indicator">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
          )}
        </div>
      </div>

      <div className="video-container">
        <div className="video-grid">
          {/* AI Video */}
          <div className="video-panel ai-video-panel">
            <div className="video-wrapper">
              <video
                ref={aiVideoRef}
                className="video-element"
                autoPlay
                playsInline
                muted
              >
                {/* AI video stream placeholder */}
              </video>
              <div className="video-placeholder">
                <div className="ai-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <p>AI Interviewer</p>
                {currentQuestion && (
                  <div className="current-question">
                    <p className="question-text">{currentQuestion}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="video-label">
              <i className="fas fa-robot"></i> AI Interviewer
            </div>
          </div>

          {/* Candidate Video */}
          <div className="video-panel candidate-video-panel">
            <div className="video-wrapper">
              {isVideoOn ? (
                <video
                  ref={candidateVideoRef}
                  className="video-element"
                  autoPlay
                  playsInline
                  muted={!isAudioOn}
                >
                  {/* Candidate's camera stream */}
                </video>
              ) : (
                <div className="video-off-overlay">
                  <i className="fas fa-video-slash"></i>
                  <p>Camera Off</p>
                </div>
              )}
            </div>
            <div className="video-label">
              <i className="fas fa-user"></i> You
            </div>
          </div>
        </div>
      </div>

      <div className="interview-controls">
        <div className="control-buttons">
          <button
            className={`control-btn ${isAudioOn ? "active" : "muted"}`}
            onClick={toggleAudio}
            title={isAudioOn ? "Mute" : "Unmute"}
          >
            <i className={`fas fa-microphone${isAudioOn ? "" : "-slash"}`}></i>
          </button>

          <button
            className={`control-btn ${isVideoOn ? "active" : "muted"}`}
            onClick={toggleVideo}
            title={isVideoOn ? "Turn off camera" : "Turn on camera"}
          >
            <i className={`fas fa-video${isVideoOn ? "" : "-slash"}`}></i>
          </button>

          <button
            className={`control-btn ${isRecording ? "recording" : ""}`}
            title={isRecording ? "Recording" : "Not recording"}
            disabled
          >
            <i className="fas fa-circle"></i>
          </button>
        </div>

        <button className="end-interview-btn" onClick={handleEndInterview}>
          <i className="fas fa-phone-slash"></i> End Interview
        </button>
      </div>

      {/* End Interview Confirmation Modal */}
      {showEndConfirm && (
        <div className="end-interview-modal">
          <div className="modal-content">
            <div className="modal-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>End Interview?</h3>
            <p>Are you sure you want to end this interview session? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={cancelEndInterview}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmEndInterview}>
                End Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
