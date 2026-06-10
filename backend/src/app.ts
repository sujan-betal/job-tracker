import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes
app.use("/api/user", authRoutes);

// Healthcheck
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK", message: "Job Tracker API is running" });
});

// 404 handler
app.use((req: Request, res: Response) => {
    console.error(`❌ 404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`❌ Error: ${err.message}`);
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

export default app;