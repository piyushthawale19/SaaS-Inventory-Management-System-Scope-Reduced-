import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";

export function Sidebar() {
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Products", href: "/products" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full sticky top-0">
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600 tracking-tight">
          StockFlow
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = router.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
