import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import Link from "next/link";

interface CTACardProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export function CTACard({ variant = "primary", className = "" }: CTACardProps) {
  const variantClasses = {
    primary: "border-primary/20 bg-primary/5",
    secondary: "border-secondary/20 bg-secondary/5",
  };

  return (
    <Card className={`${variantClasses[variant]} ${className}`}>
      <CardContent className="text-center p-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 no-underline hover:no-underline">
          Ready to Get Started?
        </h2>
        <p className="text-muted-foreground mb-6">
          Join developers who have already saved hundreds of hours with
          StoreConfig.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link href="/docs">Quick Start</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href={config.github.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
