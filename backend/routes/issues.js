import { Router } from "express";
import { getCounts, getIssues, createIssue, updateIssue, deleteIssue } from "../controllers/issueController.js";

const router = Router();

router.get("/counts", getCounts);
router.get("/", getIssues);
router.post("/", createIssue);
router.patch("/:id", updateIssue);
router.delete("/:id", deleteIssue);

export default router;