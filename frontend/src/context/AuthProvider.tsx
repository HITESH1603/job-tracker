import { useState } from "react";
import type { ReactNode } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = user !== null;

  async function login(email: string, password: string) {
    const data = await loginUser({ email, password });

    setUser(data.user);
    sessionStorage.setItem("user", JSON.stringify(data.user));
  }

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}