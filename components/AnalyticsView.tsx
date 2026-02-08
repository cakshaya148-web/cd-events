import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { AppState, Domain } from '../types';
import { AlertCircle, UserX, Users, UserCheck, UserMinus } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

const AnalyticsView: React.FC<{ state: AppState }> = ({ state }) => {

  const latestDate = useMemo(() => {
    const dates = Array.from(new Set(state.attendance.map(a => a.date))).sort();
    return dates.length > 0 ? dates[dates.length - 1] : new Date().toISOString().split('T')[0];
  }, [state.attendance]);

  const domainStats = useMemo(() => {
    return Object.values(Domain).map((domain, index) => {
      const members = state.members.filter(m => m.domain === domain);

      const presentCount = state.attendance.filter(a => {
        const m = state.members.find(mem => mem.id === a.memberId);
        return m?.domain === domain && a.date === latestDate && a.present;
      }).length;

      const absentCount = members.length - presentCount;

      const totalHistorical = state.attendance.filter(a => {
        const m = state.members.find(mem => mem.id === a.memberId);
        return m?.domain === domain && a.present;
      }).length;

      return {
        name: domain,
        members: members.length,
        present: presentCount,
        absent: absentCount,
        totalHistorical,
        color: COLORS[index % COLORS.length]
      };
    });
  }, [state, latestDate]);

  const dailyTrend = useMemo(() => {
    const dates = Array.from(new Set(state.attendance.map(a => a.date))).sort();
    return dates.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: state.attendance.filter(a => a.date === date && a.present).length
    }));
  }, [state]);

  const latestAbsentees = useMemo(() => {
    const presentIds = new Set(
      state.attendance
        .filter(a => a.date === latestDate && a.present)
        .map(a => a.memberId)
    );
    return state.members.filter(m => !presentIds.has(m.id));
  }, [state, latestDate]);

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header>
        <h2 className="text-4xl font-black" style={{ color: "var(--text)" }}>
          Platform Insights
        </h2>
        <p className="text-sm opacity-70" style={{ color: "var(--text)" }}>
          Domain-level analysis for {new Date(latestDate).toLocaleDateString()}
        </p>
      </header>

      {/* DOMAIN CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {domainStats.map(domain => (
          <div
            key={domain.name}
            className="p-6 rounded-3xl border transition"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)"
            }}
          >
            <div className="flex justify-between mb-4">
              <span className="text-[10px] font-bold uppercase opacity-70">
                {domain.name}
              </span>
              <div className="w-2 h-2 rounded-full" style={{ background: domain.color }} />
            </div>

            <StatRow icon={Users} label="Total" value={domain.members} />
            <StatRow icon={UserCheck} label="Present" value={domain.present} color="green" />
            <StatRow icon={UserMinus} label="Absent" value={domain.absent} color="red" />
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* BAR */}
        <Card>
          <h3 className="font-bold mb-6">Registry Pulse</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyTrend}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--text)" />
                <YAxis stroke="var(--text)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--text)"
                  }}
                />
                <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* PIE */}
        <Card>
          <h3 className="font-bold mb-6">Segment Density</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={domainStats.filter(d => d.members > 0)}
                  dataKey="members"
                  innerRadius={60}
                  outerRadius={85}
                >
                  {domainStats.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--text)"
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ABSENTEES */}
      <Card>
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <UserX size={18} /> Recent Absentees
        </h3>

        {latestAbsentees.length ? (
          <div className="space-y-3">
            {latestAbsentees.map(m => (
              <div
                key={m.id}
                className="p-4 rounded-xl border flex justify-between"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-xs opacity-60">{m.domain}</p>
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 opacity-70">
            <AlertCircle className="mx-auto mb-2" />
            Perfect Attendance!
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnalyticsView;

/* ---------- small reusable pieces ---------- */

function Card({ children }: any) {
  return (
    <div
      className="p-8 rounded-3xl border"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        color: "var(--text)"
      }}
    >
      {children}
    </div>
  );
}

function StatRow({ icon: Icon, label, value, color }: any) {
  return (
    <div className="flex justify-between items-center text-sm mb-2">
      <span className="flex items-center gap-2 opacity-70">
        <Icon size={14} className={color === "green" ? "text-green-500" : color === "red" ? "text-red-500" : ""} />
        {label}
      </span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
