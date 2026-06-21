"use client";

import { cn } from "@/lib/utils";

interface PricingRow {
  territory: string;
  localCurrency: string;
  appleUsd: string;
  pppUsd?: string;
}

interface PricingComparisonTableProps {
  rows: PricingRow[];
  showPppColumn?: boolean;
  className?: string;
}

export function PricingComparisonTable({
  rows,
  showPppColumn = false,
  className,
}: PricingComparisonTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-separate border-spacing-0 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20 shadow-lg overflow-hidden">
        <thead>
          <tr className="border-b-2 border-primary/30 bg-gradient-to-r from-primary/15 to-primary/10">
            <th className="text-left py-4 px-4 font-semibold text-foreground">
              Territory
            </th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">
              Apple Pricing
              <br />
              <span className="text-xs font-normal text-muted-foreground">
                (Local Currency)
              </span>
            </th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">
              Apple Pricing
              <br />
              <span className="text-xs font-normal text-muted-foreground">
                (USD Equivalent)
              </span>
            </th>
            {showPppColumn && (
              <th className="text-left py-4 px-4 font-semibold text-primary">
                PPP-Based Pricing
                <br />
                <span className="text-xs font-normal text-muted-foreground">
                  (USD Equivalent)
                </span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.territory}
              className={cn(
                "border-b border-primary/10 transition-colors hover:bg-primary/10",
                index % 2 === 0 && "bg-primary/5"
              )}
            >
              <td className="py-4 px-4 font-medium text-foreground">{row.territory}</td>
              <td className="py-4 px-4 text-muted-foreground">
                {row.localCurrency}
              </td>
              <td className="py-4 px-4">
                <span className="font-medium text-foreground">{row.appleUsd}</span>
              </td>
              {showPppColumn && row.pppUsd && (
                <td className="py-4 px-4">
                  <span className="font-semibold text-primary">
                    {row.pppUsd}
                  </span>
                  {parseFloat(row.pppUsd.replace("$", "")) <
                    parseFloat(row.appleUsd.replace("$", "")) && (
                    <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                      ↓
                    </span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
