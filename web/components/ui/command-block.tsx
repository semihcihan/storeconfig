import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

interface CommandBlockProps {
  command: string;
  className?: string;
}

export function CommandBlock({ command, className }: CommandBlockProps) {
  return (
    <div className={cn("bg-muted p-3 rounded-lg relative mb-4", className)}>
      <code className="text-sm font-mono pr-10 block">{command}</code>
      <div className="absolute top-2 right-2">
        <CopyButton text={command} />
      </div>
    </div>
  );
}
