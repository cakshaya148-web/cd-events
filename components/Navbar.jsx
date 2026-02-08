import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useSidebar } from "../context/SidebarContext";
import {
  Home,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
  ListTodo,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  const shouldExpand = isOpen || isHovered;

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Attendance", icon: ClipboardList, path: "/attendance" },
    { label: "Events", icon: Calendar, path: "/events" },
    { label: "Tasks", icon: ListTodo, path: "/tasks" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen shadow-lg z-50 transition-all duration-700 ease-in-out flex flex-col ${
        shouldExpand ? "w-64" : "w-20"
      }`}
      style={{ background: "var(--primary)" }}   // 🎨 THEME CONNECTED
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="p-6 border-b flex items-center justify-between gap-2 border-white/10">
        {shouldExpand && (
          <h1 className="text-3xl font-black tracking-wide">
            <span style={{ color: "var(--bg)" }}>Code</span>
            <span className="text-white">Krafters</span>
          </h1>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg transition-colors text-white/80 hover:bg-white/10"
          title={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Subtitle */}
      {shouldExpand && (
        <p className="text-xs font-bold text-white/60 px-6 uppercase tracking-widest">
          Attendance System
        </p>
      )}

      {/* Navigation */}
      <nav className="p-4 space-y-2 mt-6 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-white/70 hover:text-white"
            style={{}}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
            title={!shouldExpand ? item.label : ""}
          >
            <item.icon size={20} />
            {shouldExpand && <span className="font-bold">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className={`${shouldExpand ? "p-4" : "p-2"} border-t border-white/10`}>
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white font-semibold transition ${
            !shouldExpand && "justify-center"
          }`}
          style={{ background: "var(--primary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--secondary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--primary)")
          }
          title={!shouldExpand ? "Logout" : ""}
        >
          <LogOut size={20} />
          {shouldExpand && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
