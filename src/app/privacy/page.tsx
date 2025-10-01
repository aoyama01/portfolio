import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for this portfolio website",
};

export default function PrivacyPage() {
  const lastUpdated = "2025-10-01";

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>
      <p className="text-foreground/60 mb-8 text-sm">Last updated: {lastUpdated}</p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
          <p className="text-foreground/70 mb-4">
            This Privacy Policy describes how this personal portfolio website collects, uses, and
            protects your information when you visit our site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
          <p className="text-foreground/70 mb-4">
            We collect minimal information necessary for the operation of this website:
          </p>
          <ul className="text-foreground/70 ml-6 list-disc space-y-2">
            <li>
              <strong>Contact Form Data:</strong> When you submit the contact form, we collect your
              name, email address, and message content.
            </li>
            <li>
              <strong>Analytics Data:</strong> We use analytics tools to understand how visitors
              interact with our site. This includes anonymized data such as page views, time spent
              on pages, and referral sources.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies for analytics purposes and to remember your
              preferences (such as dark mode settings).
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">How We Use Your Information</h2>
          <p className="text-foreground/70 mb-4">We use the collected information to:</p>
          <ul className="text-foreground/70 ml-6 list-disc space-y-2">
            <li>Respond to your inquiries and messages</li>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <li>Improve the website's functionality and user experience</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Prevent spam and abuse</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Data Protection</h2>
          <p className="text-foreground/70 mb-4">
            We implement appropriate security measures to protect your personal information:
          </p>
          <ul className="text-foreground/70 ml-6 list-disc space-y-2">
            <li>Contact form submissions are protected with reCAPTCHA</li>
            <li>All data transmission is encrypted using HTTPS/SSL</li>
            <li>We do not sell or share your personal information with third parties</li>
            <li>Personal data is stored securely and retained only as long as necessary</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Third-Party Services</h2>
          <p className="text-foreground/70 mb-4">
            This website uses the following third-party services:
          </p>
          <ul className="text-foreground/70 ml-6 list-disc space-y-2">
            <li>
              <strong>Vercel Analytics:</strong> For website performance monitoring and analytics
            </li>
            <li>
              <strong>Google reCAPTCHA:</strong> For spam prevention on contact forms
            </li>
          </ul>
          <p className="text-foreground/70 mt-4">
            These services may collect data according to their own privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Your Rights</h2>
          <p className="text-foreground/70 mb-4">You have the right to:</p>
          <ul className="text-foreground/70 ml-6 list-disc space-y-2">
            <li>Request access to your personal data</li>
            <li>Request correction or deletion of your personal data</li>
            <li>Opt out of analytics tracking by using browser do-not-track settings</li>
            <li>Disable cookies in your browser settings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Changes to This Policy</h2>
          <p className="text-foreground/70 mb-4">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            We may update this Privacy Policy from time to time. The "Last updated" date at the top
            of this page indicates when this policy was last revised.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
          <p className="text-foreground/70 mb-4">
            If you have any questions about this Privacy Policy, please contact us through the{" "}
            <a href="/contact" className="text-foreground underline">
              contact form
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
