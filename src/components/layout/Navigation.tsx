"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();

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

export { navItems };
