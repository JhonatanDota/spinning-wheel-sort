import React from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 mb-2 w-max max-w-xs -translate-x-1/2 scale-0 transform transition-all duration-150 group-hover:scale-100 z-50">
        <div className="rounded-lg bg-gray-800 px-3 py-2 text-center text-xs md:text-sm text-white shadow-lg">
          {content}
        </div>
      </div>
    </div>
  );
}
