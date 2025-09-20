import type { Metadata } from "next";
import "./globals.css";
import { TagProvider } from "@/lib/context";
import { ThemeProvider } from "@/lib/theme-context";

export const metadata: Metadata = {
  title: "Digital Asset Management - Photo Gallery",
  description: "A simple DAM system for managing and searching photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <TagProvider>{children}</TagProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
