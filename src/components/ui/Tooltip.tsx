"use client";

import { useState, useId, type ReactNode } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="relative inline-block" onClick={handleClick}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </div>

      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-xs -translate-x-1/2 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg dark:bg-gray-700"
        >
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
        </div>
      )}
    </div>
  );
}
