"use client";

import React, { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  "data-raw"?: string;
}

export function CodeBlock({ children, className, "data-raw": rawCode, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    // Priority 1: Use raw code from data attribute (most reliable)
    let textContent = rawCode;

    // Priority 2: Extract from DOM textContent as fallback
    if (!textContent && preRef.current) {
      textContent = preRef.current.textContent || "";
    }

    // Priority 3: Extract from children (legacy fallback)
    if (!textContent) {
      if (typeof children === "string") {
        textContent = children;
      } else if (React.isValidElement(children)) {
        const codeElement = children as React.ReactElement<{ children?: string }>;
        const code = codeElement.props.children || "";
        textContent = typeof code === "string" ? code : String(code);
      } else {
        textContent = String(children);
      }
    }

    try {
      await navigator.clipboard.writeText(textContent.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="group relative">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="border-border bg-background/80 hover:bg-foreground/10 absolute top-2 right-2 rounded-lg border p-2 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100"
        aria-label="Copy code to clipboard"
        type="button"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
