import { ObjectId } from "mongodb";
import { getDB } from "../db.js";

export const STATUSES = ["Open", "In Progress", "Resolved"];
export const PRIORITIES = ["Low", "Medium", "High", "Critical"];

const col = () => getDB().collection("issues");

export function validate({ title, description, status, priority }) {
  if (!title || !description) return "Title and description are required";
  if (status && !STATUSES.includes(status)) return "Invalid status";
  if (priority && !PRIORITIES.includes(priority)) return "Invalid priority";
  return null;
}

export const Issue = {
  findAll: (query = {}) => col().find(query).sort({ createdAt: -1 }).toArray(),
  aggregate: (pipeline) => col().aggregate(pipeline).toArray(),
  insertOne: (doc) => col().insertOne(doc),
  findOneAndUpdate: (id, updates) =>
    col().findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updates }, { returnDocument: "after" }),
  deleteOne: (id) => col().deleteOne({ _id: new ObjectId(id) }),
};