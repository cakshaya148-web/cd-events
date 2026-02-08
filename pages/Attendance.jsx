import React, { useState, useEffect } from "react";
import { useSidebar } from "../context/SidebarContext";

import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import MembersView from "../components/MembersView";
import AttendanceView from "../components/AttendanceView";
import AnalyticsView from "../components/AnalyticsView";
import Toast from "../components/Toast";

const STORAGE_KEY = "codekrafters_attendance_v1";

const INITIAL_STATE = {
  members: [],
  attendance: [],
};

export default function AttendanceManagement() {
  const { isOpen } = useSidebar();

  /* ---------- Load persisted state ---------- */
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_STATE;
    } catch (e) {
      console.error("Failed to load state", e);
      return INITIAL_STATE;
    }
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [toast, setToast] = useState(null);

  /* ---------- Persist state ---------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  /* ---------- Toast helper ---------- */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  /* ---------- Member actions ---------- */
  const addMember = (name, domain) => {
    const newMember = {
      id: `MK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      name,
      domain,
      joinDate: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }));

    showToast(`Krafter ${name} onboarded successfully!`);
  };

  const deleteMember = (id) => {
    const memberToDelete = state.members.find((m) => m.id === id);
    if (!memberToDelete) return;

    if (
      window.confirm(
        `Remove ${memberToDelete.name}? All attendance data will be deleted.`
      )
    ) {
      setState((prev) => ({
        ...prev,
        members: prev.members.filter((m) => m.id !== id),
        attendance: prev.attendance.filter((a) => a.memberId !== id),
      }));

      showToast(`${memberToDelete.name} has been removed.`, "info");
    }
  };

  /* ---------- Attendance ---------- */
  const markAttendance = (memberId, date, present) => {
    const member = state.members.find((m) => m.id === memberId);
    if (!member) return;

    setState((prev) => {
      const filtered = prev.attendance.filter(
        (a) => !(a.memberId === memberId && a.date === date)
      );

      return {
        ...prev,
        attendance: [...filtered, { memberId, date, present }],
      };
    });

    showToast(`${member.name} marked as ${present ? "PRESENT" : "ABSENT"}`);
  };

  /* ---------- Reset ---------- */
  const resetSystem = () => {
    if (window.confirm("CRITICAL: Wipe all club data? This is irreversible.")) {
      setState(INITIAL_STATE);
      showToast("All system data has been wiped.", "error");
    }
  };

  /* ---------- Content renderer ---------- */
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            state={state}
            onNavigate={setActiveTab}
            onReset={resetSystem}
          />
        );

      case "members":
        return (
          <MembersView
            members={state.members}
            onAdd={addMember}
            onDelete={deleteMember}
          />
        );

      case "attendance":
        return <AttendanceView state={state} onMark={markAttendance} />;

      case "analytics":
        return <AnalyticsView state={state} />;

      default:
        return (
          <Dashboard
            state={state}
            onNavigate={setActiveTab}
            onReset={resetSystem}
          />
        );
    }
  };

  /* ---------- UI ---------- */
  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-all duration-300 ${
        isOpen ? "ml-64" : "ml-20"
      }`}
      style={{
        background: "var(--bg)",        // 🎨 global theme background
        color: "var(--text, #ffffff)",  // 🎨 global text color fallback
      }}
    >
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Main content */}
      <main className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
}
