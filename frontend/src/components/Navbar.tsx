import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
      <h1 className="text-xl font-bold text-gray-900">JobTracker</h1>

      <div className="flex gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/applications" className="text-gray-700 hover:text-blue-600">
          Applications
        </Link>

        <a href="/profile" className="text-gray-700 hover:text-blue-600">
          Profile
        </a>

        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
