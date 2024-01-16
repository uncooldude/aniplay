import { config } from "dotenv";
import chalk from "chalk";
import express from "express";
import cors from "cors";
import database from "./utils/database.js";
import authRouter from "./routes/auth-router.js";

config();
database();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "*",
  })
);
app.use(express.json());
app.use("/api/v1", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ status: 200 });
});

app.listen(PORT, () => {
  console.log(chalk.cyan(`[server] ${PORT}`));
});
