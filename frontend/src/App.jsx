import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CandidateDashboard from "./pages/CandidateDashboard/CandidateDashboard";
import HRDashboard from "./pages/HRDashboard/HRDashboard";
import InterviewScreen from "./pages/InterviewScreen/InterviewScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/candidates/dashboard" element={<CandidateDashboard />} />
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/interview" element={<InterviewScreen />} />
      </Routes>
    </BrowserRouter>
    // <Home />
  );
}
