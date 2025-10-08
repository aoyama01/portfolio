"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./Navigation";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        <div className="fixed inset-0 top-16 z-40 h-[calc(45vh-4rem)] before:absolute before:inset-0 before:-z-10 before:bg-white/95 before:backdrop-blur before:supports-[backdrop-filter]:bg-white/60 dark:before:bg-gray-900/95 dark:before:supports-[backdrop-filter]:bg-gray-900/60">
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
                    className={`block rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-900 ${
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
          </nav>
        </div>
      )}
    </div>
  );
}
