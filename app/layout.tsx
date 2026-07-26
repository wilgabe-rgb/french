import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { AccountChip } from "@/components/AccountChip";
import { DeskNav, TabBar } from "@/components/Nav";
import { SignOutOnClose } from "@/components/SignOutOnClose";
import { SyncOnChange } from "@/components/SyncOnChange";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parlons — 90 days of usable French",
  description:
    "Twenty minutes a day of speaking and listening practice, with a conversation partner that corrects you.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#14151a" },
  ],
  width: "device-width",
  initialScale: 1,
  // the tab bar sits flush with the bottom of the screen; body padding keeps
  // everything else clear of the notch
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-sm">
          <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
            <Link
              href="/"
              className="-mx-2 rounded-lg px-2 py-1 font-semibold tracking-tight"
            >
              Parlons<span className="text-accent">.</span>
            </Link>
            <div className="flex items-center gap-2">
              <DeskNav />
              <AccountChip />
            </div>
          </div>
        </header>
        <main className="pad-nav flex-1">{children}</main>
        <TabBar />
        <SignOutOnClose />
        <SyncOnChange />
      </body>
    </html>
  );
}
