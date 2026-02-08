// src/components/Sidebar.tsx

import React, { useState } from "react";
import { LayoutDashboard, Users, ClipboardCheck, BarChart3 } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

/* ---------- TYPES ---------- */

type NavItemProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  isExpanded: boolean;
};

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

/* ---------- NAV ITEM ---------- */

const NavItem = ({
  label,
  active,
  onClick,
  icon: Icon,
  isExpanded,
}: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      style={active ? { background: "var(--primary)" } : {}}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 whitespace-nowrap group ${
        active
          ? "text-white shadow-lg scale-105"
          : "text-white/60 hover:text-white hover:bg-white/10"
      } ${!isExpanded && "opacity-0 scale-90 pointer-events-none"}`}
    >
      <Icon
        size={16}
        className={`transition-colors ${
          active ? "text-white" : "text-white/60 group-hover:text-[var(--secondary)]"
        }`}
      />
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </button>
  );
};

/* ---------- SIDEBAR ---------- */

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { isOpen } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  const expanded = isHovered || isOpen;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-none">
      {/* Main Island */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ background: "var(--primary)" }} // 🎨 THEME-DRIVEN BACKGROUND
        className={`pointer-events-auto text-white backdrop-blur-2xl
        shadow-[0_25px_60px_rgba(0,0,0,0.5)]
        transition-all duration-700 overflow-hidden
        flex items-center justify-center border border-white/10 ${
          expanded
            ? "w-[760px] h-[84px] rounded-[42px] px-8"
            : "w-[260px] h-[56px] rounded-full px-7"
        }`}
      >
        <div className="flex items-center justify-between w-full relative">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-lg font-bold tracking-tight select-none">
              <span className="text-white">Code</span>
              <span style={{ color: "var(--bg)" }}>Krafters</span>
            </span>

            {expanded && (
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--secondary)" }}
              />
            )}
          </div>

          {/* Navigation */}
          <nav
            className={`flex items-center gap-1 transition-all duration-700 ${
              expanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12 pointer-events-none absolute right-0"
            }`}
          >
            <NavItem
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
              icon={LayoutDashboard}
              isExpanded={expanded}
            />

            <NavItem
              label="Krafters"
              active={activeTab === "members"}
              onClick={() => setActiveTab("members")}
              icon={Users}
              isExpanded={expanded}
            />

            <NavItem
              label="Registry"
              active={activeTab === "attendance"}
              onClick={() => setActiveTab("attendance")}
              icon={ClipboardCheck}
              isExpanded={expanded}
            />

            <NavItem
              label="Insights"
              active={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
              icon={BarChart3}
              isExpanded={expanded}
            />
          </nav>

          {/* Compact Status */}
          {!expanded && (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 scale-90">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--secondary)" }}
              />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/50">
                Active
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Glow */}
      <div
        style={{ background: "var(--primary)" }}
        className={`transition-all duration-1000 -mt-2 blur-[40px] rounded-full opacity-40 ${
          expanded ? "w-[720px] h-10 scale-110" : "w-48 h-4 opacity-0 scale-50"
        }`}
      />
    </div>
  );
}
