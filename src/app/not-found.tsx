"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { allNavItems } from "@/lib/navigation";

export default function NotFound() {
  // 404ページは特殊なため、静的なナビゲーションアイテムを使用
  // ブログリンクは常に含める（実際のナビゲーションメニューでは条件付きでフィルタリングされる）
  const quickLinks = allNavItems.filter((item) => item.href !== "/");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-9xl font-bold">404</h1>
        <h2 className="mb-4 text-3xl font-semibold">Page Not Found</h2>
        <p className="text-foreground/70 mb-8 text-lg">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors"
          >
            <Home className="h-5 w-5" />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="border-border hover:bg-foreground/10 inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        <div className="mt-12">
          <h3 className="text-foreground/60 mb-4 text-sm font-semibold tracking-wide uppercase">
            Quick Links
          </h3>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
