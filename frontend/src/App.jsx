import { useState } from "react";
import useIssues from "./hooks/useIssues";
import StatBar from "./components/StatBar";
import IssueCard from "./components/IssueCard";
import IssueForm from "./components/IssueForm";

export default function App() {
  const { issues, counts, activeFilter, setActiveFilter, loading, error, refresh } = useIssues();
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : "light"} style={{ minHeight: "100vh", background: "var(--bg)", padding: 24, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text)", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
            Mini Issue Tracker
          </div>
          <button onClick={() => setDarkMode(p => !p)} style={{ fontSize: 12, color: "var(--muted)", border: "0.5px solid var(--border)", background: "var(--surface)", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
            {darkMode ? "☀ Light mode" : "☾ Dark mode"}
          </button>
        </div>

        <StatBar counts={counts} activeFilter={activeFilter} onFilter={setActiveFilter} />

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["All", "Open", "In Progress", "Resolved"].map(s => (
            <button key={s} onClick={() => setActiveFilter(s)} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 6, border: `0.5px solid ${activeFilter === s ? "var(--accent)" : "var(--border)"}`, background: activeFilter === s ? "var(--accent)" : "transparent", color: activeFilter === s ? "#fff" : "var(--muted)", cursor: "pointer", fontFamily: "inherit" }}>
              {s}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {loading && <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", padding: 24 }}>loading...</div>}
          {error && <div style={{ fontSize: 13, color: "var(--critical)", textAlign: "center", padding: 24 }}>{error}</div>}
          {!loading && !error && issues.length === 0 && (
            <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "center", padding: 24 }}>No issues found.</div>
          )}
          {!loading && issues.map(issue => (
            <IssueCard key={issue._id} issue={issue} onRefresh={refresh} />
          ))}
        </div>

        <IssueForm onRefresh={refresh} />
      </div>
    </div>
  );
}