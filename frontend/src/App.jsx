import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CandidateDashboard from "./pages/CandidateDashboard/CandidateDashboard";
import HRDashboard from "./pages/HRDashboard/HRDashboard";
import InterviewScreen from "./pages/InterviewScreen/InterviewScreen";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/global/ProtectedRoute/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected: Candidate only */}
        <Route
          path="/candidates/dashboard"
          element={
            <ProtectedRoute role="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview"
          element={
            <ProtectedRoute role="candidate">
              <InterviewScreen />
            </ProtectedRoute>
          }
        />

        {/* Protected: HR only */}
        <Route
          path="/hr/dashboard"
          element={
            <ProtectedRoute role="hr">
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
