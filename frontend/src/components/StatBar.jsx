const stats = ["All", "Open", "In Progress", "Resolved"];

export default function StatBar({ counts, activeFilter, onFilter }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
      {stats.map(s => (
        <div
          key={s}
          onClick={() => onFilter(s)}
          style={{
            background: "var(--surface)",
            border: `0.5px solid ${activeFilter === s ? "var(--accent)" : "var(--border)"}`,
            borderRadius: 8,
            padding: "14px 16px",
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{s}</div>
          <div style={{
            fontSize: 26,
            fontWeight: 500,
            color: s === "Open" ? "var(--open)" : s === "In Progress" ? "var(--inprog)" : s === "Resolved" ? "var(--resolved)" : "var(--text)"
          }}>
            {counts[s] ?? 0}
          </div>
        </div>
      ))}
    </div>
  );
}