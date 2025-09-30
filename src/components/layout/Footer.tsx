import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border/40 bg-background w-full border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between md:py-6 lg:px-8">
        {/* Copyright */}
        <p className="text-foreground/60 text-sm">
          © {currentYear} Portfolio. All rights reserved.
        </p>

        {/* Footer Navigation */}
        <nav className="flex gap-6 text-sm">
          <Link
            href="/privacy"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/sitemap.xml"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            Sitemap
          </Link>
          <Link
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  );
}
