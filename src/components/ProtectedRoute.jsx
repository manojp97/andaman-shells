import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function Spinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

export function ProtectedRoute({ children, redirectTo = "/login" }) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <Spinner />;
  }

  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
}

export function AdminRoute({ children, redirectTo = "/admin/login" }) {
  const { isAuthenticated, user, isInitializing } = useAuth();

  if (isInitializing) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
