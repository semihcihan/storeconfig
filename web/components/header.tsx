"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Github } from "lucide-react";
import { useState } from "react";
import { config } from "@/lib/config";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <div className="flex items-center space-x-4 flex-1">
          <Link href="/" className="flex items-center space-x-2 pl-4">
            <span className="text-xl font-bold">StoreConfig</span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
          <Link
            href="/#hero"
            className="text-md font-medium whitespace-nowrap hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#demo"
            className="text-md font-medium whitespace-nowrap hover:text-primary transition-colors"
          >
            Demo
          </Link>
          <Link
            href="/#features"
            className="text-md font-medium whitespace-nowrap hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#get-started"
            className="text-md font-medium whitespace-nowrap hover:text-primary transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/faq"
            onClick={() => setIsMenuOpen(false)}
            className="text-md font-medium whitespace-nowrap hover:text-primary transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-md font-medium whitespace-nowrap hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMenuOpen(false)}
            className="text-md font-medium whitespace-nowrap hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/docs"
            onClick={() => setIsMenuOpen(false)}
            className="text-md font-medium whitespace-nowrap hover:text-primary transition-colors"
          >
            Documentation
          </Link>
        </nav>

        <div className="flex items-center space-x-2 lg:space-x-4 flex-1 justify-end">
          <Button variant="outline" size="lg" asChild>
            <a
              href={config.github.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span className="hidden md:inline">GitHub</span>
            </a>
          </Button>
          <Button size="sm" asChild>
            <Link href="/docs">
              <span className="hidden sm:inline">Install</span>
              <span className="sm:hidden">Docs</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container mx-auto py-4 space-y-4">
            <Link
              href="/#hero"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium hover:text-primary transition-colors w-full text-left px-4"
            >
              Home
            </Link>
            <Link
              href="/#demo"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium hover:text-primary transition-colors w-full text-left px-4"
            >
              Demo
            </Link>
            <Link
              href="/#features"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium hover:text-primary transition-colors w-full text-left px-4"
            >
              Features
            </Link>
            <Link
              href="/#get-started"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium hover:text-primary transition-colors w-full text-left px-4"
            >
              Get Started
            </Link>
            <Link
              href="/faq"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium hover:text-primary transition-colors px-4"
            >
              FAQ
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium hover:text-primary transition-colors px-4"
            >
              About
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium hover:text-primary transition-colors px-4"
            >
              Blog
            </Link>
            <Link
              href="/docs"
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium hover:text-primary transition-colors px-4"
            >
              Documentation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
