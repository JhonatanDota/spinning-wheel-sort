import React from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export default function Tooltip(props: TooltipProps) {
  const { content, children } = props;

  return (
    <div className="group relative flex flex-col items-center justify-center">
      {children}
      <div className="absolute left-1/2 top-5 min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 text-xs font-medium group-hover:scale-100">
        <div className="flex max-w-xs flex-col items-center shadow-lg">
          <div className="rounded bg-gray-800 p-2 text-center text-xs md:text-sm text-white">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
