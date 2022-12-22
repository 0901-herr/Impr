import express from "express";
import cors from "cors";
import dashboard from "./api/dashboard.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// handle the routes
app.use("/api/v1/dashboard", dashboard);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
