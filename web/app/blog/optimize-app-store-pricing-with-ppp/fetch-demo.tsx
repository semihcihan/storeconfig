"use client";

import { TerminalDemo, TerminalLine, TerminalOutput, TerminalList } from "@/components/ui/terminal-demo";

export function FetchDemo() {
  return (
    <TerminalDemo>
      <TerminalLine prompt="$">storeconfig fetch</TerminalLine>
      <TerminalOutput>No app ID provided. Fetching available apps...</TerminalOutput>
      <div className="mt-4 mb-4">
        <TerminalOutput>Select the app you want to fetch:</TerminalOutput>
        <TerminalList
          items={[
            "1. Fit & Fill",
            "2. My Other App",
            "3. Test App",
          ]}
          selectedIndex={0}
        />
      </div>
      <TerminalOutput className="mt-2">Fetching details for app ID: 1234567890 and writing to storeconfig.json</TerminalOutput>
      <TerminalOutput className="mt-2 text-terminal-cyan">✓ Successfully fetched app: /path/to/storeconfig.json</TerminalOutput>
    </TerminalDemo>
  );
}
