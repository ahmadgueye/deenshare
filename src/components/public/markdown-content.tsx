import { isValidElement } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { flattenToText, isMostlyArabic } from "@/lib/arabic-text";
import { cn } from "@/lib/utils";

/**
 * Noto Naskh Arabic reads visibly smaller than the Latin body fonts at the
 * same font-size (shorter x-height), so RTL blocks get a relative bump on
 * top of whatever size the surrounding content is using — this keeps it
 * scaling with the reader's font-size control instead of looking static.
 */
const ARABIC_SCALE = "text-[1.2em] leading-loose";

/** Adds RTL/Arabic-font attributes to a block when its text is majority Arabic. */
function rtlProps(children: React.ReactNode) {
  const rtl = isMostlyArabic(flattenToText(children));
  return {
    rtl,
    dir: rtl ? ("rtl" as const) : undefined,
    lang: rtl ? "ar" : undefined,
  };
}

const components: Components = {
  h1: ({ children }) => {
    const { rtl, dir, lang } = rtlProps(children);
    return (
      <h1
        dir={dir}
        lang={lang}
        className={cn(
          "mt-6 mb-3 font-heading text-[1.3em] font-semibold first:mt-0",
          rtl && "text-right font-arabic",
        )}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children }) => {
    const { rtl, dir, lang } = rtlProps(children);
    return (
      <h2
        dir={dir}
        lang={lang}
        className={cn(
          "mt-5 mb-2 font-heading text-[1.15em] font-semibold first:mt-0",
          rtl && "text-right font-arabic",
        )}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const { rtl, dir, lang } = rtlProps(children);
    return (
      <h3
        dir={dir}
        lang={lang}
        className={cn(
          "mt-4 mb-2 font-heading text-[1.05em] font-semibold first:mt-0",
          rtl && "text-right font-arabic",
        )}
      >
        {children}
      </h3>
    );
  },
  p: ({ children }) => {
    const { rtl, dir, lang } = rtlProps(children);
    return (
      <p
        dir={dir}
        lang={lang}
        className={cn(
          "mb-3 last:mb-0",
          rtl && "text-right font-arabic",
          rtl && ARABIC_SCALE,
        )}
      >
        {children}
      </p>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="mb-3 ml-5 list-disc space-y-1 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-3 ml-5 list-decimal space-y-1 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => {
    const { rtl, dir, lang } = rtlProps(children);
    return (
      <li
        dir={dir}
        lang={lang}
        className={cn(rtl && "text-right font-arabic", rtl && ARABIC_SCALE)}
      >
        {children}
      </li>
    );
  },
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-4 hover:text-foreground"
    >
      {children}
    </a>
  ),
  pre: ({ children }) => {
    const className =
      isValidElement<{ className?: string }>(children) &&
      typeof children.props.className === "string"
        ? children.props.className
        : "";
    const lang = /language-(\w+)/.exec(className)?.[1];
    if (lang === "ar" || lang === "arabic") return children;
    return <pre>{children}</pre>;
  },
  code: ({ className, children }) => {
    const lang = /language-(\w+)/.exec(className ?? "")?.[1];
    if (lang === "ar" || lang === "arabic") {
      return (
        <span
          dir="rtl"
          lang="ar"
          className={cn(
            "mb-3 block text-right font-arabic last:mb-0",
            ARABIC_SCALE,
          )}
        >
          {children}
        </span>
      );
    }
    return (
      <code className="bg-muted px-1 py-0.5 text-[0.85em]">{children}</code>
    );
  },
};

export function MarkdownContent({
  content,
  className,
  dir,
  lang,
}: {
  content: string;
  className?: string;
  dir?: "rtl" | "ltr";
  lang?: string;
}) {
  return (
    <div
      dir={dir}
      lang={lang}
      className={cn(
        "max-w-2xl text-sm leading-relaxed text-foreground",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
