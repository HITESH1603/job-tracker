import { useAuth } from "../context/AuthContext";
import { UserRound, Mail, Hash, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  if (!user) {
    return <p className="p-6">User information unavailable.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-gray-500">View your account information.</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 border-b pb-6">
          <div className="rounded-full bg-blue-100 p-4">
            <UserRound size={32} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-5 pt-6">
          <div className="flex items-center gap-4">
            <Mail size={20} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email address</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Hash size={20} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Account ID</p>
              <p className="font-medium text-gray-900">{user.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <h2 className="font-semibold text-gray-900">Account actions</h2>
        <p className="mt-1 text-sm text-gray-500">
          Sign out of your Job Tracker account.
        </p>

        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
