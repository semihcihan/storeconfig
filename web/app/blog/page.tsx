import Link from "next/link";
import { Metadata } from "next";
import { blogPosts } from "@/lib/blog/posts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Product notes, workflows, and guides for using StoreConfig to automate App Store Connect tasks.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Product notes, workflows, and guides for using StoreConfig.
            </p>
          </div>

          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block"
              >
                <Card className="border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{post.title}</CardTitle>
                      <CardDescription className="text-md">
                        {post.description}
                      </CardDescription>
                      <div className="text-sm text-muted-foreground mt-2">
                        <time dateTime={post.publishedAt}>
                          {post.publishedAt}
                        </time>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground ml-4 flex-shrink-0" />
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
