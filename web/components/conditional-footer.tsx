"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on home page since it's included in the features section
  if (pathname === "/") {
    return null;
  }
  
  return <Footer />;
}
