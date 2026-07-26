"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Tab = {
  href: string;
  label: string;
  /** which section a URL belongs to — /day/12 is still "Today" */
  owns: (path: string) => boolean;
  icon: string;
};

const TABS: Tab[] = [
  {
    href: "/",
    label: "Today",
    owns: (p) => p === "/" || p.startsWith("/day"),
    icon: "M12 3.2 2 12h3v8h5.5v-5h3v5H19v-8h3L12 3.2Z",
  },
  {
    href: "/plan",
    label: "Plan",
    owns: (p) => p.startsWith("/plan") || p.startsWith("/test"),
    icon: "M4 5h16v2.2H4V5Zm0 5.9h16v2.2H4v-2.2ZM4 16.8h10V19H4v-2.2Z",
  },
  {
    href: "/practice",
    label: "Practice",
    owns: (p) => p.startsWith("/practice"),
    icon: "M20 2.5H4a2 2 0 0 0-2 2v17l4.2-4.2H20a2 2 0 0 0 2-2v-10.8a2 2 0 0 0-2-2Z",
  },
  {
    href: "/progress",
    label: "Progress",
    owns: (p) => p.startsWith("/progress"),
    icon: "M3.5 20.5h3.6v-7.4H3.5v7.4Zm6.7 0h3.6V3.5h-3.6v17Zm6.7 0h3.6V9.2h-3.6v11.3Z",
  },
];

/** The same four destinations, inline, once there's room for words */
export function DeskNav() {
  const path = usePathname();

  return (
    <nav className="hidden items-center gap-1 text-sm sm:flex">
      {TABS.slice(1).map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={t.owns(path) ? "page" : undefined}
          className={`rounded-lg px-2.5 py-1.5 transition hover:text-ink ${
            t.owns(path) ? "text-ink" : "text-muted"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

/**
 * On a phone the whole app is used one-handed, mid-session, so the four places
 * you move between live at the bottom of the screen rather than in a row of
 * small links up in the corner. It drops out of the way while you're typing —
 * an on-screen keyboard leaves too little room to spend any on navigation.
 */
export function TabBar() {
  const path = usePathname();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      (el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.isContentEditable);

    const on = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const off = (e: FocusEvent) => isField(e.target) && setTyping(false);

    document.addEventListener("focusin", on);
    document.addEventListener("focusout", off);
    return () => {
      document.removeEventListener("focusin", on);
      document.removeEventListener("focusout", off);
    };
  }, []);

  return (
    <nav
      aria-label="Sections"
      aria-hidden={typing}
      className={`safe-b fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur-sm transition-transform duration-200 sm:hidden ${
        typing ? "pointer-events-none translate-y-full" : "translate-y-0"
      }`}
    >
      <ul className="flex">
        {TABS.map((t) => {
          const here = t.owns(path);
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                aria-current={here ? "page" : undefined}
                className={`flex h-16 flex-col items-center justify-center gap-1 text-[11px] transition ${
                  here ? "text-accent" : "text-muted"
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d={t.icon} />
                </svg>
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
