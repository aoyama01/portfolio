"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getFilteredNavItems } from "@/lib/navigation";

interface NavigationProps {
  hasBlogPosts: boolean;
}

export function Navigation({ hasBlogPosts }: NavigationProps) {
  const pathname = usePathname();
  const navItems = getFilteredNavItems(hasBlogPosts);

  return (
    <nav className="hidden md:flex md:gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:text-foreground/80 text-sm font-medium transition-colors ${
              isActive ? "text-foreground" : "text-foreground/60"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
