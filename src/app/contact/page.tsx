import { ContactForm } from "@/components/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | Portfolio",
  description: "お問い合わせフォーム。ご質問やご相談がございましたら、お気軽にご連絡ください。",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">お問い合わせ</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          ご質問やご相談がございましたら、以下のフォームからお気軽にお問い合わせください。
          <br />
          通常48時間以内にご返信いたします。
        </p>

        <ContactForm />

        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            その他の連絡方法
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/aoyama01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                @aoyama01
              </a>
            </li>
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/shunya-aoyama"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Shunya Aoyama
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            お問い合わせいただいた内容は、
            <a href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
              プライバシーポリシー
            </a>
            に基づき適切に管理されます。
          </p>
        </div>
      </div>
    </div>
  );
}
