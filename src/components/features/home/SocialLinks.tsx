import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

interface SocialLinksProps {
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  const links = [
    {
      name: "GitHub",
      href: socialLinks.github,
      icon: Github,
      label: "View GitHub profile",
    },
    {
      name: "LinkedIn",
      href: socialLinks.linkedin,
      icon: Linkedin,
      label: "View LinkedIn profile",
    },
    {
      name: "Email",
      href: socialLinks.email ? `mailto:${socialLinks.email}` : undefined,
      icon: Mail,
      label: "Send email",
    },
  ];

  // 有効なリンクのみフィルタリング
  const validLinks = links.filter((link) => link.href);

  if (validLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4">
      {validLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="border-border bg-background hover:bg-foreground/10 flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
          >
            <Icon className="h-5 w-5" />
          </Link>
        );
      })}
    </div>
  );
}
