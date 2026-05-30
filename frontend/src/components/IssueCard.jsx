import { updateIssue, deleteIssue } from "../api/issues";

const statusColor = { Open: "open", "In Progress": "inprog", Resolved: "resolved" };
const priorityColor = { Critical: "critical", High: "high", Medium: "medium", Low: "low" };

const STATUSES = ["Open", "In Progress", "Resolved"];

export default function IssueCard({ issue, onRefresh }) {
  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date);
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const handleStatusChange = async (e) => {
    await updateIssue(issue._id, { status: e.target.value });
    onRefresh();
  };

  const handleDelete = async () => {
    await deleteIssue(issue._id);
    onRefresh();
  };

  return (
    <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: 8, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 4 }}>{issue.title}</div>
        <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{issue.description}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <span className={`badge ${statusColor[issue.status]}`}>{issue.status}</span>
          <span className={`badge ${priorityColor[issue.priority]}`}>{issue.priority}</span>
          <span style={{ fontSize: 11, color: "#555" }}>{timeAgo(issue.createdAt)}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <select
          value={issue.status}
          onChange={handleStatusChange}
          style={{ fontSize: 11, background: "var(--surface2)", border: "0.5px solid var(--border)", borderRadius: 6, padding: "4px 6px", color: "var(--muted)", fontFamily: "inherit", cursor: "pointer" }}
        >
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={handleDelete} style={{ background: "transparent", border: "0.5px solid var(--border)", borderRadius: 6, padding: "5px 7px", color: "var(--muted)", cursor: "pointer" }}>
          <i className="ti ti-trash" />
        </button>
      </div>
    </div>
  );
}