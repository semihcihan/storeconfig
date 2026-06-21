import dotenv from "dotenv";
process.env.DOTENV_CONFIG_SILENT = "true";
dotenv.config({ path: ".env.internal" });
dotenv.config();

// Set environment variable to identify this as Express server
process.env.EXPRESS_SERVER = "true";

// Import logger configuration first
import "./helpers/logging";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { logger } from "@semihcihan/shared";
import { z } from "zod";
import fetchRouter from "./routes/fetch";
import fetchAppsRouter from "./routes/fetch-apps";
import comparePriceRouter from "./routes/compare-price";
import diffRouter from "./routes/diff";
import applyRouter from "./routes/apply";
import pricePointsRouter from "./routes/price-points";
import applyPricingRouter from "./routes/apply-pricing";

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

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
app.use(fetchRouter);
app.use(fetchAppsRouter);
app.use(comparePriceRouter);
app.use(diffRouter);
app.use(applyRouter);
app.use(pricePointsRouter);
app.use(applyPricingRouter);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error("Unhandled error:", err);

    // Handle validation errors specifically
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation error",
        details: err.issues,
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: err.message || "Something went wrong",
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
