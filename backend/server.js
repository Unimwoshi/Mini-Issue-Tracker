import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import issueRoutes from "./routes/issues.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/issues", issueRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server on port ${PORT}`));
});