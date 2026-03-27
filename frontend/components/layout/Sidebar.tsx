import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: GridIcon },
  { label: "Products", href: "/products", icon: BoxIcon },
  { label: "Settings", href: "/settings", icon: GearIcon },
];

export function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-[#f3f4f5] flex flex-col h-full sticky top-0">
      <div className="px-6 py-5">
        <Link href="/dashboard" className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif', color: '#004ac6' }}>
          StockFlow
        </Link>
      </div>

      <nav className="flex-1 px-3 pt-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = router.pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#dbe1ff] text-[#004ac6]"
                  : "text-[#434655] hover:bg-[#edeeef]"
              }`}
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded-md ${isActive ? 'bg-[#acbfff]' : 'bg-[#edeeef]'}`}>
                <Icon size={16} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function GridIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="1.5" width="5" height="5" rx="1" />
      <rect x="1.5" y="9.5" width="5" height="5" rx="1" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    </svg>
  );
}

function BoxIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5l6-3 6 3-6 3-6-3z" />
      <path d="M2 5v6l6 3V8" />
      <path d="M14 5v6l-6 3V8" />
    </svg>
  );
}

function GearIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M6.7 1.6l-.3 1.3a4.5 4.5 0 00-1.5.9L3.6 3.3l-1.3 2.2 1 .9a4.6 4.6 0 000 1.8l-1 .9 1.3 2.2 1.3-.5a4.5 4.5 0 001.5.9l.3 1.3h2.6l.3-1.3a4.5 4.5 0 001.5-.9l1.3.5 1.3-2.2-1-.9a4.6 4.6 0 000-1.8l1-.9-1.3-2.2-1.3.5a4.5 4.5 0 00-1.5-.9L9.3 1.6H6.7z" />
    </svg>
  );
}
