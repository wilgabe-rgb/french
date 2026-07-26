import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { SyncOnChange } from "@/components/SyncOnChange";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parlons — 90 days of usable French",
  description:
    "Twenty minutes a day of speaking and listening practice, with a conversation partner that corrects you.",
};

export const viewport: Viewport = {
  themeColor: "#fbfaf8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header className="border-b border-line">
          <div className="mx-auto w-full max-w-3xl px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight">
              Parlons<span className="text-accent">.</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-muted">
              <Link href="/plan" className="hover:text-ink">
                Plan
              </Link>
              <Link href="/practice" className="hover:text-ink">
                Practice
              </Link>
              <Link href="/progress" className="hover:text-ink">
                Progress
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <SyncOnChange />
      </body>
    </html>
  );
}
