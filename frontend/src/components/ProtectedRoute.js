import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
