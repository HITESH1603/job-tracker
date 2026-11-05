
import type { ReactNode } from "react";
import Navbar from "./Navbar";

type AuthenticatedLayoutProps = {
  children: ReactNode;
};

function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}

export default AuthenticatedLayout;
