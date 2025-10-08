import Link from "next/link";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full before:absolute before:inset-0 before:-z-10 before:bg-white/95 before:backdrop-blur before:supports-[backdrop-filter]:bg-white/60 dark:before:bg-gray-900/95 dark:before:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Portfolio</span>
        </Link>

        {/* Desktop Navigation and Theme Toggle */}
        <div className="flex items-center gap-4">
          <Navigation />
          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
