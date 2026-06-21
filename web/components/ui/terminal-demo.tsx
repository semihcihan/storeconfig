"use client";

import { cn } from "@/lib/utils";

interface TerminalDemoProps {
  children: React.ReactNode;
  className?: string;
}

export function TerminalDemo({ children, className }: TerminalDemoProps) {
  return (
    <div
      className={cn(
        "bg-[#1e1e1e] rounded-lg p-6 font-mono text-sm text-[#d4d4d4] shadow-lg border border-[#3e3e3e]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface TerminalLineProps {
  children: React.ReactNode;
  prompt?: string;
  className?: string;
}

export function TerminalLine({
  children,
  prompt = "$",
  className,
}: TerminalLineProps) {
  return (
    <div className={cn("flex items-start gap-2 mb-2", className)}>
      <span className="text-terminal-cyan flex-shrink-0">{prompt}</span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

interface TerminalOutputProps {
  children: React.ReactNode;
  className?: string;
}

export function TerminalOutput({ children, className }: TerminalOutputProps) {
  return (
    <div className={cn("text-terminal-orange mb-2", className)}>{children}</div>
  );
}

interface TerminalUserInputProps {
  children: React.ReactNode;
  className?: string;
}

export function TerminalUserInput({ children, className }: TerminalUserInputProps) {
  return (
    <span className={cn("text-terminal-cyan font-semibold", className)}>{children}</span>
  );
}

interface TerminalListProps {
  items: string[];
  selectedIndex?: number;
  className?: string;
}

export function TerminalList({
  items,
  selectedIndex,
  className,
}: TerminalListProps) {
  return (
    <div className={cn("space-y-1 mt-2", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "pl-4 py-0.5 relative"
          )}
        >
          {selectedIndex === index && (
            <span className="text-terminal-cyan absolute left-0">{">"}</span>
          )}
          <span className={cn(
            selectedIndex === index && "text-terminal-cyan"
          )}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

interface TerminalPromptProps {
  question: string;
  answer?: string;
  className?: string;
}

export function TerminalPrompt({
  question,
  answer,
  className,
}: TerminalPromptProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="text-terminal-cyan">{question}</div>
      {answer && (
        <div className="text-terminal-orange pl-4">{answer}</div>
      )}
    </div>
  );
}
