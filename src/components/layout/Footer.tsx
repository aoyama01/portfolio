import Link from "next/link";
import { getPersonalInfo } from "@/lib/content";
import { getExternalBlogPosts } from "@/lib/external-blog";

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/sitemap.xml", label: "Sitemap", external: true },
];

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const personalInfo = getPersonalInfo();
  const blogPosts = await getExternalBlogPosts();
  const hasBlogPosts = blogPosts.length > 0;

  // Build footer navigation based on blog availability
  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    ...(hasBlogPosts ? [{ href: "/blog", label: "Blog" }] : []),
    { href: "/resume", label: "Resume" },
  ];

  return (
    <footer className="border-border/40 mt-16 w-full border-t sm:mt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Site Navigation */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wide uppercase">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/60 hover:text-foreground text-xs transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wide uppercase">Legal</h3>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-foreground/60 hover:text-foreground text-xs transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          {personalInfo?.socialLinks && (
            <div>
              <h3 className="mb-3 text-xs font-semibold tracking-wide uppercase">Connect</h3>
              <nav className="flex flex-col gap-2">
                {personalInfo.socialLinks.github && (
                  <Link
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-foreground text-xs transition-colors"
                  >
                    GitHub
                  </Link>
                )}
                {personalInfo.socialLinks.linkedin && (
                  <Link
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-foreground text-xs transition-colors"
                  >
                    LinkedIn
                  </Link>
                )}
                {personalInfo.socialLinks.twitter && (
                  <Link
                    href={personalInfo.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-foreground text-xs transition-colors"
                  >
                    Twitter
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="border-border/40 mt-6 border-t pt-6">
          <p className="text-foreground/60 text-center text-xs">
            © {currentYear} {personalInfo?.name || "Portfolio"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
