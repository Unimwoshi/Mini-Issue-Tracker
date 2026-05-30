import { useState, useEffect, useCallback } from "react";
import { fetchIssues, fetchCounts } from "../api/issues";

export default function useIssues() {
  const [issues, setIssues] = useState([]);
  const [counts, setCounts] = useState({ All: 0, Open: 0, "In Progress": 0, Resolved: 0 });
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [issueData, countData] = await Promise.all([
        fetchIssues(activeFilter === "All" ? null : activeFilter),
        fetchCounts(),
      ]);
      setIssues(issueData);
      setCounts(countData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => { load(); }, [load]);

  return { issues, counts, activeFilter, setActiveFilter, loading, error, refresh: load };
}