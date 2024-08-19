import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (requiredRole && requiredRole !== userRole) {
      // If the user's role doesn't match the required role, redirect to a "Not Authorized" page or home
      return <Navigate to="/" />;
    }

    return children; // Render the protected component
  } catch (error) {
    console.error("Token decoding failed:", error);
    return <Navigate to="/login" />; // Redirect to login if decoding fails
  }
};

export default ProtectedRoute;
