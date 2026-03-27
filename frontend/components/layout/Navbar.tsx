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

  const pageTitle = (() => {
    if (router.pathname.startsWith("/dashboard")) return "Dashboard";
    if (router.pathname.startsWith("/products")) return "Products";
    if (router.pathname.startsWith("/settings")) return "Settings";
    return "";
  })();

  return (
    <header className="bg-white h-14 flex items-center justify-between px-6" style={{ borderBottom: '1px solid rgba(195,198,215,0.15)' }}>
      <h2 className="text-sm font-semibold text-[#191c1d] uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
        {pageTitle}
      </h2>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-xs font-medium text-[#434655]">
            {user.email}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-xs font-medium text-[#737686] hover:text-[#ba1a1a] transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
