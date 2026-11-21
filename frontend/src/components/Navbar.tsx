import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-semibold text-blue-600"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-gray-900">
          JobTracker
        </Link>

        <div className="flex gap-4 text-sm sm:gap-6 sm:text-base">
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/applications" className={navLinkClass}>
            Applications
          </NavLink>

          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
