import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10 hover:border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary" />
          </div>
          <CardTitle className="text-base xl:text-lg group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm xl:text-base">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
