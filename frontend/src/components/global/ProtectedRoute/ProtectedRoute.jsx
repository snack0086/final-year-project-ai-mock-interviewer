import { Navigate } from "react-router-dom";

/**
 * Wraps a route and redirects to /login if no token is found.
 * Optionally restricts to a specific role ("hr" or "candidate").
 */
export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Decode the JWT payload (no verification needed client-side, just reading role)
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // If a required role is specified, check it
    if (role && payload.role !== role) {
      // Redirect to the correct dashboard based on actual role
      if (payload.role === "hr") return <Navigate to="/hr/dashboard" replace />;
      if (payload.role === "candidate") return <Navigate to="/candidates/dashboard" replace />;
      return <Navigate to="/login" replace />;
    }
  } catch {
    // Token is malformed — clear and redirect
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}



