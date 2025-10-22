import dotenv from "dotenv";
import path from "path";

// Load .env from CLI package directory (go up one level from dist/)
process.env.DOTENV_CONFIG_SILENT = "true";
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../.env") });
