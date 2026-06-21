import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import {
  StructuredData,
  schemasPageSchema,
} from "@/components/structured-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Schemas",
  description:
    "Schema documentation for StoreConfig JSON files, validation rules, and configuration options.",
  alternates: {
    canonical: "/schemas",
  },
};

function getSchemasContent() {
  try {
    const schemasPath = join(process.cwd(), "lib", "schemas.md");
    return readFileSync(schemasPath, "utf-8");
  } catch {
    return "# Schema Documentation\n\nSchema documentation is not available. Please ensure the build process has copied the schemas.md file.";
  }
}

export default function SchemasPage() {
  const schemasContent = getSchemasContent();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <StructuredData data={schemasPageSchema} />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>JSON Schema File</CardTitle>
          <CardDescription>Download the JSON Schema file</CardDescription>
          <CardAction>
            <a
              href="/storeconfig-schema.json"
              download
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Download
            </a>
          </CardAction>
        </CardHeader>
      </Card>
      <div className="prose-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSlug]}
        >
          {schemasContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
