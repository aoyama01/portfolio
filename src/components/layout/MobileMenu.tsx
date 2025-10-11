"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getFilteredNavItems } from "@/lib/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface MobileMenuProps {
  hasBlogPosts: boolean;
}

export function MobileMenu({ hasBlogPosts }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getFilteredNavItems(hasBlogPosts);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-foreground/60 hover:bg-foreground/10 hover:text-foreground focus:ring-foreground inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:outline-none focus:ring-inset"
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <span className="sr-only">Open main menu</span>
        {!isOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Fullscreen */}
      {isOpen && (
        <div className="fixed top-16 right-0 left-0 z-40 before:absolute before:inset-0 before:-z-10 before:bg-white/95 before:backdrop-blur before:supports-[backdrop-filter]:bg-white/60 dark:before:bg-gray-900/95 dark:before:supports-[backdrop-filter]:bg-gray-900/60">
          {/* Navigation Links */}
          <nav className="flex h-full flex-col px-4 py-6">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`block rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50 ${
                      isActive
                        ? "bg-foreground/10 text-foreground"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle at bottom right */}
            <div className="mt-auto flex justify-end">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
