import { schemaContent } from "../generated/schemaContent";

export function getSchemaContent(): string {
  return JSON.stringify(schemaContent);
}
