import { ObjectId } from "mongodb";
import { Issue, validate, STATUSES } from "../models/issue.js";

export async function getCounts(req, res) {
  try {
    const counts = await Issue.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const result = { All: 0, ...Object.fromEntries(STATUSES.map(s => [s, 0])) };
    counts.forEach(({ _id, count }) => {
      result[_id] = count;
      result.All += count;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getIssues(req, res) {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;

    const issues = await Issue.findAll(query);
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createIssue(req, res) {
  try {
    const { title, description, status = "Open", priority = "Medium" } = req.body;

    const error = validate({ title, description, status, priority });
    if (error) return res.status(400).json({ error });

    const issue = { title, description, status, priority, createdAt: new Date() };
    const result = await Issue.insertOne(issue);

    res.status(201).json({ ...issue, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateIssue(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const allowed = ["title", "description", "status", "priority"];
    const updates = Object.fromEntries(
      allowed.filter(f => req.body[f] !== undefined).map(f => [f, req.body[f]])
    );

    const error = validate({ title: "x", description: "x", ...updates });
    if (error) return res.status(400).json({ error });

    const result = await Issue.findOneAndUpdate(id, updates);
    if (!result) return res.status(404).json({ error: "Issue not found" });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteIssue(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

    const result = await Issue.deleteOne(id);
    if (result.deletedCount === 0) return res.status(404).json({ error: "Issue not found" });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}