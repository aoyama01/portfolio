import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function QuickAccessCard({ title, description, href, icon: Icon }: QuickAccessCardProps) {
  return (
    <Link
      href={href}
      className="border-border bg-background group flex flex-col rounded-lg border p-6 transition-all hover:scale-105 hover:shadow-lg"
    >
      {/* Icon */}
      <div className="bg-foreground/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      {/* Description */}
      <p className="text-foreground/70 text-sm">{description}</p>
    </Link>
  );
}
