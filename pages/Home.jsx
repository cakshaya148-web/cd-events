// src/pages/Home.jsx

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-white"
      style={{ background: "var(--bg)" }}
    >
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-black mb-4">
          Welcome to <span style={{ color: "var(--primary)" }}>CodeKrafters</span>
        </h1>

        <p className="text-lg opacity-80 mb-8">
          A modern role‑based dashboard platform with global theming, secure
          authentication, and scalable architecture.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-xl font-bold text-base text-white transition hover:opacity-90"
            style={{ background: "var(--primary)" }}
          >
            Go to Dashboard
          </Link>

          <Link
            to="/settings"
            className="px-6 py-3 rounded-xl font-bold text-base text-white transition hover:opacity-90"
            style={{ background: "var(--secondary)" }}
          >
            Open Settings
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
        <FeatureCard
          title="Secure Authentication"
          description="Firebase powered login, register, protected routes, and role‑based access."
        />

        <FeatureCard
          title="Global Theme Engine"
          description="Customize colors in Settings and watch the entire platform update instantly."
        />

        <FeatureCard
          title="Scalable Dashboard"
          description="Built with real SaaS architecture ready for ERP‑level expansion."
        />
      </div>

      {/* Footer */}
      <p className="mt-20 text-sm opacity-60">
        © {new Date().getFullYear()} CodeKrafters. All rights reserved.
      </p>
    </div>
  );
}

/* ---------- Reusable Feature Card ---------- */

function FeatureCard({ title, description }) {
  return (
    <div
      className="rounded-2xl p-6 shadow-lg hover:scale-105 transition text-white"
      style={{ background: "var(--card)" }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="opacity-80 text-sm">{description}</p>
    </div>
  );
}