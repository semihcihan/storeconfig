import { DocsPageClient } from "./client";
import { Metadata } from "next";
import { Suspense } from "react";
import {
  StructuredData,
  docsArticleSchema,
  docsHowToSchema,
} from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Get started with StoreConfig using guides, command references, and schema documentation for App Store Connect automation.",
  alternates: {
    canonical: "/docs",
  },
};

export default function DocsPage() {
  return (
    <>
      <StructuredData data={docsArticleSchema} id="docs-article" />
      <StructuredData data={docsHowToSchema} id="docs-howto" />
      <Suspense
        fallback={
          <div className="py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto text-center">
                <div className="mb-8">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <div className="h-8 w-8 text-blue-600 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                  </div>
                  <h1 className="text-3xl font-bold mb-4">
                    Loading Documentation...
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Please wait while we load the documentation...
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <DocsPageClient />
      </Suspense>
    </>
  );
}
