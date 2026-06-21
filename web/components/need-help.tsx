import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { BookOpen, Terminal, CheckCircle } from "lucide-react";

interface NeedHelpProps {
  hideSections?: {
    documentation?: boolean;
    github?: boolean;
    faq?: boolean;
  };
}

export function NeedHelp({ hideSections = {} }: NeedHelpProps) {
  const sections = [
    {
      key: "documentation",
      icon: <BookOpen className="h-5 w-5" />,
      title: "Documentation",
      description:
        "Browse our comprehensive documentation for detailed guides and examples.",
      href: "/docs",
      hidden: hideSections.documentation,
    },
    {
      key: "github",
      icon: <Terminal className="h-5 w-5" />,
      title: "GitHub Issues",
      description:
        "Report bugs, request features, or get help from the community.",
      href: config.github.issues,
      external: true,
      hidden: hideSections.github,
    },
    {
      key: "faq",
      icon: <CheckCircle className="h-5 w-5" />,
      title: "FAQ",
      description:
        "Find answers to frequently asked questions about StoreConfig.",
      href: "/faq",
      hidden: hideSections.faq,
    },
  ];

  const visibleSections = sections.filter((section) => !section.hidden);

  if (visibleSections.length === 0) {
    return null;
  }

  const getGridCols = () => {
    if (visibleSections.length === 1) return "grid-cols-1";
    if (visibleSections.length === 2) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-3";
  };

  return (
    <section className="mt-16 mb-16">
      <h2 className="text-3xl font-bold mb-8">Need Help?</h2>
      <div className={`grid ${getGridCols()} gap-6`}>
        {visibleSections.map((section) => (
          <Card key={section.key}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
              <p className="text-muted-foreground mb-4">
                {section.description}
              </p>
              <div className="flex justify-center pt-6">
                <Button variant="outline" size="sm" asChild>
                  {section.external ? (
                    <a
                      href={section.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Issue
                    </a>
                  ) : (
                    <Link href={section.href}>
                      {section.key === "documentation"
                        ? "View Docs"
                        : "View FAQ"}
                    </Link>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
