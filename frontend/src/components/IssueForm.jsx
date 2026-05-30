import { useState } from "react";
import { createIssue } from "../api/issues";

const initial = { title: "", description: "", status: "Open", priority: "Medium" };

export default function IssueForm({ onRefresh }) {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.title || !form.description) return setError("Title and description are required.");
    setSubmitting(true);
    setError(null);
    try {
      await createIssue(form);
      setForm(initial);
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: 10, padding: 20 }}>
      <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 16, letterSpacing: "0.03em" }}>Log New Issue</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <div className="form-label">Title</div>
          <input className="form-input" name="title" value={form.title} onChange={handleChange} placeholder="Brief summary of the issue" />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <div className="form-label">Description</div>
          <textarea className="form-input form-textarea" name="description" value={form.description} onChange={handleChange} placeholder="Steps to reproduce, expected vs actual behaviour..." />
        </div>
        <div>
          <div className="form-label">Status</div>
          <select className="form-input" name="status" value={form.status} onChange={handleChange}>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
        <div>
          <div className="form-label">Priority</div>
          <select className="form-input" name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
      </div>
      {error && <div style={{ fontSize: 12, color: "var(--critical)", marginBottom: 8 }}>{error}</div>}
      <button onClick={handleSubmit} disabled={submitting} style={{ width: "100%", padding: 9, background: "var(--accent)", border: "none", borderRadius: 6, color: "#fff", fontSize: 13, fontFamily: "inherit", cursor: "pointer", letterSpacing: "0.03em", opacity: submitting ? 0.6 : 1 }}>
        {submitting ? "submitting..." : "submit issue"}
      </button>
    </div>
  );
}