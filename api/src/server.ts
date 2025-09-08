import dotenv from "dotenv";
process.env.DOTENV_CONFIG_SILENT = "true";
dotenv.config({ path: ".env.internal" });
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { logger } from "./utils/logger";
import fetchRouter from "./routes/fetch";
import comparePriceRouter from "./routes/compare-price";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/v1", fetchRouter);
app.use("/api/v1", comparePriceRouter);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error("Unhandled error:", err);
    res.status(500).json({
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  }
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`API server running on port ${PORT}`);
    logger.info(`Health check: http://localhost:${PORT}/health`);
  });
}

export default app;
