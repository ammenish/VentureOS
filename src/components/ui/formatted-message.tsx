"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FormattedMessageProps {
  content: string;
  isUser?: boolean;
}

export function FormattedMessage({ content, isUser = false }: FormattedMessageProps) {
  if (isUser) {
    return <p className="whitespace-pre-wrap text-xs text-white leading-relaxed">{content}</p>;
  }

  // Pre-process: Clean up any literal <br> or <br/> tags to newlines for markdown
  const cleanedContent = content
    .replace(/<br\s*\/?>/gi, "\n\n")
    .replace(/\|\s*<br\s*\/?>\s*/gi, "|\n");

  return (
    <div className="formatted-message space-y-3 text-xs leading-relaxed text-[#111110]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-sm font-bold text-[#111110] tracking-tight mt-3 mb-1.5 pb-1 border-b border-[#E5E5E0]" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-xs font-bold text-[#111110] uppercase tracking-wider mt-3 mb-1 flex items-center gap-1.5" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-xs font-bold text-[#111110] mt-2.5 mb-1" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="text-[11px] font-bold text-neutral-700 mt-2 mb-0.5" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="my-1.5 leading-relaxed text-neutral-800" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="my-2 space-y-1.5 pl-4 list-disc marker:text-[#111110]" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="my-2 space-y-1.5 pl-4 list-decimal marker:text-[#111110] marker:font-bold" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="pl-1 text-neutral-800 leading-relaxed" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="my-2.5 border-l-2 border-[#111110] bg-[#111110]/[0.03] pl-3 py-1.5 rounded-r-lg text-neutral-700 italic"
              {...props}
            />
          ),
          table: ({ ...props }) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-[#E5E5E0] bg-white shadow-2xs">
              <table className="w-full text-left text-xs border-collapse" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-[#111110] text-white border-b border-[#E5E5E0]" {...props} />
          ),
          tbody: ({ ...props }) => (
            <tbody className="divide-y divide-[#E5E5E0] bg-white/70" {...props} />
          ),
          tr: ({ ...props }) => (
            <tr className="hover:bg-neutral-50/80 transition-colors" {...props} />
          ),
          th: ({ ...props }) => (
            <th className="px-3.5 py-2.5 font-bold text-[11px] tracking-wider text-white" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="px-3.5 py-2.5 text-neutral-700 align-top leading-relaxed text-xs" {...props} />
          ),
          strong: ({ ...props }) => (
            <strong className="font-bold text-[#111110]" {...props} />
          ),
          code: ({ ...props }) => (
            <code className="px-1.5 py-0.5 rounded-md bg-[#111110]/[0.06] text-[#111110] font-mono text-[11px]" {...props} />
          ),
          hr: ({ ...props }) => (
            <hr className="my-3 border-[#E5E5E0]" {...props} />
          ),
        }}
      >
        {cleanedContent}
      </ReactMarkdown>
    </div>
  );
}
