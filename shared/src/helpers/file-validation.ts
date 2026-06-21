import * as fs from "fs";
import * as path from "path";
import { logger } from "../utils/logger";
import { DEFAULT_CONFIG_FILENAME } from "./constants";

export interface FileValidationOptions {
  defaultFilename?: string;
  fileDescription?: string;
  resolution?: string;
}

export function validateFileExists(
  specifiedFile: string | undefined,
  options: FileValidationOptions = {}
): string {
  const {
    defaultFilename = DEFAULT_CONFIG_FILENAME,
    fileDescription = "JSON file",
    resolution = `Please either:\n` +
      `  1. Create a ${defaultFilename} file in the current directory, or\n` +
      `  2. Specify a ${fileDescription} using the --file or -f option`,
  } = options;

  // Determine the file to use - either specified file or default
  let targetFile: string;
  if (specifiedFile && specifiedFile.trim() !== "") {
    targetFile = path.resolve(specifiedFile);
  } else {
    targetFile = path.resolve(process.cwd(), defaultFilename);
  }

  // Validate that the file exists
  if (!fs.existsSync(targetFile)) {
    logger.error(`File not found: ${targetFile}`);
    if (!specifiedFile || specifiedFile.trim() === "") {
      logger.info(
        `No file specified and default file ${defaultFilename} not found in current directory.\n` +
          resolution
      );
    }
    process.exit(1);
  }

  return targetFile;
}
