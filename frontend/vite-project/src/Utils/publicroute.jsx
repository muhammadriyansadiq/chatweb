import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {

    return <Navigate to="/" />; // Redirect to the home page or any other protected route
    
  }
  return children;
};

export default PublicRoute;
