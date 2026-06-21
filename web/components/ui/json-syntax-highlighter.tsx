"use client";

import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { CopyButton } from "@/components/ui/copy-button";

hljs.registerLanguage("json", json);

interface JsonSyntaxHighlighterProps {
  data: unknown;
  className?: string;
  wrapLines?: boolean;
  fontSize?: string;
}

export function JsonSyntaxHighlighter({
  data,
  className,
  wrapLines = true,
  fontSize = "14px",
}: JsonSyntaxHighlighterProps) {
  const codeRef = useRef<HTMLElement>(null);

  const jsonString =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);

  useEffect(() => {
    if (codeRef.current) {
      const highlighted = hljs.highlight(jsonString, {
        language: "json",
      });
      codeRef.current.innerHTML = highlighted.value;
    }
  }, [jsonString]);

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm relative",
        className
      )}
    >
      <div className="absolute top-2 right-2 z-10">
        <CopyButton
          text={jsonString}
          className="bg-transparent hover:bg-white/10 text-white"
        />
      </div>
      <pre
        className="hljs"
        style={{
          margin: 0,
          fontSize,
          lineHeight: "1.6",
          fontFamily:
            "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
          padding: "1.5rem",
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          overflow: wrapLines ? "visible" : "auto",
          whiteSpace: wrapLines ? "pre-wrap" : "pre",
          borderRadius: "0.5rem",
          minHeight: "3rem",
        }}
      >
        <code
          ref={codeRef}
          style={{
            display: "block",
            width: "100%",
          }}
        />
      </pre>
    </div>
  );
}
