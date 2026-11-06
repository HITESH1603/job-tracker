import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type GuestRouteProps = {
  children: React.ReactNode;
};

function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p>Restoring your session...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default GuestRoute;