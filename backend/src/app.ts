import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import applicationRoutes from "./routes/application.route.js";

const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors({
    origin: "*", // In production we should specify the frontend URL, but * is good for development
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

// Healthcheck
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Job Tracker API is running" });
});

export default app;
