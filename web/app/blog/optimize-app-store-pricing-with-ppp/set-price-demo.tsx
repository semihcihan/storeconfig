"use client";

import { TerminalDemo, TerminalLine, TerminalOutput, TerminalList, TerminalUserInput } from "@/components/ui/terminal-demo";

export function SetPriceDemo() {
  return (
    <TerminalDemo>
      <TerminalLine prompt="$">storeconfig set-price</TerminalLine>
      <div className="mt-4 space-y-3">
        <div>
          <TerminalOutput>
            ? Select an item:
          </TerminalOutput>
          <TerminalList
            items={[
              'In App Purchase: "Premium Features" (ID: 1234567890)',
              'Subscription: "Monthly Plan" (ID: 0987654321)',
              'App: "My App" (ID: 1122334455)',
            ]}
            selectedIndex={0}
          />
        </div>
        <TerminalOutput>
          ? Enter base price in USD (e.g., 5.99): <TerminalUserInput>9.99</TerminalUserInput>
        </TerminalOutput>
        <div className="mt-3">
          <TerminalOutput>
            ? Select pricing strategy:
          </TerminalOutput>
          <TerminalList
            items={[
              "Apple (uses Apple's standard pricing tiers)",
              "Purchasing Power (uses local purchasing power parity for fair pricing)",
            ]}
            selectedIndex={1}
          />
        </div>
        <TerminalOutput>? Minimum price in USD (optional, press Enter to skip):</TerminalOutput>
      </div>
      <div className="mt-4 text-terminal-cyan">
        ✓ Updated storeconfig.json with pricing changes.
      </div>
    </TerminalDemo>
  );
}
