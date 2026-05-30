import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchIssues = (status) =>
  api.get("/issues", { params: status ? { status } : {} }).then(r => r.data);

export const fetchCounts = () =>
  api.get("/issues/counts").then(r => r.data);

export const createIssue = (data) =>
  api.post("/issues", data).then(r => r.data);

export const updateIssue = (id, data) =>
  api.patch(`/issues/${id}`, data).then(r => r.data);

export const deleteIssue = (id) =>
  api.delete(`/issues/${id}`).then(r => r.data);