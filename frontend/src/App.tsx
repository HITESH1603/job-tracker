import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Applications from "./components/Applications";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Dashboard />
            </AuthenticatedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Applications />
            </AuthenticatedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
