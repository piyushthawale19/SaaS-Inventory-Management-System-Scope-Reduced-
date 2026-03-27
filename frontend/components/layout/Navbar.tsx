import React from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex-1">
        {/* Placeholder for real bredcrumbs or page title mapping */}
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm font-medium text-gray-700">
            {user.email}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
