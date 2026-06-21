import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

interface SnippetBlockProps {
  text: string;
  className?: string;
  language?: string;
}

export function SnippetBlock({ text, className }: SnippetBlockProps) {
  return (
    <div
      className={cn(
        "bg-muted border border-border/60 p-4 rounded-lg relative mb-4",
        className
      )}
    >
      <pre className="text-sm font-mono whitespace-pre-wrap break-words pr-10">
        {text}
      </pre>
      <div className="absolute top-2 right-2">
        <CopyButton text={text} />
      </div>
    </div>
  );
}
